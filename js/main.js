(function () {
  const { profile, featured, projects } = window.PORTFOLIO;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const pad = (n) => String(n).padStart(2, "0");

  document.querySelectorAll("[data-bind]").forEach((el) => {
    el.textContent = profile[el.dataset.bind] ?? "";
  });
  document.title = `${profile.name} — ${profile.role}`;
  document.getElementById("year").textContent = new Date().getFullYear();

  // Hora en Santiago, en vivo
  const clock = document.getElementById("clock");
  const fmt = new Intl.DateTimeFormat("es-CL", { hour: "2-digit", minute: "2-digit", timeZone: "America/Santiago" });
  const tick = () => (clock.textContent = fmt.format(new Date()));
  tick();
  setInterval(tick, 15000);

  // Marquee de habilidades: se repite para que el loop no tenga cortes
  const marquee = document.getElementById("marquee");
  const chunk = profile.skills.map((s) => `<span>${s}</span><i>✳</i>`).join("");
  marquee.innerHTML = `<div class="marquee__group">${chunk}</div>`.repeat(4);

  // Casos destacados: tarjetas que se apilan al hacer scroll
  document.getElementById("case-count").textContent = `${pad(featured.length)} casos`;
  document.getElementById("featured").innerHTML = featured
    .map((p, i) => {
      const slides = [p.cover, ...p.details];
      return `
      <article class="card" style="--i:${i}">
        <div class="card__inner">
          <div class="card__media" data-cursor="Siguiente" role="button" tabindex="0" aria-label="Siguiente imagen de ${p.title}">
            ${slides
              .map(
                (src, j) =>
                  `<img src="${src}" alt="${j ? `${p.title}, detalle ${j}` : p.title}" class="${j ? "" : "is-active"}" ${
                    i > 0 || j > 0 ? 'loading="lazy"' : ""
                  } />`
              )
              .join("")}
            <span class="card__counter"><b>01</b> / ${pad(slides.length)}</span>
          </div>
          <div class="card__info">
            <p class="card__meta"><span>${pad(i + 1)}</span>${p.category} · ${p.year}</p>
            <h3 class="card__title">${p.title}</h3>
            <p class="card__summary">${p.summary}</p>
            <ul class="card__highlights">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
            <div class="card__foot">
              <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
              ${p.url ? `<a class="card__link" href="${p.url}" target="_blank" rel="noopener" data-magnetic>Ver en Behance ↗</a>` : ""}
            </div>
          </div>
        </div>
      </article>`;
    })
    .join("");

  // Galería de cada tarjeta: clic (o Enter) avanza con una cortina
  document.querySelectorAll(".card__media").forEach((media) => {
    const imgs = [...media.querySelectorAll("img")];
    const counter = media.querySelector(".card__counter b");
    let current = 0;
    const next = () => {
      const prev = imgs[current];
      current = (current + 1) % imgs.length;
      imgs.forEach((im) => im.classList.remove("is-leaving"));
      prev.classList.remove("is-active");
      prev.classList.add("is-leaving");
      imgs[current].classList.add("is-active");
      counter.textContent = pad(current + 1);
    };
    media.addEventListener("click", next);
    media.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        next();
      }
    });
  });

  // Apilado: la tarjeta de atrás se achica y oscurece mientras la siguiente la cubre
  const cards = [...document.querySelectorAll(".card")];
  const stackable = () => innerWidth > 1000 && !reduce;
  let stackTick = false;
  const updateStack = () => {
    stackTick = false;
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      let p = 0;
      if (next && stackable()) {
        const a = card.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        p = Math.min(Math.max((a.bottom - b.top) / a.height, 0), 1);
      }
      card.style.setProperty("--cover", p.toFixed(3));
    });
  };
  addEventListener("scroll", () => {
    if (!stackTick) {
      stackTick = true;
      requestAnimationFrame(updateStack);
    }
  }, { passive: true });
  addEventListener("resize", updateStack);
  updateStack();

  // Más proyectos: lista con vista previa que sigue al cursor
  const list = document.getElementById("projects");
  list.innerHTML = projects
    .map(
      (p, i) => `
      <li>
        <a class="row" href="${p.url}" target="_blank" rel="noopener" data-src="${p.cover}" data-i="${i}" data-cursor="Ver">
          <span class="row__n">${pad(i + 1)}</span>
          <span class="row__title">${p.title}</span>
          <span class="row__cat">${p.category}</span>
          <span class="row__year">${p.year}</span>
          <img class="row__thumb" src="${p.cover}" alt="" loading="lazy" />
        </a>
      </li>`
    )
    .join("");

  // Cada fila abre la ficha del proyecto (el href a Behance queda como respaldo)
  list.addEventListener("click", (e) => {
    const row = e.target.closest(".row");
    if (!row || !window.PortfolioDialog || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    PortfolioDialog.open(projects[+row.dataset.i], { list: projects });
  });

  const preview = document.querySelector(".list__preview");
  const previewImg = document.getElementById("list-preview-img");
  if (fine && !reduce) {
    const pos = { x: 0, y: 0, tx: 0, ty: 0, vx: 0 };
    let raf = 0;
    const loop = () => {
      const dx = pos.tx - pos.x;
      pos.x += dx * 0.14;
      pos.y += (pos.ty - pos.y) * 0.14;
      pos.vx += (dx * 0.04 - pos.vx) * 0.2;
      // La vista previa va a la derecha del cursor; cerca del borde, a la izquierda
      const side = pos.x + 420 > innerWidth ? -380 : 40;
      preview.style.transform = `translate3d(${pos.x + side}px, ${pos.y}px, 0) rotate(${Math.max(-8, Math.min(8, pos.vx))}deg)`;
      raf = preview.classList.contains("is-on") || Math.abs(dx) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    list.addEventListener("pointermove", (e) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    list.querySelectorAll(".row").forEach((row) => {
      row.addEventListener("pointerenter", (e) => {
        if (!preview.classList.contains("is-on")) {
          pos.x = pos.tx = e.clientX;
          pos.y = pos.ty = e.clientY;
        }
        previewImg.src = row.dataset.src;
        preview.classList.add("is-on");
        list.classList.add("is-hovering");
        row.classList.add("is-hover");
      });
      row.addEventListener("pointerleave", () => row.classList.remove("is-hover"));
    });
    list.addEventListener("pointerleave", () => {
      preview.classList.remove("is-on");
      list.classList.remove("is-hovering");
    });
  }

  // Sobre mí
  document.getElementById("about-text").innerHTML = profile.about.map((t) => `<p>${t}</p>`).join("");
  document.getElementById("skills").innerHTML = profile.skills.map((s) => `<li>${s}</li>`).join("");

  // Contacto: el correo se arma letra por letra para la ola al pasar el cursor
  const mail = document.getElementById("mail");
  mail.href = `mailto:${profile.links.email}`;
  mail.setAttribute("aria-label", profile.links.email);
  mail.innerHTML = [...profile.links.email]
    .map((ch, i) => `<span aria-hidden="true" style="--i:${i}">${ch}</span>`)
    .join("");
  const copyBtn = document.getElementById("copy-mail");
  copyBtn.addEventListener("click", () => {
    const done = () => {
      copyBtn.textContent = "Correo copiado";
      setTimeout(() => (copyBtn.textContent = "Copiar correo"), 2000);
    };
    const selectText = () => {
      const range = document.createRange();
      range.selectNodeContents(mail);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(profile.links.email).then(done, selectText);
    } else {
      selectText();
    }
  });
  const labels = { behance: "Behance", linkedin: "LinkedIn" };
  document.getElementById("links").innerHTML = Object.entries(labels)
    .filter(([k]) => profile.links[k])
    .map(([k, label]) => `<li><a href="${profile.links[k]}" target="_blank" rel="noopener" data-magnetic>${label} ↗</a></li>`)
    .join("");

  // Tema claro / oscuro
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (e) {}
  document.querySelector(".theme-toggle").addEventListener("click", () => {
    const dark =
      root.dataset.theme === "dark" ||
      (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    root.dataset.theme = dark ? "light" : "dark";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch (e) {}
  });

  // Header: transparente arriba del todo, con fondo al hacer scroll
  const nav = document.querySelector(".nav");
  const updateNav = () => nav.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  // Hero: separa el titular en palabras para animarlas una a una
  const title = document.querySelector(".hero__title");
  title.innerHTML = title.textContent
    .split(" ")
    .map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`)
    .join(" ");

  // Marquee: avanza solo y acelera (o cambia de sentido) con la velocidad del scroll
  if (!reduce) {
    let x = 0;
    let boost = 0;
    let dir = -1;
    let lastY = scrollY;
    let width = 0;
    const measure = () => (width = marquee.firstElementChild.offsetWidth);
    measure();
    addEventListener("resize", measure);
    addEventListener("scroll", () => {
      const dy = scrollY - lastY;
      lastY = scrollY;
      if (dy) dir = dy > 0 ? -1 : 1;
      boost = Math.min(Math.abs(dy) * 0.6, 40);
    }, { passive: true });
    const run = () => {
      boost *= 0.92;
      x += dir * (0.6 + boost);
      if (width) x = ((x % width) + width) % width - width;
      marquee.style.transform = `translate3d(${x}px,0,0) skewX(${(-dir * boost * 0.35).toFixed(2)}deg)`;
      requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  // Aparición al hacer scroll
  const groups = [
    // [selector, clase, retraso entre elementos hermanos en ms]
    [".section", null, 0],
    [".section h2, .section__count, .section__note", "reveal", 0],
    [".about__photo", "reveal-img", 0],
    [".lab__item", "reveal", 140],
    [".list li", "reveal", 90],
    ["#about-text p, #skills", "reveal", 120],
    [".contact > *", "reveal", 100],
  ];
  const targets = [];
  groups.forEach(([sel, cls, step]) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (cls) el.classList.add(cls);
      const siblings = [...el.parentElement.children].filter((c) => c.matches(sel));
      const i = siblings.indexOf(el);
      if (step && i > 0) el.style.setProperty("--d", `${Math.min(i, 6) * step}ms`);
      targets.push(el);
    });
  });

  if (!reduce && "IntersectionObserver" in window) {
    // Las imágenes ocultas con clip-path no tienen área visible, así que se
    // observa su contenedor y al entrar se revelan todos los elementos asociados.
    const byTrigger = new Map();
    const reveal = (trigger) => {
      const els = byTrigger.get(trigger);
      if (!els) return;
      els.forEach((el) => {
        el.classList.remove("is-pending");
        el.classList.add("is-visible");
      });
      byTrigger.delete(trigger);
      io.unobserve(trigger);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && reveal(e.target)),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    // Respaldo: con un scroll muy rápido el observer puede saltarse elementos
    // chicos que cruzan la pantalla entre dos cuadros; se revela todo lo que ya pasó.
    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking || !byTrigger.size) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const limit = innerHeight * 0.88;
        [...byTrigger.keys()].forEach((t) => t.getBoundingClientRect().top < limit && reveal(t));
      });
    }, { passive: true });
    // Solo se ocultan los que empiezan fuera de pantalla; lo visible al cargar queda tal cual
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top <= innerHeight) return;
      const trigger = el.classList.contains("reveal-img") ? el.parentElement : el;
      if (!byTrigger.has(trigger)) {
        byTrigger.set(trigger, []);
        io.observe(trigger);
      }
      byTrigger.get(trigger).push(el);
      el.classList.add("is-pending");
    });
  }
})();
