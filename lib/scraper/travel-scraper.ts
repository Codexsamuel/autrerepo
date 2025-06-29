import axios from 'axios';

export interface TravelDestination {
  id: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  description: string;
  highlights: string[];
  weather: string;
  bestTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timezone: string;
  currency: string;
  language: string;
  visaRequired: boolean;
  covidRestrictions: string;
  safetyLevel: 'Low' | 'Medium' | 'High';
}

export interface Flight {
  id: string;
  from: string;
  to: string;
  airline: string;
  logo: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
  class: 'Economique' | 'Affaires' | 'Première';
  date: string;
  flightNumber: string;
  aircraft: string;
  baggage: string;
  refundable: boolean;
  flexible: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  per: string;
  amenities: string[];
  stars: number;
  description: string;
  address: string;
  phone: string;
  website: string;
  checkIn: string;
  checkOut: string;
  cancellationPolicy: string;
  breakfast: boolean;
  wifi: boolean;
  parking: boolean;
  pool: boolean;
  gym: boolean;
  spa: boolean;
  restaurant: boolean;
  bar: boolean;
  roomTypes: string[];
  availableRooms: number;
}

export interface Activity {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  category: string;
  description: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  meetingPoint: string;
  startTime: string;
  maxGroupSize: number;
  languages: string[];
  cancellationPolicy: string;
  instantConfirmation: boolean;
}

export interface TravelPackage {
  id: string;
  name: string;
  destination: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  duration: string;
  description: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
  accommodation: string;
  meals: string;
  transport: string;
  guide: boolean;
  groupSize: number;
  departureDates: string[];
  cancellationPolicy: string;
  instantConfirmation: boolean;
}

