import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: ".",
  baseUr: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        game: resolve(__dirname, "game/index.html"),
        admin: resolve(__dirname, "admin/index.html"),
        tv: resolve(__dirname, "tv/index.html"),
      },
    },
  },
  server: {
    port: process.env.CLIENT_DEV_PORT || 8080,
    host: true,
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.SERVER_PORT || 4747}`,
      },
    },
  },
});
