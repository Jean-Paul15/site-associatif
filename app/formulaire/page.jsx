'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Select from 'react-select';
import ReactCountryFlag from 'react-country-flag';
import Link from 'next/link';
import './formulaire.css';

export default function FormulairePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [formType, setFormType] = useState('don');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [errors, setErrors] = useState({});

    // Liste des pays avec indicatifs et codes
    const paysData = [
        // Pays africains
        { value: 'GA', label: 'Gabon', name: 'Gabon', dialCode: '+241' },
        { value: 'DZ', label: 'Algérie', name: 'Algérie', dialCode: '+213' },
        { value: 'AO', label: 'Angola', name: 'Angola', dialCode: '+244' },
        { value: 'BJ', label: 'Bénin', name: 'Bénin', dialCode: '+229' },
        { value: 'BW', label: 'Botswana', name: 'Botswana', dialCode: '+267' },
        { value: 'BF', label: 'Burkina Faso', name: 'Burkina Faso', dialCode: '+226' },
        { value: 'BI', label: 'Burundi', name: 'Burundi', dialCode: '+257' },
        { value: 'CM', label: 'Cameroun', name: 'Cameroun', dialCode: '+237' },
        { value: 'CV', label: 'Cap-Vert', name: 'Cap-Vert', dialCode: '+238' },
        { value: 'CF', label: 'République centrafricaine', name: 'République centrafricaine', dialCode: '+236' },
        { value: 'TD', label: 'Tchad', name: 'Tchad', dialCode: '+235' },
        { value: 'KM', label: 'Comores', name: 'Comores', dialCode: '+269' },
        { value: 'CG', label: 'République du Congo', name: 'République du Congo', dialCode: '+242' },
        { value: 'CD', label: 'République démocratique du Congo', name: 'République démocratique du Congo', dialCode: '+243' },
        { value: 'CI', label: 'Côte d\'Ivoire', name: 'Côte d\'Ivoire', dialCode: '+225' },
        { value: 'DJ', label: 'Djibouti', name: 'Djibouti', dialCode: '+253' },
        { value: 'EG', label: 'Égypte', name: 'Égypte', dialCode: '+20' },
        { value: 'GQ', label: 'Guinée équatoriale', name: 'Guinée équatoriale', dialCode: '+240' },
        { value: 'ER', label: 'Érythrée', name: 'Érythrée', dialCode: '+291' },
        { value: 'ET', label: 'Éthiopie', name: 'Éthiopie', dialCode: '+251' },
        { value: 'GM', label: 'Gambie', name: 'Gambie', dialCode: '+220' },
        { value: 'GH', label: 'Ghana', name: 'Ghana', dialCode: '+233' },
        { value: 'GN', label: 'Guinée', name: 'Guinée', dialCode: '+224' },
        { value: 'GW', label: 'Guinée-Bissau', name: 'Guinée-Bissau', dialCode: '+245' },
        { value: 'KE', label: 'Kenya', name: 'Kenya', dialCode: '+254' },
        { value: 'LS', label: 'Lesotho', name: 'Lesotho', dialCode: '+266' },
        { value: 'LR', label: 'Liberia', name: 'Liberia', dialCode: '+231' },
        { value: 'LY', label: 'Libye', name: 'Libye', dialCode: '+218' },
        { value: 'MG', label: 'Madagascar', name: 'Madagascar', dialCode: '+261' },
        { value: 'MW', label: 'Malawi', name: 'Malawi', dialCode: '+265' },
        { value: 'ML', label: 'Mali', name: 'Mali', dialCode: '+223' },
        { value: 'MR', label: 'Mauritanie', name: 'Mauritanie', dialCode: '+222' },
        { value: 'MU', label: 'Maurice', name: 'Maurice', dialCode: '+230' },
        { value: 'MA', label: 'Maroc', name: 'Maroc', dialCode: '+212' },
        { value: 'MZ', label: 'Mozambique', name: 'Mozambique', dialCode: '+258' },
        { value: 'NA', label: 'Namibie', name: 'Namibie', dialCode: '+264' },
        { value: 'NE', label: 'Niger', name: 'Niger', dialCode: '+227' },
        { value: 'NG', label: 'Nigeria', name: 'Nigeria', dialCode: '+234' },
        { value: 'RW', label: 'Rwanda', name: 'Rwanda', dialCode: '+250' },
        { value: 'ST', label: 'Sao Tomé-et-Principe', name: 'Sao Tomé-et-Principe', dialCode: '+239' },
        { value: 'SN', label: 'Sénégal', name: 'Sénégal', dialCode: '+221' },
        { value: 'SC', label: 'Seychelles', name: 'Seychelles', dialCode: '+248' },
        { value: 'SL', label: 'Sierra Leone', name: 'Sierra Leone', dialCode: '+232' },
        { value: 'SO', label: 'Somalie', name: 'Somalie', dialCode: '+252' },
        { value: 'ZA', label: 'Afrique du Sud', name: 'Afrique du Sud', dialCode: '+27' },
        { value: 'SS', label: 'Soudan du Sud', name: 'Soudan du Sud', dialCode: '+211' },
        { value: 'SD', label: 'Soudan', name: 'Soudan', dialCode: '+249' },
        { value: 'TZ', label: 'Tanzanie', name: 'Tanzanie', dialCode: '+255' },
        { value: 'TG', label: 'Togo', name: 'Togo', dialCode: '+228' },
        { value: 'TN', label: 'Tunisie', name: 'Tunisie', dialCode: '+216' },
        { value: 'UG', label: 'Ouganda', name: 'Ouganda', dialCode: '+256' },
        { value: 'ZM', label: 'Zambie', name: 'Zambie', dialCode: '+260' },
        { value: 'ZW', label: 'Zimbabwe', name: 'Zimbabwe', dialCode: '+263' },

        // Pays européens
        { value: 'FR', label: 'France', name: 'France', dialCode: '+33' },
        { value: 'DE', label: 'Allemagne', name: 'Allemagne', dialCode: '+49' },
        { value: 'IT', label: 'Italie', name: 'Italie', dialCode: '+39' },
        { value: 'ES', label: 'Espagne', name: 'Espagne', dialCode: '+34' },
        { value: 'GB', label: 'Royaume-Uni', name: 'Royaume-Uni', dialCode: '+44' },
        { value: 'NL', label: 'Pays-Bas', name: 'Pays-Bas', dialCode: '+31' },
        { value: 'BE', label: 'Belgique', name: 'Belgique', dialCode: '+32' },
        { value: 'CH', label: 'Suisse', name: 'Suisse', dialCode: '+41' },
        { value: 'AT', label: 'Autriche', name: 'Autriche', dialCode: '+43' },
        { value: 'PT', label: 'Portugal', name: 'Portugal', dialCode: '+351' },
        { value: 'PL', label: 'Pologne', name: 'Pologne', dialCode: '+48' },
        { value: 'SE', label: 'Suède', name: 'Suède', dialCode: '+46' },
        { value: 'NO', label: 'Norvège', name: 'Norvège', dialCode: '+47' },
        { value: 'DK', label: 'Danemark', name: 'Danemark', dialCode: '+45' },
        { value: 'FI', label: 'Finlande', name: 'Finlande', dialCode: '+358' },
    ];

    const [formData, setFormData] = useState({
        nom_complet: '',
        email: '',
        telephone: '+241 ',
        pays: paysData[0], // Gabon par défaut
        montant: '',
        message: ''
    });

    const [phonePrefix, setPhonePrefix] = useState('+241'); // Gabon par défaut

    // Récupérer le type depuis l'URL
    useEffect(() => {
        const type = searchParams.get('type');
        if (type === 'engagement' || type === 'don') {
            setFormType(type);
        }
    }, [searchParams]);

    // Gérer le compte à rebours après succès
    useEffect(() => {
        if (showSuccess && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (showSuccess && countdown === 0) {
            router.push('/');
        }
    }, [showSuccess, countdown, router]);

    // Composant pour les options du sélecteur de pays
    const CountryOption = ({ innerRef, innerProps, data }) => (
        <div ref={innerRef} {...innerProps} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <ReactCountryFlag countryCode={data.value} svg style={{ width: '20px', height: '15px', marginRight: '8px' }} />
            <span className="mr-2 text-gray-600">{data.dialCode}</span>
            <span>{data.label}</span>
        </div>
    );

    // Composant pour la valeur sélectionnée
    const CountryValue = ({ data }) => (
        <div className="flex items-center">
            <ReactCountryFlag countryCode={data.value} svg style={{ width: '20px', height: '15px', marginRight: '8px' }} />
            <span className="mr-2 text-gray-600">{data.dialCode}</span>
            <span>{data.label}</span>
        </div>
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Effacer l'erreur quand l'utilisateur tape
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleCountryChange = (selectedCountry) => {
        setFormData(prev => ({
            ...prev,
            pays: selectedCountry,
            telephone: selectedCountry.dialCode + ' ' // Commencer avec l'indicatif
        }));
        setPhonePrefix(selectedCountry.dialCode);

        if (errors.pays) {
            setErrors(prev => ({
                ...prev,
                pays: ''
            }));
        }
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value;

        // S'assurer que le numéro commence par l'indicatif
        if (!value.startsWith(phonePrefix)) {
            value = phonePrefix + ' ' + value.replace(/^\+?[\d\s\-]*/, '').trim();
        }

        setFormData(prev => ({
            ...prev,
            telephone: value
        }));

        if (errors.telephone) {
            setErrors(prev => ({
                ...prev,
                telephone: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nom_complet.trim()) {
            newErrors.nom_complet = 'Le nom complet est requis';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!formData.telephone.trim()) {
            newErrors.telephone = 'Le numéro de téléphone est requis';
        } else if (formData.telephone.length < 10) {
            newErrors.telephone = 'Numéro de téléphone trop court';
        }

        if (!formData.pays) {
            newErrors.pays = 'Le pays est requis';
        }

        if (formData.montant && isNaN(formData.montant)) {
            newErrors.montant = 'Le montant doit être un nombre valide';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const dataToSubmit = {
                nom_complet: formData.nom_complet,
                email: formData.email,
                telephone: formData.telephone,
                pays: formData.pays.name,
                montant: formData.montant ? parseFloat(formData.montant) : null,
                message: formData.message,
                est_engagement: formType === 'engagement'
            };

            const { data, error } = await supabase
                .from('formulaire_contact')
                .insert([dataToSubmit]);

            if (error) {
                throw error;
            }

            setShowSuccess(true);
            setCountdown(3); // Démarrer le compte à rebours de 3 secondes
            setFormData({
                nom_complet: '',
                email: '',
                telephone: '+241 ',
                pays: paysData[0], // Remettre Gabon par défaut
                montant: '',
                message: ''
            });
            setPhonePrefix('+241'); // Remettre l'indicatif Gabon

        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* En-tête */}
                <div className="text-center mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Retour à l'accueil
                        </Link>
                        <div className="flex-1"></div> {/* Spacer pour centrer le titre */}
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {formType === 'engagement' ? 'S\'engager avec nous' : 'Faire un don'}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {formType === 'engagement'
                            ? 'Rejoignez notre mission et contribuez au changement en Afrique'
                            : 'Votre générosité peut transformer des vies en Afrique'
                        }
                    </p>
                </div>

                {/* Message de succès */}
                {showSuccess && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <div className="font-medium">
                                    {formType === 'engagement'
                                        ? 'Merci pour votre engagement ! Nous vous contacterons bientôt.'
                                        : 'Merci pour votre don ! Nous vous contacterons pour finaliser le processus.'
                                    }
                                </div>
                                {countdown > 0 && (
                                    <div className="mt-1 text-sm">
                                        Redirection automatique vers l'accueil dans {countdown} seconde{countdown > 1 ? 's' : ''}...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Formulaire */}
                <div className="bg-white shadow-xl rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nom complet */}
                        <div>
                            <label htmlFor="nom_complet" className="block text-sm font-medium text-gray-700 mb-2">
                                Nom complet *
                            </label>
                            <input
                                type="text"
                                id="nom_complet"
                                name="nom_complet"
                                value={formData.nom_complet}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.nom_complet ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Entrez votre nom complet"
                            />
                            {errors.nom_complet && (
                                <p className="mt-1 text-sm text-red-600">{errors.nom_complet}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Adresse email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="votre.email@exemple.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Pays */}
                        <div>
                            <label htmlFor="pays" className="block text-sm font-medium text-gray-700 mb-2">
                                Pays *
                            </label>
                            <Select
                                instanceId="country-select"
                                value={formData.pays}
                                onChange={handleCountryChange}
                                options={paysData}
                                components={{
                                    Option: CountryOption,
                                    SingleValue: CountryValue
                                }}
                                placeholder="Sélectionnez votre pays"
                                isSearchable
                                className={`react-select ${errors.pays ? 'react-select-error' : ''}`}
                                classNamePrefix="react-select"
                            />
                            {errors.pays && (
                                <p className="mt-1 text-sm text-red-600">{errors.pays}</p>
                            )}
                        </div>

                        {/* Téléphone */}
                        <div>
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                                Numéro de téléphone *
                            </label>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handlePhoneChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.telephone ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder={`${phonePrefix} 12 34 56 78`}
                            />
                            {errors.telephone && (
                                <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
                            )}
                        </div>

                        {/* Montant (optionnel) */}
                        {formType === 'don' && (
                            <div>
                                <label htmlFor="montant" className="block text-sm font-medium text-gray-700 mb-2">
                                    Montant du don (optionnel)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="montant"
                                        name="montant"
                                        value={formData.montant}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.01"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.montant ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="0.00"
                                    />
                                    <span className="absolute right-3 top-3 text-gray-500">FCFA</span>
                                </div>
                                {errors.montant && (
                                    <p className="mt-1 text-sm text-red-600">{errors.montant}</p>
                                )}
                            </div>
                        )}

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Message (optionnel)
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                placeholder={
                                    formType === 'engagement'
                                        ? 'Parlez-nous de votre motivation et de vos compétences...'
                                        : 'Laissez-nous un message concernant votre don...'
                                }
                            />
                        </div>

                        {/* Bouton de soumission */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Envoi en cours...
                                </div>
                            ) : (
                                formType === 'engagement' ? 'Confirmer mon engagement' : 'Envoyer ma demande de don'
                            )}
                        </button>
                    </form>
                </div>

                {/* Note de sécurité */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p className="flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Vos informations sont sécurisées et ne seront utilisées que pour vous contacter concernant votre {formType}.
                    </p>
                </div>
            </div>
        </div>
    );
}
