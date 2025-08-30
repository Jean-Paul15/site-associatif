// Service Worker pour optimisations avancées
const CACHE_NAME = 'site-associatif-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
    '/',
    '/qui-sommes-nous',
    '/nos-actions',
    '/je-m-informe',
    '/j-agis',
    '/manifest.json'
];

// Ressources dynamiques à mettre en cache avec stratégies
const CACHE_STRATEGIES = {
    images: {
        pattern: /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i,
        strategy: 'CacheFirst',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
        maxEntries: 100
    },
    api: {
        pattern: /\/api\//,
        strategy: 'NetworkFirst',
        maxAge: 5 * 60 * 1000, // 5 minutes
        maxEntries: 50
    },
    fonts: {
        pattern: /\.(woff|woff2|ttf|eot)$/i,
        strategy: 'CacheFirst',
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 an
        maxEntries: 20
    },
    styles: {
        pattern: /\.css$/i,
        strategy: 'StaleWhileRevalidate',
        maxAge: 24 * 60 * 60 * 1000, // 1 jour
        maxEntries: 30
    }
};

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('SW: Installation en cours...');

    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            console.log('SW: Mise en cache des ressources statiques');
            return cache.addAll(STATIC_ASSETS);
        })
    );

    self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    console.log('SW: Activation en cours...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('SW: Suppression de l\'ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignorer les requêtes non-HTTP
    if (!request.url.startsWith('http')) return;

    // Déterminer la stratégie de cache
    const strategy = determineStrategy(request.url);

    event.respondWith(
        handleRequest(request, strategy)
    );
});

// Déterminer la stratégie de cache basée sur l'URL
function determineStrategy(url) {
    for (const [type, config] of Object.entries(CACHE_STRATEGIES)) {
        if (config.pattern.test(url)) {
            return { type, ...config };
        }
    }

    // Stratégie par défaut
    return {
        type: 'default',
        strategy: 'NetworkFirst',
        maxAge: 60 * 60 * 1000, // 1 heure
        maxEntries: 50
    };
}

// Gérer les requêtes avec différentes stratégies
async function handleRequest(request, strategy) {
    const cacheName = strategy.type === 'default' ? DYNAMIC_CACHE : `${strategy.type}-cache`;

    switch (strategy.strategy) {
        case 'CacheFirst':
            return cacheFirst(request, cacheName, strategy);

        case 'NetworkFirst':
            return networkFirst(request, cacheName, strategy);

        case 'StaleWhileRevalidate':
            return staleWhileRevalidate(request, cacheName, strategy);

        default:
            return fetch(request);
    }
}

// Stratégie Cache First
async function cacheFirst(request, cacheName, strategy) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse && !isExpired(cachedResponse, strategy.maxAge)) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            // Éviter de mettre en cache les erreurs
            const responseClone = networkResponse.clone();
            await cache.put(request, responseClone);
            await cleanupCache(cache, strategy.maxEntries);
        }
        return networkResponse;
    } catch (error) {
        // Retourner la version en cache si disponible, même expirée
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Stratégie Network First
async function networkFirst(request, cacheName, strategy) {
    const cache = await caches.open(cacheName);

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            await cache.put(request, responseClone);
            await cleanupCache(cache, strategy.maxEntries);
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await cache.match(request);
        if (cachedResponse && !isExpired(cachedResponse, strategy.maxAge)) {
            return cachedResponse;
        }
        throw error;
    }
}

// Stratégie Stale While Revalidate
async function staleWhileRevalidate(request, cacheName, strategy) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    // Lancer la requête réseau en arrière-plan
    const networkResponsePromise = fetch(request).then(async (networkResponse) => {
        if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            await cache.put(request, responseClone);
            await cleanupCache(cache, strategy.maxEntries);
        }
        return networkResponse;
    });

    // Retourner immédiatement la réponse cachée si disponible
    if (cachedResponse) {
        return cachedResponse;
    }

    // Sinon attendre la réponse réseau
    return networkResponsePromise;
}

// Vérifier si une réponse en cache est expirée
function isExpired(response, maxAge) {
    const dateHeader = response.headers.get('date');
    if (!dateHeader) return false;

    const responseDate = new Date(dateHeader);
    const now = new Date();

    return (now.getTime() - responseDate.getTime()) > maxAge;
}

// Nettoyer le cache en gardant seulement les entrées les plus récentes
async function cleanupCache(cache, maxEntries) {
    if (!maxEntries) return;

    const requests = await cache.keys();
    if (requests.length > maxEntries) {
        const oldestRequests = requests.slice(0, requests.length - maxEntries);
        await Promise.all(oldestRequests.map(request => cache.delete(request)));
    }
}

// Messages du client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'CLEAR_CACHE':
                clearAllCaches().then(() => {
                    event.ports[0].postMessage({ success: true });
                });
                break;

            case 'GET_CACHE_STATUS':
                getCacheStatus().then((status) => {
                    event.ports[0].postMessage(status);
                });
                break;
        }
    }
});

// Vider tous les caches
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('SW: Tous les caches vidés');
}

// Obtenir le statut du cache
async function getCacheStatus() {
    const cacheNames = await caches.keys();
    const status = {};

    for (const name of cacheNames) {
        const cache = await caches.open(name);
        const requests = await cache.keys();
        status[name] = {
            entries: requests.length,
            urls: requests.map(req => req.url)
        };
    }

    return status;
}
