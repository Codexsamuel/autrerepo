"use client";

import { useState } from 'react';
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
  XCircle
} from 'lucide-react';
import Link from 'next/link';

// Destinations réelles
const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993736/illustration-vectorielle-intelligence-artificielle_1237743-62154_t29exq.avif",
    country: "France",
    continent: "Europe",
    rating: 4.8,
    reviews: 1247,
    price: "À partir de 299€",
    description: "La ville de l'amour et de la culture",
    highlights: ["Tour Eiffel", "Louvre", "Champs-Élysées", "Notre-Dame"],
    weather: "15°C - Ensoleillé",
    bestTime: "Avril-Juin, Sept-Oct"
  },
  {
    id: 2,
    name: "Yaoundé, Cameroun",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif",
    country: "Cameroun",
    continent: "Afrique",
    rating: 4.5,
    reviews: 892,
    price: "À partir de 150€",
    description: "Capitale politique et culturelle du Cameroun",
    highlights: ["Mont Fébé", "Musée National", "Marché Central", "Cathédrale"],
    weather: "25°C - Partiellement nuageux",
    bestTime: "Nov-Déc, Fév-Mai"
  },
  {
    id: 3,
    name: "Dubai, Émirats Arabes",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg",
    country: "Émirats Arabes Unis",
    continent: "Asie",
    rating: 4.7,
    reviews: 2341,
    price: "À partir de 599€",
    description: "Métropole moderne et luxueuse",
    highlights: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall", "Désert"],
    weather: "32°C - Ensoleillé",
    bestTime: "Nov-Mars"
  },
  {
    id: 4,
    name: "New York, USA",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg",
    country: "États-Unis",
    continent: "Amérique",
    rating: 4.6,
    reviews: 3456,
    price: "À partir de 799€",
    description: "La ville qui ne dort jamais",
    highlights: ["Times Square", "Statue de la Liberté", "Central Park", "Broadway"],
    weather: "18°C - Nuageux",
    bestTime: "Avril-Mai, Sept-Oct"
  },
  {
    id: 5,
    name: "Tokyo, Japon",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993228/Jean_Dupont_xjsear.jpg",
    country: "Japon",
    continent: "Asie",
    rating: 4.9,
    reviews: 1892,
    price: "À partir de 899€",
    description: "Métropole futuriste et traditionnelle",
    highlights: ["Shibuya", "Temple Senso-ji", "Tokyo Skytree", "Tsukiji"],
    weather: "22°C - Pluvieux",
    bestTime: "Mars-Mai, Oct-Nov"
  },
  {
    id: 6,
    name: "Cape Town, Afrique du Sud",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png",
    country: "Afrique du Sud",
    continent: "Afrique",
    rating: 4.7,
    reviews: 1567,
    price: "À partir de 499€",
    description: "Entre océan et montagne",
    highlights: ["Table Mountain", "Robben Island", "V&A Waterfront", "Wine Route"],
    weather: "20°C - Ensoleillé",
    bestTime: "Mars-Mai, Sept-Nov"
  }
];

// Vols disponibles
const flights = [
  {
    id: 1,
    from: "Yaoundé",
    to: "Paris",
    airline: "Air France",
    logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993736/illustration-vectorielle-intelligence-artificielle_1237743-62154_t29exq.avif",
    departure: "08:30",
    arrival: "15:45",
    duration: "7h 15min",
    price: 899,
    stops: 0,
    class: "Économique",
    date: "2024-07-15"
  },
  {
    id: 2,
    from: "Douala",
    to: "Dubai",
    airline: "Emirates",
    logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif",
    departure: "22:15",
    arrival: "07:30",
    duration: "8h 15min",
    price: 1299,
    stops: 0,
    class: "Économique",
    date: "2024-07-20"
  },
  {
    id: 3,
    from: "Yaoundé",
    to: "New York",
    airline: "Delta Airlines",
    logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg",
    departure: "10:45",
    arrival: "16:20",
    duration: "11h 35min",
    price: 1599,
    stops: 1,
    class: "Économique",
    date: "2024-07-25"
  }
];

// Hôtels
const hotels = [
  {
    id: 1,
    name: "Hôtel Ritz Paris",
    location: "Paris, France",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993736/illustration-vectorielle-intelligence-artificielle_1237743-62154_t29exq.avif",
    rating: 4.9,
    reviews: 892,
    price: 450,
    per: "nuit",
    amenities: ["WiFi", "Spa", "Restaurant", "Gym"],
    stars: 5
  },
  {
    id: 2,
    name: "Hilton Yaoundé",
    location: "Yaoundé, Cameroun",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif",
    rating: 4.6,
    reviews: 567,
    price: 120,
    per: "nuit",
    amenities: ["WiFi", "Piscine", "Restaurant", "Parking"],
    stars: 4
  },
  {
    id: 3,
    name: "Burj Al Arab",
    location: "Dubai, Émirats Arabes",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg",
    rating: 4.8,
    reviews: 1234,
    price: 1200,
    per: "nuit",
    amenities: ["WiFi", "Spa", "Piscine", "Restaurant", "Gym"],
    stars: 5
  }
];

