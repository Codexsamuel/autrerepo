"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, MapPin, Navigation, Route, TrafficCone, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RouteOption {
  id: string;
  name: string;
  distance: number;
  duration: number;
  trafficLevel: 'low' | 'medium' | 'high';
  tolls: number;
  fuelCost: number;
  description: string;
  waypoints: string[];
  isRecommended: boolean;
}

interface TrafficCondition {
  location: string;
  level: 'low' | 'medium' | 'high';
  description: string;
  estimatedDelay: number;
  alternativeRoutes: number;
}

interface RouteRequest {
  origin: string;
  destination: string;
  preferences: {
    fastest: boolean;
    shortest: boolean;
    avoidTolls: boolean;
    avoidTraffic: boolean;
  };
}

const mockTrafficConditions: TrafficCondition[] = [
  {
    location: "Boulevard de l'Indépendance",
    level: 'high',
    description: 'Embouteillages importants',
    estimatedDelay: 25,
    alternativeRoutes: 3
  },
  {
    location: "Route de l'Aéroport",
    level: 'medium',
    description: 'Trafic modéré',
    estimatedDelay: 10,
    alternativeRoutes: 2
  },
  {
    location: "Avenue Kennedy",
    level: 'low',
    description: 'Circulation fluide',
    estimatedDelay: 0,
    alternativeRoutes: 1
  },
  {
    location: "Route de Bonabéri",
    level: 'high',
    description: 'Travaux en cours',
    estimatedDelay: 30,
    alternativeRoutes: 4
  }
];

const popularRoutes = [
  {
    origin: "Centre-ville Douala",
    destination: "Aéroport International",
    distance: 12,
    typicalDuration: 25
  },
  {
    origin: "Akwa",
    destination: "Bonanjo",
    distance: 3,
    typicalDuration: 8
  },
  {
    origin: "Port de Douala",
    destination: "Zone Industrielle",
    distance: 8,
    typicalDuration: 15
  },
  {
    origin: "New Bell",
    destination: "Deido",
    distance: 5,
    typicalDuration: 12
  }
];

