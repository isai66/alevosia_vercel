/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/static/css/main.css',
    '/static/js/main.js',
    '/avisoPriv',
    '/Login',
    '/Signup'
    // Agrega más archivos que desees almacenar en caché
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return Promise.all(
                    urlsToCache.map((url) => {
                        return cache.add(url).catch((error) => {
                            console.error('Failed to cache', url, error);
                        });
                    })
                );
            })
    );
    console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    console.log('[Service Worker] Activating Service Worker ....', event);
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
