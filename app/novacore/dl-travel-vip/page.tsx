"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plane, 
  Hotel, 
  Car, 
  MapPin, 
  Star, 
  Users, 
  DollarSign, 
  Calendar,
  Clock,
  Award,
  Shield,
  Zap,
  Crown,
  Heart,
  TrendingUp,
  Globe,
  Phone,
  Mail,
  MessageSquare,
  Settings
} from 'lucide-react';

// Données VIP réalistes
const vipDestinations = [
  {
    id: 1,
    name: "Maldives - Resort Privé",
    location: "Maldives",
    price: "€8,500",
    duration: "7 jours",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    features: ["Villa privée sur l'eau", "Conciergerie 24/7", "Spa exclusif", "Restaurant gastronomique"],
    status: "disponible"
  },
  {
    id: 2,
    name: "Dubai - Burj Al Arab",
    location: "Dubai, UAE",
    price: "€12,000",
    duration: "5 jours",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
    features: ["Suite présidentielle", "Chauffeur privé", "Accès VIP", "Shopping personnalisé"],
    status: "disponible"
  },
  {
    id: 3,
    name: "Paris - Ritz",
    location: "Paris, France",
    price: "€6,800",
    duration: "4 jours",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1502602898534-47d22c0d8066?w=400&h=300&fit=crop",
    features: ["Suite impériale", "Guide privé", "Réservations exclusives", "Transfert limousine"],
    status: "disponible"
  }
];

const vipStats = {
  totalBookings: 1247,
  totalRevenue: "€2.8M",
  averageRating: 4.9,
  vipMembers: 89,
  satisfactionRate: 98.5,
  repeatCustomers: 76
};

const vipServices = [
  {
    id: 1,
    name: "Conciergerie Privée",
    description: "Service personnalisé 24/7",
    icon: Phone,
    status: "actif"
  },
  {
    id: 2,
    name: "Transferts VIP",
    description: "Limousines et jets privés",
    icon: Car,
    status: "actif"
  },
  {
    id: 3,
    name: "Réservations Exclusives",
    description: "Accès aux meilleurs restaurants",
    icon: Award,
    status: "actif"
  },
  {
    id: 4,
    name: "Assurance Premium",
    description: "Couverture complète",
    icon: Shield,
    status: "actif"
  }
];

export default function DLTravelVIPPage() {
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleBooking = async (destination: any) => {
    setLoading(true);
    // Simulation de réservation
    setTimeout(() => {
      setLoading(false);
      alert(`Réservation VIP confirmée pour ${destination.name}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">DL Travel VIP</h1>
            <Badge variant="outline" className="ml-2 bg-purple-600 text-white border-purple-600">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
          <p className="text-gray-600 text-lg">
            Expériences de voyage exclusives et personnalisées pour clients VIP
          </p>
        </div>

        {/* Statistiques VIP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Revenus Totaux</p>
                  <p className="text-2xl font-bold">{vipStats.totalRevenue}</p>
                </div>
                <DollarSign className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Membres VIP</p>
                  <p className="text-2xl font-bold">{vipStats.vipMembers}</p>
                </div>
                <Users className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Satisfaction</p>
                  <p className="text-2xl font-bold">{vipStats.satisfactionRate}%</p>
                </div>
                <Heart className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Destinations VIP */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-600" />
            Destinations VIP
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vipDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-purple-600">
                    <Crown className="w-3 h-3 mr-1" />
                    VIP
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{destination.name}</h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {destination.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">{destination.price}</p>
                      <p className="text-sm text-gray-500">{destination.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < destination.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({destination.rating})</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {destination.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Zap className="w-3 h-3 text-purple-600" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleBooking(destination)}
                    disabled={loading}
                  >
                    {loading ? "Réservation..." : "Réserver VIP"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services VIP */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-600" />
            Services VIP
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vipServices.map((service) => (
              <Card key={service.id} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <service.icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {service.status}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact VIP */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Contact VIP</h2>
              <p className="text-gray-600 mb-6">
                Notre équipe VIP est disponible 24/7 pour vous accompagner
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Phone className="w-4 h-4 mr-2" />
                  +33 1 23 45 67 89
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  vip@dltravel.com
                </Button>
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat VIP
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 