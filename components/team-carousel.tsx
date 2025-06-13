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
import { motion } from "framer-motion"
import { Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    id: 1,
    name: "Samuel",
    role: "CEO & Fondateur",
    image: "/images/team/Samuel.png",
    description: "Visionnaire et entrepreneur passionné, Samuel dirige notre entreprise avec une expertise reconnue dans le domaine de l'innovation technologique.",
    linkedin: "https://www.linkedin.com/in/samuel-dl/",
    email: "samuel@novacore.com"
  },
  {
    id: 2,
    name: "Lucie",
    role: "Directrice des Opérations",
    image: "/images/team/Lucie.png",
    description: "Experte en gestion et innovation, Lucie assure l'excellence opérationnelle de nos services et le développement de nos solutions.",
    linkedin: "https://www.linkedin.com/in/lucie-dl/",
    email: "lucie@novacore.com"
  }
]

export function TeamCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false })
  )

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Notre Équipe Dirigeante
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Des leaders visionnaires qui façonnent l'avenir de l'innovation
        </p>
      </motion.div>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {teamMembers.map((member) => (
            <CarouselItem key={member.id} className="md:basis-1/2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-1"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {member.description}
                      </p>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          asChild
                        >
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          asChild
                        >
                          <a href={`mailto:${member.email}`}>
                            <Mail className="h-4 w-4" />
                            Email
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
} 