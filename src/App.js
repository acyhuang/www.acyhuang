import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from './logo.svg';
import Sidebar from './components/sidebar';
// import './App.css';


function App() {
  return (
    <div className="bg-gray-950 text-gray-100 h-screen">
      <div className="inline md:flex h-screen">
        <div className="max-w-full md:max-w-sm px-12 py-16 border-r border-0 border-gray-700">
          <Sidebar />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
