"use client";

import { novaAIServices, agentManager } from '@/lib/services/nova-ai-catalog';
import { useState, useEffect } from 'react';
import { Trophy, Zap, Target, Users, Star, TrendingUp, Clock, Award } from 'lucide-react';

interface BattleResult {
  winner: string;
  scores: { [key: string]: number };
  details: any;
  task: string;
  timestamp: Date;
}

export function AgentBattleSystem() {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [battleTask, setBattleTask] = useState('');
  const [isBattling, setIsBattling] = useState(false);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [rankings, setRankings] = useState<Array<{id: string, name: string, eloRating: number, battleScore: number}>>([]);
  const [battleHistory, setBattleHistory] = useState<BattleResult[]>([]);

  useEffect(() => {
    // Charger les classements
    setRankings(agentManager.getAgentRankings());
  }, []);

  const handleAgentSelect = (agentId: string) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else if (selectedAgents.length < 2) {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };

  const startBattle = async () => {
    if (selectedAgents.length !== 2 || !battleTask.trim()) {
      alert('Sélectionnez exactement 2 agents et définissez une tâche');
      return;
    }

    setIsBattling(true);
    setBattleResult(null);

    try {
      const result = await agentManager.battleAgents(selectedAgents[0], selectedAgents[1], battleTask);
      
      const battleResult: BattleResult = {
        ...result,
        task: battleTask,
        timestamp: new Date()
      };

      setBattleResult(battleResult);
      setBattleHistory(prev => [battleResult, ...prev.slice(0, 9)]); // Garder les 10 derniers

      // Mettre à jour les classements
      setRankings(agentManager.getAgentRankings());

    } catch (error) {
      console.error('Erreur lors du battle:', error);
      alert('Erreur lors du battle');
    } finally {
      setIsBattling(false);
    }
  };

  const getAgentById = (id: string) => {
    return novaAIServices.find(agent => agent.id === id);
  };

  const getEloColor = (rating: number) => {
    if (rating >= 1900) return 'text-yellow-400';
    if (rating >= 1800) return 'text-purple-400';
    if (rating >= 1700) return 'text-blue-400';
    return 'text-gray-400';
  };

  const getEloBadge = (rating: number) => {
    if (rating >= 1900) return '🏆 Grand Master';
    if (rating >= 1800) return '🥇 Master';
    if (rating >= 1700) return '🥈 Expert';
    return '🥉 Novice';
  };

  return (
    <div className="space-y-8">
      {/* Sélection des Agents */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Target className="mr-2" />
          Sélectionnez 2 Agents pour le Battle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {novaAIServices.map((agent) => (
            <div
              key={agent.id}
              onClick={() => handleAgentSelect(agent.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedAgents.includes(agent.id)
                  ? 'border-yellow-400 bg-yellow-400/20'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{agent.name}</h3>
                <div className={`text-sm font-bold ${getEloColor(agent.eloRating || 0)}`}>
                  {agent.eloRating}
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-2">{agent.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{getEloBadge(agent.eloRating || 0)}</span>
                <span>Battle: {agent.battleScore}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tâche de Battle */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">
            Définissez la tâche de battle :
          </label>
          <textarea
            value={battleTask}
            onChange={(e) => setBattleTask(e.target.value)}
            placeholder="Ex: Analysez les tendances du marché e-commerce et proposez des stratégies d'optimisation..."
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            rows={3}
          />
        </div>

        <button
          onClick={startBattle}
          disabled={selectedAgents.length !== 2 || !battleTask.trim() || isBattling}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isBattling ? (
            <>
              <Clock className="mr-2 animate-spin" />
              Battle en cours...
            </>
          ) : (
            <>
              <Zap className="mr-2" />
              Lancer le Battle
            </>
          )}
        </button>
      </div>

      {/* Résultat du Battle */}
      {battleResult && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Trophy className="mr-2 text-yellow-400" />
            Résultat du Battle
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {selectedAgents.map((agentId, index) => {
              const agent = getAgentById(agentId);
              const isWinner = battleResult.winner === agentId;
              const score = battleResult.scores[agentId];

              return (
                <div
                  key={agentId}
                  className={`p-6 rounded-xl border-2 ${
                    isWinner
                      ? 'border-yellow-400 bg-yellow-400/20'
                      : 'border-white/20 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">{agent?.name}</h3>
                    {isWinner && <Trophy className="text-yellow-400" />}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Score:</span>
                      <span className="font-bold text-white">{score}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">ELO Rating:</span>
                      <span className={`font-bold ${getEloColor(agent?.eloRating || 0)}`}>
                        {agent?.eloRating}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Précision:</span>
                      <span className="font-bold text-white">{agent?.accuracy}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-2">Tâche exécutée :</h4>
            <p className="text-gray-300">{battleResult.task}</p>
          </div>
        </div>
      )}

      {/* Classements ELO */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="mr-2" />
          Classements ELO
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-3 text-white">Rang</th>
                <th className="text-left p-3 text-white">Agent</th>
                <th className="text-left p-3 text-white">ELO Rating</th>
                <th className="text-left p-3 text-white">Battle Score</th>
                <th className="text-left p-3 text-white">Grade</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((agent, index) => (
                <tr key={agent.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-3 text-white font-bold">
                    #{index + 1}
                  </td>
                  <td className="p-3 text-white">
                    {getAgentById(agent.id)?.name}
                  </td>
                  <td className={`p-3 font-bold ${getEloColor(agent.eloRating)}`}>
                    {agent.eloRating}
                  </td>
                  <td className="p-3 text-white">
                    {agent.battleScore}
                  </td>
                  <td className="p-3 text-white">
                    {getEloBadge(agent.eloRating)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historique des Battles */}
      {battleHistory.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="mr-2" />
            Historique des Battles
          </h2>

          <div className="space-y-4">
            {battleHistory.map((battle, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">
                    Battle #{battleHistory.length - index}
                  </h4>
                  <span className="text-sm text-gray-400">
                    {battle.timestamp.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{battle.task}</p>
                <div className="flex items-center text-sm">
                  <span className="text-white">Vainqueur: </span>
                  <span className="text-yellow-400 font-semibold ml-1">
                    {getAgentById(battle.winner)?.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 