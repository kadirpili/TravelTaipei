import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Register VitePWA Service Worker with fallback to offline-sw.js
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  const fallbackSwUrl = `${import.meta.env.BASE_URL}offline-sw.js`;
  try {
    registerSW({
      immediate: true,
      onRegisteredSW(_swUrl, registration) {
        if (!registration) {
          navigator.serviceWorker.register(fallbackSwUrl).catch(() => {});
        }
      },
      onRegisterError() {
        navigator.serviceWorker.register(fallbackSwUrl).catch(() => {});
      },
    });
  } catch {
    navigator.serviceWorker.register(fallbackSwUrl).catch(() => {});
  }
}

createRoot(document.getElementById('root')!).render(<App />);
