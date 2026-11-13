// The 3D scene behind the home page: ARC's logo (peaks, star, arc) built in three.js.
// Sections mark a stage with data-stage; as the page scrolls, the same objects move
// from one stage's arrangement to the next. The page is complete without any of this.

import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  Group,
  Mesh,
  LineSegments,
  BufferGeometry,
  Float32BufferAttribute,
  EdgesGeometry,
  ExtrudeGeometry,
  TubeGeometry,
  PlaneGeometry,
  Shape,
  QuadraticBezierCurve3,
  Vector3,
  MeshStandardMaterial,
  LineBasicMaterial,
  ShadowMaterial,
  HemisphereLight,
  DirectionalLight,
  PMREMGenerator,
  Color,
  SRGBColorSpace,
  NeutralToneMapping,
  PCFSoftShadowMap,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const PEAKS = 7; // five show as mountains; all seven can become rhythm notes
const FROST = '#fbfdfd';
const FACE = '#3fa996'; // renders close to the logo's #52d5bf once lit
const EDGE = '#0b6e60';
const GLOW = new Color('#52d5bf');

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t) => t * t * (3 - 2 * t);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// A triangular prism: the triangle sits in the x-y plane (base on y = 0, apex at y = 1),
// extruded along z from -0.5 to 0.5. Material 1 is the left slope, the logo's filled face.
function prismGeometry() {
  const A = [-0.5, 0, 0.5], B = [0.5, 0, 0.5], C = [0, 1, 0.5];
  const a = [-0.5, 0, -0.5], b = [0.5, 0, -0.5], c = [0, 1, -0.5];
  const faces = [
    [[A, B, C], 0], // front
    [[b, a, c], 0], // back
    [[a, A, C, a, C, c], 1], // left slope
    [[B, b, c, B, c, C], 0], // right slope
    [[a, b, B, a, B, A], 0], // bottom
  ];
  const pos = [];
  const geo = new BufferGeometry();
  let start = 0;
  for (const [tris, mat] of faces) {
    for (const v of tris) pos.push(...v);
    geo.addGroup(start, tris.length, mat);
    start += tris.length;
  }
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  return geo;
}

// The logo's four-point sparkle.
function starGeometry() {
  const s = new Shape();
  const k = 0.16;
  s.moveTo(0, 1);
  s.quadraticCurveTo(k, k, 1, 0);
  s.quadraticCurveTo(k, -k, 0, -1);
  s.quadraticCurveTo(-k, -k, -1, 0);
  s.quadraticCurveTo(-k, k, 0, 1);
  const geo = new ExtrudeGeometry(s, {
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelSegments: 3,
    curveSegments: 18,
  });
  geo.center();
  return geo;
}

// Object order in a frame: PEAKS prisms, then the star, then the arc.
const COUNT = PEAKS + 2;
const STAR = PEAKS;
const ARC = PEAKS + 1;
const STRIDE = 11; // px py pz rx ry rz sx sy sz glow fill
const RIG = 4; // tilt spin units groundY

function createFrame() {
  return { o: new Float32Array(COUNT * STRIDE), rig: new Float32Array(RIG) };
}

function setObj(f, i, p, r, s, glow = 0, fill = 0) {
  const o = i * STRIDE;
  f.o.set([p[0], p[1], p[2], r[0], r[1], r[2], s[0], s[1], s[2], glow, fill], o);
}

// Hero: the logo in three dimensions. Five peaks of a range, the star, and the arc over them.
const HERO_PEAKS = [
  // x, z, width, height
  [-1.95, -0.4, 0.95, 0.62],
  [-1.02, 0.22, 1.2, 1.3],
  [0.08, -0.08, 1.45, 1.95],
  [1.12, 0.24, 1.15, 1.42],
  [2.0, -0.38, 1.0, 0.74],
];

function heroLayout(f, time, live) {
  const base = -1.05;
  for (let i = 0; i < PEAKS; i++) {
    const pk = HERO_PEAKS[i];
    if (pk) setObj(f, i, [pk[0], base, pk[1]], [0, 0, 0], [pk[2], pk[3], 0.78]);
    else setObj(f, i, [0, base, 0], [0, 0, 0], [0.001, 0.001, 0.001]);
  }
  const bob = live ? Math.sin(time * 0.9) * 0.05 : 0;
  setObj(f, STAR, [-1.42, 1.18 + bob, 0.35], [0, (live ? Math.sin(time * 0.7) * 0.45 : 0) - 0.42, live ? Math.sin(time * 0.5) * 0.08 : 0], [0.34, 0.34, 0.34], 0.25);
  setObj(f, ARC, [0, 0, 0], [0, 0, 0], [1, 1, 1]);
  f.rig.set([0.16, 0.42, 5.1, base]);
}

