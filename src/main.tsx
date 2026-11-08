import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Register VitePWA Service Worker with fallback to /offline-sw.js
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  try {
    registerSW({
      immediate: true,
      onRegisteredSW(_swUrl, registration) {
        if (!registration) {
          navigator.serviceWorker.register('/offline-sw.js').catch(() => {});
        }
      },
      onRegisterError() {
        navigator.serviceWorker.register('/offline-sw.js').catch(() => {});
      },
    });
  } catch {
    navigator.serviceWorker.register('/offline-sw.js').catch(() => {});
  }
}

createRoot(document.getElementById('root')!).render(<App />);
