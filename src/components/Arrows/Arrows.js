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
  let upClass = 'Arrows Arrows--top';
  let upImgClass = 'Arrows__img';
  let upTabIndex = 0;
  if (pageNum === 0) {
    upClass += ' Arrows--hidden';
    upImgClass += ' Arrows--hidden';
    upTabIndex = -1;
  }

  let downClass = 'Arrows Arrows--bot';
  let downImgClass = 'Arrows__img';
  let downTabIndex = 0;
  if (pageNum === max) {
    downClass += ' Arrows--hidden';
    downImgClass += ' Arrows--hidden';
    downTabIndex = -1;
  }

  const handleKeyForPageUp = (e) => {
    if (e.key === 'Enter') handlePageUp();
  };
  const handleKeyForPageDown = (e) => {
    if (e.key === 'Enter') handlePageDown();
  };

  return (
    <div>
      <div
        className={upClass}
        onClick={handlePageUp}
        role="button"
        onKeyDown={handleKeyForPageUp}
        tabIndex={upTabIndex}
      >
        <img className={upImgClass} src={upIcon} alt="Up" />
      </div>
      <div
        className={downClass}
        onClick={handlePageDown}
        role="button"
        onKeyDown={handleKeyForPageDown}
        tabIndex={downTabIndex}
      >
        <img className={downImgClass} src={downIcon} alt="Down" />
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
