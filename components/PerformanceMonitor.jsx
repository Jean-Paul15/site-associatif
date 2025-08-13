// components/PerformanceMonitor.jsx
"use client";

import { useEffect } from 'react';

const PerformanceMonitor = ({ pageName = 'Unknown' }) => {
    useEffect(() => {
        // Mesurer les performances uniquement en développement ou avec un flag
        const shouldMonitor = process.env.NODE_ENV === 'development' ||
            typeof window !== 'undefined' && window.location.search.includes('debug=performance');

        if (!shouldMonitor) return;

        const measurePerformance = () => {
            try {
                // Web Vitals basiques
                const navigation = performance.getEntriesByType('navigation')[0];
                const paint = performance.getEntriesByType('paint');

                const metrics = {
                    page: pageName,
                    timestamp: new Date().toISOString(),
                    // Temps de chargement
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                    // Temps de réponse serveur
                    serverResponse: navigation.responseEnd - navigation.requestStart,
                    // First Paint et First Contentful Paint
                    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
                    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
                    // Temps total depuis le début de navigation
                    totalTime: navigation.loadEventEnd - navigation.fetchStart,
                };

                console.group(`📊 Performance Metrics - ${pageName}`);
                console.log('🎯 Total Load Time:', `${metrics.totalTime.toFixed(2)}ms`);
                console.log('🖼️ First Paint:', `${metrics.firstPaint.toFixed(2)}ms`);
                console.log('🎨 First Contentful Paint:', `${metrics.firstContentfulPaint.toFixed(2)}ms`);
                console.log('⚡ Server Response Time:', `${metrics.serverResponse.toFixed(2)}ms`);
                console.log('📄 DOM Content Loaded:', `${metrics.domContentLoaded.toFixed(2)}ms`);
                console.log('✅ Load Complete:', `${metrics.loadComplete.toFixed(2)}ms`);

                // Évaluation de la performance
                const evaluation = evaluatePerformance(metrics);
                console.log('🏆 Performance Score:', evaluation.score, evaluation.message);
                console.groupEnd();

                // Stocker les métriques pour analyse
                if (typeof window !== 'undefined') {
                    const allMetrics = JSON.parse(sessionStorage.getItem('performanceMetrics') || '[]');
                    allMetrics.push(metrics);
                    sessionStorage.setItem('performanceMetrics', JSON.stringify(allMetrics.slice(-10))); // Garder les 10 dernières
                }

            } catch (error) {
                console.warn('Performance monitoring failed:', error);
            }
        };

        // Attendre que la page soit complètement chargée
        if (document.readyState === 'complete') {
            setTimeout(measurePerformance, 100);
        } else {
            window.addEventListener('load', () => setTimeout(measurePerformance, 100));
        }

        // Surveiller les changements de route (pour SPA)
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log(`🔄 Navigation to ${entry.name}: ${entry.duration.toFixed(2)}ms`);
                }
            }
        });

        observer.observe({ entryTypes: ['navigation'] });

        return () => {
            observer.disconnect();
        };
    }, [pageName]);

    // Le composant ne rend rien visuellement
    return null;
};

// Fonction d'évaluation de la performance
const evaluatePerformance = (metrics) => {
    const { totalTime, firstContentfulPaint, serverResponse } = metrics;

    let score = 100;
    let issues = [];

    // Pénalités pour temps de chargement
    if (totalTime > 3000) {
        score -= 30;
        issues.push('Temps de chargement total > 3s');
    } else if (totalTime > 1500) {
        score -= 15;
        issues.push('Temps de chargement total > 1.5s');
    }

    // Pénalités pour First Contentful Paint
    if (firstContentfulPaint > 1800) {
        score -= 25;
        issues.push('First Contentful Paint > 1.8s');
    } else if (firstContentfulPaint > 1000) {
        score -= 10;
        issues.push('First Contentful Paint > 1s');
    }

    // Pénalités pour temps de réponse serveur
    if (serverResponse > 600) {
        score -= 20;
        issues.push('Temps de réponse serveur > 600ms');
    } else if (serverResponse > 300) {
        score -= 10;
        issues.push('Temps de réponse serveur > 300ms');
    }

    // Message d'évaluation
    let message = '';
    if (score >= 90) {
        message = '🚀 Excellent!';
    } else if (score >= 75) {
        message = '✅ Bon';
    } else if (score >= 60) {
        message = '⚠️ Moyen';
    } else {
        message = '🐌 Needs improvement';
    }

    if (issues.length > 0) {
        message += ` (${issues.join(', ')})`;
    }

    return { score, message, issues };
};

export default PerformanceMonitor;
