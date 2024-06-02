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
       <p>This was a project completed in USC’s premier product incubator, Lavalab, where we conceived, built, and pitched Documate over eight weeks. This was my first time building a product from 0 to 1, and the process gave me the chance to wear several different hats with the goal of building something that users love.</p>
       <h1>Problem: Hardware documentation is really hard to read.</h1>
       <p></p>
    </div>
  );
};
export default Documate;