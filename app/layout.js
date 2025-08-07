import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Chargement de la police Space Grotesk
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

// Métadonnées SEO
export const metadata = {
  title: {
    default: "La Maison de Charlotte",
    template: "%s | La Maison de Charlotte",
  },
  description: "Site web de l'association La Maison de Charlotte - Accompagnement et soutien aux familles",
  keywords: ["association", "Charlotte", "soutien", "familles"],
  authors: [{ name: "La Maison de Charlotte" }],
  creator: "La Maison de Charlotte",
  publisher: "La Maison de Charlotte",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "La Maison de Charlotte",
    description: "Site web de l'association La Maison de Charlotte",
    siteName: "La Maison de Charlotte",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Maison de Charlotte",
    description: "Site web de l'association La Maison de Charlotte",
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
    <html lang="fr">
      <head>
        {/* Ajout du lien vers Material Symbols pour affichage immédiat des icônes */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet" />
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
        <div id="root-wrapper" className="min-h-screen flex flex-col">
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
