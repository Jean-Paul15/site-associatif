import React from 'react';
import Link from 'next/link';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react';
import ArticleCard from '../../components/ArticleCard'; // Corrected path
import Header from '../../components/Header';
import FooterSection from '../../components/FooterSection';
import { supabase } from '../../lib/supabaseClient';

const ARTICLES_PER_PAGE = 9; // Number of articles to display per page

// Utility function for description truncation (reused from NewsSection)
const truncateDescription = (description, maxLength = 80) => {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
};

const JeMInformePage = async ({ searchParams }) => {
  const currentPage = parseInt(searchParams.page) || 1;
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
      <main className="bg-gray-100 py-12"> 
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"> 
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"> 
            Actualités de La Maison de Charlotte
          </h1>
          
          {/* Bouton Accueil */}
          <div className="text-center mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 transition-colors hover:text-blue-700"
            >
              <Home size={16} />
              <span>Accueil</span>
            </Link>
          </div>
          
          <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in-up">
            Retrouvez ici les dernières nouvelles et les événements marquants de La Maison de Charlotte. Tenez-vous informé de nos actions, de nos rencontres et des témoignages qui font vivre notre association.
          </p>
          
          {articles.length === 0 ? (
            <p className="text-center text-gray-500 text-xl">Aucune actualité disponible pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
              {articles.map(article => (
                <ArticleCard
                  key={article.id}
                  image={article.image_url}
                  date={article.published_date ? new Date(article.published_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  titre={article.title}
                  description={truncateDescription(article.short_description)}
                  link={`/je-m-informe/article/${article.slug}`}
                  slug={article.slug}
                />
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