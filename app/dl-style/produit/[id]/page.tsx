"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Plus,
  Minus,
  Check,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Gift,
  CreditCard,
} from "lucide-react"

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("Noir")

  const product = {
    id: 1,
    name: "Casque Gaming RGB Pro X - Edition DL Solutions",
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    rating: 4.6,
    reviews: 847,
    inStock: true,
    fastDelivery: true,
    seller: "DL Tech Store",
    brand: "DL Solutions",
    model: "DLGX-2024",
    warranty: "2 ans",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    colors: ["Noir", "Blanc", "Rouge", "Bleu"],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Son surround 7.1 virtuel",
      "Microphone antibruit",
      "Éclairage RGB personnalisable",
      "Compatible PC, PS5, Xbox",
      "Coussinets en mousse à mémoire",
      "Câble détachable 2m",
    ],
    specifications: {
      Type: "Casque gaming filaire",
      Connectivité: "Jack 3.5mm + USB",
      Fréquence: "20Hz - 20kHz",
      Impédance: "32 Ohms",
      Sensibilité: "108dB",
      Microphone: "Omnidirectionnel",
      Poids: "320g",
      Garantie: "2 ans",
    },
  }

  const reviews = [
    {
      id: 1,
      user: "GamerPro2024",
      rating: 5,
      date: "Il y a 3 jours",
      title: "Excellent casque gaming !",
      content:
        "Qualité sonore exceptionnelle, très confortable même pour de longues sessions. Le RGB est magnifique et la qualité de construction est au top. Je recommande vivement !",
      helpful: 24,
      verified: true,
    },
    {
      id: 2,
      user: "TechReviewer",
      rating: 4,
      date: "Il y a 1 semaine",
      title: "Très bon rapport qualité/prix",
      content:
        "Pour le prix, c'est un excellent casque. Le son est clair, le micro fonctionne bien. Seul bémol : un peu serré au début mais ça se détend avec le temps.",
      helpful: 18,
      verified: true,
    },
    {
      id: 3,
      user: "StreamerLife",
      rating: 5,
      date: "Il y a 2 semaines",
      title: "Parfait pour le streaming",
      content:
        "J'utilise ce casque pour mes streams et mes viewers me disent que la qualité audio est excellente. Le micro supprime bien les bruits de fond.",
      helpful: 31,
      verified: true,
    },
  ]

  const relatedProducts = [
    {
      id: 2,
      name: "Clavier Mécanique RGB",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Souris Gaming Pro",
      price: 49.99,
      originalPrice: 69.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Tapis de Souris XXL",
      price: 24.99,
      originalPrice: 34.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <a href="/dl-style" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la boutique
              </a>
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? "border-indigo-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Vue ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge className="mb-2 bg-indigo-100 text-indigo-700">{product.brand}</Badge>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium ml-2">{product.rating}</span>
                <span className="text-gray-600 ml-2">({product.reviews} avis)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-4xl font-bold text-indigo-600">{product.price}€</span>
                <span className="text-2xl text-gray-400 line-through">{product.originalPrice}€</span>
                <Badge className="bg-red-500 text-white text-lg px-3 py-1">-{product.discount}%</Badge>
              </div>
              <p className="text-green-600 font-medium">
                Économisez {(product.originalPrice - product.price).toFixed(2)}€
              </p>
            </div>

            {/* Options */}
            <div className="space-y-6 mb-8">
              {/* Color */}
              <div>
                <h3 className="font-semibold mb-3">Couleur: {selectedColor}</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedColor === color ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-semibold mb-3">Taille: {selectedSize}</h3>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border rounded-lg ${
                        selectedSize === size ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantité</h3>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 mb-8">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-lg py-3">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Ajouter au panier - {(product.price * quantity).toFixed(2)}€
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="py-3">
                  <Heart className="h-5 w-5 mr-2" />
                  Favoris
                </Button>
                <Button variant="outline" className="py-3">
                  <Gift className="h-5 w-5 mr-2" />
                  Offrir
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Truck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Livraison gratuite</p>
                  <p className="text-sm text-green-600">Livraison express en 24h disponible</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">Garantie {product.warranty}</p>
                  <p className="text-sm text-blue-600">Protection complète incluse</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">Retour gratuit 30 jours</p>
                  <p className="text-sm text-orange-600">Satisfait ou remboursé</p>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Vendu par {product.seller}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">4.9/5 (2,847 avis)</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Voir la boutique
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({product.reviews})</TabsTrigger>
              <TabsTrigger value="delivery">Livraison</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Description du produit</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Le Casque Gaming RGB Pro X - Edition DL Solutions est conçu pour les gamers exigeants qui
                      recherchent une qualité audio exceptionnelle et un confort optimal. Avec sa technologie de son
                      surround 7.1 virtuel, vous bénéficierez d'une immersion totale dans vos jeux préférés.
                    </p>

                    <h4 className="text-xl font-semibold mb-4">Caractéristiques principales :</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-gray-700 leading-relaxed mt-6">
                      Que vous soyez un gamer professionnel ou amateur, ce casque vous offre la précision audio
                      nécessaire pour dominer vos adversaires. Son design ergonomique et ses coussinets en mousse à
                      mémoire de forme garantissent un confort optimal même lors de sessions de jeu prolongées.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Caractéristiques techniques</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-800">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {/* Review Summary */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-indigo-600 mb-2">{product.rating}</div>
                        <div className="flex items-center justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">Basé sur {product.reviews} avis</p>
                      </div>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center space-x-3">
                            <span className="text-sm w-8">{stars}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{
                                  width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-12">
                              {stars === 5
                                ? "70%"
                                : stars === 4
                                  ? "20%"
                                  : stars === 3
                                    ? "5%"
                                    : stars === 2
                                      ? "3%"
                                      : "2%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                {reviews.map((review) => (
                  <Card key={review.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                            {review.user[0]}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{review.user}</span>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  <Check className="h-3 w-3 mr-1" />
                                  Achat vérifié
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold mb-2">{review.title}</h4>
                      <p className="text-gray-700 mb-4">{review.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Utile ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Pas utile
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Répondre
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="text-center">
                  <Button variant="outline">Voir tous les avis</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="mt-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Options de livraison</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Truck className="h-8 w-8 text-green-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold">Livraison standard gratuite</h4>
                        <p className="text-gray-600">3-5 jours ouvrés</p>
                      </div>
                      <span className="font-bold text-green-600">Gratuit</span>
                    </div>
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Zap className="h-8 w-8 text-orange-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold">Livraison express</h4>
                        <p className="text-gray-600">24h (commande avant 15h)</p>
                      </div>
                      <span className="font-bold text-orange-600">9,99€</span>
                    </div>
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <CreditCard className="h-8 w-8 text-blue-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold">Retrait en magasin</h4>
                        <p className="text-gray-600">Disponible sous 2h</p>
                      </div>
                      <span className="font-bold text-blue-600">Gratuit</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Produits recommandés</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
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
                      <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-indigo-600">{product.price}€</span>
                        <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}€</span>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
