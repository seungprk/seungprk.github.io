import React from 'react';

const projects = [
  {
    name: 'Test Project 1',
    content: 'lorem ipsum...',
  },
  {
    name: 'Test Project 1',
    content: 'lorem ipsum...',
  },
];

export default (
  <div>
    <h1>
      projects
    </h1>
    {projects.map(project => (
      <div>
        <h5>
          {project.name}
        </h5>
        <p>
          {project.content}
        </p>
      </div>
    ))}
  </div>
);
