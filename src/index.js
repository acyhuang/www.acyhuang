import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/pages/home';
import DynamicPostRouter from './components/DynamicPostRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/*" element={<DynamicPostRouter />} />
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
