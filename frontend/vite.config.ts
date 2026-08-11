import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Let Sass resolve @use imports relative to the src directory,
        // so component SCSS modules can @use 'styles/variables' cleanly.
        loadPaths: [import.meta.dirname + '/src'],
      },
    },
  },
  server: {
    // Proxy API requests to the Flask backend during local development.
    // In production (Vercel), rewrites in vercel.json handle this instead.
    proxy: {
      '/ask': 'http://127.0.0.1:5000',
      '/summarize': 'http://127.0.0.1:5000',
    },
  },
})
