import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: 'La Maison de Charlotte',
  description: `Site web de l'association La Maison de Charlotte`,
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Ajout du lien vers Material Symbols pour affichage immédiat des icônes */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
