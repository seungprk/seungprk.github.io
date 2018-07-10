import React from 'react';
import Modal from '../Modal/Modal';
import CanvasRenderer from '../CanvasRenderer/CanvasRenderer';
import logo from './logo.svg';
import './App.css';

const MAX_PAGE = 3;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };

    this.handleKey = this.handleKey.bind(this);
  }

  handleKey(e) {
    e.preventDefault();

    let { page } = this.state;
    if (e.key === 'ArrowUp') {
      page = page >= MAX_PAGE ? MAX_PAGE : page + 1;
    } else if (e.key === 'ArrowDown') {
      page = page === 0 ? 0 : page - 1;
    }
    this.setState({ page });
  }

  render() {
    return (
      <div className="App" onKeyDown={this.handleKey} tabIndex="0">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to React
          </h1>
        </header>
        <Modal>
          Testing!
        </Modal>
        <CanvasRenderer />
      </div>
    );
  }
}

export default App;
