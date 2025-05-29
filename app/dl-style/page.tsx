"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  Heart,
  Star,
  Filter,
  Search,
  Grid,
  List,
  Truck,
  Shield,
  RotateCcw,
  ChevronDown,
  Eye,
  ContrastIcon as Compare,
  Zap,
  Clock,
  MapPin,
  Phone,
  Menu,
  User,
} from "lucide-react"

export default function DLStyleMarketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartItems, setCartItems] = useState(3)
  const [wishlistItems, setWishlistItems] = useState(5)

  const categories = [
    { id: "all", name: "Tous les produits", count: 2847, icon: "🛍️" },
    { id: "tech", name: "High-Tech", count: 892, icon: "📱" },
    { id: "vetements", name: "Mode & Vêtements", count: 654, icon: "👕" },
    { id: "maison", name: "Maison & Jardin", count: 423, icon: "🏠" },
    { id: "sport", name: "Sport & Loisirs", count: 387, icon: "⚽" },
    { id: "auto", name: "Auto & Moto", count: 298, icon: "🚗" },
    { id: "beaute", name: "Beauté & Santé", count: 193, icon: "💄" },
  ]

  const dealsOfTheDay = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      originalPrice: 1479,
      salePrice: 1299,
      discount: 12,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 2847,
      timeLeft: "23h 45m",
      stock: 12,
      badge: "Deal du jour",
    },
    {
      id: 2,
      name: "MacBook Air M3 13 pouces",
      originalPrice: 1499,
      salePrice: 1199,
      discount: 20,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 1923,
      timeLeft: "15h 22m",
      stock: 8,
      badge: "Vente flash",
    },
    {
      id: 3,
      name: "Samsung Galaxy S24 Ultra",
      originalPrice: 1419,
      salePrice: 1099,
      discount: 23,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 3421,
      timeLeft: "8h 12m",
      stock: 5,
      badge: "Dernières pièces",
    },
  ]

  const products = [
    {
      id: 1,
      name: "Casque Gaming RGB Pro X",
      price: 89.99,
      originalPrice: 129.99,
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.6,
      reviews: 847,
      category: "tech",
      badge: "Bestseller",
      discount: 31,
      shipping: "Livraison gratuite",
      seller: "DL Tech Store",
      inStock: true,
      fastDelivery: true,
    },
    {
      id: 2,
      name: "T-Shirt Premium DL Collection",
      price: 24.99,
      originalPrice: 39.99,
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.8,
      reviews: 1247,
      category: "vetements",
      badge: "Nouveau",
      discount: 38,
      shipping: "Livraison gratuite dès 50€",
      seller: "DL Fashion",
      inStock: true,
      fastDelivery: false,
    },
    {
      id: 3,
      name: "Montre Connectée Sport Pro",
      price: 199.99,
      originalPrice: 299.99,
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.5,
      reviews: 623,
      category: "tech",
      badge: "Promo",
      discount: 33,
      shipping: "Livraison express 24h",
      seller: "DL Electronics",
      inStock: true,
      fastDelivery: true,
    },
    {
      id: 4,
      name: "Aspirateur Robot Intelligent",
      price: 299.99,
      originalPrice: 449.99,
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.7,
      reviews: 892,
      category: "maison",
      badge: "Top vente",
      discount: 33,
      shipping: "Livraison gratuite",
      seller: "DL Home",
      inStock: true,
      fastDelivery: true,
    },
    {
      id: 5,
      name: "Chaussures Running Pro",
      price: 79.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.4,
      reviews: 456,
      category: "sport",
      badge: "Soldes",
      discount: 33,
      shipping: "Livraison gratuite dès 50€",
      seller: "DL Sport",
      inStock: false,
      fastDelivery: false,
    },
    {
      id: 6,
      name: "Cafetière Expresso Automatique",
      price: 399.99,
      originalPrice: 599.99,
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.9,
      reviews: 1834,
      category: "maison",
      badge: "Coup de cœur",
      discount: 33,
      shipping: "Livraison gratuite",
      seller: "DL Kitchen",
      inStock: true,
      fastDelivery: true,
    },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const addToCart = (productId: number) => {
    setCartItems(cartItems + 1)
  }

  const addToWishlist = (productId: number) => {
    setWishlistItems(wishlistItems + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-indigo-600 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <Truck className="h-4 w-4 mr-1" />
              Livraison gratuite dès 50€
            </span>
            <span className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Paiement 100% sécurisé
            </span>
            <span className="flex items-center">
              <RotateCcw className="h-4 w-4 mr-1" />
              Retour gratuit 30 jours
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              Service client: 01 23 45 67 89
            </span>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Magasins
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Style Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DL Style
                </h1>
                <p className="text-xs text-gray-600">Marketplace Premium</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  placeholder="Rechercher parmi 2847 produits..."
                  className="pl-4 pr-12 h-12 text-lg border-2 border-gray-200 focus:border-indigo-500"
                />
                <Button className="absolute right-1 top-1 h-10 bg-indigo-600 hover:bg-indigo-700">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-6 w-6" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {wishlistItems}
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-indigo-600 text-white text-xs">
                  {cartItems}
                </Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                <a href="/novacore">Retour NovaCore</a>
              </Button>
            </div>
          </div>

          {/* Navigation */}
          {/* Navigation avec menus déroulants */}
          <nav className="py-4 border-t">
            <div className="flex items-center space-x-8">
              {/* Menu Toutes les catégories */}
              <div className="relative group">
                <Button variant="ghost" className="flex items-center">
                  <Menu className="h-4 w-4 mr-2" />
                  Toutes les catégories
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>

                {/* Mega Menu */}
                <div className="absolute top-full left-0 w-screen max-w-6xl bg-white shadow-2xl border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="grid grid-cols-4 gap-8 p-8">
                    {/* Mode & Vêtements */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-indigo-600">👕 Mode & Vêtements</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2">👨 Homme</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/mode/homme/t-shirts" className="hover:text-indigo-600">
                                T-shirts & Polos
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/mode/homme/pantalons" className="hover:text-indigo-600">
                                Pantalons & Jeans
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/mode/homme/vestes" className="hover:text-indigo-600">
                                Vestes & Manteaux
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/mode/homme/costumes" className="hover:text-indigo-600">
                                Costumes
                              </a>
                            </li>
                            <li>
                              <a
                                href="/dl-style/categories/mode/homme/sous-vetements"
                                className="hover:text-indigo-600"
                              >
                                Sous-vêtements
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">👩 Femme</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/mode/femme/robes" className="hover:text-indigo-600">
                                Robes
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/mode/femme/tops" className="hover:text-indigo-600">
                                Tops & Blouses
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/mode/femme/pantalons" className="hover:text-indigo-600">
                                Pantalons & Jeans
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/mode/femme/jupes" className="hover:text-indigo-600">
                                Jupes
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/mode/femme/lingerie" className="hover:text-indigo-600">
                                Lingerie
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">👶 Enfant</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/mode/enfant/bebe" className="hover:text-indigo-600">
                                Bébé (0-2 ans)
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/mode/enfant/fille" className="hover:text-indigo-600">
                                Fille (3-16 ans)
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/mode/enfant/garcon" className="hover:text-indigo-600">
                                Garçon (3-16 ans)
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/mode/enfant/ado" className="hover:text-indigo-600">
                                Ado (13-18 ans)
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Chaussures & Accessoires */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-indigo-600">👟 Chaussures & Accessoires</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2">👟 Chaussures</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/chaussures/sneakers" className="hover:text-indigo-600">
                                Sneakers
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/chaussures/sport" className="hover:text-indigo-600">
                                Chaussures de sport
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/chaussures/ville" className="hover:text-indigo-600">
                                Chaussures de ville
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/chaussures/bottes" className="hover:text-indigo-600">
                                Bottes & Bottines
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/chaussures/sandales" className="hover:text-indigo-600">
                                Sandales
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">👜 Sacs & Maroquinerie</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/accessoires/sacs-main" className="hover:text-indigo-600">
                                Sacs à main
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/accessoires/sacs-dos" className="hover:text-indigo-600">
                                Sacs à dos
                              </a>
                            </li>
                            <li>
                              <a
                                href="/dl-style/categories/accessoires/portefeuilles"
                                className="hover:text-indigo-600"
                              >
                                Portefeuilles
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/accessoires/valises" className="hover:text-indigo-600">
                                Valises
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">💍 Bijoux & Montres</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/accessoires/montres" className="hover:text-indigo-600">
                                Montres
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/accessoires/bijoux" className="hover:text-indigo-600">
                                Bijoux
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/accessoires/lunettes" className="hover:text-indigo-600">
                                Lunettes
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* High-Tech */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-indigo-600">📱 High-Tech</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2">📱 Smartphones & Tablettes</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/high-tech/smartphones" className="hover:text-indigo-600">
                                Smartphones
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/high-tech/tablettes" className="hover:text-indigo-600">
                                Tablettes
                              </a>
                            </li>
                            <li>
                              <a
                                href="/dl-style/categories/high-tech/accessoires-mobile"
                                className="hover:text-indigo-600"
                              >
                                Accessoires mobile
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">💻 Informatique</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/high-tech/ordinateurs" className="hover:text-indigo-600">
                                Ordinateurs
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/high-tech/gaming" className="hover:text-indigo-600">
                                Gaming
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/high-tech/peripheriques" className="hover:text-indigo-600">
                                Périphériques
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">🎧 Audio & Vidéo</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/high-tech/casques" className="hover:text-indigo-600">
                                Casques & Écouteurs
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/high-tech/enceintes" className="hover:text-indigo-600">
                                Enceintes
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/high-tech/tv" className="hover:text-indigo-600">
                                TV & Projecteurs
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Maison & Cuisine */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-indigo-600">🏠 Maison & Cuisine</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2">🍳 Cuisine & Électroménager</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/maison/electromenager" className="hover:text-indigo-600">
                                Gros électroménager
                              </a>
                            </li>
                            <li>
                              <a
                                href="/dl-style/categories/maison/petit-electromenager"
                                className="hover:text-indigo-600"
                              >
                                Petit électroménager
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/maison/ustensiles" className="hover:text-indigo-600">
                                Ustensiles de cuisine
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/maison/vaisselle" className="hover:text-indigo-600">
                                Vaisselle
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">🛏️ Mobilier & Déco</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/maison/mobilier" className="hover:text-indigo-600">
                                Mobilier
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/maison/decoration" className="hover:text-indigo-600">
                                Décoration
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/maison/luminaires" className="hover:text-indigo-600">
                                Luminaires
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/maison/textile" className="hover:text-indigo-600">
                                Textile maison
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">🌱 Jardin & Extérieur</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>
                              <a href="/dl-style/categories/maison/jardinage" className="hover:text-indigo-600">
                                Jardinage
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/maison/barbecue" className="hover:text-indigo-600">
                                Barbecue & Plancha
                              </a>
                            </li>
                            <li>
                              <a href="/dl-style/categories/maison/piscine" className="hover:text-indigo-600">
                                Piscine & Spa
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bannière promotionnelle en bas */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-b-lg">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <h4 className="font-bold">🔥 Offres spéciales</h4>
                        <p className="text-sm">Jusqu'à -70% sur une sélection</p>
                      </div>
                      <Button className="bg-white text-indigo-600 hover:bg-gray-100">Voir les offres</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Autres liens de navigation avec menus */}
              <div className="relative group">
                <a href="/dl-style/deals" className="text-gray-700 hover:text-indigo-600 font-medium flex items-center">
                  Deals du jour
                  <ChevronDown className="h-3 w-3 ml-1" />
                </a>
                <div className="absolute top-full left-0 bg-white shadow-lg border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-64">
                  <div className="p-4 space-y-2">
                    <a href="/dl-style/deals/flash" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      ⚡ Ventes flash
                    </a>
                    <a href="/dl-style/deals/daily" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      🔥 Deal du jour
                    </a>
                    <a href="/dl-style/deals/weekend" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      🎯 Offres weekend
                    </a>
                    <a href="/dl-style/deals/clearance" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      💥 Déstockage
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <a
                  href="/dl-style/ventes-flash"
                  className="text-gray-700 hover:text-indigo-600 font-medium flex items-center"
                >
                  Ventes flash
                  <ChevronDown className="h-3 w-3 ml-1" />
                </a>
                <div className="absolute top-full left-0 bg-white shadow-lg border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-64">
                  <div className="p-4 space-y-2">
                    <a href="/dl-style/ventes-flash/high-tech" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      📱 High-Tech
                    </a>
                    <a href="/dl-style/ventes-flash/mode" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      👕 Mode
                    </a>
                    <a href="/dl-style/ventes-flash/maison" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      🏠 Maison
                    </a>
                    <a href="/dl-style/ventes-flash/sport" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      ⚽ Sport
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <a
                  href="/dl-style/nouveautes"
                  className="text-gray-700 hover:text-indigo-600 font-medium flex items-center"
                >
                  Nouveautés
                  <ChevronDown className="h-3 w-3 ml-1" />
                </a>
                <div className="absolute top-full left-0 bg-white shadow-lg border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-64">
                  <div className="p-4 space-y-2">
                    <a href="/dl-style/nouveautes/cette-semaine" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      🆕 Cette semaine
                    </a>
                    <a href="/dl-style/nouveautes/ce-mois" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      📅 Ce mois-ci
                    </a>
                    <a href="/dl-style/nouveautes/tendances" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      🔥 Tendances
                    </a>
                    <a href="/dl-style/nouveautes/exclusivites" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      ⭐ Exclusivités
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <a
                  href="/dl-style/meilleures-ventes"
                  className="text-gray-700 hover:text-indigo-600 font-medium flex items-center"
                >
                  Meilleures ventes
                  <ChevronDown className="h-3 w-3 ml-1" />
                </a>
                <div className="absolute top-full left-0 bg-white shadow-lg border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-64">
                  <div className="p-4 space-y-2">
                    <a href="/dl-style/meilleures-ventes/top-100" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      🏆 Top 100
                    </a>
                    <a
                      href="/dl-style/meilleures-ventes/top-semaine"
                      className="block px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      📈 Top semaine
                    </a>
                    <a
                      href="/dl-style/meilleures-ventes/coups-coeur"
                      className="block px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      💝 Coups de cœur
                    </a>
                    <a
                      href="/dl-style/meilleures-ventes/recommandes"
                      className="block px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      ⭐ Recommandés
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <a
                  href="/dl-style/outlet"
                  className="text-gray-700 hover:text-indigo-600 font-medium flex items-center"
                >
                  Outlet
                  <ChevronDown className="h-3 w-3 ml-1" />
                </a>
                <div className="absolute top-full left-0 bg-white shadow-lg border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-64">
                  <div className="p-4 space-y-2">
                    <a href="/dl-style/outlet/fin-serie" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      📦 Fin de série
                    </a>
                    <a href="/dl-style/outlet/retours" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      🔄 Retours clients
                    </a>
                    <a href="/dl-style/outlet/destockage" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      💥 Déstockage
                    </a>
                    <a href="/dl-style/outlet/occasions" className="block px-3 py-2 hover:bg-gray-100 rounded">
                      ♻️ Occasions
                    </a>
                  </div>
                </div>
              </div>

              <Badge className="bg-red-500 text-white animate-pulse">
                <Zap className="h-3 w-3 mr-1" />
                Soldes -70%
              </Badge>
            </div>
          </nav>
        </div>
      </header>

      {/* Deals of the Day */}
      <section className="py-8 px-4 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">⚡ Deals du Jour</h2>
            <p className="text-red-100">Offres limitées - Dépêchez-vous !</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {dealsOfTheDay.map((deal) => (
              <Card key={deal.id} className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img src={deal.image || "/placeholder.svg"} alt={deal.name} className="w-full h-48 object-cover" />
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white">-{deal.discount}%</Badge>
                    <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {deal.timeLeft}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{deal.name}</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({deal.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-red-600">{deal.salePrice}€</span>
                        <span className="text-lg text-gray-400 line-through ml-2">{deal.originalPrice}€</span>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700">Plus que {deal.stock} en stock</Badge>
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600" onClick={() => addToCart(deal.id)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Acheter maintenant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-1/4">
              <Card className="border-0 shadow-lg mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Catégories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                          selectedCategory === category.id ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Price Filter */}
              <Card className="border-0 shadow-lg mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Prix</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">Moins de 25€</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">25€ - 50€</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">50€ - 100€</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">100€ - 200€</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">Plus de 200€</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Brand Filter */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Marques</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">DL Solutions</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">Apple</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">Samsung</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">Nike</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">Adidas</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="w-3/4">
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedCategory === "all"
                      ? "Tous les produits"
                      : categories.find((c) => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-gray-600">{filteredProducts.length} produits trouvés</p>
                </div>
                <div className="flex items-center space-x-4">
                  <select className="border rounded-lg px-3 py-2">
                    <option>Trier par pertinence</option>
                    <option>Prix croissant</option>
                    <option>Prix décroissant</option>
                    <option>Meilleures notes</option>
                    <option>Nouveautés</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-3" : "grid-cols-1"}`}>
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600">
                            {product.badge}
                          </Badge>
                        )}
                        {product.discount && (
                          <Badge className="absolute top-3 right-3 bg-red-500 text-white">-{product.discount}%</Badge>
                        )}
                        <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="secondary" onClick={() => addToWishlist(product.id)}>
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="secondary">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="secondary">
                            <Compare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="text-xs text-gray-500 mb-1">Vendu par {product.seller}</div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">{product.name}</h3>

                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-xl font-bold text-indigo-600">{product.price}€</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}€</span>
                            )}
                          </div>
                          <Badge
                            className={product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                          >
                            {product.inStock ? "En stock" : "Rupture"}
                          </Badge>
                        </div>

                        <div className="text-xs text-gray-600 mb-3 flex items-center">
                          <Truck className="h-3 w-3 mr-1" />
                          {product.shipping}
                          {product.fastDelivery && (
                            <Badge className="ml-2 bg-orange-100 text-orange-700 text-xs">
                              <Zap className="h-3 w-3 mr-1" />
                              Express
                            </Badge>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600"
                            onClick={() => addToCart(product.id)}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? "Ajouter" : "Indisponible"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Précédent</Button>
                  <Button className="bg-indigo-600">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">...</Button>
                  <Button variant="outline">15</Button>
                  <Button variant="outline">Suivant</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-indigo-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Restez informé de nos meilleures offres</h2>
          <p className="text-indigo-100 mb-8">Recevez en exclusivité nos deals et promotions</p>
          <div className="flex max-w-md mx-auto">
            <Input placeholder="Votre email..." className="rounded-r-none" />
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 rounded-l-none">S'abonner</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-indigo-400 flex items-center justify-center bg-white">
                  <img src="/images/dl-logo.jpg" alt="DL Style Logo" className="h-6 w-6 object-contain" />
                </div>
                <span className="text-lg font-bold">DL Style</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Votre marketplace premium pour tous vos achats. Plus de 2800 produits sélectionnés.
              </p>
              <div className="flex space-x-4">
                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </Button>
                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Service Client</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Nous contacter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Suivi de commande
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Retours & Remboursements
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">À propos</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Qui sommes-nous
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Nos magasins
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Carrières
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Presse
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Développement durable
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Informations</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Conditions générales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Plan du site
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 DL Style - DL Solutions. Tous droits réservés. | Marketplace propulsée par NovaCore</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
