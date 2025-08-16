// components/ActionsListSection.jsx
'use client';
import React from 'react';
import styles from '../styles/NosActions.module.css';
import ActionCard from './ActionCard'; // C'est ici que le composant est importé

const ActionsListSection = ({ actions, currentYear }) => {
  return (
    <section className={styles.actions2024}>
      <div className={styles.actionsHeader}>
        <div className={styles.container}>
          <h2>NOS ACTIONS EN {currentYear}</h2>
          <p>
            L'année {currentYear} a été marquée par un contexte social et politique toujours tendu pour
            les personnes âgées, avec en toile de fond les Jeux Olympiques de Paris, les débats
            persistants sur le vieillissement de la population, la crise du logement, et les difficultés
            d'accès aux soins pour les plus vulnérables. Les enjeux autour de la dépendance et de
            la revalorisation des métiers du grand âge ont également occupé le devant de la
            scène.
          </p>
          <p>
            Les équipes de La Maison de Charlotte se mobilisent pour apporter des réponses
            adaptées aux nouveaux besoins des personnes âgées, poursuivre un
            accompagnement de qualité, mais également pour sensibiliser et inviter les citoyens
            à combattre le fléau de l'isolement social.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.actionsList}>
          {actions && actions.length > 0 ? (
            actions.map((action) => (
              <ActionCard
                key={action.id}
                action={action}
              />
            ))
          ) : (
            <div className={styles.noActions}>
              <p>Aucune action disponible pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActionsListSection;