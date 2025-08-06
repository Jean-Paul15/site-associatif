// components/VideoSection.jsx
'use client';
import React from 'react';
import YouTube from 'react-youtube'; // Importez le composant YouTube
import styles from '../styles/NosActions.module.css';

const VideoSection = ({ videoId }) => {
  // Les options pour le lecteur YouTube.
  // rel=0 et modestbranding=1 sont essentiels pour cacher les suggestions.
  // autoplay: 0 pour désactiver la lecture automatique.
  const opts = {
    playerVars: {
      autoplay: 0, // Désactive l'autoplay
      rel: 0, // Cache les vidéos suggérées à la fin
      modestbranding: 1, // Réduit le logo YouTube
    },
  };

  return (
    <div className={styles.videoSection}>
      <h2 className={styles.videoTitle}>DÉCOUVREZ NOTRE ACTION EN VIDÉO</h2>
      <div className={styles.videoContainer}>
        <div className={styles.videoFrame}>
          <YouTube
            videoId={videoId}
            opts={opts}
            className={styles.youtubePlayer} // Appliquez des styles si nécessaire
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSection;