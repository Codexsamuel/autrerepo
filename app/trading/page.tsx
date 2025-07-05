"use client";

import { SubscriptionGuard } from '@/components/guards/SubscriptionGuard';
import DAVYDashboard from '@/components/trading/DAVYDashboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Brain, MessageSquare, Shield, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

export default function TradingPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <SubscriptionGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              DAVY Trading Platform
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Plateforme de trading intelligente propulsée par l'IA
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                <Zap className="w-4 h-4 mr-2" />
                IA Avancée
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Shield className="w-4 h-4 mr-2" />
                Sécurisé
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                <TrendingUp className="w-4 h-4 mr-2" />
                Temps Réel
              </Badge>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="advisor" className="data-[state=active]:bg-purple-600">
                <Brain className="w-4 h-4 mr-2" />
                Conseiller IA
              </TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-purple-600">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat Trading
              </TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-purple-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analyse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Dashboard de Trading</CardTitle>
                  <CardDescription className="text-gray-400">
                    Vue d'ensemble de vos positions et performances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DAVYDashboard />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advisor" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Conseiller IA</CardTitle>
                  <CardDescription className="text-gray-400">
                    Recommandations personnalisées basées sur l'IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Conseiller IA
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Fonctionnalité en cours de développement
                    </p>
                    <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/20">
                      Bientôt Disponible
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Chat Trading IA</CardTitle>
                  <CardDescription className="text-gray-400">
                    Interagissez avec l'IA pour des conseils en temps réel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Chat Trading
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Fonctionnalité en cours de développement
                    </p>
                    <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20">
                      Bientôt Disponible
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Analyse Avancée</CardTitle>
                  <CardDescription className="text-gray-400">
                    Analyses techniques et fondamentales détaillées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Analyse Avancée
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Fonctionnalité en cours de développement
                    </p>
                    <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">
                      Bientôt Disponible
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SubscriptionGuard>
  );
} 