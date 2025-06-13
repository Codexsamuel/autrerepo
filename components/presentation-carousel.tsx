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
import { Play, Pause, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const mediaItems = [
  {
    id: 1,
    type: "video",
    title: "Présentation NovaCore",
    description: "Découvrez notre plateforme innovante",
    url: "https://res.cloudinary.com/dko5sommz/video/upload/v1749401814/WhatsApp_Video_2025-06-06_at_22.54.48_fudnfd.mp4",
  },
  {
    id: 2,
    type: "video",
    title: "Vue Aérienne",
    description: "Une perspective unique de nos installations",
    url: "https://res.cloudinary.com/dko5sommz/video/upload/v1749401792/WhatsApp_Video_2025-06-06_at_22.54.45_drvh4l.mp4",
  },
  {
    id: 3,
    type: "image",
    title: "Notre Équipe",
    description: "Des professionnels à votre service",
    url: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
  },
  {
    id: 4,
    type: "image",
    title: "Nos Installations",
    description: "Un environnement de travail moderne",
    url: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
  },
  {
    id: 5,
    type: "image",
    title: "Notre Vision",
    description: "Innovation et excellence",
    url: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401789/WhatsApp_Image_2025-06-06_at_23.21.14_wuakom.jpg",
  },
]

export function PresentationCarousel() {
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [loadedVideos, setLoadedVideos] = React.useState<Set<number>>(new Set())
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      plugin.current.stop()
    } else {
      plugin.current.play()
    }
  }

  const handleVideoLoad = (id: number) => {
    setLoadedVideos(prev => new Set(prev).add(id))
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center mb-8"
      >
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Découvrez Notre Univers
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          Une immersion dans l'excellence et l'innovation
        </p>
        <Button
          onClick={toggleAutoplay}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Lecture
            </>
          )}
        </Button>
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
          {mediaItems.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-1"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="relative aspect-video group">
                      {item.type === "video" ? (
                        <>
                          <video
                            src={item.url}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            onLoadedData={() => handleVideoLoad(item.id)}
                          />
                          {!loadedVideos.has(item.id) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="relative w-full h-full">
                          <Image
                            src={item.url}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={item.id <= 2}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.jpg"
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ImageIcon className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
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