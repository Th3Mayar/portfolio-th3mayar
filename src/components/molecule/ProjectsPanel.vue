<template>
  <main class="flex flex-col md:flex-row h-[75dvh] w-full">
    <aside
      class="flex flex-col gap-4 p-4 border-r bg-dark-background border-border min-w-[220px] md:min-w-[260px]"
    >
      <div
        class="flex items-center justify-between cursor-pointer select-none"
        @click="showFilters = !showFilters"
      >
        <Typography variant="FiraCode" as="h4" color="light" :class="'font-bold text-lg'">
          Projects
        </Typography>
        <IconByName
          :name="showFilters ? 'ChevronDown' : 'ChevronRight'"
          color="light"
          className="text-xl transition-transform"
        />
      </div>
      <div v-if="showFilters" class="flex flex-col gap-2 mt-2">
        <label
          v-for="fw in frameworks"
          :key="fw.key"
          class="flex items-center gap-2 cursor-pointer text-light font-mono text-base"
        >
          <input type="checkbox" v-model="fw.checked" class="accent-orange w-4 h-4" />
          <IconByName :name="fw.icon" color="light" className="text-lg" />
          <span>{{ fw.label }}</span>
        </label>
      </div>
    </aside>
    <section class="flex-1 p-4 overflow-auto">
      <div class="flex flex-wrap gap-5 justify-center">
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
          <Typography variant="FiraCode" as="p" color="dark" caseType="capital">
            {{ project.description }}
          </Typography>
        </Card>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import Card from "@/components/molecule/Card.vue";
import Typography from "@/components/atoms/Typography.vue";
import IconByName from "@/components/atoms/IconByName.vue";

const showFilters = ref(true);

const frameworks = ref([
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
  { key: "Bun", label: "Bun", icon: "Bun", checked: true },
  { key: "Redux", label: "Redux", icon: "Redux", checked: true },
  { key: "Next.js", label: "Next.js", icon: "NextJs", checked: true },
]);

const allProjects = [
  {
    image: "codesys",
    icon: "react",
    description:
      "Billing and management system for small businesses. Stack: React, Express, MongoDB.",
    tags: ["react", "express", "mongodb"],
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
    tags: ["Nuxt", "Node.js", "MongoDB"],
    url: "",
  },

  {
    image: "priceNotify",
    icon: "vue",
    description:
      "Price notification system for eCommerce platforms. Stack: React, Node.js, MongoDB.",
    tags: ["vue", "node", "mysql"],
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
    tags: ["Astro", "React", "TypeScript", "JavaScript"],
    url: "",
  },
  {
    image: "palomoOfMonth",
    icon: "nuxt",
    description:
      "Palomo of the Month is a Nuxt 3 application designed to recognize the outstanding palomo of the month through a comprehensive voting and management system. It features a modern UI with shadcn-vue components, dark/light theme support, secure authentication, responsive design, and customizable settings for themes, colors, and preferences. Built for optimal performance with Nuxt 3 and TypeScript.",
    tags: ["Nuxt 3", "Tailwind CSS", "shadcn-vue", "TypeScript", "Bun"],
    url: "",
  },
  {
    image: "gridOrFlex",
    icon: "react",
    description:
      "gridOrFlex is a dynamic UI feature that allows switching between Grid and Flex views in a user list, enhancing the user experience by adapting the layout as needed. It uses Redux for global state management, Framer Motion for smooth transitions, and is designed to be reusable in any list component. Built with React and Next.js.",
    tags: ["React", "Next.js", "Redux Toolkit", "Framer Motion"],
    url: "",
  },
];

const filteredProjects = computed(() => {
  const active = frameworks.value.filter((fw) => fw.checked).map((fw) => fw.key);
  return allProjects.filter((p) => p.tags.some((tag) => active.includes(tag)));
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