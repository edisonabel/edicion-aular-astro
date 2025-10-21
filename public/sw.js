// Service Worker para caché agresivo y mobile-first
const CACHE_VERSION = 'v1.1.0';
const CACHE_NAME = `edicion-aular-${CACHE_VERSION}`;
const IMAGE_CACHE = `edicion-aular-images-${CACHE_VERSION}`;
const FONT_CACHE = `edicion-aular-fonts-${CACHE_VERSION}`;

// Cache durations (1 year for immutable assets)
const CACHE_MAX_AGE = 365 * 24 * 60 * 60; // 1 año en segundos

const STATIC_ASSETS = [
    '/css/config.css',
    '/css/style.css',
    '/css/libs.css',
    '/css/responsive.css',
    '/js/lib/jquery.min.js',
    '/img/Edicion-Aular-Logo.svg',
    '/manifest.json'
];

// Install - Precache assets críticos
self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)),
            caches.open(IMAGE_CACHE),
            caches.open(FONT_CACHE)
        ]).then(() => self.skipWaiting())
    );
});

// Activate - Limpiar caches antiguas
self.addEventListener('activate', (event) => {
    const currentCaches = [CACHE_NAME, IMAGE_CACHE, FONT_CACHE];
    event.waitUntil(
        caches.keys()
            .then(keys => keys.filter(key => !currentCaches.includes(key)))
            .then(oldCaches => Promise.all(oldCaches.map(cache => caches.delete(cache))))
            .then(() => self.clients.claim())
    );
});

// Fetch - Estrategias por tipo de recurso
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET y external requests
    if (request.method !== 'GET' || url.origin !== location.origin) return;

    // Strategy 1: Cache-first para imágenes (mobile-friendly)
    if (request.destination === 'image' || /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)) {
        event.respondWith(
            caches.match(request).then(cached => {
                if (cached) return cached;
                
                return fetch(request).then(response => {
                    if (response.status === 200) {
                        const clone = response.clone();
                        caches.open(IMAGE_CACHE).then(cache => cache.put(request, clone));
                    }
                    return response;
                }).catch(() => cached || new Response('Image not available', { status: 404 }));
            })
        );
        return;
    }

    // Strategy 2: Cache-first para fuentes
    if (request.destination === 'font' || /\.(woff|woff2|ttf|eot)$/i.test(url.pathname)) {
        event.respondWith(
            caches.match(request).then(cached => {
                if (cached) return cached;
                
                return fetch(request).then(response => {
                    if (response.status === 200) {
                        const clone = response.clone();
                        caches.open(FONT_CACHE).then(cache => cache.put(request, clone));
                    }
                    return response;
                });
            })
        );
        return;
    }

    // Strategy 3: Stale-while-revalidate para CSS/JS
    if (request.destination === 'style' || request.destination === 'script' || 
        /\.(css|js)$/i.test(url.pathname)) {
        event.respondWith(
            caches.match(request).then(cached => {
                const fetchPromise = fetch(request).then(response => {
                    if (response.status === 200) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                    }
                    return response;
                }).catch(() => cached);

                return cached || fetchPromise;
            })
        );
        return;
    }

    // Strategy 4: Network-first para HTML (siempre fresco, fallback a cache)
    event.respondWith(
        fetch(request)
            .then(response => {
                if (response.status === 200 && request.destination === 'document') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                }
                return response;
            })
            .catch(() => caches.match(request))
    );
});
