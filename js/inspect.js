// Modo inspección: muestra el sistema detrás de la página, como el Dev Mode de Figma.
// Grilla de 12 columnas, caja del elemento bajo el cursor con su padding, y una
// etiqueta con tipografía, medidas y el token de color que usa.
(function () {
  const root = document.documentElement;
  const layer = document.querySelector(".inspect");
  const toggle = document.querySelector(".inspect-toggle");
  if (!layer || !toggle) return;

  const box = layer.querySelector(".inspect__box");
  const padEl = layer.querySelector(".inspect__pad");
  const label = layer.querySelector(".inspect__label");
  const grid = layer.querySelector(".inspect__grid");
  grid.innerHTML = "<span></span>".repeat(12);

  let on = false;
  let current = null;

  // Tokens de color: se leen del CSS para que siga al tema claro/oscuro
  const tokenNames = ["--bg", "--fg", "--muted", "--line", "--accent", "--duo-b"];
  const probe = document.createElement("i");
  probe.style.display = "none";
  document.body.appendChild(probe);
  const resolve = (value) => {
    probe.style.color = value;
    return getComputedStyle(probe).color;
  };
  let tokens = [];
  const readTokens = () => {
    const cs = getComputedStyle(root);
    tokens = tokenNames.map((n) => ({ name: n, rgb: resolve(cs.getPropertyValue(n).trim()) }));
  };
  readTokens();
  new MutationObserver(readTokens).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", readTokens);

  const toHex = (rgb) => {
    const m = rgb.match(/\d+(\.\d+)?/g);
    if (!m) return rgb;
    return "#" + m.slice(0, 3).map((v) => (+v).toString(16).padStart(2, "0")).join("");
  };
  // Además de los tokens de la página, reconoce los de Lyra que use el elemento
  const lyraTokens = ["--color-primary-700", "--color-primary-500", "--color-primary-50", "--color-primary-10", "--color-secondary-600", "--color-tertiary-500"];
  const tokenFor = (rgb, cs) => {
    const own = lyraTokens.find((n) => {
      const v = cs.getPropertyValue(n).trim();
      return v && resolve(v) === rgb;
    });
    if (own) return own;
    const t = tokens.find((t) => t.rgb === rgb);
    return t ? t.name : toHex(rgb);
  };
  const isTransparent = (c) => c === "transparent" || /rgba\(.*,\s*0\)$/.test(c);

  const describe = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const cls = typeof el.className === "string" && el.className.trim() ? "." + el.className.trim().split(/\s+/)[0] : "";
    const family = cs.fontFamily.split(",")[0].replace(/["']/g, "");
    const size = Math.round(parseFloat(cs.fontSize));
    const lh = cs.lineHeight === "normal" ? "auto" : Math.round(parseFloat(cs.lineHeight));
    const rows = [
      `<b>${el.tagName.toLowerCase()}${cls}</b><span>${Math.round(r.width)} × ${Math.round(r.height)}</span>`,
    ];
    if (el.innerText && el.innerText.trim()) {
      rows.push(`<em>Texto</em><span>${family} · ${size}/${lh} · ${cs.fontWeight}</span>`);
      rows.push(`<em>Color</em><span><i style="background:${cs.color}"></i>${tokenFor(cs.color, cs)}</span>`);
    }
    if (!isTransparent(cs.backgroundColor)) {
      rows.push(`<em>Fondo</em><span><i style="background:${cs.backgroundColor}"></i>${tokenFor(cs.backgroundColor, cs)}</span>`);
    }
    const p = ["Top", "Right", "Bottom", "Left"].map((s) => Math.round(parseFloat(cs["padding" + s])));
    if (p.some(Boolean)) rows.push(`<em>Padding</em><span>${p.join(" · ")}</span>`);
    if (cs.borderRadius !== "0px") rows.push(`<em>Radio</em><span>${cs.borderRadius}</span>`);
    if (cs.display.includes("grid") || cs.display.includes("flex")) {
      const gap = cs.gap && cs.gap !== "normal" ? ` · gap ${cs.gap}` : "";
      rows.push(`<em>Layout</em><span>${cs.display}${gap}</span>`);
    }
    return { rows, r, p };
  };

  const draw = () => {
    if (!current || !on) return;
    const { rows, r, p } = describe(current);
    box.style.transform = `translate(${r.left}px, ${r.top}px)`;
    box.style.width = `${r.width}px`;
    box.style.height = `${r.height}px`;
    padEl.style.inset = `${p[0]}px ${p[1]}px ${p[2]}px ${p[3]}px`;
    label.innerHTML = rows.map((row) => `<div>${row}</div>`).join("");
    // La etiqueta va bajo la caja; si no cabe, arriba. Siempre dentro de la pantalla.
    const lw = label.offsetWidth;
    const lh = label.offsetHeight;
    let x = Math.min(Math.max(r.left, 8), innerWidth - lw - 8);
    let y = r.bottom + 8;
    if (y + lh > innerHeight - 8) y = Math.max(r.top - lh - 8, 8);
    label.style.transform = `translate(${x}px, ${y}px)`;
    layer.classList.add("has-target");
  };

  const pick = (e) => {
    if (!on) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || el === document.body || el === root || el.closest(".inspect, .cursor")) return;
    if (el !== current) {
      current = el;
      draw();
    }
  };

  const set = (state) => {
    on = state;
    root.classList.toggle("is-inspecting", on);
    toggle.setAttribute("aria-pressed", String(on));
    if (!on) {
      current = null;
      layer.classList.remove("has-target");
    }
  };

  toggle.addEventListener("click", () => set(!on));
  addEventListener("keydown", (e) => {
    if (e.target.closest && e.target.closest("input, textarea, [contenteditable]")) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "i" || e.key === "I") set(!on);
    if (e.key === "Escape" && on) set(false);
  });
  addEventListener("pointermove", pick, { passive: true });
  addEventListener("pointerdown", pick, { passive: true });
  addEventListener("scroll", () => requestAnimationFrame(draw), { passive: true });
  addEventListener("resize", draw);
})();
