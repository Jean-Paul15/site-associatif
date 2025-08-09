import React from 'react';

const Loading = () => {
    // Pas d'animation de loading pour les articles - transition plus fluide
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Contenu minimal ou vide pour éviter l'animation de loading */}
        </div>
    );
};

export default Loading;
