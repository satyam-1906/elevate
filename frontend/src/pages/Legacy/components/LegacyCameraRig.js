/**
 * LegacyCameraRig — scroll-driven camera movement along a spline path.
 *
 * The camera drifts forward through the constellation as the user scrolls,
 * with a gentle sinusoidal wobble in X/Y for organic feel. Each era node
 * sits at a fixed point along the path.
 */
import { CatmullRomCurve3, Vector3 } from 'three';

/** Distance between consecutive era nodes along the Z axis */
export const NODE_SPACING = 30;

/* How far ahead on the path the camera looks (fraction of total path length).
   Keeps the "flying forward" sensation without overshooting the next node. */
const LOOK_AHEAD = 0.025;

/* Gentle sinusoidal wobble so the path isn't a boring straight line */
const WOBBLE_X = 2.5;
const WOBBLE_Y = 1.2;

/**
 * Creates a camera rig that moves the camera along a CatmullRom spline
 * driven by a 0–1 scroll progress value.
 *
 * @param {import('three').PerspectiveCamera} camera
 * @param {number} numNodes — total legacy entries
 * @returns {{ update(progress: number): void, getNodeWorldPos(i: number): Vector3, nodePositions: Vector3[], dispose(): void }}
 */
export function createCameraRig(camera, numNodes) {
  const pts = [];
  // One extra point before first node and after last for path padding
  for (let i = -1; i <= numNodes; i++) {
    pts.push(new Vector3(
      Math.sin(i * 0.6) * WOBBLE_X,
      Math.cos(i * 0.8) * WOBBLE_Y,
      -i * NODE_SPACING,
    ));
  }

  const path = new CatmullRomCurve3(pts, false, 'catmullrom', 0.5);

  // Pre-compute world positions for the glowing orbs at each node
  const nodePositions = Array.from({ length: numNodes }, (_, i) => {
    const t = (i + 1) / (numNodes + 1);
    return path.getPointAt(t).clone();
  });

  const _look = new Vector3();

  /** Move camera to the position on the path corresponding to `progress` (0–1). */
  function update(progress) {
    const t = Math.max(0, Math.min(1, progress));
    camera.position.copy(path.getPointAt(t));
    path.getPointAt(Math.min(1, t + LOOK_AHEAD), _look);
    camera.lookAt(_look);
  }

  function getNodeWorldPos(index) {
    return nodePositions[index] || new Vector3();
  }

  function dispose() {
    pts.length = 0;
    nodePositions.length = 0;
  }

  return { update, getNodeWorldPos, nodePositions, dispose };
}
