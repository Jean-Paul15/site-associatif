"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Data for the carousel slides
const slides = [
  { 
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    text: "CET ÉTÉ, COMPOSEZ UN KIT VACANCES SOLIDAIRE POUR UN AÎNÉ ISOLÉ"
  },
  { 
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    text: "UN SÉJOUR INOUBLIABLE POUR DIX PERSONNES ÂGÉES À L'ABBAYE DE LA PRÉE"
  },
  { 
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbb563?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    text: "9 GESTES SIMPLES POUR COMBATTRE LA SOLITUDE DE NOS AÎNÉS"
  },
];

const App = () => {
  // State variables for carousel logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // State variables for drag/swipe functionality
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [draggedX, setDraggedX] = useState(0);
  const dragThreshold = 50; // Min pixels to drag to trigger a slide change

  // Refs for intervals
  const autoPlayIntervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const AUTO_PLAY_INTERVAL = 5000; // 5 seconds

  // Function to handle changing to a new slide
  const handleSlideChange = useCallback((newSlideIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setProgress(0);
    if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    setTimeout(() => {
      setCurrentSlide(newSlideIndex);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    const newIndex = (currentSlide + 1) % slides.length;
    handleSlideChange(newIndex);
  }, [currentSlide, handleSlideChange]);

  // Function to go to the previous slide
  const prevSlide = useCallback(() => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    handleSlideChange(newIndex);
  }, [currentSlide, handleSlideChange]);

  // Function to start autoplay
  const startAutoPlay = useCallback(() => {
    if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    setProgress(0);
    
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / (AUTO_PLAY_INTERVAL / 50)), 100));
    }, 50);

    autoPlayIntervalRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
  }, [nextSlide]);

  // Pause autoplay (used for hover and drag)
  const pauseAutoPlay = () => {
    setIsPaused(true);
    clearInterval(autoPlayIntervalRef.current);
    clearInterval(progressIntervalRef.current);
  };

  // Resume autoplay (used for hover)
  const resumeAutoPlay = () => {
    setIsPaused(false);
  };

  // --- Drag and Swipe Handlers ---
  
  // Helper to get clientX from both mouse and touch events
  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const handleDragStart = (e) => {
    // Don't prevent default for touch to allow scrolling on other parts of the page
    if (e.type === 'mousedown') e.preventDefault();
    
    setIsDragging(true);
    setDragStartX(getClientX(e));
    setDraggedX(0);
    pauseAutoPlay(); // Pause while user interacts
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = getClientX(e);
    const dx = currentX - dragStartX;
    setDraggedX(dx);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Check if drag distance exceeds the threshold
    if (draggedX < -dragThreshold) {
      nextSlide();
    } else if (draggedX > dragThreshold) {
      prevSlide();
    }
    
    // Snap back to original position
    setDraggedX(0);
  };
  
  // FIX: Combined handler for onMouseLeave to resolve duplicate key error
  const handleMouseLeave = () => {
    handleDragEnd(); // Ensure dragging state is reset
    resumeAutoPlay(); // Resume autoplay as intended on mouse leave
  };

  // useEffect to manage the autoplay lifecycle
  useEffect(() => {
    // Start autoplay only if not paused, not animating, and not being dragged
    if (!isPaused && !isAnimating && !isDragging) {
      startAutoPlay();
    }
    
    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, isAnimating, currentSlide, startAutoPlay, isDragging]);

  // Get data for current, previous, and next slides
  const currentItem = slides[currentSlide];
  const prevItem = slides[(currentSlide - 1 + slides.length) % slides.length];
  const nextItem = slides[(currentSlide + 1) % slides.length];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }

          .carousel-widget * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .carousel-widget .carousel-main-container {
            position: relative;
            width: 100%;
            height: 100vh;
            background-image: url("https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1600&h=1200&fit=crop");
            background-size: cover;
            background-position: center;
            overflow: hidden;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            /* Desktop: Position carousel lower to create 20% overlap */
            padding-top: 25vh;
            font-family: 'Inter', sans-serif;
          }

          .carousel-widget .carousel-gradient-overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(to right, rgba(128, 0, 128, 0.4) 0%, rgba(128, 0, 128, 0.2) 20%, transparent 50%, rgba(128, 0, 128, 0.2) 80%, rgba(128, 0, 128, 0.4) 100%);
          }

          .carousel-widget .carousel-container {
            position: relative;
            width: 90%;
            max-width: 480px;
            height: 60vh;
            max-height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
            cursor: grab;
            user-select: none; /* Prevent text selection while dragging */
            transition: transform 0.3s ease-out; /* For snap-back effect */
          }
          
          .carousel-widget .carousel-container.is-dragging {
              cursor: grabbing;
              transition: none; /* Disable transition while actively dragging */
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
          }

          /* Background cards - more visible and closer */
          .carousel-widget .carousel-card.carousel-behind-1 {
            width: 80%;
            height: 85%;
            transform: translate(-15%, -25%) rotate(-4deg) scale(0.85);
            filter: blur(1px);
            opacity: 0.9;
            z-index: 2;
            top: 50%;
            left: -5%;
          }
          
          /* Background cards - more visible and closer */
          .carousel-widget .carousel-card.carousel-behind-2 {
            width: 80%;
            height: 85%;
            transform: translate(15%, -25%) rotate(4deg) scale(0.85);
            filter: blur(1px);
            opacity: 0.9;
            z-index: 2;
            top: 50%;
            right: -5%;
          }

          .carousel-widget .carousel-card.carousel-main {
            width: 100%;
            height: 100%;
            transform: translate(0, 0) scale(1);
            filter: none;
            z-index: 5;
            opacity: 1;
          }

          .carousel-widget .carousel-card.carousel-is-animating {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }

          .carousel-widget .carousel-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            pointer-events: none; /* Prevent image's default drag behavior */
          }

          .carousel-widget .carousel-main-text {
            position: absolute;
            bottom: 1.5rem;
            left: 1.5rem;
            right: 1.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            color: white;
            text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
            line-height: 1.3;
          }

          .carousel-widget .carousel-nav-buttons {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }

          .carousel-widget .carousel-nav-button,
          .carousel-widget .carousel-progress-button {
            position: relative;
            background-color: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            transition: all 200ms ease;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          
          .carousel-widget .carousel-nav-button {
            width: 40px;
            height: 40px;
          }
          
          .carousel-widget .carousel-progress-button {
            width: 45px;
            height: 45px;
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
            font-size: 20px;
            color: #333;
          }
          
          .carousel-widget .carousel-progress-ring {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);
          }

          .carousel-widget .carousel-progress-ring-bg {
            fill: none;
            stroke: rgba(0, 0, 0, 0.1);
            stroke-width: 3;
          }

          .carousel-widget .carousel-progress-ring-fill {
            fill: none;
            stroke: #333;
            stroke-width: 3;
            stroke-linecap: round;
            transition: stroke-dasharray 0.1s linear;
          }

          .carousel-widget .carousel-play-pause-icon {
            font-size: 20px;
            color: #333;
            z-index: 1;
          }

          /* TABLET BREAKPOINT - Intermediate adjustments */
          @media (max-width: 1024px) {
            .carousel-widget .carousel-main-container { 
              padding-top: 20vh; 
            }
          }

          /* MOBILE RESPONSIVE ADJUSTMENTS */
          @media (max-width: 768px) {
            .carousel-widget .carousel-main-container { 
              /* Mobile: Reduce background height to 50% and center carousel */
              height: 50vh;
              padding-top: 0;
              align-items: center;
              justify-content: center;
              overflow: visible; /* Allow carousel to be fully visible */
            }
            
            .carousel-widget .carousel-container { 
              width: 85%; 
              max-width: 320px; 
              height: 35vh; 
              max-height: 250px; 
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
            
            .carousel-widget .carousel-play-pause-icon { 
              font-size: 18px; 
            }
          }

          @media (max-width: 480px) {
            .carousel-widget .carousel-main-container {
              height: 45vh; /* Further reduced height */
              padding-top: 0;
              align-items: center;
            }
            
            .carousel-widget .carousel-container { 
              height: 30vh; 
              max-height: 200px;
              width: 80%;
              max-width: 280px;
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
            className={`carousel-container ${isDragging ? 'is-dragging' : ''}`}
            style={{ transform: `translateX(${draggedX}px)` }}
            // Mouse events for dragging
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            // Touch events for swiping
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            // Hover and Leave events
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={handleMouseLeave} // FIX: Used the single, combined handler
          >
            <div 
              className="carousel-card carousel-behind-1" 
              style={{ backgroundImage: `url(${prevItem.image})` }}
            />
            <div 
              className="carousel-card carousel-behind-2" 
              style={{ backgroundImage: `url(${nextItem.image})` }}
            />
            
            <div className={`carousel-card carousel-main ${isAnimating ? 'carousel-is-animating' : ''}`}>
              <img 
                src={currentItem.image} 
                alt="Image du carrousel" 
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/480x400/cccccc/ffffff?text=Image+Not+Found'; }}
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
                  <svg className="carousel-progress-ring" width="100%" height="100%" viewBox="0 0 45 45">
                    <circle className="carousel-progress-ring-bg" cx="22.5" cy="22.5" r="18"/>
                    <circle
                      className="carousel-progress-ring-fill"
                      cx="22.5" cy="22.5" r="18"
                      strokeDasharray={`${(progress / 100) * (2 * Math.PI * 18)} ${2 * Math.PI * 18}`}
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