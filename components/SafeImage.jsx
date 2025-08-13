// components/SafeImage.jsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const SafeImage = ({
    src,
    alt,
    fallbackSrc = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    className = "",
    width = 400,
    height = 200,
    ...props
}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        console.warn(`Failed to load image: ${imgSrc}, using fallback`);
        setHasError(true);
        setImgSrc(fallbackSrc);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    // Vérifier si l'hostname est configuré
    const isValidImageUrl = (url) => {
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
    };

    // Utiliser l'image de fallback si l'URL n'est pas valide
    const finalSrc = isValidImageUrl(imgSrc) ? imgSrc : fallbackSrc;

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
                onError={handleError}
                onLoad={handleLoad}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                {...props}
            />

            {hasError && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Fallback
                </div>
            )}
        </div>
    );
};

export default SafeImage;
