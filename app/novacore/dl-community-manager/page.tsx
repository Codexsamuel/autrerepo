import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Users,
  Share2,
  BarChart3,
  Shield,
  Activity,
  ArrowLeft,
  TrendingUp,
  ThumbsUp,
  Heart,
  MessageCircle,
  Zap,
  Video,
  Image,
  Scissors,
  Palette,
  Layers,
} from "lucide-react"
import Link from "next/link"

export default function DLCommunityManagerPage() {
  const [stats, setStats] = useState({
    activeUsers: 1200,
    monthlyRevenue: 450000,
    posts: 2500,
    engagement: 85,
    satisfactionRate: 97,
    securityAlerts: 0,
    fraudPrevented: 0,
    transactionsMonitored: 0,
    activeSessions: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        monthlyRevenue: prev.monthlyRevenue + Math.floor(Math.random() * 1000) - 500,
        posts: prev.posts + Math.floor(Math.random() * 50) - 25,
        engagement: Math.min(100, Math.max(80, prev.engagement + Math.random() * 2 - 1)),
        satisfactionRate: Math.min(100, Math.max(95, prev.satisfactionRate + Math.random() * 2 - 1)),
        securityAlerts: Math.floor(Math.random() * 5),
        fraudPrevented: prev.fraudPrevented + Math.floor(Math.random() * 3),
        transactionsMonitored: prev.transactionsMonitored + Math.floor(Math.random() * 100),
        activeSessions: Math.floor(Math.random() * 1000) + 500,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-8">
        <Link href="/novacore" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au Hub
        </Link>
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          DL Community Manager
        </h1>
        <p className="text-gray-600 text-lg">Gestion de communauté et réseaux sociaux</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(stats).map(([key, value]) => (
          <Card key={key} className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </CardTitle>
              <div className="p-2 bg-indigo-100 rounded-full">
                {key === 'activeUsers' && <Users className="h-4 w-4 text-indigo-600" />}
                {key === 'monthlyRevenue' && <TrendingUp className="h-4 w-4 text-green-600" />}
                {key === 'posts' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                {key === 'engagement' && <Heart className="h-4 w-4 text-yellow-600" />}
                {key === 'satisfactionRate' && <Activity className="h-4 w-4 text-purple-600" />}
                {key === 'securityAlerts' && <Shield className="h-4 w-4 text-red-600" />}
                {key === 'fraudPrevented' && <Shield className="h-4 w-4 text-green-600" />}
                {key === 'transactionsMonitored' && <Activity className="h-4 w-4 text-blue-600" />}
                {key === 'activeSessions' && <Users className="h-4 w-4 text-purple-600" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <Badge variant="default" className="bg-gradient-to-r from-green-500 to-emerald-500">
                  +{Math.floor(Math.random() * 10)}% ce mois
                </Badge>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fonctionnalités */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Gestion de Communauté
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <MessageSquare className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Création de Contenu</h3>
                  <p className="text-sm text-gray-600">Génération et planification de contenu</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Share2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Gestion des Réseaux</h3>
                  <p className="text-sm text-gray-600">Multi-plateformes sociales</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Engagement</h3>
                  <p className="text-sm text-gray-600">Interaction avec la communauté</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <ThumbsUp className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Analyse de Performance</h3>
                  <p className="text-sm text-gray-600">Suivi des métriques clés</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Sécurité et Surveillance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Surveillance IA</h3>
                  <p className="text-sm text-gray-600">Détection en temps réel des fraudes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Transactions Sécurisées</h3>
                  <p className="text-sm text-gray-600">Toutes les transactions sont surveillées</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Authentification Multi-facteurs</h3>
                  <p className="text-sm text-gray-600">Sécurité renforcée pour les utilisateurs</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Rapports de Sécurité</h3>
                  <p className="text-sm text-gray-600">Analyses détaillées des incidents</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outils d'Édition Multimédia */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Outils d'Édition Multimédia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/novacore/dl-community-manager/video-editor">
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Video className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Éditeur Vidéo</h3>
                  <p className="text-sm text-gray-600">Édition professionnelle de vidéos</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/novacore/dl-community-manager/photo-editor">
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-purple-100 rounded-full mb-4">
                    <Image className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Éditeur Photo</h3>
                  <p className="text-sm text-gray-600">Retouche et optimisation d'images</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/novacore/dl-community-manager/capcut">
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-green-100 rounded-full mb-4">
                    <Scissors className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">CapCut</h3>
                  <p className="text-sm text-gray-600">Montage vidéo rapide et efficace</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/novacore/dl-community-manager/canva">
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-yellow-100 rounded-full mb-4">
                    <Palette className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Canva</h3>
                  <p className="text-sm text-gray-600">Design graphique simplifié</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/novacore/dl-community-manager/photoshop">
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-red-100 rounded-full mb-4">
                    <Layers className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Photoshop</h3>
                  <p className="text-sm text-gray-600">Édition photo professionnelle</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
          Accéder à DL Community Manager
        </Button>
        <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
          Documentation
        </Button>
      </div>
    </div>
  );
} 