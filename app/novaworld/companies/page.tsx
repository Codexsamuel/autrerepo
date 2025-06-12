"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  MapPin,
  Search,
  ArrowLeft,
  Bell,
  Settings,
  Star,
  TrendingUp,
  Briefcase,
  ExternalLink,
  Plus,
  Eye,
  UserPlus,
} from "lucide-react"

export default function NovaWorldCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("explore")
  const [followedCompanies, setFollowedCompanies] = useState<number[]>([1, 2])
  const [selectedSector, setSelectedSector] = useState("all")

  const companies = [
    {
      id: 1,
      name: "TechStart SAS",
      sector: "Technologie",
      description: "Startup innovante spécialisée dans le développement d'applications mobiles et web pour l'Afrique.",
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400",
      location: "Paris, France",
      employees: "50-100",
      founded: "2020",
      website: "www.techstart.com",
      followers: 1240,
      posts: 89,
      jobs: 5,
      rating: 4.8,
      isFollowing: true,
      growth: "+25%",
      specialties: ["React", "Node.js", "Mobile", "IA"],
      recentNews: "Levée de fonds de 2M€ pour l'expansion en Afrique",
    },
    {
      id: 2,
      name: "Digital Agency",
      sector: "Marketing Digital",
      description:
        "Agence de marketing digital leader en Afrique francophone, spécialisée dans la transformation digitale.",
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400",
      location: "Lyon, France",
      employees: "10-50",
      founded: "2018",
      website: "www.digitalagency.com",
      followers: 890,
      posts: 156,
      jobs: 3,
      rating: 4.6,
      isFollowing: true,
      growth: "+18%",
      specialties: ["SEO", "Social Media", "Content", "Analytics"],
      recentNews: "Nouveau bureau à Abidjan pour servir l'Afrique de l'Ouest",
    },
    {
      id: 3,
      name: "Mode & Style",
      sector: "Mode",
      description: "Marque de mode africaine moderne alliant tradition et innovation, présente dans 15 pays.",
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400",
      location: "Marseille, France",
      employees: "20-50",
      founded: "2019",
      website: "www.modestyle.com",
      followers: 2150,
      posts: 234,
      jobs: 2,
      rating: 4.9,
      isFollowing: false,
      growth: "+32%",
      specialties: ["Design", "Mode", "E-commerce", "Retail"],
      recentNews: "Lancement de la collection capsule avec des artistes locaux",
    },
    {
      id: 4,
      name: "Green Energy Corp",
      sector: "Énergie",
      description: "Entreprise leader dans les solutions d'énergie renouvelable pour l'Afrique subsaharienne.",
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400",
      location: "Dakar, Sénégal",
      employees: "100-500",
      founded: "2015",
      website: "www.greenenergy.com",
      followers: 3420,
      posts: 178,
      jobs: 12,
      rating: 4.7,
      isFollowing: false,
      growth: "+45%",
      specialties: ["Solaire", "Éolien", "Stockage", "Smart Grid"],
      recentNews: "Nouveau projet de 500MW au Sénégal approuvé",
    },
    {
      id: 5,
      name: "FinTech Solutions",
      sector: "Finance",
      description:
        "Solutions de paiement mobile et services financiers digitaux pour l'inclusion financière en Afrique.",
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400",
      location: "Accra, Ghana",
      employees: "200-500",
      founded: "2017",
      website: "www.fintechsolutions.com",
      followers: 4560,
      posts: 267,
      jobs: 8,
      rating: 4.8,
      isFollowing: false,
      growth: "+67%",
      specialties: ["Mobile Money", "Blockchain", "API", "Security"],
      recentNews: "Partenariat avec 5 banques pour l'expansion régionale",
    },
    {
      id: 6,
      name: "AgriTech Innovation",
      sector: "Agriculture",
      description:
        "Technologies innovantes pour l'agriculture moderne en Afrique : IoT, drones, et intelligence artificielle.",
      logo: "/placeholder.svg?height=80&width=80",
      cover: "/placeholder.svg?height=200&width=400",
      location: "Nairobi, Kenya",
      employees: "30-100",
      founded: "2021",
      website: "www.agritech.com",
      followers: 1890,
      posts: 123,
      jobs: 6,
      rating: 4.5,
      isFollowing: false,
      growth: "+89%",
      specialties: ["IoT", "Drones", "IA", "Sustainability"],
      recentNews: "Prix de l'innovation agricole 2024 remporté",
    },
  ]

  const sectors = [
    { id: "all", label: "Tous les secteurs", count: companies.length },
    { id: "Technologie", label: "Technologie", count: 2 },
    { id: "Finance", label: "Finance", count: 1 },
    { id: "Marketing Digital", label: "Marketing", count: 1 },
    { id: "Mode", label: "Mode", count: 1 },
    { id: "Énergie", label: "Énergie", count: 1 },
    { id: "Agriculture", label: "Agriculture", count: 1 },
  ]

  const toggleFollow = (companyId: number) => {
    setFollowedCompanies((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId],
    )
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === "all" || company.sector === selectedSector
    return matchesSearch && matchesSector
  })

  const followedCompaniesData = companies.filter((company) => followedCompanies.includes(company.id))

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
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Entreprises
                </h1>
                <p className="text-sm text-gray-600">Découvrez les entreprises innovantes d'Afrique</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/novaworld" className="text-gray-800 hover:text-blue-600 transition-colors">
                Accueil
              </a>
              <a href="/novaworld/feed" className="text-gray-800 hover:text-blue-600 transition-colors">
                Fil d'actualité
              </a>
              <a href="/novaworld/network" className="text-gray-800 hover:text-blue-600 transition-colors">
                Mon réseau
              </a>
              <a href="/novaworld/companies" className="text-blue-600 font-medium">
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
                Créer une page
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
              <div className="text-sm text-gray-600">Entreprises</div>
              <div className="text-xs text-green-600 mt-1">+156 ce mois</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">45</div>
              <div className="text-sm text-gray-600">Secteurs</div>
              <div className="text-xs text-blue-600 mt-1">Diversité</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">12,456</div>
              <div className="text-sm text-gray-600">Emplois disponibles</div>
              <div className="text-xs text-purple-600 mt-1">+23% cette semaine</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
              <div className="text-sm text-gray-600">Taux de croissance</div>
              <div className="text-xs text-green-600 mt-1">Moyenne secteur</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher des entreprises..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {sectors.map((sector) => (
                  <Button
                    key={sector.id}
                    variant={selectedSector === sector.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSector(sector.id)}
                    className={`whitespace-nowrap ${
                      selectedSector === sector.id ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""
                    }`}
                  >
                    {sector.label} ({sector.count})
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explore">Explorer</TabsTrigger>
            <TabsTrigger value="following">Mes entreprises ({followedCompaniesData.length})</TabsTrigger>
          </TabsList>

          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <Card
                  key={company.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Cover Image */}
                  <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                    <img
                      src={company.cover || "/placeholder.svg"}
                      alt={`${company.name} cover`}
                      className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 text-white border-white/30">{company.sector}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Company Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 bg-white shadow-md">
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={`${company.name} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800 hover:text-blue-600 cursor-pointer">
                              {company.name}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {company.location}
                            </div>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>{company.employees} employés</span>
                              <span>Fondée en {company.founded}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={followedCompanies.includes(company.id) ? "outline" : "default"}
                            onClick={() => toggleFollow(company.id)}
                            className={
                              !followedCompanies.includes(company.id)
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                                : ""
                            }
                          >
                            {followedCompanies.includes(company.id) ? (
                              <>
                                <UserPlus className="h-3 w-3 mr-1" />
                                Suivi
                              </>
                            ) : (
                              <>
                                <Plus className="h-3 w-3 mr-1" />
                                Suivre
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">{company.description}</p>

                    {/* Recent News */}
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <div className="text-xs font-medium text-blue-700 mb-1">Actualité récente</div>
                          <div className="text-xs text-blue-600">{company.recentNews}</div>
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">Spécialités:</div>
                      <div className="flex flex-wrap gap-1">
                        {company.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-4 text-center">
                      <div>
                        <div className="text-sm font-bold text-gray-800">{company.followers}</div>
                        <div className="text-xs text-gray-600">Abonnés</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-800">{company.posts}</div>
                        <div className="text-xs text-gray-600">Publications</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-800">{company.jobs}</div>
                        <div className="text-xs text-gray-600">Emplois</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-bold text-gray-800">{company.rating}</span>
                        </div>
                        <div className="text-xs text-gray-600">Note</div>
                      </div>
                    </div>

                    {/* Growth */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-gray-600">Croissance:</span>
                        <span className="font-bold text-green-600 ml-1">{company.growth}</span>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Site web
                        </a>
                      </Button>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <a href={`/novaworld/companies/${company.id}`}>
                          <Eye className="h-3 w-3 mr-1" />
                          Voir profil
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`/novaworld/jobs?company=${company.id}`}>
                          <Briefcase className="h-3 w-3 mr-1" />
                          Emplois
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg" className="w-full">
                Charger plus d'entreprises
              </Button>
            </div>
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="space-y-6">
            {followedCompaniesData.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-6">
                {followedCompaniesData.map((company) => (
                  <Card key={company.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img
                            src={company.logo || "/placeholder.svg"}
                            alt={`${company.name} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{company.name}</h3>
                          <p className="text-sm text-gray-600">{company.sector}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {company.location}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => toggleFollow(company.id)}>
                          Suivi
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Nouvelles publications:</span>
                          <span className="font-medium text-blue-600">3 cette semaine</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Nouveaux emplois:</span>
                          <span className="font-medium text-green-600">{company.jobs} disponibles</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Voir profil
                        </Button>
                        <Button size="sm" variant="outline">
                          <Briefcase className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Aucune entreprise suivie</h3>
                  <p className="text-gray-600 mb-6">
                    Commencez à suivre des entreprises pour rester informé de leurs actualités et opportunités.
                  </p>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600"
                    onClick={() => setActiveTab("explore")}
                  >
                    Explorer les entreprises
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
