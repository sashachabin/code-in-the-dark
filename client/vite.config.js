import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        player: path.resolve(__dirname, 'player.html'),
        admin:  path.resolve(__dirname, 'admin.html'),
        tv:     path.resolve(__dirname, 'tv.html')
      }
    }
  },
  server: {
    port: 8080,
    host: true,
    proxy: {
      '/tasks':  'http://localhost:3000',
      '/start':  'http://localhost:3000',
      '/code':   'http://localhost:3000',
      '/state':  'http://localhost:3000'
    }
  }
});