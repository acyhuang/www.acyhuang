import React from 'react';
import PostsList from './postsList';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="space-y-8 font-sf-mono text-sm">
    <Link to="/about" className="font-gothic-a1 text-gray-200 text-6xl font-bold leading-3.3">allison huang</Link>
    <div className="text-gray-400">
      <p>IS CURRENTLY</p>
      <ul className="list-disc list-inside">
          <li>STUDYING AN INTEGRATED DESIGN, CS, AND BUSINESS DEGREE AT UNIVERSITY OF SOUTHERN CALIFORNIA</li>
          <li>READING ___</li>
          <li>TRYING TO FIGURE THE REST OUT...</li>
      </ul>
    </div>
    <PostsList / >
  </div>
);

export default Sidebar;