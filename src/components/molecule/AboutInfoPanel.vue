<template>
  <div class="flex w-full">
    <aside
      class="w-1/5 min-w-[220px] bg-bg-background border-r border-border flex flex-col gap-4 p-6"
    >
      <div>
        <div class="font-mono text-light text-base mb-2">{{ aboutPanelInfo.personalInfo }}</div>
        <ul>
          <li v-for="folder in folders" :key="folder.key" class="mb-2">
            <button
              @click="toggleFolder(folder.key)"
              class="flex items-center gap-2 text-light hover:text-orange font-mono text-sm w-full text-left"
            >
              <span v-if="folder.open"
                ><IconByName
                  name="FolderOpen"
                  color="light"
                  className="text-xs mb-1 group-hover:text-orange"
              /></span>
              <span v-else
                ><IconByName
                  name="Folder"
                  color="light"
                  className="text-xs mb-1 group-hover:text-orange"
              /></span>
              <span>{{ folder.label }}</span>
            </button>
            <ul v-if="folder.open" class="ml-6 mt-1">
              <li v-for="file in folder.files" :key="file.key" class="mb-2">
                <button
                  @click="selectFileAndSave(file)"
                  class="flex items-center gap-2 text-light hover:text-green font-mono text-base w-full text-left"
                >
                  <IconByName
                    name="FileText"
                    color="light"
                    class="action-btn cursor-pointer"
                    className="text-base mb-1 group-hover:text-green"
                  />
                  <span>{{ file.label }}</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <div class="font-mono text-light text-base mb-2">{{ aboutPanelInfo.contacts }}</div>
        <ul>
          <li
            v-for="contact in contacts"
            :key="contact.type + contact.value"
            class="flex items-center justify-between gap-2 text-light font-mono text-base mb-1"
          >
            <div class="flex items-center gap-2">
              <IconByName
                :name="contact.icon"
                color="light"
                class="action-btn cursor-pointer"
                className="text-base mb-1 group-hover:text-orange"
                :aria-label="getAriaLabel(contact)"
                :title="getTitle(contact)"
                @click="handleContactClick(contact)"
              />
              <span
                class="text-base break-words cursor-pointer"
                @click="handleContactClick(contact)"
              >
                {{ contact.value }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
    <section class="flex-1 p-6">
      <div
        v-if="selectedFile"
        class="bg-card/80 rounded-lg min-h-[300px] overflow-hidden"
      >
        <div class="text-white p-3 font-mono text-sm border-b border-border">
          {{ selectedFile.label }}
        </div>
        <pre
          class="line-numbers m-0 p-4 text-white font-mono text-md overflow-auto !bg-bg max-h-[65vh] w-[82em]"
        >
          <code ref="codeEl" class="language-javascript">{{ selectedFile.content }}</code>
        </pre>
      </div>
      <div
        v-else
        class="flex items-center justify-center h-full text-muted font-mono opacity-60"
      >
        {{ aboutPanelInfo.selectFile }}
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, watch } from "vue";
import IconByName from "../atoms/IconByName.vue";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { folders, contacts } from "@/stores/about";
import { useAboutPanel } from "@/composables/aboutPanel";
import { useTranslations } from "@/i18n/utils";

const props = withDefaults(defineProps<{
  activeDirectory?: string;
  lang?: "en" | "es";
}>(), {
  activeDirectory: "bio",
  lang: "en",
});

const { about: TAbout } = useTranslations(props.lang);
const { aboutPanelInfo } = TAbout;

const {
  toggleFolder,
  selectedFile,
  codeEl,
  selectFile,
  getAriaLabel,
  getTitle,
  handleContactClick,
  saveAboutPanelState,
} = useAboutPanel();

onMounted(() => {
  if (!selectedFile.value) {
    const bioFolder = folders.value.find((f) => f.key === "bio");
    if (bioFolder && bioFolder.files.length > 0) {
      selectFile(bioFolder.files[0]);
      folders.value = folders.value.map(f => ({ ...f, open: f.key === bioFolder.key }));
    }
  }
});

function selectFileAndSave(file) {
  selectFile(file);
  saveAboutPanelState();
}
</script>

<style scoped>
::v-deep .line-numbers .line-numbers-rows {
  margin-left: -100px !important;
  left: -9.8em !important;
}

::v-deep .line-numbers {
  position: relative;
  padding-left: 3.8em;
}

/* Action button styles */
.action-btn {
  @apply inline-flex items-center justify-center p-1 rounded-md border border-transparent hover:bg-white/5 transition;
  width: 2rem;
  height: 2rem;
}

.action-btn:hover svg {
  transform: translateY(-1px);
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
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