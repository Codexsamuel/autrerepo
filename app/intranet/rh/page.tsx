import { HRDashboard } from "@/components/hr/hr-dashboard"
import { DavyVoiceAssistant } from "@/components/ai-assistant/davy-voice-assistant"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Building2, 
  Users, 
  MessageSquare, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Award, 
  Bell, 
  Plus,
  Home,
  Settings,
  UserPlus,
  FileText as FileTextIcon,
  Calendar as CalendarIcon,
  DollarSign,
  Target,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"

export default function RHPage() {
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
                <Link href="/intranet" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Home className="h-4 w-4" />
                  <span>Accueil</span>
                </Link>
                <Link href="/intranet/rh" className="flex items-center space-x-2 text-blue-600 font-medium">
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
                  <AvatarImage src="/images/marie.png" />
                  <AvatarFallback>MN</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Marie NGUEMO</p>
                  <p className="text-xs text-gray-600">Responsable RH</p>
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
                    <AvatarImage src="/images/marie.png" />
                    <AvatarFallback>MN</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-900">Marie NGUEMO</h3>
                  <p className="text-sm text-gray-600">Responsable RH</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">En ligne</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions RH rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions RH</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Nouvel employé
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileTextIcon className="h-4 w-4 mr-2" />
                  Contrats
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Congés
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Salaires
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Évaluations
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  Formations
                </Button>
              </CardContent>
            </Card>

            {/* Tâches en cours */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tâches en cours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Contrat à renouveler</p>
                    <p className="text-xs text-gray-600">Marie NGUEMO - 2 jours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Évaluation trimestrielle</p>
                    <p className="text-xs text-gray-600">Jean KAMGA - En cours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Demande de congés</p>
                    <p className="text-xs text-gray-600">Sophie MBALLA - Urgent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal - Dashboard RH */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Ressources Humaines</h1>
              <p className="text-gray-600">Dashboard intelligent avec IA pour optimiser la gestion RH</p>
            </div>
            
            <HRDashboard />
          </div>
        </div>
      </div>

      {/* Assistant DAVY */}
      <DavyVoiceAssistant />
    </div>
  )
} 