// Ficha de proyecto: un diálogo con resumen, puntos clave, galería y link a Behance.
// La usan las opciones que no tienen una vista de detalle propia.
// Uso: PortfolioDialog.open(proyecto, { root: "../../" })
(function () {
  const css = `
  .pdlg{margin:auto;border:0;padding:0;width:min(980px,calc(100vw - 24px));max-height:calc(100dvh - 24px);
    background:var(--bg,#f4f2ee);color:var(--fg,#141414);border-radius:16px;overflow:hidden;
    box-shadow:0 30px 80px -30px rgba(0,0,0,.5);font:400 16px/1.55 "Inter Tight",system-ui,sans-serif}
  .pdlg::backdrop{background:rgba(10,10,10,.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
  .pdlg[open]{animation:pdlg-in .45s cubic-bezier(.16,1,.3,1)}
  @keyframes pdlg-in{from{transform:translateY(24px);opacity:0}}
  .pdlg__scroll{max-height:calc(100dvh - 24px);overflow-y:auto;overscroll-behavior:contain}
  .pdlg__bar{position:sticky;top:0;z-index:1;display:flex;justify-content:space-between;align-items:center;gap:12px;
    padding:14px 20px;background:var(--bg,#f4f2ee);border-bottom:1px solid color-mix(in srgb,currentColor 15%,transparent);
    font:500 12px/1.2 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.04em;text-transform:uppercase}
  .pdlg__bar span{opacity:.7}
  .pdlg__close{font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:8px 10px;margin:-8px -10px;border-radius:8px}
  .pdlg__close:hover{background:color-mix(in srgb,currentColor 10%,transparent)}
  .pdlg__body{padding:24px clamp(20px,4vw,40px) 40px;display:grid;gap:18px}
  .pdlg__title{font:400 clamp(34px,5vw,60px)/1 "Instrument Serif","Fraunces",Georgia,serif;letter-spacing:-.02em;margin:0}
  .pdlg__summary{font-size:clamp(17px,1.6vw,20px);max-width:60ch;margin:0}
  .pdlg__hl{list-style:none;margin:0;padding:0;display:grid;gap:8px;max-width:66ch}
  .pdlg__hl li{display:grid;grid-template-columns:22px 1fr;font-size:15px}
  .pdlg__hl li::before{content:"→";font-family:"JetBrains Mono",monospace;opacity:.6}
  .pdlg__tags{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
  .pdlg__tags li{font:500 12px/1 "JetBrains Mono",monospace;padding:7px 10px;border-radius:999px;border:1px solid color-mix(in srgb,currentColor 25%,transparent)}
  .pdlg__gallery{display:grid;gap:12px;margin-top:6px}
  .pdlg__gallery img{width:100%;height:auto;display:block;border-radius:10px;background:color-mix(in srgb,currentColor 8%,transparent)}
  .pdlg__link{justify-self:start;display:inline-flex;padding:11px 18px;border-radius:999px;background:var(--fg,#141414);color:var(--bg,#f4f2ee);text-decoration:none;font-weight:500;font-size:14px}
  .pdlg__nav{display:flex;justify-content:space-between;gap:12px;padding-top:12px;border-top:1px solid color-mix(in srgb,currentColor 15%,transparent)}
  .pdlg__nav button{font:500 14px/1.3 "Inter Tight",sans-serif;color:inherit;background:none;border:0;cursor:pointer;text-align:left;padding:6px 0}
  .pdlg__nav button:last-child{text-align:right}
  .pdlg__nav small{display:block;font:500 11px/1 "JetBrains Mono",monospace;opacity:.6;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
  .pdlg :focus-visible{outline:2px solid currentColor;outline-offset:3px}
  @media (prefers-reduced-motion:reduce){.pdlg[open]{animation:none}}`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  let dlg, list = [], idx = 0, root = "";

  function render() {
    const p = list[idx];
    const imgs = [p.cover, ...(p.details || [])];
    const prev = list[(idx - 1 + list.length) % list.length];
    const next = list[(idx + 1) % list.length];
    dlg.innerHTML = `<div class="pdlg__scroll">
      <div class="pdlg__bar"><span>${esc(p.category)} · ${esc(p.year)}</span><button class="pdlg__close" type="button" data-close>Cerrar ✕</button></div>
      <div class="pdlg__body">
        <h2 class="pdlg__title" id="pdlg-title">${esc(p.title)}</h2>
        ${p.summary ? `<p class="pdlg__summary">${esc(p.summary)}</p>` : ""}
        ${p.highlights ? `<ul class="pdlg__hl">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        ${p.tags ? `<ul class="pdlg__tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        ${p.url ? `<a class="pdlg__link" href="${p.url}" target="_blank" rel="noopener">Ver en Behance ↗</a>` : ""}
        <div class="pdlg__gallery">${imgs.map((s, j) => `<img src="${root + s}" alt="${esc(p.title)}${j ? ", imagen " + (j + 1) : ""}" loading="lazy" />`).join("")}</div>
        ${list.length > 1 ? `<nav class="pdlg__nav" aria-label="Otros proyectos">
          <button type="button" data-step="-1"><small>Anterior</small>${esc(prev.title)}</button>
          <button type="button" data-step="1"><small>Siguiente</small>${esc(next.title)}</button>
        </nav>` : ""}
      </div></div>`;
    dlg.querySelector(".pdlg__scroll").scrollTop = 0;
  }

  function open(project, opts = {}) {
    root = opts.root || "";
    list = opts.list || [project];
    idx = Math.max(0, list.indexOf(project));
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.className = "pdlg";
      dlg.setAttribute("aria-labelledby", "pdlg-title");
      document.body.appendChild(dlg);
      dlg.addEventListener("click", (e) => {
        if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();
        const step = e.target.closest("[data-step]");
        if (step) {
          idx = (idx + +step.dataset.step + list.length) % list.length;
          render();
        }
      });
      dlg.addEventListener("close", () => document.documentElement.style.removeProperty("overflow"));
    }
    render();
    document.documentElement.style.overflow = "hidden";
    dlg.showModal();
  }

  window.PortfolioDialog = { open };
})();
