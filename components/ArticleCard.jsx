// components/ArticleCard.jsx

import React from 'react';
import { ArrowRight } from 'lucide-react';

const ArticleCard = ({
  image = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  date = "30 juillet 2025",
  titre = "VACANCES POUR AÎNÉS ISOLÉS : UN SÉJOUR INOUBLIABLE POUR DIX PERSONNES ÂGÉES À L'ABBAYE DE LA PRÉE",
  description = "Cet été 2025, plus de 3 000 personnes âgées isolées partiront en vacances grâce à la...",
  link
}) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden max-w-xs mx-auto transition-transform transform hover:-translate-y-1 hover:shadow-lg ">
      <div className="relative">
        <img
          src={image}
          alt={titre}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 left-2 bg-green-100 text-green-700 text-[11px] font-semibold px-2 py-1 rounded font-space-grotesk">
          {date}
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-black font-bold text-xs leading-tight mb-2 uppercase tracking-wide font-space-grotesk">
          {titre}
        </h3>

        {/* Description avec white-space: pre-wrap pour respecter les sauts de ligne */}
        <p className="text-gray-700 text-xs leading-relaxed mb-3 font-space-grotesk" style={{ whiteSpace: 'pre-wrap' }}>
          {description}
        </p>

        <div className="flex justify-end font-space-grotesk">
          <a href={link} className="flex items-center gap-1 text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors">
            LIRE LA SUITE
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
