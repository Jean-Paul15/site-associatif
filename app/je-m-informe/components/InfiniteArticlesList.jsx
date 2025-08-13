"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ArticleCard from '../../../components/ArticleCard';
import { supabase } from '../../../lib/supabaseClient';

const ARTICLES_PER_LOAD = 6;

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

const InfiniteArticlesList = ({ initialArticles, totalCount }) => {
    const [articles, setArticles] = useState(initialArticles || []);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(totalCount > ARTICLES_PER_LOAD);
    const [error, setError] = useState(null);
    const observerRef = useRef();
    const lastArticleRef = useRef();

    // Fonction pour charger plus d'articles
    const loadMoreArticles = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        setError(null);

        try {
            const { data, error: supabaseError } = await supabase
                .from('articles')
                .select('*')
                .eq('is_published', true)
                .order('published_date', { ascending: false })
                .range(articles.length, articles.length + ARTICLES_PER_LOAD - 1);

            if (supabaseError) {
                throw supabaseError;
            }

            const newArticles = data || [];

            if (newArticles.length === 0 || newArticles.length < ARTICLES_PER_LOAD) {
                setHasMore(false);
            }

            setArticles(prevArticles => {
                // Éviter les doublons
                const existingIds = new Set(prevArticles.map(article => article.id));
                const uniqueNewArticles = newArticles.filter(article => !existingIds.has(article.id));
                return [...prevArticles, ...uniqueNewArticles];
            });

        } catch (err) {
            console.error('Erreur lors du chargement des articles:', err);
            setError('Erreur lors du chargement des articles supplémentaires.');
        } finally {
            setLoading(false);
        }
    }, [articles.length, hasMore, loading]);

    // Observer pour l'infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMoreArticles();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        observerRef.current = observer;

        if (lastArticleRef.current) {
            observer.observe(lastArticleRef.current);
        }

        return () => observer.disconnect();
    }, [loadMoreArticles, hasMore, loading]);

    // Mise à jour de l'observer quand le dernier article change
    useEffect(() => {
        if (lastArticleRef.current && observerRef.current) {
            observerRef.current.observe(lastArticleRef.current);
        }
    }, [articles.length]);

    // Gestion des mises à jour en temps réel
    useEffect(() => {
        const channel = supabase
            .channel('articles_updates')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'articles'
                },
                (payload) => {
                    console.log('Mise à jour des articles en temps réel:', payload);

                    setArticles(currentArticles => {
                        if (payload.eventType === 'INSERT' && payload.new.is_published) {
                            // Ajouter le nouvel article au début
                            if (!currentArticles.some(article => article.id === payload.new.id)) {
                                return [payload.new, ...currentArticles];
                            }
                        } else if (payload.eventType === 'UPDATE') {
                            // Mettre à jour l'article existant
                            return currentArticles.map(article =>
                                article.id === payload.old.id
                                    ? (payload.new.is_published ? payload.new : null)
                                    : article
                            ).filter(Boolean);
                        } else if (payload.eventType === 'DELETE') {
                            // Supprimer l'article
                            return currentArticles.filter(article => article.id !== payload.old.id);
                        }
                        return currentArticles;
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="space-y-8">
            {/* Liste des articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {articles.map((article, index) => (
                    <div
                        key={article.id}
                        ref={index === articles.length - 1 ? lastArticleRef : null}
                        className="flex"
                    >
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

            {/* État de chargement */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {[...Array(3)].map((_, index) => (
                        <ArticleSkeleton key={`skeleton-${index}`} />
                    ))}
                </div>
            )}

            {/* Message d'erreur */}
            {error && (
                <div className="text-center py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={loadMoreArticles}
                            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Réessayer
                        </button>
                    </div>
                </div>
            )}

            {/* Message de fin */}
            {!hasMore && articles.length > 0 && (
                <div className="text-center py-8">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                        <p className="text-gray-600 font-medium">
                            🎉 Vous avez vu tous les articles !
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            {articles.length} article{articles.length > 1 ? 's' : ''} au total
                        </p>
                    </div>
                </div>
            )}

            {/* Pas d'articles */}
            {articles.length === 0 && !loading && (
                <div className="text-center py-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                        <p className="text-gray-500 text-lg">Aucune actualité disponible pour le moment.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfiniteArticlesList;
