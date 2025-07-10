'use client';

import AdvancedSEO from '@/components/AdvancedSEO';
import { Award, BarChart3, Calendar, CheckCircle, Clock, Download, Facebook, Instagram, MapPin, MessageSquare, Phone, Play, Star, Target, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

export default function MarketingDigitalPage() {
  const [activeTab, setActiveTab] = useState('programme');

  const courseData = {
    title: 'Marketing Digital Avancé',
    subtitle: 'Maîtrisez les stratégies digitales modernes et boostez votre présence en ligne',
    duration: '40 heures',
    level: 'Intermédiaire à Avancé',
    price: 799,
    originalPrice: 950,
    students: 67,
    rating: 4.9,
    reviews: 23,
    instructor: 'Sarah Johnson',
    instructorTitle: 'Experte en Marketing Digital & Growth Hacking',
    instructorImage: '/images/instructors/sarah-johnson.jpg',
    startDate: '2024-03-15',
    location: 'Paris & En ligne',
    maxStudents: 20
  };

  const modules = [
    {
      id: 1,
      title: 'Stratégie Marketing Digital',
      duration: '8h',
      lessons: [
        'Analyse de marché et personas',
        'Positionnement de marque',
        'Plan marketing digital',
        'Objectifs SMART et KPIs',
        'Budget et ROI',
        'Intervenant : Sarah Johnson'
      ]
    },
    {
      id: 2,
      title: 'SEO & Content Marketing',
      duration: '8h',
      lessons: [
        'Optimisation SEO technique',
        'Content strategy et calendrier',
        'Rédaction web optimisée',
        'Link building et backlinks',
        'Analytics et reporting',
        'Intervenant : Expert SEO'
      ]
    },
    {
      id: 3,
      title: 'Réseaux Sociaux',
      duration: '8h',
      lessons: [
        'Stratégie réseaux sociaux',
        'Facebook & Instagram Ads',
        'LinkedIn B2B',
        'TikTok et nouvelles plateformes',
        'Community management',
        'Intervenant : Social Media Manager'
      ]
    },
    {
      id: 4,
      title: 'Google Ads & PPC',
      duration: '6h',
      lessons: [
        'Google Search Ads',
        'Google Display Network',
        'Remarketing et audiences',
        'Optimisation des campagnes',
        'Google Analytics 4',
        'Intervenant : PPC Specialist'
      ]
    },
    {
      id: 5,
      title: 'Email Marketing & Automation',
      duration: '6h',
      lessons: [
        'Stratégie email marketing',
        'Segmentation et personnalisation',
        'Automatisation des emails',
        'A/B testing et optimisation',
        'Conformité RGPD',
        'Intervenant : Email Marketing Expert'
      ]
    },
    {
      id: 6,
      title: 'Growth Hacking',
      duration: '4h',
      lessons: [
        'Méthodologie Growth Hacking',
        'Acquisition, activation, rétention',
        'Outils et technologies',
        'Expérimentation et tests',
        'Intervenant : Sarah Johnson'
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
    'Projet pratique certifiant'
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Alexandre Dubois',
      company: 'Marketing Manager, StartupTech',
      rating: 5,
      comment: 'Formation complète et à jour avec les dernières tendances. J\'ai pu implémenter immédiatement les stratégies apprises.'
    },
    {
      id: 2,
      name: 'Marie Laurent',
      company: 'Freelance Marketing Digital',
      rating: 5,
      comment: 'Excellente formation, instructrice très compétente. Les outils fournis sont directement utilisables.'
    },
    {
      id: 3,
      name: 'Thomas Moreau',
      company: 'Directeur Marketing, E-commerce Plus',
      rating: 4,
      comment: 'Contenu riche et pratique, j\'ai appris beaucoup sur le growth hacking et l\'optimisation des campagnes.'
    }
  ];

  const stats = [
    { label: 'Augmentation trafic moyen', value: '+150%', icon: TrendingUp },
    { label: 'Amélioration conversion', value: '+45%', icon: Target },
    { label: 'ROI formation', value: '400%', icon: BarChart3 },
    { label: 'Taux de satisfaction', value: '98%', icon: Star }
  ];

  const tools = [
    { name: 'Google Analytics 4', icon: BarChart3, description: 'Analyse des performances' },
    { name: 'Facebook Ads Manager', icon: Facebook, description: 'Publicité sociale' },
    { name: 'Google Ads', icon: Target, description: 'Publicité payante' },
    { name: 'Mailchimp', icon: MessageSquare, description: 'Email marketing' },
    { name: 'Canva Pro', icon: Instagram, description: 'Design graphique' },
    { name: 'Semrush', icon: TrendingUp, description: 'SEO & Analytics' }
  ];

  const handleEnrollment = () => {
    window.location.href = '/formations/marketing-digital/inscription';
  };

  return (
    <>
      <AdvancedSEO
        title="Formation Marketing Digital Avancé - DL Solutions"
        description="Maîtrisez le marketing digital avec notre formation complète. SEO, réseaux sociaux, Google Ads, email marketing et growth hacking."
        keywords="marketing digital, formation, SEO, réseaux sociaux, Google Ads, email marketing, growth hacking, DL Solutions"
        image="https://dlsolutions.com/images/instructors/sarah-johnson.jpg"
        url="https://dlsolutions.com/formations/marketing-digital"
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
          { name: 'Marketing Digital', url: 'https://dlsolutions.com/formations/marketing-digital' }
        ]}
        course={{
          name: 'Marketing Digital Avancé',
          description: 'Maîtrisez les stratégies digitales modernes et boostez votre présence en ligne',
          provider: 'DL Solutions',
          instructor: 'Sarah Johnson',
          duration: '40 heures',
          price: '799',
          currency: 'EUR'
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 mr-3" />
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
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-2">{stat.value}</div>
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
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Programme
                    </button>
                    <button
                      onClick={() => setActiveTab('instructeur')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'instructeur'
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Instructeur
                    </button>
                    <button
                      onClick={() => setActiveTab('avis')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'avis'
                          ? 'border-purple-500 text-purple-600'
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
                                  <Play className="w-4 h-4 mr-3 text-purple-500" />
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
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {courseData.instructor.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{courseData.instructor}</h4>
                          <p className="text-purple-600 font-medium mb-4">{courseData.instructorTitle}</p>
                          <p className="text-gray-600 mb-4">
                            Experte en marketing digital avec plus de 10 ans d'expérience dans le growth hacking et l'optimisation des performances marketing. Sarah a accompagné plus de 200 entreprises dans leur transformation digitale.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-900">Expertise :</span>
                              <p className="text-gray-600">Growth Hacking, SEO, PPC, Social Media</p>
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
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
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
                      <tool.icon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">{tool.name}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projet pratique */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Projet pratique certifiant</h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Développez votre stratégie marketing digital</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Objectifs :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Analyse de marché complète</li>
                        <li>• Stratégie multi-canal</li>
                        <li>• Plan d'action détaillé</li>
                        <li>• KPIs et métriques</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Livrables :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Document stratégique</li>
                        <li>• Plan de campagne</li>
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
                  <div className="text-4xl font-bold text-purple-600 mb-2">{courseData.price}€</div>
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
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
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