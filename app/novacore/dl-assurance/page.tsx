'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  BarChart3,
  Car,
  Home,
  Heart,
  Plane,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar
} from 'lucide-react';

interface Policy {
  id: string;
  policyNumber: string;
  customerName: string;
  customerEmail: string;
  type: 'auto' | 'home' | 'health' | 'life' | 'travel';
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  premium: number;
  coverage: number;
  startDate: string;
  endDate: string;
  agent: string;
  claims: number;
}

interface Claim {
  id: string;
  policyId: string;
  policyNumber: string;
  customerName: string;
  type: 'auto' | 'home' | 'health' | 'life' | 'travel';
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  date: string;
  description: string;
  agent: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  policies: number;
  totalPremium: number;
  status: 'active' | 'inactive';
  lastActivity: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function DLAssurancePage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Données simulées pour les polices
    const mockPolicies: Policy[] = [
      {
        id: "1",
        policyNumber: "POL-2024-001",
        customerName: "Jean Dupont",
        customerEmail: "jean.dupont@email.com",
        type: "auto",
        status: "active",
        premium: 850.00,
        coverage: 50000.00,
        startDate: "2024-01-15T00:00:00Z",
        endDate: "2025-01-15T00:00:00Z",
        agent: "Marie Martin",
        claims: 0
      },
      {
        id: "2",
        policyNumber: "POL-2024-002",
        customerName: "Sophie Bernard",
        customerEmail: "sophie.bernard@email.com",
        type: "home",
        status: "active",
        premium: 1200.00,
        coverage: 250000.00,
        startDate: "2024-02-01T00:00:00Z",
        endDate: "2025-02-01T00:00:00Z",
        agent: "Pierre Durand",
        claims: 1
      },
      {
        id: "3",
        policyNumber: "POL-2024-003",
        customerName: "Pierre Durand",
        customerEmail: "pierre.durand@email.com",
        type: "health",
        status: "active",
        premium: 650.00,
        coverage: 100000.00,
        startDate: "2024-01-20T00:00:00Z",
        endDate: "2025-01-20T00:00:00Z",
        agent: "Marie Martin",
        claims: 2
      },
      {
        id: "4",
        policyNumber: "POL-2024-004",
        customerName: "Marie Martin",
        customerEmail: "marie.martin@email.com",
        type: "life",
        status: "pending",
        premium: 1800.00,
        coverage: 500000.00,
        startDate: "2024-03-01T00:00:00Z",
        endDate: "2025-03-01T00:00:00Z",
        agent: "Jean Dupont",
        claims: 0
      }
    ];

    // Données simulées pour les sinistres
    const mockClaims: Claim[] = [
      {
        id: "1",
        policyId: "2",
        policyNumber: "POL-2024-002",
        customerName: "Sophie Bernard",
        type: "home",
        amount: 5000.00,
        status: "approved",
        date: "2024-02-10T00:00:00Z",
        description: "Dégâts d'eau dans la cuisine",
        agent: "Pierre Durand"
      },
      {
        id: "2",
        policyId: "3",
        policyNumber: "POL-2024-003",
        customerName: "Pierre Durand",
        type: "health",
        amount: 2500.00,
        status: "processing",
        date: "2024-02-12T00:00:00Z",
        description: "Consultation spécialiste",
        agent: "Marie Martin"
      },
      {
        id: "3",
        policyId: "3",
        policyNumber: "POL-2024-003",
        customerName: "Pierre Durand",
        type: "health",
        amount: 1800.00,
        status: "pending",
        date: "2024-02-14T00:00:00Z",
        description: "Analyse médicale",
        agent: "Marie Martin"
      }
    ];

    // Données simulées pour les clients
    const mockCustomers: Customer[] = [
      {
        id: "1",
        name: "Jean Dupont",
        email: "jean.dupont@email.com",
        phone: "+33 6 12 34 56 78",
        policies: 2,
        totalPremium: 1500.00,
        status: "active",
        lastActivity: "2024-02-14T10:30:00Z",
        riskLevel: "low"
      },
      {
        id: "2",
        name: "Sophie Bernard",
        email: "sophie.bernard@email.com",
        phone: "+33 6 98 76 54 32",
        policies: 1,
        totalPremium: 1200.00,
        status: "active",
        lastActivity: "2024-02-10T14:20:00Z",
        riskLevel: "medium"
      },
      {
        id: "3",
        name: "Pierre Durand",
        email: "pierre.durand@email.com",
        phone: "+33 6 11 22 33 44",
        policies: 1,
        totalPremium: 650.00,
        status: "active",
        lastActivity: "2024-02-12T16:45:00Z",
        riskLevel: "high"
      },
      {
        id: "4",
        name: "Marie Martin",
        email: "marie.martin@email.com",
        phone: "+33 6 55 66 77 88",
        policies: 1,
        totalPremium: 1800.00,
        status: "inactive",
        lastActivity: "2024-02-01T09:15:00Z",
        riskLevel: "low"
      }
    ];

