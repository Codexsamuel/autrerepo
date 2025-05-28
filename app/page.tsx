"use client"

import type React from "react"

import { useState, Suspense, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Plane,
  Trophy,
  Users,
  Brain,
  Zap,
  Star,
  ChevronDown,
  Menu,
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Quote,
  Send,
  Calendar,
} from "lucide-react"
import { AI3DModel } from "@/components/ai-3d-model"
import Image from "next/image"
import { HumanoidAICursor } from "@/components/humanoid-ai-cursor"
import { ScrollAnimation } from "@/components/scroll-animations"
import { FloatingParticles, GlowingCursor, MagicButton, HolographicCard } from "@/components/wow-effects"
import { ConsultationPopup } from "@/components/consultation-popup"
import { ContactButtons } from "@/components/contact-buttons"
import { Chatbot } from "@/components/chatbot"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentPriceSlide, setCurrentPriceSlide] = useState(0)
  const [newReview, setNewReview] = useState({ name: "", email: "", rating: 5, comment: "" })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showConsultationPopup, setShowConsultationPopup] = useState(false)

  // Afficher le popup de consultation après 15 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConsultationPopup(true)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  const services = [
    {
      name: "NovaWorld",
      description: "Réseau social B2B professionnel avec IA",
      logo: "/images/logo-novaworld.svg",
      color: "from-blue-500 to-indigo-600",
      url: "/novaworld",
      features: ["Networking IA", "Publications", "Entreprises"],
    },
    {
      name: "DL Style",
      description: "Boutique en ligne premium",
      logo: "/images/logo-dl-style.svg",
      color: "from-purple-500 to-pink-600",
      url: "/dl-style",
      features: ["E-commerce", "Mode", "Lifestyle"],
    },
    {
      name: "DL Travel",
      description: "Plateforme de vente de billets d'avion",
      icon: Plane,
      color: "from-cyan-500 to-blue-600",
      url: "/dl-travel",
      features: ["Vols", "Hôtels", "Packages"],
    },
    {
      name: "DL Bookmaker",
      description: "Paris sportifs assistés par IA",
      icon: Trophy,
      color: "from-green-500 to-emerald-600",
      url: "/dl-bookmaker",
      features: ["Prédictions IA", "Paris Live", "Analytics"],
    },
  ]

  const stats = [
    { label: "Clients Satisfaits", value: "10,000+", icon: Users },
    { label: "Projets Réalisés", value: "500+", icon: Zap },
    { label: "Années d'Expérience", value: "15+", icon: Star },
    { label: "Services IA", value: "4", icon: Brain },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Directrice Marketing",
      company: "TechCorp",
      rating: 5,
      comment:
        "DL Solutions a transformé notre approche digitale. Leur expertise en IA nous a permis d'augmenter nos conversions de 300%.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Ahmed Ben Ali",
      role: "CEO",
      company: "StartupInnovante",
      rating: 5,
      comment:
        "Une équipe exceptionnelle ! NovaWorld nous a ouvert de nouveaux marchés et DL Travel a révolutionné nos déplacements professionnels.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Sophie Martin",
      role: "Responsable E-commerce",
      company: "FashionBrand",
      rating: 5,
      comment:
        "DL Style nous a permis de créer une boutique en ligne moderne et performante. Les résultats dépassent nos attentes !",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "Jean-Pierre Moreau",
      role: "Directeur Commercial",
      company: "SportsBetting Pro",
      rating: 4,
      comment:
        "DL Bookmaker avec son IA prédictive nous donne un avantage concurrentiel énorme. Interface intuitive et résultats probants.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "299€",
      period: "/mois",
      description: "Parfait pour les petites entreprises",
      features: ["Site web responsive", "SEO de base", "Support email", "1 révision/mois"],
      color: "from-blue-500 to-indigo-600",
      popular: false,
    },
    {
      name: "Professional",
      price: "599€",
      period: "/mois",
      description: "Idéal pour les entreprises en croissance",
      features: ["Tout du Starter", "IA intégrée", "Analytics avancés", "Support prioritaire", "3 révisions/mois"],
      color: "from-purple-500 to-pink-600",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "1299€",
      period: "/mois",
      description: "Solution complète pour les grandes entreprises",
      features: [
        "Tout du Professional",
        "Solutions sur mesure",
        "Intégrations avancées",
        "Support 24/7",
        "Révisions illimitées",
      ],
      color: "from-orange-500 to-red-600",
      popular: false,
    },
    {
      name: "Custom",
      price: "Sur devis",
      period: "",
      description: "Solution entièrement personnalisée",
      features: ["Développement sur mesure", "Architecture cloud", "Formation équipe", "Maintenance incluse"],
      color: "from-green-500 to-emerald-600",
      popular: false,
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const nextPriceSlide = () => {
    setCurrentPriceSlide((prev) => (prev + 1) % Math.ceil(pricingPlans.length / 2))
  }

  const prevPriceSlide = () => {
    setCurrentPriceSlide((prev) => (prev - 1 + Math.ceil(pricingPlans.length / 2)) % Math.ceil(pricingPlans.length / 2))
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici on ajouterait la logique pour sauvegarder l'avis
    console.log("Nouvel avis:", newReview)
    setNewReview({ name: "", email: "", rating: 5, comment: "" })
    setShowReviewForm(false)
    // Afficher un message de succès
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
            className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
              } ${interactive ? "hover:text-yellow-300" : ""}`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Popup de consultation */}
      <ConsultationPopup isOpen={showConsultationPopup} onClose={() => setShowConsultationPopup(false)} />

      {/* Boutons de contact */}
      <ContactButtons />

      {/* Chatbot */}
      <Chatbot />

      {/* Effets visuels */}
      <HumanoidAICursor />
      <FloatingParticles />
      <GlowingCursor />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/logo-novacore.svg" alt="DL Solutions Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DL Solutions
                </h1>
                <p className="text-sm text-gray-600">Innovation & Excellence</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-indigo-600 font-medium">
                Accueil
              </a>
              <a href="/services" className="text-gray-800 hover:text-indigo-600 transition-colors">
                Services
              </a>
              <a href="/formations" className="text-gray-800 hover:text-indigo-600 transition-colors">
                Formations
              </a>
              <a href="/portfolio" className="text-gray-800 hover:text-indigo-600 transition-colors">
                Portfolio
              </a>
              <a href="/a-propos" className="text-gray-800 hover:text-indigo-600 transition-colors">
                À Propos
              </a>
              <a href="/contact" className="text-gray-800 hover:text-indigo-600 transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-indigo-200 text-indigo-700 hidden md:flex items-center gap-2"
                onClick={() => setShowConsultationPopup(true)}
              >
                <Calendar className="h-4 w-4" />
                Consultation
              </Button>
              <Button variant="outline" className="border-indigo-200 text-indigo-700" asChild>
                <a href="/novacore">NovaCore</a>
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                <a href="/devis">Devis Gratuit</a>
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <a href="/" className="text-indigo-600 font-medium">
                  Accueil
                </a>
                <a href="/services" className="text-gray-800">
                  Services
                </a>
                <a href="/formations" className="text-gray-800">
                  Formations
                </a>
                <a href="/portfolio" className="text-gray-800">
                  Portfolio
                </a>
                <a href="/a-propos" className="text-gray-800">
                  À Propos
                </a>
                <a href="/contact" className="text-gray-800">
                  Contact
                </a>
                <Button
                  variant="outline"
                  className="border-indigo-200 text-indigo-700 w-full justify-start"
                  onClick={() => setShowConsultationPopup(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Réserver une consultation
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3)" }}
          >
            <source src="/placeholder.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/60 to-violet-900/80"></div>
        </div>

        {/* Video Controls */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-24 right-8 z-30 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
        >
          {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-6 py-2">
            <Brain className="h-5 w-5 mr-2" />
            Intelligence Artificielle & Innovation
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Transformez votre{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">entreprise</span>{" "}
            avec l'IA
          </h1>
          <p className="text-xl lg:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            DL Solutions vous accompagne dans votre transformation digitale avec des solutions IA sur mesure, des
            formations professionnelles et un écosystème complet de services innovants.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <MagicButton size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-lg px-8 py-4" asChild>
              <a href="/services">
                Découvrir nos Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </MagicButton>
            <MagicButton
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              onClick={() => setShowConsultationPopup(true)}
            >
              Réserver une consultation
              <Calendar className="ml-2 h-5 w-5" />
            </MagicButton>
          </div>
        </div>

        {/* 3D AI Model */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 hidden xl:block">
          <div className="w-80 h-80">
            <Suspense fallback={<div className="w-full h-full bg-white/10 rounded-full animate-pulse"></div>}>
              <AI3DModel />
            </Suspense>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white" />
        </div>
      </section>

      {/* Stats Section */}
      <ScrollAnimation animation="fadeInUp">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Services Section */}
      <ScrollAnimation animation="fadeInLeft" delay={200}>
        <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700">Nos Services</Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-800">
                Un écosystème{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  complet
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez notre gamme complète de services IA conçus pour propulser votre entreprise vers l'avenir.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <HolographicCard
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center p-2`}
                      >
                        <img
                          src={service.logo || "/placeholder.svg"}
                          alt={`${service.name} Logo`}
                          className="h-10 w-10 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{service.name}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-sm">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button className={`w-full bg-gradient-to-r ${service.color}`} asChild>
                      <a href={service.url}>
                        Découvrir {service.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </HolographicCard>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Pricing Carousel Section */}
      <ScrollAnimation animation="scaleIn" delay={400}>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-700">Nos Tarifs</Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-800">
                Des prix{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  transparents
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choisissez la formule qui correspond à vos besoins et votre budget.
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentPriceSlide * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(pricingPlans.length / 2) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid md:grid-cols-2 gap-8 px-4">
                        {pricingPlans.slice(slideIndex * 2, slideIndex * 2 + 2).map((plan, index) => (
                          <HolographicCard
                            key={index}
                            className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                              plan.popular ? "ring-2 ring-purple-500 transform scale-105" : ""
                            }`}
                          >
                            {plan.popular && (
                              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold">
                                ⭐ Plus Populaire
                              </div>
                            )}
                            <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
                            <CardContent className="p-8">
                              <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-4">{plan.description}</p>
                                <div className="flex items-baseline justify-center">
                                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                  <span className="text-gray-600 ml-1">{plan.period}</span>
                                </div>
                              </div>
                              <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              <Button
                                className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}
                                onClick={() => setShowConsultationPopup(true)}
                              >
                                {plan.name === "Custom" ? "Demander un devis" : "Choisir ce plan"}
                              </Button>
                            </CardContent>
                          </HolographicCard>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg"
                onClick={prevPriceSlide}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg"
                onClick={nextPriceSlide}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>

              {/* Dots indicator */}
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: Math.ceil(pricingPlans.length / 2) }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentPriceSlide ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentPriceSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Testimonials Section */}
      <ScrollAnimation animation="fadeInRight" delay={600}>
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-700">Témoignages</Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-800">
                Ce que disent nos{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  clients
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez les retours d'expérience de nos clients satisfaits.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <Card className="overflow-hidden shadow-2xl">
                  <CardContent className="p-8 md:p-12">
                    <div className="text-center">
                      <Quote className="w-12 h-12 text-purple-500 mx-auto mb-6" />
                      <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                        "{testimonials[currentTestimonial].comment}"
                      </p>
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <Image
                          src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                          alt={testimonials[currentTestimonial].name}
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div className="text-left">
                          <div className="font-semibold text-lg text-gray-900">
                            {testimonials[currentTestimonial].name}
                          </div>
                          <div className="text-gray-600">
                            {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].company}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">{renderStars(testimonials[currentTestimonial].rating)}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white shadow-lg"
                  onClick={prevTestimonial}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white shadow-lg"
                  onClick={nextTestimonial}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-purple-600" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>

              {/* Add Review Button */}
              <div className="text-center mt-12">
                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {showReviewForm ? "Masquer le formulaire" : "Laisser un avis"}
                </Button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <Card className="mt-8 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Partagez votre expérience</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                          <input
                            type="text"
                            required
                            value={newReview.name}
                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Votre nom"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            required
                            value={newReview.email}
                            onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                        <div className="flex items-center gap-2">
                          {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                          <span className="text-gray-600 ml-2">({newReview.rating}/5)</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Votre commentaire</label>
                        <textarea
                          required
                          rows={4}
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Partagez votre expérience avec DL Solutions..."
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Publier l'avis
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowReviewForm(false)}
                          className="flex-1"
                        >
                          Annuler
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Prêt à transformer votre entreprise ?</h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto">
            Rejoignez les milliers d'entreprises qui font confiance à DL Solutions pour leur transformation digitale.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <MagicButton size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4" asChild>
              <a href="/devis">
                Demander un Devis
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </MagicButton>
            <MagicButton
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              onClick={() => setShowConsultationPopup(true)}
            >
              Réserver une Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </MagicButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-indigo-400 flex items-center justify-center bg-white">
                  <img src="/images/dl-logo.png" alt="DL Solutions Logo" className="h-8 w-8 object-contain" />
                </div>
                <span className="text-xl font-bold">DL Solutions</span>
              </div>
              <p className="text-gray-400 mb-6">
                Votre partenaire de confiance pour la transformation digitale et l'intelligence artificielle.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/novaworld" className="hover:text-white transition-colors">
                    NovaWorld
                  </a>
                </li>
                <li>
                  <a href="/dl-style" className="hover:text-white transition-colors">
                    DL Style
                  </a>
                </li>
                <li>
                  <a href="/dl-travel" className="hover:text-white transition-colors">
                    DL Travel
                  </a>
                </li>
                <li>
                  <a href="/dl-bookmaker" className="hover:text-white transition-colors">
                    DL Bookmaker
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Liens Utiles</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/a-propos" className="hover:text-white transition-colors">
                    À Propos
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/portfolio" className="hover:text-white transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="/formations" className="hover:text-white transition-colors">
                    Formations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">
                Email:{" "}
                <a href="mailto:contact@dlsolutions.com" className="hover:text-white">
                  contact@dlsolutions.com
                </a>
              </p>
              <p className="text-gray-400 mb-2">Téléphone: +33 1 23 45 67 89</p>
              <p className="text-gray-400">123 Rue de la Technologie, 75000 Paris</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; 2024 DL Solutions. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
