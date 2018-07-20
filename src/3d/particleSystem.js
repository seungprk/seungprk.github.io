import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

const vertexShader = `
  attribute float alpha;
  varying float vAlpha;
  void main() {
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 4.0;
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

      const repeater = new TWEEN.Tween(null);
      const moveLoc = new TWEEN.Tween(null);
      const initDelay = new TWEEN.Tween(null);

      initDelay.to(null, i / 3 * 100)
        .chain(moveLoc)
        .start();

      moveLoc.to(null, 0)
        .onUpdate(() => {
          leader.getWorldPosition(worldPosVector);
          position[startIndex] = worldPosVector.x;
          position[startIndex + 1] = worldPosVector.y;
          position[startIndex + 2] = worldPosVector.z;
          geometry.attributes.position.needsUpdate = true;
        })
        .chain(repeater);

      repeater.to(null, 10 * 100)
        .chain(moveLoc);
    }
  }
  geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));

  // add an attribute
  const numVertices = geometry.attributes.position.count;
  const alphas = new Float32Array(numVertices * 1); // 1 values per vertex

  for (let i = 0; i < numVertices; i += 1) {
    alphas[i] = 0;
    const startIndex = i;

    const fade = new TWEEN.Tween(alphas);
    const initDelay = new TWEEN.Tween(null);

    fade.to({ [startIndex]: 0 }, numVertices * 100)
      .onUpdate(() => {
        geometry.attributes.alpha.needsUpdate = true;
      })
      .repeat(Infinity);

    initDelay.to(null, i * 100)
      .onComplete(() => {
        alphas[startIndex] = 1;
      })
      .chain(fade)
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
