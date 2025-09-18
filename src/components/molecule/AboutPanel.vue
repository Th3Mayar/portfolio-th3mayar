<template>
  <div class="flex w-full h-[75dvh]">
    <aside class="flex flex-col items-center gap-6 py-8 px-2 bg-bg-background border-r border-border min-w-[80px]">
      <button
        v-for="panel in panels"
        :key="panel.key"
        :class="[
          'flex flex-col items-center group p-2 rounded-lg transition-all',
          activePanel === panel.key ? 'bg-card/80 ring-2 ring-orange' : 'hover:bg-card/60'
        ]"
        @click="() => { activePanel = panel.key; onPanelOpen(panel.key); }"
      >
        <IconByName :name="panel.icon" color="light" class="text-3xl mb-1 group-hover:text-orange" />
        <span class="text-xs text-light group-hover:text-orange">{{ panel.label }}</span>
      </button>
    </aside>

    <section class="flex-1">
      <div v-if="activePanel === 'terminal'">
        <div
          ref="terminalEl"
          class="bg-black rounded-lg p-4 text-green-400 font-mono max-h-[75dvh] overflow-auto"
          @scroll="onTerminalScroll"
        >
          <div class="mb-2">
            <div
              v-for="(line, index) in terminalOutput"
              :key="index"
              class="terminal-line whitespace-pre-wrap"
              :class="{
                'text-blue-300': line.includes('th3mayar@portfolio'),
                'text-green-400': !line.includes('th3mayar@portfolio') && !line.includes('bash:'),
                'text-red-400': line.includes('bash:') || line.includes('not found'),
                'text-yellow-400': line.includes('Welcome') || line.includes('Type'),
                'text-purple-400': line.includes('Available commands') || line.includes('Keyboard shortcuts')
              }"
            >
              {{ line }}
            </div>
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
              <div
                v-if="autocompleteSuggestion"
                class="autocomplete-suggestion"
              >
                {{ currentCommand }}{{ autocompleteSuggestion }}
              </div>
              <!-- Tab indicator -->
              <div
                v-if="autocompleteSuggestion"
                class="absolute -right-16 top-0 text-xs text-gray-500 animate-pulse"
              >
                [Tab]
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activePanel === 'info'">
        <AboutInfoPanel activeDirectory="bio" />
      </div>

      <div v-else-if="activePanel === 'game'">
        <div class="bg-background rounded-lg p-6 text-light font-mono min-h-[300px] flex items-center justify-center">
          <span class="opacity-60">[Game Here] Comming Soon!</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import IconByName from '@/components/atoms/IconByName.vue';
import AboutInfoPanel from './AboutInfoPanel.vue';
import experience from '../../../public/data/experience.json';

const activePanel = ref('info');
const panels = [
  { key: 'terminal', icon: 'Terminal', label: '' },
  { key: 'info', icon: 'User', label: '' },
  { key: 'game', icon: 'Gamepad', label: '' },
];

const terminalOutput = ref([
  '🚀 Welcome to Jose\'s Portfolio Terminal v2.0!',
  '💡 Type "help" for commands or "suggest" for autocomplete options',
  '⌨️  Use Tab for autocomplete, ↑/↓ for history navigation',
  ''
]);
const currentCommand = ref('');
const commandInput = ref(null);
const terminalEl = ref(null);

// control de autoscroll
const autoScroll = ref(true);
const SCROLL_NEAR_BOTTOM_THRESHOLD = 40; // px

// Nuevas funcionalidades
const commandHistory = ref([]);
const historyIndex = ref(-1);
const autocompleteSuggestion = ref('');
const isSearching = ref(false);
const searchQuery = ref('');
const searchResults = ref([]);
const searchIndex = ref(-1);

const experienceData = experience;

function scrollToBottom(smooth = false) {
  if (!terminalEl.value) return;
  const el = terminalEl.value;
  if (smooth) {
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  } else {
    el.scrollTop = el.scrollHeight;
  }
}

