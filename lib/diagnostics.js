// lib/diagnostics.js
// Utilitaires de diagnostic pour les problèmes de cache

export function logEnvironmentInfo() {
    const info = {
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
        isServer: typeof window === 'undefined',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
    };

    console.log('Environment Info:', info);
    return info;
}

export function logDataFreshness(data, source = 'unknown') {
    const freshness = {
        source,
        dataCount: Array.isArray(data) ? data.length : data ? 1 : 0,
        timestamp: new Date().toISOString(),
        sampleData: Array.isArray(data) && data.length > 0 ? {
            firstItemId: data[0]?.id,
            firstItemTitle: data[0]?.title?.substring(0, 50),
            firstItemDate: data[0]?.published_date,
        } : null,
    };

    console.log('Data Freshness:', freshness);
    return freshness;
}

export function createCacheBuster() {
    return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}
