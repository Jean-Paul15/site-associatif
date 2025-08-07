"use client";

import React, { useState } from 'react';

// Données de mock pour les cartes d'action
const actionCardsData = [
  {
    imageSrc: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "hands",
    title: "DONNER DU TEMPS",
    description: "La solidarité est le moteur de notre action. Avec votre soutien, vous nous permettez de sortir de leur isolement, de la pauvreté et de la rue de nombreuses personnes âgées."
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    icon: "hands",
    title: "ORGANISER UNE COLLECTE",
    description: "Mariage, naissance, anniversaire... Profitez de vos moments de vie pour soutenir votre engagement, votre famille à rejoindre votre engagement de lutte contre l'isolement des personnes âgées."
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    icon: "hands",
    title: "TRANSMETTRE SON PATRIMOINE",
    description: "Vous pouvez nous transmettre sans frais de succession ou de donation tout ou partie de vos biens ou un objet en particulier pour aider les Petits Frères des Pauvres."
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    icon: "hands",
    title: "ENTREPRISE ET MÉCÉNAT",
    description: "Votre entreprise peut faire prendre part aux changements sociétaux, découvrez nos projets et les différentes manières de vous y associer."
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    icon: "hands",
    title: "S'ENGAGER AUTREMENT",
    description: "De nombreux autres moyens existent pour soutenir les actions des Petits Frères des Pauvres. Découvrez les moyens et notre l'engagement volontaire."
  }
];

// Composant pour une carte individuelle d'action
const ActionCard = ({ imageSrc, icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mx-2 flex-shrink-0 w-80 sm:w-80">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover rounded-xl mb-4" />
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h3>
        <a href="#" className="bg-[#e24a73] text-white p-2 rounded-full transition-transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </a>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// Section principale du carrousel
const ActionCarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? actionCardsData.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === actionCardsData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="py-20 px-4 action-carousel" style={{ background: 'linear-gradient(to top, #ffbf42 20%, white 20%)', borderBottomRightRadius: '2rem' }}>
      <div className="max-w-7xl mx-auto"> 
        {/* En-tête de la section */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-800 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              COMMENT AGIR POUR ROMPRE L'ISOLEMENT DE NOS AÎNÉS ?
            </h2>
            <p className="text-gray-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Découvrez tous les moyens de vous engager à nos côtés pour lutter contre l'isolement des personnes âgées.
            </p>
          </div>
          {/* Boutons de navigation */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <button onClick={prevSlide} className="bg-white p-3 rounded-full shadow-md transition-colors hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e24a73]">
 <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button onClick={nextSlide} className="bg-white p-3 rounded-full shadow-md transition-colors hover:bg-gray-100">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e24a73]">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Conteneur du carrousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 21 }rem)` }} 
          >
            {actionCardsData.map((card, index) => (
              <ActionCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionCarouselSection;
