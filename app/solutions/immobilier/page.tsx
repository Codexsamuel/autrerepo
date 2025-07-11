'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { BarChart3, Building, Calendar, DollarSign, Edit, Eye, FileText, Filter, Home, MapPin, Plus, Star, Trash2, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Property {
  id: string;
  title: string;
  type: 'appartement' | 'maison' | 'bureau' | 'terrain';
  status: 'disponible' | 'loué' | 'vendu' | 'en_negociation';
  address: string;
  price: number;
  rent: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  description: string;
  features: string[];
  images: string[];
  createdAt: string;
  views: number;
  inquiries: number;
  rating: number;
}

export default function ImmobilierPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const mockProperties: Property[] = [
      {
        id: '1',
        title: 'Appartement moderne 3 pièces',
        type: 'appartement',
        status: 'disponible',
        address: '123 Rue de la Paix, Paris 8ème',
        price: 450000,
        rent: 2500,
        surface: 85,
        rooms: 4,
        bedrooms: 2,
        description: 'Magnifique appartement rénové avec vue dégagée, proche des transports.',
        features: ['Balcon', 'Ascenseur', 'Cave', 'Parking'],
        images: ['/images/properties/apt1.jpg'],
        createdAt: '2024-01-15',
        views: 156,
        inquiries: 8,
        rating: 4.5
      },
      {
        id: '2',
        title: 'Maison familiale avec jardin',
        type: 'maison',
        status: 'loué',
        address: '45 Avenue des Champs, Lyon',
        price: 750000,
        rent: 3200,
        surface: 180,
        rooms: 6,
        bedrooms: 4,
        description: 'Belle maison avec jardin paysager et garage double.',
        features: ['Jardin', 'Garage', 'Terrasse', 'Cheminée'],
        images: ['/images/properties/house1.jpg'],
        createdAt: '2024-01-10',
        views: 89,
        inquiries: 12,
        rating: 4.8
      },
      {
        id: '3',
        title: 'Bureau commercial 200m²',
        type: 'bureau',
        status: 'disponible',
        address: '78 Boulevard Central, Marseille',
        price: 850000,
        rent: 4500,
        surface: 200,
        rooms: 8,
        bedrooms: 0,
        description: 'Espace de bureau moderne avec open space et salles de réunion.',
        features: ['Open Space', 'Salles de réunion', 'Parking', 'Sécurité'],
        images: ['/images/properties/office1.jpg'],
        createdAt: '2024-01-20',
        views: 67,
        inquiries: 5,
        rating: 4.2
      }
    ];
    setProperties(mockProperties);
  }, []);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesStatus = activeTab === 'all' || property.status === activeTab;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = (propertyId: string) => {
    setProperties(properties.filter(p => p.id !== propertyId));
    toast({
      title: "Bien supprimé",
      description: "Le bien immobilier a été supprimé avec succès.",
    });
  };

  // Statistiques immobilières (mock)
  const stats = [
    { label: 'Biens gérés', value: properties.length, icon: Home },
    { label: 'Revenus mensuels', value: `${properties.reduce((acc, p) => acc + p.rent, 0).toLocaleString()}€`, icon: DollarSign },
    { label: 'Visites ce mois', value: properties.reduce((acc, p) => acc + p.views, 0), icon: Eye },
    { label: 'Taux d\'occupation', value: '78%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Solutions Immobilières</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                {properties.length} biens gérés
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <BarChart3 className="w-5 h-5" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un bien
              </Button>
            </div>
          </div>
        </div>
      </div>

    <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar gauche - Filtres */}
          <div className="lg:col-span-1 space-y-8">
            {/* Filtres par type */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Type de bien</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant={filterType === 'all' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterType('all')}
                  >
                    Tous les types
                  </Button>
                  <Button 
                    variant={filterType === 'appartement' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterType('appartement')}
                  >
                    <Building className="w-4 h-4 mr-2" />
                    Appartements
                  </Button>
                  <Button 
                    variant={filterType === 'maison' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterType('maison')}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Maisons
                  </Button>
                  <Button 
                    variant={filterType === 'bureau' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterType('bureau')}
                  >
                    <Building className="w-4 h-4 mr-2" />
                    Bureaux
                  </Button>
                  <Button 
                    variant={filterType === 'terrain' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterType('terrain')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Terrains
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Visites programmées
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Contrats en cours
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Revenus mensuels
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <div className="flex items-center mb-6">
              <Input
                placeholder="Rechercher un bien, une adresse..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mr-4"
              />
              <select
                value={activeTab}
                onChange={e => setActiveTab(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <option value="all">Tous les statuts</option>
                <option value="disponible">Disponible</option>
                <option value="loué">Loué</option>
                <option value="vendu">Vendu</option>
                <option value="en_negociation">En négociation</option>
              </select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="disponible">Disponible</TabsTrigger>
                <TabsTrigger value="loué">Loué</TabsTrigger>
                <TabsTrigger value="vendu">Vendu</TabsTrigger>
                <TabsTrigger value="en_negociation">Négociation</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {filteredProperties.map(property => (
                  <Card key={property.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Home className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{property.title}</h3>
                            <p className="text-gray-600">{property.address}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.surface}m²
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {property.rooms} pièces
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {property.price.toLocaleString()}€
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{property.type}</Badge>
                          <Badge className={
                            property.status === 'disponible' ? 'bg-green-100 text-green-800' :
                            property.status === 'loué' ? 'bg-blue-100 text-blue-800' :
                            property.status === 'vendu' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {property.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{property.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {property.features.map(feature => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{property.views} vues</span>
                          <span>{property.inquiries} demandes</span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {property.rating}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="disponible" className="space-y-6">
                {filteredProperties.filter(p => p.status === 'disponible').map(property => (
                  <Card key={property.id} className="border-l-4 border-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Home className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{property.title}</h3>
                            <p className="text-gray-600">{property.address}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.surface}m²
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {property.rooms} pièces
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {property.price.toLocaleString()}€
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{property.type}</Badge>
                          <Badge className="bg-green-100 text-green-800">Disponible</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{property.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {property.features.map(feature => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{property.views} vues</span>
                          <span>{property.inquiries} demandes</span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {property.rating}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="loué" className="space-y-6">
                {filteredProperties.filter(p => p.status === 'loué').map(property => (
                  <Card key={property.id} className="border-l-4 border-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Home className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{property.title}</h3>
                            <p className="text-gray-600">{property.address}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.surface}m²
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {property.rooms} pièces
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {property.rent}€/mois
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{property.type}</Badge>
                          <Badge className="bg-blue-100 text-blue-800">Loué</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{property.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {property.features.map(feature => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{property.views} vues</span>
                          <span>{property.inquiries} demandes</span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {property.rating}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="vendu" className="space-y-6">
                {filteredProperties.filter(p => p.status === 'vendu').map(property => (
                  <Card key={property.id} className="border-l-4 border-purple-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Home className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{property.title}</h3>
                            <p className="text-gray-600">{property.address}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.surface}m²
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {property.rooms} pièces
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {property.price.toLocaleString()}€
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{property.type}</Badge>
                          <Badge className="bg-purple-100 text-purple-800">Vendu</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{property.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {property.features.map(feature => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{property.views} vues</span>
                          <span>{property.inquiries} demandes</span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {property.rating}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="en_negociation" className="space-y-6">
                {filteredProperties.filter(p => p.status === 'en_negociation').map(property => (
                  <Card key={property.id} className="border-l-4 border-yellow-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Home className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{property.title}</h3>
                            <p className="text-gray-600">{property.address}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.surface}m²
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {property.rooms} pièces
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {property.price.toLocaleString()}€
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{property.type}</Badge>
                          <Badge className="bg-yellow-100 text-yellow-800">En négociation</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{property.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {property.features.map(feature => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{property.views} vues</span>
                          <span>{property.inquiries} demandes</span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {property.rating}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}