'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  loyaltyPoints: number;
  created_at: string;
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hospitality/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data.clients || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce client ?')) return;
    try {
      const response = await fetch(`/api/hospitality/clients/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast({ title: 'Client supprimé' });
        fetchClients();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast({ title: 'Erreur', description: 'Erreur lors de la suppression', variant: 'destructive' });
    }
  };

  const filteredClients = clients.filter(client =>
    (client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     client.phone.includes(searchTerm))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement des clients...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des clients</h1>
          <p className="text-gray-600 mt-2">Liste et gestion des clients hôteliers</p>
        </div>
        <Button onClick={() => router.push('/solutions/hospitality/clients/creer')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau client
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, email ou téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredClients.length === 0 ? (
            <div className="text-center py-8">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun client trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Aucun client ne correspond à vos critères.' : 'Commencez par créer un nouveau client.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <User className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{client.firstName} {client.lastName}</h3>
                      <p className="text-sm text-gray-500">{client.email}</p>
                      <p className="text-xs text-gray-400">{client.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold">{client.loyaltyPoints} points fidélité</p>
                      <p className="text-xs text-gray-400">{new Date(client.created_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => router.push(`/solutions/hospitality/clients/${client.id}`)}>
                        Voir
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => router.push(`/solutions/hospitality/clients/${client.id}/edit`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(client.id)} className="text-red-600 hover:text-red-700">
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