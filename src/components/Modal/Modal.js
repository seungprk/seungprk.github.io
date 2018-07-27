import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import pages from '../../pages/pages';
import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      currPage: 0,
    };
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => this.setState({ hidden: false }), 3000);
  }

  componentDidUpdate(prevProps) {
    const { pageNum } = this.props;
    if (prevProps.pageNum !== pageNum) {
      this.setState({ hidden: true }, () => {
        clearTimeout(this.timeoutId);
        findDOMNode(this).offsetHeight;
        this.timeoutId = setTimeout(() => this.setState({
          hidden: false,
          currPage: pageNum,
        }), 3000);
      });
    }
  }

  render() {
    const { hidden, currPage } = this.state;
    const boxClass = hidden ? 'Modal__box Modal__box--hidden' : 'Modal__box';

    return (
      <div className="Modal">
        <div className={boxClass}>
          {pages[currPage]}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  pageNum: PropTypes.number.isRequired,
};

export default Modal;
