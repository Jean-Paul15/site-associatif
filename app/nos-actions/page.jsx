// NosActionsPage.jsx
import React from 'react';
import styles from './styles/NosActions.module.css';

// Importez les nouveaux composants de section
import PageHeaderSection from './components/PageHeaderSection';
import AccompagnerSection from './components/AccompagnerSection';
import VideoSection from './components/VideoSection';
import ActionsListSection from './components/ActionsListSection';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';

const NosActionsPage = () => {
  // YouTube video URL (ID only)
  const videoId = "dQw4w9WgXcQ";
  
  // Dynamic current year
  const currentYear = new Date().getFullYear();

  // Action data
  const actions = [
    {
      month: "JANVIER",
      year: "2024",
      title: "Action Janvier 2024",
      description: "En janvier 2024, notre Association a de nouveau tiré la sonnette d'alarme face à une réalité inacceptable : la mort solitaire, conséquence la plus grave de l'isolement des personnes âgées. Chaque mois, deux personnes âgées isolées sont retrouvées mortes chez elles, parfois des semaines après leur décès. Des situations inhumaines que nous pouvons pourtant éviter.",
      buttonText: "UN BILAN ALARMANT",
      buttonLink: "/actions/janvier-2024",
      imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Action janvier 2024"
    },
    {
      month: "FÉVRIER",
      year: "2024", 
      title: "Action Février 2024", 
      description: "Les équipes de La Maison de Charlotte se mobilisent pour apporter des réponses adaptées aux nouveaux besoins des personnes âgées, poursuivre un accompagnement de qualité, mais également pour sensibiliser et inviter les citoyens à combattre le fléau de l'isolement social.",
      buttonText: "DÉCOUVRIR L'ACTION",
      buttonLink: "/actions/fevrier-2024",
      imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Action février 2024"
    }
  ];

  return (
      <><Header /><div className={styles.nosActionsPage}>
      <PageHeaderSection />
      <AccompagnerSection />
      <VideoSection videoUrl={videoId} />
      <ActionsListSection actions={actions} currentYear={currentYear} />
    </div>
    <FooterSection/>
    </>
  );
};

export default NosActionsPage;