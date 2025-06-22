"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/search-bar"
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Star,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Zap,
  Brain,
  Plane,
  Trophy,
  Shield,
  Clock,
  Award,
  Building2,
  Linkedin,
  Twitter,
  Home,
  Banknote,
  LineChart,
  TrendingUp,
  CheckCircle,
  Play,
  Target,
  Camera,
} from "lucide-react"
import { DavyVoiceAssistant } from "@/components/ai-assistant/davy-voice-assistant"
import { MediaCarousel } from "@/components/media-carousel"
import { PresentationCarousel } from "@/components/presentation-carousel"
import { TeamCarousel } from "@/components/team-carousel"
import { SolutionsCarousel } from "@/components/solutions-carousel"
import { ServicesCarousel } from "./components/services/services-carousel"
import ProductCard from '@/components/ProductCard'
import DroneCarousel from "@/components/drone-carousel"
// Removed motion import
import React from "react"
import DLActivitiesCarousel from "@/components/dl-activities-carousel"
import ProjectsNewsSection from "@/components/projects-news-section"

const mediaItems = [
  {
    id: "1",
    title: "CRM Immobilier",
    description: "Gérez vos biens immobiliers efficacement",
    imageUrl: "/images/real-estate.jpg",
  },
  {
    id: "2",
    title: "CRM Banque",
    description: "Solutions bancaires innovantes",
    imageUrl: "/images/banking.jpg",
  },
  {
    id: "3",
    title: "CRM Trading",
    description: "Plateforme de trading avancée",
    imageUrl: "/images/trading.jpg",
  },
  {
    id: "4",
    title: "CRM Agence",
    description: "Gestion complète de votre agence",
    imageUrl: "/images/agency.jpg",
  },
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Hydration fix
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const services = [
    {
      name: "NovaWorld",
      description: "Réseau social B2B professionnel avec IA",
      icon: Users,
      color: "bg-blue-50 text-blue-700 border-blue-200",
      url: "/novaworld",
      features: ["Networking IA", "Publications", "Entreprises"],
    },
    {
      name: "DL Style",
      description: "Boutique en ligne premium",
      icon: ExternalLink,
      color: "bg-purple-50 text-purple-700 border-purple-200",
      url: "/dl-style",
      features: ["E-commerce", "Mode", "Lifestyle"],
    },
    {
      name: "DL Travel",
      description: "Plateforme de vente de billets d'avion",
      icon: Plane,
      color: "bg-cyan-50 text-cyan-700 border-cyan-200",
      url: "/dl-travel",
      features: ["Vols", "Hôtels", "Packages"],
    },
    {
      name: "DL Bookmaker",
      description: "Paris sportifs assistés par IA",
      icon: Trophy,
      color: "bg-green-50 text-green-700 border-green-200",
      url: "/dl-bookmaker",
      features: ["Prédictions IA", "Paris Live", "Analytics"],
    },
  ]

  const features = [
    {
      title: "Intelligence Artificielle",
      description: "Solutions IA avancées pour optimiser vos processus métier et augmenter votre productivité",
      icon: Brain,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Développement sur mesure",
      description: "Applications web et mobiles adaptées à vos besoins spécifiques avec les dernières technologies",
      icon: Zap,
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Support 24/7",
      description: "Une équipe d'experts disponible pour vous accompagner à tout moment dans vos projets",
      icon: Phone,
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Sécurité renforcée",
      description: "Protection avancée de vos données avec les standards de sécurité les plus élevés",
      icon: Shield,
      color: "bg-red-50 text-red-700",
    },
    {
      title: "Déploiement rapide",
      description: "Mise en production accélérée grâce à nos processus DevOps optimisés",
      icon: Clock,
      color: "bg-orange-50 text-orange-700",
    },
    {
      title: "Qualité certifiée",
      description: "Solutions testées et validées selon les meilleures pratiques de l'industrie",
      icon: Award,
      color: "bg-indigo-50 text-indigo-700",
    },
  ]

  const testimonials = [
    {
      name: "Marie Kouam",
      role: "Directrice Marketing",
      company: "TechCorp Cameroun",
      quote:
        "L'intégration de NovaCore a transformé notre approche marketing. Les insights générés par l'IA nous ont permis d'augmenter nos conversions de 40% en seulement 3 mois.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Jean Mbarga",
      role: "CEO",
      company: "Innov Solutions",
      quote:
        "DL Solutions a développé une solution sur mesure qui répond parfaitement à nos besoins. Le support technique est réactif et l'équipe très professionnelle.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Sophie Ndongo",
      role: "Responsable E-commerce",
      company: "ModaShop",
      quote:
        "Depuis que nous utilisons DL Style, notre taux d'abandon de panier a diminué de 35%. Une solution e-commerce vraiment efficace et intuitive !",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const stats = [
    { label: "Clients satisfaits", value: "500+", description: "Entreprises qui nous font confiance" },
    { label: "Projets réalisés", value: "1,200+", description: "Solutions déployées avec succès" },
    { label: "Pays couverts", value: "25+", description: "Présence internationale" },
    { label: "Experts certifiés", value: "50+", description: "Professionnels qualifiés" },
  ]

  const advantages = [
    {
      title: "ROI Garanti",
      description: "Retour sur investissement mesurable dès les premiers mois",
      percentage: "300%",
    },
    {
      title: "Temps de déploiement",
      description: "Mise en production 3x plus rapide que la concurrence",
      percentage: "70%",
    },
    {
      title: "Satisfaction client",
      description: "Taux de satisfaction exceptionnel de nos clients",
      percentage: "98%",
    },
  ]

  // Données de test pour les produits
  const sampleProducts = [
    {
      id: '1',
      title: 'Montre connectée 2024 - Édition limitée',
      priceCNY: 120,
      priceFCFA: 36000,
      imageUrl: '/images/smartwatch.jpg',
      source: 'AliExpress',
      deliveryTime: '15-20 jours',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Caméra de surveillance HD 4K',
      priceCNY: 280,
      priceFCFA: 85000,
      imageUrl: '/images/camera.jpg',
      source: '1688',
      deliveryTime: '20-25 jours',
      rating: 4.5
    },
    {
      id: '3',
      title: 'Vélo électrique pliant - Batterie longue durée',
      priceCNY: 2100,
      priceFCFA: 599000,
      imageUrl: '/images/ebike.jpg',
      source: 'Alibaba',
      deliveryTime: '30-35 jours',
      rating: 4.9
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section avec Carrousel Activités DL Solutions */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <img 
                src="/images/dl-logo.jpg" 
                alt="DL Solutions Logo" 
                className="h-20 mx-auto mb-4"
              />
              <Badge variant="secondary" className="mb-4">
                <Star className="w-4 h-4 mr-2" />
                Innovation & Excellence
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              DL Solutions
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Plateforme de transformation digitale et solutions innovantes
            </motion.p>
          </div>
          
          {/* Carrousel Activités DL Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-16"
          >
            <DLActivitiesCarousel />
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Découvrir nos services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:bg-gray-50">
              <Play className="w-5 h-5 mr-2" />
              Voir la démo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Services Premium */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Services Premium
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des solutions sur mesure pour propulser votre entreprise vers l'excellence
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Sécurité & Surveillance",
                description: "Solutions de sécurité avancées avec IA",
                features: ["Surveillance 24/7", "Détection d'intrusion", "Reconnaissance faciale"]
              },
              {
                icon: Zap,
                title: "Trading Automatisé",
                description: "Plateforme de trading avec IA intégrée",
                features: ["Signaux en temps réel", "Gestion des risques", "Analyse prédictive"]
              },
              {
                icon: Users,
                title: "CRM Intelligent",
                description: "Gestion client optimisée par l'IA",
                features: ["Automatisation", "Analytics avancés", "Personnalisation"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projets & Actualités */}
      <ProjectsNewsSection />

      {/* Section DL Drone */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4">
                <Target className="w-4 h-4 mr-2" />
                Nouveau produit
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                DL Surveillance Drone
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Drone de surveillance militaire nouvelle génération avec IA intégrée pour la sécurité nationale
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Clock, label: "Autonomie", value: "45 min" },
                  { icon: MapPin, label: "Portée", value: "15 km" },
                  { icon: Zap, label: "Vitesse", value: "120 km/h" },
                  { icon: Camera, label: "Caméra", value: "4K HDR" }
                ].map((spec) => (
                  <div key={spec.label} className="flex items-center space-x-3">
                    <spec.icon className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">{spec.label}</p>
                      <p className="font-semibold text-gray-900">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  En savoir plus
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="w-5 h-5 mr-2" />
                  Voir la démo
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&h=600&fit=crop"
                  alt="DL Drone"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Clients satisfaits", icon: Users },
              { number: "50+", label: "Projets réalisés", icon: TrendingUp },
              { number: "24/7", label: "Support disponible", icon: Shield },
              { number: "99%", label: "Taux de réussite", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Rejoignez les centaines d'entreprises qui font confiance à DL Solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Contactez-nous
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
