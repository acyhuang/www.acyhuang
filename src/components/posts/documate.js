import React from 'react';
import PostHeader from '../postHeader';

const postDetails = {
  title: 'Documate',
  tag: 'design',
  date: '2023',
  description: 'This is the description for Project 1.',
};

const Documate = () => {
  return (
    <div className="py-16 px-12">
       <PostHeader {...postDetails} />
       <p>more custom text</p>
    </div>
  );
};
export default Documate;