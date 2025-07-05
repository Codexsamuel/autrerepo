'use client';

import { Filter, MapPin, Parking, Pool, Restaurant, Search, Spa, Star, Wifi } from 'lucide-react';
import { useState } from 'react';

export default function HotelsPage() {
  const [filters, setFilters] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    priceRange: [0, 500],
    stars: [],
    amenities: []
  });

  const [sortBy, setSortBy] = useState('recommended');

  const hotels = [
    {
      id: 1,
      name: 'Hôtel Luxe Paris',
      location: 'Paris, France',
      rating: 4.8,
      stars: 5,
      price: 299,
      originalPrice: 399,
      image: '/images/hotels/hotel-paris.jpg',
      amenities: ['wifi', 'pool', 'spa', 'restaurant'],
      description: 'Hôtel de luxe au cœur de Paris avec vue sur la Tour Eiffel',
      reviews: 1247
    },
    {
      id: 2,
      name: 'Resort Tropical Bali',
      location: 'Bali, Indonésie',
      rating: 4.9,
      stars: 5,
      price: 199,
      originalPrice: 299,
      image: '/images/hotels/hotel-bali.jpg',
      amenities: ['wifi', 'pool', 'spa', 'restaurant', 'parking'],
      description: 'Resort tropical avec plage privée et spa luxueux',
      reviews: 892
    },
    {
      id: 3,
      name: 'Business Hotel New York',
      location: 'New York, USA',
      rating: 4.6,
      stars: 4,
      price: 399,
      originalPrice: 499,
      image: '/images/hotels/hotel-nyc.jpg',
      amenities: ['wifi', 'restaurant', 'parking'],
      description: 'Hôtel d\'affaires moderne au centre de Manhattan',
      reviews: 2156
    },
    {
      id: 4,
      name: 'Boutique Hotel Barcelona',
      location: 'Barcelona, Espagne',
      rating: 4.7,
      stars: 4,
      price: 159,
      originalPrice: 199,
      image: '/images/hotels/hotel-barcelona.jpg',
      amenities: ['wifi', 'restaurant'],
      description: 'Hôtel boutique charmant dans le quartier gothique',
      reviews: 634
    },
    {
      id: 5,
      name: 'Desert Resort Dubai',
      location: 'Dubai, Émirats Arabes',
      rating: 4.9,
      stars: 5,
      price: 599,
      originalPrice: 799,
      image: '/images/hotels/hotel-dubai.jpg',
      amenities: ['wifi', 'pool', 'spa', 'restaurant', 'parking'],
      description: 'Resort de luxe dans le désert avec vue sur les dunes',
      reviews: 445
    },
    {
      id: 6,
      name: 'Mountain Lodge Swiss',
      location: 'Zermatt, Suisse',
      rating: 4.8,
      stars: 4,
      price: 349,
      originalPrice: 449,
      image: '/images/hotels/hotel-swiss.jpg',
      amenities: ['wifi', 'spa', 'restaurant'],
      description: 'Lodge de montagne avec vue panoramique sur les Alpes',
      reviews: 723
    }
  ];

  const amenities = [
    { id: 'wifi', label: 'WiFi gratuit', icon: Wifi },
    { id: 'pool', label: 'Piscine', icon: Pool },
    { id: 'parking', label: 'Parking', icon: Parking },
    { id: 'restaurant', label: 'Restaurant', icon: Restaurant },
    { id: 'spa', label: 'Spa', icon: Spa }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche hôtels:', filters);
  };

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const toggleStar = (star: number) => {
    setFilters(prev => ({
      ...prev,
      stars: prev.stars.includes(star)
        ? prev.stars.filter(s => s !== star)
        : [...prev.stars, star]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Recherche d'Hôtels</h1>
          <p className="text-xl opacity-90">Trouvez l'hôtel parfait pour votre séjour</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtres */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtres
              </h2>

              {/* Destination */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Où allez-vous ?"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.destination}
                    onChange={(e) => setFilters({...filters, destination: e.target.value})}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arrivée
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.checkIn}
                  onChange={(e) => setFilters({...filters, checkIn: e.target.value})}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Départ
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.checkOut}
                  onChange={(e) => setFilters({...filters, checkOut: e.target.value})}
                />
              </div>

              {/* Voyageurs */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voyageurs
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.guests}
                  onChange={(e) => setFilters({...filters, guests: parseInt(e.target.value)})}
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'voyageur' : 'voyageurs'}</option>
                  ))}
                </select>
              </div>

              {/* Chambres */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chambres
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.rooms}
                  onChange={(e) => setFilters({...filters, rooms: parseInt(e.target.value)})}
                >
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'chambre' : 'chambres'}</option>
                  ))}
                </select>
              </div>

              {/* Étoiles */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Étoiles
                </label>
                <div className="space-y-2">
                  {[5,4,3,2,1].map(star => (
                    <label key={star} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.stars.includes(star)}
                        onChange={() => toggleStar(star)}
                      />
                      <div className="flex items-center">
                        {[...Array(star)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{star} étoiles</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Équipements */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Équipements
                </label>
                <div className="space-y-2">
                  {amenities.map(amenity => (
                    <label key={amenity.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.amenities.includes(amenity.id)}
                        onChange={() => toggleAmenity(amenity.id)}
                      />
                      <amenity.icon className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm text-gray-600">{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Search className="inline w-4 h-4 mr-2" />
                Rechercher
              </button>
            </div>
          </div>

          {/* Résultats */}
          <div className="lg:col-span-3">
            {/* Tri */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  {hotels.length} hôtels trouvés
                </p>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommandés</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                  <option value="rating">Note</option>
                  <option value="distance">Distance</option>
                </select>
              </div>
            </div>

            {/* Liste des hôtels */}
            <div className="space-y-6">
              {hotels.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-blue-400 to-purple-500 relative">
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        -{Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}%
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                          <p className="text-gray-600 mb-2 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {hotel.location}
                          </p>
                          <div className="flex items-center mb-2">
                            <div className="flex items-center mr-4">
                              {[...Array(hotel.stars)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{hotel.rating}/5 ({hotel.reviews} avis)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-600">{hotel.price}€</div>
                          <div className="text-gray-400 line-through">{hotel.originalPrice}€</div>
                          <div className="text-sm text-gray-600">par nuit</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{hotel.description}</p>

                      {/* Équipements */}
                      <div className="flex items-center space-x-4 mb-4">
                        {hotel.amenities.map(amenity => {
                          const amenityData = amenities.find(a => a.id === amenity);
                          if (!amenityData) return null;
                          const Icon = amenityData.icon;
                          return (
                            <div key={amenity} className="flex items-center text-gray-600">
                              <Icon className="w-4 h-4 mr-1" />
                              <span className="text-sm">{amenityData.label}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between">
                        <button className="text-blue-600 font-medium hover:text-blue-700">
                          Voir les détails
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Réserver
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}