import * as THREE from 'three';

const loadShaders = (vertextUrl, fragmentUrl, onLoad, onProgress, onError) => {
  const vertexLoader = new THREE.XHRLoader(THREE.DefaultLoadingManager);
  vertexLoader.setResponseType('text');
  vertexLoader.load(vertextUrl, (vertexText) => {
    const fragmentLoader = new THREE.XHRLoader(THREE.DefaultLoadingManager);
    fragmentLoader.setResponseType('text');
    fragmentLoader.load(fragmentUrl, (fragmentText) => {
      onLoad(vertexText, fragmentText);
    });
  }, onProgress, onError);
};

const update = (particleSystem) => {
  const alphas = particleSystem.geometry.attributes.alpha;
  const { count } = alphas;
  for (let i = 0; i < count; i += 1) {
    // dynamically change alphas
    alphas.array[i] *= 0.95;
    if (alphas.array[i] < 0.01) {
      alphas.array[i] = 1.0;
    }
  }
  alphas.needsUpdate = true; // important!
  particleSystem.rotation.x += 0.005;
  particleSystem.rotation.y += 0.005;
};

const createSystem = () => {
  // point cloud geometry
  const geometry = new THREE.SphereBufferGeometry(100, 16, 8);

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
    color: { value: new THREE.Color(0xffff00) },
  };

  // point cloud material
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
    transparent: true,
  });

  // point cloud
  const cloud = new THREE.Points(geometry, shaderMaterial);

  return cloud;
};

export default { createSystem, update };
