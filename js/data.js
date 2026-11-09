// Carga el contenido del portafolio desde content/portfolio.json.
//
// El contenido se edita en content/portfolio.json, a mano o desde Pages CMS
// (app.pagescms.org, configurado en .pages.yml). Este archivo solo lo lee y lo deja
// en window.PORTFOLIO para todas las versiones del sitio.
//
// La carga es síncrona a propósito: las páginas leen window.PORTFOLIO apenas se
// carga este script, y el JSON es un archivo chico del mismo sitio. Necesita un
// servidor (GitHub Pages, o `npx serve .` en local): abriendo index.html con
// doble clic el navegador bloquea la lectura del JSON.
(function () {
  const url = new URL("../content/portfolio.json", document.currentScript.src);
  try {
    const req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send();
    if (req.status !== 200 && req.status !== 0) throw new Error(`HTTP ${req.status}`);
    window.PORTFOLIO = JSON.parse(req.responseText);
  } catch (err) {
    console.error("No se pudo cargar content/portfolio.json", err);
    document.addEventListener("DOMContentLoaded", () => {
      const msg = document.createElement("p");
      msg.setAttribute("role", "alert");
      msg.style.cssText =
        "position:fixed;inset:auto 16px 16px;z-index:999;padding:14px 16px;border-radius:8px;" +
        "background:#141414;color:#f4f2ee;font:14px/1.5 system-ui,sans-serif";
      msg.textContent =
        "No se pudo cargar el contenido (content/portfolio.json). Si abriste el archivo con doble clic, " +
        "ábrelo con un servidor local, por ejemplo con `npx serve .` en la carpeta del sitio.";
      document.body.appendChild(msg);
    });
  }
})();
