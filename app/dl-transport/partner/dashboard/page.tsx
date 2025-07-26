import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Activity,
    BarChart3,
    Bell,
    Car,
    DollarSign,
    LogOut,
    MapPin,
    Plus,
    Settings,
    User,
    Users
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Vehicle {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'maintenance' | 'offline';
  driver: string;
  currentLocation: string;
  lastTrip: string;
  earnings: number;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  vehicle: string;
  earnings: number;
}

interface Trip {
  id: string;
  vehicle: string;
  driver: string;
  pickup: string;
  destination: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  price: number;
  startTime: string;
  endTime?: string;
}

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Données simulées
  const vehicles: Vehicle[] = [
    {
      id: '1',
      name: 'Peugeot 3008',
      type: 'SUV Premium',
      status: 'active',
      driver: 'Jean Dupont',
      currentLocation: 'Akwa, Douala',
      lastTrip: 'Il y a 2h',
      earnings: 45000
    },
    {
      id: '2',
      name: 'Mercedes Classe E',
      type: 'Berline Luxe',
      status: 'active',
      driver: 'Marie Martin',
      currentLocation: 'Bonamoussadi, Douala',
      lastTrip: 'Il y a 1h',
      earnings: 38000
    },
    {
      id: '3',
      name: 'BMW X5',
      type: 'SUV Premium',
      status: 'maintenance',
      driver: 'Pierre Durand',
      currentLocation: 'Garage Central',
      lastTrip: 'Hier',
      earnings: 52000
    }
  ];

  const drivers: Driver[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      phone: '+237 XXX XXX XXX',
      status: 'available',
      rating: 4.8,
      vehicle: 'Peugeot 3008',
      earnings: 45000
    },
    {
      id: '2',
      name: 'Marie Martin',
      phone: '+237 XXX XXX XXX',
      status: 'busy',
      rating: 4.9,
      vehicle: 'Mercedes Classe E',
      earnings: 38000
    },
    {
      id: '3',
      name: 'Pierre Durand',
      phone: '+237 XXX XXX XXX',
      status: 'offline',
      rating: 4.7,
      vehicle: 'BMW X5',
      earnings: 52000
    }
  ];

  const trips: Trip[] = [
    {
      id: '1',
      vehicle: 'Peugeot 3008',
      driver: 'Jean Dupont',
      pickup: 'Akwa, Douala',
      destination: 'Aéroport International',
      status: 'completed',
      price: 8000,
      startTime: '14:30',
      endTime: '15:15'
    },
    {
      id: '2',
      vehicle: 'Mercedes Classe E',
      driver: 'Marie Martin',
      pickup: 'Bonamoussadi',
      destination: 'Centre-ville',
      status: 'active',
      price: 5000,
      startTime: '16:00'
    },
    {
      id: '3',
      vehicle: 'BMW X5',
      driver: 'Pierre Durand',
      pickup: 'Deido',
      destination: 'Akwa',
      status: 'pending',
      price: 6000,
      startTime: '17:30'
    }
  ];

  const totalEarnings = vehicles.reduce((sum, v) => sum + v.earnings, 0);
  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const availableDrivers = drivers.filter(d => d.status === 'available').length;
  const activeTrips = trips.filter(t => t.status === 'active').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'available':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'offline':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DL-Transport Partenaire</h1>
                <p className="text-sm text-gray-600">Dashboard de gestion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profil
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-sm">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: Activity },
            { id: 'vehicles', label: 'Véhicules', icon: Car },
            { id: 'drivers', label: 'Chauffeurs', icon: Users },
            { id: 'trips', label: 'Courses', icon: MapPin },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contenu principal */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenus totaux</p>
                      <p className="text-2xl font-bold text-gray-900">{totalEarnings.toLocaleString()} FCFA</p>
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
                      <p className="text-sm font-medium text-gray-600">Véhicules actifs</p>
                      <p className="text-2xl font-bold text-gray-900">{activeVehicles}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Car className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Chauffeurs disponibles</p>
                      <p className="text-2xl font-bold text-gray-900">{availableDrivers}</p>
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
                      <p className="text-sm font-medium text-gray-600">Courses en cours</p>
                      <p className="text-2xl font-bold text-gray-900">{activeTrips}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Véhicules récents */}
            <Card>
              <CardHeader>
                <CardTitle>Véhicules récents</CardTitle>
                <CardDescription>État de vos véhicules et leurs activités</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Car className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{vehicle.name}</h4>
                          <p className="text-sm text-gray-600">{vehicle.type} • {vehicle.driver}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{vehicle.earnings.toLocaleString()} FCFA</p>
                          <p className="text-xs text-gray-600">{vehicle.lastTrip}</p>
                        </div>
                        <Badge className={getStatusColor(vehicle.status)}>
                          {vehicle.status === 'active' ? 'Actif' : 
                           vehicle.status === 'maintenance' ? 'Maintenance' : 'Hors ligne'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Courses récentes */}
            <Card>
              <CardHeader>
                <CardTitle>Courses récentes</CardTitle>
                <CardDescription>Dernières activités de transport</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trips.slice(0, 5).map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{trip.pickup} → {trip.destination}</h4>
                          <p className="text-sm text-gray-600">{trip.vehicle} • {trip.driver}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{trip.price.toLocaleString()} FCFA</p>
                          <p className="text-xs text-gray-600">{trip.startTime}</p>
                        </div>
                        <Badge className={getStatusColor(trip.status)}>
                          {trip.status === 'completed' ? 'Terminé' :
                           trip.status === 'active' ? 'En cours' :
                           trip.status === 'pending' ? 'En attente' : 'Annulé'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des véhicules</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un véhicule
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                      <Badge className={getStatusColor(vehicle.status)}>
                        {vehicle.status === 'active' ? 'Actif' : 
                         vehicle.status === 'maintenance' ? 'Maintenance' : 'Hors ligne'}
                      </Badge>
                    </div>
                    <CardDescription>{vehicle.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Chauffeur:</span>
                        <span className="font-medium">{vehicle.driver}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Localisation:</span>
                        <span className="font-medium">{vehicle.currentLocation}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Dernière course:</span>
                        <span className="font-medium">{vehicle.lastTrip}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Revenus:</span>
                        <span className="font-medium text-green-600">{vehicle.earnings.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Détails
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Modifier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des chauffeurs</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un chauffeur
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers.map((driver) => (
                <Card key={driver.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{driver.name}</CardTitle>
                      <Badge className={getStatusColor(driver.status)}>
                        {driver.status === 'available' ? 'Disponible' :
                         driver.status === 'busy' ? 'Occupé' : 'Hors ligne'}
                      </Badge>
                    </div>
                    <CardDescription>{driver.phone}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Véhicule:</span>
                        <span className="font-medium">{driver.vehicle}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Note:</span>
                        <span className="font-medium">⭐ {driver.rating}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Revenus:</span>
                        <span className="font-medium text-green-600">{driver.earnings.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Appeler
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trips' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des courses</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle course
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Véhicule/Chauffeur
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Heure
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {trips.map((trip) => (
                        <tr key={trip.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {trip.pickup} → {trip.destination}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{trip.vehicle}</div>
                            <div className="text-sm text-gray-500">{trip.driver}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(trip.status)}>
                              {trip.status === 'completed' ? 'Terminé' :
                               trip.status === 'active' ? 'En cours' :
                               trip.status === 'pending' ? 'En attente' : 'Annulé'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {trip.price.toLocaleString()} FCFA
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {trip.startTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Analytics & Statistiques</h2>
              <div className="flex space-x-2">
                <Link href="/dl-transport/partner/analytics">
                  <Button>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Voir Analytics Complet
                  </Button>
                </Link>
                <Link href="/dl-transport/partner/vehicles">
                  <Button variant="outline">
                    <Car className="h-4 w-4 mr-2" />
                    Gestion Véhicules
                  </Button>
                </Link>
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">CA Total</p>
                      <p className="text-2xl font-bold text-gray-900">{totalEarnings.toLocaleString()} FCFA</p>
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
                      <p className="text-sm font-medium text-gray-600">Véhicules Actifs</p>
                      <p className="text-2xl font-bold text-gray-900">{activeVehicles}/{vehicles.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Car className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Chauffeurs Disponibles</p>
                      <p className="text-2xl font-bold text-gray-900">{availableDrivers}</p>
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
                      <p className="text-sm font-medium text-gray-600">Courses en Cours</p>
                      <p className="text-2xl font-bold text-gray-900">{activeTrips}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Chauffeurs (Aujourd'hui)</CardTitle>
                  <CardDescription>Meilleurs performeurs du jour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {drivers
                      .sort((a, b) => b.earnings - a.earnings)
                      .slice(0, 3)
                      .map((driver, index) => (
                        <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{driver.name}</p>
                              <p className="text-sm text-gray-600">{driver.vehicle}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">{driver.earnings.toLocaleString()} FCFA</p>
                            <p className="text-sm text-gray-600">⭐ {driver.rating}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Véhicules (Aujourd'hui)</CardTitle>
                  <CardDescription>Véhicules les plus rentables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {vehicles
                      .sort((a, b) => b.earnings - a.earnings)
                      .slice(0, 3)
                      .map((vehicle, index) => (
                        <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-green-600">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{vehicle.name}</p>
                              <p className="text-sm text-gray-600">{vehicle.driver}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">{vehicle.earnings.toLocaleString()} FCFA</p>
                            <Badge className={getStatusColor(vehicle.status)}>
                              {vehicle.status === 'active' ? 'Actif' : 
                               vehicle.status === 'maintenance' ? 'Maintenance' : 'Hors ligne'}
                            </Badge>
                          </div>
                        </div>
                      ))}
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