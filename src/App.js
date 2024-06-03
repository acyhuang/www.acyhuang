import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from './logo.svg';
import Sidebar from './components/sidebar';
// import './App.css';


function App() {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen md:fixed md:top-0 md:left-0 md:right-0 md:bottom-0 md:h-screen">
      <div className="flex flex-col md:flex-row h-full">
        <div className="max-w-full md:max-w-sm px-4 pt-8 pb-4 sm:px-12 sm:pt-16 border-r border-0 border-gray-700 md:h-screen md:overflow-hidden">
          <Sidebar />
        </div>
        <div className="flex-1 min-h-screen md:h-full md:overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>


  );
}

export default App;
