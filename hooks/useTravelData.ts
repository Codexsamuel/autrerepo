"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

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

export interface TravelStats {
  totalDestinations: number;
  totalFlights: number;
  totalHotels: number;
  totalActivities: number;
  totalPackages: number;
  averageFlightPrice: number;
  averageHotelPrice: number;
  continents: string[];
  airlines: string[];
  hotelChains: string[];
}

export interface TravelData {
  destinations: TravelDestination[];
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  packages: TravelPackage[];
  stats: TravelStats;
}

export interface UseTravelDataOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // en millisecondes
  initialFilters?: {
    continent?: string;
    priceRange?: string;
    rating?: number;
  };
}

export function useTravelData(options: UseTravelDataOptions = {}) {
  const {
    autoRefresh = true,
    refreshInterval = 30000, // 30 secondes par défaut
    initialFilters = {}
  } = options;

  const [data, setData] = useState<TravelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Use ref to store the latest filters to avoid dependency issues
  const filtersRef = useRef(initialFilters);
  filtersRef.current = initialFilters;

  // Fonction pour récupérer les données
  const fetchData = useCallback(async (filters = filtersRef.current) => {
    try {
      setIsUpdating(true);
      setError(null);

      const params = new URLSearchParams();
      params.append('timestamp', Date.now().toString()); // Éviter le cache
      
      // Add filters, filtering out undefined values
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/travel?${params}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setLastUpdate(new Date());
        setIsOnline(true);
      } else {
        throw new Error(result.error || 'Erreur lors de la récupération des données');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des données de voyage:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setIsOnline(false);
    } finally {
      setLoading(false);
      setIsUpdating(false);
    }
  }, []); // Empty dependency array since we use ref for filters

  // Fonction pour rechercher
  const search = useCallback(async (query: string) => {
    try {
      const response = await fetch(`/api/travel?action=search&query=${encodeURIComponent(query)}`);
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors de la recherche');
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      throw err;
    }
  }, []);

  // Fonction pour filtrer les destinations
  const filterDestinations = useCallback(async (filters: {
    continent?: string;
    priceRange?: string;
    rating?: number;
  }) => {
    try {
      const params = new URLSearchParams();
      params.append('action', 'destinations');
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/travel?${params}`);
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors du filtrage');
      }
    } catch (err) {
      console.error('Erreur lors du filtrage des destinations:', err);
      throw err;
    }
  }, []);

  // Fonction pour filtrer les vols
  const filterFlights = useCallback(async (filters: {
    from?: string;
    to?: string;
    date?: string;
    maxPrice?: number;
    stops?: number;
  }) => {
    try {
      const params = new URLSearchParams();
      params.append('action', 'flights');
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/travel?${params}`);
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors du filtrage');
      }
    } catch (err) {
      console.error('Erreur lors du filtrage des vols:', err);
      throw err;
    }
  }, []);

  // Fonction pour filtrer les hôtels
  const filterHotels = useCallback(async (filters: {
    location?: string;
    maxPrice?: number;
    stars?: number;
    amenities?: string[];
  }) => {
    try {
      const params = new URLSearchParams();
      params.append('action', 'hotels');
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, value.toString());
          }
        }
      });

      const response = await fetch(`/api/travel?${params}`);
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors du filtrage');
      }
    } catch (err) {
      console.error('Erreur lors du filtrage des hôtels:', err);
      throw err;
    }
  }, []);

  // Fonction pour rafraîchir manuellement
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Effet pour la récupération initiale
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Effet pour la mise à jour automatique
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      if (isOnline) {
        fetchData();
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchData, isOnline]);

  // Effet pour détecter la connectivité
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (data === null) {
        fetchData();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [fetchData, data]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    isOnline,
    isUpdating,
    refresh,
    search,
    filterDestinations,
    filterFlights,
    filterHotels
  };
} 