"use client";

import SEOOptimized from '@/components/SEOOptimized';
import BettingHistory from '@/components/betting/BettingHistory';
import LiveChat from '@/components/chat/LiveChat';
import PushNotifications from '@/components/notifications/PushNotifications';
import ReferralSystem from '@/components/referral/ReferralSystem';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBookmakerData } from '@/hooks/useBookmakerData';
import { Activity, Gift, Play, RefreshCw, Target, Trophy, Users, Wifi, WifiOff, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DLBookmakerPage() {
  const {
    data,
    loading,
    error,
    lastUpdate,
    isOnline,
    isUpdating,
    refresh,
    search,
    filterMatches,
    boosts,
    liveMatches,
    comboBets,
    bonuses,
    missions,
    ranking
  } = useBookmakerData({ autoRefresh: true, refreshInterval: 30000 });

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('matches');
  const [showChat, setShowChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [filteredMatches, setFilteredMatches] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const results = await search(query);
    setSearchResults(results);
  };

  // Charger les matchs filtrés
  useEffect(() => {
    const loadFilteredMatches = async () => {
      try {
        const matches = await filterMatches({
          sport: 'all',
          league: 'all',
          status: 'all'
        });
        setFilteredMatches(matches || []);
      } catch (err) {
        console.error('Erreur lors du filtrage des matchs:', err);
        setFilteredMatches([]);
      }
    };

    loadFilteredMatches();
  }, [filterMatches]);

  return (
    <>
      <SEOOptimized
        pageKey="dl-bookmaker"
        customConfig={{
          title: "DL Bookmaker | Gestion des paris sportifs – DL Solutions",
          description: "Plateforme de gestion de paris sportifs, résultats en temps réel, statistiques et outils d’analyse pour les passionnés et professionnels.",
          url: "https://www.dl-solutions.com/novacore/dl-bookmaker"
        }}
      />
      <div className="space-y-6">
        {/* Header avec thème */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DL Bookmaker
            </h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant={isOnline ? "default" : "destructive"}
                size="sm"
                className="flex items-center gap-2"
              >
                {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                {isOnline ? 'Connecté' : 'Déconnecté'}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChat(!showChat)}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              Historique
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReferral(!showReferral)}
              className="flex items-center gap-2"
            >
              <Gift className="h-4 w-4" />
              Parrainage
            </Button>
            <Button
              onClick={refresh}
              disabled={isUpdating}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
              {isUpdating ? 'Actualisation...' : 'Actualiser'}
            </Button>
          </div>
        </div>

        {/* Statut et dernière mise à jour */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>Dernière mise à jour: {lastUpdate?.toLocaleTimeString('fr-FR')}</span>
            <span>•</span>
            <span>{data?.stats?.totalMatches || 0} matchs disponibles</span>
            <span>•</span>
            <span>{liveMatches?.length || 0} matchs en direct</span>
          </div>
          <Link href="/novacore/dl-bookmaker/nouveau" className="text-blue-600 hover:text-blue-700">
            Nouveau pari →
          </Link>
        </div>

        {/* Onglets */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'matches', label: 'Matchs', icon: Play },
            { id: 'live', label: 'En Direct', icon: Activity },
            { id: 'boosts', label: 'Boosts', icon: Zap },
            { id: 'bonuses', label: 'Bonus', icon: Gift },
            { id: 'missions', label: 'Missions', icon: Target },
            { id: 'ranking', label: 'Classement', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Matchs */}
            {activeTab === 'matches' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Matchs à venir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredMatches?.slice(0, 10).map((match: any) => (
                      <div key={match.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-sm font-semibold">{match.teams[0]}</div>
                              <div className="text-xs text-gray-500">vs</div>
                              <div className="text-sm font-semibold">{match.teams[1]}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-600">{match.league}</div>
                              <div className="text-xs text-gray-500">{match.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{match.odds.home}</div>
                              <div className="text-xs text-gray-500">1</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-600">{match.odds.draw}</div>
                              <div className="text-xs text-gray-500">X</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-600">{match.odds.away}</div>
                              <div className="text-xs text-gray-500">2</div>
                            </div>
                            <Button size="sm" variant="outline">
                              Parier
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Matchs en direct */}
            {activeTab === 'live' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-red-600" />
                    Matchs en Direct
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {liveMatches?.map((match: any) => (
                      <div key={match.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-sm font-semibold">{match.teams[0]}</div>
                              <div className="text-xs text-red-600 font-bold">{match.score?.[0] || 0}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-600">{match.league}</div>
                              <div className="text-xs text-red-600 font-bold">{match.minute || 0}'</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-semibold">{match.teams[1]}</div>
                              <div className="text-xs text-red-600 font-bold">{match.score?.[1] || 0}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{match.liveOdds?.home || match.odds.home}</div>
                              <div className="text-xs text-gray-500">1</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-600">{match.liveOdds?.draw || match.odds.draw}</div>
                              <div className="text-xs text-gray-500">X</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-600">{match.liveOdds?.away || match.odds.away}</div>
                              <div className="text-xs text-gray-500">2</div>
                            </div>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              Parier Live
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Boosts */}
            {activeTab === 'boosts' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Cotes Boostées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {boosts?.map((boost: any) => (
                      <div key={boost.id} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{boost.description}</h4>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            +{boost.boostValue}%
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          Cote boostée: <span className="font-bold text-yellow-600">{boost.boostedOdds}</span>
                        </div>
                        <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700">
                          Utiliser ce boost
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bonus */}
            {activeTab === 'bonuses' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-green-600" />
                    Bonus et Freebets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bonuses?.map((bonus: any) => (
                      <div key={bonus.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{bonus.description}</h4>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                            {bonus.value}€
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          Statut: <span className="font-bold text-green-600">{bonus.status}</span>
                        </div>
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          Récupérer
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Missions */}
            {activeTab === 'missions' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Missions Quotidiennes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {missions?.map((mission: any) => (
                      <div key={mission.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{mission.title}</h4>
                            <p className="text-sm text-gray-600">{mission.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">
                                {mission.progress}/{mission.target}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-600">+{mission.reward}€</div>
                            <Button size="sm" variant="outline" disabled={mission.progress < mission.target}>
                              {mission.progress >= mission.target ? 'Récupérer' : 'En cours'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Classement */}
            {activeTab === 'ranking' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Classement des Parieurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {ranking?.map((user: any, index: number) => (
                      <div key={user.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className={`text-lg font-bold ${
                              index === 0 ? 'text-yellow-600' : 
                              index === 1 ? 'text-gray-600' : 
                              index === 2 ? 'text-orange-600' : 'text-gray-500'
                            }`}>
                              #{index + 1}
                            </div>
                            {index < 3 && (
                              <Trophy className={`h-4 w-4 mx-auto ${
                                index === 0 ? 'text-yellow-600' : 
                                index === 1 ? 'text-gray-600' : 'text-orange-600'
                              }`} />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold">{user.username}</div>
                            <div className="text-sm text-gray-500">{user.winRate}% de réussite</div>
                          </div>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="text-lg font-bold text-green-600">+{user.totalWinnings}€</div>
                          <div className="text-sm text-gray-500">{user.totalBets} paris</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat en direct */}
            {showChat && <LiveChat />}

            {/* Notifications */}
            {showNotifications && <PushNotifications />}

            {/* Historique */}
            {showHistory && <BettingHistory />}

            {/* Parrainage */}
            {showReferral && <ReferralSystem />}

            {/* Stats rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total paris</span>
                  <span className="font-semibold">{data?.stats?.totalBets || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taux de réussite</span>
                  <span className="font-semibold text-green-600">{(data?.stats?.averageOdds || 0).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Gains totaux</span>
                  <span className="font-semibold text-green-600">+{(data?.stats?.totalBets || 0).toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>Cote moyenne</span>
                  <span className="font-semibold">{(data?.stats?.averageOdds || 0).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Paris combinés populaires */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Combinés Populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {comboBets?.slice(0, 3).map((combo: any) => (
                    <div key={combo.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">Combiné {combo.bets.length} matchs</h4>
                        <Badge variant="outline" className="text-xs">
                          {combo.combinedOdds}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        Gain potentiel: {combo.potentialWin}€
                      </div>
                      <Button size="sm" className="w-full text-xs">
                        Reproduire
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
} 