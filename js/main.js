(function () {
  const { profile, projects } = window.PORTFOLIO;

  document.querySelectorAll("[data-bind]").forEach((el) => {
    el.textContent = profile[el.dataset.bind] ?? "";
  });
  document.title = `${profile.name} — ${profile.role}`;
  document.getElementById("year").textContent = new Date().getFullYear();

  // Casos destacados
  const { featured } = window.PORTFOLIO;
  document.getElementById("featured").innerHTML = featured
    .map(
      (p) => `
      <article class="case">
        ${
          p.url
            ? `<a class="case__cover" href="${p.url}" target="_blank" rel="noopener"><img src="${p.cover}" alt="${p.title}" /></a>`
            : `<div class="case__cover"><img src="${p.cover}" alt="${p.title}" /></div>`
        }
        <div class="case__info">
          <p class="case__meta">${p.category} · ${p.year}</p>
          <h3 class="case__title">${p.title}</h3>
          <p class="case__summary">${p.summary}</p>
          <ul class="case__highlights">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
          <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
          ${p.url ? `<a class="case__link" href="${p.url}" target="_blank" rel="noopener">Ver caso en Behance ↗</a>` : ""}
        </div>
        <div class="case__details">
          ${p.details.map((d) => `<img src="${d}" alt="${p.title}, detalle" loading="lazy" />`).join("")}
        </div>
      </article>`
    )
    .join("");

  // Más proyectos
  const list = document.getElementById("projects");
  list.innerHTML = projects
    .map(
      (p) => `
      <a class="project" href="${p.url}" target="_blank" rel="noopener">
        <div class="project__media">
          <img src="${p.cover}" alt="${p.title}" loading="lazy" />
        </div>
        <div class="project__meta">
          <h3 class="project__title">${p.title}</h3>
          <span class="project__cat">${p.category}</span>
          <span class="project__year">${p.year}</span>
        </div>
      </a>`
    )
    .join("");

  // Sobre mí
  document.getElementById("about-text").innerHTML = profile.about
    .map((t) => `<p>${t}</p>`)
    .join("");
  document.getElementById("skills").innerHTML = profile.skills
    .map((s) => `<li>${s}</li>`)
    .join("");

  // Contacto
  const mail = document.getElementById("mail");
  mail.href = `mailto:${profile.links.email}`;
  mail.textContent = profile.links.email;
  const labels = { behance: "Behance", linkedin: "LinkedIn" };
  document.getElementById("links").innerHTML = Object.entries(labels)
    .filter(([k]) => profile.links[k])
    .map(([k, label]) => `<li><a href="${profile.links[k]}" target="_blank" rel="noopener">${label} ↗</a></li>`)
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
  const updateNav = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  // Hero: separa el titular en palabras para animarlas una a una
  const title = document.querySelector(".hero__title");
  title.innerHTML = title.textContent
    .split(" ")
    .map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`)
    .join(" ");

  // Aparición al hacer scroll
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const groups = [
    // [selector, clase, retraso entre elementos hermanos en ms]
    [".section", null, 0],
    [".section h2", "reveal", 0],
    [".case__cover, .case__details img, .project__media, .about__photo", "reveal-img", 120],
    [".case__meta, .case__title, .case__summary, .case__highlights li, .case__info .tags, .case__link", "reveal", 70],
    [".project__meta", "reveal", 120],
    ["#about-text p, #skills", "reveal", 120],
    [".contact > *", "reveal", 100],
  ];
  const targets = [];
  groups.forEach(([sel, cls, step]) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (cls) el.classList.add(cls);
      // Retraso escalonado según la posición entre sus hermanos del mismo grupo
      const siblings = [...el.parentElement.children].filter((c) => c.matches(sel));
      const i = siblings.indexOf(el);
      if (step && i > 0) el.style.setProperty("--d", `${Math.min(i, 6) * step}ms`);
      targets.push(el);
    });
  });
  // Los detalles de un caso y las tarjetas de proyecto se escalonan por posición
  document.querySelectorAll(".case__details img").forEach((el, i) => el.style.setProperty("--d", `${(i % 2) * 140}ms`));
  document.querySelectorAll(".project").forEach((card, i) => {
    const d = `${(i % 3) * 120}ms`;
    card.querySelectorAll(".project__media, .project__meta").forEach((el) => el.style.setProperty("--d", d));
  });

  if (!reduce && "IntersectionObserver" in window) {
    // Las imágenes ocultas con clip-path no tienen área visible, así que se
    // observa su contenedor y al entrar se revelan todos los elementos asociados.
    const byTrigger = new Map();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          byTrigger.get(e.target).forEach((el) => {
            el.classList.remove("is-pending");
            el.classList.add("is-visible");
          });
          io.unobserve(e.target);
        }),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
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
