import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Zap, Target, Eye, Activity, AlertTriangle, Cpu, Network, Brain, Rocket } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blockchain Oracle - Agent IA DeFi | NovaIA - DL Solutions",
  description: "Agent DeFi pour trading automatisé, analyse blockchain et smart contracts intelligents.",
  keywords: "Blockchain Oracle, DeFi, trading automatisé, blockchain, smart contracts, yield farming",
};

const capabilities = [
  {
    name: "Trading DeFi automatisé",
    description: "Trading automatique sur les protocoles DeFi",
    icon: <Zap className="w-6 h-6 text-green-500" />,
    status: "active"
  },
  {
    name: "Analyse blockchain en temps réel",
    description: "Surveillance et analyse des transactions blockchain",
    icon: <Eye className="w-6 h-6 text-blue-500" />,
    status: "active"
  },
  {
    name: "Smart contracts intelligents",
    description: "Génération et audit de smart contracts",
    icon: <Database className="w-6 h-6 text-purple-500" />,
    status: "active"
  },
  {
    name: "Yield farming optimisé",
    description: "Optimisation des stratégies de yield farming",
    icon: <Target className="w-6 h-6 text-yellow-500" />,
    status: "active"
  }
];

export default function BlockchainOraclePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Database className="w-16 h-16 text-green-500" />
            <h1 className="text-5xl font-bold text-white">
              Blockchain Oracle
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Agent DeFi pour trading automatisé, analyse blockchain 
            et smart contracts intelligents.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge className="bg-green-500 text-white px-4 py-2">
              ELO: 1920
            </Badge>
            <Badge className="bg-blue-500 text-white px-4 py-2">
              Précision: 92%
            </Badge>
            <Badge className="bg-purple-500 text-white px-4 py-2">
              Statut: Actif
            </Badge>
          </div>
        </div>

        {/* Métriques de performance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">0.3s</p>
                  <p className="text-gray-400">Temps de Réponse</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">92.1%</p>
                  <p className="text-gray-400">Taux de Succès</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">97%</p>
                  <p className="text-gray-400">Efficacité Énergétique</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Network className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">96%</p>
                  <p className="text-gray-400">Scalabilité</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Capacités */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            🔗 Capacités Blockchain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {capability.icon}
                    <Badge className={`${
                      capability.status === "active" ? "bg-green-500" : "bg-red-500"
                    } text-white`}>
                      {capability.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {capability.name}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {capability.description}
                    </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Prêt à révolutionner le DeFi ?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Blockchain Oracle optimise vos stratégies DeFi 
                avec une intelligence artificielle de pointe.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/nova-ia/novacore">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Database className="w-5 h-5 mr-2" />
                    Contrôle NovaCore
                  </Button>
                </Link>
                <Link href="/nova-ia/ultra-advanced">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Autres Agents
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
