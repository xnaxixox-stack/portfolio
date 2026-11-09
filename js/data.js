// Carga el contenido del portafolio desde content/portfolio.json.
//
// El contenido se edita en content/portfolio.json, a mano o desde Pages CMS
// (app.pagescms.org, configurado en .pages.yml). Este archivo lo deja disponible
// para el sitio como una promesa: window.PORTFOLIO_READY.
//
// index.html ya pide el JSON en el <head>, para que la descarga empiece en paralelo
// con el CSS; aquí se reutiliza esa misma petición. Necesita un servidor (GitHub
// Pages, o `npx serve .` en local): abriendo index.html con doble clic el navegador
// bloquea la lectura del JSON.
(function () {
  const url = new URL("../content/portfolio.json", document.currentScript.src);
  const request =
    window.PORTFOLIO_READY ||
    fetch(url).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    });

  window.PORTFOLIO_READY = request.then(
    (data) => (window.PORTFOLIO = data),
    (err) => {
      console.error("No se pudo cargar content/portfolio.json", err);
      const show = () => {
        const msg = document.createElement("p");
        msg.setAttribute("role", "alert");
        msg.style.cssText =
          "position:fixed;inset:auto 16px 16px;z-index:999;padding:14px 16px;border-radius:8px;" +
          "background:#141414;color:#f4f2ee;font:14px/1.5 system-ui,sans-serif";
        msg.textContent =
          "No se pudo cargar el contenido (content/portfolio.json). Si abriste el archivo con doble clic, " +
          "ábrelo con un servidor local, por ejemplo con `npx serve .` en la carpeta del sitio.";
        document.body.appendChild(msg);
      };
      if (document.body) show();
      else document.addEventListener("DOMContentLoaded", show);
      throw err;
    }
  );
})();
