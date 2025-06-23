import { readdir } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const IMAGES_DIR = resolve(__dirname, "../../tasks");

export async function getTasks() {
  const files = await readdir(IMAGES_DIR);
  return files
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

export async function checkTask(taskId) {
  const tasks = await getTasks();
  return tasks.includes(taskId);
}
