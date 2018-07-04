import React, { Component } from 'react';
import * as THREE from 'three';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 3000;
    this.scene = new THREE.Scene();

    this.renderer = new THREE.CSS3DRenderer({ canvas: this.canvas.current });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <canvas ref={this.canvas} />
      </div>
    );
  }
}

export default App;
