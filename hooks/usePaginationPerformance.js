// hooks/usePaginationPerformance.js
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

const usePaginationPerformance = ({
    initialPage = 1,
    initialItemsPerPage = 9,
    totalItems = 0,
    onDataLoad,
    cacheTimeout = 5 * 60 * 1000, // 5 minutes
}) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cache pour éviter les rechargements inutiles
    const cacheRef = useRef(new Map());
    const lastRequestRef = useRef(null);

    // Calculs mémorisés
    const totalPages = useMemo(() =>
        Math.ceil(totalItems / itemsPerPage),
        [totalItems, itemsPerPage]
    );

    const startItem = useMemo(() =>
        (currentPage - 1) * itemsPerPage + 1,
        [currentPage, itemsPerPage]
    );

    const endItem = useMemo(() =>
        Math.min(currentPage * itemsPerPage, totalItems),
        [currentPage, itemsPerPage, totalItems]
    );

    // Fonction pour générer une clé de cache
    const getCacheKey = useCallback((page, perPage, filters = {}) => {
        const filterString = Object.entries(filters)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}:${value}`)
            .join('|');
        return `${page}-${perPage}-${filterString}`;
    }, []);

    // Fonction pour vérifier si les données sont en cache et valides
    const getCachedData = useCallback((cacheKey) => {
        const cached = cacheRef.current.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < cacheTimeout) {
            return cached.data;
        }
        return null;
    }, [cacheTimeout]);

    // Fonction pour mettre en cache les données
    const setCachedData = useCallback((cacheKey, data) => {
        cacheRef.current.set(cacheKey, {
            data,
            timestamp: Date.now()
        });

        // Nettoyer le cache si trop d'entrées
        if (cacheRef.current.size > 50) {
            const entries = Array.from(cacheRef.current.entries());
            // Supprimer les plus anciennes
            entries
                .sort(([, a], [, b]) => a.timestamp - b.timestamp)
                .slice(0, 10)
                .forEach(([key]) => cacheRef.current.delete(key));
        }
    }, []);

    // Fonction de chargement avec cache et debouncing
    const loadData = useCallback(async (page, perPage, filters = {}) => {
        const cacheKey = getCacheKey(page, perPage, filters);

        // Vérifier le cache d'abord
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
            console.log('📦 Données récupérées depuis le cache');
            return cachedData;
        }

        // Annuler la requête précédente si elle existe
        if (lastRequestRef.current) {
            lastRequestRef.current.abort();
        }

        // Créer une nouvelle requête
        const controller = new AbortController();
        lastRequestRef.current = controller;

        setLoading(true);
        setError(null);

        try {
            const data = await onDataLoad?.({
                page,
                itemsPerPage: perPage,
                filters,
                signal: controller.signal
            });

            // Mettre en cache uniquement si la requête n'a pas été annulée
            if (!controller.signal.aborted) {
                setCachedData(cacheKey, data);
                return data;
            }
        } catch (err) {
            if (!controller.signal.aborted) {
                console.error('Erreur lors du chargement:', err);
                setError('Erreur lors du chargement des données');
            }
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
                lastRequestRef.current = null;
            }
        }
    }, [getCacheKey, getCachedData, setCachedData, onDataLoad]);

    // Navigation avec optimisations
    const goToPage = useCallback((page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);

            // Précharger les pages adjacentes en arrière-plan
            setTimeout(() => {
                if (page > 1) {
                    loadData(page - 1, itemsPerPage);
                }
                if (page < totalPages) {
                    loadData(page + 1, itemsPerPage);
                }
            }, 100);
        }
    }, [currentPage, totalPages, itemsPerPage, loadData]);

    // Changement du nombre d'éléments par page
    const changeItemsPerPage = useCallback((newItemsPerPage) => {
        if (newItemsPerPage !== itemsPerPage) {
            setItemsPerPage(newItemsPerPage);

            // Calculer la nouvelle page pour garder approximativement la même position
            const currentItem = (currentPage - 1) * itemsPerPage + 1;
            const newPage = Math.max(1, Math.ceil(currentItem / newItemsPerPage));
            setCurrentPage(newPage);
        }
    }, [currentPage, itemsPerPage]);

    // Navigation par touches clavier
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (currentPage > 1) {
                            goToPage(currentPage - 1);
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (currentPage < totalPages) {
                            goToPage(currentPage + 1);
                        }
                        break;
                    case 'Home':
                        e.preventDefault();
                        goToPage(1);
                        break;
                    case 'End':
                        e.preventDefault();
                        goToPage(totalPages);
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentPage, totalPages, goToPage]);

    // Préchargement intelligent
    useEffect(() => {
        const preloadAdjacentPages = () => {
            const pagesToPreload = [];

            // Précharger la page suivante et précédente
            if (currentPage > 1) pagesToPreload.push(currentPage - 1);
            if (currentPage < totalPages) pagesToPreload.push(currentPage + 1);

            // Précharger avec un délai pour ne pas surcharger
            pagesToPreload.forEach((page, index) => {
                setTimeout(() => {
                    loadData(page, itemsPerPage);
                }, (index + 1) * 200);
            });
        };

        // Précharger uniquement si on n'est pas en train de charger
        if (!loading) {
            const timer = setTimeout(preloadAdjacentPages, 1000);
            return () => clearTimeout(timer);
        }
    }, [currentPage, totalPages, itemsPerPage, loading, loadData]);

    // Nettoyage à la déconnexion
    useEffect(() => {
        return () => {
            if (lastRequestRef.current) {
                lastRequestRef.current.abort();
            }
        };
    }, []);

    // Statistiques de performance
    const performanceStats = useMemo(() => ({
        cacheSize: cacheRef.current.size,
        cacheHitRate: cacheRef.current.size > 0 ?
            Array.from(cacheRef.current.values())
                .filter(item => Date.now() - item.timestamp < cacheTimeout).length / cacheRef.current.size
            : 0,
        totalPages,
        currentPage,
        itemsPerPage,
        startItem,
        endItem
    }), [cacheTimeout, totalPages, currentPage, itemsPerPage, startItem, endItem]);

    return {
        // État
        currentPage,
        itemsPerPage,
        totalPages,
        loading,
        error,
        startItem,
        endItem,

        // Actions
        goToPage,
        changeItemsPerPage,
        loadData,

        // Méthodes utilitaires
        clearCache: useCallback(() => {
            cacheRef.current.clear();
        }, []),

        // Statistiques
        performanceStats
    };
};

export default usePaginationPerformance;
