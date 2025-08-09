// components/ArticleCard.jsx

import React from 'react';
import { ArrowRight } from 'lucide-react';

const ArticleCard = ({
  image = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  date = "Date non disponible",
  titre = "Titre de l'article",
  description = "Description de l'article non disponible...",
  link
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm mx-auto transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100">
      <div className="relative">
        <img
          src={image}
          alt={titre}
          className="w-full h-48 sm:h-52 object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-green-600 text-[10px] sm:text-[11px] font-semibold px-3 py-1.5 rounded-full font-space-grotesk shadow-sm">
          {date}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-gray-900 font-bold text-sm sm:text-base leading-snug mb-3 font-space-grotesk line-clamp-2"
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            WebkitHyphens: 'auto',
            msHyphens: 'auto',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
          {titre}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 font-space-grotesk"
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            WebkitHyphens: 'auto',
            msHyphens: 'auto',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
          {description}
        </p>

        <div className="flex justify-between items-center">
          <a href={link} className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors group">
            LIRE LA SUITE
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
