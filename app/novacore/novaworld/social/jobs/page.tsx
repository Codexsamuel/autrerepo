"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Filter,
  Bookmark,
  Share2,
} from "lucide-react"

interface JobPost {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: {
    min: number
    max: number
    currency: string
  }
  postedAt: string
  description: string
  requirements: string[]
  benefits: string[]
  logo: string
}

export default function JobsPage() {
  const [jobs] = useState<JobPost[]>([
    {
      id: "1",
      title: "Développeur Full Stack Senior",
      company: "Tech Solutions",
      location: "Paris, France",
      type: "CDI",
      salary: {
        min: 65000,
        max: 85000,
        currency: "EUR"
      },
      postedAt: "Il y a 2 jours",
      description: "Nous recherchons un développeur Full Stack Senior pour rejoindre notre équipe de développement...",
      requirements: [
        "5+ ans d'expérience en développement web",
        "Maîtrise de React et Node.js",
        "Expérience avec les bases de données SQL et NoSQL",
        "Connaissance des bonnes pratiques DevOps"
      ],
      benefits: [
        "Télétravail flexible",
        "Mutuelle complète",
        "Tickets restaurant",
        "Formation continue"
      ],
      logo: ""
    },
    {
      id: "2",
      title: "Product Manager",
      company: "Digital Innovations",
      location: "Lyon, France",
      type: "CDI",
      salary: {
        min: 55000,
        max: 75000,
        currency: "EUR"
      },
      postedAt: "Il y a 3 jours",
      description: "Nous cherchons un Product Manager pour diriger le développement de nos produits digitaux...",
      requirements: [
        "3+ ans d'expérience en Product Management",
        "Expérience en méthodologies Agile",
        "Excellentes compétences en communication",
        "Maîtrise des outils d'analyse"
      ],
      benefits: [
        "Bureau moderne",
        "Équipe dynamique",
        "Projets innovants",
        "Évolution rapide"
      ],
      logo: ""
    }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Offres d'emploi</h1>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un emploi..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>
        </div>

        {/* Liste des offres */}
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.logo} alt={job.company} />
                      <AvatarFallback>{job.company.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <p className="text-gray-600">{job.company}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.type}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600">{job.description}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="secondary">{job.type}</Badge>
                  <Badge variant="secondary">{job.location}</Badge>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {job.postedAt}
                  </span>
                  <Button>Postuler</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 