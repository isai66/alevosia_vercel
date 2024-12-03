if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),d={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-BvjgDCLV.css",revision:null},{url:"assets/index-CL0kqHfM.js",revision:null},{url:"index.html",revision:"511f320575fd55ee489a8ec421400813"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"df107d306e786433044fa5d968ab9cee"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/static/css/main.css',
    '/static/js/main.js',
    '/avisoPriv',
    '/Login',
    '/Signup',
    '/image/men',
    '/image/women',
    '/image/17357_214861709976_1517373_n.jpg',
    '/image/banner2.webp',
    '/image/banner3.webp',
    '/image/banner4.webp',
    '/image/banner5.webp',
    '/image/banners.sketch',
    '/image/banners.svg',
    '/image/banners.svg.sketch',
    '/image/collection.svg',
    '/image/divisor.png',
    '/image/GUEST_5a0281b2-2efd-45cc-9e69-f6e1b676a8f5-edit-edit.jpg',
    '/image/logo.png',
    '/image/logovicto.jpg',
    '/image/main.jpg',
    '/image/main2.jpg',
    '/image/main3.jpg',
    '/image/main4.jpg',
    '/image/main5.jpg',
    '/image/menbanner.jpg',
    '/image/nombres.txt',
    '/image/ropa1.jpg',
    '/image/ropa2.jpg',
    '/image/ropa3.jpg',
    '/image/somos.jpg',
    '/image/user.svg',
    '/image/womenbanner.jpg',
    '/image/men1.jpg',
    '/image/men2.jpg',
    '/image/men3.jpg',
    '/image/women1.jpg',
    '/image/women2.jpg',
    '/image/women3.jpg',
    '/image/women4.jpg',
    '/image/womenrojo.webp'
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

/*
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
*/
/*
self.addEventListener('fetch', event => {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    // Devuelve la respuesta en caché si existe
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    // Si no está en caché, realiza una solicitud de red y almacena el recurso
                    return fetch(event.request)
                        .then(networkResponse => {
                            return caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, networkResponse.clone());
                                    return networkResponse;
                                });
                        });
                })
        );
    } else {
        // Manejo por defecto para otras solicitudes
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => cachedResponse || fetch(event.request))
        );
    }
});
*/
