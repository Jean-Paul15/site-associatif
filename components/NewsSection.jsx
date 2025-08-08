"use client";

import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { supabase } from '../lib/supabaseClient';

const truncateDescription = (description, maxLength = 80) => {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
};

const NewsSection = ({ initialNewsItems }) => {
  const [newsItems, setNewsItems] = useState(initialNewsItems);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('news_feed')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'articles' },
        (payload) => {
          setNewsItems((currentNewsItems) => {
            if (payload.eventType === 'INSERT') {
              // Add new item if it's published
              if (payload.new.is_published) {
                // Ensure no duplicates based on ID or slug if available
                if (!currentNewsItems.some(item => item.id === payload.new.id || item.slug === payload.new.slug)) {
                  return [payload.new, ...currentNewsItems]
                    .sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
                }
              }
            } else if (payload.eventType === 'UPDATE') {
              return currentNewsItems.map((item) =>
                item.id === payload.old.id ? (payload.new.is_published ? payload.new : null) : item
              ).filter(Boolean).sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
            } else if (payload.eventType === 'DELETE') {
              return currentNewsItems.filter((item) => item.id !== payload.old.id);
            }
            return currentNewsItems;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

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
