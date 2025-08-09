import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../../components/Header';
import FooterSection from '../../../../components/FooterSection';
import { supabase } from '../../../../lib/supabaseClient';

const ArticlePage = async ({ params }) => {
  const { id: slug } = await params; // Rename id to slug for clarity

  let article = null;
  let error = null;

  try {
    const { data, error: supabaseError } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug) // Query by slug
      .single(); // Expect a single result

    if (supabaseError) {
      throw supabaseError;
    }
    article = data;
  } catch (err) {
    console.error('Erreur lors du chargement de l\'article:', err.message);
    error = 'Impossible de charger l\'article pour le moment.';
  }

  if (error || !article) {
    return (
      <div className="article-container flex items-center justify-center h-screen" style={{ padding: '20px', textAlign: 'center' }}>
        <p className="text-red-500 text-lg">{error || 'Article non trouvé.'}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="article-page-main bg-gray-50 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link href="/je-m-informe" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6 sm:mb-8 text-sm sm:text-base font-medium">
            <ArrowLeft size={20} className="mr-2" />
            Retour aux actualités
          </Link>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-12">
              <header className="article-header mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight break-words hyphens-auto">
                  {article.title}
                </h1>
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg shadow-md mb-6"
                  />
                )}
                {article.published_date && (
                  <p className="text-gray-500 text-sm sm:text-base mb-4">
                    Publié le: {new Date(article.published_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </header>

              <div className="article-content prose prose-sm sm:prose lg:prose-lg max-w-none">
                {/* Display the full content of the article with responsive text */}
                {article.content && (
                  <div
                    className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg break-words overflow-wrap-anywhere"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto'
                    }}
                  />
                )}
                {/* Fallback to description if content is not available */}
                {!article.content && article.description && (
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-6 break-words overflow-wrap-anywhere"
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto'
                    }}>
                    {article.description}
                  </p>
                )}
              </div>
            </div>
          </article>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default ArticlePage;
