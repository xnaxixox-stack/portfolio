# Portafolio

Sitio portafolio minimalista, estático (HTML + CSS + JS, sin build).

## Ver en local

Hace falta un servidor local (el contenido se lee de un JSON):

```sh
npx serve .
```

## Editar contenido

Todo el texto y las imágenes del sitio salen de `content/portfolio.json`: perfil,
casos destacados (`featured`) y más proyectos (`projects`). El sitio lee ese
archivo a través de `js/data.js`. Las imágenes están en `assets/img/`.

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

## Rendimiento

Probado simulando un celular de gama media en 4G débil y en 3G malo (2 s de latencia,
400 kbps). Lo que lo mantiene rápido:

- El JSON del contenido se pide en el `<head>`, en paralelo con el CSS.
- Las fuentes están en `assets/fonts/` (no en Google Fonts) y la del titular se precarga.
- Las imágenes son WebP de hasta 1400 px; las que no están en pantalla cargan después.
- Los scripts que no hacen falta para leer la portada se piden cuando ya hay contenido.
- Con "ahorro de datos" activado, el fondo del hero no usa WebGL.

Al subir imágenes nuevas conviene mantener ese criterio: WebP o JPG de hasta 1400 px de
ancho y menos de 200 KB.

## Publicación

El sitio se publica con GitHub Pages desde la rama `main` (carpeta raíz). El
archivo `.nojekyll` evita que GitHub procese el sitio con Jekyll; se sirve tal cual.
