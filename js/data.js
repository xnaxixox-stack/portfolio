// Contenido del portafolio.
// Todo lo que aparece en el sitio sale de aquí. Proyectos de producto y
// UX/UI: Behance (behance.net/iggrandon3ec1) y trabajo en SKY Airline.

window.PORTFOLIO = {
  profile: {
    name: "Ignacio Grandón",
    role: "Diseñador UX/UI · Design Systems",
    location: "Chile",
    headline: "Diseño productos digitales y design systems.",
    about: [
      "Soy diseñador UX/UI en SKY Airline. Administro Lyra, su design system, y diseño flujos de compra para la venta a pasajeros y el canal corporativo.",
      "Además de las pantallas, entrego la especificación técnica y prototipos funcionales. También programo herramientas para el sistema, como un plugin de Figma para auditar tokens y agentes de IA que trabajan con Lyra.",
    ],
    skills: [
      "Design systems",
      "Tokens y modos de marca",
      "Flujos de compra",
      "Investigación UX",
      "Figma Plugin API",
      "IA aplicada al diseño",
      "Vue 3",
    ],
    links: {
      email: "xnaxixox@gmail.com",
      behance: "https://www.behance.net/iggrandon3ec1",
      linkedin: "", // TODO
    },
  },

  // Casos destacados: se muestran grandes, con datos e imágenes de detalle.
  featured: [
    {
      title: "Lyra Design System",
      category: "Design system · SKY Airline",
      year: "Actual",
      cover: "assets/img/lyra.jpg",
      details: ["assets/img/lyra-1.jpg", "assets/img/lyra-2.jpg"],
      summary:
        "Lyra es el sistema de tokens y componentes que comparten los dos negocios de SKY, retail (pasajeros) y corporativo (empresas), en la web Vue 3 y la app React Native. Me encargo de mantenerlo, configurarlo y hacerlo crecer.",
      highlights: [
        "208 componentes en Figma, cerca de 3.000 variantes y 17 estilos tipográficos",
        "Dos marcas sobre la misma base de tokens, con un modo de Figma para cada una",
        "Con Desarrollo y QA cambiamos el criterio de certificación: ahora se revisa que se usen los tokens, no que la estructura sea idéntica a Figma",
        "Auditoría del kit de componentes: de 54 colores revisados, 14 no correspondían a un token",
        "Lyra Token Auditor: plugin de Figma que diseñé y programé para revisar color, espaciado, tipografía, radios y sombras",
      ],
      tags: ["Figma variables", "Vue 3", "React Native", "Gobernanza"],
    },
    {
      title: "Mapa agéntico de Lyra",
      category: "IA aplicada al design system",
      year: "2026",
      cover: "assets/img/mapa-agentico.jpg",
      details: ["assets/img/mapa-agentico-1.jpg", "assets/img/mapa-agentico-2.jpg"],
      summary:
        "Un repositorio que le da a la IA el contexto de Lyra: los 208 componentes mapeados, los tokens en una sola fuente y comandos para auditar, sincronizar con Figma, generar componentes y corregir valores escritos a mano en el código.",
      highlights: [
        "Crucé el mapa con los repos de producción: 228 componentes Vue 3 y 444 en React Native",
        "Cobertura medida en tres ejes: 68 % web y 66 % app en componentes, 59 % y 70 % en tokens, 29 % en props",
        "8 colores que web y app definen por separado y que no existen como token",
        "Agentes para investigación UX de aerolíneas, benchmarking, legibilidad de íconos y diseño con los componentes de Lyra",
      ],
      tags: ["Claude", "Agentes", "Figma MCP", "Auditoría"],
    },
    {
      title: "SKY Airline App",
      category: "UX/UI · App móvil y flujo de compra",
      year: "2024",
      cover: "assets/img/sky-airline-app.jpg",
      details: ["assets/img/sky-airline-app-1.jpg", "assets/img/sky-airline-app-2.jpg"],
      url: "https://www.behance.net/gallery/210750507/SKY-Airline-APP",
      summary:
        "App de SKY, aerolínea low cost con operaciones en Chile y Perú y vuelos a destinos nacionales e internacionales. Desde la app se buscan y compran vuelos, se revisa el estado del vuelo, se hace el check-in y se lleva la tarjeta de embarque en el teléfono. En la web trabajo en el flujo de compra SKLY.",
      highlights: [
        "Rediseño de \"Revisa antes de pagar\": el precio total arriba y el desglose por pasajero",
        "Mapa de asientos en móvil: el encabezado se colapsa al hacer scroll y deja cerca de 108 px más para la grilla",
        "Asientos y equipaje para clientes Platino: el beneficio se suma a la tarifa en vez de reemplazarla",
        "Drawer de asiento Premier con animación isométrica en Lottie",
      ],
      tags: ["Figma", "Mobile app", "Ancillaries", "Lottie"],
    },
    {
      title: "Ninja Excel by Buk",
      category: "UX/UI · Plataforma de capacitación",
      year: "2022",
      cover: "assets/img/ninja-excel.jpg",
      details: ["assets/img/ninja-excel-1.jpg", "assets/img/ninja-excel-2.jpg"],
      url: "https://www.behance.net/gallery/148445075/Ninja-Excel",
      summary:
        "Plataforma de capacitación en Microsoft Excel para empresas. Los colaboradores aprenden y practican dentro del mismo Excel, con feedback inmediato, y los administradores siguen el avance de sus equipos. Buk la adquirió en 2021 y la integró a su módulo de capacitaciones.",
      highlights: [
        "Descubrimiento con el usuario administrador",
        "Test de usabilidad con Maze",
      ],
      tags: ["UX/UI", "Test de usabilidad", "Maze"],
    },
  ],

  // Resto del trabajo de producto.
  projects: [
    {
      title: "Pinché App",
      category: "App móvil",
      year: "2017",
      cover: "assets/img/pinche-app.jpg",
      url: "https://www.behance.net/gallery/52553489/Pinch-App",
    },
    {
      title: "App BancoEstado",
      category: "App móvil",
      year: "2017",
      cover: "assets/img/bancoestado.jpg",
      url: "https://www.behance.net/gallery/52574921/App-BancoEstado",
    },
    {
      title: "Sixevent",
      category: "Sistema de productividad",
      year: "2017",
      cover: "assets/img/sixevent.jpg",
      url: "https://www.behance.net/gallery/52572877/Sixevent-Productivity-System-Brand",
    },
  ],
};
