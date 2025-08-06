// app/page.jsx

import Header from '../components/Header';
// import Footer from '../components/Footer'; // Commentons ou supprimons cette ligne pour l'instant
import CarouselSection from "../components/CarouselSection";
import NewsletterSection from "../components/NewsletterSection";
import NewsSection from "../components/NewsSection"; // Import du nouveau composant
import ActionCarouselSection from "../components/ActionCarouselSection";
import NosActionsSection from "../components/NosActionsSection";
import QuiSommesNousSection from "../components/QuiSommesNousSection";
import FooterSection from "../components/FooterSection";

export default function HomePage() {
  return (
    <div>
      <Header />      
      {/* Puis le carrousel */}
      <CarouselSection />
      {/* La section des actualités en premier */}
      <NewsSection />
      <NewsletterSection/>
      <ActionCarouselSection/>
      <NosActionsSection/>
      <QuiSommesNousSection/>
      <FooterSection />

    </div>
  );
}
