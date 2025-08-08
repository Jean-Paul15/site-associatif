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

export default async function HomePage() {
  // Récupération des données initiales côté serveur
  const initialNewsItems = await getNewsItems(6); // Par exemple, récupérer 6 articles initialement

  return (
    <div>
      <Header />      
      <CarouselSection />
      {/* La section des actualités avec les données initiales */}
      <NewsSection initialNewsItems={initialNewsItems} />
      <NewsletterSection/>
      <ActionCarouselSection/>
      <NosActionsSection/>
      <QuiSommesNousSection/>
      <FooterSection />
    </div>
  );
}
