'use client';

import { Flag, Globe, Search, ShoppingCart, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  url: string;
  store: string;
  category: string;
  shipping: string;
  location: string;
}

interface TradingData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  high?: number;
  low?: number;
  timestamp: string;
}

export default function AdvancedScrapingDemo() {
  const [query, setQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [tradingData, setTradingData] = useState<TradingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markets = [
    { id: 'all', name: 'Tous les marchés', icon: Globe, color: 'blue' },
    { id: 'aliexpress', name: 'AliExpress (Chine)', icon: Flag, color: 'red' },
    { id: 'dubai', name: 'Dubaï (UAE)', icon: Flag, color: 'green' },
    { id: 'turkey', name: 'Turquie', icon: Flag, color: 'yellow' },
    { id: 'cameroon', name: 'Cameroun', icon: Flag, color: 'orange' }
  ];

  const searchProducts = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let url = `/api/scraping/products?q=${encodeURIComponent(query)}`;
      
      if (selectedMarket !== 'all') {
        url += `&source=${selectedMarket}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
      } else {
        throw new Error(data.error || 'Erreur lors de la récupération des produits');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTradingData = async () => {
    try {
      const response = await fetch('/api/trading/yahoo?symbol=AAPL');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTradingData(data.data);
        }
      }
    } catch (err) {
      console.error('Erreur trading:', err);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      const timeoutId = setTimeout(() => {
        searchProducts();
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setProducts([]);
    }
  }, [query, selectedMarket]);

  useEffect(() => {
    fetchTradingData();
    const interval = setInterval(fetchTradingData, 30000); // Mise à jour toutes les 30 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Démonstration Scraping Avancé
        </h1>
        <p className="text-gray-600">
          Recherchez des produits réels sur tous les marchés internationaux
        </p>
      </div>

      {/* Trading Data */}
      {tradingData && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Données Trading en Temps Réel
            </h2>
            <span className="text-sm text-gray-500">
              {new Date(tradingData.timestamp).toLocaleTimeString()}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{tradingData.symbol}</div>
              <div className="text-sm text-gray-600">Symbole</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">${tradingData.price?.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Prix</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${tradingData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tradingData.change >= 0 ? '+' : ''}{tradingData.change?.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Variation</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${tradingData.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tradingData.changePercent >= 0 ? '+' : ''}{tradingData.changePercent?.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600">%</div>
            </div>
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un produit (ex: iPhone, Samsung, etc.)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {markets.map((market) => {
              const Icon = market.icon;
              return (
                <button
                  key={market.id}
                  onClick={() => setSelectedMarket(market.id)}
                  className={`flex items-center px-4 py-3 rounded-lg border transition-colors ${
                    selectedMarket === market.id
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{market.name}</span>
                  <span className="sm:hidden">{market.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Résultats de recherche
            </h3>
            {loading && (
              <div className="flex items-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Recherche en cours...
              </div>
            )}
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        <div className="p-6">
          {products.length === 0 && !loading && !error && (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucun produit trouvé. Commencez votre recherche.</p>
            </div>
          )}

          {products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">{product.location}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        {product.price} {product.currency}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {product.originalPrice} {product.currency}
                        </span>
                      )}
                    </div>
                    {product.discount && (
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Stock: {product.stock}</span>
                    <span>{product.shipping}</span>
                  </div>
                  
                  <div className="mt-3">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center block hover:bg-blue-700 transition-colors"
                    >
                      Voir le produit
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 