'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Activity,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  BarChart3,
  Wallet,
  PiggyBank,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountType: 'personal' | 'business' | 'premium';
  balance: number;
  status: 'active' | 'suspended' | 'pending';
  lastTransaction: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
}

interface Account {
  id: string;
  customerId: string;
  accountNumber: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  status: 'active' | 'frozen' | 'closed';
  openedDate: string;
}

export default function DLBanquePage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Données simulées pour les clients
    const mockCustomers: Customer[] = [
      {
        id: "1",
        name: "Jean Dupont",
        email: "jean.dupont@email.com",
        phone: "+33 6 12 34 56 78",
        accountType: "premium",
        balance: 125000.50,
        status: "active",
        lastTransaction: "2024-02-14T10:30:00Z",
        riskLevel: "low"
      },
      {
        id: "2",
        name: "Marie Martin",
        email: "marie.martin@email.com",
        phone: "+33 6 98 76 54 32",
        accountType: "business",
        balance: 450000.00,
        status: "active",
        lastTransaction: "2024-02-14T14:20:00Z",
        riskLevel: "medium"
      },
      {
        id: "3",
        name: "Pierre Durand",
        email: "pierre.durand@email.com",
        phone: "+33 6 11 22 33 44",
        accountType: "personal",
        balance: 25000.75,
        status: "active",
        lastTransaction: "2024-02-13T16:45:00Z",
        riskLevel: "low"
      },
      {
        id: "4",
        name: "Sophie Bernard",
        email: "sophie.bernard@email.com",
        phone: "+33 6 55 66 77 88",
        accountType: "premium",
        balance: 750000.25,
        status: "suspended",
        lastTransaction: "2024-02-10T09:15:00Z",
        riskLevel: "high"
      }
    ];

    // Données simulées pour les transactions
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        customerId: "1",
        customerName: "Jean Dupont",
        type: "deposit",
        amount: 5000.00,
        status: "completed",
        date: "2024-02-14T10:30:00Z",
        description: "Dépôt en espèces"
      },
      {
        id: "2",
        customerId: "2",
        customerName: "Marie Martin",
        type: "transfer",
        amount: 15000.00,
        status: "completed",
        date: "2024-02-14T14:20:00Z",
        description: "Virement vers compte épargne"
      },
      {
        id: "3",
        customerId: "3",
        customerName: "Pierre Durand",
        type: "withdrawal",
        amount: 500.00,
        status: "completed",
        date: "2024-02-13T16:45:00Z",
        description: "Retrait ATM"
      },
      {
        id: "4",
        customerId: "1",
        customerName: "Jean Dupont",
        type: "payment",
        amount: 250.00,
        status: "pending",
        date: "2024-02-14T11:00:00Z",
        description: "Paiement carte bancaire"
      }
    ];

    // Données simulées pour les comptes
    const mockAccounts: Account[] = [
      {
        id: "1",
        customerId: "1",
        accountNumber: "FR1234567890123456789012345",
        type: "checking",
        balance: 85000.50,
        currency: "EUR",
        status: "active",
        openedDate: "2020-03-15T00:00:00Z"
      },
      {
        id: "2",
        customerId: "1",
        accountNumber: "FR1234567890123456789012346",
        type: "savings",
        balance: 40000.00,
        currency: "EUR",
        status: "active",
        openedDate: "2020-03-15T00:00:00Z"
      },
      {
        id: "3",
        customerId: "2",
        accountNumber: "FR1234567890123456789012347",
        type: "checking",
        balance: 450000.00,
        currency: "EUR",
        status: "active",
        openedDate: "2018-06-20T00:00:00Z"
      },
      {
        id: "4",
        customerId: "3",
        accountNumber: "FR1234567890123456789012348",
        type: "checking",
        balance: 25000.75,
        currency: "EUR",
        status: "active",
        openedDate: "2022-01-10T00:00:00Z"
      }
    ];

    setCustomers(mockCustomers);
    setTransactions(mockTransactions);
    setAccounts(mockAccounts);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'bg-green-100 text-green-800';
      case 'withdrawal': return 'bg-red-100 text-red-800';
      case 'transfer': return 'bg-blue-100 text-blue-800';
      case 'payment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'checking': return 'bg-blue-100 text-blue-800';
      case 'savings': return 'bg-green-100 text-green-800';
      case 'credit': return 'bg-purple-100 text-purple-800';
      case 'investment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBalance = customers.reduce((sum, customer) => sum + customer.balance, 0);
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalTransactions = transactions.length;
  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement du CRM bancaire...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">DL Banque CRM</h1>
            <p className="text-gray-600">Gestion des clients et opérations bancaires</p>
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
                <p className="text-sm font-medium text-gray-600">Total des dépôts</p>
                <p className="text-2xl font-bold">{totalBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Clients actifs</p>
                <p className="text-2xl font-bold">{activeCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <p className="text-2xl font-bold">{totalTransactions}</p>
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
                <p className="text-2xl font-bold">{pendingTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Liste des clients */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Clients
              </CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau client
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un client..."
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
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="suspended">Suspendus</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{customer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status === 'active' ? 'Actif' : customer.status === 'suspended' ? 'Suspendu' : 'En attente'}
                        </Badge>
                        <Badge className={getRiskLevelColor(customer.riskLevel)}>
                          Risque {customer.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{customer.balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                    <p className="text-xs text-gray-500">{new Date(customer.lastTransaction).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transactions récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Transactions récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTransactionTypeColor(transaction.type)}`}>
                      {transaction.type === 'deposit' && <TrendingUp className="h-4 w-4" />}
                      {transaction.type === 'withdrawal' && <TrendingUp className="h-4 w-4 rotate-180" />}
                      {transaction.type === 'transfer' && <Activity className="h-4 w-4" />}
                      {transaction.type === 'payment' && <CreditCard className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.customerName}</p>
                      <p className="text-xs text-gray-600">{transaction.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </p>
                    <Badge className={transaction.status === 'completed' ? 'bg-green-100 text-green-800' : transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                      {transaction.status === 'completed' ? 'Terminé' : transaction.status === 'pending' ? 'En cours' : 'Échoué'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comptes bancaires */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="mr-2 h-5 w-5" />
            Comptes bancaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <div key={account.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getAccountTypeColor(account.type)}>
                    {account.type === 'checking' ? 'Courant' : account.type === 'savings' ? 'Épargne' : account.type === 'credit' ? 'Crédit' : 'Investissement'}
                  </Badge>
                  <Badge className={getStatusColor(account.status)}>
                    {account.status === 'active' ? 'Actif' : account.status === 'frozen' ? 'Gelé' : 'Fermé'}
                  </Badge>
                </div>
                <p className="font-mono text-sm text-gray-600 mb-2">{account.accountNumber}</p>
                <p className="text-xl font-bold mb-2">{account.balance.toLocaleString('fr-FR', { style: 'currency', currency: account.currency })}</p>
                <p className="text-xs text-gray-500">Ouvert le {new Date(account.openedDate).toLocaleDateString('fr-FR')}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}