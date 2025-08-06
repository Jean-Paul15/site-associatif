// components/ActionCard.jsx
'use client';
import React from 'react';
import styles from '../styles/NosActions.module.css';

const ActionCard = ({ month, year, title, description, buttonText, buttonLink, imageUrl, imageAlt }) => {
  return (
    <div className={styles.actionCard}>
      <div className={styles.actionContent}>
        <div className={styles.actionText}>
          <div className={styles.actionDate}>
            {month} {year}
          </div>
          <p className={styles.actionDescription}>
            {description}
          </p>
          <a href={buttonLink} className={styles.actionButton}>
            {buttonText}
          </a>
        </div>
        <div className={styles.actionImage}>
          <img src={imageUrl} alt={imageAlt} />
        </div>
      </div>
    </div>
  );
};

export default ActionCard;