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
      "Antes diseñé la experiencia de Ninja Excel y Buk Capacitaciones, donde me encargué de la investigación con usuarios y del diseño de punta a punta. Vengo de la publicidad y el diseño gráfico (Duoc UC) y tengo un diplomado en Estrategias y Experiencias Digitales de la Universidad Católica.",
    ],
    skills: [
      "Design systems",
      "Tokens y modos de marca",
      "Flujos de compra",
      "UX research",
      "Test de usabilidad",
      "Figma Plugin API",
      "IA aplicada al diseño",
      "Vue 3",
    ],
    links: {
      email: "ig.grandon@gmail.com",
      behance: "https://www.behance.net/iggrandon3ec1",
      linkedin: "https://www.linkedin.com/in/ignacio-grandon-ahumada",
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
        "Tarjeta de embarque en la app y en Apple Wallet, y estado del vuelo en la pantalla de bloqueo",
      ],
      tags: ["Figma", "Mobile app", "Ancillaries", "Lottie"],
    },
    {
      title: "Ninja Excel by Buk",
      category: "UX/UI · Buk Capacitaciones",
      year: "2020–2022",
      cover: "assets/img/ninja-excel.jpg",
      details: [
        "assets/img/ninja-excel-1.jpg",
        "assets/img/ninja-excel-2.jpg",
        "assets/img/behance/ninja-excel/03.jpg",
        "assets/img/behance/ninja-excel/04.jpg",
        "assets/img/behance/ninja-excel/05.jpg",
        "assets/img/behance/ninja-excel/06.jpg",
        "assets/img/behance/ninja-excel/07.jpg",
        "assets/img/behance/ninja-excel/08.jpg",
        "assets/img/behance/ninja-excel/09.jpg",
      ],
      url: "https://www.behance.net/gallery/148445075/Ninja-Excel",
      summary:
        "Plataforma de capacitación en Microsoft Excel para empresas. Los colaboradores aprenden y practican dentro del mismo Excel, con feedback inmediato, y los administradores siguen el avance de sus equipos. Buk la adquirió en 2021 y la integró a su módulo de capacitaciones.",
      highlights: [
        "Diseño de los dos ambientes: el del estudiante y el portal de administración de perfiles y cursos",
        "Research: entrevistas en profundidad con usuarios y stakeholders, encuestas y test de usabilidad con Maze",
        "Test en Maze del flujo de imparticiones del administrador: 9 respuestas, 10 bloques y puntaje de usabilidad 85, con mapas de calor y análisis de rutas",
        "Estrategia de producto: escenarios ideales, análisis de brechas y roadmap",
        "Gamificación para Ninja: avatares, niveles, medallas y puntos",
        "Wireframes, prototipos en alta fidelidad y microinteracciones",
      ],
      tags: ["UX research", "LMS", "Gamificación", "Maze"],
    },
    {
      title: "Keyü",
      category: "UX/UI · App iOS · Freelance",
      client: "Keyü",
      year: "2019",
      cover: "assets/img/keyu/cover.jpg",
      details: [
        "assets/img/keyu/03-primer-contacto.jpg",
        "assets/img/keyu/06-descubrir.jpg",
        "assets/img/keyu/07-elegir-bien.jpg",
        "assets/img/keyu/08-programar.jpg",
        "assets/img/keyu/09-checkout.jpg",
        "assets/img/keyu/10-post-compra.jpg",
        "assets/img/keyu/11-despacho.jpg",
        "assets/img/keyu/05-recorrido.jpg",
        "assets/img/keyu/02-contexto.jpg",
        "assets/img/keyu/12-sistema-visual.jpg",
      ],
      url: "https://www.behance.net/gallery/257178359/Keyue-App",
      summary:
        "Comida real, programada y sin desperdicio. Keyü instala refrigeradores inteligentes en oficinas, los llena con comida de comercios y cocineros caseros (los üChefs) y también despacha a domicilio. Diseñé su app iOS de punta a punta, del research a la UI.",
      highlights: [
        "Onboarding en cuatro pantallas: compra inteligente, envío gratis, programar cada día y el mapa de la zona de cobertura",
        "Calendario semanal arriba del menú: cada plato queda asociado a un día de retiro, así el carro puede tener los almuerzos de toda la semana",
        "Ficha de cada plato con macros, porción según objetivo (Normal, Fat burner o Athlete) y el precio total en el botón",
        "Despacho a domicilio con calendario mensual, entrega entre 17:00 y 22:00 y el carrito ordenado por día",
        "Checkout de cuatro pantallas sin formularios, con el saldo precargado como medio de pago por defecto",
        "Calificación al recibir el pedido, que le da al comercio información directa sobre cada plato",
      ],
      tags: ["iOS", "E-commerce", "Pedidos programados", "Freelance"],
    },
  ],

  // Resto del trabajo de UI/UX, de Behance (behance.net/iggrandon3ec1). Los proyectos
  // no tienen texto en Behance: las descripciones salen de lo que muestran las imágenes.
  projects: [
    {
      title: "Pinché App",
      category: "App móvil",
      year: "2017",
      cover: "assets/img/pinche-app.jpg",
      details: ["assets/img/behance/pinche/01.jpg", "assets/img/behance/pinche/03.jpg", "assets/img/behance/pinche/04.jpg"],
      url: "https://www.behance.net/gallery/52553489/Pinch-App",
      summary: "App para encontrar talleres de bicicleta cerca de donde estás. Diseñé la marca y la app.",
      highlights: [
        "Mapa con los talleres cercanos a tu ubicación",
        "Lista de talleres con lo que ofrece cada uno: venta, reparación y accesorios",
        "Logo e ícono de la app",
      ],
      tags: ["App móvil", "UI", "Marca"],
    },
    {
      title: "App BancoEstado",
      category: "App móvil",
      year: "2017",
      cover: "assets/img/bancoestado.jpg",
      details: [
        "assets/img/behance/bancoestado/02.jpg",
        "assets/img/behance/bancoestado/03.jpg",
        "assets/img/behance/bancoestado/04.jpg",
        "assets/img/behance/bancoestado/05.jpg",
      ],
      url: "https://www.behance.net/gallery/52574921/App-BancoEstado",
      summary: "Propuesta de rediseño para la app de BancoEstado, centrada en las cuentas y las transferencias.",
      highlights: [
        "Tipos de cuenta en tarjetas de color, con el saldo de cada una a la vista",
        "Detalle de cuenta con los últimos movimientos",
        "Transferencia con teclado numérico y confirmación del destinatario en un solo paso",
      ],
      tags: ["App móvil", "Banca", "UI"],
    },
    {
      title: "Sixevent",
      category: "Sistema de productividad y marca",
      year: "2017",
      cover: "assets/img/sixevent.jpg",
      details: [
        "assets/img/behance/sixevent/02.jpg",
        "assets/img/behance/sixevent/03.jpg",
        "assets/img/behance/sixevent/04.jpg",
        "assets/img/behance/sixevent/05.jpg",
        "assets/img/behance/sixevent/06.jpg",
      ],
      url: "https://www.behance.net/gallery/52572877/Sixevent-Productivity-System-Brand",
      summary: "Herramienta web de productividad para equipos, hecha para una startup chilena. Diseñé la interfaz y la marca.",
      highlights: [
        "Dashboard de sesiones con la actividad de cada persona del equipo",
        "Creación de eventos con invitados, recordatorios y archivos adjuntos",
        "Vista de reuniones por día con calendario",
        "Tablero de documentos y carpetas compartidas",
        "Logo y papelería: carta, tarjetas y libreta",
      ],
      tags: ["Web app", "Dashboard", "Marca"],
    },
  ],
};
