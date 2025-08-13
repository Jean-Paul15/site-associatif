"use client";

import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { supabase } from '../lib/supabaseClient';
import { logDataFreshness } from '../lib/diagnostics';

const truncateDescription = (description, maxLength = 80) => {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
};

const NewsSection = ({ initialNewsItems }) => {
  // Assurer que initialNewsItems est un tableau valide
  const validInitialNewsItems = Array.isArray(initialNewsItems) ? initialNewsItems : [];

  const [newsItems, setNewsItems] = useState(validInitialNewsItems);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);

  // Log pour débugger
  useEffect(() => {
    console.log('NewsSection initialized with:', validInitialNewsItems.length, 'items');
    logDataFreshness(validInitialNewsItems, 'NewsSection initial props');
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Système de temps réel pour TOUS les utilisateurs (pas de polling)
    const channel = supabase
      .channel('news_feed_public', {
        config: {
          presence: {
            key: 'news_updates'
          }
        }
      })
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'articles'
        },
        (payload) => {
          console.log('Changement temps réel détecté pour tous:', payload);

          // Mise à jour intelligente selon le type d'événement
          setNewsItems((currentNewsItems) => {
            if (payload.eventType === 'INSERT') {
              // Ajouter le nouvel article s'il est publié
              if (payload.new.is_published) {
                // Vérifier qu'il n'existe pas déjà
                if (!currentNewsItems.some(item => item.id === payload.new.id)) {
                  const updatedItems = [payload.new, ...currentNewsItems]
                    .sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
                  console.log('Nouvel article ajouté:', payload.new.title);
                  return updatedItems;
                }
              }
            } else if (payload.eventType === 'UPDATE') {
              // Mettre à jour l'article existant
              const updatedItems = currentNewsItems.map((item) => {
                if (item.id === payload.old.id) {
                  return payload.new.is_published ? payload.new : null;
                }
                return item;
              }).filter(Boolean).sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
              console.log('Article mis à jour:', payload.new.title);
              return updatedItems;
            } else if (payload.eventType === 'DELETE') {
              // Supprimer l'article
              const updatedItems = currentNewsItems.filter((item) => item.id !== payload.old.id);
              console.log('Article supprimé:', payload.old.id);
              return updatedItems;
            }
            return currentNewsItems;
          });
        }
      )
      .subscribe((status) => {
        console.log('Statut de l\'abonnement temps réel pour tous:', status);
        if (status === 'SUBSCRIBED') {
          console.log('✅ Temps réel activé pour tous les utilisateurs');
        } else if (status === 'CHANNEL_ERROR') {
          console.log('❌ Erreur du canal temps réel');
        }
      });

    return () => {
      console.log('Nettoyage du canal temps réel');
      supabase.removeChannel(channel);
    };
  }, []);

  // Effet pour récupérer les données si elles sont vides au montage
  useEffect(() => {
    if (newsItems.length === 0) {
      console.log('Aucune actualité trouvée, tentative de récupération...');
      const fetchFallbackNews = async () => {
        try {
          const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('is_published', true)
            .order('published_date', { ascending: false })
            .limit(6);

          if (error) {
            throw error;
          }

          if (data && data.length > 0) {
            console.log('Actualités récupérées en fallback:', data.length);
            setNewsItems(data);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des actualités en fallback:', error);
          setError('Impossible de charger les actualités pour le moment.');
        }
      };

      fetchFallbackNews();
    }
  }, [newsItems.length]);

  // Filter and limit news items based on windowWidth after any real-time updates
  const displayedNewsItems = newsItems.filter(item => item.is_published).slice(0, windowWidth >= 1024 ? 6 : 4);

  if (error) {
    return <section className="bg-white py-16 border-gray-200 text-center text-red-500">{error}</section>;
  }

  return (
    <section className="bg-white py-16 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex justify-between items-center mb-10 pt-8">
          <h2 className="text-3xl font-bold text-black text-center w-full md:text-left md:w-auto">DERNIÈRES ACTUALITÉS</h2>
          <a href="/je-m-informe" className="hidden md:block text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors">
            VOIR TOUTES LES ACTUALITÉS &gt;
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-4 md:space-y-0 max-w-5xl mx-auto">
          {displayedNewsItems.length > 0 ? (
            displayedNewsItems.map((item, index) => (
              <div
                key={item.id || index}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <ArticleCard
                  image={item.image_url}
                  date={item.published_date ? new Date(item.published_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  titre={item.title}
                  description={truncateDescription(item.short_description)}
                  link={`/je-m-informe/article/${item.slug}`}
                  slug={item.slug}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">Aucune actualité disponible pour le moment.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
