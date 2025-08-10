"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function DevisPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    service: '',
    description: '',
    budget: '',
    timeline: '',
    additionalInfo: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Intelligence Artificielle',
    'Développement Web',
    'Transformation Digitale',
    'Formation',
    'Consulting',
    'Autre'
  ];

  const budgets = [
    'Moins de 5 000€',
    '5 000€ - 15 000€',
    '15 000€ - 50 000€',
    'Plus de 50 000€',
    'À discuter'
  ];

  const timelines = [
    'Immédiat',
    '1-3 mois',
    '3-6 mois',
    '6-12 mois',
    'Plus d\'un an'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStep(3);
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (submitted && step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Demande de devis envoyée !
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Merci pour votre demande. Notre équipe vous recontactera dans les 24h pour discuter de votre projet.
            </p>
            <div className="space-y-4">
              <Link href="/">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                  ← Retour à l'accueil
                </button>
              </Link>
              <Link href="/contact">
                <button className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                  Nous contacter
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Demander un Devis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Décrivez votre projet et recevez une proposition personnalisée de nos experts
          </p>
        </div>

        {/* Étapes */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${
              step >= 2 ? 'bg-blue-600' : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'
            }`}>
              2
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">
              {step === 1 ? 'Informations de contact' : 'Détails du projet'}
            </h2>
            <p className="text-gray-600">
              {step === 1 ? 'Commençons par vos coordonnées' : 'Décrivez votre projet en détail'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'entreprise *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre entreprise"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du contact *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service souhaité *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description du projet *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget estimé
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez une fourchette</option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Délai souhaité
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez un délai</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Informations complémentaires
                  </label>
                  <textarea
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Autres détails, questions, contraintes particulières..."
                  />
                </div>
              </div>
            )}

            {/* Boutons de navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Précédent
                </button>
              )}
              
              {step < 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Suivant →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitted}
                  className="ml-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {submitted ? 'Envoi en cours...' : 'Envoyer la demande'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Pourquoi choisir DL Solutions ?
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <span className="mr-2 text-blue-600">📄</span>
                Devis gratuit et détaillé
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2 text-green-600">🧮</span>
                Estimation précise des coûts
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2 text-purple-600">✓</span>
                Réponse sous 24h
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
