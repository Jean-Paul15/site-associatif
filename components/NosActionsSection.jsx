"use client";
import React from "react";

const actionCardsData = [
  {
    imageSrc: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "APPORTER UNE PRÉSENCE",
    description: "Créer des relations de confiance avec les personnes âgées isolées, même en milieu rural."
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
    title: "ACTIVITÉS COLLECTIVES",
    description: "Organiser des moments de partage et de joie entre les générations."
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    title: "AGIR CONTRE LES VULNÉRABILITÉS",
    description: "Accompagner face aux difficultés liées à l'âge ou à la précarité."
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    title: "SENSIBILISER LA SOCIÉTÉ",
    description: "Faire évoluer le regard de la société sur le vieillissement."
  }
];

const ActionCard = ({ imageSrc, title, description }) => {
  return (
    <a href="#" className="action-card">
      <img src={imageSrc} alt={title} className="action-image" />
      <div className="action-overlay" />
      <div className="action-content">
        <h3 className="action-title">{title}</h3>
        <p className="action-description">{description}</p>
      </div>
    </a>
  );
};

const NosActionsSection = () => {
  return (
    <section className="nos-actions-section">
      <style>{`
        .nos-actions-section {
          background: #fff;
          padding: 80px 20px;
          font-family: sans-serif;
        }

        .nos-actions-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .nos-actions-heading {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-bottom: 40px;
          text-transform: uppercase;
        }

        .nos-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .action-card {
          position: relative;
          display: block;
          height: 280px;
          overflow: hidden;
          border-radius: 12px 12px 40px 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .action-card:hover {
          transform: scaleX(1.02);
        }

        .action-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .action-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(59, 130, 246, 0.12), transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .action-card:hover .action-overlay {
          opacity: 1;
        }

        .action-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 18px;
          color: white;
          transition: transform 0.4s ease;
        }

        .action-title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .action-description {
          font-size: 13px;
          line-height: 1.4;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .action-card:hover .action-description {
          opacity: 1;
        }
      `}</style>

      <div className="nos-actions-container">
        <h2 className="nos-actions-heading">NOS ACTIONS</h2>
        <div className="nos-actions-grid">
          {actionCardsData.map((card, index) => (
            <ActionCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NosActionsSection;
