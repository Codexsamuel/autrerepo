"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Car, MapPin, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Zone {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  color: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  popularAreas: string[];
}

interface PricingFactor {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  icon: string;
  isActive: boolean;
}

interface DynamicPrice {
  basePrice: number;
  distancePrice: number;
  zonePrice: number;
  timePrice: number;
  trafficPrice: number;
  total: number;
}

const zones: Zone[] = [
  {
    id: "zone_premium",
    name: "Zone Premium",
    description: "Centre-ville, zones commerciales, hôtels de luxe",
    multiplier: 1.5,
    color: "bg-purple-100 text-purple-800",
    coordinates: { lat: 3.8667, lng: 11.5167 },
    popularAreas: ["Akwa", "Douala Centre", "Bonanjo", "Plateau Joss"]
  },
  {
    id: "zone_standard",
    name: "Zone Standard",
    description: "Zones résidentielles, quartiers moyens",
    multiplier: 1.0,
    color: "bg-blue-100 text-blue-800",
    coordinates: { lat: 3.8700, lng: 11.5200 },
    popularAreas: ["Akwa Nord", "Bali", "Deido", "New Bell"]
  },
  {
    id: "zone_economy",
    name: "Zone Économique",
    description: "Zones périphériques, quartiers populaires",
    multiplier: 0.8,
    color: "bg-green-100 text-green-800",
    coordinates: { lat: 3.8630, lng: 11.5130 },
    popularAreas: ["Bassa", "Logbaba", "Makepe", "Yassa"]
  },
  {
    id: "zone_airport",
    name: "Zone Aéroport",
    description: "Aéroport international de Douala",
    multiplier: 1.8,
    color: "bg-orange-100 text-orange-800",
    coordinates: { lat: 4.0061, lng: 9.7195 },
    popularAreas: ["Aéroport Douala", "Zone Industrielle", "Port de Douala"]
  }
];

const pricingFactors: PricingFactor[] = [
  {
    id: "peak_hours",
    name: "Heures de Pointe",
    description: "7h-9h et 17h-19h en semaine",
    multiplier: 1.3,
    icon: "🕐",
    isActive: true
  },
  {
    id: "night_ride",
    name: "Course Nocturne",
    description: "22h-6h du matin",
    multiplier: 1.4,
    icon: "🌙",
    isActive: false
  },
  {
    id: "weekend",
    name: "Weekend",
    description: "Vendredi soir à dimanche soir",
    multiplier: 1.2,
    icon: "🎉",
    isActive: false
  },
  {
    id: "holiday",
    name: "Jours Fériés",
    description: "Fêtes nationales et religieuses",
    multiplier: 1.5,
    icon: "🎊",
    isActive: false
  },
  {
    id: "weather",
    name: "Conditions Météo",
    description: "Pluie, orages, conditions difficiles",
    multiplier: 1.2,
    icon: "🌧️",
    isActive: false
  },
  {
    id: "demand_surge",
    name: "Surge Pricing",
    description: "Demande élevée, offre limitée",
    multiplier: 1.6,
    icon: "📈",
    isActive: false
  }
];

const vehicleTypes = [
  {
    id: "peugeot_3008",
    name: "Peugeot 3008",
    type: "SUV Premium",
    basePrice: 15000,
    color: "Blanche"
  },
  {
    id: "red_car",
    name: "Voiture Rouge",
    type: "Berline Confort",
    basePrice: 12000,
    color: "Rouge"
  }
];

