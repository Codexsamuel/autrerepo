"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Play,
  Star,
  Users,
  Brain,
  Palette,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  CheckCircle,
  Pause,
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleVideo = () => {
    const video = document.getElementById("hero-video") as HTMLVideoElement
    if (video) {
      if (isVideoPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const services = [
    {
      icon: Brain,
      title: "Intelligence Artificielle",
      description: "Solutions IA personnalisées pour automatiser et optimiser vos processus métier",
      features: ["Chatbots intelligents", "Analyse prédictive", "Automatisation"],
    },
    {
      icon: Users,
      title: "CRM NovaCore",
      description: "Plateforme CRM complète pour gérer vos clients et prospects efficacement",
      features: ["Gestion clients", "Pipeline ventes", "Reporting avancé"],
    },
    {
      icon: Palette,
      title: "Création Visuelle",
      description: "Designs modernes et impactants pour votre identité de marque",
      features: ["Logo & branding", "Web design", "Supports marketing"],
    },
    {
      icon: GraduationCap,
      title: "Formations Pro",
      description: "Formations spécialisées pour développer vos compétences digitales",
      features: ["IA & automation", "Marketing digital", "Outils CRM"],
    },
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      company: "TechStart SAS",
      content: "DL Solutions a transformé notre approche client avec leur CRM. +40% de conversions en 3 mois !",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Pierre Martin",
      company: "Innovate Corp",
      content: "L'IA développée par l'équipe nous fait gagner 15h/semaine. Un investissement rentabilisé rapidement.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Sophie Laurent",
      company: "Creative Agency",
      content: "Designs exceptionnels et accompagnement professionnel. Je recommande vivement !",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const stats = [
    { number: "500+", label: "Clients satisfaits" },
    { number: "98%", label: "Taux de satisfaction" },
    { number: "24/7", label: "Support disponible" },
    { number: "5 ans", label: "D'expertise" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-xl shadow-lg" : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-teal-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-14 w-14 object-contain" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-800 hover:text-teal-600 transition-colors font-medium relative group">
                Accueil
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="/a-propos" className="text-gray-800 hover:text-teal-600 transition-colors relative group">
                À propos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="/services" className="text-gray-800 hover:text-teal-600 transition-colors relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="/formations" className="text-gray-800 hover:text-teal-600 transition-colors relative group">
                Formations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="/portfolio" className="text-gray-800 hover:text-teal-600 transition-colors relative group">
                Portfolio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="/contact" className="text-gray-800 hover:text-teal-600 transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </a>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50" asChild>
                <a href="/devis">Devis IA</a>
              </Button>
              <Button
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                asChild
              >
                <a href="/rendez-vous">Prendre RDV</a>
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-teal-600" asChild>
                <a href="/sign-in">Connexion 🔒</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 py-6 rounded-b-2xl shadow-xl">
              <nav className="flex flex-col space-y-4 px-4">
                <a href="/" className="text-gray-700 hover:text-teal-600 transition-colors py-2">
                  Accueil
                </a>
                <a href="/a-propos" className="text-gray-700 hover:text-teal-600 transition-colors py-2">
                  À propos
                </a>
                <a href="/services" className="text-gray-700 hover:text-teal-600 transition-colors py-2">
                  Services
                </a>
                <a href="/formations" className="text-gray-700 hover:text-teal-600 transition-colors py-2">
                  Formations
                </a>
                <a href="/portfolio" className="text-gray-700 hover:text-teal-600 transition-colors py-2">
                  Portfolio
                </a>
                <a href="/contact" className="text-gray-700 hover:text-teal-600 transition-colors py-2">
                  Contact
                </a>
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <Button variant="outline" className="border-teal-200 text-teal-700" asChild>
                    <a href="/devis">Devis IA</a>
                  </Button>
                  <Button className="bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                    <a href="/rendez-vous">Prendre RDV</a>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video id="hero-video" autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/videos/background-novacore.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/30 to-blue-900/30"></div>
        </div>

        {/* Video Controls */}
        <button
          onClick={toggleVideo}
          className="absolute top-24 right-6 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
        >
          {isVideoPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
        </button>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30">
                🚀 Innovation & Excellence
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                Transformez votre{" "}
                <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                  entreprise
                </span>{" "}
                avec l'IA
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto">
                Solutions CRM, Intelligence Artificielle, formations et créations visuelles pour propulser votre
                business vers le succès.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-lg px-8 py-4 h-auto shadow-2xl"
                asChild
              >
                <a href="/devis">
                  Obtenir un devis IA
                  <ArrowRight className="ml-2 h-6 w-6" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4 h-auto"
                asChild
              >
                <a href="#services">
                  <Play className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Découvrir nos services
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-700">Nos Services</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Solutions complètes pour votre{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                croissance
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De l'intelligence artificielle aux formations spécialisées, nous accompagnons votre transformation
              digitale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-teal-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button size="lg" variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50" asChild>
              <a href="/services">
                Voir tous nos services
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Prêt à révolutionner votre business ?</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Obtenez un devis personnalisé généré par notre IA en moins de 2 minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto shadow-2xl"
                asChild
              >
                <a href="/devis">
                  Générer mon devis IA
                  <Brain className="ml-2 h-6 w-6" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4 h-auto"
                asChild
              >
                <a href="/rendez-vous">
                  <Calendar className="mr-2 h-6 w-6" />
                  Planifier un RDV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-700">Témoignages</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ce que disent nos{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">clients</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-8 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full mr-4 border-2 border-teal-100"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">{testimonial.name}</div>
                      <div className="text-sm text-teal-600">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50" asChild>
              <a href="/avis">
                Voir tous les témoignages
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="mb-8">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-gray-700 flex items-center justify-center bg-white">
                  <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-16 w-16 object-contain" />
                </div>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Votre partenaire pour la transformation digitale et l'innovation technologique.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Phone className="h-5 w-5 mr-3" />
                  +33 1 23 45 67 89
                </div>
                <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5 mr-3" />
                  contact@dl-solutions.fr
                </div>
                <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <MapPin className="h-5 w-5 mr-3" />
                  Paris, France
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-8 text-teal-400">Services</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="/services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    CRM NovaCore
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Intelligence Artificielle
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Création Visuelle
                  </a>
                </li>
                <li>
                  <a href="/formations" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Formations Pro
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-8 text-teal-400">Entreprise</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="/a-propos" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="/portfolio" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="/avis" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Témoignages
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-8 text-teal-400">Ressources</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="/devis" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Devis IA
                  </a>
                </li>
                <li>
                  <a
                    href="/rendez-vous"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Prendre RDV
                  </a>
                </li>
                <li>
                  <a href="/sign-in" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Connexion
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DL Solutions. Tous droits réservés. Dirigé par Dave et Luce Solutions.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
