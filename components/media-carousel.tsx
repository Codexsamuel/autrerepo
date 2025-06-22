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
import { Button } from "@/components/ui/button"
import { Play, Pause, Loader2 } from "lucide-react"
import Image from "next/image"

interface MediaCarouselProps {
  items: {
    id: string
    title: string
    description: string
    imageUrl: string
    videoUrl?: string
  }[]
}

export function MediaCarousel({ items }: MediaCarouselProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [loading, setLoading] = React.useState<{ [key: string]: boolean }>({})
  const videoRefs = React.useRef<{ [key: string]: HTMLVideoElement | null }>({})

  const handleVideoLoad = (id: string) => {
    setLoading(prev => ({ ...prev, [id]: false }))
  }

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id]
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
        {items.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                  {item.videoUrl ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={el => videoRefs.current[item.id] = el}
                        src={item.videoUrl}
                        className="w-full h-full object-cover"
                        controls={false}
                        loop
                        muted
                        playsInline
                        onLoadedData={() => handleVideoLoad(item.id)}
                      />
                      {loading[item.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Loader2 className="h-8 w-8 animate-spin text-white" />
                        </div>
                      )}
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute bottom-4 right-4 rounded-full"
                        onClick={() => togglePlay(item.id)}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ) : (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  )}
                    </div>
                    <div className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      </Carousel>
  )
} 