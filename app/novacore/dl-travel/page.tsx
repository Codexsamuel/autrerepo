"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plane, 
  MapPin, 
  TrendingUp, 
  Plus, 
  Search, 
  Calendar,
  Users,
  Star,
  Heart,
  Share2,
  Hotel,
  Car,
  Camera,
  Globe,
  Clock,
  DollarSign,
  Filter,
  ArrowRight,
  CheckCircle,
  XCircle,
  RefreshCw,
  Wifi,
  WifiOff,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { useTravelData } from '@/hooks/useTravelData';

export default function DLTravelPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('destinations');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 secondes

  const {
    data,
    loading,
    error,
    lastUpdate,
    isOnline,
    isUpdating,
    refresh,
    search,
    filterDestinations,
    filterFlights,
    filterHotels
  } = useTravelData({
    autoRefresh,
    refreshInterval
  });

  const [filteredData, setFilteredData] = useState<any>(null);

  // Fonction de recherche
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredData(null);
      return;
    }

    try {
      const results = await search(searchQuery);
      setFilteredData(results);
    } catch (err) {
      console.error('Erreur de recherche:', err);
    }
  };

  // Effet pour la recherche automatique
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setFilteredData(null);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Formatage de la date de dernière mise à jour
  const formatLastUpdate = (date: Date | null) => {
    if (!date) return 'Jamais';
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  // Composant de statut de connexion
  const ConnectionStatus = () => (
    <div className="flex items-center gap-2 mb-4">
      <div className={`flex items-center gap-1 text-sm ${
        isOnline ? 'text-green-600' : 'text-red-600'
      }`}>
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>En ligne</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Hors ligne</span>
          </>
        )}
      </div>
      
      {isUpdating && (
        <div className="flex items-center gap-1 text-sm text-blue-600">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Mise à jour...</span>
        </div>
      )}

      <div className="text-sm text-gray-500">
        Dernière mise à jour: {formatLastUpdate(lastUpdate)}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            className="w-4 h-4"
          />
          Auto-refresh
        </label>

        <select
          value={refreshInterval}
          onChange={(e) => setRefreshInterval(Number(e.target.value))}
          className="text-sm border rounded px-2 py-1"
          disabled={!autoRefresh}
        >
          <option value={15000}>15s</option>
          <option value={30000}>30s</option>
          <option value={60000}>1min</option>
          <option value={300000}>5min</option>
        </select>

        <Button
          onClick={refresh}
          size="sm"
          variant="outline"
          disabled={isUpdating}
        >
          <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );

  // Composant de statistiques
  const StatsCards = () => {
    if (!data?.stats) return null;

    const stats = data.stats;
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Destinations</p>
                <p className="text-2xl font-bold">{stats.totalDestinations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Vols</p>
                <p className="text-2xl font-bold">{stats.totalFlights}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Hotel className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Hôtels</p>
                <p className="text-2xl font-bold">{stats.totalHotels}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Activités</p>
                <p className="text-2xl font-bold">{stats.totalActivities}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Composant de destination
  const DestinationCard = ({ destination }: { destination: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90">
            {destination.country}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{destination.rating}</span>
            <span className="text-sm text-gray-600">({destination.reviews})</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{destination.name}</CardTitle>
        <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-green-600">{destination.price}</span>
          <Badge variant="outline">{destination.continent}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{destination.weather}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Meilleur moment: {destination.bestTime}</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Points forts:</h4>
          <div className="flex flex-wrap gap-1">
            {destination.highlights.slice(0, 3).map((highlight: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className={`w-2 h-2 rounded-full ${
              destination.safetyLevel === 'High' ? 'bg-green-500' :
              destination.safetyLevel === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></span>
            <span className="text-gray-600">Sécurité: {destination.safetyLevel}</span>
          </div>
          <Button size="sm" variant="outline">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Composant de vol
  const FlightCard = ({ flight }: { flight: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={flight.logo}
              alt={flight.airline}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h3 className="font-semibold">{flight.airline}</h3>
              <p className="text-sm text-gray-600">{flight.flightNumber}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">{flight.price}€</p>
            <p className="text-sm text-gray-600">{flight.class}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <p className="font-semibold">{flight.departure}</p>
            <p className="text-sm text-gray-600">{flight.from}</p>
          </div>
          <div className="flex-1 mx-4">
            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-gray-300"></div>
              <Plane className="w-4 h-4 mx-2 text-gray-400" />
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-1">{flight.duration}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{flight.arrival}</p>
            <p className="text-sm text-gray-600">{flight.to}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {flight.duration}
            </span>
            <span className="flex items-center gap-1">
              {flight.stops === 0 ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-orange-500" />
              )}
              {flight.stops} escale{flight.stops > 1 ? 's' : ''}
            </span>
          </div>
          <Button size="sm">
            Réserver
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Composant d'hôtel
  const HotelCard = ({ hotel }: { hotel: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded">
            {[...Array(hotel.stars)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{hotel.name}</CardTitle>
        <p className="text-gray-600 text-sm mb-3">{hotel.location}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-green-600">{hotel.price}€</span>
            <span className="text-gray-600"> / {hotel.per}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{hotel.rating}</span>
            <span className="text-gray-600">({hotel.reviews})</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {hotel.availableRooms} chambres disponibles
          </div>
          <Button size="sm">
            Réserver
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading && !data) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>Chargement des données de voyage...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Erreur de chargement</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={refresh}>
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const displayData = filteredData || data;
  const destinations = displayData?.destinations || [];
  const flights = displayData?.flights || [];
  const hotels = displayData?.hotels || [];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">DL Travel - Agence de Voyage</h1>
        <p className="text-gray-600">
          Découvrez des destinations uniques avec nos offres exclusives
        </p>
      </div>

      <ConnectionStatus />
      <StatsCards />

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Rechercher destinations, vols, hôtels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} disabled={!searchQuery.trim()}>
            Rechercher
          </Button>
        </div>
      </div>

      {/* Onglets */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="flights">Vols</TabsTrigger>
          <TabsTrigger value="hotels">Hôtels</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
        </TabsList>

        <TabsContent value="destinations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination: any) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flights" className="mt-6">
          <div className="space-y-4">
            {flights.map((flight: any) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hotels" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel: any) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="packages" className="mt-6">
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Packages de voyage</h3>
            <p className="text-gray-600 mb-4">
              Nos packages exclusifs seront bientôt disponibles
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Créer un package personnalisé
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}