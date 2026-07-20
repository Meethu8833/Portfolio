import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Modern browsers only → smaller output (no legacy transpilation).
    target: 'es2020',

    // Vite 8 minifies with oxc by default (esbuild is no longer bundled). The
    // default already minifies production builds, so we don't override it.

    rollupOptions: {
      output: {
        /**
         * Manual chunk splitting (function form — required by Vite 8's rolldown
         * bundler, which does not accept the object form).
         * Splitting the big, rarely-changing vendor libraries into their own
         * chunks means: (1) the browser caches them separately, so shipping a
         * content change re-downloads only your app code, not React/Framer;
         * (2) chunks load in parallel. Icons are split too since react-icons is
         * sizeable.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-icons')) return 'icons-vendor';
          if (id.includes('framer-motion')) return 'motion-vendor';
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router')
          ) {
            return 'react-vendor';
          }
          return 'vendor';
        },
      },
    },

    // Our vendor chunks are intentionally grouped; nudge the warning ceiling up.
    chunkSizeWarningLimit: 600,
  },
});
