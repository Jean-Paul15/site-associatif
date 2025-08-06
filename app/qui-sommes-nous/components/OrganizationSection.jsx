"use client";
import React from 'react';

const OrganizationSection = () => {
  const organizations = [
    {
      title: "L'ASSOCIATION",
      description: "Reconnue d'utilité publique, l'association lutte contre l'isolement des personnes âgées, au plus près de leurs besoins et sur leur lieu de vie, forte de ses 15 067 bénévoles.",
      image: "/images/organization1.jpg"
    },
    {
      title: "LES MAISONS",
      description: "L'Association de gestion des établissements de La Maison de Charlotte gère les maisons offrant des solutions d'accueil innovantes.",
      image: "/images/organization2.jpg"
    },
    {
      title: "LA FONDATION",
      description: "La Fondation de La Maison de Charlotte créée depuis 1977 agit auprès des personnes mal logées.",
      image: "/images/organization3.jpg"
    }
  ];

  return (
    <section className="organization-section">
      <div className="container">
        <h2 className="section-title">L'ORGANISATION DE LA MAISON DE CHARLOTTE</h2>
        <p className="section-subtitle">
          Les entités qui forment l'ensemble de La Maison de Charlotte adhèrent aux mêmes valeurs et luttent
          contre l'isolement de nos aînés, en priorité les plus démunis.
        </p>
        
        <div className="organizations-grid">
          {organizations.map((org, index) => (
            <div key={index} className="organization-card">
              <div className="card-image" style={{ backgroundImage: `url(${org.image})` }}>
                <div className="card-overlay">
                  <div className="card-content">
                    <h3 className="card-title">{org.title}</h3>
                    <p className="card-description">{org.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .organization-section {
          padding: 4rem 1rem;
          background: #ffffff;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          text-align: center;
          font-size: 2.25rem;
          font-weight: 700;
          margin: 2.5rem 0 1rem 0;
          color: #1e293b;
          letter-spacing: -0.025em;
        }
        
        .section-subtitle {
          text-align: center;
          color: #64748b;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .organizations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .organization-card {
          position: relative;
          border-radius: 12px 12px 12px 48px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .organization-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        .card-image {
          height: 320px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.2));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
        }
        
        .card-content {
          color: white;
        }
        
        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          letter-spacing: 0.025em;
        }
        
        .card-description {
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
          opacity: 0.95;
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 1.875rem;
          }
          
          .organizations-grid {
            grid-template-columns: 1fr;
          }
          
          .card-image {
            height: 280px;
          }
        }
      `}</style>
    </section>
  );
};

export default OrganizationSection;