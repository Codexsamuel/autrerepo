'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  TrendingUp, 
  Clock, 
  Users, 
  Target, 
  Zap, 
  Star,
  Play,
  Pause,
  DollarSign,
  TrendingDown,
  Calendar,
  MapPin,
  Activity,
  BarChart3,
  Award,
  Gift,
  Shield,
  RefreshCw,
  Plus,
  Minus
} from 'lucide-react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  time: string;
  status: 'upcoming' | 'live' | 'finished';
  league: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  boost?: number;
  isLive: boolean;
}

interface Bet {
  id: string;
  matchId: string;
  type: 'home' | 'draw' | 'away';
  amount: number;
  odds: number;
  potentialWin: number;
  status: 'pending' | 'won' | 'lost';
  timestamp: Date;
}

export default function DLBookmakerPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [userBets, setUserBets] = useState<Bet[]>([]);
  const [selectedMatches, setSelectedMatches] = useState<string[]>([]);
  const [betAmount, setBetAmount] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBets: 0,
    successRate: 0,
    totalWinnings: 0,
    averageOdds: 0
  });

  // Simuler le chargement des données
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Données simulées de matchs
      const mockMatches: Match[] = [
        {
          id: '1',
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          time: '20:45',
          status: 'upcoming',
          league: 'Premier League',
          odds: { home: 2.50, draw: 3.20, away: 2.80 },
          boost: 1.5,
          isLive: false
        },
        {
          id: '2',
          homeTeam: 'Real Madrid',
          awayTeam: 'Barcelona',
          homeScore: 1,
          awayScore: 0,
          time: '75\'',
          status: 'live',
          league: 'La Liga',
          odds: { home: 1.80, draw: 3.50, away: 4.20 },
          isLive: true
        },
        {
          id: '3',
          homeTeam: 'PSG',
          awayTeam: 'Bayern Munich',
          homeScore: 2,
          awayScore: 2,
          time: 'FT',
          status: 'finished',
          league: 'Champions League',
          odds: { home: 2.10, draw: 3.30, away: 3.40 },
          isLive: false
        },
        {
          id: '4',
          homeTeam: 'Arsenal',
          awayTeam: 'Chelsea',
          time: '22:00',
          status: 'upcoming',
          league: 'Premier League',
          odds: { home: 2.20, draw: 3.10, away: 3.30 },
          boost: 2.0,
          isLive: false
        },
        {
          id: '5',
          homeTeam: 'Juventus',
          awayTeam: 'AC Milan',
          time: '21:00',
          status: 'upcoming',
          league: 'Serie A',
          odds: { home: 2.40, draw: 3.00, away: 3.10 },
          isLive: false
        }
      ];

      setMatches(mockMatches);
      
      // Statistiques simulées
      setStats({
        totalBets: 47,
        successRate: 68.2,
        totalWinnings: 125000,
        averageOdds: 2.85
      });
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleBetSelection = (matchId: string, type: 'home' | 'draw' | 'away') => {
    if (selectedMatches.includes(`${matchId}-${type}`)) {
      setSelectedMatches(prev => prev.filter(id => id !== `${matchId}-${type}`));
    } else {
      setSelectedMatches(prev => [...prev, `${matchId}-${type}`]);
    }
  };

  const calculatePotentialWin = () => {
    if (selectedMatches.length === 0) return 0;
    
    let totalOdds = 1;
    selectedMatches.forEach(selection => {
      const [matchId, type] = selection.split('-');
      const match = matches.find(m => m.id === matchId);
      if (match) {
        const odds = match.odds[type as keyof typeof match.odds];
        totalOdds *= odds;
      }
    });
    
    return betAmount * totalOdds;
  };

  const placeBet = () => {
    if (selectedMatches.length === 0) return;
    
    const newBets: Bet[] = selectedMatches.map(selection => {
      const [matchId, type] = selection.split('-');
      const match = matches.find(m => m.id === matchId);
      const odds = match?.odds[type as keyof typeof match.odds] || 1;
      
      return {
        id: Date.now().toString(),
        matchId,
        type: type as 'home' | 'draw' | 'away',
        amount: betAmount / selectedMatches.length,
        odds,
        potentialWin: (betAmount / selectedMatches.length) * odds,
        status: 'pending',
        timestamp: new Date()
      };
    });
    
    setUserBets(prev => [...prev, ...newBets]);
    setSelectedMatches([]);
    setBetAmount(1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'upcoming': return 'bg-blue-500';
      case 'finished': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'EN DIRECT';
      case 'upcoming': return 'À VENIR';
      case 'finished': return 'TERMINÉ';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-xl text-white font-semibold">Chargement des matchs...</h2>
          <p className="text-gray-300">Récupération des cotes en temps réel</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-black bg-opacity-50 border-b border-gray-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <Trophy className="w-8 h-8 mr-3 text-yellow-400" />
                DL Bookmaker
              </h1>
              <p className="text-gray-300 mt-2">Paris sportifs premium avec cotes exclusives</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-600 text-white">
                <Activity className="w-4 h-4 mr-2" />
                {matches.filter(m => m.isLive).length} en direct
              </Badge>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Gauche - Statistiques */}
          <div className="lg:col-span-1 space-y-6">
            {/* Statistiques Utilisateur */}
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                  Mes Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total paris</span>
                  <span className="font-semibold text-white">{stats.totalBets}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Taux de réussite</span>
                  <span className="font-semibold text-green-400">{stats.successRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Gains totaux</span>
                  <span className="font-semibold text-green-400">+{stats.totalWinnings.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Cote moyenne</span>
                  <span className="font-semibold text-white">{stats.averageOdds}</span>
                </div>
              </CardContent>
            </Card>

            {/* Boosts Disponibles */}
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Boosts Actifs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {matches.filter(m => m.boost).map(match => (
                  <div key={match.id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <div className="text-sm">
                      <p className="font-medium">{match.homeTeam} vs {match.awayTeam}</p>
                      <p className="text-gray-400 text-xs">{match.league}</p>
                    </div>
                    <Badge className="bg-yellow-600 text-black font-bold">
                      x{match.boost}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Missions Quotidiennes */}
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-400" />
                  Missions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-2 bg-gray-700 rounded">
                  <p className="text-sm font-medium">5 paris gagnants</p>
                  <p className="text-gray-400 text-xs">Récompense: 5000 FCFA</p>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="p-2 bg-gray-700 rounded">
                  <p className="text-sm font-medium">Pariez sur 3 ligues</p>
                  <p className="text-gray-400 text-xs">Récompense: 3000 FCFA</p>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu Principal - Matchs */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="matches" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
                <TabsTrigger value="matches" className="text-white data-[state=active]:bg-blue-600">
                  Matchs
                </TabsTrigger>
                <TabsTrigger value="live" className="text-white data-[state=active]:bg-red-600">
                  En Direct
                </TabsTrigger>
                <TabsTrigger value="bets" className="text-white data-[state=active]:bg-green-600">
                  Mes Paris
                </TabsTrigger>
                <TabsTrigger value="history" className="text-white data-[state=active]:bg-gray-600">
                  Historique
                </TabsTrigger>
              </TabsList>

              {/* Onglet Matchs */}
              <TabsContent value="matches" className="mt-6">
                <div className="space-y-4">
                  {matches.map(match => (
                    <Card key={match.id} className="bg-gray-800 border-gray-700 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(match.status)}`}></div>
                            <span className="text-sm text-gray-400">{getStatusText(match.status)}</span>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {match.league}
                            </Badge>
                            {match.boost && (
                              <Badge className="bg-yellow-600 text-black font-bold">
                                BOOST x{match.boost}
                              </Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">{match.time}</p>
                            {match.isLive && (
                              <p className="text-xs text-red-400 font-medium">EN DIRECT</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <h3 className="font-semibold text-lg">{match.homeTeam}</h3>
                            {match.homeScore !== undefined && (
                              <p className="text-2xl font-bold text-blue-400">{match.homeScore}</p>
                            )}
                          </div>
                          <div className="text-center flex items-center justify-center">
                            <span className="text-gray-400 text-sm">VS</span>
                          </div>
                          <div className="text-center">
                            <h3 className="font-semibold text-lg">{match.awayTeam}</h3>
                            {match.awayScore !== undefined && (
                              <p className="text-2xl font-bold text-blue-400">{match.awayScore}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          {(['home', 'draw', 'away'] as const).map((type) => {
                            const isSelected = selectedMatches.includes(`${match.id}-${type}`);
                            const odds = match.odds[type];
                            const label = type === 'home' ? '1' : type === 'draw' ? 'X' : '2';
                            
                            return (
                              <button
                                key={type}
                                onClick={() => handleBetSelection(match.id, type)}
                                className={`p-3 rounded-lg border-2 transition-all ${
                                  isSelected
                                    ? 'border-blue-500 bg-blue-600 text-white'
                                    : 'border-gray-600 hover:border-gray-500 bg-gray-700 text-gray-300'
                                }`}
                              >
                                <div className="text-center">
                                  <p className="text-sm font-medium">{label}</p>
                                  <p className="text-lg font-bold">{odds}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Onglet En Direct */}
              <TabsContent value="live" className="mt-6">
                <div className="space-y-4">
                  {matches.filter(m => m.isLive).map(match => (
                    <Card key={match.id} className="bg-red-900 border-red-700 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-sm text-red-200">EN DIRECT</span>
                            <Badge className="bg-red-600 text-white">
                              {match.time}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <h3 className="font-semibold text-lg">{match.homeTeam}</h3>
                            <p className="text-3xl font-bold text-white">{match.homeScore}</p>
                          </div>
                          <div className="text-center flex items-center justify-center">
                            <span className="text-red-200 text-lg font-bold">-</span>
                          </div>
                          <div className="text-center">
                            <h3 className="font-semibold text-lg">{match.awayTeam}</h3>
                            <p className="text-3xl font-bold text-white">{match.awayScore}</p>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-red-200 text-sm">Match en cours - Cotes mises à jour en temps réel</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {matches.filter(m => m.isLive).length === 0 && (
                    <Card className="bg-gray-800 border-gray-700 text-white">
                      <CardContent className="p-8 text-center">
                        <Clock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Aucun match en direct</h3>
                        <p className="text-gray-400">Revenez plus tard pour des matchs en direct</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Onglet Mes Paris */}
              <TabsContent value="bets" className="mt-6">
                <div className="space-y-4">
                  {userBets.length === 0 ? (
                    <Card className="bg-gray-800 border-gray-700 text-white">
                      <CardContent className="p-8 text-center">
                        <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Aucun pari actif</h3>
                        <p className="text-gray-400">Commencez à parier sur les matchs disponibles</p>
                      </CardContent>
                    </Card>
                  ) : (
                    userBets.map(bet => {
                      const match = matches.find(m => m.id === bet.matchId);
                      return (
                        <Card key={bet.id} className="bg-gray-800 border-gray-700 text-white">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{match?.homeTeam} vs {match?.awayTeam}</p>
                                <p className="text-sm text-gray-400">
                                  Pari: {bet.type === 'home' ? '1' : bet.type === 'draw' ? 'X' : '2'} 
                                  @ {bet.odds} | {bet.amount.toLocaleString()} FCFA
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-green-400">
                                  +{bet.potentialWin.toLocaleString()} FCFA
                                </p>
                                <Badge 
                                  className={`${
                                    bet.status === 'won' ? 'bg-green-600' : 
                                    bet.status === 'lost' ? 'bg-red-600' : 'bg-yellow-600'
                                  }`}
                                >
                                  {bet.status === 'won' ? 'GAGNÉ' : 
                                   bet.status === 'lost' ? 'PERDU' : 'EN COURS'}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </TabsContent>

              {/* Onglet Historique */}
              <TabsContent value="history" className="mt-6">
                <Card className="bg-gray-800 border-gray-700 text-white">
                  <CardContent className="p-8 text-center">
                    <BarChart3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Historique des paris</h3>
                    <p className="text-gray-400">Consultez vos performances passées et analyses</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Zone de Paris Combiné */}
        {selectedMatches.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-white text-sm">Paris sélectionnés: {selectedMatches.length}</p>
                    <p className="text-gray-400 text-xs">Gain potentiel: {calculatePotentialWin().toLocaleString()} FCFA</p>
                  </div>
                  <Input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    placeholder="Montant du pari"
                    className="w-32 bg-gray-800 border-gray-600 text-white"
                  />
                  <span className="text-gray-400">FCFA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedMatches([])}
                    className="border-gray-600 text-white hover:bg-gray-700"
                  >
                    Annuler
                  </Button>
                  <Button 
                    onClick={placeBet}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Placer le pari
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 