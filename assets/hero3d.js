import * as THREE from "./vendor/three.module.min.js";

/* A 3D extrusion of the brand's 5-petal flower mark — gold, glass-centered,
   dramatically lit. Built from primitives (no external model files). */
export function buildFlower() {
  const group = new THREE.Group();

  const petalShape = new THREE.Shape();
  petalShape.absellipse(0, 0, 0.38, 1.1, 0, Math.PI * 2, false, 0);

  const petalGeo = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.17,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 4,
    curveSegments: 32,
  });
  petalGeo.center();

  const petalMat = new THREE.MeshPhysicalMaterial({
    color: 0xc9a463,
    metalness: 0.85,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  });

  const petalCount = 5;
  const radius = 0.71;
  for (let i = 0; i < petalCount; i++) {
    const petal = new THREE.Mesh(petalGeo, petalMat);
    petal.rotation.x = -0.5; // tilt the petal open toward the camera
    petal.position.set(0, radius * 0.72, radius * 0.5);

    const holder = new THREE.Group();
    holder.add(petal);
    holder.rotation.z = (i / petalCount) * Math.PI * 2;
    group.add(holder);
  }

  const gem = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.26, 2),
    new THREE.MeshPhysicalMaterial({
      color: 0xfff7ea,
      metalness: 0,
      roughness: 0.05,
      transmission: 1,
      thickness: 0.6,
      ior: 1.5,
      clearcoat: 1,
    })
  );
  group.add(gem);

  group.rotation.x = 0.35; // present at a dramatic 3/4 angle by default
  return group;
}

/* Sparse ambient sparkle — a single Points draw call, cheap on GPU. */
export function buildParticles(count = 220) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 1.6 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xd9c08f,
    size: 0.03,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  return new THREE.Points(geo, mat);
}

function initHero3D(container) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return; // no WebGL — container stays empty, the CSS glow behind it still reads as atmosphere
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
  camera.position.set(0, 0, 5.0);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;
  container.appendChild(renderer.domElement);

  const flower = buildFlower();
  scene.add(flower);

  const particles = buildParticles();
  scene.add(particles);

  /* Three-point-style dramatic lighting: warm key, gold fill, cool rim. */
  const key = new THREE.SpotLight(0xfff2df, 15, 0, Math.PI / 6, 0.5, 1.2);
  key.position.set(2.4, 3, 3);
  key.target.position.set(0, 0, 0);
  scene.add(key, key.target);

  const fill = new THREE.PointLight(0xc9a463, 2.2, 12, 2);
  fill.position.set(-2.6, -1.2, 1.5);
  scene.add(fill);

  const rim = new THREE.PointLight(0xbfd7ff, 1.7, 12, 2);
  rim.position.set(-1, 1.6, -3);
  scene.add(rim);

  scene.add(new THREE.AmbientLight(0x1a1610, 2.4));

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  /* ---- drag to rotate (pointer events cover mouse + touch) ---- */
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let dragCooldown = 0;
  const idleSpin = prefersReducedMotion ? 0 : 0.18; // rad/s

  container.style.touchAction = "none";
  container.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    container.style.cursor = "grabbing";
    container.setPointerCapture(e.pointerId);
  });
  container.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    flower.rotation.y += dx * 0.008;
    flower.rotation.x = THREE.MathUtils.clamp(flower.rotation.x + dy * 0.008, -0.6, 1.1);
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    container.style.cursor = "grab";
    dragCooldown = 1.2; // seconds before idle auto-rotate resumes
  }
  container.addEventListener("pointerup", endDrag);
  container.addEventListener("pointercancel", endDrag);

  /* ---- scroll-linked inertial spin ---- */
  let lastScrollY = window.scrollY;
  let scrollSpin = 0;
  window.addEventListener(
    "scroll",
    () => {
      if (prefersReducedMotion) return;
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      scrollSpin += dy * 0.0025;
    },
    { passive: true }
  );

  /* ---- only render while visible: saves battery/CPU off-screen and in background tabs ---- */
  let inView = true;
  const intersectionObserver = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, {
    threshold: 0.05,
  });
  intersectionObserver.observe(container);

  let pageVisible = true;
  document.addEventListener("visibilitychange", () => {
    pageVisible = document.visibilityState === "visible";
  });

  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    if (!pageVisible || !inView) return;
    const dt = Math.min(clock.getDelta(), 0.1);

    if (dragCooldown > 0) dragCooldown -= dt;
    if (!dragging && dragCooldown <= 0) flower.rotation.y += idleSpin * dt;

    flower.rotation.y += scrollSpin;
    scrollSpin *= 0.85;

    flower.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.06; // gentle bob
    particles.rotation.y += dt * 0.02;

    renderer.render(scene, camera);
  }
  tick();
}

if (typeof document !== "undefined") {
  const container = document.getElementById("hero3d");
  if (container && window.WebGLRenderingContext) {
    initHero3D(container);
  }
}
