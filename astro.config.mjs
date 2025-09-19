import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind()],
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      }
    }
  },
  optimizeDeps: {
    exclude: ['@astrojs/vue'],
  },
  experimental: {
    viewTransitions: true
  },
  transitions: {
    fallback: 'none'
  }
});