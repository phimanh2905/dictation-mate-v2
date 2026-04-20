import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PracticeSettingsProvider } from './contexts/PracticeSettingsContext';
import { PracticeActionsProvider } from './contexts/PracticeActionsContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PracticeSettingsProvider>
      <PracticeActionsProvider>
        <App />
      </PracticeActionsProvider>
    </PracticeSettingsProvider>
  </StrictMode>,
);
