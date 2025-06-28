'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export default function NovaCoreDashboard() {
  const [stats, setStats] = useState({
    activeUsers: 4800,
    monthlyRevenue: 45200,
    activeServices: 4,
    satisfaction: 98
  });

  const [recentCustomers, setRecentCustomers] = useState([
    {
      id: 1,
      name: 'Jean Dupont',
      company: 'Tech Solutions SARL',
      email: 'jean.dupont@techsolutions.cm',
      phone: '+237 6 12 34 56 78',
      status: 'active',
      lastContact: '2024-01-15',
      value: 15000
    },
    {
      id: 2,
      name: 'Marie Nguemo',
      company: 'Digital Marketing Pro',
      email: 'marie.nguemo@dmp.cm',
      phone: '+237 6 98 76 54 32',
      status: 'prospect',
      lastContact: '2024-01-14',
      value: 8000
    },
    {
      id: 3,
      name: 'Pierre Essomba',
      company: 'E-commerce Plus',
      email: 'pierre.essomba@ecomplus.cm',
      phone: '+237 6 55 44 33 22',
      status: 'active',
      lastContact: '2024-01-13',
      value: 25000
    }
  ]);

  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: 'Site E-commerce DL Style',
      customer: 'Fashion Store Yaoundé',
      value: 45000,
      stage: 'proposal',
      probability: 75,
      closeDate: '2024-02-15'
    },
    {
      id: 2,
      title: 'CRM NovaCore Enterprise',
      customer: 'Banque Atlantique',
      value: 120000,
      stage: 'negotiation',
      probability: 60,
      closeDate: '2024-03-01'
    },
    {
      id: 3,
      title: 'Application Mobile Trading',
      customer: 'Invest Capital',
      value: 80000,
      stage: 'discovery',
      probability: 40,
      closeDate: '2024-02-28'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">NovaCore Dashboard</h1>
            <p className="text-gray-600">Gestion intelligente de vos clients et opportunités</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Client
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Opportunité
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}+</div>
              <p className="text-xs text-muted-foreground">
                +12% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus Mensuel</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services Actifs</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeServices}</div>
              <p className="text-xs text-muted-foreground">
                100% de disponibilité
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.satisfaction}%</div>
              <p className="text-xs text-muted-foreground">
                +2% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customers">Clients</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunités</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Clients Récents</CardTitle>
                    <CardDescription>
                      Gestion de vos clients et prospects
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Rechercher
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrer
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCustomers.map((customer: any) => (
                    <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.company}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-500 flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {customer.email}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {customer.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                          {customer.status === 'active' ? 'Actif' : 'Prospect'}
                        </Badge>
                        <div className="text-right">
                          <p className="font-medium">€{customer.value.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Valeur</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Opportunités en Cours</CardTitle>
                    <CardDescription>
                      Suivi de vos opportunités de vente
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Opportunité
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunities.map((opportunity: any) => (
                    <div key={opportunity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{opportunity.title}</h3>
                          <p className="text-sm text-gray-600">{opportunity.customer}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-500 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              Clôture: {opportunity.closeDate}
                            </span>
                            <span className="text-xs text-gray-500">
                              Probabilité: {opportunity.probability}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">
                          {opportunity.stage === 'proposal' ? 'Proposition' : 
                           opportunity.stage === 'negotiation' ? 'Négociation' : 'Découverte'}
                        </Badge>
                        <div className="text-right">
                          <p className="font-medium">€{opportunity.value.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Valeur</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance des Ventes</CardTitle>
                  <CardDescription>Évolution des ventes sur 12 mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Graphique des ventes</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition Clients</CardTitle>
                  <CardDescription>Par secteur d'activité</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Graphique secteurs</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}