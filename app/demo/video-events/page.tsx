"use client";

import { EventVideoCard } from '@/components/event-video-card';
import { EventVideoCarousel } from '@/components/event-video-carousel';
import { Button } from '@/components/ui/button';
import { Pause, Play, Video, Volume2 } from 'lucide-react';
import { useState } from 'react';

export default function VideoEventsDemoPage() {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  const eventVideos = [
    {
      title: "Événement Institut Français",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750840734/a_l_instititu_francais_de_yaounde_flojif.mp4",
      description: "Couverture professionnelle de l'événement à l'Institut Français de Yaoundé"
    },
    {
      title: "Reportage Agence",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750841005/WhatsApp_Video_2025-06-05_at_01.41.08_zau0s5.mp4",
      description: "Reportage professionnel avec équipements HD et drone"
    },
    {
      title: "Événement Institut Français",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750840992/evenement_a_l_institu_francais_ajicak.mp4",
      description: "Événement spécial à l'Institut Français avec couverture complète"
    },
    {
      title: "Teasing UCAC",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750840982/teasing_UCAC_mllc2k.mp4",
      description: "Teasing de l'événement UCAC avec montage professionnel"
    },
    {
      title: "UCAC",
      video: "https://res.cloudinary.com/dko5sommz/video/upload/v1750840961/UCAC_t3lduu.mp4",
      description: "Couverture complète de l'événement UCAC avec drone et équipements HD"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Video className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">Démonstration Vidéos Événements</h1>
            </div>
            <p className="text-xl opacity-90 mb-8">
              Test des vidéos UCAC et autres événements avec autoplay et contrôles améliorés
            </p>
            
            {/* View mode toggle */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={viewMode === 'carousel' ? 'default' : 'outline'}
                onClick={() => setViewMode('carousel')}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Play className="w-4 h-4 mr-2" />
                Carousel
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Video className="w-4 h-4 mr-2" />
                Grille
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {viewMode === 'carousel' ? (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Carousel Vidéo Automatique
            </h2>
            <EventVideoCarousel 
              videos={eventVideos}
              autoPlay={true}
              interval={6000}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Grille des Vidéos d'Événements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventVideos.map((event, index) => (
                <EventVideoCard
                  key={index}
                  title={event.title}
                  video={event.video}
                  description={event.description}
                />
              ))}
            </div>
          </div>
        )}

        {/* Informations techniques */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6">Informations Techniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-4">Fonctionnalités Vidéo</h4>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-center">
                  <Play className="w-4 h-4 mr-2 text-green-400" />
                  Autoplay automatique au chargement
                </li>
                <li className="flex items-center">
                  <Pause className="w-4 h-4 mr-2 text-yellow-400" />
                  Contrôles play/pause interactifs
                </li>
                <li className="flex items-center">
                  <Volume2 className="w-4 h-4 mr-2 text-blue-400" />
                  Contrôle du volume (mute/unmute)
                </li>
                <li className="flex items-center">
                  <Video className="w-4 h-4 mr-2 text-purple-400" />
                  Navigation par carousel ou grille
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-4">Vidéos Incluses</h4>
              <ul className="space-y-2 text-white/90">
                {eventVideos.map((event, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                    {event.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
          <h4 className="text-lg font-semibold text-white mb-3">Instructions de Test</h4>
          <p className="text-white/90">
            • Les vidéos se lancent automatiquement au chargement de la page<br/>
            • Utilisez les contrôles pour play/pause et mute/unmute<br/>
            • Dans le carousel, les vidéos changent automatiquement toutes les 6 secondes<br/>
            • Cliquez sur les flèches ou les points pour naviguer manuellement<br/>
            • Testez les deux modes d'affichage : carousel et grille
          </p>
        </div>
      </div>
    </div>
  );
} 