import { ArrowLeft, Calendar, Car, Heart, Mail, MapPin, Phone, Share2, Sparkles, Star, Users, UtensilsCrossed, Waves, Wifi } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  // Données simulées de l'hôtel
  const hotel = {
    id: params.id,
    name: 'Hôtel Luxe Paris',
    location: 'Paris, France',
    address: '123 Avenue des Champs-Élysées, 75008 Paris',
    rating: 4.8,
    stars: 5,
    reviews: 1247,
    description: 'Situé au cœur de Paris, cet hôtel de luxe 5 étoiles offre une vue imprenable sur la Tour Eiffel et les Champs-Élysées. Avec ses chambres élégantes, son spa luxueux et son restaurant gastronomique, c\'est l\'adresse parfaite pour un séjour inoubliable dans la Ville Lumière.',
    images: [
      '/images/hotels/hotel-paris-1.jpg',
      '/images/hotels/hotel-paris-2.jpg',
      '/images/hotels/hotel-paris-3.jpg',
      '/images/hotels/hotel-paris-4.jpg',
      '/images/hotels/hotel-paris-5.jpg'
    ],
    amenities: [
      { id: 'wifi', label: 'WiFi gratuit', icon: Wifi, available: true },
      { id: 'pool', label: 'Piscine intérieure', icon: Waves, available: true },
      { id: 'spa', label: 'Spa & Wellness', icon: Sparkles, available: true },
      { id: 'restaurant', label: 'Restaurant gastronomique', icon: UtensilsCrossed, available: true },
      { id: 'parking', label: 'Parking privé', icon: Car, available: true }
    ],
    rooms: [
      {
        id: 1,
        name: 'Chambre Deluxe',
        description: 'Chambre spacieuse avec vue sur la ville',
        price: 299,
        originalPrice: 399,
        capacity: 2,
        size: '35m²',
        features: ['Vue ville', 'Balcon', 'Mini-bar', 'TV écran plat']
      },
      {
        id: 2,
        name: 'Suite Eiffel',
        description: 'Suite de luxe avec vue directe sur la Tour Eiffel',
        price: 599,
        originalPrice: 799,
        capacity: 4,
        size: '65m²',
        features: ['Vue Tour Eiffel', 'Terrasse privée', 'Jacuzzi', 'Service conciergerie']
      },
      {
        id: 3,
        name: 'Chambre Executive',
        description: 'Chambre d\'affaires avec espace de travail',
        price: 399,
        originalPrice: 499,
        capacity: 2,
        size: '40m²',
        features: ['Bureau', 'Vue jardin', 'Cafetière', 'Accès lounge']
      }
    ],
    reviews: [
      {
        id: 1,
        user: 'Marie L.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Hôtel exceptionnel ! La vue sur la Tour Eiffel est magnifique et le service est impeccable. Je recommande vivement !'
      },
      {
        id: 2,
        user: 'Pierre D.',
        rating: 4,
        date: '2024-01-10',
        comment: 'Très bel hôtel, chambres confortables et personnel aimable. Petit bémol sur le prix du petit déjeuner.'
      },
      {
        id: 3,
        user: 'Sophie M.',
        rating: 5,
        date: '2024-01-08',
        comment: 'Séjour parfait ! Le spa est incroyable et la localisation est idéale pour visiter Paris.'
      }
    ]
  };

  const handleReservation = () => {
    console.log('Réservation:', {
      hotelId: hotel.id,
      roomId: hotel.rooms[selectedRoom].id,
      checkIn,
      checkOut,
      guests
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dl-travel/hotels" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour aux hôtels
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Informations principales */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
              <p className="text-gray-600 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {hotel.address}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(hotel.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-lg font-semibold">{hotel.rating}/5</span>
                </div>
                <span className="text-gray-600">({hotel.reviews} avis)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                À partir de {hotel.rooms[0].price}€
              </div>
              <div className="text-gray-600">par nuit</div>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">{hotel.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Galerie photos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="h-96 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                {/* Image principale */}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold">Vue sur la Tour Eiffel</h3>
                </div>
              </div>
              
              {/* Miniatures */}
              <div className="p-4">
                <div className="grid grid-cols-5 gap-2">
                  {hotel.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-16 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-blue-300 to-purple-400"></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Équipements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotel.amenities.map(amenity => (
                  <div key={amenity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <amenity.icon className="w-6 h-6 text-blue-600 mr-3" />
                    <span className="font-medium">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Avis */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Avis clients</h2>
              <div className="space-y-6">
                {hotel.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="font-semibold text-blue-600">
                            {review.user.split(' ')[0][0]}{review.user.split(' ')[1][0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{review.user}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Réservation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Réserver</h2>
              
              {/* Sélection de chambre */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type de chambre
                </label>
                <div className="space-y-3">
                  {hotel.rooms.map((room, index) => (
                    <label key={room.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="room"
                        value={index}
                        checked={selectedRoom === index}
                        onChange={(e) => setSelectedRoom(parseInt(e.target.value))}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{room.name}</div>
                        <div className="text-sm text-gray-600">{room.description}</div>
                        <div className="text-sm text-gray-500">
                          {room.size} • {room.capacity} personnes
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{room.price}€</div>
                        <div className="text-sm text-gray-400 line-through">{room.originalPrice}€</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arrivée
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Départ
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              {/* Voyageurs */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voyageurs
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'voyageur' : 'voyageurs'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Prix total */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Prix par nuit</span>
                  <span className="font-medium">{hotel.rooms[selectedRoom].price}€</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Frais de service</span>
                  <span className="font-medium">Gratuits</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg text-blue-600">{hotel.rooms[selectedRoom].price}€</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReservation}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Réserver maintenant
              </button>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Besoin d'aide ?</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>contact@dltravel.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}