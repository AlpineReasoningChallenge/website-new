// The 3D scene behind the home page: ARC's logo (a mountain range, a star and its arc) in three.js.
// Sections mark a stage with data-stage; as the page scrolls, the same objects glide from one
// stage's arrangement to the next. The page is complete without any of this.

import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  Group,
  Mesh,
  Sprite,
  SpriteMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  ExtrudeGeometry,
  PlaneGeometry,
  BoxGeometry,
  Shape,
  QuadraticBezierCurve3,
  Vector3,
  MeshStandardMaterial,
  ShadowMaterial,
  MeshBasicMaterial,
  HemisphereLight,
  DirectionalLight,
  PMREMGenerator,
  CanvasTexture,
  Color,
  SRGBColorSpace,
  NeutralToneMapping,
  PCFSoftShadowMap,
  DoubleSide,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const PEAKS = 7; // five form the range; all seven can become rhythm notes
const SPARKS = 5;
const TEAL = new Color('#33a994'); // lit, this reads as the logo's #52d5bf
const TEAL_DEEP = new Color('#268a79');
const SNOW = new Color('#f7fbfb');
const SNOW_SHADE = new Color('#e4eeee');
const GLOW = new Color('#52d5bf');

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t) => t * t * (3 - 2 * t);
const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const lerp = (a, b, t) => a + (b - a) * t;

// A small seeded random, so each peak keeps its own shape between visits.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A faceted low-poly mountain about 1 wide, 0.8 deep and 1 tall, standing on y = 0.
// Faces that look left are teal, as in the logo; the rest are snow.
function mountainGeometry(seed) {
  const r = rng(seed);
  const N = 8;
  const ring = (radiusX, radiusZ, y, wobble) =>
    Array.from({ length: N }, (_, i) => {
      const a = (i / N) * Math.PI * 2 + 0.35;
      const k = 1 + (r() - 0.5) * wobble;
      return [Math.cos(a) * radiusX * k, y + (r() - 0.5) * 0.05, Math.sin(a) * radiusZ * k];
    });
  const base = ring(0.5, 0.4, 0, 0.16);
  const low = ring(0.37, 0.3, 0.3 + (r() - 0.5) * 0.06, 0.3);
  const mid = ring(0.2, 0.16, 0.64 + (r() - 0.5) * 0.08, 0.45);
  const apex = [(r() - 0.5) * 0.12, 1, (r() - 0.5) * 0.06];
  const pos = [];
  const col = [];
  const tri = (a, b, c) => {
    pos.push(...a, ...b, ...c);
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const len = Math.hypot(...n) || 1;
    const nx = n[0] / len;
    const nz = n[2] / len;
    // Left-facing faces carry the logo's teal; the deepest of them a darker teal.
    const c0 = nx < -0.18 ? (nz < -0.2 ? TEAL_DEEP : TEAL) : nz < -0.35 ? SNOW_SHADE : SNOW;
    for (let i = 0; i < 3; i++) col.push(c0.r, c0.g, c0.b);
  };
  for (let i = 0; i < N; i++) {
    const j = (i + 1) % N;
    tri(base[i], low[i], base[j]);
    tri(base[j], low[i], low[j]);
    tri(low[i], mid[i], low[j]);
    tri(low[j], mid[i], mid[j]);
    tri(mid[i], apex, mid[j]);
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new Float32BufferAttribute(col, 3));
  geo.computeVertexNormals();
  return geo;
}

// The logo's four-point sparkle, softly bevelled.
function starGeometry(depth = 0.2) {
  const s = new Shape();
  const k = 0.14;
  s.moveTo(0, 1);
  s.quadraticCurveTo(k, k, 1, 0);
  s.quadraticCurveTo(k, -k, 0, -1);
  s.quadraticCurveTo(-k, -k, -1, 0);
  s.quadraticCurveTo(-k, k, 0, 1);
  const geo = new ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 4, curveSegments: 20 });
  geo.center();
  return geo;
}

// The arc as a tapered tube: thick in the middle, fine at both ends, drawn from the star outward.
function arcGeometry(curve, segments = 120, radial = 12) {
  const pos = [];
  const idx = [];
  const frames = curve.computeFrenetFrames(segments, false);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = curve.getPointAt(t);
    const rad = 0.012 + 0.05 * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.15)), 0.8) * (1 - t * 0.35);
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const n = frames.normals[i].clone().multiplyScalar(Math.cos(a)).add(frames.binormals[i].clone().multiplyScalar(Math.sin(a)));
      pos.push(p.x + n.x * rad, p.y + n.y * rad, p.z + n.z * rad);
    }
  }
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * (radial + 1) + j;
      const b = a + radial + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