function onTerminalScroll() {
  const el = terminalEl.value;
  if (!el) return;
  const distanceFromBottom = el.scrollHeight - (el.scrollTop + el.clientHeight);
  autoScroll.value = distanceFromBottom <= SCROLL_NEAR_BOTTOM_THRESHOLD;
}

// Comandos disponibles para autocompletado
const availableCommands = [
  'help', 'ls', 'pwd', 'cat', 'experience', 'whoami', 'date', 'clear', 'fortune', 'sudo', 'exit', 'history', 'suggest'
];

const availableFiles = [
  'about-me.txt', 'projects.txt', 'skills.txt', 'experience.json'
];

// Función de autocompletado
function getAutocompleteSuggestion(cmd) {
  if (!cmd) return '';

  const parts = cmd.split(' ');
  const currentPart = parts[parts.length - 1];

  if (parts.length === 1) {
    // Autocompletar comandos
    const matchingCommands = availableCommands.filter(cmd =>
      cmd.startsWith(currentPart) && cmd !== currentPart
    );
    return matchingCommands.length === 1 ? matchingCommands[0].slice(currentPart.length) : '';
  } else if (parts[0] === 'cat' && parts.length === 2) {
    // Autocompletar archivos para cat
    const matchingFiles = availableFiles.filter(file =>
      file.startsWith(currentPart) && file !== currentPart
    );
    return matchingFiles.length === 1 ? matchingFiles[0].slice(currentPart.length) : '';
  }

  return '';
}

// Función para manejar entrada de texto
function handleInput() {
  autocompleteSuggestion.value = getAutocompleteSuggestion(currentCommand.value);
}

// Función para manejar teclas especiales
function handleKeyDown(event) {
  switch (event.key) {
    case 'Enter':
      executeCommand();
      break;
    case 'Tab':
      event.preventDefault();
      if (autocompleteSuggestion.value) {
        currentCommand.value += autocompleteSuggestion.value;
        autocompleteSuggestion.value = '';
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      navigateHistory('up');
      break;
    case 'ArrowDown':
      event.preventDefault();
      navigateHistory('down');
      break;
    case 'Control':
      // Para búsqueda con Ctrl+R
      if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        startSearch();
      }
      break;
  }
}

// Función para navegar por el historial
function navigateHistory(direction) {
  if (commandHistory.value.length === 0) return;

  if (direction === 'up') {
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++;
      currentCommand.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value];
    }
  } else if (direction === 'down') {
    if (historyIndex.value > 0) {
      historyIndex.value--;
      currentCommand.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value];
    } else if (historyIndex.value === 0) {
      historyIndex.value = -1;
      currentCommand.value = '';
    }
  }

  // Reset autocomplete suggestion when navigating history
  autocompleteSuggestion.value = '';
}

// Función para iniciar búsqueda
function startSearch() {
  isSearching.value = true;
  searchQuery.value = '';
  searchResults.value = commandHistory.value.slice().reverse();
  searchIndex.value = -1;
  pushLine('(reverse-i-search)`\': ');
}

function pushLine(line) {
  terminalOutput.value.push(line);
  nextTick(() => {
    if (autoScroll.value) {
      setTimeout(() => scrollToBottom(), 20);
    }
  });
}

