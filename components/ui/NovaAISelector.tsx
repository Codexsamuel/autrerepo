"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NOVA_AI_SERVICES, NovaAIService, getRecommendedServices, getServicesStats, searchServices } from '@/lib/services/nova-ai-catalog';
import { Clock, Crown, Euro, Filter, Search, Sparkles, Star, Target, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NovaAISelectorProps {
  onServiceSelect?: (service: NovaAIService) => void;
}

export function NovaAISelector({ onServiceSelect }: NovaAISelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUseCase, setSelectedUseCase] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [services, setServices] = useState<NovaAIService[]>(NOVA_AI_SERVICES);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStats(getServicesStats());
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchQuery, selectedCategory, selectedUseCase, selectedDifficulty]);

  const filterServices = () => {
    let filtered = NOVA_AI_SERVICES;

    // Recherche textuelle
    if (searchQuery.trim()) {
      filtered = searchServices(searchQuery);
    }

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filtre par cas d'usage (basé sur les features)
    if (selectedUseCase !== 'all') {
      filtered = filtered.filter(service => 
        service.features.some(feature => feature.toLowerCase().includes(selectedUseCase.toLowerCase()))
      );
    }

    // Filtre par difficulté (basé sur le prix comme indicateur)
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(service => {
        const price = service.price;
        switch (selectedDifficulty) {
          case 'easy': return price <= 10;
          case 'medium': return price > 10 && price <= 20;
          case 'advanced': return price > 20;
          default: return true;
        }
      });
    }

    setServices(filtered);
  };

  const getStatusBadge = (isProduction: boolean | undefined) => {
    if (isProduction) {
      return <Badge variant="secondary" className="bg-green-100 text-green-800"><Zap className="w-3 h-3 mr-1" />Production</Badge>;
    } else {
      return <Badge variant="outline" className="border-blue-300 text-blue-600"><Star className="w-3 h-3 mr-1" />Beta</Badge>;
    }
  };

  const getDifficultyBadge = (price: number) => {
    if (price <= 10) {
      return <Badge variant="outline" className="border-green-300 text-green-600">Facile</Badge>;
    } else if (price <= 20) {
      return <Badge variant="outline" className="border-yellow-300 text-yellow-600">Moyen</Badge>;
    } else {
      return <Badge variant="outline" className="border-red-300 text-red-600">Avancé</Badge>;
    }
  };

  const categories = [
    { id: 'all', name: 'Toutes les Catégories', icon: '🚀' },
    { id: 'text', name: 'Traitement de Texte', icon: '📝' },
    { id: 'image', name: 'Génération d\'Images', icon: '🎨' },
    { id: 'voice', name: 'Audio & Voix', icon: '🎙️' },
    { id: 'chatbot', name: 'IA Conversationnelle', icon: '🤖' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛍️' },
    { id: 'automation', name: 'Automatisation', icon: '⚙️' },
    { id: 'analysis', name: 'Analyse & Vision', icon: '🔬' },
    { id: 'transformation', name: 'Transformation', icon: '🔄' }
  ];

  const useCases = [
    { id: 'all', name: 'Tous les Cas d\'Usage' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'e-commerce', name: 'E-commerce' },
    { id: 'education', name: 'Éducation' },
    { id: 'business', name: 'Business' },
    { id: 'research', name: 'Recherche' },
    { id: 'entertainment', name: 'Divertissement' },
    { id: 'accessibility', name: 'Accessibilité' },
    { id: 'security', name: 'Sécurité' }
  ];

  const difficulties = [
    { id: 'all', name: 'Toutes Difficultés' },
    { id: 'easy', name: 'Facile' },
    { id: 'medium', name: 'Moyen' },
    { id: 'advanced', name: 'Avancé' }
  ];

  const handleServiceSelect = (service: NovaAIService) => {
    if (onServiceSelect) {
      onServiceSelect(service);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header avec statistiques */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          🧠 NovaIA - Centre d'Intelligence Artificielle
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Trouvez le service IA parfait pour résoudre vos problèmes
        </p>
        
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalServices}</div>
                <div className="text-sm text-gray-600">Services IA</div>
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
                <div className="text-2xl font-bold text-purple-600">{stats.averagePrice}€</div>
                <div className="text-sm text-gray-600">Prix Moyen</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Barre de recherche et filtres */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Recherchez un service IA (ex: génération contenu, analyse image, chatbot...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Recommandations IA
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  <span className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    {category.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedUseCase} onValueChange={setSelectedUseCase}>
            <SelectTrigger>
              <SelectValue placeholder="Cas d'usage" />
            </SelectTrigger>
            <SelectContent>
              {useCases.map(useCase => (
                <SelectItem key={useCase.id} value={useCase.id}>
                  {useCase.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulté" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Résultats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {services.length} service{services.length > 1 ? 's' : ''} trouvé{services.length > 1 ? 's' : ''}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            Filtres actifs
          </div>
        </div>

        {services.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">Aucun service trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos critères de recherche ou vos filtres
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedUseCase('all');
                  setSelectedDifficulty('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <Card key={service.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={() => handleServiceSelect(service)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">
                        {service.category === 'conversation' && '💬'}
                        {service.category === 'images' && '🎨'}
                        {service.category === 'voice' && '🎙️'}
                        {service.category === 'business' && '💼'}
                        {service.category === 'marketing' && '📢'}
                        {service.category === 'ecommerce' && '🛍️'}
                        {service.category === 'analysis' && '📊'}
                        {service.category === 'automation' && '⚙️'}
                      </span>
                      <div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {service.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {service.category}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(service.isProduction)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {service.description}
                  </p>

                  {/* Métadonnées */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">{service.price}€</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{service.executionTime}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {getDifficultyBadge(service.price)}
                    <Badge variant="outline" className="text-xs">
                      {service.accuracy} précision
                    </Badge>
                  </div>

                  {/* Fonctionnalités */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Fonctionnalités :</h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-xs text-blue-600">
                          +{service.features.length - 3} autres fonctionnalités
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Cas d'usage */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Cas d'usage :</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {service.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">
                      <Target className="w-4 h-4 mr-2" />
                      Choisir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Section recommandations */}
      {searchQuery && services.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">💡 Recommandations pour "{searchQuery}"</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getRecommendedServices(searchQuery).slice(0, 4).map(service => (
              <Card key={service.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleServiceSelect(service)}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {service.category === 'conversation' && '💬'}
                      {service.category === 'images' && '🎨'}
                      {service.category === 'voice' && '🎙️'}
                      {service.category === 'business' && '💼'}
                      {service.category === 'marketing' && '📢'}
                      {service.category === 'ecommerce' && '🛍️'}
                      {service.category === 'analysis' && '📊'}
                      {service.category === 'automation' && '⚙️'}
                    </span>
                    <div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.price}€</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 