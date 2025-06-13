"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  MessageSquare,
  Building2,
  Globe,
  Shield,
  Sparkles,
  LogIn,
  LogOut,
  Search,
  Bell,
  Settings,
  ChevronDown,
  Check,
  X,
  Lock,
  Star,
  FileText,
  Upload,
  CreditCard,
  Briefcase,
} from "lucide-react"

interface User {
  id: string
  name: string
  role: string
  company: string
  avatar?: string
  isVerified: boolean
  isPremium: boolean
}

interface Post {
  id: string
  content: string
  author: User
  likes: number
  comments: number
  shares: number
  timestamp: string
  isPremium: boolean
}

export default function SocialPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newPost, setNewPost] = useState("")

  const [posts] = useState<Post[]>([
    {
      id: "1",
      content: "Nous recherchons un développeur Full Stack pour rejoindre notre équipe. Expérience en React et Node.js requise.",
      author: {
        id: "1",
        name: "Marie Dubois",
        role: "Directrice RH",
        company: "Tech Solutions",
        isVerified: true,
        isPremium: true
      },
      likes: 45,
      comments: 12,
      shares: 5,
      timestamp: "Il y a 2 heures",
      isPremium: true
    },
    {
      id: "2",
      content: "Partage d'une opportunité de partenariat commercial en Afrique de l'Ouest. Contactez-moi pour plus d'informations.",
      author: {
        id: "2",
        name: "Thomas Martin",
        role: "Directeur Commercial",
        company: "Global Trade",
        isVerified: true,
        isPremium: false
      },
      likes: 28,
      comments: 8,
      shares: 3,
      timestamp: "Il y a 4 heures",
      isPremium: false
    }
  ])

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement post submission
    setNewPost("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/novacore/novaworld">
                <Image
                  src="https://res.cloudinary.com/dko5sommz/image/upload/v1745950544/novaworld-logo-generated_gqmjwf.png"
                  alt="NovaWorld Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher des professionnels, entreprises, opportunités..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button onClick={handleLogout} variant="ghost">
                    <LogOut className="h-5 w-5 mr-2" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Link href="/novacore/novaworld/social/login">
                  <Button>
                    <LogIn className="h-5 w-5 mr-2" />
                    Connexion
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link
                    href="/novacore/novaworld/social/network"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Users className="h-5 w-5" />
                    <span>Mon Réseau</span>
                  </Link>
                  <Link
                    href="/novacore/novaworld/social/jobs"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>Opportunités</span>
                  </Link>
                  <Link
                    href="/novacore/novaworld/social/messages"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Messages</span>
                  </Link>
                  <Link
                    href="/novacore/novaworld/social/rooms"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Globe className="h-5 w-5" />
                    <span>Salons</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {isLoggedIn ? (
              <>
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <form onSubmit={handlePostSubmit}>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Input
                            placeholder="Partagez une opportunité ou une actualité..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                          />
                        </div>
                        <Button type="submit">Publier</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {posts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{post.author.name}</h3>
                              {post.author.isVerified && (
                                <Badge variant="secondary">Vérifié</Badge>
                              )}
                              {post.author.isPremium && (
                                <Badge>Premium</Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-4">{post.content}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <button className="flex items-center space-x-1">
                                <Star className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{post.comments}</span>
                              </button>
                              <button className="flex items-center space-x-1">
                                <Upload className="h-4 w-4" />
                                <span>{post.shares}</span>
                              </button>
                              <span>{post.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Bienvenue sur NovaWorld
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Connectez-vous pour accéder à votre réseau professionnel et découvrir des opportunités.
                  </p>
                  <Link href="/novacore/novaworld/social/login">
                    <Button size="lg">
                      <LogIn className="h-5 w-5 mr-2" />
                      Se connecter
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Fonctionnalités Premium</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span>Vérification de profil</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <span>Salons exclusifs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <span>Accès aux dirigeants</span>
                  </div>
                  <Button className="w-full">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Passer Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 