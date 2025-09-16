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
        "@/*": ["src/*"],
        "types/*": ["types/*"],
        "components/*": ["src/components/*"],
        "layouts/*": ["src/layouts/*"],
        "pages/*": ["src/pages/*"],
        "i18n/*": ["src/i18n/*"],
        "lang/*": ["src/lang/*"],
        "styles/*": ["src/styles/*"],
      }
    }
  },
  optimizeDeps: {
    exclude: ['@astrojs/vue'],
  }
});