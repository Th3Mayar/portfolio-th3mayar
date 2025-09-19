import { reactive } from "vue";

const frameworks = reactive([
  { key: "react", label: "React", icon: "React", checked: true },
  { key: "mongodb", label: "MongoDB", icon: "Database", checked: true },
  { key: "HTML", label: "HTML5", icon: "HTML", checked: true },
  { key: "CSS", label: "CSS3", icon: "CSS", checked: true },
  { key: "JavaScript", label: "JavaScript", icon: "JavaScript", checked: true },
  { key: "vue", label: "Vue", icon: "Vue", checked: true },
  { key: "nuxt", label: "Nuxt", icon: "Box", checked: true },
  { key: "node", label: "Node.js", icon: "NodeJs", checked: true },
  { key: "express", label: "Express", icon: "Server", checked: true },
  { key: "mysql", label: "MySQL", icon: "Database", checked: true },
  { key: "tailwind", label: "TailwindCSS", icon: "Tailwind", checked: true },
  { key: "php", label: "PHP", icon: "PHP", checked: true },
  { key: "jquery", label: "JQuery", icon: "JQuery", checked: true },
  { key: "astro", label: "Astro", icon: "Astro", checked: true },
  { key: "TypeScript", label: "TypeScript", icon: "TypeScript", checked: true },
  { key: "PostgreSQL", label: "PostgreSQL", icon: "Database", checked: true },
  { key: "Next.js", label: "Next.js", icon: "NextJs", checked: true },
  { key: "groq", label: "GROQ", icon: "Database", checked: true },
  { key: "supabase", label: "Supabase", icon: "Database", checked: true },
  { key: "shadcn-vue", label: "Shadcn Vue", icon: "Component", checked: true },
  { key: "Redux Toolkit", label: "Redux Toolkit", icon: "State", checked: true },
  { key: "Framer Motion", label: "Framer Motion", icon: "Animation", checked: true },
  { key: "Bun", label: "Bun", icon: "Package", checked: true },
  { key: "ThreeJs", label: "Three.js", icon: "ThreeJs", checked: true },
  { key: "GraphQL", label: "GraphQL", icon: "GraphQL", checked: true },
  { key: "C#", label: "C#", icon: "CSharp", checked: true },
  { key: "Python", label: "Python", icon: "Python", checked: true },
]);

const allProjects = [
  {
    image: "codesys",
    icon: "php",
    description:
      "Codesys is a web-based code snippet manager that allows users to save, organize, and share code snippets in various programming languages. It features a user-friendly interface with syntax highlighting, tagging, and search functionality for easy retrieval of snippets. Built with PHP, jQuery, and MySQL.",
    tags: ["php", "jquery", "mysql"],
    url: "",
  },
  {
    image: "saborApp",
    icon: "nuxt",
    description:
      "saborApp is a restaurant reservation application built as a monorepo containing both frontend and backend. The frontend is developed with Nuxt 3, Vue.js, and Tailwind CSS, while the backend is powered by Node.js, Express, and PostgreSQL.",
    tags: ["nuxt", "vue", "tailwind", "node", "express", "PostgreSQL"],
    url: "",
  },
  {
    image: "rescueTrack",
    icon: "nuxt",
    description:
      "RescueTrack is a management platform for towing and roadside assistance services in the Dominican Republic. It connects drivers in vehicle emergencies with reliable providers across the country. Users can share their current location or manually enter an address to request quick and secure assistance. Stack: Nuxt, Node.js, MongoDB.",
    tags: [
      "nuxt",
      "vue",
      "supabase",
      "groq",
      "tailwind",
      "shadcn-vue",
      "lucide-vue-next",
    ],
    url: "",
  },
  {
    image: "priceNotify",
    icon: "vue",
    description:
      "PriceNotify is a web application that allows users to track product prices on e-commerce websites and receive notifications when prices drop. Built with React.js, Tailwind CSS, Node.js, Express, and MongoDB.",
    tags: ["react", "tailwind", "node", "express", "mongodb"],
    url: "",
  },
  {
    image: "luffyGear4",
    icon: "html",
    description:
      "Epic animation inspired by Luffy Gear 4. Built with HTML, CSS and JavaScript, featuring effects and SoundCloud integration.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "",
  },
  {
    image: "writePhrase",
    icon: "astro",
    description:
      "Game Write Phrase is a fun typing challenge game built with Astro, React, and TypeScript. The goal is to type the displayed phrase as quickly and accurately as possible to earn points and unlock new levels. The project follows a modular structure with Astro pages, reusable React components, and TypeScript stores for state management.",
    tags: ["astro", "react", "TypeScript", "JavaScript"],
    url: "",
  },
  {
    image: "palomoOfMonth",
    icon: "nuxt",
    description:
      "Palomo of the Month is a Nuxt 3 application designed to recognize the outstanding palomo of the month through a comprehensive voting and management system. It features a modern UI with shadcn-vue components, dark/light theme support, secure authentication, responsive design, and customizable settings for themes, colors, and preferences. Built for optimal performance with Nuxt 3 and TypeScript.",
    tags: ["nuxt", "tailwind", "shadcn-vue", "TypeScript", "Bun"],
    url: "",
  },
  {
    image: "gridOrFlex",
    icon: "react",
    description:
      "gridOrFlex is a dynamic UI feature that allows switching between Grid and Flex views in a user list, enhancing the user experience by adapting the layout as needed. It uses Redux for global state management, Framer Motion for smooth transitions, and is designed to be reusable in any list component. Built with React and Next.js.",
    tags: ["react", "Next.js", "Redux Toolkit", "Framer Motion"],
    url: "",
  },
  {
    image: "",
    gif: "FractalMetamorphosis2D",
    icon: "react",
    description:
      "Fractal Metamorphosis 2D with three.js and Astro An animated fractal transformation visualizer that morphs between different fractal patterns in a 2D space, creating mesmerizing visual effects. Built with React, Three.js, and Tailwind CSS.",
    tags: ["ThreeJs", "Css", "JavaScript"],
    url: "",
  },
  {
    image: "api",
    icon: "js",
    description:
      "API for PriceNotify, a web application that allows users to track product prices on e-commerce websites and receive notifications when prices drop. Built with Node.js, Express, and MongoDB.",
    tags: ["node", "express", "mongodb", "JavaScript", "TypeScript", "GraphQL"],
    url: "",
  },
  {
    image: "api",
    icon: "js",
    description:
      "This project is a web scraping script designed to extract and process product information from online sales platforms such as eBay. It allows developers to obtain detailed product data and apply custom logic to highlight products with specific alerts.",
    tags: ["HTML", "tailwind", "CSS"],
    url: "",
  },
  {
    image: "factuStock1",
    carousel: ["factuStock1", "factuStock2", "factuStock3", "factuStock4"],
    icon: "csharp",
    description:
      "A visually appealing card component with interactive effects, built using HTML and CSS. The card features hover animations, shadows, and responsive design to enhance user engagement.",
    tags: ["HTML", "CSS"],
    url: "",
  },
  {
    image: "gestorPass",
    icon: "python",
    description:
      "This program is a password manager that creates and saves passwords from a series of options that you can alter to obtain more secure passwords.",
    tags: ["python"],
    url: "",
  },
  {
    image: "encryptText",
    icon: "python",
    description:
      "This tool allows users to encrypt and decrypt text messages securely using the cryptography library. The application provides a simple interface for encrypting text, saving the encrypted data, and decrypting it with authorization.",
    tags: ["python"],
    url: "",
  }
];

export { frameworks, allProjects };