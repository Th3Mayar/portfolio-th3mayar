

# Th3Mayar's Portfolio



Personal portfolio built with Astro, Vue 3, TailwindCSS, and TypeScript. Showcases my projects, experience, contact, and skills in a modern, responsive design with advanced visual effects.


## 🚀 Project Structure

The portfolio is organized as follows:


```text
/
├── public/           # Images, SVGs, static assets
├── src/
│   ├── components/   # Vue and Astro components (atoms, molecule, organism)
│   ├── layouts/      # Base layouts
│   ├── modules/      # Sectioned pages (home, about, contact, projects)
│   ├── pages/        # Astro route entrypoints
│   ├── stores/       # Pinia stores and data
│   ├── styles/       # Global CSS and themes
│   └── data/         # Experience and projects JSONs
└── package.json
```


## ✨ Features

- Image modal for projects, full and responsive view
- Smooth animations and transitions (SPA-like)
- Glassmorphism and neon effects
- Multilanguage support (i18n)
- Dark/Light mode
- Optimized image loading (preload, fetchpriority)
- Responsive and mobile-first
- Reusable, type-safe components with TypeScript
- Contact via form and mailto

## 🛠️ Main Technologies

- [Astro](https://astro.build/) (main framework)
- [Vue 3](https://vuejs.org/) (interactive components)
- [TailwindCSS](https://tailwindcss.com/) (utility-first CSS)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) (state management)

## 📦 Installation & Usage

```sh
pnpm install # or npm install / bun install
pnpm run dev # or npm run dev / bun run dev
```

Open http://localhost:4321 to view the portfolio in development mode.

## 📁 Useful Scripts

| Command            | Action                                    |
|--------------------|-------------------------------------------|
| `pnpm install`     | Install dependencies                      |
| `pnpm run dev`     | Local server at `localhost:4321`          |
| `pnpm run build`   | Build the site for production             |
| `pnpm run preview` | Preview the build locally                 |

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

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
