// lib/imageOptimization.js
import { useEffect } from 'react';

export const IMAGE_CONFIGS = {
    // Configurations d'images par type de composant
    hero: {
        sizes: '100vw',
        quality: 90,
        priority: true,
        placeholder: 'blur',
        format: ['image/webp', 'image/avif']
    },

    card: {
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
        quality: 85,
        priority: false,
        placeholder: 'blur',
        format: ['image/webp', 'image/avif']
    },

    thumbnail: {
        sizes: '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw',
        quality: 80,
        priority: false,
        placeholder: 'blur',
        format: ['image/webp', 'image/avif']
    },

    avatar: {
        sizes: '(max-width: 768px) 20vw, 10vw',
        quality: 85,
        priority: false,
        placeholder: 'blur',
        format: ['image/webp', 'image/avif']
    }
};

// Fonction pour générer un placeholder blur basé sur la couleur dominante
export function generatePlaceholder(width = 10, height = 10, color = '#e5e7eb') {
    const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;

    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
}

// Fonction pour optimiser les URLs d'images
export function optimizeImageUrl(url, options = {}) {
    const {
        width,
        height,
        quality = 85,
        format = 'webp'
    } = options;

    // Si c'est une image Unsplash, ajouter les paramètres d'optimisation
    if (url.includes('images.unsplash.com')) {
        const urlObj = new URL(url);

        if (width) urlObj.searchParams.set('w', width.toString());
        if (height) urlObj.searchParams.set('h', height.toString());
        if (quality !== 85) urlObj.searchParams.set('q', quality.toString());
        if (format === 'webp') urlObj.searchParams.set('fm', 'webp');

        // Ajouter des optimisations Unsplash
        urlObj.searchParams.set('auto', 'format,compress');
        urlObj.searchParams.set('fit', 'crop');

        return urlObj.toString();
    }

    return url;
}

// Hook pour précharger les images critiques
export function useImagePreloader(images = []) {
    useEffect(() => {
        const preloadImages = images.filter(img => img.priority);

        preloadImages.forEach(({ src, sizes }) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            if (sizes) link.setAttribute('imagesizes', sizes);
            document.head.appendChild(link);
        });

        // Cleanup
        return () => {
            const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
            preloadLinks.forEach(link => {
                if (images.some(img => img.src === link.href)) {
                    document.head.removeChild(link);
                }
            });
        };
    }, [images]);
}

// Fonction pour detecter le support WebP/AVIF
export function detectImageSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    const formats = {
        webp: canvas.toDataURL('image/webp').startsWith('data:image/webp'),
        avif: canvas.toDataURL('image/avif').startsWith('data:image/avif')
    };

    return formats;
}

// Intersection Observer pour lazy loading avancé
export class AdvancedImageObserver {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px 0px',
            threshold: 0.01,
            ...options
        };

        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.options
        );
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Charger l'image haute résolution
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                // Charger le srcset si disponible
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-srcset');
                }

                // Supprimer la classe de loading
                img.classList.remove('loading');
                img.classList.add('loaded');

                this.observer.unobserve(img);
            }
        });
    }

    observe(element) {
        this.observer.observe(element);
    }

    disconnect() {
        this.observer.disconnect();
    }
}

const imageOptimization = {
    IMAGE_CONFIGS,
    generatePlaceholder,
    optimizeImageUrl,
    useImagePreloader,
    detectImageSupport,
    AdvancedImageObserver
};

export default imageOptimization;
