import { reactive } from "vue";
import { getClientLang } from "@/core/helper/getLang";

const frameworks = reactive([
  { key: "react", label: "React", icon: "React", checked: true },
  { key: "mongodb", label: "MongoDB", icon: "Database", checked: true },
  { key: "HTML", label: "HTML5", icon: "HTML", checked: true },
  { key: "CSS", label: "CSS3", icon: "CSS", checked: true },
  { key: "JavaScript", label: "JavaScript", icon: "JavaScript", checked: true },
  { key: "vue", label: "Vue", icon: "Vue", checked: true },
  { key: "nuxt", label: "Nuxt", icon: "Box", checked: true },
  { key: "node", label: "Node.js", icon: "NodeJs", checked: true },
  { key: "Golang", label: "Go", icon: "Go", checked: true },
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
  { key: "sql-server", label: "SQL Server", icon: "Database", checked: true },
  { key: "N-tier", label: "N-tier Architecture", icon: "Architecture", checked: true },
  { key: "Tkinter", label: "Tkinter", icon: "GUI", checked: true },
  { key: "Cryptography", label: "Cryptography", icon: "Security", checked: true },
  { key: "SQLite", label: "SQLite", icon: "Database", checked: true },
  { key: "GUI", label: "GUI", icon: "GUI", checked: true },
  { key: "winforms", label: "WinForms", icon: "Windows", checked: true },
  { key: "Socket", label: "Socket", icon: "Network", checked: true },
  { key: "svelte", label: "Svelte", icon: "Svelte", checked: true },
  { key: "sveltekit", label: "SvelteKit", icon: "Svelte", checked: true },
  { key: "strapi", label: "Strapi", icon: "CMS", checked: true },
  { key: "vite", label: "Vite", icon: "Vite", checked: true },
  { key: "supabase", label: "Supabase", icon: "Database", checked: true },
  { key: "vercel", label: "Vercel", icon: "Cloud", checked: true },
  { key: "render", label: "Render", icon: "Cloud", checked: true },
  { key: "aws", label: "AWS", icon: "Cloud", checked: true },
  { key: "cloudflare", label: "Cloudflare", icon: "Cloud", checked: true },
  { key: "zustand", label: "Zustand", icon: "State", checked: true },
  { key: "tanstack-query", label: "TanStack Query", icon: "State", checked: true },
  { key: "react-query", label: "React Query", icon: "State", checked: true },
  { key: "websockets", label: "WebSockets", icon: "Network", checked: true },
  { key: "pwa", label: "PWA", icon: "Mobile", checked: true },
  { key: "edge-functions", label: "Edge Functions", icon: "Cloud", checked: true },
  { key: "web-development", label: "Web Development", icon: "Web", checked: true },
  { key: "tech-stacks", label: "Tech Stacks", icon: "Stack", checked: true },
  { key: "rag", label: "RAG", icon: "AI", checked: true },
  { key: "embeddings", label: "Embeddings", icon: "AI", checked: true },
  { key: "vector-databases", label: "Vector Databases", icon: "Database", checked: true },
  ]);

let allProjects = [];

