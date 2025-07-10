'use client';

import AdvancedSEO from '@/components/AdvancedSEO';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ArrowRight,
    CreditCard,
    Grid,
    Heart,
    List,
    Package,
    Search,
    Shield,
    ShoppingBag,
    ShoppingCart,
    Star,
    Truck,
    User
} from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  fastDelivery: boolean;
  discount?: number;
}

const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max - 256GB - Titane Naturel',
    price: 1299,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 1247,
    image: '/images/products/iphone-15-pro.jpg',
    category: 'Smartphones',
    brand: 'Apple',
    inStock: true,
    fastDelivery: true,
    discount: 13
  },
  {
    id: '2',
    name: 'MacBook Air M3 - 13" - 8GB RAM - 256GB SSD',
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 892,
    image: '/images/products/macbook-air.jpg',
    category: 'Ordinateurs',
    brand: 'Apple',
    inStock: true,
    fastDelivery: true,
    discount: 8
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24 Ultra - 256GB - Noir',
    price: 1399,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 567,
    image: '/images/products/samsung-s24.jpg',
    category: 'Smartphones',
    brand: 'Samsung',
    inStock: true,
    fastDelivery: false,
    discount: 12
  },
  {
    id: '4',
    name: 'AirPods Pro 2ème génération',
    price: 249,
    originalPrice: 299,
    rating: 4.6,
    reviews: 2341,
    image: '/images/products/airpods-pro.jpg',
    category: 'Audio',
    brand: 'Apple',
    inStock: true,
    fastDelivery: true,
    discount: 17
  },
  {
    id: '5',
    name: 'iPad Air 5ème génération - 64GB - Wi-Fi',
    price: 699,
    originalPrice: 799,
    rating: 4.8,
    reviews: 445,
    image: '/images/products/ipad-air.jpg',
    category: 'Tablettes',
    brand: 'Apple',
    inStock: false,
    fastDelivery: false,
    discount: 12
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5 - Casque Bluetooth',
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviews: 1234,
    image: '/images/products/sony-wh1000xm5.jpg',
    category: 'Audio',
    brand: 'Sony',
    inStock: true,
    fastDelivery: true,
    discount: 12
  }
];

const categories = [
  'Tous les produits',
  'Smartphones',
  'Ordinateurs',
  'Audio',
  'Tablettes',
  'Montres',
  'Accessoires'
];

const brands = [
  'Apple',
  'Samsung',
  'Sony',
  'Bose',
  'Microsoft',
  'Google',
  'Huawei'
];

export default function DLStylePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous les produits');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous les produits' || product.category === selectedCategory;
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
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

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartItemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 1299,
      originalPrice: 1499,
      rating: 4.8,
      reviews: 1247,
      image: '/images/products/iphone-15-pro.jpg',
      badge: 'Nouveau',
      badgeColor: 'bg-green-500',
      category: 'Électronique'
    },
    {
      id: 2,
      name: 'MacBook Air M2',
      price: 1199,
      originalPrice: 1399,
      rating: 4.9,
      reviews: 892,
      image: '/images/products/macbook-air.jpg',
      badge: 'Populaire',
      badgeColor: 'bg-blue-500',
      category: 'Électronique'
    },
    {
      id: 3,
      name: 'Samsung Galaxy S24',
      price: 899,
      originalPrice: 1099,
      rating: 4.7,
      reviews: 567,
      image: '/images/products/samsung-s24.jpg',
      badge: 'Promo',
      badgeColor: 'bg-red-500',
      category: 'Électronique'
    },
    {
      id: 4,
      name: 'AirPods Pro 2',
      price: 249,
      originalPrice: 299,
      rating: 4.6,
      reviews: 1234,
      image: '/images/products/airpods-pro.jpg',
      badge: 'Essentiel',
      badgeColor: 'bg-purple-500',
      category: 'Électronique'
    },
    {
      id: 5,
      name: 'iPad Air 5',
      price: 649,
      originalPrice: 749,
      rating: 4.8,
      reviews: 456,
      image: '/images/products/ipad-air.jpg',
      badge: 'Recommandé',
      badgeColor: 'bg-orange-500',
      category: 'Électronique'
    },
    {
      id: 6,
      name: 'Sony WH-1000XM5',
      price: 349,
      originalPrice: 399,
      rating: 4.9,
      reviews: 789,
      image: '/images/products/sony-wh1000xm5.jpg',
      badge: 'Premium',
      badgeColor: 'bg-indigo-500',
      category: 'Électronique'
    }
  ];

  const benefits = [
    {
      icon: Truck,
      title: 'Livraison Gratuite',
      description: 'Livraison gratuite dès 50€ d\'achat'
    },
    {
      icon: Shield,
      title: 'Garantie 2 Ans',
      description: 'Garantie étendue sur tous nos produits'
    },
    {
      icon: CreditCard,
      title: 'Paiement Sécurisé',
      description: 'Paiement en 3 ou 4 fois sans frais'
    },
    {
      icon: Package,
      title: 'Retour Gratuit',
      description: '30 jours pour changer d\'avis'
    }
  ];

  return (
    <>
      <AdvancedSEO
        title="DL-Style - Boutique en Ligne Premium"
        description="Boutique en ligne premium : électronique, mode, maison. Livraison gratuite, garantie 2 ans, paiement sécurisé."
        keywords="boutique en ligne, e-commerce, électronique, mode, maison, livraison gratuite, DL-Style"
        image="https://dlsolutions.com/images/dl-style-og.jpg"
        url="https://dlsolutions.com/dl-style"
        type="website"
        organization={{
          name: 'DL Solutions',
          logo: 'https://dlsolutions.com/images/logo.png',
          url: 'https://dlsolutions.com',
          description: 'Solutions digitales innovantes pour entreprises'
        }}
        breadcrumbs={[
          { name: 'Accueil', url: 'https://dlsolutions.com' },
          { name: 'DL-Style', url: 'https://dlsolutions.com/dl-style' }
        ]}
        faq={[
          {
            question: "DL-Style propose-t-il la livraison gratuite ?",
            answer: "Oui, la livraison est gratuite dès 50€ d'achat sur toute la France."
          },
          {
            question: "Quelle est la garantie des produits ?",
            answer: "Tous nos produits bénéficient d'une garantie de 2 ans minimum."
          },
          {
            question: "Puis-je payer en plusieurs fois ?",
            answer: "Oui, nous proposons le paiement en 3 ou 4 fois sans frais."
          }
        ]}
        product={{
          name: 'Catalogue DL-Style',
          description: 'Boutique en ligne premium avec produits de qualité',
          price: '49-1499',
          currency: 'EUR',
          availability: 'InStock',
          brand: 'DL-Style',
          category: 'E-commerce'
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">DL-Style</h1>
                <p className="text-gray-600">Votre boutique en ligne premium</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Mon compte
                </Button>
                <Button variant="outline" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Panier (0)
                </Button>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher un produit..."
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Catégories populaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">
                    {/* Icône générique ou selon l'index */}
                    <Grid className="inline-block" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category}</h3>
                  {/* Optionnel : afficher le nombre de produits par catégorie si besoin */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Produits vedettes</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="popular">Popularité</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                  <option value="rating">Note</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="relative p-0">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Badge className={`absolute top-4 left-4 ${product.badgeColor} text-white`}>
                    {product.badge}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
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
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-gray-900">{product.price}€</span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {product.originalPrice}€
                      </span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Découvrez nos offres exclusives
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos meilleures offres
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Votre email"
                className="flex-1 text-gray-900"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                S'inscrire
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}