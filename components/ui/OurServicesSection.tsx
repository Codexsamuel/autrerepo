'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
}

interface ImageItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
}

const videoServices: VideoItem[] = [
  {
    id: 'services-videos',
    title: 'Nos Services en Vidéo',
    description: 'Découvrez clairement ce que nous faisons et comment nous pouvons vous aider à atteindre vos objectifs.',
    videoUrl: 'https://res.cloudinary.com/dko5sommz/video/upload/v1754855912/WhatsApp_Video_2025-08-10_at_21.49.26_1_ipwrcg.mp4'
  },
  {
    id: 'presentation-equipe',
    title: 'Présentation de Mon Équipe',
    description: 'Rencontrez les experts passionnés qui composent notre équipe et découvrez leurs compétences.',
    videoUrl: 'https://res.cloudinary.com/dko5sommz/video/upload/v1754855904/WhatsApp_Video_2025-08-10_at_21.49.26_pidiys.mp4'
  },
  {
    id: 'dl-solutions-details',
    title: 'DL Solutions en Détails',
    description: 'Une présentation complète de DL Solutions, notre vision, nos valeurs et notre approche.',
    videoUrl: 'https://res.cloudinary.com/dko5sommz/video/upload/v1754848536/WhatsApp_Video_2025-08-10_at_16.47.48_oxartj.mp4'
  }
];

const bestShots: ImageItem[] = [
  {
    id: 'best-shot-1',
    title: 'Meilleure Prise #1',
    description: 'Une de nos meilleures réalisations photographiques professionnelles.',
    imageUrl: 'https://res.cloudinary.com/dko5sommz/image/upload/v1754855919/WhatsApp_Image_2025-08-10_at_21.49.27_i0dlrs.jpg',
    alt: 'Meilleure prise photographique DL Solutions'
  },
  {
    id: 'best-shot-2',
    title: 'Meilleure Prise #2',
    description: 'Excellence technique et créativité dans chaque cliché.',
    imageUrl: 'https://res.cloudinary.com/dko5sommz/image/upload/v1754855895/WhatsApp_Image_2025-08-10_at_21.49.28_1_srbxxr.jpg',
    alt: 'Meilleure prise photographique DL Solutions'
  }
];

export default function OurServicesSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [muted, setMuted] = useState<{ [key: string]: boolean }>({});

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideo(videoId);
  };

  const handleVideoPause = (videoId: string) => {
    setPlayingVideo(null);
  };

  const toggleMute = (videoId: string) => {
    setMuted(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🎬</div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Services en Vidéo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez DL Solutions à travers nos vidéos explicatives et nos meilleures réalisations photographiques
          </p>
        </div>

        {/* Section Vidéos */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Présentations Vidéo de Nos Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoServices.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <video
                    className="w-full h-64 object-cover"
                    poster={video.thumbnail}
                    onPlay={() => handleVideoPlay(video.id)}
                    onPause={() => handleVideoPause(video.id)}
                    muted={muted[video.id] || false}
                    controls
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                  
                  {/* Overlay de contrôle personnalisé */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {playingVideo === video.id ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                            onClick={() => {
                              const videoElement = document.querySelector(`video[src="${video.videoUrl}"]`) as HTMLVideoElement;
                              if (videoElement) videoElement.pause();
                            }}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                            onClick={() => {
                              const videoElement = document.querySelector(`video[src="${video.videoUrl}"]`) as HTMLVideoElement;
                              if (videoElement) videoElement.play();
                            }}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => toggleMute(video.id)}
                      >
                        {muted[video.id] ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {video.title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {video.description}
                  </p>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => {
                      const videoElement = document.querySelector(`video[src="${video.videoUrl}"]`) as HTMLVideoElement;
                      if (videoElement) {
                        if (videoElement.paused) {
                          videoElement.play();
                        } else {
                          videoElement.pause();
                        }
                      }
                    }}
                  >
                    {playingVideo === video.id ? 'Pause' : 'Lecture'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Meilleures Prises */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Nos Meilleures Prises Photographiques
          </h3>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez l'excellence de notre cadreur professionnel à travers ses meilleures réalisations
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {bestShots.map((image) => (
              <div key={image.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.alt}
                    className="w-full h-80 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {image.title}
                  </h4>
                  <p className="text-gray-600">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
            Découvrir Tous Nos Services
          </Button>
        </div>
      </div>
    </section>
  );
} 