if (getClientLang() === "en") {
  allProjects = [
    {
      image: "stackAtlas",
      icon: "nuxt",
      description:
        "StackAtlas is a modern web platform dedicated to exploring and comparing real-world technology stacks used to build modern applications. It provides structured guides, stack breakdowns, comparisons, and roadmaps to help developers choose the right technologies for their projects. The platform focuses on practical use cases such as portfolios, SaaS apps, landing pages, blogs, and full-stack applications.",
      tags: ["nuxt", "strapi", "vue", "javascript", "vercel"],
      url: "https://www.stackatlas.blog",
    },
    {
      image: "teamsync",
      icon: "nuxt",
      description:
        "TeamSync is an AI-powered collaborative learning platform designed to help students study, create, and collaborate in real time. It combines live chat, intelligent document organization, and generative AI tools to transform study materials into summaries, flashcards, and quizzes instantly. The platform enables teams of students to share knowledge, manage documents, and accelerate learning through interactive study spaces.",
      tags: ["nuxt", "supabase", "shadcn-vue", "rag", "edge-functions", "embeddings", "vector-databases"],
      url: "https://www.teamsync.chat",
    },
    {
      image: "coaws",
      icon: "aws",
      description:
        "AWS Cost Optimization Tools is a collection of tools designed to help users optimize their AWS costs. It includes features such as cost analysis, recommendations for cost-saving measures, and monitoring of AWS resources.",
      tags: ["aws", "Golang"],
      url: "https://github.com/Th3Mayar/aws-cost-optimization-tools",
    },
    {
      image: "codesys",
      icon: "php",
      description:
        "Codesys is a web-based code snippet manager that allows users to save, organize, and share code snippets in various programming languages. It features a user-friendly interface with syntax highlighting, tagging, and search functionality for easy retrieval of snippets. Built with PHP, jQuery, and MySQL.",
      tags: ["php", "jquery", "mysql", "javaScript", "html", "css"],
      url: "https://github.com/Th3Mayar/codesys-v1",
    },
    {
      image: "saborApp",
      icon: "nuxt",
      description:
        "SaborApp is a restaurant reservation application built as a monorepo containing both frontend and backend. The frontend is developed with Nuxt 3, Vue.js, and Tailwind CSS, while the backend is powered by Node.js, Express, and PostgreSQL.",
      tags: ["nuxt", "vue", "tailwind", "postgreSQL", "shadcn-vue", "vercel"],
      url: "https://github.com/Th3Mayar/sabor_app",
    },
    {
      image: "rescueTrack",
      icon: "nuxt",
      description:
        "RescueTrack is a management platform for towing and roadside assistance services in the Dominican Republic. It connects drivers in vehicle emergencies with reliable providers across the country. Users can share their current location or manually enter an address to request quick and secure assistance. Stack: nuxt, node.js, mongodb.",
      tags: [
        "nuxt",
        "vue",
        "supabase",
        "groq",
        "tailwind",
        "shadcn-vue",
        "lucide-vue-next",
        "edge-functions",
        "vercel"
      ],
      url: "rescue-track.vercel.app",
    },
    {
      image: "priceNotify",
      icon: "vue",
      description:
        "PriceNotify is a web application that allows users to track product prices on e-commerce websites and receive notifications when prices drop. Built with React.js, Tailwind CSS, Node.js, Express, and MongoDB.",
      tags: ["react", "tailwind", "node", "express", "mongodb", "graphql"],
      url: "https://github.com/Th3Mayar/price-notify-new",
    },
    {
      image: "luffyGear4",
      icon: "html",
      description:
        "Epic animation inspired by Luffy Gear 4. Built with HTML, CSS and JavaScript, featuring effects and SoundCloud integration.",
      tags: ["HTML", "CSS", "JavaScript", "vercel"],
      url: "https://github.com/Th3Mayar/gear-4",
    },
    {
      image: "writePhrase",
      icon: "astro",
      description:
        "Game Write Phrase is a fun typing challenge game built with Astro, React, and TypeScript. The goal is to type the displayed phrase as quickly and accurately as possible to earn points and unlock new levels. The project follows a modular structure with Astro pages, reusable React components, and TypeScript stores for state management.",
      tags: ["astro", "react", "typeScript", "javaScript", "vercel"],
      url: "https://github.com/Th3Mayar/write_phrase",
    },
    {
      image: "palomoOfMonth",
      icon: "nuxt",
      description:
        "Palomo of the Month is a Nuxt 3 application designed to recognize the outstanding palomo of the month through a comprehensive voting and management system. It features a modern UI with shadcn-vue components, dark/light theme support, secure authentication, responsive design, and customizable settings for themes, colors, and preferences. Built for optimal performance with Nuxt 3 and TypeScript.",
      tags: ["nuxt", "tailwind", "shadcn-vue", "typeScript", "bun", "sql-server", "vercel"],
      url: "https://github.com/Th3Mayar/palomoOfMonth",
    },
    {
      image: "gridOrFlex",
      icon: "react",
      description:
        "GridOrFlex is a dynamic UI feature that allows switching between Grid and Flex views in a user list, enhancing the user experience by adapting the layout as needed. It uses Redux for global state management, Framer Motion for smooth transitions, and is designed to be reusable in any list component. Built with React and Next.js.",
      tags: ["react", "next.js", "redux toolkit", "framer motion", "vercel"],
      url: "https://github.com/Th3Mayar/grid-or-flex-layout",
    },
    {
      video: "FractalMetamorphosis2D",
      icon: "react",
      description:
        "Fractal Metamorphosis 2D with three.js and Astro An animated fractal transformation visualizer that morphs between different fractal patterns in a 2D space, creating mesmerizing visual effects. Built with React, Three.js, and Tailwind CSS.",
      tags: ["threejs", "css", "javaScript", "vercel"],
      url: "https://github.com/Th3Mayar/FractalMetamorphosis2D",
    },
    {
      image: "api",
      icon: "js",
      description:
        "API for PriceNotify, a web application that allows users to track product prices on e-commerce websites and receive notifications when prices drop. Built with Node.js, Express, and MongoDB.",
      tags: ["node", "express", "mongodb", "javaScript", "typeScript", "graphql", "render"],
      url: "https://github.com/Th3Mayar/api-PriceNotify",
    },
    {
      image: "api",
      icon: "js",
      description:
        "This project is a web scraping script designed to extract and process product information from online sales platforms such as eBay. It allows developers to obtain detailed product data and apply custom logic to highlight products with specific alerts.",
      tags: ["javaScript", "node.js", "express", "render"],
      url: "https://github.com/Th3Mayar/api_consult_price",
    },
    {
      image: "factuStock1",
      carousel: ["factuStock1", "factuStock2", "factuStock3", "factuStock4"],
      icon: "csharp",
      description:
        "FactuStock is a desktop application for managing inventory and invoicing in small to medium-sized businesses. It features product management, client management, invoicing, reporting, and user authentication. Built with C# and .NET Framework, it provides a user-friendly interface and robust functionality to streamline business operations.",
      tags: ["C#", "sql-server", "n-tier", "winforms"],
      url: "https://github.com/Th3Mayar/FactuStock",
    },
    {
      image: "gestorPass",
      icon: "python",
      description:
        "This program is a password manager that creates and saves passwords from a series of options that you can alter to obtain more secure passwords.",
      tags: ["python", "tkinter", "sqlite", "gui"],
      url: "https://github.com/Th3Mayar/Gestor_PasswordPython",
    },
    {
      image: "encryptText",
      icon: "python",
      description:
        "This tool allows users to encrypt and decrypt text messages securely using the cryptography library. The application provides a simple interface for encrypting text, saving the encrypted data, and decrypting it with authorization.",
      tags: ["python", "tkinter", "cryptography", "sqlite", "gui"],
      url: "https://github.com/Th3Mayar/encrypt_text",
    },
    {
      image: "encryptFile",
      icon: "python",
      description:
        "This is a Python application using Tkinter that allows you to encrypt and send files between a client and a server. The application provides a graphical user interface (GUI) for selecting files, encrypting them.",
      tags: ["python", "tkinter", "cryptography", "socket", "gui"],
      url: "https://github.com/Th3Mayar/encrypt_decrypt_file"
    }
  ];
} else {
  allProjects = [
    {
      image: "stackAtlas",
      icon: "nuxt",
      description:
        "StackAtlas es una plataforma web moderna dedicada a explorar y comparar stacks tecnológicos reales utilizados para construir aplicaciones modernas. Proporciona guías estructuradas, desgloses de stacks, comparaciones y hojas de ruta para ayudar a los desarrolladores a elegir las tecnologías adecuadas para sus proyectos. La plataforma se enfoca en casos de uso prácticos como portafolios, aplicaciones SaaS, landing pages, blogs y aplicaciones full-stack.",
      tags: ["nuxt", "strapi", "vue", "javascript", "vercel"],
      url: "https://www.stackatlas.blog",
    },
    {
      image: "teamsync",
      icon: "nuxt",
      description:
        "TeamSync es una plataforma de aprendizaje colaborativo impulsada por IA diseñada para ayudar a los estudiantes a estudiar, crear y colaborar en tiempo real. Combina chat en vivo, organización inteligente de documentos y herramientas de IA generativa para transformar los materiales de estudio en resúmenes, tarjetas de memoria y cuestionarios al instante. La plataforma permite a los equipos de estudiantes compartir conocimientos, gestionar documentos y acelerar el aprendizaje a través de espacios de estudio interactivos.",
      tags: ["nuxt", "supabase", "shadcn-vue", "rag", "edge-functions", "embeddings", "vector-databases", "vercel", "pwa", "postgreSQL"],
      url: "https://www.teamsync.chat",
    },
    {
      image: "coaws",
      icon: "aws",
      description:
        "AWS Cost Optimization Tools es una colección de herramientas diseñadas para ayudar a los usuarios a optimizar sus costos en AWS. Incluye características como análisis de costos, recomendaciones para medidas de ahorro de costos y monitoreo de recursos de AWS.",
      tags: ["aws", "Golang"],
      url: "https://github.com/Th3Mayar/aws-cost-optimization-tools",
    },
    {
      image: "codesys",
      icon: "php",
      description:
        "Codesys es un gestor de fragmentos de código basado en la web que permite a los usuarios guardar, organizar y compartir snippets en varios lenguajes de programación. Cuenta con una interfaz fácil de usar con resaltado de sintaxis, etiquetado y función de búsqueda para una recuperación sencilla. Construido con PHP, jQuery y MySQL.",
      tags: ["php", "jquery", "mysql", "javaScript", "html", "css"],
      url: "https://github.com/Th3Mayar/codesys-v1",
    },
    {
      image: "saborApp",
      icon: "nuxt",
      description:
        "SaborApp es una aplicación de reservas de restaurantes construida como un monorepo que contiene tanto el frontend como el backend. El frontend está desarrollado con Nuxt 3, Vue.js y Tailwind CSS, mientras que el backend utiliza Node.js, Express y PostgreSQL.",
      tags: ["nuxt", "vue", "tailwind", "postgreSQL", "shadcn-vue", "vercel"],
      url: "https://github.com/Th3Mayar/sabor_app",
    },
    {
      image: "rescueTrack",
      icon: "nuxt",
      description:
        "RescueTrack es una plataforma de gestión para servicios de grúas y asistencia en carretera en la República Dominicana. Conecta a conductores en emergencias vehiculares con proveedores confiables en todo el país. Los usuarios pueden compartir su ubicación actual o ingresar manualmente una dirección para solicitar asistencia rápida y segura. Stack: nuxt, node.js, mongodb.",
      tags: [
        "nuxt",
        "vue",
        "supabase",
        "groq",
        "tailwind",
        "shadcn-vue",
        "lucide-vue-next",
        "edge-functions",
        "vercel"
      ],
      url: "https://rescuetrack.vercel.app",
    },
    {
      image: "priceNotify",
      icon: "vue",
      description:
        "PriceNotify es una aplicación web que permite a los usuarios rastrear precios de productos en sitios de comercio electrónico y recibir notificaciones cuando bajan. Construida con React.js, Tailwind CSS, Node.js, Express y MongoDB.",
      tags: ["react", "tailwind", "node", "express", "mongodb", "graphql", "vercel"],
      url: "https://github.com/Th3Mayar/price-notify-new",
    },
    {
      image: "luffyGear4",
      icon: "html",
      description:
        "Animación épica inspirada en Luffy Gear 4. Construida con HTML, CSS y JavaScript, incluye efectos e integración con SoundCloud.",
      tags: ["HTML", "CSS", "JavaScript", "vercel"],
      url: "https://github.com/Th3Mayar/gear-4",
    },
    {
      image: "writePhrase",
      icon: "astro",
      description:
        "Game Write Phrase es un divertido juego de desafío de tipeo construido con Astro, React y TypeScript. El objetivo es escribir la frase mostrada lo más rápido y preciso posible para ganar puntos y desbloquear nuevos niveles. El proyecto sigue una estructura modular con páginas en Astro, componentes reutilizables en React y stores en TypeScript para la gestión del estado.",
      tags: ["astro", "react", "typeScript", "javaScript", "vercel"],
      url: "https://github.com/Th3Mayar/write_phrase",
    },
    {
      image: "palomoOfMonth",
      icon: "nuxt",
      description:
        "Palomo of the Month es una aplicación en Nuxt 3 diseñada para reconocer al palomo destacado del mes mediante un sistema completo de votación y gestión. Cuenta con una interfaz moderna con componentes shadcn-vue, soporte para tema claro/oscuro, autenticación segura, diseño responsivo y configuración personalizable de temas, colores y preferencias. Construida para un rendimiento óptimo con Nuxt 3 y TypeScript.",
      tags: ["nuxt", "tailwind", "shadcn-vue", "typeScript", "bun", "sql-server", "vercel"],
      url: "https://github.com/Th3Mayar/palomoOfMonth",
    },
    {
      image: "gridOrFlex",
      icon: "react",
      description:
        "GridOrFlex es una función de interfaz dinámica que permite alternar entre vistas Grid y Flex en una lista de usuarios, mejorando la experiencia al adaptar el diseño según se necesite. Usa Redux para la gestión global del estado, Framer Motion para transiciones fluidas y está diseñado para ser reutilizable en cualquier componente de lista. Construido con React y Next.js.",
      tags: ["react", "next.js", "redux toolkit", "framer motion", "vercel"],
      url: "https://github.com/Th3Mayar/grid-or-flex-layout",
    },
    {
      video: "FractalMetamorphosis2D",
      icon: "react",
      description:
        "Fractal Metamorphosis 2D con three.js y Astro. Un visualizador animado de transformaciones fractales que cambia entre distintos patrones en un espacio 2D, creando efectos visuales hipnóticos. Construido con React, Three.js y Tailwind CSS.",
      tags: ["threejs", "css", "javaScript", "vercel"],
      url: "https://github.com/Th3Mayar/FractalMetamorphosis2D",
    },
    {
      image: "api",
      icon: "js",
      description:
        "API para PriceNotify, una aplicación web que permite a los usuarios rastrear precios de productos en sitios de comercio electrónico y recibir notificaciones cuando bajan. Construida con Node.js, Express y MongoDB.",
      tags: ["node", "express", "mongodb", "javaScript", "typeScript", "graphql", "render"],
      url: "https://github.com/Th3Mayar/api-PriceNotify",
    },
    {
      image: "api",
      icon: "js",
      description:
        "Este proyecto es un script de web scraping diseñado para extraer y procesar información de productos en plataformas de ventas en línea como eBay. Permite a los desarrolladores obtener datos detallados de productos y aplicar lógica personalizada para resaltar productos con alertas específicas.",
      tags: ["javaScript", "node.js", "express", "render"],
      url: "https://github.com/Th3Mayar/api_consult_price",
    },
    {
      image: "factuStock1",
      carousel: ["factuStock1", "factuStock2", "factuStock3", "factuStock4"],
      icon: "csharp",
      description:
        "FactuStock es una aplicación de escritorio para la gestión de inventario y facturación en pequeñas y medianas empresas. Incluye gestión de productos, clientes, facturación, reportes y autenticación de usuarios. Construida con C# y .NET Framework, ofrece una interfaz amigable y funcionalidades sólidas para optimizar operaciones empresariales.",
      tags: ["C#", "sql-server", "n-tier", "winforms"],
      url: "https://github.com/Th3Mayar/FactuStock",
    },
    {
      image: "gestorPass",
      icon: "python",
      description:
        "Este programa es un gestor de contraseñas que crea y guarda claves a partir de una serie de opciones que puedes modificar para obtener contraseñas más seguras.",
      tags: ["python", "tkinter", "sqlite", "gui"],
      url: "https://github.com/Th3Mayar/Gestor_PasswordPython",
    },
    {
      image: "encryptText",
      icon: "python",
      description:
        "Esta herramienta permite a los usuarios encriptar y desencriptar mensajes de texto de manera segura utilizando la librería cryptography. La aplicación ofrece una interfaz simple para encriptar texto, guardar los datos encriptados y desencriptarlos con autorización.",
      tags: ["python", "tkinter", "cryptography", "sqlite", "gui"],
      url: "https://github.com/Th3Mayar/encrypt_text",
    },
    {
      image: "encryptFile",
      icon: "python",
      description:
        "Esta es una aplicación en Python con Tkinter que permite encriptar y enviar archivos entre un cliente y un servidor. La aplicación ofrece una interfaz gráfica (GUI) para seleccionar archivos y encriptarlos.",
      tags: ["python", "tkinter", "cryptography", "socket", "gui"],
      url: "https://github.com/Th3Mayar/encrypt_decrypt_file"
    }
  ]
}

export { frameworks, allProjects };