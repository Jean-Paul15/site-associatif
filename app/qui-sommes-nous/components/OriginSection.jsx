"use client";
import React from 'react';

const OriginSection = () => {
  return (
    <section className="origin-section">
      <div className="container">
        <div className="logo-container">
          <img src="/path/to/your/logo.png" alt="Logo La Maison de Charlotte" className="logo" />
        </div>
        <h2 className="section-title">L'ORIGINE DE LA MAISON DE CHARLOTTE</h2>
        
        <div className="content">
          <p className="paragraph">
            Armand Marquiset, fondateur de La Maison de Charlotte, était un homme en quête de sens. C'est à
            l'aube de la Seconde Guerre mondiale, après un long cheminement personnel et spirituel, qu'il décide de
            se mettre pleinement au service des Autres, puis en 1946 de créer l'Association. <strong>Son projet : mobiliser de
            jeunes hommes au service des plus pauvres. Et à la sortie de la guerre, les plus pauvres étaient les
            personnes âgées, manquant de tout.</strong>
          </p>
          
          <p className="paragraph">
            Le nom de l'Association porte le sens de sa motivation première: des hommes au service des pauvres.
            C'est dans ce contexte que les valeurs fondatrices de La Maison de Charlotte ont pris leurs racines : <strong>fraternité, fidélité, le sens de la
            fête et de la joie, le beau, l'audace, les fleurs avant le pain, des liens jusqu'au bout de la vie.</strong>
          </p>
          
          <p className="paragraph">
            Très vite, son souhait a été d'élever les La Maison de Charlotte au rang d'une congrégation religieuse :
            servir l'homme fragile c'était, pour lui, servir Dieu. Un souhait jamais réalisé. En effet, l'Église lui préconise
            de rester laïc afin de mobiliser plus largement les citoyens.
          </p>
          
          <p className="highlight">
            La Maison de Charlotte est sans appartenance politique ni confessionnelle.
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .origin-section {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          padding: 4rem 1rem;
          color: #374151;
        }
        
        .container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        
        .logo-container {
          margin-bottom: 2rem;
        }
        
        .logo {
          max-height: 80px;
          width: auto;
        }
        
        .section-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 3rem;
          color: #1e293b;
          letter-spacing: -0.025em;
        }
        
        .content {
          text-align: left;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .paragraph {
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          color: #374151;
        }
        
        .paragraph strong {
          color: #1e293b;
          font-weight: 600;
        }
        
        .highlight {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1d4ed8;
          text-align: center;
          margin-top: 2rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 1.875rem;
          }
          
          .content {
            text-align: left;
          }
          
          .paragraph {
            font-size: 0.95rem;
          }
          
          .highlight {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default OriginSection;