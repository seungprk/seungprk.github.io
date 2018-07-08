import * as THREE from 'three';

const createSphere = (radius, pos) => {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.copy(pos);

  return sphere;
};

const orbit = (sphere, radius, angle) => {
  sphere.position.x = Math.cos(angle) * radius;
  sphere.position.y = Math.sin(angle) * radius;
};

const setup = (canvas) => {
  this.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  this.camera.position.z = 100;
  this.scene = new THREE.Scene();

  this.renderer = new THREE.WebGLRenderer({ canvas });
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  const sun = createSphere(5, new THREE.Vector3(0, 0, 0));
  const planet1 = createSphere(1, new THREE.Vector3(15, 0, 0));
  const planet2 = createSphere(1, new THREE.Vector3(25, 0, 0));
  const planet3 = createSphere(1, new THREE.Vector3(35, 0, 0));
  this.scene.add(sun);
  this.scene.add(planet1);
  this.scene.add(planet2);
  this.scene.add(planet3);

  let angle = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    this.renderer.render(this.scene, this.camera);
    orbit(planet1, 15, angle);
    orbit(planet2, 25, angle);
    orbit(planet3, 35, angle);
    angle += Math.PI / 360;
  };
  animate();
};

export default setup;
