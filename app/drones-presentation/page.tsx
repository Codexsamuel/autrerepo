'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Download,
    ExternalLink,
    Eye,
    Mail,
    Map,
    MapPin,
    Maximize2,
    Pause,
    Phone,
    Play,
    Satellite,
    Settings,
    Shield,
    Target,
    Volume2,
    VolumeX,
    Wifi,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DronesPresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const slides = [
    {
      id: 1,
      title: "DL Solutions - Innovation Drone",
      subtitle: "Technologie de pointe pour l'avenir",
      content: "Découvrez notre écosystème de drones avancés conçu pour révolutionner l'industrie",
      image: "/images/drones/sentinel-v1-hero.jpg",
      color: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Sentinel V1",
      subtitle: "Drone militaire de nouvelle génération",
      content: "Technologie furtive, autonomie étendue, capacités de reconnaissance avancées",
      image: "/images/drones/sentinel-v1-detail.jpg",
      color: "from-green-600 to-blue-600"
    },
    {
      id: 3,
      title: "Atlas X1",
      subtitle: "Plateforme industrielle polyvalente",
      content: "Charge utile importante, endurance exceptionnelle, applications multiples",
      image: "/images/drones/atlas-x1-detail.jpg",
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 4,
      title: "Simulateur Pro",
      subtitle: "Formation et entraînement avancés",
      content: "Environnement 3D réaliste, contrôles professionnels, missions complexes",
      image: "/images/drones/simulator-pro.jpg",
      color: "from-orange-600 to-red-600"
    },
    {
      id: 5,
      title: "Marché & Opportunités",
      subtitle: "Potentiel de croissance exceptionnel",
      content: "Marché en expansion rapide, applications multiples, ROI attractif",
      image: "/images/drones/market-opportunities.jpg",
      color: "from-teal-600 to-cyan-600"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Sécurité Avancée",
      description: "Systèmes de cryptage militaire, protection contre les interférences"
    },
    {
      icon: Eye,
      title: "Vision Multi-spectrale",
      description: "Caméras thermiques, infrarouge, vision nocturne intégrée"
    },
    {
      icon: Zap,
      title: "Autonomie Étendue",
      description: "Jusqu'à 8 heures de vol, batteries haute performance"
    },
    {
      icon: Map,
      title: "Navigation Précise",
      description: "GPS RTK, système de positionnement centimétrique"
    },
    {
      icon: Wifi,
      title: "Communication Sécurisée",
      description: "Liens de données cryptés, portée étendue"
    },
    {
      icon: Target,
      title: "Précision Militaire",
      description: "Stabilisation gyroscopique, contrôle ultra-précis"
    }
  ];

  const specifications = {
    sentinel: {
      dimensions: "1.2m x 1.2m x 0.3m",
      weight: "2.5 kg",
      maxSpeed: "120 km/h",
      maxAltitude: "6000m",
      endurance: "6 heures",
      payload: "1.5 kg",
      range: "50 km"
    },
    atlas: {
      dimensions: "1.8m x 1.8m x 0.4m",
      weight: "8.5 kg",
      maxSpeed: "80 km/h",
      maxAltitude: "4000m",
      endurance: "8 heures",
      payload: "5 kg",
      range: "100 km"
    }
  };

  const marketData = [
    { year: "2023", market: 25.8, growth: 15.2 },
    { year: "2024", market: 32.1, growth: 24.4 },
    { year: "2025", market: 41.7, growth: 29.9 },
    { year: "2026", market: 54.2, growth: 30.0 },
    { year: "2027", market: 70.5, growth: 30.1 }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* Header de présentation */}
      <header className="relative z-10 bg-black/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Satellite className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DL Solutions - Présentation Investisseurs
                </h1>
                <p className="text-sm text-slate-400">Technologie Drone de Pointe</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Présentation principale */}
      <main className="relative">
        
        {/* Slides de présentation */}
        <div className="relative h-screen overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} opacity-20`} />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center max-w-4xl mx-auto px-4">
                  <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent"
                  >
                    {slides[currentSlide].title}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-3xl font-semibold mb-4 text-blue-300"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                  
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
                  >
                    {slides[currentSlide].content}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Contrôles de navigation */}
          {showControls && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </button>
              
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Indicateurs de slide */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Section Caractéristiques */}
        <section className="py-20 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Caractéristiques Avancées
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Nos drones intègrent les dernières technologies pour offrir des performances exceptionnelles
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-blue-500 transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Spécifications */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Spécifications Techniques
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Sentinel V1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-slate-700/50 rounded-xl p-8 border border-slate-600"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Sentinel V1</h3>
                    <p className="text-slate-400">Drone militaire de nouvelle génération</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(specifications.sentinel).map(([key, value]) => (
                    <div key={key} className="bg-slate-600/50 rounded-lg p-4">
                      <div className="text-sm text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="text-lg font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Atlas X1 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-slate-700/50 rounded-xl p-8 border border-slate-600"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Atlas X1</h3>
                    <p className="text-slate-400">Plateforme industrielle polyvalente</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(specifications.atlas).map(([key, value]) => (
                    <div key={key} className="bg-slate-600/50 rounded-lg p-4">
                      <div className="text-sm text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="text-lg font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Marché */}
        <section className="py-20 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Marché & Opportunités
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Le marché des drones professionnels connaît une croissance exponentielle
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold mb-6">Croissance du Marché</h3>
                <div className="space-y-4">
                  {marketData.map((data, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{data.year}</span>
                        <span className="text-green-400">+{data.growth}%</span>
                      </div>
                      <div className="text-2xl font-bold">${data.market}B</div>
                      <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(data.market / 70.5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-slate-700/50 rounded-xl p-8 border border-slate-600"
              >
                <h3 className="text-2xl font-bold mb-6">Applications Principales</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Surveillance et sécurité</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Agriculture de précision</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span>Inspection industrielle</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span>Cartographie et topographie</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span>Recherche et sauvetage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-teal-500 rounded-full" />
                    <span>Livraison et logistique</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Rejoignez l'Innovation
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Investissez dans l'avenir de la technologie drone avec DL Solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                  <Download className="w-5 h-5 inline mr-2" />
                  Télécharger la Présentation
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  <ExternalLink className="w-5 h-5 inline mr-2" />
                  Demander une Démo
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DL Solutions</h3>
              <p className="text-slate-400">
                Innovation et excellence dans la technologie drone
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produits</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Sentinel V1</li>
                <li>Atlas X1</li>
                <li>Simulateur Pro</li>
                <li>Services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Documentation</li>
                <li>Formation</li>
                <li>Maintenance</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@dlsolutions.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+237 XXX XXX XXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Yaoundé, Cameroun</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 DL Solutions. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 