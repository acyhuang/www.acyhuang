import React from 'react';
import PostHeader from '../postHeader';

const postDetails = {
  title: 'on Calendars',
  tag: 'design',
  date: '2024',
  description: 'this is my obsession.',
};

const Post = () => {
  return (
    <div className="text-container">
      <div className="caption">
        <PostHeader {...postDetails} />
      </div>
    </div>
  );
};
export default Post;