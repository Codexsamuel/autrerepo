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
import { Home, Banknote, LineChart, Building2 } from "lucide-react"

const mediaItems = [
  {
    id: 1,
    title: "CRM Immobilier",
    description: "Gérez vos biens immobiliers efficacement",
    icon: <Home className="w-16 h-16 text-white opacity-80" />,
    gradient: "from-blue-500 to-blue-700"
  },
  {
    id: 2,
    title: "CRM Banque",
    description: "Solutions bancaires innovantes",
    icon: <Banknote className="w-16 h-16 text-white opacity-80" />,
    gradient: "from-green-500 to-green-700"
  },
  {
    id: 3,
    title: "CRM Trading",
    description: "Plateforme de trading avancée",
    icon: <LineChart className="w-16 h-16 text-white opacity-80" />,
    gradient: "from-purple-500 to-purple-700"
  },
  {
    id: 4,
    title: "CRM Agence",
    description: "Gestion complète de votre agence",
    icon: <Building2 className="w-16 h-16 text-white opacity-80" />,
    gradient: "from-orange-500 to-orange-700"
  },
]

export function MediaCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {mediaItems.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
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