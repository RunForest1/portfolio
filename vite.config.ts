import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'

// Сайт живёт на https://runforest1.github.io/portfolio/ — статические ассеты
// должны собираться с этим префиксом. Локально (dev-сервер, `vite preview`)
// база остаётся корневой. GITHUB_PAGES=true выставляется только в
// .github/workflows/deploy-pages.yml перед сборкой.
const GITHUB_PAGES_BASE = '/portfolio/'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? GITHUB_PAGES_BASE : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
