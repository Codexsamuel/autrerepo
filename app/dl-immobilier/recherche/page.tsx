'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Bath,
    Bed,
    Building,
    Car,
    Eye,
    Filter,
    Heart,
    Home,
    MapPin,
    Search,
    Shield,
    Snowflake,
    Square,
    Star,
    Wifi
} from 'lucide-react';
import { useState } from 'react';

interface Property {
  id: string;
  title: string;
  type: 'appartement' | 'maison' | 'bureau' | 'terrain';
  address: string;
  city: string;
  price: number;
  priceType: 'mois' | 'jour' | 'total';
  bedrooms?: number;
  bathrooms?: number;
  surface: number;
  furnished: boolean;
  rating: number;
  views: number;
  images: string[];
  features: string[];
  description: string;
  available: boolean;
  verified: boolean;
  premium: boolean;
}

export default function RechercheImmobiliere() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [furnished, setFurnished] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<string>('recent');

  // Mock data
  const properties: Property[] = [
    {
      id: '1',
      title: 'Appartement T3 moderne avec balcon',
      type: 'appartement',
      address: 'Rue de la Paix, Akwa',
      city: 'Douala',
      price: 150000,
      priceType: 'mois',
      bedrooms: 3,
      bathrooms: 2,
      surface: 85,
      furnished: true,
      rating: 4.8,
      views: 245,
      images: ['/images/property1.jpg'],
      features: ['Climatisation', 'Balcon', 'Ascenseur', 'Sécurité', 'Wifi'],
      description: 'Magnifique appartement moderne dans un quartier calme et sécurisé. Idéal pour une famille.',
      available: true,
      verified: true,
      premium: true
    },
    {
      id: '2',
      title: 'Villa de standing avec jardin',
      type: 'maison',
      address: 'Quartier résidentiel, Bonanjo',
      city: 'Douala',
      price: 450000,
      priceType: 'mois',
      bedrooms: 4,
      bathrooms: 3,
      surface: 200,
      furnished: false,
      rating: 4.9,
      views: 189,
      images: ['/images/property2.jpg'],
      features: ['Jardin', 'Garage', 'Piscine', 'Sécurité 24h', 'Climatisation'],
      description: 'Superbe villa de standing avec jardin paysager et piscine privée.',
      available: true,
      verified: true,
      premium: true
    },
    {
      id: '3',
      title: 'Bureau équipé centre-ville',
      type: 'bureau',
      address: 'Centre-ville, Akwa',
      city: 'Douala',
      price: 200000,
      priceType: 'mois',
      surface: 120,
      furnished: true,
      rating: 4.7,
      views: 156,
      images: ['/images/property3.jpg'],
      features: ['Équipement complet', 'Parking', 'Sécurité', 'Fibre optique', 'Salle de réunion'],
      description: 'Bureau moderne et équipé, idéal pour entreprise en croissance.',
      available: true,
      verified: true,
      premium: false
    },
    {
      id: '4',
      title: 'Terrain constructible titré',
      type: 'terrain',
      address: 'Zone industrielle, Douala',
      city: 'Douala',
      price: 25000000,
      priceType: 'total',
      surface: 500,
      furnished: false,
      rating: 4.5,
      views: 89,
      images: ['/images/property4.jpg'],
      features: ['Titré', 'Viabilisé', 'Accès route', 'Zone commerciale'],
      description: 'Terrain constructible titré dans une zone en développement.',
      available: true,
      verified: true,
      premium: false
    }
  ];

  const cities = ['Douala', 'Yaoundé', 'Kribi', 'Bafoussam', 'Bamenda', 'Garoua'];
  const propertyTypes = [
    { id: 'appartement', label: 'Appartements', icon: Home },
    { id: 'maison', label: 'Maisons & Villas', icon: Building },
    { id: 'bureau', label: 'Bureaux & Locaux', icon: Building },
    { id: 'terrain', label: 'Terrains', icon: MapPin }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || property.type === selectedType;
    const matchesCity = !selectedCity || property.city === selectedCity;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesFurnished = furnished === null || property.furnished === furnished;

    return matchesSearch && matchesType && matchesCity && matchesPrice && matchesFurnished;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'views':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'climatisation': return <Snowflake className="h-4 w-4" />;
      case 'sécurité': return <Shield className="h-4 w-4" />;
      case 'garage': return <Car className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Recherche Immobilière
            </h1>
            <p className="text-lg text-gray-600">
              Trouvez votre bien idéal parmi des milliers d'offres
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Rechercher par ville, quartier, type de bien..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <Button className="h-12 px-8">
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filtres</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Type */}
                <div>
                  <h3 className="font-medium mb-3">Type de Bien</h3>
                  <div className="space-y-2">
                    {propertyTypes.map((type) => (
                      <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="propertyType"
                          value={type.id}
                          checked={selectedType === type.id}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="text-blue-600"
                        />
                        <type.icon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* City */}
                <div>
                  <h3 className="font-medium mb-3">Ville</h3>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Toutes les villes</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Prix (FCFA)</h3>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="text-sm"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000000])}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Furnished */}
                <div>
                  <h3 className="font-medium mb-3">Meublé</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="furnished"
                        checked={furnished === null}
                        onChange={() => setFurnished(null)}
                        className="text-blue-600"
                      />
                      <span className="text-sm">Tous</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="furnished"
                        checked={furnished === true}
                        onChange={() => setFurnished(true)}
                        className="text-blue-600"
                      />
                      <span className="text-sm">Meublé</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="furnished"
                        checked={furnished === false}
                        onChange={() => setFurnished(false)}
                        className="text-blue-600"
                      />
                      <span className="text-sm">Non meublé</span>
                    </label>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Réinitialiser les filtres
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {sortedProperties.length} bien(s) trouvé(s)
                </h2>
                <p className="text-gray-600">
                  {searchTerm && `Résultats pour "${searchTerm}"`}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Trier par:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="recent">Plus récents</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="rating">Meilleure note</option>
                  <option value="views">Plus vus</option>
                </select>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedProperties.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative h-48 bg-gray-200 rounded-t-lg">
                      <div className="absolute top-3 left-3 flex space-x-2">
                        {property.verified && (
                          <Badge className="bg-green-100 text-green-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Vérifié
                          </Badge>
                        )}
                        {property.premium && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Title and Price */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                        <div className="text-right">
                          <p className="font-bold text-lg text-green-600">
                            {property.price.toLocaleString()} FCFA
                          </p>
                          <p className="text-xs text-gray-600">
                            {property.priceType === 'mois' ? '/mois' : 
                             property.priceType === 'jour' ? '/jour' : 'total'}
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.address}, {property.city}</span>
                      </div>

                      {/* Property Details */}
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        {property.bedrooms && (
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>{property.bedrooms}</span>
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            <span>{property.bathrooms}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          <span>{property.surface} m²</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {property.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {getFeatureIcon(feature)}
                            <span className="ml-1">{feature}</span>
                          </Badge>
                        ))}
                        {property.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.features.length - 3} autres
                          </Badge>
                        )}
                      </div>

                      {/* Rating and Views */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">{property.rating}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Eye className="h-4 w-4 mr-1" />
                            <span className="text-sm">{property.views}</span>
                          </div>
                        </div>
                        <Button size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {sortedProperties.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun bien trouvé
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Essayez de modifier vos critères de recherche
                  </p>
                  <Button variant="outline">
                    Réinitialiser les filtres
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 