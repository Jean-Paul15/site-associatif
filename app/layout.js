import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import PerformanceOptimizer from "../components/PerformanceOptimizer";

// Chargement optimisé de la police Space Grotesk
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

// Métadonnées SEO optimisées pour l'aide aux personnes âgées
export const metadata = {
  title: {
    default: "La Maison de Charlotte - Association d'aide et accompagnement aux personnes âgées",
    template: "%s | La Maison de Charlotte",
  },
  description: "La Maison de Charlotte est une association d'utilité publique dédiée à l'accompagnement et au soutien des personnes âgées. Nous luttons contre l'isolement et favorisons un vieillissement digne à travers nos programmes d'aide, de soins et d'accompagnement.",
  keywords: [
    "association personnes âgées",
    "La Maison de Charlotte",
    "aide personnes âgées",
    "accompagnement seniors",
    "soins personnes âgées",
    "lutte isolement",
    "vieillissement digne",
    "ONG personnes âgées",
    "action sociale seniors",
    "bénévolat personnes âgées",
    "solidarité seniors",
    "association caritative personnes âgées",
    "aide humanitaire seniors"
  ],
  authors: [{ name: "La Maison de Charlotte", url: "https://lamaisondecharlotte.com" }],
  creator: "La Maison de Charlotte",
  publisher: "La Maison de Charlotte",
  category: "Association, Action sociale, Solidarité",
  classification: "Association d'utilité publique",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "La Maison de Charlotte - Association d'aide aux personnes âgées",
    description: "Association d'utilité publique dédiée à l'accompagnement des personnes âgées. Lutte contre l'isolement et soutien pour un vieillissement digne.",
    siteName: "La Maison de Charlotte",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo La Maison de Charlotte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Maison de Charlotte - Association d'aide aux personnes âgées",
    description: "Association d'utilité publique dédiée à l'accompagnement des personnes âgées. Lutte contre l'isolement et soutien pour un vieillissement digne.",
    images: ["/logo.png"],
    creator: "@lamaisondecharlotte",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

// Viewport configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Ajout du lien vers Material Symbols pour affichage immédiat des icônes */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet" />

        {/* Données structurées JSON-LD pour le SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              "name": "La Maison de Charlotte",
              "alternateName": "Association La Maison de Charlotte",
              "description": "Association d'utilité publique dédiée à l'accompagnement et au soutien des personnes âgées. Nous luttons contre l'isolement et favorisons un vieillissement digne.",
              "url": "https://lamaisondecharlotte.com",
              "logo": "https://lamaisondecharlotte.com/logo.png",
              "image": "https://lamaisondecharlotte.com/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "France",
                "addressCountry": "FR"
              },
              "areaServed": {
                "@type": "Country",
                "name": "France"
              },
              "knowsAbout": [
                "Aide aux personnes âgées",
                "Accompagnement seniors",
                "Lutte contre l'isolement",
                "Vieillissement digne",
                "Soins gériatriques",
                "Action caritative seniors"
              ],
              "sameAs": [
                "https://www.facebook.com/lamaisondecharlotte",
                "https://www.instagram.com/lamaisondecharlotte"
              ],
              "foundingDate": "2020",
              "nonprofitStatus": "NonprofitType"
            })
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased bg-white text-gray-900 selection:bg-blue-100`}
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Skip link pour l'accessibilité */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Aller au contenu principal
        </a>

        {/* Conteneur principal */}
        <PerformanceOptimizer>
          <div id="root-wrapper" className="min-h-screen flex flex-col">
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </div>
        </PerformanceOptimizer>
      </body>
    </html>
  );
}
