// lib/cache.js
// Système de cache simple côté client pour optimiser les performances

class SimpleCache {
    constructor(defaultTTL = 300000) { // 5 minutes par défaut
        this.cache = new Map();
        this.defaultTTL = defaultTTL;
    }

    set(key, value, ttl = this.defaultTTL) {
        const expiresAt = Date.now() + ttl;
        this.cache.set(key, {
            value,
            expiresAt
        });
    }

    get(key) {
        const item = this.cache.get(key);

        if (!item) {
            return null;
        }

        if (Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    has(key) {
        return this.get(key) !== null;
    }

    delete(key) {
        return this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
    }

    size() {
        return this.cache.size;
    }

    // Nettoyer les entrées expirées
    cleanup() {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now > item.expiresAt) {
                this.cache.delete(key);
            }
        }
    }
}

// Instance globale du cache
const articleCache = typeof window !== 'undefined' ? new SimpleCache() : null;

// Nettoyer le cache toutes les minutes
if (typeof window !== 'undefined') {
    setInterval(() => {
        articleCache?.cleanup();
    }, 60000);
}

export default articleCache;

// Fonctions utilitaires pour le cache
export const cacheArticles = (key, articles, ttl) => {
    if (articleCache) {
        articleCache.set(key, articles, ttl);
    }
};

export const getCachedArticles = (key) => {
    return articleCache ? articleCache.get(key) : null;
};

export const clearArticleCache = () => {
    if (articleCache) {
        articleCache.clear();
    }
};

// Hook pour utiliser le cache avec React
export const useArticleCache = () => {
    return {
        cache: articleCache,
        set: cacheArticles,
        get: getCachedArticles,
        clear: clearArticleCache
    };
};
