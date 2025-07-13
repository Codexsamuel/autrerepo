'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    Download,
    Factory,
    Globe,
    Package,
    Pause,
    Play,
    RefreshCw,
    Settings,
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';

interface ScrapingStatus {
  isRunning: boolean;
  progress: number;
  currentMarket: string;
  productsScraped: number;
  errors: string[];
}

interface MarketInfo {
  name: string;
  url: string;
  categories: string[];
  lastScraped: string;
  productsCount: number;
  status: 'active' | 'inactive' | 'error';
}

const markets: MarketInfo[] = [
  {
    name: 'Alibaba',
    url: 'https://www.alibaba.com',
    categories: ['Industrial Machinery', 'Electronic Components', 'Tools & Hardware'],
    lastScraped: '2024-01-15 10:30',
    productsCount: 1250,
    status: 'active'
  },
  {
    name: 'Made-in-China',
    url: 'https://www.made-in-china.com',
    categories: ['Industrial Equipment', 'Machinery Parts', 'Automation Systems'],
    lastScraped: '2024-01-14 15:45',
    productsCount: 890,
    status: 'active'
  },
  {
    name: 'Dubai Trade',
    url: 'https://www.dubaitrade.ae',
    categories: ['Industrial Supplies', 'Construction Equipment', 'Oil & Gas'],
    lastScraped: '2024-01-13 09:20',
    productsCount: 567,
    status: 'active'
  },
  {
    name: 'Turkey Export',
    url: 'https://www.turkeyexport.com',
    categories: ['Textile Machinery', 'Automotive Parts', 'Agricultural Equipment'],
    lastScraped: '2024-01-12 14:15',
    productsCount: 423,
    status: 'inactive'
  }
];

export default function IndustrialScrapingPage() {
  const [scrapingStatus, setScrapingStatus] = useState<ScrapingStatus>({
    isRunning: false,
    progress: 0,
    currentMarket: '',
    productsScraped: 0,
    errors: []
  });

  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);

  const startScraping = async () => {
    setScrapingStatus(prev => ({ ...prev, isRunning: true, progress: 0 }));
    
    try {
      const response = await fetch('/api/scraping/industrial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          markets: selectedMarkets.length > 0 ? selectedMarkets : undefined,
          categories: undefined,
          limit: 50
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setScrapingStatus(prev => ({
          ...prev,
          isRunning: false,
          progress: 100,
          productsScraped: result.data.productsScraped
        }));
        
        // Afficher un message de succès
        console.log('✅ Scraping completed:', result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('❌ Scraping error:', error);
      setScrapingStatus(prev => ({
        ...prev,
        isRunning: false,
        errors: [...prev.errors, error instanceof Error ? error.message : 'Unknown error']
      }));
    }
  };

  const stopScraping = () => {
    setScrapingStatus(prev => ({ ...prev, isRunning: false }));
  };

  const toggleMarket = (marketName: string) => {
    setSelectedMarkets(prev => 
      prev.includes(marketName) 
        ? prev.filter(name => name !== marketName)
        : [...prev, marketName]
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Industrial Products Scraping</h1>
          <p className="text-gray-600 mt-2">
            Gestion du scraping automatique des produits industriels depuis les marchés internationaux
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configuration
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Status du scraping */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Factory className="w-5 h-5 mr-2" />
            Status du Scraping
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant={scrapingStatus.isRunning ? "default" : "secondary"}>
                  {scrapingStatus.isRunning ? "En cours" : "Arrêté"}
                </Badge>
                {scrapingStatus.currentMarket && (
                  <span className="text-sm text-gray-600">
                    Marché actuel: {scrapingStatus.currentMarket}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                {scrapingStatus.isRunning ? (
                  <Button onClick={stopScraping} variant="destructive" size="sm">
                    <Pause className="w-4 h-4 mr-2" />
                    Arrêter
                  </Button>
                ) : (
                  <Button onClick={startScraping} size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Démarrer
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
              </div>
            </div>
            
            <Progress value={scrapingStatus.progress} className="w-full" />
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Progression:</span>
                <div className="font-semibold">{scrapingStatus.progress}%</div>
              </div>
              <div>
                <span className="text-gray-600">Produits scrapés:</span>
                <div className="font-semibold">{scrapingStatus.productsScraped}</div>
              </div>
              <div>
                <span className="text-gray-600">Erreurs:</span>
                <div className="font-semibold text-red-600">{scrapingStatus.errors.length}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marchés configurés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Marchés Configurés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {markets.map((market) => (
                <div key={market.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedMarkets.includes(market.name)}
                      onChange={() => toggleMarket(market.name)}
                      className="rounded"
                    />
                    <div>
                      <div className="font-medium">{market.name}</div>
                      <div className="text-sm text-gray-600">{market.url}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={market.status === 'active' ? 'default' : 'secondary'}>
                      {market.status}
                    </Badge>
                    <div className="text-sm text-gray-600 mt-1">
                      {market.productsCount} produits
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3,130</div>
                  <div className="text-sm text-gray-600">Total Produits</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-sm text-gray-600">Marchés Actifs</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Dernière mise à jour:</span>
                  <span className="font-medium">Il y a 2 heures</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Prochaine mise à jour:</span>
                  <span className="font-medium">Dans 6 heures</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taux de succès:</span>
                  <span className="font-medium text-green-600">98.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Catégories de produits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Catégories de Produits Industriels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Industrial Machinery',
              'Electronic Components', 
              'Tools & Hardware',
              'Automation Equipment',
              'Measurement Instruments',
              'Safety Equipment',
              'Drone Parts',
              '3D Printer Parts'
            ].map((category) => (
              <div key={category} className="p-3 border rounded-lg text-center">
                <div className="font-medium">{category}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {Math.floor(Math.random() * 500) + 100} produits
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 