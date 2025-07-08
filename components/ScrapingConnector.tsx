'use client';

import { AlertCircle, CheckCircle, Loader2, Search, ShoppingCart } from 'lucide-react';
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

export default function ScrapingConnector() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Configuration du backend Vercel
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://autrerepo-69ck.vercel.app';

  // Vérifier le statut du backend
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/debug/env`);
        if (response.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch (err) {
        setBackendStatus('offline');
      }
    };

    checkBackendStatus();
  }, [BACKEND_URL]);

  // Fonction de recherche de produits
  const searchProducts = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/scraping/products?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: ScrapingResponse = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        throw new Error('Erreur lors de la récupération des produits');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Recherche automatique après 500ms d'inactivité
  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchProducts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Statut du backend */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          {backendStatus === 'checking' && (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
              <span className="text-sm text-yellow-600">Vérification du backend...</span>
            </>
          )}
          {backendStatus === 'online' && (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">Backend Vercel connecté</span>
            </>
          )}
          {backendStatus === 'offline' && (
            <>
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-600">Backend Vercel hors ligne</span>
            </>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Backend: {BACKEND_URL}
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher des produits (ex: phone, voiture, vêtements)..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={backendStatus === 'offline'}
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
          )}
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Résultats */}
      {products.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {products.length} produit(s) trouvé(s) pour "{query}"
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={product.image || '/images/placeholder-product.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-product.jpg';
                    }}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-green-600">
                      {product.price.toLocaleString()} {product.currency}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.country}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <span>★</span>
                      <span>{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                    <span className="text-green-600 font-medium">
                      Stock: {product.stock}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.category}
                    </span>
                    <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-sm">Ajouter</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message si aucun résultat */}
      {query && !loading && products.length === 0 && !error && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun produit trouvé
          </h3>
          <p className="text-gray-600">
            Essayez avec d'autres mots-clés ou vérifiez l'orthographe.
          </p>
        </div>
      )}

      {/* Informations de debug */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Informations de Debug</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Backend URL: {BACKEND_URL}</p>
          <p>• Statut: {backendStatus}</p>
          <p>• Produits chargés: {products.length}</p>
          <p>• Requête: {query || 'Aucune'}</p>
        </div>
      </div>
    </div>
  );
} 