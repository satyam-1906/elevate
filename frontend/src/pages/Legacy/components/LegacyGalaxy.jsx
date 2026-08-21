import { useEffect, useRef, useState, useMemo } from 'react';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  ShaderMaterial,
  AdditiveBlending,
  Vector3
} from 'three';
import { Timer } from 'three/src/core/Timer.js';
import { createCameraRig, CLUSTER_SPACING } from './LegacyCameraRig';
import { computeTreeLayout } from './LegacyOrgTree';
import { createTreeConnectors } from './LegacyTreeConnector';
import LegacyTreeNode from './LegacyTreeNode';

const VELOCITY_CEIL = 3000;

/* ── Galaxy Background Shaders ───────────────────────────────────── */
const BG_VERT = `
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

    // Size attenuates with depth, stretches with velocity
    float clampedDist = max(dist, 20.0);
    float sz = aSize * (400.0 / clampedDist) * (1.0 + uVel * 0.8);
    gl_PointSize = max(1.0, sz);
    gl_Position  = projectionMatrix * mv;

    // Twinkle and depth fade
    float twinkle = 0.5 + 0.5 * sin(uTime * 0.5 + aSeed * 6.28);
    float depthFade = smoothstep(1000.0, 50.0, dist);
    float nearFade = smoothstep(5.0, 30.0, dist);
    vAlpha = (twinkle * depthFade) * nearFade + (uVel * 0.2 * nearFade);
    vAlpha = clamp(vAlpha, 0.0, 1.0);
  }
`;

const BG_FRAG = `
  varying float vAlpha;
  varying float vSeed;
  uniform float uVel;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    // Streak vertically based on velocity
    c.y *= 1.0 + uVel * 3.0;
    float d = length(c);
    float a = smoothstep(0.5, 0.02, d) * vAlpha;

    // Galaxy Colors (White, Light Blue, Cyan, Pink)
    vec3 col1 = vec3(255.0, 255.0, 255.0) / 255.0; // White
    vec3 col2 = vec3(147.0, 197.0, 253.0) / 255.0; // Light Blue
    vec3 col3 = vec3(233.0, 71.0, 245.0) / 255.0; // Pink
    vec3 col4 = vec3(56.0, 189.0, 248.0) / 255.0; // Cyan

    float r = fract(vSeed * 13.7);
    vec3 color = col1;
    if (r > 0.3) color = col2;
    if (r > 0.7) color = col3;
    if (r > 0.9) color = col4;

    gl_FragColor = vec4(color, a);
    if (a < 0.01) discard;
  }
`;

/**
 * Creates the background galaxy point cloud.
 */
function createGalaxy(numClusters) {
  const count = 1000;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const seeds = new Float32Array(count);

  // Spread particles across the length of the spline
  const zMax = 200;
  const zMin = -(numClusters + 1) * CLUSTER_SPACING;

  for (let i = 0; i < count; i++) {
    // Spread X and Y wider than the clusters so it envelops them
    positions[i * 3 + 0] = (Math.random() - 0.5) * 600;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
    positions[i * 3 + 2] = zMax - Math.random() * (zMax - zMin);

    sizes[i] = Math.random() * 2.0 + 0.5;
    seeds[i] = Math.random();
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('aSize', new BufferAttribute(sizes, 1));
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1));

  const material = new ShaderMaterial({
    vertexShader: BG_VERT,
    fragmentShader: BG_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uVel: { value: 0 }
    },
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false
  });

  return new Points(geometry, material);
}

// Ensure BufferAttribute is pulled from three
import { BufferAttribute } from 'three';

