import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../../components/Header';
import FooterSection from '../../../../components/FooterSection';
import { supabase } from '../../../../lib/supabaseClient';

const ArticlePage = async ({ params }) => {
  const { id: slug } = params; // Rename id to slug for clarity

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
      <main className="article-page-main" style={{ padding: '40px 0', background: '#f9fafb' }}>
        <div className="container mx-auto px-4 py-8" style={{ maxWidth: '900px' }}>
          <Link href="/je-m-informe" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8" style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>
            <ArrowLeft size={20} className="mr-2" />
            Retour aux actualités
          </Link>

          <div className="article-header">
            <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1f2937' }}>{article.title}</h1>
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md mb-8"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            )}
            {article.published_date && (
                <p className="text-gray-500 text-sm mb-4">
                    Publié le: {new Date(article.published_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            )}
          </div>
          
          <div className="article-content text-gray-700 leading-relaxed" style={{ fontSize: '1.1rem' }}>
            {/* Display the full content of the article */}
            {article.content && (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            )}
            {/* Fallback to description if content is not available */}
            {!article.content && article.description && (
              <p style={{ marginBottom: '20px' }}>
                {article.description}
              </p>
            )}
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default ArticlePage;
