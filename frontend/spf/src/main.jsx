import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import 'react-bootstrap/dist/react-bootstrap';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
