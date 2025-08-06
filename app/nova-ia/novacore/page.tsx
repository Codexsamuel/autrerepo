import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, Cpu, Network, AlertTriangle, Settings, Users, Database, BarChart3, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NovaCore - Centre de Contrôle IA | DL Solutions",
  description: "Centre de contrôle centralisé pour tous vos agents IA avec monitoring en temps réel, orchestration et gestion avancée.",
  keywords: "NovaCore, contrôle IA, monitoring, orchestration, agents IA, dashboard, temps réel",
};

const systemMetrics = {
  totalAgents: 12,
  activeAgents: 8,
  totalRequests: 15420,
  averageResponseTime: 1.2,
  systemHealth: "excellent" as const,
  energyConsumption: 87,
  networkLatency: 8
};

const recentActivities = [
  {
    id: "1",
    agent: "Sentinel Zero",
    action: "Contre-attaque lancée",
    timestamp: "2025-01-15T10:30:00Z",
    status: "success",
    details: "IP 192.168.1.100 bloquée"
  },
  {
    id: "2",
    agent: "Quantum Mind",
    action: "Calcul quantique terminé",
    timestamp: "2025-01-15T10:25:00Z",
    status: "success",
    details: "Optimisation moléculaire réussie"
  },
  {
    id: "3",
    agent: "Neural Architect",
    action: "Analyse cognitive",
    timestamp: "2025-01-15T10:20:00Z",
    status: "processing",
    details: "Modélisation cérébrale en cours"
  },
  {
    id: "4",
    agent: "Blockchain Oracle",
    action: "Trade DeFi exécuté",
    timestamp: "2025-01-15T10:15:00Z",
    status: "success",
    details: "Profit: +2.5% sur ETH"
  }
];

export default function NovaCorePage() {
  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent": return "text-green-400";
      case "good": return "text-yellow-400";
      case "warning": return "text-orange-400";
      case "critical": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-500";
      case "processing": return "bg-blue-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎛️ NovaCore
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Centre de contrôle centralisé pour tous vos agents IA avec monitoring en temps réel
          </p>
        </div>

        {/* Métriques système */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{systemMetrics.totalAgents}</p>
                  <p className="text-gray-400">Agents Totaux</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{systemMetrics.activeAgents}</p>
                  <p className="text-gray-400">Agents Actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Cpu className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{systemMetrics.averageResponseTime}s</p>
                  <p className="text-gray-400">Temps Réponse</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Network className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{systemMetrics.networkLatency}ms</p>
                  <p className="text-gray-400">Latence Réseau</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statut système */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Carte tactique */}
          <Card className="lg:col-span-2 bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Carte Tactique
              </CardTitle>
              <CardDescription className="text-gray-300">
                Surveillance géolocalisée des menaces en temps réel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-white font-semibold">Carte Tactique</p>
                  <p className="text-gray-400 text-sm">Interface de surveillance géolocalisée</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    Ouvrir la Carte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activités récentes */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Activités Récentes
              </CardTitle>
              <CardDescription className="text-gray-300">
                Dernières actions des agents IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${getStatusColor(activity.status)}`}></div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{activity.agent}</p>
                      <p className="text-gray-300 text-xs">{activity.action}</p>
                      <p className="text-gray-400 text-xs">{activity.details}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contrôles avancés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Settings className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Configuration</h3>
              <p className="text-gray-400 text-sm mb-4">Paramètres système et agents</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Configurer
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Utilisateurs</h3>
              <p className="text-gray-400 text-sm mb-4">Gestion des accès et rôles</p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Gérer
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Database className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Base de Données</h3>
              <p className="text-gray-400 text-sm mb-4">Stockage et vecteurs IA</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Explorer
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm mb-4">Métriques et rapports</p>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                Voir
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Contrôlez votre écosystème IA
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                NovaCore vous donne un contrôle total sur tous vos agents IA. 
                Surveillez, orchestrez et optimisez vos opérations en temps réel.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/nova-ia/ultra-advanced">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Zap className="w-5 h-5 mr-2" />
                    Agents Ultra-Avancés
                  </Button>
                </Link>
                <Link href="/nova-ia">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Retour à NovaIA
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
