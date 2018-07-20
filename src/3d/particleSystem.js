import * as THREE from 'three';

const vertexShader = `
  attribute float alpha;
  varying float vAlpha;
  void main() {
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 8.0;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 color;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(color, vAlpha);
  }
`;

const createdSystems = [];

const update = () => {
  const worldPosVector = new THREE.Vector3();
  createdSystems.forEach((system) => {
    system.leader.getWorldPosition(worldPosVector);
    const alphas = system.geometry.attributes.alpha;
    const { count } = alphas;
    for (let i = 0; i < count; i += 1) {
      // dynamically change alphas
      alphas.array[i] *= 0.95;
      if (alphas.array[i] < 0.01) {
        alphas.array[i] = 1.0;
        const { position } = system.geometry.attributes;
        position.array[i * 3] = worldPosVector.x;
        position.array[i * 3 + 1] = worldPosVector.y;
        position.array[i * 3 + 2] = worldPosVector.z;
        position.needsUpdate = true;
      }
    }
    alphas.needsUpdate = true;
  });
};

const createTrail = (leader) => {
  // point cloud geometry
  // const geometry = new THREE.SphereBufferGeometry(200, 16, 8);
  const geometry = new THREE.BufferGeometry();
  const worldPosVector = new THREE.Vector3();
  leader.getWorldPosition(worldPosVector);

  const position = new Float32Array(30);
  for (let i = 0; i < 30; i += 1) {
    if (i % 3 === 0) position[i] = worldPosVector.x;
    else if (i % 3 === 1) position[i] = worldPosVector.y;
    else if (i % 3 === 2) position[i] = worldPosVector.z;
  }
  geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));

  // add an attribute
  const numVertices = geometry.attributes.position.count;
  const alphas = new Float32Array(numVertices * 1); // 1 values per vertex

  for (let i = 0; i < numVertices; i += 1) {
    // set alpha randomly
    alphas[i] = Math.random();
  }
  geometry.addAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

  // uniforms
  const uniforms = {
    color: { value: new THREE.Color(0xffffff) },
  };

  // point cloud material
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
  });

  // point cloud
  const cloud = new THREE.Points(geometry, shaderMaterial);
  cloud.leader = leader;
  createdSystems.push(cloud);

  return cloud;
};

export default { createTrail, update };
