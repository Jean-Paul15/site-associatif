import React from 'react';
import ArticleCard from './ArticleCard';

const newsItems = [
  {
    id: 1,
    slug: 'vacances-aines-isoles',
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "30 juillet 2025",
    titre: "VACANCES POUR AÎNÉS ISOLÉS : UN SÉJOUR INOUBLIABLE POUR DIX PERSONNES ÂGÉES À L'ABBAYE DE LA PRÉE",
    description: "Cet été 2025, plus de 3 000 personnes âgées isolées partiront en vacances grâce à la...",
  },
  {
    id: 2,
    slug: 'gestes-combattre-solitude',
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "30 juillet 2025",
    titre: "9 GESTES SIMPLES POUR COMBATTRE LA SOLITUDE DE NOS AÎNÉS",
    description: "Nouer le contact et illuminer la journée de nos aînés, c'est simple ! La maison de Charlotte...",
  },
  {
    id: 3,
    slug: 'recette-cuisine',
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    date: "15 août 2025",
    titre: "RECETTE DE CUISINE POUR DEUX PERSONNES",
    description: "Une délicieuse recette de pâtes carbonara, facile à préparer et parfaite pour un dîner romantique."
  },
  {
    id: 3,
    slug: 'recette-cuisine',
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    date: "15 août 2025",
    titre: "RECETTE DE CUISINE POUR DEUX PERSONNES",
    description: "Une délicieuse recette de pâtes carbonara, facile à préparer et parfaite pour un dîner romantique."
  },
];

const NewsSection = () => {
  return (    
    <section className="bg-white py-16 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex justify-between items-center mb-10 pt-8">
          <h2 className="text-3xl font-bold text-black text-center w-full md:text-left md:w-auto">DERNIÈRES ACTUALITÉS</h2>
          <a href="#" className="hidden md:block text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors">
            VOIR TOUTES LES ACTUALITÉS &gt;
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-4 md:space-y-0 max-w-5xl mx-auto">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <ArticleCard 
                image={item.image}
                date={item.date}
                titre={item.titre}
                description={item.description}
                link={`/je-m-informe/article/${item.id}`} // Construct the link using the item.id
                slug={item.slug} // Pass the slug to ArticleCard
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
