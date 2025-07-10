'use client';

import AdvancedSEO from '@/components/AdvancedSEO';
import { Award, Calendar, CheckCircle, Clock, Download, Facebook, Instagram, Linkedin, MapPin, MessageSquare, Phone, Play, Star, Target, TrendingUp, Twitter, Users, Youtube } from 'lucide-react';
import { useState } from 'react';

export default function ReseauxSociauxPage() {
  const [activeTab, setActiveTab] = useState('programme');

  const courseData = {
    title: 'Réseaux Sociaux & Social Media Marketing',
    subtitle: 'Maîtrisez les réseaux sociaux et développez votre présence digitale',
    duration: '34 heures',
    level: 'Débutant à Avancé',
    price: 599,
    originalPrice: 750,
    students: 94,
    rating: 4.8,
    reviews: 35,
    instructor: 'Camille Martin',
    instructorTitle: 'Experte Social Media & Influence Marketing',
    instructorImage: '/images/instructors/camille-martin.jpg',
    startDate: '2024-03-25',
    location: 'Paris & En ligne',
    maxStudents: 25
  };

  const modules = [
    {
      id: 1,
      title: 'Stratégie Réseaux Sociaux',
      duration: '6h',
      lessons: [
        'Landscape des réseaux sociaux 2024',
        'Définition de la stratégie social media',
        'Personas et audience targeting',
        'Content calendar et planning',
        'Objectifs SMART et KPIs',
        'Intervenant : Camille Martin'
      ]
    },
    {
      id: 2,
      title: 'Facebook & Instagram',
      duration: '8h',
      lessons: [
        'Optimisation des profils business',
        'Content strategy pour Facebook',
        'Instagram : feed, stories, reels',
        'Facebook & Instagram Ads',
        'Analytics et insights',
        'Intervenant : Social Media Specialist'
      ]
    },
    {
      id: 3,
      title: 'LinkedIn & Twitter',
      duration: '6h',
      lessons: [
        'LinkedIn B2B et networking',
        'Content marketing LinkedIn',
        'Twitter : engagement et viralité',
        'LinkedIn Ads et Sponsored Content',
        'Community management professionnel',
        'Intervenant : B2B Marketing Expert'
      ]
    },
    {
      id: 4,
      title: 'TikTok & Nouvelles Plateformes',
      duration: '6h',
      lessons: [
        'TikTok : algorithmes et tendances',
        'YouTube Shorts et vidéo courte',
        'Snapchat et AR marketing',
        'Nouvelles plateformes émergentes',
        'Cross-platform strategy',
        'Intervenant : Gen Z Marketing Expert'
      ]
    },
    {
      id: 5,
      title: 'Influence Marketing',
      duration: '4h',
      lessons: [
        'Identification des influenceurs',
        'Stratégies de collaboration',
        'Campagnes d\'influence',
        'Mesure du ROI influence',
        'Gestion des relations influenceurs',
        'Intervenant : Influence Marketing Manager'
      ]
    },
    {
      id: 6,
      title: 'Analytics & Performance',
      duration: '4h',
      lessons: [
        'Outils d\'analytics social media',
        'Reporting et tableaux de bord',
        'Optimisation des performances',
        'A/B testing et expérimentation',
        'Intervenant : Camille Martin'
      ]
    }
  ];

  const benefits = [
    'Certification Social Media reconnue',
    'Accès à vie au contenu',
    'Support personnalisé',
    'Réseau de professionnels social media',
    'Outils et templates inclus',
    'Suivi post-formation',
    'Stratégie social media personnalisée'
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sophie Dubois',
      company: 'Social Media Manager, FashionBrand',
      rating: 5,
      comment: 'Formation complète et à jour avec les dernières tendances. J\'ai doublé l\'engagement de nos comptes !'
    },
    {
      id: 2,
      name: 'Thomas Leroy',
      company: 'Marketing Manager, StartupTech',
      rating: 5,
      comment: 'Excellente formation, très pratique. Camille est une excellente pédagogue et experte du domaine.'
    },
    {
      id: 3,
      name: 'Julie Bernard',
      company: 'Freelance Social Media, CreativeAgency',
      rating: 4,
      comment: 'Contenu riche et stratégies efficaces. J\'ai pu développer ma clientèle grâce aux techniques apprises.'
    }
  ];

  const stats = [
    { label: 'Augmentation engagement', value: '+120%', icon: TrendingUp },
    { label: 'Croissance audience', value: '+85%', icon: Target },
    { label: 'ROI formation', value: '350%', icon: Instagram },
    { label: 'Taux de satisfaction', value: '96%', icon: Star }
  ];

  const platforms = [
    { name: 'Instagram', icon: Instagram, description: 'Visuel et stories' },
    { name: 'Facebook', icon: Facebook, description: 'Communauté et ads' },
    { name: 'LinkedIn', icon: Linkedin, description: 'B2B et networking' },
    { name: 'TikTok', icon: TrendingUp, description: 'Vidéo courte' },
    { name: 'YouTube', icon: Youtube, description: 'Vidéo longue' },
    { name: 'Twitter', icon: Twitter, description: 'Actualité et engagement' }
  ];

  const tools = [
    {
      title: 'Planification de Contenu',
      description: 'Calendrier éditorial et programmation',
      tools: 'Hootsuite, Buffer, Later'
    },
    {
      title: 'Analytics & Reporting',
      description: 'Suivi des performances et insights',
      tools: 'Sprout Social, Iconosquare, Google Analytics'
    },
    {
      title: 'Création Visuelle',
      description: 'Design et montage pour réseaux sociaux',
      tools: 'Canva, Adobe Creative Suite, CapCut'
    }
  ];

  const handleEnrollment = () => {
    window.location.href = '/formations/reseaux-sociaux/inscription';
  };

  return (
    <>
      <AdvancedSEO
        title="Formation Réseaux Sociaux & Social Media Marketing - DL Solutions"
        description="Maîtrisez les réseaux sociaux avec notre formation complète. Instagram, Facebook, LinkedIn, TikTok et stratégie social media."
        keywords="réseaux sociaux, social media, formation, Instagram, Facebook, LinkedIn, TikTok, marketing digital, DL Solutions"
        image="https://dlsolutions.com/images/instructors/camille-martin.jpg"
        url="https://dlsolutions.com/formations/reseaux-sociaux"
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
          { name: 'Réseaux Sociaux', url: 'https://dlsolutions.com/formations/reseaux-sociaux' }
        ]}
        course={{
          name: 'Réseaux Sociaux & Social Media Marketing',
          description: 'Maîtrisez les réseaux sociaux et développez votre présence digitale',
          provider: 'DL Solutions',
          instructor: 'Camille Martin',
          duration: '34 heures',
          price: '599',
          currency: 'EUR'
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <Instagram className="w-8 h-8 mr-3" />
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

          {/* Plateformes étudiées */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Plateformes étudiées</h3>
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Votre formatrice principale</h3>
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
                            Experte social media avec plus de 8 ans d'expérience dans la gestion de communautés et l'influence marketing. Camille a accompagné plus de 150 marques et influenceurs, générant plus de 50M d'impressions sur les réseaux sociaux.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-900">Expertise :</span>
                              <p className="text-gray-600">Social Media, Influence Marketing, Community Management</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">Intervenants :</span>
                              <p className="text-gray-600">Experts spécialisés par plateforme</p>
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

              {/* Outils inclus */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Outils et technologies inclus</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tools.map((tool, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{tool.title}</h4>
                      <p className="text-gray-600 mb-4">{tool.description}</p>
                      <div className="text-blue-600 font-medium text-sm">{tool.tools}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stratégie personnalisée */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Stratégie social media personnalisée</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Développez votre présence digitale</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Objectifs :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Audit social media complet</li>
                        <li>• Stratégie multi-plateformes</li>
                        <li>• Content calendar optimisé</li>
                        <li>• Plan de croissance</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Livrables :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Stratégie social media</li>
                        <li>• Templates de contenu</li>
                        <li>• Présentation finale</li>
                        <li>• Certification Social Media</li>
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