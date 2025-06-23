import { formatTime } from "../utils/formatTime";

const player1Result = document.getElementById("frame1");
const player2Result = document.getElementById("frame2");

let currentTaskId = null;
let lastCodes = { 1: "", 2: "" };

function poll() {
  fetch("/api/state")
    .then((r) => r.json())
    .then((state) => {
      if (state.taskId !== currentTaskId) {
        currentTaskId = state.taskId;
        fetch("/api/tasks")
          .then((r) => r.json())
          .then((tasks) => {
            const t = tasks.find((x) => x.name === state.taskId);
            const img = document.getElementById("refImg");
            img.src = t ? t.url : "";
          });
        player1Result.srcdoc = "";
        player2Result.srcdoc = "";
        lastCodes = { 1: "", 2: "" };
      }
      if (state.codes[1] !== lastCodes[1]) {
        lastCodes[1] = state.codes[1];
        player1Result.srcdoc = lastCodes[1];
      }
      if (state.codes[2] !== lastCodes[2]) {
        lastCodes[2] = state.codes[2];
        player2Result.srcdoc = lastCodes[2];
      }
      document.getElementById("timer").innerText = formatTime(state.timeLeft);
    });
}
setInterval(poll, 500);

poll();
