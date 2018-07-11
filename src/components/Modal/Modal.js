import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ children }) => (
  <div className="Modal">
    <div className="Modal__box">
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
