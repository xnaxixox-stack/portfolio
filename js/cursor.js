// Cursor propio y elementos magnéticos.
// Solo con mouse (puntero fino): en pantallas táctiles se usa el cursor del sistema.
(function () {
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cursor = document.querySelector(".cursor");
  if (!fine || !cursor) {
    cursor && cursor.remove();
    return;
  }
  document.documentElement.classList.add("has-cursor");
  const label = cursor.querySelector(".cursor__label");

  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const target = { x: pos.x, y: pos.y };
  let raf = 0;
  const loop = () => {
    const k = reduce ? 1 : 0.22;
    pos.x += (target.x - pos.x) * k;
    pos.y += (target.y - pos.y) * k;
    cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.3 ? requestAnimationFrame(loop) : 0;
  };

  addEventListener("pointermove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
    cursor.classList.add("is-on");
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  document.addEventListener("pointerleave", () => cursor.classList.remove("is-on"));
  addEventListener("pointerdown", () => cursor.classList.add("is-down"));
  addEventListener("pointerup", () => cursor.classList.remove("is-down"));

  // Estados: con texto (data-cursor), sobre enlaces/botones, o sobre texto
  document.addEventListener("pointerover", (e) => {
    const withLabel = e.target.closest("[data-cursor]");
    const link = e.target.closest("a, button, [role=button], canvas");
    cursor.classList.toggle("is-label", !!withLabel);
    cursor.classList.toggle("is-link", !withLabel && !!link);
    label.textContent = withLabel ? withLabel.dataset.cursor : "";
  });

  // Magnéticos: el elemento se acerca un poco al cursor y vuelve al salir
  if (reduce) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const strength = 0.3;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
})();
