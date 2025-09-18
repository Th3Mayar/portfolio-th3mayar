<template>
  <main class="flex flex-col md:flex-row h-[75dvh] w-full">
    <aside
      class="flex flex-col gap-4 p-4 border-r bg-dark-background border-border min-w-[220px] md:min-w-[260px]"
    >
      <div
        class="flex items-center justify-between cursor-pointer select-none"
        @click="showFilters = !showFilters"
      >
        <div class="flex items-center gap-2">
          <Typography
            variant="FiraCode"
            as="h4"
            color="light"
            :class="'font-bold text-lg'"
          >
            Projects ({{ filteredProjects.length }}/{{ allProjects.length }})
          </Typography>
          <div
            v-if="frameworks.filter((fw) => fw.checked).length < frameworks.length"
            class="w-2 h-2 bg-orange rounded-full animate-pulse"
            title="Filters active"
          ></div>
        </div>
        <IconByName
          :name="showFilters ? 'ChevronDown' : 'ChevronRight'"
          color="light"
          className="text-xl transition-transform"
        />
      </div>
      <div v-if="showFilters" class="flex flex-col gap-2 mt-2">
        <div class="flex flex-col gap-2 mb-2 pb-2 border-b border-border">
          <button
            @click="selectAllFrameworks"
            class="text-orange font-mono text-sm hover:text-orange/80 transition-colors"
          >
            Select All
          </button>
          <div class="text-light/60 font-mono text-xs text-center">
            {{ frameworks.filter(fw => fw.checked).length }}/{{ frameworks.length }}
          </div>
          <button
            @click="deselectAllFrameworks"
            class="text-red-400 font-mono text-sm hover:text-red-300 transition-colors"
          >
            Clear All
          </button>
        </div>

        <section class="flex flex-col gap-2 max-h-[550px] overflow-y-auto pr-1">
          <label
            v-for="fw in frameworks"
            :key="fw.key"
            class="flex items-center gap-2 cursor-pointer text-light font-mono text-base hover:bg-card/20 p-1 rounded transition-colors"
            @click.stop
          >
            <input
              type="checkbox"
              v-model="fw.checked"
              class="accent-orange w-4 h-4"
            />
            <IconByName :name="fw.icon" color="light" className="text-lg" />
            <span>{{ fw.label }}</span>
          </label>
        </section>
      </div>
    </aside>
    <section class="flex-1 p-4 overflow-auto">
      <div
        v-if="filteredProjects.length === 0"
        class="flex flex-col items-center justify-center h-full text-center"
      >
        <IconByName name="Search" color="light" className="text-6xl mb-4 opacity-50" />
        <Typography variant="FiraCode" as="h3" color="light" className="text-xl mb-2">
          No projects found
        </Typography>
        <Typography variant="FiraCode" as="p" color="light" className="opacity-70 mb-4">
          Try selecting different technologies or clear all filters
        </Typography>
        <Button
          @click="selectAllFrameworks"
          variant="orange"
          class="px-4 py-2 rounded font-mono transition-colors mt-4"
        >
          Show All Projects
        </Button>
      </div>
      <div v-else class="flex flex-wrap gap-5 justify-center">
        <Card
          v-for="project in filteredProjects"
          :key="project.icon + project.image"
          :image="project.image"
          :icon="project.icon"
          ButtonVariant="simple"
          size="medium"
          button="view-project"
          :url="project.url"
          class="flex-1 min-w-[280px] max-w-[350px] basis-1/3"
        >
          <div class="flex flex-col h-full">
            <Typography
              variant="FiraCode"
              as="p"
              color="dark"
              caseType="capital"
              className="flex-1 mb-4"
            >
              {{ project.description }}
            </Typography>

            <!-- Tags del proyecto -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="text-xs bg-orange/20 text-orange px-3 py-1 rounded-full font-mono border border-orange/30"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import Card from "@/components/molecule/Card.vue";
import Typography from "@/components/atoms/Typography.vue";
import IconByName from "@/components/atoms/IconByName.vue";
import Button from "../atoms/Button.vue";

