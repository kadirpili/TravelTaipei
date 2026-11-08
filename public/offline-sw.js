const CACHE_VERSION = 'taipei-wayfinder-sw-v2';
const DATA_CACHE = 'taipei-places-data-cache';
const TILE_CACHE = 'taipei-osm-tiles-cache';
const BASE_PATH = new URL('./', self.location.href).pathname;

const CORE_ASSETS = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}icon.svg`,
  `${BASE_PATH}apple-touch-icon.png`,
  `${BASE_PATH}pwa-192x192.png`,
  `${BASE_PATH}pwa-512x512.png`,
  `${BASE_PATH}pwa-maskable-512x512.png`,
  `${BASE_PATH}places-offline-cache.json`,
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch(() => {
        // Ignore individual asset failures during install
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key !== CACHE_VERSION && key !== DATA_CACHE && key !== TILE_CACHE
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Place data JSON: Stale-While-Revalidate
  if (url.pathname.endsWith('/places-offline-cache.json')) {
    event.respondWith(
      caches.open(DATA_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || networkPromise;
      })
    );
    return;
  }

  // 2. OpenStreetMap Tiles & Fonts & Leaflet CSS: Cache-First
  if (
    url.hostname === 'tile.openstreetmap.org' ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com' ||
    url.hostname === 'unpkg.com'
  ) {
    event.respondWith(
      caches.open(TILE_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          if (response && (response.status === 200 || response.type === 'opaque')) {
            cache.put(request, response.clone());
          }
          return response;
        } catch {
          return new Response('', { status: 408, statusText: 'Offline tile unavailable' });
        }
      })
    );
    return;
  }

  // 3. Same-origin app shell & module scripts: Network-First falling back to Cache
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(async (cache) => {
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        } catch {
          const cached = await cache.match(request);
          if (cached) return cached;
          if (request.mode === 'navigate') {
            const indexCached = await cache.match(`${BASE_PATH}index.html`) || await cache.match(BASE_PATH);
            if (indexCached) return indexCached;
          }
          return new Response('Offline', { status: 503 });
        }
      })
    );
  }
});
