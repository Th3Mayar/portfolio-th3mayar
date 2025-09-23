import { nextTick } from "vue";
import { ref } from "vue";
import { getClientLang } from "@/composables/client/getLang";
import { work_experience_en, work_experience_es } from "@/data/experience.json";
import { availableCommands, availableFiles, panels, terminalOutput, folders } from "@/stores/about";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

const activePanel = ref('info'),

    currentCommand = ref(''),
    commandInput = ref(null),
    terminalEl = ref(null),

    // control of autoscroll
    autoScroll = ref(true),
    SCROLL_NEAR_BOTTOM_THRESHOLD = 40, // px

    commandHistory = ref([]),
    historyIndex = ref(-1),
    autocompleteSuggestion = ref(''),
    isSearching = ref(false),
    searchQuery = ref(''),
    searchResults = ref([]),
    searchIndex = ref(-1),

    experienceData = ref(getClientLang() === "en"
        ? work_experience_en
        : work_experience_es),

    selectedFile = ref(null),
    codeEl = ref(null);

function scrollToBottom(smooth = false) {
    if (!terminalEl.value) return;
    const el = terminalEl.value;
    if (smooth) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    } else {
        el.scrollTop = el.scrollHeight;
    }
}

const isJsonLine = (line: string) => {
    const trimmed = line.trim();
    return trimmed.startsWith('{') ||
        trimmed.startsWith('}') ||
        trimmed.startsWith('[') ||
        trimmed.startsWith(']') ||
        trimmed.includes('":') ||
        trimmed.includes('",') ||
        /^\s*"[^"]*":\s*".*"/.test(line) ||
        /^\s*"[^"]*":\s*\d+/.test(line) ||
        /^\s*"[^"]*":\s*\d+\.\d+/.test(line) ||
        /^\s*"[^"]*":\s*(true|false|null)/.test(line) ||
        /^\s*"[^"]*":\s*\[/.test(line) ||
        /^\s*"[^"]*":\s*\{/.test(line);
};

const getIndentLevel = (line) => {
    const match = line.match(/^(\s*)/);
    return Math.floor((match ? match[1].length : 0) / 2);
};

const formatJsonLine = (line) => {
    if (!isJsonLine(line)) return line;
    return line
        .replace(/"([^"]+)":/g, '<span class="json-green">"$1"</span>:')
        .replace(/:\s*"([^"]*)"/g, ': <span class="json-green">"$1"</span>')
        .replace(/:\s*(-?\d+(\.\d+)?)/g, ': <span class="json-green">$1</span>')
        .replace(/:\s*(true|false|null)/g, ': <span class="json-green">$1</span>')
        .replace(/([\{\[\]\},])/g, '<span class="json-green">$1</span>');
};

function onTerminalScroll() {
    const el = terminalEl.value;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - (el.scrollTop + el.clientHeight);
    autoScroll.value = distanceFromBottom <= SCROLL_NEAR_BOTTOM_THRESHOLD;
}

function getAutocompleteSuggestion(cmd) {
    if (!cmd) return '';

    const parts = cmd.split(' ');
    const currentPart = parts[parts.length - 1];

    if (parts.length === 1) {
        const matchingCommands = availableCommands.filter(cmd =>
            cmd.startsWith(currentPart) && cmd !== currentPart
        );
        return matchingCommands.length === 1 ? matchingCommands[0].slice(currentPart.length) : '';
    } else if ((parts[0] === 'cat' || parts[0] === 'cd' || parts[0] === 'nano') && parts.length === 2) {
        const matchingFiles = availableFiles.filter(file =>
            file.startsWith(currentPart) && file !== currentPart
        );
        return matchingFiles.length === 1 ? matchingFiles[0].slice(currentPart.length) : '';
    }

    return '';
}

