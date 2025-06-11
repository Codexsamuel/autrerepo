"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Globe,
  Users,
  Heart,
  Plus,
  TrendingUp,
  Building,
  ArrowLeft,
  Bell,
  Settings,
  Search,
  Filter,
  ImageIcon,
  Video,
  FileText,
  Send,
  MoreHorizontal,
  Bookmark,
  Eye,
  MessageCircle,
  Repeat2,
} from "lucide-react"

export default function NovaWorldFeedPage() {
  const [newPost, setNewPost] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([])

  const posts = [
    {
      id: 1,
      author: "Marie Dubois",
      company: "TechStart SAS",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Il y a 2h",
      content:
        "🚀 Nous recherchons un développeur React senior pour rejoindre notre équipe dynamique ! Télétravail possible, salaire attractif et projets innovants. Qui est intéressé ? #Recrutement #React #Remote #TechJobs",
      image: "/placeholder.svg?height=300&width=500",
      likes: 24,
      comments: 8,
      shares: 3,
      views: 156,
      type: "job",
      tags: ["Recrutement", "React", "Remote"],
    },
    {
      id: 2,
      author: "Jean Martin",
      company: "Digital Agency",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Il y a 4h",
      content:
        "Excellente conférence sur l'IA aujourd'hui ! 🤖 Les perspectives d'automatisation sont fascinantes. L'avenir du business africain passe par l'innovation technologique. Merci à tous les participants pour ces échanges enrichissants.",
      likes: 45,
      comments: 12,
      shares: 7,
      views: 289,
      type: "update",
      tags: ["IA", "Innovation", "Afrique"],
    },
    {
      id: 3,
      author: "Sophie Laurent",
      company: "Mode & Style",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Il y a 6h",
      content:
        "🎉 Lancement de notre nouvelle collection printemps-été ! Découvrez nos créations exclusives sur DL Style. Design africain moderne et matériaux durables. #Fashion #Nouveauté #DLStyle #AfricanDesign",
      image: "/placeholder.svg?height=300&width=500",
      likes: 67,
      comments: 15,
      shares: 12,
      views: 423,
      type: "announcement",
      tags: ["Fashion", "Nouveauté", "Design"],
    },
    {
      id: 4,
      author: "David Kouassi",
      company: "FinTech Solutions",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Il y a 8h",
      content:
        "💡 Nouvelle fonctionnalité de paiement mobile lancée ! Simplifiez vos transactions avec notre solution innovante. Plus de 50 000 utilisateurs déjà conquis en une semaine. L'Afrique digitale avance ! #FinTech #Innovation #MobileMoney",
      likes: 89,
      comments: 23,
      shares: 18,
      views: 567,
      type: "product",
      tags: ["FinTech", "Innovation", "Mobile"],
    },
    {
      id: 5,
      author: "Aminata Diallo",
      company: "Green Energy Corp",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Il y a 12h",
      content:
        "🌱 Projet d'énergie solaire en cours au Sénégal ! 500 MW de capacité pour alimenter 200 000 foyers. L'énergie verte est l'avenir de l'Afrique. Qui veut rejoindre cette révolution ? #EnergieSolaire #Développement #Afrique",
      image: "/placeholder.svg?height=300&width=500",
      likes: 134,
      comments: 31,
      shares: 25,
      views: 789,
      type: "project",
      tags: ["Énergie", "Développement", "Environnement"],
    },
  ]

  const filters = [
    { id: "all", label: "Tout", icon: Globe },
    { id: "job", label: "Emplois", icon: Users },
    { id: "announcement", label: "Annonces", icon: Bell },
    { id: "update", label: "Actualités", icon: TrendingUp },
    { id: "product", label: "Produits", icon: Building },
    { id: "project", label: "Projets", icon: FileText },
  ]

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const filteredPosts = activeFilter === "all" ? posts : posts.filter((post) => post.type === activeFilter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="/novaworld">
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </Button>
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-200 flex items-center justify-center bg-white shadow-md">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Fil d'actualité
                </h1>
                <p className="text-sm text-gray-600">Restez connecté avec votre réseau</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/novaworld" className="text-gray-800 hover:text-blue-600 transition-colors">
                Accueil
              </a>
              <a href="/novaworld/feed" className="text-blue-600 font-medium">
                Fil d'actualité
              </a>
              <a href="/novaworld/network" className="text-gray-800 hover:text-blue-600 transition-colors">
                Mon réseau
              </a>
              <a href="/novaworld/companies" className="text-gray-800 hover:text-blue-600 transition-colors">
                Entreprises
              </a>
              <a href="/novaworld/jobs" className="text-gray-800 hover:text-blue-600 transition-colors">
                Emplois
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Rechercher..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </h3>
                <div className="space-y-2">
                  {filters.map((filter) => {
                    const Icon = filter.icon
                    return (
                      <Button
                        key={filter.id}
                        variant={activeFilter === filter.id ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          activeFilter === filter.id ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""
                        }`}
                        onClick={() => setActiveFilter(filter.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {filter.label}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Tendances
                </h3>
                <div className="space-y-3">
                  {[
                    { tag: "#IA", posts: "2,847" },
                    { tag: "#Recrutement", posts: "1,234" },
                    { tag: "#Startup", posts: "987" },
                    { tag: "#Innovation", posts: "756" },
                    { tag: "#FinTech", posts: "543" },
                  ].map((trend, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="text-sm">
                        <div className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">{trend.tag}</div>
                        <div className="text-gray-600">{trend.posts} publications</div>
                      </div>
                      <Button size="sm" variant="ghost">
                        Suivre
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Your avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Partagez une actualité, une opportunité, une réflexion..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px] resize-none border-0 focus:ring-0 text-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Vidéo
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Document
                    </Button>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600" disabled={!newPost.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Publier
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={post.avatar || "/placeholder.svg"}
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-gray-800 hover:text-blue-600 cursor-pointer">
                              {post.author}
                            </h4>
                            <Badge variant="secondary" className="text-xs">
                              {post.company}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">{post.time}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            post.type === "job"
                              ? "bg-green-100 text-green-700"
                              : post.type === "announcement"
                                ? "bg-blue-100 text-blue-700"
                                : post.type === "product"
                                  ? "bg-purple-100 text-purple-700"
                                  : post.type === "project"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-gray-100 text-gray-700"
                          }
                        >
                          {post.type === "job"
                            ? "Emploi"
                            : post.type === "announcement"
                              ? "Annonce"
                              : post.type === "product"
                                ? "Produit"
                                : post.type === "project"
                                  ? "Projet"
                                  : "Actualité"}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

                    {/* Post Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 cursor-pointer"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Image */}
                    {post.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Post Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views} vues
                        </span>
                        <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)} j'aime</span>
                        <span>{post.comments} commentaires</span>
                        <span>{post.shares} partages</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(post.id)}
                        className={bookmarkedPosts.includes(post.id) ? "text-blue-600" : ""}
                      >
                        <Bookmark className={`h-4 w-4 ${bookmarkedPosts.includes(post.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center space-x-2 ${
                            likedPosts.includes(post.id)
                              ? "text-red-500 hover:text-red-600"
                              : "text-gray-600 hover:text-red-500"
                          } transition-colors`}
                        >
                          <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                          <span>J'aime</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Commenter</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                        >
                          <Repeat2 className="h-4 w-4" />
                          <span>Partager</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg" className="w-full">
                Charger plus de publications
              </Button>
            </div>
          </div>

          {/* Right Sidebar - Activity */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">Actions rapides</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/novaworld/jobs">
                      <Users className="h-4 w-4 mr-2" />
                      Voir les emplois
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/novaworld/companies">
                      <Building className="h-4 w-4 mr-2" />
                      Explorer les entreprises
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/novaworld/network">
                      <Users className="h-4 w-4 mr-2" />
                      Gérer mon réseau
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">Activité récente</h3>
                <div className="space-y-4">
                  {[
                    {
                      action: "a aimé votre publication",
                      user: "Marie Dubois",
                      time: "Il y a 1h",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                    {
                      action: "a commenté votre article",
                      user: "Jean Martin",
                      time: "Il y a 3h",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                    {
                      action: "vous suit maintenant",
                      user: "Sophie Laurent",
                      time: "Il y a 5h",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={activity.avatar || "/placeholder.svg"}
                          alt={activity.user}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium text-gray-800">{activity.user}</span>
                          <span className="text-gray-600"> {activity.action}</span>
                        </div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Connections */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">Suggestions</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Thomas Durand",
                      title: "CEO chez InnovTech",
                      mutualConnections: 12,
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Claire Moreau",
                      title: "Marketing Manager",
                      mutualConnections: 8,
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                  ].map((suggestion, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={suggestion.avatar || "/placeholder.svg"}
                          alt={suggestion.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{suggestion.name}</div>
                        <div className="text-xs text-gray-600">{suggestion.title}</div>
                        <div className="text-xs text-gray-500">{suggestion.mutualConnections} connexions communes</div>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
