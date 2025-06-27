"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, Info } from "lucide-react"



interface MarketAnalysis {
  trend: string
  volatility: number
  topPerformers: Array<{
    symbol: string
    change: number
    volume: number
  }>
  riskLevel: string
  opportunities: Array<{
    asset: string
    potential: number
    risk: string
  }>
}

interface TradingRecommendation {
  symbol: string
  action: "BUY" | "SELL" | "HOLD"
  confidence: number
  reason: string
  targetPrice: number
  stopLoss: number
}

export default function DLTradingPage() {
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null)
  const [recommendations, setRecommendations] = useState<TradingRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setMarketAnalysis({
        trend: "HAUSSIER",
        volatility: 0.15,
        topPerformers: [
          { symbol: "AAPL", change: 2.5, volume: 1500000 },
          { symbol: "MSFT", change: 1.8, volume: 1200000 },
          { symbol: "GOOGL", change: 1.2, volume: 900000 },
        ],
        riskLevel: "MODÉRÉ",
        opportunities: [
          { asset: "TSLA", potential: 0.08, risk: "ÉLEVÉ" },
          { asset: "AMZN", potential: 0.05, risk: "MODÉRÉ" },
        ],
      })

      setRecommendations([
        {
          symbol: "AAPL",
          action: "BUY",
          confidence: 85,
          reason: "Fort potentiel de croissance, résultats trimestriels positifs",
          targetPrice: 185.50,
          stopLoss: 175.00,
        },
        {
          symbol: "MSFT",
          action: "HOLD",
          confidence: 75,
          reason: "Stabilité du marché, attente des prochains résultats",
          targetPrice: 320.00,
          stopLoss: 300.00,
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const getVolatilityText = (volatility: number) => {
    if (volatility < 0.1) return " faible"
    if (volatility < 0.2) return " modérée"
    return " élevée"
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">DL Trading</h1>
          <p className="text-muted-foreground mt-1">
            Analyse et recommandations de trading en temps réel
          </p>
        </div>
        <Badge variant={marketAnalysis?.trend === "HAUSSIER" ? "success" : "destructive"}>marketAnalysis?.trend</Badge>
      </div>

      <Tabs defaultValue="analysis" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analysis">Analyse du marché</TabsTrigger>
          <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
          <TabsTrigger value="education">Guide de trading</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketAnalysis?.topPerformers.map((performer) => (
                    <div key={performer.symbol} className="flex justify-between items-center">
                      <span className="font-medium">{performer.symbol}</span>
                      <div className="flex items-center">
                        <span className={performer.change >= 0 ? "text-green-500" : "text-red-500"}>
                          {performer.change >= 0 ? "+" : ""}{performer.change}%
                        </span>
                        <span className="text-muted-foreground ml-2">
                          Vol: {performer.volume.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Risque & Opportunités
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Niveau de risque</span>
                    <Badge variant="outline">marketAnalysis?.riskLevel</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Volatilité</span>
                    <span>{marketAnalysis?.volatility ? marketAnalysis.volatility * 100 : 0}%</span>
                  </div>
                  {marketAnalysis?.opportunities.map((opp) => (
                    <div key={opp.asset} className="flex justify-between items-center">
                      <span>{opp.asset}</span>
                      <div className="flex items-center">
                        <span className="text-green-500">+{opp.potential * 100}%</span>
                        <Badge variant="outline" className="ml-2">opp.risk</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Conseils
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Le marché est actuellement {marketAnalysis?.trend.toLowerCase()}. La volatilité est
                    {marketAnalysis?.volatility ? getVolatilityText(marketAnalysis.volatility) : " inconnue"}.
                  </p>
                  <p className="text-sm">
                    Recommandation:{" "}
                    {marketAnalysis?.trend === "HAUSSIER"
                      ? "Privilégiez les positions longues sur les actifs à forte croissance."
                      : "Privilégiez les positions courtes et les actifs défensifs."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <Card key={rec.symbol}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{rec.symbol}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                    </div>
                    <Badge
                      variant={
                        rec.action === "BUY"
                          ? "success"
                          : rec.action === "SELL"
                          ? "destructive"
                          : "secondary"
                      }
                    >rec.action</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Confiance</span>
                      <span>{rec.confidence}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Prix cible</span>
                      <span className="text-green-500">${rec.targetPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Stop loss</span>
                      <span className="text-red-500">${rec.stopLoss}</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      Voir l'analyse détaillée
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Comment trader ?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">Étapes fondamentales :</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Analyser le marché et les tendances</li>
                    <li>Définir votre stratégie et vos objectifs</li>
                    <li>Gérer votre risque et votre capital</li>
                    <li>Suivre vos positions et ajuster si nécessaire</li>
                  </ol>
                  <Button variant="outline" className="w-full">
                    En savoir plus
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pourquoi trader ?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">Avantages du trading :</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Potentiel de gains significatifs</li>
                    <li>Flexibilité horaire</li>
                    <li>Diversification de vos investissements</li>
                    <li>Apprentissage continu</li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Découvrir les opportunités
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 