    setPolicies(mockPolicies);
    setClaims(mockClaims);
    setCustomers(mockCustomers);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPolicyTypeColor = (type: string) => {
    switch (type) {
      case 'auto': return 'bg-blue-100 text-blue-800';
      case 'home': return 'bg-green-100 text-green-800';
      case 'health': return 'bg-purple-100 text-purple-800';
      case 'life': return 'bg-red-100 text-red-800';
      case 'travel': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPolicyTypeIcon = (type: string) => {
    switch (type) {
      case 'auto': return <Car className="h-4 w-4" />;
      case 'home': return <Home className="h-4 w-4" />;
      case 'health': return <Heart className="h-4 w-4" />;
      case 'life': return <Shield className="h-4 w-4" />;
      case 'travel': return <Plane className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPolicies = policies.filter(policy =>
    policy.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPremium = policies.reduce((sum, policy) => sum + policy.premium, 0);
  const activePolicies = policies.filter(p => p.status === 'active').length;
  const totalClaims = claims.length;
  const pendingClaims = claims.filter(c => c.status === 'pending').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement du CRM assurance...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">DL Assurance CRM</h1>
            <p className="text-gray-600">Gestion des polices et sinistres</p>
          </div>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Primes totales</p>
                <p className="text-2xl font-bold">{totalPremium.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Polices actives</p>
                <p className="text-2xl font-bold">{activePolicies}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Sinistres</p>
                <p className="text-2xl font-bold">{totalClaims}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold">{pendingClaims}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Liste des polices */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Polices d'assurance
              </CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle police
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une police..."
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
                  <SelectItem value="active">Actives</SelectItem>
                  <SelectItem value="expired">Expirées</SelectItem>
                  <SelectItem value="cancelled">Annulées</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPolicies.map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getPolicyTypeColor(policy.type)}`}>
                      {getPolicyTypeIcon(policy.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{policy.customerName}</h3>
                      <p className="text-sm text-gray-600">{policy.policyNumber}</p>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={getStatusColor(policy.status)}>
                          {policy.status === 'active' ? 'Active' : policy.status === 'expired' ? 'Expirée' : policy.status === 'cancelled' ? 'Annulée' : 'En attente'}
                        </Badge>
                        <Badge className={getPolicyTypeColor(policy.type)}>
                          {policy.type === 'auto' ? 'Auto' : policy.type === 'home' ? 'Habitation' : policy.type === 'health' ? 'Santé' : policy.type === 'life' ? 'Vie' : 'Voyage'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{policy.premium.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                    <p className="text-xs text-gray-500">{new Date(policy.endDate).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sinistres récents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Sinistres récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {claims.slice(0, 5).map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getPolicyTypeColor(claim.type)}`}>
                      {getPolicyTypeIcon(claim.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{claim.customerName}</p>
                      <p className="text-xs text-gray-600">{claim.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">{claim.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                    <Badge className={getClaimStatusColor(claim.status)}>
                      {claim.status === 'approved' ? 'Approuvé' : claim.status === 'rejected' ? 'Rejeté' : claim.status === 'processing' ? 'En cours' : 'En attente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Clients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers.map((customer) => (
              <div key={customer.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{customer.name.charAt(0)}</span>
                  </div>
                  <Badge className={getRiskLevelColor(customer.riskLevel)}>
                    Risque {customer.riskLevel}
                  </Badge>
                </div>
                <h3 className="font-medium mb-1">{customer.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{customer.email}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Polices:</span>
                    <span className="font-medium">{customer.policies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Primes:</span>
                    <span className="font-medium">{customer.totalPremium.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dernière activité:</span>
                    <span className="text-xs">{new Date(customer.lastActivity).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}