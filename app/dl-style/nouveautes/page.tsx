"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Eye,
    Gift,
    Grid,
    Heart,
    List,
    Search,
    Share2,
    Shield,
    ShoppingCart,
    Sparkles,
    Star,
    TrendingUp,
    Truck
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NouveautesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const [newProducts, setNewProducts] = useState([
    {
      id: 1,
      name: "iPhone 16 Pro Max",
      brand: "Apple",
      category: "Smartphones",
      price: 1499,
      originalPrice: 1499,
      rating: 4.9,
      reviews: 0,
      image: "/products/iphone-16-pro.jpg",
      description: "Le tout dernier iPhone avec puce A18 Pro et appareil photo révolutionnaire",
      features: ["Écran 6.9\" Super Retina XDR", "Puce A18 Pro", "Appareil photo 50MP", "5G Advanced"],
      releaseDate: "2024-09-15",
      isNew: true,
      isTrending: true,
      stock: 25,
      sold: 0,
      tags: ["Nouveau", "Premium", "Technologie"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours"
    },
    {
      id: 2,
      name: "MacBook Pro M4",
      brand: "Apple",
      category: "Ordinateurs",
      price: 2499,
      originalPrice: 2499,
      rating: 0,
      reviews: 0,
      image: "/products/macbook-pro-m4.jpg",
      description: "Ordinateur portable professionnel avec puce M4 et performances exceptionnelles",
      features: ["Puce M4", "Écran 16\" Liquid Retina XDR", "32GB RAM", "1TB SSD"],
      releaseDate: "2024-10-01",
      isNew: true,
      isTrending: true,
      stock: 15,
      sold: 0,
      tags: ["Nouveau", "Professionnel", "Performance"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours"
    },
    {
      id: 3,
      name: "Samsung Galaxy S25 Ultra",
      brand: "Samsung",
      category: "Smartphones",
      price: 1399,
      originalPrice: 1399,
      rating: 0,
      reviews: 0,
      image: "/products/samsung-s25-ultra.jpg",
      description: "Smartphone phare avec S Pen intégré et appareil photo 200MP",
      features: ["Écran 6.8\" Dynamic AMOLED", "S Pen intégré", "Appareil photo 200MP", "5G"],
      releaseDate: "2024-08-20",
      isNew: true,
      isTrending: false,
      stock: 30,
      sold: 0,
      tags: ["Nouveau", "S Pen", "Premium"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours"
    },
    {
      id: 4,
      name: "Sony WH-1000XM6",
      brand: "Sony",
      category: "Audio",
      price: 399,
      originalPrice: 399,
      rating: 0,
      reviews: 0,
      image: "/products/sony-wh1000xm6.jpg",
      description: "Casque audio sans fil avec réduction de bruit de nouvelle génération",
      features: ["Réduction de bruit avancée", "Bluetooth 5.3", "40h autonomie", "Charge rapide"],
      releaseDate: "2024-07-15",
      isNew: true,
      isTrending: true,
      stock: 50,
      sold: 0,
      tags: ["Nouveau", "Audio", "Sans fil"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours"
    },
    {
      id: 5,
      name: "Nike Air Max 2025",
      brand: "Nike",
      category: "Chaussures",
      price: 189,
      originalPrice: 189,
      rating: 0,
      reviews: 0,
      image: "/products/nike-airmax-2025.jpg",
      description: "Sneakers innovantes avec technologie Air Max révolutionnaire",
      features: ["Air Max 2025", "Matériau recyclé", "Semelle adaptative", "Ultra-léger"],
      releaseDate: "2024-09-01",
      isNew: true,
      isTrending: false,
      stock: 100,
      sold: 0,
      tags: ["Nouveau", "Sport", "Innovation"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours"
    },
    {
      id: 6,
      name: "DJI Mini 4 Pro",
      brand: "DJI",
      category: "Drones",
      price: 899,
      originalPrice: 899,
      rating: 0,
      reviews: 0,
      image: "/products/dji-mini-4-pro.jpg",
      description: "Drone compact avec caméra 4K et système de vol intelligent",
      features: ["Caméra 4K/60fps", "Vol intelligent", "45min autonomie", "<250g"],
      releaseDate: "2024-08-10",
      isNew: true,
      isTrending: true,
      stock: 20,
      sold: 0,
      tags: ["Nouveau", "Drone", "4K"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours"
    },
    {
      id: 7,
      name: "Apple Watch Series 10",
      brand: "Apple",
      category: "Montres",
      price: 449,
      originalPrice: 449,
      rating: 0,
      reviews: 0,
      image: "/products/apple-watch-series-10.jpg",
      description: "Montre connectée avec écran plus grand et nouvelles fonctionnalités santé",
      features: ["Écran 2.1\"", "Détection avancée", "Batterie 2 jours", "iOS 18"],
      releaseDate: "2024-09-15",
      isNew: true,
      isTrending: true,
      stock: 75,
      sold: 0,
      tags: ["Nouveau", "Santé", "Connecté"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours"
    },
    {
      id: 8,
      name: "PlayStation 6",
      brand: "Sony",
      category: "Gaming",
      price: 599,
      originalPrice: 599,
      rating: 0,
      reviews: 0,
      image: "/products/playstation-6.jpg",
      description: "Console de nouvelle génération avec ray tracing et 8K",
      features: ["8K Gaming", "Ray Tracing", "SSD ultra-rapide", "Compatibilité PS5"],
      releaseDate: "2024-11-15",
      isNew: true,
      isTrending: true,
      stock: 10,
      sold: 0,
      tags: ["Nouveau", "Gaming", "8K"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours"
    }
  ]);

  const categories = ["Tous", "Smartphones", "Ordinateurs", "Audio", "Chaussures", "Drones", "Montres", "Gaming"];
  const sortOptions = [
    { value: "newest", label: "Plus récents" },
    { value: "trending", label: "Tendance" },
    { value: "price-low", label: "Prix croissant" },
    { value: "price-high", label: "Prix décroissant" },
    { value: "brand", label: "Marque" }
  ];

  const router = useRouter();

  const filteredProducts = newProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "Tous" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return b.isTrending ? 1 : -1;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "brand":
        return a.brand.localeCompare(b.brand);
      default:
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    }
  });

  const handleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
  };

  const handleQuickView = (productId: number) => {
    router.push(`/dl-style/produit/${productId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/dl-style")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nouveautés</h1>
                <p className="text-sm text-gray-600">Découvrez les derniers produits et tendances</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                Favoris ({wishlist.length})
              </Button>
              <Button>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Panier ({cart.length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">{newProducts.length}</p>
                  <p className="text-blue-100">Nouveaux produits</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">{newProducts.filter(p => p.isTrending).length}</p>
                  <p className="text-purple-100">En tendance</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Truck className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">Gratuit</p>
                  <p className="text-green-100">Livraison</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">30j</p>
                  <p className="text-orange-100">Retour</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
          {sortedProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow group relative">
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-blue-600 text-white animate-pulse">
                  <Sparkles className="w-3 h-3 mr-1" />
                  NOUVEAU
                </Badge>
              </div>
              {product.isTrending && (
                <div className="absolute top-2 right-2 z-10">
                  <Badge className="bg-purple-600 text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    TENDANCE
                  </Badge>
                </div>
              )}
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={`w-full ${viewMode === "grid" ? "h-64" : "h-32"} object-cover rounded-lg`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" onClick={() => handleQuickView(product.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => handleWishlist(product.id)}>
                        <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{product.brand}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{product.rating || "N/A"}</span>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600">{product.price}€</span>
                    {product.originalPrice !== product.price && (
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}€</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(product.releaseDate)}
                    </span>
                    <span>Stock: {product.stock}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleAddToCart(product.id)}
                      className="flex-1"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Gift className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Truck className="w-3 h-3 mr-1" />
                      {product.shipping}
                    </span>
                    <span className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {product.returnPolicy}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
            </CardContent>
          </Card>
        )}

        {/* Newsletter */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">✨ Soyez le premier informé !</h3>
            <p className="mb-6 opacity-90">Recevez en avant-première nos nouveautés et offres exclusives</p>
            <div className="flex max-w-md mx-auto space-x-2">
              <Input 
                placeholder="Votre email" 
                className="flex-1 bg-white text-gray-900"
              />
              <Button variant="secondary">
                S'abonner
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}