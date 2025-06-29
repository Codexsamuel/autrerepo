"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Minus, Zap, Target, Coins, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useBookmakerData } from '@/hooks/useBookmakerData';

interface BetSlip {
  id: string;
  matchId: string;
  teams: [string, string];
  selection: string;
  odds: number;
  stake: number;
  potentialWin: number;
}

export default function NouveauPariPage() {
  const { data, liveMatches, boosts } = useBookmakerData({ autoRefresh: true, refreshInterval: 15000 });
  const [betSlip, setBetSlip] = useState<BetSlip[]>([]);
  const [totalStake, setTotalStake] = useState(0);
  const [totalPotentialWin, setTotalPotentialWin] = useState(0);
  const [combinedOdds, setCombinedOdds] = useState(1);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [showBetSlip, setShowBetSlip] = useState(false);

  // Calculer les totaux quand le bet slip change
  useEffect(() => {
    if (betSlip.length === 0) {
      setTotalStake(0);
      setTotalPotentialWin(0);
      setCombinedOdds(1);
      return;
    }

    const total = betSlip.reduce((acc, bet) => acc + bet.stake, 0);
    const combined = betSlip.reduce((acc, bet) => acc * bet.odds, 1);
    const potential = total * combined;

    setTotalStake(total);
    setCombinedOdds(combined);
    setTotalPotentialWin(potential);
  }, [betSlip]);

  const addToBetSlip = (match: any, selection: string, odds: number) => {
    const existingIndex = betSlip.findIndex(bet => bet.matchId === match.id);
    
    if (existingIndex >= 0) {
      // Mettre à jour le pari existant
      const updatedBetSlip = [...betSlip];
      updatedBetSlip[existingIndex] = {
        ...updatedBetSlip[existingIndex],
        selection,
        odds
      };
      setBetSlip(updatedBetSlip);
    } else {
      // Ajouter un nouveau pari
      const newBet: BetSlip = {
        id: `${match.id}-${selection}`,
        matchId: match.id,
        teams: match.teams,
        selection,
        odds,
        stake: 0,
        potentialWin: 0
      };
      setBetSlip([...betSlip, newBet]);
    }
    setShowBetSlip(true);
  };

  const removeFromBetSlip = (betId: string) => {
    setBetSlip(betSlip.filter(bet => bet.id !== betId));
  };

  const updateStake = (betId: string, stake: number) => {
    setBetSlip(betSlip.map(bet => 
      bet.id === betId 
        ? { ...bet, stake, potentialWin: stake * bet.odds }
        : bet
    ));
  };

  const placeBet = () => {
    if (totalStake <= 0) return;
    
    // Simulation de placement de pari
    alert(`Pari placé ! Mise: ${totalStake}€, Gain potentiel: ${totalPotentialWin.toFixed(2)}€`);
    setBetSlip([]);
    setShowBetSlip(false);
  };

  const matches = data?.matches || [];
  const live = liveMatches || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/novacore/dl-bookmaker">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouveau Pari</h1>
            <p className="text-gray-600">Placez vos paris en direct avec cashout</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            LIVE
          </Badge>
          <span className="text-sm text-gray-500">
            {live.length} matchs en direct
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des matchs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Matchs en direct */}
          {live.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-lg font-bold text-red-800">MATCHS EN DIRECT</h2>
              </div>
              <div className="space-y-3">
                {live.slice(0, 5).map((match: any) => (
                  <Card key={match.id} className="border-red-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            {match.minute}' LIVE
                          </Badge>
                          <span className="text-sm text-gray-600">{match.sport} • {match.league}</span>
                        </div>
                        {match.score && (
                          <div className="text-lg font-bold text-red-600">
                            {match.score[0]} - {match.score[1]}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2 flex-1">
                          <img src={match.logo1} alt={match.teams[0]} className="w-8 h-8 rounded-full" />
                          <span className="font-medium">{match.teams[0]}</span>
                        </div>
                        <span className="text-gray-400 font-bold">VS</span>
                        <div className="flex items-center gap-2 flex-1 justify-end">
                          <span className="font-medium">{match.teams[1]}</span>
                          <img src={match.logo2} alt={match.teams[1]} className="w-8 h-8 rounded-full" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => addToBetSlip(match, match.teams[0], match.liveOdds?.home || match.odds.home)}
                        >
                          <div className="text-center">
                            <div className="font-bold">{match.liveOdds?.home || match.odds.home}</div>
                            <div className="text-xs">1</div>
                          </div>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => addToBetSlip(match, 'Match nul', match.liveOdds?.draw || match.odds.draw)}
                        >
                          <div className="text-center">
                            <div className="font-bold">{match.liveOdds?.draw || match.odds.draw}</div>
                            <div className="text-xs">X</div>
                          </div>
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => addToBetSlip(match, match.teams[1], match.liveOdds?.away || match.odds.away)}
                        >
                          <div className="text-center">
                            <div className="font-bold">{match.liveOdds?.away || match.odds.away}</div>
                            <div className="text-xs">2</div>
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Tous les matchs */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Tous les matchs</h2>
            <div className="space-y-3">
              {matches.slice(0, 10).map((match: any) => (
                <Card key={match.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{match.sport} • {match.league}</span>
                        <Badge variant={match.status === 'en cours' ? 'destructive' : 'secondary'}>
                          {match.status === 'en cours' ? 'LIVE' : match.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {match.date} à {match.time}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 flex-1">
                        <img src={match.logo1} alt={match.teams[0]} className="w-8 h-8 rounded-full" />
                        <span className="font-medium">{match.teams[0]}</span>
                      </div>
                      <span className="text-gray-400 font-bold">VS</span>
                      <div className="flex items-center gap-2 flex-1 justify-end">
                        <span className="font-medium">{match.teams[1]}</span>
                        <img src={match.logo2} alt={match.teams[1]} className="w-8 h-8 rounded-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => addToBetSlip(match, match.teams[0], match.odds.home)}
                      >
                        <div className="text-center">
                          <div className="font-bold">{match.odds.home}</div>
                          <div className="text-xs">1</div>
                        </div>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addToBetSlip(match, 'Match nul', match.odds.draw)}
                      >
                        <div className="text-center">
                          <div className="font-bold">{match.odds.draw}</div>
                          <div className="text-xs">X</div>
                        </div>
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => addToBetSlip(match, match.teams[1], match.odds.away)}
                      >
                        <div className="text-center">
                          <div className="font-bold">{match.odds.away}</div>
                          <div className="text-xs">2</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bet Slip */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Mon Pari
                {betSlip.length > 0 && (
                  <Badge variant="secondary">{betSlip.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {betSlip.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Sélectionnez vos paris</p>
                  <p className="text-sm">Cliquez sur les cotes pour ajouter</p>
                </div>
              ) : (
                <>
                  {/* Paris sélectionnés */}
                  <div className="space-y-3">
                    {betSlip.map((bet) => (
                      <div key={bet.id} className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{bet.teams[0]} vs {bet.teams[1]}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromBetSlip(bet.id)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">{bet.selection}</span>
                          <span className="text-sm font-bold text-green-600">@{bet.odds}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Mise"
                            value={bet.stake || ''}
                            onChange={(e) => updateStake(bet.id, parseFloat(e.target.value) || 0)}
                            className="text-sm"
                          />
                          <span className="text-xs text-gray-500">€</span>
                        </div>
                        {bet.stake > 0 && (
                          <div className="text-xs text-green-600 mt-1">
                            Gain: {(bet.stake * bet.odds).toFixed(2)}€
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Totaux */}
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cote combinée:</span>
                      <span className="font-bold text-blue-600">{combinedOdds.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mise totale:</span>
                      <span className="font-bold">{totalStake.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Gain potentiel:</span>
                      <span className="text-green-600">{totalPotentialWin.toFixed(2)}€</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={placeBet}
                      disabled={totalStake <= 0}
                    >
                      <Coins className="h-4 w-4 mr-2" />
                      Placer le pari
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setBetSlip([])}
                    >
                      Vider le slip
                    </Button>
                  </div>

                  {/* Avertissement */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-xs text-yellow-800">
                        <p className="font-medium">Pari responsable</p>
                        <p>Ne pariez que ce que vous pouvez vous permettre de perdre.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 