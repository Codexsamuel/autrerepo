"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FAQSection from '@/components/faq-section';
import TestimonialsSection from '@/components/testimonials-section';
import MediaSection from '@/components/media-section';
import AppointmentPopup from '@/components/appointment-popup';
import CookiesBanner from '@/components/cookies-banner';
import PrivacyMessage from '@/components/privacy-message';
import AIChatbot from '@/components/ai-chatbot';
import WhatsAppButton from '@/components/whatsapp-button';
import { VideoCarousel } from "@/components/ui/video-carousel";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp,
  Shield,
  Zap,
  Globe
} from "lucide-react";
import { mediaConfig } from "@/app/config/media";

const heroVideos = [
  {
    src: mediaConfig.heroVideos.digitalUniverse,
    alt: "Univers Digital Dave and Luce Solutions",
    overlay: "Univers Digital"
  },
  {
    src: mediaConfig.heroVideos.innovation,
    alt: "Innovation Technologique Dave and Luce", 
    overlay: "Innovation"
  },
  {
    src: mediaConfig.heroVideos.technology,
    alt: "Transformation Digitale Dave and Luce",
    overlay: "Transformation"
  }
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const slides = [
    {
      title: "Dave and Luce Solutions - Univers Digital",
      subtitle: "Transformez votre vision en réalité digitale avec Dave et Luce",
      description: "Découvrez notre univers complet de solutions innovantes pour propulser votre entreprise vers l'avenir.",
      background: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1749401814/WhatsApp_Video_2025-06-06_at_22.54.48_fudnfd.mp4"
    },
    {
      title: "Dave and Luce - Innovation & Créativité",
      subtitle: "Des solutions sur mesure pour votre succès avec Dave et Luce",
      description: "Notre équipe d'experts vous accompagne dans votre transformation digitale avec créativité et innovation.",
      background: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1749401792/WhatsApp_Video_2025-06-06_at_22.54.45_drvh4l.mp4"
    },
    {
      title: "Dave and Luce - Excellence Technologique",
      subtitle: "L'avenir de la technologie à votre service avec Dave et Luce",
      description: "Développez votre potentiel avec nos technologies de pointe et notre expertise reconnue.",
      background: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750840734/a_l_instititu_francais_de_yaounde_flojif.mp4"
    }
  ];

  const teamMembers = [
    {
      name: "OBAM Samuel DAVY",
      role: "Expert en gestion et optimisation du parcours client, Formateur en gestion de l'expérience client et téléopération, Associé Gérant",
      image: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg"
    },
    {
      name: "NGA SABINE LUCIE",
      role: "Consultante en Management d'Entreprise",
      image: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg"
    },
    {
      name: "ESSONO Christian",
      role: "Responsable Technique",
      image: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425661/CHRISTIAN_ESSONO_thisjg.jpg"
    },
    {
      name: "FRANCK Marien BECKAM",
      role: "Adjoint Technique, Photographe & Monteur Graphique",
      image: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425681/FRANCK_MARIEN_BECKAM_arwwpq.jpg"
    }
  ];

  const eventVideos = [
    {
      title: "Événement Institut Français",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750840734/a_l_instititu_francais_de_yaounde_flojif.mp4"
    },
    {
      title: "Reportage Agence",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750841005/WhatsApp_Video_2025-06-05_at_01.41.08_zau0s5.mp4"
    },
    {
      title: "Événement Institut Français",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750840992/evenement_a_l_institu_francais_ajicak.mp4"
    },
    {
      title: "Teasing UCAC",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750840982/teasing_UCAC_mllc2k.mp4"
    },
    {
      title: "UCAC",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750840961/UCAC_t3lduu.mp4"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémenter la recherche
    console.log('Recherche:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation Header - Fond blanc */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et Description */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DL</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                    Dave and Luce
                  </span>
                  <span className="text-xs text-gray-500 font-medium leading-tight">
                    Solutions Digitales
                  </span>
                </div>
              </Link>
            </div>

            {/* Barre de recherche */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Rechercher dans l'univers digital Dave and Luce..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                Accueil
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                Services
              </Link>
              <Link href="/a-propos" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                À propos
              </Link>
              <Link href="/novacore" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                NovaCore
              </Link>
              <Link href="/intranet" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                Intranet
              </Link>
              <Link href="/trading" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                DL Trading
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                Contact
              </Link>
              <Link 
                href="/solutions/selection" 
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg text-sm font-medium"
              >
                Connecter Tout
              </Link>
              <Link 
                href="/sign-in" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Connexion
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3 pt-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Accueil
                </Link>
                <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Services
                </Link>
                <Link href="/a-propos" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  À propos
                </Link>
                <Link href="/novacore" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  NovaCore
                </Link>
                <Link href="/intranet" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Intranet
                </Link>
                <Link href="/trading" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  DL Trading
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Contact
                </Link>
                <Link 
                  href="/sign-in" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg text-center"
                >
                  Connexion
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section avec Video Carousel */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <VideoCarousel videos={heroVideos} />
        {/* Contenu Hero - un seul bloc par slide */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pt-24">
          <div className="bg-black/60 rounded-2xl px-8 py-8 max-w-2xl mx-auto text-center shadow-2xl backdrop-blur-md">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
              {slides[currentSlide].title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
              {slides[currentSlide].subtitle}
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 shadow-lg font-semibold">
                Découvrir nos Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 shadow-lg font-semibold">
                Voir la Démo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Solutions Innovantes */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Un univers complet de solutions innovantes
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Pour propulser votre entreprise vers l'avenir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Intelligence Artificielle */}
            <div className="group bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dko5sommz/image/upload/v1750993736/illustration-vectorielle-intelligence-artificielle_1237743-62154_t29exq.avif"
                  alt="Intelligence Artificielle"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Intelligence Artificielle</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Solutions IA avancées pour automatiser vos processus et optimiser vos performances avec des algorithmes de pointe.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" asChild>
                <Link href="/services/ia">
                  Découvrir l'IA
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Trading Intelligent */}
            <div className="group bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif"
                  alt="Trading Intelligent"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trading Intelligent</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Plateforme de trading automatisé avec analyses en temps réel et recommandations basées sur l'IA.
              </p>
              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white" asChild>
                <Link href="/trading">
                  Découvrir le Trading
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Solutions Digitales */}
            <div className="group bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dko5sommz/image/upload/v1750993764/solution_digitale_pmibcf.jpg"
                  alt="Solutions Digitales"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Solutions Digitales</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Développement web, e-commerce et applications mobiles sur mesure avec les dernières technologies.
              </p>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" asChild>
                <Link href="/services">
                  Découvrir les Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Packs */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos Packs de Solutions
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Des solutions adaptées à tous les besoins et budgets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Pack Starter",
                price: "Sur consultation",
                features: ["CRM de base", "Support email", "Formation initiale", "Mise à jour mensuelle"],
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center"
              },
              {
                name: "Pack Business",
                price: "Sur consultation",
                features: ["CRM complet", "ERP intégré", "Support prioritaire", "Formation complète", "Mise à jour hebdomadaire"],
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
                popular: true
              },
              {
                name: "Pack Enterprise",
                price: "Sur consultation",
                features: ["Solution complète", "IA intégrée", "Support 24/7", "Formation sur mesure", "Mise à jour en temps réel"],
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&crop=center"
              }
            ].map((pack, index) => (
              <div key={index} className={`relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm ${pack.popular ? 'ring-2 ring-blue-400' : ''}`}>
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Plus Populaire
                  </div>
                )}
                
                <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                  <img
                    src={pack.image}
                    alt={pack.name}
                    className="object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{pack.name}</h3>
                <div className="text-3xl font-bold text-blue-400 mb-6">{pack.price}</div>
                
                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300" asChild>
                  <Link href="/contact">
                    Demander un devis
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Solutions Complètes pour Votre Entreprise
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Découvrez notre écosystème digital intégré avec des solutions sur mesure 
              pour chaque secteur d'activité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-blue-600" />,
                title: "Sécurité Avancée",
                description: "Protection complète de vos données avec des protocoles de sécurité de niveau entreprise."
              },
              {
                icon: <Zap className="h-12 w-12 text-blue-600" />,
                title: "Performance Optimale",
                description: "Systèmes optimisés pour des performances maximales et une expérience utilisateur fluide."
              },
              {
                icon: <Globe className="h-12 w-12 text-blue-600" />,
                title: "Accessibilité Globale",
                description: "Accès depuis n'importe où, sur tous les appareils, avec une synchronisation en temps réel."
              },
              {
                icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
                title: "Analytics Intelligents",
                description: "Tableaux de bord avancés avec IA pour des insights précieux sur votre activité."
              },
              {
                icon: <Users className="h-12 w-12 text-blue-600" />,
                title: "Support 24/7",
                description: "Équipe d'experts disponible 24h/24 pour vous accompagner dans votre transformation digitale."
              },
              {
                icon: <Star className="h-12 w-12 text-blue-600" />,
                title: "Qualité Premium",
                description: "Solutions développées avec les dernières technologies et les meilleures pratiques."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-gray-50 border border-gray-100">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Prêt à Transformer Votre Entreprise ?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
            Rejoignez des centaines d'entreprises qui font confiance à DL Solutions 
            pour leur transformation digitale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 shadow-lg font-semibold">
              Commencer Maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 shadow-lg font-semibold">
              Voir la Démo
            </Button>
          </div>
        </div>
      </section>

      {/* Blocs supplémentaires */}
      <FAQSection />
      <TestimonialsSection />
      <MediaSection />

      {/* Composants flottants et RGPD */}
      <AppointmentPopup />
      <AIChatbot />
      <WhatsAppButton />
      <CookiesBanner />
      <PrivacyMessage />

      {/* Équipe Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              Notre Équipe d'Experts
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-md">
              Une équipe de professionnels passionnés par l'innovation et l'excellence digitale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-6 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm shadow-xl">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all duration-300 shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center drop-shadow-md">{member.name}</h3>
                <p className="text-white/90 text-center leading-relaxed drop-shadow-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Événements & Médias Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
              Nos Réalisations Médias
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-md">
              Couverture professionnelle d'événements majeurs avec excellence et créativité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventVideos.map((event, index) => (
              <div key={index} className="group bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-6 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm shadow-xl">
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 shadow-lg">
                  <video
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    muted
                    loop
                    playsInline
                  >
                    <source src={event.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">{event.title}</h3>
                <p className="text-white/90 text-sm drop-shadow-sm">Couverture professionnelle avec drone et équipements HD</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Notre Écosystème Digital
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-md">
              Un univers complet de solutions innovantes pour propulser votre entreprise vers l'avenir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            <div className="group bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm shadow-xl">
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
                <img
                  src="https://res.cloudinary.com/dko5sommz/image/upload/v1750993736/illustration-vectorielle-intelligence-artificielle_1237743-62154_t29exq.avif"
                  alt="Intelligence Artificielle"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Intelligence Artificielle</h3>
              <p className="text-white/90 leading-relaxed drop-shadow-sm">
                Solutions IA avancées pour automatiser vos processus et optimiser vos performances avec des algorithmes de pointe.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm shadow-xl">
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
                <img
                  src="https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif"
                  alt="Trading Intelligent"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Trading Intelligent</h3>
              <p className="text-white/90 leading-relaxed drop-shadow-sm">
                Plateforme de trading automatisé avec analyses en temps réel et recommandations basées sur l'IA.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-green-500/20 to-blue-600/20 p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm shadow-xl">
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
                <img
                  src="https://res.cloudinary.com/dko5sommz/image/upload/v1750993764/solution_digitale_pmibcf.jpg"
                  alt="Solutions Digitales"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Solutions Digitales</h3>
              <p className="text-white/90 leading-relaxed drop-shadow-sm">
                Développement web, e-commerce et applications mobiles sur mesure avec les dernières technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">DL</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Solutions
                </span>
              </div>
              <p className="text-white/60">
                Transformez votre vision en réalité digitale avec notre univers de solutions innovantes.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link href="/services" className="hover:text-white transition-colors">Intelligence Artificielle</Link></li>
                <li><Link href="/trading" className="hover:text-white transition-colors">Trading Automatisé</Link></li>
                <li><Link href="/dl-style" className="hover:text-white transition-colors">E-commerce</Link></li>
                <li><Link href="/novacore" className="hover:text-white transition-colors">CRM</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Plateformes</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link href="/novacore" className="hover:text-white transition-colors">NovaCore</Link></li>
                <li><Link href="/intranet" className="hover:text-white transition-colors">Intranet</Link></li>
                <li><Link href="/formations" className="hover:text-white transition-colors">Formations</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link href="/contact" className="hover:text-white transition-colors">Nous Contacter</Link></li>
                <li><Link href="/a-propos" className="hover:text-white transition-colors">À Propos</Link></li>
                <li><Link href="/sign-in" className="hover:text-white transition-colors">Connexion</Link></li>
                <li><Link href="/devis" className="hover:text-white transition-colors">Devis</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 DL Solutions. Tous droits réservés. | Univers Digital Innovant</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
