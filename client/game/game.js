import * as monaco from "monaco-editor";
import { emmetHTML } from "emmet-monaco-es";

import { formatTime } from "../utils/formatTime";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

const params = new URLSearchParams(location.search);
const timerEl = document.getElementById("timer");
const refImg = document.getElementById("ref");

let PLAYER =
  Number(params.get("player")) || Number(localStorage.getItem("player"));
while (!PLAYER) {
  PLAYER = Number(prompt("Введите номер игрока (1 или 2):"));
}
window.history.replaceState({}, "", "/game/");
localStorage.setItem("player", PLAYER);

self.MonacoEnvironment = {
  getWorker: (moduleId, label) => {
    return new HtmlWorker();
  },
};
const editor = monaco.editor.create(document.getElementById("editor"), {
  value: localStorage.getItem("value") || "",
  language: "html",
  theme: "vs-dark",
  fontSize: 15,
  automaticLayout: true,
  "editor.scrollBeyondLastLine": false,
});

emmetHTML(monaco);

editor.onDidChangeModelContent(() => {
  const code = editor.getValue();
  localStorage.setItem("value", code);
  fetch("/api/code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player: PLAYER, code }),
  });
});

let currentTaskId = null;

async function poll() {
  try {
    const state = await fetch("/api/state").then((r) => r.json());
    timerEl.textContent = state.taskId
      ? `${formatTime(state.timeLeft)}`
      : "Waiting for the start…";

    if (state.taskId !== currentTaskId) {
      currentTaskId = state.taskId;
      const tasks = await fetch("/api/tasks").then((r) => r.json());
      const t = tasks.find((x) => x.name === state.taskId);
      refImg.src = t ? t.url : "";
    }
  } catch (e) {
    console.error(e);
  }
}

poll();
setInterval(poll, 500);
