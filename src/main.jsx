import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// App entry point.
// - StrictMode surfaces potential problems in development.
// - BrowserRouter enables client-side routing (Phase 2+ will add routes such
//   as a 404 page); the portfolio itself is a single-page scroll experience.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
