// app/je-m-informe/components/PowerfulPagination.jsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Grid,
    List,
    Search,
    Calendar,
    ArrowUpDown
} from 'lucide-react';

const PowerfulPagination = ({
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    itemsPerPage = 9,
    onPageChange,
    onItemsPerPageChange,
    onSortChange,
    onFilterChange,
    onViewModeChange,
    viewMode: initialViewMode = 'grid',
    loading = false,
    className = ""
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState(initialViewMode); // grid, list
    const [sortBy, setSortBy] = useState('date_desc');
    const [dateFilter, setDateFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    // Récupération des paramètres URL au montage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const urlSort = params.get('sort') || 'date_desc';
            const urlDateFilter = params.get('dateFilter') || 'all';
            const urlSearch = params.get('search') || '';
            const urlView = params.get('view') || initialViewMode;

            setSortBy(urlSort);
            setDateFilter(urlDateFilter);
            setSearchTerm(urlSearch);
            setViewMode(urlView);
        }
    }, [initialViewMode]);

    // Détection de la taille d'écran
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Initialisation responsive du nombre d'articles par page
    useEffect(() => {
        const handleResize = () => {
            // Sur mobile, toujours 3, pas de choix
            if (window.innerWidth < 768 && itemsPerPage !== 3) {
                onItemsPerPageChange?.(3);
            }
        };

        // Définir la valeur initiale seulement si c'est la première fois
        if (typeof window !== 'undefined' && currentPage === 1) {
            const params = new URLSearchParams(window.location.search);
            const urlPerPage = parseInt(params.get('perPage') || '0');

            // Si pas de paramètre URL, utiliser les valeurs par défaut responsives
            if (!urlPerPage) {
                const responsiveItemsPerPage = getResponsiveItemsPerPage();
                if (itemsPerPage !== responsiveItemsPerPage) {
                    onItemsPerPageChange?.(responsiveItemsPerPage);
                }
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [itemsPerPage, currentPage, onItemsPerPageChange]);

    // Options de pagination intelligente avec responsive
    const getResponsiveItemsPerPage = () => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            if (width < 768) return 3; // Mobile
            if (width < 1024) return 6; // Tablette
            return 9; // Desktop
        }
        return 9; // Fallback pour SSR
    };

    // Options disponibles selon la taille d'écran
    const getItemsPerPageOptions = () => {
        if (isMobile) return [3]; // Fixe sur mobile
        if (isTablet) return [3, 6, 9, 12]; // Options limitées sur tablette
        return [6, 9, 12, 18, 24, 36]; // Toutes les options sur PC
    };

    const itemsPerPageOptions = getItemsPerPageOptions();

    // Options de tri
    const sortOptions = [
        { value: 'date_desc', label: 'Plus récent d\'abord' },
        { value: 'date_asc', label: 'Plus ancien d\'abord' },
        { value: 'title_asc', label: 'Titre A-Z' },
        { value: 'title_desc', label: 'Titre Z-A' }
    ];

    // Options de filtre par date
    const dateFilterOptions = [
        { value: 'all', label: 'Toutes les dates' },
        { value: 'today', label: 'Aujourd\'hui' },
        { value: 'week', label: 'Cette semaine' },
        { value: 'month', label: 'Ce mois' },
        { value: 'quarter', label: 'Ce trimestre' },
        { value: 'year', label: 'Cette année' }
    ];

    // Calcul intelligent des pages à afficher
    const visiblePages = useMemo(() => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index);
    }, [currentPage, totalPages]);

    // Navigation avec keyboard
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (currentPage > 1) {
                            handlePageChange(currentPage - 1);
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (currentPage < totalPages) {
                            handlePageChange(currentPage + 1);
                        }
                        break;
                    case 'Home':
                        e.preventDefault();
                        handlePageChange(1);
                        break;
                    case 'End':
                        e.preventDefault();
                        handlePageChange(totalPages);
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentPage, totalPages]);

    const handlePageChange = useCallback((page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange?.(page);

            // Mise à jour de l'URL
            const params = new URLSearchParams(searchParams);
            params.set('page', page.toString());
            router.push(`?${params.toString()}`, { scroll: false });

            // Scroll fluide vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentPage, totalPages, onPageChange, router, searchParams]);

    const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
        if (newItemsPerPage !== itemsPerPage) {
            onItemsPerPageChange?.(newItemsPerPage);

            // Recalculer la page en gardant approximativement la même position
            const currentItem = (currentPage - 1) * itemsPerPage + 1;
            const newPage = Math.max(1, Math.ceil(currentItem / newItemsPerPage));

            const params = new URLSearchParams(searchParams);
            params.set('page', newPage.toString());
            params.set('perPage', newItemsPerPage.toString());
            router.push(`?${params.toString()}`, { scroll: false });
        }
    }, [itemsPerPage, currentPage, onItemsPerPageChange, router, searchParams]);

    const handleSortChange = useCallback((newSort) => {
        setSortBy(newSort);
        onSortChange?.(newSort);

        const params = new URLSearchParams(searchParams);
        params.set('sort', newSort);
        params.set('page', '1'); // Reset à la page 1 lors du tri
        router.push(`?${params.toString()}`, { scroll: false });
    }, [onSortChange, router, searchParams]);

    const handleDateFilterChange = useCallback((newDateFilter) => {
        setDateFilter(newDateFilter);
        onFilterChange?.({ date: newDateFilter, search: searchTerm });

        const params = new URLSearchParams(searchParams);
        params.set('dateFilter', newDateFilter);
        params.set('page', '1'); // Reset à la page 1 lors du filtrage
        router.push(`?${params.toString()}`, { scroll: false });
    }, [searchTerm, onFilterChange, router, searchParams]);

    const handleSearchChange = useCallback((newSearchTerm) => {
        setSearchTerm(newSearchTerm);
        onFilterChange?.({ date: dateFilter, search: newSearchTerm });

        const params = new URLSearchParams(searchParams);
        if (newSearchTerm) {
            params.set('search', newSearchTerm);
        } else {
            params.delete('search');
        }
        params.set('page', '1'); // Reset à la page 1 lors de la recherche
        router.push(`?${params.toString()}`, { scroll: false });
    }, [dateFilter, onFilterChange, router, searchParams]);

    // Calculs d'affichage
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Barre d'outils supérieure */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border">

                {/* Recherche et périodes */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
                    {/* Barre de recherche */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Rechercher dans les articles..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Filtre par période */}
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <select
                            value={dateFilter}
                            onChange={(e) => handleDateFilterChange(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {dateFilterOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Options d'affichage */}
                <div className="flex items-center gap-3">
                    {/* Mode d'affichage */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => {
                                setViewMode('grid');
                                onViewModeChange?.('grid');
                                const params = new URLSearchParams(searchParams);
                                params.set('view', 'grid');
                                router.push(`?${params.toString()}`, { scroll: false });
                            }}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                            title="Vue grille"
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => {
                                setViewMode('list');
                                onViewModeChange?.('list');
                                const params = new URLSearchParams(searchParams);
                                params.set('view', 'list');
                                router.push(`?${params.toString()}`, { scroll: false });
                            }}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                            title="Vue liste"
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Tri */}
                    <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Articles par page - caché sur mobile */}
                    {!isMobile && (
                        <select
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {itemsPerPageOptions.map(option => (
                                <option key={option} value={option}>
                                    {option} par page
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            {/* Informations et navigation */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* Informations */}
                <div className="text-sm text-gray-600">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            Chargement...
                        </div>
                    ) : (
                        <span>
                            Affichage {startItem}-{endItem} sur {totalItems} article{totalItems > 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                {/* Navigation */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-2">

                        {/* Première page */}
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1 || loading}
                            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            title="Première page (Ctrl+Home)"
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </button>

                        {/* Page précédente */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || loading}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            title="Page précédente (Ctrl+←)"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Précédent</span>
                        </button>

                        {/* Numéros de page */}
                        <div className="flex items-center gap-1">
                            {visiblePages.map((page, index) => (
                                page === '...' ? (
                                    <span key={`dots-${index}`} className="px-2 py-2 text-gray-400">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        disabled={loading}
                                        className={`px-3 py-2 rounded-lg transition-colors ${currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-gray-300 hover:bg-gray-50 disabled:opacity-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            ))}
                        </div>

                        {/* Page suivante */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || loading}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            title="Page suivante (Ctrl+→)"
                        >
                            <span className="hidden sm:inline">Suivant</span>
                            <ChevronRight className="h-4 w-4" />
                        </button>

                        {/* Dernière page */}
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages || loading}
                            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            title="Dernière page (Ctrl+End)"
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Navigation rapide (pour les grandes listes) */}
            {totalPages > 10 && (
                <div className="flex items-center justify-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Aller à la page :</span>
                    <input
                        type="number"
                        min="1"
                        max={totalPages}
                        placeholder={currentPage.toString()}
                        className="w-20 px-2 py-1 text-center border border-gray-300 rounded"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                const page = parseInt(e.target.value);
                                if (page >= 1 && page <= totalPages) {
                                    handlePageChange(page);
                                    e.target.value = '';
                                }
                            }
                        }}
                    />
                    <span className="text-sm text-gray-600">sur {totalPages}</span>
                </div>
            )}

            {/* Raccourcis clavier */}
            <div className="text-xs text-gray-500 text-center">
                <details className="inline">
                    <summary className="cursor-pointer hover:text-gray-700">Raccourcis clavier</summary>
                    <div className="mt-2 space-y-1">
                        <div>Ctrl + ← / → : Page précédente/suivante</div>
                        <div>Ctrl + Home / End : Première/dernière page</div>
                    </div>
                </details>
            </div>
        </div>
    );
};

export default PowerfulPagination;
