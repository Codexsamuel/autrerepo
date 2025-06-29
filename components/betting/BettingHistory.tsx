"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, TrendingUp, TrendingDown, DollarSign, Target, Filter, Download, BarChart3 } from 'lucide-react';

interface BetHistory {
  id: string;
  date: Date;
  match: string;
  teams: [string, string];
  selection: string;
  odds: number;
  stake: number;
  potentialWin: number;
  actualWin?: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  type: 'single' | 'combo' | 'live';
  sport: string;
  league: string;
  cashoutAmount?: number;
  cashoutTime?: Date;
}

interface BetStats {
  totalBets: number;
  totalStake: number;
  totalWinnings: number;
  winRate: number;
  averageOdds: number;
  bestWin: number;
  longestStreak: number;
  currentStreak: number;
}

export default function BettingHistory() {
  const [bets, setBets] = useState<BetHistory[]>([]);
  const [stats, setStats] = useState<BetStats>({
    totalBets: 0,
    totalStake: 0,
    totalWinnings: 0,
    winRate: 0,
    averageOdds: 0,
    bestWin: 0,
    longestStreak: 0,
    currentStreak: 0
  });
  const [filter, setFilter] = useState({
    status: 'all',
    sport: 'all',
    type: 'all',
    dateRange: '30days'
  });
  const [showStats, setShowStats] = useState(true);

  // Données de démonstration
  useEffect(() => {
    const demoBets: BetHistory[] = [
      {
        id: '1',
        date: new Date(Date.now() - 3600000),
        match: 'PSG vs Marseille',
        teams: ['PSG', 'Marseille'],
        selection: 'PSG victoire',
        odds: 1.85,
        stake: 50,
        potentialWin: 92.5,
        actualWin: 92.5,
        status: 'won',
        type: 'single',
        sport: 'Football',
        league: 'Ligue 1'
      },
      {
        id: '2',
        date: new Date(Date.now() - 7200000),
        match: 'Lakers vs Warriors',
        teams: ['Lakers', 'Warriors'],
        selection: 'Lakers -5.5',
        odds: 1.95,
        stake: 100,
        potentialWin: 195,
        status: 'lost',
        type: 'single',
        sport: 'Basketball',
        league: 'NBA'
      },
      {
        id: '3',
        date: new Date(Date.now() - 10800000),
        match: 'Djokovic vs Nadal',
        teams: ['Djokovic', 'Nadal'],
        selection: 'Djokovic en 3 sets',
        odds: 2.15,
        stake: 75,
        potentialWin: 161.25,
        actualWin: 161.25,
        status: 'won',
        type: 'single',
        sport: 'Tennis',
        league: 'Grand Slam'
      },
      {
        id: '4',
        date: new Date(Date.now() - 14400000),
        match: 'Combiné 3 matchs',
        teams: ['Multiple', 'Multiple'],
        selection: 'Combiné gagnant',
        odds: 4.50,
        stake: 25,
        potentialWin: 112.5,
        actualWin: 112.5,
        status: 'won',
        type: 'combo',
        sport: 'Multiple',
        league: 'Multiple'
      },
      {
        id: '5',
        date: new Date(Date.now() - 18000000),
        match: 'Real Madrid vs Barcelona',
        teams: ['Real Madrid', 'Barcelona'],
        selection: 'Plus de 2.5 buts',
        odds: 1.75,
        stake: 60,
        potentialWin: 105,
        cashoutAmount: 45,
        cashoutTime: new Date(Date.now() - 9000000),
        status: 'cancelled',
        type: 'live',
        sport: 'Football',
        league: 'La Liga'
      }
    ];

    setBets(demoBets);

    // Calculer les statistiques
    const wonBets = demoBets.filter(bet => bet.status === 'won');
    const totalStake = demoBets.reduce((sum, bet) => sum + bet.stake, 0);
    const totalWinnings = demoBets.reduce((sum, bet) => {
      if (bet.status === 'won') return sum + (bet.actualWin || 0);
      if (bet.status === 'cancelled' && bet.cashoutAmount) return sum + bet.cashoutAmount;
      return sum;
    }, 0);

    setStats({
      totalBets: demoBets.length,
      totalStake,
      totalWinnings,
      winRate: (wonBets.length / demoBets.length) * 100,
      averageOdds: demoBets.reduce((sum, bet) => sum + bet.odds, 0) / demoBets.length,
      bestWin: Math.max(...demoBets.map(bet => bet.actualWin || 0)),
      longestStreak: 3,
      currentStreak: 2
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800 border-green-200';
      case 'lost': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won': return <TrendingUp className="h-4 w-4" />;
      case 'lost': return <TrendingDown className="h-4 w-4" />;
      case 'pending': return <Target className="h-4 w-4" />;
      case 'cancelled': return <DollarSign className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const filteredBets = bets.filter(bet => {
    if (filter.status !== 'all' && bet.status !== filter.status) return false;
    if (filter.sport !== 'all' && bet.sport !== filter.sport) return false;
    if (filter.type !== 'all' && bet.type !== filter.type) return false;
    return true;
  });

  const exportHistory = () => {
    const csvContent = [
      ['Date', 'Match', 'Sélection', 'Cote', 'Mise', 'Gain potentiel', 'Statut', 'Sport'],
      ...filteredBets.map(bet => [
        bet.date.toLocaleDateString('fr-FR'),
        bet.match,
        bet.selection,
        bet.odds.toString(),
        bet.stake.toString(),
        bet.potentialWin.toString(),
        bet.status,
        bet.sport
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historique-paris.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-800">{stats.totalBets}</div>
                  <div className="text-sm text-blue-600">Total paris</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-800">{stats.winRate.toFixed(1)}%</div>
                  <div className="text-sm text-green-600">Taux de réussite</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-800">+{stats.totalWinnings.toFixed(2)}€</div>
                  <div className="text-sm text-purple-600">Gains totaux</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold text-yellow-800">{stats.averageOdds.toFixed(2)}</div>
                  <div className="text-sm text-yellow-600">Cote moyenne</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filtres */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Historique des paris
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowStats(!showStats)}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                {showStats ? 'Masquer stats' : 'Afficher stats'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportHistory}
              >
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <Select value={filter.status} onValueChange={(value) => setFilter(prev => ({ ...prev, status: value }))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="won">Gagnés</SelectItem>
                <SelectItem value="lost">Perdus</SelectItem>
                <SelectItem value="pending">En cours</SelectItem>
                <SelectItem value="cancelled">Annulés</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filter.sport} onValueChange={(value) => setFilter(prev => ({ ...prev, sport: value }))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les sports</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filter.type} onValueChange={(value) => setFilter(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="single">Paris simples</SelectItem>
                <SelectItem value="combo">Paris combinés</SelectItem>
                <SelectItem value="live">Paris en direct</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filter.dateRange} onValueChange={(value) => setFilter(prev => ({ ...prev, dateRange: value }))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 derniers jours</SelectItem>
                <SelectItem value="30days">30 derniers jours</SelectItem>
                <SelectItem value="90days">90 derniers jours</SelectItem>
                <SelectItem value="all">Tout l'historique</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Liste des paris */}
          <div className="space-y-3">
            {filteredBets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun pari trouvé</p>
              </div>
            ) : (
              filteredBets.map((bet) => (
                <div key={bet.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(bet.status)}
                        <Badge variant="outline" className={getStatusColor(bet.status)}>
                          {bet.status === 'won' ? 'Gagné' : 
                           bet.status === 'lost' ? 'Perdu' : 
                           bet.status === 'pending' ? 'En cours' : 'Annulé'}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {bet.date.toLocaleDateString('fr-FR')} à {bet.date.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {bet.type === 'single' ? 'Simple' : bet.type === 'combo' ? 'Combiné' : 'Live'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {bet.sport}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{bet.match}</h4>
                      <p className="text-sm text-gray-600">{bet.selection}</p>
                      <p className="text-xs text-gray-500">{bet.league}</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{bet.odds}</div>
                      <div className="text-sm text-gray-600">Cote</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">{bet.stake}€</div>
                      <div className="text-sm text-gray-600">Mise</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        Gain potentiel: <span className="font-semibold">{bet.potentialWin}€</span>
                      </span>
                      {bet.actualWin && (
                        <span className="text-green-600 font-semibold">
                          Gain réel: {bet.actualWin}€
                        </span>
                      )}
                      {bet.cashoutAmount && (
                        <span className="text-orange-600 font-semibold">
                          Cashout: {bet.cashoutAmount}€
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {bet.status === 'pending' && (
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                          Cashout
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        Détails
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 