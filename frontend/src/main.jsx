import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { csrfFetch, restoreCSRF } from './csrf/csrf';

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
