import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

createRoot(container!).render(
  <StrictMode>
    <App basename={import.meta.env.BASE_URL || '/'} />
  </StrictMode>
);
