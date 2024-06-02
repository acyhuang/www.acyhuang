import React from 'react';

const Post = ({ title, tag, date, description }) => (
  <div>
    <p>{date}</p>
    <p>{description}</p>
  </div>
);

export default Post;
