"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AlertTriangle, ArrowLeft, Car, CheckCircle, MapPin, Navigation, Phone, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  vehicle: string;
  location: string;
  estimatedArrival: number;
  status: 'en_route' | 'arrived' | 'completed';
  currentLocation: {
    lat: number;
    lng: number;
  };
  destination: {
    lat: number;
    lng: number;
  };
}

interface Trip {
  id: string;
  pickupLocation: string;
  destination: string;
  startTime: string;
  estimatedDuration: number;
  price: number;
  status: 'active' | 'completed' | 'cancelled';
  driver: Driver;
}

export default function TrackingPage() {
  const { user, loading } = useAuth();
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [tripHistory, setTripHistory] = useState<Trip[]>([]);
  const [showMap, setShowMap] = useState(true);

  // Mock data pour la démonstration
  useEffect(() => {
    const mockTrip: Trip = {
      id: "trip_001",
      pickupLocation: "Immeuble CCA, Akwa",
      destination: "Aéroport International de Douala",
      startTime: new Date().toISOString(),
      estimatedDuration: 25,
      price: 15000,
      status: 'active',
      driver: {
        id: "driver_1",
        name: "Jean-Pierre Mbarga",
        phone: "+237 6XX XXX XXX",
        rating: 4.9,
        vehicle: "Peugeot 3008 Blanche",
        location: "En route vers vous",
        estimatedArrival: 3,
        status: 'en_route',
        currentLocation: { lat: 4.0511, lng: 9.7679 },
        destination: { lat: 4.0061, lng: 9.7195 }
      }
    };

    const mockHistory: Trip[] = [
      {
        id: "trip_002",
        pickupLocation: "Carrefour Deido",
        destination: "Centre Commercial Akwa",
        startTime: new Date(Date.now() - 86400000).toISOString(),
        estimatedDuration: 15,
        price: 12000,
        status: 'completed',
        driver: {
          id: "driver_2",
          name: "Marie-Claire Nguemo",
          phone: "+237 6XX XXX XXX",
          rating: 4.8,
          vehicle: "Peugeot 508 Grise",
          location: "Course terminée",
          estimatedArrival: 0,
          status: 'completed',
          currentLocation: { lat: 4.0511, lng: 9.7679 },
          destination: { lat: 4.0511, lng: 9.7679 }
        }
      }
    ];

    setActiveTrip(mockTrip);
    setTripHistory(mockHistory);
  }, []);

  const handleCallDriver = () => {
    if (activeTrip?.driver) {
      window.open(`tel:${activeTrip.driver.phone}`, '_self');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_route':
        return 'text-blue-600';
      case 'arrived':
        return 'text-green-600';
      case 'completed':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en_route':
        return <Car className="h-4 w-4" />;
      case 'arrived':
        return <CheckCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès Restreint</h2>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder au suivi.</p>
          <Link href="/dl-transport">
            <Button>Retour à DL-Transport</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dl-transport">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Suivi en Temps Réel</h1>
                <p className="text-sm text-gray-600">Suivez votre transporteur DL-Transport</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <CheckCircle className="h-4 w-4 inline mr-1" />
                Service Actif
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Carte et Informations de Suivi */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte Interactive */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Carte en Temps Réel</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMap(!showMap)}
                >
                  {showMap ? 'Masquer' : 'Afficher'} la Carte
                </Button>
              </div>
              
              {showMap ? (
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Carte Interactive</h3>
                    <p className="text-gray-600 mb-4">
                      Intégration avec Google Maps ou OpenStreetMap
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>📍 Position actuelle du transporteur</p>
                      <p>🎯 Votre destination</p>
                      <p>⏱️ Temps d'arrivée estimé</p>
                      <p>🛣️ Itinéraire optimisé</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-96 bg-blue-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Navigation className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Carte masquée</p>
                  </div>
                </div>
              )}
            </div>

            {/* Informations du Transporteur */}
            {activeTrip && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations du Transporteur</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Car className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{activeTrip.driver.name}</h3>
                        <p className="text-sm text-gray-600">{activeTrip.driver.vehicle}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm font-medium">{activeTrip.driver.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <span className={`font-medium flex items-center space-x-1 ${getStatusColor(activeTrip.driver.status)}`}>
                          {getStatusIcon(activeTrip.driver.status)}
                          <span>
                            {activeTrip.driver.status === 'en_route' ? 'En route' :
                             activeTrip.driver.status === 'arrived' ? 'Arrivé' : 'Terminé'}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Arrivée estimée:</span>
                        <span className="font-medium text-blue-600">
                          {activeTrip.driver.estimatedArrival} min
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Téléphone:</span>
                        <span className="font-medium">{activeTrip.driver.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Détails du Trajet</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Départ:</span>
                          <p className="font-medium">{activeTrip.pickupLocation}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Destination:</span>
                          <p className="font-medium">{activeTrip.destination}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Durée estimée:</span>
                          <p className="font-medium">{activeTrip.estimatedDuration} min</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Prix:</span>
                          <p className="font-medium text-green-600">{activeTrip.price.toLocaleString()} FCFA</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full" onClick={handleCallDriver}>
                        <Phone className="h-4 w-4 mr-2" />
                        Appeler le Transporteur
                      </Button>
                      <Link href="/dl-transport/booking">
                        <Button variant="outline" className="w-full">
                          <Car className="h-4 w-4 mr-2" />
                          Nouvelle Réservation
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panneau Latéral */}
          <div className="space-y-6">
            {/* Statut Actuel */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut Actuel</h3>
              {activeTrip ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Car className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Course en Cours</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      {activeTrip.driver.name} arrive dans {activeTrip.driver.estimatedArrival} minutes
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Temps d'attente:</span>
                      <span className="font-medium">{activeTrip.driver.estimatedArrival} min</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Distance restante:</span>
                      <span className="font-medium">~2.5 km</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Vitesse moyenne:</span>
                      <span className="font-medium">35 km/h</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Aucune course active</p>
                  <Link href="/dl-transport/booking">
                    <Button>Réserver un Véhicule</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Historique des Courses */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique Récent</h3>
              <div className="space-y-3">
                {tripHistory.map((trip) => (
                  <div key={trip.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{trip.driver.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        trip.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {trip.status === 'completed' ? 'Terminé' : 'Annulé'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{trip.pickupLocation} → {trip.destination}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(trip.startTime).toLocaleDateString('fr-FR')} • {trip.price.toLocaleString()} FCFA
                    </p>
                  </div>
                ))}
                
                {tripHistory.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">Aucun historique disponible</p>
                  </div>
                )}
              </div>
            </div>

            {/* Informations Utiles */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Informations Utiles</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Suivi GPS en temps réel</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Notifications automatiques</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Contact direct avec le chauffeur</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Historique des courses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 