<template>
  <main class="flex flex-col md:flex-row h-[76dvh] w-full">
    <aside class="flex flex-col gap-4 p-4 border-r bg-dark-background border-border transition-all duration-300" :class="showFilters
      ? 'min-w-[220px] md:min-w-[260px]'
      : 'min-w-[60px] md:min-w-[60px] items-center justify-center'
      ">
      <div class="flex items-center justify-between cursor-pointer select-none transition-transform duration-300"
        :class="showFilters ? 'flex-row' : 'flex-col w-[20px]'" @click="showFilters = !showFilters">
        <div class="flex items-center gap-2" :class="showFilters ? '' : 'flex-col gap-1'">
          <Typography variant="FiraCode" as="p" color="light"
            className="font-bold transition-transform duration-300"
            :class="showFilters ? '' : 'transform -rotate-90 whitespace-nowrap'">
            {{ info.label }} ({{ filteredProjects.length }}/{{ allProjects.length }})
          </Typography>
          <div v-if="frameworks.filter((fw) => fw.checked).length < frameworks.length"
            class="w-2 h-2 bg-orange rounded-full animate-pulse" title="Filters active"></div>
        </div>
        <IconByName :name="showFilters ? 'ChevronDown' : 'ChevronRight'" color="light"
          className="text-xl transition-transform duration-300" :class="showFilters ? '' : 'transform rotate-90'" />
      </div>
      <div v-if="showFilters" class="flex flex-col gap-2 mt-2 transition-all duration-300 animate-filters-in">
        <div class="flex flex-col gap-2 mb-2 pb-2 border-b border-border">
          <Button @click="selectAllFrameworks" variant="simple" size="sm"
            class="text-orange font-mono hover:text-orange/80 transition-colors">
            {{ info.selectAll }}
          </Button>
          <Typography variant="FiraCode" as="div" color="light"
            className="text-light/60 font-mono text-xs text-center opacity-60">
            {{frameworks.filter((fw) => fw.checked).length}}/{{ frameworks.length }}
          </Typography>
          <Button @click="deselectAllFrameworks" variant="simple" size="sm"
            class="text-red-400 font-mono hover:text-red-300 transition-colors">
            {{ info.clearAll }}
          </Button>
        </div>

        <section class="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
          <div v-for="fw in frameworks" :key="fw.key"
            class="flex items-center gap-2 cursor-pointer text-light font-mono text-base hover:bg-card/20 p-1 rounded transition-colors"
            @click="toggleFramework(fw)">
            <input type="checkbox" :checked="fw.checked" class="accent-orange w-4 h-4 pointer-events-none" readonly />
            <IconByName :name="fw.icon" color="light" className="text-lg" />
            <Typography variant="FiraCode" as="span" color="light" className="text-sm">
              {{ fw.label }}
            </Typography>
          </div>
        </section>
      </div>
    </aside>
    <section class="flex-1 p-4 overflow-auto">
      <div v-if="filteredProjects.length === 0" class="flex flex-col items-center justify-center h-full text-center">
        <IconByName name="Search" color="light" :size="42" className="mb-4 opacity-50" />
        <Typography variant="FiraCode" as="p" color="light" className="text-xl mb-2">
          {{ info.noProjects }}
        </Typography>
        <Typography variant="FiraCode" as="p" color="light" className="opacity-70 mb-4">
          {{ info.try }}
        </Typography>
        <Button @click="selectAllFrameworks" variant="orange" size="default"
          class="px-4 py-2 rounded font-mono transition-colors mt-4">
          {{ info.showAll }}
        </Button>
      </div>
      <div v-else class="flex flex-wrap gap-5 justify-center">
        <Card v-for="(project, i) in filteredProjects" :key="project.icon + (project.image || project.video)"
          :image="project.image" :video="project.video" :icon="project.icon" :tooltip="project.description"
          ButtonVariant="simple" size="medium" :button="info.viewProject" :url="project.url" :class="[
            'flex-1 min-w-[280px] max-w-[350px] basis-1/3 animate-card-in',
            { [`delay-${i}`]: true },
          ]" :style="{ animationDelay: 0.07 * i + 's' }">
          <template #tags>
            <div class="flex flex-wrap gap-2 mb-2 justify-center">
              <Badge v-for="tech in project.tags" :key="tech" :color="randomColor()"
                className="text-xs px-3 py-1 rounded-se-lg rounded-t-lg font-mono">
                <span class="!text-gray">
                  {{ tech }}
                </span>
              </Badge>
            </div>
          </template>
          <div class="flex flex-col overflow-auto min-h-40">
            <div class="relative flex items-start mb-2">
              <Tooltip :text="project.description" client:only="hover" side="top">
                <Typography variant="mono" as="p" color="muted" caseType="capital"
                  className="description-scroll flex-1">
                  {{ project.description }}
                </Typography>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import Tooltip from "../atoms/Tooltip.vue";
import { onMounted, watch } from "vue";
import Card from "@/components/molecule/Card.vue";
import Typography from "@/components/atoms/Typography.vue";
import IconByName from "@/components/atoms/IconByName.vue";
import Button from "../atoms/Button.vue";
import { usePanelProjects } from "@/composables/panelProjects";
import { frameworks, allProjects } from "@/stores/projects";
import Badge from "../atoms/Badge.vue";
import { useTranslations } from "@/i18n/utils";

const props = defineProps<{
  lang: "en" | "es";
}>()

const { projects: TProjects } = useTranslations(props.lang);
const { info } = TProjects;

const randomColor = () => {
  const colors = ["red", "blue", "green", "yellow", "purple", "pink", "orange", "gray"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const {
  showFilters,
  filteredProjects,
  toggleFramework,
  selectAllFrameworks,
  deselectAllFrameworks,
  saveFiltersToStorage,
  loadFiltersFromStorage,
} = usePanelProjects();

function getFiltersFromUrl() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const filters = params.get('filters');

  if (filters === 'open') showFilters.value = true;
  if (filters === 'closed') showFilters.value = false;

  const fw = params.get('fw');

  if (fw) {
    const active = fw.split(',');
    frameworks.forEach(fwObj => {
      fwObj.checked = active.includes(fwObj.key);
    });
  }
}

function setFiltersInUrl() {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.searchParams.set('filters', showFilters.value ? 'open' : 'closed');

  const activeFw = frameworks.filter(fw => fw.checked).map(fw => fw.key);
  url.searchParams.set('fw', activeFw.join(','));
  window.history.replaceState({}, '', url.toString());
}

watch(
  () => frameworks.map((fw) => fw.checked),
  () => {
    saveFiltersToStorage();
    setFiltersInUrl();
  },
  { deep: true }
);

watch(showFilters, () => {
  setFiltersInUrl();
});

onMounted(() => {
  getFiltersFromUrl();
  loadFiltersFromStorage();
  setFiltersInUrl();
});
</script>

<style scoped>
.description-scroll {
  max-height: 70px;
  overflow-y: auto;
  padding-right: 0.5rem;
}
</style>

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
