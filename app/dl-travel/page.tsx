'use client';

import { Calendar, Clock, Hotel, MapPin, Plane, Search, Star, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

export default function DLTravelPage() {
  const [activeTab, setActiveTab] = useState('vols');
  const [searchData, setSearchData] = useState({
    destination: '',
    depart: '',
    retour: '',
    voyageurs: 1,
    classe: 'economique'
  });

  const popularDestinations = [
    { name: 'Paris', country: 'France', image: '/images/destinations/paris.jpg', price: '299€' },
    { name: 'New York', country: 'États-Unis', image: '/images/destinations/newyork.jpg', price: '599€' },
    { name: 'Tokyo', country: 'Japon', image: '/images/destinations/tokyo.jpg', price: '799€' },
    { name: 'Bali', country: 'Indonésie', image: '/images/destinations/bali.jpg', price: '899€' },
    { name: 'Dubai', country: 'Émirats Arabes', image: '/images/destinations/dubai.jpg', price: '699€' },
    { name: 'Barcelona', country: 'Espagne', image: '/images/destinations/barcelona.jpg', price: '199€' }
  ];

  const specialOffers = [
    {
      title: 'Week-end à Paris',
      description: '2 nuits + petit déjeuner',
      price: '299€',
      originalPrice: '450€',
      image: '/images/offers/paris-weekend.jpg',
      validUntil: '2024-12-31'
    },
    {
      title: 'Séjour Bali',
      description: '7 nuits en hôtel 4*',
      price: '899€',
      originalPrice: '1200€',
      image: '/images/offers/bali-stay.jpg',
      validUntil: '2024-11-30'
    },
    {
      title: 'City Break New York',
      description: '4 nuits + vols inclus',
      price: '599€',
      originalPrice: '850€',
      image: '/images/offers/nyc-break.jpg',
      validUntil: '2024-10-31'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de recherche
    console.log('Recherche:', searchData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Hero */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold text-white mb-4">
            DL Travel
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Découvrez le monde avec nos offres exclusives et nos services premium
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-100 p-2 rounded-xl">
            <button
              onClick={() => setActiveTab('vols')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'vols' ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Plane className="w-5 h-5" />
              <span>Vols</span>
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'hotels' ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Hotel className="w-5 h-5" />
              <span>Hôtels</span>
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'packages' ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Packages</span>
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Où allez-vous ?"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Départ
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchData.depart}
                    onChange={(e) => setSearchData({...searchData, depart: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retour
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchData.retour}
                    onChange={(e) => setSearchData({...searchData, retour: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voyageurs
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchData.voyageurs}
                    onChange={(e) => setSearchData({...searchData, voyageurs: parseInt(e.target.value)})}
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'voyageur' : 'voyageurs'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Search className="inline w-5 h-5 mr-2" />
              Rechercher
            </button>
          </form>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Destinations Populaires
          </h2>
          <p className="text-gray-600 text-lg">
            Découvrez nos destinations les plus recherchées
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDestinations.map((destination, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold">{destination.name}</h3>
                  <p className="text-white/80">{destination.country}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{destination.price}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Voir les offres
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Offres Spéciales
            </h2>
            <p className="text-gray-600 text-lg">
              Des prix imbattables pour des voyages inoubliables
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialOffers.map((offer, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 relative">
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -{Math.round(((parseInt(offer.originalPrice) - parseInt(offer.price)) / parseInt(offer.originalPrice)) * 100)}%
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-blue-600">{offer.price}</span>
                      <span className="text-gray-400 line-through ml-2">{offer.originalPrice}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Valide jusqu'au</p>
                      <p className="text-sm font-medium">{new Date(offer.validUntil).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all">
                    Réserver maintenant
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Réservation 24/7</h3>
            <p className="text-gray-600">Réservez vos voyages à tout moment, jour et nuit</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Prix Garantis</h3>
            <p className="text-gray-600">Les meilleurs prix du marché garantis</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Service Premium</h3>
            <p className="text-gray-600">Un accompagnement personnalisé pour chaque voyage</p>
          </div>
        </div>
      </div>
    </div>
  );
}