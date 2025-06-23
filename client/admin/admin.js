import { formatTime } from "../utils/formatTime";

let adminPassword = "";

function askPassword() {
  let savedPassword = localStorage.getItem("adminPassword") || "";
  let pwd;
  if (!pwd) {
    pwd = prompt("Enter password:", savedPassword) || "";
  }
  localStorage.setItem("adminPassword", pwd);
  return pwd;
}

adminPassword = askPassword();

function getAdminPassword() {
  return adminPassword;
}

function loadTasks() {
  fetch("/api/tasks")
    .then((r) => r.json())
    .then((arr) => {
      const ul = document.getElementById("taskList");
      ul.style = "padding: 0;";
      ul.innerHTML = "";
      const sel = document.getElementById("taskSelect");
      sel.innerHTML = "";
      arr.forEach((t) => {
        const li = document.createElement("li");
        li.style =
          "display: flex; gap: 8px; align-items: center; margin: 10px 0;";
        li.innerHTML = `
          <img src="${t.url}" alt="" 
               style="width:72px;height:42px;object-fit:contain;
                      border-radius:2px;border:1px solid rgba(0,0,0,0.15)" />
          ${t.name}
        `;
        ul.appendChild(li);
        const opt = document.createElement("option");
        opt.value = t.name;
        opt.innerText = t.name;
        sel.appendChild(opt);
      });
    });
}

loadTasks();

document.getElementById("startForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const payload = {
    taskId: fd.get("taskId"),
    duration: fd.get("duration") * 60,
  };
  fetch("/api/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": getAdminPassword(),
    },
    body: JSON.stringify(payload),
  })
    .then((r) => {
      if (r.status === 401) {
        throw new Error(
          "Wrong password. Please refresh the page and try again.",
        );
      }
      return r.json();
    })
    .then((d) => {
      document.getElementById("status").innerText =
        `Started task ${d.taskId} for ${d.duration / 60} minutes`;
    })
    .catch((err) => alert(err.message));
});

function submitCode(player, code) {
  fetch("/api/code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": getAdminPassword(),
    },
    body: JSON.stringify({ player, code }),
  })
    .then((r) => {
      if (r.status === 401) {
        throw new Error(
          "Wrong password. Please refresh the page and try again.",
        );
      }
      return r.text();
    })
    .then(() => {
      console.log("Code submitted");
    })
    .catch((err) => alert(err.message));
}

document
  .getElementById("one")
  .addEventListener("input", (e) => submitCode(1, e.target.value));
document
  .getElementById("two")
  .addEventListener("input", (e) => submitCode(2, e.target.value));

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
            document.getElementById("img-name").innerText = t ? t.name : "";
          });
        document.getElementById("one").value = "";
        document.getElementById("two").value = "";
        lastCodes = { 1: "", 2: "" };
      }
      if (state.codes[1] !== lastCodes[1]) {
        lastCodes[1] = state.codes[1];
        document.getElementById("one").value = lastCodes[1];
      }
      if (state.codes[2] !== lastCodes[2]) {
        lastCodes[2] = state.codes[2];
        document.getElementById("two").value = lastCodes[2];
      }
      if (state.timeLeft) {
        document.getElementById("time-left").innerText =
          `(${formatTime(state.timeLeft)})`;
      }
    });
}

setInterval(poll, 300);
poll();
