import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Enable client-side routing
  server: {
    host: '0.0.0.0', // Biar bisa diakses dari laptop lain
    port: 5173,      // Bisa diganti kalau ada konflik port
    proxy: {
      '/api': {
        target: 'https://ml-api.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})