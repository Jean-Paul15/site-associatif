"use client";

import React, { useState } from 'react';

function NewsletterSection() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for form submission (e.g., API call)
        console.log("Subscription with email:", email);
    };

    return (
        <>
            <style>
                {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(210, 63, 87, 0.4);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(210, 63, 87, 0);
            }
          }
          
          .newsletter-container { /* Applying a soft blue background */
            background-color: rgba(42, 122, 226, 0.8);
            padding: 5rem 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .newsletter-card {
            background-color: #ffffff;
            border-radius: 1.2rem;
            box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.04);
            padding: 2.5rem;
            width: 100%;
            max-width: 42rem;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            animation: fadeInUp 0.8s ease-out;
          }
          .newsletter-card:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.08);
          }
          .newsletter-title {
            font-size: 1.5rem;
            line-height: 2rem;
            font-weight: 700;
            color: #1f2937;
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 2rem;
            letter-spacing: 0.025em;
            animation: fadeInUp 0.8s ease-out 0.2s both;
          }
          .newsletter-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            animation: fadeInUp 0.8s ease-out 0.4s both;
          }
          .form-elements {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          @media (min-width: 640px) {
            .form-elements {
              flex-direction: row;
            }
            .text-sm-left {
              text-align: left;
            }
            .justify-sm-start {
              justify-content: flex-start;
            }
          }
          .email-input {
            flex: 1;
            width: 100%;
            background-color: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 9999px;
            padding: 0.875rem 1.5rem;
            color: #374151;
            outline: none;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            animation: slideInLeft 0.6s ease-out 0.6s both;
            position: relative; /* Adding a subtle blue gradient on focus */
            overflow: hidden;
          }
          .email-input::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 120%; /* Increased width for better gradient effect */
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(42, 122, 226, 0.1), transparent);
            transition: left 0.6s ease;
          }
          .email-input:focus::before {
            left: 100%;
          }
          .email-input::placeholder {
            color: #6b7280;
            transition: all 0.3s ease;
          }
          .email-input:focus::placeholder {
            transform: translateY(-2px);
            opacity: 0.7;
          }
          .email-input:focus {
            border-color: #3B82F6; /* Using a soft blue for border on focus */
            box-shadow: 0 0 0 4px rgba(42, 122, 226, 0.15);
            transform: translateY(-2px) scale(1.01);
            background-color: #ffffff;
          } /* Replacing red gradient with a softened red */
          .submit-button {
 background-color: #10B981; /* Soft green background */
 color: #ffffff;
            font-weight: 700;
            border: none;
            border-radius: 9999px;
            padding: 0.875rem 2rem;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            outline: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            animation: slideInRight 0.6s ease-out 0.8s both;
          }
          .submit-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.6s ease;
          }
          .submit-button:hover::before {
            left: 100%;
          }
          .submit-button:hover {
 background-color: #34D399; /* Slightly darker soft green on hover */
 transform: translateY(-3px);
            box-shadow: 0 12px 24px -4px rgba(239, 68, 68, 0.4); /* Softened red shadow */
            animation: pulse 2s infinite;
          }
          .submit-button:active {
            transform: translateY(-1px) scale(1.02);
          }
          .submit-button:hover .arrow-icon {
            transform: translateX(4px) rotate(10deg);
          }
          .arrow-icon {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .info-text {
            font-size: 0.75rem;
            line-height: 1rem;
            color: #6b7280;
            margin-top: 0.5rem;
            text-align: center;
            animation: fadeInUp 0.8s ease-out 1s both;
            transition: all 0.3s ease;
          }
          .info-text:hover {
            color: #4b5563;
            transform: translateY(-1px);
          }
          @media (min-width: 640px) {
            .info-text {
              text-align: left;
            }
          }
          .info-link {
            text-decoration: underline;
            color: #4b5563;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            margin-left: 0.25rem;
            position: relative;
          }
          .info-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #3B82F6; /* Using a soft blue for underline */
            transition: width 0.3s ease;
          }
          .info-link:hover::after {
            width: 100%;
          }
          .info-link:hover {
            color: #1f2937;
            transform: translateY(-1px);
          }
        `}
            </style>
            <div className="newsletter-container">
                <div className="newsletter-card">
                    <h2 className="newsletter-title">
                        RECEVEZ PAR MAIL TOUTE L'ACTUALITÉ<br />LA MAISON DE CHARLOTTE
                    </h2>
                    <div className="newsletter-form">
                        <div className="form-elements">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Indiquez votre adresse mail"
                                className="email-input"
                                required />
                            <button
                                onClick={handleSubmit}
                                className="submit-button"
                            >
                                S'INSCRIRE
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        <p className="info-text">
                            Ces renseignements feront l'objet d'un traitement informatisé. Vous disposez d'un droit d'accès, de rectification, de suppression des données vous concernant.
                            <a href="#" className="info-link">Plus d'informations</a>.
                        </p>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default NewsletterSection;