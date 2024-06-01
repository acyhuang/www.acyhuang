import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div>
    <Link to="/about"><h1>allison huang</h1></Link>
    <p>IS CURRENTLY...</p>
    <ul>
        <li>STUDYING AT USC</li>
        <li>READING ___</li>
        <li>TRYING TO FIGURE THE REST OUT</li>
    </ul>
    <Link to="/documate">Documate</Link>
    <br></br>
    <Link to="/calendars">On calendars</Link>
  </div>
);

export default Sidebar;