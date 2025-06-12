"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  MessageSquare,
  Brain,
  Target,
  RefreshCw,
  Play,
  Pause,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function TradingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAIActive, setIsAIActive] = useState(true)
  const [isListening, setIsListening] = useState(false)

  // Données simulées pour le trading
  const marketData = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 185.92,
      change: 2.45,
      changePercent: 1.33,
      volume: "45.6M",
      trend: "up",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 43250.75,
      change: -1250.25,
      changePercent: -2.81,
      volume: "28.4B",
      trend: "down",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 2650.45,
      change: 45.67,
      changePercent: 1.75,
      volume: "15.6B",
      trend: "up",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 245.67,
      change: 8.92,
      changePercent: 3.76,
      volume: "67.8M",
      trend: "up",
    },
  ]

  const portfolio = {
    totalValue: 125000,
    dailyChange: 2340,
    dailyChangePercent: 1.91,
    positions: [
      { symbol: "AAPL", quantity: 50, avgPrice: 180.50, currentPrice: 185.92, pnl: 271 },
      { symbol: "BTC", quantity: 2.5, avgPrice: 42000, currentPrice: 43250.75, pnl: 3062.5 },
      { symbol: "ETH", quantity: 10, avgPrice: 2600, currentPrice: 2650.45, pnl: 504.5 },
    ],
  }

  const aiRecommendations = [
    {
      symbol: "AAPL",
      action: "BUY",
      confidence: 85,
      reasoning: "Support technique solide, momentum positif",
      targetPrice: 195.00,
      stopLoss: 175.00,
    },
    {
      symbol: "BTC",
      action: "HOLD",
      confidence: 72,
      reasoning: "Consolidation en cours, attendre breakout",
      targetPrice: 45000.00,
      stopLoss: 41000.00,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="/novacore">
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </Button>
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DAVY Trading Platform
                </h1>
                <p className="text-sm text-gray-600">Plateforme de trading IA intelligente</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-700">
                  {portfolio.totalValue.toLocaleString()} €
                </span>
                <span className="text-sm text-green-600">
                  (+{portfolio.dailyChangePercent.toFixed(2)}%)
                </span>
              </div>
              <Button
                variant={isAIActive ? "default" : "outline"}
                onClick={() => setIsAIActive(!isAIActive)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                <Brain className="h-4 w-4 mr-2" />
                IA {isAIActive ? "Active" : "Inactive"}
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="market">Marché</TabsTrigger>
            <TabsTrigger value="portfolio">Portefeuille</TabsTrigger>
            <TabsTrigger value="ai">IA DAVY</TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Portefeuille */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Mon Portefeuille
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {portfolio.totalValue.toLocaleString()} €
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">
                      +{portfolio.dailyChange.toLocaleString()} €
                    </span>
                    <span className="text-sm text-gray-600">
                      (+{portfolio.dailyChangePercent.toFixed(2)}%)
                    </span>
                  </div>
                  <Button className="w-full" onClick={() => setActiveTab("portfolio")}>
                    Voir détails
                  </Button>
                </CardContent>
              </Card>

              {/* IA Status */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    IA DAVY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">Actif</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    {aiRecommendations.length} recommandations en cours
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("ai")}>
                    Voir IA
                  </Button>
                </CardContent>
              </Card>

              {/* Marché */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Marché
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 mb-4">
                    {marketData.length} actifs surveillés
                  </div>
                  <div className="space-y-2">
                    {marketData.slice(0, 3).map((asset) => (
                      <div key={asset.symbol} className="flex items-center justify-between">
                        <span className="font-medium">{asset.symbol}</span>
                        <span className={asset.trend === "up" ? "text-green-600" : "text-red-600"}>
                          {asset.changePercent > 0 ? "+" : ""}{asset.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("market")}>
                    Voir marché
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Marché */}
          <TabsContent value="market" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Données de Marché</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Symbole</th>
                        <th className="text-left py-3 px-4">Nom</th>
                        <th className="text-right py-3 px-4">Prix</th>
                        <th className="text-right py-3 px-4">Changement</th>
                        <th className="text-right py-3 px-4">Volume</th>
                        <th className="text-center py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.map((asset) => (
                        <tr key={asset.symbol} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{asset.symbol}</td>
                          <td className="py-3 px-4 text-gray-600">{asset.name}</td>
                          <td className="py-3 px-4 text-right font-medium">
                            {asset.price.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {asset.trend === "up" ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                              <span className={asset.trend === "up" ? "text-green-600" : "text-red-600"}>
                                {asset.change > 0 ? "+" : ""}{asset.change.toFixed(2)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">{asset.volume}</td>
                          <td className="py-3 px-4 text-center">
                            <Button size="sm" variant="outline">
                              Trader
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portefeuille */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Mon Portefeuille</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {portfolio.totalValue.toLocaleString()} €
                    </div>
                    <div className="text-sm text-gray-600">Valeur totale</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      +{portfolio.dailyChange.toLocaleString()} €
                    </div>
                    <div className="text-sm text-gray-600">Gain journalier</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      +{portfolio.dailyChangePercent.toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-600">Performance</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Positions</h3>
                  {portfolio.positions.map((position) => (
                    <div key={position.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{position.symbol}</div>
                        <div className="text-sm text-gray-600">
                          {position.quantity} @ {position.avgPrice.toFixed(2)} €
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{position.currentPrice.toFixed(2)} €</div>
                        <div className={`text-sm ${position.pnl > 0 ? "text-green-600" : "text-red-600"}`}>
                          {position.pnl > 0 ? "+" : ""}{position.pnl.toFixed(2)} €
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IA DAVY */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Recommandations IA DAVY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiRecommendations.map((rec) => (
                    <div key={rec.symbol} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-xl font-bold">{rec.symbol}</div>
                          <Badge
                            variant={rec.action === "BUY" ? "default" : "secondary"}
                            className={rec.action === "BUY" ? "bg-green-600" : ""}
                          >
                            {rec.action}
                          </Badge>
                          <div className="text-sm text-gray-600">
                            Confiance: {rec.confidence}%
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">{rec.reasoning}</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Prix cible:</span>
                          <span className="ml-2 font-medium">{rec.targetPrice.toLocaleString()} €</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Stop-loss:</span>
                          <span className="ml-2 font-medium">{rec.stopLoss.toLocaleString()} €</span>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm">Exécuter</Button>
                        <Button size="sm" variant="outline">
                          Plus d'infos
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assistant vocal */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Assistant Vocal DAVY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Button
                    size="lg"
                    variant={isListening ? "default" : "outline"}
                    onClick={() => setIsListening(!isListening)}
                    className="mb-4"
                  >
                    {isListening ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Arrêter l'écoute
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        Commencer l'écoute
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-600">
                    Dites "Analyse AAPL" ou "Portefeuille" pour interagir avec DAVY
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
} 