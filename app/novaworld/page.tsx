"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  MessageSquare,
  Globe,
  Briefcase,
  Search,
  CheckCircle,
  Building,
  BarChart3,
  Star,
  ArrowRight,
  Layers,
  Network,
  FileText,
} from "lucide-react"

export default function NovaWorldPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const features = [
    {
      icon: Users,
      title: "Profils vérifiés",
      description:
        "Créez un profil business complet avec logo, secteur d'activité, mission et portfolio pour une visibilité professionnelle optimale.",
    },
    {
      icon: Network,
      title: "IA de matching B2B",
      description:
        "Notre intelligence artificielle suggère des connexions professionnelles pertinentes basées sur vos objectifs et votre secteur d'activité.",
    },
    {
      icon: Globe,
      title: "Feed Business",
      description:
        "Accédez à un mur d'actualités personnalisé avec publications, événements et opportunités commerciales de votre réseau.",
    },
    {
      icon: MessageSquare,
      title: "Messagerie privée",
      description:
        "Communiquez efficacement avec d'autres professionnels et entreprises grâce à notre système de messagerie intégré.",
    },
    {
      icon: Building,
      title: "Pages Entreprises",
      description:
        "Créez et gérez des pages professionnelles pour votre startup, PME ou grande entreprise avec des fonctionnalités avancées.",
    },
    {
      icon: Search,
      title: "Recherche IA",
      description:
        "Trouvez rapidement des partenaires, clients ou fournisseurs grâce à notre moteur de recherche intelligent par secteur ou localisation.",
    },
    {
      icon: BarChart3,
      title: "Statistiques de visibilité",
      description:
        "Analysez la performance de votre profil et de vos publications avec des métriques détaillées : vues, leads, clics et partages.",
    },
    {
      icon: FileText,
      title: "Portfolio & réalisations",
      description:
        "Mettez en avant vos projets, vidéos et documents pour attirer l'attention des recruteurs et partenaires potentiels.",
    },
  ]

  const testimonials = [
    {
      name: "Samuel OBAM",
      position: "CEO, DL Solutions",
      company: "DL Solutions",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "NovaWorld a transformé notre façon de faire des affaires en Afrique. Nous avons trouvé des partenaires stratégiques dans 5 pays différents en seulement 3 mois.",
    },
    {
      name: "Marie Dubois",
      position: "Directrice Marketing",
      company: "TechStart Cameroun",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "La qualité des connexions professionnelles sur NovaWorld est incomparable. C'est devenu notre principal canal d'acquisition de clients B2B.",
    },
    {
      name: "Jean Kouassi",
      position: "Investisseur",
      company: "Africa Ventures",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "En tant qu'investisseur, NovaWorld me permet d'identifier rapidement les startups prometteuses dans toute l'Afrique. Une plateforme indispensable.",
    },
  ]

  const pricingPlans = [
    {
      name: "Gratuit",
      price: "0",
      description: "Pour les professionnels qui débutent",
      features: [
        "Profil professionnel de base",
        "10 connexions par mois",
        "Accès au feed d'actualités",
        "Messagerie limitée",
      ],
      cta: "Commencer gratuitement",
      popular: false,
    },
    {
      name: "Premium",
      price: "19",
      description: "Pour les professionnels ambitieux",
      features: [
        "Profil professionnel avancé",
        "Connexions illimitées",
        "Visibilité boostée",
        "Accès aux appels d'offres",
        "Statistiques détaillées",
        "Messagerie illimitée",
      ],
      cta: "Essai gratuit de 30 jours",
      popular: true,
    },
    {
      name: "Business",
      price: "49",
      description: "Pour les entreprises en croissance",
      features: [
        "Tout le contenu Premium",
        "Page entreprise avancée",
        "Gestion multi-utilisateurs",
        "CRM intégré avec NovaCore",
        "Publications sponsorisées",
        "Support prioritaire",
      ],
      cta: "Démarrer maintenant",
      popular: false,
    },
  ]

  const stats = [
    { number: "10k+", label: "Professionnels" },
    { number: "2.5k+", label: "Entreprises" },
    { number: "15+", label: "Pays africains" },
    { number: "500+", label: "Partenariats créés" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DL Solutions
                </h1>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-800 hover:text-indigo-600 transition-colors">
                Accueil
              </a>
              <a href="/a-propos" className="text-gray-800 hover:text-indigo-600 transition-colors">
                À propos
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
              <a href="/novaworld" className="text-indigo-600 font-medium">
                NovaWorld
              </a>
              <a href="/contact" className="text-gray-800 hover:text-indigo-600 transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-indigo-200 text-indigo-700 hidden lg:flex" asChild>
                <a href="/novaworld/login">Connexion</a>
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                <a href="/novaworld/register">S'inscrire</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">Le réseau B2B africain</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Connecter l'Afrique, accélérer l'impact
              </h1>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                NovaWorld est le premier réseau social B2B panafricain conçu pour favoriser les connexions économiques,
                l'échange d'expertise et le développement stratégique entre acteurs africains.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                  Créer un compte
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Découvrir les fonctionnalités
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-80 h-80">
                <img
                  src="/images/novaworld-logo.png"
                  alt="NovaWorld Logo"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 px-4 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            <Button
              variant={activeTab === "overview" ? "default" : "outline"}
              onClick={() => setActiveTab("overview")}
              className={activeTab === "overview" ? "bg-indigo-600" : ""}
            >
              Présentation
            </Button>
            <Button
              variant={activeTab === "features" ? "default" : "outline"}
              onClick={() => setActiveTab("features")}
              className={activeTab === "features" ? "bg-indigo-600" : ""}
            >
              Fonctionnalités
            </Button>
            <Button
              variant={activeTab === "pricing" ? "default" : "outline"}
              onClick={() => setActiveTab("pricing")}
              className={activeTab === "pricing" ? "bg-indigo-600" : ""}
            >
              Tarifs
            </Button>
            <Button
              variant={activeTab === "testimonials" ? "default" : "outline"}
              onClick={() => setActiveTab("testimonials")}
              className={activeTab === "testimonials" ? "bg-indigo-600" : ""}
            >
              Témoignages
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content based on active tab */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-16">
              {/* Vision Section */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-indigo-100 text-indigo-700">Notre Vision</Badge>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
                    Un écosystème digital{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      souverain
                    </span>{" "}
                    pour l'Afrique
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    NovaWorld est conçu pour propulser les talents, entreprises et projets africains sur la scène
                    continentale et mondiale, en dépassant les frontières locales et en créant des opportunités de
                    collaboration inédites.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 bg-indigo-100 rounded-full p-1">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                      </div>
                      <p className="ml-4 text-gray-600">
                        <span className="font-medium text-gray-800">Réseau panafricain</span> - Connectez-vous avec des
                        professionnels de tout le continent
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 bg-indigo-100 rounded-full p-1">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                      </div>
                      <p className="ml-4 text-gray-600">
                        <span className="font-medium text-gray-800">Focus B2B</span> - Développez votre réseau
                        professionnel et trouvez des opportunités d'affaires
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 bg-indigo-100 rounded-full p-1">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                      </div>
                      <p className="ml-4 text-gray-600">
                        <span className="font-medium text-gray-800">Propulsé par l'IA</span> - Bénéficiez de
                        recommandations intelligentes pour développer votre business
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="NovaWorld Vision"
                    className="rounded-xl shadow-2xl relative z-10"
                  />
                </div>
              </div>

              {/* Positioning Section */}
              <div>
                <div className="text-center mb-12">
                  <Badge className="mb-4 bg-indigo-100 text-indigo-700">Positionnement Stratégique</Badge>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
                    À la croisée des{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      meilleures plateformes
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    NovaWorld combine les meilleurs aspects des réseaux professionnels existants, tout en se concentrant
                    sur les besoins spécifiques du marché africain.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Briefcase className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">LinkedIn</h3>
                      <p className="text-gray-600">
                        Profils professionnels complets et mise en réseau, adaptés au contexte africain.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Layers className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">Behance</h3>
                      <p className="text-gray-600">
                        Mise en avant de projets visuels et portfolios créatifs pour attirer des clients.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Network className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">Xing / JobnetAfrica</h3>
                      <p className="text-gray-600">
                        Échanges professionnels ciblés et opportunités d'emploi spécifiques à l'Afrique.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BarChart3 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">Meta Business Suite</h3>
                      <p className="text-gray-600">
                        Statistiques avancées et outils de gestion pour les pages d'entreprise.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* NovaCore Integration */}
              <div className="bg-indigo-50 rounded-2xl p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge className="mb-4 bg-indigo-100 text-indigo-700">Intégration NovaCore</Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
                      Connecté à notre{" "}
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        CRM intelligent
                      </span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      NovaWorld s'intègre parfaitement avec NovaCore, notre CRM intelligent, pour vous offrir une
                      expérience business complète et optimisée.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mt-1 bg-indigo-100 rounded-full p-1">
                          <CheckCircle className="h-5 w-5 text-indigo-600" />
                        </div>
                        <p className="ml-4 text-gray-600">
                          Transformez facilement vos contacts NovaWorld en prospects ou clients dans NovaCore
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="mt-1 bg-indigo-100 rounded-full p-1">
                          <CheckCircle className="h-5 w-5 text-indigo-600" />
                        </div>
                        <p className="ml-4 text-gray-600">
                          Bénéficiez de recommandations IA sur qui contacter et pourquoi
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="mt-1 bg-indigo-100 rounded-full p-1">
                          <CheckCircle className="h-5 w-5 text-indigo-600" />
                        </div>
                        <p className="ml-4 text-gray-600">
                          Synchronisez vos communications et suivez vos opportunités d'affaires
                        </p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        Découvrir NovaCore
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="NovaCore Integration"
                      className="rounded-xl shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <div>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-indigo-100 text-indigo-700">Fonctionnalités</Badge>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
                  Des outils{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    puissants
                  </span>{" "}
                  pour votre succès
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  NovaWorld offre une suite complète de fonctionnalités conçues pour maximiser votre impact
                  professionnel et développer votre réseau d'affaires en Afrique.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-16 text-center">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  Explorer toutes les fonctionnalités
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <div>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-indigo-100 text-indigo-700">Tarifs</Badge>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
                  Des formules{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    adaptées
                  </span>{" "}
                  à vos besoins
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choisissez le plan qui correspond le mieux à vos objectifs professionnels et à votre budget.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {pricingPlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`border-0 ${
                      plan.popular ? "shadow-2xl ring-2 ring-indigo-500 scale-105 z-10" : "shadow-lg hover:shadow-xl"
                    } transition-all`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-5 left-0 right-0 mx-auto w-32">
                        <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-1 px-3">
                          Recommandé
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</h3>
                      <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-bold text-indigo-600">{plan.price}€</span>
                        <span className="text-gray-500 ml-2">/mois</span>
                      </div>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                      <div className="space-y-4 mb-8">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <span className="ml-3 text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-16 text-center">
                <p className="text-gray-600 mb-4">Besoin d'une solution sur mesure pour votre entreprise ?</p>
                <Button variant="outline" className="border-indigo-200 text-indigo-700">
                  Contactez notre équipe commerciale
                </Button>
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-indigo-100 text-indigo-700">Témoignages</Badge>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
                  Ce que disent nos{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    utilisateurs
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Découvrez comment NovaWorld transforme le paysage professionnel africain à travers les témoignages de
                  nos utilisateurs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="inline-block h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.content}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-16 text-center">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  Voir plus de témoignages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Prêt à rejoindre NovaWorld ?</h2>
            <p className="text-xl text-indigo-100 mb-10">
              Créez votre compte dès aujourd'hui et commencez à développer votre réseau professionnel en Afrique.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Créer un compte gratuit
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Demander une démo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img src="/images/novaworld-logo.png" alt="NovaWorld Logo" className="h-10 w-10 object-contain" />
                <span className="text-xl font-bold">NovaWorld</span>
              </div>
              <p className="text-gray-400 mb-6">
                Le premier réseau social B2B panafricain conçu pour connecter les professionnels et entreprises du
                continent.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Produit</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Témoignages
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Entreprise</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Carrières
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Légal</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mentions légales
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DL Solutions. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