// Rhythm: the peaks lie down and become the notes of the sample problem (1 or 2 beats each).
function rhythmLayout(f, time, live, pattern) {
  const unit = 0.62;
  const gap = 0.14;
  const total = pattern.reduce((a, b) => a + b, 0) * unit + (pattern.length - 1) * gap;
  let x = -total / 2;
  const beat = 0.42; // seconds per beat while the playhead runs
  const cycle = pattern.reduce((a, b) => a + b, 0) + 2;
  const head = live ? (time / beat) % cycle : -1;
  let at = 0;
  f.lit = -1;
  for (let i = 0; i < PEAKS; i++) {
    const len = pattern[i];
    if (len) {
      const length = len * unit + (len - 1) * gap * 0.5;
      const lit = head >= at && head < at + len ? 1 - clamp01((head - at - len + 0.35) / 0.35) : 0;
      setObj(f, i, [x + length / 2, -0.32, 0], [0, -Math.PI / 2, 0], [0.62, 0.56 + lit * 0.22, length], lit, len === 2 ? 1 : 0);
      if (lit > 0.5) f.lit = i;
      x += length + gap;
      at += len;
    } else {
      setObj(f, i, [total / 2, -0.32, 0], [0, -Math.PI / 2, 0], [0.001, 0.001, 0.001]);
    }
  }
  setObj(f, STAR, [total / 2 + 0.62, 0.05, 0], [0, (live ? Math.sin(time * 0.8) * 0.5 : 0) - 0.3, 0], [0.24, 0.24, 0.24], 0.4);
  setObj(f, ARC, [0, 0.5, 0], [0, 0, 0], [0.001, 0.001, 0.001]);
  f.rig.set([0.55, -0.16, total + 0.8, -0.32]);
}

function blend(out, a, b, t, lift) {
  for (let i = 0; i < out.o.length; i++) out.o[i] = a.o[i] + (b.o[i] - a.o[i]) * t;
  for (let i = 0; i < RIG; i++) out.rig[i] = a.rig[i] + (b.rig[i] - a.rig[i]) * t;
  if (lift) {
    // In mid-flight each object rises and turns a little, staggered, so the move reads as a flight.
    const arcH = Math.sin(Math.PI * t);
    for (let i = 0; i < COUNT; i++) {
      const o = i * STRIDE;
      const k = Math.sin(Math.PI * clamp01(t * 1.25 - i * 0.03));
      out.o[o + 1] += arcH * 0.35 * k;
      out.o[o + 5] += arcH * 0.35 * k * (i % 2 ? 1 : -1);
    }
  }
}

