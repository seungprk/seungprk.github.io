import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

const createSphere = (radius, pos, tilt, orbitDuration) => {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.copy(pos);

  const parent = new THREE.Group();
  parent.add(sphere);

  parent.rotation.x = tilt;

  const tween = new TWEEN.Tween(parent.rotation);
  tween.to({ y: Math.PI * 2 }, orbitDuration)
    .start()
    .repeat(Infinity);

  return parent;
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
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const sun = createSphere(5, new THREE.Vector3(0, 0, 0), 0, 0);
  const planet1 = createSphere(1, new THREE.Vector3(15, 0, 0), Math.PI / 4, 3000);
  const planet2 = createSphere(1, new THREE.Vector3(25, 0, 0), -Math.PI / 8, 5000);
  const planet3 = createSphere(1, new THREE.Vector3(35, 0, 0), 0, 7000);
  scene.add(sun);
  scene.add(planet1);
  scene.add(planet2);
  scene.add(planet3);

  camera.position.z = 100;
  camera.lookAt(sun.position);

  const animate = (time) => {
    TWEEN.update(time);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', () => onWindowResize(camera, renderer), false);
};

export default setup;