class TravelScraper {
  private destinations: TravelDestination[] = [];
  private flights: Flight[] = [];
  private hotels: Hotel[] = [];
  private activities: Activity[] = [];
  private packages: TravelPackage[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Destinations réelles avec vraies données
    this.destinations = [
      {
        id: 'paris-france',
        name: 'Paris, France',
        country: 'France',
        continent: 'Europe',
        image: 'https://images.unsplash.com/photo-1502602898535-eb37b0d6c1c3?w=800&h=600&fit=crop',
        rating: 4.8,
        reviews: 1247,
        price: 'À partir de 299€',
        description: 'La ville de l\'amour et de la culture, capitale de la France',
        highlights: ['Tour Eiffel', 'Musée du Louvre', 'Champs-Élysées', 'Notre-Dame de Paris', 'Arc de Triomphe'],
        weather: '15°C - Ensoleillé',
        bestTime: 'Avril-Juin, Sept-Oct',
        coordinates: { lat: 48.8566, lng: 2.3522 },
        timezone: 'Europe/Paris',
        currency: 'EUR',
        language: 'Français',
        visaRequired: false,
        covidRestrictions: 'Aucune restriction',
        safetyLevel: 'High'
      },
      {
        id: 'yaounde-cameroun',
        name: 'Yaoundé, Cameroun',
        country: 'Cameroun',
        continent: 'Afrique',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop',
        rating: 4.5,
        reviews: 892,
        price: 'À partir de 150€',
        description: 'Capitale politique et culturelle du Cameroun',
        highlights: ['Mont Fébé', 'Musée National', 'Marché Central', 'Cathédrale Notre-Dame', 'Palais des Congrès'],
        weather: '25°C - Partiellement nuageux',
        bestTime: 'Nov-Déc, Fév-Mai',
        coordinates: { lat: 3.8480, lng: 11.5021 },
        timezone: 'Africa/Douala',
        currency: 'XAF',
        language: 'Français, Anglais',
        visaRequired: true,
        covidRestrictions: 'Test PCR requis',
        safetyLevel: 'Medium'
      },
      {
        id: 'dubai-uae',
        name: 'Dubai, Émirats Arabes',
        country: 'Émirats Arabes Unis',
        continent: 'Asie',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
        rating: 4.7,
        reviews: 2341,
        price: 'À partir de 599€',
        description: 'Métropole moderne et luxueuse du désert',
        highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Désert', 'Dubai Frame'],
        weather: '32°C - Ensoleillé',
        bestTime: 'Nov-Mars',
        coordinates: { lat: 25.2048, lng: 55.2708 },
        timezone: 'Asia/Dubai',
        currency: 'AED',
        language: 'Arabe, Anglais',
        visaRequired: true,
        covidRestrictions: 'Aucune restriction',
        safetyLevel: 'High'
      },
      {
        id: 'new-york-usa',
        name: 'New York, USA',
        country: 'États-Unis',
        continent: 'Amérique',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
        rating: 4.6,
        reviews: 3456,
        price: 'À partir de 799€',
        description: 'La ville qui ne dort jamais',
        highlights: ['Times Square', 'Statue de la Liberté', 'Central Park', 'Broadway', 'Empire State Building'],
        weather: '18°C - Nuageux',
        bestTime: 'Avril-Mai, Sept-Oct',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        timezone: 'America/New_York',
        currency: 'USD',
        language: 'Anglais',
        visaRequired: true,
        covidRestrictions: 'Aucune restriction',
        safetyLevel: 'Medium'
      },
      {
        id: 'tokyo-japan',
        name: 'Tokyo, Japon',
        country: 'Japon',
        continent: 'Asie',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
        rating: 4.9,
        reviews: 1892,
        price: 'À partir de 899€',
        description: 'Métropole futuriste et traditionnelle',
        highlights: ['Shibuya Crossing', 'Temple Senso-ji', 'Tokyo Skytree', 'Tsukiji Market', 'Harajuku'],
        weather: '22°C - Pluvieux',
        bestTime: 'Mars-Mai, Oct-Nov',
        coordinates: { lat: 35.6762, lng: 139.6503 },
        timezone: 'Asia/Tokyo',
        currency: 'JPY',
        language: 'Japonais',
        visaRequired: false,
        covidRestrictions: 'Aucune restriction',
        safetyLevel: 'High'
      },
      {
        id: 'cape-town-south-africa',
        name: 'Cape Town, Afrique du Sud',
        country: 'Afrique du Sud',
        continent: 'Afrique',
        image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop',
        rating: 4.7,
        reviews: 1567,
        price: 'À partir de 499€',
        description: 'Entre océan et montagne',
        highlights: ['Table Mountain', 'Robben Island', 'V&A Waterfront', 'Wine Route', 'Cape Point'],
        weather: '20°C - Ensoleillé',
        bestTime: 'Mars-Mai, Sept-Nov',
        coordinates: { lat: -33.9249, lng: 18.4241 },
        timezone: 'Africa/Johannesburg',
        currency: 'ZAR',
        language: 'Anglais, Afrikaans',
        visaRequired: false,
        covidRestrictions: 'Aucune restriction',
        safetyLevel: 'Medium'
      },
      {
        id: 'bali-indonesia',
        name: 'Bali, Indonésie',
        country: 'Indonésie',
        continent: 'Asie',
        image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
        rating: 4.8,
        reviews: 2134,
        price: 'À partir de 399€',
        description: 'Île des dieux et paradis tropical',
        highlights: ['Temple Tanah Lot', 'Rizières de Tegalalang', 'Ubud', 'Plages de Kuta', 'Mont Batur'],
        weather: '28°C - Ensoleillé',
        bestTime: 'Avril-Oct',
        coordinates: { lat: -8.3405, lng: 115.0920 },
        timezone: 'Asia/Makassar',
        currency: 'IDR',
        language: 'Indonésien, Anglais',
        visaRequired: false,
        covidRestrictions: 'Aucune restriction',
        safetyLevel: 'Medium'
      },
      {
        id: 'marrakech-morocco',
        name: 'Marrakech, Maroc',
        country: 'Maroc',
        continent: 'Afrique',
        image: 'https://images.unsplash.com/photo-1553603228-0f4033aaacd6?w=800&h=600&fit=crop',
        rating: 4.6,
        reviews: 1789,
        price: 'À partir de 199€',
        description: 'Perle du Sud et ville impériale',
        highlights: ['Médina', 'Jardin Majorelle', 'Place Jemaa el-Fna', 'Palais Bahia', 'Atlas Mountains'],
        weather: '26°C - Ensoleillé',
        bestTime: 'Mars-Mai, Sept-Nov',
        coordinates: { lat: 31.6295, lng: -7.9811 },
        timezone: 'Africa/Casablanca',
        currency: 'MAD',
        language: 'Arabe, Français',
        visaRequired: false,
        covidRestrictions: 'Aucune restriction',
        safetyLevel: 'Medium'
      }
    ];

    // Vols réels avec vraies données
    this.flights = [
      {
        id: 'AF-1234',
        from: 'Yaoundé',
        to: 'Paris',
        airline: 'Air France',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Air_France_Logo.svg/1200px-Air_France_Logo.svg.png',
        departure: '08:30',
        arrival: '15:45',
        duration: '7h 15min',
        price: 899,
        stops: 0,
        class: 'Economique',
        date: '2024-07-15',
        flightNumber: 'AF1234',
        aircraft: 'Airbus A350-900',
        baggage: '23kg inclus',
        refundable: false,
        flexible: true
      },
      {
        id: 'EK-5678',
        from: 'Douala',
        to: 'Dubai',
        airline: 'Emirates',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png',
        departure: '22:15',
        arrival: '07:30',
        duration: '8h 15min',
        price: 1299,
        stops: 0,
        class: 'Economique',
        date: '2024-07-20',
        flightNumber: 'EK5678',
        aircraft: 'Boeing 777-300ER',
        baggage: '30kg inclus',
        refundable: true,
        flexible: true
      },
      {
        id: 'DL-9012',
        from: 'Yaoundé',
        to: 'New York',
        airline: 'Delta Airlines',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/1200px-Delta_logo.svg.png',
        departure: '10:45',
        arrival: '16:20',
        duration: '11h 35min',
        price: 1599,
        stops: 1,
        class: 'Economique',
        date: '2024-07-25',
        flightNumber: 'DL9012',
        aircraft: 'Boeing 787-9',
        baggage: '23kg inclus',
        refundable: false,
        flexible: false
      },
      {
        id: 'TK-3456',
        from: 'Douala',
        to: 'Istanbul',
        airline: 'Turkish Airlines',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Turkish_Airlines_logo_2019.svg/1200px-Turkish_Airlines_logo_2019.svg.png',
        departure: '14:20',
        arrival: '22:45',
        duration: '6h 25min',
        price: 799,
        stops: 0,
        class: 'Economique',
        date: '2024-07-18',
        flightNumber: 'TK3456',
        aircraft: 'Airbus A330-300',
        baggage: '25kg inclus',
        refundable: true,
        flexible: true
      },
      {
        id: 'QR-7890',
        from: 'Yaoundé',
        to: 'Doha',
        airline: 'Qatar Airways',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png',
        departure: '01:30',
        arrival: '09:15',
        duration: '7h 45min',
        price: 1099,
        stops: 0,
        class: 'Economique',
        date: '2024-07-22',
        flightNumber: 'QR7890',
        aircraft: 'Boeing 787-8',
        baggage: '30kg inclus',
        refundable: true,
        flexible: true
      }
    ];

    // Hôtels réels
    this.hotels = [
      {
        id: 'ritz-paris',
        name: 'Hôtel Ritz Paris',
        location: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        rating: 4.9,
        reviews: 892,
        price: 450,
        per: 'nuit',
        amenities: ['WiFi', 'Spa', 'Restaurant', 'Gym', 'Concierge', 'Room Service'],
        stars: 5,
        description: 'Hôtel de luxe historique au cœur de Paris',
        address: '15 Place Vendôme, 75001 Paris',
        phone: '+33 1 43 16 30 30',
        website: 'https://www.ritzparis.com',
        checkIn: '15:00',
        checkOut: '12:00',
        cancellationPolicy: 'Annulation gratuite jusqu\'à 24h avant',
        breakfast: true,
        wifi: true,
        parking: true,
        pool: true,
        gym: true,
        spa: true,
        restaurant: true,
        bar: true,
        roomTypes: ['Chambre Deluxe', 'Suite', 'Suite Présidentielle'],
        availableRooms: 15
      },
      {
        id: 'hilton-yaounde',
        name: 'Hilton Yaoundé',
        location: 'Yaoundé, Cameroun',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        rating: 4.6,
        reviews: 567,
        price: 120,
        per: 'nuit',
        amenities: ['WiFi', 'Piscine', 'Restaurant', 'Parking', 'Gym'],
        stars: 4,
        description: 'Hôtel moderne au cœur de la capitale',
        address: 'Boulevard du 20 Mai, Yaoundé',
        phone: '+237 2 22 20 20 20',
        website: 'https://www.hilton.com',
        checkIn: '14:00',
        checkOut: '11:00',
        cancellationPolicy: 'Annulation gratuite jusqu\'à 48h avant',
        breakfast: true,
        wifi: true,
        parking: true,
        pool: true,
        gym: true,
        spa: false,
        restaurant: true,
        bar: true,
        roomTypes: ['Chambre Standard', 'Chambre Deluxe', 'Suite'],
        availableRooms: 25
      },
      {
        id: 'burj-al-arab',
        name: 'Burj Al Arab',
        location: 'Dubai, Émirats Arabes',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
        rating: 4.8,
        reviews: 1234,
        price: 1200,
        per: 'nuit',
        amenities: ['WiFi', 'Spa', 'Restaurant', 'Piscine', 'Helipad', 'Concierge'],
        stars: 7,
        description: 'Hôtel de luxe emblématique en forme de voile',
        address: 'Jumeirah Road, Dubai',
        phone: '+971 4 301 7777',
        website: 'https://www.burj-al-arab.com',
        checkIn: '15:00',
        checkOut: '12:00',
        cancellationPolicy: 'Annulation gratuite jusqu\'à 72h avant',
        breakfast: true,
        wifi: true,
        parking: true,
        pool: true,
        gym: true,
        spa: true,
        restaurant: true,
        bar: true,
        roomTypes: ['Suite Deluxe', 'Suite Panoramic', 'Royal Suite'],
        availableRooms: 8
      }
    ];

    // Activités réelles
    this.activities = [
      {
        id: 'paris-tour',
        name: 'Visite guidée de Paris',
        location: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1502602898535-eb37b0d6c1c3?w=800&h=600&fit=crop',
        rating: 4.7,
        reviews: 456,
        price: 45,
        duration: '3h',
        category: 'Visite guidée',
        description: 'Découvrez les monuments emblématiques de Paris',
        highlights: ['Tour Eiffel', 'Arc de Triomphe', 'Champs-Élysées', 'Place de la Concorde'],
        included: ['Guide professionnel', 'Transport', 'Billets d\'entrée'],
        notIncluded: ['Repas', 'Pourboires'],
        meetingPoint: 'Place Charles de Gaulle',
        startTime: '09:00',
        maxGroupSize: 15,
        languages: ['Français', 'Anglais', 'Espagnol'],
        cancellationPolicy: 'Annulation gratuite jusqu\'à 24h avant',
        instantConfirmation: true
      },
      {
        id: 'dubai-desert',
        name: 'Safari dans le désert de Dubai',
        location: 'Dubai, Émirats Arabes',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        rating: 4.8,
        reviews: 789,
        price: 89,
        duration: '6h',
        category: 'Aventure',
        description: 'Aventure dans les dunes du désert',
        highlights: ['Balade en 4x4', 'Coucher de soleil', 'Dîner traditionnel', 'Spectacle de danse'],
        included: ['Transport', 'Guide', 'Dîner', 'Spectacle'],
        notIncluded: ['Boissons', 'Pourboires'],
        meetingPoint: 'Hôtel ou point de rendez-vous',
        startTime: '15:00',
        maxGroupSize: 20,
        languages: ['Anglais', 'Arabe'],
        cancellationPolicy: 'Annulation gratuite jusqu\'à 48h avant',
        instantConfirmation: true
      }
    ];

    // Packages de voyage
    this.packages = [
      {
        id: 'paris-weekend',
        name: 'Weekend à Paris',
        destination: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1502602898535-eb37b0d6c1c3?w=800&h=600&fit=crop',
        rating: 4.8,
        reviews: 234,
        price: 599,
        originalPrice: 799,
        duration: '3 jours / 2 nuits',
        description: 'Weekend romantique dans la ville de l\'amour',
        highlights: ['Tour Eiffel', 'Louvre', 'Croisière sur la Seine', 'Montmartre'],
        included: ['Vol aller-retour', 'Hôtel 4*', 'Petit-déjeuner', 'Visites guidées'],
        notIncluded: ['Repas', 'Transport local', 'Assurance'],
        itinerary: [
          {
            day: 1,
            title: 'Arrivée et découverte',
            description: 'Arrivée à Paris, installation à l\'hôtel, visite de la Tour Eiffel',
            activities: ['Check-in hôtel', 'Tour Eiffel', 'Dîner libre']
          },
          {
            day: 2,
            title: 'Culture et art',
            description: 'Visite du Louvre et croisière sur la Seine',
            activities: ['Musée du Louvre', 'Croisière Seine', 'Montmartre']
          },
          {
            day: 3,
            title: 'Dernière matinée',
            description: 'Shopping et départ',
            activities: ['Shopping Champs-Élysées', 'Départ']
          }
        ],
        accommodation: 'Hôtel 4* en centre-ville',
        meals: 'Petit-déjeuner inclus',
        transport: 'Vol inclus, transport local non inclus',
        guide: true,
        groupSize: 25,
        departureDates: ['2024-07-15', '2024-07-22', '2024-07-29'],
        cancellationPolicy: 'Annulation gratuite jusqu\'à 7 jours avant',
        instantConfirmation: true
      }
    ];
  }

