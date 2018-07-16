import React from 'react';
import setup from '../../3d/setup';
import './CanvasRenderer.css';

class CanvasRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.transition = setup(this.canvas.current);
    this.transition(0);
  }

  componentDidUpdate() {
    this.transition(this.props.pageNum);
  }

  render() {
    return (
      <canvas className="canvas-renderer" ref={this.canvas} />
    );
  }
}

export default CanvasRenderer;
