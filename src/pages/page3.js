import React from 'react';
import ProjectItem from '../components/ProjectItem/ProjectItem';

const projects = [
  {
    name: 'CryptoCharts',
    content: 'Dashboard for Cryptocurrencies (React + Redux)',
    link: 'https://github.com/seungprk/crypto-charts',
  },
  {
    name: 'Dashing Dynamics',
    content: 'Infinite runner/platformer game on iOS App Store',
    link: 'https://itunes.apple.com/us/app/dashing-dynamics/id1253316480',
  },
];

export default (
  <div>
    <h1>
      projects
    </h1>
    {projects.map(project => (
      <ProjectItem
        name={project.name}
        link={project.link}
        content={project.content}
      />
    ))}
  </div>
);
