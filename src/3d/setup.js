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
  // Scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  camera.position.z = 100;
  camera.position.y = 100;
  camera.lookAt(scene.position);

  const renderer = new THREE.WebGLRenderer({ canvas, preserveDrawingBuffer: true });
  renderer.autoClearColor = false;
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Transparent plane for fading
  const fadeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.1,
  });
  const fadePlane = new THREE.PlaneBufferGeometry(100, 100);
  const fadeMesh = new THREE.Mesh(fadePlane, fadeMaterial);
  fadeMesh.position.z = -1;
  fadeMesh.renderOrder = -1;
  camera.add(fadeMesh);
  scene.add(camera);

  // Add spheres
  const sun = createSphere(5, new THREE.Vector3(0, 0, 0), 0, 0);
  const planet1 = createSphere(1, new THREE.Vector3(15, 0, 0), Math.PI / 6, 5000);
  const planet2 = createSphere(1, new THREE.Vector3(20, 0, 0), Math.PI / 8, 6000);
  const planet3 = createSphere(1, new THREE.Vector3(25, 0, 0), -Math.PI / 4, 7000);
  const planet4 = createSphere(1, new THREE.Vector3(30, 0, 0), -Math.PI / 8, 8000);
  const planet5 = createSphere(1, new THREE.Vector3(35, 0, 0), 0, 9000);
  const planet6 = createSphere(1, new THREE.Vector3(40, 0, 0), Math.PI / 32, 10000);
  scene.add(sun);
  scene.add(planet1);
  scene.add(planet2);
  scene.add(planet3);
  scene.add(planet4);
  scene.add(planet5);
  scene.add(planet6);

  // Animation and resize
  let setCameraPos = () => {};
  const animate = (time) => {
    TWEEN.update(time);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    setCameraPos();
  };
  animate();

  // Tween track code
  const planet4Vector = new THREE.Vector3();
  const tween = new TWEEN.Tween(camera.position);
  tween.to(planet4Vector, 3000)
    .onUpdate(() => {
      planet4.children[0].getWorldPosition(planet4Vector);
      planet4Vector.z += 10;
      planet4Vector.y += 10;
    })
    .onComplete(() => {
      setCameraPos = () => {
        planet4.children[0].getWorldPosition(planet4Vector);
        planet4Vector.z += 10;
        planet4Vector.y += 10;
        camera.position.copy(planet4Vector);
      };
    })
    .start();

  window.addEventListener('resize', () => onWindowResize(camera, renderer), false);
};

export default setup;
