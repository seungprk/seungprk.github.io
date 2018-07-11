import React from 'react';
import Modal from '../Modal/Modal';
import CanvasRenderer from '../CanvasRenderer/CanvasRenderer';
import pages from '../../pages/pages';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 0,
    };

    this.handleKey = this.handleKey.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  handleKey(e) {
    let { pageNum } = this.state;
    const max = pages.length - 1;

    if (e.key === 'ArrowDown') {
      pageNum = pageNum >= max ? max : pageNum + 1;
    } else if (e.key === 'ArrowUp') {
      pageNum = pageNum === 0 ? 0 : pageNum - 1;
    }
    this.setState({ pageNum });
  }

  render() {
    const { pageNum } = this.state;
    return (
      <div className="App">
        <Modal>
          {pages[pageNum]}
        </Modal>
        <CanvasRenderer />
      </div>
    );
  }
}

export default App;
