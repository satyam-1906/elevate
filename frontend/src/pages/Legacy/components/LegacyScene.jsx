/**
 * LegacyScene — Three.js starfield constellation with scroll-synced camera.
 *
 * Follows the FloatingLines pattern: raw Three.js via useEffect + useRef,
 * no @react-three/fiber dependency. Canvas is aria-hidden; all semantic
 * content lives in the HTML overlay.
 *
 * Visual layers (back → front):
 *   1. Starfield — 4 depth-distributed particle layers with twinkle + velocity streak
 *   2. Connector lines — animated draw-on between adjacent nodes
 *   3. Node orbs — glowing sprites at each era position, pulsing when active
 */
import { useEffect, useRef } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Points,
  BufferGeometry,
  Float32BufferAttribute,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  CanvasTexture,
  AdditiveBlending,
} from 'three';
import { Timer } from 'three/src/core/Timer.js';
import { createCameraRig, NODE_SPACING } from './LegacyCameraRig';
import { createConnectors } from './LegacyConnector';

/* ── Named constants (no magic numbers) ──────────────────────────── */
const BG_COLOR = 0x0b0f19;

const PARTICLE_LAYERS = [
  { count: 80, baseSize: 2.8, xyRadius: 15 },
  { count: 70, baseSize: 2.2, xyRadius: 25 },
  { count: 50, baseSize: 1.6, xyRadius: 38 },
  { count: 40, baseSize: 1.2, xyRadius: 52 },
];

const NODE_GLOW_ACTIVE  = { size: 6,   opacity: 0.9 };
const NODE_GLOW_IDLE    = { size: 3,   opacity: 0.3 };
const PULSE_SPEED       = 2.0;
const PULSE_AMP         = 0.15;
const DRIFT_SPEED       = 0.12;
const VELOCITY_CEIL      = 3000;     // px/s at which velocity effect maxes out
const FOV_DEFAULT       = 60;
const FOV_ARRIVAL       = 55;       // subtle zoom when arriving at founding era

/* ── GLSL shaders ────────────────────────────────────────────────── */
const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uVel;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vSeed = aSeed;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float dist = max(-mv.z, 1.0);

    /* Size: natural depth attenuation + velocity boost */
    float sz = aSize * (200.0 / dist) * (1.0 + uVel * 0.8);
    gl_PointSize = max(1.0, sz);
    gl_Position  = projectionMatrix * mv;

    /* Per-particle twinkle using its seed as a unique phase offset */
    float twinkle = 0.5 + 0.5 * sin(uTime * 0.8 + aSeed * 6.2831);
    float depthFade = smoothstep(200.0, 10.0, dist);
    vAlpha = twinkle * depthFade + uVel * 0.15;
    vAlpha = clamp(vAlpha, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  varying float vAlpha;
  varying float vSeed;
  uniform float uVel;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    /* Vertical streak when scrolling fast — mimics hyperspace streaking */
    c.y *= 1.0 + uVel * 2.5;
    float d = length(c);
    float a = smoothstep(0.5, 0.02, d) * vAlpha;

    /* Color: most particles are cool-white, some accent-cyan */
    vec3 white = vec3(0.925, 0.937, 0.957);
    vec3 cyan  = vec3(0.22,  0.741, 0.973);
    vec3 blue  = vec3(0.376, 0.647, 0.98);
    float t1 = smoothstep(0.60, 0.70, fract(vSeed * 7.3));
    float t2 = smoothstep(0.80, 0.90, fract(vSeed * 7.3));
    vec3 col = mix(white, blue, t1);
    col = mix(col, cyan, t2);

    gl_FragColor = vec4(col, a);
    if (a < 0.01) discard;
  }
