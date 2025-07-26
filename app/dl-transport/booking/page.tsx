"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Car, CheckCircle, Clock, MapPin, Navigation, Phone, Star, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  category: string;
  color: string;
  driver: string;
  rating: number;
  distance: number;
  estimatedArrival: number;
  image: string;
  basePrice: number;
  features: string[];
  seats: number;
  luggage: string;
}

interface BookingRequest {
  pickupLocation: string;
  destination: string;
  vehicleType: string;
  tripType: 'short' | 'long';
  urgency: 'normal' | 'urgent';
  estimatedTime: number;
  notes: string;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  vehicle: string;
  status: 'available' | 'busy' | 'offline';
  location: string;
  estimatedArrival: number;
}

const vehicleCategories = [
  {
    id: "economy",
    name: "Économique",
    description: "Véhicules compacts et économiques",
    icon: "🚗"
  },
  {
    id: "comfort",
    name: "Confort",
    description: "Berlines confortables et spacieuses",
    icon: "🚙"
  },
  {
    id: "premium",
    name: "Premium",
    description: "Véhicules haut de gamme",
    icon: "🏎️"
  },
  {
    id: "suv",
    name: "SUV",
    description: "Véhicules tout-terrain spacieux",
    icon: "🚐"
  },
  {
    id: "luxury",
    name: "Luxe",
    description: "Véhicules de luxe et prestige",
    icon: "👑"
  },
  {
    id: "van",
    name: "Minibus",
    description: "Véhicules pour groupes",
    icon: "🚌"
  }
];

const vehicleTypes = [
  // Économique
  {
    id: "peugeot_208",
    name: "Peugeot 208",
    type: "Citadine",
    category: "economy",
    color: "Rouge",
    basePrice: 2000,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565357/peugeo_kbrrlo.jpg",
    features: ["Climatisation", "Bluetooth", "GPS"],
    seats: 5,
    luggage: "2 valises"
  },
  {
    id: "toyota_yaris",
    name: "Toyota Yaris",
    type: "Citadine",
    category: "economy",
    color: "Blanche",
    basePrice: 2200,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565357/peugeo_kbrrlo.jpg",
    features: ["Climatisation", "Bluetooth", "Caméra de recul"],
    seats: 5,
    luggage: "2 valises"
  },
  
  // Confort
  {
    id: "peugeot_3008",
    name: "Peugeot 3008",
    type: "SUV Premium",
    category: "comfort",
    color: "Blanche",
    basePrice: 2500,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg",
    features: ["Climatisation", "GPS", "Sièges cuir", "Toit ouvrant"],
    seats: 5,
    luggage: "3 valises"
  },
  {
    id: "peugeot_508",
    name: "Peugeot 508",
    type: "Berline Luxe",
    category: "comfort",
    color: "Grise",
    basePrice: 3000,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/PEUGEOT-508-2067408_1_vnlcjy.jpg",
    features: ["Climatisation", "GPS", "Sièges cuir", "Système audio premium"],
    seats: 5,
    luggage: "3 valises"
  },
  
  // Premium
  {
    id: "bmw_3series",
    name: "BMW Série 3",
    type: "Berline Premium",
    category: "premium",
    color: "Noire",
    basePrice: 4000,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg",
    features: ["Climatisation", "GPS", "Sièges cuir", "Système audio Harman Kardon"],
    seats: 5,
    luggage: "3 valises"
  },
  {
    id: "audi_a4",
    name: "Audi A4",
    type: "Berline Premium",
    category: "premium",
    color: "Blanche",
    basePrice: 4200,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/PEUGEOT-508-2067408_1_vnlcjy.jpg",
    features: ["Climatisation", "GPS", "Sièges cuir", "Quattro"],
    seats: 5,
    luggage: "3 valises"
  },
  
  // SUV
  {
    id: "range_rover",
    name: "Range Rover Evoque",
    type: "SUV Luxe",
    category: "suv",
    color: "Noire",
    basePrice: 5000,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg",
    features: ["Climatisation", "GPS", "Sièges cuir", "4x4", "Toit panoramique"],
    seats: 5,
    luggage: "4 valises"
  },
  {
    id: "bmw_x5",
    name: "BMW X5",
    type: "SUV Premium",
    category: "suv",
    color: "Grise",
    basePrice: 5500,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/PEUGEOT-508-2067408_1_vnlcjy.jpg",
    features: ["Climatisation", "GPS", "Sièges cuir", "xDrive", "Système audio premium"],
    seats: 7,
    luggage: "5 valises"
  },
  
  // Luxe
  {
    id: "mercedes_s_class",
    name: "Mercedes Classe S",
    type: "Berline de Luxe",
    category: "luxury",
    color: "Noire",
    basePrice: 8000,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg",
    features: ["Climatisation", "GPS", "Sièges cuir massant", "Système audio Burmester", "Ambiance"],
    seats: 5,
    luggage: "4 valises"
  },
  {
    id: "mercedes_e_class",
    name: "Mercedes Classe E",
    type: "Berline de Luxe",
    category: "luxury",
    color: "Blanche",
    basePrice: 6500,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/PEUGEOT-508-2067408_1_vnlcjy.jpg",
    features: ["Climatisation", "GPS", "Sièges cuir", "Système audio premium", "Assistance"],
    seats: 5,
    luggage: "3 valises"
  },
  {
    id: "bmw_7series",
    name: "BMW Série 7",
    type: "Berline de Luxe",
    category: "luxury",
    color: "Noire",
    basePrice: 7500,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg",
    features: ["Climatisation", "GPS", "Sièges cuir massant", "Système audio Bowers & Wilkins"],
    seats: 5,
    luggage: "4 valises"
  },
  
  // Minibus
  {
    id: "mercedes_vito",
    name: "Mercedes Vito",
    type: "Minibus",
    category: "van",
    color: "Blanche",
    basePrice: 3500,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg",
    features: ["Climatisation", "GPS", "Sièges confortables", "Espace bagages"],
    seats: 8,
    luggage: "8 valises"
  },
  {
    id: "toyota_hiace",
    name: "Toyota Hiace",
    type: "Minibus",
    category: "van",
    color: "Blanche",
    basePrice: 3200,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/PEUGEOT-508-2067408_1_vnlcjy.jpg",
    features: ["Climatisation", "GPS", "Sièges spacieux", "Grand espace bagages"],
    seats: 12,
    luggage: "12 valises"
  }
];

