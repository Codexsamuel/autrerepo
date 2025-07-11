'use client';

import AdvancedSEO from '@/components/AdvancedSEO';
import { Award, Calendar, CheckCircle, Clock, Download, Heart, MapPin, MessageSquare, Phone, Play, Shield, Star, Target, TrendingUp, Users, Users2, Zap } from 'lucide-react';
import { useState } from 'react';

export default function SAVExcellencePage() {
  const [activeTab, setActiveTab] = useState('programme');

  const courseData = {
    title: 'SAV Excellence & Service Client Premium',
    subtitle: 'Développez un service client d\'exception et fidélisez vos clients',
    duration: '30 heures',
    level: 'Débutant à Avancé',
    price: 549,
    originalPrice: 700,
    students: 67,
    rating: 4.9,
    reviews: 24,
    instructor: 'Isabelle Dubois',
    instructorTitle: 'Experte Service Client & Customer Experience',
    instructorImage: '/images/instructors/isabelle-dubois.jpg',
    startDate: '2024-04-15',
    location: 'Paris & En ligne',
    maxStudents: 20
  };

  const modules = [
    {
      id: 1,
      title: 'Fondamentaux du Service Client',
      duration: '6h',
      lessons: [
        'Philosophie du service client d\'exception',
        'Psychologie client et comportements',
        'Différenciation par le service',
        'ROI du service client premium',
        'Culture d\'entreprise orientée client',
        'Intervenant : Isabelle Dubois'
      ]
    },
    {
      id: 2,
      title: 'Communication & Écoute Active',
      duration: '6h',
      lessons: [
        'Techniques d\'écoute active et empathie',
        'Communication verbale et non-verbale',
        'Gestion des émotions et du stress',
        'Adaptation au profil client',
        'Résolution de conflits',
        'Intervenant : Communication Expert'
      ]
    },
    {
      id: 3,
      title: 'Gestion des Réclamations',
      duration: '6h',
      lessons: [
        'Types de réclamations et causes',
        'Processus de traitement des réclamations',
        'Techniques de désescalade',
        'Solutions créatives et personnalisées',
        'Suivi et résolution',
        'Intervenant : Customer Service Manager'
      ]
    },
    {
      id: 4,
      title: 'Outils & Technologies SAV',
      duration: '6h',
      lessons: [
        'CRM et systèmes de ticketing',
        'Omnichannel : chat, email, téléphone',
        'IA et chatbots pour le service client',
        'Analytics et métriques SAV',
        'Automatisation des processus',
        'Intervenant : SAV Technology Expert'
      ]
    },
    {
      id: 5,
      title: 'Fidélisation & Rétention',
      duration: '4h',
      lessons: [
        'Stratégies de fidélisation client',
        'Programmes de fidélité premium',
        'Surprise et délice client',
        'Gestion de la valeur client (CLV)',
        'Ambassadeurs de marque',
        'Intervenant : Customer Success Manager'
      ]
    },
    {
      id: 6,
      title: 'Excellence Opérationnelle',
      duration: '2h',
      lessons: [
        'SLA et standards de qualité',
        'Formation et développement des équipes',
        'Mesure de la satisfaction client',
        'Amélioration continue',
        'Intervenant : Isabelle Dubois'
      ]
    }
  ];

  const benefits = [
    'Certification SAV Excellence reconnue',
    'Accès à vie au contenu',
    'Support personnalisé',
    'Réseau de professionnels SAV',
    'Outils et templates inclus',
    'Suivi post-formation',
    'Processus SAV personnalisé'
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Marie Laurent',
      company: 'Directrice SAV, LuxuryBrand',
      rating: 5,
      comment: 'Formation exceptionnelle qui a transformé notre approche du service client. Satisfaction client +40% !'
    },
    {
      id: 2,
      name: 'Thomas Martin',
      company: 'Customer Success Manager, TechCorp',
      rating: 5,
      comment: 'Excellente formation, très pratique. Isabelle est une experte du service client premium.'
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      company: 'Responsable Service Client, RetailPlus',
      rating: 4,
      comment: 'Contenu riche et techniques efficaces. J\'ai pu implémenter immédiatement les bonnes pratiques.'
    }
  ];

  const stats = [
    { label: 'Amélioration satisfaction client', value: '+40%', icon: TrendingUp },
    { label: 'Réduction des réclamations', value: '-35%', icon: Target },
    { label: 'ROI formation', value: '300%', icon: Heart },
    { label: 'Taux de satisfaction', value: '99%', icon: Star }
  ];

  const tools = [
    { name: 'Zendesk', icon: Shield, description: 'Gestion des tickets' },
    { name: 'Intercom', icon: MessageSquare, description: 'Chat et support' },
    { name: 'Salesforce Service Cloud', icon: Users2, description: 'CRM service client' },
    { name: 'Freshdesk', icon: Zap, description: 'Helpdesk complet' },
    { name: 'HubSpot Service Hub', icon: Heart, description: 'Service client intégré' },
    { name: 'LiveChat', icon: MessageSquare, description: 'Support en temps réel' }
  ];

  const methodologies = [
    {
      title: 'Méthode RATER',
      description: 'Évaluation de la qualité du service',
      elements: 'Fiabilité, Assurance, Tangibilité, Empathie, Réactivité'
    },
    {
      title: 'Service Recovery',
      description: 'Récupération après un incident',
      elements: 'Reconnaissance, Excuses, Réparation, Compensation'
    },
    {
      title: 'Customer Journey Mapping',
      description: 'Cartographie de l\'expérience client',
      elements: 'Points de contact, Moments de vérité, Opportunités'
    }
  ];

  const handleEnrollment = () => {
    window.location.href = '/formations/sav-excellence/inscription';
  };

  return (
    <>
      <AdvancedSEO
        title="Formation SAV Excellence & Service Client Premium - DL Solutions"
        description="Développez un service client d'exception avec notre formation SAV complète. Communication, gestion des réclamations et fidélisation."
        keywords="SAV, service client, formation, excellence, réclamations, fidélisation, customer experience, DL Solutions"
        image="https://dlsolutions.com/images/instructors/isabelle-dubois.jpg"
        url="https://dlsolutions.com/formations/sav-excellence"
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
          { name: 'SAV Excellence', url: 'https://dlsolutions.com/formations/sav-excellence' }
        ]}
        course={{
          name: 'SAV Excellence & Service Client Premium',
          description: 'Développez un service client d\'exception et fidélisez vos clients',
          provider: 'DL Solutions',
          instructor: 'Isabelle Dubois',
          duration: '30 heures',
          price: '549',
          currency: 'EUR'
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 mr-3" />
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
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Méthodologies */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Méthodologies d'excellence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {methodologies.map((methodology, index) => (
                <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{methodology.title}</h4>
                  <p className="text-gray-600 mb-4">{methodology.description}</p>
                  <div className="text-emerald-600 font-medium text-sm">{methodology.elements}</div>
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
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Programme
                    </button>
                    <button
                      onClick={() => setActiveTab('instructeur')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'instructeur'
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Instructeur
                    </button>
                    <button
                      onClick={() => setActiveTab('avis')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'avis'
                          ? 'border-emerald-500 text-emerald-600'
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
                                  <Play className="w-4 h-4 mr-3 text-emerald-500" />
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
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {courseData.instructor.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{courseData.instructor}</h4>
                          <p className="text-emerald-600 font-medium mb-4">{courseData.instructorTitle}</p>
                          <p className="text-gray-600 mb-4">
                            Experte service client avec plus de 15 ans d'expérience dans le développement de services d'exception. Isabelle a accompagné plus de 200 entreprises dans la transformation de leur service client, générant plus de 100M€ de valeur ajoutée.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-900">Expertise :</span>
                              <p className="text-gray-600">Service Client, Customer Experience, SAV</p>
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
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outils inclus */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Outils et plateformes inclus</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tools.map((tool, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <tool.icon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">{tool.name}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Processus personnalisé */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Processus SAV personnalisé</h3>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Optimisez votre service client</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Objectifs :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Audit SAV de l'entreprise</li>
                        <li>• Processus optimisés</li>
                        <li>• Stratégie de fidélisation</li>
                        <li>• Plan d'amélioration</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Livrables :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Processus SAV optimisé</li>
                        <li>• Scripts et templates</li>
                        <li>• Présentation stratégique</li>
                        <li>• Certification SAV Excellence</li>
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
                  <div className="text-4xl font-bold text-emerald-600 mb-2">{courseData.price}€</div>
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
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
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