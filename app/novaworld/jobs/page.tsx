"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Briefcase,
  MapPin,
  Search,
  Filter,
  ArrowLeft,
  Bell,
  Settings,
  Clock,
  DollarSign,
  Building,
  Star,
  Bookmark,
  Plus,
  Award,
  Eye,
} from "lucide-react"

export default function NovaWorldJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [savedJobs, setSavedJobs] = useState<number[]>([1, 3])
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const jobs = [
    {
      id: 1,
      title: "Développeur React Senior",
      company: "TechStart SAS",
      companyLogo: "/placeholder.svg?height=50&width=50",
      location: "Paris, France",
      type: "CDI",
      remote: true,
      salary: "45k - 65k €",
      experience: "3-5 ans",
      posted: "Il y a 2h",
      applicants: 23,
      description:
        "Nous recherchons un développeur React senior pour rejoindre notre équipe dynamique et travailler sur des projets innovants pour l'Afrique.",
      requirements: ["React", "TypeScript", "Node.js", "GraphQL"],
      benefits: ["Télétravail", "Formation", "Mutuelle", "RTT"],
      isUrgent: true,
      isFeatured: true,
      companyRating: 4.8,
      sector: "Technologie",
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Digital Agency",
      companyLogo: "/placeholder.svg?height=50&width=50",
      location: "Lyon, France",
      type: "CDI",
      remote: false,
      salary: "40k - 55k €",
      experience: "2-4 ans",
      posted: "Il y a 4h",
      applicants: 18,
      description:
        "Rejoignez notre équipe marketing pour développer des stratégies digitales innovantes pour nos clients africains.",
      requirements: ["Marketing Digital", "SEO", "Analytics", "Social Media"],
      benefits: ["Formation", "Mutuelle", "Tickets restaurant", "CE"],
      isUrgent: false,
      isFeatured: true,
      companyRating: 4.6,
      sector: "Marketing",
    },
    {
      id: 3,
      title: "Designer UX/UI",
      company: "Mode & Style",
      companyLogo: "/placeholder.svg?height=50&width=50",
      location: "Marseille, France",
      type: "CDD",
      remote: true,
      salary: "35k - 45k €",
      experience: "1-3 ans",
      posted: "Il y a 6h",
      applicants: 31,
      description:
        "Créez des expériences utilisateur exceptionnelles pour notre plateforme e-commerce de mode africaine.",
      requirements: ["Figma", "Adobe Creative", "Prototyping", "User Research"],
      benefits: ["Télétravail", "Horaires flexibles", "Mutuelle"],
      isUrgent: false,
      isFeatured: false,
      companyRating: 4.9,
      sector: "Design",
    },
    {
      id: 4,
      title: "Ingénieur DevOps",
      company: "Green Energy Corp",
      companyLogo: "/placeholder.svg?height=50&width=50",
      location: "Dakar, Sénégal",
      type: "CDI",
      remote: false,
      salary: "50k - 70k €",
      experience: "4-6 ans",
      posted: "Il y a 8h",
      applicants: 12,
      description: "Gérez l'infrastructure cloud pour nos solutions d'énergie renouvelable à travers l'Afrique.",
      requirements: ["AWS", "Docker", "Kubernetes", "Terraform"],
      benefits: ["Relocation", "Formation", "Mutuelle", "Bonus"],
      isUrgent: true,
      isFeatured: true,
      companyRating: 4.7,
      sector: "Énergie",
    },
    {
      id: 5,
      title: "Product Manager",
      company: "FinTech Solutions",
      companyLogo: "/placeholder.svg?height=50&width=50",
      location: "Accra, Ghana",
      type: "CDI",
      remote: true,
      salary: "55k - 75k €",
      experience: "3-5 ans",
      posted: "Il y a 12h",
      applicants: 27,
      description:
        "Dirigez le développement de produits fintech révolutionnaires pour l'inclusion financière en Afrique.",
      requirements: ["Product Management", "Agile", "Analytics", "FinTech"],
      benefits: ["Stock options", "Télétravail", "Formation", "Mutuelle"],
      isUrgent: false,
      isFeatured: true,
      companyRating: 4.8,
      sector: "Finance",
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "AgriTech Innovation",
      companyLogo: "/placeholder.svg?height=50&width=50",
      location: "Nairobi, Kenya",
      type: "CDI",
      remote: false,
      salary: "45k - 60k €",
      experience: "2-4 ans",
      posted: "Il y a 1 jour",
      applicants: 19,
      description:
        "Analysez les données agricoles pour optimiser les rendements et développer des solutions IA innovantes.",
      requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
      benefits: ["Relocation", "Formation", "Mutuelle", "Projets impact"],
      isUrgent: false,
      isFeatured: false,
      companyRating: 4.5,
      sector: "Agriculture",
    },
  ]

  const locations = [
    { id: "all", label: "Toutes les villes", count: jobs.length },
    { id: "Paris", label: "Paris", count: 1 },
    { id: "Lyon", label: "Lyon", count: 1 },
    { id: "Marseille", label: "Marseille", count: 1 },
    { id: "Dakar", label: "Dakar", count: 1 },
    { id: "Accra", label: "Accra", count: 1 },
    { id: "Nairobi", label: "Nairobi", count: 1 },
  ]

  const jobTypes = [
    { id: "all", label: "Tous les types", count: jobs.length },
    { id: "CDI", label: "CDI", count: 4 },
    { id: "CDD", label: "CDD", count: 1 },
    { id: "Freelance", label: "Freelance", count: 0 },
    { id: "Stage", label: "Stage", count: 0 },
  ]

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocation === "all" || job.location.includes(selectedLocation)
    const matchesType = selectedType === "all" || job.type === selectedType
    return matchesSearch && matchesLocation && matchesType
  })

  const savedJobsData = jobs.filter((job) => savedJobs.includes(job.id))
  const featuredJobs = jobs.filter((job) => job.isFeatured)

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
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Emplois
                </h1>
                <p className="text-sm text-gray-600">Trouvez votre prochaine opportunité</p>
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
              <a href="/novaworld/companies" className="text-gray-800 hover:text-blue-600 transition-colors">
                Entreprises
              </a>
              <a href="/novaworld/jobs" className="text-blue-600 font-medium">
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
                Publier une offre
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
              <div className="text-3xl font-bold text-blue-600 mb-2">12,456</div>
              <div className="text-sm text-gray-600">Offres d'emploi</div>
              <div className="text-xs text-green-600 mt-1">+234 cette semaine</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">2,847</div>
              <div className="text-sm text-gray-600">Entreprises</div>
              <div className="text-xs text-blue-600 mt-1">Qui recrutent</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
              <div className="text-sm text-gray-600">Taux de placement</div>
              <div className="text-xs text-purple-600 mt-1">Via NovaWorld</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">45k€</div>
              <div className="text-sm text-gray-600">Salaire moyen</div>
              <div className="text-xs text-green-600 mt-1">+12% cette année</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un emploi, une entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtres avancés
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex gap-2 overflow-x-auto">
                <span className="text-sm text-gray-600 whitespace-nowrap py-2">Localisation:</span>
                {locations.slice(0, 4).map((location) => (
                  <Button
                    key={location.id}
                    variant={selectedLocation === location.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLocation(location.id)}
                    className={`whitespace-nowrap ${
                      selectedLocation === location.id ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""
                    }`}
                  >
                    {location.label}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2 overflow-x-auto">
                <span className="text-sm text-gray-600 whitespace-nowrap py-2">Type:</span>
                {jobTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.id)}
                    className={`whitespace-nowrap ${
                      selectedType === type.id ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""
                    }`}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tous les emplois ({filteredJobs.length})</TabsTrigger>
            <TabsTrigger value="featured">À la une ({featuredJobs.length})</TabsTrigger>
            <TabsTrigger value="saved">Sauvegardés ({savedJobsData.length})</TabsTrigger>
          </TabsList>

          {/* All Jobs Tab */}
          <TabsContent value="all" className="space-y-6">
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={job.companyLogo || "/placeholder.svg"}
                            alt={`${job.company} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-lg text-gray-800 hover:text-blue-600 cursor-pointer mb-1">
                                {job.title}
                              </h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium text-gray-700">{job.company}</span>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                                  <span className="text-xs text-gray-600">{job.companyRating}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {job.location}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {job.posted}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  {job.applicants} candidats
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {job.isUrgent && <Badge className="bg-red-100 text-red-700">Urgent</Badge>}
                              {job.isFeatured && (
                                <Badge className="bg-yellow-100 text-yellow-700">
                                  <Star className="h-3 w-3 mr-1" />À la une
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleSaveJob(job.id)}
                                className={savedJobs.includes(job.id) ? "text-blue-600" : "text-gray-400"}
                              >
                                <Bookmark className={`h-4 w-4 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{job.type}</Badge>
                        {job.remote && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            Remote
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Award className="h-3 w-3 mr-1" />
                        {job.experience}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-3 w-3 mr-1" />
                        {job.sector}
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">{job.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-2">Compétences requises:</div>
                        <div className="flex flex-wrap gap-1">
                          {job.requirements.map((req, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-2">Avantages:</div>
                        <div className="flex flex-wrap gap-1">
                          {job.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-green-600 border-green-200">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{job.applicants} candidatures</span>
                        <span>•</span>
                        <span>Publié {job.posted}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Voir détails
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                          Postuler
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
                Charger plus d'offres
              </Button>
            </div>
          </TabsContent>

          {/* Featured Jobs Tab */}
          <TabsContent value="featured" className="space-y-6">
            <div className="space-y-4">
              {featuredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-yellow-400"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-yellow-700">Offre mise en avant</span>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={job.companyLogo || "/placeholder.svg"}
                          alt={`${job.company} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{job.title}</h3>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.salary}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-4">{job.description}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Voir détails
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                            Postuler maintenant
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Saved Jobs Tab */}
          <TabsContent value="saved" className="space-y-6">
            {savedJobsData.length > 0 ? (
              <div className="space-y-4">
                {savedJobsData.map((job) => (
                  <Card key={job.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={job.companyLogo || "/placeholder.svg"}
                              alt={`${job.company} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-1">{job.title}</h3>
                            <p className="text-gray-600 mb-2">{job.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.salary}</span>
                              <span>•</span>
                              <span>Sauvegardé {job.posted}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => toggleSaveJob(job.id)}>
                            <Bookmark className="h-3 w-3 mr-1 fill-current" />
                            Sauvegardé
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                            Postuler
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Aucun emploi sauvegardé</h3>
                  <p className="text-gray-600 mb-6">
                    Sauvegardez des offres d'emploi pour les retrouver facilement plus tard.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600" onClick={() => setActiveTab("all")}>
                    Explorer les emplois
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
