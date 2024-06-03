import React from 'react';
import PostHeader from '../postHeader';

const postDetails = {
  title: '',
  tag: '',
  date: '',
  description: '',
};

const Post = () => {
  return (
    <div className="text-container">
      <div>
        <PostHeader {...postDetails} />
      </div>
    </div>
  );
};
export default Post;