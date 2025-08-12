"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Bell,
    Briefcase,
    Building2,
    Filter,
    Heart,
    MapPin,
    MessageSquare,
    Plus,
    Search,
    Share2,
    TrendingUp,
    UserPlus,
    Users,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Données réelles des entreprises
const companies = [
  { 
    id: 1, 
    name: "DL Solutions", 
    logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png", 
    sector: "Technologie", 
    location: "Yaoundé, Cameroun",
    employees: 25,
    founded: 2020,
    description: "Solutions digitales innovantes pour entreprises",
    jobs: 5,
    followers: 1247,
    verified: true,
    industry: "Software & Services"
  },
  { 
    id: 2, 
    name: "Nova Hospitality", 
    logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg", 
    sector: "Hôtellerie", 
    location: "Douala, Cameroun",
    employees: 150,
    founded: 2018,
    description: "Chaîne hôtelière premium en Afrique",
    jobs: 12,
    followers: 892,
    verified: true,
    industry: "Hospitality & Tourism"
  },
  { 
    id: 3, 
    name: "AssurPro Cameroun", 
    logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg", 
    sector: "Assurance", 
    location: "Yaoundé, Cameroun",
    employees: 89,
    founded: 2015,
    description: "Solutions d'assurance personnalisées",
    jobs: 8,
    followers: 567,
    verified: true,
    industry: "Insurance"
  },
  { 
    id: 4, 
    name: "TechInnov Africa", 
    logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993228/Jean_Dupont_xjsear.jpg", 
    sector: "Technologie", 
    location: "Lagos, Nigeria",
    employees: 45,
    founded: 2021,
    description: "Innovation technologique pour l'Afrique",
    jobs: 15,
    followers: 2341,
    verified: true,
    industry: "Technology"
  }
];

// Offres d'emploi réelles
const jobs = [
  { 
    id: 1, 
    title: "Développeur Fullstack Senior", 
    company: "DL Solutions", 
    location: "Yaoundé, Cameroun", 
    logo: companies[0].logo,
    type: "CDI",
    salary: "2.5M - 4M FCFA",
    experience: "3-5 ans",
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    posted: "Il y a 2 jours",
    applications: 23
  },
  { 
    id: 2, 
    title: "Chef de projet Digital", 
    company: "Nova Hospitality", 
    location: "Douala, Cameroun", 
    logo: companies[1].logo,
    type: "CDI",
    salary: "3M - 5M FCFA",
    experience: "5-7 ans",
    skills: ["Gestion de projet", "Agile", "Digital Marketing"],
    posted: "Il y a 1 semaine",
    applications: 45
  },
  { 
    id: 3, 
    title: "Agent Commercial Assurance", 
    company: "AssurPro Cameroun", 
    location: "Yaoundé, Cameroun", 
    logo: companies[2].logo,
    type: "CDD",
    salary: "1.5M - 2.5M FCFA",
    experience: "1-3 ans",
    skills: ["Vente", "Relation client", "Assurance"],
    posted: "Il y a 3 jours",
    applications: 67
  },
  { 
    id: 4, 
    title: "Data Scientist", 
    company: "TechInnov Africa", 
    location: "Lagos, Nigeria", 
    logo: companies[3].logo,
    type: "CDI",
    salary: "4M - 6M FCFA",
    experience: "2-4 ans",
    skills: ["Python", "Machine Learning", "SQL"],
    posted: "Il y a 5 jours",
    applications: 34
  }
];

// Posts du réseau
const posts = [
  {
    id: 1,
    author: {
      name: "Samuel OBAM DAY",
      role: "CEO & Fondateur",
      company: "DL Solutions",
      avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png"
    },
    content: "Fier d'annoncer le lancement de notre nouvelle plateforme NovaCore ! 🚀 Une solution complète pour la gestion d'entreprise. #Innovation #Digital #Cameroun",
    likes: 89,
    comments: 23,
    shares: 12,
    time: "Il y a 2h",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993736/illustration-vectorielle-intelligence-artificielle_1237743-62154_t29exq.avif"
  },
  {
    id: 2,
    author: {
      name: "Marie NGUEMO",
      role: "Directrice RH",
      company: "Nova Hospitality",
      avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg"
    },
    content: "Nous recrutons ! 🎯 Rejoignez notre équipe dynamique et participez à la transformation du secteur hôtelier en Afrique. #Recrutement #Hospitality #Carrière",
    likes: 156,
    comments: 45,
    shares: 28,
    time: "Il y a 5h"
  },
  {
    id: 3,
    author: {
      name: "Pierre ESSOMBA",
      role: "Directeur Commercial",
      company: "AssurPro Cameroun",
      avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg"
    },
    content: "L'innovation dans l'assurance passe par la digitalisation ! 💡 Nos nouveaux produits connectés révolutionnent l'expérience client. #Assurance #Innovation #Digital",
    likes: 67,
    comments: 18,
    shares: 9,
    time: "Il y a 1 jour"
  }
];

