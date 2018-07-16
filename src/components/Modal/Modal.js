import React from 'react';
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

  render() {
    const { pageNum } = this.props;
    const { hidden } = this.state;
    let boxClass = 'Modal__box';
    boxClass += hidden ? ' Modal__box--hidden' : '';

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
