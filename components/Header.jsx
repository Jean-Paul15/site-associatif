"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import homeContent from '../data/home-content.json';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logo_url, logo_alt, menu_links } = homeContent.header;
  const actionButtonBenevole = homeContent.header.action_buttons[0];
  const actionButtonDon = homeContent.header.action_buttons[1];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-8">
        <Link href="/" className="flex-shrink-0 max-w-[150px]">
          <Image
            src={logo_url}
            alt={logo_alt}
            width={150}
            height={50}
            style={{
              maxWidth: "40%", // max largeur égale à celle du parent
              height: "auto",   // garde la proportion
              objectFit: "contain"
            }}
            priority={true} // si tu veux que l'image charge vite au top
            unoptimized={false} // laisse Next.js optimiser l'image (default)
          />
        </Link>


        {/* Menu de navigation et boutons d'action sur grand écran */}
        <div className="hidden lg:flex flex-grow items-center justify-end space-x-8">
          {/* Menu de navigation */}
          <nav>
            <ul className="flex space-x-6">
              {menu_links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="text-gray-700 hover:text-[#3B82F6] font-semibold text-sm uppercase tracking-wide transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Boutons d'action */}
          <div className="flex items-center space-x-4">

            <Link
              href={actionButtonDon.url}
              className="flex items-center space-x-2 bg-[#22C55E] text-white rounded-full px-3 py-1.5 hover:bg-[#16A34A] transition-colors duration-200"
            >
              <Heart size={16} />
              <span className="font-semibold text-xs uppercase tracking-wide">{actionButtonDon.text}</span>
            </Link>
          </div>
        </div>

        {/* Bouton de menu burger (visible sur petit écran) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Ouvrir le menu de navigation"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 p-4">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image
                  src={logo_url}
                  alt={logo_alt}
                  width={150}
                  height={50}
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-700"
                aria-label="Fermer le menu de navigation"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>

            <nav className="flex flex-col space-y-6">
              <ul className="flex flex-col space-y-4">
                {menu_links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-xl font-bold uppercase tracking-wide text-gray-800 hover:text-[#3B82F6] transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  href={actionButtonDon.url}
                  className="flex items-center justify-center space-x-2 bg-[#22C55E] text-white rounded-full px-4 py-2 hover:bg-[#16A34A] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={16} />
                  <span className="font-semibold text-sm uppercase tracking-wide">{actionButtonDon.text}</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
