"use client";
import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <h1 className="hero-title">QUI SOMMES-NOUS ?</h1>
        <div className="breadcrumb">
          <Link href="/" className="breadcrumb-link">
            Accueil
          </Link>
        </div>
        <p className="hero-subtitle">
          Une personne âgée isolée est une personne en souffrance et,<br /> 
          pour nous, cette situation est inacceptable.
        </p>
      </div>
      
      <style jsx>{`
        .hero-section {
          padding: 4rem 1rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        
        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #1e293b;
          letter-spacing: -0.025em;
        }
        
        .breadcrumb {
          margin-bottom: 3rem;
        }
        
        .breadcrumb-link {
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .breadcrumb-link:hover {
          color: #334155;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: #64748b;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.25rem;
          }
          
          .hero-subtitle {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;