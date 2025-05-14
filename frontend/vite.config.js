import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './',             // 현재 디렉토리 기준 (frontend 안에서 실행 중이니까 그대로)
  publicDir: 'public',    // public 폴더 경로 명시
  plugins: [react()],
})
