import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'my-app',
  plugins: [ react() ],
  publicDir: 'my-app/public',
  server: {
    port: 5173
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
