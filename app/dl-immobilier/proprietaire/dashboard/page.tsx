import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    BarChart3,
    Building,
    Camera,
    DollarSign,
    Edit,
    Eye,
    Filter,
    Home,
    MapPin,
    Plus,
    Search,
    Settings,
    Star,
    TrendingUp,
    Users
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Property {
  id: string;
  title: string;
  type: 'appartement' | 'maison' | 'bureau' | 'terrain';
  address: string;
  city: string;
  price: number;
  status: 'disponible' | 'loué' | 'maintenance' | 'réservé';
  bedrooms?: number;
  surface: number;
  furnished: boolean;
  rating: number;
  views: number;
  inquiries: number;
  lastUpdated: string;
  images: string[];
  features: string[];
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  startDate: string;
  endDate: string;
  rent: number;
  status: 'actif' | 'en retard' | 'terminé';
  rating: number;
}

export default function ProprietaireDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const properties: Property[] = [
    {
      id: '1',
      title: 'Appartement T3 moderne',
      type: 'appartement',
      address: 'Rue de la Paix, Akwa',
      city: 'Douala',
      price: 150000,
      status: 'loué',
      bedrooms: 3,
      surface: 85,
      furnished: true,
      rating: 4.8,
      views: 245,
      inquiries: 12,
      lastUpdated: '2024-01-15',
      images: ['/images/property1.jpg'],
      features: ['Climatisation', 'Balcon', 'Ascenseur', 'Sécurité']
    },
    {
      id: '2',
      title: 'Villa de standing',
      type: 'maison',
      address: 'Quartier résidentiel, Bonanjo',
      city: 'Douala',
      price: 450000,
      status: 'disponible',
      bedrooms: 4,
      surface: 200,
      furnished: false,
      rating: 4.9,
      views: 189,
      inquiries: 8,
      lastUpdated: '2024-01-10',
      images: ['/images/property2.jpg'],
      features: ['Jardin', 'Garage', 'Piscine', 'Sécurité 24h']
    },
    {
      id: '3',
      title: 'Bureau équipé',
      type: 'bureau',
      address: 'Centre-ville, Akwa',
      city: 'Douala',
      price: 200000,
      status: 'disponible',
      surface: 120,
      furnished: true,
      rating: 4.7,
      views: 156,
      inquiries: 6,
      lastUpdated: '2024-01-12',
      images: ['/images/property3.jpg'],
      features: ['Équipement complet', 'Parking', 'Sécurité', 'Fibre optique']
    }
  ];

  const tenants: Tenant[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '+237 XXX XXX XXX',
      property: 'Appartement T3 moderne',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      rent: 150000,
      status: 'actif',
      rating: 4.8
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponible': return 'bg-green-100 text-green-800';
      case 'loué': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'réservé': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'disponible': return 'Disponible';
      case 'loué': return 'Loué';
      case 'maintenance': return 'Maintenance';
      case 'réservé': return 'Réservé';
      default: return status;
    }
  };

  const totalRevenue = properties.reduce((sum, prop) => {
    return sum + (prop.status === 'loué' ? prop.price : 0);
  }, 0);

  const availableProperties = properties.filter(p => p.status === 'disponible').length;
  const rentedProperties = properties.filter(p => p.status === 'loué').length;
  const totalViews = properties.reduce((sum, prop) => sum + prop.views, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Propriétaire</h1>
                <p className="text-sm text-gray-600">Gérez vos biens immobiliers</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/dl-immobilier/proprietaire/biens/ajouter">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un Bien
                </Button>
              </Link>
              <Button variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'properties', label: 'Mes Biens', icon: Building },
              { id: 'tenants', label: 'Locataires', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">CA Total</p>
                      <p className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString()} FCFA</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Biens Disponibles</p>
                      <p className="text-2xl font-bold text-gray-900">{availableProperties}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Biens Loués</p>
                      <p className="text-2xl font-bold text-gray-900">{rentedProperties}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Vues Total</p>
                      <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Eye className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Biens Récents</CardTitle>
                <CardDescription>Vos derniers biens ajoutés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{property.title}</h3>
                          <p className="text-sm text-gray-600">{property.address}, {property.city}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(property.status)}>
                          {getStatusText(property.status)}
                        </Badge>
                        <span className="font-medium">{property.price.toLocaleString()} FCFA</span>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mes Biens Immobiliers</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
                <Link href="/dl-immobilier/proprietaire/biens/ajouter">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un Bien
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(property.status)}>
                          {getStatusText(property.status)}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{property.rating}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <MapPin className="h-3 w-3 inline mr-1" />
                          {property.address}, {property.city}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Surface:</span>
                          <p className="font-medium">{property.surface} m²</p>
                        </div>
                        {property.bedrooms && (
                          <div>
                            <span className="text-gray-600">Chambres:</span>
                            <p className="font-medium">{property.bedrooms}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-600">Prix:</span>
                          <p className="font-medium text-green-600">{property.price.toLocaleString()} FCFA</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Meublé:</span>
                          <p className="font-medium">{property.furnished ? 'Oui' : 'Non'}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{property.views} vues</span>
                        <span>{property.inquiries} demandes</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tenants Tab */}
        {activeTab === 'tenants' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mes Locataires</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un Locataire
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Locataires Actifs</CardTitle>
                <CardDescription>Gérez vos contrats de location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tenants.map((tenant) => (
                    <div key={tenant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{tenant.name}</h3>
                          <p className="text-sm text-gray-600">{tenant.email}</p>
                          <p className="text-sm text-gray-600">{tenant.property}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">{tenant.rent.toLocaleString()} FCFA</p>
                          <p className="text-sm text-gray-600">Loyer mensuel</p>
                        </div>
                        <Badge className={tenant.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {tenant.status === 'actif' ? 'Actif' : 'En retard'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Analytics & Statistiques</h2>
              <div className="flex space-x-2">
                <Link href="/dl-immobilier/proprietaire/analytics">
                  <Button>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Voir Analytics Complet
                  </Button>
                </Link>
                <Link href="/dl-immobilier/proprietaire/biens">
                  <Button variant="outline">
                    <Building className="h-4 w-4 mr-2" />
                    Gestion Biens
                  </Button>
                </Link>
              </div>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance des Biens</CardTitle>
                  <CardDescription>Top 3 des biens les plus performants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {properties
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((property, index) => (
                        <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{property.title}</p>
                              <p className="text-sm text-gray-600">{property.city}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">{property.views} vues</p>
                            <p className="text-sm text-gray-600">⭐ {property.rating}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenus Mensuels</CardTitle>
                  <CardDescription>Évolution des revenus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Janvier 2024</span>
                      <span className="font-medium text-green-600">+15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Décembre 2023</span>
                      <span className="font-medium text-green-600">+8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Novembre 2023</span>
                      <span className="font-medium text-red-600">-3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 