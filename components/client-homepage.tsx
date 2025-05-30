"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Sparkles,
  Database,
  GraduationCap,
  ShoppingCart,
  Users,
  Zap,
  BookOpen,
  Clock,
  TrendingUp,
  Star,
  Mail,
  Phone,
  MessageCircle,
  Send,
} from "lucide-react"
import Link from "next/link"

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-lg">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">Solutions Digitales Innovantes</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Transformez votre
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Entreprise
            </span>
            avec DL Solutions
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            CRM intelligent, formations professionnelles, e-commerce et solutions sur mesure pour propulser votre
            business vers le succès
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/novacore">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Découvrir NovaCore
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Consultation Gratuite
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600 mt-2">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600 mt-2">Projets Réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600">24/7</div>
              <div className="text-gray-600 mt-2">Support Client</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600">99%</div>
              <div className="text-gray-600 mt-2">Taux de Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Services Section Component
function ServicesSection() {
  const services = [
    {
      icon: Database,
      title: "NovaCore CRM",
      description:
        "Système de gestion client intelligent avec IA intégrée pour optimiser vos ventes et relations client.",
      features: ["Gestion des leads", "Automatisation", "Analytics avancés", "IA prédictive"],
      link: "/novacore",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: GraduationCap,
      title: "Formations Pro",
      description: "Programmes de formation personnalisés pour développer les compétences de vos équipes.",
      features: ["Marketing digital", "CRM & Vente", "E-commerce", "IA & Innovation"],
      link: "/formations",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: ShoppingCart,
      title: "DL Style E-commerce",
      description: "Plateforme e-commerce complète avec gestion des stocks et paiements sécurisés.",
      features: ["Boutique en ligne", "Gestion stocks", "Paiements sécurisés", "Analytics ventes"],
      link: "/dl-style",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
            <Zap className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">Nos Services</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Solutions Complètes pour
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Votre Croissance
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De la gestion client aux formations, en passant par l'e-commerce et l'analytics, nous accompagnons votre
            transformation digitale de A à Z.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={service.link}>
                  <Button className="w-full group-hover:bg-blue-600 transition-colors">
                    En savoir plus
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Formations Section Component
function FormationsSection() {
  const formations = [
    {
      icon: TrendingUp,
      title: "Marketing Digital",
      description: "Maîtrisez les stratégies marketing modernes et boostez votre visibilité en ligne.",
      duration: "40h",
      level: "Débutant",
      price: "599€",
      rating: 4.9,
      students: 1250,
      features: ["SEO/SEA", "Réseaux sociaux", "Email marketing", "Analytics"],
      link: "/formations/marketing-digital",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Users,
      title: "CRM & Gestion Client",
      description: "Optimisez vos relations client avec les outils et méthodes les plus efficaces.",
      duration: "35h",
      level: "Intermédiaire",
      price: "699€",
      rating: 4.8,
      students: 890,
      features: ["NovaCore CRM", "Automatisation", "Lead scoring", "Fidélisation"],
      link: "/formations/crm-gestion-client",
      color: "from-blue-500 to-cyan-500",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-lg">
            <BookOpen className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-900">Formations Professionnelles</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Développez vos
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Compétences Digitales
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {formations.map((formation, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${formation.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <formation.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{formation.rating}</span>
                  </div>
                </div>

                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                  {formation.title}
                </CardTitle>

                <CardDescription className="text-gray-600 leading-relaxed mb-4">
                  {formation.description}
                </CardDescription>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formation.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {formation.students}
                  </div>
                  <Badge variant="secondary">{formation.level}</Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {formation.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">{formation.price}</div>
                  <Link href={formation.link}>
                    <Button className="group-hover:bg-purple-600 transition-colors">
                      S'inscrire
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
function ContactSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">Contactez-nous</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Prêt à transformer
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Votre Entreprise ?
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe d'experts est là pour vous accompagner dans votre transformation digitale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contactez-nous</h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Téléphone</div>
                  <div className="text-gray-600">+33 1 23 45 67 89</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <div className="text-gray-600">contact@dl-solutions.fr</div>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Envoyez-nous un message</CardTitle>
              <CardDescription>Nous vous recontacterons dans les 24h</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                  <Input placeholder="Votre prénom" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <Input placeholder="Votre nom" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input type="email" placeholder="votre@email.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea placeholder="Décrivez votre projet..." rows={4} />
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold">
                <Send className="mr-2 w-5 h-5" />
                Envoyer le message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Main Client Homepage Component
export default function ClientHomepage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100" />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<div className="h-32 bg-gray-50" />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<div className="h-32 bg-gray-50" />}>
        <FormationsSection />
      </Suspense>

      <Suspense fallback={<div className="h-32 bg-gray-50" />}>
        <ContactSection />
      </Suspense>
    </main>
  )
}
