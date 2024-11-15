import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

// Precargar y almacenar en caché los archivos especificados
precacheAndRoute(self.__WB_MANIFEST);

// Limpiar cachés obsoletos
cleanupOutdatedCaches();

// Estrategia de caché para activos estáticos (imágenes, CSS, JS)
registerRoute(
  ({ request }) => request.destination === 'image' || request.destination === 'script' || request.destination === 'style',
  new CacheFirst({
    cacheName: 'static-assets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);

// Estrategia de caché para documentos HTML
registerRoute(
  ({ request }) => request.destination === 'document',
  new StaleWhileRevalidate({
    cacheName: 'html-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
      }),
    ],
  })
);

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
