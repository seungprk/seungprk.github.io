import React from 'react';
import SkillsList from '../components/SkillsList/SkillsList';

const skills = [
  {
    name: 'lang',
    items: ['javascript', 'swift', 'c/c++', 'python', 'c#', 'HTML/CSS'],
  },
  {
    name: 'tech',
    items: [
      'react',
      'redux',
      'three.js',
      'backbone',
      'angular',
      'node',
      'express',
      'mongoDB',
      'postgreSQL',
      'mySQL',
      'docker',
      'AWS',
      'webpack',
      'jest',
      'iOS',
    ],
  },
];

export default (
  <div>
    <h1>
      skills
    </h1>
    {skills.map(skill => <SkillsList name={skill.name} items={skill.items} />)}
  </div>
);
