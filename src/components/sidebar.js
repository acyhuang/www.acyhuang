import React from 'react';
import PostsList from './postsList';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="space-y-8 font-sf-mono text-sm">
    <Link to="/" className="font-gothic-a1 text-gray-200 text-6xl font-bold leading-3.3 hover:no-underline">allison huang</Link>
    {/* <div className="space-y-2">
      <p className="text-sm">is currently...</p>
      <ul className="space-y-2">
          <li>Studying an <a href="https://iovine-young.usc.edu" target="_new">integrated degree in CS, design, and business</a> at the University of Southern California </li>
          <li>Reading [something I promise]</li>
          <li>Trying to figure out the rest</li>
      </ul>
    </div> */}
    <PostsList / >
  </div>
);

export default Sidebar;