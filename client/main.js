require.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs'
  }
});

require(['vs/editor/editor.main'], function(monaco) {
  const timerEl = document.getElementById('timer');
  const refImg  = document.getElementById('ref');

  const params = new URLSearchParams(location.search);
  let PLAYER = Number(params.get('player')) || Number(localStorage.getItem('player'));
  while (!PLAYER) {
    PLAYER = Number(prompt('Введите номер игрока (1 или 2):'));
  }
  window.history.replaceState({}, '', '/');
  localStorage.setItem('player', PLAYER);

  const editor = monaco.editor.create(
    document.getElementById('editor'),
    {
      value: localStorage.getItem('value') || `<!DOCTYPE html>
<html>
  <head><meta charset="UTF-8"><title>Документ</title></head>
  <body>
  </body>
</html>`,
      language: 'html',
      theme: 'vs-dark',
      fontSize: 15,
      automaticLayout: true,
      'editor.scrollBeyondLastLine': false
    }
  );

  emmetMonaco.emmetHTML(monaco);

  editor.onDidChangeModelContent(() => {
    const code = editor.getValue();
    localStorage.setItem('value', code);
    fetch('/code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: PLAYER, code })
    });
  });

  let currentTaskId = null;

  async function poll() {
    try {
      const st = await fetch('/state').then(r => r.json());
      timerEl.textContent = st.taskId
        ? `До конца раунда: ${st.timeLeft}s`
        : 'Ожидание начала раунда';

      if (st.taskId !== currentTaskId) {
        currentTaskId = st.taskId;
        const tasks = await fetch('/tasks').then(r => r.json());
        const t = tasks.find(x => x.id === st.taskId);
        refImg.src = t
          ? `http://${window.location.hostname}:3000${t.ref}`
          : '';
      }
    } catch (e) {
      console.error(e);
    }
  }

  poll();
  setInterval(poll, 1000);
});
