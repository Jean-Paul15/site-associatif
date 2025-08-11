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
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden w-full max-w-xs mx-auto transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100/50 border border-gray-200/60">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={titre}
          className="w-full h-18 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-lg">
          {date}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-3">
        <h3 className="text-gray-800 font-semibold text-sm leading-tight mb-2 line-clamp-2"
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
          {titre}
        </h3>

        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2"
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
          {description}
        </p>

        <div className="flex justify-end">
          <a href={link} className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-medium hover:text-blue-700 transition-all duration-300 group/link hover:gap-2">
            LIRE LA SUITE
            <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
