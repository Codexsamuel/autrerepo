"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageSquare,
  UserPlus,
  Search,
  Filter,
  ArrowLeft,
  Bell,
  Settings,
  MapPin,
  Mail,
  Phone,
  Star,
} from "lucide-react"

export default function NovaWorldNetworkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("connections")
  const [connectedUsers, setConnectedUsers] = useState<number[]>([1, 2, 3])

  const connections = [
    {
      id: 1,
      name: "Marie Dubois",
      title: "Directrice Marketing",
      company: "TechStart SAS",
      location: "Paris, France",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualConnections: 45,
      isConnected: true,
      lastActive: "Il y a 2h",
      skills: ["Marketing Digital", "Growth Hacking", "Analytics"],
      connectionDate: "Connecté depuis Mars 2024",
      posts: 89,
      followers: 1247,
    },
    {
      id: 2,
      name: "Jean Martin",
      title: "CEO & Fondateur",
      company: "Digital Agency",
      location: "Lyon, France",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualConnections: 32,
      isConnected: true,
      lastActive: "Il y a 1h",
      skills: ["Leadership", "Stratégie", "Innovation"],
      connectionDate: "Connecté depuis Février 2024",
      posts: 156,
      followers: 2341,
    },
    {
      id: 3,
      name: "Sophie Laurent",
      title: "Designer UX/UI",
      company: "Mode & Style",
      location: "Marseille, France",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualConnections: 28,
      isConnected: true,
      lastActive: "Il y a 30min",
      skills: ["Design", "UX/UI", "Prototyping"],
      connectionDate: "Connecté depuis Janvier 2024",
      posts: 67,
      followers: 892,
    },
  ]

  const suggestions = [
    {
      id: 4,
      name: "Thomas Durand",
      title: "CTO",
      company: "InnovTech",
      location: "Abidjan, Côte d'Ivoire",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualConnections: 12,
      isConnected: false,
      reason: "Travaille dans la même industrie",
      skills: ["React", "Node.js", "Architecture"],
      followers: 567,
    },
    {
      id: 5,
      name: "Claire Moreau",
      title: "Marketing Manager",
      company: "StartupHub",
      location: "Dakar, Sénégal",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualConnections: 8,
      isConnected: false,
      reason: "Connexions communes avec Marie Dubois",
      skills: ["Content Marketing", "SEO", "Social Media"],
      followers: 423,
    },
    {
      id: 6,
      name: "Pierre Rousseau",
      title: "Développeur Full Stack",
      company: "WebSolutions",
      location: "Casablanca, Maroc",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualConnections: 15,
      isConnected: false,
      reason: "Compétences similaires",
      skills: ["JavaScript", "Python", "DevOps"],
      followers: 789,
    },
  ]

  const invitations = [
    {
      id: 7,
      name: "Aminata Diallo",
      title: "Directrice Commerciale",
      company: "Green Energy Corp",
      location: "Bamako, Mali",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualConnections: 6,
      message:
        "Bonjour ! J'aimerais me connecter avec vous pour discuter d'opportunités dans le secteur de l'énergie verte.",
      sentDate: "Il y a 2 jours",
    },
    {
      id: 8,
      name: "David Kouassi",
      title: "Product Manager",
      company: "FinTech Solutions",
      location: "Accra, Ghana",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualConnections: 9,
      message: "Salut ! Votre profil m'intéresse beaucoup. Connectons-nous !",
      sentDate: "Il y a 1 jour",
    },
  ]

  const toggleConnection = (userId: number) => {
    setConnectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const filteredConnections = connections.filter(
    (connection) =>
      connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Mon réseau
                </h1>
                <p className="text-sm text-gray-600">Gérez vos connexions professionnelles</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/novaworld" className="text-gray-800 hover:text-blue-600 transition-colors">
                Accueil
              </a>
              <a href="/novaworld/feed" className="text-gray-800 hover:text-blue-600 transition-colors">
                Fil d'actualité
              </a>
              <a href="/novaworld/network" className="text-blue-600 font-medium">
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
              <div className="text-sm text-gray-600">Connexions</div>
              <div className="text-xs text-green-600 mt-1">+12 cette semaine</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">89</div>
              <div className="text-sm text-gray-600">Invitations en attente</div>
              <div className="text-xs text-blue-600 mt-1">2 nouvelles</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-sm text-gray-600">Vues de profil</div>
              <div className="text-xs text-purple-600 mt-1">+23% ce mois</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
              <div className="text-sm text-gray-600">Score réseau</div>
              <div className="text-xs text-green-600 mt-1 flex items-center justify-center">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Excellent
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher dans votre réseau..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <UserPlus className="h-4 w-4 mr-2" />
                Inviter des contacts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connections">Mes connexions</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConnections.map((connection) => (
                <Card key={connection.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                        <img
                          src={connection.avatar || "/placeholder.svg"}
                          alt={connection.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-800 hover:text-blue-600 cursor-pointer">{connection.name}</h3>
                      <p className="text-sm text-gray-600">{connection.title}</p>
                      <p className="text-xs text-gray-500">{connection.company}</p>
                      <div className="flex items-center justify-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {connection.location}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Connexions communes:</span>
                        <span className="font-medium text-blue-600">{connection.mutualConnections}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Publications:</span>
                        <span className="font-medium">{connection.posts}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Abonnés:</span>
                        <span className="font-medium">{connection.followers}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">Compétences:</div>
                      <div className="flex flex-wrap gap-1">
                        {connection.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">{connection.connectionDate}</div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                        <img
                          src={suggestion.avatar || "/placeholder.svg"}
                          alt={suggestion.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-800">{suggestion.name}</h3>
                      <p className="text-sm text-gray-600">{suggestion.title}</p>
                      <p className="text-xs text-gray-500">{suggestion.company}</p>
                      <div className="flex items-center justify-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {suggestion.location}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="text-xs text-blue-700 font-medium mb-1">Pourquoi cette suggestion ?</div>
                      <div className="text-xs text-blue-600">{suggestion.reason}</div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Connexions communes:</span>
                        <span className="font-medium text-blue-600">{suggestion.mutualConnections}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Abonnés:</span>
                        <span className="font-medium">{suggestion.followers}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">Compétences:</div>
                      <div className="flex flex-wrap gap-1">
                        {suggestion.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
                        onClick={() => toggleConnection(suggestion.id)}
                      >
                        <UserPlus className="h-3 w-3 mr-1" />
                        Se connecter
                      </Button>
                      <Button size="sm" variant="outline">
                        Voir profil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Invitations Tab */}
          <TabsContent value="invitations" className="space-y-6">
            <div className="space-y-4">
              {invitations.map((invitation) => (
                <Card key={invitation.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={invitation.avatar || "/placeholder.svg"}
                          alt={invitation.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800">{invitation.name}</h3>
                            <p className="text-sm text-gray-600">{invitation.title}</p>
                            <p className="text-xs text-gray-500">{invitation.company}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {invitation.location}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">{invitation.sentDate}</div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="text-sm text-gray-700">{invitation.message}</div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {invitation.mutualConnections} connexions communes
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                              Accepter
                            </Button>
                            <Button size="sm" variant="outline">
                              Ignorer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
