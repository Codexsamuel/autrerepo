"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Globe,
  Users,
  MessageSquare,
  Heart,
  Share2,
  Plus,
  TrendingUp,
  Building,
  MapPin,
  Calendar,
  ArrowLeft,
  Bell,
  Settings,
} from "lucide-react"

export default function NovaWorldPage() {
  const [activeTab, setActiveTab] = useState("feed")

  const posts = [
    {
      id: 1,
      author: "Marie Dubois",
      company: "TechStart SAS",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Il y a 2h",
      content:
        "Nous recherchons un développeur React senior pour rejoindre notre équipe ! 🚀 #Recrutement #React #Remote",
      likes: 24,
      comments: 8,
      shares: 3,
      type: "job",
    },
    {
      id: 2,
      author: "Jean Martin",
      company: "Digital Agency",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Il y a 4h",
      content:
        "Excellente conférence sur l'IA aujourd'hui ! Les perspectives d'automatisation sont fascinantes. Merci à tous les participants.",
      likes: 45,
      comments: 12,
      shares: 7,
      type: "update",
    },
    {
      id: 3,
      author: "Sophie Laurent",
      company: "Mode & Style",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Il y a 6h",
      content: "Lancement de notre nouvelle collection ! Découvrez nos créations sur DL Style. #Fashion #Nouveauté",
      likes: 67,
      comments: 15,
      shares: 12,
      type: "announcement",
    },
  ]

  const companies = [
    {
      id: 1,
      name: "TechStart SAS",
      sector: "Technologie",
      employees: "50-100",
      location: "Paris, France",
      logo: "/placeholder.svg?height=60&width=60",
      followers: 1240,
    },
    {
      id: 2,
      name: "Digital Agency",
      sector: "Marketing Digital",
      employees: "10-50",
      location: "Lyon, France",
      logo: "/placeholder.svg?height=60&width=60",
      followers: 890,
    },
    {
      id: 3,
      name: "Mode & Style",
      sector: "Mode",
      employees: "20-50",
      location: "Marseille, France",
      logo: "/placeholder.svg?height=60&width=60",
      followers: 2150,
    },
  ]

  const suggestions = [
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
    {
      name: "Pierre Rousseau",
      title: "Développeur Full Stack",
      mutualConnections: 15,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="/novacore">
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </Button>
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-200 flex items-center justify-center bg-white shadow-md">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  NovaWorld
                </h1>
                <p className="text-sm text-gray-600">Réseau B2B Professionnel</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/novaworld" className="text-blue-600 font-medium">
                Accueil
              </a>
              <a href="/novaworld/feed" className="text-gray-800 hover:text-blue-600 transition-colors">
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
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <Plus className="h-4 w-4 mr-2" />
                Publier
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <Globe className="h-4 w-4 mr-2" />
              Réseau B2B Africain
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Connectez l'Afrique Business</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Le premier réseau social professionnel panafricain. Développez votre business, trouvez des partenaires et
              créez des opportunités.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Users className="mr-2 h-5 w-5" />
                Rejoindre le réseau
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Building className="mr-2 h-5 w-5" />
                Créer une page entreprise
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800">Samuel OBAM</h3>
                  <p className="text-sm text-gray-600">CEO chez DL Solutions</p>
                  <div className="flex justify-center space-x-4 mt-4 text-sm text-gray-600">
                    <div>
                      <div className="font-bold text-gray-800">1,247</div>
                      <div>Connexions</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">89</div>
                      <div>Publications</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">Suggestions de connexions</h3>
                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
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
                      <Button size="sm" variant="outline">
                        <Plus className="h-3 w-3" />
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
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Your avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Input placeholder="Partagez une actualité, une opportunité..." className="flex-1" />
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">Publier</Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={post.avatar || "/placeholder.svg"}
                          alt={post.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-gray-800">{post.author}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {post.company}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{post.time}</div>
                      </div>
                      <Badge
                        className={
                          post.type === "job"
                            ? "bg-green-100 text-green-700"
                            : post.type === "announcement"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                        }
                      >
                        {post.type === "job" ? "Emploi" : post.type === "announcement" ? "Annonce" : "Actualité"}
                      </Badge>
                    </div>

                    <p className="text-gray-800 mb-4">{post.content}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Tendances
                </h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">#IA</div>
                    <div className="text-gray-600">2,847 publications</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">#Recrutement</div>
                    <div className="text-gray-600">1,234 publications</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">#Startup</div>
                    <div className="text-gray-600">987 publications</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">#Innovation</div>
                    <div className="text-gray-600">756 publications</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Companies */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Entreprises à suivre
                </h3>
                <div className="space-y-4">
                  {companies.slice(0, 3).map((company) => (
                    <div key={company.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{company.name}</div>
                        <div className="text-xs text-gray-600">{company.sector}</div>
                        <div className="text-xs text-gray-500">{company.followers} abonnés</div>
                      </div>
                      <Button size="sm" variant="outline">
                        Suivre
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Events */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Événements à venir
                </h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Conférence IA Afrique</div>
                    <div className="text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      Lagos, Nigeria
                    </div>
                    <div className="text-gray-500">15 Mars 2024</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Salon Tech Casablanca</div>
                    <div className="text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      Casablanca, Maroc
                    </div>
                    <div className="text-gray-500">22 Mars 2024</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Forum Entrepreneurs</div>
                    <div className="text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      Dakar, Sénégal
                    </div>
                    <div className="text-gray-500">5 Avril 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="h-8 w-8 text-blue-400" />
                <span className="text-lg font-bold">NovaWorld</span>
              </div>
              <p className="text-gray-400 text-sm">
                Le réseau social B2B qui connecte l'Afrique et propulse votre business vers de nouveaux horizons.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Fonctionnalités</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Réseau professionnel
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pages entreprises
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Offres d'emploi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Événements
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Secteurs</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Technologie
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Finance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Commerce
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Industrie
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/help" className="hover:text-white transition-colors">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors">
                    Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 NovaWorld by DL Solutions. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
