import { ref } from "vue";
import { getClientLang } from "@/composables/client/getLang";
import { work_experience_en, work_experience_es } from "@/data/experience.json";

let availableFiles = [];

const panels = [
  { key: 'terminal', icon: 'Terminal', label: '' },
  { key: 'info', icon: 'User', label: '' },
  { key: 'game', icon: 'Gamepad', label: '' },
];

const terminalOutput = ref([
  getClientLang() === "en"
    ? '🚀 Welcome to Jose\'s Portfolio Terminal v2.0!'
    : `¡Bienvenido a Jose's Portfolio Terminal v2.0!`,
  getClientLang() === "en"
    ? '💡 Type "help" for commands or "suggest" for autocomplete options'
    : '💡 Escribe «ayuda» para ver los comandos o «sugerir» para ver las opciones de autocompletado.',
  getClientLang() === "en"
    ? '⌨️  Use Tab for autocomplete, ↑/↓ for history navigation'
    : '⌨️  Utiliza la tecla Tab para autocompletar y ↑/↓ para navegar por el historial.',
  ''
]);

const availableCommands = [
  'help', 'ls', 'pwd', 'cat', 'cd', 'nano', 'experience', 'whoami', 'date', 'clear', 'fortune', 'sudo', 'exit', 'history', 'suggest',
];

if (getClientLang() === "en") {
  availableFiles = [
    'about-me.js', 'interests.js', 'high-school.js', 'university.js', 'projects.js', 'skills.js', 'experience.json'
  ];
} else {
  availableFiles = [
    'sobre-mi.js', 'intereses.js', 'bachillerato.js', 'universidad.js', 'habilidades.js', 'experiencia.json'
  ];
}

let folders = ref([]);

