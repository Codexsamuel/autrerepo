"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, GraduationCap, ShoppingCart, Users, BarChart3, Smartphone, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

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
  {
    icon: Users,
    title: "NovaWorld Social",
    description: "Réseau social professionnel pour connecter entreprises et talents.",
    features: ["Réseau pro", "Offres d'emploi", "Collaboration", "Événements"],
    link: "/novaworld",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: BarChart3,
    title: "Analytics & BI",
    description: "Tableaux de bord intelligents pour analyser et optimiser vos performances.",
    features: ["Dashboards", "Rapports", "KPIs", "Prédictions"],
    link: "/analytics",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Smartphone,
    title: "Solutions Mobile",
    description: "Applications mobiles natives pour étendre votre présence digitale.",
    features: ["Apps natives", "PWA", "Notifications", "Offline"],
    link: "/mobile",
    color: "from-teal-500 to-blue-500",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Services Grid */}
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

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Discutons de votre projet
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
