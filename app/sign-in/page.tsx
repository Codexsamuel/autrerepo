"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Building2,
  Users,
  ShoppingCart,
  Plane,
  Utensils,
  Car,
  Heart,
  GraduationCap,
  X,
  CheckCircle,
  Star,
  Clock,
  Shield,
  Zap,
  Globe,
  ArrowLeft,
} from "lucide-react"

interface CRM {
  id: string
  name: string
  description: string
  industry: string[]
  features: string[]
  price: string
  rating: number
  users: string
  icon: any
  color: string
  demo: string
  popular?: boolean
}

interface SubscriptionData {
  companyName: string
  industry: string
  companySize: string
  email: string
  phone: string
  needs: string
  budget: string
}

export default function SignInPage() {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedCRM, setSelectedCRM] = useState<CRM | null>(null)
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    companyName: "",
    industry: "",
    companySize: "",
    email: "",
    phone: "",
    needs: "",
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Afficher le popup après 1 minute
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 60000) // 1 minute

    return () => clearTimeout(timer)
  }, [])

  const crmSystems: CRM[] = [
    {
      id: "ezee-optimus",
      name: "Ezee Optimus",
      description: "Solution CRM complète pour l'hôtellerie et la restauration",
      industry: ["Hôtellerie", "Restauration", "Tourisme"],
      features: ["Gestion réservations", "PMS intégré", "Channel Manager", "Facturation", "Analytics"],
      price: "À partir de 89€/mois",
      rating: 4.8,
      users: "2000+",
      icon: Utensils,
      color: "from-orange-500 to-red-500",
      demo: "/demo/ezee-optimus",
      popular: true,
    },
    {
      id: "salesforce",
      name: "Salesforce CRM",
      description: "Leader mondial du CRM pour toutes les entreprises",
      industry: ["Tous secteurs", "B2B", "B2C"],
      features: ["Gestion leads", "Automatisation", "Analytics", "Mobile", "Intégrations"],
      price: "À partir de 125€/mois",
      rating: 4.7,
      users: "150,000+",
      icon: Building2,
      color: "from-blue-500 to-indigo-500",
      demo: "/demo/salesforce",
    },
    {
      id: "hubspot",
      name: "HubSpot CRM",
      description: "CRM gratuit avec outils marketing intégrés",
      industry: ["Marketing", "Ventes", "Service client"],
      features: ["CRM gratuit", "Marketing automation", "Email marketing", "Landing pages", "Analytics"],
      price: "Gratuit - 890€/mois",
      rating: 4.6,
      users: "100,000+",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      demo: "/demo/hubspot",
    },
    {
      id: "shopify-plus",
      name: "Shopify Plus CRM",
      description: "CRM e-commerce pour les grandes entreprises",
      industry: ["E-commerce", "Retail", "Mode"],
      features: ["Gestion commandes", "Inventory", "Multi-canal", "Analytics", "Apps"],
      price: "À partir de 2000€/mois",
      rating: 4.5,
      users: "50,000+",
      icon: ShoppingCart,
      color: "from-purple-500 to-pink-500",
      demo: "/demo/shopify-plus",
    },
    {
      id: "amadeus",
      name: "Amadeus CRM",
      description: "Solution CRM spécialisée pour l'industrie du voyage",
      industry: ["Voyage", "Agences", "Airlines"],
      features: ["Booking engine", "GDS intégré", "Gestion voyageurs", "Reporting", "Mobile"],
      price: "Sur devis",
      rating: 4.4,
      users: "10,000+",
      icon: Plane,
      color: "from-cyan-500 to-blue-500",
      demo: "/demo/amadeus",
    },
    {
      id: "automotive-crm",
      name: "AutoCRM Pro",
      description: "CRM dédié à l'industrie automobile",
      industry: ["Automobile", "Concessionnaires", "Garage"],
      features: ["Gestion véhicules", "Service après-vente", "Leads", "Financing", "Inventory"],
      price: "À partir de 150€/mois",
      rating: 4.3,
      users: "5,000+",
      icon: Car,
      color: "from-gray-500 to-slate-600",
      demo: "/demo/automotive-crm",
    },
    {
      id: "healthcare-crm",
      name: "MediCRM",
      description: "CRM pour le secteur de la santé et médical",
      industry: ["Santé", "Médical", "Pharmacie"],
      features: ["Dossiers patients", "Rendez-vous", "Facturation", "Conformité", "Télémédecine"],
      price: "À partir de 200€/mois",
      rating: 4.6,
      users: "8,000+",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      demo: "/demo/healthcare-crm",
    },
    {
      id: "education-crm",
      name: "EduCRM",
      description: "CRM pour établissements d'enseignement",
      industry: ["Éducation", "Formation", "Universités"],
      features: ["Gestion étudiants", "Admissions", "Cours", "Évaluations", "Communication"],
      price: "À partir de 99€/mois",
      rating: 4.4,
      users: "3,000+",
      icon: GraduationCap,
      color: "from-indigo-500 to-purple-500",
      demo: "/demo/education-crm",
    },
  ]

  const industries = [
    "Hôtellerie",
    "Restauration",
    "E-commerce",
    "Voyage & Tourisme",
    "Automobile",
    "Santé & Médical",
    "Éducation",
    "Immobilier",
    "Finance",
    "Technologie",
    "Autre",
  ]

  const companySizes = ["1-10 employés", "11-50 employés", "51-200 employés", "201-1000 employés", "1000+ employés"]

  const budgets = ["< 100€/mois", "100-500€/mois", "500-2000€/mois", "2000-5000€/mois", "> 5000€/mois"]

  const getRecommendedCRM = (industry: string): CRM => {
    const industryMap: { [key: string]: string } = {
      Hôtellerie: "ezee-optimus",
      Restauration: "ezee-optimus",
      "E-commerce": "shopify-plus",
      "Voyage & Tourisme": "amadeus",
      Automobile: "automotive-crm",
      "Santé & Médical": "healthcare-crm",
      Éducation: "education-crm",
    }

    const recommendedId = industryMap[industry] || "salesforce"
    return crmSystems.find((crm) => crm.id === recommendedId) || crmSystems[0]
  }

  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation de traitement
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Déterminer le CRM recommandé
    const recommendedCRM = getRecommendedCRM(subscriptionData.industry)

    // Redirection vers le CRM adapté
    window.location.href = recommendedCRM.demo

    setIsSubmitting(false)
  }

  const handleCRMSelect = (crm: CRM) => {
    setSelectedCRM(crm)
    // Redirection directe vers la démo
    window.location.href = crm.demo
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center">
                <Image
                  src="/images/dl-logo.jpg"
                  alt="DL Solutions Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg">DL Solutions</h1>
                <p className="text-sm text-muted-foreground">CRM Solutions</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au site
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700">Solutions CRM</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trouvez le CRM{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                parfait
              </span>{" "}
              pour votre entreprise
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez notre sélection de CRM spécialisés par secteur d'activité. Chaque solution est adaptée aux
              besoins spécifiques de votre industrie.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">8+</div>
              <div className="text-sm text-muted-foreground">CRM Spécialisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50K+</div>
              <div className="text-sm text-muted-foreground">Entreprises</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CRM Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crmSystems.map((crm) => (
              <Card
                key={crm.id}
                className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  crm.popular ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleCRMSelect(crm)}
              >
                {crm.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-1 text-xs font-semibold">
                    ⭐ Plus Populaire
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${crm.color} ${crm.popular ? "mt-6" : ""}`}></div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${crm.color} rounded-lg flex items-center justify-center`}
                    >
                      <crm.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{crm.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{crm.rating}</span>
                        <span className="text-xs text-muted-foreground">({crm.users})</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">{crm.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Secteurs :</h4>
                    <div className="flex flex-wrap gap-1">
                      {crm.industry.slice(0, 3).map((industry, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Fonctionnalités :</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {crm.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-lg">{crm.price}</div>
                        <div className="text-xs text-muted-foreground">par utilisateur</div>
                      </div>
                      <Button size="sm" className={`bg-gradient-to-r ${crm.color} hover:opacity-90`}>
                        Essayer
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir nos solutions CRM ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous sélectionnons les meilleurs CRM du marché et les adaptons à votre secteur d'activité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Sécurité Garantie</h3>
              <p className="text-sm text-muted-foreground">
                Toutes nos solutions respectent les standards de sécurité les plus élevés
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Déploiement Rapide</h3>
              <p className="text-sm text-muted-foreground">Mise en place en moins de 48h avec formation incluse</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Support 24/7</h3>
              <p className="text-sm text-muted-foreground">
                Équipe d'experts disponible en permanence pour vous accompagner
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popup d'abonnement */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <CardHeader className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-white hover:bg-white/20"
                onClick={() => setShowPopup(false)}
              >
                <X className="h-5 w-5" />
              </Button>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Trouvez votre CRM idéal
              </CardTitle>
              <CardDescription className="text-blue-100">
                Répondez à quelques questions pour que nous puissions vous recommander le CRM parfait pour votre
                entreprise
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubscription} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise *</label>
                    <Input
                      type="text"
                      required
                      value={subscriptionData.companyName}
                      onChange={(e) => setSubscriptionData({ ...subscriptionData, companyName: e.target.value })}
                      placeholder="Votre entreprise"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité *</label>
                    <select
                      required
                      value={subscriptionData.industry}
                      onChange={(e) => setSubscriptionData({ ...subscriptionData, industry: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez votre secteur</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Taille de l'entreprise *</label>
                    <select
                      required
                      value={subscriptionData.companySize}
                      onChange={(e) => setSubscriptionData({ ...subscriptionData, companySize: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez la taille</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget mensuel *</label>
                    <select
                      required
                      value={subscriptionData.budget}
                      onChange={(e) => setSubscriptionData({ ...subscriptionData, budget: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez votre budget</option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email professionnel *</label>
                    <Input
                      type="email"
                      required
                      value={subscriptionData.email}
                      onChange={(e) => setSubscriptionData({ ...subscriptionData, email: e.target.value })}
                      placeholder="votre@entreprise.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <Input
                      type="tel"
                      value={subscriptionData.phone}
                      onChange={(e) => setSubscriptionData({ ...subscriptionData, phone: e.target.value })}
                      placeholder="+237 6XX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Besoins spécifiques (optionnel)
                  </label>
                  <Textarea
                    rows={4}
                    value={subscriptionData.needs}
                    onChange={(e) => setSubscriptionData({ ...subscriptionData, needs: e.target.value })}
                    placeholder="Décrivez vos besoins spécifiques, fonctionnalités importantes, intégrations nécessaires..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Analyse en cours...
                      </div>
                    ) : (
                      <>
                        <Building2 className="w-4 h-4 mr-2" />
                        Trouver mon CRM idéal
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowPopup(false)} className="flex-1">
                    Plus tard
                  </Button>
                </div>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 text-center">
                  <Clock className="h-4 w-4 inline mr-1" />
                  <strong>Recommandation personnalisée</strong> basée sur votre secteur et vos besoins spécifiques
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
