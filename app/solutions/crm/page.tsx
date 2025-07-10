'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Activity, Building, Calendar, DollarSign, Edit, Eye, Filter, Mail, Phone, Plus, Target, TrendingUp, UserCheck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  value: number;
  lastContact: string;
  nextFollowUp: string;
  source: string;
  assignedTo: string;
  tags: string[];
  notes: string;
}

interface Opportunity {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedClose: string;
  assignedTo: string;
  lastActivity: string;
  description: string;
}

export default function CRMPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('customers');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'Jean Dupont',
        company: 'TechCorp Solutions',
        email: 'jean.dupont@techcorp.com',
        phone: '+33 6 12 34 56 78',
        status: 'customer',
        value: 45000,
        lastContact: '2024-01-15',
        nextFollowUp: '2024-02-20',
        source: 'Website',
        assignedTo: 'Marie Martin',
        tags: ['Tech', 'Enterprise'],
        notes: 'Client satisfait, intéressé par l\'upgrade'
      },
      {
        id: '2',
        name: 'Sophie Bernard',
        company: 'Innovation Labs',
        email: 'sophie.bernard@innovationlabs.com',
        phone: '+33 6 98 76 54 32',
        status: 'prospect',
        value: 25000,
        lastContact: '2024-01-20',
        nextFollowUp: '2024-01-25',
        source: 'LinkedIn',
        assignedTo: 'Pierre Dubois',
        tags: ['Startup', 'Innovation'],
        notes: 'Démo prévue la semaine prochaine'
      },
      {
        id: '3',
        name: 'Marc Leroy',
        company: 'Global Industries',
        email: 'marc.leroy@globalind.com',
        phone: '+33 6 55 44 33 22',
        status: 'lead',
        value: 15000,
        lastContact: '2024-01-18',
        nextFollowUp: '2024-01-30',
        source: 'Cold Call',
        assignedTo: 'Marie Martin',
        tags: ['Manufacturing'],
        notes: 'Premier contact, à qualifier'
      }
    ];

    const mockOpportunities: Opportunity[] = [
      {
        id: '1',
        title: 'Migration Cloud Enterprise',
        customerId: '1',
        customerName: 'TechCorp Solutions',
        value: 45000,
        stage: 'negotiation',
        probability: 75,
        expectedClose: '2024-02-15',
        assignedTo: 'Marie Martin',
        lastActivity: '2024-01-20',
        description: 'Migration complète vers notre plateforme cloud'
      },
      {
        id: '2',
        title: 'Développement Application Mobile',
        customerId: '2',
        customerName: 'Innovation Labs',
        value: 25000,
        stage: 'proposal',
        probability: 60,
        expectedClose: '2024-03-01',
        assignedTo: 'Pierre Dubois',
        lastActivity: '2024-01-22',
        description: 'Application mobile pour gestion des projets'
      },
      {
        id: '3',
        title: 'Système de Gestion ERP',
        customerId: '3',
        customerName: 'Global Industries',
        value: 15000,
        stage: 'qualification',
        probability: 30,
        expectedClose: '2024-04-01',
        assignedTo: 'Marie Martin',
        lastActivity: '2024-01-18',
        description: 'Implémentation ERP personnalisé'
      }
    ];

    setCustomers(mockCustomers);
    setOpportunities(mockOpportunities);
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || opportunity.stage === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddCustomer = () => {
    toast({
      title: "Nouveau client",
      description: "Formulaire d'ajout de client ouvert.",
    });
  };

  const handleAddOpportunity = () => {
    toast({
      title: "Nouvelle opportunité",
      description: "Formulaire de création d'opportunité ouvert.",
    });
  };

  // Statistiques CRM (mock)
  const stats = [
    { label: 'Clients totaux', value: customers.length, icon: Users },
    { label: 'Opportunités actives', value: opportunities.length, icon: Target },
    { label: 'Pipeline total', value: `${opportunities.reduce((acc, opp) => acc + opp.value, 0).toLocaleString()}€`, icon: DollarSign },
    { label: 'Taux de conversion', value: '68%', icon: TrendingUp }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting': return 'bg-gray-100 text-gray-800';
      case 'qualification': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closed-won': return 'bg-green-100 text-green-800';
      case 'closed-lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead': return 'bg-gray-100 text-gray-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      case 'customer': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Solutions CRM</h1>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Activity className="w-3 h-3 mr-1" />
                {customers.filter(c => c.status === 'customer').length} clients actifs
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Activity className="w-5 h-5" />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau client
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
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar gauche - Filtres */}
          <div className="lg:col-span-1 space-y-8">
            {/* Filtres par statut */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statut</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant={filterStatus === 'all' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterStatus('all')}
                  >
                    Tous les statuts
                  </Button>
                  <Button 
                    variant={filterStatus === 'lead' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterStatus('lead')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Leads
                  </Button>
                  <Button 
                    variant={filterStatus === 'prospect' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterStatus('prospect')}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Prospects
                  </Button>
                  <Button 
                    variant={filterStatus === 'customer' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterStatus('customer')}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Clients
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
                  <Button variant="outline" className="w-full justify-start" onClick={handleAddCustomer}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau client
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleAddOpportunity}>
                    <Target className="w-4 h-4 mr-2" />
                    Nouvelle opportunité
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Suivis à faire
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <div className="flex items-center mb-6">
              <Input
                placeholder="Rechercher un client, entreprise, opportunité..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mr-4"
              />
              <select
                value={activeTab}
                onChange={e => setActiveTab(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <option value="customers">Clients</option>
                <option value="opportunities">Opportunités</option>
                <option value="pipeline">Pipeline</option>
              </select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="customers">Clients</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunités</TabsTrigger>
                <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
              </TabsList>

              <TabsContent value="customers" className="space-y-6">
                {filteredCustomers.map(customer => (
                  <Card key={customer.id} className={`hover:shadow-lg transition-shadow ${
                    customer.status === 'customer' ? 'border-l-4 border-green-500' :
                    customer.status === 'prospect' ? 'border-l-4 border-blue-500' :
                    customer.status === 'lead' ? 'border-l-4 border-gray-500' :
                    'border-l-4 border-red-500'
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={`/images/customers/${customer.id}.jpg`} />
                            <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{customer.name}</h3>
                            <p className="text-gray-600">{customer.company}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                {customer.email}
                              </span>
                              <span className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {customer.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{customer.assignedTo}</Badge>
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status === 'lead' ? 'Lead' :
                             customer.status === 'prospect' ? 'Prospect' :
                             customer.status === 'customer' ? 'Client' : 'Inactif'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">Valeur:</span>
                          <p className="text-gray-600">{customer.value.toLocaleString()}€</p>
                          <span className="font-medium text-gray-900">Source:</span>
                          <p className="text-gray-600">{customer.source}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Dernier contact:</span>
                          <p className="text-gray-600">{new Date(customer.lastContact).toLocaleDateString('fr-FR')}</p>
                          <span className="font-medium text-gray-900">Prochain suivi:</span>
                          <p className="text-gray-600">{new Date(customer.nextFollowUp).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900">Tags:</span>
                          <div className="flex flex-wrap gap-1">
                            {customer.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{customer.notes}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Profil
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                          <Target className="w-4 h-4 mr-2" />
                          Opportunité
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="opportunities" className="space-y-6">
                {filteredOpportunities.map(opportunity => (
                  <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                            <Target className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                            <p className="text-gray-600">{opportunity.customerName}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {opportunity.value.toLocaleString()}€
                              </span>
                              <span className="flex items-center">
                                <Target className="w-4 h-4 mr-1" />
                                {opportunity.probability}%
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(opportunity.expectedClose).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{opportunity.assignedTo}</Badge>
                          <Badge className={getStageColor(opportunity.stage)}>
                            {opportunity.stage === 'prospecting' ? 'Prospection' :
                             opportunity.stage === 'qualification' ? 'Qualification' :
                             opportunity.stage === 'proposal' ? 'Proposition' :
                             opportunity.stage === 'negotiation' ? 'Négociation' :
                             opportunity.stage === 'closed-won' ? 'Gagné' : 'Perdu'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{opportunity.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Dernière activité: {new Date(opportunity.lastActivity).toLocaleDateString('fr-FR')}</span>
                        <span>Valeur attendue: {opportunity.value.toLocaleString()}€</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Activité
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="pipeline" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* Prospection */}
                  <Card className="bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-600">Prospection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2">
                        {opportunities.filter(o => o.stage === 'prospecting').length}
                      </div>
                      <div className="text-sm text-gray-500">
                        {opportunities.filter(o => o.stage === 'prospecting').reduce((acc, opp) => acc + opp.value, 0).toLocaleString()}€
                      </div>
                    </CardContent>
                  </Card>

                  {/* Qualification */}
                  <Card className="bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-sm text-blue-600">Qualification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2 text-blue-600">
                        {opportunities.filter(o => o.stage === 'qualification').length}
                      </div>
                      <div className="text-sm text-blue-500">
                        {opportunities.filter(o => o.stage === 'qualification').reduce((acc, opp) => acc + opp.value, 0).toLocaleString()}€
                      </div>
                    </CardContent>
                  </Card>

                  {/* Proposition */}
                  <Card className="bg-yellow-50">
                    <CardHeader>
                      <CardTitle className="text-sm text-yellow-600">Proposition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2 text-yellow-600">
                        {opportunities.filter(o => o.stage === 'proposal').length}
                      </div>
                      <div className="text-sm text-yellow-500">
                        {opportunities.filter(o => o.stage === 'proposal').reduce((acc, opp) => acc + opp.value, 0).toLocaleString()}€
                      </div>
                    </CardContent>
                  </Card>

                  {/* Négociation */}
                  <Card className="bg-orange-50">
                    <CardHeader>
                      <CardTitle className="text-sm text-orange-600">Négociation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2 text-orange-600">
                        {opportunities.filter(o => o.stage === 'negotiation').length}
                      </div>
                      <div className="text-sm text-orange-500">
                        {opportunities.filter(o => o.stage === 'negotiation').reduce((acc, opp) => acc + opp.value, 0).toLocaleString()}€
                      </div>
                    </CardContent>
                  </Card>

                  {/* Fermé */}
                  <Card className="bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-sm text-green-600">Fermé</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2 text-green-600">
                        {opportunities.filter(o => o.stage === 'closed-won').length}
                      </div>
                      <div className="text-sm text-green-500">
                        {opportunities.filter(o => o.stage === 'closed-won').reduce((acc, opp) => acc + opp.value, 0).toLocaleString()}€
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Pipeline Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-4">
                      {opportunities.reduce((acc, opp) => acc + opp.value, 0).toLocaleString()}€
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Opportunités actives:</span>
                        <p className="font-semibold">{opportunities.length}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Valeur moyenne:</span>
                        <p className="font-semibold">
                          {opportunities.length > 0 ? (opportunities.reduce((acc, opp) => acc + opp.value, 0) / opportunities.length).toLocaleString() : 0}€
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Taux de conversion:</span>
                        <p className="font-semibold">68%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 