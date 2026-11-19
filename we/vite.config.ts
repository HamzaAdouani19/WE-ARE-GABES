import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': import.meta.dirname,
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {name: 'maplibre', test: /node_modules[\\/]maplibre-gl/, priority: 30},
            {name: 'motion', test: /node_modules[\\/]motion/, priority: 20},
            {name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/, priority: 10},
          ],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
  server: {
    // HMR can be disabled (e.g. in sandboxed editors) with DISABLE_HMR=true.
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
