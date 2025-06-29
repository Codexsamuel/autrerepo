'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Utensils, Users, DollarSign, Clock, Search, Plus, Edit, Eye, Trash2, Download, MapPin, Calendar, CheckCircle, AlertTriangle, ChefHat } from 'lucide-react';

interface Order {
  id: string;
  tableNumber: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'en attente' | 'en préparation' | 'prêt' | 'servi' | 'payé';
  waiter: string;
  time: string;
}

interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'libre' | 'occupée' | 'réservée';
  currentOrder?: string;
}

interface MenuItem {
  id: string;
  name: string;
  category: 'entrée' | 'plat' | 'dessert' | 'boisson';
  price: number;
  available: boolean;
  stock: number;
}

interface Staff {
  id: string;
  name: string;
  role: 'chef' | 'serveur' | 'cuisinier' | 'manager';
  status: 'présent' | 'absent';
  shift: 'matin' | 'soir';
}

export default function DLRestaurantPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setOrders([
      {
        id: '1',
        tableNumber: 5,
        items: [
          { name: 'Salade César', quantity: 2, price: 12 },
          { name: 'Steak Frites', quantity: 2, price: 25 },
          { name: 'Tiramisu', quantity: 1, price: 8 }
        ],
        total: 82,
        status: 'en préparation',
        waiter: 'Marie Dupont',
        time: '19:30'
      },
      {
        id: '2',
        tableNumber: 3,
        items: [
          { name: 'Soupe à l\'oignon', quantity: 1, price: 10 },
          { name: 'Poulet Rôti', quantity: 1, price: 22 }
        ],
        total: 32,
        status: 'servi',
        waiter: 'Jean Martin',
        time: '19:15'
      }
    ]);
    setTables([
      { id: '1', number: 1, capacity: 4, status: 'libre' },
      { id: '2', number: 2, capacity: 2, status: 'occupée', currentOrder: '1' },
      { id: '3', number: 3, capacity: 6, status: 'occupée', currentOrder: '2' },
      { id: '4', number: 4, capacity: 4, status: 'réservée' },
      { id: '5', number: 5, capacity: 8, status: 'occupée', currentOrder: '3' }
    ]);
    setMenu([
      { id: '1', name: 'Salade César', category: 'entrée', price: 12, available: true, stock: 20 },
      { id: '2', name: 'Soupe à l\'oignon', category: 'entrée', price: 10, available: true, stock: 15 },
      { id: '3', name: 'Steak Frites', category: 'plat', price: 25, available: true, stock: 30 },
      { id: '4', name: 'Poulet Rôti', category: 'plat', price: 22, available: true, stock: 25 },
      { id: '5', name: 'Tiramisu', category: 'dessert', price: 8, available: true, stock: 12 }
    ]);
    setStaff([
      { id: '1', name: 'Pierre Chef', role: 'chef', status: 'présent', shift: 'soir' },
      { id: '2', name: 'Marie Dupont', role: 'serveur', status: 'présent', shift: 'soir' },
      { id: '3', name: 'Jean Martin', role: 'serveur', status: 'présent', shift: 'soir' },
      { id: '4', name: 'Sophie Manager', role: 'manager', status: 'présent', shift: 'soir' }
    ]);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en attente': return 'bg-yellow-100 text-yellow-800';
      case 'en préparation': return 'bg-blue-100 text-blue-800';
      case 'prêt': return 'bg-green-100 text-green-800';
      case 'servi': return 'bg-purple-100 text-purple-800';
      case 'payé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order =>
    order.tableNumber.toString().includes(searchTerm) ||
    order.waiter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement du CRM restaurant...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg">
            <Utensils className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">DL Restaurant CRM</h1>
            <p className="text-gray-600">Gestion des commandes, tables et personnel</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Utensils className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Commandes</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Tables</p>
                <p className="text-2xl font-bold">{tables.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">CA du jour</p>
                <p className="text-2xl font-bold">{orders.reduce((sum, order) => sum + order.total, 0)}€</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Personnel</p>
                <p className="text-2xl font-bold">{staff.length}</p>
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
                <Utensils className="mr-2 h-5 w-5" />
                Commandes en cours
              </CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle commande
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une commande..."
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
                  <SelectItem value="en attente">En attente</SelectItem>
                  <SelectItem value="en préparation">En préparation</SelectItem>
                  <SelectItem value="prêt">Prêt</SelectItem>
                  <SelectItem value="servi">Servi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(order.status)}`}>
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">Table {order.tableNumber}</h3>
                      <p className="text-sm text-gray-600">{order.waiter}</p>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <Badge>{order.items.length} articles</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}€</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
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
              État des tables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {tables.map((table) => (
                <div key={table.id} className={`p-4 border rounded-lg text-center ${
                  table.status === 'libre' ? 'bg-green-50 border-green-200' :
                  table.status === 'occupée' ? 'bg-red-50 border-red-200' :
                  'bg-yellow-50 border-yellow-200'
                }`}>
                  <h3 className="font-medium">Table {table.number}</h3>
                  <p className="text-sm text-gray-600">{table.capacity} places</p>
                  <Badge className={
                    table.status === 'libre' ? 'bg-green-100 text-green-800' :
                    table.status === 'occupée' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChefHat className="mr-2 h-5 w-5" />
              Personnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staff.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={member.status === 'présent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {member.status === 'présent' ? 'Présent' : 'Absent'}
                        </Badge>
                        <Badge>{member.shift}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Utensils className="mr-2 h-5 w-5" />
              Menu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menu.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <Utensils className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <Badge>{item.stock} en stock</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.price}€</p>
                    <Badge className={item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {item.available ? 'Disponible' : 'Indisponible'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 