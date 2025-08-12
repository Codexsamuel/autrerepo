'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Search, 
  Truck,
  Shield,
  Globe,
  RefreshCw,
  Plus,
  Eye
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  stock: number;
  isNew: boolean;
  isOnSale: boolean;
  discount?: number;
}

export default function DLStyle() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'iPhone 15 Pro Max',
          category: 'Électronique',
          brand: 'Apple',
          price: 850000,
          originalPrice: 950000,
          currency: 'FCFA',
          rating: 4.8,
          stock: 15,
          isNew: true,
          isOnSale: true,
          discount: 10
        },
        {
          id: '2',
          name: 'BMW X5 2024',
          category: 'Automobile',
          brand: 'BMW',
          price: 45000000,
          currency: 'FCFA',
          rating: 4.9,
          stock: 3,
          isNew: true,
          isOnSale: false
        },
        {
          id: '3',
          name: 'Rolex Submariner',
          category: 'Luxe',
          brand: 'Rolex',
          price: 12500000,
          currency: 'FCFA',
          rating: 4.9,
          stock: 2,
          isNew: false,
          isOnSale: false
        }
      ];
      
      setProducts(mockProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <h2 className="text-xl text-gray-700 font-semibold">Chargement de la boutique...</h2>
          <p className="text-gray-500">Récupération des produits internationaux</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Globe className="w-10 h-10 mr-3" />
            DL Style
          </h1>
          <p className="text-xl mb-6">Boutique Internationale - Produits Premium du Monde Entier</p>
          
          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher des produits, marques..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-0 focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-white text-lg font-bold text-center px-4">{product.name}</span>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.rating})</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Stock</p>
                    <p className="font-semibold">{product.stock} disponible(s)</p>
                  </div>
                  <div className="text-right">
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()} {product.currency}
                      </p>
                    )}
                    <p className="text-xl font-bold text-purple-600">
                      {product.price.toLocaleString()} {product.currency}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Truck className="w-3 h-3 mr-1" />
                      Livraison gratuite
                    </span>
                    <span className="flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      Garantie incluse
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Services */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Nos Services Premium
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Truck className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">
                Livraison au Cameroun en 7-15 jours ouvrables
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dédouanement Inclus</h3>
              <p className="text-gray-600">
                Gestion complète des formalités douanières
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Globe className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Produits Authentiques</h3>
              <p className="text-gray-600">
                Tous nos produits sont 100% authentiques
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 