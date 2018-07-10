import React from 'react';
import Modal from '../Modal/Modal';
import CanvasRenderer from '../CanvasRenderer/CanvasRenderer';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">
        Welcome to React
      </h1>
    </header>
    <Modal />
    <CanvasRenderer />
  </div>
);

export default App;
