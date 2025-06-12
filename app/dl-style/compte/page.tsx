"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  ArrowLeft,
  User,
  Package,
  Heart,
  Settings,
  CreditCard,
  MapPin,
  Shield,
  Edit,
  Eye,
  Download,
  Save,
} from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const userInfo = {
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 1 23 45 67 89",
    avatar: "/placeholder.svg?height=100&width=100",
    memberSince: "Janvier 2023",
    totalOrders: 12,
    totalSpent: 1247.89,
  }

  const orders = [
    {
      id: "DL-001234",
      date: "15 Mars 2024",
      status: "Livré",
      total: 89.99,
      items: 2,
      tracking: "DLE123456789",
    },
    {
      id: "DL-001235",
      date: "10 Mars 2024",
      status: "En transit",
      total: 149.99,
      items: 3,
      tracking: "DLE123456790",
    },
    {
      id: "DL-001236",
      date: "5 Mars 2024",
      status: "Livré",
      total: 24.99,
      items: 1,
      tracking: "DLE123456791",
    },
  ]

  const wishlistItems = [
    {
      id: 1,
      name: "Clavier Mécanique RGB",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=80&width=80",
      inStock: true,
    },
    {
      id: 2,
      name: "Souris Gaming Pro",
      price: 49.99,
      originalPrice: 69.99,
      image: "/placeholder.svg?height=80&width=80",
      inStock: true,
    },
    {
      id: 3,
      name: "Écran 4K 27 pouces",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.svg?height=80&width=80",
      inStock: false,
    },
  ]

  const addresses = [
    {
      id: 1,
      type: "Domicile",
      name: "Jean Dupont",
      address: "123 Rue de la Paix",
      city: "75001 Paris",
      country: "France",
      isDefault: true,
    },
    {
      id: 2,
      type: "Bureau",
      name: "Jean Dupont",
      address: "456 Avenue des Champs",
      city: "75008 Paris",
      country: "France",
      isDefault: false,
    },
  ]

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "08/25",
      isDefault: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livré":
        return "bg-green-100 text-green-700"
      case "En transit":
        return "bg-blue-100 text-blue-700"
      case "Préparation":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

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
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-semibold">Mon Compte</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={userInfo.avatar || "/placeholder.svg"}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-bold text-lg">{userInfo.name}</h3>
                  <p className="text-gray-600 text-sm">Membre depuis {userInfo.memberSince}</p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profil
                  </Button>
                  <Button
                    variant={activeTab === "orders" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="h-4 w-4 mr-3" />
                    Mes commandes
                  </Button>
                  <Button
                    variant={activeTab === "wishlist" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="h-4 w-4 mr-3" />
                    Liste de souhaits
                  </Button>
                  <Button
                    variant={activeTab === "addresses" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("addresses")}
                  >
                    <MapPin className="h-4 w-4 mr-3" />
                    Adresses
                  </Button>
                  <Button
                    variant={activeTab === "payment" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="h-4 w-4 mr-3" />
                    Paiement
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card className="border-0 shadow-lg mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Statistiques</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commandes</span>
                    <span className="font-bold">{userInfo.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total dépensé</span>
                    <span className="font-bold">{userInfo.totalSpent.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Points fidélité</span>
                    <span className="font-bold">1,247</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Informations personnelles</h2>
                      <Button variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <Input defaultValue="Jean" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <Input defaultValue="Dupont" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <Input defaultValue={userInfo.email} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <Input defaultValue={userInfo.phone} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
                        <Input type="date" defaultValue="1990-01-15" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                          <option>Homme</option>
                          <option>Femme</option>
                          <option>Autre</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder les modifications
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Mes commandes</h2>
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">Commande {order.id}</h3>
                              <p className="text-gray-600">Passée le {order.date}</p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </div>
                          <div className="grid md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <span className="text-sm text-gray-600">Total</span>
                              <div className="font-bold">{order.total}€</div>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Articles</span>
                              <div className="font-bold">{order.items} article(s)</div>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Suivi</span>
                              <div className="font-bold text-sm">{order.tracking}</div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/dl-style/suivi?order=${order.id}`}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  Voir
                                </a>
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Facture
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Ma liste de souhaits</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <Card key={item.id} className="border hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h3 className="font-semibold mb-2">{item.name}</h3>
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <span className="text-lg font-bold text-indigo-600">{item.price}€</span>
                                <span className="text-sm text-gray-400 line-through ml-2">{item.originalPrice}€</span>
                              </div>
                              <Badge
                                className={item.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                              >
                                {item.inStock ? "En stock" : "Rupture"}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600">
                                Ajouter au panier
                              </Button>
                              <Button variant="outline" size="sm">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Mes adresses</h2>
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        Nouvelle adresse
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <Card key={address.id} className="border">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold">{address.type}</h3>
                              {address.isDefault && <Badge className="bg-indigo-100 text-indigo-700">Par défaut</Badge>}
                            </div>
                            <div className="text-gray-600 mb-4">
                              <div>{address.name}</div>
                              <div>{address.address}</div>
                              <div>{address.city}</div>
                              <div>{address.country}</div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Modifier
                              </Button>
                              {!address.isDefault && (
                                <Button variant="outline" size="sm">
                                  Par défaut
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Tab */}
              <TabsContent value="payment">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Moyens de paiement</h2>
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Ajouter une carte
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <Card key={method.id} className="border">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                                  <CreditCard className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="font-semibold">
                                    {method.type} •••• {method.last4}
                                  </div>
                                  <div className="text-sm text-gray-600">Expire {method.expiry}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {method.isDefault && (
                                  <Badge className="bg-indigo-100 text-indigo-700">Par défaut</Badge>
                                )}
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Modifier
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Paramètres du compte</h2>
                    <div className="space-y-8">
                      {/* Notifications */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                        <div className="space-y-4">
                          <label className="flex items-center justify-between">
                            <span>Notifications par email</span>
                            <input type="checkbox" defaultChecked className="toggle" />
                          </label>
                          <label className="flex items-center justify-between">
                            <span>Notifications de commande</span>
                            <input type="checkbox" defaultChecked className="toggle" />
                          </label>
                          <label className="flex items-center justify-between">
                            <span>Offres promotionnelles</span>
                            <input type="checkbox" className="toggle" />
                          </label>
                        </div>
                      </div>

                      {/* Security */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Sécurité</h3>
                        <div className="space-y-4">
                          <Button variant="outline">
                            <Shield className="h-4 w-4 mr-2" />
                            Changer le mot de passe
                          </Button>
                          <Button variant="outline">
                            <Shield className="h-4 w-4 mr-2" />
                            Activer l'authentification 2FA
                          </Button>
                        </div>
                      </div>

                      {/* Privacy */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Confidentialité</h3>
                        <div className="space-y-4">
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger mes données
                          </Button>
                          <Button variant="outline" className="text-red-600 border-red-300">
                            Supprimer mon compte
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
