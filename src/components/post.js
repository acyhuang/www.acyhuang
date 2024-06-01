import React from 'react';

const Post = ({ title, description }) => (
  <div className="post">
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);

export default Post;
