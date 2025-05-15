// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base: '/sil-english-lab-fe/',  // <-- this is the fix
  base: '/',  // <-- this is the fix
  plugins: [react()],
})
