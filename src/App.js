import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from './logo.svg';
import Sidebar from './components/sidebar';
import './App.css';


function App() {
  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
    
  );
}

export default App;
