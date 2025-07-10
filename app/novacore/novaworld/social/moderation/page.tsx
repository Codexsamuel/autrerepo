'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { AlertCircle, AlertTriangle, Ban, CheckCircle, Clock, Eye, Filter, Flag, MessageCircle, MoreHorizontal, Shield, TrendingUp, Users, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Report {
  id: string;
  type: 'spam' | 'inappropriate' | 'harassment' | 'fake_news' | 'copyright';
  severity: 'low' | 'medium' | 'high' | 'critical';
  reporter: string;
  reportedUser: string;
  reportedUserAvatar: string;
  content: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  evidence: string[];
}

export default function ModerationPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockReports: Report[] = [
      {
        id: '1',
        type: 'spam',
        severity: 'medium',
        reporter: 'Sarah Martin',
        reportedUser: 'John Doe',
        reportedUserAvatar: '/images/avatars/john.jpg',
        content: 'Message spam répétitif avec liens commerciaux',
        timestamp: '2h ago',
        status: 'pending',
        evidence: ['Screenshot 1', 'Screenshot 2']
      },
      {
        id: '2',
        type: 'inappropriate',
        severity: 'high',
        reporter: 'Alex Chen',
        reportedUser: 'Marie Dubois',
        reportedUserAvatar: '/images/avatars/marie.jpg',
        content: 'Contenu inapproprié dans un groupe public',
        timestamp: '4h ago',
        status: 'reviewed',
        evidence: ['Screenshot 1']
      },
      {
        id: '3',
        type: 'harassment',
        severity: 'critical',
        reporter: 'Pierre Martin',
        reportedUser: 'Julie Dubois',
        reportedUserAvatar: '/images/avatars/julie.jpg',
        content: 'Harcèlement répété en messages privés',
        timestamp: '6h ago',
        status: 'resolved',
        evidence: ['Messages privés', 'Historique']
      }
    ];
    setReports(mockReports);
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedUser.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || report.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleAction = (reportId: string, action: 'warn' | 'ban' | 'dismiss') => {
    setReports(reports.map(r =>
      r.id === reportId ? { ...r, status: 'resolved' } : r
    ));
    toast({
      title: `Action ${action} effectuée`,
      description: `Le rapport a été traité avec succès.`,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spam': return <AlertTriangle className="w-4 h-4" />;
      case 'inappropriate': return <XCircle className="w-4 h-4" />;
      case 'harassment': return <Ban className="w-4 h-4" />;
      case 'fake_news': return <AlertCircle className="w-4 h-4" />;
      case 'copyright': return <Shield className="w-4 h-4" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  // Statistiques modération (mock)
  const stats = [
    { label: 'Rapports en attente', value: reports.filter(r => r.status === 'pending').length, icon: Clock },
    { label: 'Résolus aujourd\'hui', value: 12, icon: CheckCircle },
    { label: 'Utilisateurs bannis', value: 3, icon: Ban },
    { label: 'Temps moyen de traitement', value: '2.5h', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Modération</h1>
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {reports.filter(r => r.status === 'pending').length} en attente
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar gauche - Filtres rapides */}
          <div className="lg:col-span-1 space-y-8">
            {/* Filtres par type */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtres rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Spam (5)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <XCircle className="w-4 h-4 mr-2" />
                    Inapproprié (3)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Ban className="w-4 h-4 mr-2" />
                    Harcèlement (2)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Fake News (1)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir tous les rapports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Utilisateurs bannis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messages modérés
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <div className="flex items-center mb-6">
              <Input
                placeholder="Rechercher un rapport, utilisateur..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mr-4"
              />
              <select
                value={activeTab}
                onChange={e => setActiveTab(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="reviewed">En cours</option>
                <option value="resolved">Résolus</option>
                <option value="dismissed">Rejetés</option>
              </select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="reviewed">En cours</TabsTrigger>
                <TabsTrigger value="resolved">Résolus</TabsTrigger>
                <TabsTrigger value="all">Tous</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-6">
                {filteredReports.filter(r => r.status === 'pending').map(report => (
                  <Card key={report.id} className="border-l-4 border-red-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={report.reportedUserAvatar} />
                            <AvatarFallback>{report.reportedUser[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{report.reportedUser}</h3>
                            <p className="text-sm text-gray-500">Signalé par {report.reporter}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(report.severity)}>
                            {getTypeIcon(report.type)}
                            <span className="ml-1">{report.type}</span>
                          </Badge>
                          <Badge variant="outline">{report.severity}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{report.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{report.timestamp}</span>
                        <span>{report.evidence.length} preuves</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleAction(report.id, 'warn')}>
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Avertir
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction(report.id, 'ban')}>
                          <Ban className="w-4 h-4 mr-2" />
                          Bannir
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction(report.id, 'dismiss')}>
                          <XCircle className="w-4 h-4 mr-2" />
                          Rejeter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviewed" className="space-y-6">
                {filteredReports.filter(r => r.status === 'reviewed').map(report => (
                  <Card key={report.id} className="border-l-4 border-yellow-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={report.reportedUserAvatar} />
                            <AvatarFallback>{report.reportedUser[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{report.reportedUser}</h3>
                            <p className="text-sm text-gray-500">Signalé par {report.reporter}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(report.severity)}>
                            {getTypeIcon(report.type)}
                            <span className="ml-1">{report.type}</span>
                          </Badge>
                          <Badge variant="outline">En cours</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{report.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{report.timestamp}</span>
                        <span>{report.evidence.length} preuves</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleAction(report.id, 'warn')}>
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Avertir
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction(report.id, 'ban')}>
                          <Ban className="w-4 h-4 mr-2" />
                          Bannir
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction(report.id, 'dismiss')}>
                          <XCircle className="w-4 h-4 mr-2" />
                          Rejeter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="resolved" className="space-y-6">
                {filteredReports.filter(r => r.status === 'resolved').map(report => (
                  <Card key={report.id} className="border-l-4 border-green-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={report.reportedUserAvatar} />
                            <AvatarFallback>{report.reportedUser[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{report.reportedUser}</h3>
                            <p className="text-sm text-gray-500">Signalé par {report.reporter}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(report.severity)}>
                            {getTypeIcon(report.type)}
                            <span className="ml-1">{report.type}</span>
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">Résolu</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{report.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{report.timestamp}</span>
                        <span>{report.evidence.length} preuves</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="all" className="space-y-6">
                {filteredReports.map(report => (
                  <Card key={report.id} className={`border-l-4 ${
                    report.status === 'pending' ? 'border-red-500' :
                    report.status === 'reviewed' ? 'border-yellow-500' :
                    report.status === 'resolved' ? 'border-green-500' : 'border-gray-500'
                  }`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={report.reportedUserAvatar} />
                            <AvatarFallback>{report.reportedUser[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{report.reportedUser}</h3>
                            <p className="text-sm text-gray-500">Signalé par {report.reporter}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(report.severity)}>
                            {getTypeIcon(report.type)}
                            <span className="ml-1">{report.type}</span>
                          </Badge>
                          <Badge variant="outline">{report.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{report.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{report.timestamp}</span>
                        <span>{report.evidence.length} preuves</span>
                      </div>
                      {report.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleAction(report.id, 'warn')}>
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Avertir
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAction(report.id, 'ban')}>
                            <Ban className="w-4 h-4 mr-2" />
                            Bannir
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAction(report.id, 'dismiss')}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Rejeter
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}