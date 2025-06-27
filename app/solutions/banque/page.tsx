"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface BankStats {
  totalAccounts: number;
  totalClients: number;
  totalBalance: number;
  totalTransactions: number;
  monthlyRevenue: number;
  activeLoans: number;
}

export default function BanqueDashboard() {
  const [stats, setStats] = useState<BankStats>({
    totalAccounts: 0,
    totalClients: 0,
    totalBalance: 0,
    totalTransactions: 0,
    monthlyRevenue: 0,
    activeLoans: 0
  });
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchBankStats();
  }, []);

  const fetchBankStats = async () => {
    try {
      // Récupérer les statistiques depuis Supabase
      const { data: accounts, error: accountsError } = await supabase
        .from('bank_accounts')
        .select('*');

      const { data: clients, error: clientsError } = await supabase
        .from('bank_clients')
        .select('*');

      const { data: transactions, error: transactionsError } = await supabase
        .from('bank_transactions')
        .select('*');

      const { data: loans, error: loansError } = await supabase
        .from('bank_loans')
        .select('*')
        .eq('status', 'active');

      if (accountsError || clientsError || transactionsError || loansError) {
        console.error('Erreur lors de la récupération des statistiques:', { accountsError, clientsError, transactionsError, loansError });
        return;
      }

      const totalBalance = accounts?.reduce((sum, account) => sum + (account.balance || 0), 0) || 0;
      const monthlyRevenue = transactions?.reduce((sum, transaction) => {
        const transactionDate = new Date(transaction.created_at);
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
          return sum + (transaction.fees || 0);
        }
        return sum;
      }, 0) || 0;

      setStats({
        totalAccounts: accounts?.length || 0,
        totalClients: clients?.length || 0,
        totalBalance,
        totalTransactions: transactions?.length || 0,
        monthlyRevenue,
        activeLoans: loans?.length || 0
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Bancaire</h1>
          <p className="text-gray-600 mt-2">Gestion complète de votre activité bancaire</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/solutions/banque/comptes/nouveau">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Compte
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/solutions/banque/clients/nouveau">
              <Users className="w-4 h-4 mr-2" />
              Nouveau Client
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comptes</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAccounts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solde Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalBalance)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Mensuels</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+22%</span> ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prêts Actifs</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeLoans}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+3</span> ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/solutions/banque/comptes">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                Gestion Comptes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Gérer les comptes bancaires</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/solutions/banque/clients">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Gestion Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Gérer la clientèle bancaire</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/solutions/banque/transactions">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Suivre les transactions</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/solutions/banque/prets">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <PiggyBank className="w-5 h-5 mr-2 text-orange-600" />
                Gestion Prêts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Gérer les prêts bancaires</p>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Graphiques et analyses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Comptes</CardTitle>
            <CardDescription>Croissance du nombre de comptes sur 12 mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Graphique d'évolution des comptes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des Solde</CardTitle>
            <CardDescription>Distribution des soldes par type de compte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Graphique de répartition des soldes</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 