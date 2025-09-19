import { ref } from "vue";
import { work_experience } from "@/data/experience.json";

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
  'help', 'ls', 'pwd', 'cat', 'cd', 'experience', 'whoami', 'date', 'clear', 'fortune', 'sudo', 'exit', 'history', 'suggest',
];

const availableFiles = [
  'about-me.js', 'interests.js', 'high-school.js', 'university.js', 'projects.js', 'skills.js', 'experience.json'
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
    experience: [
      {
        "title": "Frontend Developer",
        "company": "Hytech Nexo",
        "type": "Full-time",
        "period": {
          "start": "May 2024",
          "end": "Present",
          "duration": "1 yr 5 mos"
        },
        "location": {
          "city": "Santiago de los Caballeros",
          "address": "Bella Terra Mall, Av. Juan Pablo Duarte",
          "mode": "On-site"
        },
        "achievements": [
          "Developed custom features such as a scheduling calendar to manage technicians’ visits to customers’ homes, streamlining audits and service delivery.",
          "Focused on frontend optimization by migrating the Laravel project’s frontend resources from Webpack to Vite, achieving faster builds, reduced compile times, and improved overall performance.",
          "Refactored and maintained dynamic role and permission management systems (Gizmo project), including advanced features such as role cloning with editable attributes, dynamic rendering of module permissions, and record accesses.",
          "Enhanced complex data grids with AG Grid, including advanced filtering (single & multi-select), pinned columns, Excel export, and auto-save capabilities.",
          "Contributed to UI/UX improvements by refactoring the sidebar menu with semantic HTML, role-based access logic, and performance optimizations.",
          "Collaborated closely with the backend team, ensuring scalable solutions and seamless integration."
        ],
        "skills": [
          "Vue.js",
          "AG Grid",
          "Vite",
          "Laravel",
          "Git"
        ]
      },
      {
        "title": "Full-stack Developer",
        "company": "EMEDIA",
        "type": "Full-time",
        "period": {
          "start": "Feb 2022",
          "end": "May 2024",
          "duration": "2 yrs 4 mos"
        },
        "location": {
          "city": "La Vega",
          "address": "Las Maras",
          "mode": "Hybrid"
        },
        "achievements": [
          "Led the development of a complete eCommerce platform with sales module, admin dashboard, live chat, real-time notifications, and advanced search filters.",
          "Built and customized reusable UI components with Next.js 13, Ant Design, and Styled Components, creating an Amazon-inspired user experience.",
          "Acted as Frontend Team Lead, managing tasks with Trello, distributing tickets, mentoring developers, and setting clean code standards.",
          "Contributed to backend development using Nest.js, TypeORM, and Oracle DB, including API design, optimized queries, and a user notification system.",
          "Applied design patterns and modular architecture to ensure scalability, maintainability, and long-term performance.",
          "Integrated real-time chat functionality, improving communication between customers and sales admins.",
          "Optimized performance with code refactoring, query improvements, and lazy loading strategies for faster page loads."
        ],
        "skills": [
          "React.js",
          "Next.js",
          "Nest.js",
          "Oracle DB",
          "TypeORM",
          "Styled Components",
          "Ant Design",
          "Git"
        ]
      },
      {
        "title": "System Administrator",
        "company": "Yafreisi Comunicaciones",
        "type": "Freelance",
        "period": {
          "start": "May 2020",
          "end": "May 2024",
          "duration": "4 yrs 1 mo"
        },
        "location": {
          "city": "La Vega",
          "mode": "Remote"
        },
        "achievements": [
          "Designed, developed, and maintained a custom inventory management system for a telecommunications company.",
          "Built the platform from scratch using PHP, MySQL, jQuery, AJAX, JavaScript, HTML5, and CSS3, ensuring reliability and usability.",
          "Acted as both system administrator and developer, handling ongoing improvements, troubleshooting, and feature enhancements.",
          "Implemented features to manage stock control, sales tracking, and reporting, helping streamline daily business operations.",
          "Optimized the database with PhpMyAdmin and applied best practices to improve performance and scalability.",
          "This project became my first real-world system adopted by clients, significantly improving my problem-solving, coding discipline, and full-stack development skills."
        ],
        "skills": [
          "PHP",
          "MySQL",
          "PhpMyAdmin",
          "jQuery",
          "AJAX",
          "JavaScript",
          "HTML5",
          "CSS3"
        ]
      }
    ],
  },
  {
    key: "skills",
    label: "skills",
    open: false,
    files: [
      {
        key: "skills-file",
        label: "skills.js",
        content: `/**

 * Skills

 * - JavaScript

 * - TypeScript

 * - Vue.js

 * - React

 * - Next.js

 * - Node.js

 * - PHP

 * - MySQL

 * - PostgreSQL

 * - Oracle

 * - Git

 * - Docker

 * - Vite

 * - Nuxt

 * - MongoDB

 * - GraphQL

 * - NodeJS

 * - Express

 */`,
      },
    ],
  },
  {
    key: "experience",
    label: "experience",
    open: false,
    files: [
      {
        key: "experience-file",
        label: "experience.json",
        content: JSON.stringify(work_experience, null, 2),
      }
    ],
  },
]);

const contacts = ref([
  { type: "email", value: "josehenriquez.02.26@gmail.com", icon: "Mail" },
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