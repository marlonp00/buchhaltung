import React from 'react';
import './index.css';
import App from './App';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { ClientProvider } from './context/ClientContext';



const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
          <ClientProvider>

    <App />
    </ClientProvider>

  </StrictMode>,
);

