"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ArticleCard from '../../../components/ArticleCard';
import { supabase } from '../../../lib/supabaseClient';

// Composant squelette pour le chargement
const ArticleSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="bg-gray-300 h-48 w-full"></div>
        <div className="p-6">
            <div className="bg-gray-300 h-4 w-24 mb-3 rounded"></div>
            <div className="bg-gray-300 h-6 w-full mb-3 rounded"></div>
            <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        </div>
    </div>
);

// Utility function for description truncation
const truncateDescription = (description, maxLength = 80) => {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
};

const PaginatedArticlesList = ({ initialArticles, totalCount }) => {
    const [articles, setArticles] = useState(initialArticles || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [articlesPerPage, setArticlesPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);

    const router = useRouter();
    const searchParams = useSearchParams();

    // Déterminer le nombre d'articles par page selon la taille d'écran
    useEffect(() => {
        const updateArticlesPerPage = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setArticlesPerPage(3); // Mobile
            } else if (width < 1024) {
                setArticlesPerPage(6); // Tablette
            } else {
                setArticlesPerPage(9); // PC
            }
        };

        updateArticlesPerPage();
        window.addEventListener('resize', updateArticlesPerPage);

        return () => window.removeEventListener('resize', updateArticlesPerPage);
    }, []);

    // Lire la page courante depuis l'URL
    useEffect(() => {
        const pageParam = searchParams.get('page');
        if (pageParam) {
            setCurrentPage(parseInt(pageParam));
        }
    }, [searchParams]);

    // Charger les articles pour une page donnée
    const loadArticlesForPage = useCallback(async (page) => {
        setLoading(true);
        setError(null);

        try {
            const offset = (page - 1) * articlesPerPage;

            const { data, error: supabaseError } = await supabase
                .from('articles')
                .select('*')
                .eq('is_published', true)
                .order('published_date', { ascending: false })
                .range(offset, offset + articlesPerPage - 1);

            if (supabaseError) {
                throw supabaseError;
            }

            setArticles(data || []);
        } catch (err) {
            console.error('Erreur lors du chargement des articles:', err);
            setError('Erreur lors du chargement des articles.');
        } finally {
            setLoading(false);
        }
    }, [articlesPerPage]);

    // Charger les articles quand la page ou le nombre d'articles par page change
    useEffect(() => {
        loadArticlesForPage(currentPage);
    }, [currentPage, articlesPerPage, loadArticlesForPage]);

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(totalCount / articlesPerPage);

    // Navigation vers une page
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            // Scroll vers le haut de la page pour une meilleure UX
            window.scrollTo({ top: 0, behavior: 'smooth' });
            router.push(`/je-m-informe?page=${page}`, { scroll: false });
        }
    };

    // Gestion des mises à jour en temps réel
    useEffect(() => {
        const channel = supabase
            .channel('articles_updates_paginated')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'articles'
                },
                (payload) => {
                    console.log('Mise à jour des articles en temps réel:', payload);

                    // Recharger la page courante si on est sur la première page
                    if (currentPage === 1) {
                        setArticles(currentArticles => {
                            if (payload.eventType === 'INSERT' && payload.new.is_published) {
                                if (!currentArticles.some(article => article.id === payload.new.id)) {
                                    const updatedItems = [payload.new, ...currentArticles]
                                        .sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
                                        .slice(0, articlesPerPage);
                                    return updatedItems;
                                }
                            } else if (payload.eventType === 'UPDATE') {
                                return currentArticles.map(article =>
                                    article.id === payload.old.id
                                        ? (payload.new.is_published ? payload.new : null)
                                        : article
                                ).filter(Boolean);
                            } else if (payload.eventType === 'DELETE') {
                                return currentArticles.filter(article => article.id !== payload.old.id);
                            }
                            return currentArticles;
                        });
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [currentPage, articlesPerPage]);

    return (
        <div className="space-y-8">
            {/* Liste des articles */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {[...Array(articlesPerPage)].map((_, index) => (
                        <ArticleSkeleton key={`skeleton-${index}`} />
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={() => loadArticlesForPage(currentPage)}
                            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Réessayer
                        </button>
                    </div>
                </div>
            ) : articles.length === 0 ? (
                <div className="text-center py-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                        <p className="text-gray-500 text-lg">Aucune actualité disponible pour le moment.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {articles.map((article) => (
                        <div key={article.id} className="flex">
                            <ArticleCard
                                image={article.image_url}
                                date={article.published_date ? new Date(article.published_date).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : ''}
                                titre={article.title}
                                description={truncateDescription(article.short_description)}
                                link={`/je-m-informe/article/${article.slug}`}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-4">
                    {/* Bouton Précédent */}
                    {currentPage > 1 && (
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <ChevronLeft size={20} className="mr-2" /> Précédent
                        </button>
                    )}

                    {/* Numéros de page */}
                    <div className="flex space-x-2">
                        {/* Page 1 */}
                        {currentPage > 3 && (
                            <>
                                <button
                                    onClick={() => goToPage(1)}
                                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                                >
                                    1
                                </button>
                                {currentPage > 4 && <span className="px-2 py-2 text-gray-500">...</span>}
                            </>
                        )}

                        {/* Pages autour de la page courante */}
                        {[...Array(Math.min(5, totalPages))].map((_, index) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = index + 1;
                            } else if (currentPage <= 3) {
                                pageNum = index + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + index;
                            } else {
                                pageNum = currentPage - 2 + index;
                            }

                            if (pageNum < 1 || pageNum > totalPages) return null;

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => goToPage(pageNum)}
                                    className={`px-4 py-2 rounded-lg ${currentPage === pageNum
                                        ? 'bg-blue-700 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {/* Dernière page */}
                        {currentPage < totalPages - 2 && (
                            <>
                                {currentPage < totalPages - 3 && <span className="px-2 py-2 text-gray-500">...</span>}
                                <button
                                    onClick={() => goToPage(totalPages)}
                                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Bouton Suivant */}
                    {currentPage < totalPages && (
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Suivant <ChevronRight size={20} className="ml-2" />
                        </button>
                    )}
                </div>
            )}

            {/* Informations de pagination */}
            {totalCount > 0 && (
                <div className="text-center text-sm text-gray-500">
                    Page {currentPage} sur {totalPages} • {totalCount} article{totalCount > 1 ? 's' : ''} au total
                </div>
            )}
        </div>
    );
};

export default PaginatedArticlesList;
