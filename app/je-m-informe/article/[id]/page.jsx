import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
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
                    className="w-3/5 h-8 sm:h-10 lg:h-12 object-cover rounded-lg shadow-md mb-6"
                  />
                )}
                {article.published_date && (
                  <p className="text-gray-500 text-sm sm:text-base mb-4">
                    Publié le: {new Date(article.published_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </header>

              <div className="article-content prose prose-sm sm:prose lg:prose-lg max-w-none prose-headings:text-blue-700 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-em:text-gray-600 prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:mb-1">
                {/* Display the full content of the article using Markdown */}
                {article.content && (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      // Composants personnalisés pour un meilleur rendu
                      h1: ({ children }) => <h1 className="text-2xl font-bold text-blue-700 mb-4 mt-6">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-bold text-blue-600 mb-3 mt-5">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-semibold text-emerald-600 mb-2 mt-4">{children}</h3>,
                      p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                      strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                      em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-emerald-500 bg-emerald-50 pl-4 py-2 my-4 italic text-emerald-800">
                          {children}
                        </blockquote>
                      ),
                      ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      code: ({ inline, children }) => inline
                        ? <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm">{children}</code>
                        : <code className="block bg-gray-100 p-3 rounded text-sm overflow-x-auto">{children}</code>
                    }}
                  >
                    {article.content}
                  </ReactMarkdown>
                )}
                {/* Fallback to description if content is not available */}
                {!article.content && article.description && (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {article.description}
                  </ReactMarkdown>
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