function radialTexture(inner, outer, size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

// Frame layout. Objects: PEAKS mountains, the star, the arc, SPARKS sparkles, the baseline.
const STAR = PEAKS;
const ARC = PEAKS + 1;
const SPARK0 = PEAKS + 2;
const LINE = SPARK0 + SPARKS;
const COUNT = LINE + 1;
const STRIDE = 11; // px py pz rx ry rz sx sy sz glow extra
const RIG = 5; // tilt spin units groundY shadowWidth

function createFrame() {
  return { o: new Float32Array(COUNT * STRIDE), rig: new Float32Array(RIG), lit: -1 };
}

function setObj(f, i, p, r, s, glow = 0, extra = 0) {
  f.o.set([p[0], p[1], p[2], r[0], r[1], r[2], s[0], s[1], s[2], glow, extra], i * STRIDE);
}

const HIDDEN = [0.0001, 0.0001, 0.0001];

// Hero: the logo as a range. x, z, width, height; peaks overlap so they read as one range.
const RANGE = [
  [-1.72, -0.28, 1.05, 0.62],
  [-0.92, 0.12, 1.35, 1.22],
  [0.12, -0.06, 1.7, 1.9],
  [1.12, 0.18, 1.35, 1.38],
  [1.86, -0.3, 1.1, 0.74],
];
const SPARK_SPOTS = [
  [-2.25, 1.45, -0.4, 0.07],
  [-0.2, 2.35, -0.3, 0.05],
  [2.35, 1.95, -0.5, 0.08],
  [1.45, 2.55, -0.6, 0.045],
  [-1.95, 0.6, 0.6, 0.05],
];

function heroLayout(f, time, live) {
  const base = -1.05;
  for (let i = 0; i < PEAKS; i++) {
    const pk = RANGE[i];
    if (pk) setObj(f, i, [pk[0], base, pk[1]], [0, 0, 0], [pk[2], pk[3], pk[2] * 0.85]);
    else setObj(f, i, [0, base, 0], [0, 0, 0], HIDDEN);
  }
  const bob = live ? Math.sin(time * 0.9) * 0.045 : 0;
  const tw = live ? 1 + Math.sin(time * 2.1) * 0.05 : 1;
  setObj(f, STAR, [-1.32, 1.12 + bob, 0.35], [0, live ? Math.sin(time * 0.6) * 0.35 : 0, live ? Math.sin(time * 0.45) * 0.1 : 0], [0.3 * tw, 0.3 * tw, 0.3 * tw], 1);
  setObj(f, ARC, [0, 0, 0], [0, 0, 0], [1, 1, 1], 1);
  for (let k = 0; k < SPARKS; k++) {
    const s = SPARK_SPOTS[k];
    const t = live ? 0.55 + 0.45 * Math.sin(time * (1.3 + k * 0.37) + k * 1.7) : 0.8;
    setObj(f, SPARK0 + k, [s[0], s[1] + base + 1, s[2]], [0, 0, live ? time * 0.2 + k : k], [s[3] * t, s[3] * t, s[3] * t], t);
  }
  setObj(f, LINE, [0, base, 0], [0, 0, 0], [0.0001, 1, 1]);
  f.rig.set([0.2, 0.38, 5.1, base, 4.6]);
  f.lit = -1;
}

// Rhythm: the same peaks become the sample problem's notes. A short note is a narrow peak and a
// long note a wide one, standing on a baseline; the star hops from note to note as it plays.
function rhythmLayout(f, time, live, pattern) {
  const unit = 0.58;
  const gap = 0.1;
  const beats = pattern.reduce((a, b) => a + b, 0);
  const total = beats * unit + (pattern.length - 1) * gap;
  const base = -0.42;
  const beat = 0.46; // seconds per beat
  const cycle = beats + 2.5;
  const head = live ? (time / beat) % cycle : 0.5;
  let x = -total / 2;
  let at = 0;
  const notes = [];
  f.lit = -1;
  for (let i = 0; i < PEAKS; i++) {
    const len = pattern[i];
    if (len) {
      const w = len * unit + (len - 1) * gap;
      const h = len === 2 ? 1.0 : 0.72;
      const playing = head >= at && head < at + len;
      const lit = playing ? 1 - clamp01((head - at - len + 0.3) / 0.3) : 0;
      setObj(f, i, [x + w / 2, base, 0], [0, 0, 0], [w * 0.98, h * (1 + lit * 0.12), 0.62], lit);
      notes.push({ cx: x + w / 2, top: base + h, at, len });
      if (playing) f.lit = i;
      x += w + gap;
      at += len;
    } else {
      setObj(f, i, [total / 2 + 0.4, base, 0], [0, 0, 0], HIDDEN);
    }
  }
  // The star rides above the playing note and hops to the next one near the end of each note.
  let sx = notes[0].cx;
  let sy = notes[0].top + 0.42;
  const cur = notes.findIndex((n) => head >= n.at && head < n.at + n.len);
  if (cur >= 0) {
    const n = notes[cur];
    const next = notes[cur + 1];
    const phase = (head - n.at) / n.len;
    const hop = next ? smooth(clamp01((phase - 0.62) / 0.38)) : 0;
    sx = lerp(n.cx, next ? next.cx : n.cx, hop);
    sy = lerp(n.top, next ? next.top : n.top, hop) + 0.38 + Math.sin(Math.PI * hop) * 0.42;
  } else if (live && head >= beats) {
    sx = notes[notes.length - 1].cx + 0.6;
    sy = base + 0.55 + Math.sin(time * 2) * 0.03;
  }
  setObj(f, STAR, [sx, sy, 0.1], [0, live ? Math.sin(time * 1.2) * 0.4 : 0, 0], [0.19, 0.19, 0.19], 1);
  setObj(f, ARC, [0, 0, 0], [0, 0, 0], [1, 1, 1], 0);
  for (let k = 0; k < SPARKS; k++) setObj(f, SPARK0 + k, [0, base, 0], [0, 0, 0], HIDDEN);
  setObj(f, LINE, [0, base - 0.012, 0.42], [0, 0, 0], [total + 0.5, 1, 1]);
  f.rig.set([0.36, 0.26, total + 0.55, base, total + 1]);
}

export class ArcScene {
  constructor(canvas) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'default' });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.maxRatio = Math.min(window.devicePixelRatio || 1, 2);

    this.scene = new Scene();
    const pmrem = new PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.75;
    pmrem.dispose();

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 1, 8000);
    this.camera.position.set(0, 0, 4000);
    this.scene.add(new HemisphereLight('#ffffff', '#a9c4c1', 0.5));

    this.rig = new Group();
    this.scene.add(this.rig);

    // Key light from the upper left (lights the teal faces), a cool rim light from behind right.
    this.sun = new DirectionalLight('#ffffff', 1.65);
    this.sun.position.set(-4.5, 6.5, 3.2);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.radius = 5;
    this.sun.shadow.bias = -0.0004;
    this.rim = new DirectionalLight('#d8fff7', 0.9);
    this.rim.position.set(5, 3, -6);
    this.rig.add(this.sun, this.sun.target, this.rim, this.rim.target);

    this.peaks = [];
    for (let i = 0; i < PEAKS; i++) {
      const mat = new MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.62, metalness: 0, emissive: GLOW, emissiveIntensity: 0 });
      const mesh = new Mesh(mountainGeometry(11 + i * 97), mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.rig.add(mesh);
      this.peaks.push({ mesh, mat });
    }

    const tealMat = new MeshStandardMaterial({ color: '#45c6af', roughness: 0.28, metalness: 0.05, emissive: GLOW, emissiveIntensity: 0.12 });
    this.star = new Mesh(starGeometry(), tealMat);
    this.star.castShadow = true;
    this.halo = new Sprite(new SpriteMaterial({ map: radialTexture('rgba(82,213,191,0.55)', 'rgba(82,213,191,0)'), depthWrite: false, transparent: true }));
    this.halo.scale.set(4.2, 4.2, 1);
    this.halo.position.z = -0.3;
    this.star.add(this.halo);
    this.rig.add(this.star);

    const curve = new QuadraticBezierCurve3(new Vector3(-1.1, 1.22, 0.35), new Vector3(0.25, 2.55, 0.05), new Vector3(2.3, 0.95, -0.25));
    this.arcGeo = arcGeometry(curve);
    this.arcCount = this.arcGeo.index.count;
    this.arc = new Mesh(this.arcGeo, new MeshStandardMaterial({ color: '#45c6af', roughness: 0.3, metalness: 0.05, emissive: GLOW, emissiveIntensity: 0.1 }));
    this.rig.add(this.arc);

    const sparkGeo = starGeometry(0.08);
    const sparkMat = new MeshStandardMaterial({ color: '#7fe3d1', roughness: 0.4, emissive: GLOW, emissiveIntensity: 0.35 });
    this.sparks = Array.from({ length: SPARKS }, () => {
      const m = new Mesh(sparkGeo, sparkMat);
      this.rig.add(m);
      return m;
    });

    this.line = new Mesh(new BoxGeometry(1, 0.025, 0.025), new MeshBasicMaterial({ color: '#0b7566', transparent: true, opacity: 0.5 }));
    this.rig.add(this.line);

    // The ground: real soft shadows, plus a faint pool of shade that grounds the whole range.
    this.ground = new Mesh(new PlaneGeometry(80, 80).rotateX(-Math.PI / 2), new ShadowMaterial({ color: '#16423d', opacity: 0.18 }));
    this.ground.receiveShadow = true;
    this.pool = new Mesh(
      new PlaneGeometry(1, 1).rotateX(-Math.PI / 2),
      new MeshBasicMaterial({ map: radialTexture('rgba(22,66,61,0.22)', 'rgba(22,66,61,0)'), transparent: true, depthWrite: false, side: DoubleSide }),
    );
    this.rig.add(this.ground, this.pool);

    this.objects = [...this.peaks.map((p) => p.mesh), this.star, this.arc, ...this.sparks, this.line];
    this.width = 0;
    this.height = 0;
  }

  resize(w, h) {
    if (w === this.width && h === this.height) return;
    this.width = w;
    this.height = h;
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
    const [rt, rs, , groundY, shadowW] = f.rig;
    this.rig.position.set(cx - this.width / 2, this.height / 2 - cy, 0);
    this.rig.scale.setScalar(scale);
    this.rig.rotation.set(rt + tilt, rs + spin, 0, 'XYZ');
    for (let i = 0; i < COUNT; i++) {
      const o = i * STRIDE;
      const m = this.objects[i];
      m.position.set(f.o[o], f.o[o + 1], f.o[o + 2]);
      m.rotation.set(f.o[o + 3], f.o[o + 4], f.o[o + 5]);
      m.scale.set(Math.max(f.o[o + 6], 1e-4), Math.max(f.o[o + 7], 1e-4), Math.max(f.o[o + 8], 1e-4));
      m.visible = f.o[o + 6] > 0.002;
      if (i < PEAKS) this.peaks[i].mat.emissiveIntensity = f.o[o + 9] * 0.55;
    }
    // The arc draws itself from the star outward.
    const draw = clamp01(f.o[ARC * STRIDE + 9]);
    this.arc.visible = draw > 0.01;
    this.arcGeo.setDrawRange(0, Math.floor((this.arcCount / 6) * draw) * 6);
    this.line.material.opacity = 0.45 * clamp01((f.o[LINE * STRIDE + 6] - 0.2) / 1.5);
    this.halo.material.opacity = 0.9;
    this.ground.position.y = groundY;
    this.pool.position.set(0, groundY + 0.002, 0);
    this.pool.scale.set(shadowW * 1.15, 1, 1.6);
    const r = 9 * scale;
    const cam = this.sun.shadow.camera;
    if (cam.right !== r) {
      cam.left = -r;
      cam.right = r;
      cam.top = r;
      cam.bottom = -r;
      cam.near = 0.1 * scale;
      cam.far = 40 * scale;
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
  const view = { cx: 0, cy: 0, scale: 0 };
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
  const header = document.querySelector('.site-header .bar');

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
    // The hero hands over early and the flight is long, so the move starts gently.
    s.end = s.kind === 'pinned' ? top + Math.max(1, r.height - vh) : top + vh * 0.05;
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

    let a = stages[0];
    let b = null;
    let g = 0;
    for (let i = 0; i < stages.length; i++) {
      const cur = stages[i];
      const next = stages[i + 1];
      a = cur;
      if (y <= cur.end) break;
      if (next && y < next.start) {
        b = next;
        g = clamp01((y - cur.end) / Math.max(1, next.start - cur.end));
        break;
      }
    }

    layouts[a.id](A, time, live);
    let cx = a.cx;
    let cy = a.cy;
    let scale = scaleOf(a, A);
    if (b) {
      if (reduced) g = g < 0.5 ? 0 : 1;
      layouts[b.id](B, time, live);
      const e = smoother(g);
      cx = lerp(a.cx, b.cx, e);
      cy = lerp(a.cy, b.cy, e);
      scale = lerp(scale, scaleOf(b, B), e);
      // Each object leaves a beat after the one before it, so the range moves like a flock.
      for (let i = 0; i < COUNT; i++) {
        const delay = i < PEAKS ? i * 0.05 : i === STAR ? 0.02 : 0.1;
        const ei = smoother(clamp01((g - delay) / (1 - 0.32)));
        const o = i * STRIDE;
        for (let k = 0; k < STRIDE; k++) target.o[o + k] = lerp(A.o[o + k], B.o[o + k], ei);
        // A gentle lift in mid-flight, no spinning.
        target.o[o + 1] += Math.sin(Math.PI * ei) * 0.25;
      }
      for (let k = 0; k < RIG; k++) target.rig[k] = lerp(A.rig[k], B.rig[k], e);
    } else {
      target.o.set(A.o);
      target.rig.set(A.rig);
    }

    // While the opening or the flight is on screen, keep the objects clear of the header band
    // and inside the middle of the screen. One rule for both, so the handover never jumps.
    const half = scale * target.rig[2] * 0.3;
    const headerBottom = header ? header.getBoundingClientRect().bottom : 80;
    const lo = Math.max(headerBottom + half + 16, vh * 0.3);
    if (b || a.kind === 'flow') cy = Math.max(cy, lo);
    if (b) cy = Math.min(cy, vh * 0.72);

    // Opening: the range rises one peak at a time, the star appears, then the arc draws itself.
    if (live && time < 3) {
      const order = [2, 1, 0, 3, 4, 5, 6];
      for (let i = 0; i < COUNT; i++) {
        const o = i * STRIDE;
        if (i < PEAKS) target.o[o + 7] *= easeOut(clamp01((time - 0.1 - order[i] * 0.1) / 0.9));
        else if (i === STAR) {
          const t = easeOut(clamp01((time - 0.55) / 0.7));
          target.o[o + 6] *= t;
          target.o[o + 7] *= t;
          target.o[o + 8] *= t;
        } else if (i === ARC) target.o[o + 9] *= smooth(clamp01((time - 0.75) / 1.1));
        else if (i < LINE) {
          const t = easeOut(clamp01((time - 1.2 - (i - SPARK0) * 0.12) / 0.6));
          target.o[o + 6] *= t;
          target.o[o + 7] *= t;
          target.o[o + 8] *= t;
        }
      }
    }

    // Ease everything drawn toward its target, including where the stage sits on screen.
    const k = first || reduced ? 1 : 1 - Math.exp(-dt * 8);
    for (let i = 0; i < shown.o.length; i++) shown.o[i] += (target.o[i] - shown.o[i]) * k;
    for (let i = 0; i < RIG; i++) shown.rig[i] += (target.rig[i] - shown.rig[i]) * k;
    const kv = first || reduced ? 1 : 1 - Math.exp(-dt * 12);
    view.cx += (cx - view.cx) * kv;
    view.cy += (cy - view.cy) * kv;
    view.scale += (scale - view.scale) * kv;
    first = false;

    const litNow = !b && a.id === 'rhythm' ? A.lit : -1;
    if (litNow !== lastLit) {
      lastLit = litNow;
      window.dispatchEvent(new CustomEvent('arc:beat', { detail: litNow }));
    }

    const visible = view.cy > -vh * 0.6 && view.cy < vh * 1.6;
    canvas.style.visibility = visible ? 'visible' : 'hidden';
    if (!visible) return;

    const pk = 1 - Math.exp(-dt * 3.5);
    pointer.x += (pointer.tx - pointer.x) * pk;
    pointer.y += (pointer.ty - pointer.y) * pk;
    const sway = live ? Math.sin(time * 0.25) * 0.035 : 0;
    scene.apply(shown, view.cx, view.cy, view.scale, live ? pointer.y * 0.06 : 0, (live ? pointer.x * 0.16 : 0) + sway);
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
