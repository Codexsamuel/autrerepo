"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, Info, BarChart3, DollarSign, Users, Activity, Search, Plus, Edit, Eye, Trash2, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Account {
  id: string;
  owner: string;
  balance: number;
  currency: string;
  status: 'actif' | 'inactif';
  createdAt: string;
}

interface Position {
  id: string;
  accountId: string;
  symbol: string;
  type: 'long' | 'short';
  amount: number;
  entry: number;
  current: number;
  pnl: number;
  status: 'ouverte' | 'fermée';
  openedAt: string;
  closedAt?: string;
}

interface Order {
  id: string;
  accountId: string;
  symbol: string;
  type: 'achat' | 'vente';
  amount: number;
  price: number;
  status: 'exécuté' | 'en attente' | 'annulé';
  date: string;
}

export default function DLTradingPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAccounts([
      { id: '1', owner: 'Jean Dupont', balance: 12500, currency: 'EUR', status: 'actif', createdAt: '2023-10-01' },
      { id: '2', owner: 'Marie Martin', balance: 8500, currency: 'USD', status: 'actif', createdAt: '2023-11-15' },
      { id: '3', owner: 'Pierre Durand', balance: 5000, currency: 'EUR', status: 'inactif', createdAt: '2023-09-20' }
    ]);
    setPositions([
      { id: '1', accountId: '1', symbol: 'AAPL', type: 'long', amount: 10, entry: 170, current: 175, pnl: 50, status: 'ouverte', openedAt: '2024-02-10' },
      { id: '2', accountId: '2', symbol: 'BTCUSD', type: 'short', amount: 0.5, entry: 42000, current: 41000, pnl: 500, status: 'fermée', openedAt: '2024-01-15', closedAt: '2024-02-01' }
    ]);
    setOrders([
      { id: '1', accountId: '1', symbol: 'AAPL', type: 'achat', amount: 10, price: 170, status: 'exécuté', date: '2024-02-10' },
      { id: '2', accountId: '2', symbol: 'BTCUSD', type: 'vente', amount: 0.5, price: 42000, status: 'exécuté', date: '2024-01-15' },
      { id: '3', accountId: '3', symbol: 'EURUSD', type: 'achat', amount: 1000, price: 1.09, status: 'en attente', date: '2024-02-14' }
    ]);
    setLoading(false);
  };

  const filteredAccounts = accounts.filter(account =>
    account.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement du CRM trading...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">DL Trading CRM</h1>
            <p className="text-gray-600">Gestion des comptes, positions et ordres de trading</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Comptes</p>
                <p className="text-2xl font-bold">{accounts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Positions</p>
                <p className="text-2xl font-bold">{positions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Ordres</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Actifs</p>
                <p className="text-2xl font-bold">{accounts.filter(a => a.status === 'actif').length}</p>
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
                <BarChart3 className="mr-2 h-5 w-5" />
                Comptes de trading
              </CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau compte
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un compte..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{account.owner.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{account.owner}</h3>
                      <p className="text-sm text-gray-600">{account.currency}</p>
                      <Badge className={account.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {account.status === 'actif' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{account.balance.toLocaleString('fr-FR', { style: 'currency', currency: account.currency })}</p>
                    <p className="text-xs text-gray-500">Créé le {account.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Positions ouvertes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positions.map((position) => (
                <div key={position.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={position.type === 'long' ? 'bg-green-100 text-green-800 p-2 rounded-lg' : 'bg-red-100 text-red-800 p-2 rounded-lg'}>
                      {position.type === 'long' ? 'Long' : 'Short'}
                    </div>
                    <div>
                      <h3 className="font-medium">{position.symbol}</h3>
                      <p className="text-xs text-gray-600">Entrée: {position.entry} | Actuel: {position.current}</p>
                      <Badge className={position.status === 'ouverte' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                        {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={position.pnl >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      {position.pnl >= 0 ? '+' : ''}{position.pnl} €
                    </p>
                    <p className="text-xs text-gray-500">Ouvert le {position.openedAt}</p>
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
            <Activity className="mr-2 h-5 w-5" />
            Ordres récents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={order.type === 'achat' ? 'bg-green-100 text-green-800 p-2 rounded-lg' : 'bg-red-100 text-red-800 p-2 rounded-lg'}>
                    {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{order.symbol}</p>
                    <p className="text-xs text-gray-600">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount} @ {order.price}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 