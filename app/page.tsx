"use client";

import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Star, Users, TrendingUp, Globe, Shield, Rocket, Target, Award, Crown, Sparkles, CheckCircle, Zap, Eye, Code, BarChart3, Smartphone, Palette, ShoppingCart, Headphones, Camera, Video, Music, FileText, Calendar, Mail, Phone, MapPin, Clock, ChevronRight, Play, Pause, Volume2, Maximize, Settings, Share2, Heart, MessageCircle, ThumbsUp, Bookmark, Download, Upload, RefreshCw, RotateCcw, FastForward, Rewind, SkipBack, SkipForward, VolumeX, Volume1, Volume, Mic, MicOff, VideoOff, VideoIcon, Monitor, MonitorOff, Wifi, WifiOff, Battery, BatteryCharging, Signal, SignalHigh, SignalMedium, SignalLow, SignalZero, WifiHigh, WifiMedium, WifiLow, WifiZero, Bluetooth, BluetoothOff, Airplay, Cast, CastOff, ScreenShare, ScreenShareOff, PictureInPicture, PictureInPictureOff, Fullscreen, FullscreenExit, Minimize, Maximize2, Minimize2, Move, RotateCw2, RotateCcw2, ZoomIn, ZoomOut, Search, SearchX, Filter, FilterX, SortAsc, SortDesc, Grid, List, Columns, Rows, Layout, LayoutGrid, LayoutList, LayoutTemplate, Sidebar, SidebarClose, SidebarOpen, PanelLeft, PanelRight, PanelTop, PanelBottom, PanelLeftClose, PanelRightClose, PanelTopClose, PanelBottomClose, PanelLeftOpen, PanelRightOpen, PanelTopOpen, PanelBottomOpen, Split, SplitSquareHorizontal, SplitSquareVertical, SplitSquareDiagonal, SplitSquareDiagonal2, SplitCircleHorizontal, SplitCircleVertical, SplitCircleDiagonal, SplitCircleDiagonal2, StretchHorizontal, StretchVertical, StretchDiagonal, StretchDiagonal2, ShrinkHorizontal, ShrinkVertical, ShrinkDiagonal, ShrinkDiagonal2, MoveHorizontal, MoveVertical, MoveDiagonal, MoveDiagonal2, RotateHorizontal, RotateVertical, RotateDiagonal, RotateDiagonal2, FlipHorizontal, FlipVertical, FlipDiagonal, FlipDiagonal2, MirrorHorizontal, MirrorVertical, MirrorDiagonal, MirrorDiagonal2, ReflectHorizontal, ReflectVertical, ReflectDiagonal, ReflectDiagonal2, InvertHorizontal, InvertVertical, InvertDiagonal, InvertDiagonal2, ScaleHorizontal, ScaleVertical, ScaleDiagonal, ScaleDiagonal2, SkewHorizontal, SkewVertical, SkewDiagonal, SkewDiagonal2, ShearHorizontal, ShearVertical, ShearDiagonal, ShearDiagonal2, DistortHorizontal, DistortVertical, DistortDiagonal, DistortDiagonal2, WarpHorizontal, WarpVertical, WarpDiagonal, WarpDiagonal2, BendHorizontal, BendVertical, BendDiagonal, BendDiagonal2, TwistHorizontal, TwistVertical, TwistDiagonal, TwistDiagonal2, SpiralHorizontal, SpiralVertical, SpiralDiagonal, SpiralDiagonal2, WaveHorizontal, WaveVertical, WaveDiagonal, WaveDiagonal2, RippleHorizontal, RippleVertical, RippleDiagonal, RippleDiagonal2, PulseHorizontal, PulseVertical, PulseDiagonal, PulseDiagonal2, BounceHorizontal, BounceVertical, BounceDiagonal, BounceDiagonal2, ShakeHorizontal, ShakeVertical, ShakeDiagonal, ShakeDiagonal2, WiggleHorizontal, WiggleVertical, WiggleDiagonal, WiggleDiagonal2, JiggleHorizontal, JiggleVertical, JiggleDiagonal, JiggleDiagonal2, WobbleHorizontal, WobbleVertical, WobbleDiagonal, WobbleDiagonal2, TiltHorizontal, TiltVertical, TiltDiagonal, TiltDiagonal2, RollHorizontal, RollVertical, RollDiagonal, RollDiagonal2, SpinHorizontal, SpinVertical, SpinDiagonal, SpinDiagonal2, OrbitHorizontal, OrbitVertical, OrbitDiagonal, OrbitDiagonal2, RevolveHorizontal, RevolveVertical, RevolveDiagonal, RevolveDiagonal2, Rotate3dHorizontal, Rotate3dVertical, Rotate3dDiagonal, Rotate3dDiagonal2, Flip3dHorizontal, Flip3dVertical, Flip3dDiagonal, Flip3dDiagonal2, Scale3dHorizontal, Scale3dVertical, Scale3dDiagonal, Scale3dDiagonal2, Translate3dHorizontal, Translate3dVertical, Translate3dDiagonal, Translate3dDiagonal2, Skew3dHorizontal, Skew3dVertical, Skew3dDiagonal, Skew3dDiagonal2, Matrix3dHorizontal, Matrix3dVertical, Matrix3dDiagonal, Matrix3dDiagonal2, PerspectiveHorizontal, PerspectiveVertical, PerspectiveDiagonal, PerspectiveDiagonal2, TransformOriginHorizontal, TransformOriginVertical, TransformOriginDiagonal, TransformOriginDiagonal2, TransformStyleHorizontal, TransformStyleVertical, TransformStyleDiagonal, TransformStyleDiagonal2, BackfaceVisibilityHorizontal, BackfaceVisibilityVertical, BackfaceVisibilityDiagonal, BackfaceVisibilityDiagonal2, TransformBoxHorizontal, TransformBoxVertical, TransformBoxDiagonal, TransformBoxDiagonal2, TransformOriginX, TransformOriginY, TransformOriginZ, TransformOriginCenter, TransformOriginTop, TransformOriginBottom, TransformOriginLeft, TransformOriginRight, TransformOriginTopLeft, TransformOriginTopRight, TransformOriginBottomLeft, TransformOriginBottomRight, TransformOriginCenterX, TransformOriginCenterY, TransformOriginCenterZ, TransformOriginCenterXY, TransformOriginCenterXZ, TransformOriginCenterYZ, TransformOriginCenterXYZ, TransformOriginTopCenter, TransformOriginBottomCenter, TransformOriginLeftCenter, TransformOriginRightCenter, TransformOriginTopLeftCenter, TransformOriginTopRightCenter, TransformOriginBottomLeftCenter, TransformOriginBottomRightCenter, TransformOriginTopCenterX, TransformOriginTopCenterY, TransformOriginTopCenterZ, TransformOriginTopCenterXY, TransformOriginTopCenterXZ, TransformOriginTopCenterYZ, TransformOriginTopCenterXYZ, TransformOriginBottomCenterX, TransformOriginBottomCenterY, TransformOriginBottomCenterZ, TransformOriginBottomCenterXY, TransformOriginBottomCenterXZ, TransformOriginBottomCenterYZ, TransformOriginBottomCenterXYZ, TransformOriginLeftCenterX, TransformOriginLeftCenterY, TransformOriginLeftCenterZ, TransformOriginLeftCenterXY, TransformOriginLeftCenterXZ, TransformOriginLeftCenterYZ, TransformOriginLeftCenterXYZ, TransformOriginRightCenterX, TransformOriginRightCenterY, TransformOriginRightCenterZ, TransformOriginRightCenterXY, TransformOriginRightCenterXZ, TransformOriginRightCenterYZ, TransformOriginRightCenterXYZ, TransformOriginTopLeftCenterX, TransformOriginTopLeftCenterY, TransformOriginTopLeftCenterZ, TransformOriginTopLeftCenterXY, TransformOriginTopLeftCenterXZ, TransformOriginTopLeftCenterYZ, TransformOriginTopLeftCenterXYZ, TransformOriginTopRightCenterX, TransformOriginTopRightCenterY, TransformOriginTopRightCenterZ, TransformOriginTopRightCenterXY, TransformOriginTopRightCenterXZ, TransformOriginTopRightCenterYZ, TransformOriginTopRightCenterXYZ, TransformOriginBottomLeftCenterX, TransformOriginBottomLeftCenterY, TransformOriginBottomLeftCenterZ, TransformOriginBottomLeftCenterXY, TransformOriginBottomLeftCenterXZ, TransformOriginBottomLeftCenterYZ, TransformOriginBottomLeftCenterXYZ, TransformOriginBottomRightCenterX, TransformOriginBottomRightCenterY, TransformOriginBottomRightCenterZ, TransformOriginBottomRightCenterXY, TransformOriginBottomRightCenterXZ, TransformOriginBottomRightCenterYZ, TransformOriginBottomRightCenterXYZ } from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    {
      id: 1,
      title: "NovaIA - Intelligence Artificielle",
      description: "Découvrez notre écosystème d'agents IA ultra-avancé",
      thumbnail: "/images/nova-ia-preview.jpg",
      videoUrl: "/videos/nova-ia-demo.mp4",
      duration: "2:34"
    },
    {
      id: 2,
      title: "DL Solutions - Écosystème Digital",
      description: "Solutions complètes pour entreprises modernes",
      thumbnail: "/images/dl-solutions-preview.jpg",
      videoUrl: "/videos/dl-solutions-overview.mp4",
      duration: "3:15"
    },
    {
      id: 3,
      title: "Sentinel Zero - Cybersécurité IA",
      description: "Protection avancée avec intelligence artificielle",
      thumbnail: "/images/sentinel-zero-preview.jpg",
      videoUrl: "/videos/sentinel-zero-demo.mp4",
      duration: "4:22"
    }
  ];

  const services = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Intelligence Artificielle",
      description: "Solutions IA avancées pour automatisation et optimisation",
      features: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Développement Web",
      description: "Applications web modernes et performantes",
      features: ["React/Next.js", "Node.js", "TypeScript", "API REST"],
      color: "from-green-500 to-blue-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Applications Mobiles",
      description: "Apps natives et cross-platform",
      features: ["React Native", "Flutter", "iOS", "Android"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & BI",
      description: "Analyse de données et business intelligence",
      features: ["Tableau", "Power BI", "Python", "SQL"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "E-commerce",
      description: "Plateformes de vente en ligne complètes",
      features: ["WooCommerce", "Shopify", "Paiements", "Logistique"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Cybersécurité",
      description: "Protection et sécurité informatique",
      features: ["Audit", "Pentesting", "Compliance", "Monitoring"],
      color: "from-red-500 to-purple-500"
    }
  ];

  const stats = [
    { number: "500+", label: "Projets Réalisés", icon: <Rocket className="h-6 w-6" /> },
    { number: "50+", label: "Clients Satisfaits", icon: <Users className="h-6 w-6" /> },
    { number: "99.9%", label: "Disponibilité", icon: <TrendingUp className="h-6 w-6" /> },
    { number: "24/7", label: "Support", icon: <Globe className="h-6 w-6" /> }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "CEO, TechStart",
      content: "DL Solutions a transformé notre entreprise avec leurs solutions IA innovantes.",
      rating: 5,
      avatar: "/images/testimonials/marie.jpg"
    },
    {
      name: "Jean Martin",
      role: "CTO, InnovCorp",
      content: "Excellente expertise technique et accompagnement de qualité.",
      rating: 5,
      avatar: "/images/testimonials/jean.jpg"
    },
    {
      name: "Sophie Bernard",
      role: "Directrice Marketing, GrowthCo",
      content: "Les résultats dépassent nos attentes. Très professionnel !",
      rating: 5,
      avatar: "/images/testimonials/sophie.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Section Hero avec Vidéo Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
            <source src="/videos/hero-background.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-purple-900/30 to-black/50"></div>
        </div>

        {/* Contenu Hero */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="text-8xl md:text-9xl mb-4 animate-pulse">🚀</div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              DL Solutions
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-gray-200 font-light">
              Écosystème Digital Complet
            </p>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Davy & Lucie - Innovation & Excellence
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <Brain className="mr-3 h-6 w-6" />
                NovaIA - Intelligence Artificielle
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105">
                Découvrir Nos Services
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Stats Rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center">
                  {stat.icon}
                  <span className="ml-2">{stat.number}</span>
                </div>
                <p className="text-sm md:text-base text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-8 w-8 text-white rotate-90" />
        </div>
      </section>

      {/* Section Vidéos Présentations */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Découvrez Nos Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des vidéos présentations pour comprendre nos technologies et innovations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={video.id} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23666'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='16'%3E%3C/tspan%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-300 mb-4">{video.description}</p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Regarder la Vidéo
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des solutions complètes pour transformer votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  En savoir plus
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section NovaIA - Univers IA Ultra-Avancé */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-8xl mb-6 animate-pulse">🧠</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">NovaIA - Centre d'Intelligence Artificielle</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez notre écosystème d'agents IA ultra-avancé avec protocoles A2A/MCP et système de battle ELO
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Battle Arena Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-semibold text-white mb-4">Battle Arena</h3>
              <p className="text-gray-300 mb-4">
                Faites s'affronter vos agents IA préférés dans notre arène de compétition
              </p>
              <Link href="/nova-ia/battle">
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  Lancer un Battle
                </Button>
              </Link>
            </div>

            {/* Protocoles Avancés Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-white mb-4">Protocoles Avancés</h3>
              <p className="text-gray-300 mb-4">
                Communication inter-agents A2A et gestion de contexte MCP
              </p>
              <Link href="/nova-ia/protocols">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Explorer les Protocoles
                </Button>
              </Link>
            </div>

            {/* Agents IA Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-4">Agents IA</h3>
              <p className="text-gray-300 mb-4">
                12 agents spécialisés avec précision 87-96% et système ELO
              </p>
              <Link href="/nova-ia">
                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  Découvrir les Agents
                </Button>
              </Link>
            </div>

            {/* DroneBuilder IA Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🚁</div>
              <h3 className="text-xl font-semibold text-white mb-4">DroneBuilder IA</h3>
              <p className="text-gray-300 mb-4">
                Générateur de drones militaires avec firmware, G-code et missions tactiques
              </p>
              <Link href="/nova-ia/drone-builder">
                <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  Créer un Drone
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <Brain className="mr-3 h-6 w-6" />
                Accéder à NovaIA
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23666'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='16'%3E%3C/tspan%3E%3C/svg%3E";
                    }}
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prêt à Transformer Votre Entreprise ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contactez-nous pour discuter de vos projets et découvrir nos solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <Brain className="mr-3 h-6 w-6" />
                Essayer NovaIA
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105">
                Nous Contacter
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