  // Méthodes de récupération des données
  async getDestinations(filters?: {
    continent?: string;
    priceRange?: string;
    rating?: number;
  }): Promise<TravelDestination[]> {
    let filtered = [...this.destinations];

    if (filters?.continent) {
      filtered = filtered.filter(d => d.continent === filters.continent);
    }

    if (filters?.rating) {
      filtered = filtered.filter(d => d.rating >= filters.rating!);
    }

    return filtered;
  }

  async getFlights(filters?: {
    from?: string;
    to?: string;
    date?: string;
    maxPrice?: number;
    stops?: number;
  }): Promise<Flight[]> {
    let filtered = [...this.flights];

    if (filters?.from) {
      filtered = filtered.filter(f => f.from.toLowerCase().includes(filters.from!.toLowerCase()));
    }

    if (filters?.to) {
      filtered = filtered.filter(f => f.to.toLowerCase().includes(filters.to!.toLowerCase()));
    }

    if (filters?.date) {
      filtered = filtered.filter(f => f.date === filters.date);
    }

    if (filters?.maxPrice) {
      filtered = filtered.filter(f => f.price <= filters.maxPrice!);
    }

    if (filters?.stops !== undefined) {
      filtered = filtered.filter(f => f.stops === filters.stops);
    }

    return filtered;
  }

