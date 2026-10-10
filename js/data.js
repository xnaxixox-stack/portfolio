// Contenido del portafolio.
// Todo lo que aparece en el sitio sale de aquí. Proyectos de producto y
// UX/UI: Behance (behance.net/iggrandon3ec1) y trabajo en SKY Airline.

window.PORTFOLIO = {
  profile: {
    name: "Ignacio Grandón",
    role: "Diseñador UX/UI · Design Systems",
    location: "Chile",
    headline: "Diseño productos digitales y los sistemas que los mantienen consistentes.",
    about: [
      "Soy Ignacio Grandón, diseñador UX/UI en Chile. Administro Lyra, el design system de SKY Airline, y diseño flujos de compra para la venta retail y el canal corporativo.",
      "Trabajo donde diseño y código se encuentran: entrego la pantalla, la especificación técnica y el prototipo funcionando. También construyo las herramientas que sostienen el sistema, desde plugins de Figma hasta agentes de IA conectados al design system.",
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
        "Administro Lyra de punta a punta: un solo sistema de tokens y componentes para dos negocios, retail (pasajeros) y corporativo (empresas), sobre web Vue 3 y app React Native.",
      highlights: [
        "208 componentes en Figma, cerca de 3.000 variantes y 17 estilos tipográficos",
        "Dos marcas sobre la misma base de tokens, resueltas con modos de Figma",
        "Nuevo criterio de certificación con Desarrollo y QA: se valida el cumplimiento de tokens en vez de la fidelidad estructural a Figma",
        "Auditoría del kit contra el canon: 54 colores revisados, 14 fuera de norma documentados",
        "Lyra Token Auditor, un plugin de Figma que diseñé y programé para auditar color, espaciado, tipografía, radios y sombras",
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
        "Un repositorio que le da a la IA el contexto completo del design system: los 208 componentes mapeados, una fuente única de verdad para los tokens y comandos para auditar, sincronizar con Figma, generar componentes y corregir valores escritos a mano en el código.",
      highlights: [
        "Crucé el mapa con los repos de producción: 228 componentes Vue 3 y 444 en React Native",
        "Cobertura medida en tres ejes: 68 % web y 66 % app en componentes, 59 % y 70 % en tokens, 29 % en props",
        "8 colores que web y app definen por separado y el canon no tiene, listos para volverse tokens",
        "Agentes especializados para investigación UX de aerolíneas, benchmarking, legibilidad de íconos y diseño con los átomos de Lyra",
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
        "La app de la aerolínea low cost de Sudamérica: búsqueda de vuelos, estado del vuelo en tiempo real, check-in y tarjeta de embarque en el teléfono. En la web diseño el flujo de compra SKLY.",
      highlights: [
        "Rediseño de \"Revisa antes de pagar\": precio total protagonista y desglose por pasajero",
        "Mapa de asientos móvil con encabezado colapsable que gana cerca de 108 px para la grilla",
        "Asientos y equipaje para clientes Platino: el beneficio se suma a la tarifa en vez de reemplazarla",
        "Drawer de asiento Premier con animación isométrica en Lottie",
      ],
      tags: ["Figma", "Mobile app", "Ancillaries", "Lottie"],
    },
    {
      title: "Ninja Excel by Buk",
      category: "UX/UI · SaaS",
      year: "2022",
      cover: "assets/img/ninja-excel.jpg",
      details: ["assets/img/ninja-excel-1.jpg", "assets/img/ninja-excel-2.jpg"],
      url: "https://www.behance.net/gallery/148445075/Ninja-Excel",
      summary:
        "Software integrado a Microsoft Excel para empresas, con una plataforma para administradores y colaboradores que entrega feedback inmediato.",
      highlights: [
        "Proceso de descubrimiento con el usuario administrador",
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
