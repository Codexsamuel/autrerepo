"use client"

import React from "react";
// Removed motion import;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users, 
  TrendingUp,
  Shield,
  Zap,
  Target,
  Camera,
  Satellite
} from "lucide-react";

const ProjectsNewsSection = () => {
  const projects = [
    {
      id: 1,
      title: "DL Surveillance Drone",
      category: "Défense & Sécurité",
      description: "Drone de surveillance militaire nouvelle génération avec IA intégrée",
      image: "/images/drone/ai-generated/drone-surveillance.jpg", // À remplacer par image IA
      fallbackImage: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&h=600&fit=crop",
      date: "2024-01-15",
      location: "DL Solutions HQ",
      team: "Équipe R&D",
      status: "En développement",
      features: ["IA intégrée", "Surveillance 24/7", "Portée 15km", "4K HDR"],
      icon: Shield
    },
    {
      id: 2,
      title: "Système de Contrôle Avancé",
      category: "Technologie",
      description: "Interface de pilotage et contrôle centralisé pour drones militaires",
      image: "/images/drone/ai-generated/control-interface.jpg", // À remplacer par image IA
      fallbackImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      date: "2024-01-10",
      location: "Centre de R&D",
      team: "Équipe Software",
      status: "Phase de test",
      features: ["Interface tactile", "Multi-écrans", "Contrôle vocal", "IA assistée"],
      icon: Zap
    },
    {
      id: 3,
      title: "Station de Contrôle Mobile",
      category: "Infrastructure",
      description: "Station de contrôle portable pour opérations sur le terrain",
      image: "/images/drone/ai-generated/control-station.jpg", // À remplacer par image IA
      fallbackImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      date: "2024-01-05",
      location: "Site de test",
      team: "Équipe Hardware",
      status: "Prototype",
      features: ["Portable", "Résistant", "Multi-drones", "Sécurisé"],
      icon: Target
    }
  ];

  const news = [
    {
      id: 1,
      title: "DL Solutions obtient le contrat militaire",
      category: "Actualité",
      description: "Signature d'un contrat majeur pour la fourniture de drones de surveillance",
      date: "2024-01-20",
      readTime: "3 min",
      image: "/images/drone/ai-generated/news-contract.jpg", // À remplacer par image IA
      fallbackImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Nouvelle technologie de détection IA",
      category: "Innovation",
      description: "Développement d'un système de reconnaissance faciale avancé",
      date: "2024-01-18",
      readTime: "5 min",
      image: "/images/drone/ai-generated/news-ai-detection.jpg", // À remplacer par image IA
      fallbackImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Tests en conditions réelles réussis",
      category: "Technique",
      description: "Validation des performances du drone en environnement hostile",
      date: "2024-01-16",
      readTime: "4 min",
      image: "/images/drone/ai-generated/news-testing.jpg", // À remplacer par image IA
      fallbackImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Projets & Actualités
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Projets Innovants
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos derniers développements en matière de drones de surveillance et de technologies de pointe
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = project.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm">
                      <project.icon className="w-4 h-4 mr-1" />
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-green-600">
                      {project.status}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                    <Users className="w-4 h-4" />
                    {project.team}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-xs">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* News Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Actualités & Innovations
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Restez informés des dernières avancées technologiques de DL Solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = article.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm">
                      {article.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="outline" className="bg-white/20 backdrop-blur-sm">
                      {article.readTime}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('fr-FR')}
                    </div>
                    <Button variant="ghost" size="sm">
                      Lire
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Voir tous nos projets
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsNewsSection; 