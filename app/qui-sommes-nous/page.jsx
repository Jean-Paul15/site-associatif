import React from 'react';
import Header from '../../components/Header';
import FooterSection from '../../components/FooterSection';
import Link from 'next/link';
import HeroSection from './components/HeroSection';
import VisionSection from './components/VisionSection';
import VocationSection from './components/VocationSection';
import StatsSection from './components/StatsSection';
import MissionsSection from './components/MissionsSection';
import OriginSection from './components/OriginSection';
import OrganizationSection from './components/OrganizationSection';
import InternationalSection from './components/InternationalSection';
import NosRessourcesSection from './components/NosRessourcesSection';

const QuiSommesNousPage = () => {
  return (
    <>
      <Header />
      <main className="qui-sommes-nous">
        <HeroSection />
        <VisionSection />
        <VocationSection />
        <StatsSection />
        <MissionsSection />
        <OriginSection />
        <OrganizationSection />
        <InternationalSection />
      <NosRessourcesSection />
      </main>
      <FooterSection />
    </>
  );
};

export default QuiSommesNousPage;