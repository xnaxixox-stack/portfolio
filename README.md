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

Concepto: la página se comporta como un design system. Base minimalista
(Instrument Serif + Inter Tight, paleta casi monocroma, tokens en `css/styles.css`)
y una capa de interacciones que muestran el oficio:

- **Modo inspección** (`js/inspect.js`): con la tecla `I` o el botón del menú aparece
  una grilla de 12 columnas y, al pasar el cursor, la caja de cada elemento con su
  padding, tipografía, medidas y el token de color que usa (incluidos los de Lyra).
- **Casos apilados**: las tarjetas quedan fijas y la siguiente cubre a la anterior,
  que se achica y oscurece. Cada tarjeta tiene una galería que avanza con una cortina.
- **Laboratorio** (`js/lab.js`): un componente de vuelo hecho con tokens de Lyra que
  cambia entre los modos retail y corporativo, y un grafo del mapa agéntico con física
  (se puede arrastrar; al pasar por un nodo se iluminan sus conexiones).
- **Hero** con fondo duotono en WebGL (`js/hero-bg.js`) que reacciona al mouse, titular
  que entra palabra por palabra y pasa a itálica al pasar el cursor, y hora de Santiago.
- **Marquee** de habilidades que acelera y cambia de sentido con el scroll.
- **Más proyectos** como lista con vista previa que sigue al cursor.
- **Cursor propio** con estados y elementos magnéticos (`js/cursor.js`), solo con mouse.
- Correo de contacto con una ola letra por letra.
- Modo oscuro automático + toggle manual, responsive, y con `prefers-reduced-motion`
  se desactiva todo el movimiento.

## Opciones de diseño

Hay 4 versiones del sitio para comparar. Todas leen el contenido de `js/data.js` y
comparten un selector abajo al centro (`js/switcher.js`):

1. **Actual** (`index.html`): el sitio descrito arriba.
2. **Panel de salidas** (`opciones/panel/`): el sitio es un tablero de aeropuerto con
   letras de paleta. Cada proyecto es un vuelo y se abre como tarjeta de embarque.
3. **Sin estilos** (`opciones/sin-estilos/`): la página parte como HTML sin CSS y el
   visitante aplica los tokens por capas. En la capa de color aparecen 14 colores fuera
   de token (como en la auditoría de Lyra) que hay que corregir para seguir.
4. **El mapa** (`opciones/mapa/`): el grafo del mapa agéntico es la navegación. Se filtra
   por año, y al soltar un proyecto sobre otro muestra lo que comparten. Tiene vista en texto.

## Publicación

El sitio se publica con GitHub Pages desde la rama `main` (carpeta raíz). El
archivo `.nojekyll` evita que GitHub procese el sitio con Jekyll; se sirve tal cual.
