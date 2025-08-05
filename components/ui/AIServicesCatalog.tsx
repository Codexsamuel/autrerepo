"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Zap, Crown, Star, Euro, Users, Clock } from 'lucide-react';

interface AIService {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'image' | 'analysis' | 'scraping' | 'transformation';
  price: number;
  credits: number;
  features: string[];
  apiEndpoint: string;
  status: 'active' | 'beta' | 'premium';
}

interface ServicesStats {
  totalServices: number;
  activeServices: number;
  premiumServices: number;
  totalRevenue: number;
  categories: Record<string, number>;
}

export function AIServicesCatalog() {
  const [services, setServices] = useState<AIService[]>([]);
  const [stats, setStats] = useState<ServicesStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const [catalogResponse, statsResponse] = await Promise.all([
        fetch('/api/services/ai?action=catalog'),
        fetch('/api/services/ai?action=stats')
      ]);

      const catalogData = await catalogResponse.json();
      const statsData = await statsResponse.json();

      if (catalogData.success) {
        setServices(catalogData.data.services);
      }
      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (error) {
      console.error('Erreur chargement services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'content': return '📝';
      case 'image': return '🎨';
      case 'analysis': return '📊';
      case 'scraping': return '🔍';
      case 'transformation': return '🔄';
      default: return '⚡';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'premium':
        return <Badge variant="default" className="bg-gradient-to-r from-yellow-400 to-orange-500"><Crown className="w-3 h-3 mr-1" />Premium</Badge>;
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><Zap className="w-3 h-3 mr-1" />Actif</Badge>;
      case 'beta':
        return <Badge variant="outline" className="border-blue-300 text-blue-600"><Star className="w-3 h-3 mr-1" />Beta</Badge>;
      default:
        return <Badge variant="outline">Standard</Badge>;
    }
  };

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'Tous les Services', icon: '🚀' },
    { id: 'content', name: 'Contenu', icon: '📝' },
    { id: 'image', name: 'Images', icon: '🎨' },
    { id: 'analysis', name: 'Analyse', icon: '📊' },
    { id: 'scraping', name: 'Scraping', icon: '🔍' },
    { id: 'transformation', name: 'Transformation', icon: '🔄' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header avec statistiques */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          🚀 Services IA Avancés
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Catalogue complet des services IA monétisables
        </p>
        
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalServices}</div>
                <div className="text-sm text-gray-600">Services Totaux</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.activeServices}</div>
                <div className="text-sm text-gray-600">Services Actifs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.premiumServices}</div>
                <div className="text-sm text-gray-600">Services Premium</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.totalRevenue}€</div>
                <div className="text-sm text-gray-600">Revenu Total</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            <span>{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>

      {/* Grille des services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(service.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Prix et crédits */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Euro className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-lg">{service.price}€</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-600">{service.credits} crédits</span>
                </div>
              </div>

              {/* Fonctionnalités */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Fonctionnalités :</h4>
                <ul className="space-y-1">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-sm text-blue-600">
                      +{service.features.length - 3} autres fonctionnalités
                    </li>
                  )}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Commander
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Informations supplémentaires */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">💡 Comment utiliser nos services IA ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl mb-2">1️⃣</div>
            <h4 className="font-semibold">Choisissez votre service</h4>
            <p className="text-sm text-gray-600">Parcourez notre catalogue et sélectionnez le service adapté à vos besoins</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">2️⃣</div>
            <h4 className="font-semibold">Configurez vos paramètres</h4>
            <p className="text-sm text-gray-600">Définissez vos besoins spécifiques et personnalisez le service</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">3️⃣</div>
            <h4 className="font-semibold">Recevez vos résultats</h4>
            <p className="text-sm text-gray-600">Obtenez des résultats professionnels en quelques secondes</p>
          </div>
        </div>
      </div>
    </div>
  );
} 