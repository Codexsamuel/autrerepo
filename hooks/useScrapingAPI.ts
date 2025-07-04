import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  country: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
}

interface ScrapingResponse {
  success: boolean;
  data: Product[];
  total: number;
  timestamp: string;
}

interface UseScrapingAPIOptions {
  category?: string;
  country?: string;
  search?: string;
  autoFetch?: boolean;
}

export function useScrapingAPI(options: UseScrapingAPIOptions = {}) {
  const { category, country, search, autoFetch = true } = options;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const API_BASE_URL = 'https://api.daveandlucesolutions.com';

  const fetchProducts = async (params?: UseScrapingAPIOptions) => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL(`${API_BASE_URL}/api/scraping/products`);
      
      if (params?.category) url.searchParams.append('category', params.category);
      if (params?.country) url.searchParams.append('country', params.country);
      if (params?.search) url.searchParams.append('search', params.search);

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: ScrapingResponse = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        setTotal(data.total);
      } else {
        throw new Error('Erreur de l\'API');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      console.error('Erreur lors de la récupération des produits:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = (searchTerm: string) => {
    fetchProducts({ ...options, search: searchTerm });
  };

  const filterByCategory = (categoryName: string) => {
    fetchProducts({ ...options, category: categoryName });
  };

  const filterByCountry = (countryName: string) => {
    fetchProducts({ ...options, country: countryName });
  };

  const clearFilters = () => {
    fetchProducts({});
  };

  // Auto-fetch au montage et quand les options changent
  useEffect(() => {
    if (autoFetch) {
      fetchProducts(options);
    }
  }, [category, country, search, autoFetch]);

  return {
    products,
    loading,
    error,
    total,
    fetchProducts,
    searchProducts,
    filterByCategory,
    filterByCountry,
    clearFilters,
    refetch: () => fetchProducts(options)
  };
}

// Hook spécialisé pour DL Style
export function useDLStyleProducts() {
  return useScrapingAPI({
    category: 'Véhicules',
    autoFetch: true
  });
}

// Hook pour les statistiques
export function useScrapingStats() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    categories: 0,
    countries: 0,
    lastUpdate: ''
  });
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.daveandlucesolutions.com/api/scraping/products');
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalProducts: data.total,
          categories: new Set(data.data.map((p: Product) => p.category)).size,
          countries: new Set(data.data.map((p: Product) => p.country)).size,
          lastUpdate: data.timestamp
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, refetch: fetchStats };
} 