const popularLocations = [
  "Immeuble CCA, Akwa",
  "Carrefour Akwa",
  "Carrefour Deido",
  "Carrefour Bonanjo",
  "Aéroport International de Douala",
  "Port de Douala",
  "Zone Industrielle",
  "Centre Commercial Akwa",
  "Hôpital Laquintinie",
  "Université de Douala"
];

const mockDrivers: Driver[] = [
  {
    id: "driver_1",
    name: "Jean-Pierre Mbarga",
    phone: "+237 6XX XXX XXX",
    rating: 4.9,
    vehicle: "Peugeot 3008 Blanche",
    status: 'available',
    location: "Akwa, près du CCA",
    estimatedArrival: 3
  },
  {
    id: "driver_2",
    name: "Marie-Claire Nguemo",
    phone: "+237 6XX XXX XXX",
    rating: 4.8,
    vehicle: "Peugeot 508 Grise",
    status: 'available',
    location: "Deido, carrefour principal",
    estimatedArrival: 5
  },
  {
    id: "driver_3",
    name: "Pierre Essomba",
    phone: "+237 6XX XXX XXX",
    rating: 4.7,
    vehicle: "Peugeot 208 Rouge",
    status: 'available',
    location: "Bonanjo, centre-ville",
    estimatedArrival: 7
  }
];