if (getClientLang() === "en") {
  folders.value = [
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
          content: JSON.stringify(getClientLang() === "en" ? work_experience_en : work_experience_es, null, 2),
        }
      ],
    },
  ];
} else {
  folders.value = [
    {
      key: "bio",
      label: "biografía",
      open: true,
      files: [
        {
          key: "about-me",
          label: "sobre-mi.js",
          content: `/**

 * Estudiante de Ingeniería en Sistemas apasionado por la tecnología, con años de experiencia en desarrollo.

 * Desarrollador fullstack graduado en Desarrollo y Mantenimiento de Aplicaciones Informáticas y, desde entonces,

 * he estado comprometido con avanzar en el mundo del desarrollo de software a través de constante formación académica

 * y un trabajo dedicado hacia la excelencia. Mi pasión por el desarrollo de interfaces gráficas y experiencia de usuario

 * se refleja en cada proyecto.

 */`,
        },
      ],
    },
    {
      key: "interests",
      label: "intereses",
      open: false,
      files: [
        {
          key: "interests-file",
          label: "intereses.js",
          content: `/**

 * Intereses

 * - Programación
 
 * - Código abierto
 
 * - Videojuegos
 
 * - UI/UX
 
 * - Café
 
 * - Disfrutar tiempo con amigos
 
 * - Comer
 
 * - Escuchar música
 
 * - Inventar cosas nuevas
 
 * - Descubrir cosas nuevas
 
 */`,
        },
      ],
    },
    {
      key: "education",
      label: "educación",
      open: false,
      files: [
        {
          key: "high-school",
          label: "bachillerato.js",
          content: `/**

 * Técnico en Desarrollo y Mantenimiento de Aplicaciones Informáticas

 * IATESA, La Vega, República Dominicana
 
 */`,
        },
        {
          key: "universidad",
          label: "universidad.js",
          content: `/**

 * Universidad
 
 * Estudiante de Ingeniería en Sistemas
 
 * Estudiante de último año de Ingeniería en Sistemas de Computación en UCATECI,
 
 * La Vega, República Dominicana.
 
 * Desde Enero 2022 hasta la actualidad.
 
 */`,
        },
      ],
      experience: [
        {
          "title": "Desarrollador Frontend",
          "company": "Hytech Nexo",
          "type": "Tiempo completo",
          "period": {
            "start": "Mayo 2024",
            "end": "Presente",
            "duration": "1 año 5 meses"
          },
          "location": {
            "city": "Santiago de los Caballeros",
            "address": "Bella Terra Mall, Av. Juan Pablo Duarte",
            "mode": "Presencial"
          },
          "achievements": [
            "Desarrollé funciones personalizadas como un calendario de programación para gestionar visitas de técnicos a los hogares de los clientes, optimizando auditorías y la entrega de servicios.",
            "Me enfoqué en la optimización del frontend migrando los recursos del proyecto Laravel de Webpack a Vite, logrando compilaciones más rápidas, reducción en los tiempos de construcción y mejor rendimiento general.",
            "Refactoricé y mantuve sistemas dinámicos de gestión de roles y permisos (proyecto Gizmo), incluyendo funciones avanzadas como clonación de roles con atributos editables, renderizado dinámico de permisos de módulos y accesos a registros.",
            "Mejoré tablas de datos complejas con AG Grid, incluyendo filtros avanzados (selección simple y múltiple), columnas fijadas, exportación a Excel y capacidades de guardado automático.",
            "Contribuí a mejoras de UI/UX refactorizando el menú lateral con HTML semántico, lógica de acceso basada en roles y optimizaciones de rendimiento.",
            "Colaboré estrechamente con el equipo backend, asegurando soluciones escalables e integración fluida."
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
          "title": "Desarrollador Full-stack",
          "company": "EMEDIA",
          "type": "Tiempo completo",
          "period": {
            "start": "Febrero 2022",
            "end": "Mayo 2024",
            "duration": "2 años 4 meses"
          },
          "location": {
            "city": "La Vega",
            "address": "Las Maras",
            "mode": "Híbrido"
          },
          "achievements": [
            "Lideré el desarrollo de una plataforma completa de eCommerce con módulo de ventas, panel de administración, chat en vivo, notificaciones en tiempo real y filtros de búsqueda avanzados.",
            "Construí y personalicé componentes reutilizables de UI con Next.js 13, Ant Design y Styled Components, creando una experiencia inspirada en Amazon.",
            "Actué como Líder del Equipo Frontend, gestionando tareas con Trello, distribuyendo tickets, mentoreando desarrolladores y estableciendo estándares de código limpio.",
            "Contribuí al desarrollo backend con Nest.js, TypeORM y Oracle DB, incluyendo diseño de APIs, consultas optimizadas y un sistema de notificaciones para usuarios.",
            "Apliqué patrones de diseño y arquitectura modular para garantizar escalabilidad, mantenibilidad y rendimiento a largo plazo.",
            "Integré funcionalidad de chat en tiempo real, mejorando la comunicación entre clientes y administradores de ventas.",
            "Optimizé el rendimiento con refactorización de código, mejoras en consultas y estrategias de carga diferida para tiempos de carga más rápidos."
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
          "title": "Administrador de Sistemas",
          "company": "Yafreisi Comunicaciones",
          "type": "Freelance",
          "period": {
            "start": "Mayo 2020",
            "end": "Mayo 2024",
            "duration": "4 años 1 mes"
          },
          "location": {
            "city": "La Vega",
            "mode": "Remoto"
          },
          "achievements": [
            "Diseñé, desarrollé y mantuve un sistema de gestión de inventario personalizado para una empresa de telecomunicaciones.",
            "Construí la plataforma desde cero utilizando PHP, MySQL, jQuery, AJAX, JavaScript, HTML5 y CSS3, garantizando fiabilidad y usabilidad.",
            "Actué como administrador de sistemas y desarrollador, gestionando mejoras continuas, resolución de problemas y nuevas funcionalidades.",
            "Implementé funciones para gestionar control de stock, seguimiento de ventas y reportes, ayudando a optimizar las operaciones diarias.",
            "Optimicé la base de datos con PhpMyAdmin y apliqué buenas prácticas para mejorar rendimiento y escalabilidad.",
            "Este proyecto se convirtió en mi primer sistema real adoptado por clientes, mejorando significativamente mis habilidades en resolución de problemas, disciplina de codificación y desarrollo full-stack."
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
      label: "habilidades",
      open: false,
      files: [
        {
          key: "skills-file",
          label: "habilidades.js",
          content: `/**

 * Habilidades

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
      label: "experiencia",
      open: false,
      files: [
        {
          key: "experience-file",
          label: "experiencia.json",
          content: JSON.stringify(getClientLang() === "en" ? work_experience_en : work_experience_es, null, 2),
        }
      ],
    }
  ];
}

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