import { Vector3, CatmullRomCurve3, Euler, Quaternion } from 'three';

export const CLUSTER_SPACING = 300;

/**
 * Creates a spline path for the camera to travel through the galaxy.
 * We want the path to weave slightly between the year clusters.
 */
export function createCameraRig(numClusters) {
  const points = [];
  // Start a bit before the first cluster
  points.push(new Vector3(0, 0, 50));

  for (let i = 0; i < numClusters; i++) {
    // Clusters are spaced out along the -Z axis.
    // Add some gentle X/Y wobble so it's not a straight line.
    const z = -i * CLUSTER_SPACING;
    const x = Math.sin(i * 1.5) * 40;
    const y = Math.cos(i * 1.2) * 20;
    points.push(new Vector3(x, y, z));
  }

  // End a bit after the last cluster
  points.push(new Vector3(0, 0, -(numClusters) * CLUSTER_SPACING));

  const spline = new CatmullRomCurve3(points);
  spline.tension = 0.6; // Gentle curve

  // We map scroll progress (0 to 1) to a segment of the spline.
  // The first cluster is at progress 0. The last cluster is at progress 1.
  // The spline has (numClusters + 1) segments.
  const getProgressOnSpline = (scrollP) => {
    // Map scrollP (0..1) so that 0 is exactly at cluster 0, 
    // and 1 is exactly at cluster N-1.
    // Point index 1 is cluster 0. Point index N is cluster N-1.
    const totalPoints = points.length;
    const startU = 1 / (totalPoints - 1);
    const endU = (totalPoints - 2) / (totalPoints - 1);
    
    return startU + scrollP * (endU - startU);
  };

  const getClusterPosition = (index) => {
    return points[index + 1].clone();
  };

  const update = (camera, scrollProgress) => {
    const u = getProgressOnSpline(scrollProgress);
    
    // Position
    const pos = spline.getPointAt(u);
    camera.position.copy(pos);

    // Look ahead
    const lookAheadU = Math.min(1.0, u + 0.02);
    const lookPos = spline.getPointAt(lookAheadU);
    camera.lookAt(lookPos);
  };

  return {
    spline,
    getClusterPosition,
    update,
    dispose: () => {}
  };
}
