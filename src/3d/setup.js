import * as THREE from 'three';

const setup = (canvas) => {
  this.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  this.camera.position.z = 5;
  this.scene = new THREE.Scene();

  this.renderer = new THREE.WebGLRenderer({ canvas });
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.SphereGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cube = new THREE.Mesh(geometry, material);
  this.scene.add(cube);

  const animate = () => {
    requestAnimationFrame(animate);
    this.renderer.render(this.scene, this.camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  };
  animate();
};

export default setup;
