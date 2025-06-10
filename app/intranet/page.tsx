import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  Users, 
  MessageSquare, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Award, 
  Bell, 
  Search,
  Plus,
  Heart,
  Share2,
  MoreHorizontal,
  Settings,
  User,
  LogOut,
  Home,
  Briefcase,
  BookOpen,
  BarChart3
} from "lucide-react"
import Link from "next/link"

// Données simulées pour l'intranet
const companyNews = [
  {
    id: 1,
    title: "Nouveau contrat signé avec TechCorp",
    content: "Nous sommes fiers d'annoncer la signature d'un nouveau contrat majeur avec TechCorp pour le développement de leur plateforme IA.",
    author: "Samuel OBAM",
    authorAvatar: "/images/samuel.png",
    date: "Il y a 2 heures",
    likes: 24,
    comments: 8,
    type: "success"
  },
  {
    id: 2,
    title: "Formation IA pour l'équipe technique",
    content: "Une nouvelle session de formation sur l'IA sera organisée la semaine prochaine pour tous les développeurs.",
    author: "Marie NGUEMO",
    authorAvatar: "/images/marie.png",
    date: "Il y a 4 heures",
    likes: 18,
    comments: 12,
    type: "info"
  },
  {
    id: 3,
    title: "Mise à jour de NovaCore CRM",
    content: "NovaCore CRM a été mis à jour avec de nouvelles fonctionnalités d'IA. Découvrez les améliorations !",
    author: "Jean KAMGA",
    authorAvatar: "/images/jean.png",
    date: "Il y a 1 jour",
    likes: 32,
    comments: 15,
    type: "update"
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: "Réunion d'équipe mensuelle",
    date: "2024-01-15",
    time: "10:00",
    type: "meeting"
  },
  {
    id: 2,
    title: "Formation Marketing Digital",
    date: "2024-01-18",
    time: "14:00",
    type: "training"
  },
  {
    id: 3,
    title: "Présentation client",
    date: "2024-01-20",
    time: "16:00",
    type: "presentation"
  }
]

const teamMembers = [
  {
    id: 1,
    name: "Samuel OBAM",
    position: "Directeur Général",
    avatar: "/images/samuel.png",
    status: "online",
    department: "Direction"
  },
  {
    id: 2,
    name: "Marie NGUEMO",
    position: "Responsable RH",
    avatar: "/images/marie.png",
    status: "online",
    department: "Ressources Humaines"
  },
  {
    id: 3,
    name: "Jean KAMGA",
    position: "Développeur Senior",
    avatar: "/images/jean.png",
    status: "away",
    department: "Technique"
  },
  {
    id: 4,
    name: "Sophie MBALLA",
    position: "Commerciale",
    avatar: "/images/sophie.png",
    status: "offline",
    department: "Vente"
  },
  {
    id: 5,
    name: "Pierre FOTSO",
    position: "Designer UI/UX",
    avatar: "/images/pierre.png",
    status: "online",
    department: "Design"
  }
]

export default function IntranetPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de l'Intranet */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">DL Intranet</h1>
                  <p className="text-sm text-gray-600">Espace collaboratif</p>
                </div>
              </div>
              
              {/* Navigation principale */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/intranet" className="flex items-center space-x-2 text-blue-600 font-medium">
                  <Home className="h-4 w-4" />
                  <span>Accueil</span>
                </Link>
                <Link href="/intranet/rh" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Users className="h-4 w-4" />
                  <span>RH</span>
                </Link>
                <Link href="/intranet/admin" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>Administration</span>
                </Link>
                <Link href="/intranet/messagerie" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>Messagerie</span>
                </Link>
              </nav>
            </div>
            
            {/* Actions utilisateur */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/samuel.png" />
                  <AvatarFallback>SO</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Samuel OBAM</p>
                  <p className="text-xs text-gray-600">Directeur Général</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar gauche */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profil utilisateur */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarImage src="/images/samuel.png" />
                    <AvatarFallback>SO</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-900">Samuel OBAM</h3>
                  <p className="text-sm text-gray-600">Directeur Général</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">En ligne</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Navigation rapide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation Rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/intranet/rh" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Gestion RH</span>
                </Link>
                <Link href="/intranet/admin" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Administration</span>
                </Link>
                <Link href="/intranet/messagerie" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Messagerie</span>
                </Link>
                <Link href="/intranet/calendrier" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span className="text-gray-700">Calendrier</span>
                </Link>
                <Link href="/intranet/documents" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="h-5 w-5 text-red-600" />
                  <span className="text-gray-700">Documents</span>
                </Link>
                <Link href="/intranet/analytics" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Analytics</span>
                </Link>
              </CardContent>
            </Card>

            {/* Équipe en ligne */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Équipe en ligne</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === 'online' ? 'bg-green-500' :
                        member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                      <p className="text-xs text-gray-600 truncate">{member.position}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Actualités de l'entreprise */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Actualités de l'entreprise</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Publier
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {companyNews.map((news) => (
                  <div key={news.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={news.authorAvatar} />
                        <AvatarFallback>{news.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{news.author}</h4>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{news.date}</span>
                          <Badge variant={
                            news.type === 'success' ? 'default' :
                            news.type === 'info' ? 'secondary' : 'outline'
                          } className="ml-auto">
                            {news.type === 'success' ? 'Succès' :
                             news.type === 'info' ? 'Info' : 'Mise à jour'}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{news.title}</h3>
                        <p className="text-gray-600 mb-4">{news.content}</p>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                            <Heart className="h-4 w-4 mr-1" />
                            {news.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {news.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <Share2 className="h-4 w-4 mr-1" />
                            Partager
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Projets Actifs</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Formations</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Performance</p>
                      <p className="text-2xl font-bold text-gray-900">87%</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar droite */}
          <div className="lg:col-span-1 space-y-6">
            {/* Événements à venir */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Événements à venir</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      event.type === 'meeting' ? 'bg-blue-500' :
                      event.type === 'training' ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600">{event.date} à {event.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un événement
                </Button>
              </CardContent>
            </Card>

            {/* Annonces importantes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Annonces importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Maintenance système</h4>
                  <p className="text-sm text-yellow-800">
                    Maintenance prévue le 20 janvier de 22h à 2h du matin.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Nouvelle politique RH</h4>
                  <p className="text-sm text-blue-800">
                    Nouvelle politique de télétravail disponible dans l'espace RH.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Demande de congés
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Nouveau message
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Planifier réunion
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  Rapport de performance
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 