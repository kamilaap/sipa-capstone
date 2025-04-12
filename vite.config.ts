import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/ask': {
        target: 'https://sipa-chat-production.up.railway.app',
        changeOrigin: true,
        secure: false
      }
    }
  }
})