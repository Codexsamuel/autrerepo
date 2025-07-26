import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Calendar,
    Car,
    Clock,
    DollarSign,
    Edit,
    MapPin,
    Plus,
    Search,
    Settings,
    Star,
    Thermometer,
    Trash2,
    Users
} from 'lucide-react';
import { useState } from 'react';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  class: string;
  type: string;
  licensePlate: string;
  color: string;
  hasAC: boolean;
  interiorCondition: 'excellent' | 'bon' | 'moyen' | 'mauvais';
  exteriorCondition: 'excellent' | 'bon' | 'moyen' | 'mauvais';
  seats: number;
  fuelType: 'essence' | 'diesel' | 'hybride' | 'électrique';
  transmission: 'manuelle' | 'automatique';
  status: 'active' | 'maintenance' | 'offline' | 'reserved';
  currentLocation: string;
  driver: string;
  dailyTrips: number;
  dailyRevenue: number;
  totalRevenue: number;
  lastMaintenance: string;
  nextMaintenance: string;
  insuranceExpiry: string;
  registrationExpiry: string;
  features: string[];
  notes: string;
}

export default function VehiclesManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      brand: 'Peugeot',
      model: '3008',
      year: 2022,
      class: 'SUV Premium',
      type: 'SUV',
      licensePlate: 'CE-1234-AB',
      color: 'Blanche',
      hasAC: true,
      interiorCondition: 'excellent',
      exteriorCondition: 'excellent',
      seats: 5,
      fuelType: 'essence',
      transmission: 'automatique',
      status: 'active',
      currentLocation: 'Akwa, Douala',
      driver: 'Jean Dupont',
      dailyTrips: 8,
      dailyRevenue: 45000,
      totalRevenue: 1250000,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      insuranceExpiry: '2024-12-31',
      registrationExpiry: '2024-12-31',
      features: ['GPS', 'Sièges cuir', 'Toit ouvrant', 'Caméra de recul'],
      notes: 'Véhicule en excellent état'
    },
    {
      id: '2',
      brand: 'Mercedes',
      model: 'Classe E',
      year: 2021,
      class: 'Berline Luxe',
      type: 'Berline',
      licensePlate: 'CE-5678-CD',
      color: 'Noire',
      hasAC: true,
      interiorCondition: 'excellent',
      exteriorCondition: 'bon',
      seats: 5,
      fuelType: 'diesel',
      transmission: 'automatique',
      status: 'active',
      currentLocation: 'Bonamoussadi, Douala',
      driver: 'Marie Martin',
      dailyTrips: 6,
      dailyRevenue: 38000,
      totalRevenue: 980000,
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01',
      insuranceExpiry: '2024-11-30',
      registrationExpiry: '2024-11-30',
      features: ['GPS', 'Sièges cuir massant', 'Système audio premium'],
      notes: 'Véhicule de luxe, entretien régulier'
    },
    {
      id: '3',
      brand: 'BMW',
      model: 'X5',
      year: 2023,
      class: 'SUV Luxe',
      type: 'SUV',
      licensePlate: 'CE-9012-EF',
      color: 'Grise',
      hasAC: true,
      interiorCondition: 'excellent',
      exteriorCondition: 'excellent',
      seats: 7,
      fuelType: 'hybride',
      transmission: 'automatique',
      status: 'maintenance',
      currentLocation: 'Garage Central',
      driver: 'Pierre Durand',
      dailyTrips: 0,
      dailyRevenue: 0,
      totalRevenue: 520000,
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-03-15',
      insuranceExpiry: '2024-10-31',
      registrationExpiry: '2024-10-31',
      features: ['GPS', 'Sièges cuir', '4x4', 'Toit panoramique'],
      notes: 'En maintenance - changement pneus'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const vehicleClasses = [
    'Économique', 'Confort', 'Premium', 'SUV', 'Luxe', 'Minibus'
  ];

  const vehicleTypes = [
    'Citadine', 'Berline', 'SUV', 'Break', 'Minibus', 'Utilitaire'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'bon': return 'bg-blue-100 text-blue-800';
      case 'moyen': return 'bg-yellow-100 text-yellow-800';
      case 'mauvais': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
    const matchesClass = filterClass === 'all' || vehicle.class.includes(filterClass);
    
    return matchesSearch && matchesStatus && matchesClass;
  });

  const totalRevenue = vehicles.reduce((sum, v) => sum + v.totalRevenue, 0);
  const dailyRevenue = vehicles.reduce((sum, v) => sum + v.dailyRevenue, 0);
  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const totalTrips = vehicles.reduce((sum, v) => sum + v.dailyTrips, 0);

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
                <h1 className="text-xl font-bold text-gray-900">Gestion des Véhicules</h1>
                <p className="text-sm text-gray-600">Contrôle total de votre flotte</p>
              </div>
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un véhicule
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  <p className="text-2xl font-bold text-gray-900">{dailyRevenue.toLocaleString()} FCFA</p>
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
                  <p className="text-sm font-medium text-gray-600">Véhicules Actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{activeVehicles}/{vehicles.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Car className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Courses Aujourd'hui</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTrips}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par marque, modèle, plaque, chauffeur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="offline">Hors ligne</option>
                  <option value="reserved">Réservé</option>
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Toutes les classes</option>
                  {vehicleClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des véhicules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{vehicle.brand} {vehicle.model}</CardTitle>
                    <CardDescription>{vehicle.class} • {vehicle.year}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(vehicle.status)}>
                    {vehicle.status === 'active' ? 'Actif' :
                     vehicle.status === 'maintenance' ? 'Maintenance' :
                     vehicle.status === 'offline' ? 'Hors ligne' : 'Réservé'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Informations principales */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Plaque:</span>
                    <span className="font-medium">{vehicle.licensePlate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Couleur:</span>
                    <span className="font-medium">{vehicle.color}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Chauffeur:</span>
                    <span className="font-medium">{vehicle.driver}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Localisation:</span>
                    <span className="font-medium flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {vehicle.currentLocation}
                    </span>
                  </div>
                </div>

                {/* Critères techniques */}
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Critères techniques</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Thermometer className="h-3 w-3 text-blue-500" />
                      <span>Clim: {vehicle.hasAC ? 'Oui' : 'Non'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3 text-green-500" />
                      <span>{vehicle.seats} places</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>Int: {vehicle.interiorCondition}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Car className="h-3 w-3 text-purple-500" />
                      <span>Ext: {vehicle.exteriorCondition}</span>
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="bg-blue-50 p-3 rounded-lg space-y-2">
                  <h4 className="font-medium text-sm text-blue-700">Performance aujourd'hui</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">Courses:</span>
                      <span className="font-medium ml-1">{vehicle.dailyTrips}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">CA:</span>
                      <span className="font-medium ml-1">{vehicle.dailyRevenue.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-600">CA Total:</span>
                    <span className="font-medium ml-1">{vehicle.totalRevenue.toLocaleString()} FCFA</span>
                  </div>
                </div>

                {/* Entretien */}
                <div className="bg-orange-50 p-3 rounded-lg space-y-2">
                  <h4 className="font-medium text-sm text-orange-700">Entretien</h4>
                  <div className="text-xs space-y-1">
                    <div>
                      <span className="text-gray-600">Prochaine maintenance:</span>
                      <span className="font-medium ml-1">{vehicle.nextMaintenance}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Assurance:</span>
                      <span className="font-medium ml-1">{vehicle.insuranceExpiry}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-3 w-3 mr-1" />
                    Détails
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun véhicule trouvé</h3>
              <p className="text-gray-600">Aucun véhicule ne correspond à vos critères de recherche.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 