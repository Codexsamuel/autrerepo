"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowUpRight,
    BarChart3,
    DollarSign,
    Globe,
    MapPin,
    Pause,
    Play,
    RotateCcw,
    Settings,
    TrendingUp,
    Users,
    Zap
} from "lucide-react";
import { useEffect, useState } from "react";

interface MarketData {
  marketCap: number;
  revenue: number;
  growth: number;
  customers: number;
  regions: number;
  partnerships: number;
}

interface PerformanceMetrics {
  efficiency: number;
  reliability: number;
  innovation: number;
  marketShare: number;
  customerSatisfaction: number;
  technologyAdvancement: number;
}

interface FinancialProjection {
  year: number;
  revenue: number;
  profit: number;
  marketShare: number;
  customers: number;
}

export default function InvestorDashboard() {
  const [marketData, setMarketData] = useState<MarketData>({
    marketCap: 0,
    revenue: 0,
    growth: 0,
    customers: 0,
    regions: 0,
    partnerships: 0
  });

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    efficiency: 0,
    reliability: 0,
    innovation: 0,
    marketShare: 0,
    customerSatisfaction: 0,
    technologyAdvancement: 0
  });

  const [financialProjections, setFinancialProjections] = useState<FinancialProjection[]>([]);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Animation des données de marché
  useEffect(() => {
    const animateMarketData = () => {
      setMarketData({
        marketCap: 2500000000, // 2.5B
        revenue: 450000000, // 450M
        growth: 156, // 156%
        customers: 12500,
        regions: 45,
        partnerships: 89
      });
    };

    const animatePerformanceMetrics = () => {
      setPerformanceMetrics({
        efficiency: 94,
        reliability: 98,
        innovation: 92,
        marketShare: 23,
        customerSatisfaction: 96,
        technologyAdvancement: 89
      });
    };

    const animateFinancialProjections = () => {
      setFinancialProjections([
        { year: 2024, revenue: 450000000, profit: 67500000, marketShare: 15, customers: 8500 },
        { year: 2025, revenue: 720000000, profit: 144000000, marketShare: 23, customers: 12500 },
        { year: 2026, revenue: 1150000000, profit: 287500000, marketShare: 32, customers: 18000 },
        { year: 2027, revenue: 1800000000, profit: 540000000, marketShare: 42, customers: 25000 },
        { year: 2028, revenue: 2800000000, profit: 980000000, marketShare: 55, customers: 35000 }
      ]);
    };

    // Animation progressive
    setTimeout(animateMarketData, 500);
    setTimeout(animatePerformanceMetrics, 1000);
    setTimeout(animateFinancialProjections, 1500);
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const startDemo = () => {
    setIsDemoRunning(true);
    setCurrentStep(0);
    
    // Séquence de démonstration automatique
    const demoSteps = [
      { delay: 2000, step: 1 },
      { delay: 3000, step: 2 },
      { delay: 2500, step: 3 },
      { delay: 2000, step: 4 },
      { delay: 3000, step: 5 }
    ];

    demoSteps.forEach(({ delay, step }) => {
      setTimeout(() => {
        if (isDemoRunning) {
          setCurrentStep(step);
        }
      }, delay);
    });
  };

  const stopDemo = () => {
    setIsDemoRunning(false);
    setCurrentStep(0);
  };

  const resetDemo = () => {
    stopDemo();
    setTimeout(startDemo, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🚁 DL Solutions - Dashboard Investisseurs
            </h1>
            <p className="text-blue-200 text-lg">
              Plateforme de simulation de drones avancée - Présentation professionnelle
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Zap className="w-4 h-4 mr-2" />
              En Direct
            </Badge>
            <div className="flex gap-2">
              <Button
                onClick={isDemoRunning ? stopDemo : startDemo}
                variant={isDemoRunning ? "destructive" : "default"}
                size="sm"
              >
                {isDemoRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isDemoRunning ? 'Arrêter' : 'Démarrer'} Demo
              </Button>
              <Button onClick={resetDemo} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de progression de la démo */}
      {isDemoRunning && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-white mb-2">
            <span className="text-sm font-medium">Progression de la démonstration</span>
            <span className="text-sm">Étape {currentStep}/5</span>
          </div>
          <Progress value={(currentStep / 5) * 100} className="h-2" />
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="financial" className="data-[state=active]:bg-blue-600">
            <DollarSign className="w-4 h-4 mr-2" />
            Financier
          </TabsTrigger>
          <TabsTrigger value="demo" className="data-[state=active]:bg-blue-600">
            <Play className="w-4 h-4 mr-2" />
            Démo Live
          </TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Capitalisation boursière */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">
                  Capitalisation Boursière
                </CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(marketData.marketCap)}
                </div>
                <p className="text-xs text-green-400 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +{marketData.growth}% cette année
                </p>
              </CardContent>
            </Card>

            {/* Revenus */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">
                  Revenus Annuels
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(marketData.revenue)}
                </div>
                <p className="text-xs text-blue-400 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  Croissance exponentielle
                </p>
              </CardContent>
            </Card>

            {/* Clients */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">
                  Clients Actifs
                </CardTitle>
                <Users className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {formatNumber(marketData.customers)}
                </div>
                <p className="text-xs text-purple-400 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +{marketData.partnerships} partenariats
                </p>
              </CardContent>
            </Card>

            {/* Présence mondiale */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">
                  Présence Mondiale
                </CardTitle>
                <Globe className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {marketData.regions} pays
                </div>
                <p className="text-xs text-orange-400 flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  Expansion continue
                </p>
              </CardContent>
            </Card>

            {/* Part de marché */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">
                  Part de Marché
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {performanceMetrics.marketShare}%
                </div>
                <p className="text-xs text-yellow-400 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  Leader du secteur
                </p>
              </CardContent>
            </Card>

            {/* Innovation */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">
                  Score Innovation
                </CardTitle>
                <Zap className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {performanceMetrics.innovation}/100
                </div>
                <p className="text-xs text-cyan-400 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  Technologie de pointe
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Métriques de performance */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">📊 Métriques de Performance</CardTitle>
                <CardDescription className="text-blue-200">
                  Indicateurs clés de performance de nos solutions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-white mb-1">
                    <span>Efficacité Opérationnelle</span>
                    <span>{performanceMetrics.efficiency}%</span>
                  </div>
                  <Progress value={performanceMetrics.efficiency} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-white mb-1">
                    <span>Fiabilité Système</span>
                    <span>{performanceMetrics.reliability}%</span>
                  </div>
                  <Progress value={performanceMetrics.reliability} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-white mb-1">
                    <span>Innovation Technologique</span>
                    <span>{performanceMetrics.innovation}%</span>
                  </div>
                  <Progress value={performanceMetrics.innovation} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-white mb-1">
                    <span>Satisfaction Client</span>
                    <span>{performanceMetrics.customerSatisfaction}%</span>
                  </div>
                  <Progress value={performanceMetrics.customerSatisfaction} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Comparaison concurrentielle */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">🏆 Positionnement Concurrentiel</CardTitle>
                <CardDescription className="text-blue-200">
                  Comparaison avec les leaders du marché
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                    <span className="text-white font-medium">DL Solutions</span>
                    <Badge className="bg-green-600">Leader</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                    <span className="text-gray-300">Concurrent A</span>
                    <Badge variant="outline" className="text-gray-400">Suiveur</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                    <span className="text-gray-300">Concurrent B</span>
                    <Badge variant="outline" className="text-gray-400">Suiveur</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                    <span className="text-gray-300">Concurrent C</span>
                    <Badge variant="outline" className="text-gray-400">Suiveur</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financier */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Projections financières */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">📈 Projections Financières</CardTitle>
                <CardDescription className="text-blue-200">
                  Prévisions sur 5 ans (2024-2028)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialProjections.map((projection) => (
                    <div key={projection.year} className="flex items-center justify-between p-3 bg-slate-700 rounded">
                      <div>
                        <div className="text-white font-medium">{projection.year}</div>
                        <div className="text-sm text-blue-200">
                          {formatCurrency(projection.revenue)} revenus
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-medium">
                          {formatCurrency(projection.profit)}
                        </div>
                        <div className="text-sm text-gray-400">
                          {projection.marketShare}% marché
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Métriques financières */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">💰 Métriques Financières</CardTitle>
                <CardDescription className="text-blue-200">
                  Indicateurs de performance financière
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-700 rounded">
                    <div className="text-2xl font-bold text-green-400">156%</div>
                    <div className="text-sm text-gray-300">Croissance YoY</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded">
                    <div className="text-2xl font-bold text-blue-400">25%</div>
                    <div className="text-sm text-gray-300">Marge Nette</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded">
                    <div className="text-2xl font-bold text-purple-400">3.2x</div>
                    <div className="text-sm text-gray-300">ROI Client</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded">
                    <div className="text-2xl font-bold text-orange-400">18mois</div>
                    <div className="text-sm text-gray-300">Payback</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Démo Live */}
        <TabsContent value="demo" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">🎮 Démonstration Interactive</CardTitle>
              <CardDescription className="text-blue-200">
                Simulation en temps réel de nos technologies avancées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-6 bg-slate-700 rounded-lg">
                  <div className="text-4xl mb-2">🚁</div>
                  <h3 className="text-white font-semibold mb-2">Simulation 3D</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Visualisation immersive des drones en action
                  </p>
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Lancer
                  </Button>
                </div>
                
                <div className="text-center p-6 bg-slate-700 rounded-lg">
                  <div className="text-4xl mb-2">🥽</div>
                  <h3 className="text-white font-semibold mb-2">Mode VR</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Expérience réalité virtuelle complète
                  </p>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurer
                  </Button>
                </div>
                
                <div className="text-center p-6 bg-slate-700 rounded-lg">
                  <div className="text-4xl mb-2">🌐</div>
                  <h3 className="text-white font-semibold mb-2">Multi-joueur</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Simulation collaborative en temps réel
                  </p>
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Rejoindre
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 