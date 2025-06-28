"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"



interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "99€",
    description: "Parfait pour les petites entreprises",
    features: [
      "Gestion de base des contacts",
      "Suivi des transactions",
      "Rapports mensuels",
      "Support email",
      "1 utilisateur",
    ],
    buttonText: "Commencer",
  },
  {
    name: "Professional",
    price: "299€",
    description: "Idéal pour les entreprises en croissance",
    features: [
      "Toutes les fonctionnalités Starter",
      "Gestion avancée des leads",
      "Automatisation des tâches",
      "Support prioritaire",
      "5 utilisateurs",
      "Formation incluse",
    ],
    popular: true,
    buttonText: "Essai gratuit",
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    description: "Solution complète pour grandes entreprises",
    features: [
      "Toutes les fonctionnalités Professional",
      "API personnalisée",
      "Intégration sur mesure",
      "Support 24/7",
      "Utilisateurs illimités",
      "Formation dédiée",
      "SLA garanti",
    ],
    buttonText: "Contactez-nous",
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Tarifs DL Solution</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Choisissez le plan qui correspond à vos besoins
        </p>
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm ${isAnnual ? "text-primary" : "text-muted-foreground"}`}>
            Mensuel
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/20"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-primary transition ${
                isAnnual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm ${!isAnnual ? "text-primary" : "text-muted-foreground"}`}>
            Annuel
            <Badge variant="secondary" className="ml-2">
              -20%
            </Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingTiers.map((tier: any) => (
          <Card
            key={tier.name}
            className={`relative ${
              tier.popular
                ? "border-primary shadow-lg scale-105"
                : "border-border"
            }`}
          >
            {tier.popular && (
              <Badge
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                variant="default"
              >
                Le plus populaire
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.price !== "Sur mesure" && (
                  <span className="text-muted-foreground">/mois</span>
                )}
              </div>
              <p className="text-muted-foreground mt-2">{tier.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tier.features.map((feature: any) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={tier.popular ? "default" : "outline"}
              >tier.buttonText</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Besoin d'une solution personnalisée ?</h2>
        <p className="text-muted-foreground mb-8">
          Contactez-nous pour discuter de vos besoins spécifiques
        </p>
        <Button size="lg">Contactez-nous</Button>
      </div>
    </div>
  )
} 