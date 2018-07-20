import React from 'react';
import ProjectItem from '../components/ProjectItem/ProjectItem';

const projects = [
  {
    name: 'CryptoCharts',
    content: 'Dashboard for Cryptocurrencies (React + Redux)',
    link: 'http://54.241.138.152',
  },
  {
    name: 'Dashing Dynamics',
    content: 'Infinite runner/platformer game on iOS App Store',
    link: 'https://itunes.apple.com/us/app/dashing-dynamics/id1253316480',
  },
  {
    name: 'Aug Notes',
    content: 'Mindmaps and notes in 3D (React + Three.js)',
    link: 'https://github.com/seungprk/aug-notes',
  },
  {
    name: 'Crunchly - Proxy Server',
    content: 'Proxy server aggregating UI modules for company data listing web app',
    link: 'https://github.com/crunchly/Proxy-Server-DP',
  },
  {
    name: 'Crunchly - Chart Module',
    content: 'Chart UI module for company data listing web app',
    link: 'https://github.com/crunchly/Chart-Module',
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
