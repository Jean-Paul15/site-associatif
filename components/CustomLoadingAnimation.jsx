'use client';
import React from 'react';

const CustomLoadingAnimation = () => {
  return (
    <div className="loading-container">
      {/* Cercles animés en arrière-plan */}
      <div className="background-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      
      {/* Animation principale avec logo/icône */}
      <div className="main-loader">
        <div className="pulse-ring"></div>
        <div className="center-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#gradient1)"/>
            <path d="M2 17L12 22L22 17" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 12L12 17L22 12" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6"/>
                <stop offset="100%" stopColor="#10B981"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Barres de progression ondulantes */}
      <div className="wave-bars">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      
      {/* Texte de chargement */}
      <div className="loading-text">
        <span>C</span><span>h</span><span>a</span><span>r</span><span>g</span><span>e</span><span>m</span><span>e</span><span>n</span><span>t</span>
      </div>
      
      {/* Particules flottantes */}
      <div className="particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      <style jsx>{`
        .loading-container {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #f1f5f9 70%, #ffffff 100%);
          overflow: hidden;
        }
        
        .loading-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
        }

        /* Cercles d'arrière-plan */
        .background-circles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .circle {
          position: absolute;
          border: 1px solid rgba(59, 130, 246, 0.15);
          border-radius: 50%;
          animation: rotate 20s linear infinite;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.1);
        }

        .circle-2 {
          width: 600px;
          height: 600px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-color: rgba(16, 185, 129, 0.15);
          animation-direction: reverse;
          animation-duration: 30s;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.08);
        }

        .circle-3 {
          width: 800px;
          height: 800px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-color: rgba(59, 130, 246, 0.1);
          animation-duration: 40s;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.05);
        }

        /* Animation principale */
        .main-loader {
          position: relative;
          margin-bottom: 40px;
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          border: 2px solid transparent;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #3B82F6, #10B981, #3B82F6);
          animation: spin 2s linear infinite;
        }

        .pulse-ring::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }

        .center-icon {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          animation: pulse 2s ease-in-out infinite;
        }

        /* Barres ondulantes */
        .wave-bars {
          display: flex;
          gap: 4px;
          margin-bottom: 30px;
          padding: 15px 20px;
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .bar {
          width: 4px;
          height: 20px;
          background: linear-gradient(to top, #3B82F6, #10B981);
          border-radius: 2px;
          animation: wave 1.5s ease-in-out infinite;
        }

        .bar:nth-child(2) { animation-delay: 0.1s; }
        .bar:nth-child(3) { animation-delay: 0.2s; }
        .bar:nth-child(4) { animation-delay: 0.3s; }
        .bar:nth-child(5) { animation-delay: 0.4s; }

        /* Texte animé */
        .loading-text {
          color: #1e40af;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 24px;
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.3);
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .loading-text span {
          display: inline-block;
          animation: textGlow 2s ease-in-out infinite;
        }

        .loading-text span:nth-child(1) { animation-delay: 0s; }
        .loading-text span:nth-child(2) { animation-delay: 0.1s; }
        .loading-text span:nth-child(3) { animation-delay: 0.2s; }
        .loading-text span:nth-child(4) { animation-delay: 0.3s; }
        .loading-text span:nth-child(5) { animation-delay: 0.4s; }
        .loading-text span:nth-child(6) { animation-delay: 0.5s; }
        .loading-text span:nth-child(7) { animation-delay: 0.6s; }
        .loading-text span:nth-child(8) { animation-delay: 0.7s; }
        .loading-text span:nth-child(9) { animation-delay: 0.8s; }
        .loading-text span:nth-child(10) { animation-delay: 0.9s; }

        /* Particules */
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(59, 130, 246, 0.6);
          border-radius: 50%;
          opacity: 0.7;
          backdrop-filter: blur(2px);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .particle-1 { top: 20%; left: 15%; animation: float 4s ease-in-out infinite; }
        .particle-2 { top: 30%; right: 20%; animation: float 5s ease-in-out infinite reverse; }
        .particle-3 { bottom: 25%; left: 25%; animation: float 6s ease-in-out infinite; }
        .particle-4 { bottom: 35%; right: 15%; animation: float 4.5s ease-in-out infinite reverse; }
        .particle-5 { top: 45%; left: 10%; animation: float 5.5s ease-in-out infinite; background: rgba(16, 185, 129, 0.6); box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3); }
        .particle-6 { top: 60%; right: 25%; animation: float 4.2s ease-in-out infinite reverse; background: rgba(16, 185, 129, 0.6); box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3); }
        .particle-7 { bottom: 15%; left: 40%; animation: float 5.8s ease-in-out infinite; background: rgba(59, 130, 246, 0.6); box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3); }
        .particle-8 { top: 25%; right: 40%; animation: float 4.8s ease-in-out infinite reverse; background: rgba(16, 185, 129, 0.6); box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3); }

        /* Animations */
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2.5); }
        }

        @keyframes textGlow {
          0%, 100% { 
            color: #1e40af; 
            text-shadow: 0 0 15px rgba(30, 64, 175, 0.4);
          }
          50% { 
            color: #059669; 
            text-shadow: 0 0 20px rgba(5, 150, 105, 0.6);
          }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-20px) scale(1.2); 
            opacity: 1;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .circle-1 { width: 250px; height: 250px; }
          .circle-2 { width: 350px; height: 350px; }
          .circle-3 { width: 450px; height: 450px; }
          
          .pulse-ring, .center-icon {
            width: 80px;
            height: 80px;
          }
          
          .loading-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomLoadingAnimation;