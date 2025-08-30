import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';
import Header from '../../components/Header';
import FooterSection from '../../components/FooterSection';
import EnhancedArticlesList from './components/EnhancedArticlesList';
import PerformanceMonitor from '../../components/PerformanceMonitor';
import { getInitialArticles, getTotalArticlesCount } from '../../lib/getArticles';

// Configuration pour optimiser les performances
export const revalidate = 180; // Revalider toutes les 3 minutes (plus fréquent pour la pagination dynamique)
export const dynamic = 'force-dynamic';

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

// Composant de chargement pour le suspense
const ArticlesLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
    {[...Array(9)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="bg-gray-300 h-48 w-full"></div>
        <div className="p-6">
          <div className="bg-gray-300 h-4 w-24 mb-3 rounded"></div>
          <div className="bg-gray-300 h-6 w-full mb-3 rounded"></div>
          <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
          <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const JeMInformePage = async ({ searchParams }) => {
  // Chargement optimisé des données initiales
  const [initialArticles, totalCount] = await Promise.all([
    getInitialArticles(9), // Charger les 9 premiers articles par défaut
    getTotalArticlesCount()
  ]);

  console.log(`📰 Loaded ${initialArticles.length} initial articles, ${totalCount} total`);

  return (
    <>
      <PerformanceMonitor pageName="Actualités" />
      <Header />
      <main className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* En-tête optimisé */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Actualités
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>

            {/* Bouton Accueil optimisé */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
              prefetch={true}
            >
              <Home size={18} />
              <span className="font-medium">Retour à l'accueil</span>
            </Link>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez les dernières nouvelles et événements de La Maison de Charlotte.
              Restez informé de nos actions d'accompagnement des personnes âgées.
            </p>

            {/* Compteur d'articles */}
            {totalCount > 0 && (
              <p className="text-sm text-gray-500 mt-4">
                {totalCount} article{totalCount > 1 ? 's' : ''} disponible{totalCount > 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Liste d'articles avec pagination puissante */}
          <Suspense fallback={<ArticlesLoadingSkeleton />}>
            <EnhancedArticlesList
              initialArticles={initialArticles}
              totalCount={totalCount}
            />
          </Suspense>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default JeMInformePage;