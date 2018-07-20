import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

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

const createTrail = (leader) => {
  // point cloud geometry
  const geometry = new THREE.BufferGeometry();
  const worldPosVector = new THREE.Vector3();
  leader.getWorldPosition(worldPosVector);


  const position = new Float32Array(30);
  for (let i = 0; i < 30; i += 1) {
    if (i % 3 === 0) {
      position[i] = worldPosVector.x;
      position[i + 1] = worldPosVector.y;
      position[i + 2] = worldPosVector.z;

      const startIndex = i;

      const tween = new TWEEN.Tween(null);
      tween.to(null, 0)
        .delay(10 * 100)
        .onUpdate(() => {
          leader.getWorldPosition(worldPosVector);
          position[startIndex] = worldPosVector.x;
          position[startIndex + 1] = worldPosVector.y;
          position[startIndex + 2] = worldPosVector.z;
          geometry.attributes.position.needsUpdate = true;
        })
        .repeat(Infinity);

      const startTween = new TWEEN.Tween(null);
      startTween.to(null, i / 3 * 100)
        .chain(tween)
        .start();
    }
  }
  geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));

  // add an attribute
  const numVertices = geometry.attributes.position.count;
  const alphas = new Float32Array(numVertices * 1); // 1 values per vertex

  for (let i = 0; i < numVertices; i += 1) {
    alphas[i] = 1;
    const startIndex = i;
    const tween = new TWEEN.Tween(alphas);
    tween.to({ [startIndex]: 0 }, numVertices * 100)
      .onUpdate(() => {
        geometry.attributes.alpha.needsUpdate = true;
      })
      .repeat(Infinity);

    const startTween = new TWEEN.Tween(null);
    startTween.to(null, i * 100)
      .chain(tween)
      .start();
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

export default { createTrail };
