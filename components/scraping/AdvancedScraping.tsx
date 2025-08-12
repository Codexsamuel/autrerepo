'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Database,
    Globe,
    Play,
    Pause,
    RotateCcw,
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
    Activity
} from "lucide-react";

interface ScrapingJob {
  id: string;
  name: string;
  platform: string;
  category: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  totalItems: number;
  scrapedItems: number;
  startTime: string;
  endTime?: string;
  duration?: string;
  error?: string;
}

interface ScrapingStats {
  totalJobs: number;
  runningJobs: number;
  completedJobs: number;
  failedJobs: number;
  totalItemsScraped: number;
  averageSpeed: string;
  successRate: number;
}

export default function AdvancedScraping() {
  const [jobs, setJobs] = useState<ScrapingJob[]>([]);
  const [stats, setStats] = useState<ScrapingStats>({
    totalJobs: 0,
    runningJobs: 0,
    completedJobs: 0,
    failedJobs: 0,
    totalItemsScraped: 0,
    averageSpeed: '0 items/min',
    successRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [newJobName, setNewJobName] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Simuler le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      loadMockData();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const platforms = [
    { value: 'all', label: 'Toutes les plateformes', icon: Globe },
    { value: 'alibaba', label: 'Alibaba 1688', icon: TrendingUp },
    { value: 'amazon', label: 'Amazon', icon: Globe },
    { value: 'ebay', label: 'eBay', icon: Activity },
    { value: 'shein', label: 'Shein', icon: Zap },
    { value: 'cdiscount', label: 'Cdiscount', icon: ShoppingCart }
  ];

  const categories = [
    { value: 'all', label: 'Toutes les catégories', icon: Target },
    { value: 'electronics', label: 'Électronique', icon: BarChart3 },
    { value: 'clothing', label: 'Vêtements', icon: TrendingUp },
    { value: 'home', label: 'Maison & Jardin', icon: Shield },
    { value: 'automotive', label: 'Automobile', icon: Activity },
    { value: 'beauty', label: 'Beauté & Santé', icon: Zap }
  ];

  const loadMockData = () => {
    const mockJobs: ScrapingJob[] = [
      {
        id: '1',
        name: 'Scraping Alibaba - Électronique',
        platform: 'alibaba',
        category: 'electronics',
        status: 'running',
        progress: 65,
        totalItems: 5000,
        scrapedItems: 3250,
        startTime: '2024-01-15 10:00',
        duration: '2h 15m'
      },
      {
        id: '2',
        name: 'Scraping Amazon - Vêtements',
        platform: 'amazon',
        category: 'clothing',
        status: 'completed',
        progress: 100,
        totalItems: 2500,
        scrapedItems: 2500,
        startTime: '2024-01-15 08:00',
        endTime: '2024-01-15 11:30',
        duration: '3h 30m'
      },
      {
        id: '3',
        name: 'Scraping eBay - Maison',
        platform: 'ebay',
        category: 'home',
        status: 'error',
        progress: 45,
        totalItems: 3000,
        scrapedItems: 1350,
        startTime: '2024-01-15 09:00',
        error: 'Erreur de connexion'
      }
    ];

    setJobs(mockJobs);
    updateStats(mockJobs);
  };

  const updateStats = (jobsList: ScrapingJob[]) => {
    const totalJobs = jobsList.length;
    const runningJobs = jobsList.filter(job => job.status === 'running').length;
    const completedJobs = jobsList.filter(job => job.status === 'completed').length;
    const failedJobs = jobsList.filter(job => job.status === 'error').length;
    const totalItemsScraped = jobsList.reduce((sum, job) => sum + job.scrapedItems, 0);
    const successRate = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

    setStats({
      totalJobs,
      runningJobs,
      completedJobs,
      failedJobs,
      totalItemsScraped,
      averageSpeed: '150 items/min',
      successRate
    });
  };

  const startJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'running' as const, progress: 0, startTime: new Date().toISOString() }
        : job
    ));

    // Simuler le progrès
    const progressInterval = setInterval(() => {
      setJobs(prev => prev.map(job => {
        if (job.id === jobId && job.status === 'running') {
          const newProgress = Math.min(job.progress + Math.random() * 10, 100);
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return { 
              ...job, 
              status: 'completed' as const, 
              progress: 100, 
              endTime: new Date().toISOString(),
              duration: '2h 30m'
            };
          }
          return { ...job, progress: newProgress };
        }
        return job;
      }));
    }, 1000);
  };

  const stopJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'idle' as const }
        : job
    ));
  };

  const createNewJob = () => {
    if (!newJobName.trim()) return;

    const newJob: ScrapingJob = {
      id: Date.now().toString(),
      name: newJobName,
      platform: selectedPlatform,
      category: selectedCategory,
      status: 'idle',
      progress: 0,
      totalItems: Math.floor(Math.random() * 5000) + 1000,
      scrapedItems: 0,
      startTime: new Date().toISOString()
    };

    setJobs(prev => [...prev, newJob]);
    setNewJobName('');
    updateStats([...jobs, newJob]);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl text-gray-700 font-semibold">Chargement du scraping avancé...</h2>
          <p className="text-gray-500">Initialisation des composants de collecte avancée</p>
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
              <Database className="w-12 h-12 mr-4" />
              <h1 className="text-4xl font-bold">Scraping Avancé</h1>
            </div>
            <p className="text-xl opacity-90">
              Système de collecte de données avancé avec monitoring en temps réel
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <Database className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalJobs}</h3>
              <p className="text-gray-600">Total des jobs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <Activity className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.runningJobs}</h3>
              <p className="text-gray-600">Jobs en cours</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.completedJobs}</h3>
              <p className="text-gray-600">Jobs terminés</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.failedJobs}</h3>
              <p className="text-gray-600">Jobs échoués</p>
            </CardContent>
          </Card>
        </div>

        {/* Création de nouveau job */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Settings className="w-6 h-6 mr-3" />
              Créer un nouveau job de scraping
            </CardTitle>
            <CardDescription>
              Configurez et lancez un nouveau processus de collecte de données
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du job
                </label>
                <Input
                  value={newJobName}
                  onChange={(e) => setNewJobName(e.target.value)}
                  placeholder="Ex: Scraping Alibaba - Électronique"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plateforme
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {platforms.map((platform) => (
                    <option key={platform.value} value={platform.value}>
                      {platform.label}
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
            
            <Button onClick={createNewJob} className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Créer le job
            </Button>
          </CardContent>
        </Card>

        {/* Liste des jobs */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(job.status)}`}></div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{job.name}</h3>
                      <p className="text-sm text-gray-600">
                        {job.platform} • {job.category} • {job.totalItems} items
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Démarré le</p>
                    <p className="text-sm font-medium">{job.startTime}</p>
                    {job.duration && (
                      <p className="text-xs text-gray-500">Durée: {job.duration}</p>
                    )}
                  </div>
                </div>

                {/* Barre de progression */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progression</span>
                    <span>{Math.round(job.progress)}% ({job.scrapedItems}/{job.totalItems})</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        job.status === 'completed' ? 'bg-green-500' :
                        job.status === 'error' ? 'bg-red-500' :
                        job.status === 'running' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>

                {/* Actions et statut */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {getStatusText(job.status)}
                    </Badge>
                    {job.error && (
                      <Badge variant="destructive" className="text-xs">
                        {job.error}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {job.status === 'idle' && (
                      <Button size="sm" onClick={() => startJob(job.id)}>
                        <Play className="w-4 h-4 mr-1" />
                        Démarrer
                      </Button>
                    )}
                    
                    {job.status === 'running' && (
                      <Button size="sm" variant="outline" onClick={() => stopJob(job.id)}>
                        <Pause className="w-4 h-4 mr-1" />
                        Arrêter
                      </Button>
                    )}
                    
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                    
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Exporter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Prêt pour le scraping avancé ?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Démarrez vos premiers jobs de collecte de données
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                <Play className="w-5 h-5 mr-2" />
                Commencer maintenant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 