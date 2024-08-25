import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './providers/AuthProvider';
import { PageProvider } from './providers/PageProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <HelmetProvider>
      <BrowserRouter>
        <PageProvider>
          <App />
        </PageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </AuthProvider>
);
