"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, CheckCircle, ChevronRight, Code, Globe, Pause, Play, Rocket, Shield, ShoppingCart, Smartphone, Star, TrendingUp, Users } from "lucide-react";
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    {
      id: 1,
      title: "NovaIA - Intelligence Artificielle",
      description: "Découvrez notre écosystème d'agents IA ultra-avancé",
      thumbnail: "/images/nova-ia-preview.jpg",
      videoUrl: "/videos/nova-ia-demo.mp4",
      duration: "2:34"
    },
    {
      id: 2,
      title: "DL Solutions - Écosystème Digital",
      description: "Solutions complètes pour entreprises modernes",
      thumbnail: "/images/dl-solutions-preview.jpg",
      videoUrl: "/videos/dl-solutions-overview.mp4",
      duration: "3:15"
    },
    {
      id: 3,
      title: "Sentinel Zero - Cybersécurité IA",
      description: "Protection avancée avec intelligence artificielle",
      thumbnail: "/images/sentinel-zero-preview.jpg",
      videoUrl: "/videos/sentinel-zero-demo.mp4",
      duration: "4:22"
    }
  ];

  const services = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Intelligence Artificielle",
      description: "Solutions IA avancées pour automatisation et optimisation",
      features: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Développement Web",
      description: "Applications web modernes et performantes",
      features: ["React/Next.js", "Node.js", "TypeScript", "API REST"],
      color: "from-green-500 to-blue-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Applications Mobiles",
      description: "Apps natives et cross-platform",
      features: ["React Native", "Flutter", "iOS", "Android"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & BI",
      description: "Analyse de données et business intelligence",
      features: ["Tableau", "Power BI", "Python", "SQL"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "E-commerce",
      description: "Plateformes de vente en ligne complètes",
      features: ["WooCommerce", "Shopify", "Paiements", "Logistique"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Cybersécurité",
      description: "Protection et sécurité informatique",
      features: ["Audit", "Pentesting", "Compliance", "Monitoring"],
      color: "from-red-500 to-purple-500"
    }
  ];

  const stats = [
    { number: "500+", label: "Projets Réalisés", icon: <Rocket className="h-6 w-6" /> },
    { number: "50+", label: "Clients Satisfaits", icon: <Users className="h-6 w-6" /> },
    { number: "99.9%", label: "Disponibilité", icon: <TrendingUp className="h-6 w-6" /> },
    { number: "24/7", label: "Support", icon: <Globe className="h-6 w-6" /> }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "CEO, TechStart",
      content: "DL Solutions a transformé notre entreprise avec leurs solutions IA innovantes.",
      rating: 5,
      avatar: "/images/testimonials/marie.jpg"
    },
    {
      name: "Jean Martin",
      role: "CTO, InnovCorp",
      content: "Une équipe professionnelle qui livre des résultats exceptionnels.",
      rating: 5,
      avatar: "/images/testimonials/jean.jpg"
    },
    {
      name: "Sophie Bernard",
      role: "Directrice Marketing, GrowthLab",
      content: "Leur expertise en IA a révolutionné notre stratégie digitale.",
      rating: 5,
      avatar: "/images/testimonials/sophie.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            DL Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Écosystème Digital Ultra-Avancé avec IA Souveraine, Solutions Innovantes et Transformation Numérique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Découvrir Nos Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Nous Contacter
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-8 w-8 text-white rotate-90" />
        </div>
      </section>

      {/* Section Écosystème des Agents IA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Écosystème des Agents IA Ultra-Avancés
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez nos agents IA souverains et autonomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Sentinel Zero Card */}
            <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 backdrop-blur-sm p-8 rounded-2xl border border-red-500/30 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-white mb-4">Sentinel Zero</h3>
              <p className="text-gray-300 mb-4">
                Agent Red Team IA ultra-avancé pour la cybersécurité souveraine. 
                Authentification 5 niveaux, modules d'attaque, protocole Red Button.
              </p>
              <Link href="/sentinel-zero">
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                  Accès Sentinel Zero
                </Button>
              </Link>
            </div>

            {/* NovaAgent AI Commercial Card */}
            <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/30 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-white mb-4">NovaAgent AI Commercial</h3>
              <p className="text-gray-300 mb-4">
                Agent IA commercial et communication digitale. Gestion des réseaux sociaux, 
                analyse de tendances, recommandations stratégiques.
              </p>
              <Link href="/nova-ia-commercial">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Accès NovaAgent AI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Solutions complètes pour la transformation numérique de votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Chiffres Clés
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Notre impact et notre expertise en chiffres
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <p className="text-sm md:text-base text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Vidéos Présentations */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Découvrez Nos Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des vidéos présentations pour comprendre nos technologies et innovations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={video.id} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="relative mb-4">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      variant="ghost" 
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{video.title}</h3>
                <p className="text-gray-300 text-sm">{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Témoignages de nos clients satisfaits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{testimonial.content}</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contactez-nous dès aujourd'hui pour discuter de vos projets et découvrir comment nos solutions peuvent vous aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Commencer Maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Voir Nos Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
