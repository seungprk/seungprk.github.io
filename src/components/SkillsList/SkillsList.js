import React from 'react';
import PropTypes from 'prop-types';
import './SkillsList.css';

const SkillsList = (props) => {
  const { name, items } = props;
  return (
    <div className="skills">
      <div className="skills__title">
        {name}
      </div>
      <div>
        {items.map(text => (
          <span className="skills__item">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

SkillsList.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillsList;
