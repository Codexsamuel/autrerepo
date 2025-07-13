"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Calendar, DollarSign, Play, Target, TrendingDown, TrendingUp, Trophy } from "lucide-react";
import { useState } from "react";



export default function DLParisSportifPage() {
  const [selectedSport, setSelectedSport] = useState("football")
  const [selectedTab, setSelectedTab] = useState<"live" | "upcoming" | "predictions">("live")

  const sports = [{ id: "football", name: "Football", icon: "⚽" },
    { id: "basketball", name: "Basketball", icon: "🏀" },
    { id: "tennis", name: "Tennis", icon: "🎾" },
    { id: "rugby", name: "Rugby", icon: "🏉" },]
  const liveMatches = [{
      id: 1,
      league: "Ligue 1",
      homeTeam: "PSG",
      awayTeam: "Marseille",
      homeScore: 2,
      awayScore: 1,
      time: "78'",
      status: "live",
      odds: { home: 1.45, draw: 4.2, away: 6.8 },
      aiPrediction: { winner: "PSG", confidence: 87, trend: "up" },
    },
    {
      id: 2,
      league: "Premier League",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      homeScore: 0,
      awayScore: 0,
      time: "23'",
      status: "live",
      odds: { home: 2.1, draw: 3.4, away: 3.2 },
      aiPrediction: { winner: "Arsenal", confidence: 64, trend: "stable" },
    },
    {
      id: 3,
      league: "La Liga",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      homeScore: 1,
      awayScore: 2,
      time: "HT",
      status: "halftime",
      odds: { home: 2.8, draw: 3.1, away: 2.4 },
      aiPrediction: { winner: "Barcelona", confidence: 72, trend: "up" },
    },]
  const upcomingMatches = [{
      id: 4,
      league: "Champions League",
      homeTeam: "Bayern Munich",
      awayTeam: "Manchester City",
      date: "2024-03-15",
      time: "21:00",
      odds: { home: 2.3, draw: 3.2, away: 2.9 },
      aiPrediction: { winner: "Manchester City", confidence: 68, expectedGoals: "2-1" },
    },
    {
      id: 5,
      league: "Serie A",
      homeTeam: "Juventus",
      awayTeam: "Inter Milan",
      date: "2024-03-16",
      time: "20:45",
      odds: { home: 2.7, draw: 3.0, away: 2.6 },
      aiPrediction: { winner: "Inter Milan", confidence: 59, expectedGoals: "1-2" },
    },]
  const aiInsights = [{
      title: "Tendance de la semaine",
      description: "Les équipes à domicile ont 73% de victoires cette semaine",
      confidence: 89,
      type: "trend",
    },
    {
      title: "Prédiction IA",
      description: "PSG vs Marseille: Victoire PSG avec plus de 2.5 buts",
      confidence: 84,
      type: "prediction",
    },
    {
      title: "Analyse statistique",
      description: "Arsenal n'a perdu aucun match à domicile cette saison",
      confidence: 100,
      type: "stat",
    },]
  const topPredictors = [{ name: "IA NovaCore", accuracy: 87.3, profit: "+234€", badge: "🤖" },
    { name: "Samuel OBAM", accuracy: 82.1, profit: "+189€", badge: "👑" },
    { name: "Expert_Foot", accuracy: 79.8, profit: "+156€", badge: "⭐" },
    { name: "AI_Predictor", accuracy: 76.5, profit: "+98€", badge: "🎯" },]
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-green-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Paris Sportif Logo" className="h-14 w-14 object-contain rounded-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  DL Paris Sportif
                </h1>
                <p className="text-sm text-gray-600">Prédictions IA & Analytics</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/dl-paris-sportif" className="text-green-600 font-medium">
                Accueil
              </a>
              <a href="/dl-paris-sportif/live" className="text-gray-800 hover:text-green-600 transition-colors">
                Live
              </a>
              <a href="/dl-paris-sportif/predictions" className="text-gray-800 hover:text-green-600 transition-colors">
                Prédictions IA
              </a>
              <a href="/dl-paris-sportif/stats" className="text-gray-800 hover:text-green-600 transition-colors">
                Statistiques
              </a>
              <a href="/dl-paris-sportif/portfolio" className="text-gray-800 hover:text-green-600 transition-colors">
                Mon Portfolio
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-700">1,234.56€</span>
              </div>
              <Button variant="outline" className="border-green-200 text-green-700">
                Connexion
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600" asChild>
                <a href="/">Retour DL Solutions</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">🤖 IA Powered</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Paris Sportifs Intelligents</h1>
            <p className="text-xl text-green-100 mb-8">
              Prédictions IA avancées, analyses en temps réel et stratégies gagnantes pour maximiser vos gains.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">87.3%</div>
                <div className="text-green-100">Précision IA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">+234€</div>
                <div className="text-green-100">Profit moyen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">15k+</div>
                <div className="text-green-100">Prédictions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-green-100">Analyses live</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Sports & Navigation */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sports Selection */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Sports</h3>
                <div className="space-y-2">
                  {sports.map((sport: any) => (
                    <button
                      key={sport.id}
                      onClick={() => setSelectedSport(sport.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                        selectedSport === sport.id ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-3 text-lg">{sport.icon}</span>
                      {sport.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Brain className="h-4 w-4 mr-2" />
                  Insights IA
                </h3>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <div className="font-medium text-sm">{insight.title}</div>
                      <div className="text-xs text-gray-600 mt-1">{insight.description}</div>
                      <div className="flex items-center mt-2">
                        <div className="text-xs text-green-600 font-medium">{insight.confidence}% confiance</div>
                        <Badge variant="secondary" className="ml-2 text-xs">insight.type</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Predictors */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Trophy className="h-4 w-4 mr-2" />
                  Top Prédicteurs
                </h3>
                <div className="space-y-3">
                  {topPredictors.map((predictor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{predictor.badge}</span>
                        <div>
                          <div className="font-medium text-sm">{predictor.name}</div>
                          <div className="text-xs text-gray-600">{predictor.accuracy}% précision</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{predictor.profit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedTab("live")}
                className={`flex-1 py-3 px-6 rounded-md transition-all ${
                  selectedTab === "live"
                    ? "bg-white shadow-md text-green-600 font-medium"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Play className="h-4 w-4 inline mr-2" />
                Matchs Live
              </button>
              <button
                onClick={() => setSelectedTab("upcoming")}
                className={`flex-1 py-3 px-6 rounded-md transition-all ${
                  selectedTab === "upcoming"
                    ? "bg-white shadow-md text-green-600 font-medium"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-2" />À venir
              </button>
              <button
                onClick={() => setSelectedTab("predictions")}
                className={`flex-1 py-3 px-6 rounded-md transition-all ${
                  selectedTab === "predictions"
                    ? "bg-white shadow-md text-green-600 font-medium"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Brain className="h-4 w-4 inline mr-2" />
                Prédictions IA
              </button>
            </div>

            {/* Live Matches */}
            {selectedTab === "live" && (
              <div className="space-y-4">
                {liveMatches.map((match: any) => (
                  <Card key={match.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-red-100 text-red-700">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                            {match.status === "live" ? "LIVE" : "MI-TEMPS"}
                          </Badge>
                          <span className="text-sm text-gray-600">{match.league}</span>
                          <span className="text-sm font-medium">{match.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`flex items-center ${
                              match.aiPrediction.trend === "up" ? "text-green-600" : "text-gray-600"
                            }`}
                          >
                            {match.aiPrediction.trend === "up" ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            <span className="ml-1 text-sm">{match.aiPrediction.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 items-center mb-6">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{match.homeTeam}</div>
                          <div className="text-3xl font-bold text-green-600">{match.homeScore}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400">VS</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">{match.awayTeam}</div>
                          <div className="text-3xl font-bold text-green-600">{match.awayScore}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <Button variant="outline" className="flex flex-col py-4">
                          <span className="text-xs text-gray-600">Victoire {match.homeTeam}</span>
                          <span className="text-lg font-bold">{match.odds.home}</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col py-4">
                          <span className="text-xs text-gray-600">Match Nul</span>
                          <span className="text-lg font-bold">{match.odds.draw}</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col py-4">
                          <span className="text-xs text-gray-600">Victoire {match.awayTeam}</span>
                          <span className="text-lg font-bold">{match.odds.away}</span>
                        </Button>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Brain className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">Prédiction IA:</span>
                            <span className="text-sm text-blue-600">{match.aiPrediction.winner}</span>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700">
                            {match.aiPrediction.confidence}% confiance
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Upcoming Matches */}
            {selectedTab === "upcoming" && (
              <div className="space-y-4">
                {upcomingMatches.map((match: any) => (
                  <Card key={match.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Badge variant="secondary">match.league</Badge>
                          <span className="text-sm text-gray-600">
                            {match.date} à {match.time}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 items-center mb-6">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{match.homeTeam}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400">VS</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">{match.awayTeam}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <Button variant="outline" className="flex flex-col py-4">
                          <span className="text-xs text-gray-600">1</span>
                          <span className="text-lg font-bold">{match.odds.home}</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col py-4">
                          <span className="text-xs text-gray-600">X</span>
                          <span className="text-lg font-bold">{match.odds.draw}</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col py-4">
                          <span className="text-xs text-gray-600">2</span>
                          <span className="text-lg font-bold">{match.odds.away}</span>
                        </Button>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">Prédiction IA:</span>
                            <span className="text-sm text-green-600">
                              {match.aiPrediction.winner} ({match.aiPrediction.expectedGoals})
                            </span>
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            {match.aiPrediction.confidence}% confiance
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
