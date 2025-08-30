// hooks/usePreloadCriticalResources.js
import { useEffect } from 'react';

const usePreloadCriticalResources = () => {
    useEffect(() => {
        // 1. Preload des pages critiques
        const preloadPages = () => {
            const criticalPages = [
                '/qui-sommes-nous',
                '/nos-actions',
                '/je-m-informe'
            ];

            criticalPages.forEach(page => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = page;
                document.head.appendChild(link);
            });
        };

        // 2. Preload des images critiques above-the-fold
        const preloadCriticalImages = () => {
            const criticalImages = [
                'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            ];

            criticalImages.forEach(imageSrc => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = imageSrc;
                document.head.appendChild(link);
            });
        };

        // 3. Optimisation des polices
        const optimizeFonts = () => {
            // Preload de la police principale
            const fontLink = document.createElement('link');
            fontLink.rel = 'preload';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
            fontLink.as = 'style';
            fontLink.crossOrigin = 'anonymous';
            document.head.appendChild(fontLink);

            // Load asynchrone pour éviter le blocage
            setTimeout(() => {
                fontLink.rel = 'stylesheet';
            }, 0);
        };

        // 4. Optimisation du DNS
        const optimizeDNS = () => {
            const domains = [
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com',
                'https://images.unsplash.com'
            ];

            domains.forEach(domain => {
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = domain;
                document.head.appendChild(link);
            });
        };

        // 5. Preconnect pour les domaines critiques
        const preconnectCriticalDomains = () => {
            const criticalDomains = [
                'https://fonts.gstatic.com',
                'https://images.unsplash.com'
            ];

            criticalDomains.forEach(domain => {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = domain;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
        };

        // 6. Resource hints pour les API
        const optimizeAPIConnections = () => {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            if (supabaseUrl) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = supabaseUrl;
                document.head.appendChild(link);
            }
        };

        // 7. Optimisation du cache browser
        const optimizeBrowserCache = () => {
            // Définir des en-têtes de cache via meta tags
            const cacheMetaTags = [
                { 'http-equiv': 'Cache-Control', content: 'public, max-age=31536000, immutable' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
            ];

            cacheMetaTags.forEach(tag => {
                const meta = document.createElement('meta');
                Object.keys(tag).forEach(key => {
                    meta.setAttribute(key, tag[key]);
                });
                document.head.appendChild(meta);
            });
        };

        // 8. Optimisation du viewport pour mobile
        const optimizeViewport = () => {
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            if (viewportMeta) {
                viewportMeta.setAttribute('content',
                    'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5'
                );
            }
        };

        // 9. Préchargement conditionnel basé sur la connexion
        const conditionalPreloading = () => {
            if ('connection' in navigator) {
                const connection = navigator.connection;

                // Réduire le préchargement sur connexions lentes
                if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                    console.log('Connexion lente détectée, préchargement réduit');
                    return;
                }

                // Préchargement complet sur bonnes connexions
                if (connection.effectiveType === '4g') {
                    preloadPages();
                    preloadCriticalImages();
                }
            } else {
                // Préchargement par défaut si pas d'info sur la connexion
                preloadPages();
            }
        };

        // 10. Performance Observer pour monitoring
        const setupPerformanceMonitoring = () => {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();

                    entries.forEach((entry) => {
                        // Log des métriques critiques en développement
                        if (process.env.NODE_ENV === 'development') {
                            if (entry.entryType === 'largest-contentful-paint') {
                                console.log(`LCP: ${Math.round(entry.startTime)}ms`);
                            }
                            if (entry.entryType === 'first-input') {
                                console.log(`FID: ${Math.round(entry.processingStart - entry.startTime)}ms`);
                            }
                            if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                                console.log(`CLS: ${entry.value.toFixed(4)}`);
                            }
                        }
                    });
                });

                try {
                    observer.observe({
                        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']
                    });
                } catch (e) {
                    console.warn('Performance Observer not fully supported');
                }

                // Cleanup
                return () => observer.disconnect();
            }
        };

        // Exécution des optimisations avec timing approprié
        const optimizationTimer = setTimeout(() => {
            optimizeDNS();
            preconnectCriticalDomains();
            optimizeFonts();
            optimizeAPIConnections();
            optimizeBrowserCache();
            optimizeViewport();

            // Préchargement après un délai pour éviter de ralentir le rendu initial
            setTimeout(() => {
                conditionalPreloading();
            }, 500);

            // Monitoring en dernier
            const cleanupMonitoring = setupPerformanceMonitoring();

            return cleanupMonitoring;
        }, 100);

        // Cleanup
        return () => {
            clearTimeout(optimizationTimer);
        };
    }, []);
};

export default usePreloadCriticalResources;
