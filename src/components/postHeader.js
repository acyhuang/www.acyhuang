import React from 'react';

const Post = ({ title, tag, date, description }) => (
  <div>
    <p className="caption"> TIMELINE: {date}</p>
    <p className="caption">{description}</p>
  </div>
);

export default Post;
