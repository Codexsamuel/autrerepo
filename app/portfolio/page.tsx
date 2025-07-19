'use client';

import SEOOptimized from '@/components/SEOOptimized';
import { Award, Calendar, Code, Database, ExternalLink, Github, Globe, Palette, Smartphone, Star, Users, Zap } from 'lucide-react';
import { useState } from 'react';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'DL Solutions Platform',
      description: 'Plateforme complète de solutions digitales avec IA intégrée, e-commerce, et outils de gestion d\'entreprise.',
      category: 'web',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI/ML'],
      image: '/images/portfolio/dl-solutions.jpg',
      github: 'https://github.com/dlsolutions',
      live: 'https://daveandlucesolutions.com',
      rating: 5,
      views: 1250,
      featured: true
    },
    {
      id: 2,
      title: 'DL Travel Booking System',
      description: 'Système de réservation de voyages avec recherche avancée, gestion d\'hôtels et packages personnalisés.',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Google Maps API'],
      image: '/images/portfolio/dl-travel.jpg',
      github: 'https://github.com/dltravel',
      live: 'https://dltravel.com',
      rating: 4.8,
      views: 890,
      featured: true
    },
    {
      id: 3,
      title: 'DL Style E-commerce',
      description: 'Plateforme e-commerce moderne avec IA de recommandation, gestion d\'inventaire et analytics avancés.',
      category: 'ecommerce',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'AI'],
      image: '/images/portfolio/dl-style.jpg',
      github: 'https://github.com/dlstyle',
      live: 'https://dlstyle.com',
      rating: 4.9,
      views: 2100,
      featured: true
    },
    {
      id: 4,
      title: 'NovaCore Dashboard',
      description: 'Dashboard d\'entreprise avec analytics en temps réel, gestion des utilisateurs et intégrations multiples.',
      category: 'dashboard',
      technologies: ['React', 'D3.js', 'Firebase', 'Material-UI', 'WebSocket'],
      image: '/images/portfolio/novacore.jpg',
      github: 'https://github.com/novacore',
      live: 'https://novacore.com',
      rating: 4.7,
      views: 650,
      featured: false
    },
    {
      id: 5,
      title: 'DL Trading Platform',
      description: 'Plateforme de trading avec graphiques en temps réel, signaux automatisés et gestion de portefeuille.',
      category: 'fintech',
      technologies: ['Vue.js', 'WebSocket', 'TradingView', 'Node.js', 'Redis'],
      image: '/images/portfolio/dl-trading.jpg',
      github: 'https://github.com/dltrading',
      live: 'https://dltrading.com',
      rating: 4.6,
      views: 450,
      featured: false
    },
    {
      id: 6,
      title: 'NovaWorld Social Network',
      description: 'Réseau social professionnel avec messagerie en temps réel, groupes et fonctionnalités collaboratives.',
      category: 'social',
      technologies: ['React Native', 'GraphQL', 'Socket.io', 'AWS', 'Redis'],
      image: '/images/portfolio/novaworld.jpg',
      github: 'https://github.com/novaworld',
      live: 'https://novaworld.com',
      rating: 4.5,
      views: 320,
      featured: false
    }
  ];

  const skills = [
    { name: 'Frontend Development', level: 95, icon: Code, color: 'blue' },
    { name: 'Backend Development', level: 90, icon: Database, color: 'green' },
    { name: 'UI/UX Design', level: 85, icon: Palette, color: 'purple' },
    { name: 'Mobile Development', level: 80, icon: Smartphone, color: 'orange' },
    { name: 'DevOps & Cloud', level: 85, icon: Globe, color: 'indigo' },
    { name: 'AI & Machine Learning', level: 75, icon: Zap, color: 'red' }
  ];

  const experiences = [
    {
      id: 1,
      title: 'Lead Full Stack Developer',
      company: 'DL Solutions',
      period: '2023 - Présent',
      description: 'Développement de plateformes complètes avec IA intégrée, gestion d\'équipe et architecture technique.',
      technologies: ['Next.js', 'React', 'Node.js', 'AI/ML', 'AWS']
    },
    {
      id: 2,
      title: 'Senior Frontend Developer',
      company: 'Tech Innovations',
      period: '2021 - 2023',
      description: 'Création d\'interfaces utilisateur modernes et optimisation des performances pour applications web.',
      technologies: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS']
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      period: '2019 - 2021',
      description: 'Développement d\'applications web complètes et intégration de systèmes tiers.',
      technologies: ['JavaScript', 'PHP', 'MySQL', 'Laravel']
    }
  ];

  const filters = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'web', label: 'Web' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'fintech', label: 'Fintech' },
    { id: 'social', label: 'Social' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      <SEOOptimized
        pageKey="portfolio"
        customConfig={{
          title: "Portfolio | Projets & Réalisations DL Solutions",
          description: "Découvrez notre portfolio de projets : sites web, applications, CRM, e-commerce, IA. Réalisations DL Solutions pour entreprises au Cameroun et à l'international.",
          url: "https://www.dl-solutions.com/portfolio"
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Portfolio</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Découvrez mes projets, compétences et expériences dans le développement web et les technologies modernes
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Projets Réalisés</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">5+</div>
              <div className="text-gray-600">Années d'Expérience</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">Technologies Maîtrisées</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Satisfaction Client</div>
            </div>
          </div>

          {/* Compétences */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Compétences Techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-${skill.color}-100 rounded-lg flex items-center justify-center mr-4`}>
                      <skill.icon className={`w-6 h-6 text-${skill.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                      <div className="text-sm text-gray-600">{skill.level}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${skill.color}-600 h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projets */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Projets Réalisés</h2>
            
            {/* Filtres */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeFilter === filter.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Grille des projets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Featured
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold">{project.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Statistiques */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{project.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{project.views}</span>
                      </div>
                    </div>

                    {/* Liens */}
                    <div className="flex space-x-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg text-center hover:bg-gray-700 transition-colors flex items-center justify-center"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expériences */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Expériences Professionnelles</h2>
            <div className="space-y-8">
              {experiences.map(experience => (
                <div key={experience.id} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{experience.title}</h3>
                      <p className="text-blue-600 font-medium mb-1">{experience.company}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {experience.period}
                      </div>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{experience.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}