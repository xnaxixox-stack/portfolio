# Portafolio

Sitio portafolio minimalista, estático (HTML + CSS + JS, sin build).

## Ver en local

Abre `index.html` en el navegador, o:

```sh
npx serve .
```

## Editar contenido

Todo el contenido vive en `js/data.js` (perfil, habilidades, enlaces y proyectos).
Los campos marcados con `TODO` deben completarse con el contenido real de
[Behance](https://www.behance.net/iggrandon3ec1). Las portadas van en `assets/img/`
y se referencian en el campo `cover` de cada proyecto.

## Decisiones de diseño

Basado en patrones habituales de portafolios minimalistas:

- Tipografía como protagonista: serif editorial grande (Instrument Serif) + sans neutra (Inter Tight).
- Paleta casi monocroma (off-white / tinta) con un solo color de acento.
- Grid asimétrico de proyectos (piezas anchas alternadas) y vista "Índice" tipo lista con preview al hover.
- Mucho espacio en blanco, separadores de 1px, microinteracciones sutiles (zoom de portada, subrayado animado, aparición al scroll).
- Modo oscuro automático + toggle manual, responsive y respeta `prefers-reduced-motion`.
