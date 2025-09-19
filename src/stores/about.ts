import { ref } from "vue";

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

const availableCommands = [
  'help', 'ls', 'pwd', 'cat', 'experience', 'whoami', 'date', 'clear', 'fortune', 'sudo', 'exit', 'history', 'suggest'
];

const availableFiles = [
  'about-me.txt', 'projects.txt', 'skills.txt', 'experience.json'
];

const folders = ref([
  {
    key: "bio",
    label: "bio",
    open: true,
    files: [
      {
        key: "about-me",
        label: "about-me.js",
        content: `/**

 * Systems Engineering student passionate about technology with years of experience in development

 * fullstack graduated in Development and Maintenance of Computer Applications and since then, I have been

 * committed to advancing in the world of software development through constant academic training and dedicated

 * work towards excellence. My passion for GUI and UX development is reflected in every project.

 */`,
      },
    ],
  },
  {
    key: "interests",
    label: "interests",
    open: false,
    files: [
      {
        key: "interests-file",
        label: "interests.js",
        content: `/**

 * Interests

 * - Coding

 * - Open Source

 * - Gaming

 * - UI/UX

 * - Coffee

 * - Enjoying time with friends

 * - Eating

 * - Listening to music

 * - Inventing new things

 * - Discovering new things

 */`,
      },
    ],
  },
  {
    key: "education",
    label: "education",
    open: false,
    files: [
      {
        key: "high-school",
        label: "high-school.js",
        content: `/**

 * Technician in Development and Maintenance of Computer Applications

 * IATESA, La Vega, Dominican Republic

 */
`,
      },
      {
        key: "university",
        label: "university.js",
        content: `/**

 * University

 * Systems Engineering Student

 * Senior year student of Computer Systems Engineering at UCATECI,

 * La Vega, Dominican Republic.

 * From January 2022 to the present.

 */
`,
      },
    ],
  },
]);

const contacts = ref([
  { type: "email", value: "josehenriquez.02.26@gmail.com", icon: "Mail" },
  { type: "phone", value: "+1(###) ###-####", icon: "Phone" },
  { type: "github", value: "github.com/Th3Mayar", icon: "Github" },
  { type: "linkedin", value: "linkedin.com/in/jose-fhenríquez", icon: "Linkedin" },
  { type: "wakatime", value: "wakatime.com/th3mayar", icon: "Code" },
  { type: "instagram", value: "instagram.com/jose_f.ma", icon: "Instagram" },
]);

export {
    panels,
    terminalOutput,
    availableCommands,
    availableFiles,
    folders,
    contacts
}