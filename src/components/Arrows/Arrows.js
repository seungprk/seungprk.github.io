import React from 'react';
import PropTypes from 'prop-types';
import upIcon from './up.svg';
import downIcon from './down.svg';
import './Arrows.css';

const Arrows = ({
  pageNum,
  max,
  handlePageDown,
  handlePageUp,
}) => {
  let upClass = 'Arrows__icon';
  let upTabIndex = 0;
  if (pageNum === 0) {
    upClass += ' Arrows__icon--hidden';
    upTabIndex = -1;
  }

  let downClass = 'Arrows__icon';
  let downTabIndex = 0;
  if (pageNum === max) {
    downClass += ' Arrows__icon--hidden';
    downTabIndex = -1;
  }

  const handleKeyForPageUp = (e) => {
    if (e.key === 'Enter') handlePageUp();
  };
  const handleKeyForPageDown = (e) => {
    if (e.key === 'Enter') handlePageDown();
  };

  return (
    <div className="Arrows">
      <div
        className="Arrows__icon-wrapper"
        onClick={handlePageUp}
        role="button"
        onKeyDown={handleKeyForPageUp}
        tabIndex={upTabIndex}
      >
        <img className={upClass} src={upIcon} alt="Up" />
      </div>
      <div
        className="Arrows__icon-wrapper"
        onClick={handlePageDown}
        role="button"
        onKeyDown={handleKeyForPageDown}
        tabIndex={downTabIndex}
      >
        <img className={downClass} src={downIcon} alt="Down" />
      </div>
    </div>
  );
};

Arrows.propTypes = {
  pageNum: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  handlePageDown: PropTypes.func.isRequired,
  handlePageUp: PropTypes.func.isRequired,
};

export default Arrows;
