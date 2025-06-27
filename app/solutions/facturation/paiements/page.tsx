'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Payment {
  id: string;
  paymentNumber: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  method: 'card' | 'transfer' | 'cash';
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
}

export default function PaiementsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/facturation/payments');
      if (response.ok) {
        const data = await response.json();
        setPayments(data.payments || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des paiements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce paiement ?')) return;
    try {
      const response = await fetch(`/api/facturation/payments/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast({ title: 'Paiement supprimé' });
        fetchPayments();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast({ title: 'Erreur', description: 'Erreur lors de la suppression', variant: 'destructive' });
    }
  };

  const filteredPayments = payments.filter(payment =>
    (payment.paymentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     payment.clientName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (methodFilter === '' || payment.method === methodFilter) &&
    (statusFilter === '' || payment.status === statusFilter)
  );

  const formatAmount = (amount: number) => amount.toFixed(2) + ' €';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement des paiements...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des paiements</h1>
          <p className="text-gray-600 mt-2">Liste et gestion des paiements</p>
        </div>
        <Button onClick={() => router.push('/solutions/facturation/paiements/creer')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau paiement
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par numéro de paiement, facture ou client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes</SelectItem>
                <SelectItem value="card">Carte</SelectItem>
                <SelectItem value="transfer">Virement</SelectItem>
                <SelectItem value="cash">Espèces</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="failed">Échoué</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPayments.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun paiement trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || methodFilter || statusFilter ? 'Aucun paiement ne correspond à vos critères.' : 'Commencez par créer un nouveau paiement.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-medium">{payment.paymentNumber}</h3>
                      <p className="text-sm text-gray-500">Facture: {payment.invoiceNumber}</p>
                      <p className="text-sm text-gray-500">{payment.clientName}</p>
                      <p className="text-xs text-gray-400">{new Date(payment.created_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold">{formatAmount(payment.amount)}</p>
                      <p className="text-sm text-gray-500">
                        {payment.method === 'card' ? 'Carte' : payment.method === 'transfer' ? 'Virement' : 'Espèces'}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${payment.status === 'completed' ? 'bg-green-100 text-green-600' : payment.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                        {payment.status === 'completed' ? 'Terminé' : payment.status === 'pending' ? 'En attente' : 'Échoué'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => router.push(`/solutions/facturation/paiements/${payment.id}`)}>
                        Voir
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => router.push(`/solutions/facturation/paiements/${payment.id}/edit`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(payment.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 