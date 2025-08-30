// NosActionsPage.jsx
import React from 'react';
import styles from './styles/NosActions.module.css';
import { getActions } from '../../lib/getActions';

// Importez les nouveaux composants de section
import PageHeaderSection from './components/PageHeaderSection';
import AccompagnerSection from './components/AccompagnerSection';
import VideoSection from './components/VideoSection';
import ActionsListSection from './components/ActionsListSection';
import Header from '../../components/Header';
import FooterSection from '../../components/FooterSection';

export const metadata = {
  title: "Nos actions - Accompagnement des personnes âgées",
  description: "Découvrez nos actions concrètes pour lutter contre l'isolement des personnes âgées : visites à domicile, accompagnement médical, activités collectives, aide d'urgence. 30 maisons et 400 équipes mobilisées.",
  keywords: [
    "actions personnes âgées",
    "accompagnement domicile seniors",
    "visite personnes âgées isolées",
    "aide urgence personnes âgées",
    "activités seniors",
    "équipes bénévoles personnes âgées"
  ],
  openGraph: {
    title: "Nos actions - La Maison de Charlotte",
    description: "400 équipes d'action, 30 maisons, des milliers de visites : découvrez comment nous luttons contre l'isolement des personnes âgées.",
  },
};

// Configuration pour la revalidation
export const revalidate = 300; // 5 minutes
export const dynamic = 'force-dynamic';

async function loadActions() {
  try {
    console.log('🔄 Chargement des actions pour la page nos-actions...');
    const actions = await getActions(20); // Charger 20 actions maximum
    console.log(`✅ ${actions.length} actions chargées pour nos-actions`);
    return actions;
  } catch (error) {
    console.error('❌ Erreur lors du chargement des actions:', error);
    return [];
  }
}

const NosActionsPage = async () => {
  // Charger les actions depuis Supabase
  const actions = await loadActions();

  // YouTube video URL (ID only)
  const videoId = "dQw4w9WgXcQ";

  // Dynamic current year
  const currentYear = new Date().getFullYear();

  return (
    <><Header /><div className={styles.nosActionsPage}>
      <PageHeaderSection />
      <AccompagnerSection />
      <VideoSection videoUrl={videoId} />
      <ActionsListSection actions={actions} currentYear={currentYear} />
    </div>
      <FooterSection />
    </>
  );
};

export default NosActionsPage;