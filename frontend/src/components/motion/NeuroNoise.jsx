import { useEffect, useRef } from 'react';

/**
 * NeuroNoise — Real neuron-like animated canvas.
 * Mimics the Hero 24 style: one bright central soma node on the right half,
 * branching dendrites that shimmer, with particles flowing along them.
 */
export default function NeuroNoise({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;
    let W, H;

    // ── Resize ───────────────────────────────────────────────────────────────
    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Neuron structure ─────────────────────────────────────────────────────
    // Central soma lives at ~65% x, 45% y
    const getSoma = () => ({ x: W * 0.65, y: H * 0.44 });

    // Generate branching dendrite tree from soma
    function buildTree(cx, cy, angle, length, depth, maxDepth, branches) {
      if (depth > maxDepth || length < 18) return;
      const ex = cx + Math.cos(angle) * length;
      const ey = cy + Math.sin(angle) * length;

      branches.push({
        x1: cx, y1: cy,
        x2: ex, y2: ey,
        depth,
        phase: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.012,
        width: Math.max(0.4, 2.5 - depth * 0.38),
      });

      const spread = (0.45 + Math.random() * 0.3) * (1 - depth / maxDepth);
      const childCount = depth < 2 ? 3 : 2;
      for (let i = 0; i < childCount; i++) {
        const a = angle + (i - (childCount - 1) / 2) * spread
                       + (Math.random() - 0.5) * 0.25;
        buildTree(ex, ey, a, length * (0.6 + Math.random() * 0.15),
                  depth + 1, maxDepth, branches);
      }
    }

    // Build multiple dendrite arms from the soma
    function buildNeuron() {
      const s = getSoma();
      const branches = [];
      const arms = 7;
      for (let i = 0; i < arms; i++) {
        const angle = (i / arms) * Math.PI * 2 + Math.random() * 0.4;
        buildTree(s.x, s.y, angle, H * 0.22, 0, 4, branches);
      }
      // Axon — one long straight-ish branch going left
      buildTree(s.x, s.y, Math.PI + 0.1, H * 0.38, 0, 3, branches);
      return branches;
    }

    let branches = buildBranches();
    function buildBranches() { return buildNeuron(); }

    // Rebuild on resize
    window.addEventListener('resize', () => {
      branches = buildBranches();
    });

    // ── Particles flowing along dendrites ───────────────────────────────────
    const MAX_PARTICLES = 55;
    const particles = [];

    function spawnParticle() {
      if (particles.length >= MAX_PARTICLES) return;
      const b = branches[Math.floor(Math.random() * branches.length)];
      particles.push({
        branch: b,
        t: Math.random(),           // position along branch 0→1
        dir: Math.random() > 0.5 ? 1 : -1,
        speed: 0.003 + Math.random() * 0.005,
        opacity: 0.4 + Math.random() * 0.5,
        size: 1 + Math.random() * 1.5,
      });
    }

    for (let i = 0; i < 30; i++) spawnParticle();

    // ── Draw helpers ─────────────────────────────────────────────────────────
    function lerpC(a, b, t) { return a + (b - a) * t; }

    function drawBranch(b, t) {
      const pulse = 0.5 + 0.5 * Math.sin(t * b.speed + b.phase);
      const opacity = (0.15 + 0.25 * pulse) * (1 - b.depth * 0.12);
      const w = b.width * (1 + 0.3 * pulse);

      // Gradient along branch
      const grad = ctx.createLinearGradient(b.x1, b.y1, b.x2, b.y2);
      grad.addColorStop(0, `rgba(96, 165, 250, ${opacity})`);
      grad.addColorStop(0.5, `rgba(200, 230, 255, ${opacity * 1.4 * pulse})`);
      grad.addColorStop(1, `rgba(56, 189, 248, ${opacity * 0.5})`);

      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      ctx.lineTo(b.x2, b.y2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = w;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    function drawSoma(t) {
      const s = getSoma();
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.018);
      const r = 10 + 4 * pulse;

      // Outer glow rings
      for (let i = 3; i >= 0; i--) {
        const rr = r * (3 + i * 2.5) * (1 + 0.1 * pulse);
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, rr);
        const a = (0.12 - i * 0.025) * pulse;
        g.addColorStop(0, `rgba(150, 200, 255, ${a})`);
        g.addColorStop(1, `rgba(37, 99, 235, 0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, rr, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Bright core
      const coreGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 2.5);
      coreGrad.addColorStop(0,   `rgba(240, 248, 255, ${0.95 * pulse + 0.3})`);
      coreGrad.addColorStop(0.3, `rgba(147, 197, 253, ${0.7})`);
      coreGrad.addColorStop(0.7, `rgba(56, 189, 248, 0.4)`);
      coreGrad.addColorStop(1,   `rgba(37, 99, 235, 0)`);
      ctx.beginPath();
      ctx.arc(s.x, s.y, r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Solid center dot
      const dotGrad = ctx.createRadialGradient(s.x - r * 0.3, s.y - r * 0.3, 0, s.x, s.y, r);
      dotGrad.addColorStop(0, '#fff');
      dotGrad.addColorStop(0.5, '#93c5fd');
      dotGrad.addColorStop(1, '#2563eb');
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fillStyle = dotGrad;
      ctx.fill();
    }

    function drawParticle(p, t) {
      const b = p.branch;
      const x = lerpC(b.x1, b.x2, p.t);
      const y = lerpC(b.y1, b.y2, p.t);

      // Glow halo
      const g = ctx.createRadialGradient(x, y, 0, x, y, p.size * 5);
      g.addColorStop(0, `rgba(200, 230, 255, ${p.opacity})`);
      g.addColorStop(1, `rgba(56, 189, 248, 0)`);
      ctx.beginPath();
      ctx.arc(x, y, p.size * 5, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 240, 255, ${p.opacity})`;
      ctx.fill();
    }

    // ── Subtle vignette/background glow ──────────────────────────────────────
    function drawBackground() {
      // Right-side blue glow to frame the neuron
      const s = getSoma();
      const bg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, W * 0.55);
      bg.addColorStop(0,    'rgba(15, 30, 80, 0.18)');
      bg.addColorStop(0.4,  'rgba(10, 20, 60, 0.1)');
      bg.addColorStop(1,    'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
    }

    // ── Main loop ─────────────────────────────────────────────────────────────
    let t = 0;
    function frame() {
      ctx.clearRect(0, 0, W, H);
      t++;

      drawBackground();

      // Branches
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      branches.forEach(b => drawBranch(b, t));
      ctx.restore();

      // Particles
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      particles.forEach(p => {
        p.t += p.speed * p.dir;
        if (p.t > 1 || p.t < 0) {
          p.dir *= -1;
          p.t = Math.max(0, Math.min(1, p.t));
        }
        drawParticle(p, t);
      });
      ctx.restore();

      // Soma on top (normal blend)
      drawSoma(t);

      // Occasionally spawn new particle
      if (t % 40 === 0) spawnParticle();

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
