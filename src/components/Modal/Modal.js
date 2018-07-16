import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import pages from '../../pages/pages';
import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ hidden: false }), 3000);
  }

  componentDidUpdate(prevProps) {
    const { pageNum } = this.props;
    if (prevProps.pageNum !== pageNum) {
      this.setState({ hidden: true }, () => {
        findDOMNode(this).offsetHeight
        setTimeout(() => this.setState({ hidden: false }), 3000);
      });
    }
  }

  render() {
    const { pageNum } = this.props;
    const { hidden } = this.state;
    const boxClass = hidden ? 'Modal__box Modal__box--hidden' : 'Modal__box Modal__box--transition';

    return (
      <div className="Modal">
        <div className={boxClass}>
          {pages[pageNum]}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  pageNum: PropTypes.number.isRequired,
};

export default Modal;
