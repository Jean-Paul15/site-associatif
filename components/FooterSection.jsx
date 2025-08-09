"use client";

import Link from "next/link";
import { Mail, MapPin, Globe, HeartHandshake } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function FooterSection() {
  return (
    <>
      {/* Élément décoratif de séparation */}
      <div className="h-6 -mb-6 bg-gradient-to-t from-[#f1f5f9] to-transparent" />

      <footer className="bg-[#f1f5f9] text-gray-700 py-12 px-6 mt-16 shadow-lg rounded-t-3xl font-sans antialiased border-t border-blue-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* 1. Logo & Infos de contact */}
          <div>
            {/* Logo prévu ici */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-blue-800">La Maison de Charlotte</h3>
            </div>
            <p className="text-sm text-gray-600 flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              Libreville, Gabon
            </p>
            <p className="text-sm text-gray-600 flex items-center mb-2">
              <Mail className="h-4 w-4 mr-2" />
              contact@charlotte.org
            </p>
          </div>

          {/* 2. Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/qui-sommes-nous" className="hover:underline">Qui sommes-nous</Link></li>
              <li><Link href="/nos-actions" className="hover:underline">Nos actions</Link></li>
              <li><Link href="/j-agis" className="hover:underline">J'agis</Link></li>
              <li><Link href="/je-m-informe" className="hover:underline">Je m'informe</Link></li>
            </ul>
          </div>

          {/* 3. Réseaux sociaux */}
          <div>
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Suivez-nous</h4>
            <div className="flex space-x-4 items-center">
              <Link href="https://charlotte.org" target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5 text-gray-600 hover:text-blue-600" />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="h-5 w-5 text-gray-600 hover:text-blue-600" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-5 w-5 text-gray-600 hover:text-pink-500" />
              </Link>
              <Link href="/nos-actions" className="hover:text-red-600">
                <HeartHandshake className="h-5 w-5 text-gray-600 hover:text-red-500" />
              </Link>
            </div>
          </div>

          {/* 4. Bouton de don */}
          <div>
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Soutenir notre cause</h4>
            <Link
              href="/faire-un-don"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Faire un don
            </Link>
          </div>
        </div>

        {/* Footer Bas */}
        <div className="mt-12 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} La Maison de Charlotte. Tous droits réservés.
        </div>
      </footer>
    </>
  );
}
