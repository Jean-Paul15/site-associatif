import { Suspense } from 'react';

export const metadata = {
    title: 'Formulaire de Contact - La Maison de Charlotte',
    description: 'Rejoignez-nous dans notre mission ou faites un don pour soutenir les personnes âgées en Afrique.',
    keywords: 'don, engagement, bénévolat, personnes âgées, Afrique, formulaire',
};

export default function FormulaireLayout({ children }) {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>}>
            {children}
        </Suspense>
    );
}