export default function RoutesPage() {
  const { user, loading } = useAuth();
  const [routeRequest, setRouteRequest] = useState<RouteRequest>({
    origin: "",
    destination: "",
    preferences: {
      fastest: true,
      shortest: false,
      avoidTolls: false,
      avoidTraffic: true
    }
  });
  const [routeOptions, setRouteOptions] = useState<RouteOption[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);
  const [trafficConditions, setTrafficConditions] = useState<TrafficCondition[]>(mockTrafficConditions);
  const [showTrafficMap, setShowTrafficMap] = useState(false);

  useEffect(() => {
    // Simuler la génération d'options de route
    if (routeRequest.origin && routeRequest.destination) {
      generateRouteOptions();
    }
  }, [routeRequest]);

  const generateRouteOptions = () => {
    const baseDistance = Math.floor(Math.random() * 20) + 5;
    const baseDuration = Math.floor(baseDistance * 1.5) + 10;

    const options: RouteOption[] = [
      {
        id: "route_1",
        name: "Route Rapide",
        distance: baseDistance,
        duration: baseDuration,
        trafficLevel: 'low',
        tolls: 0,
        fuelCost: baseDistance * 150,
        description: "Route principale avec trafic fluide",
        waypoints: ["Boulevard de l'Indépendance", "Avenue Kennedy"],
        isRecommended: true
      },
      {
        id: "route_2",
        name: "Route Économique",
        distance: baseDistance + 2,
        duration: baseDuration + 5,
        trafficLevel: 'medium',
        tolls: 0,
        fuelCost: (baseDistance + 2) * 120,
        description: "Route alternative sans péage",
        waypoints: ["Route de Bonabéri", "Chemin de fer"],
        isRecommended: false
      },
      {
        id: "route_3",
        name: "Route Scénique",
        distance: baseDistance + 5,
        duration: baseDuration + 8,
        trafficLevel: 'low',
        tolls: 500,
        fuelCost: (baseDistance + 5) * 180,
        description: "Route panoramique avec péage",
        waypoints: ["Corniche", "Route côtière"],
        isRecommended: false
      }
    ];

    setRouteOptions(options);
    setSelectedRoute(options[0]);
  };

  const getTrafficColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrafficIcon = (level: string) => {
    switch (level) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  };

  const calculateOptimalRoute = () => {
    if (!routeOptions.length) return null;

    return routeOptions.reduce((optimal, current) => {
      const optimalScore = optimal.duration + (optimal.trafficLevel === 'high' ? 20 : 0);
      const currentScore = current.duration + (current.trafficLevel === 'high' ? 20 : 0);
      
      return currentScore < optimalScore ? current : optimal;
    });
  };

  const handlePreferenceChange = (preference: keyof RouteRequest['preferences']) => {
    setRouteRequest(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: !prev.preferences[preference]
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'optimiseur de routes...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès Restreint</h2>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder à l'optimiseur de routes.</p>
          <Link href="/dl-transport">
            <Button>Retour à DL-Transport</Button>
          </Link>
        </div>
      </div>
    );
  }

  const optimalRoute = calculateOptimalRoute();

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
                <h1 className="text-xl font-bold text-gray-900">Optimisation des Routes</h1>
                <p className="text-sm text-gray-600">Trouvez le meilleur itinéraire en temps réel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant={showTrafficMap ? "default" : "outline"}
                size="sm"
                onClick={() => setShowTrafficMap(!showTrafficMap)}
              >
                <TrafficCone className="h-4 w-4 mr-2" />
                {showTrafficMap ? "Carte Routes" : "Carte Trafic"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration et Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saisie d'itinéraire */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Planifier un Itinéraire</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Point de départ
                    </label>
                    <input
                      type="text"
                      value={routeRequest.origin}
                      onChange={(e) => setRouteRequest(prev => ({ ...prev, origin: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Centre-ville Douala"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      value={routeRequest.destination}
                      onChange={(e) => setRouteRequest(prev => ({ ...prev, destination: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Aéroport International"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Préférences de Route</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(routeRequest.preferences).map(([key, value]) => (
                      <label key={key} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handlePreferenceChange(key as keyof RouteRequest['preferences'])}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {key === 'fastest' ? 'Plus rapide' :
                           key === 'shortest' ? 'Plus court' :
                           key === 'avoidTolls' ? 'Éviter péages' :
                           'Éviter trafic'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={generateRouteOptions}
                  disabled={!routeRequest.origin || !routeRequest.destination}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Calculer l'Itinéraire
                </Button>
              </div>
            </div>

            {/* Options de Route */}
            {routeOptions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Options d'Itinéraire</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {routeOptions.length} routes trouvées
                  </p>
                </div>
                <div className="divide-y">
                  {routeOptions.map((route) => (
                    <div
                      key={route.id}
                      className={`p-6 cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedRoute?.id === route.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => setSelectedRoute(route)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Route className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{route.name}</h3>
                            <p className="text-sm text-gray-600">{route.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {route.isRecommended && (
                            <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-2">
                              <Zap className="h-3 w-3 mr-1" />
                              Recommandé
                            </div>
                          )}
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTrafficColor(route.trafficLevel)}`}>
                            {getTrafficIcon(route.trafficLevel)} {route.trafficLevel === 'low' ? 'Fluide' : route.trafficLevel === 'medium' ? 'Modéré' : 'Dense'}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Distance:</span>
                          <div className="font-medium">{route.distance} km</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Durée:</span>
                          <div className="font-medium">{route.duration} min</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Péages:</span>
                          <div className="font-medium">{route.tolls.toLocaleString()} FCFA</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Carburant:</span>
                          <div className="font-medium">{route.fuelCost.toLocaleString()} FCFA</div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="text-xs text-gray-500">Points de passage:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {route.waypoints.map((waypoint, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              <MapPin className="h-3 w-3 mr-1" />
                              {waypoint}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Carte de Trafic */}
            {showTrafficMap && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Carte du Trafic en Temps Réel</h2>
                <div className="relative h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <TrafficCone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Carte Interactive du Trafic</h3>
                    <p className="text-gray-600 mb-4">
                      Intégration avec Google Maps Traffic API
                    </p>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                        <span className="text-xs text-gray-600">Fluide</span>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                        <span className="text-xs text-gray-600">Modéré</span>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                        <span className="text-xs text-gray-600">Dense</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panneau Latéral */}
          <div className="space-y-6">
            {/* Route Optimale */}
            {optimalRoute && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Optimale</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-green-900">{optimalRoute.name}</h4>
                      <span className="text-green-600 font-bold">⭐ Optimale</span>
                    </div>
                    <p className="text-sm text-green-700 mb-3">{optimalRoute.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-green-600">Distance:</span>
                        <div className="font-medium">{optimalRoute.distance} km</div>
                      </div>
                      <div>
                        <span className="text-green-600">Durée:</span>
                        <div className="font-medium">{optimalRoute.duration} min</div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    <Navigation className="h-4 w-4 mr-2" />
                    Suivre cet Itinéraire
                  </Button>
                </div>
              </div>
            )}

            {/* Conditions de Trafic */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conditions de Trafic</h3>
              <div className="space-y-3">
                {trafficConditions.map((condition, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{condition.location}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTrafficColor(condition.level)}`}>
                        {getTrafficIcon(condition.level)} {condition.level === 'low' ? 'Fluide' : condition.level === 'medium' ? 'Modéré' : 'Dense'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{condition.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Retard estimé: {condition.estimatedDelay} min</span>
                      <span>{condition.alternativeRoutes} routes alt.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Routes Populaires */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Routes Populaires</h3>
              <div className="space-y-3">
                {popularRoutes.map((route, index) => (
                  <div key={index} className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{route.origin}</h4>
                      <ArrowLeft className="h-4 w-4 text-gray-400 transform rotate-180" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{route.destination}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{route.distance} km</span>
                      <span>{route.typicalDuration} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistiques */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Routes calculées</span>
                  <span className="font-bold text-blue-600">{routeOptions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Zones de trafic</span>
                  <span className="font-bold text-orange-600">{trafficConditions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Temps moyen</span>
                  <span className="font-bold text-green-600">
                    {routeOptions.length > 0 
                      ? Math.round(routeOptions.reduce((sum, route) => sum + route.duration, 0) / routeOptions.length)
                      : 0} min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 