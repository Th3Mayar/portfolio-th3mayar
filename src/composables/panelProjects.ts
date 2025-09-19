import { computed, ref } from "vue";
import { frameworks, allProjects } from "@/stores/projects";

const showFilters = ref(true);

const filteredProjects = computed(() => {
  const activeFrameworks = frameworks
    .filter((fw) => fw.checked)
    .map((fw) => fw.key.toLowerCase());

  if (activeFrameworks.length === 0) {
    return []; // Show NO projects when no filters are active
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

function toggleFramework(fw) {
  fw.checked = !fw.checked;
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

export function usePanelProjects() {
  return {
    frameworks,
    showFilters,
    filteredProjects,
    selectAllFrameworks,
    deselectAllFrameworks,
    toggleFramework,
    saveFiltersToStorage,
    loadFiltersFromStorage,
  };
}