export default function NovaWorldPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">NW</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">NovaWorld</h1>
                  <p className="text-sm text-gray-600">Réseau professionnel B2B</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher entreprises, emplois, personnes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="feed">Fil d'actualité</TabsTrigger>
              <TabsTrigger value="companies">Entreprises</TabsTrigger>
              <TabsTrigger value="jobs">Emplois</TabsTrigger>
              <TabsTrigger value="network">Réseau</TabsTrigger>
            </TabsList>

            {/* Fil d'actualité */}
            <TabsContent value="feed" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Posts */}
                <div className="lg:col-span-2 space-y-6">
                  {posts.map((post) => (
                    <Card key={post.id} className="p-6">
                      <div className="flex items-start space-x-3 mb-4">
                        <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{post.author.name}</h3>
                            {post.author.company === "DL Solutions" && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">Vérifié</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{post.author.role} chez {post.author.company}</p>
                          <p className="text-xs text-gray-500">{post.time}</p>
                        </div>
                      </div>
                      <p className="text-gray-800 mb-4">{post.content}</p>
                      {post.image && (
                        <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-lg mb-4" />
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-1 hover:text-red-500">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-blue-500">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-500">
                            <Share2 className="h-4 w-4" />
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Statistiques */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5" />
                        <span>Statistiques</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Entreprises</span>
                        <span className="font-semibold">{companies.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Emplois actifs</span>
                        <span className="font-semibold">{jobs.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Membres</span>
                        <span className="font-semibold">2,847</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Entreprises populaires */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Entreprises populaires</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {companies.slice(0, 3).map((company) => (
                        <div key={company.id} className="flex items-center space-x-3">
                          <img src={company.logo} alt={company.name} className="w-10 h-10 rounded-full" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{company.name}</p>
                            <p className="text-xs text-gray-500">{company.followers} followers</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <UserPlus className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Entreprises */}
            <TabsContent value="companies" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Entreprises</h2>
                <Link href="/novacore/novaworld/companies/nouveau">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle entreprise
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => (
                  <Card key={company.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-lg">{company.name}</CardTitle>
                            {company.verified && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">Vérifié</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{company.industry}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{company.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700">{company.description}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{company.employees} employés</span>
                        <span className="text-gray-600">{company.jobs} offres d'emploi</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{company.followers} followers</span>
                        <span className="text-gray-600">Fondé en {company.founded}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <UserPlus className="h-3 w-3 mr-1" />
                          Suivre
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/novacore/novaworld/companies/${company.id}`}>
                            Voir
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Emplois */}
            <TabsContent value="jobs" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Offres d'emploi</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrer
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Publier un emploi
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start space-x-3">
                        <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <p className="text-sm text-gray-600">{job.company}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Salaire: {job.salary}</span>
                        <span className="text-gray-600">Expérience: {job.experience}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{job.posted}</span>
                        <span>{job.applications} candidatures</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Postuler
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Réseau */}
            <TabsContent value="network" className="space-y-6">
              {/* Lien vers les fonctionnalités avancées */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">🚀 Découvrez les Nouvelles Fonctionnalités</h3>
                    <p className="text-blue-100 mb-4">
                      NovaWorld dispose maintenant de capacités avancées : paiements sécurisés, chat en temps réel et cartographie interactive
                    </p>
                    <a 
                      href="/novacore/novaworld/advanced-features" 
                      className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Explorer les Fonctionnalités Avancées
                    </a>
                  </div>
                </CardContent>
              </Card>
              <h2 className="text-2xl font-bold">Votre réseau</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Connexions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">847</div>
                    <p className="text-sm text-gray-600">+12 cette semaine</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5" />
                      <span>Entreprises suivies</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">23</div>
                    <p className="text-sm text-gray-600">+3 ce mois</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5" />
                      <span>Candidatures</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">12</div>
                    <p className="text-sm text-gray-600">5 en attente</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Suggestions de connexions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {companies.map((company) => (
                      <div key={company.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <img src={company.logo} alt={company.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{company.name}</p>
                          <p className="text-xs text-gray-500">{company.industry}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <UserPlus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}