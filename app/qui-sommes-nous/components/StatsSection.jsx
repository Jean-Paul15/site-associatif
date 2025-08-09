"use client";
import React from 'react';
import CountUp from './CountUp';

const StatsSection = () => {
  const stats = [
    { number: "26190", label: "PERSONNES AIDÉES" },
    { number: "400", label: "ÉQUIPES D'ACTION" },
    { number: "14500", label: "BÉNÉVOLES ENGAGÉS" },
    { number: "30", label: "MAISONS" }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <h2 className="section-title">NOS ACTIONS EN CHIFFRES</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <p className="stat-number">
                <CountUp
                  end={stat.number}
                  duration={2500}
                  prefix="+"
                  separator=" "
                  className="animated-number"
                />
              </p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          padding: 4rem 1rem;
          color: white;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 3rem;
          letter-spacing: 0.025em;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          align-items: center;
        }
        
        .stat-item {
          padding: 1rem;
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          color: #fbbf24;
        }
        
        .stat-label {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0;
          letter-spacing: 0.05em;
          opacity: 0.95;
        }
        
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .stat-label {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;