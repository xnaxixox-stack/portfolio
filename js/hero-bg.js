// Fondo duotono del hero.
// Un campo de ruido (fbm con domain warping) se pinta con solo dos colores,
// --duo-a y --duo-b, más un grano fino de impresión. El mouse empuja el campo
// y aclara la zona cercana. Sin WebGL queda el degradado CSS, que también
// sigue al mouse a través de --mx / --my.
(function () {
  const hero = document.querySelector(".hero");
  const canvas = hero && hero.querySelector(".hero__bg");
  if (!canvas) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Posición del mouse suavizada (0..1 dentro del hero) e intensidad del efecto
  const target = { x: 0.72, y: 0.3, hover: 0 };
  const pos = { x: 0.72, y: 0.3, hover: 0 };

  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    target.x = (e.clientX - r.left) / r.width;
    target.y = (e.clientY - r.top) / r.height;
    target.hover = 1;
    hero.style.setProperty("--mx", `${(target.x * 100).toFixed(1)}%`);
    hero.style.setProperty("--my", `${(target.y * 100).toFixed(1)}%`);
    if (reduce) requestFrame();
  });
  hero.addEventListener("pointerleave", () => {
    target.hover = 0;
    if (reduce) requestFrame();
  });

  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  if (!gl) {
    canvas.remove();
    return;
  }

  const vert = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;
  const frag = `
    precision mediump float;
    uniform vec2 u_res;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_hover;
    uniform vec3 u_a;
    uniform vec3 u_b;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
      return v;
    }

    void main() {
      vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
      vec2 uv = gl_FragCoord.xy / u_res;
      vec2 p = uv * aspect * 1.7;
      vec2 m = u_mouse * aspect * 1.7;

      // Influencia del mouse: empuja el campo hacia afuera y lo aclara
      float d = distance(p, m);
      float infl = exp(-d * d * 3.0) * u_hover;
      p += (p - m) * infl * 0.55;

      float t = u_time * 0.035;
      vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
      float n = fbm(p + 1.9 * q + vec2(t * 0.6, -t * 0.3));
      n += infl * 0.28;

      // Dos tonos: el umbral suave deja manchas definidas, como una impresión duotono
      float v = smoothstep(0.5, 0.62, n);

      // Grano
      float g = hash(gl_FragCoord.xy + fract(u_time * 7.0)) - 0.5;
      v = clamp(v + g * 0.09, 0.0, 1.0);

      gl_FragColor = vec4(mix(u_a, u_b, v), 1.0);
    }
  `;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
  }
  const vs = compile(gl.VERTEX_SHADER, vert);
  const fs = compile(gl.FRAGMENT_SHADER, frag);
  const prog = gl.createProgram();
  if (!vs || !fs) {
    canvas.remove();
    return;
  }
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    canvas.remove();
    return;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = {};
  ["u_res", "u_time", "u_mouse", "u_hover", "u_a", "u_b"].forEach((n) => (u[n] = gl.getUniformLocation(prog, n)));

  // Colores desde los tokens, para que siga al tema claro/oscuro
  function hexToRgb(hex) {
    const h = hex.trim().replace("#", "");
    const full = h.length === 3 ? h.replace(/./g, "$&$&") : h;
    const n = parseInt(full, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  function readColors() {
    const cs = getComputedStyle(hero);
    gl.uniform3fv(u.u_a, hexToRgb(cs.getPropertyValue("--duo-a")));
    gl.uniform3fv(u.u_b, hexToRgb(cs.getPropertyValue("--duo-b")));
    requestFrame();
  }
  new MutationObserver(readColors).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", readColors);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.round(hero.clientWidth * dpr);
    const h = Math.round(hero.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.u_res, w, h);
    }
    requestFrame();
  }
  new ResizeObserver(resize).observe(hero);

  // Solo se anima mientras el hero está en pantalla y la pestaña visible
  let onScreen = true;
  new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
    if (onScreen) requestFrame();
  }).observe(hero);
  document.addEventListener("visibilitychange", requestFrame);

  const start = performance.now();
  let raf = 0;
  function requestFrame() {
    if (!raf) raf = requestAnimationFrame(draw);
  }
  function draw(now) {
    raf = 0;
    const k = reduce ? 1 : 0.08;
    pos.x += (target.x - pos.x) * k;
    pos.y += (target.y - pos.y) * k;
    pos.hover += (target.hover - pos.hover) * (reduce ? 1 : 0.05);

    // Con movimiento reducido el campo queda quieto; solo responde al mouse
    gl.uniform1f(u.u_time, reduce ? 12.0 : (now - start) / 1000 + 12.0);
    gl.uniform2f(u.u_mouse, pos.x, 1 - pos.y);
    gl.uniform1f(u.u_hover, pos.hover);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!reduce && onScreen && !document.hidden) requestFrame();
  }

  resize();
  readColors();
})();