export default function LegacyGalaxy({ entries, scrollProgressRef, scrollVelocityRef }) {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  
  // Array of refs to all HTML cards for 2D projection
  const cardRefs = useRef(new Map());
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  // Pre-calculate all tree layouts and cluster positions once
  const treeData = useMemo(() => {
    const data = [];
    // We instantiate a temporary rig just to get the cluster positions
    const tempRig = createCameraRig(entries.length);
    
    entries.forEach((yearEntry, i) => {
      const clusterPos = tempRig.getClusterPosition(i);
      const layout = computeTreeLayout(yearEntry.hierarchy);
      
      // Shift layout by cluster position
      const absoluteNodes = layout.map(n => ({
        ...n,
        id: `${yearEntry.id}-${n.id}`,
        parentId: n.parentId ? `${yearEntry.id}-${n.parentId}` : null,
        // Shift cluster deep enough into Z so the camera stops 80 units in front of it
        position: n.position.clone().add(clusterPos)
      }));

      data.push({
        yearEntry,
        nodes: absoluteNodes,
        clusterPos
      });
    });
    return data;
  }, [entries]);

  // Flatten nodes for rendering
  const allNodes = useMemo(() => treeData.flatMap(c => c.nodes), [treeData]);

  // Keep a ref to the treeConnectors so we can update hover state from React
  const treeConnectorsRef = useRef(null);

  useEffect(() => {
    if (treeConnectorsRef.current) {
      treeConnectorsRef.current.updateHover(hoveredNodeId);
    }
  }, [hoveredNodeId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let alive = true;

    // Setup WebGL
    const scene = new Scene();
    const camera = new PerspectiveCamera(60, 1, 1, 1000);
    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    
    // Mount canvas
    el.innerHTML = '';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none'; // Let clicks pass to cards
    el.appendChild(renderer.domElement);

    // Objects
    const rig = createCameraRig(entries.length);
    const galaxy = createGalaxy(entries.length);
    scene.add(galaxy);

    const connectors = createTreeConnectors(allNodes);
    treeConnectorsRef.current = connectors;
    scene.add(connectors.mesh);

    // Resize
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

    // Render loop
    const timer = new Timer();
    timer.connect(document);
    let raf = 0;

    const render = (timestamp) => {
      if (!alive) return;
      timer.update(timestamp);
      const t = timer.getElapsed();
      
      const p = scrollProgressRef.current || 0;
      const vel = scrollVelocityRef.current || 0;
      const vN = Math.min(1, Math.abs(vel) / VELOCITY_CEIL);

      // Camera
      rig.update(camera, p);

      // Update shaders
      galaxy.material.uniforms.uTime.value = t;
      galaxy.material.uniforms.uVel.value = vN;
      connectors.update(t);

      // Render 3D
      renderer.render(scene, camera);

      // Update 2D HTML Cards
      const w = renderer.domElement.width / renderer.getPixelRatio();
      const h = renderer.domElement.height / renderer.getPixelRatio();
      const hw = w / 2;
      const hh = h / 2;

      const camDir = new Vector3();
      camera.getWorldDirection(camDir);

      // Project each node's 3D position to 2D
      allNodes.forEach(node => {
        const domEl = cardRefs.current.get(node.id);
        if (!domEl) return;

        // Check if node is actually in front of the camera
        const toNode = node.position.clone().sub(camera.position);
        if (camDir.dot(toNode) < 0) {
          domEl.style.display = 'none';
          return;
        }

        const v = node.position.clone();
        v.project(camera);

        // Hide if too far off screen
        if (v.x < -2.5 || v.x > 2.5 || v.y < -2.5 || v.y > 2.5) {
          domEl.style.display = 'none';
        } else {
          domEl.style.display = 'flex';
          const x = (v.x * hw) + hw;
          const y = -(v.y * hh) + hh;
          
          // Distance from camera to fade out distant nodes
          const dist = camera.position.distanceTo(node.position);
          let opacity = 1;
          if (dist > 300) opacity = Math.max(0, 1 - (dist - 300) / 100);
          // Also fade out nodes we just passed
          if (dist < 20) opacity = Math.max(0, dist / 20);

          domEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          domEl.style.opacity = opacity.toFixed(2);
          domEl.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
        }
      });

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      rig.dispose();
      connectors.dispose();
      galaxy.geometry.dispose();
      galaxy.material.dispose();
      timer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [entries, allNodes, scrollProgressRef, scrollVelocityRef]);

  return (
    <div className="legacy-galaxy-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      {/* 3D Canvas goes here */}
      <div ref={containerRef} aria-hidden="true" style={{ width: '100%', height: '100%' }} />
      
      {/* 2D HTML Cards layer */}
      <div 
        ref={cardsContainerRef} 
        className="legacy-cards-overlay"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}
      >
        {allNodes.map(node => (
          <LegacyTreeNode
            key={node.id}
            person={node.person}
            ref={el => cardRefs.current.set(node.id, el)}
            onHoverStart={setHoveredNodeId}
            onHoverEnd={() => setHoveredNodeId(null)}
          />
        ))}
      </div>
    </div>
  );
}
