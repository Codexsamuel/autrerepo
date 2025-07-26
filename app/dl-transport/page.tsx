"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { BarChart3, Car, CheckCircle, DollarSign, Download, MapPin, Shield, Smartphone, Star, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const vehicles = [
  {
    id: 1,
    name: "Peugeot 3008",
    type: "SUV Premium",
    color: "Blanche",
    driver: "Jean-Pierre Mbarga",
    rating: 4.9,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg"
  },
  {
    id: 2,
    name: "Peugeot 508",
    type: "Berline Luxe",
    color: "Grise",
    driver: "Marie-Claire Nguemo",
    rating: 4.8,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/PEUGEOT-508-2067408_1_vnlcjy.jpg"
  },
  {
    id: 3,
    name: "Peugeot 208",
    type: "Citadine",
    color: "Rouge",
    driver: "Pierre Essomba",
    rating: 4.7,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565357/peugeo_kbrrlo.jpg"
  }
];

const drivers = [
  {
    id: 1,
    name: "Jean-Pierre Mbarga",
    experience: "5 ans",
    rating: 4.9,
    trips: 1250,
    vehicle: "Peugeot 3008"
  },
  {
    id: 2,
    name: "Marie-Claire Nguemo",
    experience: "3 ans",
    rating: 4.8,
    trips: 890,
    vehicle: "Peugeot 508"
  },
  {
    id: 3,
    name: "Pierre Essomba",
    experience: "4 ans",
    rating: 4.7,
    trips: 1100,
    vehicle: "Peugeot 208"
  }
];

