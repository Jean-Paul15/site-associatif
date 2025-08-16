// components/ActionCard.jsx
'use client';
import React from 'react';
import Image from 'next/image';
import styles from '../styles/NosActions.module.css';

const ActionCard = ({ action }) => {
  // Format de la date : MOIS ANNÉE (ex: JANVIER 2025)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('fr-FR', { month: 'long' }).toUpperCase();
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className={styles.actionCard}>
      <div className={styles.actionContent}>
        <div className={styles.actionText}>
          <div className={styles.actionDate}>
            {formatDate(action.created_at)}
          </div>
          <p className={styles.actionDescription}>
            {action.full_content}
          </p>
        </div>
        <div className={styles.actionImage}>
          {action.image_url && (
            <Image
              src={action.image_url}
              alt={`Action ${formatDate(action.created_at)}`}
              width={400}
              height={300}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'fill'
              }}
              priority={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionCard;