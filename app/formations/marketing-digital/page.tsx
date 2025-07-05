'use client';

import { ArrowRight, Award, Check, Clock, Play, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Module {
  id: string;
  title: string;
  duration: string;
  description: string;
  topics: string[];
  completed: boolean;
}

interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  students: number;
  experience: string;
  bio: string;
}

const modules: Module[] = [
  {
    id: '1',
    title: 'Fondamentaux du Marketing Digital',
    duration: '4h 30min',
    description: 'Comprendre les bases du marketing digital et les nouvelles tendances',
    topics: [
      'Introduction au marketing digital',
      'Évolution du marketing traditionnel vers le digital',
      'Les canaux de communication digitaux',
      'Stratégie marketing omnicanale'
    ],
    completed: false
  },
  {
    id: '2',
    title: 'SEO et Référencement Naturel',
    duration: '6h 15min',
    description: 'Maîtriser les techniques de référencement pour améliorer votre visibilité',
    topics: [
      'Optimisation on-page et off-page',
      'Recherche de mots-clés',
      'Optimisation technique',
      'Mesure des performances SEO'
    ],
    completed: false
  },
  {
    id: '3',
    title: 'Publicité en Ligne (Google Ads, Facebook Ads)',
    duration: '5h 45min',
    description: 'Créer et optimiser des campagnes publicitaires performantes',
    topics: [
      'Google Ads : Search et Display',
      'Facebook et Instagram Ads',
      'Création de campagnes ciblées',
      'Optimisation des performances'
    ],
    completed: false
  },
  {
    id: '4',
    title: 'Marketing de Contenu et Social Media',
    duration: '4h 20min',
    description: 'Développer une stratégie de contenu engageante',
    topics: [
      'Stratégie de contenu',
      'Gestion des réseaux sociaux',
      'Content marketing',
      'Influence marketing'
    ],
    completed: false
  },
  {
    id: '5',
    title: 'Email Marketing et Automatisation',
    duration: '3h 50min',
    description: 'Automatiser vos processus marketing pour plus d\'efficacité',
    topics: [
      'Stratégies d\'email marketing',
      'Automatisation des campagnes',
      'Segmentation des audiences',
      'Mesure des performances'
    ],
    completed: false
  },
  {
    id: '6',
    title: 'Analytics et Mesure des Performances',
    duration: '4h 10min',
    description: 'Mesurer et analyser les performances de vos campagnes',
    topics: [
      'Google Analytics 4',
      'Tableaux de bord marketing',
      'ROI et KPIs',
      'Optimisation continue'
    ],
    completed: false
  }
];

const instructors: Instructor[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    title: 'Experte Marketing Digital',
    avatar: '/images/instructors/marie-dubois.jpg',
    rating: 4.9,
    students: 1247,
    experience: '8 ans d\'expérience',
    bio: 'Marie est une experte reconnue du marketing digital avec plus de 8 ans d\'expérience. Elle a accompagné plus de 200 entreprises dans leur transformation digitale et formé plus de 1000 professionnels.'
  },
  {
    id: '2',
    name: 'Thomas Martin',
    title: 'Spécialiste SEO & Analytics',
    avatar: '/images/instructors/thomas-martin.jpg',
    rating: 4.8,
    students: 892,
    experience: '6 ans d\'expérience',
    bio: 'Thomas est spécialisé dans le SEO et l\'analytics. Il a optimisé plus de 150 sites web et formé des équipes marketing dans des entreprises de toutes tailles.'
  }
];

const testimonials = [
  {
    id: '1',
    name: 'Sophie Laurent',
    company: 'Startup Tech',
    rating: 5,
    comment: 'Cette formation a complètement transformé notre approche marketing. Nous avons augmenté nos conversions de 40% en 3 mois !'
  },
  {
    id: '2',
    name: 'Pierre Moreau',
    company: 'Agence Web',
    rating: 5,
    comment: 'Excellente formation, très pratique et applicable immédiatement. Les instructeurs sont vraiment experts dans leur domaine.'
  },
  {
    id: '3',
    name: 'Julie Bernard',
    company: 'E-commerce',
    rating: 5,
    comment: 'Formation complète et à jour avec les dernières tendances. Je recommande vivement pour tous les professionnels du marketing.'
  }
];

export default function MarketingDigitalPage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const totalDuration = modules.reduce((total, module) => {
    const [hours, minutes] = module.duration.split('h ').map(Number);
    return total + hours * 60 + minutes;
  }, 0);

  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = totalDuration % 60;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Formation Certifiante
                </span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Niveau Intermédiaire
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Marketing Digital
              </h1>
              
              <p className="text-xl mb-8 text-blue-100">
                Maîtrisez les stratégies marketing digital modernes et boostez votre carrière avec cette formation complète et pratique.
              </p>

              <div className="flex items-center space-x-8 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{totalHours}h {totalMinutes}min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>1,247 étudiants inscrits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>4.9/5 (156 avis)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/formations/marketing-digital/inscription"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  S'inscrire maintenant
                </Link>
                <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  <Play className="h-5 w-5 inline mr-2" />
                  Voir la démo
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/courses/marketing-digital-hero.jpg"
                alt="Marketing Digital"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* What You'll Learn */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Ce que vous allez apprendre</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Maîtriser les fondamentaux du marketing digital',
                  'Créer des campagnes publicitaires performantes',
                  'Optimiser votre référencement naturel (SEO)',
                  'Développer une stratégie de contenu engageante',
                  'Automatiser vos processus marketing',
                  'Mesurer et analyser vos performances',
                  'Gérer vos réseaux sociaux efficacement',
                  'Comprendre les nouvelles tendances du digital'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Programme de la formation</h2>
              
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                      selectedModule === module.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{module.duration}</span>
                        <ArrowRight className={`h-4 w-4 transition-transform ${
                          selectedModule === module.id ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </div>
                    
                    {selectedModule === module.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Contenu du module :</h4>
                        <ul className="space-y-2">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructors */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Vos instructeurs</h2>
              
              <div className="space-y-6">
                {instructors.map(instructor => (
                  <div key={instructor.id} className="flex items-start space-x-6">
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{instructor.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{instructor.title}</p>
                      <p className="text-gray-600 mb-3">{instructor.bio}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{instructor.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{instructor.students} étudiants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>{instructor.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Avis des étudiants</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Course Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">€497</div>
                  <div className="text-sm text-gray-500 line-through">€697</div>
                  <div className="text-green-600 font-medium">Économisez €200</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Durée</span>
                    <span className="font-medium">{totalHours}h {totalMinutes}min</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Niveau</span>
                    <span className="font-medium">Intermédiaire</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Format</span>
                    <span className="font-medium">Vidéo + Exercices</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Certification</span>
                    <span className="font-medium text-green-600">Incluse</span>
                  </div>
                </div>

                <Link
                  href="/formations/marketing-digital/inscription"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block mb-4"
                >
                  S'inscrire maintenant
                </Link>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Accès à vie • Garantie 30 jours
                  </p>
                </div>
              </div>

              {/* Course Features */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-4">Ce qui est inclus</h3>
                
                <div className="space-y-3">
                  {[
                    'Accès à vie au contenu',
                    'Certificat de formation',
                    'Support technique',
                    'Exercices pratiques',
                    'Ressources téléchargeables',
                    'Communauté d\'étudiants',
                    'Mises à jour gratuites'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}