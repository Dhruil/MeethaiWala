import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    globals: true,
    css: true,
    include: ['**/*.test.jsx', '**/__tests__/**/*.test.jsx'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
})
