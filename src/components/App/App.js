import React from 'react';
import Modal from '../Modal/Modal';
import CanvasRenderer from '../CanvasRenderer/CanvasRenderer';
import Arrows from '../Arrows/Arrows';
import pages from '../../pages/pages';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 0,
      begTouch: {
        x: 0,
        y: 0,
        timeStamp: 0,
      },
    };

    this.handleKey = this.handleKey.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  movePageDown() {
    const { pageNum } = this.state;
    const max = pages.length - 1;
    if (pageNum < max) {
      this.setState({ pageNum: pageNum + 1 });
    }
  }

  movePageUp() {
    const { pageNum } = this.state;
    if (pageNum > 0) {
      this.setState({ pageNum: pageNum - 1 });
    }
  }

  handleKey(e) {
    if (e.key === 'ArrowDown') this.movePageDown();
    else if (e.key === 'ArrowUp') this.movePageUp();
  }

  handleTouchStart(e) {
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    this.setState({
      begTouch: {
        x,
        y,
        timeStamp: Date.now(),
      },
    });
  }

  handleTouchEnd(e) {
    const { begTouch } = this.state;
    const { y, timeStamp } = begTouch;
    if (Date.now() - timeStamp > 1000) return;

    const endY = e.changedTouches[0].clientY;
    if (y - endY > 20) this.movePageDown();
    else if (y - endY < -20) this.movePageUp();
  }

  render() {
    const { pageNum } = this.state;
    return (
      <div
        className="App"
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        <Modal pageNum={pageNum} />
        <CanvasRenderer pageNum={pageNum} />
        <Arrows pageNum={pageNum} max={pages.length - 1} />
      </div>
    );
  }
}

export default App;
