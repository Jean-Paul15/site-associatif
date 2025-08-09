import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react';
import ArticleCard from '../../components/ArticleCard'; // Corrected path
import Header from '../../components/Header';
import FooterSection from '../../components/FooterSection';
import { supabase } from '../../lib/supabaseClient';

export const metadata = {
  title: "Je m'informe - Actualités et conseils pour les personnes âgées",
  description: "Restez informé sur les actualités liées aux personnes âgées : conseils santé, droits sociaux, innovations, témoignages et actualités de notre association. Articles régulièrement mis à jour.",
  keywords: [
    "actualités personnes âgées",
    "conseils seniors",
    "informations personnes âgées",
    "droits sociaux seniors",
    "santé personnes âgées",
    "témoignages seniors",
    "blog association personnes âgées"
  ],
  openGraph: {
    title: "Je m'informe - La Maison de Charlotte",
    description: "Actualités, conseils et informations pratiques pour les personnes âgées et leurs familles.",
  },
};

const ARTICLES_PER_PAGE = 9; // Number of articles to display per page

// Utility function for description truncation (reused from NewsSection)
const truncateDescription = (description, maxLength = 80) => {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
};

const JeMInformePage = async ({ searchParams }) => {
  const currentPage = parseInt((await searchParams).page) || 1;
  const offset = (currentPage - 1) * ARTICLES_PER_PAGE;

  let articles = [];
  let totalArticlesCount = 0;
  let error = null;

  try {
    // Fetch articles for the current page
    const { data: articlesData, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_date', { ascending: false })
      .range(offset, offset + ARTICLES_PER_PAGE - 1);

    if (articlesError) {
      throw articlesError;
    }
    articles = articlesData || [];

    // Get total count of articles for pagination
    const { count, error: countError } = await supabase
      .from('articles')
      .select('count', { count: 'exact' })
      .eq('is_published', true);

    if (countError) {
      throw countError;
    }
    totalArticlesCount = count || 0;

  } catch (err) {
    console.error('Erreur lors du chargement des actualités:', err.message);
    error = 'Impossible de charger les actualités pour le moment.';
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );
  }

  const totalPages = Math.ceil(totalArticlesCount / ARTICLES_PER_PAGE);

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Actualités
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>

            {/* Bouton Accueil */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
            >
              <Home size={18} />
              <span className="font-medium">Retour à l'accueil</span>
            </Link>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez les dernières nouvelles et événements de La Maison de Charlotte.
              Restez informé de nos actions d'accompagnement des personnes âgées.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                <p className="text-gray-500 text-lg">Aucune actualité disponible pour le moment.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {articles.map(article => (
                <div key={article.id} className="flex">
                  <ArticleCard
                    image={article.image_url}
                    date={article.published_date ? new Date(article.published_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    titre={article.title}
                    description={truncateDescription(article.short_description)}
                    link={`/je-m-informe/article/${article.slug}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-4">
              {currentPage > 1 && (
                <Link
                  href={`/je-m-informe?page=${currentPage - 1}`}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <ChevronLeft size={20} className="mr-2" /> Précédent
                </Link>
              )}

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <Link
                    key={pageNum}
                    href={`/je-m-informe?page=${pageNum}`}
                    className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {pageNum}
                  </Link>
                );
              })}

              {currentPage < totalPages && (
                <Link
                  href={`/je-m-informe?page=${currentPage + 1}`}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Suivant <ChevronRight size={20} className="ml-2" />
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default JeMInformePage;