// components/PageHeaderSection.jsx
'use client';
import React from 'react';
import styles from '../styles/NosActions.module.css';
import Breadcrumb from './Breadcrumb';

const PageHeaderSection = () => {
  return (
    <>
      <div className={styles.breadcrumbTop}>
        <div className={styles.container}>
          <Breadcrumb />
        </div>
      </div>
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>NOS ACTIONS</h1>
          <p className={styles.headerSubtitle}>
            La Maison de Charlotte s'engage dans une mission d'accompagnement avec les personnes qui le veulent aussi.
          </p>
        </div>
      </div>
    </>
  );
};

export default PageHeaderSection;