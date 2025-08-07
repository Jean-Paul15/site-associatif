// components/PageHeaderSection.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import styles from '../styles/NosActions.module.css';

const PageHeaderSection = () => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.container}>
        <h1>NOS ACTIONS</h1>

        {/* Lien Accueil (texte + icône) uniquement stylisé localement */}
        <div style={{ pointerEvents: 'auto', zIndex: 100, position: 'relative' }}>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 text-sm mt-4"
            style={{
              pointerEvents: 'auto',
              zIndex: 100,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            <Home size={16} />
            <span>Accueil</span>
          </Link>
        </div>

        <p className={styles.headerSubtitle}>
          La Maison de Charlotte s'engage dans une mission d'accompagnement avec les personnes qui le veulent aussi.
        </p>
      </div>
    </div>
  );
};

export default PageHeaderSection;
