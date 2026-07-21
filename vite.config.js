import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 75 },
      jpeg: { quality: 75 },
      png: { quality: 75 },
      webp: { quality: 75 },
      avif: { quality: 60 },
    }),
  ],
  base: './', // Esto es importante para Electron
  build: {
    outDir: 'dist', // Asegúrate de que coincide con tu estructura
    emptyOutDir: true,
  }
})