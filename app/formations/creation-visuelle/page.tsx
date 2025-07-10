'use client';

import AdvancedSEO from '@/components/AdvancedSEO';
import { Award, Brush, Calendar, CheckCircle, Clock, Download, MapPin, MessageSquare, Palette, Phone, Play, Star, Target, TrendingUp, Users, Video } from 'lucide-react';
import { useState } from 'react';

export default function CreationVisuellePage() {
  const [activeTab, setActiveTab] = useState('programme');

  const courseData = {
    title: 'Création Visuelle & Design Digital',
    subtitle: 'Maîtrisez les outils de création visuelle et développez votre créativité digitale',
    duration: '42 heures',
    level: 'Débutant à Avancé',
    price: 749,
    originalPrice: 950,
    students: 56,
    rating: 4.9,
    reviews: 22,
    instructor: 'Emma Rodriguez',
    instructorTitle: 'Designer Créative & Art Director',
    instructorImage: '/images/instructors/emma-rodriguez.jpg',
    startDate: '2024-04-10',
    location: 'Paris & En ligne',
    maxStudents: 20
  };

  const modules = [
    {
      id: 1,
      title: 'Fondamentaux du Design',
      duration: '8h',
      lessons: [
        'Principes de design et théorie des couleurs',
        'Typographie et hiérarchie visuelle',
        'Composition et mise en page',
        'Branding et identité visuelle',
        'Design thinking et processus créatif',
        'Intervenant : Emma Rodriguez'
      ]
    },
    {
      id: 2,
      title: 'Adobe Creative Suite',
      duration: '10h',
      lessons: [
        'Photoshop : retouche et manipulation d\'images',
        'Illustrator : création vectorielle et logos',
        'InDesign : mise en page et publications',
        'Workflow et intégration entre logiciels',
        'Optimisation pour le web et print',
        'Intervenant : Adobe Certified Instructor'
      ]
    },
    {
      id: 3,
      title: 'Design Web & UI/UX',
      duration: '8h',
      lessons: [
        'Design responsive et mobile-first',
        'Wireframes et prototypes',
        'Design systems et composants',
        'Accessibilité et ergonomie',
        'Figma et outils collaboratifs',
        'Intervenant : UI/UX Designer'
      ]
    },
    {
      id: 4,
      title: 'Photographie & Vidéo',
      duration: '6h',
      lessons: [
        'Photographie produit et lifestyle',
        'Édition vidéo avec Premiere Pro',
        'Motion design avec After Effects',
        'Optimisation pour les réseaux sociaux',
        'Storytelling visuel',
        'Intervenant : Photographe/Vidéaste'
      ]
    },
    {
      id: 5,
      title: 'Marketing Visuel',
      duration: '6h',
      lessons: [
        'Design pour réseaux sociaux',
        'Campagnes publicitaires visuelles',
        'Infographies et data visualization',
        'Email marketing et newsletters',
        'A/B testing visuel',
        'Intervenant : Marketing Designer'
      ]
    },
    {
      id: 6,
      title: 'Portfolio & Freelance',
      duration: '4h',
      lessons: [
        'Création d\'un portfolio professionnel',
        'Pricing et négociation client',
        'Gestion de projet créatif',
        'Développement de carrière',
        'Intervenant : Emma Rodriguez'
      ]
    }
  ];

  const benefits = [
    'Certification Design Digital reconnue',
    'Accès à vie au contenu',
    'Support personnalisé',
    'Réseau de créatifs professionnels',
    'Outils et templates inclus',
    'Suivi post-formation',
    'Portfolio professionnel inclus'
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Alexandre Dubois',
      company: 'Freelance Designer, CreativeStudio',
      rating: 5,
      comment: 'Formation exceptionnelle qui m\'a permis de lancer ma carrière de designer freelance. Portfolio professionnel inclus !'
    },
    {
      id: 2,
      name: 'Marie Laurent',
      company: 'Marketing Manager, TechStartup',
      rating: 5,
      comment: 'Excellente formation, très pratique. J\'ai pu créer des visuels professionnels dès la première semaine.'
    },
    {
      id: 3,
      name: 'Thomas Moreau',
      company: 'Social Media Manager, FashionBrand',
      rating: 4,
      comment: 'Contenu riche et instructrice très créative. J\'ai appris beaucoup sur le design pour réseaux sociaux.'
    }
  ];

  const stats = [
    { label: 'Augmentation créativité', value: '+200%', icon: TrendingUp },
    { label: 'Amélioration qualité visuelle', value: '+85%', icon: Target },
    { label: 'ROI formation', value: '450%', icon: Palette },
    { label: 'Taux de satisfaction', value: '98%', icon: Star }
  ];

  const tools = [
    { name: 'Adobe Photoshop', icon: Brush, description: 'Retouche et manipulation' },
    { name: 'Adobe Illustrator', icon: Palette, description: 'Création vectorielle' },
    { name: 'Figma', icon: Target, description: 'Design collaboratif' },
    { name: 'Adobe Premiere', icon: Video, description: 'Édition vidéo' },
    { name: 'Canva Pro', icon: TrendingUp, description: 'Design rapide' },
    { name: 'Adobe After Effects', icon: Video, description: 'Motion design' }
  ];

  const projects = [
    {
      title: 'Identité Visuelle Complète',
      description: 'Logo, charte graphique et supports de communication',
      deliverables: 'Logo vectoriel, charte graphique, templates'
    },
    {
      title: 'Site Web Responsive',
      description: 'Design UI/UX et maquettes interactives',
      deliverables: 'Wireframes, prototypes, design system'
    },
    {
      title: 'Campagne Marketing',
      description: 'Visuels pour réseaux sociaux et publicités',
      deliverables: 'Bannières, posts, vidéos, infographies'
    }
  ];

  const handleEnrollment = () => {
    window.location.href = '/formations/creation-visuelle/inscription';
  };

  return (
    <>
      <AdvancedSEO
        title="Formation Création Visuelle & Design Digital - DL Solutions"
        description="Maîtrisez la création visuelle avec notre formation complète. Adobe Creative Suite, design web, UI/UX et marketing visuel."
        keywords="création visuelle, design digital, formation, Adobe, Photoshop, Illustrator, UI/UX, marketing visuel, DL Solutions"
        image="https://dlsolutions.com/images/instructors/emma-rodriguez.jpg"
        url="https://dlsolutions.com/formations/creation-visuelle"
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
          { name: 'Création Visuelle', url: 'https://dlsolutions.com/formations/creation-visuelle' }
        ]}
        course={{
          name: 'Création Visuelle & Design Digital',
          description: 'Maîtrisez les outils de création visuelle et développez votre créativité digitale',
          provider: 'DL Solutions',
          instructor: 'Emma Rodriguez',
          duration: '42 heures',
          price: '749',
          currency: 'EUR'
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <Palette className="w-8 h-8 mr-3" />
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
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-pink-600" />
                </div>
                <div className="text-2xl font-bold text-pink-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Projets réalisés */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Projets réalisés pendant la formation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{project.title}</h4>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="text-pink-600 font-medium text-sm">{project.deliverables}</div>
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
                          ? 'border-pink-500 text-pink-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Programme
                    </button>
                    <button
                      onClick={() => setActiveTab('instructeur')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'instructeur'
                          ? 'border-pink-500 text-pink-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Instructeur
                    </button>
                    <button
                      onClick={() => setActiveTab('avis')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'avis'
                          ? 'border-pink-500 text-pink-600'
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
                                  <Play className="w-4 h-4 mr-3 text-pink-500" />
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
                        <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {courseData.instructor.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{courseData.instructor}</h4>
                          <p className="text-pink-600 font-medium mb-4">{courseData.instructorTitle}</p>
                          <p className="text-gray-600 mb-4">
                            Designer créative avec plus de 10 ans d'expérience dans la création visuelle et le design digital. Emma a travaillé avec plus de 100 marques et formé plus de 300 créatifs. Son portfolio inclut des projets pour des entreprises internationales.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-900">Expertise :</span>
                              <p className="text-gray-600">Design digital, Adobe Suite, UI/UX, Branding</p>
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
                      <CheckCircle className="w-5 h-5 text-pink-500 mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outils inclus */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Outils et logiciels inclus</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tools.map((tool, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <tool.icon className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">{tool.name}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio inclus */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Portfolio professionnel inclus</h3>
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Développez votre présence créative</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Inclus dans la formation :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Portfolio web professionnel</li>
                        <li>• Templates personnalisables</li>
                        <li>• Présentation créative</li>
                        <li>• Optimisation SEO</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Livrables :</span>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Site portfolio responsive</li>
                        <li>• Projets certifiants</li>
                        <li>• Présentation finale</li>
                        <li>• Certification Design Digital</li>
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
                  <div className="text-4xl font-bold text-pink-600 mb-2">{courseData.price}€</div>
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
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
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