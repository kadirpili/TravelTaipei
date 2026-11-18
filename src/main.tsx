import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import 'leaflet/dist/leaflet.css';
import App from './App.tsx';
import './index.css';

// Clean up any stale or opaque-cached map tile caches from older service workers
if (typeof window !== 'undefined' && 'caches' in window) {
  window.caches
    .keys()
    .then((keys) => {
      keys.forEach((key) => {
        if (
          key.includes('osm-tiles') ||
          key.includes('leaflet-assets') ||
          key.includes('stadia')
        ) {
          window.caches.delete(key).catch(() => {});
        }
      });
    })
    .catch(() => {});
}

// Register VitePWA Service Worker with fallback to offline-sw.js
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  const fallbackSwUrl = `${import.meta.env.BASE_URL}offline-sw.js`;
  try {
    registerSW({
      immediate: true,
      onRegisteredSW(_swUrl, registration) {
        if (registration) {
          registration.update().catch(() => {});
        } else {
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
