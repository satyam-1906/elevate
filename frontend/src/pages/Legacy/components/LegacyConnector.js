/**
 * LegacyConnector — animated "chain" lines between constellation nodes.
 *
 * Each connector is a THREE.Line that draws on progressively as the user
 * scrolls past it. A softer glow layer underneath adds depth.
 */
import {
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  Line,
  AdditiveBlending,
  Group,
} from 'three';

/** Vertex count per connector segment (higher = smoother curve) */
const SEGMENTS = 32;

/* Colours from the design system */
const CORE_HEX = 0x38bdf8;  // --accent
const GLOW_HEX = 0x2563eb;  // --primary

/**
 * Creates a Group containing connector lines between adjacent node positions.
 *
 * @param {import('three').Vector3[]} nodePositions
 * @returns {{ group: Group, update(progress: number): void, dispose(): void }}
 */
export function createConnectors(nodePositions) {
  const group = new Group();
  const items = [];

  for (let i = 0; i < nodePositions.length - 1; i++) {
    const a = nodePositions[i];
    const b = nodePositions[i + 1];

    const pos = new Float32Array((SEGMENTS + 1) * 3);
    for (let s = 0; s <= SEGMENTS; s++) {
      const t = s / SEGMENTS;
      pos[s * 3]     = a.x + (b.x - a.x) * t;
      pos[s * 3 + 1] = a.y + (b.y - a.y) * t;
      pos[s * 3 + 2] = a.z + (b.z - a.z) * t;
    }

    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(pos, 3));

    // Sharp core line
    const coreMat = new LineBasicMaterial({
      color: CORE_HEX, transparent: true, opacity: 0.65,
    });
    const core = new Line(geom, coreMat);

    // Soft glow behind it
    const glowGeom = geom.clone();
    const glowMat = new LineBasicMaterial({
      color: GLOW_HEX, transparent: true, opacity: 0.2,
      blending: AdditiveBlending,
    });
    const glow = new Line(glowGeom, glowMat);

    group.add(glow, core);

    /* Each connector draws on during its slice of overall scroll progress.
       With N nodes there are N-1 connectors; connector i draws during
       progress (i / N) → ((i+1) / N). */
    items.push({
      core, glow, geom, glowGeom,
      verts: SEGMENTS + 1,
      pStart: i / nodePositions.length,
      pEnd: (i + 1) / nodePositions.length,
    });
  }

  /** @param {number} progress — 0 to 1 overall scroll progress */
  function update(progress) {
    for (const c of items) {
      const local = Math.max(0, Math.min(1,
        (progress - c.pStart) / (c.pEnd - c.pStart),
      ));
      const count = Math.floor(local * c.verts);
      c.core.geometry.setDrawRange(0, count);
      c.glow.geometry.setDrawRange(0, count);
    }
  }

  function dispose() {
    for (const c of items) {
      c.geom.dispose();
      c.glowGeom.dispose();
      c.core.material.dispose();
      c.glow.material.dispose();
    }
    group.clear();
  }

  return { group, update, dispose };
}
