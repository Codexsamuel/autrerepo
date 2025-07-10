"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    ArrowLeft,
    Award,
    Briefcase,
    Building2,
    ExternalLink,
    Mail,
    MapPin,
    Plus,
    Search,
    Star,
    TrendingUp,
    Users
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "/logos/techcorp.png",
      industry: "Technologie",
      location: "Paris, France",
      size: "500-1000",
      founded: 2018,
      description: "Leader en solutions technologiques innovantes pour entreprises",
      rating: 4.8,
      reviews: 156,
      openPositions: 23,
      website: "https://techcorp.com",
      email: "contact@techcorp.com",
      phone: "+33 1 23 45 67 89",
      specialties: ["IA", "Cloud", "Cybersécurité"],
      achievements: ["Top 100 Startups 2023", "Innovation Award 2022"],
      employees: 750,
      revenue: "50M€",
      growth: "+25%"
    },
    {
      id: 2,
      name: "InnovateLab",
      logo: "/logos/innovatelab.png",
      industry: "R&D",
      location: "Lyon, France",
      size: "100-500",
      founded: 2020,
      description: "Centre de recherche et développement en biotechnologies",
      rating: 4.6,
      reviews: 89,
      openPositions: 12,
      website: "https://innovatelab.com",
      email: "info@innovatelab.com",
      phone: "+33 4 78 12 34 56",
      specialties: ["Biotech", "Médecine", "Recherche"],
      achievements: ["Prix Innovation Santé 2023", "Brevet Européen"],
      employees: 320,
      revenue: "15M€",
      growth: "+40%"
    },
    {
      id: 3,
      name: "DigitalFlow Marketing",
      logo: "/logos/digitalflow.png",
      industry: "Marketing",
      location: "Marseille, France",
      size: "50-100",
      founded: 2019,
      description: "Agence de marketing digital spécialisée en croissance",
      rating: 4.7,
      reviews: 234,
      openPositions: 8,
      website: "https://digitalflow.com",
      email: "hello@digitalflow.com",
      phone: "+33 4 91 23 45 67",
      specialties: ["Growth Hacking", "SEO", "Social Media"],
      achievements: ["Agency of the Year 2023", "Best Campaign Award"],
      employees: 85,
      revenue: "8M€",
      growth: "+60%"
    },
    {
      id: 4,
      name: "GreenTech Solutions",
      logo: "/logos/greentech.png",
      industry: "Environnement",
      location: "Nantes, France",
      size: "100-500",
      founded: 2021,
      description: "Solutions durables pour un avenir plus vert",
      rating: 4.9,
      reviews: 67,
      openPositions: 15,
      website: "https://greentech.com",
      email: "contact@greentech.com",
      phone: "+33 2 40 12 34 56",
      specialties: ["Énergies Renouvelables", "Recyclage", "Éco-construction"],
      achievements: ["Green Company Award 2023", "ISO 14001"],
      employees: 280,
      revenue: "12M€",
      growth: "+80%"
    },
    {
      id: 5,
      name: "FinTech Pro",
      logo: "/logos/fintechpro.png",
      industry: "Finance",
      location: "Toulouse, France",
      size: "500-1000",
      founded: 2017,
      description: "Innovation financière et solutions de paiement",
      rating: 4.5,
      reviews: 189,
      openPositions: 31,
      website: "https://fintechpro.com",
      email: "info@fintechpro.com",
      phone: "+33 5 61 23 45 67",
      specialties: ["Paiements", "Blockchain", "InsurTech"],
      achievements: ["FinTech Innovation Award", "Top 50 Startups"],
      employees: 650,
      revenue: "35M€",
      growth: "+45%"
    },
    {
      id: 6,
      name: "HealthTech Innovations",
      logo: "/logos/healthtech.png",
      industry: "Santé",
      location: "Strasbourg, France",
      size: "100-500",
      founded: 2022,
      description: "Technologies médicales de pointe",
      rating: 4.8,
      reviews: 123,
      openPositions: 18,
      website: "https://healthtech.com",
      email: "contact@healthtech.com",
      phone: "+33 3 88 12 34 56",
      specialties: ["Télémédecine", "IA Médicale", "Dispositifs Médicaux"],
      achievements: ["Health Innovation Prize", "CE Marking"],
      employees: 420,
      revenue: "22M€",
      growth: "+120%"
    }
  ]);

  const industries = ["Tous", "Technologie", "R&D", "Marketing", "Environnement", "Finance", "Santé"];
  const locations = ["Tous", "Paris", "Lyon", "Marseille", "Nantes", "Toulouse", "Strasbourg"];
  const sizes = ["Tous", "1-10", "10-50", "50-100", "100-500", "500-1000", "1000+"];

  const router = useRouter();

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || selectedIndustry === "Tous" || company.industry === selectedIndustry;
    const matchesLocation = selectedLocation === "" || selectedLocation === "Tous" || company.location.includes(selectedLocation);
    const matchesSize = selectedSize === "" || selectedSize === "Tous" || company.size === selectedSize;
    
    return matchesSearch && matchesIndustry && matchesLocation && matchesSize;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/novaworld")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Annuaire des Entreprises</h1>
                <p className="text-sm text-gray-600">Découvrez et connectez-vous avec les meilleures entreprises</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push("/novaworld/companies/add")}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une entreprise
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher une entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Industrie" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Taille" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{companies.length}</p>
                  <p className="text-xs text-gray-600">Entreprises</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{companies.reduce((acc, company) => acc + company.openPositions, 0)}</p>
                  <p className="text-xs text-gray-600">Offres d'emploi</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{companies.reduce((acc, company) => acc + company.employees, 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Employés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-xs text-gray-600">Industries</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={company.logo} />
                      <AvatarFallback>{company.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{company.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{company.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{company.rating}</span>
                    <span className="text-xs text-gray-500">({company.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{company.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Industrie:</span>
                    <Badge variant="outline">{company.industry}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Taille:</span>
                    <span>{company.size} employés</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Fondée:</span>
                    <span>{company.founded}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Postes ouverts:</span>
                    <Badge className="bg-green-100 text-green-800">{company.openPositions}</Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-sm">Spécialités:</h4>
                  <div className="flex flex-wrap gap-1">
                    {company.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-sm">Réalisations:</h4>
                  <div className="space-y-1">
                    {company.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-1 text-xs text-gray-600">
                        <Award className="w-3 h-3 text-yellow-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={() => router.push(`/novaworld/companies/${company.id}`)} 
                    className="flex-1"
                  >
                    Voir le profil
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune entreprise trouvée</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}