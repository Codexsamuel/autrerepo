"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Grid, List, Eye, Calendar, Tag, ArrowRight } from "lucide-react"

export default function PortfolioPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    { id: "all", name: "Toutes les réalisations", count: 7 },
    { id: "formations", name: "Formations", count: 3 },
    { id: "shooting", name: "Shooting Photo/Vidéo", count: 2 },
    { id: "marketing", name: "Campagnes Marketing", count: 2 },
  ]

  const portfolioVideos = [
    {
      id: 1,
      title: "Formation Télévente Avancée",
      description: "Session de formation complète sur les techniques de télévente moderne avec nos experts.",
      category: "formations",
      duration: "2:45",
      views: 1247,
      date: "2024-02-15",
      tags: ["Formation", "Télévente", "Commercial"],
      videoUrl:
        "https://res.cloudinary.com/dko5sommz/video/upload/v1745725401/v09044g40000cuub0d7og65j6kvqvbl0_kcmmqh.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 2,
      title: "Shooting Corporate DL Solutions",
      description: "Séance photo et vidéo corporate pour présenter notre équipe et nos valeurs d'entreprise.",
      category: "shooting",
      duration: "1:32",
      views: 892,
      date: "2024-02-10",
      tags: ["Corporate", "Shooting", "Équipe"],
      videoUrl:
        "https://res.cloudinary.com/dko5sommz/video/upload/v1745725396/v09044g40000cv33g0fog65ukueqn5ag_k5fich.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 3,
      title: "Campagne IA - Transformation Digitale",
      description: "Campagne marketing innovante utilisant l'IA pour promouvoir la transformation digitale.",
      category: "marketing",
      duration: "3:12",
      views: 2156,
      date: "2024-02-08",
      tags: ["IA", "Marketing", "Digital"],
      videoUrl:
        "https://res.cloudinary.com/dko5sommz/video/upload/v1745725388/v09044g40000cvi1phnog65rtaq403rg_ir6wil.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 4,
      title: "Formation SAV Excellence",
      description: "Module de formation dédié à l'excellence du service après-vente et la satisfaction client.",
      category: "formations",
      duration: "4:18",
      views: 756,
      date: "2024-02-05",
      tags: ["SAV", "Formation", "Service Client"],
      videoUrl:
        "https://res.cloudinary.com/dko5sommz/video/upload/v1745725411/v09044g40000cvffb47og65slfddol40_hpit8y.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 5,
      title: "Présentation NovaCore CRM",
      description: "Démonstration complète de notre plateforme CRM NovaCore et ses fonctionnalités IA.",
      category: "marketing",
      duration: "5:24",
      views: 3421,
      date: "2024-02-01",
      tags: ["NovaCore", "CRM", "Démonstration"],
      videoUrl:
        "https://res.cloudinary.com/dko5sommz/video/upload/v1745725385/v09044g40000cv07u0nog65naddro8vg_yelt76.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 6,
      title: "Formation Marketing Digital",
      description: "Session intensive sur les stratégies de marketing digital et l'utilisation des réseaux sociaux.",
      category: "formations",
      duration: "6:15",
      views: 1834,
      date: "2024-01-28",
      tags: ["Marketing Digital", "Réseaux Sociaux", "Formation"],
      videoUrl:
        "https://res.cloudinary.com/dko5sommz/video/upload/v1745725398/v09044g40000cuv13nfog65iu678r05g_ji1suo.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 7,
      title: "Shooting Produit - DL Style",
      description: "Réalisation de contenus visuels pour la boutique DL Style, mise en valeur des produits.",
      category: "shooting",
      duration: "2:58",
      views: 967,
      date: "2024-01-25",
      tags: ["Produit", "E-commerce", "Shooting"],
      videoUrl:
        "https://res.cloudinary.com/dko5sommz/video/upload/v1745725416/v09044g40000cvbhh1fog65mg3c2elp0_gr06yh.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
    },
  ]

  const filteredVideos = portfolioVideos.filter((video) => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const stats = [
    { number: "50+", label: "Projets réalisés" },
    { number: "25k+", label: "Vues totales" },
    { number: "98%", label: "Satisfaction client" },
    { number: "24/7", label: "Support créatif" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-purple-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-14 w-14 object-contain" />
              </div>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-800 hover:text-purple-600 transition-colors">
                Accueil
              </a>
              <a href="/a-propos" className="text-gray-800 hover:text-purple-600 transition-colors">
                À propos
              </a>
              <a href="/services" className="text-gray-800 hover:text-purple-600 transition-colors">
                Services
              </a>
              <a href="/formations" className="text-gray-800 hover:text-purple-600 transition-colors">
                Formations
              </a>
              <a href="/portfolio" className="text-purple-600 font-medium">
                Portfolio
              </a>
              <a href="/contact" className="text-gray-800 hover:text-purple-600 transition-colors">
                Contact
              </a>
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="border-purple-200 text-purple-700" asChild>
                <a href="/devis">Devis IA</a>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600" asChild>
                <a href="/sign-in">NovaCore</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">Nos Réalisations</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Portfolio{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Créatif
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Découvrez nos réalisations vidéo : formations professionnelles, shootings corporate et campagnes marketing
              innovantes.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une réalisation..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-purple-600" : ""}
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{filteredVideos.length} réalisations</span>
              <div className="flex space-x-1 ml-4">
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
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div
            className={`grid gap-8 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"}`}
          >
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                  {/* Video Container */}
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-1/3" : "w-full"}`}>
                    <video
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === "list" ? "h-48" : "h-64"
                      }`}
                      poster={video.thumbnail}
                      controls
                      preload="metadata"
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>

                    {/* Overlay Info */}
                    <div className="absolute top-3 left-3 flex space-x-2">
                      <Badge className="bg-black/70 text-white">{video.duration}</Badge>
                      <Badge className="bg-purple-600">
                        {categories.find((c) => c.id === video.category)?.name.split(" ")[0]}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <div className="flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        <Eye className="h-3 w-3" />
                        <span>{video.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${viewMode === "list" ? "w-2/3 flex flex-col justify-between" : ""}`}>
                    <div>
                      <h3 className={`font-bold mb-3 text-gray-800 ${viewMode === "list" ? "text-xl" : "text-lg"}`}>
                        {video.title}
                      </h3>
                      <p className={`text-gray-600 leading-relaxed ${viewMode === "list" ? "mb-4" : "mb-6"}`}>
                        {video.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {video.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(video.date).toLocaleDateString("fr-FR")}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {video.views.toLocaleString()} vues
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                          Voir plus
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune réalisation trouvée</h3>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche ou filtres.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Prêt à créer ensemble ?</h2>
            <p className="text-xl text-purple-100 mb-10">
              Découvrez comment nous pouvons donner vie à vos projets avec nos services créatifs et innovants.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Démarrer un projet
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
