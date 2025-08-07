/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'evhlratcofwcllsjgggf.supabase.co',  // Domaine Supabase pour les images externes
          'images.unsplash.com',
        ],
      },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
};

export default nextConfig;
