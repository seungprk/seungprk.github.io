import React from 'react';
import * as THREE from 'three';
import './CanvasRenderer.css';

class CanvasRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas.current });
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
  }

  render() {
    return (
      <canvas className="canvas-renderer" ref={this.canvas} />
    );
  }
}

export default CanvasRenderer;
