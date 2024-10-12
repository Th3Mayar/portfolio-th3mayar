import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind()],
  adapter: vercel(),
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