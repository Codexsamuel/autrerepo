'use client';

import AdvancedSEO from '@/components/AdvancedSEO';
import { ArrowLeft, Calendar, CheckCircle, Clock, CreditCard, Lock, MapPin, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function TeleventeProspectionCheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    experience: '',
    objectives: '',
    paymentMethod: 'card'
  });

  const courseData = {
    title: 'Télévente & Prospection',
    duration: '32 heures',
    price: 499,
    originalPrice: 650,
    startDate: '2024-02-20',
    location: 'Paris & En ligne',
    maxStudents: 25,
    instructor: 'Samuel OBAM'
  };

  const benefits = [
    'Certification reconnue par l\'industrie',
    'Accès à vie au contenu',
    'Support personnalisé',
    'Réseau de professionnels',
    'Outils et templates inclus',
    'Suivi post-formation'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Traitement du paiement
      console.log('Paiement en cours...', formData);
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <>
      <AdvancedSEO
        title="Inscription Formation Télévente & Prospection - DL Solutions"
        description="Inscrivez-vous à notre formation Télévente & Prospection. Formulaire sécurisé et paiement en ligne."
        keywords="inscription, formation, télévente, prospection, paiement, DL Solutions"
        image="https://dlsolutions.com/images/formations/televente-prospection.jpg"
        url="https://dlsolutions.com/formations/televente-prospection/checkout"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/formations/televente-prospection" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la formation
              </Link>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span className={`text-sm ${step >= 1 ? 'text-green-600' : 'text-gray-500'}`}>Informations</span>
                </div>
                <div className="w-8 h-1 bg-gray-200 rounded"></div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span className={`text-sm ${step >= 2 ? 'text-green-600' : 'text-gray-500'}`}>Paiement</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Formulaire principal */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscription à la formation</h1>
                  <p className="text-gray-600 mb-8">Complétez vos informations pour finaliser votre inscription</p>

                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Prénom *
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nom *
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Téléphone *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Entreprise
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Poste
                            </label>
                            <input
                              type="text"
                              name="position"
                              value={formData.position}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expérience en télévente
                          </label>
                          <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Sélectionnez votre niveau</option>
                            <option value="debutant">Débutant (0-1 an)</option>
                            <option value="intermediaire">Intermédiaire (1-3 ans)</option>
                            <option value="avance">Avancé (3+ ans)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Objectifs de la formation
                          </label>
                          <textarea
                            name="objectives"
                            value={formData.objectives}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Décrivez vos objectifs et attentes..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Continuer vers le paiement
                        </button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                          <button
                            type="button"
                            onClick={goBack}
                            className="flex items-center text-gray-600 hover:text-gray-900"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour aux informations
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Méthode de paiement
                          </label>
                          <div className="space-y-3">
                            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                checked={formData.paymentMethod === 'card'}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                              />
                              <div className="ml-3 flex items-center">
                                <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                                <span className="text-sm font-medium text-gray-900">Carte bancaire</span>
                              </div>
                            </label>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de paiement</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Numéro de carte
                              </label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Date d'expiration
                                </label>
                                <input
                                  type="text"
                                  placeholder="MM/AA"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  CVV
                                </label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Lock className="w-4 h-4" />
                          <span>Paiement sécurisé par Stripe</span>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                          <Shield className="w-5 h-5 mr-2" />
                          Payer {courseData.price}€
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Récapitulatif</h2>
                  
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{courseData.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{courseData.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Début : {new Date(courseData.startDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{courseData.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Max {courseData.maxStudents} participants</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Prix de la formation</span>
                      <span className="text-gray-400 line-through">{courseData.originalPrice}€</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Réduction</span>
                      <span className="text-green-600">-{courseData.originalPrice - courseData.price}€</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>{courseData.price}€</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Ce qui est inclus</h4>
                    <div className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 