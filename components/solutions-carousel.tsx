"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
// Removed motion import
import { Building2, Banknote, LineChart, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const solutions = [
  {
    id: 1,
    title: "CRM Immobilier",
    description: "Gérez vos biens immobiliers efficacement avec notre solution complète de gestion immobilière",
    icon: <Home className="w-12 h-12 text-blue-600" />,
    features: [
      "Gestion des biens",
      "Suivi des locations",
      "Gestion des clients",
      "Tableaux de bord"
    ],
    href: "/solutions/immobilier"
  },
  {
    id: 2,
    title: "CRM Banque",
    description: "Solutions bancaires innovantes pour une gestion optimale de vos services financiers",
    icon: <Banknote className="w-12 h-12 text-green-600" />,
    features: [
      "Gestion des comptes",
      "Suivi des transactions",
      "Analyse financière",
      "Rapports personnalisés"
    ],
    href: "/solutions/banque"
  },
  {
    id: 3,
    title: "CRM Trading",
    description: "Plateforme de trading avancée pour une gestion efficace de vos investissements",
    icon: <LineChart className="w-12 h-12 text-purple-600" />,
    features: [
      "Suivi des marchés",
      "Analyse technique",
      "Gestion des portefeuilles",
      "Alertes en temps réel"
    ],
    href: "/solutions/trading"
  },
  {
    id: 4,
    title: "CRM Agence",
    description: "Gestion complète de votre agence avec des outils adaptés à vos besoins",
    icon: <Building2 className="w-12 h-12 text-orange-600" />,
    features: [
      "Gestion des équipes",
      "Suivi des projets",
      "Rapports d'activité",
      "Planification"
    ],
    href: "/solutions/agence"
  }
]

export function SolutionsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Nos Solutions CRM
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Des solutions innovantes adaptées à chaque secteur d'activité
        </p>
      </div>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {solutions.map((solution) => (
            <CarouselItem key={solution.id} className="md:basis-1/2 lg:basis-1/3">
              <div
                className="p-1"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-6">
                      {solution.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-center text-gray-900 dark:text-white">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                      {solution.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {solution.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-center">
                      <Button asChild variant="outline" className="w-full">
                        <Link href={solution.href}>
                          En savoir plus
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
} 