import React from 'react';
import PropTypes from 'prop-types';
import upIcon from './up.svg';
import downIcon from './down.svg';
import './Arrows.css';

const Arrows = ({ pageNum, max }) => {
  let upClass = 'Arrows__icon';
  if (pageNum === 0) upClass += ' Arrows__icon--hidden';
  let downClass = 'Arrows__icon';
  if (pageNum === max) downClass += ' Arrows__icon--hidden';

  return (
    <div className="Arrows">
      <img className={upClass} src={upIcon} alt="Up" />
      <img className={downClass} src={downIcon} alt="Down" />
    </div>
  );
};

Arrows.propTypes = {
  pageNum: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default Arrows;
