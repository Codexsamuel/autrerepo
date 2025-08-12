'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plane, 
  Hotel, 
  Car, 
  MapPin, 
  Calendar, 
  Users, 
  Search,
  Star,
  Clock,
  DollarSign,
  TrendingUp,
  Globe,
  Navigation,
  Phone,
  Mail,
  Shield,
  RefreshCw,
  Plus,
  Heart,
  Share2,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  rating: number;
  price: number;
  currency: string;
  duration: string;
  description: string;
  highlights: string[];
  isPopular: boolean;
  isHot: boolean;
}

interface Flight {
  id: string;
  from: string;
  to: string;
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  currency: string;
  stops: number;
  class: 'economy' | 'business' | 'first';
}

interface Hotel {
  id: string;
  name: string;
  destination: string;
  rating: number;
  price: number;
  currency: string;
  amenities: string[];
  image: string;
  location: string;
  isAvailable: boolean;
}

export default function DLTravelPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'popularity'>('popularity');

  // Simuler le chargement des données
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Destinations simulées
      const mockDestinations: Destination[] = [
        {
          id: '1',
          name: 'Douala',
          country: 'Cameroun',
          continent: 'Afrique',
          image: '/destinations/douala.jpg',
          rating: 4.5,
          price: 150000,
          currency: 'FCFA',
          duration: '3-7 jours',
          description: 'Ville économique du Cameroun, centre commercial et culturel',
          highlights: ['Plage de Limbe', 'Marché Central', 'Musée Maritime'],
          isPopular: true,
          isHot: false
        },
        {
          id: '2',
          name: 'Yaoundé',
          country: 'Cameroun',
          continent: 'Afrique',
          image: '/destinations/yaounde.jpg',
          rating: 4.3,
          price: 120000,
          currency: 'FCFA',
          duration: '2-5 jours',
          description: 'Capitale politique du Cameroun, ville verte et moderne',
          highlights: ['Mont Fébé', 'Musée National', 'Parc de la Méfou'],
          isPopular: true,
          isHot: true
        },
        {
          id: '3',
          name: 'Abidjan',
          country: 'Côte d\'Ivoire',
          continent: 'Afrique',
          image: '/destinations/abidjan.jpg',
          rating: 4.6,
          price: 180000,
          currency: 'FCFA',
          duration: '4-8 jours',
          description: 'Perle des lagunes, capitale économique de la Côte d\'Ivoire',
          highlights: ['Plateau', 'Cocody', 'Yamoussoukro'],
          isPopular: true,
          isHot: false
        },
        {
          id: '4',
          name: 'Dakar',
          country: 'Sénégal',
          continent: 'Afrique',
          image: '/destinations/dakar.jpg',
          rating: 4.4,
          price: 200000,
          currency: 'FCFA',
          duration: '5-10 jours',
          description: 'Porte de l\'Afrique, ville cosmopolite et culturelle',
          highlights: ['Île de Gorée', 'Plage de Ngor', 'Marché Sandaga'],
          isPopular: false,
          isHot: true
        },
        {
          id: '5',
          name: 'Accra',
          country: 'Ghana',
          continent: 'Afrique',
          image: '/destinations/accra.jpg',
          rating: 4.2,
          price: 160000,
          currency: 'FCFA',
          duration: '3-6 jours',
          description: 'Capitale du Ghana, ville moderne et historique',
          highlights: ['Château d\'Osu', 'Plage de Labadi', 'Centre Kwame Nkrumah'],
          isPopular: false,
          isHot: false
        }
      ];

      // Vols simulés
      const mockFlights: Flight[] = [
        {
          id: '1',
          from: 'Douala',
          to: 'Yaoundé',
          airline: 'Camair-Co',
          departure: '08:00',
          arrival: '08:45',
          duration: '45min',
          price: 45000,
          currency: 'FCFA',
          stops: 0,
          class: 'economy'
        },
        {
          id: '2',
          from: 'Douala',
          to: 'Abidjan',
          airline: 'Air Côte d\'Ivoire',
          departure: '10:30',
          arrival: '12:15',
          duration: '1h45',
          price: 85000,
          currency: 'FCFA',
          stops: 0,
          class: 'economy'
        },
        {
          id: '3',
          from: 'Yaoundé',
          to: 'Dakar',
          airline: 'Air Sénégal',
          departure: '14:00',
          arrival: '16:30',
          duration: '2h30',
          price: 120000,
          currency: 'FCFA',
          stops: 1,
          class: 'business'
        }
      ];

      // Hôtels simulés
      const mockHotels: Hotel[] = [
        {
          id: '1',
          name: 'Hôtel Akwa Palace',
          destination: 'Douala',
          rating: 4.5,
          price: 45000,
          currency: 'FCFA',
          amenities: ['WiFi', 'Piscine', 'Restaurant', 'Spa'],
          image: '/hotels/akwa-palace.jpg',
          location: 'Centre-ville, Douala',
          isAvailable: true
        },
        {
          id: '2',
          name: 'Hilton Yaoundé',
          destination: 'Yaoundé',
          rating: 4.8,
          price: 65000,
          currency: 'FCFA',
          amenities: ['WiFi', 'Piscine', 'Gym', 'Restaurant', 'Bar'],
          image: '/hotels/hilton-yaounde.jpg',
          location: 'Quartier Bastos, Yaoundé',
          isAvailable: true
        },
        {
          id: '3',
          name: 'Hôtel Ivoire',
          destination: 'Abidjan',
          rating: 4.6,
          price: 75000,
          currency: 'FCFA',
          amenities: ['WiFi', 'Piscine', 'Casino', 'Restaurant', 'Spa'],
          image: '/hotels/hotel-ivoire.jpg',
          location: 'Plateau, Abidjan',
          isAvailable: true
        }
      ];

      setDestinations(mockDestinations);
      setFlights(mockFlights);
      setHotels(mockHotels);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = selectedContinent === 'all' || dest.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      default:
        return 0;
    }
  });

  const continents = ['Afrique', 'Europe', 'Asie', 'Amérique', 'Océanie'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl text-gray-700 font-semibold">Chargement des destinations...</h2>
          <p className="text-gray-500">Récupération des offres de voyage</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <Globe className="w-10 h-10 mr-3" />
              DL Travel
            </h1>
            <p className="text-xl mb-6">Découvrez l'Afrique et le monde avec nos offres exclusives</p>
            
            {/* Barre de recherche */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher une destination, ville ou pays..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-0 focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filtres et tri */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les continents</option>
              {continents.map(continent => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'popularity')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popularity">Popularité</option>
              <option value="price">Prix</option>
              <option value="rating">Note</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Onglets principaux */}
        <Tabs defaultValue="destinations" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="flights">Vols</TabsTrigger>
            <TabsTrigger value="hotels">Hôtels</TabsTrigger>
            <TabsTrigger value="packages">Forfaits</TabsTrigger>
          </TabsList>

          {/* Onglet Destinations */}
          <TabsContent value="destinations">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDestinations.map(destination => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{destination.name}</span>
                    </div>
                    {destination.isPopular && (
                      <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                        Populaire
                      </Badge>
                    )}
                    {destination.isHot && (
                      <Badge className="absolute top-3 right-3 bg-red-600 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Chaud
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{destination.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{destination.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{destination.country}, {destination.continent}</p>
                    <p className="text-gray-700 text-sm mb-4">{destination.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Points forts :</p>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Durée</p>
                        <p className="font-semibold">{destination.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">À partir de</p>
                        <p className="text-xl font-bold text-green-600">
                          {destination.price.toLocaleString()} {destination.currency}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Search className="w-4 h-4 mr-2" />
                        Explorer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Vols */}
          <TabsContent value="flights">
            <div className="space-y-4">
              {flights.map(flight => (
                <Card key={flight.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-lg font-semibold">{flight.from}</p>
                          <p className="text-sm text-gray-600">Départ</p>
                        </div>
                        
                        <div className="text-center">
                          <Plane className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">{flight.duration}</p>
                          <p className="text-xs text-gray-500">{flight.stops === 0 ? 'Direct' : `${flight.stops} escale(s)`}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-lg font-semibold">{flight.to}</p>
                          <p className="text-sm text-gray-600">Arrivée</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="mb-2">
                          <Badge variant="outline" className="capitalize">
                            {flight.class}
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {flight.price.toLocaleString()} {flight.currency}
                        </p>
                        <p className="text-sm text-gray-600">{flight.airline}</p>
                      </div>
                      
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Réserver
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Hôtels */}
          <TabsContent value="hotels">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map(hotel => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <span className="text-white text-xl font-bold text-center">{hotel.name}</span>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{hotel.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{hotel.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{hotel.location}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Équipements :</p>
                      <div className="flex flex-wrap gap-1">
                        {hotel.amenities.slice(0, 4).map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Par nuit</p>
                        <p className="text-xl font-bold text-green-600">
                          {hotel.price.toLocaleString()} {hotel.currency}
                        </p>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Réserver
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Forfaits */}
          <TabsContent value="packages">
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <Globe className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Forfaits Personnalisés</h3>
                <p className="text-gray-600 mb-6">
                  Créez votre voyage sur mesure avec nos experts en voyage
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler un expert
                  </Button>
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Demander un devis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Section Services */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Nos Services de Voyage
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Plane className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Réservation de Vols</h3>
              <p className="text-gray-600">
                Vols internationaux et domestiques avec les meilleures compagnies aériennes
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Hotel className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Réservation d'Hôtels</h3>
              <p className="text-gray-600">
                Hôtels de luxe, resorts et logements économiques dans le monde entier
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Car className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location de Véhicules</h3>
              <p className="text-gray-600">
                Voitures, 4x4 et véhicules de luxe pour vos déplacements locaux
              </p>
            </div>
          </div>
        </div>

        {/* Section Contact */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour planifier votre voyage ?</h2>
            <p className="text-xl mb-6">Nos experts en voyage sont là pour vous accompagner</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="w-4 h-4 mr-2" />
                +237 XXX XXX XXX
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Mail className="w-4 h-4 mr-2" />
                travel@dlsolutionssarl.tech
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}