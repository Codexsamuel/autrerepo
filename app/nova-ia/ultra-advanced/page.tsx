import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Star, Users, TrendingUp, Target, Rocket, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agents IA Ultra-Avancés | NovaIA | DL Solutions",
  description: "Découvrez nos agents IA de pointe avec capacités révolutionnaires en cybersécurité, quantum, neuroscience, blockchain, spatial et biotech.",
  keywords: ["IA ultra-avancée", "Cybersécurité", "Quantum", "Neuroscience", "Blockchain", "Spatial", "Biotech", "NovaIA"],
};

const ultraAdvancedAgents = [
  {
    id: "sentinel-zero",
    name: "Sentinel Zero",
    description: "Agent de cybersécurité offensive avec capacités de contre-attaque IA",
    category: "military",
    rating: 4.9,
    users: 250,
    price: 150,
    features: ["Contre-attaque IA", "OSINT avancé", "Honeypot intelligent", "Red Team simulation"],
    isPremium: true,
    eloRating: 2100,
    accuracy: "98%"
  },
  {
    id: "quantum-mind",
    name: "Quantum Mind",
    description: "Agent quantique pour résolution de problèmes complexes",
    category: "quantum",
    rating: 4.8,
    users: 180,
    price: 200,
    features: ["Calcul quantique", "Optimisation complexe", "Cryptographie quantique", "Simulation moléculaire"],
    isPremium: true,
    eloRating: 2050,
    accuracy: "96%"
  },
  {
    id: "neural-architect",
    name: "Neural Architect",
    description: "Agent de neuroscience pour modélisation cérébrale",
    category: "neuroscience",
    rating: 4.7,
    users: 120,
    price: 180,
    features: ["Modélisation cérébrale", "Analyse cognitive", "Prédiction comportementale", "Interface cerveau-machine"],
    isPremium: true,
    eloRating: 1980,
    accuracy: "94%"
  },
  {
    id: "blockchain-oracle",
    name: "Blockchain Oracle",
    description: "Agent DeFi pour trading et analyse blockchain",
    category: "blockchain",
    rating: 4.6,
    users: 890,
    price: 80,
    features: ["Trading DeFi", "Analyse blockchain", "Smart contracts", "Yield farming"],
    isPremium: true,
    eloRating: 1920,
    accuracy: "92%"
  },
  {
    id: "space-navigator",
    name: "Space Navigator",
    description: "Agent spatial pour navigation et analyse satellite",
    category: "space",
    rating: 4.5,
    users: 75,
    price: 300,
    features: ["Navigation spatiale", "Analyse satellite", "Prédiction orbital", "Communication interplanétaire"],
    isPremium: true,
    eloRating: 1950,
    accuracy: "95%"
  },
  {
    id: "bio-synthesizer",
    name: "Bio Synthesizer",
    description: "Agent biotech pour synthèse moléculaire et médecine",
    category: "biotech",
    rating: 4.4,
    users: 95,
    price: 250,
    features: ["Synthèse moléculaire", "Prédiction médicale", "Analyse génomique", "Développement de médicaments"],
    isPremium: true,
    eloRating: 1890,
    accuracy: "93%"
  }
];

export default function UltraAdvancedAgentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black">
      <section className="relative py-20 px-4 bg-gradient-to-r from-purple-900 via-red-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-6xl mb-6">🚀</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Agents IA Ultra-Avancés
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto">
              Découvrez nos agents IA de pointe avec capacités révolutionnaires
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ultraAdvancedAgents.map((agent) => (
              <Card key={agent.id} className="group hover:shadow-2xl hover:border-purple-400 transition-all cursor-pointer bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      ULTRA-ADVANCED
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-bold">{agent.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-white group-hover:text-purple-400 transition-colors text-xl">
                    {agent.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {agent.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-blue-400 mr-1" />
                      <span className="text-gray-300">{agent.users}</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-white font-bold">{agent.price}€</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 text-red-400 mr-1" />
                      <span className="text-white">ELO {agent.eloRating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-purple-400 text-purple-400">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      Précision {agent.accuracy}
                    </Badge>
                    <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                      Premium
                    </Badge>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700">
                    <Rocket className="mr-2 h-4 w-4" />
                    Accéder à l'Agent
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <Brain className="mr-3 h-6 w-6" />
                Retour à NovaIA
                <Zap className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
