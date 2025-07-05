'use client';

import { Award, Calendar, CheckCircle, Clock, Download, Headphones, MapPin, MessageSquare, Phone, Play, Star, Target, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

export default function TeleventeProspectionPage() {
  const [activeTab, setActiveTab] = useState('programme');

  const courseData = {
    title: 'Télévente & Prospection',
    subtitle: 'Maîtrisez les techniques de vente à distance et développez votre pipeline commercial',
    duration: '32 heures',
    level: 'Débutant à Avancé',
    price: 899,
    originalPrice: 1299,
    students: 2156,
    rating: 4.9,
    reviews: 156,
    instructor: 'Marc Dubois',
    instructorTitle: 'Expert en Vente & Prospection',
    instructorImage: '/images/instructors/marc-dubois.jpg',
    startDate: '2024-02-20',
    location: 'Paris & En ligne',
    maxStudents: 25
  };

  const modules = [
    {
      id: 1,
      title: 'Fondamentaux de la télévente',
      duration: '6h',
      lessons: [
        'Psychologie de la vente à distance',
        'Préparation et organisation',
        'Scripts de vente efficaces',
        'Gestion des objections',
        'Techniques de closing'
      ]
    },
    {
      id: 2,
      title: 'Prospection et qualification',
      duration: '8h',
      lessons: [
        'Recherche de prospects qualifiés',
        'Techniques de prise de contact',
        'Qualification des leads',
        'Outils de prospection',
        'Gestion de la base de données'
      ]
    },
    {
      id: 3,
      title: 'Communication persuasive',
      duration: '6h',
      lessons: [
        'Techniques de communication',
        'Écoute active et empathie',
        'Gestion du stress et des émotions',
        'Adaptation au profil client',
        'Storytelling commercial'
      ]
    },
    {
      id: 4,
      title: 'Outils et technologies',
      duration: '6h',
      lessons: [
        'CRM et outils de vente',
        'Automatisation des processus',
        'Analytics et reporting',
        'Intégration des outils',
        'Optimisation des performances'
      ]
    },
    {
      id: 5,
      title: 'Gestion des performances',
      duration: '4h',
      lessons: [
        'Définition des objectifs',
        'Suivi des KPIs',
        'Optimisation continue',
        'Motivation et développement',
        'Plan d\'action personnalisé'
      ]
    },
    {
      id: 6,
      title: 'Mise en pratique',
      duration: '2h',
      lessons: [
        'Simulations de vente',
        'Jeux de rôle',
        'Feedback et amélioration',
        'Présentation finale'
      ]
    }
  ];

  const benefits = [
    'Certification reconnue par l\'industrie',
    'Accès à vie au contenu',
    'Support personnalisé',
    'Réseau de professionnels',
    'Outils et templates inclus',
    'Suivi post-formation'
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Julie Martin',
      company: 'Commerciale Senior, TechSales',
      rating: 5,
      comment: 'Cette formation a transformé ma façon de vendre. J\'ai augmenté mes ventes de 40% en 3 mois !'
    },
    {
      id: 2,
      name: 'Thomas Leroy',
      company: 'Responsable Commercial, StartupXYZ',
      rating: 5,
      comment: 'Formation exceptionnelle avec des techniques concrètes et applicables immédiatement.'
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      company: 'Téléconseillère, CallCenter Plus',
      rating: 4,
      comment: 'Très bonne formation, j\'ai appris à mieux gérer les objections et à qualifier mes prospects.'
    }
  ];

  const stats = [
    { label: 'Taux de conversion moyen', value: '+35%', icon: TrendingUp },
    { label: 'Temps de qualification', value: '-50%', icon: Clock },
    { label: 'Satisfaction client', value: '95%', icon: Star },
    { label: 'ROI formation', value: '300%', icon: Target }
  ];

  const handleEnrollment = () => {
    console.log('Inscription à la formation Télévente & Prospection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <Phone className="w-8 h-8 mr-3" />
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
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-2">{stat.value}</div>
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
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Programme
                  </button>
                  <button
                    onClick={() => setActiveTab('instructeur')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'instructeur'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Instructeur
                  </button>
                  <button
                    onClick={() => setActiveTab('avis')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'avis'
                        ? 'border-green-500 text-green-600'
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
                                <Play className="w-4 h-4 mr-3 text-green-500" />
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Votre instructeur</h3>
                    <div className="flex items-start space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {courseData.instructor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{courseData.instructor}</h4>
                        <p className="text-green-600 font-medium mb-4">{courseData.instructorTitle}</p>
                        <p className="text-gray-600 mb-4">
                          Expert en vente et prospection avec plus de 15 ans d'expérience dans la télévente. 
                          Il a formé plus de 1000 commerciaux et accompagné plus de 50 entreprises dans 
                          l'optimisation de leurs processus de vente.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-900">Expertise :</span>
                            <p className="text-gray-600">Télévente, Prospection, CRM</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Expérience :</span>
                            <p className="text-gray-600">15+ ans en vente</p>
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
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outils inclus */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Outils inclus</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Scripts de vente</h4>
                  <p className="text-sm text-gray-600">Templates personnalisables</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Headphones className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Simulations</h4>
                  <p className="text-sm text-gray-600">Exercices pratiques</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Checklists</h4>
                  <p className="text-sm text-gray-600">Outils de suivi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">{courseData.price}€</div>
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
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
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
  );
}