"use client";
import React from 'react';

const MissionsSection = () => {
  const missions = [
    {
      title: "APPORTER UNE PRÉSENCE",
      description: "Échanger avec nos aînés et les écouter pour recréer le lien social avec l'autre, quand plus personne ne le peut.",
      image: "/images/mission1.jpg"
    },
    {
      title: "SENSIBILISER ET MOBILISER",
      description: "Faire entendre la voix des invisibles pour sensibiliser l'opinion publique à la situation des personnes âgées isolées.",
      image: "https://www.empara.fr/blog/wp-content/uploads/2016/05/Photo-HDR_8.jpg"
    },
    {
      title: "ACTIVITÉS COLLECTIVES",
      description: "Recréer du lien social par des activités, vacances et repas partagés. Un moment pour vivre ensemble.",
      image: "/images/mission3.jpg"
    },
    {
      title: "AGIR CONTRE LA VULNÉRABILITÉ",
      description: "Réduire les facteurs aggravants de l'isolement : précarité, perte d'autonomie, handicap ou exclusion.",
      image: "/images/mission4.jpg"
    }
  ];

  return (
    <section className="missions-section">
      <div className="container">
        <h2 className="section-title">LES MISSIONS DE NOTRE ASSOCIATION AUPRÈS DES AÎNÉS</h2>
        <div className="missions-grid">
          {missions.map((mission, index) => (
            <div key={index} className="mission-card">
              <div className="mission-image" style={{ backgroundImage: `url(${mission.image})` }}>
                <div className="mission-overlay">
                  <div className="mission-content">
                    <h3 className="mission-title">{mission.title}</h3>
                    <p className="mission-description">{mission.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .missions-section {
          padding: 4rem 1rem;
          background: #f8fafc;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          text-align: center;
          font-size: 2.25rem;
          font-weight: 700;
          margin: 2.5rem 0 3rem 0;
          color: #1e293b;
          letter-spacing: -0.025em;
        }
        
        .missions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .mission-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .mission-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .mission-image {
          height: 280px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .mission-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          border-left: 4px solid #60a5fa;
        }
        
        .mission-content {
          color: white;
        }
        
        .mission-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.75rem 0;
          letter-spacing: 0.025em;
        }
        
        .mission-description {
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
          opacity: 0.95;
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 1.875rem;
          }
          
          .missions-grid {
            grid-template-columns: 1fr;
          }
          
          .mission-image {
            height: 240px;
          }
        }
      `}</style>
    </section>
  );
};

export default MissionsSection;