export default function DLTransportPage() {
  const { user, loading } = useAuth();
  const [showBookingModal, setShowBookingModal] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section avec Background Image */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            DL-Transport
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Votre service de transport premium personnel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dl-transport/booking">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              >
                <Car className="mr-2 h-5 w-5" />
                Réserver Maintenant
              </Button>
            </Link>
            <Link href="/dl-transport/tracking">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Suivre en Temps Réel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir DL-Transport ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un service de transport premium avec des véhicules de qualité et des chauffeurs expérimentés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Véhicules Premium</h3>
              <p className="text-gray-600">
                Flotte de véhicules Peugeot récents et bien entretenus pour votre confort et sécurité
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Chauffeurs Expérimentés</h3>
              <p className="text-gray-600">
                Équipe de chauffeurs professionnels avec des années d'expérience et excellentes évaluations
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sécurité Garantie</h3>
              <p className="text-gray-600">
                Suivi GPS en temps réel, assurance complète et protocoles de sécurité stricts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Flotte Premium
            </h2>
            <p className="text-xl text-gray-600">
              Une gamme complète de véhicules pour tous vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Économique */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-3xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2">Économique</h3>
              <p className="text-gray-600 mb-4">Véhicules compacts et économiques</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Peugeot 208</li>
                <li>• Toyota Yaris</li>
                <li>• À partir de 2000 FCFA</li>
              </ul>
            </div>

            {/* Confort */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl mb-4">🚙</div>
              <h3 className="text-xl font-semibold mb-2">Confort</h3>
              <p className="text-gray-600 mb-4">Berlines confortables et spacieuses</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Peugeot 3008</li>
                <li>• Peugeot 508</li>
                <li>• À partir de 2500 FCFA</li>
              </ul>
            </div>

            {/* Premium */}
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="text-3xl mb-4">🏎️</div>
              <h3 className="text-xl font-semibold mb-2">Premium</h3>
              <p className="text-gray-600 mb-4">Véhicules haut de gamme</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• BMW Série 3</li>
                <li>• Audi A4</li>
                <li>• À partir de 4000 FCFA</li>
              </ul>
            </div>

            {/* SUV */}
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-3xl mb-4">🚐</div>
              <h3 className="text-xl font-semibold mb-2">SUV</h3>
              <p className="text-gray-600 mb-4">Véhicules tout-terrain spacieux</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Range Rover Evoque</li>
                <li>• BMW X5</li>
                <li>• À partir de 5000 FCFA</li>
              </ul>
            </div>

            {/* Luxe */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="text-3xl mb-4">👑</div>
              <h3 className="text-xl font-semibold mb-2">Luxe</h3>
              <p className="text-gray-600 mb-4">Véhicules de luxe et prestige</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Mercedes Classe S</li>
                <li>• BMW Série 7</li>
                <li>• À partir de 6500 FCFA</li>
              </ul>
            </div>

            {/* Minibus */}
            <div className="bg-orange-50 rounded-lg p-6">
              <div className="text-3xl mb-4">🚌</div>
              <h3 className="text-xl font-semibold mb-2">Minibus</h3>
              <p className="text-gray-600 mb-4">Véhicules pour groupes</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Mercedes Vito</li>
                <li>• Toyota Hiace</li>
                <li>• À partir de 3200 FCFA</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link href="/dl-transport/booking">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Car className="mr-2 h-5 w-5" />
                Voir Tous les Véhicules
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Drivers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Chauffeurs Professionnels
            </h2>
            <p className="text-xl text-gray-600">
              Une équipe expérimentée et fiable à votre service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {drivers.map((driver) => (
              <div key={driver.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{driver.name}</h3>
                    <p className="text-gray-600">{driver.vehicle}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Expérience:</span>
                    <span className="font-medium">{driver.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Évaluation:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Courses:</span>
                    <span className="font-medium">{driver.trips}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Téléchargez l'Application DL-Transport
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Réservez vos courses en quelques clics, suivez votre chauffeur en temps réel et profitez d'un service premium
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              App Store
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Google Play
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Réservation Simple</h3>
              <p className="text-blue-100 text-sm">En quelques clics</p>
            </div>
            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Suivi GPS</h3>
              <p className="text-blue-100 text-sm">Temps réel</p>
            </div>
            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Paiement Sécurisé</h3>
              <p className="text-blue-100 text-sm">Sans contact</p>
            </div>
            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Service Premium</h3>
              <p className="text-blue-100 text-sm">Qualité garantie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tarifs Transparents
            </h2>
            <p className="text-xl text-gray-600">
              Des prix clairs sans surprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Standard</h3>
              <div className="text-4xl font-bold text-blue-600 mb-6">
                12 000 FCFA
                <span className="text-lg text-gray-500">/course</span>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Peugeot 208
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Chauffeur expérimenté
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Suivi GPS
                </li>
              </ul>
              <Link href="/dl-transport/pricing">
                <Button className="w-full">Voir les Détails</Button>
              </Link>
            </div>

            <div className="bg-blue-600 text-white border-2 border-blue-600 rounded-lg p-8 text-center transform scale-105">
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="text-4xl font-bold mb-6">
                15 000 FCFA
                <span className="text-lg text-blue-200">/course</span>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-200 mr-2" />
                  Peugeot 3008
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-200 mr-2" />
                  Chauffeur 5 étoiles
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-200 mr-2" />
                  Priorité réservation
                </li>
              </ul>
              <Link href="/dl-transport/pricing">
                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">
                  Voir les Détails
                </Button>
              </Link>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Luxe</h3>
              <div className="text-4xl font-bold text-blue-600 mb-6">
                18 000 FCFA
                <span className="text-lg text-gray-500">/course</span>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Peugeot 508
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Service VIP
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Confort maximum
                </li>
              </ul>
              <Link href="/dl-transport/pricing">
                <Button className="w-full">Voir les Détails</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Devenez Partenaire DL-Transport
            </h2>
            <p className="text-xl opacity-90">
              Rejoignez notre réseau et développez votre activité de transport
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Frais fixe mensuel</h3>
              <p className="text-2xl font-bold mb-2">50.000 FCFA</p>
              <p className="text-sm opacity-80">Aucun pourcentage sur vos bénéfices</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Application dédiée</h3>
              <p className="text-lg mb-2">Dashboard partenaire</p>
              <p className="text-sm opacity-80">Contrôle total de vos transports</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support prioritaire</h3>
              <p className="text-lg mb-2">Assistance 24/7</p>
              <p className="text-sm opacity-80">Accompagnement personnalisé</p>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Avantages Partenaire</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Frais mensuel fixe de 50.000 FCFA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Aucun pourcentage sur les courses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Application dédiée partenaire</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Contrôle total de vos véhicules</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Gestion de vos chauffeurs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Support technique prioritaire</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dl-transport/partnership">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Devenir Partenaire
                </Button>
              </Link>
              <Link href="/dl-transport/partner/dashboard">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Espace Partenaire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à Essayer DL-Transport ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits qui font confiance à DL-Transport pour leurs déplacements
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dl-transport/booking">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              >
                <Car className="mr-2 h-5 w-5" />
                Réserver Maintenant
              </Button>
            </Link>
            <Link href="/dl-transport/tracking">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Voir la Carte
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DL-Transport</h3>
              <p className="text-gray-300">
                Votre service de transport premium personnel avec des véhicules Peugeot de qualité.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/dl-transport/booking" className="hover:text-white">Réserver un Véhicule</Link></li>
                <li><Link href="/dl-transport/tracking" className="hover:text-white">Suivi en Temps Réel</Link></li>
                <li><Link href="/dl-transport/pricing" className="hover:text-white">Tarifs</Link></li>
                <li><Link href="/dl-transport/routes" className="hover:text-white">Optimisation Routes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Centre d'Aide</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Sécurité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Télécharger</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  App Store
                </Button>
                <Button variant="outline" size="sm" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  Google Play
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 DL-Transport. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Télécharger DL-Transport</h3>
            <p className="text-gray-600 mb-6">
              Choisissez votre plateforme pour télécharger l'application DL-Transport
            </p>
            <div className="space-y-4">
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                <Download className="mr-2 h-5 w-5" />
                App Store (iOS)
              </Button>
              <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                <Download className="mr-2 h-5 w-5" />
                Google Play (Android)
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowBookingModal(false)}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 