"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    ArrowLeft,
    Award,
    Bell,
    Bookmark,
    Briefcase,
    Building2,
    Clock,
    DollarSign,
    Mail,
    MapPin,
    Search,
    Share2,
    Star,
    TrendingUp,
    Users
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Développeur React Senior",
      company: {
        name: "TechCorp Solutions",
        logo: "/logos/techcorp.png",
        rating: 4.8,
        reviews: 156
      },
      location: "Paris, France",
      type: "CDI",
      experience: "5-8 ans",
      salary: "65k-85k€",
      description: "Nous recherchons un développeur React senior pour rejoindre notre équipe et travailler sur des projets innovants. Expérience en TypeScript et architecture microservices requise.",
      skills: ["React", "TypeScript", "Node.js", "Microservices", "AWS"],
      benefits: ["Télétravail", "Mutuelle", "Tickets restaurant", "Formation"],
      posted: "2h",
      applications: 23,
      urgent: true,
      remote: true
    },
    {
      id: 2,
      title: "Data Scientist",
      company: {
        name: "GreenTech Solutions",
        logo: "/logos/greentech.png",
        rating: 4.9,
        reviews: 67
      },
      location: "Lyon, France",
      type: "CDI",
      experience: "3-5 ans",
      salary: "55k-75k€",
      description: "Rejoignez notre équipe de data scientists pour développer des solutions d'IA pour l'optimisation énergétique et la durabilité.",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Big Data"],
      benefits: ["Télétravail", "Mutuelle", "RTT", "Équipement"],
      posted: "4h",
      applications: 18,
      urgent: false,
      remote: true
    },
    {
      id: 3,
      title: "Product Manager",
      company: {
        name: "HealthTech Innovations",
        logo: "/logos/healthtech.png",
        rating: 4.8,
        reviews: 123
      },
      location: "Marseille, France",
      type: "CDI",
      experience: "4-7 ans",
      salary: "70k-90k€",
      description: "Gérez le développement de produits innovants dans le domaine de la santé digitale et de la télémédecine.",
      skills: ["Product Management", "Agile", "Healthcare", "UX", "Analytics"],
      benefits: ["Télétravail", "Mutuelle", "Tickets restaurant", "Formation"],
      posted: "6h",
      applications: 31,
      urgent: true,
      remote: false
    },
    {
      id: 4,
      title: "UX/UI Designer",
      company: {
        name: "FinTech Pro",
        logo: "/logos/fintechpro.png",
        rating: 4.5,
        reviews: 189
      },
      location: "Toulouse, France",
      type: "CDI",
      experience: "2-4 ans",
      salary: "45k-60k€",
      description: "Créez des interfaces utilisateur exceptionnelles pour nos applications financières innovantes.",
      skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "FinTech"],
      benefits: ["Télétravail", "Mutuelle", "Équipement", "Formation"],
      posted: "8h",
      applications: 15,
      urgent: false,
      remote: true
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: {
        name: "InnovateLab",
        logo: "/logos/innovatelab.png",
        rating: 4.6,
        reviews: 89
      },
      location: "Nantes, France",
      type: "CDI",
      experience: "3-6 ans",
      salary: "60k-80k€",
      description: "Optimisez nos infrastructures cloud et automatisez nos processus de déploiement.",
      skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
      benefits: ["Télétravail", "Mutuelle", "RTT", "Équipement"],
      posted: "10h",
      applications: 27,
      urgent: false,
      remote: true
    },
    {
      id: 6,
      title: "Marketing Digital Manager",
      company: {
        name: "DigitalFlow Marketing",
        logo: "/logos/digitalflow.png",
        rating: 4.7,
        reviews: 234
      },
      location: "Strasbourg, France",
      type: "CDI",
      experience: "4-6 ans",
      salary: "50k-70k€",
      description: "Développez et exécutez des stratégies marketing digital innovantes pour nos clients.",
      skills: ["Google Ads", "Facebook Ads", "SEO", "Analytics", "Growth Hacking"],
      benefits: ["Télétravail", "Mutuelle", "Tickets restaurant", "Formation"],
      posted: "12h",
      applications: 42,
      urgent: true,
      remote: false
    }
  ]);

  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const locations = ["Tous", "Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Strasbourg"];
  const types = ["Tous", "CDI", "CDD", "Freelance", "Stage"];
  const experiences = ["Tous", "Débutant", "1-3 ans", "3-5 ans", "5-8 ans", "8+ ans"];
  const salaries = ["Tous", "30k-45k€", "45k-60k€", "60k-80k€", "80k+€"];

  const router = useRouter();

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "" || selectedLocation === "Tous" || job.location.includes(selectedLocation);
    const matchesType = selectedType === "" || selectedType === "Tous" || job.type === selectedType;
    const matchesExperience = selectedExperience === "" || selectedExperience === "Tous" || job.experience === selectedExperience;
    const matchesSalary = selectedSalary === "" || selectedSalary === "Tous" || job.salary === selectedSalary;
    
    return matchesSearch && matchesLocation && matchesType && matchesExperience && matchesSalary;
  });

  const handleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleApplyJob = (jobId: number) => {
    setAppliedJobs(prev => [...prev, jobId]);
    router.push(`/novaworld/jobs/${jobId}/apply`);
  };

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
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Offres d'emploi</h1>
                <p className="text-sm text-gray-600">Trouvez votre prochaine opportunité professionnelle</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Bookmark className="w-4 h-4 mr-2" />
                Jobs sauvegardés ({savedJobs.length})
              </Button>
              <Button>
                <Briefcase className="w-4 h-4 mr-2" />
                Publier une offre
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Titre, entreprise, mots-clés..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de contrat" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Expérience" />
                </SelectTrigger>
                <SelectContent>
                  {experiences.map((experience) => (
                    <SelectItem key={experience} value={experience}>{experience}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSalary} onValueChange={setSelectedSalary}>
                <SelectTrigger>
                  <SelectValue placeholder="Salaire" />
                </SelectTrigger>
                <SelectContent>
                  {salaries.map((salary) => (
                    <SelectItem key={salary} value={salary}>{salary}</SelectItem>
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
                <Briefcase className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{jobs.length}</p>
                  <p className="text-xs text-gray-600">Offres actives</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{jobs.reduce((acc, job) => acc + job.applications, 0)}</p>
                  <p className="text-xs text-gray-600">Candidatures</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{new Set(jobs.map(job => job.company.name)).size}</p>
                  <p className="text-xs text-gray-600">Entreprises</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{jobs.filter(job => job.urgent).length}</p>
                  <p className="text-xs text-gray-600">Offres urgentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Jobs List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={job.company.logo} />
                        <AvatarFallback>{job.company.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          {job.urgent && (
                            <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                          )}
                          {job.remote && (
                            <Badge variant="outline" className="text-blue-600">Remote</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="font-medium">{job.company.name}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span>{job.company.rating}</span>
                            <span>({job.company.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSaveJob(job.id)}
                        className={savedJobs.includes(job.id) ? "text-blue-600" : ""}
                      >
                        <Bookmark className={`w-4 h-4 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Compétences requises:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Avantages:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Posté {job.posted}</span>
                      <span>• {job.applications} candidatures</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Contacter
                      </Button>
                      <Button 
                        onClick={() => handleApplyJob(job.id)}
                        disabled={appliedJobs.includes(job.id)}
                        className={appliedJobs.includes(job.id) ? "bg-green-600" : ""}
                      >
                        {appliedJobs.includes(job.id) ? "Candidature envoyée" : "Postuler"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredJobs.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune offre trouvée</h3>
                  <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Alertes emploi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Développeur React</h4>
                    <p className="text-xs text-gray-600 mb-2">Paris, Lyon, Marseille</p>
                    <Button size="sm" className="w-full">
                      Créer une alerte
                    </Button>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Data Scientist</h4>
                    <p className="text-xs text-gray-600 mb-2">Toute la France</p>
                    <Button size="sm" className="w-full">
                      Créer une alerte
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Companies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Entreprises populaires</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from(new Set(jobs.map(job => job.company.name))).slice(0, 5).map((companyName, index) => {
                    const company = jobs.find(job => job.company.name === companyName)?.company;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={company?.logo} />
                          <AvatarFallback>{companyName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{companyName}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{company?.rating}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Voir
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Career Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Conseils carrière</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Optimisez votre CV</h4>
                    <p className="text-xs text-gray-600 mb-2">Conseils pour un CV qui se démarque</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Lire plus
                    </Button>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Préparer un entretien</h4>
                    <p className="text-xs text-gray-600 mb-2">Questions fréquentes et réponses</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Lire plus
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}