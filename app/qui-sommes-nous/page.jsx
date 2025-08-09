import React from 'react';
import { Metadata } from 'next';
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

export const metadata = {
  title: "Qui sommes-nous - Notre mission pour les personnes âgées",
  description: "Découvrez La Maison de Charlotte : notre histoire, notre vision et notre engagement auprès des personnes âgées. Association créée en 2020 pour lutter contre l'isolement et favoriser un vieillissement digne.",
  keywords: [
    "qui sommes nous La Maison de Charlotte",
    "histoire association personnes âgées",
    "mission seniors France",
    "vision vieillissement digne",
    "organisation aide personnes âgées"
  ],
  openGraph: {
    title: "Qui sommes-nous - La Maison de Charlotte",
    description: "Association dédiée à l'accompagnement des personnes âgées depuis 2020. Découvrez notre mission, nos valeurs et notre organisation.",
  },
};

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