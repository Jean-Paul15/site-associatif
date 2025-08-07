'use client';
import ArticleCard from '../../components/ArticleCard';
import Header from '../../components/Header';
import FooterSection from '../../components/FooterSection';
import { Home } from 'lucide-react';

const dummyArticles = [
  {
    id: 1,
    title: "Actualité 1: Un nouvel événement solidaire",
    slug: "actualite-1-evenement-solidaire",
    description: "Découvrez les détails de notre dernier événement et comment il a aidé les personnes âgées isolées.",
    imageUrl: "/images/event1.jpg", // Replace with actual image paths

  },
  {
    id: 2,
    title: "Actualité 2: Témoignage poignant d'un bénévole",
    slug: "actualite-2-temoignage-benevole",
    description: "Lisez le récit inspirant d'un de nos bénévoles et son impact sur la vie des aînés.",
    imageUrl: "/images/testimonial1.jpg", // Replace with actual image paths

  },
  {
    id: 3,
    title: "Actualité 3: Lancement d'une nouvelle initiative",
    slug: "actualite-3-nouvelle-initiative",
    description: "Apprenez-en plus sur notre nouvelle initiative pour combattre l'isolement numérique des seniors.",
    imageUrl: "/images/initiative1.jpg", // Replace with actual image paths

  },

];

const JeMInformePage = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-100 py-12"> {/* Added background and padding to main content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Used responsive container classes */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"> {/* Styled title */}
            Actualités de La Maison de Charlotte
          </h1>
          
          {/* Bouton Accueil */}
          <div className="text-center mb-8">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 transition-colors hover:text-blue-700"
            >
              <Home size={16} />
              <span>Accueil</span>
            </a>
          </div>
          
          {/* Added descriptive text */}
          <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in-up">
            Retrouvez ici les dernières nouvelles et les événements marquants de La Maison de Charlotte. Tenez-vous informé de nos actions, de nos rencontres et des témoignages qui font vivre notre association.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Improved grid layout and spacing */}
            {dummyArticles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                link={`/je-m-informe/article/${article.id}`} // Construct the link using the id and new URL structure
              />
            ))}
          </div>
        </div>
      </main> {/* This closing div for the container was likely missing or misplaced */}
      <FooterSection />
    </>
  );
};
export default JeMInformePage;