const showFilters = ref(true);

const frameworks = reactive([
  { key: "react", label: "React", icon: "React", checked: true },
  { key: "mongodb", label: "MongoDB", icon: "Database", checked: true },
  { key: "HTML", label: "HTML5", icon: "HTML", checked: true },
  { key: "CSS", label: "CSS3", icon: "CSS", checked: true },
  { key: "JavaScript", label: "JavaScript", icon: "JavaScript", checked: true },
  { key: "vue", label: "Vue", icon: "Vue", checked: true },
  { key: "nuxt", label: "Nuxt", icon: "Box", checked: true },
  { key: "node", label: "Node.js", icon: "NodeJs", checked: true },
  { key: "express", label: "Express", icon: "Server", checked: true },
  { key: "mysql", label: "MySQL", icon: "Database", checked: true },
  { key: "tailwind", label: "TailwindCSS", icon: "Tailwind", checked: true },
  { key: "php", label: "PHP", icon: "PHP", checked: true },
  { key: "jquery", label: "JQuery", icon: "JQuery", checked: true },
  { key: "astro", label: "Astro", icon: "Astro", checked: true },
  { key: "TypeScript", label: "TypeScript", icon: "TypeScript", checked: true },
  { key: "PostgreSQL", label: "PostgreSQL", icon: "Database", checked: true },
  { key: "Next.js", label: "Next.js", icon: "NextJs", checked: true },
  { key: "groq", label: "GROQ", icon: "Database", checked: true },
  { key: "supabase", label: "Supabase", icon: "Database", checked: true },
  { key: "shadcn-vue", label: "Shadcn Vue", icon: "Component", checked: true },
  { key: "Redux Toolkit", label: "Redux Toolkit", icon: "State", checked: true },
  { key: "Framer Motion", label: "Framer Motion", icon: "Animation", checked: true },
  { key: "Bun", label: "Bun", icon: "Package", checked: true },
]);

const allProjects = [
  {
    image: "codesys",
    icon: "php",
    description:
      "Codesys is a web-based code snippet manager that allows users to save, organize, and share code snippets in various programming languages. It features a user-friendly interface with syntax highlighting, tagging, and search functionality for easy retrieval of snippets. Built with PHP, jQuery, and MySQL.",
    tags: ["php", "jquery", "mysql"],
    url: "",
  },
  {
    image: "saborApp",
    icon: "nuxt",
    description:
      "saborApp is a restaurant reservation application built as a monorepo containing both frontend and backend. The frontend is developed with Nuxt 3, Vue.js, and Tailwind CSS, while the backend is powered by Node.js, Express, and PostgreSQL.",
    tags: ["nuxt", "vue", "tailwind", "node", "express", "PostgreSQL"],
    url: "",
  },
  {
    image: "rescueTrack",
    icon: "nuxt",
    description:
      "RescueTrack is a management platform for towing and roadside assistance services in the Dominican Republic. It connects drivers in vehicle emergencies with reliable providers across the country. Users can share their current location or manually enter an address to request quick and secure assistance. Stack: Nuxt, Node.js, MongoDB.",
    tags: [
      "nuxt",
      "vue",
      "supabase",
      "groq",
      "tailwind",
      "shadcn-vue",
      "lucide-vue-next",
    ],
    url: "",
  },

  {
    image: "priceNotify",
    icon: "vue",
    description:
      "PriceNotify is a web application that allows users to track product prices on e-commerce websites and receive notifications when prices drop. Built with React.js, Tailwind CSS, Node.js, Express, and MongoDB.",
    tags: ["react", "tailwind", "node", "express", "mongodb"],
    url: "",
  },
  {
    image: "luffyGear4",
    icon: "html",
    description:
      "Epic animation inspired by Luffy Gear 4. Built with HTML, CSS and JavaScript, featuring effects and SoundCloud integration.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "",
  },
  {
    image: "writePhrase",
    icon: "astro",
    description:
      "Game Write Phrase is a fun typing challenge game built with Astro, React, and TypeScript. The goal is to type the displayed phrase as quickly and accurately as possible to earn points and unlock new levels. The project follows a modular structure with Astro pages, reusable React components, and TypeScript stores for state management.",
    tags: ["astro", "react", "TypeScript", "JavaScript"],
    url: "",
  },
  {
    image: "palomoOfMonth",
    icon: "nuxt",
    description:
      "Palomo of the Month is a Nuxt 3 application designed to recognize the outstanding palomo of the month through a comprehensive voting and management system. It features a modern UI with shadcn-vue components, dark/light theme support, secure authentication, responsive design, and customizable settings for themes, colors, and preferences. Built for optimal performance with Nuxt 3 and TypeScript.",
    tags: ["nuxt", "tailwind", "shadcn-vue", "TypeScript", "Bun"],
    url: "",
  },
  {
    image: "gridOrFlex",
    icon: "react",
    description:
      "gridOrFlex is a dynamic UI feature that allows switching between Grid and Flex views in a user list, enhancing the user experience by adapting the layout as needed. It uses Redux for global state management, Framer Motion for smooth transitions, and is designed to be reusable in any list component. Built with React and Next.js.",
    tags: ["react", "Next.js", "Redux Toolkit", "Framer Motion"],
    url: "",
  },
];

