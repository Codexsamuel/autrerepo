'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Receipt } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Billing {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  created_at: string;
}

export default function FacturationPage() {
  const router = useRouter();
  const [billings, setBillings] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchBillings();
  }, []);

  const fetchBillings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hospitality/billing');
      if (response.ok) {
        const data = await response.json();
        setBillings(data.billings || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des factures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette facture ?')) return;
    try {
      const response = await fetch(`/api/hospitality/billing/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast({ title: 'Facture supprimée' });
        fetchBillings();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast({ title: 'Erreur', description: 'Erreur lors de la suppression', variant: 'destructive' });
    }
  };

  const filteredBillings = billings.filter(billing =>
    (billing.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     billing.clientName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || billing.status === statusFilter)
  );

  const formatAmount = (amount: number) => amount.toFixed(2) + ' €';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement des factures...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion de la facturation</h1>
          <p className="text-gray-600 mt-2">Liste et gestion des factures hôtelières</p>
        </div>
        <Button onClick={() => router.push('/solutions/hospitality/facturation/creer')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle facture
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par numéro de facture ou client..."
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
                <SelectItem value="paid">Payée</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="overdue">En retard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredBillings.length === 0 ? (
            <div className="text-center py-8">
              <Receipt className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune facture trouvée</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter ? 'Aucune facture ne correspond à vos critères.' : 'Commencez par créer une nouvelle facture.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBillings.map((billing) => (
                <div key={billing.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Receipt className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{billing.invoiceNumber}</h3>
                      <p className="text-sm text-gray-500">{billing.clientName}</p>
                      <p className="text-xs text-gray-400">{new Date(billing.created_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold">{formatAmount(billing.amount)}</p>
                      <p className="text-sm text-gray-500">Échéance: {new Date(billing.dueDate).toLocaleDateString('fr-FR')}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${billing.status === 'paid' ? 'bg-green-100 text-green-600' : billing.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                        {billing.status === 'paid' ? 'Payée' : billing.status === 'pending' ? 'En attente' : 'En retard'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => router.push(`/solutions/hospitality/facturation/${billing.id}`)}>
                        Voir
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => router.push(`/solutions/hospitality/facturation/${billing.id}/edit`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(billing.id)} className="text-red-600 hover:text-red-700">
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