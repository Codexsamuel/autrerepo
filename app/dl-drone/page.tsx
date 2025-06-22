"use client"

import React, { useState } from "react";
// Removed motion import;
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Shield, 
  Zap, 
  Target, 
  Users, 
  TrendingUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Star
} from "lucide-react";

const DLDronePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    {
      id: 1,
      title: "Démonstration de vol",
      url: "https://res.cloudinary.com/dl-solutions/video/upload/v1/demo/drone-flight-demo.mp4",
      thumbnail: "/images/drone/drone-flight-thumb.jpg",
      duration: "2:34"
    },
    {
      id: 2,
      title: "Test de surveillance",
      url: "https://res.cloudinary.com/dl-solutions/video/upload/v1/demo/drone-surveillance-test.mp4",
      thumbnail: "/images/drone/drone-surveillance-thumb.jpg",
      duration: "1:45"
    },
    {
      id: 3,
      title: "Capacités techniques",
      url: "https://res.cloudinary.com/dl-solutions/video/upload/v1/demo/drone-tech-capabilities.mp4",
      thumbnail: "/images/drone/drone-tech-thumb.jpg",
      duration: "3:12"
    }
  ];

  const specifications = [
    { label: "Autonomie", value: "45 minutes", icon: Clock },
    { label: "Portée", value: "15 km", icon: MapPin },
    { label: "Vitesse max", value: "120 km/h", icon: Zap },
    { label: "Altitude max", value: "4000m", icon: TrendingUp },
    { label: "Résolution caméra", value: "4K HDR", icon: Camera },
    { label: "Protection", value: "IP67", icon: Shield }
  ];

  const features = [
    "Surveillance 24/7 automatique",
    "Détection d'intrusion IA",
    "Reconnaissance faciale",
    "Cartographie 3D temps réel",
    "Communication sécurisée",
    "Maintenance prédictive"
  ];

  const news = [
    {
      date: "2024-01-15",
      title: "Premier vol d'essai réussi",
      description: "Le prototype DL-001 a effectué son premier vol d'essai avec succès"
    },
    {
      date: "2024-01-10",
      title: "Certification militaire en cours",
      description: "Début des procédures de certification pour l'armée française"
    },
    {
      date: "2024-01-05",
      title: "Partenariat avec Thales",
      description: "Signature d'un partenariat stratégique avec Thales Group"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div 
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 container mx-auto px-4 py-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Target className="w-4 h-4 mr-2" />
              Prototype en développement
            </Badge>
            
            <h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              DL Surveillance Drone
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Drone de surveillance militaire nouvelle génération avec IA intégrée
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-5 h-5 mr-2" />
                Fiche technique PDF
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Mail className="w-5 h-5 mr-2" />
                Contact investisseurs
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carrousel vidéo */}
      <div className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Démonstrations vidéo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="relative group cursor-pointer"
              >
                <Card className="bg-black/40 border-gray-700 text-white overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{video.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spécifications techniques */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">
                Spécifications techniques
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specifications.map((spec, index) => (
                  <div
                    key={spec.label}
                    className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg"
                  >
                    <spec.icon className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="text-gray-300 text-sm">{spec.label}</p>
                      <p className="text-white font-semibold">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/images/drone/Schema_Cablage_Drone_DL.png" 
                alt="Schéma de câblage DL Drone"
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Section investisseurs/Armée */}
      <div className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Intérêt stratégique
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Solution de surveillance de nouvelle génération pour les forces armées et la sécurité nationale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sécurité nationale</h3>
              <p className="text-gray-300">
                Surveillance des frontières, protection des installations sensibles
              </p>
            </div>
            
            <div
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Opérations militaires</h3>
              <p className="text-gray-300">
                Reconnaissance, surveillance de zone, appui aux opérations
              </p>
            </div>
            
            <div
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Marché civil</h3>
              <p className="text-gray-300">
                Applications de sécurité privée, surveillance industrielle
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actualités DL Tech */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Actualités DL Tech
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 border-gray-700 text-white h-full"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      {new Date(item.date).toLocaleDateString('fr-FR')}
                    </Badge>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{item.description}</p>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="py-20 bg-black/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Intéressé par le projet ?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="w-5 h-5 mr-2" />
              Contact direct
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Mail className="w-5 h-5 mr-2" />
              Demande d'informations
            </Button>
          </div>
          
          <p className="text-gray-400 mt-6">
            Projet confidentiel - NDA requis pour plus d'informations
          </p>
        </div>
      </div>
    </div>
  );
};

export default DLDronePage; 