"use client";

import React, { useState, useEffect, useRef } from 'react';

const slides = [
  { 
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    text: "CET ÉTÉ, COMPOSEZ UN KIT VACANCES SOLIDAIRE POUR UN AÎNÉ ISOLÉ"
  },
  { 
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    text: "UN SÉJOUR INOUBLIABLE POUR DIX PERSONNES ÂGÉES À L'ABBAYE DE LA PRÉE"
  },
  { 
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    text: "9 GESTES SIMPLES POUR COMBATTRE LA SOLITUDE DE NOS AÎNÉS"
  },
];

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const containerRef = useRef(null);

  const AUTO_PLAY_INTERVAL = 5000;

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    setProgress(0);
    
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (AUTO_PLAY_INTERVAL / 50));
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      if (!isPaused && !isDragging) {
        nextSlide();
      }
    }, AUTO_PLAY_INTERVAL);
  };

  const pauseAutoPlay = () => {
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const resumeAutoPlay = () => {
    setIsPaused(false);
    startAutoPlay();
  };

  useEffect(() => {
    if (!isDragging) {
      startAutoPlay();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentSlide, isPaused, isDragging]);

  const handleSlideChange = (newSlideIndex) => {
    setIsAnimating(true);
    setProgress(0);
    setTimeout(() => {
      setCurrentSlide(newSlideIndex);
      setIsAnimating(false);
    }, 300);
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    handleSlideChange(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    handleSlideChange(newIndex);
  };

  // Gestion du drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    pauseAutoPlay();
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    pauseAutoPlay();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault(); // Empêche le scroll de la page
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    
    // Privilégier le mouvement horizontal
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffset({ x: deltaX, y: deltaY * 0.3 });
    } else {
      setDragOffset({ x: deltaX * 0.3, y: deltaY });
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const threshold = 80; // Seuil plus bas pour une meilleure réactivité
    
    // Swipe vers la droite = carte précédente
    if (dragOffset.x > threshold) {
      prevSlide();
    } 
    // Swipe vers la gauche = carte suivante
    else if (dragOffset.x < -threshold) {
      nextSlide();
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    
    setTimeout(() => {
      if (!isPaused) {
        resumeAutoPlay();
      }
    }, 300);
  };

  const handleMouseLeaveOrEnd = (e) => {
    // Handle both mouse leave and drag end scenarios
    if (isDragging) {
      handleDragEnd();
    } else if (!isPaused) {
      resumeAutoPlay();
    }
  };

  const currentItem = slides[currentSlide];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }

          .carousel-widget * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none;
          }

          .carousel-widget .carousel-main-container {
            position: relative;
            width: 100%;
            height: 100vh;
            background-image: url("https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
            background-size: cover;
            background-position: center;
            overflow: hidden;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 12vh;
            border-radius: 0 0 2rem 2rem;
          }

          .carousel-widget .carousel-gradient-overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(to right, rgba(128, 0, 128, 0.4) 0%, rgba(128, 0, 128, 0.2) 20%, transparent 50%, rgba(128, 0, 128, 0.2) 80%, rgba(128, 0, 128, 0.4) 100%);
            border-radius: 0 0 2rem 2rem;
          }

          .carousel-widget .carousel-container {
            position: relative;
            width: 90%;
            max-width: 700px;
            height: 70vh;
            max-height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
            cursor: grab;
          }

          .carousel-widget .carousel-container.dragging {
            cursor: grabbing;
          }

          .carousel-widget .carousel-card {
            position: absolute;
            border-radius: 1.5rem;
            overflow: hidden;
            box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.3);
            transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            display: flex;
            align-items: center;
            justify-content: center;
            touch-action: none;
          }

          .carousel-widget .carousel-card.carousel-behind-2 {
            width: 85%;
            height: 85%;
            transform: translate(8%, -25%) rotate(4deg) scale(0.85);
            filter: blur(2px);
            opacity: 0.7;
            z-index: 2;
            top: 50%;
            right: 0%;
          }

          .carousel-widget .carousel-card.carousel-behind-1 {
            width: 85%;
            height: 85%;
            transform: translate(-8%, -25%) rotate(-4deg) scale(0.85);
            filter: blur(2px);
            opacity: 0.7;
            z-index: 2;
            top: 50%;
            left: 0%;
          }

          .carousel-widget .carousel-card.carousel-main {
            width: 100%;
            height: 100%;
            transform: translate(0, 0) scale(1);
            filter: none;
            z-index: 5;
            opacity: 1;
          }

          .carousel-widget .carousel-card.carousel-main.dragging {
            transition: none;
          }

          .carousel-widget .carousel-card.carousel-is-animating {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }

          .carousel-widget .carousel-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            pointer-events: none;
          }

          .carousel-widget .carousel-main-text {
            position: absolute;
            bottom: 1.5rem;
            left: 1.5rem;
            right: 1.5rem;
            font-size: 1.2rem;
            font-weight: 600;
            color: white;
            text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
            line-height: 1.3;
            pointer-events: none;
          }

          .carousel-widget .carousel-nav-buttons {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            display: flex;
            gap: 0.5rem;
            align-items: center;
            z-index: 10;
          }

          .carousel-widget .carousel-nav-button {
            background-color: rgba(255, 255, 255, 0.95);
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            transition: all 200ms ease;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: auto;
          }

          .carousel-widget .carousel-nav-button:hover {
            background-color: white;
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          }

          .carousel-widget .carousel-nav-button:active {
            transform: scale(0.95);
          }

          .carousel-widget .carousel-nav-button .material-symbols-outlined {
            font-size: 22px;
            color: #333;
          }

          .carousel-widget .carousel-progress-button {
            position: relative;
            background-color: rgba(255, 255, 255, 0.95);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 200ms ease;
            pointer-events: auto;
          }

          .carousel-widget .carousel-progress-button:hover {
            background-color: white;
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          }

          .carousel-widget .carousel-progress-ring {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 46px;
            height: 46px;
            transform: rotate(-90deg);
            pointer-events: none;
          }

          .carousel-widget .carousel-progress-ring-bg {
            fill: none;
            stroke: rgba(0, 0, 0, 0.1);
            stroke-width: 2;
          }

          .carousel-widget .carousel-progress-ring-fill {
            fill: none;
            stroke: #6b46c1;
            stroke-width: 2;
            stroke-linecap: round;
            transition: stroke-dasharray 0.1s ease;
          }

          .carousel-widget .carousel-play-pause-icon {
            font-size: 20px;
            color: #333;
            z-index: 1;
            pointer-events: none;
          }

          /* Desktop - écrans larges */
          @media (min-width: 1024px) {
            .carousel-widget .carousel-container {
              max-width: 800px;
              height: 75vh;
              max-height: 600px;
            }
            
            .carousel-widget .carousel-main-text {
              font-size: 1.3rem;
            }
            
            .carousel-widget .carousel-nav-button {
              width: 50px;
              height: 50px;
            }
            
            .carousel-widget .carousel-nav-button .material-symbols-outlined {
              font-size: 24px;
            }
            
            .carousel-widget .carousel-progress-button {
              width: 55px;
              height: 55px;
            }

            .carousel-widget .carousel-progress-ring {
              width: 51px;
              height: 51px;
            }
            
            .carousel-widget .carousel-play-pause-icon {
              font-size: 22px;
            }
          }

          /* Mobile et tablette */
          @media (max-width: 768px) {
            .carousel-widget .carousel-main-container {
              height: 60vh;
              padding-top: 8vh;
              border-radius: 0 0 1.5rem 1.5rem;
            }
            
            .carousel-widget .carousel-gradient-overlay {
              border-radius: 0 0 1.5rem 1.5rem;
            }
            
            .carousel-widget .carousel-container {
              width: 95%;
              max-width: 350px;
              height: 45vh;
              max-height: 300px;
            }

            .carousel-widget .carousel-card.carousel-behind-2 {
              transform: translate(6%, -25%) rotate(4deg) scale(0.85);
              right: 0%;
            }

            .carousel-widget .carousel-card.carousel-behind-1 {
              transform: translate(-6%, -25%) rotate(-4deg) scale(0.85);
              left: 0%;
            }

            .carousel-widget .carousel-main-text {
              font-size: 0.95rem;
              bottom: 1rem;
              left: 1rem;
              right: 1rem;
            }

            .carousel-widget .carousel-nav-buttons {
              bottom: 0.75rem;
              right: 0.75rem;
              gap: 0.4rem;
            }

            .carousel-widget .carousel-nav-button {
              width: 35px;
              height: 35px;
            }

            .carousel-widget .carousel-nav-button .material-symbols-outlined {
              font-size: 18px;
            }

            .carousel-widget .carousel-progress-button {
              width: 38px;
              height: 38px;
            }

            .carousel-widget .carousel-progress-ring {
              width: 34px;
              height: 34px;
            }
            
            .carousel-widget .carousel-play-pause-icon {
              font-size: 16px;
            }
          }

          @media (max-width: 480px) {
            .carousel-widget .carousel-main-container {
              height: 50vh;
              padding-top: 6vh;
            }
            
            .carousel-widget .carousel-container {
              height: 40vh;
              max-height: 250px;
            }

            .carousel-widget .carousel-main-text {
              font-size: 0.85rem;
            }
          }
        `}
      </style>

      <div className="carousel-widget">
        <div className="carousel-main-container">
          <div className="carousel-gradient-overlay"></div>
          <div 
            ref={containerRef}
            className={`carousel-container ${isDragging ? 'dragging' : ''}`}
            onMouseEnter={() => !isDragging && pauseAutoPlay()}
            onMouseLeave={handleMouseLeaveOrEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
          >
            <div 
              className="carousel-card carousel-behind-1" 
              style={{ 
                backgroundImage: `url(${slides[(currentSlide - 1 + slides.length) % slides.length].image})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div 
              className="carousel-card carousel-behind-2" 
              style={{ 
                backgroundImage: `url(${slides[(currentSlide + 1) % slides.length].image})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div 
              className={`carousel-card carousel-main ${isAnimating ? 'carousel-is-animating' : ''} ${isDragging ? 'dragging' : ''}`}
              style={{
                transform: isDragging 
                  ? `translate(${dragOffset.x}px, ${dragOffset.y * 0.3}px) rotate(${dragOffset.x * 0.15}deg) scale(${1 - Math.abs(dragOffset.x) * 0.0008})`
                  : undefined,
                opacity: isDragging ? Math.max(0.7, 1 - Math.abs(dragOffset.x) * 0.002) : 1
              }}
            >
              <img 
                src={currentItem.image} 
                alt="Image du carrousel" 
              />
              <div className="carousel-main-text">
                {currentItem.text}
              </div>
              <div className="carousel-nav-buttons">
                <button onClick={prevSlide} className="carousel-nav-button">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                
                <button 
                  onClick={isPaused ? resumeAutoPlay : pauseAutoPlay}
                  className="carousel-progress-button"
                >
                  <svg className="carousel-progress-ring" viewBox="0 0 46 46">
                    <circle
                      className="carousel-progress-ring-bg"
                      cx="23"
                      cy="23"
                      r="20"
                    />
                    <circle
                      className="carousel-progress-ring-fill"
                      cx="23"
                      cy="23"
                      r="20"
                      strokeDasharray={`${(progress / 100) * 125.66} 125.66`}
                    />
                  </svg>
                  <span className="material-symbols-outlined carousel-play-pause-icon">
                    {isPaused ? 'play_arrow' : 'pause'}
                  </span>
                </button>
                
                <button onClick={nextSlide} className="carousel-nav-button">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;