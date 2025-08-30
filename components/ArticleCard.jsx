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
  slug,
  viewMode = 'grid',
  className = ""
}) => {
  // Mode liste
  if (viewMode === 'list') {
    return (
      <div className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100/50 border border-gray-200/60 ${className}`}>
        <div className="flex gap-4 p-4">
          <div className="relative overflow-hidden rounded-xl flex-shrink-0">
            <SafeImage
              src={image}
              alt={titre}
              width={160}
              height={120}
              className="w-40 h-30 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              sizes="160px"
            />
            <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium px-2 py-0.5 rounded-full shadow-lg">
              {date}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-gray-800 font-semibold text-lg leading-tight mb-2 line-clamp-2"
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

              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3"
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                {description}
              </p>
            </div>

            <div className="flex justify-end">
              <Link
                href={link}
                className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-medium hover:text-blue-700 transition-all duration-300 group/link hover:gap-2"
                prefetch={true}
              >
                LIRE LA SUITE
                <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mode grille (par défaut)
  return (
    <div className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden w-full max-w-xs mx-auto transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100/50 border border-gray-200/60 ${className}`}>
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
