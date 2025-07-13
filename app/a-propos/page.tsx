"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, Eye, Heart, Lightbulb, Shield, Star, Target, Users } from "lucide-react";



export default function AboutPage() {
  const values = [{
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Nous repoussons constamment les limites de la technologie pour offrir des solutions avant-gardistes.",
    },
    {
      icon: Shield,
      title: "Excellence",
      description: "Chaque projet est traité avec le plus haut niveau de qualité et d'attention aux détails.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Notre équipe est animée par la passion de transformer les idées en réalités digitales.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Nous travaillons en étroite collaboration avec nos clients pour garantir leur succès.",
    },]
  const stats = [{ number: "500+", label: "Projets réalisés" },
    { number: "98%", label: "Clients satisfaits" },
    { number: "5 ans", label: "D'expérience" },
    { number: "24/7", label: "Support client" },]
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-teal-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-14 w-14 object-contain rounded-full" />
              </div>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-800 hover:text-teal-600 transition-colors">
                Accueil
              </a>
              <a href="/a-propos" className="text-teal-600 font-medium">
                À propos
              </a>
              <a href="/services" className="text-gray-800 hover:text-teal-600 transition-colors">
                Services
              </a>
              <a href="/formations" className="text-gray-800 hover:text-teal-600 transition-colors">
                Formations
              </a>
              <a href="/portfolio" className="text-gray-800 hover:text-teal-600 transition-colors">
                Portfolio
              </a>
              <a href="/contact" className="text-gray-800 hover:text-teal-600 transition-colors">
                Contact
              </a>
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="border-teal-200 text-teal-700" asChild>
                <a href="/devis">Devis IA</a>
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                <a href="/sign-in">NovaCore</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-700">À propos de nous</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              L'histoire de{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                DL Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Depuis 2019, nous accompagnons les entreprises dans leur transformation digitale avec des solutions
              innovantes et personnalisées.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-teal-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Notre Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Démocratiser l'accès aux technologies avancées en proposant des solutions IA et CRM accessibles à
                  toutes les entreprises, quelle que soit leur taille.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Notre Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  Devenir le partenaire de référence en Afrique pour la transformation digitale, en alliant innovation
                  technologique et expertise locale.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Nos Valeurs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Innovation, excellence, transparence et accompagnement personnalisé sont au cœur de notre approche
                  pour garantir votre succès.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-700">Notre Direction</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              L'équipe{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                dirigeante
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rencontrez les visionnaires qui guident DL Solutions vers l'excellence et l'innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Samuel OBAM */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-teal-200 group-hover:border-teal-400 transition-colors">
                    <img
                      src="/placeholder.svg?height=128&width=128"
                      alt="Samuel OBAM"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Samuel OBAM</h3>
                <p className="text-teal-600 font-medium mb-4">Co-Fondateur & Directeur Technique</p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Expert en intelligence artificielle et développement logiciel. Samuel pilote l'innovation
                  technologique et supervise le développement de la plateforme NovaCore.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">IA & Machine Learning</Badge>
                  <Badge variant="secondary">Architecture Logicielle</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Ngah Sabine */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-blue-200 group-hover:border-blue-400 transition-colors">
                    <img
                      src="/placeholder.svg?height=128&width=128"
                      alt="Ngah Sabine"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Ngah Sabine</h3>
                <p className="text-blue-600 font-medium mb-4">Co-Fondatrice & Directrice Commerciale</p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Spécialiste en stratégie commerciale et relation client. Sabine développe les partenariats
                  stratégiques et supervise l'expansion de DL Solutions.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">Stratégie Commerciale</Badge>
                  <Badge variant="secondary">Développement Business</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Prêt à nous rejoindre ?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Découvrez comment DL Solutions peut transformer votre entreprise avec nos solutions innovantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
                <a href="/contact">
                  Nous contacter
                  <ArrowRight className="ml-2 h-6 w-6" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="/services">Découvrir nos services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
