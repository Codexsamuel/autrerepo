"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    AlertTriangle,
    ArrowLeft,
    CheckCircle,
    Clock,
    Eye,
    Flame,
    Gift,
    Heart,
    Percent,
    ShoppingCart,
    Star,
    Timer,
    TrendingUp,
    Zap
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DealsPage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const [flashSales, setFlashSales] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      originalPrice: 1299,
      salePrice: 999,
      discount: 23,
      rating: 4.9,
      reviews: 2341,
      image: "/products/iphone-15-pro.jpg",
      description: "Dernier iPhone avec puce A17 Pro et appareil photo professionnel",
      features: ["Écran 6.7\" Super Retina XDR", "Puce A17 Pro", "Appareil photo 48MP", "5G"],
      stock: 8,
      sold: 42,
      timeLeft: "02:45:30",
      progress: 84,
      urgent: true,
      category: "Électronique",
      tags: ["Premium", "Technologie", "Apple"]
    },
    {
      id: 2,
      name: "MacBook Air M2",
      brand: "Apple",
      originalPrice: 1499,
      salePrice: 1199,
      discount: 20,
      rating: 4.8,
      reviews: 1890,
      image: "/products/macbook-air-m2.jpg",
      description: "Ordinateur portable ultra-léger avec puce M2 et autonomie exceptionnelle",
      features: ["Puce M2", "13.6\" Liquid Retina", "18h autonomie", "Ultra-léger"],
      stock: 12,
      sold: 28,
      timeLeft: "05:12:45",
      progress: 70,
      urgent: true,
      category: "Électronique",
      tags: ["Premium", "Portable", "Apple"]
    },
    {
      id: 3,
      name: "AirPods Pro 2",
      brand: "Apple",
      originalPrice: 279,
      salePrice: 199,
      discount: 29,
      rating: 4.7,
      reviews: 3456,
      image: "/products/airpods-pro-2.jpg",
      description: "Écouteurs sans fil avec réduction de bruit active et audio spatial",
      features: ["Réduction de bruit active", "Audio spatial", "Résistance à l'eau", "Charge sans fil"],
      stock: 25,
      sold: 75,
      timeLeft: "08:30:15",
      progress: 75,
      urgent: false,
      category: "Électronique",
      tags: ["Audio", "Sans fil", "Apple"]
    }
  ]);

  const [dailyDeals, setDailyDeals] = useState([
    {
      id: 4,
      name: "Sneakers Nike Air Jordan",
      brand: "Nike",
      originalPrice: 180,
      salePrice: 129,
      discount: 28,
      rating: 4.6,
      reviews: 892,
      image: "/products/nike-air-jordan.jpg",
      description: "Sneakers iconiques avec amorti Air et style rétro",
      features: ["Amorti Air", "Style rétro", "Semelle en caoutchouc", "Respirant"],
      stock: 15,
      sold: 35,
      timeLeft: "23:45:12",
      progress: 70,
      urgent: false,
      category: "Chaussures",
      tags: ["Sport", "Rétro", "Nike"]
    },
    {
      id: 5,
      name: "Montre Garmin Fenix 7",
      brand: "Garmin",
      originalPrice: 699,
      salePrice: 549,
      discount: 21,
      rating: 4.8,
      reviews: 567,
      image: "/products/garmin-fenix-7.jpg",
      description: "Montre GPS multisport avec cartes topographiques",
      features: ["GPS multisport", "Cartes topographiques", "20h autonomie", "Résistance militaire"],
      stock: 8,
      sold: 22,
      timeLeft: "12:20:30",
      progress: 73,
      urgent: true,
      category: "Sport",
      tags: ["GPS", "Sport", "Premium"]
    },
    {
      id: 6,
      name: "Sac à dos The North Face",
      brand: "The North Face",
      originalPrice: 120,
      salePrice: 79,
      discount: 34,
      rating: 4.5,
      reviews: 423,
      image: "/products/northface-backpack.jpg",
      description: "Sac à dos robuste pour randonnée et voyage",
      features: ["Matériau résistant", "Poches multiples", "Système de suspension", "Résistant à l'eau"],
      stock: 20,
      sold: 30,
      timeLeft: "16:45:00",
      progress: 60,
      urgent: false,
      category: "Accessoires",
      tags: ["Randonnée", "Robuste", "Voyage"]
    }
  ]);

  const [bundleDeals, setBundleDeals] = useState([
    {
      id: 7,
      name: "Pack Gaming Gamer",
      brand: "Bundle",
      originalPrice: 450,
      salePrice: 299,
      discount: 34,
      rating: 4.7,
      reviews: 234,
      image: "/products/gaming-bundle.jpg",
      description: "Pack complet pour gamer : souris, clavier, casque et tapis",
      items: ["Souris gaming RGB", "Clavier mécanique", "Casque audio", "Tapis de souris"],
      stock: 10,
      sold: 20,
      timeLeft: "03:15:45",
      progress: 67,
      urgent: true,
      category: "Gaming",
      tags: ["Gaming", "Bundle", "RGB"]
    },
    {
      id: 8,
      name: "Pack Fitness Home",
      brand: "Bundle",
      originalPrice: 320,
      salePrice: 199,
      discount: 38,
      rating: 4.6,
      reviews: 156,
      image: "/products/fitness-bundle.jpg",
      description: "Équipement complet pour fitness à domicile",
      items: ["Tapis de yoga", "Haltères ajustables", "Bande élastique", "Bouteille d'eau"],
      stock: 15,
      sold: 25,
      timeLeft: "07:30:20",
      progress: 63,
      urgent: false,
      category: "Sport",
      tags: ["Fitness", "Bundle", "Home"]
    }
  ]);

  const router = useRouter();

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

  const formatTime = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/dl-style")} className="text-white border-white hover:bg-white hover:text-red-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Offres Flash & Deals</h1>
                <p className="text-orange-100">Découvrez nos meilleures offres limitées dans le temps</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">🔥</div>
                <div className="text-xs">Flash Sales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">⚡</div>
                <div className="text-xs">Daily Deals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">🎁</div>
                <div className="text-xs">Bundles</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Flame className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">{flashSales.length}</p>
                  <p className="text-red-100">Flash Sales Actives</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Timer className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">{dailyDeals.length}</p>
                  <p className="text-orange-100">Daily Deals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Gift className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">{bundleDeals.length}</p>
                  <p className="text-purple-100">Bundles Disponibles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">-45%</p>
                  <p className="text-green-100">Économie Moyenne</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flash Sales */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Flame className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">🔥 Flash Sales</h2>
            <Badge className="bg-red-100 text-red-800 animate-pulse">
              <Clock className="w-3 h-3 mr-1" />
              Temps limité
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashSales.map((product) => (
              <Card key={product.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-red-200">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-600 text-white animate-pulse">
                        <Zap className="w-3 h-3 mr-1" />
                        FLASH
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-orange-600 text-white">
                        -{product.discount}%
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black bg-opacity-75 text-white p-2 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span>Temps restant:</span>
                          <span className="font-mono font-bold">{formatTime(product.timeLeft)}</span>
                        </div>
                        <Progress value={product.progress} className="mt-2" />
                        <div className="flex justify-between text-xs mt-1">
                          <span>Vendu: {product.sold}</span>
                          <span>Stock: {product.stock}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{product.brand}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{product.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600">{product.salePrice}€</span>
                      <span className="text-lg text-gray-400 line-through">{product.originalPrice}€</span>
                      <span className="text-sm text-green-600 font-medium">Économisez {product.originalPrice - product.salePrice}€</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleAddToCart(product.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Acheter maintenant
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleWishlist(product.id)}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleQuickView(product.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>

                    {product.stock < 5 && (
                      <div className="flex items-center text-orange-600 text-sm">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Plus que {product.stock} en stock !
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily Deals */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Timer className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">⚡ Daily Deals</h2>
            <Badge className="bg-orange-100 text-orange-800">
              <Clock className="w-3 h-3 mr-1" />
              Offres du jour
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyDeals.map((product) => (
              <Card key={product.id} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-orange-200">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-orange-600 text-white">
                        <Timer className="w-3 h-3 mr-1" />
                        DAILY
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-600 text-white">
                        -{product.discount}%
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black bg-opacity-75 text-white p-2 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span>Expire dans:</span>
                          <span className="font-mono font-bold">{formatTime(product.timeLeft)}</span>
                        </div>
                        <Progress value={product.progress} className="mt-2" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{product.brand}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{product.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-orange-600">{product.salePrice}€</span>
                      <span className="text-lg text-gray-400 line-through">{product.originalPrice}€</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleAddToCart(product.id)}
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Ajouter au panier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleWishlist(product.id)}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bundle Deals */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Gift className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">🎁 Bundle Deals</h2>
            <Badge className="bg-purple-100 text-purple-800">
              <Percent className="w-3 h-3 mr-1" />
              Économies groupées
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundleDeals.map((bundle) => (
              <Card key={bundle.id} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-purple-200">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img 
                      src={bundle.image} 
                      alt={bundle.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-purple-600 text-white">
                        <Gift className="w-3 h-3 mr-1" />
                        BUNDLE
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-pink-600 text-white">
                        -{bundle.discount}%
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 text-lg">{bundle.name}</h3>
                    <p className="text-sm text-gray-600">{bundle.description}</p>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Contenu du pack:</h4>
                      <ul className="space-y-1">
                        {bundle.items.map((item, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-purple-600">{bundle.salePrice}€</span>
                      <span className="text-lg text-gray-400 line-through">{bundle.originalPrice}€</span>
                      <span className="text-sm text-green-600 font-medium">Économisez {bundle.originalPrice - bundle.salePrice}€</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleAddToCart(bundle.id)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Acheter le pack
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleWishlist(bundle.id)}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(bundle.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">🚨 Ne manquez aucune offre !</h3>
            <p className="mb-6 opacity-90">Soyez le premier informé de nos flash sales et deals exclusifs</p>
            <div className="flex max-w-md mx-auto space-x-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
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