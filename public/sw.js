// Service Worker para caché inteligente
const CACHE_VERSION = 'v1.0.2';
const CACHE_NAME = `edicion-aular-${CACHE_VERSION}`;

const STATIC_ASSETS = [
    '/css/config.css',
    '/css/style.css',
    '/css/libs.css',
    '/css/responsive.css',
    '/js/lib/jquery.min.js',
    '/img/Edicion-Aular-Logo.svg'
];

// Install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch - Network First, fallback to Cache
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip external requests
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== self.location.origin) return;
    // Private editorial/authentication responses must never enter the offline cache.
    if (/^\/(?:admin(?:\/|$)|api(?:\/|$)|\.netlify(?:\/|$))/.test(requestUrl.pathname)) return;
    if (event.request.headers.has('authorization')) return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Clone response before caching
                const responseClone = response.clone();
                
                // Cache successful responses
                if (response.status === 200 && !/private|no-store/i.test(response.headers.get('cache-control') || '')) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                
                return response;
            })
            .catch(() => {
                // Fallback to cache
                return caches.match(event.request);
            })
    );
});
