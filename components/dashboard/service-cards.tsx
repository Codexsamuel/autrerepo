"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"



interface ServiceCardProps {
  title: string
  description: string
  status: "active" | "beta"
  users: string
  features: string[]
}

export function ServiceCards() {
  const services = [
    {
      title: "NovaWorld",
      description: "Réseau social B2B professionnel avec IA",
      status: "active" as const,
      users: "2.5k+ utilisateurs",
      features: ["Networking IA", "Publications", "Entreprises", "Analytics"],
    },
    {
      title: "DL Style",
      description: "Boutique en ligne premium DL Solutions",
      status: "active" as const,
      users: "1.2k+ utilisateurs",
      features: ["E-commerce", "Paiements", "Inventory", "Analytics"],
    },
    {
      title: "DL Travel",
      description: "Plateforme de vente de billets d'avion",
      status: "active" as const,
      users: "850+ utilisateurs",
      features: ["API Vols", "Réservations", "Commissions", "B2B/B2C"],
    },
    {
      title: "DL Bookmaker",
      description: "Paris sportifs assistés par IA",
      status: "beta" as const,
      users: "320+ utilisateurs",
      features: ["Prédictions IA", "Paris Live", "Analytics", "Wallet"],
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <Card key={service.title} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <Badge variant={service.status === "active" ? "success" : "warning"}>service.status === "active" ? "Actif" : "Bêta"</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{service.description}</p>
            <p className="text-sm font-medium">{service.users}</p>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-2">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-center text-sm">
                  <span className="mr-2">•</span>
                  {feature}
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full">Accéder au service</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 