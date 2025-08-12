'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plane, 
  Hotel, 
  Car, 
  Search, 
  Star,
  Globe,
  MapPin,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  rating: number;
  price: number;
  currency: string;
  duration: string;
  description: string;
  isPopular: boolean;
}

export default function DLTravel() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadDestinations = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockDestinations: Destination[] = [
        {
          id: '1',
          name: 'Douala',
          country: 'Cameroun',
          continent: 'Afrique',
          rating: 4.5,
          price: 150000,
          currency: 'FCFA',
          duration: '3-7 jours',
          description: 'Ville économique du Cameroun, centre commercial et culturel',
          isPopular: true
        },
        {
          id: '2',
          name: 'Yaoundé',
          country: 'Cameroun',
          continent: 'Afrique',
          rating: 4.3,
          price: 120000,
          currency: 'FCFA',
          duration: '2-5 jours',
          description: 'Capitale politique du Cameroun, ville verte et moderne',
          isPopular: true
        },
        {
          id: '3',
          name: 'Abidjan',
          country: 'Côte d\'Ivoire',
          continent: 'Afrique',
          rating: 4.6,
          price: 180000,
          currency: 'FCFA',
          duration: '4-8 jours',
          description: 'Perle des lagunes, capitale économique de la Côte d\'Ivoire',
          isPopular: true
        }
      ];
      
      setDestinations(mockDestinations);
      setIsLoading(false);
    };

    loadDestinations();
  }, []);

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 h-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
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
        <div className="max-w-7xl mx-auto text-center">
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

      <div className="max-w-7xl mx-auto p-6">
        {/* Grille de destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
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
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Explorer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
                Vols internationaux et domestiques avec les meilleures compagnies
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Hotel className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Réservation d'Hôtels</h3>
              <p className="text-gray-600">
                Hôtels de luxe, resorts et logements économiques
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Car className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location de Véhicules</h3>
              <p className="text-gray-600">
                Voitures, 4x4 et véhicules de luxe pour vos déplacements
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