// components/SafeImage.jsx
"use client";

import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';

const SafeImage = memo(({
    src,
    alt,
    fallbackSrc = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    className = "",
    width = 400,
    height = 200,
    priority = false,
    quality = 85,
    placeholder = "blur",
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    ...props
}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleError = useCallback(() => {
        console.warn(`Failed to load image: ${imgSrc}, using fallback`);
        setHasError(true);
        setImgSrc(fallbackSrc);
    }, [imgSrc, fallbackSrc]);

    const handleLoad = useCallback(() => {
        setIsLoading(false);
    }, []);

    // Vérifier si l'hostname est configuré
    const isValidImageUrl = useCallback((url) => {
        try {
            const hostname = new URL(url).hostname;
            const allowedHostnames = [
                'images.unsplash.com',
                'evhlratcofwcllsjgggf.supabase.co',
                'smebdzmwzgwwsqadpywn.supabase.co'
            ];

            // Vérifier les hostnames spécifiques ou les sous-domaines Supabase
            return allowedHostnames.includes(hostname) || hostname.endsWith('.supabase.co');
        } catch {
            return false;
        }
    }, []);

    // Utiliser l'image de fallback si l'URL n'est pas valide
    const finalSrc = isValidImageUrl(imgSrc) ? imgSrc : fallbackSrc;

    // Générer un placeholder blur simple
    const generateBlurDataURL = useCallback((w, h) => {
        const svg = `
            <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad)" />
            </svg>
        `;

        if (typeof Buffer !== 'undefined') {
            const base64 = Buffer.from(svg).toString('base64');
            return `data:image/svg+xml;base64,${base64}`;
        } else {
            // Fallback pour le client
            const base64 = btoa(svg);
            return `data:image/svg+xml;base64,${base64}`;
        }
    }, []);

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div
                    className="absolute inset-0 bg-gray-300 animate-pulse rounded"
                    style={{ width, height }}
                />
            )}

            <Image
                src={finalSrc}
                alt={alt}
                width={width}
                height={height}
                className={isLoading ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-300'}
                onError={handleError}
                onLoad={handleLoad}
                priority={priority}
                quality={quality}
                placeholder={placeholder}
                blurDataURL={generateBlurDataURL(width, height)}
                sizes={sizes}
                {...props}
            />

            {hasError && (
                <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Image de secours
                </div>
            )}
        </div>
    );
});

SafeImage.displayName = 'SafeImage';

export default SafeImage;
