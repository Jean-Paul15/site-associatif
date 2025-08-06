"use client";
import React from 'react';

const VocationSection = () => {
  return (
    <section className="vocation-section">
      <div className="container">
        <div className="divider"></div>
        <div className="content-grid">
          <div className="title-column">
            <h2 className="section-title">NOTRE VOCATION</h2>
          </div>
          <div className="text-column">
            <p className="section-text">
              Depuis 1946, La Maison de Charlotte est aux côtés des personnes âgées souffrant d'isolement, prioritairement les plus démunies.
              Par nos actions, nous recréons des liens leur permettant de retrouver une dynamique de vie : partager des expériences, trouver ensemble des solutions à leurs problèmes, retrouver la joie d'être soi, d'être aimés, d'être reconnus, faire des projets à nouveau. Vivre, tout simplement.
              Par notre voix, nous incitons la société à changer de regard sur la vieillesse, nous témoignons des situations inacceptables que nous rencontrons, nous alertons les pouvoirs publics sur la nécessité d'agir, nous favorisons l'engagement citoyen, nous proposons des réponses nouvelles.
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .vocation-section {
          padding: 4rem 1rem;
          background: #ffffff;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
          margin-bottom: 3rem;
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

export default VocationSection;