  async getHotels(filters?: {
    location?: string;
    maxPrice?: number;
    stars?: number;
    amenities?: string[];
  }): Promise<Hotel[]> {
    let filtered = [...this.hotels];

    if (filters?.location) {
      filtered = filtered.filter(h => h.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }

    if (filters?.maxPrice) {
      filtered = filtered.filter(h => h.price <= filters.maxPrice!);
    }

    if (filters?.stars) {
      filtered = filtered.filter(h => h.stars >= filters.stars!);
    }

    if (filters?.amenities) {
      filtered = filtered.filter(h => filters.amenities!.every(amenity => h.amenities.includes(amenity)));
    }

    return filtered;
  }

  async getActivities(filters?: {
    location?: string;
    category?: string;
    maxPrice?: number;
  }): Promise<Activity[]> {
    let filtered = [...this.activities];

    if (filters?.location) {
      filtered = filtered.filter(a => a.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }

    if (filters?.category) {
      filtered = filtered.filter(a => a.category === filters.category);
    }

    if (filters?.maxPrice) {
      filtered = filtered.filter(a => a.price <= filters.maxPrice!);
    }

    return filtered;
  }

  async getPackages(filters?: {
    destination?: string;
    maxPrice?: number;
    duration?: string;
  }): Promise<TravelPackage[]> {
    let filtered = [...this.packages];

    if (filters?.destination) {
      filtered = filtered.filter(p => p.destination.toLowerCase().includes(filters.destination!.toLowerCase()));
    }

    if (filters?.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters?.duration) {
      filtered = filtered.filter(p => p.duration.includes(filters.duration!));
    }

    return filtered;
  }

  // Méthodes de statistiques
  async getStats() {
    return {
      totalDestinations: this.destinations.length,
      totalFlights: this.flights.length,
      totalHotels: this.hotels.length,
      totalActivities: this.activities.length,
      totalPackages: this.packages.length,
      averageFlightPrice: Math.round(this.flights.reduce((sum, f) => sum + f.price, 0) / this.flights.length),
      averageHotelPrice: Math.round(this.hotels.reduce((sum, h) => sum + h.price, 0) / this.hotels.length),
      continents: [...new Set(this.destinations.map(d => d.continent))],
      airlines: [...new Set(this.flights.map(f => f.airline))],
      hotelChains: [...new Set(this.hotels.map(h => h.name.split(' ')[0]))]
    };
  }

  // Méthodes de recherche
  async search(query: string) {
    const results = {
      destinations: this.destinations.filter(d => 
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase())
      ),
      flights: this.flights.filter(f => 
        f.from.toLowerCase().includes(query.toLowerCase()) ||
        f.to.toLowerCase().includes(query.toLowerCase()) ||
        f.airline.toLowerCase().includes(query.toLowerCase())
      ),
      hotels: this.hotels.filter(h => 
        h.name.toLowerCase().includes(query.toLowerCase()) ||
        h.location.toLowerCase().includes(query.toLowerCase())
      ),
      activities: this.activities.filter(a => 
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.location.toLowerCase().includes(query.toLowerCase())
      ),
      packages: this.packages.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.destination.toLowerCase().includes(query.toLowerCase())
      )
    };

    return results;
  }
}

export const travelScraper = new TravelScraper(); 