`;

/* ── Glow texture (generated once via canvas) ────────────────────── */
function makeGlowTex(sz = 128) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = sz;
  const ctx = cv.getContext('2d');
  const h = sz / 2;
  const g = ctx.createRadialGradient(h, h, 0, h, h, h);
  g.addColorStop(0,   'rgba(37,99,235,1)');
  g.addColorStop(0.2, 'rgba(56,189,248,0.7)');
  g.addColorStop(0.5, 'rgba(56,189,248,0.15)');
  g.addColorStop(1,   'rgba(56,189,248,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, sz, sz);
  return new CanvasTexture(cv);
}

/* ── Component ───────────────────────────────────────────────────── */
export default function LegacyScene({
  entries,
  scrollProgressRef,
  scrollVelocityRef,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let alive = true;

    /* ── Renderer ─────────────────────────────────────────── */
    const renderer = new WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(BG_COLOR, 1);
    el.appendChild(renderer.domElement);

    /* ── Scene + Camera ───────────────────────────────────── */
    const scene  = new Scene();
    const camera = new PerspectiveCamera(FOV_DEFAULT, 1, 0.1, 500);

    /* ── Camera rig ───────────────────────────────────────── */
    const rig = createCameraRig(camera, entries.length);
    rig.update(0);

    /* ── Node orbs ────────────────────────────────────────── */
    const glowTex = makeGlowTex();
    const orbs = entries.map((_, i) => {
      const mat = new SpriteMaterial({
        map: glowTex, transparent: true,
        opacity: NODE_GLOW_IDLE.opacity,
        blending: AdditiveBlending, depthWrite: false,
      });
      const sp = new Sprite(mat);
      sp.position.copy(rig.getNodeWorldPos(i));
      sp.scale.set(NODE_GLOW_IDLE.size, NODE_GLOW_IDLE.size, 1);
      scene.add(sp);
      return sp;
    });

    /* ── Connectors ───────────────────────────────────────── */
    const conn = createConnectors(rig.nodePositions);
    scene.add(conn.group);

    /* ── Starfield ────────────────────────────────────────── */
    const totalZ = entries.length * NODE_SPACING + 80;
    const stars = PARTICLE_LAYERS.map((layer) => {
      const n = layer.count;
      const pos   = new Float32Array(n * 3);
      const sizes = new Float32Array(n);
      const seeds = new Float32Array(n);

      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * layer.xyRadius;
        pos[i * 3]     = Math.cos(a) * r;
        pos[i * 3 + 1] = Math.sin(a) * r;
        pos[i * 3 + 2] = 20 - Math.random() * totalZ;
        sizes[i] = layer.baseSize * (0.5 + Math.random() * 0.5);
        seeds[i] = Math.random();
      }

      const geom = new BufferGeometry();
      geom.setAttribute('position', new Float32BufferAttribute(pos, 3));
      geom.setAttribute('aSize',    new Float32BufferAttribute(sizes, 1));
      geom.setAttribute('aSeed',    new Float32BufferAttribute(seeds, 1));

      const mat = new ShaderMaterial({
        vertexShader:   VERT,
        fragmentShader: FRAG,
        uniforms: { uTime: { value: 0 }, uVel: { value: 0 } },
        transparent: true, depthWrite: false, blending: AdditiveBlending,
      });

      const pts = new Points(geom, mat);
      scene.add(pts);
      return { geom, mat, pts };
    });

    /* Per-layer ambient drift phase offsets */
    const drift = stars.map(() => ({
      px: Math.random() * Math.PI * 2,
      py: Math.random() * Math.PI * 2,
    }));

    /* ── Resize ───────────────────────────────────────────── */
    const resize = () => {
      if (!alive) return;
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    /* ── Render loop ──────────────────────────────────────── */
    const timer = new Timer();
    timer.connect(document);
    let prevActive = -1;
    let raf = 0;

    const render = (timestamp) => {
      if (!alive) return;
      timer.update(timestamp);
      const t   = timer.getElapsed();
      const p   = scrollProgressRef.current || 0;
      const vel = scrollVelocityRef.current || 0;
      const vN  = Math.min(1, Math.abs(vel) / VELOCITY_CEIL);

      /* Camera */
      rig.update(p);

      /* Connectors draw-on */
      conn.update(p);

      /* Active node index */
      const ai = Math.min(entries.length - 1, Math.max(0, Math.floor(p * entries.length)));

      /* Smooth FOV transition — founding era gets a subtle zoom to create
         the "signature moment" of arrival. Lerps every frame for fluid feel. */
      const targetFov = entries[ai]?.isFoundingEra ? FOV_ARRIVAL : FOV_DEFAULT;
      camera.fov += (targetFov - camera.fov) * 0.06;
      camera.updateProjectionMatrix();

      /* Orbs */
      orbs.forEach((sp, i) => {
        if (i === ai) {
          const pulse = 1 + Math.sin(t * PULSE_SPEED) * PULSE_AMP;
          const s = NODE_GLOW_ACTIVE.size * pulse;
          sp.scale.set(s, s, 1);
          sp.material.opacity = NODE_GLOW_ACTIVE.opacity;
        } else {
          const tw = 0.8 + Math.sin(t * 0.5 + i * 1.7) * 0.2;
          sp.scale.set(NODE_GLOW_IDLE.size * tw, NODE_GLOW_IDLE.size * tw, 1);
          sp.material.opacity = NODE_GLOW_IDLE.opacity;
        }
      });

      /* Starfield uniforms + drift */
      stars.forEach((layer, li) => {
        layer.mat.uniforms.uTime.value = t;
        layer.mat.uniforms.uVel.value  = vN;
        const d = drift[li];
        layer.pts.position.x = Math.sin(t * DRIFT_SPEED + d.px) * 0.3;
        layer.pts.position.y = Math.cos(t * DRIFT_SPEED * 0.7 + d.py) * 0.2;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    /* ── Cleanup ──────────────────────────────────────────── */
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      stars.forEach(({ geom, mat }) => { geom.dispose(); mat.dispose(); });
      glowTex.dispose();
      orbs.forEach((s) => s.material.dispose());
      conn.dispose();
      rig.dispose();
      timer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [entries, scrollProgressRef, scrollVelocityRef]);

  return (
    <div
      ref={containerRef}
      className="legacy-scene-container"
      aria-hidden="true"
      role="img"
      aria-label="Interactive 3D constellation visualization of Elevate's leadership history"
    />
  );
}
