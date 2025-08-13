/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'evhlratcofwcllsjgggf.supabase.co',
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
  },
  // Configuration du cache pour éviter les problèmes de données obsolètes
  experimental: {
    staleTimes: {
      dynamic: 0, // Pas de cache pour les routes dynamiques
      static: 180, // Cache statique de 3 minutes maximum
    },
  },
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
    ];
  },
};

export default nextConfig;
