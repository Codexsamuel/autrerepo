"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Code,
  Layers,
  Zap,
  ArrowRight,
  CheckCircle,
  Instagram,
  MessageSquare,
  Calendar,
  BarChart3,
  Image,
  Sparkles,
  Terminal,
  GitBranch,
  Database,
  Lock,
  RefreshCw,
  Rocket,
  Bot,
} from "lucide-react"

export default function NovaCoreHub() {
  const [activeTab, setActiveTab] = useState("overview")

  const features = [
    {
      icon: Brain,
      title: "IA Avancée",
      description: "Algorithmes d'intelligence artificielle de pointe pour automatiser et optimiser vos processus.",
    },
    {
      icon: Layers,
      title: "Modules Spécialisés",
      description: "Modules NovaSocial et NovaDevStudio conçus pour des besoins métiers spécifiques.",
    },
    {
      icon: Zap,
      title: "Automatisation",
      description: "Workflows automatisés qui réduisent les tâches manuelles et augmentent la productivité.",
    },
    {
      icon: Lock,
      title: "Sécurité Enterprise",
      description: "Protection des données et conformité aux standards de sécurité les plus stricts.",
    },
  ]

  const novaSocialFeatures = [
    {
      icon: Instagram,
      title: "Gestion Multi-Réseaux",
      description: "Gérez Instagram, Facebook, LinkedIn et TikTok depuis une interface unique.",
    },
    {
      icon: MessageSquare,
      title: "Génération de Contenu IA",
      description: "Création automatique de posts, captions et hashtags optimisés pour chaque plateforme.",
    },
    {
      icon: Calendar,
      title: "Planning Éditorial IA",
      description: "Calendrier de publication intelligent qui détermine les meilleurs moments pour poster.",
    },
    {
      icon: Image,
      title: "Montage Média Automatisé",
      description: "Édition intelligente de vos photos et vidéos via CapCut API et Canva API.",
    },
    {
      icon: BarChart3,
      title: "Analytics Avancés",
      description: "Analyse de performance et recommandations d'optimisation basées sur l'IA.",
    },
    {
      icon: RefreshCw,
      title: "Boucle d'Amélioration",
      description: "Système d'apprentissage continu qui optimise votre stratégie en fonction des résultats.",
    },
  ]

  const novaDevStudioFeatures = [
    {
      icon: Code,
      title: "Éditeur IA Intelligent",
      description: "Environnement de développement avec auto-complétion et suggestions en temps réel.",
    },
    {
      icon: Terminal,
      title: "Exécution de Code",
      description: "Testez votre code directement dans l'interface avec feedback instantané.",
    },
    {
      icon: GitBranch,
      title: "Gestion de Versions",
      description: "Historique complet et gestion des versions de vos projets.",
    },
    {
      icon: Database,
      title: "Intégration Supabase",
      description: "Connexion native avec Supabase pour la gestion de base de données et l'authentification.",
    },
    {
      icon: Rocket,
      title: "Déploiement Rapide",
      description: "Déployez vos applications en un clic avec des previews instantanées.",
    },
    {
      icon: Bot,
      title: "Assistant IA Codex",
      description: "Assistant de programmation intelligent basé sur OpenAI Codex.",
    },
  ]

  const integrations = [
    {
      name: "OpenAI",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Modèles GPT-4 et Codex pour la génération de contenu et l'assistance au code.",
    },
    {
      name: "Meta Business Suite",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Publication et analyse sur Facebook, Instagram et WhatsApp Business.",
    },
    {
      name: "CapCut API",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Édition vidéo automatisée avec transitions et effets professionnels.",
    },
    {
      name: "Canva API",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Création de visuels et templates graphiques optimisés pour les réseaux sociaux.",
    },
    {
      name: "Supabase",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Base de données, authentification et stockage de fichiers.",
    },
    {
      name: "Clerk",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Gestion des utilisateurs et des sessions sécurisées.",
    },
    {
      name: "Cloudinary",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Gestion et optimisation des médias avec transformation à la volée.",
    },
    {
      name: "LinkedIn API",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Publication et analyse de contenu professionnel sur LinkedIn.",
    },
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      position: "Directrice Marketing",
      company: "TechStart SAS",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "NovaCore a révolutionné notre stratégie de contenu. L'IA génère des posts qui engagent vraiment notre audience et le module NovaSocial nous fait gagner 15h par semaine !",
    },
    {
      name: "Thomas Lefèvre",
      position: "CTO",
      company: "DevInnovate",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "NovaDevStudio est devenu indispensable pour notre équipe. L'assistance IA au code nous permet de développer 40% plus vite avec moins d'erreurs. Un vrai game-changer.",
    },
    {
      name: "Sophie Laurent",
      position: "Community Manager",
      company: "Mode & Style",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "Je gère seule les réseaux de 3 marques grâce à NovaSocial. L'IA comprend parfaitement le ton de chaque marque et crée du contenu qui convertit vraiment.",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "99",
      description: "Idéal pour les petites entreprises et freelances",
      features: [
        "1 module au choix (NovaSocial OU NovaDevStudio)",
        "3 utilisateurs",
        "Génération de contenu limitée (100/mois)",
        "Assistance par email",
        "Intégrations basiques",
      ],
      cta: "Commencer l'essai gratuit",
      popular: false,
    },
    {
      name: "Business",
      price: "249",
      description: "Pour les entreprises en croissance",
      features: [
        "Les 2 modules (NovaSocial + NovaDevStudio)",
        "10 utilisateurs",
        "Génération de contenu illimitée",
        "Assistance prioritaire 24/7",
        "Toutes les intégrations",
        "Rapports personnalisés",
      ],
      cta: "Essai gratuit de 14 jours",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      description: "Solutions personnalisées pour grandes organisations",
      features: [
        "Modules personnalisés",
        "Utilisateurs illimités",
        "API dédiée",
        "Onboarding personnalisé",
        "Manager de compte dédié",
        "SLA garantie 99.9%",
      ],
      cta: "Contacter l'équipe commerciale",
      popular: false,
    },
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
              <a href="/novaworld" className="text-gray-800 hover:text-indigo-600 transition-colors">
                NovaWorld
              </a>
              <a href="/contact" className="text-gray-800 hover:text-indigo-600 transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-indigo-200 text-indigo-700 hidden lg:flex" asChild>
                <a href="/devis">Devis IA</a>
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-indigo-600" asChild>
                <a href="/novacore">NovaCore</a>
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
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <Sparkles className="h-4 w-4 mr-2" />
                Plateforme SaaS IA
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                NovaCore
                <span className="block text-2xl lg:text-3xl mt-2 font-normal">La puissance de l'IA au service de votre business</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                Une plateforme SaaS révolutionnaire propulsée par l'IA qui automatise votre community management et
                accélère votre développement logiciel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                  Démarrer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Voir la démo
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 rounded-full opacity-30 blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400 rounded-full opacity-30 blur-3xl"></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="NovaCore Dashboard"
                  className="rounded-xl shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 px-4 bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="container mx-auto">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="novasocial">NovaSocial</TabsTrigger>
              <TabsTrigger value="novadevstudio">NovaDevStudio</TabsTrigger>
              <TabsTrigger value="pricing">Tarifs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Main Content based on active tab */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <TabsContent value="overview" className="space-y-16">
            {/* Features Overview */}
            <div>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-indigo-100 text-indigo-700">Fonctionnalités</Badge>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
                  Une plateforme{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    tout-en-un
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  NovaCore combine des technologies IA avancées pour automatiser vos processus métier et booster votre
                  productivité.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Modules Overview */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* NovaSocial */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-pink-500 to-orange-500"></div>
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Instagram className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">NovaSocial</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Module IA Community Manager qui automatise entièrement la gestion de contenu digital — de la création
                    à la publication, analyse et optimisation.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="ml-3 text-gray-600">Génération automatique de contenu pour tous les réseaux</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="ml-3 text-gray-600">Montage vidéo et photo intelligent via CapCut API</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="ml-3 text-gray-600">Analytics avancés et optimisation continue</p>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-500" asChild>
                    <a href="/novacore/novasocial">
                      Explorer NovaSocial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* NovaDevStudio */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">NovaDevStudio</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Module Code IA qui permet de coder assisté par intelligence artificielle dans un environnement
                    complet et intuitif.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="ml-3 text-gray-600">Éditeur multi-fichiers avec auto-complétion IA</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="ml-3 text-gray-600">Exécution de code et déploiement rapide</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="ml-3 text-gray-600">Intégration avec Supabase et gestion des versions</p>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500" asChild>
                    <a href="/novacore/novadevstudio">
                      Explorer NovaDevStudio
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Integrations */}
            <div>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-indigo-100 text-indigo-700">Intégrations</Badge>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
                  Connecté à vos{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    outils favoris
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  NovaCore s'intègre parfaitement avec les meilleures technologies pour offrir une expérience fluide et
                  puissante.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {integrations.map((integration, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                        <img
                          src={integration.logo || "/placeholder.svg"}
                          alt={integration.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold mb-2">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-indigo-50 rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-indigo-100 text-indigo-700">Témoignages</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
                  Ce que disent nos{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    clients
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-0 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
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
                      <p className="text-gray-600 italic">"{testimonial.content}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="novasocial" className="space-y-16">
            {/* NovaSocial Hero */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-pink-100 text-pink-700">Module IA Community Manager</Badge>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    NovaSocial
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Automatisez entièrement votre stratégie de contenu digital grâce à l'intelligence artificielle.
                  NovaSocial crée, publie, analyse et optimise votre présence sur les réseaux sociaux sans intervention
                  humaine.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mt-1 bg-pink-100 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-pink-600" />
                    </div>
                    <p className="ml-4 text-gray-600">
                      <span className="font-medium text-gray-800">Gain de temps massif</span> - Économisez jusqu'à 20
                      heures par semaine sur la gestion de vos réseaux sociaux
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 bg-pink-100 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-pink-600" />
                    </div>
                    <p className="ml-4 text-gray-600">
                      <span className="font-medium text-gray-800">Contenu optimisé</span> - L'IA analyse les tendances et
                      crée du contenu qui performe mieux que la moyenne
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 bg-pink-100 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-pink-600" />
                    </div>
                    <p className="ml-4 text-gray-600">
                      <span className="font-medium text-gray-800">Cohérence parfaite</span> - Maintenez une identité de
                      marque cohérente sur toutes les plateformes
                    </p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-orange-500">
                  Essayer NovaSocial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-100 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100 rounded-full opacity-50 blur-3xl"></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="NovaSocial Dashboard"
                  className="rounded-xl shadow-2xl relative z-10"
                />
              </div>
            </div>

            {/* NovaSocial Features */}
            <div>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-pink-100 text-pink-700">Fonctionnalités</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
                  Tout ce dont vous avez besoin pour{" "}
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    exceller
                  </span>{" "}
                  sur les réseaux
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {novaSocialFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* NovaSocial Workflow */}
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-pink-100 text-pink-700">Workflow Automatisé</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
                  Comment fonctionne{" "}
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    NovaSocial
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Un processus entièrement automatisé qui transforme votre stratégie social media
                </p>
              </div>

              <div className="relative">
                <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-200 to-orange-200 transform -translate-y-1/2"></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold mb-2">Définition des objectifs</h3>
                      <p className="text-sm text-gray-600">
                        Choisissez vos objectifs marketing : notoriété, ventes, fidélisation...
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold mb-2">Création de contenu IA</h3>
                      <p className="text-sm text-gray-600">
                        L'IA génère textes, visuels et vidéos adaptés à chaque plateforme
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold mb-2">Publication automatique</h3>
                      <p className="text-sm text-gray-600">
                        Planification et publication aux moments optimaux sur tous les réseaux
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold mb-2">Analyse et optimisation</h3>
                      <p className="text-sm text-gray-600">
                        L'IA analyse les performances et ajuste la stratégie en continu
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NovaSocial Demo CTA */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Prêt à révolutionner votre présence sur les réseaux sociaux ?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Rejoignez les entreprises qui ont transformé leur stratégie social media grâce à NovaSocial
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-orange-500">
                  Démarrer l'essai gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-pink-200 text-pink-700">
                  Voir une démo
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="novadevstudio" className="space-y-16">
            {/* NovaDevStudio Hero */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-cyan-100 text-cyan-700">Module Code IA</Badge>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                    NovaDevStudio
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Développez plus rapidement et intelligemment grâce à notre environnement de codage assisté par IA.
                  NovaDevStudio comprend votre code, suggère des améliorations et accélère votre workflow de
                  développement.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mt-1 bg-cyan-100 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-cyan-600" />
                    </div>
                    <p className="ml-4 text-gray-600">
                      <span className="font-medium text-gray-800">Productivité augmentée</span> - Codez jusqu'à 40% plus
                      rapidement avec l'assistance IA
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 bg-cyan-100 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-cyan-600" />
                    </div>
                    <p className="ml-4 text-gray-600">
                      <span className="font-medium text-gray-800">Moins d'erreurs</span> - L'IA détecte et corrige les
                      bugs avant même qu'ils n'apparaissent
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 bg-cyan-100 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-cyan-600" />
                    </div>
                    <p className="ml-4 text-gray-600">
                      <span className="font-medium text-gray-800">Déploiement simplifié</span> - De l'écriture du code au
                      déploiement en production en quelques clics
                    </p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
                  Essayer NovaDevStudio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-100 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="NovaDevStudio Interface"
                  className="rounded-xl shadow-2xl relative z-10"
                />
              </div>
            </div>

            {/* NovaDevStudio Features */}
            <div>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-cyan-100 text-cyan-700">Fonctionnalités</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
                  Outils de développement{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                    nouvelle génération
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {novaDevStudioFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Code Editor Preview */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-cyan-100 text-cyan-700">Éditeur Intelligent</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
                  Codez comme jamais auparavant
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Un environnement de développement complet avec assistance IA en temps réel
                </p>
              </div>

              <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-gray-400 text-sm">app.js</div>
                </div>
                <div className="p-6 text-gray-300 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">
                    <span className="text-blue-400">import</span> React, &#123; useState &#125;{" "}
                    <span className="text-blue-400">from</span> <span className="text-green-400">'react'</span>;
                    <br />
                    <br />
                    <span className="text-blue-400">function</span>{" "}
                    <span className="text-yellow-400">App</span>() &#123;
                    <br />
                    &nbsp;&nbsp;<span className="text-blue-400">const</span> [count, setCount] = useState(0);
                    <br />
                    <br />
                    &nbsp;&nbsp;<span className="text-blue-400">return</span> (
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">div</span>&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">h1</span>&gt;Counter
                    App&lt;/<span className="text-yellow-400">h1</span>&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">p</span>&gt;You clicked{" "}
                    &#123;count&#125; times&lt;/<span className="text-yellow-400">p</span>&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">button</span>{" "}
                    <span className="text-purple-400">onClick</span>=&#123;() =&gt; setCount(count + 1)&#125;&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Click me
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-yellow-400">button</span>&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-yellow-400">div</span>&gt;
                    <br />
                    &nbsp;&nbsp;);
                    <br />
                    &#125;
                    <br />
                    <br />
                    <span className="text-blue-400">export</span>{" "}
                    <span className="text-blue-400">default</span> App;
                    <br />
                    <br />
                    <span className="text-gray-500">
                      // IA Suggestion: Consider adding a reset button and a custom increment value
                    </span>
                  </pre>
                </div>
              </div>
            </div>

            {/* NovaDevStudio Demo CTA */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre façon de coder ?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Rejoignez les développeurs qui ont adopté NovaDevStudio pour accélérer leur workflow
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500">
                  Démarrer l'essai gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-cyan-200 text-cyan-700">
                  Voir une démo
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-16">
            {/* Pricing Plans */}
            <div>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-indigo-100 text-indigo-700">Tarifs</Badge>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
                  Des formules adaptées à{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    tous les besoins
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choisissez le plan qui correspond le mieux à vos objectifs et à votre budget
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                        <span className="text-4xl font-bold text-indigo-600">{plan.price}</span>
                        {plan.price !== "Sur mesure" && <span className="text-gray-500 ml-2">/mois</span>}
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
            </div>

            {/* FAQ */}
            <div className="bg-indigo-50 rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-indigo-100 text-indigo-700">FAQ</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">Questions fréquentes</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Puis-je essayer NovaCore gratuitement ?</h3>
                  <p className="text-gray-600">
                    Oui, nous proposons un essai gratuit de 14 jours pour tous nos plans, sans engagement et sans carte
                    bancaire.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    Quelles sont les différences entre NovaSocial et NovaDevStudio ?
                  </h3>
                  <p className="text-gray-600">
                    NovaSocial est dédié à l'automatisation des réseaux sociaux, tandis que NovaDevStudio est un
                    environnement de développement assisté par IA.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    Puis-je changer de plan à tout moment ?
                  </h3>
                  <p className="text-gray-600">
                    Oui, vous pouvez passer à un plan supérieur à tout moment. La différence sera calculée au prorata.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    Comment fonctionne l'intégration avec mes outils existants ?
                  </h3>
                  <p className="text-gray-600">
                    NovaCore s'intègre facilement avec les principales plateformes via des API sécurisées et des
                    connecteurs prédéfinis.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    Quelle est la politique de confidentialité des données ?
                  </h3>
                  <p className="text-gray-600">
                    Nous respectons strictement le RGPD et ne partageons jamais vos données. Vous en restez propriétaire
                    à 100%.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    Quel support est inclus dans mon abonnement ?
                  </h3>
                  <p className="text-gray-600">
                    Tous les plans incluent un support par email. Les plans Business et Enterprise bénéficient d'un
                    support prioritaire 24/7.
                  </p>
                </div>
              </div>
            </div>

            {/* Enterprise CTA */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Besoin d'une solution sur mesure ?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Contactez notre équipe commerciale pour discuter de vos besoins spécifiques et obtenir une offre
                personnalisée.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                Contacter l'équipe commerciale
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </TabsContent>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Prêt à transformer votre business avec l'IA ?
            </h2>
            <p className="text-xl text-indigo-100 mb-10">
              Rejoignez les entreprises qui ont déjà adopté NovaCore et constaté des résultats exceptionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Démarrer gratuitement
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
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-400 flex items-center justify-center bg-white">
                  <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-8 w-8 object-contain" />
                </div>
                <span className="text-xl font-bold">NovaCore</span>
              </div>
              <p className="text-gray-400 mb-6">
                Plateforme SaaS IA-powered qui révolutionne le community management et le développement logiciel.
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
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 \
