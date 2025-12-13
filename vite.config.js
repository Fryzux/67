import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/67/',   // 🔥 ИМЯ РЕПОЗИТОРИЯ
  plugins: [react()],
})
