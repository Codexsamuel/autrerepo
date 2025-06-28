'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Trash2, Signal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SignalType {
  id: string;
  symbol: string;
  direction: 'buy' | 'sell';
  confidence: number;
  created_at: string;
  status: 'active' | 'expired';
}

export default function SignauxPage() {
  const router = useRouter();
  const [signals, setSignals] = useState<SignalType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [directionFilter, setDirectionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/trading/signals');
      if (response.ok) {
        const data = await response.json();
        setSignals(data.signals || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des signaux:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce signal ?')) return;
    try {
      const response = await fetch(`/api/trading/signals/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast({ title: 'Signal supprimé' });
        fetchSignals();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast({ title: 'Erreur', description: 'Erreur lors de la suppression', variant: 'destructive' });
    }
  };

  const filteredSignals = signals.filter(signal =>
    (signal.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (directionFilter === '' || signal.direction === directionFilter) &&
    (statusFilter === '' || signal.status === statusFilter)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement des signaux...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des signaux</h1>
          <p className="text-gray-600 mt-2">Liste et gestion des signaux de trading</p>
        </div>
        <Button onClick={() => router.push('/solutions/trading/signaux/creer')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau signal
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par symbole..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={directionFilter} onValueChange={setDirectionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes</SelectItem>
                <SelectItem value="buy">Achat</SelectItem>
                <SelectItem value="sell">Vente</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="expired">Expiré</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredSignals.length === 0 ? (
            <div className="text-center py-8">
              <Signal className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun signal trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || directionFilter || statusFilter ? 'Aucun signal ne correspond à vos critères.' : 'Commencez par créer un nouveau signal.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSignals.map((signal: any) => (
                <div key={signal.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Signal className={`h-8 w-8 ${signal.direction === 'buy' ? 'text-green-600' : 'text-red-600'}`} />
                    <div>
                      <h3 className="font-medium">{signal.symbol}</h3>
                      <p className="text-sm text-gray-500">{signal.direction === 'buy' ? 'Achat' : 'Vente'}</p>
                      <p className="text-xs text-gray-400">{new Date(signal.created_at).toLocaleString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold">Confiance : {signal.confidence}%</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${signal.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        {signal.status === 'active' ? 'Actif' : 'Expiré'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(signal.id)} className="text-red-600 hover:text-red-700">
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