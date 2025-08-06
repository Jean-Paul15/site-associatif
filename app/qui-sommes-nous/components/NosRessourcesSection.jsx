"use client";
import React from 'react';
import Link from 'next/link';

const NosRessourcesSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 font-space-grotesk">
      <h2 className="text-center text-3xl font-bold mt-10 mb-4">NOS RESSOURCES</h2>
      <p className="text-center text-gray-600 mb-8">
        Découvrez nos différentes ressources pour mieux comprendre l'isolement et comment agir.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="relative rounded-lg overflow-hidden shadow-lg bg-cover bg-center h-96" style={{ backgroundImage: 'url("/images/ressource1.jpg")' }}> {/* Replace with actual image path */}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Rapport sur l'isolement</h3>
            <p className="text-sm mb-4">
              Notre dernier rapport détaillé sur l'état de l'isolement des personnes âgées en France.
            </p>
            <Link href="/rapport" className="inline-block bg-white text-blue-800 font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors">
              EN SAVOIR PLUS
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative rounded-lg overflow-hidden shadow-lg bg-cover bg-center h-96" style={{ backgroundImage: 'url("/images/ressource2.jpg")' }}> {/* Replace with actual image path */}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Guide du bénévole</h3>
            <p className="text-sm mb-4">
              Un guide pratique pour tous ceux qui souhaitent s'engager à nos côtés.
            </p>
            <Link href="/guide-benevole" className="inline-block bg-white text-blue-800 font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors">
              EN SAVOIR PLUS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NosRessourcesSection;