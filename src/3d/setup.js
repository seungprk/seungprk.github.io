/* eslint no-param-reassign: 0 */
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

const initialCamPos = new THREE.Vector3(0, 70, 70);
const pageCount = 3;

const createSphere = (radius, pos, orbitDuration) => {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.copy(pos);

  const vertCount = pos.x * 8;
  const circleGeometry = new THREE.CircleGeometry(pos.x, vertCount);
  circleGeometry.vertices.shift();
  const circleMaterial = new THREE.LineDashedMaterial({ color: 'white' });
  const circle = new THREE.Line(circleGeometry, circleMaterial);
  circle.rotation.x = Math.PI / 2;

  const parent = new THREE.Group();
  parent.rotation.y = Math.random() * Math.PI * 2;
  parent.add(sphere);
  parent.add(circle);

  const tween = new TWEEN.Tween(parent.rotation);
  tween.to({ y: parent.rotation.y + Math.PI * 2 }, orbitDuration)
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
  camera.position.copy(initialCamPos);
  camera.lookAt(scene.position);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add spheres
  const spheres = [
    createSphere(5, new THREE.Vector3(0, 0, 0), 0),
    createSphere(1, new THREE.Vector3(10, 0, 0), 10000),
    createSphere(1, new THREE.Vector3(20, 0, 0), 16000),
    createSphere(1, new THREE.Vector3(30, 0, 0), 17000),
    createSphere(1, new THREE.Vector3(40, 0, 0), 18000),
    createSphere(1, new THREE.Vector3(50, 0, 0), 19000),
    createSphere(1, new THREE.Vector3(60, 0, 0), 20000),
  ];
  spheres.forEach(planet => scene.add(planet));

  // Grid
  // const groundGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
  // const groundMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00FF00 });
  // const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  // ground.rotation.x = Math.PI / 2;
  // scene.add(ground);

  // Animation and resize
  let transitionGroup;
  const animate = (time) => {
    TWEEN.update(time);
    if (transitionGroup) transitionGroup.update(time);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  window.addEventListener('resize', () => onWindowResize(camera, renderer), false);

  // Sphere Transition
  let previousSphere = null;
  return (sphereIndex) => {
    if (transitionGroup) transitionGroup.removeAll();
    transitionGroup = new TWEEN.Group();

    const indexFactor = (pageCount - sphereIndex) / pageCount;

    const sphere = spheres[sphereIndex];
    const orbitRadius = sphere.children[0].position.x;
    const zoom = new TWEEN.Tween(camera.position, transitionGroup);
    zoom.easing(TWEEN.Easing.Quadratic.InOut);
    zoom.to({ y: (orbitRadius + 50) * indexFactor, z: orbitRadius + 50 * (sphereIndex / pageCount) }, 3000)
      .start();

    const rotate = new TWEEN.Tween(camera.rotation, transitionGroup);
    rotate.easing(TWEEN.Easing.Quadratic.InOut);
    rotate.to({ x: -Math.PI / 2 * indexFactor }, 3000)
      .start();

    sphere.children.forEach((child) => {
      const highlight = new TWEEN.Tween(child.material.color, transitionGroup);
      highlight.easing(TWEEN.Easing.Quadratic.InOut);
      highlight.to({ r: 0, g: 122 / 255, b: 1 }, 2000)
        .start();
    });

    if (previousSphere) {
      previousSphere.children.forEach((child) => {
        const highlight = new TWEEN.Tween(child.material.color);
        highlight.easing(TWEEN.Easing.Quadratic.InOut);
        highlight.to({ r: 1, g: 1, b: 1 }, 2000)
          .start();
      });
    }

    previousSphere = sphere;
  };
};

export default setup;
