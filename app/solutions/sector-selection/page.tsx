"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Stethoscope, 
  Banknote, 
  Shield, 
  Home, 
  Hotel, 
  GraduationCap,
  Utensils,
  Sparkles,
  Dumbbell,
  Car,
  Users,
  Code,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react"
import Link from "next/link"

const sectors = [
  {
    id: "hotel",
    name: "Hôtellerie & Restauration",
    icon: Hotel,
    description: "Gestion complète d'hôtels, restaurants, spas et centres de bien-être",
    features: [
      "Réservations et check-in/out",
      "Gestion des chambres et services",
      "Restaurant et room service",
      "SPA et centre de bien-être",
      "Gestion des événements",
      "Analytics et KPI temps réel"
    ],
    color: "bg-blue-500",
    badge: "Premium",
    popular: true
  },
  {
    id: "bank",
    name: "Banque & Finance",
    icon: Banknote,
    description: "Solutions bancaires complètes avec conformité réglementaire",
    features: [
      "Gestion des comptes clients",
      "Prêts et crédits",
      "Investissements et trading",
      "Conformité KYC/AML",
      "Rapports réglementaires",
      "Services financiers IA"
    ],
    color: "bg-green-500",
    badge: "Enterprise"
  },
  {
    id: "insurance",
    name: "Assurance",
    icon: Shield,
    description: "Gestion des polices d'assurance et sinistres",
    features: [
      "Gestion des polices",
      "Sinistres et indemnisations",
      "Tarification dynamique",
      "Prévention des risques",
      "Rapports de conformité",
      "Services clients automatisés"
    ],
    color: "bg-purple-500",
    badge: "Pro"
  },
  {
    id: "realestate",
    name: "Immobilier",
    icon: Home,
    description: "Gestion immobilière complète : location, vente, gestion locative",
    features: [
      "Gestion des biens",
      "Location et vente",
      "Gestion locative",
      "Visites virtuelles 3D",
      "Calculs financiers",
      "Parking et services annexes"
    ],
    color: "bg-orange-500",
    badge: "Popular"
  },
  {
    id: "university",
    name: "Université & Formation",
    icon: GraduationCap,
    description: "Gestion académique et administrative des établissements",
    features: [
      "Gestion des étudiants",
      "Programmes et cours",
      "Examens et évaluations",
      "Recherche et projets",
      "Services étudiants",
      "Analytics académiques"
    ],
    color: "bg-indigo-500",
    badge: "Education"
  },
  {
    id: "restaurant",
    name: "Restauration",
    icon: Utensils,
    description: "Gestion de restaurants, cafés et services alimentaires",
    features: [
      "Gestion des commandes",
      "Menu et inventaire",
      "Réservations",
      "Livraison et take-away",
      "Gestion des employés",
      "Analytics de vente"
    ],
    color: "bg-red-500",
    badge: "Food"
  },
  {
    id: "spa",
    name: "SPA & Beauté",
    icon: Sparkles,
    description: "Gestion de centres de beauté, spas et instituts",
    features: [
      "Réservations de soins",
      "Gestion des produits",
      "Fidélité clients",
      "Planning des thérapeutes",
      "Services premium",
      "Analytics de satisfaction"
    ],
    color: "bg-pink-500",
    badge: "Wellness"
  },
  {
    id: "gym",
    name: "Salle de Sport",
    icon: Dumbbell,
    description: "Gestion de salles de sport et centres fitness",
    features: [
      "Adhésions et abonnements",
      "Planning des cours",
      "Gestion des équipements",
      "Suivi des membres",
      "Services personnalisés",
      "Analytics de performance"
    ],
    color: "bg-yellow-500",
    badge: "Fitness"
  },
  {
    id: "parking",
    name: "Parking & Mobilité",
    icon: Car,
    description: "Gestion de parkings et services de mobilité",
    features: [
      "Gestion des places",
      "Tarification dynamique",
      "Réservations",
      "Services de location",
      "Maintenance véhicules",
      "Analytics d'utilisation"
    ],
    color: "bg-gray-500",
    badge: "Mobility"
  },
  {
    id: "community",
    name: "Community Manager",
    icon: Users,
    description: "Gestion des réseaux sociaux et marketing digital",
    features: [
      "Gestion multi-réseaux",
      "Création de contenu IA",
      "Montage vidéo automatique",
      "Analytics et KPI",
      "Automatisation des posts",
      "Gestion des communautés"
    ],
    color: "bg-teal-500",
    badge: "Digital"
  },
  {
    id: "coding",
    name: "Assistant Code IT",
    icon: Code,
    description: "Environnement de développement avancé avec IA",
    features: [
      "Éditeur de code intelligent",
      "Prévisualisation temps réel",
      "Suggestions et corrections",
      "Déploiement automatisé",
      "Collaboration en équipe",
      "Analytics de développement"
    ],
    color: "bg-cyan-500",
    badge: "Dev"
  }
];

export default function SectorSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Choisissez votre secteur d'activité
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Accédez à un CRM/ERP personnalisé avec des modules spécialisés pour votre secteur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector: any) => (
            <Card key={sector.id} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${sector.color} flex items-center justify-center text-white`}>
                    <sector.icon className="w-6 h-6" />
                  </div>
                  <Badge variant={sector.popular ? "secondary" : "outline"}>
                    {sector.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{sector.name}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {sector.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {sector.features.slice(0, 3).map((feature: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href={`/solutions/${sector.id}/onboarding`}>
                  <Button className="w-full group-hover:bg-primary/90">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 