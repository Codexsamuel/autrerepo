"use client";

import { mediaConfig } from '@/app/config/media';
import MarqueeBanner from "@/components/ui/MarqueeBanner";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, CheckCircle, ChevronRight, Code, CreditCard, Globe, Package, Pause, Play, Rocket, Shield, ShoppingCart, Smartphone, Star, Store, TrendingUp, Users, Zap } from "lucide-react";
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    {
      id: 1,
      title: "Institut Français de Yaoundé",
      description: "Événement à l'Institut Français avec couverture professionnelle",
      thumbnail: "/images/hero-poster.jpg",
      videoUrl: mediaConfig.events.institutFrancais,
      duration: "2:34"
    },
    {
      id: 2,
      title: "Reportage Agence",
      description: "Couverture d'événements avec équipements professionnels",
      thumbnail: "/images/hero-poster.jpg",
      videoUrl: mediaConfig.events.reportageAgence,
      duration: "3:15"
    },
    {
      id: 3,
      title: "Événement Institut Français",
      description: "Événement spécial avec montage professionnel",
      thumbnail: "/images/hero-poster.jpg",
      videoUrl: mediaConfig.events.evenementInstitut,
      duration: "4:22"
    },
    {
      id: 4,
      title: "Teasing UCAC",
      description: "Teasing de l'événement UCAC avec montage professionnel",
      thumbnail: "/images/hero-poster.jpg",
      videoUrl: mediaConfig.events.teasingUCAC,
      duration: "1:45"
    },
    {
      id: 5,
      title: "UCAC",
      description: "Couverture complète de l'événement UCAC avec drone et équipements HD",
      thumbnail: "/images/hero-poster.jpg",
      videoUrl: mediaConfig.events.ucac,
      duration: "5:12"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Bande d'Information qui Défile */}
      <MarqueeBanner />
      
      {/* Section Hero avec Vidéo Background - VERSION ORIGINALE AVEC BATOBAYE */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background - VRAIES VIDÉOS CLOUDINARY RESTAURÉES */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
            poster="/images/hero-poster.jpg"
          >
            <source src={mediaConfig.heroVideos.digitalUniverse} type="video/mp4" />
            <source src={mediaConfig.heroVideos.innovation} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-purple-900/30 to-black/50"></div>
        </div>

        {/* Contenu Hero - VERSION ORIGINALE AVEC BATOBAYE EN PREMIER PLAN */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="text-8xl md:text-9xl mb-4 animate-pulse">🚀</div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              DL Solutions
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-gray-200 font-light">
              Écosystème Digital Complet
            </p>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Davy & Lucie - Innovation & Excellence
            </p>
          </div>

          {/* SECTION BATOBAYE MARKETPLACE - PRODUIT PHARE ORIGINAL */}
          <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-sm p-8 rounded-2xl border border-green-500/30 mb-12 max-w-4xl mx-auto">
            <div className="text-4xl mb-4">🛒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Batobaye Marketplace</h2>
            <p className="text-lg text-gray-300 mb-6">
              Notre plateforme e-commerce complète avec dashboard admin VIP, intégrations IA avancées, 
              système de paiement CinetPay et analytics en temps réel.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-300">
                <Store className="h-5 w-5 mr-2 text-green-400" />
                Dashboard Admin VIP
              </div>
              <div className="flex items-center text-gray-300">
                <Brain className="h-5 w-5 mr-2 text-blue-400" />
                IA Intégrée
              </div>
              <div className="flex items-center text-gray-300">
                <CreditCard className="h-5 w-5 mr-2 text-purple-400" />
                Paiement CinetPay
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portfolio/batobaye">
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3">
                  <Package className="mr-2 h-5 w-5" />
                  Découvrir Batobaye
                </Button>
              </Link>
              <Link href="https://github.com/Codexsamuel/batobaye" target="_blank">
                <Button variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white px-6 py-3">
                  <Zap className="mr-2 h-5 w-5" />
                  Code Source
                </Button>
              </Link>
            </div>
          </div>

          {/* Boutons d'action - BOUTON NOVAIA RESTAURÉ */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/nova-ia">
              <Button size="lg" className="px-8 py-3 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg">
                NovaIA - Intelligence Artificielle <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-2 border-white text-white bg-transparent hover:bg-white/20 transition-all duration-300 shadow-lg">
                Contactez-nous
              </Button>
            </Link>
          </div>

          {/* Stats Rapides - DESIGN ORIGINAL RESTAURÉ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center">
                  {stat.icon}
                  <span className="ml-2">{stat.number}</span>
                </div>
                <p className="text-sm md:text-base text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - DESIGN ORIGINAL RESTAURÉ */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-8 w-8 text-white rotate-90" />
        </div>
      </section>

      {/* Section Vidéos Présentations - VRAIES VIDÉOS INSTITUT FRANÇAIS & UCAC */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nos Réalisations Vidéo
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez nos productions vidéo professionnelles : Institut Français, UCAC, et plus encore
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={video.id} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23666'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='16'%3E%3C/tspan%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-300 mb-4">{video.description}</p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Regarder la Vidéo
                  </Button>
                </div>
              </div>
            ))}
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
              Des solutions complètes pour transformer votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  En savoir plus
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section NovaIA - Univers IA Ultra-Avancé */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-8xl mb-6 animate-pulse">🧠</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">NovaIA - Centre d'Intelligence Artificielle</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez notre écosystème d'agents IA ultra-avancé avec protocoles A2A/MCP et système de battle ELO
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Battle Arena Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-semibold text-white mb-4">Battle Arena</h3>
              <p className="text-gray-300 mb-4">
                Faites s'affronter vos agents IA préférés dans notre arène de compétition
              </p>
              <Link href="/nova-ia/battle">
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  Lancer un Battle
                </Button>
              </Link>
            </div>

            {/* Protocoles Avancés Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-white mb-4">Protocoles A2A/MCP</h3>
              <p className="text-gray-300 mb-4">
                Communication avancée entre agents IA avec protocoles sécurisés
              </p>
              <Link href="/nova-ia/protocols">
                <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                  Explorer les Protocoles
                </Button>
              </Link>
            </div>

            {/* Marketplace d'Agents Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-white mb-4">Marketplace d'Agents</h3>
              <p className="text-gray-300 mb-4">
                Plus de 50 agents IA spécialisés disponibles à l'achat et à la location
              </p>
              <Link href="/nova-ia/marketplace">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Parcourir le Marketplace
                </Button>
              </Link>
            </div>

            {/* Système ELO Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-white mb-4">Système ELO</h3>
              <p className="text-gray-300 mb-4">
                Classement et progression des agents IA basé sur leurs performances
              </p>
              <Link href="/nova-ia/elo">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                  Voir le Classement
                </Button>
              </Link>
            </div>
          </div>

          {/* CTA Principal NovaIA */}
          <div className="text-center">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <Brain className="mr-3 h-8 w-8" />
                Accéder à NovaIA
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23666'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='16'%3E%3C/tspan%3E%3C/svg%3E";
                    }}
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
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

      {/* Section Contact */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prêt à Transformer Votre Entreprise ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contactez-nous pour discuter de vos projets et découvrir comment DL Solutions peut vous aider
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                Commencer Maintenant
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white/20 px-8 py-4 text-lg">
                Nos Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
