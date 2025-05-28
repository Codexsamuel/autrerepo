"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Clock,
  Users,
  Award,
  BookOpen,
  Brain,
  Headphones,
  MessageSquare,
  BarChart3,
  Palette,
  Smartphone,
} from "lucide-react"

export default function FormationsPage() {
  const formations = [
    {
      icon: Headphones,
      title: "Télévente & Prospection",
      description: "Maîtrisez les techniques de vente par téléphone et développez votre portefeuille client",
      duration: "3 jours",
      level: "Débutant à Intermédiaire",
      participants: "8-12 personnes",
      price: "450€",
      modules: [
        "Techniques de prospection téléphonique",
        "Gestion des objections",
        "Closing et négociation",
        "Suivi client et fidélisation",
      ],
      slug: "televente-prospection",
    },
    {
      icon: MessageSquare,
      title: "Service Après-Vente Excellence",
      description: "Transformez votre SAV en avantage concurrentiel et fidélisez vos clients",
      duration: "2 jours",
      level: "Tous niveaux",
      participants: "6-10 personnes",
      price: "350€",
      modules: [
        "Gestion des réclamations",
        "Communication empathique",
        "Résolution de conflits",
        "Outils digitaux SAV",
      ],
      slug: "sav-excellence",
    },
    {
      icon: Brain,
      title: "Intelligence Artificielle pour Entreprises",
      description: "Découvrez comment intégrer l'IA dans vos processus métier",
      duration: "5 jours",
      level: "Intermédiaire",
      participants: "6-8 personnes",
      price: "850€",
      modules: [
        "Fondamentaux de l'IA",
        "Chatbots et automatisation",
        "Analyse de données IA",
        "Implémentation pratique",
      ],
      slug: "ia-entreprises",
    },
    {
      icon: BarChart3,
      title: "Marketing Digital & Analytics",
      description: "Maîtrisez les outils du marketing digital et l'analyse de performance",
      duration: "4 jours",
      level: "Débutant à Avancé",
      participants: "8-12 personnes",
      price: "650€",
      modules: ["Stratégie marketing digital", "Google Analytics & SEO", "Publicité en ligne", "Mesure de ROI"],
      slug: "marketing-digital",
    },
    {
      icon: Palette,
      title: "Création de Contenu Visuel",
      description: "Créez des visuels impactants pour vos communications",
      duration: "3 jours",
      level: "Débutant",
      participants: "6-10 personnes",
      price: "550€",
      modules: [
        "Principes du design",
        "Outils de création (Canva, Figma)",
        "Identité visuelle",
        "Contenu pour réseaux sociaux",
      ],
      slug: "creation-visuelle",
    },
    {
      icon: Users,
      title: "CRM & Gestion Client",
      description: "Optimisez votre relation client avec les bons outils et méthodes",
      duration: "2 jours",
      level: "Tous niveaux",
      participants: "8-15 personnes",
      price: "400€",
      modules: ["Stratégie CRM", "Segmentation client", "Automatisation marketing", "Fidélisation client"],
      slug: "crm-gestion-client",
    },
  ]

  const advantages = [
    {
      icon: Award,
      title: "Certification Reconnue",
      description: "Obtenez une certification valorisante pour votre carrière",
    },
    {
      icon: Users,
      title: "Formateurs Experts",
      description: "Apprenez avec des professionnels expérimentés du secteur",
    },
    {
      icon: BookOpen,
      title: "Support Pédagogique",
      description: "Accès aux ressources et supports de formation à vie",
    },
    {
      icon: Smartphone,
      title: "Formation Hybride",
      description: "Présentiel et distanciel selon vos préférences",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-teal-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-14 w-14 object-contain" />
              </div>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-800 hover:text-teal-600 transition-colors">
                Accueil
              </a>
              <a href="/a-propos" className="text-gray-800 hover:text-teal-600 transition-colors">
                À propos
              </a>
              <a href="/services" className="text-gray-800 hover:text-teal-600 transition-colors">
                Services
              </a>
              <a href="/formations" className="text-teal-600 font-medium">
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
            <Badge className="mb-4 bg-teal-100 text-teal-700">Formations Professionnelles</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Développez vos{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                compétences
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Formations spécialisées pour maîtriser les outils digitaux, l'IA et les techniques commerciales modernes.
              Boostez votre carrière avec nos programmes certifiants.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-teal-600 mb-2">500+</div>
              <div className="text-gray-600">Apprenants formés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-teal-600 mb-2">95%</div>
              <div className="text-gray-600">Taux de satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-teal-600 mb-2">12</div>
              <div className="text-gray-600">Formations disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-gray-600">Support pédagogique</div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      <formation.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{formation.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{formation.description}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-teal-500" />
                      Durée: {formation.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-teal-500" />
                      {formation.participants}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2 text-teal-500" />
                      Niveau: {formation.level}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-teal-600">{formation.price}</span>
                      <Badge variant="secondary">{formation.modules.length} modules</Badge>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                        <a href={`/formations/${formation.slug}`}>
                          Voir le programme
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full border-teal-200 text-teal-700" asChild>
                        <a href={`/formations/${formation.slug}/inscription`}>S'inscrire maintenant</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-700">Nos Avantages</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Pourquoi choisir{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                DL Solutions
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <advantage.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Prêt à vous former ?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Rejoignez nos formations et développez les compétences de demain dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
                <a href="/contact">
                  Nous contacter
                  <ArrowRight className="ml-2 h-6 w-6" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="/devis">Demander un devis formation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
