"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { DatabaseService } from '@/lib/database';
import {
    AlertCircle,
    Bell,
    Building,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    Download,
    Edit,
    Eye,
    FileCheck,
    FileText,
    GraduationCap,
    List,
    MessageSquare,
    Send,
    Shield,
    Trash2,
    UserCog,
    Users,
    Users2,
    XCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
  const [usersDb, setUsersDb] = useState<any[]>([]);
  const [logsDb, setLogsDb] = useState<any[]>([]);
  const [roleLogs, setRoleLogs] = useState<any[]>([]);
  const [loadingSecurity, setLoadingSecurity] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [pendingAction, setPendingAction] = useState<null | { type: '2fa' | 'status'; user: any }> (null);
  const [actionLoading, setActionLoading] = useState(false);
  const [logPage, setLogPage] = useState(1);
  const [roleLogPage, setRoleLogPage] = useState(1);
  const LOGS_PER_PAGE = 20;
  const [logSearch, setLogSearch] = useState('');
  const [roleLogSearch, setRoleLogSearch] = useState('');

  useEffect(() => {
    async function fetchSecurityData() {
      setLoadingSecurity(true);
      try {
        const users = await DatabaseService.getUsers();
        const logs = await DatabaseService.getLoginLogs();
        const roleLogs = await DatabaseService.getRoleChangeLogs();
        setUsersDb(users || []);
        setLogsDb(logs || []);
        setRoleLogs(roleLogs || []);
      } catch (e) {
        setUsersDb([]);
        setLogsDb([]);
        setRoleLogs([]);
      }
      setLoadingSecurity(false);
    }
    if (activeTab === 'security') fetchSecurityData();
  }, [activeTab]);

  useEffect(() => {
    // Récupérer l'utilisateur courant (depuis localStorage ou contexte auth)
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch {}
    }
  }, []);

  // Fonction pour changer le rôle d'un utilisateur
  async function handleRoleChange(user: any, newRole: string) {
    const allowedRoles = ['super_admin', 'admin', 'user', 'employee', 'client'];
    if (!allowedRoles.includes(newRole)) return;
    if (!currentUser || currentUser.role !== 'super_admin') {
      toast({ title: 'Accès refusé', description: 'Seul le superadmin peut changer les rôles.', variant: 'destructive' });
      return;
    }
    if (user.role === newRole) return;
    try {
      await secureUpdateUser(user.id, { role: newRole });
      await DatabaseService.logRoleChange(user.id, user.role, newRole, currentUser.id);
      toast({ title: 'Rôle modifié', description: `${user.full_name || user.name} est maintenant ${newRole}` });
      // Rafraîchir les données
      const users = await DatabaseService.getUsers();
      const roleLogs = await DatabaseService.getRoleChangeLogs();
      setUsersDb(users || []);
      setRoleLogs(roleLogs || []);
    } catch (e) {
      toast({ title: 'Erreur', description: 'Impossible de changer le rôle.', variant: 'destructive' });
    }
  }

  // Fonction pour activer/désactiver le 2FA
  async function handleToggle2FA(user: any) {
    if (!currentUser || currentUser.role !== 'super_admin') {
      toast({ title: 'Accès refusé', description: 'Seul le superadmin peut modifier le 2FA.', variant: 'destructive' });
      return;
    }
    try {
      await secureUpdateUser(user.id, { two_factor_enabled: !user.two_factor_enabled });
      toast({ title: '2FA modifié', description: `${user.full_name || user.name} : 2FA ${!user.two_factor_enabled ? 'activé' : 'désactivé'}` });
      const users = await DatabaseService.getUsers();
      setUsersDb(users || []);
    } catch (e) {
      toast({ title: 'Erreur', description: 'Impossible de modifier le 2FA.', variant: 'destructive' });
    }
  }

  // Fonction pour suspendre/réactiver un utilisateur
  async function handleToggleStatus(user: any) {
    if (!currentUser || currentUser.role !== 'super_admin') {
      toast({ title: 'Accès refusé', description: 'Seul le superadmin peut modifier le statut.', variant: 'destructive' });
      return;
    }
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    try {
      await secureUpdateUser(user.id, { status: newStatus });
      toast({ title: 'Statut modifié', description: `${user.full_name || user.name} est maintenant ${newStatus}` });
      const users = await DatabaseService.getUsers();
      setUsersDb(users || []);
    } catch (e) {
      toast({ title: 'Erreur', description: 'Impossible de modifier le statut.', variant: 'destructive' });
    }
  }

  // Fonction utilitaire pour update via API sécurisée
  async function secureUpdateUser(userId: number, updates: any) {
    const token = localStorage.getItem('auth_token');
    const res = await fetch('/api/admin/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ userId, updates })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erreur API');
    }
    return (await res.json()).user;
  }

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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="messaging">Messagerie</TabsTrigger>
            <TabsTrigger value="news">Actualités</TabsTrigger>
            <TabsTrigger value="hr">Ressources Humaines</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="security">Sécurité & Rôles</TabsTrigger>
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

          {/* Sécurité & Rôles */}
          <TabsContent value="security" className="space-y-6">
            {/* Gestion dynamique des utilisateurs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Gestion des utilisateurs & rôles</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Tableau dynamique des utilisateurs */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avatar</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">2FA</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Dernier login</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loadingSecurity ? (
                        <tr><td colSpan={8} className="text-center py-4">Chargement...</td></tr>
                      ) : (
                        usersDb.map((user: any) => (
                          <tr key={user.id}>
                            <td className="px-4 py-2"><img src={user.avatar_url || user.avatar || '/images/default-avatar.png'} alt={user.full_name || user.name} className="w-8 h-8 rounded-full" /></td>
                            <td className="px-4 py-2 font-medium">{user.full_name || user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">
                              {currentUser && currentUser.role === 'super_admin' ? (
                                <select
                                  className="border rounded px-2 py-1 bg-white text-sm"
                                  value={String(user.role)}
                                  onChange={e => handleRoleChange(user, e.target.value)}
                                >
                                  <option value="user">user</option>
                                  <option value="admin">admin</option>
                                  <option value="super_admin">super_admin</option>
                                </select>
                              ) : (
                                <Badge variant={user.role === 'super_admin' ? 'destructive' : 'default'}>{user.role}</Badge>
                              )}
                            </td>
                            <td className="px-4 py-2">
                              {currentUser && currentUser.role === 'super_admin' ? (
                                <AlertDialog open={pendingAction?.type === 'status' && pendingAction.user.id === user.id} onOpenChange={(open) => !open && setPendingAction(null)}>
                                  <AlertDialogTrigger asChild>
                                    <button
                                      className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                      onClick={e => { e.preventDefault(); setPendingAction({ type: 'status', user }); }}
                                    >
                                      {user.status === 'active' ? 'Suspendre' : 'Réactiver'}
                                    </button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Confirmer l'action</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        {user.status === 'active'
                                          ? `Voulez-vous vraiment suspendre ${user.full_name || user.name || user.email} ?`
                                          : `Voulez-vous vraiment réactiver ${user.full_name || user.name || user.email} ?`}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={async () => {
                                          setActionLoading(true);
                                          await handleToggleStatus(user);
                                          setActionLoading(false);
                                          setPendingAction(null);
                                        }}
                                        disabled={actionLoading}
                                      >
                                        Confirmer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              ) : (
                                user.status
                              )}
                            </td>
                            <td className="px-4 py-2">
                              {currentUser && currentUser.role === 'super_admin' ? (
                                <AlertDialog open={pendingAction?.type === '2fa' && pendingAction.user.id === user.id} onOpenChange={(open) => !open && setPendingAction(null)}>
                                  <AlertDialogTrigger asChild>
                                    <button
                                      className={`px-2 py-1 rounded text-xs font-bold ${user.two_factor_enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                                      onClick={e => { e.preventDefault(); setPendingAction({ type: '2fa', user }); }}
                                    >
                                      {user.two_factor_enabled ? 'Désactiver' : 'Activer'}
                                    </button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Confirmer l'action</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        {user.two_factor_enabled
                                          ? `Voulez-vous vraiment désactiver la double authentification pour ${user.full_name || user.name || user.email} ?`
                                          : `Voulez-vous vraiment activer la double authentification pour ${user.full_name || user.name || user.email} ?`}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={async () => {
                                          setActionLoading(true);
                                          await handleToggle2FA(user);
                                          setActionLoading(false);
                                          setPendingAction(null);
                                        }}
                                        disabled={actionLoading}
                                      >
                                        Confirmer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              ) : (
                                <Badge variant={user.two_factor_enabled ? 'success' : 'outline'}>{user.two_factor_enabled ? 'Activé' : 'Désactivé'}</Badge>
                              )}
                            </td>
                            <td className="px-4 py-2">{user.last_login ? new Date(user.last_login).toLocaleString() : '-'}</td>
                            <td className="px-4 py-2 space-x-2">
                              {/* TODO: Actions dynamiques (changer rôle, activer/désactiver 2FA, suspendre) */}
                              <Button size="sm" variant="outline"><UserCog className="h-4 w-4" /></Button>
                              <Button size="sm" variant="outline"><Shield className="h-4 w-4" /></Button>
                              <Button size="sm" variant="outline"><Trash2 className="h-4 w-4" /></Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Logs d'accès */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <List className="h-5 w-5" />
                  <span>Logs d'accès</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
                    className="border rounded px-2 py-1 text-sm"
                    value={logSearch}
                    onChange={e => setLogSearch(e.target.value)}
                  />
                  <div className="space-x-2">
                    <button
                      className="px-2 py-1 border rounded text-xs"
                      onClick={() => setLogPage(p => Math.max(1, p - 1))}
                      disabled={logPage === 1}
                    >Page précédente</button>
                    <span className="text-xs">Page {logPage}</span>
                    <button
                      className="px-2 py-1 border rounded text-xs"
                      onClick={() => setLogPage(p => p + 1)}
                      disabled={logPage * LOGS_PER_PAGE >= logsDb.length}
                    >Page suivante</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Succès</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loadingSecurity ? (
                        <tr><td colSpan={4} className="text-center py-4">Chargement...</td></tr>
                      ) : (
                        logsDb
                          .filter(log => {
                            const u = usersDb.find(u => u.id === log.user_id);
                            const name = u ? (u.full_name || u.name || u.email) : '';
                            return name.toLowerCase().includes(logSearch.toLowerCase());
                          })
                          .slice((logPage - 1) * LOGS_PER_PAGE, logPage * LOGS_PER_PAGE)
                          .map((log) => (
                            <tr key={log.id}>
                              <td className="px-4 py-2">{(() => {
                                const u = usersDb.find(u => u.id === log.user_id);
                                return u ? (u.full_name || u.name || u.email) : log.user_id;
                              })()}</td>
                              <td className="px-4 py-2">{log.ip_address}</td>
                              <td className="px-4 py-2">{log.timestamp ? new Date(log.timestamp).toLocaleString() : '-'}</td>
                              <td className="px-4 py-2"><Badge variant={log.success ? 'success' : 'destructive'}>{log.success ? 'Oui' : 'Non'}</Badge></td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Historique des changements de rôle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Historique des changements de rôle</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
                    className="border rounded px-2 py-1 text-sm"
                    value={roleLogSearch}
                    onChange={e => setRoleLogSearch(e.target.value)}
                  />
                  <div className="space-x-2">
                    <button
                      className="px-2 py-1 border rounded text-xs"
                      onClick={() => setRoleLogPage(p => Math.max(1, p - 1))}
                      disabled={roleLogPage === 1}
                    >Page précédente</button>
                    <span className="text-xs">Page {roleLogPage}</span>
                    <button
                      className="px-2 py-1 border rounded text-xs"
                      onClick={() => setRoleLogPage(p => p + 1)}
                      disabled={roleLogPage * LOGS_PER_PAGE >= roleLogs.length}
                    >Page suivante</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ancien rôle</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nouveau rôle</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Par</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loadingSecurity ? (
                        <tr><td colSpan={5} className="text-center py-4">Chargement...</td></tr>
                      ) : (
                        roleLogs
                          .filter(log => {
                            const u = usersDb.find(u => u.id === log.user_id);
                            const name = u ? (u.full_name || u.name || u.email) : '';
                            return name.toLowerCase().includes(roleLogSearch.toLowerCase());
                          })
                          .slice((roleLogPage - 1) * LOGS_PER_PAGE, roleLogPage * LOGS_PER_PAGE)
                          .map((log: any) => (
                            <tr key={log.id}>
                              <td className="px-4 py-2">{(() => {
                                const u = usersDb.find(u => u.id === log.user_id);
                                return u ? (u.full_name || u.name || u.email) : log.user_id;
                              })()}</td>
                              <td className="px-4 py-2">{log.old_role}</td>
                              <td className="px-4 py-2">{log.new_role}</td>
                              <td className="px-4 py-2">{log.changed_at ? new Date(log.changed_at).toLocaleString() : '-'}</td>
                              <td className="px-4 py-2">{(() => {
                                const u = usersDb.find(u => u.id === log.changed_by);
                                return u ? (u.full_name || u.name || u.email) : log.changed_by;
                              })()}</td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}