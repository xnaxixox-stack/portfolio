# Portafolio

Sitio portafolio minimalista, estático (HTML + CSS + JS, sin build).

## Ver en local

Hace falta un servidor local (el contenido se lee de un JSON):

```sh
npx serve .
```

## Editar contenido

Todo el texto y las imágenes del sitio salen de `content/portfolio.json`: perfil,
casos destacados (`featured`) y más proyectos (`projects`). Las cuatro versiones del
sitio leen ese mismo archivo (lo carga `js/data.js`). Las imágenes están en `assets/img/`.

### Con el editor visual (Pages CMS)

1. Entra a [app.pagescms.org](https://app.pagescms.org) e inicia sesión con GitHub.
2. Autoriza la app en el repositorio `portfolio` y ábrelo; elige la rama que publica el sitio.
3. En **Portafolio** aparece un formulario con el perfil, los casos y los proyectos:
   cambia textos, sube imágenes, agrega o reordena casos y guarda.
4. Cada guardado es un commit en el repositorio; GitHub Pages publica el cambio en uno o
   dos minutos.

La configuración del formulario está en `.pages.yml`. Las imágenes que subas desde el
editor quedan en `assets/img/`.

### A mano

Edita `content/portfolio.json` directamente (en GitHub o en tu editor) y sube el cambio.
Para ver el sitio en local hace falta un servidor, porque el navegador no deja leer el
JSON abriendo `index.html` con doble clic:

```sh
npx serve .
```

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
3. **Partículas** (`opciones/particulas/`): miles de partículas forman una figura por
   sección (el nombre, la grilla de 208 componentes de Lyra, el grafo del mapa, el mapa de
   asientos, la planilla de Ninja Excel, una órbita por proyecto, una esfera y una @). El scroll
   cambia la figura, los colores y la tipografía. El mouse o el dedo empuja las partículas,
   mantener presionado las junta y un toque las hace explotar. Las letras de los títulos
   cambian de grosor según la cercanía del puntero y se inclinan con la velocidad del scroll.
4. **El mapa** (`opciones/mapa/`): el grafo del mapa agéntico es la navegación. Se filtra
   por año, y al soltar un proyecto sobre otro muestra lo que comparten. Tiene vista en texto.

## Publicación

El sitio se publica con GitHub Pages desde la rama `main` (carpeta raíz). El
archivo `.nojekyll` evita que GitHub procese el sitio con Jekyll; se sirve tal cual.
