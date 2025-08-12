"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NOVA_AI_SERVICES, NovaAIService } from "@/lib/services/nova-ai-catalog";
import { ArrowLeft, Brain, Clock, Crown, Flame, Shield, Star, Sword, Target, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";



interface BattleResult {
  id: string;
  agent1: string;
  agent2: string;
  winner: string;
  score1: number;
  score2: number;
  task: string;
  timestamp: Date;
  duration: number;
  eloChange: number;
}

const battleTasks = [
  "Analyse de sentiment sur 1000 tweets",
  "Génération d'image haute résolution",
  "Traduction multilingue de documents",
  "Optimisation de code Python",
  "Prédiction de tendances boursières",
  "Création de contenu marketing",
  "Analyse de données médicales",
  "Génération de musique originale"
];

export default function BattlePage() {
  const [selectedAgent1, setSelectedAgent1] = useState<string>("");
  const [selectedAgent2, setSelectedAgent2] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [battleInProgress, setBattleInProgress] = useState(false);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [leaderboard, setLeaderboard] = useState<NovaAIService[]>([]);
  const [recentBattles, setRecentBattles] = useState<BattleResult[]>([]);

  useEffect(() => {
    // Initialiser le leaderboard
    const sortedAgents = [...NOVA_AI_SERVICES].sort((a, b) => (b.eloRating || 0) - (a.eloRating || 0));
    setLeaderboard(sortedAgents);

    // Simuler des batailles récentes
    const mockBattles: BattleResult[] = [
      {
        id: "1",
        agent1: "Sentinel Zero",
        agent2: "Quantum Mind",
        winner: "Sentinel Zero",
        score1: 95,
        score2: 87,
        task: "Analyse de sécurité réseau",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
        duration: 45,
        eloChange: 12
      },
      {
        id: "2",
        agent1: "Neural Architect",
        agent2: "Blockchain Oracle",
        winner: "Neural Architect",
        score1: 92,
        score2: 89,
        task: "Optimisation de smart contracts",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1h ago
        duration: 38,
        eloChange: 8
      }
    ];
    setRecentBattles(mockBattles);
  }, []);

  const startBattle = async () => {
    if (!selectedAgent1 || !selectedAgent2 || !selectedTask) return;

    setBattleInProgress(true);
    
    // Simuler le combat
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const agent1 = NOVA_AI_SERVICES.find(a => a.id === selectedAgent1);
    const agent2 = NOVA_AI_SERVICES.find(a => a.id === selectedAgent2);
    
    if (!agent1 || !agent2) return;

    // Logique de combat basée sur ELO et caractéristiques
    const baseScore1 = (agent1.eloRating || 1500) + (agent1.accuracy || 0);
    const baseScore2 = (agent2.eloRating || 1500) + (agent2.accuracy || 0);
    
    const randomFactor = Math.random() * 0.4 - 0.2; // ±20% de random
    const finalScore1 = baseScore1 * (1 + randomFactor);
    const finalScore2 = baseScore2 * (1 - randomFactor);
    
    const winner = finalScore1 > finalScore2 ? agent1.name : agent2.name;
    const score1 = Math.round(finalScore1);
    const score2 = Math.round(finalScore2);
    
    const result: BattleResult = {
      id: Date.now().toString(),
      agent1: agent1.name,
      agent2: agent2.name,
      winner,
      score1,
      score2,
      task: selectedTask,
      timestamp: new Date(),
      duration: Math.floor(Math.random() * 60) + 30,
      eloChange: Math.abs(Math.floor((score1 - score2) / 10))
    };
    
    setBattleResult(result);
    setBattleInProgress(false);
    
    // Mettre à jour le leaderboard
    const updatedAgents = [...NOVA_AI_SERVICES];
    if (winner === agent1.name) {
      agent1.eloRating = (agent1.eloRating || 1500) + result.eloChange;
      agent2.eloRating = Math.max(100, (agent2.eloRating || 1500) - result.eloChange);
    } else {
      agent2.eloRating = (agent2.eloRating || 1500) + result.eloChange;
      agent1.eloRating = Math.max(100, (agent1.eloRating || 1500) - result.eloChange);
    }
    
    const newLeaderboard = [...updatedAgents].sort((a, b) => (b.eloRating || 0) - (a.eloRating || 0));
    setLeaderboard(newLeaderboard);
    
    // Ajouter à l'historique
    setRecentBattles(prev => [result, ...prev.slice(0, 9)]);
  };

  const getEloColor = (elo: number) => {
    if (elo >= 2000) return "text-yellow-400";
    if (elo >= 1800) return "text-purple-400";
    if (elo >= 1600) return "text-blue-400";
    if (elo >= 1400) return "text-green-400";
    return "text-gray-400";
  };

  const getEloBadge = (elo: number) => {
    if (elo >= 2000) return <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30"><Crown className="w-3 h-3 mr-1" />Légende</Badge>;
    if (elo >= 1800) return <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30"><Trophy className="w-3 h-3 mr-1" />Maître</Badge>;
    if (elo >= 1600) return <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30"><Star className="w-3 h-3 mr-1" />Expert</Badge>;
    if (elo >= 1400) return <Badge className="bg-green-600/20 text-green-300 border-green-500/30"><Target className="w-3 h-3 mr-1" />Avancé</Badge>;
    return <Badge className="bg-gray-600/20 text-gray-300 border-gray-500/30"><Users className="w-3 h-3 mr-1" />Débutant</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/nova-ia" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à NovaIA
          </Link>
          
          <div className="text-center">
            <div className="text-6xl mb-4">⚔️</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              NovaIA Battle System
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Défiez vos agents IA dans des combats épiques et montez dans le classement ELO
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mt-6"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Zone de combat */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-2">
                  <Sword className="w-6 h-6" />
                  Arène de Combat
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Sélectionnez deux agents et une tâche pour commencer le combat
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Sélection des agents */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white font-semibold mb-2 block">Agent 1</label>
                    <Select value={selectedAgent1} onValueChange={setSelectedAgent1}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Choisir un agent" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {NOVA_AI_SERVICES.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id} className="text-white">
                            {agent.name} (ELO: {agent.eloRating || 1500})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-white font-semibold mb-2 block">Agent 2</label>
                    <Select value={selectedAgent2} onValueChange={setSelectedAgent2}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Choisir un agent" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {NOVA_AI_SERVICES.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id} className="text-white">
                            {agent.name} (ELO: {agent.eloRating || 1500})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sélection de la tâche */}
                <div>
                  <label className="text-white font-semibold mb-2 block">Tâche de Combat</label>
                  <Select value={selectedTask} onValueChange={setSelectedTask}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Choisir une tâche" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {battleTasks.map((task, index) => (
                        <SelectItem key={index} value={task} className="text-white">
                          {task}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Bouton de combat */}
                <Button 
                  onClick={startBattle}
                  disabled={!selectedAgent1 || !selectedAgent2 || !selectedTask || battleInProgress}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 h-12 text-lg"
                >
                  {battleInProgress ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Combat en cours...
                    </>
                  ) : (
                    <>
                      <Flame className="w-5 h-5 mr-2" />
                      Lancer le Combat !
                    </>
                  )}
                </Button>

                {/* Résultat du combat */}
                {battleResult && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">🏆 Résultat du Combat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{battleResult.agent1}</div>
                        <div className="text-3xl font-bold text-white">{battleResult.score1}</div>
                        <div className="text-gray-400 text-sm">points</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-4xl">⚔️</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">{battleResult.agent2}</div>
                        <div className="text-3xl font-bold text-white">{battleResult.score2}</div>
                        <div className="text-gray-400 text-sm">points</div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="text-xl font-bold text-yellow-400 mb-2">
                        🎉 Vainqueur: {battleResult.winner}
                      </div>
                      <div className="text-gray-300">
                        Tâche: {battleResult.task} | Durée: {battleResult.duration}s | 
                        Changement ELO: +{battleResult.eloChange}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Leaderboard et Batailles récentes */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Classement ELO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.slice(0, 10).map((agent, index) => (
                    <div key={agent.id} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-blue-600 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{agent.name}</div>
                          <div className={`text-xs ${getEloColor(agent.eloRating || 1500)}`}>
                            ELO: {agent.eloRating || 1500}
                          </div>
                        </div>
                      </div>
                      {getEloBadge(agent.eloRating || 1500)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Batailles récentes */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Batailles Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBattles.map((battle) => (
                    <div key={battle.id} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-semibold text-sm">{battle.winner}</div>
                        <Badge variant="secondary" className="bg-green-600/20 text-green-300 text-xs">
                          Vainqueur
                        </Badge>
                      </div>
                      <div className="text-gray-400 text-xs">
                        {battle.agent1} vs {battle.agent2}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {battle.timestamp.toLocaleTimeString()} | +{battle.eloChange} ELO
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm border-red-500/30">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Prêt à dominer l'arène ?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Montez dans le classement ELO et prouvez que vos agents sont les meilleurs !
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/nova-ia/novacore">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Shield className="w-5 h-5 mr-2" />
                    Gérer via NovaCore
                  </Button>
                </Link>
                <Link href="/nova-ia">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Brain className="w-5 h-5 mr-2" />
                    Explorer NovaIA
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