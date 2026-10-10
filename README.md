# Portafolio

Sitio portafolio minimalista, estático (HTML + CSS + JS, sin build).

## Ver en local

Abre `index.html` en el navegador, o:

```sh
npx serve .
```

## Editar contenido

Todo el contenido vive en `js/data.js`: perfil, casos destacados (`featured`) y
resto de proyectos (`projects`). Proyectos de Behance y trabajo en SKY Airline; imágenes de
[Behance](https://www.behance.net/iggrandon3ec1); las imágenes están en `assets/img/`.

## Decisiones de diseño

Basado en patrones habituales de portafolios minimalistas:

- Tipografía como protagonista: serif editorial grande (Instrument Serif) + sans neutra (Inter Tight).
- Paleta casi monocroma (off-white / tinta) con un solo color de acento.
- Casos destacados grandes con datos clave e imágenes de detalle, y una grilla con el resto del trabajo de producto.
- Mucho espacio en blanco, separadores de 1px, microinteracciones sutiles (zoom de portada, subrayado animado, aparición al scroll).
- Modo oscuro automático + toggle manual, responsive y respeta `prefers-reduced-motion`.
