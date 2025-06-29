'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Users, Building2, DollarSign, TrendingUp, Activity, Search, Plus, Edit, Eye, Trash2, Download, MapPin, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  type: 'appartement' | 'maison' | 'bureau' | 'terrain';
  status: 'disponible' | 'vendu' | 'loué' | 'en attente';
  price: number;
  location: string;
  surface: number;
  rooms: number;
  agent: string;
  dateAdded: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'actif' | 'inactif';
  lastActivity: string;
  interestedIn: string[];
}

interface Transaction {
  id: string;
  propertyId: string;
  clientId: string;
  type: 'vente' | 'location';
  amount: number;
  date: string;
  status: 'finalisée' | 'en cours' | 'annulée';
  agent: string;
}

export default function DLImmobilierPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProperties([
      { id: '1', title: 'Appartement T3 Centre Ville', type: 'appartement', status: 'disponible', price: 250000, location: 'Yaoundé', surface: 85, rooms: 3, agent: 'Sarah Johnson', dateAdded: '2024-02-10' },
      { id: '2', title: 'Maison 5 pièces Bastos', type: 'maison', status: 'vendu', price: 650000, location: 'Bastos', surface: 180, rooms: 5, agent: 'Michael Chen', dateAdded: '2024-01-20' },
      { id: '3', title: 'Bureau Plateau', type: 'bureau', status: 'loué', price: 1200, location: 'Plateau', surface: 60, rooms: 2, agent: 'Emma Davis', dateAdded: '2024-02-01' },
      { id: '4', title: 'Terrain 500m² Nkolbisson', type: 'terrain', status: 'en attente', price: 90000, location: 'Nkolbisson', surface: 500, rooms: 0, agent: 'Alex Thompson', dateAdded: '2024-02-15' }
    ]);
    setClients([
      { id: '1', name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+33 6 12 34 56 78', status: 'actif', lastActivity: '2024-02-14', interestedIn: ['appartement', 'maison'] },
      { id: '2', name: 'Marie Martin', email: 'marie.martin@email.com', phone: '+33 6 98 76 54 32', status: 'actif', lastActivity: '2024-02-13', interestedIn: ['terrain'] },
      { id: '3', name: 'Pierre Durand', email: 'pierre.durand@email.com', phone: '+33 6 11 22 33 44', status: 'inactif', lastActivity: '2024-01-30', interestedIn: ['bureau'] }
    ]);
    setTransactions([
      { id: '1', propertyId: '2', clientId: '1', type: 'vente', amount: 650000, date: '2024-02-12', status: 'finalisée', agent: 'Michael Chen' },
      { id: '2', propertyId: '3', clientId: '2', type: 'location', amount: 1200, date: '2024-02-05', status: 'finalisée', agent: 'Emma Davis' }
    ]);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponible': return 'bg-green-100 text-green-800';
      case 'vendu': return 'bg-blue-100 text-blue-800';
      case 'loué': return 'bg-purple-100 text-purple-800';
      case 'en attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement du CRM immobilier...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-orange-600 to-blue-600 rounded-lg">
            <Home className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">DL Immobilier CRM</h1>
            <p className="text-gray-600">Gestion des biens, clients et transactions immobilières</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Biens</p>
                <p className="text-2xl font-bold">{properties.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Clients</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <p className="text-2xl font-bold">{transactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold">{properties.filter(p => p.status === 'disponible').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Biens immobiliers
              </CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau bien
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un bien..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous</SelectItem>
                  <SelectItem value="disponible">Disponibles</SelectItem>
                  <SelectItem value="vendu">Vendus</SelectItem>
                  <SelectItem value="loué">Loués</SelectItem>
                  <SelectItem value="en attente">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(property.status)}`}>
                      <Home className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{property.title}</h3>
                      <p className="text-sm text-gray-600">{property.location}</p>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={getStatusColor(property.status)}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </Badge>
                        <Badge>
                          {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{property.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                    <p className="text-xs text-gray-500">{property.surface} m², {property.rooms} pièces</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{client.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.email}</p>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={client.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {client.status === 'actif' ? 'Actif' : 'Inactif'}
                        </Badge>
                        <Badge>
                          {client.interestedIn.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Dernière activité : {client.lastActivity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                    {transaction.type === 'vente' ? 'Vente' : 'Location'}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.agent}</p>
                    <p className="text-xs text-gray-600">{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">{transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}