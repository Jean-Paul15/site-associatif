// components/PerformanceOptimizer.jsx
"use client";
import { useEffect } from 'react';

const PerformanceOptimizer = ({ children }) => {
    useEffect(() => {
        // 1. Preload des ressources critiques
        const preloadCriticalResources = () => {
            // DNS Prefetch pour les domaines externes
            const prefetchDomains = [
                'https://images.unsplash.com',
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com'
            ];

            prefetchDomains.forEach(domain => {
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = domain;
                document.head.appendChild(link);
            });

            // Preload des fonts critiques
            const fontPreload = document.createElement('link');
            fontPreload.rel = 'preload';
            fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
            fontPreload.as = 'style';
            fontPreload.onload = function () { this.onload = null; this.rel = 'stylesheet'; };
            document.head.appendChild(fontPreload);
        };

        // 2. Optimisation des images lazy loading
        const optimizeImages = () => {
            // Intersection Observer pour les images critiques
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observer toutes les images avec data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        };

        // 3. Optimisation du cache browser
        const optimizeCache = () => {
            // Service Worker pour cache avancé
            if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            }
        };

        // 4. Optimisation du scroll
        const optimizeScroll = () => {
            let ticking = false;

            const handleScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        // Code d'optimisation du scroll ici
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', handleScroll, { passive: true });

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        };

        // 5. Réduction des reflows/repaints
        const optimizeLayout = () => {
            // Batching des DOM reads/writes
            const reads = [];
            const writes = [];

            let scheduled = false;

            const runTasks = () => {
                scheduled = false;

                // Execute all reads first
                reads.forEach(task => task());
                reads.length = 0;

                // Then all writes
                writes.forEach(task => task());
                writes.length = 0;
            };

            window.batchDOMTask = (readTask, writeTask) => {
                if (readTask) reads.push(readTask);
                if (writeTask) writes.push(writeTask);

                if (!scheduled) {
                    scheduled = true;
                    requestAnimationFrame(runTasks);
                }
            };
        };

        // 6. Optimisation de la mémoire
        const optimizeMemory = () => {
            // Nettoyage automatique des event listeners
            const cleanup = [];

            window.addOptimizedListener = (element, event, handler, options = {}) => {
                const optimizedHandler = (e) => {
                    if (options.throttle) {
                        if (!handler.lastCall || Date.now() - handler.lastCall > options.throttle) {
                            handler(e);
                            handler.lastCall = Date.now();
                        }
                    } else if (options.debounce) {
                        clearTimeout(handler.timeout);
                        handler.timeout = setTimeout(() => handler(e), options.debounce);
                    } else {
                        handler(e);
                    }
                };

                element.addEventListener(event, optimizedHandler, { passive: true, ...options });
                cleanup.push(() => element.removeEventListener(event, optimizedHandler));
            };

            // Nettoyage au unmount
            return () => {
                cleanup.forEach(fn => fn());
            };
        };

        // 7. Monitoring des performances
        const monitorPerformance = () => {
            if (typeof window !== 'undefined' && window.performance) {
                // Core Web Vitals
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        if (entry.entryType === 'largest-contentful-paint') {
                            console.log('LCP:', entry.startTime);
                        }
                        if (entry.entryType === 'first-input') {
                            console.log('FID:', entry.processingStart - entry.startTime);
                        }
                        if (entry.entryType === 'layout-shift') {
                            if (!entry.hadRecentInput) {
                                console.log('CLS:', entry.value);
                            }
                        }
                    });
                });

                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
            }
        };

        // Exécution des optimisations
        const cleanup = [];

        // Délai pour éviter de bloquer le rendu initial
        const timer = setTimeout(() => {
            preloadCriticalResources();
            optimizeImages();
            optimizeCache();
            cleanup.push(optimizeScroll());
            optimizeLayout();
            cleanup.push(optimizeMemory());

            if (process.env.NODE_ENV === 'development') {
                monitorPerformance();
            }
        }, 100);

        // Nettoyage
        return () => {
            clearTimeout(timer);
            cleanup.forEach(fn => fn && fn());
        };
    }, []);

    return children;
};

export default PerformanceOptimizer;
