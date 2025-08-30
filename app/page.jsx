// app/page.jsx

import Header from '../components/Header';
import CarouselSection from "../components/CarouselSection";
import NewsletterSection from "../components/NewsletterSection";
import NewsSection from "../components/NewsSection";
import ActionCarouselSection from "../components/ActionCarouselSection";
import NosActionsSection from "../components/NosActionsSection";
import QuiSommesNousSection from "../components/QuiSommesNousSection";
import FooterSection from "../components/FooterSection";
import { getNewsItems } from '../lib/getNews'; // Importation de la fonction serveur
import { getEngagements } from '../lib/getEngagements'; // Importation pour les engagements

// Forcer la revalidation toutes les 60 secondes
export const revalidate = 60;

// Désactiver le cache statique pour cette page
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Accueil - Association d'aide aux personnes âgées",
  description: "La Maison de Charlotte accompagne les personnes âgées dans leur quotidien. Découvrez nos actions, nos 400 équipes bénévoles et nos 26 190 personnes aidées. Rejoignez notre mission contre l'isolement.",
  keywords: [
    "aide personnes âgées accueil",
    "association seniors France",
    "bénévolat personnes âgées",
    "lutte isolement seniors",
    "accompagnement domicile personnes âgées"
  ],
  openGraph: {
    title: "La Maison de Charlotte - Aide aux personnes âgées",
    description: "26 190 personnes âgées aidées, 400 équipes d'action, 14 500 bénévoles. Rejoignez notre mission contre l'isolement des seniors.",
  },
}

export default async function HomePage() {
  // Récupération des données initiales côté serveur avec cache bust
  const timestamp = Date.now();
  console.log(`Loading news items at ${new Date().toISOString()}`);

  const initialNewsItems = await getNewsItems(6); // Par exemple, récupérer 6 articles initialement
  const engagements = await getEngagements(); // Charger les engagements

  console.log(`Loaded ${initialNewsItems?.length || 0} initial news items`);
  console.log(`Loaded ${engagements?.length || 0} engagements`);

  return (
    <div>
      <Header />
      <CarouselSection />
      {/* La section des actualités avec les données initiales */}
      <NewsSection initialNewsItems={initialNewsItems} />
      <NewsletterSection />
      <ActionCarouselSection />
      <NosActionsSection engagements={engagements} />
      <QuiSommesNousSection />
      <FooterSection />
    </div>
  );
}