// Packages de voyage
const packages = [
  {
    id: 1,
    name: "Paris Découverte",
    destination: "Paris, France",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993736/illustration-vectorielle-intelligence-artificielle_1237743-62154_t29exq.avif",
    duration: "5 jours / 4 nuits",
    price: 1299,
    originalPrice: 1599,
    includes: ["Vol aller-retour", "Hôtel 4*", "Petit-déjeuner", "Visites guidées"],
    highlights: ["Tour Eiffel", "Louvre", "Seine", "Montmartre"],
    rating: 4.8,
    reviews: 234,
    available: true
  },
  {
    id: 2,
    name: "Safari Cameroun",
    destination: "Yaoundé, Cameroun",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif",
    duration: "7 jours / 6 nuits",
    price: 899,
    originalPrice: 1199,
    includes: ["Vol aller-retour", "Hôtel 3*", "Repas", "Guide local"],
    highlights: ["Mont Fébé", "Marché Central", "Musée", "Nature"],
    rating: 4.6,
    reviews: 156,
    available: true
  },
  {
    id: 3,
    name: "Dubai Luxe",
    destination: "Dubai, Émirats Arabes",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg",
    duration: "6 jours / 5 nuits",
    price: 2499,
    originalPrice: 2999,
    includes: ["Vol aller-retour", "Hôtel 5*", "Demi-pension", "Transferts"],
    highlights: ["Burj Khalifa", "Désert", "Palm Jumeirah", "Shopping"],
    rating: 4.9,
    reviews: 189,
    available: true
  }
];

const continents = [
  { id: 'all', name: 'Toutes les destinations' },
  { id: 'africa', name: 'Afrique' },
  { id: 'europe', name: 'Europe' },
  { id: 'asia', name: 'Asie' },
  { id: 'america', name: 'Amérique' }
];

export default function DLTravelPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [activeTab, setActiveTab] = useState('destinations');

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = selectedContinent === 'all' || destination.continent.toLowerCase().includes(selectedContinent);
    
    return matchesSearch && matchesContinent;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DT</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DL Travel</h1>
                <p className="text-sm text-gray-600">Voyages et réservations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Calendar className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="flights">Vols</TabsTrigger>
            <TabsTrigger value="hotels">Hôtels</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>

          {/* Destinations */}
          <TabsContent value="destinations" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <h2 className="text-2xl font-bold">Découvrez le monde</h2>
              <div className="flex flex-wrap gap-2">
                {continents.map((continent) => (
                  <Button
                    key={continent.id}
                    variant={selectedContinent === continent.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedContinent(continent.id)}
                  >
                    {continent.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 left-2 bg-blue-600">
                      {destination.continent}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{destination.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">{destination.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{destination.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-lg text-blue-600">{destination.price}</span>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{destination.weather}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Points forts:</p>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Explorer
                      </Button>
                      <Button size="sm" variant="outline">
                        Réserver
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vols */}
          <TabsContent value="flights" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Rechercher un vol</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle recherche
              </Button>
            </div>
            
            <div className="space-y-4">
              {flights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <img src={flight.logo} alt={flight.airline} className="w-12 h-12 rounded object-cover" />
                        <div>
                          <h3 className="font-semibold">{flight.airline}</h3>
                          <p className="text-sm text-gray-600">{flight.class}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <p className="font-semibold">{flight.departure}</p>
                          <p className="text-sm text-gray-600">{flight.from}</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-0.5 bg-gray-300"></div>
                            <Plane className="h-4 w-4 text-blue-600" />
                            <div className="w-16 h-0.5 bg-gray-300"></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{flight.duration}</p>
                          <p className="text-xs text-gray-500">{flight.stops === 0 ? 'Direct' : `${flight.stops} escale(s)`}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="font-semibold">{flight.arrival}</p>
                          <p className="text-sm text-gray-600">{flight.to}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-xl">{flight.price}€</p>
                        <p className="text-sm text-gray-600">par personne</p>
                        <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                          Réserver
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hôtels */}
          <TabsContent value="hotels" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Hôtels disponibles</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Rechercher un hôtel
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <img src={hotel.image} alt={hotel.name} className="w-32 h-32 object-cover rounded-l-lg" />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{hotel.name}</h3>
                          <p className="text-sm text-gray-600">{hotel.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            {[...Array(hotel.stars)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">{hotel.rating} ({hotel.reviews} avis)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        {hotel.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-lg">{hotel.price}€</p>
                          <p className="text-sm text-gray-600">par {hotel.per}</p>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Réserver
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Packages */}
          <TabsContent value="packages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Packages de voyage</h2>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Créer un package
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="group hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name} 
                      className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    {pkg.originalPrice > pkg.price && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        -{Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%
                      </Badge>
                    )}
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      {pkg.available ? 'Disponible' : 'Complet'}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{pkg.name}</h3>
                        <p className="text-sm text-gray-600">{pkg.destination}</p>
                        <p className="text-sm text-gray-500">{pkg.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm ml-1">{pkg.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500">({pkg.reviews} avis)</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Inclus:</p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.includes.map((item, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Points forts:</p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xl">{pkg.price}€</p>
                        {pkg.originalPrice > pkg.price && (
                          <p className="text-sm text-gray-500 line-through">{pkg.originalPrice}€</p>
                        )}
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Réserver
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}