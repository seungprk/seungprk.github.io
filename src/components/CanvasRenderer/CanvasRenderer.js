import React from 'react';
import * as THREE from 'three';
import './CanvasRenderer.css';

class CanvasRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 3000;
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas.current });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    return (
      <canvas className="canvas-renderer" ref={this.canvas} />
    );
  }
}

export default CanvasRenderer;

