import React from 'react';
import Post from '../post';

const postDetails = {
  title: 'On calendars',
  description: 'blah blah blah.',
};

const Calendars = () => <Post {...postDetails} />;

export default Calendars;