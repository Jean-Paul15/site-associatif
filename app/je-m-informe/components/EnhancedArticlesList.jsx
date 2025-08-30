// app/je-m-informe/components/EnhancedArticlesList.jsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ArticleCard from '../../../components/ArticleCard';
import PowerfulPagination from './PowerfulPagination';
import { supabase } from '../../../lib/supabaseClient';

// Composant squelette optimisé
const ArticleSkeleton = ({ viewMode = 'grid' }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden animate-pulse ${viewMode === 'list' ? 'flex gap-4 p-4' : ''
        }`}>
        <div className={`bg-gray-300 ${viewMode === 'list' ? 'w-32 h-24 flex-shrink-0' : 'h-48 w-full'
            }`}></div>
        <div className={viewMode === 'list' ? 'flex-1' : 'p-6'}>
            <div className="bg-gray-300 h-4 w-24 mb-3 rounded"></div>
            <div className="bg-gray-300 h-6 w-full mb-3 rounded"></div>
            <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        </div>
    </div>
);

// Fonction de troncature optimisée
const truncateDescription = (description, maxLength = 120) => {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
};

const EnhancedArticlesList = ({ initialArticles = [], totalCount = 0 }) => {
    // Fonction pour obtenir la valeur par défaut responsive
    const getResponsiveDefault = () => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            if (width < 768) return 3; // Mobile
            if (width < 1024) return 6; // Tablette par défaut
            return 9; // Desktop par défaut
        }
        return 9; // Fallback pour SSR
    };

    const [articles, setArticles] = useState(initialArticles);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(getResponsiveDefault());
    const [sortBy, setSortBy] = useState('date_desc');
    const [filters, setFilters] = useState({ date: 'all', search: '', category: '' });
    const [viewMode, setViewMode] = useState('grid');

    const router = useRouter();
    const searchParams = useSearchParams();

    // Récupération des paramètres URL
    useEffect(() => {
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || getResponsiveDefault().toString());
        const sort = searchParams.get('sort') || 'date_desc';
        const search = searchParams.get('search') || '';
        const dateFilter = searchParams.get('dateFilter') || 'all';
        const view = searchParams.get('view') || 'grid';

        setCurrentPage(page);
        setItemsPerPage(perPage);
        setSortBy(sort);
        setFilters(prev => ({ ...prev, search, date: dateFilter }));
        setViewMode(view);
    }, [searchParams]);

    // Détection responsive pour ajuster automatiquement
    useEffect(() => {
        const handleResize = () => {
            const newDefault = getResponsiveDefault();
            // Ne change que si c'est la première page et qu'aucune préférence utilisateur n'est définie
            if (currentPage === 1 && !searchParams.get('perPage')) {
                setItemsPerPage(newDefault);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentPage, searchParams]);

    // Construction de la requête avec filtres et tri
    const buildQuery = useCallback(() => {
        let query = supabase
            .from('articles')
            .select('*', { count: 'exact' })
            .eq('is_published', true);

        // Filtres de recherche
        if (filters.search) {
            query = query.or(`title.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
        }

        // Filtres de date
        if (filters.date !== 'all') {
            const now = new Date();
            let startDate;

            switch (filters.date) {
                case 'today':
                    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case 'week':
                    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'month':
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case 'quarter':
                    const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
                    startDate = new Date(now.getFullYear(), quarterMonth, 1);
                    break;
                case 'year':
                    startDate = new Date(now.getFullYear(), 0, 1);
                    break;
            }

            if (startDate) {
                query = query.gte('published_date', startDate.toISOString());
            }
        }

        // Tri
        switch (sortBy) {
            case 'date_asc':
                query = query.order('published_date', { ascending: true });
                break;
            case 'title_asc':
                query = query.order('title', { ascending: true });
                break;
            case 'title_desc':
                query = query.order('title', { ascending: false });
                break;
            default: // date_desc
                query = query.order('published_date', { ascending: false });
        }

        return query;
    }, [filters, sortBy]);

    // Chargement des articles avec pagination
    const loadArticles = useCallback(async (page = currentPage) => {
        setLoading(true);
        setError(null);

        try {
            const offset = (page - 1) * itemsPerPage;
            const query = buildQuery();

            const { data, error: supabaseError, count } = await query
                .range(offset, offset + itemsPerPage - 1);

            if (supabaseError) {
                throw supabaseError;
            }

            setArticles(data || []);

            // Mettre à jour le count total si c'est la première page ou si on a de nouveaux filtres
            if (page === 1 || count !== totalCount) {
                // Optionnel: mettre à jour le count dans le parent
            }

        } catch (err) {
            console.error('Erreur lors du chargement des articles:', err);
            setError('Erreur lors du chargement des articles. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    }, [currentPage, itemsPerPage, buildQuery, totalCount]);

    // Chargement initial et lors des changements
    useEffect(() => {
        loadArticles(currentPage);
    }, [currentPage, itemsPerPage, sortBy, filters]);

    // Gestion des changements de pagination
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset à la page 1
    }, []);

    const handleSortChange = useCallback((newSort) => {
        setSortBy(newSort);
        setCurrentPage(1); // Reset à la page 1
    }, []);

    const handleFilterChange = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setCurrentPage(1); // Reset à la page 1
    }, []);

    const handleViewModeChange = useCallback((newViewMode) => {
        setViewMode(newViewMode);
    }, []);

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // Gestion des mises à jour en temps réel
    useEffect(() => {
        const channel = supabase
            .channel('articles_updates_enhanced')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'articles'
                },
                (payload) => {
                    console.log('🔄 Mise à jour en temps réel:', payload);

                    // Recharger seulement si on est sur la première page et sans filtres
                    if (currentPage === 1 && filters.search === '' && filters.date === 'all') {
                        loadArticles(1);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [currentPage, filters, loadArticles]);

    // Rendu des articles selon le mode d'affichage
    const renderArticles = () => {
        if (loading) {
            return (
                <div className={`grid gap-6 ${viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                    }`}>
                    {[...Array(itemsPerPage)].map((_, index) => (
                        <ArticleSkeleton key={`skeleton-${index}`} viewMode={viewMode} />
                    ))}
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-12">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => loadArticles(currentPage)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Réessayer
                        </button>
                    </div>
                </div>
            );
        }

        if (articles.length === 0) {
            return (
                <div className="text-center py-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                        <p className="text-gray-500 text-lg mb-4">
                            {filters.search || filters.date !== 'all'
                                ? 'Aucun article ne correspond à vos critères de recherche.'
                                : 'Aucune actualité disponible pour le moment.'
                            }
                        </p>
                        {(filters.search || filters.date !== 'all') && (
                            <button
                                onClick={() => {
                                    setFilters({ date: 'all', search: '', category: '' });
                                    setSortBy('date_desc');
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Voir tous les articles
                            </button>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
                }`}>
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        image={article.image_url}
                        date={article.published_date ? new Date(article.published_date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : ''}
                        titre={article.title}
                        description={truncateDescription(
                            article.short_description,
                            viewMode === 'list' ? 200 : 120
                        )}
                        link={`/je-m-informe/article/${article.slug}`}
                        viewMode={viewMode}
                        className={viewMode === 'list' ? 'w-full max-w-none' : ''}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Pagination supérieure avec filtres */}
            <PowerfulPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalCount}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                onSortChange={handleSortChange}
                onFilterChange={handleFilterChange}
                onViewModeChange={handleViewModeChange}
                viewMode={viewMode}
                loading={loading}
            />

            {/* Liste des articles */}
            {renderArticles()}

            {/* Pagination inférieure (simple) */}
            {totalPages > 1 && !loading && (
                <div className="flex justify-center">
                    <PowerfulPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalCount}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        viewMode={viewMode}
                        loading={loading}
                        className="simplified" // Mode simplifié pour la pagination du bas
                    />
                </div>
            )}
        </div>
    );
};

export default EnhancedArticlesList;
