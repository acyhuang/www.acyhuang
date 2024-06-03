import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './index.css';
import './tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Home from './components/pages/home';
// import postRoutes from './routes'; // for dynamic routing

import Documate from './components/posts/documate';
import Calendars from './components/posts/calendars';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="documate" element={<Documate />} />
            <Route path="calendars" element={<Calendars />} />
            {/* {postRoutes} */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