const filteredProjects = computed(() => {
  const activeFrameworks = frameworks
    .filter((fw) => fw.checked)
    .map((fw) => fw.key.toLowerCase());

  if (activeFrameworks.length === 0) {
    return allProjects; // Show all projects when no filters are active
  }

  return allProjects.filter((project) => {
    return project.tags.some((tag) => {
      const tagLower = tag.toLowerCase();
      return activeFrameworks.some((activeFw) => {
        // Check for exact match first
        if (tagLower === activeFw) return true;

        // Check for partial matches (e.g., "react" matches "React", "next.js" matches "Next.js")
        if (tagLower.includes(activeFw) || activeFw.includes(tagLower)) return true;

        // Special cases for common variations
        const specialMatches = {
          react: ["react", "react.js"],
          vue: ["vue", "vue.js"],
          node: ["node", "node.js"],
          express: ["express", "express.js"],
          mongodb: ["mongodb", "mongo"],
          mysql: ["mysql", "mariadb"],
          postgresql: ["postgresql", "postgres"],
          typescript: ["typescript", "ts"],
          javascript: ["javascript", "js"],
          html: ["html", "html5"],
          css: ["css", "css3"],
          tailwind: ["tailwind", "tailwindcss"],
          nuxt: ["nuxt", "nuxt.js", "nuxt3"],
          "next.js": ["next.js", "nextjs"],
          astro: ["astro"],
        };

        if (specialMatches[activeFw]) {
          return specialMatches[activeFw].includes(tagLower);
        }

        return false;
      });
    });
  });
});

function selectAllFrameworks() {
  frameworks.forEach((fw) => (fw.checked = true));
}

function deselectAllFrameworks() {
  frameworks.forEach((fw) => (fw.checked = false));
}

function saveFiltersToStorage() {
  const filterState = frameworks.map((fw) => ({
    key: fw.key,
    checked: fw.checked,
  }));
  localStorage.setItem("projectFilters", JSON.stringify(filterState));
}

function loadFiltersFromStorage() {
  const saved = localStorage.getItem("projectFilters");
  if (saved) {
    try {
      const filterState = JSON.parse(saved);
      frameworks.forEach((fw) => {
        const savedFw = filterState.find((s) => s.key === fw.key);
        if (savedFw) {
          fw.checked = savedFw.checked;
        }
      });
    } catch (error) {
      console.warn("Error loading filter state from localStorage:", error);
    }
  }
}

watch(
  () => frameworks.map((fw) => fw.checked),
  () => {
    saveFiltersToStorage();
  },
  { deep: true }
);

onMounted(() => {
  loadFiltersFromStorage();
});
</script>

<style lang="css" scoped>
::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
