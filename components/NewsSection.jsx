"use client";

import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { supabase } from '../lib/supabaseClient';

const truncateDescription = (description, maxLength = 80) => {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
};

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const limit = windowWidth >= 1024 ? 6 : 4; // 6 for full HD (>=1024px), 4 for small screens
        const { data, error: supabaseError } = await supabase
          .from('articles')
          .select('*')
          .eq('is_published', true)
          .order('published_date', { ascending: false })
          .limit(limit);

        if (supabaseError) {
          throw supabaseError;
        }
        setNewsItems(data);
      } catch (err) {
        console.error('Erreur lors du chargement des actualités:', err.message);
        setError('Impossible de charger les actualités pour le moment.');
      }
    };

    if (windowWidth > 0) { // Only fetch once windowWidth is initialized
      fetchNews();
    }
  }, [windowWidth]); // Re-fetch when windowWidth changes

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
          {newsItems.length > 0 ? (
            newsItems.map((item, index) => (
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
