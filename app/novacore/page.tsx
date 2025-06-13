"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/services/service-card"
import { ArrowRight, Users, Activity, Settings, Shield, Workflow } from "lucide-react"

const services = [
  {
    title: "NovaWorld",
    description: "Réseau social B2B professionnel avec IA",
    status: "active" as const,
    users: "2.5k+",
    features: [
      "Networking IA",
      "Publications",
      "Entreprises",
      "Analytics"
    ],
    link: "/novacore/novaworld"
  },
  {
    title: "DL Style",
    description: "Boutique en ligne premium",
    status: "active" as const,
    users: "1.2k+",
    features: [
      "E-commerce",
      "Paiements",
      "Inventory",
      "Analytics"
    ],
    link: "/novacore/dl-style"
  },
  {
    title: "DL Travel",
    description: "Plateforme de vente de billets d'avion",
    status: "active" as const,
    users: "850+",
    features: [
      "API Vols",
      "Réservations",
      "Commissions",
      "B2B/B2C"
    ],
    link: "/novacore/dl-travel"
  },
  {
    title: "DL Bookmaker",
    description: "Paris sportifs assistés par IA",
    status: "beta" as const,
    users: "320+",
    features: [
      "Prédictions IA",
      "Paris Live",
      "Analytics",
      "Wallet"
    ],
    link: "/novacore/dl-bookmaker"
  }
]

export default function NovaCorePage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">NovaCore</h1>
          <p className="text-muted-foreground">
            Plateforme de services intelligents
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utilisateurs Actifs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8k+</div>
              <p className="text-xs text-muted-foreground">
                +12% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenus Mensuel
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€45.2k</div>
              <p className="text-xs text-muted-foreground">
                +8% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Services Actifs
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                100% de disponibilité
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Satisfaction
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">
                +2% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" className="w-full justify-start">
                Gestion des utilisateurs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/novacore/workflows">
                  Workflows n8n
                  <Workflow className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Paramètres système
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Sécurité
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
