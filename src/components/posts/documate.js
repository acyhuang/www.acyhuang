import React from 'react';
import Post from '../post';

const postDetails = {
  title: 'Documate',
  description: 'This is the description for Project 1.',
};

const Documate = () => <Post {...postDetails} />;

export default Documate;