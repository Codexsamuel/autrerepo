import { SmartDocumentGenerator } from "@/components/documents/smart-document-generator"
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
  Shield,
  Database,
  BarChart3,
  Cog,
  Key,
  Globe,
  HardDrive,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
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
                <Link href="/intranet/rh" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Users className="h-4 w-4" />
                  <span>RH</span>
                </Link>
                <Link href="/intranet/admin" className="flex items-center space-x-2 text-blue-600 font-medium">
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
                  5
                </Badge>
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/samuel.png" />
                  <AvatarFallback>SO</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Samuel OBAM</p>
                  <p className="text-xs text-gray-600">Administrateur</p>
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
                  <p className="text-sm text-gray-600">Administrateur</p>
                  <Badge className="mt-2 bg-red-100 text-red-800">Admin</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Outils d'administration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Outils Admin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Sécurité
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Base de données
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Cog className="h-4 w-4 mr-2" />
                  Configuration
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Permissions
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  API
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <HardDrive className="h-4 w-4 mr-2" />
                  Stockage
                </Button>
              </CardContent>
            </Card>

            {/* Statut système */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statut Système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Serveur Principal</p>
                    <p className="text-xs text-gray-600">Opérationnel</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Base de données</p>
                    <p className="text-xs text-gray-600">Connectée</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Sauvegarde</p>
                    <p className="text-xs text-gray-600">En cours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Activity className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">IA DAVY</p>
                    <p className="text-xs text-gray-600">Actif</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3 space-y-8">
            {/* En-tête */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Administration</h1>
              <p className="text-gray-600">Gestion des documents, configuration système et outils d'administration</p>
            </div>

            {/* Statistiques système */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                      <p className="text-2xl font-bold text-gray-900">5</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Documents</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Stockage</p>
                      <p className="text-2xl font-bold text-gray-900">67%</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <HardDrive className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Uptime</p>
                      <p className="text-2xl font-bold text-gray-900">99.9%</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Activity className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Générateur de Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Générateur de Documents Intelligents</CardTitle>
                <p className="text-gray-600">Créez et gérez tous les documents administratifs avec l'aide de l'IA</p>
              </CardHeader>
              <CardContent>
                <SmartDocumentGenerator />
              </CardContent>
            </Card>

            {/* Alertes système */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Alertes Système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div className="flex-1">
                    <h4 className="font-medium text-yellow-900">Maintenance prévue</h4>
                    <p className="text-sm text-yellow-800">
                      Maintenance système prévue le 20 janvier de 22h à 2h du matin.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900">Mise à jour disponible</h4>
                    <p className="text-sm text-blue-800">
                      Nouvelle version de NovaCore CRM disponible. Mise à jour recommandée.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <h4 className="font-medium text-green-900">Sauvegarde réussie</h4>
                    <p className="text-sm text-green-800">
                      Sauvegarde automatique terminée avec succès.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Assistant DAVY */}
      <DavyVoiceAssistant />
    </div>
  )
} 