// TuronMUN Service Worker
const CACHE_NAME = 'turonmun-v1';
const RUNTIME_CACHE = 'turonmun-runtime-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/lovable-uploads/58911c41-3ed8-4807-8789-5df7d2fff02c.png',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.open(RUNTIME_CACHE).then((cache) => {
            return fetch(event.request)
                .then((response) => {
                    // Cache successful responses
                    if (response.status === 200) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                })
                .catch(() => {
                    // Network failed, try cache
                    return caches.match(event.request).then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }

                        // Return offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match('/');
                        }

                        // Return a basic response for other requests
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
                });
        })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

async function syncData() {
    // Implement data synchronization logic here
    console.log('Syncing data...');
}

// Push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/lovable-uploads/58911c41-3ed8-4807-8789-5df7d2fff02c.png',
        badge: '/lovable-uploads/58911c41-3ed8-4807-8789-5df7d2fff02c.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View',
                icon: '/lovable-uploads/58911c41-3ed8-4807-8789-5df7d2fff02c.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/lovable-uploads/58911c41-3ed8-4807-8789-5df7d2fff02c.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('TuronMUN', options)
    );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
