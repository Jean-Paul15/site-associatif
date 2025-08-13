/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Configuration pour tous les sous-domaines Supabase
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
      // Anciens hostnames spécifiques (pour compatibilité)
      {
        protocol: 'https',
        hostname: 'evhlratcofwcllsjgggf.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'smebdzmwzgwwsqadpywn.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Configuration du cache pour éviter les problèmes de données obsolètes
  experimental: {
    staleTimes: {
      dynamic: 0, // Pas de cache pour les routes dynamiques
      static: 180, // Cache statique de 3 minutes maximum
    },
    optimizePackageImports: ['lucide-react'],
  },
  // Optimisations de performance
  compress: true,
  poweredByHeader: false,
  // Headers pour éviter le cache navigateur agressif
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=30',
          },
        ],
      },
      {
        source: '/je-m-informe',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=180, stale-while-revalidate=60',
          },
        ],
      },
      {
        source: '/je-m-informe/article/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=300',
          },
        ],
      },
      // Headers de sécurité et performance
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
};

export default nextConfig;
