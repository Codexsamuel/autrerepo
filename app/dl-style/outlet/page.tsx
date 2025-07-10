"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    Eye,
    Grid,
    Heart,
    List,
    MessageCircle,
    Search,
    Share2,
    Shield,
    ShoppingBag,
    ShoppingCart,
    Star,
    Tag,
    Truck,
    Zap
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OutletPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState("grid");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sneakers Nike Air Max 270",
      brand: "Nike",
      category: "Chaussures",
      originalPrice: 150,
      salePrice: 89,
      discount: 41,
      rating: 4.8,
      reviews: 1247,
      image: "/products/nike-airmax-270.jpg",
      images: [
        "/products/nike-airmax-270-1.jpg",
        "/products/nike-airmax-270-2.jpg",
        "/products/nike-airmax-270-3.jpg"
      ],
      description: "Sneakers confortables avec technologie Air Max pour un amorti optimal",
      features: ["Amorti Air Max", "Semelle en caoutchouc", "Respirant", "Léger"],
      sizes: ["38", "39", "40", "41", "42", "43", "44"],
      colors: ["Noir", "Blanc", "Gris"],
      stock: 15,
      sold: 89,
      tags: ["Sport", "Confort", "Tendance"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours",
      urgent: true
    },
    {
      id: 2,
      name: "T-shirt Premium Cotton",
      brand: "Adidas",
      category: "Vêtements",
      originalPrice: 45,
      salePrice: 29,
      discount: 36,
      rating: 4.6,
      reviews: 892,
      image: "/products/adidas-tshirt.jpg",
      images: [
        "/products/adidas-tshirt-1.jpg",
        "/products/adidas-tshirt-2.jpg"
      ],
      description: "T-shirt en coton premium avec logo Adidas, confortable et durable",
      features: ["100% Coton", "Logo brodé", "Coupe régulière", "Machine à laver"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Blanc", "Noir", "Bleu", "Rouge"],
      stock: 45,
      sold: 156,
      tags: ["Basique", "Confort", "Sport"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours",
      urgent: false
    },
    {
      id: 3,
      name: "Sac à dos Laptop 15\"",
      brand: "The North Face",
      category: "Accessoires",
      originalPrice: 120,
      salePrice: 79,
      discount: 34,
      rating: 4.9,
      reviews: 567,
      image: "/products/northface-backpack.jpg",
      images: [
        "/products/northface-backpack-1.jpg",
        "/products/northface-backpack-2.jpg"
      ],
      description: "Sac à dos professionnel avec compartiment laptop et protection anti-vol",
      features: ["Compartiment laptop 15\"", "Protection anti-vol", "Poches multiples", "Matériau résistant"],
      sizes: ["One Size"],
      colors: ["Noir", "Gris", "Bleu marine"],
      stock: 23,
      sold: 78,
      tags: ["Professionnel", "Sécurisé", "Pratique"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours",
      urgent: true
    },
    {
      id: 4,
      name: "Montre Connectée Smart",
      brand: "Samsung",
      category: "Électronique",
      originalPrice: 299,
      salePrice: 199,
      discount: 33,
      rating: 4.7,
      reviews: 1234,
      image: "/products/samsung-watch.jpg",
      images: [
        "/products/samsung-watch-1.jpg",
        "/products/samsung-watch-2.jpg"
      ],
      description: "Montre connectée avec suivi fitness, notifications et autonomie étendue",
      features: ["Écran AMOLED", "Suivi fitness", "Notifications", "Autonomie 5 jours"],
      sizes: ["40mm", "44mm"],
      colors: ["Noir", "Argent", "Rose"],
      stock: 12,
      sold: 234,
      tags: ["Connecté", "Fitness", "Technologie"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours",
      urgent: false
    },
    {
      id: 5,
      name: "Casque Audio Sans Fil",
      brand: "Sony",
      category: "Électronique",
      originalPrice: 180,
      salePrice: 119,
      discount: 34,
      rating: 4.8,
      reviews: 1890,
      image: "/products/sony-headphones.jpg",
      images: [
        "/products/sony-headphones-1.jpg",
        "/products/sony-headphones-2.jpg"
      ],
      description: "Casque audio sans fil avec réduction de bruit et son haute qualité",
      features: ["Réduction de bruit", "Bluetooth 5.0", "30h autonomie", "Son haute qualité"],
      sizes: ["One Size"],
      colors: ["Noir", "Blanc", "Bleu"],
      stock: 34,
      sold: 567,
      tags: ["Audio", "Sans fil", "Qualité"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours",
      urgent: true
    },
    {
      id: 6,
      name: "Jean Slim Fit Premium",
      brand: "Levi's",
      category: "Vêtements",
      originalPrice: 95,
      salePrice: 59,
      discount: 38,
      rating: 4.5,
      reviews: 756,
      image: "/products/levis-jean.jpg",
      images: [
        "/products/levis-jean-1.jpg",
        "/products/levis-jean-2.jpg"
      ],
      description: "Jean slim fit en denim premium avec finition vintage",
      features: ["Denim premium", "Slim fit", "Finition vintage", "5 poches"],
      sizes: ["28", "30", "32", "34", "36", "38"],
      colors: ["Bleu", "Noir", "Gris"],
      stock: 67,
      sold: 234,
      tags: ["Classique", "Slim", "Premium"],
      shipping: "Livraison gratuite",
      returnPolicy: "30 jours",
      urgent: false
    }
  ]);

  const categories = ["Tous", "Vêtements", "Chaussures", "Accessoires", "Électronique", "Sport"];
  const brands = ["Tous", "Nike", "Adidas", "The North Face", "Samsung", "Sony", "Levi's"];
  const sortOptions = [
    { value: "popularity", label: "Popularité" },
    { value: "price-low", label: "Prix croissant" },
    { value: "price-high", label: "Prix décroissant" },
    { value: "discount", label: "Meilleure remise" },
    { value: "rating", label: "Note" },
    { value: "newest", label: "Plus récents" }
  ];

  const router = useRouter();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "Tous" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "" || selectedBrand === "Tous" || product.brand === selectedBrand;
    const matchesPrice = product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.salePrice - b.salePrice;
      case "price-high":
        return b.salePrice - a.salePrice;
      case "discount":
        return b.discount - a.discount;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return b.sold - a.sold; // popularity
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/dl-style")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Outlet DL-Style</h1>
                <p className="text-sm text-gray-600">Jusqu'à -70% sur les articles sélectionnés</p>
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
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Marque" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
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

        {/* Price Range Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Fourchette de prix</h3>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{priceRange[0]}€</span>
                <span>{priceRange[1]}€</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{products.length}</p>
                  <p className="text-xs text-gray-600">Articles en solde</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{products.filter(p => p.urgent).length}</p>
                  <p className="text-xs text-gray-600">Offres urgentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">Gratuit</p>
                  <p className="text-xs text-gray-600">Livraison</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">30j</p>
                  <p className="text-xs text-gray-600">Retour</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
          {sortedProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow group">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={`w-full ${viewMode === "grid" ? "h-64" : "h-32"} object-cover rounded-lg`}
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-600 text-white">
                      -{product.discount}%
                    </Badge>
                  </div>
                  {product.urgent && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-orange-600 text-white animate-pulse">
                        <Clock className="w-3 h-3 mr-1" />
                        Urgent
                      </Badge>
                    </div>
                  )}
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
                      <span className="text-sm ml-1">{product.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-red-600">{product.salePrice}€</span>
                    <span className="text-sm text-gray-400 line-through">{product.originalPrice}€</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Stock: {product.stock}</span>
                    <span>Vendu: {product.sold}</span>
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
                      <MessageCircle className="w-4 h-4" />
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
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
            </CardContent>
          </Card>
        )}

        {/* Newsletter */}
        <Card className="mt-12 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Restez informé des dernières offres !</h3>
            <p className="mb-6 opacity-90">Recevez en avant-première nos offres exclusives et réductions flash</p>
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