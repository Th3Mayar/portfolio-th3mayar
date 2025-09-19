<template>
  <main class="flex flex-col md:flex-row h-[75dvh] w-full">
    <aside
      class="flex flex-col gap-4 p-4 border-r bg-dark-background border-border transition-all duration-300"
      :class="showFilters ? 'min-w-[220px] md:min-w-[260px]' : 'min-w-[60px] md:min-w-[60px] items-center justify-center'"
    >
      <div
        class="flex items-center justify-between cursor-pointer select-none transition-transform duration-300"
        :class="showFilters ? 'flex-row' : 'flex-col w-[20px]'"
        @click="showFilters = !showFilters"
      >
        <div class="flex items-center gap-2" :class="showFilters ? '' : 'flex-col gap-1'">
          <Typography
            variant="FiraCode"
            as="h4"
            color="light"
            className="font-bold transition-transform duration-300 !text-base"
            :class="showFilters ? '' : 'transform -rotate-90 whitespace-nowrap'"
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
          className="text-xl transition-transform duration-300"
          :class="showFilters ? '' : 'transform rotate-90'"
        />
      </div>
      <div v-if="showFilters" class="flex flex-col gap-2 mt-2 transition-all duration-300">
        <div class="flex flex-col gap-2 mb-2 pb-2 border-b border-border">
          <Button
            @click="selectAllFrameworks"
            variant="simple"
            size="sm"
            class="text-orange font-mono hover:text-orange/80 transition-colors"
          >
            Select All
          </Button>
          <Typography
            variant="FiraCode"
            as="div"
            color="light"
            className="text-light/60 font-mono text-xs text-center opacity-60"
          >
            {{ frameworks.filter(fw => fw.checked).length }}/{{ frameworks.length }}
          </Typography>
          <Button
            @click="deselectAllFrameworks"
            variant="simple"
            size="sm"
            class="text-red-400 font-mono hover:text-red-300 transition-colors"
          >
            Clear All
          </Button>
        </div>

        <section class="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
          <div
            v-for="fw in frameworks"
            :key="fw.key"
            class="flex items-center gap-2 cursor-pointer text-light font-mono text-base hover:bg-card/20 p-1 rounded transition-colors"
            @click="toggleFramework(fw)"
          >
            <input
              type="checkbox"
              :checked="fw.checked"
              class="accent-orange w-4 h-4 pointer-events-none"
              readonly
            />
            <IconByName :name="fw.icon" color="light" className="text-lg" />
            <Typography variant="FiraCode" as="span" color="light" className="text-sm">
              {{ fw.label }}
            </Typography>
          </div>
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
          size="default"
          class="px-4 py-2 rounded font-mono transition-colors mt-4"
        >
          Show All Projects
        </Button>
      </div>
      <div v-else class="flex flex-wrap gap-5 justify-center">
        <Card
          v-for="project in filteredProjects"
          :key="project.icon + (project.image || project.video)"
          :image="project.image"
          :video="project.video"
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

            <div class="flex flex-wrap gap-2 mb-4">
              <Typography
                v-for="tag in project.tags"
                :key="tag"
                variant="FiraCode"
                as="span"
                color="orange"
                className="text-xs bg-orange/20 px-3 py-1 rounded-full font-mono border border-orange/30"
              >
                {{ tag }}
              </Typography>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, watch } from "vue";
import Card from "@/components/molecule/Card.vue";
import Typography from "@/components/atoms/Typography.vue";
import IconByName from "@/components/atoms/IconByName.vue";
import Button from "../atoms/Button.vue";
import { usePanelProjects } from "@/composables/panelProjects";
import { frameworks, allProjects } from "@/stores/projects";

const {
  showFilters,
  filteredProjects,
  toggleFramework,
  selectAllFrameworks,
  deselectAllFrameworks,
  saveFiltersToStorage,
  loadFiltersFromStorage,
} = usePanelProjects();

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