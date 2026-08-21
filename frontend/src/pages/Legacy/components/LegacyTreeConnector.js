import { 
  Group,
  Mesh,
  TubeGeometry,
  QuadraticBezierCurve3,
  ShaderMaterial, 
  Vector3,
  AdditiveBlending
} from 'three';

/**
 * Creates curved, flowing glowing ribbon connectors for the org tree.
 */
export function createTreeConnectors(nodes) {
  const group = new Group();
  const meshes = [];

  let numLines = 0;
  nodes.forEach(node => { if (node.parentId) numLines++; });

  if (numLines === 0) return { mesh: group, updateHover: () => {}, update: () => {}, dispose: () => {} };

  // Shaders for the TubeGeometry
  // Tube UVs: x is along the length (0 to 1), y is around the circumference (0 to 1)
  const TUBE_VERT = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const TUBE_FRAG = `
    uniform float uTime;
    uniform float uHoveredId; // 1 if hovered, 0 if not
    varying vec2 vUv;

    // Ethereal Ribbon Colors
    const vec3 PINK = vec3(233.0, 71.0, 245.0) / 255.0;
    const vec3 BLUE = vec3(47.0,  75.0, 162.0) / 255.0;
    const vec3 CYAN = vec3(56.0, 189.0, 248.0) / 255.0;

    void main() {
      float flowUv = vUv.x; // Tube length
      float circUv = vUv.y; // Tube circumference
      
      // Flowing sine wave
      float wave = sin(flowUv * 15.0 - uTime * 2.5) * 0.5 + 0.5;
      
      // Gradient along the tube
      vec3 baseColor = mix(BLUE, PINK, flowUv);
      vec3 color = baseColor + (CYAN * wave * 0.8);

      // Intense pulse on hover
      if (uHoveredId > 0.5) {
        float hoverWave = sin(flowUv * 25.0 - uTime * 6.0) * 0.5 + 0.5;
        color = mix(color, vec3(1.0), 0.3) + (CYAN * hoverWave * 1.5);
      }

      // Fade out at the start and end of the ribbon
      float endFade = smoothstep(0.0, 0.1, flowUv) * smoothstep(1.0, 0.9, flowUv);
      
      // Ribbon edge softness (fade out the "sides" of the tube so it looks like a ribbon of light, not a solid pipe)
      float edgeSoftness = sin(circUv * 3.1415); 
      edgeSoftness = pow(edgeSoftness, 2.0); // Make it sharper

      float alpha = endFade * edgeSoftness;

      gl_FragColor = vec4(color, alpha * (uHoveredId > 0.5 ? 1.0 : 0.6));
    }
  `;

  nodes.forEach(node => {
    if (!node.parentId) return;
    const parentNode = nodes.find(n => n.id === node.parentId);
    if (!parentNode) return;

    // Create a smooth swooping bezier curve from Parent to Child
    const p1 = parentNode.position.clone();
    const p3 = node.position.clone();
    
    // Control point pushes the curve outward/upward for an elegant swoop
    const dist = p1.distanceTo(p3);
    const mid = p1.clone().lerp(p3, 0.5);
    // Push the mid point up and slightly out
    mid.y += Math.min(30, dist * 0.2); 
    mid.x += (Math.random() - 0.5) * 20; // Slight organic twist

    const curve = new QuadraticBezierCurve3(p1, mid, p3);
    
    // Create tube along curve
    const geometry = new TubeGeometry(curve, 20, 0.8, 8, false);

    const material = new ShaderMaterial({
      vertexShader: TUBE_VERT,
      fragmentShader: TUBE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uHoveredId: { value: -1 }
      },
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false
    });
    
    const mesh = new Mesh(geometry, material);
    mesh.userData = { childId: node.id, parentId: parentNode.id };
    
    meshes.push(mesh);
    group.add(mesh);
  });

  const updateHover = (hoveredNodeId) => {
    meshes.forEach(mesh => {
      if (mesh.userData.childId === hoveredNodeId || mesh.userData.parentId === hoveredNodeId) {
        mesh.material.uniforms.uHoveredId.value = 1.0; 
      } else {
        mesh.material.uniforms.uHoveredId.value = 0.0;
      }
    });
  };

  const update = (time) => {
    meshes.forEach(mesh => {
      mesh.material.uniforms.uTime.value = time;
    });
  };

  const dispose = () => {
    meshes.forEach(m => {
      m.geometry.dispose();
      m.material.dispose();
    });
  };

  return {
    mesh: group,
    updateHover,
    update,
    dispose
  };
}
