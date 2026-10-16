// Selector de opciones de diseño. Aparece abajo en las 4 versiones del sitio.
// Cada página lo carga con data-root apuntando a la raíz del sitio ("" o "../../").
(function () {
  const me = document.currentScript;
  const root = me.dataset.root || "";
  const current = me.dataset.current;
  const options = [
    { id: "actual", n: "1", label: "Actual", href: root + "index.html" },
    { id: "panel", n: "2", label: "Panel de salidas", href: root + "opciones/panel/index.html" },
    { id: "sin-estilos", n: "3", label: "Sin estilos", href: root + "opciones/sin-estilos/index.html" },
    { id: "mapa", n: "4", label: "El mapa", href: root + "opciones/mapa/index.html" },
  ];

  const css = `
  .opt-switch{position:fixed;left:50%;bottom:max(14px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:2147483000;
    display:flex;align-items:center;gap:2px;padding:4px;border-radius:999px;background:#141414;color:#f4f2ee;
    font:500 12px/1 "Inter Tight",system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:calc(100vw - 32px)}
  .opt-switch__title{padding:0 10px 0 8px;opacity:.55;white-space:nowrap}
  .opt-switch a{display:flex;align-items:center;gap:6px;padding:8px 12px;border-radius:999px;color:inherit;text-decoration:none;white-space:nowrap;cursor:pointer!important}
  .opt-switch a:hover{background:rgba(255,255,255,.12)}
  .opt-switch a[aria-current="page"]{background:#f4f2ee;color:#141414}
  .opt-switch b{font:500 11px/1 "JetBrains Mono",ui-monospace,monospace;opacity:.6}
  .opt-switch a:focus-visible{outline:2px solid #f4f2ee;outline-offset:2px}
  @media (max-width:640px){.opt-switch__title{display:none}.opt-switch span{display:none}.opt-switch a[aria-current="page"] span{display:inline}.opt-switch a{padding:8px 11px}}
  @media print{.opt-switch{display:none}}`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const nav = document.createElement("nav");
  nav.className = "opt-switch";
  nav.setAttribute("aria-label", "Opciones de diseño");
  nav.innerHTML =
    `<span class="opt-switch__title">Opción</span>` +
    options
      .map(
        (o) =>
          `<a href="${o.href}"${o.id === current ? ' aria-current="page"' : ""} title="Opción ${o.n}: ${o.label}"><b>${o.n}</b><span>${o.label}</span></a>`
      )
      .join("");
  const mount = () => document.body.appendChild(nav);
  document.body ? mount() : addEventListener("DOMContentLoaded", mount);
})();
