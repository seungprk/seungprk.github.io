import React from 'react';
import PropTypes from 'prop-types';
import './ProjectItem.css';

const ProjectItem = ({ name, link, content }) => (
  <div className="project">
    <a className="project__name" href={link} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
    <span className="project__content">
      {content}
    </span>
  </div>
);

ProjectItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ProjectItem;
