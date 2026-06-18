// Simple passthrough service worker to satisfy PWA installability requirements without breaking Vite dynamic imports or caching stale pages in development.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Directly pass through all network requests
  event.respondWith(fetch(event.request));
});