export default function BookingPage() {
  const { user, loading } = useAuth();
  const [bookingRequest, setBookingRequest] = useState<BookingRequest>({
    pickupLocation: "",
    destination: "",
    vehicleType: "",
    tripType: 'short',
    urgency: 'normal',
    estimatedTime: 15,
    notes: ""
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showDriverSelection, setShowDriverSelection] = useState(false);
  const [showPriceConfirmation, setShowPriceConfirmation] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [bookingStatus, setBookingStatus] = useState<'searching' | 'driver_selected' | 'price_confirmed' | 'completed'>('searching');

  useEffect(() => {
    if (bookingRequest.pickupLocation && bookingRequest.destination && bookingRequest.vehicleType) {
      calculatePrice();
    }
  }, [bookingRequest]);

  const calculatePrice = () => {
    const vehicle = vehicleTypes.find(v => v.id === bookingRequest.vehicleType);
    if (!vehicle) return;

    let basePrice = vehicle.basePrice;
    
    // Facteur de distance
    if (bookingRequest.tripType === 'long') {
      basePrice *= 1.5;
    }
    
    // Facteur d'urgence
    if (bookingRequest.urgency === 'urgent') {
      basePrice *= 1.3;
    }
    
    // Facteur horaire (après 22h)
    const currentHour = new Date().getHours();
    if (currentHour >= 22 || currentHour <= 6) {
      basePrice = Math.max(basePrice, 3000); // Minimum 3000 FCFA après 22h
    } else {
      basePrice = Math.max(basePrice, 2000); // Minimum 2000 FCFA en journée
    }

    setFinalPrice(Math.floor(basePrice));
  };

  const handleLocationSelect = (location: string, type: 'pickup' | 'destination') => {
    setBookingRequest(prev => ({
      ...prev,
      [type === 'pickup' ? 'pickupLocation' : 'destination']: location
    }));
  };

  const handleVehicleSelect = (vehicleId: string) => {
    setBookingRequest(prev => ({
      ...prev,
      vehicleType: vehicleId
    }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setBookingRequest(prev => ({ ...prev, vehicleType: "" }));
  };

  const filteredVehicles = selectedCategory 
    ? vehicleTypes.filter(v => v.category === selectedCategory)
    : vehicleTypes;

  const handleTripTypeChange = (type: 'short' | 'long') => {
    setBookingRequest(prev => ({
      ...prev,
      tripType: type
    }));
  };

  const handleUrgencyChange = (urgency: 'normal' | 'urgent') => {
    setBookingRequest(prev => ({
      ...prev,
      urgency: urgency
    }));
  };

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowDriverSelection(false);
    setBookingStatus('driver_selected');
    setShowPriceConfirmation(true);
  };

  const handlePriceAccept = () => {
    setShowPriceConfirmation(false);
    setBookingStatus('completed');
    // Ici vous pouvez ajouter la logique pour confirmer la réservation
  };

  const handlePriceReject = () => {
    setShowPriceConfirmation(false);
    setSelectedDriver(null);
    setBookingStatus('searching');
  };

  const handleCallDriver = () => {
    if (selectedDriver) {
      window.open(`tel:${selectedDriver.phone}`, '_self');
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
          <p className="text-gray-600 mb-6">Vous devez être connecté pour réserver un véhicule.</p>
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
                <h1 className="text-xl font-bold text-gray-900">Réserver un Véhicule</h1>
                <p className="text-sm text-gray-600">Service de transport premium DL-Transport</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <CheckCircle className="h-4 w-4 inline mr-1" />
                Service Disponible
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire de Réservation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Localisation */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Localisation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Point de Prise en Charge
                  </label>
                  <input
                    type="text"
                    value={bookingRequest.pickupLocation}
                    onChange={(e) => setBookingRequest(prev => ({ ...prev, pickupLocation: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Immeuble CCA, Akwa"
                  />
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-2">Lieux populaires :</p>
                    <div className="flex flex-wrap gap-1">
                      {popularLocations.slice(0, 4).map((location) => (
                        <button
                          key={location}
                          onClick={() => handleLocationSelect(location, 'pickup')}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100"
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Navigation className="h-4 w-4 inline mr-1" />
                    Destination
                  </label>
                  <input
                    type="text"
                    value={bookingRequest.destination}
                    onChange={(e) => setBookingRequest(prev => ({ ...prev, destination: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Aéroport International"
                  />
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-2">Lieux populaires :</p>
                    <div className="flex flex-wrap gap-1">
                      {popularLocations.slice(4, 8).map((location) => (
                        <button
                          key={location}
                          onClick={() => handleLocationSelect(location, 'destination')}
                          className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded hover:bg-green-100"
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sélection de Catégorie */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Gamme de Véhicules</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {vehicleCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all text-center ${
                      selectedCategory === category.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h3 className="font-medium text-sm text-gray-900">{category.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                  </div>
                ))}
              </div>
              
              {selectedCategory && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    {vehicleCategories.find(c => c.id === selectedCategory)?.name} - 
                    {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''} disponible{filteredVehicles.length > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Sélection de Véhicule */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedCategory 
                  ? `${vehicleCategories.find(c => c.id === selectedCategory)?.name} - Véhicules Disponibles`
                  : "Tous les Véhicules"
                }
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      bookingRequest.vehicleType === vehicle.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleVehicleSelect(vehicle.id)}
                  >
                    <div className="h-32 bg-cover bg-center rounded mb-3" style={{ backgroundImage: `url('${vehicle.image}')` }}></div>
                    <h3 className="font-medium text-gray-900">{vehicle.name}</h3>
                    <p className="text-sm text-gray-600">{vehicle.type} - {vehicle.color}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm text-gray-500">
                        <span>👥 {vehicle.seats} places</span>
                        <span className="ml-2">💼 {vehicle.luggage}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {vehicle.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {feature}
                          </span>
                        ))}
                        {vehicle.features.length > 2 && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            +{vehicle.features.length - 2} autres
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      À partir de {vehicle.basePrice.toLocaleString()} FCFA
                    </p>
                  </div>
                ))}
              </div>
              
              {filteredVehicles.length === 0 && selectedCategory && (
                <div className="text-center py-8">
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aucun véhicule disponible dans cette catégorie</p>
                </div>
              )}
            </div>

            {/* Type de Trajet et Urgence */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Options de Trajet</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Type de Trajet</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="tripType"
                        value="short"
                        checked={bookingRequest.tripType === 'short'}
                        onChange={() => handleTripTypeChange('short')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-medium">Court Trajet</span>
                        <p className="text-sm text-gray-500">Distance &lt; 10 km</p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="tripType"
                        value="long"
                        checked={bookingRequest.tripType === 'long'}
                        onChange={() => handleTripTypeChange('long')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-medium">Long Trajet</span>
                        <p className="text-sm text-gray-500">Distance &gt; 10 km</p>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Niveau d'Urgence</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value="normal"
                        checked={bookingRequest.urgency === 'normal'}
                        onChange={() => handleUrgencyChange('normal')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-medium">Normal</span>
                        <p className="text-sm text-gray-500">Temps d'attente standard</p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value="urgent"
                        checked={bookingRequest.urgency === 'urgent'}
                        onChange={() => handleUrgencyChange('urgent')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-medium text-red-600">Urgent</span>
                        <p className="text-sm text-gray-500">Priorité maximale</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations Supplémentaires</h2>
              <textarea
                value={bookingRequest.notes}
                onChange={(e) => setBookingRequest(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Instructions spéciales, nombre de passagers, bagages..."
              />
            </div>

            {/* Bouton de Recherche */}
            <Button
              className="w-full"
              size="lg"
              disabled={!bookingRequest.pickupLocation || !bookingRequest.destination || !bookingRequest.vehicleType}
              onClick={() => setShowDriverSelection(true)}
            >
              <Car className="h-5 w-5 mr-2" />
              Rechercher un Transporteur
            </Button>
          </div>

          {/* Panneau Latéral */}
          <div className="space-y-6">
            {/* Résumé de la Réservation */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Départ:</span>
                  <p className="font-medium">{bookingRequest.pickupLocation || "Non spécifié"}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Destination:</span>
                  <p className="font-medium">{bookingRequest.destination || "Non spécifié"}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Véhicule:</span>
                  <p className="font-medium">
                    {vehicleTypes.find(v => v.id === bookingRequest.vehicleType)?.name || "Non sélectionné"}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Type:</span>
                  <p className="font-medium">
                    {bookingRequest.tripType === 'short' ? 'Court Trajet' : 'Long Trajet'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Urgence:</span>
                  <p className={`font-medium ${bookingRequest.urgency === 'urgent' ? 'text-red-600' : ''}`}>
                    {bookingRequest.urgency === 'normal' ? 'Normal' : 'Urgent'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tarification */}
            {finalPrice > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tarification</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Prix de base:</span>
                    <span>{vehicleTypes.find(v => v.id === bookingRequest.vehicleType)?.basePrice.toLocaleString()} FCFA</span>
                  </div>
                  {bookingRequest.tripType === 'long' && (
                    <div className="flex justify-between text-blue-600">
                      <span>Majoration long trajet:</span>
                      <span>+50%</span>
                    </div>
                  )}
                  {bookingRequest.urgency === 'urgent' && (
                    <div className="flex justify-between text-red-600">
                      <span>Majoration urgence:</span>
                      <span>+30%</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total estimé:</span>
                    <span className="text-green-600">{finalPrice.toLocaleString()} FCFA</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date().getHours() >= 22 || new Date().getHours() <= 6 
                      ? "Tarif nocturne: minimum 3000 FCFA" 
                      : "Tarif de jour: minimum 2000 FCFA"}
                  </div>
                </div>
              </div>
            )}

            {/* Informations Importantes */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Informations Importantes</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Transporteur toujours prêt, pas d'attente</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Tarif minimum: 2000 FCFA (jour) / 3000 FCFA (nuit)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Paiement sécurisé après acceptation du tarif</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Suivi GPS en temps réel inclus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Sélection de Chauffeur */}
      {showDriverSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Choisir un Transporteur</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowDriverSelection(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className="p-4 border rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                  onClick={() => handleDriverSelect(driver)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Car className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{driver.name}</h4>
                        <p className="text-sm text-gray-600">{driver.vehicle}</p>
                        <p className="text-sm text-gray-500">{driver.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="font-medium">{driver.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {driver.estimatedArrival} min
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        driver.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {driver.status === 'available' ? 'Disponible' : 'Occupé'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmation de Prix */}
      {showPriceConfirmation && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Confirmer la Réservation</h3>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Transporteur Sélectionné</h4>
                <p className="text-blue-800">{selectedDriver.name}</p>
                <p className="text-sm text-blue-700">{selectedDriver.vehicle}</p>
                <p className="text-sm text-blue-700">Arrivée estimée: {selectedDriver.estimatedArrival} min</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Tarif Final</h4>
                <p className="text-2xl font-bold text-green-600">{finalPrice.toLocaleString()} FCFA</p>
                <p className="text-sm text-green-700">
                  {new Date().getHours() >= 22 || new Date().getHours() <= 6 
                    ? "Tarif nocturne appliqué" 
                    : "Tarif de jour appliqué"}
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handlePriceAccept}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Accepter et Réserver
              </Button>
              <Button variant="outline" className="w-full" onClick={handlePriceReject}>
                <X className="h-4 w-4 mr-2" />
                Refuser et Chercher Autre
              </Button>
              <Button variant="ghost" className="w-full" onClick={handleCallDriver}>
                <Phone className="h-4 w-4 mr-2" />
                Appeler le Transporteur
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmation */}
      {bookingStatus === 'completed' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Réservation Confirmée !</h3>
            <p className="text-gray-600 mb-6">
              Votre transporteur {selectedDriver?.name} arrive dans {selectedDriver?.estimatedArrival} minutes.
            </p>
            <div className="space-y-3">
              <Button className="w-full" onClick={handleCallDriver}>
                <Phone className="h-4 w-4 mr-2" />
                Appeler le Transporteur
              </Button>
              <Link href="/dl-transport/tracking">
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Suivre en Temps Réel
                </Button>
              </Link>
              <Link href="/dl-transport">
                <Button variant="ghost" className="w-full">
                  Retour à l'Accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 