function executeCommand() {
  const cmd = currentCommand.value.trim();
  if (cmd === '') return;

  // Agregar comando al historial (evitar duplicados consecutivos)
  if (commandHistory.value[commandHistory.value.length - 1] !== cmd) {
    commandHistory.value.push(cmd);
  }
  historyIndex.value = -1; // Reset history navigation

  pushLine(`th3mayar@portfolio:~$ ${cmd}`);

  const args = cmd.split(' ');
  const command = args[0].toLowerCase();

  let response = '';

  switch (command) {
    case 'help':
      response = `🚀 Jose's Portfolio Terminal v2.0

📋 Available commands:
  help          - Show this help menu
  ls            - List files in current directory
  pwd           - Print working directory
  cat <file>    - Display file contents
  experience    - Show detailed work experience (JSON)
  whoami        - Show current user
  date          - Show current date/time
  clear         - Clear terminal screen
  fortune       - Get a random fortune message
  history       - Show command history
  suggest       - Show available commands and files
  sudo          - Run command as superuser (limited)
  exit          - Exit terminal (switch to info panel)

⌨️  Keyboard shortcuts:
  Tab           - Autocomplete commands/files
  ↑/↓           - Navigate command history
  Ctrl+R        - Search command history (coming soon)

💡 Pro tip: Type 'suggest' to see all available options!`;
      break;
    case 'ls':
      response = 'about-me.txt  projects.txt  skills.txt  experience.json';
      break;
    case 'pwd':
      response = '/home/th3mayar/portfolio';
      break;
    case 'history':
      response = commandHistory.value.map((cmd, index) =>
        `${String(index + 1).padStart(3, ' ')}  ${cmd}`
      ).join('\n');
      break;
    case 'suggest':
      response = `Available commands: ${availableCommands.join(', ')}\nAvailable files: ${availableFiles.join(', ')}`;
      break;
    case 'cat':
      if (args[1] === 'about-me.txt') {
        response = 'Hello! I\'m Jose, a passionate full-stack developer with experience in modern web technologies.';
      } else if (args[1] === 'projects.txt') {
        response = 'Portfolio Website (Astro + Vue)\nE-commerce Platform (Next.js)\nInventory System (PHP + MySQL)';
      } else if (args[1] === 'skills.txt') {
        response = 'Frontend: Vue.js, React, Next.js\nBackend: Node.js, Nest.js, Laravel\nDatabase: MySQL, PostgreSQL, Oracle\nTools: Git, Docker, Vite';
      } else if (args[1] === 'experience.json') {
        response = JSON.stringify(experienceData, null, 2);
      } else {
        response = `cat: ${args[1]}: No such file or directory`;
      }
      break;
    case 'experience':
      response = JSON.stringify(experienceData, null, 2);
      break;
    case 'whoami':
      response = 'th3mayar';
      break;
    case 'date':
      response = new Date().toString();
      break;
    case 'clear':
      terminalOutput.value = [];
      currentCommand.value = '';
      nextTick(() => {
        if (commandInput.value) commandInput.value.focus();
        autoScroll.value = true;
      });
      return;
    case 'fortune':
      const fortunes = [
        'You will find great success in your coding journey!',
        'A new opportunity will present itself soon.',
        'Your creativity will lead to amazing projects.',
        'Keep learning, the tech world is your oyster!',
        'The best way to predict the future is to create it.',
        'Code is poetry written in logic.',
        'Every expert was once a beginner.'
      ];
      response = fortunes[Math.floor(Math.random() * fortunes.length)];
      break;
    case 'sudo':
      if (args[1] === 'rm' && args[2] === '-rf' && args[3] === '/') {
        response = 'Nice try! But this is a portfolio terminal. You can\'t delete the root filesystem here! 😄';
      } else {
        response = 'sudo: command not found (or you don\'t have permission)';
      }
      break;
    case 'exit':
      activePanel.value = 'info';
      return;
    default:
      response = `bash: ${command}: command not found`;
  }

  if (response) {
    const lines = String(response).split('\n');
    for (const ln of lines) {
      pushLine(ln);
    }
    pushLine('');
  }

  currentCommand.value = '';
  autocompleteSuggestion.value = '';

  nextTick(() => {
    if (commandInput.value) {
      commandInput.value.focus();
    }
  });
}

function onPanelOpen(key) {
  nextTick(() => {
    if (key === 'terminal') {
      autoScroll.value = true;
      scrollToBottom(true);
      if (commandInput.value) commandInput.value.focus();
    }
  });
}

onMounted(() => {
  if (activePanel.value === 'terminal') {
    onPanelOpen('terminal');
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

/* Agnoster-style prompt */
.agnoster-prompt {
  font-family: 'Fira Code', 'Source Code Pro', 'DejaVu Sans Mono', monospace;
  font-size: 14px;
  line-height: 1.2;
}

/* Autocomplete styling */
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

/* Terminal input styling */
.terminal-input {
  font-family: 'Fira Code', 'Source Code Pro', 'DejaVu Sans Mono', monospace;
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
</style>