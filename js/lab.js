// Laboratorio: (1) cambio de modo de tokens de Lyra sobre un componente real,
// (2) grafo del mapa agéntico con física simple.
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Modos de Lyra ---------- */
  // Valores de los tokens primitivos de Lyra para cada modo (Variables de Figma)
  const MODES = {
    retail: {
      "--color-primary-700": "#78028a",
      "--color-primary-500": "#ab13c5",
      "--color-primary-50": "#f8dcfd",
      "--color-primary-10": "#fcf1fe",
      "--color-secondary-600": "#22a907",
      "--color-tertiary-500": "#d9008a",
    },
    corpo: {
      "--color-primary-700": "#314b59",
      "--color-primary-500": "#537383",
      "--color-primary-50": "#e9eff1",
      "--color-primary-10": "#f6f8f9",
      "--color-secondary-600": "#61676a",
      "--color-tertiary-500": "#31c513",
    },
  };
  const flight = document.getElementById("flight");
  const tokenList = document.getElementById("mode-tokens");
  const switchEl = document.querySelector(".modes__switch");
  if (flight && tokenList && switchEl) {
    tokenList.innerHTML = Object.keys(MODES.retail)
      .map((name) => `<li data-token="${name}"><i></i><code>${name}</code><span></span></li>`)
      .join("");
    const apply = (mode) => {
      const values = MODES[mode];
      Object.entries(values).forEach(([name, value]) => {
        flight.style.setProperty(name, value);
        const row = tokenList.querySelector(`[data-token="${name}"]`);
        row.querySelector("i").style.background = value;
        const span = row.querySelector("span");
        if (span.textContent !== value) {
          span.textContent = value;
          row.classList.remove("is-changed");
          void row.offsetWidth;
          row.classList.add("is-changed");
        }
      });
      flight.dataset.mode = mode;
      switchEl.dataset.mode = mode;
      switchEl.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    };
    switchEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-mode]");
      if (btn) apply(btn.dataset.mode);
    });
    apply("retail");
  }

  /* ---------- 2. Grafo del mapa agéntico ---------- */
  const canvas = document.getElementById("graph");
  const tip = document.getElementById("graph-tip");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const FAMILIES = {
    Base: ["button", "link", "badges", "alerts", "input", "checkbox", "toggle", "dropdown", "tabs", "tooltip", "modal", "drawer", "accordion", "skeleton"],
    Navegación: ["stepper", "header", "corp header", "breadcrumb", "footer", "menu-tabs"],
    "Vuelo y búsqueda": ["card-flight", "schedule", "destination", "searchbox", "days-carousel", "rates-cards", "flight-status"],
    "Contenido y pago": ["card-base", "card-price-display", "cards-ancillaries", "cards-details", "card-passenger-info", "selection-card"],
    "Formulario y layout": ["date-picker", "file-uploader", "modal-passenger", "select-number", "table-cell", "table-pagination"],
  };
  const AGENTS = {
    "Investigación UX": "Agente que investiga experiencias de aerolíneas antes de diseñar.",
    Benchmarking: "Agente que compara a SKY con otras aerolíneas.",
    "Legibilidad de íconos": "Agente que revisa si los íconos se entienden.",
    "Diseño con Lyra": "Agente que arma pantallas solo con componentes de Lyra.",
  };
  const COMMANDS = {
    auditar: "Revisa que diseño y código usen los tokens.",
    sincronizar: "Sincroniza el mapa con Figma.",
    generar: "Genera componentes nuevos sobre el sistema.",
    corregir: "Reemplaza valores escritos a mano por tokens.",
  };

  const nodes = [];
  const links = [];
  const add = (n) => (nodes.push({ x: 0, y: 0, vx: 0, vy: 0, ...n }), nodes.length - 1);
  const hub = add({ label: "Lyra", type: "hub", r: 14, info: "208 componentes · tokens en una sola fuente" });
  Object.entries(FAMILIES).forEach(([fam, comps]) => {
    const f = add({ label: fam, type: "family", r: 7, info: `Familia · ${comps.length} componentes en esta muestra` });
    links.push([hub, f, 90]);
    comps.forEach((c) => {
      const n = add({ label: c, type: "component", r: 3, info: `Componente · ${fam}` });
      links.push([f, n, 38]);
    });
  });
  // Agentes y comandos quedan anclados en un anillo alrededor de Lyra, alternados
  const outer = [];
  const agentList = Object.entries(AGENTS);
  const commandList = Object.entries(COMMANDS);
  agentList.forEach(([a, info], i) => {
    outer.push(add({ label: a, type: "agent", r: 6, info }));
    const [c, cinfo] = commandList[i];
    outer.push(add({ label: c, type: "command", r: 5, info: cinfo }));
  });
  outer.forEach((n) => links.push([hub, n, 0]));
  const neighbors = nodes.map(() => new Set());
  links.forEach(([a, b]) => (neighbors[a].add(b), neighbors[b].add(a)));

  let W = 0;
  let H = 0;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    W = r.width;
    H = r.height;
    if (outer) anchor();
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    wake();
  };
  // Posición inicial en anillos, para que el primer cuadro ya se lea ordenado
  const anchor = () => {
    const rx = W * 0.4;
    const ry = H * 0.42;
    outer.forEach((idx, k) => {
      const a = -Math.PI / 2 + (k / outer.length) * Math.PI * 2 + Math.PI / outer.length;
      nodes[idx].ax = W / 2 + Math.cos(a) * rx;
      nodes[idx].ay = H / 2 + Math.sin(a) * ry;
    });
    nodes[hub].ax = W / 2;
    nodes[hub].ay = H / 2;
  };
  const seed = () => {
    anchor();
    nodes.forEach((n, i) => {
      if (n.ax !== undefined) {
        n.x = n.ax;
        n.y = n.ay;
        return;
      }
      const ring = n.type === "hub" ? 0 : n.type === "family" ? 0.22 : n.type === "component" ? 0.36 : 0.44;
      const a = (i / nodes.length) * Math.PI * 2 * 3.1;
      n.x = W / 2 + Math.cos(a) * ring * Math.min(W, H) * 1.1;
      n.y = H / 2 + Math.sin(a) * ring * Math.min(W, H);
    });
  };

  // Colores del tema
  const colors = {};
  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    ["--fg", "--muted", "--line", "--bg"].forEach((k) => (colors[k] = cs.getPropertyValue(k).trim()));
    wake();
  };

  let hover = -1;
  let drag = -1;
  const mouse = { x: -999, y: -999 };
  let energy = 1;

  const step = () => {
    const k = 0.012;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let d2 = dx * dx + dy * dy || 0.01;
        if (d2 > 40000) continue;
        const f = 180 / d2;
        dx *= f;
        dy *= f;
        a.vx += dx;
        a.vy += dy;
        b.vx -= dx;
        b.vy -= dy;
      }
    }
    links.forEach(([ia, ib, len]) => {
      if (!len) return; // los anclados no usan resorte
      const a = nodes[ia];
      const b = nodes[ib];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 1;
      const f = (d - len * Math.min(1, Math.min(W, H) / 420)) * k;
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    });
    let total = 0;
    nodes.forEach((n, i) => {
      // Centro y repulsión suave del cursor
      if (n.ax !== undefined) {
        n.vx += (n.ax - n.x) * 0.06;
        n.vy += (n.ay - n.y) * 0.06;
      } else {
        n.vx += (W / 2 - n.x) * 0.004;
        n.vy += (H / 2 - n.y) * 0.004;
      }
      const mx = n.x - mouse.x;
      const my = n.y - mouse.y;
      const md = mx * mx + my * my;
      if (md < 4900 && i !== drag) {
        n.vx += (mx / Math.sqrt(md || 1)) * 0.6;
        n.vy += (my / Math.sqrt(md || 1)) * 0.6;
      }
      if (i === drag) {
        n.x = mouse.x;
        n.y = mouse.y;
        n.vx = n.vy = 0;
        return;
      }
      n.vx *= 0.82;
      n.vy *= 0.82;
      n.x = Math.min(Math.max(n.x + n.vx, 12), W - 12);
      n.y = Math.min(Math.max(n.y + n.vy, 12), H - 12);
      total += Math.abs(n.vx) + Math.abs(n.vy);
    });
    energy = total / nodes.length;
  };

  const shape = (n, fill) => {
    ctx.beginPath();
    if (n.type === "agent") {
      ctx.moveTo(n.x, n.y - n.r * 1.3);
      ctx.lineTo(n.x + n.r * 1.3, n.y);
      ctx.lineTo(n.x, n.y + n.r * 1.3);
      ctx.lineTo(n.x - n.r * 1.3, n.y);
      ctx.closePath();
    } else if (n.type === "command") {
      ctx.rect(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2);
    } else {
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    }
    if (fill) ctx.fill();
    else ctx.stroke();
  };

  const render = () => {
    ctx.clearRect(0, 0, W, H);
    const lit = hover >= 0 ? new Set([hover, ...neighbors[hover]]) : null;
    if (hover === hub) nodes.forEach((_, i) => lit.add(i));
    ctx.lineWidth = 1;
    links.forEach(([a, b]) => {
      const on = lit && lit.has(a) && lit.has(b) && (a === hover || b === hover || hover === hub);
      ctx.strokeStyle = on ? colors["--fg"] : colors["--line"];
      ctx.globalAlpha = lit && !on ? 0.35 : 1;
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y);
      ctx.lineTo(nodes[b].x, nodes[b].y);
      ctx.stroke();
    });
    ctx.font = "500 11px 'JetBrains Mono', ui-monospace, monospace";
    ctx.textBaseline = "middle";
    nodes.forEach((n, i) => {
      const dim = lit && !lit.has(i);
      ctx.globalAlpha = dim ? 0.25 : 1;
      ctx.fillStyle = n.type === "component" ? colors["--muted"] : colors["--fg"];
      ctx.strokeStyle = colors["--fg"];
      ctx.lineWidth = 1.5;
      if (n.type === "family" || n.type === "command") {
        ctx.fillStyle = colors["--bg"];
        shape(n, true);
        shape(n, false);
      } else {
        shape(n, true);
      }
      const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < 60;
      // En pantallas angostas los agentes y comandos solo se rotulan al tocarlos
      const compact = W < 520 && (n.type === "agent" || n.type === "command");
      const quiet = n.type === "component" || compact;
      const showLabel = !quiet || i === hover || (lit && lit.has(i) && hover !== hub) || near;
      if (showLabel && !dim) {
        ctx.fillStyle = n.type === "component" ? colors["--muted"] : colors["--fg"];
        // En la mitad derecha la etiqueta va a la izquierda del nodo, para no salirse
        const right = n.x > W * 0.62;
        ctx.textAlign = right ? "right" : "left";
        ctx.fillText(n.label, right ? n.x - n.r - 6 : n.x + n.r + 6, n.y);
      }
    });
    ctx.globalAlpha = 1;
  };

  let raf = 0;
  let visible = true;
  function wake() {
    // Con movimiento reducido no hay animación: se acomoda y se dibuja quieto
    if (reduce) {
      if (!W) return;
      for (let i = 0; i < 60; i++) step();
      render();
      return;
    }
    energy = Math.max(energy, 1);
    if (!raf && visible) raf = requestAnimationFrame(frame);
  }
  function frame() {
    raf = 0;
    step();
    render();
    // Se detiene cuando el grafo queda quieto, para no gastar batería
    if (visible && (energy > 0.02 || drag >= 0)) raf = requestAnimationFrame(frame);
  }

  const nodeAt = (x, y) => {
    let best = -1;
    let bestD = 18 * 18;
    nodes.forEach((n, i) => {
      const d = (n.x - x) ** 2 + (n.y - y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  };
  const setTip = () => {
    tip.textContent = hover >= 0 ? `${nodes[hover].label} — ${nodes[hover].info}` : "";
  };
  const local = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  canvas.addEventListener("pointermove", (e) => {
    const p = local(e);
    mouse.x = p.x;
    mouse.y = p.y;
    if (drag < 0) {
      const h = nodeAt(p.x, p.y);
      if (h !== hover) {
        hover = h;
        setTip();
      }
    }
    canvas.style.cursor = hover >= 0 ? "grab" : "";
    wake();
  });
  canvas.addEventListener("pointerdown", (e) => {
    const p = local(e);
    drag = nodeAt(p.x, p.y);
    if (drag >= 0) {
      canvas.setPointerCapture(e.pointerId);
      hover = drag;
      setTip();
    }
    wake();
  });
  const release = () => {
    drag = -1;
    wake();
  };
  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", release);
  canvas.addEventListener("pointerleave", () => {
    mouse.x = mouse.y = -999;
    if (drag < 0) {
      hover = -1;
      setTip();
    }
    wake();
  });

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) wake();
  }).observe(canvas);
  new MutationObserver(readColors).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", readColors);

  readColors();
  resize();
  seed();
  // Con movimiento reducido se calcula el reposo de una vez y se dibuja quieto
  if (reduce) for (let i = 0; i < 400; i++) step();
  wake();
})();
