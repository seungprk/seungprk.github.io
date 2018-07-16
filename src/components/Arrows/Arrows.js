import React from 'react';
import PropTypes from 'prop-types';
import upIcon from './up.svg';
import downIcon from './down.svg';
import './Arrows.css';

const Arrows = ({ pageNum, max }) => {
  return (
    <div className="Arrows">
      <img className="Arrows__icon" src={upIcon} alt="Up" />
      <img className="Arrows__icon" src={downIcon} alt="Down" />
    </div>
  );
};

export default Arrows;