export default function PricingPage() {
  const { user, loading } = useAuth();
  const [selectedZone, setSelectedZone] = useState<Zone>(zones[0]);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0]);
  const [distance, setDistance] = useState(5);
  const [activeFactors, setActiveFactors] = useState<PricingFactor[]>(
    pricingFactors.filter(f => f.isActive)
  );
  const [priceEstimate, setPriceEstimate] = useState<DynamicPrice | null>(null);

  useEffect(() => {
    calculatePrice();
  }, [selectedZone, selectedVehicle, distance, activeFactors]);

  const calculatePrice = () => {
    const basePrice = selectedVehicle.basePrice;
    const distancePrice = distance * 1000; // 1000 FCFA par km
    const zonePrice = basePrice * (selectedZone.multiplier - 1);
    
    let timePrice = 0;
    let trafficPrice = 0;
    
    // Calculer les facteurs temporels
    activeFactors.forEach(factor => {
      if (factor.id === 'peak_hours' || factor.id === 'night_ride' || factor.id === 'weekend') {
        timePrice += basePrice * (factor.multiplier - 1);
      } else {
        trafficPrice += basePrice * (factor.multiplier - 1);
      }
    });

    const total = Math.floor(basePrice + distancePrice + zonePrice + timePrice + trafficPrice);

    setPriceEstimate({
      basePrice,
      distancePrice,
      zonePrice,
      timePrice,
      trafficPrice,
      total
    });
  };

  const toggleFactor = (factorId: string) => {
    setActiveFactors(prev => {
      const factor = pricingFactors.find(f => f.id === factorId)!;
      const isActive = prev.some(f => f.id === factorId);
      
      if (isActive) {
        return prev.filter(f => f.id !== factorId);
      } else {
        return [...prev, factor];
      }
    });
  };

  const getCurrentTimeFactors = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    const factors = [];
    
    // Heures de pointe
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      factors.push(pricingFactors.find(f => f.id === 'peak_hours')!);
    }
    
    // Course nocturne
    if (hour >= 22 || hour <= 6) {
      factors.push(pricingFactors.find(f => f.id === 'night_ride')!);
    }
    
    // Weekend
    if (day === 5 || day === 6 || day === 0) {
      factors.push(pricingFactors.find(f => f.id === 'weekend')!);
    }
    
    return factors;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des tarifs...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès Restreint</h2>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder aux tarifs dynamiques.</p>
          <Link href="/dl-transport">
            <Button>Retour à DL-Transport</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentTimeFactors = getCurrentTimeFactors();

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
                <h1 className="text-xl font-bold text-gray-900">Tarification Dynamique</h1>
                <p className="text-sm text-gray-600">Prix en temps réel basés sur la distance et les zones</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Prix Dynamiques Actifs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sélection de Zone */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Zone Tarifaire</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedZone.id === zone.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedZone(zone)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{zone.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${zone.color}`}>
                        x{zone.multiplier}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{zone.description}</p>
                    <div className="space-y-1">
                      {zone.popularAreas.map((area, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sélection de Véhicule */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Type de Véhicule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicleTypes.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedVehicle.id === vehicle.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Car className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{vehicle.name}</h3>
                        <p className="text-sm text-gray-600">{vehicle.type}</p>
                        <p className="text-sm text-gray-500">{vehicle.color}</p>
                      </div>
                    </div>
                    <div className="mt-3 text-right">
                      <span className="text-lg font-bold text-green-600">
                        {vehicle.basePrice.toLocaleString()} FCFA
                      </span>
                      <div className="text-xs text-gray-500">Prix de base</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Distance */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Distance du Trajet</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Distance (km)</span>
                  <span className="font-bold text-blue-600">{distance} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 km</span>
                  <span>25 km</span>
                  <span>50 km</span>
                </div>
              </div>
            </div>

            {/* Facteurs de Prix */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Facteurs de Prix</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pricingFactors.map((factor) => {
                  const isActive = activeFactors.some(f => f.id === factor.id);
                  const isCurrentTime = currentTimeFactors.some(f => f.id === factor.id);
                  
                  return (
                    <div
                      key={factor.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        isActive
                          ? 'border-green-500 bg-green-50'
                          : isCurrentTime
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => toggleFactor(factor.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{factor.icon}</span>
                          <h3 className="font-medium text-gray-900">{factor.name}</h3>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          x{factor.multiplier}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                      {isCurrentTime && !isActive && (
                        <div className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                          ⏰ Actuellement actif
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estimation de Prix */}
          <div className="space-y-6">
            {priceEstimate && (
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimation du Prix</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-900">Zone {selectedZone.name}</span>
                      <span className="text-blue-600 font-bold">x{selectedZone.multiplier}</span>
                    </div>
                    <p className="text-sm text-blue-700">{selectedZone.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Prix de base ({selectedVehicle.name}):</span>
                      <span>{priceEstimate.basePrice.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Distance ({distance} km):</span>
                      <span>{priceEstimate.distancePrice.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Majoration zone:</span>
                      <span>{priceEstimate.zonePrice.toLocaleString()} FCFA</span>
                    </div>
                    {priceEstimate.timePrice > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Facteurs temporels:</span>
                        <span>{priceEstimate.timePrice.toLocaleString()} FCFA</span>
                      </div>
                    )}
                    {priceEstimate.trafficPrice > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Conditions spéciales:</span>
                        <span>{priceEstimate.trafficPrice.toLocaleString()} FCFA</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between font-bold text-xl">
                      <span>Total:</span>
                      <span className="text-green-600">{priceEstimate.total.toLocaleString()} FCFA</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full" size="lg">
                      Réserver Maintenant
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Prix estimé, peut varier selon les conditions
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Informations sur les Zones */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations Zones</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-purple-900">Zone Premium</span>
                  <span className="text-purple-600 font-bold">+50%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-900">Zone Standard</span>
                  <span className="text-blue-600 font-bold">Prix normal</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-900">Zone Économique</span>
                  <span className="text-green-600 font-bold">-20%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium text-orange-900">Zone Aéroport</span>
                  <span className="text-orange-600 font-bold">+80%</span>
                </div>
              </div>
            </div>

            {/* Facteurs Actuels */}
            {currentTimeFactors.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Facteurs Actuels</h3>
                <div className="space-y-2">
                  {currentTimeFactors.map((factor) => (
                    <div key={factor.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <div className="flex items-center space-x-2">
                        <span>{factor.icon}</span>
                        <span className="text-sm font-medium">{factor.name}</span>
                      </div>
                      <span className="text-sm font-bold text-yellow-700">x{factor.multiplier}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 