import express from 'express'
import { readFile, writeFile } from 'fs/promises'

const tasksFile = new URL('./tasks.json', import.meta.url)

let tasks = []
try {
  const data = await readFile(tasksFile, 'utf-8')
  tasks = JSON.parse(data)
} catch {
  console.log('tasks.json not found or invalid, starting with empty tasks.')
}

async function saveTasks() {
  await writeFile(tasksFile, JSON.stringify(tasks, null, 2))
}

let currentTask = null
let codes = { 1: '', 2: '' }

function getState() {
  if (!currentTask) {
    return { taskId: null, duration: 0, timeLeft: 0, codes }
  }
  const now = Date.now()
  const end = currentTask.start + currentTask.duration * 1000
  return {
    taskId: currentTask.taskId,
    duration: currentTask.duration,
    timeLeft: Math.max(0, Math.ceil((end - now) / 1000)),
    codes
  }
}

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use('/public', express.static('public'))

app.get('/tasks',    (req, res) => res.json(tasks))
app.post('/tasks',   async (req, res) => {
  const { name, ref } = req.body
  if (typeof name !== 'string' || typeof ref !== 'string')
    return res.status(400).send('Invalid task data')
  const id   = tasks.length ? tasks[tasks.length-1].id + 1 : 1
  const task = { id, name, ref }
  tasks.push(task)
  await saveTasks()
  res.json(task)
})
app.post('/start',   (req, res) => {
  const { taskId, duration } = req.body
  const t = tasks.find(x => x.id === +taskId)
  if (!t || !+duration)
    return res.status(400).send('No such task or bad duration')
  currentTask = { taskId: +taskId, duration: +duration, start: Date.now() }
  codes = { 1: '', 2: '' }
  res.json({ taskId: +taskId, duration: +duration })
})
app.post('/code',    (req, res) => {
  const { player, code } = req.body
  if ((player !== 1 && player !== 2) || typeof code !== 'string')
    return res.status(400).send('Invalid code data')
  codes[player] = code
  res.send('OK')
})
app.get('/state',    (req, res) => res.json(getState()))

app.use((req, res) => res.status(404).send('Not found'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
)
