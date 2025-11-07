import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

// DEV ONLY - Setup test user for local development
if (import.meta.env.DEV) {
  import('./utils/testUserSetup').then(({ setupTestUser }) => {
    setupTestUser();

    // Render app after test user is setup
    createRoot(container!).render(
      <StrictMode>
        <App basename={import.meta.env.BASE_URL || '/'} />
      </StrictMode>
    );
  });
} else {
  createRoot(container!).render(
    <StrictMode>
      <App basename={import.meta.env.BASE_URL || '/'} />
    </StrictMode>
  );
}
