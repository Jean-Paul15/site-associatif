"use client";

import React from 'react';

const QuiSommesNousSection = () => {
  return (
    <>
      <style>{`
        body {
          background: #fafbfc;
          margin: 0;
          padding: 0;
        }

        .qui-sommes-nous-container {
          max-width: 1000px;
          margin: 3rem auto;
          padding: 0 1.5rem;
          font-family: 'Space Grotesk', sans-serif;
        }

        .qui-sommes-nous-content {
          position: relative;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        /* Layout asymétrique moderne */
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: auto auto;
          gap: 0;
          min-height: 320px;
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
          }
        }

        .text-section {
          grid-column: 1;
          grid-row: 1 / 3;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
          color: white;
          position: relative;
        }

        @media (max-width: 768px) {
          .text-section {
            grid-column: 1;
            grid-row: 1;
            padding: 2rem;
          }
        }

        /* Élément décoratif subtil */
        .text-section::after {
          content: '';
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 4px;
          height: 60px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }

        .text-section h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: white;
          letter-spacing: -0.01em;
        }

        .text-section p {
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
        }

        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          width: fit-content;
          transition: all 0.2s ease;
        }

        .cta-link:hover {
          border-bottom-color: rgba(255, 255, 255, 0.8);
          transform: translateX(2px);
        }

        .image-section {
          grid-column: 2;
          grid-row: 1;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .image-section {
            grid-column: 1;
            grid-row: 2;
            height: 200px;
          }
        }

        .image-section img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Section stats/info positionnée de manière asymétrique */
        .stats-section {
          grid-column: 2;
          grid-row: 2;
          background: #f8fafc;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 3px solid #60A5FA;
        }

        @media (max-width: 768px) {
          .stats-section {
            grid-column: 1;
            grid-row: 3;
            border-left: none;
            border-top: 3px solid #3b82f6;
          } /* Adjusted to keep a soft blue border */
        }

        .stats-number {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 0.25rem;
        } /* Color will be handled by global blue replacement */

        .stats-text {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
          line-height: 1.4;
        }

        /* Section sociale minimaliste */
        .social-section {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 2rem 1.5rem;
          text-align: center;
        }

        .social-section h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #3B82F6; /* Harmonized to a soft blue */
          margin-bottom: 2rem;
          letter-spacing: -0.01em;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .social-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: #f1f5f9;
          color: #64748b;
          transition: all 0.2s ease;
          border: 1px solid #e2e8f0;
        }

        .social-icons a:hover {
          background: #60A5FA; /* Harmonized to a soft blue */
          color: white;
          border-color: #60A5FA; /* Harmonized to a soft blue */
          transform: translateY(-1px);
        }

        .social-icons svg {
          width: 28px;
          height: 28px;
        }

        @media (max-width: 768px) {
          .qui-sommes-nous-container {
            margin: 2rem auto;
            padding: 0 1rem;
          }
          
          .text-section h2 {
            font-size: 1.25rem;
          }
          
          .text-section p {
            font-size: 0.85rem;
          }
          
          .social-icons {
            gap: 0.75rem;
          }
          
          .social-icons a {
            width: 64px;
            height: 64px;
          }
        }
      `}</style>
      
      <section className="qui-sommes-nous-container">
        <div className="qui-sommes-nous-content">
          <div className="content-grid">
            <div className="text-section">
              <h2>Qui sommes-nous ?</h2>
              <p>
                Depuis 1946, La Maison de Charlotte luttent contre l'isolement et la solitude des
                personnes âgées. Par nos actions, nous recréons des liens leur permettant de reprendre 
                goût à la vie.
              </p>
              <a href="#" className="cta-link">
                En savoir plus
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17l9.2-9.2M17 17V7H7"/>
                </svg>
              </a>
            </div>
            
            <div className="image-section">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Personne âgée souriante" 
              />
            </div>
            
            <div className="stats-section">
              <div className="stats-number">78</div>
              <div className="stats-text">ans d'engagement<br/>auprès des aînés</div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-section">
        <h3>Nous suivre</h3>
        <div className="social-icons">
          <a href="#" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" aria-label="X (Twitter)">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.772 1.667 4.92 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.252-1.667 4.771-4.92 4.919-1.266.058-1.645.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.252-.149-4.771-1.667-4.919-4.919-.058-1.265-.07-1.645-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.252 1.667-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.668.014-4.949.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.358-.2 6.78-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.199-4.358-2.618-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a href="#" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>
          <a href="#" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.9 3.488"/>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
};

export default QuiSommesNousSection;