import * as THREE from 'three';

const createSphere = (radius, pos) => {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.copy(pos);

  const parent = new THREE.Object3D();
  parent.add(sphere);

  return parent;
};

const orbit = (sphere, angle, orbitOffsetAngle) => {
  sphere.rotation.y = angle;
  sphere.rotation.z = Math.cos(angle) * orbitOffsetAngle;
};

const onWindowResize = (camera, renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const setup = (canvas) => {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  camera.position.z = 100;
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const sun = createSphere(5, new THREE.Vector3(0, 0, 0));
  const planet1 = createSphere(1, new THREE.Vector3(15, 0, 0));
  const planet2 = createSphere(1, new THREE.Vector3(25, 0, 0));
  const planet3 = createSphere(1, new THREE.Vector3(35, 0, 0));
  scene.add(sun);
  scene.add(planet1);
  scene.add(planet2);
  scene.add(planet3);

  let angle = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    orbit(planet1, angle, Math.PI / 8);
    orbit(planet2, angle, Math.PI / 16);
    orbit(planet3, angle, -Math.PI / 10);
    angle += Math.PI / 360;
  };
  animate();

  window.addEventListener('resize', () => onWindowResize(camera, renderer), false);
};

export default setup;
