'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Credit {
  id: string;
  clientName: string;
  amount: number;
  remainingAmount: number;
  monthlyPayment: number;
  interestRate: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paid' | 'defaulted';
  nextPaymentDate: string;
}

export default function CreditsPage() {
  const router = useRouter();
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/banque/credits');
      if (response.ok) {
        const data = await response.json();
        setCredits(data.credits || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des crédits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce crédit ?')) return;
    
    try {
      const response = await fetch(`/api/banque/credits/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast({ title: 'Crédit supprimé avec succès' });
        fetchCredits();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast({ 
        title: 'Erreur', 
        description: 'Erreur lors de la suppression du crédit',
        variant: 'destructive'
      });
    }
  };

  const filteredCredits = credits.filter(credit =>
    credit.clientName.toLowerCase().includes(searchTerm.toLowerCase())
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
      case 'paid': return 'text-blue-600 bg-blue-100';
      case 'defaulted': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressPercentage = (credit: Credit) => {
    return ((credit.amount - credit.remainingAmount) / credit.amount) * 100;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement des crédits...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des crédits</h1>
          <p className="text-gray-600 mt-2">Gérez les crédits et prêts bancaires</p>
        </div>
        <Button onClick={() => router.push('/solutions/banque/credits/creer')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau crédit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom de client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCredits.length === 0 ? (
            <div className="text-center py-8">
              <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun crédit trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Aucun crédit ne correspond à votre recherche.' : 'Commencez par créer un nouveau crédit.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCredits.map((credit) => (
                <div key={credit.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <DollarSign className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{credit.clientName}</h3>
                        <p className="text-sm text-gray-500">
                          {formatAmount(credit.amount)} à {credit.interestRate}% - 
                          Échéance: {new Date(credit.endDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold">{formatAmount(credit.remainingAmount)}</p>
                        <p className="text-sm text-gray-500">Restant à payer</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(credit.status)}`}>
                          {credit.status === 'active' ? 'Actif' : credit.status === 'paid' ? 'Remboursé' : 'En défaut'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => router.push(`/solutions/banque/credits/${credit.id}`)}
                        >
                          Voir détails
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => router.push(`/solutions/banque/credits/${credit.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(credit.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression du remboursement</span>
                      <span>{getProgressPercentage(credit).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${getProgressPercentage(credit)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Prochain paiement: {new Date(credit.nextPaymentDate).toLocaleDateString('fr-FR')}</span>
                      <span>Mensualité: {formatAmount(credit.monthlyPayment)}</span>
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