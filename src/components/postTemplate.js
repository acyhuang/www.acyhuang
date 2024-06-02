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
    <div className="py-16 px-12">
       <PostHeader {...postDetails} />
       <p>more custom text</p>
    </div>
  );
};
export default Post;