<template>
  <div class="flex w-full h-[76dvh] min-h-[76dvh]">
    <aside
      class="flex flex-col items-center gap-6 py-8 px-2 bg-bg-background border-r border-border min-w-[80px] animate-panel-in-left"
    >
      <button
        v-for="panel in panels"
        :key="panel.key"
        :class="[
          'flex flex-col items-center group p-2 rounded-lg transition-all',
          activePanel === panel.key
            ? 'bg-card/80 ring-2 ring-orange'
            : 'hover:bg-card/60',
        ]"
        @click="
          () => {
            activePanel = panel.key;
            onPanelOpen(panel.key);
          }
        "
      >
        <IconByName
          :name="panel.icon"
          color="light"
          class="text-3xl mb-1 group-hover:text-orange"
        />
        <span class="text-xs text-light group-hover:text-orange">{{ panel.label }}</span>
      </button>
    </aside>

    <section
      :class="[
        'flex-1',
        activePanel === 'terminal' ? 'bg-terminal' : 'bg-background',
        'animate-panel-in-up',
      ]"
    >
      <div v-if="activePanel === 'terminal'">
        <div
          ref="terminalEl"
          class="bg-terminal rounded-lg p-4 text-green-400 font-mono max-h-[75dvh] overflow-auto terminal-container"
          @scroll="onTerminalScroll"
        >
          <div class="mb-2">
            <div
              v-for="(line, index) in terminalOutput"
              :key="index"
              class="terminal-line whitespace-pre-wrap"
              :class="{
                'text-blue-300': line.includes('th3mayar@portfolio'),
                'text-green-400':
                  !line.includes('th3mayar@portfolio') &&
                  !line.includes('bash:') &&
                  !isJsonLine(line),
                'text-red-400': line.includes('bash:') || line.includes('not found'),
                'text-yellow-400': line.includes('Welcome') || line.includes('Type'),
                'text-purple-400':
                  line.includes('Available commands') ||
                  line.includes('Keyboard shortcuts'),
                'json-line': isJsonLine(line),
              }"
              :data-indent="isJsonLine(line) ? getIndentLevel(line) : 0"
              v-html="isJsonLine(line) ? formatJsonLine(line) : line"
            ></div>
          </div>
          <div class="flex items-center agnoster-prompt">
            <!-- Agnoster-style prompt -->
            <div class="flex items-center mr-2">
              <span class="text-blue-400 font-bold">th3mayar</span>
              <span class="text-white mx-1">@</span>
              <span class="text-green-400 font-bold">portfolio</span>
              <span class="text-white mx-1">:</span>
              <span class="text-yellow-400 font-bold">~</span>
              <span class="text-blue-400 ml-1">$</span>
            </div>
            <div class="flex-1 relative autocomplete-container">
              <input
                v-model="currentCommand"
                @keydown="handleKeyDown"
                @input="handleInput"
                class="terminal-input flex-1"
                ref="commandInput"
                autofocus
                spellcheck="false"
                autocomplete="off"
                placeholder=""
              />
              <!-- Autocomplete suggestion -->
              <div v-if="autocompleteSuggestion" class="autocomplete-suggestion">
                {{ currentCommand }}{{ autocompleteSuggestion }}
              </div>
              <!-- Tab indicator -->
              <div
                v-if="autocompleteSuggestion"
                class="absolute right-2 top-0 text-xs text-gray-500 animate-pulse pointer-events-none"
              >
                Tab
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activePanel === 'info'">
        <AboutInfoPanel activeDirectory="bio" />
      </div>

      <div v-else-if="activePanel === 'game'">
        <div
          class="bg-background rounded-lg p-6 text-light font-mono min-h-[300px] flex items-center justify-center"
        >
          <span class="opacity-60">[Game Here] Comming Soon!</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import IconByName from "@/components/atoms/IconByName.vue";
import AboutInfoPanel from "@/components/molecule/AboutInfoPanel.vue";
import { useAboutPanel } from "@/composables/aboutPanel";

const {
  activePanel,
  panels,
  terminalOutput,
  currentCommand,
  autocompleteSuggestion,
  commandInput,
  terminalEl,
  onPanelOpen,
  handleKeyDown,
  handleInput,
  onTerminalScroll,
  isJsonLine,
  getIndentLevel,
  formatJsonLine,
} = useAboutPanel();

onMounted(() => {
  if (activePanel.value === "terminal") {
    onPanelOpen("terminal");
  }
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

.agnoster-prompt {
  font-family: "Fira Code", "Source Code Pro", "DejaVu Sans Mono", monospace;
  font-size: 14px;
  line-height: 1.2;
}

.autocomplete-container {
  position: relative;
}

.autocomplete-suggestion {
  position: absolute;
  left: 0;
  top: 0;
  color: #666;
  pointer-events: none;
  z-index: -1;
  white-space: pre;
}

.terminal-input {
  font-family: "Fira Code", "Source Code Pro", "DejaVu Sans Mono", monospace;
  font-size: 14px;
  line-height: 1.2;
  background: transparent;
  border: none;
  outline: none;
  color: #4ade80;
  caret-color: #4ade80;
}

/* Smooth transitions */
.terminal-line {
  transition: all 0.1s ease;
}

/* Highlight current command in history */
.history-highlight {
  background-color: rgba(74, 222, 128, 0.1);
}

/* JSON Syntax Highlighting */
.json-line {
  font-family: "Fira Code", "Source Code Pro", "DejaVu Sans Mono", monospace;
  line-height: 1.4;
  color: #a3e635 !important; /* lime-400, terminal green */
  background: transparent !important;
  padding: 0 4px;
  margin: 0;
  border-radius: 0;
}

.json-green {
  color: #a3e635 !important; /* lime-400, terminal green */
  font-weight: 400;
}

.json-line[data-indent="1"] {
  padding-left: 1rem;
}
.json-line[data-indent="2"] {
  padding-left: 2rem;
}
.json-line[data-indent="3"] {
  padding-left: 3rem;
}
.json-line[data-indent="4"] {
  padding-left: 4rem;
}
</style>
