import React from 'react';
import setup from '../../3d/setup';
import './CanvasRenderer.css';

class CanvasRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    setup(this.canvas.current);
  }

  render() {
    return (
      <canvas className="canvas-renderer" ref={this.canvas} />
    );
  }
}

export default CanvasRenderer;
