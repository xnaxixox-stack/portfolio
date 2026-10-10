// Contenido del portafolio.
// Todo lo que aparece en el sitio sale de aquí: edita este archivo para
// actualizar perfil y proyectos. Los campos marcados con TODO deben
// completarse con el contenido real de Behance (behance.net/iggrandon3ec1).

window.PORTFOLIO = {
  profile: {
    name: "Tu Nombre", // TODO: nombre real
    role: "Product Designer",
    location: "Santiago, Chile", // TODO: confirmar
    headline:
      "Diseño productos digitales claros, útiles y medibles — del problema al pixel.",
    about: [
      "Soy diseñador de producto. Trabajo en la intersección entre investigación, sistemas de diseño y negocio, conectando cada decisión con el usuario real y con las métricas que importan.",
      "He trabajado en experiencias digitales para la industria aérea: flujos de compra, check-in, ancillaries y el sistema de diseño que los sostiene.", // TODO: ajustar
    ],
    skills: [
      "Product Design",
      "UX Research",
      "Design Systems",
      "Prototipado",
      "UI Design",
      "Figma",
    ],
    links: {
      email: "xnaxixox@gmail.com",
      behance: "https://www.behance.net/iggrandon3ec1",
      linkedin: "", // TODO
      dribbble: "", // TODO
    },
  },

  // Cada proyecto: cover = ruta a imagen en assets/img (descargada de Behance).
  // Si cover está vacío se muestra un bloque de color con `tone`.
  projects: [
    {
      title: "Proyecto 01", // TODO: título real de Behance
      category: "Product Design",
      year: "2026",
      cover: "assets/img/cover-01.svg", // provisoria: reemplazar por imagen de Behance
      tone: "#d9d4cc",
      url: "https://www.behance.net/iggrandon3ec1",
      summary: "Descripción breve del proyecto, el problema y el resultado.",
    },
    {
      title: "Proyecto 02",
      category: "Design System",
      year: "2025",
      cover: "assets/img/cover-02.svg", // provisoria: reemplazar por imagen de Behance
      tone: "#c9cfd4",
      url: "https://www.behance.net/iggrandon3ec1",
      summary: "Descripción breve del proyecto, el problema y el resultado.",
    },
    {
      title: "Proyecto 03",
      category: "UX Research",
      year: "2025",
      cover: "assets/img/cover-03.svg", // provisoria: reemplazar por imagen de Behance
      tone: "#d6cfc4",
      url: "https://www.behance.net/iggrandon3ec1",
      summary: "Descripción breve del proyecto, el problema y el resultado.",
    },
    {
      title: "Proyecto 04",
      category: "UI Design",
      year: "2024",
      cover: "assets/img/cover-04.svg", // provisoria: reemplazar por imagen de Behance
      tone: "#cdd2c8",
      url: "https://www.behance.net/iggrandon3ec1",
      summary: "Descripción breve del proyecto, el problema y el resultado.",
    },
  ],
};
