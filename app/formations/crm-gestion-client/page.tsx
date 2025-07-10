'use client';

import AdvancedSEO from '@/components/AdvancedSEO';
import { Award, BarChart3, Building, Calendar, CheckCircle, Clock, Download, MapPin, MessageSquare, Phone, Play, Star, Target, TrendingUp, Users, Users2, Zap } from 'lucide-react';
import { useState } from 'react';

export default function CRMGestionClientPage() {
  const [activeTab, setActiveTab] = useState('programme');

  const courseData = {
    title: 'CRM & Gestion Client',
    subtitle: 'Optimisez votre relation client et maximisez la valeur de votre portefeuille',
    duration: '38 heures',
    level: 'Débutant à Avancé',
    price: 699,
    originalPrice: 900,
    students: 73,
    rating: 4.8,
    reviews: 28,
    instructor: 'Laurent Dubois',
    instructorTitle: 'Expert CRM & Customer Success',
    instructorImage: '/images/instructors/laurent-dubois.jpg',
    startDate: '2024-03-20',
    location: 'Paris & En ligne',
    maxStudents: 25
  };

  const modules = [
    {
      id: 1,
      title: 'Fondamentaux CRM',
      duration: '6h',
      lessons: [
        'Définition et enjeux du CRM',
        'Types de CRM : opérationnel, analytique, collaboratif',
        'Architecture CRM et intégrations',
        'Conformité RGPD et protection des données',
        'ROI et métriques CRM',
        'Intervenant : Laurent Dubois'
      ]
    },
    {
      id: 2,
      title: 'Stratégie Client & Personas',
      duration: '8h',
      lessons: [
        'Segmentation client et personas',
        'Customer Journey Mapping',
        'Stratégie de fidélisation',
        'Gestion de la valeur client (CLV)',
        'Stratégie omnicanale',
        'Intervenant : Customer Strategy Expert'
      ]
    },
    {
      id: 3,
      title: 'Plateformes CRM',
      duration: '8h',
      lessons: [
        'Salesforce : configuration et personnalisation',
        'HubSpot : marketing et vente',
        'Microsoft Dynamics 365',
        'CRM open source et alternatives',
        'Critères de sélection et migration',
        'Intervenant : CRM Platform Specialist'
      ]
    },
    {
      id: 4,
      title: 'Gestion des Opportunités',
      duration: '6h',
      lessons: [
        'Pipeline de vente et étapes',
        'Qualification des leads',
        'Gestion des prospects',
        'Forecasting et prévisions',
        'Optimisation du cycle de vente',
        'Intervenant : Sales Process Expert'
      ]
    },
    {
      id: 5,
      title: 'Service Client & Support',
      duration: '6h',
      lessons: [
        'Gestion des tickets et cas',
        'Knowledge base et FAQ',
        'Omnichannel support',
        'SLA et métriques de service',
        'Customer Success Management',
        'Intervenant : Customer Service Manager'
      ]
    },
    {
      id: 6,
      title: 'Analytics & Reporting',
      duration: '4h',
      lessons: [
        'KPIs CRM essentiels',
        'Tableaux de bord et reporting',
        'Analytics prédictifs',
        'Optimisation des performances',
        'Intervenant : Laurent Dubois'
      ]
    }
  ];

  const benefits = [
    'Certification CRM reconnue par l\'industrie',
    'Accès à vie au contenu',
    'Support personnalisé',
    'Réseau de professionnels CRM',
    'Outils et templates inclus',
    'Suivi post-formation',
    'Projet CRM concret pour votre entreprise'
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sophie Martin',
      company: 'Directrice Commerciale, TechCorp',
      rating: 5,
      comment: 'Formation complète qui nous a permis d\'optimiser notre processus de vente. Augmentation de 40% de nos conversions !'
    },
    {
      id: 2,
      name: 'Thomas Leroy',
      company: 'CRM Manager, RetailPlus',
      rating: 5,
      comment: 'Excellente formation, très pratique. J\'ai pu implémenter immédiatement les bonnes pratiques apprises.'
    },
    {
      id: 3,
      name: 'Julie Bernard',
      company: 'Customer Success, StartupXYZ',
      rating: 4,
      comment: 'Contenu riche et instructeur très compétent. J\'ai appris beaucoup sur la gestion de la relation client.'
    }
  ];

  const stats = [
    { label: 'Augmentation des ventes', value: '+45%', icon: TrendingUp },
    { label: 'Amélioration satisfaction client', value: '+60%', icon: Target },
    { label: 'ROI formation', value: '400%', icon: BarChart3 },
    { label: 'Taux de satisfaction', value: '97%', icon: Star }
  ];

  const platforms = [
    { name: 'Salesforce', icon: Building, description: 'CRM leader du marché' },
    { name: 'HubSpot', icon: Users2, description: 'Marketing et vente' },
    { name: 'Microsoft Dynamics', icon: BarChart3, description: 'CRM Microsoft' },
    { name: 'Zoho CRM', icon: Zap, description: 'CRM accessible' },
    { name: 'Pipedrive', icon: TrendingUp, description: 'CRM vente' },
    { name: 'SugarCRM', icon: Users, description: 'CRM open source' }
  ];

  const useCases = [
    {
      title: 'Gestion Commerciale',
      description: 'Pipeline de vente optimisé et suivi des opportunités',
      impact: 'Augmentation de 45% du taux de conversion'
    },
    {
      title: 'Service Client',
      description: 'Support omnicanale et gestion des tickets',
      impact: 'Amélioration de 60% de la satisfaction client'
    },
    {
      title: 'Marketing Automation',
      description: 'Campagnes personnalisées et lead nurturing',
      impact: 'Réduction de 50% du coût d\'acquisition'
    }
  ];

  const handleEnrollment = () => {
    window.location.href = '/formations/crm-gestion-client/inscription';
  };

  return (
    <>
      <AdvancedSEO
        title="Formation CRM & Gestion Client - DL Solutions"
        description="Optimisez votre relation client avec notre formation CRM complète. Salesforce, HubSpot, analytics et stratégie client."
        keywords="CRM, gestion client, formation, Salesforce, HubSpot, relation client, customer success, DL Solutions"
        image="https://dlsolutions.com/images/instructors/laurent-dubois.jpg"
        url="https://dlsolutions.com/formations/crm-gestion-client"
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
          { name: 'CRM & Gestion Client', url: 'https://dlsolutions.com/formations/crm-gestion-client' }
        ]}
        course={{
          name: 'CRM & Gestion Client',
          description: 'Optimisez votre relation client et maximisez la valeur de votre portefeuille',
          provider: 'DL Solutions',
          instructor: 'Laurent Dubois',
          duration: '38 heures',
          price: '699',
          currency: 'EUR'
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <Users2 className="w-8 h-8 mr-3" />
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
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-2xl font-bold text-teal-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Cas d'usage */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Cas d'usage concrets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{useCase.title}</h4>
                  <p className="text-gray-600 mb-4">{useCase.description}</p>
                  <div className="text-teal-600 font-medium">{useCase.impact}</div>
                </div>
              ))}
            </div>
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
                          ? 'border-teal-500 text-teal-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Programme
                    </button>
                    <button
                      onClick={() => setActiveTab('instructeur')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'instructeur'
                          ? 'border-teal-500 text-teal-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Instructeur
                    </button>
                    <button
                      onClick={() => setActiveTab('avis')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'avis'
                          ? 'border-teal-500 text-teal-600'
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
                                  <Play className="w-4 h-4 mr-3 text-teal-500" />
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
                        <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {courseData.instructor.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{courseData.instructor}</h4>
                          <p className="text-teal-600 font-medium mb-4">{courseData.instructorTitle}</p>
                          <p className="text-gray-600 mb-4">
                            Expert CRM avec plus de 15 ans d'expérience dans la gestion de la relation client. Laurent a accompagné plus de 200 entreprises dans l'implémentation et l'optimisation de leurs solutions CRM, générant plus de 100M€ de valeur ajoutée.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-900">Expertise :</span>
                              <p className="text-gray-600">CRM, Customer Success, Sales Process</p>
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
                      <CheckCircle className="w-5 h-5 text-teal-500 mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plateformes incluses */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Plateformes CRM étudiées</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {platforms.map((platform, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <platform.icon className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">{platform.name}</h4>
                      <p className="text-sm text-gray-600">{platform.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projet pratique */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Projet CRM concret pour votre entreprise</h3>
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Optimisez votre gestion client</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Objectifs :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Audit CRM de l'entreprise</li>
                        <li>• Optimisation des processus</li>
                        <li>• Stratégie client personnalisée</li>
                        <li>• Plan d'implémentation</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Livrables :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Solution CRM optimisée</li>
                        <li>• Processus documentés</li>
                        <li>• Présentation stratégique</li>
                        <li>• Certification CRM</li>
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
                  <div className="text-4xl font-bold text-teal-600 mb-2">{courseData.price}€</div>
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
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
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