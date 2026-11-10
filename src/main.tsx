import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error handler to catch browser extension injected errors (e.g., MetaMask inpage scripts)
if (typeof window !== 'undefined') {
  const isExtensionError = (err: any) => {
    const str = String(err?.message || err?.reason || err?.stack || err || '');
    return (
      str.includes('MetaMask') ||
      str.includes('inpage.js') ||
      str.includes('chrome-extension://') ||
      str.includes('Failed to connect') ||
      str.includes('ethereum')
    );
  };

  window.onunhandledrejection = (event) => {
    if (isExtensionError(event.reason)) {
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
  };

  window.addEventListener('unhandledrejection', (event) => {
    if (isExtensionError(event.reason)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  window.addEventListener('error', (event) => {
    if (isExtensionError(event.error) || isExtensionError(event.message) || isExtensionError(event.filename)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
}

createRoot(document.getElementById('root')!).render(<App />);
