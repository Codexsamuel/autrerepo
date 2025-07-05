'use client';

import { Award, Brain, Calendar, CheckCircle, Clock, Download, Mail, MapPin, Phone, Play, Star, Users } from 'lucide-react';
import { useState } from 'react';

export default function IAEntreprisesPage() {
  const [activeTab, setActiveTab] = useState('programme');

  const courseData = {
    title: 'IA pour Entreprises',
    subtitle: 'Intégrez l\'Intelligence Artificielle dans votre stratégie business',
    duration: '40 heures',
    level: 'Intermédiaire à Avancé',
    price: 1499,
    originalPrice: 1999,
    students: 1247,
    rating: 4.8,
    reviews: 89,
    instructor: 'Dr. Sarah Chen',
    instructorTitle: 'Experte en IA & Machine Learning',
    instructorImage: '/images/instructors/sarah-chen.jpg',
    startDate: '2024-02-15',
    location: 'Paris & En ligne',
    maxStudents: 20
  };

  const modules = [
    {
      id: 1,
      title: 'Fondamentaux de l\'IA',
      duration: '6h',
      lessons: [
        'Introduction à l\'Intelligence Artificielle',
        'Machine Learning vs Deep Learning',
        'Types d\'IA : ANI, AGI, ASI',
        'Éthique et responsabilité en IA',
        'Cas d\'usage en entreprise'
      ]
    },
    {
      id: 2,
      title: 'Stratégie d\'implémentation IA',
      duration: '8h',
      lessons: [
        'Audit de maturité IA',
        'Roadmap d\'implémentation',
        'Gestion du changement',
        'ROI et métriques de succès',
        'Gestion des risques'
      ]
    },
    {
      id: 3,
      title: 'Outils et Technologies',
      duration: '10h',
      lessons: [
        'Plateformes cloud IA (AWS, Azure, GCP)',
        'Outils de développement IA',
        'APIs et services IA',
        'Intégration avec systèmes existants',
        'Sécurité et conformité'
      ]
    },
    {
      id: 4,
      title: 'Cas Pratiques',
      duration: '12h',
      lessons: [
        'Chatbots et assistants virtuels',
        'Analyse prédictive',
        'Automatisation des processus',
        'Recommandation et personnalisation',
        'Computer Vision'
      ]
    },
    {
      id: 5,
      title: 'Projet Final',
      duration: '4h',
      lessons: [
        'Définition du projet',
        'Développement et implémentation',
        'Test et validation',
        'Présentation et évaluation'
      ]
    }
  ];

  const benefits = [
    'Certification reconnue par l\'industrie',
    'Accès à vie au contenu',
    'Support technique dédié',
    'Réseau de professionnels IA',
    'Projet pratique personnalisé',
    'Suivi post-formation'
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      company: 'Directrice Innovation, TechCorp',
      rating: 5,
      comment: 'Cette formation a révolutionné notre approche de l\'IA. Nous avons pu implémenter des solutions concrètes dès la fin du programme.'
    },
    {
      id: 2,
      name: 'Pierre Martin',
      company: 'CTO, StartupXYZ',
      rating: 5,
      comment: 'Excellente formation avec des cas pratiques très pertinents. L\'instructrice est très compétente et accessible.'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      company: 'Responsable Digital, RetailPlus',
      rating: 4,
      comment: 'Formation complète et bien structurée. J\'ai pu immédiatement appliquer les concepts dans mon entreprise.'
    }
  ];

  const handleEnrollment = () => {
    console.log('Inscription à la formation IA pour Entreprises');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white py-20">
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Votre instructeur</h3>
                    <div className="flex items-start space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {courseData.instructor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{courseData.instructor}</h4>
                        <p className="text-blue-600 font-medium mb-4">{courseData.instructorTitle}</p>
                        <p className="text-gray-600 mb-4">
                          Experte reconnue en Intelligence Artificielle avec plus de 10 ans d'expérience dans l'industrie. 
                          Elle a accompagné plus de 50 entreprises dans leur transformation digitale et l'implémentation 
                          de solutions IA innovantes.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-900">Expertise :</span>
                            <p className="text-gray-600">Machine Learning, Deep Learning, NLP</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Expérience :</span>
                            <p className="text-gray-600">10+ ans en IA</p>
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
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
                    <Mail className="w-4 h-4 mr-2" />
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