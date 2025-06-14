// vite.config.js
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default {
  server: {
    proxy: {
  //  '/content': 'http://localhost:3001',
    //  '/auth': 'http://localhost:3000'
    }
  },
    plugins: [
      react(),
      tailwindcss()
    ]
}