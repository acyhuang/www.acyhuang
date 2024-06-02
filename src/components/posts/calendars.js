import React from 'react';
import PostHeader from '../postHeader';

const postDetails = {
  title: 'On calendars',
  tag: 'design',
  description: 'blah blah blah.',
};

const Calendars = () => <PostHeader {...postDetails} />;

export default Calendars;