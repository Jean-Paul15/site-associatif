// components/ArticleCard.jsx

import React, { memo } from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import { ArrowRight } from 'lucide-react';

const ArticleCard = memo(({
  image = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  date = "Date non disponible",
  titre = "Titre de l'article",
  description = "Description de l'article non disponible...",
  link,
  slug
}) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden w-full max-w-xs mx-auto transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100/50 border border-gray-200/60">
      <div className="relative overflow-hidden">
        <SafeImage
          src={image}
          alt={titre}
          width={400}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <Link
            href={link}
            className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-medium hover:text-blue-700 transition-all duration-300 group/link hover:gap-2"
            prefetch={true}
          >
            LIRE LA SUITE
            <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
