import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './componentsx/Header';
import Home from './pagesx/Home';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <Home />
  </React.StrictMode>,
);
