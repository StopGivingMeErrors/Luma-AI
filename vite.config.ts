import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  envPrefix: ['VITE_'],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('retell-client-js-sdk')) return 'retell'
            if (id.includes('@calcom')) return 'cal'
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('react-dom') || id.includes('/react/')) return 'react'
          }
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
