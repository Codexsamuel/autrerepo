'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Database,
    Factory,
    Globe,
    Play,
    Pause,
    Settings,
    Target,
    TrendingUp,
    Zap,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    Eye,
    Download,
    BarChart3,
    Clock,
    Shield,
    Activity,
    Package,
    Truck,
    Wrench,
    Cog
} from "lucide-react";

interface IndustrialProduct {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  manufacturer: string;
  model: string;
  specifications: Record<string, string>;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  moq: number; // Minimum Order Quantity
  leadTime: string;
  certifications: string[];
  origin: string;
  platform: string;
  scrapedAt: string;
}

interface ScrapingSession {
  id: string;
  name: string;
  target: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  totalProducts: number;
  scrapedProducts: number;
  startTime: string;
  endTime?: string;
  duration?: string;
  error?: string;
}

export default function IndustrialScraping() {
  const [sessions, setSessions] = useState<ScrapingSession[]>([]);
  const [products, setProducts] = useState<IndustrialProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newSessionName, setNewSessionName] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('alibaba');
  const [selectedCategory, setSelectedCategory] = useState('machinery');

  // Simuler le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      loadMockData();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const targets = [
    { value: 'alibaba', label: 'Alibaba 1688', icon: TrendingUp, color: 'bg-orange-500' },
    { value: 'made-in-china', label: 'Made-in-China', icon: Factory, color: 'bg-red-500' },
    { value: 'global-sources', label: 'Global Sources', icon: Globe, color: 'bg-blue-500' },
    { value: 'dhgate', label: 'DHGate', icon: Package, color: 'bg-green-500' },
    { value: 'indiamart', label: 'IndiaMART', icon: Cog, color: 'bg-purple-500' }
  ];

  const categories = [
    { value: 'machinery', label: 'Machines & Équipements', icon: Cog, color: 'bg-blue-100 text-blue-800' },
    { value: 'tools', label: 'Outils & Accessoires', icon: Wrench, color: 'bg-green-100 text-green-800' },
    { value: 'electronics', label: 'Composants Électroniques', icon: BarChart3, color: 'bg-purple-100 text-purple-800' },
    { value: 'materials', label: 'Matériaux Industriels', icon: Package, color: 'bg-orange-100 text-orange-800' },
    { value: 'automation', label: 'Automatisation', icon: Zap, color: 'bg-indigo-100 text-indigo-800' },
    { value: 'safety', label: 'Sécurité & Protection', icon: Shield, color: 'bg-red-100 text-red-800' }
  ];

  const loadMockData = () => {
    const mockSessions: ScrapingSession[] = [
      {
        id: '1',
        name: 'Scraping Machines CNC - Alibaba',
        target: 'alibaba',
        status: 'running',
        progress: 75,
        totalProducts: 8000,
        scrapedProducts: 6000,
        startTime: '2024-01-15 09:00',
        duration: '3h 45m'
      },
      {
        id: '2',
        name: 'Scraping Outils Industriels - Made-in-China',
        target: 'made-in-china',
        status: 'completed',
        progress: 100,
        totalProducts: 4500,
        scrapedProducts: 4500,
        startTime: '2024-01-15 06:00',
        endTime: '2024-01-15 10:30',
        duration: '4h 30m'
      }
    ];

    const mockProducts: IndustrialProduct[] = [
      {
        id: '1',
        name: 'Machine CNC 5 Axes',
        category: 'machinery',
        subcategory: 'CNC Machines',
        manufacturer: 'Haas Automation',
        model: 'VF-5/50',
        specifications: {
          'Table Size': '1270 x 660 mm',
          'X Travel': '1270 mm',
          'Y Travel': '660 mm',
          'Z Travel': '660 mm',
          'Spindle Speed': '8100 RPM',
          'Power': '30 HP'
        },
        price: { min: 45000, max: 55000, currency: 'USD' },
        moq: 1,
        leadTime: '4-6 weeks',
        certifications: ['CE', 'ISO 9001', 'UL'],
        origin: 'USA',
        platform: 'alibaba',
        scrapedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Tour CNC Horizontal',
        category: 'machinery',
        subcategory: 'Lathes',
        manufacturer: 'DMG MORI',
        model: 'NLX 2500',
        specifications: {
          'Swing': '500 mm',
          'Length': '1000 mm',
          'Spindle Speed': '4000 RPM',
          'Power': '22 kW',
          'Weight': '3500 kg'
        },
        price: { min: 35000, max: 42000, currency: 'EUR' },
        moq: 1,
        leadTime: '8-10 weeks',
        certifications: ['CE', 'ISO 14001'],
        origin: 'Germany',
        platform: 'made-in-china',
        scrapedAt: new Date().toISOString()
      }
    ];

    setSessions(mockSessions);
    setProducts(mockProducts);
  };

  const startSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'running' as const, progress: 0, startTime: new Date().toISOString() }
        : session
    ));

    // Simuler le progrès
    const progressInterval = setInterval(() => {
      setSessions(prev => prev.map(session => {
        if (session.id === sessionId && session.status === 'running') {
          const newProgress = Math.min(session.progress + Math.random() * 8, 100);
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return { 
              ...session, 
              status: 'completed' as const, 
              progress: 100, 
              endTime: new Date().toISOString(),
              duration: '4h 15m'
            };
          }
          return { ...session, progress: newProgress };
        }
        return session;
      }));
    }, 1500);
  };

  const stopSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'idle' as const }
        : session
    ));
  };

  const createNewSession = () => {
    if (!newSessionName.trim()) return;

    const newSession: ScrapingSession = {
      id: Date.now().toString(),
      name: newSessionName,
      target: selectedTarget,
      status: 'idle',
      progress: 0,
      totalProducts: Math.floor(Math.random() * 10000) + 2000,
      scrapedProducts: 0,
      startTime: new Date().toISOString()
    };

    setSessions(prev => [...prev, newSession]);
    setNewSessionName('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return 'En cours';
      case 'completed': return 'Terminé';
      case 'error': return 'Erreur';
      default: return 'En attente';
    }
  };

  const exportProducts = () => {
    if (products.length === 0) return;

    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `industrial-products-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl text-gray-700 font-semibold">Chargement du scraping industriel...</h2>
          <p className="text-gray-500">Initialisation des composants de collecte industrielle</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Factory className="w-12 h-12 mr-4" />
              <h1 className="text-4xl font-bold">Scraping Produits Industriels</h1>
            </div>
            <p className="text-xl opacity-90">
              Collecte de données spécialisée pour les produits et équipements industriels
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Cibles de scraping */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Plateformes Industrielles Supportées
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {targets.map((target) => (
              <Card key={target.value} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${target.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl group-hover:scale-110 transition-transform`}>
                    <target.icon />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">{target.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Création de nouvelle session */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Settings className="w-6 h-6 mr-3" />
              Créer une nouvelle session de scraping
            </CardTitle>
            <CardDescription>
              Configurez et lancez une session de collecte de produits industriels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la session
                </label>
                <Input
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  placeholder="Ex: Scraping Machines CNC - Alibaba"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plateforme cible
                </label>
                <select
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {targets.map((target) => (
                    <option key={target.value} value={target.value}>
                      {target.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <Button onClick={createNewSession} className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Créer la session
            </Button>
          </CardContent>
        </Card>

        {/* Sessions de scraping */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Sessions de Scraping</h2>
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(session.status)}`}></div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{session.name}</h3>
                        <p className="text-sm text-gray-600">
                          {targets.find(t => t.value === session.target)?.label} • {session.totalProducts} produits
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Démarré le</p>
                      <p className="text-sm font-medium">{session.startTime}</p>
                      {session.duration && (
                        <p className="text-xs text-gray-500">Durée: {session.duration}</p>
                      )}
                    </div>
                  </div>

                  {/* Barre de progression */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progression</span>
                      <span>{Math.round(session.progress)}% ({session.scrapedProducts}/{session.totalProducts})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          session.status === 'completed' ? 'bg-green-500' :
                          session.status === 'error' ? 'bg-red-500' :
                          session.status === 'running' ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${session.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {getStatusText(session.status)}
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      {session.status === 'idle' && (
                        <Button size="sm" onClick={() => startSession(session.id)}>
                          <Play className="w-4 h-4 mr-1" />
                          Démarrer
                        </Button>
                      )}
                      
                      {session.status === 'running' && (
                        <Button size="sm" variant="outline" onClick={() => stopSession(session.id)}>
                          <Pause className="w-4 h-4 mr-1" />
                          Arrêter
                        </Button>
                      )}
                      
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        Détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Produits collectés */}
        {products.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Produits Collectés</h2>
              <Button onClick={exportProducts} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter ({products.length})
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {product.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {product.manufacturer} • {product.model}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Prix:</span> {product.price.min}-{product.price.max} {product.price.currency}
                          </div>
                          <div>
                            <span className="font-medium">MOQ:</span> {product.moq}
                          </div>
                          <div>
                            <span className="font-medium">Délai:</span> {product.leadTime}
                          </div>
                          <div>
                            <span className="font-medium">Origine:</span> {product.origin}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {product.platform}
                          </Badge>
                          {product.certifications.map((cert, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Prêt pour le scraping industriel ?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Collectez des données détaillées sur les produits industriels
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                <Factory className="w-5 h-5 mr-2" />
                Commencer maintenant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 