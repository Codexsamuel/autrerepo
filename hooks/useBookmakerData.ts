"use client";

import { useState, useEffect, useCallback } from 'react';

export interface BookmakerMatch {
  id: string;
  sport: string;
  league: string;
  teams: [string, string];
  date: string;
  time: string;
  status: 'à venir' | 'en cours' | 'terminé';
  score?: [number, number];
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  country: string;
  logo1: string;
  logo2: string;
}

export interface BookmakerBet {
  id: string;
  matchId: string;
  type: '1N2' | 'Over/Under' | 'Score exact' | 'Double chance';
  option: string;
  odds: number;
  status: 'ouvert' | 'fermé' | 'gagné' | 'perdu';
  stake: number;
  potentialWin: number;
  user?: string;
}

export interface BookmakerStats {
  totalMatches: number;
  totalSports: number;
  totalLeagues: number;
  totalBets: number;
  averageOdds: number;
  sports: string[];
  leagues: string[];
}

export interface BookmakerData {
  matches: BookmakerMatch[];
  bets: BookmakerBet[];
  stats: BookmakerStats;
  boosts: any[];
  liveMatches: any[];
  comboBets: any[];
  bonuses: any[];
  missions: any[];
  ranking: any[];
}

export interface UseBookmakerDataOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  initialFilters?: {
    sport?: string;
    league?: string;
    date?: string;
    status?: string;
  };
}

export function useBookmakerData(options: UseBookmakerDataOptions = {}) {
  const {
    autoRefresh = true,
    refreshInterval = 30000,
    initialFilters = {}
  } = options;

  const [data, setData] = useState<BookmakerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [boosts, setBoosts] = useState<any[]>([]);
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [comboBets, setComboBets] = useState<any[]>([]);
  const [bonuses, setBonuses] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [ranking, setRanking] = useState<any[]>([]);

  // Nouvelle fonction pour tout charger
  const fetchAll = useCallback(async () => {
    try {
      setIsUpdating(true);
      setError(null);
      const response = await fetch(`/api/bookmaker`);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setBoosts(result.data.boosts || []);
        setLiveMatches(result.data.liveMatches || []);
        setComboBets(result.data.comboBets || []);
        setBonuses(result.data.bonuses || []);
        setMissions(result.data.missions || []);
        setRanking(result.data.ranking || []);
        setLastUpdate(new Date());
        setIsOnline(true);
      } else {
        throw new Error(result.error || 'Erreur lors de la récupération des données');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setIsOnline(false);
    } finally {
      setLoading(false);
      setIsUpdating(false);
    }
  }, []);

  // Recherche
  const search = useCallback(async (query: string) => {
    try {
      const response = await fetch(`/api/bookmaker?action=search&query=${encodeURIComponent(query)}`);
      const result = await response.json();
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors de la recherche');
      }
    } catch (err) {
      throw err;
    }
  }, []);

  // Filtrage des matchs
  const filterMatches = useCallback(async (filters: {
    sport?: string;
    league?: string;
    date?: string;
    status?: string;
  }) => {
    try {
      const params = new URLSearchParams({
        action: 'matches',
        ...Object.fromEntries(
          Object.entries(filters).map(([key, value]) => [key, value?.toString() || ''])
        )
      });
      const response = await fetch(`/api/bookmaker?${params}`);
      const result = await response.json();
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors du filtrage');
      }
    } catch (err) {
      throw err;
    }
  }, []);

  // Rafraîchir manuellement
  const refresh = useCallback(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll, initialFilters]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      if (isOnline) fetchAll();
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchAll, initialFilters, isOnline]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (data === null) fetchAll();
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [fetchAll, initialFilters, data]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    isOnline,
    isUpdating,
    refresh: fetchAll,
    search,
    filterMatches,
    boosts,
    liveMatches,
    comboBets,
    bonuses,
    missions,
    ranking
  };
} 