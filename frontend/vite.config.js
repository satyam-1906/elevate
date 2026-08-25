import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/quote-api': {
        target: 'https://programming-quotesapi.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/quote-api/, '')
      }
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    }
  }
})