export class ArcScene {
  constructor(canvas) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'default' });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.02;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.maxRatio = Math.min(window.devicePixelRatio || 1, 2);

    this.scene = new Scene();
    const pmrem = new PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 1.05;
    pmrem.dispose();

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 1, 8000);
    this.camera.position.set(0, 0, 4000);
    this.scene.add(new HemisphereLight('#ffffff', '#b8cecc', 0.42));

    this.rig = new Group();
    this.scene.add(this.rig);
    this.sun = new DirectionalLight('#ffffff', 1.5);
    this.sun.position.set(-3.5, 6, -2.2);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1024, 1024);
    this.sun.shadow.radius = 6;
    this.sun.shadow.bias = -0.0005;
    this.rig.add(this.sun, this.sun.target);

    const prism = prismGeometry();
    const edges = new EdgesGeometry(prism, 1);
    this.peaks = [];
    for (let i = 0; i < PEAKS; i++) {
      const frost = new MeshStandardMaterial({ color: FROST, roughness: 0.34, metalness: 0, emissive: GLOW, emissiveIntensity: 0, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
      const face = new MeshStandardMaterial({ color: FACE, roughness: 0.34, metalness: 0, emissive: GLOW, emissiveIntensity: 0, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
      const mesh = new Mesh(prism, [frost, face]);
      mesh.castShadow = true;
      const line = new LineSegments(edges, new LineBasicMaterial({ color: EDGE }));
      mesh.add(line);
      this.rig.add(mesh);
      this.peaks.push({ mesh, frost, face });
    }

    const tealMat = new MeshStandardMaterial({ color: FACE, roughness: 0.32, metalness: 0, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
    this.star = new Mesh(starGeometry(), tealMat);
    this.star.castShadow = true;
    this.rig.add(this.star);

    const curve = new QuadraticBezierCurve3(new Vector3(-1.15, 1.32, 0.35), new Vector3(0.3, 2.55, 0.1), new Vector3(2.25, 1.0, -0.2));
    this.arc = new Mesh(new TubeGeometry(curve, 80, 0.045, 10, false), tealMat);
    this.rig.add(this.arc);

    this.ground = new Mesh(new PlaneGeometry(60, 60).rotateX(-Math.PI / 2), new ShadowMaterial({ color: '#1d4a45', opacity: 0.22 }));
    this.ground.receiveShadow = true;
    this.rig.add(this.ground);

    this.frostBase = new Color(FROST);
    this.litColor = new Color(FACE);
    this.width = 0;
    this.height = 0;
  }

  resize(w, h) {
    if (w === this.width && h === this.height) return;
    this.width = w;
    this.height = h;
    // Keep the drawn pixel count bounded on large retina screens.
    const budget = Math.sqrt(4.2e6 / Math.max(1, w * h));
    this.renderer.setPixelRatio(Math.max(1, Math.min(this.maxRatio, budget)));
    this.renderer.setSize(w, h, false);
    const cam = this.camera;
    cam.left = -w / 2;
    cam.right = w / 2;
    cam.top = h / 2;
    cam.bottom = -h / 2;
    cam.updateProjectionMatrix();
  }

  apply(f, cx, cy, scale, tilt, spin) {
    const [rt, rs, , groundY] = f.rig;
    this.rig.position.set(cx - this.width / 2, this.height / 2 - cy, 0);
    this.rig.scale.setScalar(scale);
    this.rig.rotation.set(rt + tilt, rs + spin, 0, 'XYZ');
    const objs = [...this.peaks.map((p) => p.mesh), this.star, this.arc];
    for (let i = 0; i < COUNT; i++) {
      const o = i * STRIDE;
      const m = objs[i];
      m.position.set(f.o[o], f.o[o + 1], f.o[o + 2]);
      m.rotation.set(f.o[o + 3], f.o[o + 4], f.o[o + 5]);
      m.scale.set(Math.max(f.o[o + 6], 1e-4), Math.max(f.o[o + 7], 1e-4), Math.max(f.o[o + 8], 1e-4));
      m.visible = f.o[o + 6] > 0.01;
      if (i < PEAKS) {
        const g = f.o[o + 9];
        // Long notes take the teal face colour; the playing note glows a little.
        const fill = Math.max(f.o[o + 10], g * 0.6);
        this.peaks[i].frost.color.copy(this.frostBase).lerp(this.litColor, fill);
        this.peaks[i].frost.emissiveIntensity = g * 0.2;
        this.peaks[i].face.emissiveIntensity = g * 0.25;
      }
    }
    this.ground.position.y = groundY;
    const r = 8 * scale;
    const cam = this.sun.shadow.camera;
    if (cam.right !== r) {
      cam.left = -r;
      cam.right = r;
      cam.top = r;
      cam.bottom = -r;
      cam.near = 0.1 * scale;
      cam.far = 30 * scale;
      cam.updateProjectionMatrix();
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

// Runs the scene against the page's stages. Returns a stop function.
export function runScene(canvas, { reduced, onReady }) {
  const scene = new ArcScene(canvas);
  const A = createFrame();
  const B = createFrame();
  const target = createFrame();
  const shown = createFrame();
  let first = true;
  let pattern = [2, 1, 1, 2, 1];
  const onRhythm = (e) => {
    if (Array.isArray(e.detail)) pattern = e.detail;
  };
  window.addEventListener('arc:rhythm', onRhythm);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const layouts = { hero: heroLayout, rhythm: (f, t, live) => rhythmLayout(f, t, live, pattern) };
  const stages = [...document.querySelectorAll('[data-stage]')]
    .map((el) => ({ el, id: el.dataset.stage, kind: el.dataset.stageKind || 'flow', section: el.closest('[data-stage-section]') || el }))
    .filter((s) => layouts[s.id]);

  const born = performance.now();
  let last = born;
  let raf = 0;
  let ready = false;
  let lastLit = -2;

  const measure = (s, y, vh) => {
    const r = s.section.getBoundingClientRect();
    const box = s.el.getBoundingClientRect();
    const top = r.top + y;
    s.start = top;
    s.end = s.kind === 'pinned' ? top + Math.max(1, r.height - vh) : top + vh * 0.12;
    s.cx = box.left + box.width / 2;
    s.cy = box.top + box.height / 2;
    s.w = box.width;
    s.h = box.height;
  };
  const scaleOf = (s, f) => Math.min(s.w / f.rig[2], s.h / (f.rig[2] * 0.62));

  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    if (document.hidden || canvas.clientWidth === 0 || !stages.length) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const time = (now - born) / 1000;
    const live = !reduced;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    scene.resize(vw, vh);
    const y = window.scrollY;
    for (const s of stages) measure(s, y, vh);

    // Which stage, or which gap between two stages, is the page in?
    let a = stages[0];
    let b = null;
    let g = 0;
    for (let i = 0; i < stages.length; i++) {
      const cur = stages[i];
      const next = stages[i + 1];
      if (y <= cur.end) {
        a = cur;
        break;
      }
      a = cur;
      if (next && y < next.start) {
        b = next;
        g = clamp01((y - cur.end) / Math.max(1, next.start - cur.end));
        break;
      }
    }

    A.lit = -1;
    layouts[a.id](A, time, live);
    const litNow = !b && a.id === 'rhythm' ? A.lit : -1;
    if (litNow !== lastLit) {
      lastLit = litNow;
      window.dispatchEvent(new CustomEvent('arc:beat', { detail: litNow }));
    }
    let cx = a.cx;
    let cy = a.cy;
    let scale = scaleOf(a, A);
    if (b) {
      if (reduced) g = g < 0.5 ? 0 : 1;
      const e = smooth(g);
      layouts[b.id](B, time, live);
      cx += (b.cx - cx) * e;
      cy += (b.cy - cy) * e;
      scale += (scaleOf(b, B) - scale) * e;
      blend(target, A, B, e, live);
    } else {
      target.o.set(A.o);
      target.rig.set(A.rig);
    }

    // Opening: the range rises out of the ground one peak at a time, then the star, then the arc.
    if (live && time < 2.4) {
      for (let i = 0; i < COUNT; i++) {
        const o = i * STRIDE;
        const t = easeOut(clamp01((time - 0.15 - (i < PEAKS ? [2, 1, 0, 3, 4, 5, 6][i] * 0.09 : i === STAR ? 0.55 : 0.75)) / 0.9));
        target.o[o + 7] *= t;
        if (i >= PEAKS) {
          target.o[o + 6] *= t;
          target.o[o + 8] *= t;
        }
      }
    }

    // Ease what is drawn toward the target, so pattern changes and scroll both glide.
    const k = first || reduced ? 1 : 1 - Math.exp(-dt * 9);
    for (let i = 0; i < shown.o.length; i++) shown.o[i] += (target.o[i] - shown.o[i]) * k;
    for (let i = 0; i < RIG; i++) shown.rig[i] += (target.rig[i] - shown.rig[i]) * k;
    first = false;

    // Never let the objects rise into the header band; in flight, keep them in the middle of the screen.
    const half = scale * shown.rig[2] * 0.3;
    if (b) cy = Math.min(Math.max(cy, vh * 0.32), vh * 0.7);
    else if (a.kind === 'flow') cy = Math.max(cy, 96 + half);
    const visible = cy > -vh * 0.6 && cy < vh * 1.6;
    canvas.style.visibility = visible ? 'visible' : 'hidden';
    if (!visible) return;

    const pk = 1 - Math.exp(-dt * 4);
    pointer.x += (pointer.tx - pointer.x) * pk;
    pointer.y += (pointer.ty - pointer.y) * pk;
    scene.apply(shown, cx, cy, scale, live ? pointer.y * 0.05 : 0, live ? pointer.x * 0.12 : 0);
    scene.render();
    if (!ready) {
      ready = true;
      onReady?.();
    }
  };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('arc:rhythm', onRhythm);
    scene.renderer.dispose();
  };
}
