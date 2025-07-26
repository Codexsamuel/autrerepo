'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Activity,
    Award,
    BarChart3,
    Calendar,
    Car,
    Clock,
    DollarSign,
    MapPin,
    Users
} from 'lucide-react';
import { useState } from 'react';

interface Driver {
  id: string;
  name: string;
  vehicle: string;
  dailyTrips: number;
  dailyRevenue: number;
  totalRevenue: number;
  rating: number;
  status: 'available' | 'busy' | 'offline';
  currentLocation: string;
  lastTrip: string;
  performance: {
    tripsThisWeek: number;
    revenueThisWeek: number;
    averageRating: number;
    completionRate: number;
  };
}

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  driver: string;
  dailyTrips: number;
  dailyRevenue: number;
  totalRevenue: number;
  status: 'active' | 'maintenance' | 'offline';
  currentLocation: string;
  performance: {
    tripsThisWeek: number;
    revenueThisWeek: number;
    averageRating: number;
    utilizationRate: number;
  };
}

interface DailyStats {
  date: string;
  totalTrips: number;
  totalRevenue: number;
  activeVehicles: number;
  activeDrivers: number;
  averageRating: number;
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedView, setSelectedView] = useState('overview');

  // Données simulées
  const drivers: Driver[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      vehicle: 'Peugeot 3008',
      dailyTrips: 8,
      dailyRevenue: 45000,
      totalRevenue: 1250000,
      rating: 4.8,
      status: 'available',
      currentLocation: 'Akwa, Douala',
      lastTrip: 'Il y a 2h',
      performance: {
        tripsThisWeek: 45,
        revenueThisWeek: 280000,
        averageRating: 4.8,
        completionRate: 98
      }
    },
    {
      id: '2',
      name: 'Marie Martin',
      vehicle: 'Mercedes Classe E',
      dailyTrips: 6,
      dailyRevenue: 38000,
      totalRevenue: 980000,
      rating: 4.9,
      status: 'busy',
      currentLocation: 'Bonamoussadi, Douala',
      lastTrip: 'Il y a 1h',
      performance: {
        tripsThisWeek: 38,
        revenueThisWeek: 220000,
        averageRating: 4.9,
        completionRate: 100
      }
    },
    {
      id: '3',
      name: 'Pierre Durand',
      vehicle: 'BMW X5',
      dailyTrips: 0,
      dailyRevenue: 0,
      totalRevenue: 520000,
      rating: 4.7,
      status: 'offline',
      currentLocation: 'Garage Central',
      lastTrip: 'Hier',
      performance: {
        tripsThisWeek: 0,
        revenueThisWeek: 0,
        averageRating: 4.7,
        completionRate: 95
      }
    }
  ];

  const vehicles: Vehicle[] = [
    {
      id: '1',
      brand: 'Peugeot',
      model: '3008',
      driver: 'Jean Dupont',
      dailyTrips: 8,
      dailyRevenue: 45000,
      totalRevenue: 1250000,
      status: 'active',
      currentLocation: 'Akwa, Douala',
      performance: {
        tripsThisWeek: 45,
        revenueThisWeek: 280000,
        averageRating: 4.8,
        utilizationRate: 85
      }
    },
    {
      id: '2',
      brand: 'Mercedes',
      model: 'Classe E',
      driver: 'Marie Martin',
      dailyTrips: 6,
      dailyRevenue: 38000,
      totalRevenue: 980000,
      status: 'active',
      currentLocation: 'Bonamoussadi, Douala',
      performance: {
        tripsThisWeek: 38,
        revenueThisWeek: 220000,
        averageRating: 4.9,
        utilizationRate: 78
      }
    },
    {
      id: '3',
      brand: 'BMW',
      model: 'X5',
      driver: 'Pierre Durand',
      dailyTrips: 0,
      dailyRevenue: 0,
      totalRevenue: 520000,
      status: 'maintenance',
      currentLocation: 'Garage Central',
      performance: {
        tripsThisWeek: 0,
        revenueThisWeek: 0,
        averageRating: 4.7,
        utilizationRate: 0
      }
    }
  ];

  const dailyStats: DailyStats[] = [
    { date: '2024-01-15', totalTrips: 14, totalRevenue: 83000, activeVehicles: 2, activeDrivers: 2, averageRating: 4.8 },
    { date: '2024-01-16', totalTrips: 16, totalRevenue: 92000, activeVehicles: 2, activeDrivers: 2, averageRating: 4.9 },
    { date: '2024-01-17', totalTrips: 12, totalRevenue: 75000, activeVehicles: 2, activeDrivers: 2, averageRating: 4.7 },
    { date: '2024-01-18', totalTrips: 18, totalRevenue: 105000, activeVehicles: 2, activeDrivers: 2, averageRating: 4.8 },
    { date: '2024-01-19', totalTrips: 15, totalRevenue: 88000, activeVehicles: 2, activeDrivers: 2, averageRating: 4.9 },
    { date: '2024-01-20', totalTrips: 20, totalRevenue: 115000, activeVehicles: 2, activeDrivers: 2, averageRating: 4.8 },
    { date: '2024-01-21', totalTrips: 14, totalRevenue: 83000, activeVehicles: 2, activeDrivers: 2, averageRating: 4.8 }
  ];

  // Calculs
  const totalDailyRevenue = drivers.reduce((sum, d) => sum + d.dailyRevenue, 0);
  const totalRevenue = drivers.reduce((sum, d) => sum + d.totalRevenue, 0);
  const totalDailyTrips = drivers.reduce((sum, d) => sum + d.dailyTrips, 0);
  const activeDrivers = drivers.filter(d => d.status === 'available' || d.status === 'busy').length;
  const averageRating = drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Analytics & Statistiques</h1>
                <p className="text-sm text-gray-600">Suivi complet de vos performances</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation des vues */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-sm">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: Activity },
            { id: 'drivers', label: 'Par Chauffeur', icon: Users },
            { id: 'vehicles', label: 'Par Véhicule', icon: Car },
            { id: 'revenue', label: 'Chiffre d\'Affaires', icon: DollarSign }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === view.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <view.icon className="h-4 w-4" />
              <span>{view.label}</span>
            </button>
          ))}
        </div>

        {/* Vue d'ensemble */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Statistiques principales */}
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
                      <p className="text-sm font-medium text-gray-600">CA Journalier</p>
                      <p className="text-2xl font-bold text-gray-900">{totalDailyRevenue.toLocaleString()} FCFA</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Courses Aujourd'hui</p>
                      <p className="text-2xl font-bold text-gray-900">{totalDailyTrips}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Note Moyenne</p>
                      <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Graphique des performances hebdomadaires */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Hebdomadaire</CardTitle>
                <CardDescription>Évolution des courses et revenus sur 7 jours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{new Date(stat.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}</p>
                          <p className="text-sm text-gray-600">{stat.totalTrips} courses</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{stat.totalRevenue.toLocaleString()} FCFA</p>
                        <p className="text-sm text-gray-600">⭐ {stat.averageRating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Vue par chauffeur */}
        {selectedView === 'drivers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Performance par Chauffeur</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {drivers.map((driver) => (
                <Card key={driver.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{driver.name}</CardTitle>
                        <CardDescription>{driver.vehicle}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(driver.status)}>
                        {driver.status === 'available' ? 'Disponible' :
                         driver.status === 'busy' ? 'Occupé' : 'Hors ligne'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Performance aujourd'hui */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm text-blue-700 mb-2">Aujourd'hui</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Courses:</span>
                          <span className="font-medium ml-1">{driver.dailyTrips}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">CA:</span>
                          <span className="font-medium ml-1">{driver.dailyRevenue.toLocaleString()} FCFA</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance cette semaine */}
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm text-green-700 mb-2">Cette semaine</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Courses:</span>
                          <span className="font-medium ml-1">{driver.performance.tripsThisWeek}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">CA:</span>
                          <span className="font-medium ml-1">{driver.performance.revenueThisWeek.toLocaleString()} FCFA</span>
                        </div>
                      </div>
                    </div>

                    {/* Statistiques globales */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Statistiques</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">CA Total:</span>
                          <span className="font-medium">{driver.totalRevenue.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Note:</span>
                          <span className="font-medium">⭐ {driver.rating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taux de réussite:</span>
                          <span className="font-medium">{driver.performance.completionRate}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Localisation */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{driver.currentLocation}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Vue par véhicule */}
        {selectedView === 'vehicles' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Performance par Véhicule</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{vehicle.brand} {vehicle.model}</CardTitle>
                        <CardDescription>{vehicle.driver}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(vehicle.status)}>
                        {vehicle.status === 'active' ? 'Actif' :
                         vehicle.status === 'maintenance' ? 'Maintenance' : 'Hors ligne'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Performance aujourd'hui */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm text-blue-700 mb-2">Aujourd'hui</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Courses:</span>
                          <span className="font-medium ml-1">{vehicle.dailyTrips}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">CA:</span>
                          <span className="font-medium ml-1">{vehicle.dailyRevenue.toLocaleString()} FCFA</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance cette semaine */}
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm text-green-700 mb-2">Cette semaine</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Courses:</span>
                          <span className="font-medium ml-1">{vehicle.performance.tripsThisWeek}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">CA:</span>
                          <span className="font-medium ml-1">{vehicle.performance.revenueThisWeek.toLocaleString()} FCFA</span>
                        </div>
                      </div>
                    </div>

                    {/* Statistiques globales */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Statistiques</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">CA Total:</span>
                          <span className="font-medium">{vehicle.totalRevenue.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Note:</span>
                          <span className="font-medium">⭐ {vehicle.performance.averageRating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taux d'utilisation:</span>
                          <span className="font-medium">{vehicle.performance.utilizationRate}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Localisation */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{vehicle.currentLocation}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Vue chiffre d'affaires */}
        {selectedView === 'revenue' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analyse du Chiffre d'Affaires</h2>
            
            {/* Résumé CA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">CA Total</p>
                    <p className="text-3xl font-bold text-green-600">{totalRevenue.toLocaleString()} FCFA</p>
                    <p className="text-sm text-gray-500 mt-1">Tous les temps</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">CA Journalier</p>
                    <p className="text-3xl font-bold text-blue-600">{totalDailyRevenue.toLocaleString()} FCFA</p>
                    <p className="text-sm text-gray-500 mt-1">Aujourd'hui</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">CA Moyen/Course</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {totalDailyTrips > 0 ? (totalDailyRevenue / totalDailyTrips).toFixed(0) : 0} FCFA
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Aujourd'hui</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Chauffeurs (CA)</CardTitle>
                  <CardDescription>Meilleurs performeurs du jour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {drivers
                      .sort((a, b) => b.dailyRevenue - a.dailyRevenue)
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
                            <p className="font-medium text-green-600">{driver.dailyRevenue.toLocaleString()} FCFA</p>
                            <p className="text-sm text-gray-600">{driver.dailyTrips} courses</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Véhicules (CA)</CardTitle>
                  <CardDescription>Véhicules les plus rentables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {vehicles
                      .sort((a, b) => b.dailyRevenue - a.dailyRevenue)
                      .map((vehicle, index) => (
                        <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-green-600">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{vehicle.brand} {vehicle.model}</p>
                              <p className="text-sm text-gray-600">{vehicle.driver}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">{vehicle.dailyRevenue.toLocaleString()} FCFA</p>
                            <p className="text-sm text-gray-600">{vehicle.dailyTrips} courses</p>
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