'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Clock, 
  Activity, 
  Star,
  RefreshCw,
  Plus
} from 'lucide-react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  status: 'upcoming' | 'live' | 'finished';
  league: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  isLive: boolean;
}

export default function DLBookmaker() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockMatches: Match[] = [
        {
          id: '1',
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          time: '20:45',
          status: 'upcoming',
          league: 'Premier League',
          odds: { home: 2.50, draw: 3.20, away: 2.80 },
          isLive: false
        },
        {
          id: '2',
          homeTeam: 'Real Madrid',
          awayTeam: 'Barcelona',
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
          time: 'FT',
          status: 'finished',
          league: 'Champions League',
          odds: { home: 2.10, draw: 3.30, away: 3.40 },
          isLive: false
        }
      ];
      
      setMatches(mockMatches);
      setIsLoading(false);
    };

    loadMatches();
  }, []);

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
        {/* Grille de matchs */}
        <div className="space-y-4">
          {matches.map(match => (
            <Card key={match.id} className="bg-gray-800 border-gray-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      match.status === 'live' ? 'bg-red-500' : 
                      match.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-sm text-gray-400">
                      {match.status === 'live' ? 'EN DIRECT' : 
                       match.status === 'upcoming' ? 'À VENIR' : 'TERMINÉ'}
                    </span>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {match.league}
                    </Badge>
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
                  </div>
                  <div className="text-center flex items-center justify-center">
                    <span className="text-gray-400 text-sm">VS</span>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{match.awayTeam}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {(['home', 'draw', 'away'] as const).map((type) => {
                    const odds = match.odds[type];
                    const label = type === 'home' ? '1' : type === 'draw' ? 'X' : '2';
                    
                    return (
                      <button
                        key={type}
                        className="p-3 rounded-lg border-2 border-gray-600 hover:border-gray-500 bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
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

        {/* Section Statistiques */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold">47</h3>
              <p className="text-gray-400">Total paris</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold">68.2%</h3>
              <p className="text-gray-400">Taux de réussite</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardContent className="p-6 text-center">
              <Activity className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold">125K</h3>
              <p className="text-gray-400">Gains totaux FCFA</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold">2.85</h3>
              <p className="text-gray-400">Cote moyenne</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 