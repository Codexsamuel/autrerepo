"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const services = [
  {
    title: "Pack Essentiel CRM",
    description: "Mise en place CRM, 1 coaching stratégique/mois, visuels & tableau de bord",
    price: "750 000 FCFA",
    cta: "Réserver",
    features: [
      "Mise en place CRM personnalisé",
      "1 coaching stratégique par mois",
      "Visuels professionnels",
      "Tableau de bord personnalisé",
      "Support technique",
    ],
  },
  {
    title: "Pack Transformation 360°",
    description: "CRM complet, contenus optimisés, coaching, planification stratégique",
    price: "1 500 000 FCFA",
    cta: "Découvrir",
    features: [
      "CRM complet et personnalisé",
      "Contenus optimisés",
      "Coaching intensif",
      "Planification stratégique",
      "Formation complète",
      "Support prioritaire",
    ],
  },
  {
    title: "Pack Excellence & IA",
    description: "CRM avec IA NovaCore, automatisations, KPI, outils IA intégrés",
    price: "1 000 000 FCFA",
    cta: "Commencer",
    features: [
      "CRM avec IA NovaCore",
      "Automatisations avancées",
      "Tableaux de bord KPI",
      "Outils IA intégrés",
      "Analyse prédictive",
      "Support 24/7",
    ],
  },
]

export function ServicesCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % services.length)
  const prev = () => setCurrent((current - 1 + services.length) % services.length)

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Nos Offres de Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Des solutions adaptées à vos besoins pour transformer votre entreprise
        </p>
      </div>

      <div className="relative">
        <Card className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-500">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{services[current].title}</h3>
              <p className="text-gray-600 mb-6">{services[current].description}</p>
              <div className="text-2xl font-bold text-teal-600 mb-6">
                {services[current].price}
              </div>
              <Button
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
                size="lg"
              >
                {services[current].cta}
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ce pack inclut :</h4>
              <ul className="space-y-3">
                {services[current].features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === index
                    ? "bg-teal-500 w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
} 