'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndustrialProduct } from '@/types/product';
import {
    Clock,
    Factory,
    Package,
    Search,
    ShoppingCart,
    Star,
    Truck
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface IndustrialProductsProps {
  products?: IndustrialProduct[];
}

export default function IndustrialProducts({ products: initialProducts }: IndustrialProductsProps) {
  const [products, setProducts] = useState<IndustrialProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IndustrialProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  useEffect(() => {
    // Charger les produits depuis l'API ou utiliser les produits passés en props
    if (initialProducts) {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    } else {
      loadProducts();
    }
  }, [initialProducts]);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products/industrial');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      }
    } catch (error) {
      console.error('Error loading industrial products:', error);
    }
  };

  useEffect(() => {
    let filtered = products;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtre par origine
    if (selectedOrigin !== 'all') {
      filtered = filtered.filter(product => product.origin === selectedOrigin);
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedOrigin, sortBy]);

  const categories = [...new Set(products.map(p => p.category))];
  const origins = [...new Set(products.map(p => p.origin))];

  const getOriginFlag = (origin: string) => {
    const flags: Record<string, string> = {
      china: '🇨🇳',
      dubai: '🇦🇪',
      turkey: '🇹🇷',
      germany: '🇩🇪',
      japan: '🇯��',
      usa: '🇺🇸',
      italy: '🇮🇹'
    };
    return flags[origin] || '🌍';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      industrial: '🏭',
      technology: '💻',
      machinery: '⚙️',
      electronics: '🔌',
      tools: '🔧'
    };
    return icons[category] || '📦';
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Factory className="w-6 h-6 mr-2" />
            Produits Industriels
          </h2>
          <p className="text-gray-600 mt-1">
            Technologies et pièces d'engins depuis les marchés internationaux
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {filteredProducts.length} produits
        </Badge>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {getCategoryIcon(category)} {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
              <SelectTrigger>
                <SelectValue placeholder="Origine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les origines</SelectItem>
                {origins.map(origin => (
                  <SelectItem key={origin} value={origin}>
                    {getOriginFlag(origin)} {origin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="price">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="rating">Note</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/images/products/placeholder.jpg';
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {getOriginFlag(product.origin)}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <Badge variant="destructive" className="text-xs">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center">
                    <Package className="w-3 h-3 mr-1" />
                    {product.supplier}
                  </div>
                  {product.minimumOrder && (
                    <div className="flex items-center">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Min: {product.minimumOrder} unités
                    </div>
                  )}
                  {product.leadTime && (
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {product.leadTime}
                    </div>
                  )}
                </div>
                
                <Button className="w-full mt-3" size="sm">
                  <Truck className="w-4 h-4 mr-2" />
                  Ajouter au panier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 