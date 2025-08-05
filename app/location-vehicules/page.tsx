import { Metadata } from 'next';
import ModernNavigation from '@/components/layout/ModernNavigation';
import { Car, Truck, Bus, Bike, MapPin, Clock, Star, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Location de Véhicules - Voiture, Camion, Transport | Location Flexible',
  description: 'Location de véhicules pour tous vos besoins : voiture, camion, bus, moto. Transport flexible avec assurance incluse. Réservation en ligne, livraison possible.',
  keywords: 'location de véhicules, location voiture, location camion, transport, location bus, location moto, véhicule utilitaire, transport de marchandises, livraison, assurance véhicule, réservation en ligne',
  openGraph: {
    title: 'Location de Véhicules - Transport Flexible et Sécurisé',
    description: 'Large gamme de véhicules à louer : voiture, camion, bus, moto. Transport flexible avec assurance incluse.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const vehicles = [
  {
    category: "🚗 Voitures Particulières",
    vehicles: [
      { name: "Citadine Économique", price: "25€/jour", seats: "5 places", fuel: "Essence/Diesel" },
      { name: "Berline Confort", price: "35€/jour", seats: "5 places", fuel: "Essence/Diesel" },
      { name: "SUV Familial", price: "45€/jour", seats: "7 places", fuel: "Essence/Diesel" },
      { name: "Voiture Électrique", price: "40€/jour", seats: "5 places", fuel: "Électrique" }
    ]
  },
  {
    category: "🚛 Véhicules Utilitaires",
    vehicles: [
      { name: "Fourgon 3m³", price: "30€/jour", capacity: "1.5 tonnes", fuel: "Diesel" },
      { name: "Camion 6m³", price: "45€/jour", capacity: "3 tonnes", fuel: "Diesel" },
      { name: "Camion 12m³", price: "65€/jour", capacity: "6 tonnes", fuel: "Diesel" },
      { name: "Camion Frigorifique", price: "80€/jour", capacity: "3 tonnes", fuel: "Diesel" }
    ]
  },
  {
    category: "🚌 Transport de Personnes",
    vehicles: [
      { name: "Minibus 9 places", price: "60€/jour", seats: "9 places", fuel: "Diesel" },
      { name: "Bus 20 places", price: "120€/jour", seats: "20 places", fuel: "Diesel" },
      { name: "Bus 50 places", price: "200€/jour", seats: "50 places", fuel: "Diesel" }
    ]
  }
];

export default function LocationVehiculesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ModernNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header SEO Optimisé */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Location de Véhicules
            </h1>
            <p className="text-2xl text-gray-700 mb-4">
              Transport Flexible et Sécurisé
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              Location de véhicules pour tous vos besoins : voiture, camion, bus, moto. 
              Transport flexible avec assurance incluse. Réservation en ligne, livraison possible.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <Car className="w-6 h-6" />
                <span>Réserver un Véhicule</span>
              </Link>
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                Demander un Devis
              </Link>
            </div>
          </div>

          {/* Avantages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-gray-900 mb-2">Assurance Incluse</div>
              <div className="text-gray-600">Protection complète incluse</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Service disponible</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-gray-900 mb-2">Livraison</div>
              <div className="text-gray-600">À votre adresse</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-gray-900 mb-2">4.8/5</div>
              <div className="text-gray-600">Note clients</div>
            </div>
          </div>

          {/* Véhicules par Catégorie */}
          <div className="space-y-16">
            {vehicles.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  {category.category}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.vehicles.map((vehicle, vehicleIndex) => (
                    <div key={vehicleIndex} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">{vehicle.name}</h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Prix :</span>
                          <span className="font-bold text-green-600">{vehicle.price}</span>
                        </div>
                        {'seats' in vehicle && vehicle.seats && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Places :</span>
                            <span className="font-semibold">{vehicle.seats}</span>
                          </div>
                        )}
                        {'capacity' in vehicle && vehicle.capacity && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Capacité :</span>
                            <span className="font-semibold">{vehicle.capacity}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Carburant :</span>
                          <span className="font-semibold">{vehicle.fuel}</span>
                        </div>
                      </div>
                      
                      <Link
                        href="/contact"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors text-center block"
                      >
                        Réserver
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Final */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'un Véhicule Spécifique ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour une location sur mesure ou pour des besoins particuliers.
            </p>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <Car className="w-6 h-6" />
              <span>Nous Contacter</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 