"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

const vehicles = [
  {
    id: 1,
    name: "Peugeot 3008",
    color: "Blanche",
    type: "SUV Premium",
    capacity: "5 passagers",
    features: ["Climatisation", "GPS", "WiFi", "Sièges cuir"],
    image: "/images/vehicles/peugeot-3008-white.jpg",
    hourlyRate: "15 000 FCFA",
    dailyRate: "120 000 FCFA",
    status: "disponible"
  },
  {
    id: 2,
    name: "Voiture Rouge",
    type: "Berline Confort",
    color: "Rouge",
    capacity: "4 passagers",
    features: ["Climatisation", "GPS", "Audio premium"],
    image: "/images/vehicles/red-car.jpg",
    hourlyRate: "12 000 FCFA",
    dailyRate: "100 000 FCFA",
    status: "disponible"
  }
];

const drivers = [
  {
    id: 1,
    name: "Jean-Pierre Mbarga",
    experience: "8 ans",
    rating: 4.9,
    languages: ["Français", "Anglais", "Douala"],
    specialties: ["Transport VIP", "Aéroport", "Événements"],
    image: "/images/drivers/driver-1.jpg",
    status: "disponible"
  },
  {
    id: 2,
    name: "Marie-Claire Nguemo",
    experience: "5 ans",
    rating: 4.8,
    languages: ["Français", "Anglais", "Bassa"],
    specialties: ["Transport d'affaires", "Courses urbaines"],
    image: "/images/drivers/driver-2.jpg",
    status: "disponible"
  }
];

export default function DLTransportPage() {
  const { user, loading } = useAuth();
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Accès réservé</h2>
          <p className="mb-6 text-gray-300">Ce service premium nécessite une connexion.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              Se connecter
            </Link>
            <Link href="/sign-up" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!selectedVehicle || !selectedDriver || !bookingDate || !bookingTime || !pickupLocation || !destination) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    
    // Simulation de réservation
    alert("Réservation confirmée ! Vous recevrez un SMS de confirmation.");
    setShowBookingForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DL-Transport
              </h1>
              <p className="text-gray-300 mt-2">Service de transport personnel premium</p>
            </div>
            <div className="flex gap-4">
              <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Contact
              </Link>
              <Link href="/devis" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
                Devis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6">
            Transport Personnel <span className="text-blue-400">Premium</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Votre service de transport personnel avec des véhicules de luxe et des chauffeurs professionnels. 
            Réservation en ligne, suivi en temps réel, tarifs transparents.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setShowBookingForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              🚗 Réserver maintenant
            </button>
            <Link href="#vehicles" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Voir nos véhicules
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-bold mb-2">Véhicules Premium</h3>
            <p className="text-gray-300">Fleet de véhicules modernes et confortables</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-4xl mb-4">👨‍💼</div>
            <h3 className="text-xl font-bold mb-2">Chauffeurs Professionnels</h3>
            <p className="text-gray-300">Équipe expérimentée et certifiée</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">Suivi en Temps Réel</h3>
            <p className="text-gray-300">Localisation GPS et notifications</p>
          </div>
        </div>

        {/* Vehicles Section */}
        <div id="vehicles" className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Nos Véhicules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-2xl font-bold">{vehicle.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    vehicle.status === 'disponible' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-gray-300 mb-2">
                    <span className="text-blue-400">Type:</span> {vehicle.type}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <span className="text-blue-400">Couleur:</span> {vehicle.color}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <span className="text-blue-400">Capacité:</span> {vehicle.capacity}
                  </p>
                </div>
                <div className="mb-4">
                  <h5 className="font-semibold mb-2">Équipements:</h5>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Tarif horaire</p>
                    <p className="text-lg font-bold text-green-400">{vehicle.hourlyRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Tarif journalier</p>
                    <p className="text-lg font-bold text-green-400">{vehicle.dailyRate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drivers Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Nos Chauffeurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {drivers.map((driver) => (
              <div key={driver.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold">{driver.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    driver.status === 'disponible' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {driver.status}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-gray-300 mb-2">
                    <span className="text-blue-400">Expérience:</span> {driver.experience}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <span className="text-blue-400">Note:</span> ⭐ {driver.rating}/5
                  </p>
                  <p className="text-gray-300 mb-2">
                    <span className="text-blue-400">Langues:</span> {driver.languages.join(", ")}
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Spécialités:</h5>
                  <div className="flex flex-wrap gap-2">
                    {driver.specialties.map((specialty, index) => (
                      <span key={index} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Réserver un véhicule</h3>
                <button 
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Véhicule</label>
                  <select 
                    value={selectedVehicle || ""} 
                    onChange={(e) => setSelectedVehicle(Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Sélectionner un véhicule</option>
                    {vehicles.map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.name} - {vehicle.color}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Chauffeur</label>
                  <select 
                    value={selectedDriver || ""} 
                    onChange={(e) => setSelectedDriver(Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Sélectionner un chauffeur</option>
                    {drivers.map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name} - ⭐ {driver.rating}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Heure</label>
                  <input 
                    type="time" 
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Lieu de prise en charge</label>
                  <input 
                    type="text" 
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Adresse de départ"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Destination</label>
                  <input 
                    type="text" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Adresse d'arrivée"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <button 
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Confirmer la réservation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Download App Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Application Mobile</h3>
          <p className="text-gray-300 mb-6">
            Téléchargez notre application pour réserver en un clic et suivre votre véhicule en temps réel
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dl-transport/app" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              📱 Télécharger l'App
            </Link>
            <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
              📞 Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 