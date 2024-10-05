import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind(), react()],
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
      strategy: 'pathname'
    }
  },
  vite: {
    resolve: {
      alias: {
        "@/*": ["src/*"],
        '@': '/src',
      }
    }
  }
});