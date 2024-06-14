import React from 'react';
import PostsList from './postsList';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="space-y-8 font-sf-mono text-sm">
    <Link to="/" className="font-gothic-a1 text-gray-200 text-6xl font-bold leading-3.3 hover:no-underline">allison huang</Link>
    <div className="space-y-2">
      <p className="text-sm">IS CURRENTLY...</p>
      <ul className="space-y-2">
          <li>STUDYING AN <a href="https://iovine-young.usc.edu" target="_new">INTEGRATED DEGREE IN DESIGN, CS, AND BUSINESS</a> AT UNIVERSITY OF SOUTHERN CALIFORNIA</li>
          <li>READING [SOMETHING I PROMISE]</li>
          <li>TRYING TO FIGURE THE REST OUT</li>
      </ul>
    </div>
    <PostsList / >
  </div>
);

export default Sidebar;