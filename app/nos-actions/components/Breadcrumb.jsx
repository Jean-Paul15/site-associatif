// components/Breadcrumb.jsx
'use client';
import React from 'react';
import styles from '../styles/NosActions.module.css';

const Breadcrumb = () => {
  return (
    <div className={styles.breadcrumb}>
      <a href="/" className={styles.breadcrumbHome}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        Accueil
      </a>
    </div>
  );
};

export default Breadcrumb;