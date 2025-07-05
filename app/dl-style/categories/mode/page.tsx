'use client';

import { Eye, Filter, Heart, Share2, Star } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  brand: string;
  inStock: boolean;
  discount?: number;
  tags: string[];
}

const products: Product[] = [
  {
    id: '1',
    name: 'T-Shirt Premium DL Collection',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 156,
    image: '/images/products/tshirt-premium.jpg',
    brand: 'DL Collection',
    inStock: true,
    discount: 25,
    tags: ['t-shirt', 'premium', 'cotton']
  },
  {
    id: '2',
    name: 'Jean Slim Fit Premium',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 89,
    image: '/images/products/jean-slim.jpg',
    brand: 'DL Denim',
    inStock: true,
    discount: 25,
    tags: ['jean', 'slim', 'denim']
  },
  {
    id: '3',
    name: 'Sneakers Urban Style',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviews: 234,
    image: '/images/products/sneakers-urban.jpg',
    brand: 'DL Footwear',
    inStock: true,
    discount: 19,
    tags: ['sneakers', 'urban', 'casual']
  },
  {
    id: '4',
    name: 'Veste Bomber Premium',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 67,
    image: '/images/products/bomber-jacket.jpg',
    brand: 'DL Outerwear',
    inStock: false,
    discount: 20,
    tags: ['veste', 'bomber', 'premium']
  },
  {
    id: '5',
    name: 'Polo Classic DL',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviews: 123,
    image: '/images/products/polo-classic.jpg',
    brand: 'DL Collection',
    inStock: true,
    discount: 17,
    tags: ['polo', 'classic', 'cotton']
  },
  {
    id: '6',
    name: 'Chaussures Oxford Business',
    price: 179.99,
    originalPrice: 219.99,
    rating: 4.8,
    reviews: 45,
    image: '/images/products/oxford-shoes.jpg',
    brand: 'DL Footwear',
    inStock: true,
    discount: 18,
    tags: ['chaussures', 'oxford', 'business']
  }
];

const brands = [
  'DL Collection',
  'DL Denim',
  'DL Footwear',
  'DL Outerwear',
  'DL Sport'
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Noir', 'Blanc', 'Bleu', 'Rouge', 'Vert', 'Gris'];

export default function ModeCategoryPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = products.filter(product => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSize = selectedSizes.length === 0 || selectedSizes.some(size => 
      product.tags.some(tag => tag.toLowerCase().includes(size.toLowerCase()))
    );
    const matchesColor = selectedColors.length === 0 || selectedColors.some(color => 
      product.tags.some(tag => tag.toLowerCase().includes(color.toLowerCase()))
    );
    
    return matchesBrand && matchesPrice && matchesSize && matchesColor;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mode</h1>
              <p className="text-gray-600 mt-1">
                Découvrez notre collection de vêtements et accessoires de mode
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {sortedProducts.length} produits
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Filtres</h3>
              
              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Marques</h4>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="mr-2"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Tailles</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 text-sm rounded border ${
                        selectedSizes.includes(size)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Couleurs</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`px-3 py-1 text-sm rounded border ${
                        selectedColors.includes(color)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Prix</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedBrands.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedSizes([]);
                    setSelectedColors([]);
                    setPriceRange([0, 300]);
                  }}
                  className="w-full text-blue-600 hover:text-blue-700 text-sm"
                >
                  Effacer tous les filtres
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="popularity">Popularité</option>
                    <option value="price-low">Prix croissant</option>
                    <option value="price-high">Prix décroissant</option>
                    <option value="rating">Note</option>
                    <option value="reviews">Avis</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {sortedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{product.discount}%
                      </div>
                    )}
                    <button className="absolute top-2 right-2 p-2 bg-white text-gray-400 hover:text-red-500 rounded-full">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xs text-gray-500">{product.brand}</span>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          €{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            €{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className={`text-sm px-2 py-1 rounded ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'En stock' : 'Rupture'}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        disabled={!product.inStock}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Ajouter au panier
                      </button>
                      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600">
                  Essayez de modifier vos filtres
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}