"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Euro, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Filter,
  Home,
  MapPin
} from 'lucide-react';
import { Property, getAvailableProperties } from '@/lib/database/real-estate';

interface AveragePriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  averagePrice: number;
}

export default function AveragePriceModal({ isOpen, onClose, averagePrice }: AveragePriceModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'appartement' | 'maison' | 'terrain' | 'bureau' | 'commerce'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const properties = getAvailableProperties();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'appartement': return '🏢';
      case 'maison': return '🏠';
      case 'terrain': return '🌱';
      case 'bureau': return '🏢';
      case 'commerce': return '🏪';
      default: return '🏠';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponible': return 'bg-green-100 text-green-800';
      case 'vendu': return 'bg-red-100 text-red-800';
      case 'en_negociation': return 'bg-yellow-100 text-yellow-800';
      case 'reserve': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterProperties = () => {
    let filtered = properties;

    // Filtre par type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(prop => prop.type === selectedFilter);
    }

    // Filtre par fourchette de prix
    if (priceRange !== 'all') {
      const avgPrice = averagePrice;
      switch (priceRange) {
        case 'low':
          filtered = filtered.filter(prop => prop.price < avgPrice * 0.7);
          break;
        case 'medium':
          filtered = filtered.filter(prop => prop.price >= avgPrice * 0.7 && prop.price <= avgPrice * 1.3);
          break;
        case 'high':
          filtered = filtered.filter(prop => prop.price > avgPrice * 1.3);
          break;
      }
    }

    return filtered;
  };

  const filteredProperties = filterProperties();

  const calculateStats = () => {
    const prices = properties.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const medianPrice = prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)];

    return { minPrice, maxPrice, medianPrice };
  };

  const stats = calculateStats();

  const getPriceRangeLabel = (price: number) => {
    const avgPrice = averagePrice;
    if (price < avgPrice * 0.7) return 'Bas';
    if (price > avgPrice * 1.3) return 'Élevé';
    return 'Moyen';
  };

  const getPriceRangeColor = (price: number) => {
    const avgPrice = averagePrice;
    if (price < avgPrice * 0.7) return 'bg-green-100 text-green-800';
    if (price > avgPrice * 1.3) return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Euro className="w-5 h-5" />
            Prix Moyen - {formatPrice(averagePrice)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Statistiques de prix */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Prix moyen</p>
                    <p className="text-2xl font-bold text-blue-600">{formatPrice(averagePrice)}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Prix médian</p>
                    <p className="text-2xl font-bold text-green-600">{formatPrice(stats.medianPrice)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Prix minimum</p>
                    <p className="text-2xl font-bold text-purple-600">{formatPrice(stats.minPrice)}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Prix maximum</p>
                    <p className="text-2xl font-bold text-orange-600">{formatPrice(stats.maxPrice)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Type de bien</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={selectedFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter('all')}
                    >
                      Tous
                    </Button>
                    <Button 
                      variant={selectedFilter === 'appartement' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter('appartement')}
                    >
                      Appartements
                    </Button>
                    <Button 
                      variant={selectedFilter === 'maison' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter('maison')}
                    >
                      Maisons
                    </Button>
                    <Button 
                      variant={selectedFilter === 'terrain' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter('terrain')}
                    >
                      Terrains
                    </Button>
                    <Button 
                      variant={selectedFilter === 'bureau' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter('bureau')}
                    >
                      Bureaux
                    </Button>
                    <Button 
                      variant={selectedFilter === 'commerce' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter('commerce')}
                    >
                      Commerces
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Fourchette de prix</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={priceRange === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPriceRange('all')}
                    >
                      Tous
                    </Button>
                    <Button 
                      variant={priceRange === 'low' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPriceRange('low')}
                    >
                      Bas
                    </Button>
                    <Button 
                      variant={priceRange === 'medium' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPriceRange('medium')}
                    >
                      Moyen
                    </Button>
                    <Button 
                      variant={priceRange === 'high' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPriceRange('high')}
                    >
                      Élevé
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des biens filtrés */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Biens disponibles ({filteredProperties.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{getPropertyTypeIcon(property.type)}</span>
                      <div>
                        <p className="font-semibold">{property.title}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {property.location.city}, {property.location.neighborhood}
                        </p>
                        <p className="text-sm text-gray-600">
                          {property.surface}m² • {property.rooms} pièces
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-green-600">{formatPrice(property.price)}</p>
                      <Badge className={getPriceRangeColor(property.price)}>
                        {getPriceRangeLabel(property.price)}
                      </Badge>
                      <Badge className={getStatusColor(property.status)}>
                        {property.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {filteredProperties.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    Aucun bien ne correspond aux critères sélectionnés
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Répartition par type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Répartition par type de bien
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['appartement', 'maison', 'terrain', 'bureau', 'commerce'].map((type) => {
                  const typeProperties = properties.filter(p => p.type === type);
                  const typeAverage = typeProperties.length > 0 
                    ? typeProperties.reduce((sum, p) => sum + p.price, 0) / typeProperties.length 
                    : 0;
                  
                  return (
                    <div key={type} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{getPropertyTypeIcon(type)}</span>
                        <span className="font-semibold capitalize">{type}s</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{formatPrice(typeAverage)}</p>
                      <p className="text-sm text-gray-600">{typeProperties.length} biens</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
} 