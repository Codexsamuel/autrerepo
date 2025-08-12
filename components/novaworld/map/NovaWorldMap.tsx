'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation, 
  Globe, 
  Building2,
  Users,
  Star,
  Clock,
  Phone,
  MessageSquare
} from 'lucide-react';

interface Location {
  id: string;
  name: string;
  type: 'company' | 'service' | 'event' | 'user';
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  city: string;
  country: string;
  rating?: number;
  verified: boolean;
  category: string;
  description: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  distance?: number;
}

export default function NovaWorldMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Données simulées des emplacements
  const [locations] = useState<Location[]>([
    {
      id: '1',
      name: 'DL Solutions',
      type: 'company',
      coordinates: { lat: 3.848, lng: 11.502 },
      address: 'Avenue Kennedy, Centre-ville',
      city: 'Yaoundé',
      country: 'Cameroun',
      rating: 4.8,
      verified: true,
      category: 'Technologie',
      description: 'Solutions digitales innovantes pour entreprises',
      contact: {
        phone: '+237 6XX XXX XXX',
        email: 'contact@dlsolutions.com',
        website: 'https://dlsolutions.com'
      }
    },
    {
      id: '2',
      name: 'Nova Hospitality',
      type: 'company',
      coordinates: { lat: 4.051, lng: 9.767 },
      address: 'Boulevard de l\'Indépendance',
      city: 'Douala',
      country: 'Cameroun',
      rating: 4.6,
      verified: true,
      category: 'Hôtellerie',
      description: 'Chaîne hôtelière premium en Afrique',
      contact: {
        phone: '+237 2XX XXX XXX',
        email: 'reservations@novahospitality.com',
        website: 'https://novahospitality.com'
      }
    },
    {
      id: '3',
      name: 'AssurPro Cameroun',
      type: 'company',
      coordinates: { lat: 3.848, lng: 11.502 },
      address: 'Rue de la Paix, Quartier administratif',
      city: 'Yaoundé',
      country: 'Cameroun',
      rating: 4.4,
      verified: true,
      category: 'Assurance',
      description: 'Solutions d\'assurance personnalisées',
      contact: {
        phone: '+237 6XX XXX XXX',
        email: 'info@assurpro-cm.com'
      }
    },
    {
      id: '4',
      name: 'TechInnov Africa',
      type: 'company',
      coordinates: { lat: 6.524, lng: 3.379 },
      address: 'Victoria Island, Lagos',
      city: 'Lagos',
      country: 'Nigeria',
      rating: 4.7,
      verified: true,
      category: 'Technologie',
      description: 'Innovation technologique pour l\'Afrique',
      contact: {
        phone: '+234 8XX XXX XXX',
        email: 'hello@techinnov.africa',
        website: 'https://techinnov.africa'
      }
    }
  ]);

  // Obtenir la position de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Erreur de géolocalisation:', error);
          // Position par défaut (Yaoundé)
          setUserLocation({ lat: 3.848, lng: 11.502 });
        }
      );
    } else {
      // Position par défaut si la géolocalisation n'est pas supportée
      setUserLocation({ lat: 3.848, lng: 11.502 });
    }
  }, []);

  // Calculer la distance entre deux points (formule de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Filtrer et trier les emplacements
  const filteredLocations = locations
    .filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           location.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .map(location => ({
      ...location,
      distance: userLocation ? calculateDistance(
        userLocation.lat, userLocation.lng,
        location.coordinates.lat, location.coordinates.lng
      ) : undefined
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));

  const categories = [
    { value: 'all', label: 'Toutes les catégories', icon: Globe },
    { value: 'Technologie', label: 'Technologie', icon: Building2 },
    { value: 'Hôtellerie', label: 'Hôtellerie', icon: Users },
    { value: 'Assurance', label: 'Assurance', icon: Star },
    { value: 'Santé', label: 'Santé', icon: Clock },
    { value: 'Éducation', label: 'Éducation', icon: Phone }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'company': return <Building2 className="w-4 h-4" />;
      case 'service': return <Users className="w-4 h-4" />;
      case 'event': return <Star className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'company': return 'bg-blue-100 text-blue-800';
      case 'service': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec recherche et filtres */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-blue-600" />
            Carte Interactive NovaWorld
          </CardTitle>
          <p className="text-gray-600">
            Découvrez les entreprises, services et événements près de chez vous
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Rechercher un lieu, une entreprise ou un service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="flex items-center space-x-2"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Position actuelle */}
          {userLocation && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Navigation className="w-4 h-4" />
              <span>Votre position: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Carte simulée et liste des emplacements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte simulée */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Carte des Emplacements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center relative">
                {/* Carte simulée avec des points */}
                <div className="text-center text-gray-500">
                  <Globe className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Carte Interactive</p>
                  <p className="text-sm">Intégration Leaflet/Mapbox en cours</p>
                </div>

                {/* Points simulés sur la carte */}
                {filteredLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`
                    }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className={`w-4 h-4 rounded-full ${getTypeColor(location.type)} border-2 border-white shadow-lg`}></div>
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap">
                      {location.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des emplacements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Emplacements ({filteredLocations.length})</h3>
          
          {filteredLocations.map((location) => (
            <Card 
              key={location.id} 
              className={`border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                selectedLocation?.id === location.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full ${getTypeColor(location.type)} flex items-center justify-center flex-shrink-0`}>
                    {getTypeIcon(location.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">{location.name}</h4>
                      {location.verified && (
                        <Badge variant="secondary" className="text-xs">
                          ✓ Vérifié
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{location.category}</p>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{location.city}, {location.country}</span>
                    </div>
                    
                    {location.distance !== undefined && (
                      <div className="text-xs text-blue-600 mb-2">
                        📍 À {(location.distance).toFixed(1)} km de votre position
                      </div>
                    )}
                    
                    {location.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{location.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Détails de l'emplacement sélectionné */}
      {selectedLocation && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full ${getTypeColor(selectedLocation.type)} flex items-center justify-center`}>
                  {getTypeIcon(selectedLocation.type)}
                </div>
                <div>
                  <h2 className="text-xl">{selectedLocation.name}</h2>
                  <p className="text-sm text-gray-600">{selectedLocation.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {selectedLocation.verified && (
                  <Badge variant="secondary">✓ Vérifié</Badge>
                )}
                {selectedLocation.rating && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                    <span>{selectedLocation.rating}</span>
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informations</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{selectedLocation.address}, {selectedLocation.city}, {selectedLocation.country}</span>
                  </div>
                  <p className="text-gray-600">{selectedLocation.description}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                <div className="space-y-2 text-sm">
                  {selectedLocation.contact.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedLocation.contact.phone}</span>
                    </div>
                  )}
                  {selectedLocation.contact.email && (
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-gray-500">✉</span>
                      <span>{selectedLocation.contact.email}</span>
                    </div>
                  )}
                  {selectedLocation.contact.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a href={selectedLocation.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {selectedLocation.contact.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4 border-t">
              <Button variant="outline" className="flex items-center space-x-2">
                <Navigation className="w-4 h-4" />
                <span>Itinéraire</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Appeler</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Contacter</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 