"use client";

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import FooterSection from '../../components/FooterSection';
import NewsletterSection from '../../components/NewsletterSection';
import { Heart, User, Umbrella, Users, HandHeart, AlertCircle, Home } from 'lucide-react';

// Simple component for explaining donation uses
const DonExplanationBlock = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-4 text-center">
      <div className="mb-4 text-green-600">
        <Icon size={40} />
      </div>
      <h3 className="mb-3 text-lg font-semibold text-gray-800">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-700">
        {description}
      </p>
    </div>
  );
};

// Helper function for icon props (using Lucide React components)
const getIconComponent = (iconName) => {
  const icons = { Umbrella, Users, HandHeart, AlertCircle };
  return icons[iconName] || null;
};

// --- SocialSection component definition ---
const SocialSection = () => {
  return (
    <>
      <style jsx>{`
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
          color: #2563EB;
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
          background: #2563EB;
          color: white;
          border-color: #2563EB;
          transform: translateY(-1px);
        }

        .social-icons svg {
          width: 28px;
          height: 28px;
        }

        @media (max-width: 768px) {
          .social-icons {
            gap: 0.75rem;
          }

          .social-icons a {
            width: 64px;
            height: 64px;
          }
        }
      `}</style>

      <section className="social-section">
        <h3>Nous suivre</h3>
        <div className="social-icons">
          <a href="#" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="#" aria-label="X (Twitter)">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.772 1.667 4.92 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.252-1.667 4.771-4.92 4.919-1.266.058-1.645.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.252-.149-4.771-1.667-4.919-4.919-.058-1.265-.07-1.645-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.252 1.667-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.668.014-4.949.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.358-.2 6.78-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.199-4.358-2.618-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="#" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
          <a href="#" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.9 3.488" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
};

const JAgisPage = () => {
  return (
    <>
      <Header />
      <main className="j-agis-main">
        <div className="container px-4 py-8 mx-auto">
          {/* Introduction section */}
          <section className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl text-black">
              COMMENT AGIR POUR ROMPRE L'ISOLEMENT DE NOS AÎNÉS ?
            </h1>

            {/* Bouton Accueil */}
            <div className="mb-8">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 transition-colors hover:text-blue-700"
              >
                <Home size={16} />
                <span>Accueil</span>
              </a>
            </div>

            <p className="text-lg text-gray-700">
              Don, bénévolat, partenariat...<br />
              Découvrez tous les moyens de vous engager à nos côtés pour<br />
              lutter contre l'isolement des personnes âgées.
            </p>
          </section>

          {/* Actions sections (Donner, Bénévolat) */}
          <div className="flex justify-center gap-8 mb-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl">
              {/* Faire un don section */}
              <section className="flex flex-col items-center">
                <h2 className="mb-6 text-xl font-bold text-black">FAIRE UN DON</h2>
                <div className="w-80 max-w-sm overflow-hidden bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Personne âgée recevant de l'aide"
                      className="object-cover w-full h-40 transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col items-center p-5 text-center">
                    <p className="mb-6 text-sm leading-relaxed text-gray-700">
                      Votre générosité est le moteur de notre action. Avec votre soutien vous nous permettez de sortir de leur isolement, de la pauvreté et parfois même de la rue .
                    </p>
                    <Link href="/formulaire?type=don" className="flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5">
                      <Heart size={16} className="mr-2" />
                      DONNER MAINTENANT
                    </Link>
                  </div>
                </div>
              </section>

              {/* Donner du temps section (Bénévolat) */}
              <section className="flex flex-col items-center">
                <h2 className="mb-6 text-xl font-bold text-black">DONNER DU TEMPS</h2>
                <div className="w-80 max-w-sm overflow-hidden bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Groupe de bénévoles souriants"
                      className="object-cover w-full h-40 transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col items-center p-5 text-center">
                    <p className="mb-6 text-sm leading-relaxed text-gray-700">
                      Vous souhaitez vous engager dans une action de proximité ? Devenez bénévole et rejoignez l'une des 380 équipes locales La Maison de Charlotte.
                    </p>
                    <Link href="/formulaire?type=engagement" className="flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5">
                      <User size={16} className="mr-2" />
                      JE DEVIENS BÉNÉVOLE
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Section: A QUOI SERVENT VOS DONS */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
              A QUOI SERVENT VOS DONS
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <DonExplanationBlock
                icon={getIconComponent('Umbrella')}
                title="Offrir une présence à nos aînés isolés"
                description="Recréer et maintenir des liens est notre mission première, quels que soient la situation et le lieu de vie des aînés que nous accompagnons. Ainsi, vos dons permettent par exemple de louer des véhicules adaptés ou financer les kilomètres parcourus par les bénévoles pour effectuer des visites régulières à domicile, en hébergement collectif, à l'hôpital, pour offrir une présence aux personnes âgées isolées jusqu'aux coins les plus reculés de France."
              />
              <DonExplanationBlock
                icon={getIconComponent('Users')}
                title="Favoriser le lien social par des actions collectives"
                description="Pour lutter contre la solitude et l'isolement de nos aînés, La Maison de Charlotte créent également du lien social à travers des actions collectives. Séjour, fête de vacances, réveillons de fin d'année, sorties, nature, ateliers d'expression créative et artistique... Tous votre soutien financier nous ne pourrions pas organiser tous ces beaux moments qui permettent à nos aînés de retrouver la joie de vivre, faire de nouvelles rencontres et tisser des liens."
              />
              <DonExplanationBlock
                icon={getIconComponent('HandHeart')}
                title="Aider nos aînés face à la vulnérabilité"
                description="Soutenir les personnes âgées face aux différentes formes de vulnérabilité auxquelles elles peuvent être confrontées est aussi l'un des combats de La Maison de Charlotte. Par votre don, vous nous aidez par exemple à financer des hébergements d'urgence pour les personnes isolées, en habitat précaire, mal logées ou sans domicile fixe. Vous contribuez également aux aides matérielles et financières que l'Association apporte aux aînés les plus démunis."
              />
              <DonExplanationBlock
                icon={getIconComponent('AlertCircle')}
                title="Alerter et témoigner"
                description="En véritables lanceurs d'alerte, nous voulons faire entendre la parole des plus vulnérables, sensibiliser l'opinion et agir auprès des décideurs publics pour favoriser la mobilisation citoyenne contre l'isolement des personnes âgées. Votre soutien nous donne aussi les moyens financiers d'amplifier notre communication, afin d'être vus et écoutés par le plus grand nombre et que change enfin notre regard sur la vieillesse."
              />
            </div>
          </div>
        </section>

        {/* Section: CONTACTER LE SERVICE RELATIONS DONATEURS */}
        <section className="py-16 text-center" style={{ backgroundColor: '#2563EB' }}>
          <div className="container px-4 mx-auto">
            <h2 className="mb-4 text-3xl font-bold text-white">
              CONTACTER LE SERVICE RELATIONS DONATEURS
            </h2>
            <p className="mb-10 text-lg text-gray-200">
              Le service relations donateurs est disponible pour répondre à vos questions et pour vous<br />
              aider au mieux dans vos démarches.
            </p>
            <div className="flex flex-col items-center max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-row" style={{ border: '2px solid #10B981' }}>
              <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Service Relations Donateurs" className="object-cover w-full h-48 md:h-full" />
              </div>
              <div className="p-6 text-left md:w-1/2">
                <h3 className="mb-4 text-xl font-semibold">
                  Pour tous renseignements sur les dons :
                </h3>
                <p className="mb-2 text-gray-700">
                  Vous pouvez le contacter par e-mail à
                </p>
                <p className="mb-4 text-blue-600 hover:underline">
                  <a href="mailto:donateurs@lamaisondecharlotte.fr">donateurs@lamaisondecharlotte.fr</a>
                </p>
                <p className="text-gray-700">
                  Tel : 01 49 23 13 54
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Section déplacée ici */}
        <SocialSection />
        <NewsletterSection />
      </main>
      <FooterSection />
    </>
  );
};

export default JAgisPage;