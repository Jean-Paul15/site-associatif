import React from 'react';
import Link from 'next/link'; // Import Link for navigation
import { ArrowLeft } from 'lucide-react'; // Import ArrowLeft icon
import Header from '../../../../components/Header'; // Adjust path as necessary
import FooterSection from '../../../../components/FooterSection'; // Adjust path as necessary

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
const ArticlePage = ({ params }) => {
  const { id } = params;

  const article = dummyArticles.find(article => article.id === parseInt(id)); // Find article by ID

  // For now, use the description as content, or add a content property to dummy data later
  const content = article?.description || 'Contenu de l\'article non disponible pour l\'instant.';

  if (!article) {
    return <div className="article-container" style={{ padding: '20px', textAlign: 'center' }}>Article not found</div>;
  }

  return (
    <>
      <Header /> {/* Add the Header component */}
      <main className="article-page-main" style={{ padding: '40px 0', background: '#f9fafb' }}> {/* Add padding and background */}
        {/* Add a wrapper for potential future styling or animations */}
        <div className="container mx-auto px-4 py-8" style={{ maxWidth: '900px' }}> {/* Use container and max-width */}
          
          {/* Back Button */}
          <Link href="/je-m-informe" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8" style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>
            <ArrowLeft size={20} className="mr-2" /> {/* Add icon */}
            Retour aux actualités
          </Link>

          <div className="article-header">
            <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1f2937' }}>{article.title}</h1> {/* Larger and bolder title */}
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md mb-8" // Styled image
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            )}
          </div>
          
          <div className="article-content text-gray-700 leading-relaxed" style={{ fontSize: '1.1rem' }}> {/* Styled content */}
            {/* Display description as content for now */}
            <p style={{ marginBottom: '20px' }}>
              {content}
            </p>
            {/* If you add a 'content' array to your dummy data later, you can map over it like this:
 {article.content.map((paragraph, index) => (
 <p key={index} style={{ marginBottom: '15px', lineHeight: '1.6' }}>
              {paragraph}
 </p>
          ))}
 */}
      </div>
    </div>
      </main>
      <FooterSection /> {/* Add the FooterSection component */}
    </>
  );
};

export default ArticlePage;