"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Clock, Award, TrendingUp, ShoppingCart, Bot, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

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
  {
    icon: ShoppingCart,
    title: "E-commerce & Vente",
    description: "Créez et développez votre boutique en ligne avec les meilleures pratiques.",
    duration: "45h",
    level: "Tous niveaux",
    price: "799€",
    rating: 4.9,
    students: 1100,
    features: ["Création boutique", "Conversion", "Logistique", "Paiements"],
    link: "/formations/ecommerce-vente",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Bot,
    title: "IA pour Entreprises",
    description: "Intégrez l'intelligence artificielle dans vos processus métier.",
    duration: "30h",
    level: "Avancé",
    price: "899€",
    rating: 4.7,
    students: 650,
    features: ["ChatGPT Business", "Automatisation IA", "Analyse prédictive", "Éthique IA"],
    link: "/formations/ia-entreprises",
    color: "from-purple-500 to-indigo-500",
  },
]

const stats = [
  { icon: Users, value: "5000+", label: "Apprenants formés" },
  { icon: Award, value: "95%", label: "Taux de réussite" },
  { icon: Star, value: "4.8/5", label: "Note moyenne" },
  { icon: BookOpen, value: "50+", label: "Formations disponibles" },
]

export default function FormationsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Formations certifiantes animées par des experts pour maîtriser les outils et stratégies digitales
            indispensables à votre réussite.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

        {/* CTA */}
        <div className="text-center">
          <Link href="/formations">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Voir toutes les formations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
