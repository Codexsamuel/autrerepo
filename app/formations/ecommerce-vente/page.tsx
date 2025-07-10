'use client';

import AdvancedSEO from '@/components/AdvancedSEO';
import { Award, Calendar, CheckCircle, Clock, CreditCard, Download, MapPin, MessageSquare, Package, Phone, Play, ShoppingCart, Star, Target, TrendingUp, Truck, Users } from 'lucide-react';
import { useState } from 'react';

export default function EcommerceVentePage() {
  const [activeTab, setActiveTab] = useState('programme');

  const courseData = {
    title: 'E-commerce & Vente en Ligne',
    subtitle: 'Créez et optimisez votre boutique en ligne pour maximiser vos ventes',
    duration: '36 heures',
    level: 'Débutant à Avancé',
    price: 649,
    originalPrice: 850,
    students: 89,
    rating: 4.8,
    reviews: 31,
    instructor: 'Marc Dubois',
    instructorTitle: 'Expert E-commerce & Growth Marketing',
    instructorImage: '/images/instructors/marc-dubois.jpg',
    startDate: '2024-03-10',
    location: 'Paris & En ligne',
    maxStudents: 30
  };

  const modules = [
    {
      id: 1,
      title: 'Fondamentaux E-commerce',
      duration: '6h',
      lessons: [
        'Écosystème e-commerce français',
        'Choix de la plateforme (Shopify, WooCommerce, PrestaShop)',
        'Architecture technique et hébergement',
        'Conformité légale (RGPD, CGV)',
        'Sécurité et paiements',
        'Intervenant : Marc Dubois'
      ]
    },
    {
      id: 2,
      title: 'Design & Expérience Utilisateur',
      duration: '8h',
      lessons: [
        'UX/UI pour e-commerce',
        'Optimisation des conversions',
        'Design responsive et mobile-first',
        'A/B testing et optimisation',
        'Accessibilité et performance',
        'Intervenant : UX Designer'
      ]
    },
    {
      id: 3,
      title: 'Gestion des Produits & Catalogue',
      duration: '6h',
      lessons: [
        'Optimisation des fiches produits',
        'Photographie et vidéo produits',
        'Gestion des stocks et variantes',
        'SEO produit et référencement',
        'Cross-selling et up-selling',
        'Intervenant : Product Manager'
      ]
    },
    {
      id: 4,
      title: 'Marketing & Acquisition',
      duration: '8h',
      lessons: [
        'Stratégie marketing e-commerce',
        'Google Shopping et Ads',
        'Réseaux sociaux et influence',
        'Email marketing et automation',
        'Affiliation et partenariats',
        'Intervenant : Marketing Specialist'
      ]
    },
    {
      id: 5,
      title: 'Logistique & Service Client',
      duration: '4h',
      lessons: [
        'Gestion des commandes',
        'Logistique et expédition',
        'Service client et SAV',
        'Gestion des retours',
        'Fidélisation client',
        'Intervenant : Operations Manager'
      ]
    },
    {
      id: 6,
      title: 'Analytics & Optimisation',
      duration: '4h',
      lessons: [
        'Google Analytics E-commerce',
        'KPIs et métriques clés',
        'Optimisation des performances',
        'Scaling et croissance',
        'Intervenant : Marc Dubois'
      ]
    }
  ];

  const benefits = [
    'Certification reconnue par l\'industrie',
    'Accès à vie au contenu',
    'Support personnalisé',
    'Réseau de professionnels',
    'Outils et templates inclus',
    'Suivi post-formation',
    'Projet pratique : création boutique'
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sophie Martin',
      company: 'Fondatrice, ModePlus',
      rating: 5,
      comment: 'Formation complète qui m\'a permis de lancer ma boutique en ligne. J\'ai doublé mes ventes en 6 mois !'
    },
    {
      id: 2,
      name: 'David Leroy',
      company: 'E-commerce Manager, TechStore',
      rating: 5,
      comment: 'Excellente formation, très pratique. Les outils fournis sont directement applicables.'
    },
    {
      id: 3,
      name: 'Julie Bernard',
      company: 'Freelance E-commerce',
      rating: 4,
      comment: 'Contenu riche et instructeur très compétent. J\'ai appris beaucoup sur l\'optimisation des conversions.'
    }
  ];

  const stats = [
    { label: 'Augmentation CA moyen', value: '+120%', icon: TrendingUp },
    { label: 'Amélioration conversion', value: '+35%', icon: Target },
    { label: 'ROI formation', value: '350%', icon: ShoppingCart },
    { label: 'Taux de satisfaction', value: '96%', icon: Star }
  ];

  const platforms = [
    { name: 'Shopify', icon: ShoppingCart, description: 'Plateforme e-commerce' },
    { name: 'WooCommerce', icon: Package, description: 'Solution WordPress' },
    { name: 'PrestaShop', icon: Truck, description: 'E-commerce open source' },
    { name: 'Stripe', icon: CreditCard, description: 'Paiements sécurisés' },
    { name: 'Mailchimp', icon: MessageSquare, description: 'Email marketing' },
    { name: 'Google Analytics', icon: TrendingUp, description: 'Analytics avancés' }
  ];

  const handleEnrollment = () => {
    window.location.href = '/formations/ecommerce-vente/inscription';
  };

  return (
    <>
      <AdvancedSEO
        title="Formation E-commerce & Vente en Ligne - DL Solutions"
        description="Créez et optimisez votre boutique en ligne avec notre formation complète. Plateformes, marketing, logistique et analytics."
        keywords="e-commerce, boutique en ligne, formation, vente, Shopify, WooCommerce, marketing digital, DL Solutions"
        image="https://dlsolutions.com/images/instructors/marc-dubois.jpg"
        url="https://dlsolutions.com/formations/ecommerce-vente"
        type="course"
        organization={{
          name: 'DL Solutions',
          logo: 'https://dlsolutions.com/images/logo.png',
          url: 'https://dlsolutions.com',
          description: 'Solutions digitales innovantes pour entreprises'
        }}
        breadcrumbs={[
          { name: 'Accueil', url: 'https://dlsolutions.com' },
          { name: 'Formations', url: 'https://dlsolutions.com/formations' },
          { name: 'E-commerce & Vente', url: 'https://dlsolutions.com/formations/ecommerce-vente' }
        ]}
        course={{
          name: 'E-commerce & Vente en Ligne',
          description: 'Créez et optimisez votre boutique en ligne pour maximiser vos ventes',
          provider: 'DL Solutions',
          instructor: 'Marc Dubois',
          duration: '36 heures',
          price: '649',
          currency: 'EUR'
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <ShoppingCart className="w-8 h-8 mr-3" />
                <span className="text-lg font-medium">Formation Certifiante</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">{courseData.title}</h1>
              <p className="text-xl opacity-90 mb-8">{courseData.subtitle}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{courseData.students} participants</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  <span>{courseData.rating}/5 ({courseData.reviews} avis)</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  <span>Certification incluse</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-lg mb-8">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab('programme')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'programme'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Programme
                    </button>
                    <button
                      onClick={() => setActiveTab('instructeur')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'instructeur'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Instructeur
                    </button>
                    <button
                      onClick={() => setActiveTab('avis')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'avis'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Avis
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'programme' && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Programme de la formation</h3>
                      <div className="space-y-6">
                        {modules.map(module => (
                          <div key={module.id} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-semibold text-gray-900">
                                Module {module.id} : {module.title}
                              </h4>
                              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {module.duration}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {module.lessons.map((lesson, index) => (
                                <li key={index} className="flex items-center text-gray-600">
                                  <Play className="w-4 h-4 mr-3 text-blue-500" />
                                  {lesson}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'instructeur' && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Votre formateur principal</h3>
                      <div className="flex items-start space-x-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {courseData.instructor.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{courseData.instructor}</h4>
                          <p className="text-blue-600 font-medium mb-4">{courseData.instructorTitle}</p>
                          <p className="text-gray-600 mb-4">
                            Expert e-commerce avec plus de 8 ans d'expérience dans la création et l'optimisation de boutiques en ligne. Marc a accompagné plus de 150 entreprises dans leur transformation digitale et généré plus de 50M€ de chiffre d'affaires.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-900">Expertise :</span>
                              <p className="text-gray-600">E-commerce, Growth Marketing, Analytics</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">Intervenants :</span>
                              <p className="text-gray-600">Experts spécialisés par module</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'avis' && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Avis des participants</h3>
                      <div className="space-y-6">
                        {testimonials.map(testimonial => (
                          <div key={testimonial.id} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                <p className="text-sm text-gray-600">{testimonial.company}</p>
                              </div>
                              <div className="flex items-center">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Avantages */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ce qui est inclus</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plateformes incluses */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Plateformes et outils inclus</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {platforms.map((platform, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <platform.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">{platform.name}</h4>
                      <p className="text-sm text-gray-600">{platform.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projet pratique */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Projet pratique certifiant</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Créez votre boutique e-commerce complète</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Objectifs :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Boutique fonctionnelle</li>
                        <li>• Catalogue produits optimisé</li>
                        <li>• Stratégie marketing</li>
                        <li>• Plan de croissance</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Livrables :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Boutique en ligne</li>
                        <li>• Document stratégique</li>
                        <li>• Présentation finale</li>
                        <li>• Certification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{courseData.price}€</div>
                  <div className="text-gray-400 line-through">{courseData.originalPrice}€</div>
                  <div className="text-sm text-gray-600">Économisez {courseData.originalPrice - courseData.price}€</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-3" />
                    <span>Début : {new Date(courseData.startDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3" />
                    <span>{courseData.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-3" />
                    <span>Max {courseData.maxStudents} participants</span>
                  </div>
                </div>

                <button
                  onClick={handleEnrollment}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
                >
                  S'inscrire maintenant
                </button>

                <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le programme
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Besoin d'aide ?</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>+33 1 23 45 67 89</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span>formations@dlsolutions.com</span>
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