function handleInput() {
    autocompleteSuggestion.value = getAutocompleteSuggestion(currentCommand.value);
}

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
            if (event.ctrlKey && event.key === 'r') {
                event.preventDefault();
                startSearch();
            }
            break;
    }
}

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

    autocompleteSuggestion.value = '';
}

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

    if (commandHistory.value[commandHistory.value.length - 1] !== cmd) {
        commandHistory.value.push(cmd);
    }
    
    historyIndex.value = -1; // Reset history navigation

    pushLine(`th3mayar@${getClientLang() === "en" ? "portfolio" : "portafolio"}:~$ ${cmd}`);

    const args = cmd.split(' ');
    const command = args[0].toLowerCase();

    let response = '';


    switch (command) {
        case 'help':
            response = getClientLang() === "en"
                ? `🚀 Jose's Portfolio Terminal v2.0

📋 Available commands:
  help          - Show this help menu
  ls            - List files in current directory
  pwd           - Print working directory
  cat <file>    - Display file contents
  cd <file>     - Change to file and display contents
  nano <file>   - Open file in nano editor (read-only)
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

💡 Pro tip: Type 'suggest' to see all available options!`
                : `🚀 Terminal de Portafolio de Jose v2.0

📋 Comandos disponibles:
  help          - Muestra este menú de ayuda
  ls            - Lista archivos en el directorio actual
  pwd           - Muestra el directorio de trabajo
  cat <archivo> - Muestra el contenido de un archivo
  cd <archivo>  - Cambia a un archivo y muestra su contenido
  nano <archivo>- Abre archivo en nano (solo lectura)
  experience    - Muestra experiencia laboral (JSON)
  whoami        - Muestra el usuario actual
  date          - Muestra fecha/hora actual
  clear         - Limpia la terminal
  fortune       - Mensaje aleatorio
  history       - Historial de comandos
  suggest       - Comandos y archivos disponibles
  sudo          - Ejecuta como superusuario (limitado)
  exit          - Salir de la terminal (panel info)

⌨️  Atajos de teclado:
  Tab           - Autocompletar comandos/archivos
  ↑/↓           - Navegar historial de comandos
  Ctrl+R        - Buscar en historial (próximamente)

💡 Consejo: Escribe 'suggest' para ver todas las opciones!`;
            break;
        case 'ls':
            response = availableFiles.join('  ');
            break;
        case 'pwd':
            response = `/home/th3mayar/${getClientLang() === "en" ? "portfolio" : "portafolio"}`;
            break;
        case 'history':
            response = commandHistory.value.map((cmd, index) =>
                `${String(index + 1).padStart(3, ' ')}  ${cmd}`
            ).join('\n');
            break;
        case 'suggest':
            response = getClientLang() === "en"
                ? `Available commands: ${availableCommands.join(', ')}\nAvailable files: ${availableFiles.join(', ')}`
                : `Comandos disponibles: ${availableCommands.join(', ')}\nArchivos disponibles: ${availableFiles.join(', ')}`;
            break;
        case 'cat': {
            let foundFile = null;
            for (const folder of folders.value) {
                foundFile = folder.files.find(f => f.label === args[1]);
                if (foundFile) break;
            }
            if (foundFile) {
                response = foundFile.content;
            } else if (args[1] === `${getClientLang() === "en" ? "projects.js" : "proyectos.js"}`) {
                response = getClientLang() === "en"
                    ? 'Portfolio Website (Astro + Vue)\nE-commerce Platform (Next.js)\nInventory System (PHP + MySQL)'
                    : 'Sitio Web de Portafolio (Astro + Vue)\nPlataforma E-commerce (Next.js)\nSistema de Inventario (PHP + MySQL)';
            } else if (args[1] === 'experience.json') {
                response = JSON.stringify(experienceData, null, 2);
            } else {
                response = getClientLang() === "en"
                    ? `cat: ${args[1]}: No such file or directory`
                    : `cat: ${args[1]}: No existe el archivo o directorio`;
            }
            break;
        }
        case 'cd':
            if (args[1]) {
                const fileName = args[1];
                let foundFile = null;
                for (const folder of folders.value) {
                    foundFile = folder.files.find(f => f.label.trim().toLowerCase() === fileName.trim().toLowerCase());
                    if (foundFile) break;
                }
                if (foundFile) {
                    selectedFile.value = foundFile;
                    response = foundFile.content;
                } else {
                    response = getClientLang() === "en"
                        ? `cd: ${fileName}: No such file or directory`
                        : `cd: ${fileName}: No existe el archivo o directorio`;
                }
            } else {
                response = getClientLang() === "en"
                    ? 'cd: missing operand'
                    : 'cd: falta operando';
            }
            break;
        case 'nano':
            if (args[1]) {
                const fileName = args[1];
                let foundFile = null;
                for (const folder of folders.value) {
                    foundFile = folder.files.find(f => f.label === fileName);
                    if (foundFile) break;
                }
                if (foundFile) {
                    response = getClientLang() === "en"
                        ? `GNU nano 7.2    ${fileName}\n\n${foundFile.content}\n\n[ Read Only ]`
                        : `GNU nano 7.2    ${fileName}\n\n${foundFile.content}\n\n[ Solo lectura ]`;
                } else if (args[1] === 'projects.js') {
                    response = getClientLang() === "en"
                        ? `GNU nano 7.2    projects.js\n\nPortfolio Website (Astro + Vue)\nE-commerce Platform (Next.js)\nInventory System (PHP + MySQL)\n\n[ Read Only ]`
                        : `GNU nano 7.2    projects.js\n\nSitio Web de Portafolio (Astro + Vue)\nPlataforma E-commerce (Next.js)\nSistema de Inventario (PHP + MySQL)\n\n[ Solo lectura ]`;
                } else if (args[1] === 'experience.json') {
                    response = getClientLang() === "en"
                        ? `GNU nano 7.2    experience.json\n\n${JSON.stringify(experienceData, null, 2)}\n\n[ Read Only ]`
                        : `GNU nano 7.2    experience.json\n\n${JSON.stringify(experienceData, null, 2)}\n\n[ Solo lectura ]`;
                } else {
                    response = getClientLang() === "en"
                        ? `nano: ${fileName}: No such file or directory`
                        : `nano: ${fileName}: No existe el archivo o directorio`;
                }
            } else {
                response = getClientLang() === "en"
                    ? 'nano: missing operand'
                    : 'nano: falta operando';
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
        case 'fortune': {
            const fortunes = getClientLang() === "en"
                ? [
                    'You will find great success in your coding journey!',
                    'A new opportunity will present itself soon.',
                    'Your creativity will lead to amazing projects.',
                    'Keep learning, the tech world is your oyster!',
                    'The best way to predict the future is to create it.',
                    'Code is poetry written in logic.',
                    'Every expert was once a beginner.'
                ]
                : [
                    '¡Encontrarás mucho éxito en tu camino como programador!',
                    'Pronto se presentará una nueva oportunidad.',
                    'Tu creatividad te llevará a grandes proyectos.',
                    '¡Sigue aprendiendo, el mundo tech es tuyo!',
                    'La mejor forma de predecir el futuro es crearlo.',
                    'El código es poesía escrita en lógica.',
                    'Todo experto fue alguna vez principiante.'
                ];
            response = fortunes[Math.floor(Math.random() * fortunes.length)];
            break;
        }
        case 'sudo':
            if (args[1] === 'rm' && args[2] === '-rf' && args[3] === '/') {
                response = getClientLang() === "en"
                    ? "Nice try! But this is a portfolio terminal. You can't delete the root filesystem here! 😄"
                    : "¡Buen intento! Pero esta es una terminal de portafolio. ¡No puedes borrar el sistema aquí! 😄";
            } else {
                response = getClientLang() === "en"
                    ? "sudo: command not found (or you don't have permission)"
                    : "sudo: comando no encontrado (o no tienes permiso)";
            }
            break;
        case 'exit':
            activePanel.value = 'info';
            return;
        default:
            response = getClientLang() === "en"
                ? `bash: ${command}: command not found`
                : `bash: ${command}: comando no encontrado`;
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

// sanitize phone number to digits + optional leading +
function sanitizePhone(phone) {
    if (!phone) return "";
    const plus = phone.trim().startsWith("+") ? "+" : "";
    const digits = phone.replace(/[^\d]/g, "");
    return plus + digits;
}

// action: call phone number
function callNumber(phone) {
    const sanitized = sanitizePhone(phone);
    if (!sanitized) return;
    window.open(`tel:${sanitized}`, "_self");
}

// action: send email with subject/body template
function sendEmail(email) {
    if (!email) return;
    const subject = encodeURIComponent("Hello 👋");
    const body = encodeURIComponent("Hi,\n\nI wanted to get in touch with you.\n\n—");
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
}

function toggleFolder(key) {
    folders.value = folders.value.map((f) => (f.key === key ? { ...f, open: !f.open } : f));
}

function selectFile(file) {
    selectedFile.value = file;
    nextTick(() => {
        if (codeEl.value) {
            Prism.highlightElement(codeEl.value);
        }
    });
}

// Helpers for contact rendering
function getAriaLabel(contact) {
    if (contact.type === 'email') return getClientLang() === "en" ? `Send email to ${contact.value}` : `Enviar correo a ${contact.value}`;
    if (contact.type === 'phone') return getClientLang() === "en" ? `Call ${contact.value}` : `Llamar a ${contact.value}`;
    return getClientLang() === "en" ? `Open ${contact.type}: ${contact.value}` : `Abrir ${contact.type}: ${contact.value}`;
}

function getTitle(contact) {
    if (contact.type === 'email') return getClientLang() === "en" ? 'Send email' : 'Enviar correo';
    if (contact.type === 'phone') return getClientLang() === "en" ? 'Call' : 'Llamar';
    return getClientLang() === "en" ? `Open ${contact.type}` : `Abrir ${contact.type}`;
}

function handleContactClick(contact) {
    if (contact.type === 'email') {
        sendEmail(contact.value);
    } else if (contact.type === 'phone') {
        callNumber(contact.value);
    } else {
        // For other types, open in new tab with https if not present
        let url = contact.value;
        if (!/^https?:\/\//i.test(url)) {
            if (contact.type === 'github') url = 'https://' + (url.startsWith('github.com') ? url : 'github.com/' + url);
            else if (contact.type === 'linkedin') url = 'https://' + (url.startsWith('linkedin.com') ? url : 'linkedin.com/' + url);
            else if (contact.type === 'wakatime') url = 'https://' + (url.startsWith('wakatime.com') ? url : 'wakatime.com/' + url);
            else if (contact.type === 'instagram') url = 'https://' + (url.startsWith('instagram.com') ? url : 'instagram.com/' + url);
            else url = 'https://' + url;
        }
        window.open(url, '_blank');
    }
}

export function useAboutPanel() {
    return {
        panels,
        activePanel,
        terminalOutput,
        currentCommand,
        commandInput,
        terminalEl,
        autoScroll,
        autocompleteSuggestion,
        isSearching,
        searchQuery,
        searchResults,
        searchIndex,
        experienceData,
        onTerminalScroll,
        handleInput,
        handleKeyDown,
        executeCommand,
        onPanelOpen,
        formatJsonLine,
        getIndentLevel,
        isJsonLine,
        selectedFile,
        codeEl,
        toggleFolder,
        selectFile,
        getAriaLabel,
        getTitle,
        handleContactClick
    };
}