'use client';

import AdvancedSEO from '@/components/AdvancedSEO';
import { Award, Brain, Calendar, CheckCircle, Clock, Cpu, Database, Download, MapPin, MessageSquare, Phone, Play, Star, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { useState } from 'react';

export default function IAEntreprisesPage() {
  const [activeTab, setActiveTab] = useState('programme');

  const courseData = {
    title: 'IA & Intelligence Artificielle pour Entreprises',
    subtitle: 'Intégrez l\'IA dans votre stratégie business et automatisez vos processus',
    duration: '44 heures',
    level: 'Intermédiaire à Avancé',
    price: 899,
    originalPrice: 1200,
    students: 45,
    rating: 4.9,
    reviews: 18,
    instructor: 'Dr. Sarah Chen',
    instructorTitle: 'Experte IA & Machine Learning',
    instructorImage: '/images/instructors/sarah-chen.jpg',
    startDate: '2024-04-05',
    location: 'Paris & En ligne',
    maxStudents: 15
  };

  const modules = [
    {
      id: 1,
      title: 'Fondamentaux de l\'IA Business',
      duration: '8h',
      lessons: [
        'Introduction à l\'IA et ses applications business',
        'Types d\'IA : Machine Learning, Deep Learning, NLP',
        'Écosystème IA français et européen',
        'Éthique et responsabilité IA',
        'ROI et métriques IA',
        'Intervenant : Dr. Sarah Chen'
      ]
    },
    {
      id: 2,
      title: 'Stratégie IA & Transformation Digitale',
      duration: '8h',
      lessons: [
        'Audit IA de l\'entreprise',
        'Roadmap de transformation IA',
        'Gestion du changement',
        'Formation des équipes',
        'Pilotage et gouvernance IA',
        'Intervenant : Consultant Transformation'
      ]
    },
    {
      id: 3,
      title: 'Machine Learning & Data Science',
      duration: '10h',
      lessons: [
        'Préparation et nettoyage des données',
        'Algorithmes de ML supervisé et non-supervisé',
        'Évaluation et validation des modèles',
        'Feature engineering et sélection',
        'Mise en production des modèles',
        'Intervenant : Data Scientist Senior'
      ]
    },
    {
      id: 4,
      title: 'IA Conversationnelle & Chatbots',
      duration: '6h',
      lessons: [
        'NLP et traitement du langage naturel',
        'Architecture des chatbots',
        'Intégration avec les systèmes existants',
        'Optimisation de l\'expérience utilisateur',
        'Mesure des performances',
        'Intervenant : NLP Specialist'
      ]
    },
    {
      id: 5,
      title: 'Automatisation & RPA',
      duration: '6h',
      lessons: [
        'Robotic Process Automation (RPA)',
        'Identification des processus automatisables',
        'Outils RPA (UiPath, Automation Anywhere)',
        'Intégration IA dans les processus',
        'Monitoring et maintenance',
        'Intervenant : RPA Expert'
      ]
    },
    {
      id: 6,
      title: 'IA Prédictive & Analytics Avancés',
      duration: '6h',
      lessons: [
        'Analytics prédictifs',
        'Forecasting et prévisions',
        'Détection d\'anomalies',
        'Optimisation des décisions',
        'Tableaux de bord IA',
        'Intervenant : Dr. Sarah Chen'
      ]
    }
  ];

  const benefits = [
    'Certification IA Business reconnue',
    'Accès à vie au contenu',
    'Support personnalisé',
    'Réseau de professionnels IA',
    'Outils et templates inclus',
    'Suivi post-formation',
    'Projet IA concret pour votre entreprise'
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Pierre Moreau',
      company: 'CTO, TechInnovation',
      rating: 5,
      comment: 'Formation exceptionnelle qui nous a permis d\'implémenter l\'IA dans nos processus. ROI immédiat !'
    },
    {
      id: 2,
      name: 'Marie Dubois',
      company: 'Directrice Innovation, RetailCorp',
      rating: 5,
      comment: 'Contenu très technique mais accessible. Dr. Chen est une excellente pédagogue.'
    },
    {
      id: 3,
      name: 'Thomas Leroy',
      company: 'Data Manager, FinancePlus',
      rating: 4,
      comment: 'Formation complète qui couvre tous les aspects de l\'IA business. Très pratique.'
    }
  ];

  const stats = [
    { label: 'Efficacité opérationnelle', value: '+200%', icon: TrendingUp },
    { label: 'Réduction des coûts', value: '-40%', icon: Target },
    { label: 'ROI formation', value: '500%', icon: Brain },
    { label: 'Taux de satisfaction', value: '98%', icon: Star }
  ];

  const tools = [
    { name: 'Python & TensorFlow', icon: Cpu, description: 'Développement IA' },
    { name: 'Azure ML Studio', icon: Brain, description: 'Plateforme cloud IA' },
    { name: 'Power BI', icon: Database, description: 'Analytics avancés' },
    { name: 'UiPath', icon: Zap, description: 'RPA & Automatisation' },
    { name: 'Dialogflow', icon: MessageSquare, description: 'Chatbots IA' },
    { name: 'Jupyter Notebooks', icon: TrendingUp, description: 'Data Science' }
  ];

  const useCases = [
    {
      title: 'Service Client IA',
      description: 'Chatbots intelligents et assistants virtuels',
      impact: 'Réduction de 60% du temps de réponse'
    },
    {
      title: 'Prédiction des Ventes',
      description: 'Modèles prédictifs pour optimiser l\'inventaire',
      impact: 'Augmentation de 25% du chiffre d\'affaires'
    },
    {
      title: 'Automatisation des Processus',
      description: 'RPA pour les tâches répétitives',
      impact: 'Économie de 30% sur les coûts opérationnels'
    }
  ];

  const handleEnrollment = () => {
    window.location.href = '/formations/ia-entreprises/inscription';
  };

  return (
    <>
      <AdvancedSEO
        title="Formation IA & Intelligence Artificielle pour Entreprises - DL Solutions"
        description="Intégrez l'IA dans votre stratégie business. Machine Learning, chatbots, RPA, analytics prédictifs et automatisation."
        keywords="IA, intelligence artificielle, machine learning, formation, entreprise, chatbots, RPA, analytics, DL Solutions"
        image="https://dlsolutions.com/images/instructors/sarah-chen.jpg"
        url="https://dlsolutions.com/formations/ia-entreprises"
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
          { name: 'IA & Intelligence Artificielle', url: 'https://dlsolutions.com/formations/ia-entreprises' }
        ]}
        course={{
          name: 'IA & Intelligence Artificielle pour Entreprises',
          description: 'Intégrez l\'IA dans votre stratégie business et automatisez vos processus',
          provider: 'DL Solutions',
          instructor: 'Dr. Sarah Chen',
          duration: '44 heures',
          price: '899',
          currency: 'EUR'
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <Brain className="w-8 h-8 mr-3" />
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
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Cas d'usage */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Cas d'usage concrets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{useCase.title}</h4>
                  <p className="text-gray-600 mb-4">{useCase.description}</p>
                  <div className="text-indigo-600 font-medium">{useCase.impact}</div>
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
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Programme
                    </button>
                    <button
                      onClick={() => setActiveTab('instructeur')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'instructeur'
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Instructeur
                    </button>
                    <button
                      onClick={() => setActiveTab('avis')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'avis'
                          ? 'border-indigo-500 text-indigo-600'
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
                                  <Play className="w-4 h-4 mr-3 text-indigo-500" />
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Votre formatrice principale</h3>
                      <div className="flex items-start space-x-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {courseData.instructor.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{courseData.instructor}</h4>
                          <p className="text-indigo-600 font-medium mb-4">{courseData.instructorTitle}</p>
                          <p className="text-gray-600 mb-4">
                            Docteure en Intelligence Artificielle avec plus de 12 ans d'expérience dans le développement et l'implémentation de solutions IA pour entreprises. Sarah a dirigé plus de 50 projets IA et formé plus de 500 professionnels.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-900">Expertise :</span>
                              <p className="text-gray-600">Machine Learning, Deep Learning, NLP, RPA</p>
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
                      <CheckCircle className="w-5 h-5 text-indigo-500 mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outils inclus */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Outils et technologies inclus</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tools.map((tool, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <tool.icon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">{tool.name}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projet pratique */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Projet IA concret pour votre entreprise</h3>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Développez une solution IA sur mesure</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Objectifs :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Analyse des besoins IA</li>
                        <li>• Prototype fonctionnel</li>
                        <li>• Plan d'implémentation</li>
                        <li>• ROI et métriques</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Livrables :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Solution IA opérationnelle</li>
                        <li>• Documentation technique</li>
                        <li>• Présentation stratégique</li>
                        <li>• Certification IA Business</li>
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
                  <div className="text-4xl font-bold text-indigo-600 mb-2">{courseData.price}€</div>
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
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
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