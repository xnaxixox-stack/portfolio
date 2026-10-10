# Portafolio

Sitio portafolio minimalista, estático (HTML + CSS + JS, sin build).

## Ver en local

Abre `index.html` en el navegador, o:

```sh
npx serve .
```

## Editar contenido

Todo el contenido vive en `js/data.js`: perfil, casos destacados (`featured`) y
resto de proyectos (`projects`, filtrables por `kind`). Proyectos e imágenes vienen de
[Behance](https://www.behance.net/iggrandon3ec1); las imágenes están en `assets/img/`.

## Decisiones de diseño

Basado en patrones habituales de portafolios minimalistas:

- Tipografía como protagonista: serif editorial grande (Instrument Serif) + sans neutra (Inter Tight).
- Paleta casi monocroma (off-white / tinta) con un solo color de acento.
- Casos destacados grandes con imágenes de detalle, y una grilla del resto del trabajo con filtro (producto digital / gráfica y marca) y vista "Índice" con preview al hover.
- Mucho espacio en blanco, separadores de 1px, microinteracciones sutiles (zoom de portada, subrayado animado, aparición al scroll).
- Modo oscuro automático + toggle manual, responsive y respeta `prefers-reduced-motion`.
