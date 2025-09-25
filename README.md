

# Th3Mayar's Portfolio




Personal portfolio built with Astro, Vue 3, TailwindCSS, and TypeScript. Showcases my projects, experience, contact, and skills in a modern, responsive design with advanced visual effects.

## 🆕 What's New (2025)

- **🎮 Mini Games:** Now includes Tetris, Flappy Bird, and Snake, fully playable and integrated in the UI.
- **🧩 New Components:** Modular atomic design with reusable components: Button, Badge, Toast, Tooltip, Select, Toggle, Typography, IconByName, ImageByName, Card, Item, Navbar, MobileOverlay, AboutPanel, ProjectsPanel, ContactForm, and more.
- **🌐 Multilanguage:** Full support for English and Spanish (i18n), including dynamic routing and translations.
- **📬 Contact Form:** Integrated with Supabase for secure message storage and anti-spam (rate limit per email).
- **📊 Experience Data:** Work experience and skills are now managed via JSON for easy updates and localization.
- **🖼️ Optimized Assets:** Improved image and video handling, preload strategies, and SVG/icon management.
- **🛠️ Modern Tooling:** Uses Vite, Pinia, TypeScript, TailwindCSS, Astro integrations for Vue/React, and deployment-ready for Vercel.
- **📦 Scripts:** Unified scripts for pnpm, npm, and bun. All commands work with any package manager.



## 🚀 Project Structure

The portfolio is organized as follows:



```text
/ (root)
├── public/           # Images, SVGs, static assets, fonts, logos, videos
├── src/
│   ├── components/   # Vue & Astro components (atoms, molecule, organism, games)
│   │   ├── atoms/    # Button, Badge, Toast, Tooltip, Select, etc.
│   │   ├── games/    # TetrisMinimal.vue, FlappyBird.vue, index.ts
│   │   ├── molecule/ # Card, Item, Navbar, AboutPanel, ProjectsPanel, etc.
│   │   └── organism/ # ContactForm, Footer, Header
│   ├── composables/  # Custom composables (gamePanel, aboutPanel, etc.)
│   ├── core/         # Helper functions, services (e.g., supabase)
│   ├── data/         # experience.json, project data
│   ├── i18n/         # i18n utilities, translation helpers
│   ├── lang/         # en.json, es.json (translations)
│   ├── layouts/      # Layout.astro
│   ├── modules/      # Sectioned pages (home, about, contact, projects)
│   ├── pages/        # Astro route entrypoints, dynamic [lang] support
│   ├── stores/       # Pinia stores and data
│   └── styles/       # Global CSS and themes
├── astro.config.mjs  # Astro configuration
├── tailwind.config.mjs
├── postcss.config.cjs
├── tsconfig.json     # TypeScript config
├── vercel.json       # Vercel deployment config
└── package.json
```



## ✨ Features

- 🎮 **Mini Games:** Tetris, Flappy Bird, and Snake, playable in the UI
- 🧩 **Atomic Design:** Atoms, Molecules, Organisms, Templates
- 🌐 **Multilanguage:** English & Spanish, dynamic routing
- 🌓 **Dark/Light Mode:** Toggle with smooth transitions
- 🖼️ **Optimized Images:** Preload, fetchpriority, SVG, and video support
- 📨 **Contact Form:** Supabase backend, anti-spam, async feedback
- 🏷️ **Reusable Components:** Button, Badge, Toast, Tooltip, Select, etc.
- 🛠️ **Modern Tooling:** Vite, Pinia, TypeScript, Astro integrations
- 📊 **Experience/Projects:** Data-driven, easy to update
- 📱 **Responsive:** Mobile-first, adaptive layouts
- ✨ **Visual Effects:** Glassmorphism, neon, animated transitions


## 🛠️ Main Technologies

- [Astro](https://astro.build/) (main framework)
- [Vue 3](https://vuejs.org/) (interactive components)
- [TailwindCSS](https://tailwindcss.com/) (utility-first CSS)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [Supabase](https://supabase.com/) (contact form backend)
- [Vite](https://vitejs.dev/) (build tool)
- [Bun](https://bun.sh/) (alternative package manager)


## 📦 Installation & Usage

```sh
# Choose your package manager:
pnpm install   # or npm install / bun install
pnpm run dev  # or npm run dev / bun run dev
```

Open http://localhost:4321 to view the portfolio in development mode.


## 📁 Useful Scripts

| Command                | Action                                    |
|------------------------|-------------------------------------------|
| `pnpm install`         | Install dependencies                      |
| `pnpm run dev`         | Local server at `localhost:4321`          |
| `pnpm run build`       | Build the site for production             |
| `pnpm run preview`     | Preview the build locally                 |
| `bun install`          | Install dependencies with Bun             |
| `bun run dev`          | Run dev server with Bun                   |
| `npm install`          | Install dependencies with npm             |
| `npm run dev`          | Run dev server with npm                   |

Made with ❤️ by Th3Mayar


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `pnpm ...`                | All scripts work with pnpm as well               |
| `bun ...`                 | All scripts work with bun as well                |


## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build), [Vue 3 docs](https://vuejs.org/), or [TailwindCSS docs](https://tailwindcss.com/).

---

_Portfolio by Th3Mayar. Last updated: September 2025._
