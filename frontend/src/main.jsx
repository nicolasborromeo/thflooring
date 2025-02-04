import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { csrfFetch, restoreCSRF } from './csrf/csrf';
import { Modal, ModalProvider } from './components/Modal/Modal';
import { PresupuestoProvider } from './context/PresupuestoContext';
import { ProductsProvider } from './context/ProductsContext';

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <ProductsProvider>
        <PresupuestoProvider>
          <App />
          <Modal />
        </PresupuestoProvider>
      </ProductsProvider>
    </ModalProvider>
  </React.StrictMode>
);
