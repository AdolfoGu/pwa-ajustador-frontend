// Versión del cache
const CACHE_NAME = 'pwa-ajustador-v1';

// Archivos para cachear
const assetsToCache = [
  '/',
  '/index.html',
  '/app.js',
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',
  'https://cdn.socket.io/4.7.2/socket.io.min.js'
];

// Instalación (cachear recursos)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => cachedResponse || fetch(event.request))
  );
});
