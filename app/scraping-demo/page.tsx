import AdvancedScraping from '@/components/scraping/AdvancedScraping';
import IndustrialScraping from '@/components/scraping/IndustrialScraping';
import ScrapingMultiMarket from '@/components/scraping/ScrapingMultiMarket';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Activity,
    BarChart3,
    CheckCircle,
    Database,
    Factory,
    Globe,
    Settings,
    Target
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Démonstration Scraping - DL Solutions',
  description: 'Démonstration complète des modules de scraping multi-marchés, avancé et industriel',
  keywords: ['scraping', 'démonstration', 'multi-marchés', 'industriel', 'avancé', 'DL Solutions'],
};

export default function ScrapingDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Database className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">Démonstration Scraping</h1>
            </div>
            <p className="text-xl opacity-90 mb-8">
              Test complet des modules de scraping optimisés pour la production
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Frontend Netlify
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Backend Vercel
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                APIs Fonctionnelles
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Vue d'ensemble */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Modules de Scraping Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Scraping Multi-Marchés</CardTitle>
                <CardDescription>
                  Collecte de données depuis Amazon, eBay, Alibaba, Shein, Cdiscount, AliExpress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Support de 7 plateformes
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Filtres avancés
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Export des données
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Scraping Avancé</CardTitle>
                <CardDescription>
                  Système de jobs avec monitoring en temps réel et gestion des sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Gestion des jobs
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Monitoring temps réel
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Statistiques avancées
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Factory className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Scraping Industriel</CardTitle>
                <CardDescription>
                  Collecte spécialisée pour produits et équipements industriels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Plateformes industrielles
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Spécifications techniques
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Certifications & normes
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modules de démonstration */}
        <Tabs defaultValue="multi-market" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="multi-market" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Multi-Marchés</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Avancé</span>
            </TabsTrigger>
            <TabsTrigger value="industrial" className="flex items-center space-x-2">
              <Factory className="w-4 h-4" />
              <span>Industriel</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="multi-market">
            <ScrapingMultiMarket />
          </TabsContent>

          <TabsContent value="advanced">
            <AdvancedScraping />
          </TabsContent>

          <TabsContent value="industrial">
            <IndustrialScraping />
          </TabsContent>
        </Tabs>

        {/* Informations techniques */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Settings className="w-6 h-6 mr-3" />
                Informations Techniques
              </CardTitle>
              <CardDescription>
                Architecture déployée et configuration du système de scraping
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Architecture Déployée
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-900">Frontend</span>
                      <Badge variant="outline">Netlify</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-900">Backend</span>
                      <Badge variant="outline">Vercel</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-purple-900">APIs</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Fonctionnelles
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    URLs de Test
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Frontend</div>
                      <div className="text-sm text-gray-600 break-all">
                        https://dlsolutionssarl.tech
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Backend</div>
                      <div className="text-sm text-gray-600 break-all">
                        https://autrerepo-69ck.vercel.app
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Test Variables</div>
                      <div className="text-sm text-gray-600 break-all">
                        /test-env
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  🎉 Tous les Modules de Scraping Fonctionnent !
                </h3>
                <p className="text-green-700">
                  Les composants de scraping sont maintenant optimisés et fonctionnels en production. 
                  Le frontend Netlify peut communiquer avec le backend Vercel pour récupérer 
                  les données de scraping en temps réel sur toutes les plateformes supportées.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Prêt à utiliser le scraping ?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Tous les modules sont optimisés et fonctionnels en production
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  <Activity className="w-5 h-5 mr-2" />
                  Tester maintenant
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Target className="w-5 h-5 mr-2" />
                  Voir la documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 