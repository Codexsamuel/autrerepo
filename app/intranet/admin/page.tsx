"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, UserPlus, UserCog, Shield, List, Eye, Edit, Trash2, Search, 
  MessageSquare, Bell, FileText, Calendar, Mail, Send, Download, 
  Plus, MoreHorizontal, Clock, AlertCircle, CheckCircle, XCircle,
  Building, Users2, Briefcase, GraduationCap, DollarSign, FileCheck
} from 'lucide-react';

// Données des utilisateurs
const users = [
  { id: 1, name: "Samuel OBAM DAY", role: "Super Admin", email: "samuel@dlsolutions.com", status: "actif", avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png", department: "Direction" },
  { id: 2, name: "NGA SABINE LUCIE", role: "Admin RH", email: "lucie@dlsolutions.com", status: "actif", avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1748393838/Lucie_lexs2m.jpg", department: "Ressources Humaines" },
  { id: 3, name: "Pierre ESSOMBA", role: "Admin Technique", email: "pierre@dlsolutions.com", status: "actif", avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg", department: "Technique" },
  { id: 4, name: "Marie NGUEMO", role: "Admin Créatif", email: "marie@dlsolutions.com", status: "actif", avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg", department: "Créatif" },
  { id: 5, name: "Jean DUPONT", role: "Admin Projet", email: "jean@dlsolutions.com", status: "actif", avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993228/Jean_Dupont_xjsear.jpg", department: "Projets" }
];

// Messages internes
const messages = [
  { id: 1, sender: "Samuel OBAM DAY", content: "Réunion d'équipe demain à 10h pour discuter des nouveaux projets.", time: "10:30", avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png", unread: true },
  { id: 2, sender: "NGA SABINE LUCIE", content: "Nouveaux contrats signés cette semaine. Félicitations à toute l'équipe !", time: "09:15", avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1748393838/Lucie_lexs2m.jpg", unread: false },
  { id: 3, sender: "Pierre ESSOMBA", content: "Maintenance prévue ce soir de 22h à 00h. Merci de sauvegarder vos travaux.", time: "08:45", avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg", unread: true }
];

// News et informations
const news = [
  { id: 1, title: "Nouvelle acquisition client majeure", content: "DL Solutions signe un contrat avec une entreprise internationale.", date: "2024-06-25", priority: "high" },
  { id: 2, title: "Mise à jour de la plateforme", content: "Nouvelle version de NovaCore disponible avec des fonctionnalités améliorées.", date: "2024-06-24", priority: "medium" },
  { id: 3, title: "Formation équipe", content: "Session de formation sur les nouvelles technologies prévue la semaine prochaine.", date: "2024-06-23", priority: "low" }
];

// Documents administratifs
const documents = [
  { id: 1, name: "Lettre de mise à pied", type: "RH", format: "PDF", size: "45 KB", lastModified: "2024-06-25" },
  { id: 2, name: "Contrat de travail", type: "RH", format: "DOCX", size: "128 KB", lastModified: "2024-06-24" },
  { id: 3, name: "Fiche de paie modèle", type: "Comptabilité", format: "XLSX", size: "89 KB", lastModified: "2024-06-23" },
  { id: 4, name: "Règlement intérieur", type: "RH", format: "PDF", size: "256 KB", lastModified: "2024-06-22" },
  { id: 5, name: "Bon de commande", type: "Achats", format: "PDF", size: "67 KB", lastModified: "2024-06-21" },
  { id: 6, name: "Fiche de caisse", type: "Comptabilité", format: "XLSX", size: "34 KB", lastModified: "2024-06-20" }
];

// Notifications
const notifications = [
  { id: 1, type: "success", message: "Nouveau client ajouté avec succès", time: "2 min" },
  { id: 2, type: "warning", message: "Maintenance prévue ce soir", time: "15 min" },
  { id: 3, type: "info", message: "Réunion d'équipe dans 30 min", time: "1h" },
  { id: 4, type: "error", message: "Erreur de connexion détectée", time: "2h" }
];

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec logo DL */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">DL</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DL Solutions
                </h1>
                <p className="text-sm text-gray-600">Intranet Administratif</p>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <img src="https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png" alt="Admin" className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium">Samuel OBAM DAY</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="messaging">Messagerie</TabsTrigger>
            <TabsTrigger value="news">Actualités</TabsTrigger>
            <TabsTrigger value="hr">Ressources Humaines</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Tableau de bord */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">+2 ce mois</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{messages.length}</div>
                  <p className="text-xs text-muted-foreground">+5 aujourd'hui</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documents</CardTitle>
                  <FileText className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{documents.length}</div>
                  <p className="text-xs text-muted-foreground">+3 cette semaine</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                  <Bell className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{notifications.length}</div>
                  <p className="text-xs text-muted-foreground">+1 aujourd'hui</p>
                </CardContent>
              </Card>
            </div>

            {/* Notifications récentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications récentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500">Il y a {notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Utilisateurs récents */}
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.slice(0, 6).map((user) => (
                    <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messagerie interne */}
          <TabsContent value="messaging" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messagerie interne</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Nouveau message */}
                  <div className="flex space-x-2">
                    <Textarea 
                      placeholder="Écrivez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={() => setNewMessage('')}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Messages */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex space-x-3 p-3 rounded-lg ${message.unread ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
                        <img src={message.avatar} alt={message.sender} className="w-8 h-8 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-sm">{message.sender}</p>
                            <span className="text-xs text-gray-500">{message.time}</span>
                            {message.unread && <Badge variant="secondary" className="text-xs">Nouveau</Badge>}
                          </div>
                          <p className="text-sm mt-1">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actualités */}
          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Actualités et informations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{item.title}</h3>
                        <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}>
                          {item.priority === 'high' ? 'Important' : item.priority === 'medium' ? 'Moyen' : 'Faible'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{item.content}</p>
                      <p className="text-xs text-gray-500 mt-2">{item.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ressources Humaines */}
          <TabsContent value="hr" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users2 className="h-5 w-5" />
                  <span>Gestion RH</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button className="h-24 flex flex-col space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>Lettre de mise à pied</span>
                  </Button>
                  <Button className="h-24 flex flex-col space-y-2">
                    <FileCheck className="h-6 w-6" />
                    <span>Contrat de travail</span>
                  </Button>
                  <Button className="h-24 flex flex-col space-y-2">
                    <DollarSign className="h-6 w-6" />
                    <span>Fiche de paie</span>
                  </Button>
                  <Button className="h-24 flex flex-col space-y-2">
                    <GraduationCap className="h-6 w-6" />
                    <span>Évaluation</span>
                  </Button>
                  <Button className="h-24 flex flex-col space-y-2">
                    <Calendar className="h-6 w-6" />
                    <span>Congés</span>
                  </Button>
                  <Button className="h-24 flex flex-col space-y-2">
                    <Building className="h-6 w-6" />
                    <span>Organigramme</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents administratifs */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Documents administratifs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type} • {doc.format} • {doc.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}