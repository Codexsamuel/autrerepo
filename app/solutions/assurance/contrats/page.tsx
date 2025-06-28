'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface InsuranceContract {
  id: string;
  contractNumber: string;
  type: string;
  clientName: string;
  premium: number;
  coverage: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
}

export default function ContratsPage() {
  const router = useRouter();
  const [contracts, setContracts] = useState<InsuranceContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/assurance/contracts');
      if (response.ok) {
        const data = await response.json();
        setContracts(data.contracts || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des contrats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) return;
    
    try {
      const response = await fetch(`/api/assurance/contracts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast({ title: 'Contrat supprimé avec succès' });
        fetchContracts();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast({ 
        title: 'Erreur', 
        description: 'Erreur lors de la suppression du contrat',
        variant: 'destructive'
      });
    }
  };

  const filteredContracts = contracts.filter(contract =>
    (contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contract.clientName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === '' || contract.type === typeFilter)
  );

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement des contrats...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des contrats</h1>
          <p className="text-gray-600 mt-2">Gérez les contrats d'assurance</p>
        </div>
        <Button onClick={() => router.push('/solutions/assurance/contrats/creer')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau contrat
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par numéro de contrat ou client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="auto">Automobile</SelectItem>
                <SelectItem value="habitation">Habitation</SelectItem>
                <SelectItem value="vie">Vie</SelectItem>
                <SelectItem value="sante">Santé</SelectItem>
                <SelectItem value="professionnelle">Professionnelle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredContracts.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun contrat trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || typeFilter ? 'Aucun contrat ne correspond à vos critères.' : 'Commencez par créer un nouveau contrat.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContracts.map((contract: any) => (
                <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{contract.contractNumber}</h3>
                      <p className="text-sm text-gray-500">{contract.clientName}</p>
                      <p className="text-xs text-gray-400">{contract.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold">{formatAmount(contract.premium)}</p>
                      <p className="text-sm text-gray-500">Prime annuelle</p>
                      <p className="text-xs text-gray-400">Couverture: {formatAmount(contract.coverage)}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                        {contract.status === 'active' ? 'Actif' : contract.status === 'expired' ? 'Expiré' : 'Annulé'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push(`/solutions/assurance/contrats/${contract.id}`)}
                      >
                        Voir détails
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push(`/solutions/assurance/contrats/${contract.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(contract.id)}
                        className="text-red-600 hover:text-red-700"
                      >
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