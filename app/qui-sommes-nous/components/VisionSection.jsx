"use client";
import React from 'react';

const VisionSection = () => {
  return (
    <section className="vision-section">
      <div className="container">
        <div className="content-grid">
          <div className="title-column">
            <h2 className="section-title">NOTRE VISION</h2>
          </div>
          <div className="text-column">
            <p className="section-text">
              Chacun de nos aînés devrait pouvoir vivre pleinement sa vie jusqu'au bout en maintenant le lien social indispensable à son bien-être et à sa sérénité.
              Les nouveaux rythmes de la vie contemporaine conduisent malheureusement à une fragilisation du lien familial, social et à un nombre croissant de personnes âgées isolées, la pauvreté venant aggraver ce phénomène. Avec l'âge, certains aînés se retrouvent également avec une mobilité réduite ou en situation de handicap, ce qui peut engendrer une perte d'autonomie et contribuer davantage à leur isolement.
              Le constat est alarmant : aujourd'hui en France, 2 millions d'aînés souffrent d'isolement. 500 000 personnes âgées sont en état de mort sociale, privées de liens et des plaisirs simples et essentiels de la vie.
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .vision-section {
          padding: 4rem 1rem;
          background: #ffffff;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          align-items: start;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #3b82f6;
          margin: 0;
          letter-spacing: 0.05em;
        }
        
        .section-text {
          color: #374151;
          line-height: 1.7;
          font-size: 1rem;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .section-title {
            font-size: 1.25rem;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default VisionSection;