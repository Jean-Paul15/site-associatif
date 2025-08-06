"use client";
import React from 'react';

const InternationalSection = () => {
  return (
    <section className="international-section">
      <div className="container">
        <div className="content-grid">
          <div className="image-column">
            <div className="image-container">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=faces" 
                alt="La Maison de Charlotte" 
                className="main-image"
              />
              <div className="image-badge">
                <div className="badge-icon">🌍</div>
                <span className="badge-text">Présence dans 10 pays</span>
              </div>
            </div>
          </div>

          <div className="text-column">
            <div className="text-content">
              <h2 className="section-title">
                LA MAISON DE CHARLOTTE À L'INTERNATIONAL
              </h2>
              <div className="title-underline"></div>
              
              <p className="section-text">
                Initiée en France par La Maison de Charlotte, la lutte contre l'isolement des personnes âgées s'est étendue à l'international. Aujourd'hui, la Fédération Internationale de La Maison de Charlotte est présente dans dix pays : Allemagne, Espagne, Irlande, Pologne, Suisse, Roumanie et en Amérique du Nord (États-Unis, Canada, Mexique).
              </p>
              
              <button className="cta-button">
                EN SAVOIR PLUS
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .international-section {
          padding: 4rem 1rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        
        .image-container {
          position: relative;
          border-radius: 12px 48px 48px 48px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .main-image {
          width: 100%;
          height: 320px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .image-container:hover .main-image {
          transform: scale(1.05);
        }
        
        .image-badge {
          position: absolute;
          bottom: 0;
          left: 0;
          background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
          color: white;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          border-top-right-radius: 12px;
          backdrop-filter: blur(10px);
          background-opacity: 0.9;
        }
        
        .badge-icon {
          font-size: 1.25rem;
          margin-right: 0.75rem;
        }
        
        .badge-text {
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.025em;
        }
        
        .text-content {
          padding: 1rem 0;
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }
        
        .title-underline {
          width: 4rem;
          height: 4px;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
          border-radius: 2px;
          margin-bottom: 2rem;
        }
        
        .section-text {
          color: #374151;
          line-height: 1.7;
          font-size: 1rem;
          margin-bottom: 2.5rem;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 2rem;
          border: 2px solid #d1d5db;
          border-radius: 50px;
          color: #374151;
          font-weight: 600;
          font-size: 0.9rem;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.025em;
        }
        
        .cta-button:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .section-title {
            font-size: 1.75rem;
            text-align: center;
          }
          
          .title-underline {
            margin: 1rem auto 2rem auto;
          }
          
          .main-image {
            height: 280px;
          }
          
          .text-content {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default InternationalSection;