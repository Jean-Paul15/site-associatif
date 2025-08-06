// components/AccompagnerSection.jsx
'use client';
import React from 'react';
import styles from '../styles/NosActions.module.css';

const AccompagnerSection = () => {
  return (
    <section className={styles.accompagnerSection}>
      <div className={styles.container}>
        <h2>ACCOMPAGNER, AGIR ET TÉMOIGNER</h2>
        <p>
          Par nos actions, nous sommes des liens permettant aux personnes âgées souffrant d'isolement de retrouver 
          le lien social et de retrouver la joie de vivre, et de rester libres de ses choix, vivre et aussi réaliser ses rêves, vivre et proposer à nouveau.
        </p>
        <p className={styles.italicText}>Vivre, tout simplement.</p>
      </div>
    </section>
  );
};

export default AccompagnerSection;