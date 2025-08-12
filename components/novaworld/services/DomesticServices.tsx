'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Star, 
  Clock, 
  MapPin, 
  Users, 
  Shield, 
  Zap,
  Home,
  Baby,
  ChefHat,
  Sprout,
  Car,
  Wrench,
  Heart,
  Calendar,
  Phone,
  MessageSquare
} from 'lucide-react';

interface ServiceProvider {
  id: string;
  name: string;
  service: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  location: string;
  distance: number;
  verified: boolean;
  available: boolean;
  languages: string[];
  experience: string;
  photo: string;
  responseTime: string;
}

const domesticCategories = [
  {
    id: 'housekeeping',
    name: 'Ménage',
    icon: Home,
    description: 'Ménage complet, repassage, nettoyage',
    color: 'bg-blue-500',
    popular: true
  },
  {
    id: 'childcare',
    name: 'Nounou',
    icon: Baby,
    description: 'Garde d\'enfants, baby-sitting',
    color: 'bg-pink-500',
    popular: true
  },
  {
    id: 'cooking',
    name: 'Cuisinier',
    icon: ChefHat,
    description: 'Cuisine africaine, européenne, asiatique',
    color: 'bg-orange-500',
    popular: false
  },
  {
    id: 'gardening',
    name: 'Jardinier',
    icon: Sprout,
    description: 'Entretien jardin, plantation, taille',
    color: 'bg-green-500',
    popular: false
  }
];

const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Marie Nguemo',
    service: 'Ménage complet',
    category: 'housekeeping',
    rating: 4.8,
    reviews: 127,
    price: 5000,
    currency: 'FCFA',
    location: 'Bastos, Yaoundé',
    distance: 2.1,
    verified: true,
    available: true,
    languages: ['Français', 'Anglais'],
    experience: '5 ans d\'expérience',
    photo: '/api/placeholder/60/60',
    responseTime: '< 30 min'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    service: 'Nounou anglophone',
    category: 'childcare',
    rating: 4.9,
    reviews: 89,
    price: 8000,
    currency: 'FCFA',
    location: 'École des Nations, Yaoundé',
    distance: 1.8,
    verified: true,
    available: true,
    languages: ['Anglais', 'Français'],
    experience: '8 ans d\'expérience',
    photo: '/api/placeholder/60/60',
    responseTime: '< 15 min'
  },
  {
    id: '3',
    name: 'Chef Pierre Abena',
    service: 'Cuisine traditionnelle',
    category: 'cooking',
    rating: 4.7,
    reviews: 156,
    price: 12000,
    currency: 'FCFA',
    location: 'Centre-ville, Yaoundé',
    distance: 3.2,
    verified: true,
    available: false,
    languages: ['Français', 'Anglais', 'Douala'],
    experience: '12 ans d\'expérience',
    photo: '/api/placeholder/60/60',
    responseTime: '< 45 min'
  }
];

export default function DomesticServices() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredProviders = mockProviders.filter(provider => {
    const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory;
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.price - b.price;
      case 'distance':
        return a.distance - b.distance;
      case 'responseTime':
        return parseInt(a.responseTime.match(/\d+/)?.[0] || '0') - parseInt(b.responseTime.match(/\d+/)?.[0] || '0');
      default:
        return 0;
    }
  });

  const handleQuickBooking = (providerId: string) => {
    // En production : redirection vers le formulaire de réservation
    console.log(`Réservation rapide pour le prestataire ${providerId}`);
  };

  const handleContact = (providerId: string) => {
    // En production : ouverture du chat ou appel
    console.log(`Contact du prestataire ${providerId}`);
  };

  return (
    <div className="space-y-6">
      {/* En-tête des prestations domestiques */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🏠 Prestations Domestiques Vérifiées
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trouvez rapidement des professionnels fiables pour tous vos besoins domestiques. 
          Tous nos prestataires sont vérifiés et notés par la communauté.
        </p>
      </div>

      {/* Barre de recherche intelligente */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher un prestataire, service ou localisation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="px-6">
                <MapPin className="w-4 h-4 mr-2" />
                Ma localisation
              </Button>
              <Button className="px-6 bg-blue-600 hover:bg-blue-700">
                <Zap className="w-4 h-4 mr-2" />
                Recherche IA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Catégories de services */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Catégories de Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {domesticCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className={`border-0 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  {category.popular && (
                    <Badge className="bg-orange-100 text-orange-800 text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Filtres et tri */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Trier par :</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="rating">Meilleure note</option>
            <option value="price">Prix croissant</option>
            <option value="distance">Distance</option>
            <option value="responseTime">Temps de réponse</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {filteredProviders.length} prestataires trouvés
          </Badge>
          <Button variant="outline" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Vérifiés uniquement
          </Button>
        </div>
      </div>

      {/* Liste des prestataires */}
      <div className="space-y-4">
        {sortedProviders.map((provider) => (
          <Card key={provider.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Photo et infos principales */}
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                      {provider.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Vérifié DL
                        </Badge>
                      )}
                      {provider.available ? (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Disponible
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Occupé
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-700 font-medium mb-1">{provider.service}</p>
                    <p className="text-sm text-gray-500 mb-2">{provider.experience}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {provider.location} ({provider.distance} km)
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {provider.responseTime}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Note et avis */}
                <div className="flex flex-col items-center md:items-end space-y-3">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-bold text-gray-900">{provider.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">{provider.reviews} avis</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {provider.price.toLocaleString()} {provider.currency}
                    </p>
                    <p className="text-sm text-gray-500">par service</p>
                  </div>

                  {/* Langues parlées */}
                  <div className="flex flex-wrap gap-1 justify-center">
                    {provider.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  <Button 
                    onClick={() => handleQuickBooking(provider.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!provider.available}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Réserver
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handleContact(provider.id)}
                    className="w-full"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contacter
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA pour devenir prestataire */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            🚀 Vous êtes un professionnel qualifié ?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Rejoignez NovaWorld et développez votre activité. Bénéficiez de notre réseau de clients, 
            de nos outils de gestion et de notre système de paiement sécurisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Devenir Prestataire
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              En savoir plus
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 