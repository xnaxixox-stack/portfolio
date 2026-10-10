(function () {
  const { profile, projects } = window.PORTFOLIO;

  document.querySelectorAll("[data-bind]").forEach((el) => {
    el.textContent = profile[el.dataset.bind] ?? "";
  });
  document.title = `${profile.name} — ${profile.role}`;
  document.getElementById("year").textContent = new Date().getFullYear();

  // Proyectos
  const list = document.getElementById("projects");
  list.innerHTML = projects
    .map(
      (p, i) => `
      <a class="project" href="${p.url}" target="_blank" rel="noopener">
        <div class="project__media" style="--tone:${p.tone || "#ddd"}">
          ${p.cover ? `<img src="${p.cover}" alt="${p.title}" loading="lazy" />` : ""}
        </div>
        <div class="project__meta">
          <span class="project__index">${String(i + 1).padStart(2, "0")}</span>
          <h3 class="project__title">${p.title}</h3>
          <span class="project__cat">${p.category}</span>
          <span class="project__year">${p.year}</span>
        </div>
        <p class="project__summary">${p.summary}</p>
      </a>`
    )
    .join("");

  // Vista grid / índice
  const buttons = document.querySelectorAll("[data-view]");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
      list.className = `projects projects--${btn.dataset.view}`;
    })
  );

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
  const labels = { behance: "Behance", linkedin: "LinkedIn", dribbble: "Dribbble" };
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

  // Aparición suave al hacer scroll
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".project, .section h2, .about__body, .contact").forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
})();
