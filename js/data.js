// Contenido del portafolio.
// Todo lo que aparece en el sitio sale de aquí. Imágenes y proyectos
// tomados de behance.net/iggrandon3ec1.

window.PORTFOLIO = {
  profile: {
    name: "Ignacio Grandon",
    role: "Diseñador UX/UI",
    location: "Chile",
    headline: "Diseño productos digitales, de la investigación a la interfaz.",
    about: [
      "Soy Ignacio Grandon, diseñador UX/UI en Chile. Hoy diseño productos digitales como la app de SKY Airline y Ninja Excel de Buk, conectando cada decisión con el usuario real y las métricas que importan.",
      "Vengo del diseño gráfico: identidad, campañas y motion graphics para marcas como Nestlé y Sadia. Ese oficio visual sigue presente en cada interfaz.",
    ],
    skills: [
      "UX/UI",
      "Apps móviles",
      "Test de usabilidad",
      "Design Systems",
      "Figma",
      "Branding",
      "Motion graphics",
    ],
    links: {
      email: "xnaxixox@gmail.com",
      behance: "https://www.behance.net/iggrandon3ec1",
      linkedin: "", // TODO
    },
  },

  // Casos destacados: se muestran grandes, con imágenes de detalle.
  featured: [
    {
      title: "SKY Airline App",
      category: "UX/UI · App móvil",
      year: "2024",
      cover: "assets/img/sky-airline-app.jpg",
      details: ["assets/img/sky-airline-app-1.jpg", "assets/img/sky-airline-app-2.jpg"],
      url: "https://www.behance.net/gallery/210750507/SKY-Airline-APP",
      summary:
        "La app de la aerolínea low cost de Sudamérica: búsqueda de vuelos, estado del vuelo en tiempo real, check-in y tarjeta de embarque en el teléfono.",
      tags: ["Figma", "Mobile app", "UI design", "UX design"],
    },
    {
      title: "Ninja Excel by Buk",
      category: "UX/UI · SaaS",
      year: "2022",
      cover: "assets/img/ninja-excel.jpg",
      details: ["assets/img/ninja-excel-1.jpg", "assets/img/ninja-excel-2.jpg"],
      url: "https://www.behance.net/gallery/148445075/Ninja-Excel",
      summary:
        "Software integrado a Microsoft Excel para empresas, con una plataforma para administradores y colaboradores que entrega feedback inmediato. Incluye proceso de descubrimiento y test de usabilidad con Maze para el usuario administrador.",
      tags: ["UX/UI", "Test de usabilidad", "Maze"],
    },
  ],

  // Resto del trabajo. kind: "producto" o "grafica" (filtro).
  projects: [
    {
      title: "Pinché App",
      kind: "producto",
      category: "App móvil",
      year: "2017",
      cover: "assets/img/pinche-app.jpg",
      url: "https://www.behance.net/gallery/52553489/Pinch-App",
    },
    {
      title: "App BancoEstado",
      kind: "producto",
      category: "App móvil",
      year: "2017",
      cover: "assets/img/bancoestado.jpg",
      url: "https://www.behance.net/gallery/52574921/App-BancoEstado",
    },
    {
      title: "Sixevent",
      kind: "producto",
      category: "Producto y marca",
      year: "2017",
      cover: "assets/img/sixevent.jpg",
      url: "https://www.behance.net/gallery/52572877/Sixevent-Productivity-System-Brand",
    },
    {
      title: "Santiago Celebra 2017",
      kind: "grafica",
      category: "Evento",
      year: "2017",
      cover: "assets/img/santiago-celebra.jpg",
      url: "https://www.behance.net/gallery/57103213/Santiago-Celebra-Bajo-La-Misma-Estrella-2017",
    },
    {
      title: "Motion Graphics",
      kind: "grafica",
      category: "After Effects · Illustrator",
      year: "2018",
      cover: "assets/img/motion-graphics.gif",
      url: "https://www.behance.net/gallery/61325827/Motion-Graphics",
    },
    {
      title: "Sadia Food Comedy",
      kind: "grafica",
      category: "Campaña",
      year: "2019",
      cover: "assets/img/sadia-food-comedy.jpg",
      url: "https://www.behance.net/gallery/89918711/Sadia-Food-Comedy",
    },
    {
      title: "Recreos Nutritivos",
      kind: "grafica",
      category: "Campaña · Nestlé",
      year: "2019",
      cover: "assets/img/recreos-nutritivos.jpg",
      url: "https://www.behance.net/gallery/89696963/Recreos-nutritivos",
    },
    {
      title: "Becas Nestlé",
      kind: "grafica",
      category: "Diseño gráfico",
      year: "2019",
      cover: "assets/img/becas-nestle.jpg",
      url: "https://www.behance.net/gallery/89331797/BECAS-NESTLE",
    },
    {
      title: "Distro Inc",
      kind: "grafica",
      category: "Identidad",
      year: "2019",
      cover: "assets/img/distro-inc.jpg",
      url: "https://www.behance.net/gallery/89694519/Distro-INC",
    },
    {
      title: "Exploraciones Mineras",
      kind: "grafica",
      category: "Identidad",
      year: "2019",
      cover: "assets/img/exploraciones-mineras.jpg",
      url: "https://www.behance.net/gallery/89282991/Exploraciones-Mineras",
    },
  ],
};
