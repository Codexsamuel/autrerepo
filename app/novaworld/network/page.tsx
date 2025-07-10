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
    Building2,
    Globe,
    Mail,
    MapPin,
    MessageCircle,
    Network,
    Search,
    Star,
    TrendingUp,
    UserCheck,
    UserPlus,
    Users,
    UserX
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NetworkPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedConnectionType, setSelectedConnectionType] = useState("");

  const [connections, setConnections] = useState([
    {
      id: 1,
      name: "Marie Dubois",
      avatar: "/avatars/marie.jpg",
      title: "Directrice Marketing Digital",
      company: "TechCorp Solutions",
      location: "Paris, France",
      industry: "Technologie",
      connectionType: "1er degré",
      mutualConnections: 12,
      lastContact: "2 jours",
      skills: ["Marketing Digital", "Growth Hacking", "Analytics"],
      interests: ["IA", "Innovation", "Startups"],
      verified: true,
      status: "connected"
    },
    {
      id: 2,
      name: "Pierre Martin",
      avatar: "/avatars/pierre.jpg",
      title: "CTO & Co-fondateur",
      company: "InnovateLab",
      location: "Lyon, France",
      industry: "R&D",
      connectionType: "2ème degré",
      mutualConnections: 8,
      lastContact: "1 semaine",
      skills: ["React", "Node.js", "Architecture"],
      interests: ["Tech", "Innovation", "Open Source"],
      verified: true,
      status: "pending"
    },
    {
      id: 3,
      name: "Sophie Bernard",
      avatar: "/avatars/sophie.jpg",
      title: "Community Manager",
      company: "DigitalFlow Marketing",
      location: "Marseille, France",
      industry: "Marketing",
      connectionType: "1er degré",
      mutualConnections: 15,
      lastContact: "3 jours",
      skills: ["Social Media", "Content Creation", "Branding"],
      interests: ["Marketing", "Creativity", "Social Impact"],
      verified: false,
      status: "connected"
    },
    {
      id: 4,
      name: "Alexandre Chen",
      avatar: "/avatars/alexandre.jpg",
      title: "Data Scientist",
      company: "GreenTech Solutions",
      location: "Nantes, France",
      industry: "Environnement",
      connectionType: "3ème degré",
      mutualConnections: 3,
      lastContact: "Jamais",
      skills: ["Python", "Machine Learning", "Big Data"],
      interests: ["GreenTech", "Sustainability", "AI"],
      verified: true,
      status: "not_connected"
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      avatar: "/avatars/emma.jpg",
      title: "UX/UI Designer",
      company: "FinTech Pro",
      location: "Toulouse, France",
      industry: "Finance",
      connectionType: "2ème degré",
      mutualConnections: 6,
      lastContact: "2 semaines",
      skills: ["Figma", "User Research", "Prototyping"],
      interests: ["Design", "FinTech", "User Experience"],
      verified: false,
      status: "connected"
    },
    {
      id: 6,
      name: "Thomas Moreau",
      avatar: "/avatars/thomas.jpg",
      title: "Product Manager",
      company: "HealthTech Innovations",
      location: "Strasbourg, France",
      industry: "Santé",
      connectionType: "1er degré",
      mutualConnections: 9,
      lastContact: "1 jour",
      skills: ["Product Strategy", "Agile", "Healthcare"],
      interests: ["HealthTech", "Innovation", "Product Management"],
      verified: true,
      status: "connected"
    }
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 7,
      name: "Julie Leroy",
      avatar: "/avatars/julie.jpg",
      title: "Business Analyst",
      company: "TechCorp Solutions",
      location: "Paris, France",
      industry: "Technologie",
      mutualConnections: 5,
      message: "Bonjour ! J'aimerais échanger sur vos expériences en marketing digital."
    },
    {
      id: 8,
      name: "David Kim",
      avatar: "/avatars/david.jpg",
      title: "Full Stack Developer",
      company: "InnovateLab",
      location: "Lyon, France",
      industry: "R&D",
      mutualConnections: 2,
      message: "Salut ! Intéressé par vos projets React. On peut discuter ?"
    }
  ]);

  const [networkStats, setNetworkStats] = useState({
    totalConnections: 156,
    firstDegree: 89,
    secondDegree: 234,
    thirdDegree: 567,
    pendingRequests: 8,
    mutualConnections: 45,
    industryDiversity: 12,
    locationDiversity: 8
  });

  const industries = ["Tous", "Technologie", "R&D", "Marketing", "Environnement", "Finance", "Santé"];
  const locations = ["Tous", "Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Strasbourg"];
  const connectionTypes = ["Tous", "1er degré", "2ème degré", "3ème degré"];

  const router = useRouter();

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || selectedIndustry === "Tous" || connection.industry === selectedIndustry;
    const matchesLocation = selectedLocation === "" || selectedLocation === "Tous" || connection.location.includes(selectedLocation);
    const matchesConnectionType = selectedConnectionType === "" || selectedConnectionType === "Tous" || connection.connectionType === selectedConnectionType;
    
    return matchesSearch && matchesIndustry && matchesLocation && matchesConnectionType;
  });

  const handleConnect = (connectionId: number) => {
    setConnections(connections.map(conn => {
      if (conn.id === connectionId) {
        return { ...conn, status: "pending" };
      }
      return conn;
    }));
  };

  const handleAcceptRequest = (requestId: number) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
    setNetworkStats(prev => ({ ...prev, totalConnections: prev.totalConnections + 1 }));
  };

  const handleRejectRequest = (requestId: number) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mon Réseau</h1>
                <p className="text-sm text-gray-600">Gérez vos connexions professionnelles</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Invitations ({pendingRequests.length})
              </Button>
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Étendre le réseau
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Network Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{networkStats.totalConnections}</p>
                  <p className="text-xs text-gray-600">Connexions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{networkStats.firstDegree}</p>
                  <p className="text-xs text-gray-600">1er degré</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Network className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{networkStats.secondDegree}</p>
                  <p className="text-xs text-gray-600">2ème degré</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{networkStats.thirdDegree}</p>
                  <p className="text-xs text-gray-600">3ème degré</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{networkStats.pendingRequests}</p>
                  <p className="text-xs text-gray-600">En attente</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-2xl font-bold">{networkStats.mutualConnections}</p>
                  <p className="text-xs text-gray-600">Communes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-2xl font-bold">{networkStats.industryDiversity}</p>
                  <p className="text-xs text-gray-600">Industries</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="text-2xl font-bold">{networkStats.locationDiversity}</p>
                  <p className="text-xs text-gray-600">Villes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des connexions..."
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
              <Select value={selectedConnectionType} onValueChange={setSelectedConnectionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de connexion" />
                </SelectTrigger>
                <SelectContent>
                  {connectionTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="w-5 h-5" />
                    <span>Demandes de connexion ({pendingRequests.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                        <Avatar>
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{request.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {request.mutualConnections} connexions communes
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{request.title} chez {request.company}</p>
                          <p className="text-sm text-gray-500">{request.location}</p>
                          <p className="text-sm text-gray-700 mt-2">{request.message}</p>
                          <div className="flex space-x-2 mt-3">
                            <Button size="sm" onClick={() => handleAcceptRequest(request.id)}>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Accepter
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleRejectRequest(request.id)}>
                              <UserX className="w-4 h-4 mr-2" />
                              Refuser
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Connections List */}
            <Card>
              <CardHeader>
                <CardTitle>Mes Connexions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredConnections.map((connection) => (
                    <div key={connection.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <Avatar>
                        <AvatarImage src={connection.avatar} />
                        <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{connection.name}</h4>
                          {connection.verified && (
                            <Badge variant="outline" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Vérifié
                            </Badge>
                          )}
                          <Badge className={
                            connection.connectionType === "1er degré" ? "bg-green-100 text-green-800" :
                            connection.connectionType === "2ème degré" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }>
                            {connection.connectionType}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{connection.title} chez {connection.company}</p>
                        <p className="text-sm text-gray-500">{connection.location}</p>
                        <p className="text-xs text-gray-500">Dernier contact: {connection.lastContact}</p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-xs font-medium text-gray-700">Compétences:</h5>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {connection.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-gray-700">Intérêts:</h5>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {connection.interests.map((interest, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                          {connection.status === "not_connected" && (
                            <Button size="sm" onClick={() => handleConnect(connection.id)}>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Se connecter
                            </Button>
                          )}
                          {connection.status === "pending" && (
                            <Button size="sm" variant="outline" disabled>
                              <UserPlus className="w-4 h-4 mr-2" />
                              En attente
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Network Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Insights réseau</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Croissance du réseau</h4>
                    <p className="text-xs text-gray-600 mb-2">+12% ce mois</p>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Engagement</h4>
                    <p className="text-xs text-gray-600 mb-2">85% de connexions actives</p>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Industries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Industries populaires</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Technologie", "Marketing", "Finance", "Santé", "R&D"].map((industry, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{industry}</span>
                      <Badge variant="outline" className="text-xs">
                        {Math.floor(Math.random() * 50) + 10}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Networking Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Conseils networking</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Engagez-vous régulièrement</h4>
                    <p className="text-xs text-gray-600 mb-2">Contactez vos connexions au moins une fois par mois</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Voir plus
                    </Button>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Partagez du contenu</h4>
                    <p className="text-xs text-gray-600 mb-2">Publiez des articles et insights pertinents</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Voir plus
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