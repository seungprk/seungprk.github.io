import React from 'react';
import PropTypes from 'prop-types';
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

  componentDidUpdate(prevProps) {
    const { pageNum } = this.props;
    if (prevProps.pageNum !== pageNum) {
      // this.transition(pageNum);
    }
  }

  render() {
    return (
      <canvas className="canvas-renderer" ref={this.canvas} />
    );
  }
}

CanvasRenderer.propTypes = {
  pageNum: PropTypes.number.isRequired,
};

export default CanvasRenderer;
