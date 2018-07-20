/* eslint no-param-reassign: 0 */
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import PARTICLES from './particleSystem';

const initialCamPos = new THREE.Vector3(0, 100, 100);

const createSphere = (radius, pos, tilt, orbitDuration, scene) => {
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

  const trail = PARTICLES.createTrail(sphere);
  scene.add(trail);

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
    createSphere(5, new THREE.Vector3(0, 0, 0), 0, 0, scene),
    createSphere(1, new THREE.Vector3(15, 0, 0), Math.PI / 32, 5000, scene),
    createSphere(1, new THREE.Vector3(20, 0, 0), Math.PI / 32, 6000, scene),
    createSphere(1, new THREE.Vector3(25, 0, 0), -Math.PI / 32, 7000, scene),
    createSphere(1, new THREE.Vector3(30, 0, 0), -Math.PI / 32, 8000, scene),
    createSphere(1, new THREE.Vector3(35, 0, 0), 0, 9000, scene),
    createSphere(1, new THREE.Vector3(40, 0, 0), Math.PI / 32, 10000, scene),
  ];
  spheres.forEach(planet => scene.add(planet));

  // Animation and resize
  let setCameraPos;
  let transitionGroup;
  const animate = (time) => {
    TWEEN.update(time);
    if (transitionGroup) transitionGroup.update(time);
    if (setCameraPos) setCameraPos();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  window.addEventListener('resize', () => onWindowResize(camera, renderer), false);

  // Sphere Transition
  return (sphereIndex) => {
    setCameraPos = null;
    if (transitionGroup) transitionGroup.removeAll();

    const sphere = spheres[sphereIndex];
    const sphereWorldVector = new THREE.Vector3();

    transitionGroup = new TWEEN.Group();

    const followZoom = new TWEEN.Tween(camera.position, transitionGroup);
    followZoom.easing(TWEEN.Easing.Quadratic.InOut);
    followZoom.to(sphereWorldVector, 2000)
      .onUpdate(() => {
        sphere.children[0].getWorldPosition(sphereWorldVector);
        sphereWorldVector.z += 50;
        sphereWorldVector.y += 50;
      })
      .onComplete(() => {
        setCameraPos = () => {
          sphere.children[0].getWorldPosition(sphereWorldVector);
          sphereWorldVector.z += 50;
          sphereWorldVector.y += 50;
          camera.position.copy(sphereWorldVector);
        };
      });

    const showOverview = new TWEEN.Tween(camera.position, transitionGroup);
    showOverview.easing(TWEEN.Easing.Quadratic.InOut);
    showOverview.to(initialCamPos, 1000)
      .chain(followZoom)
      .start();
  };
};

export default setup;
