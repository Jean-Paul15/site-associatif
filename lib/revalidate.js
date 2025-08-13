// lib/revalidate.js
// Utilitaire pour forcer la revalidation en production

export async function revalidateNewsData() {
    if (typeof window === 'undefined') {
        // Côté serveur
        console.log('Revalidating news data server-side...');
        return true;
    } else {
        // Côté client - forcer un rechargement des données
        console.log('Revalidating news data client-side...');
        // Pas de cache dans le fetch
        return fetch('/api/revalidate-news', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
            },
        }).catch(console.error);
    }
}

// Helper pour vérifier la fraîcheur des données
export function isDataStale(timestamp, maxAgeSeconds = 300) {
    if (!timestamp) return true;
    const now = Date.now();
    const dataAge = (now - new Date(timestamp).getTime()) / 1000;
    return dataAge > maxAgeSeconds;
}
