"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowLeft, Save, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
}

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface EditTransactionClientProps {
  id: string;
}

export default function EditTransactionClient({ id }: EditTransactionClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState({
    type: '',
    propertyId: '',
    clientId: '',
    amount: '',
    commission: '',
    date: new Date(),
    status: 'en_cours',
    description: '',
    paymentMethod: '',
    reference: ''
  });

  useEffect(() => {
    fetchProperties();
    fetchClients();
    fetchTransaction();
  }, [id]);

  const fetchProperties = async () => {
    // Simuler les propriétés
    setProperties([
      { id: '1', title: 'Appartement Paris', address: '12 rue de Rivoli', price: 500000 },
      { id: '2', title: 'Maison Lyon', address: '8 avenue des Alpes', price: 350000 }
    ]);
  };

  const fetchClients = async () => {
    // Simuler les clients
    setClients([
      { id: '1', firstName: 'Alice', lastName: 'Martin', email: 'alice@email.com' },
      { id: '2', firstName: 'Bob', lastName: 'Durand', email: 'bob@email.com' }
    ]);
  };

  const fetchTransaction = async () => {
    setFetching(true);
    // Simuler la transaction
    setTimeout(() => {
      setFormData({
        type: 'vente',
        propertyId: '1',
        clientId: '1',
        amount: '500000',
        commission: '15000',
        date: new Date(),
        status: 'en_cours',
        description: 'Vente appartement Paris',
        paymentMethod: 'virement',
        reference: 'TX12345'
      });
      setFetching(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simuler la sauvegarde
    setTimeout(() => {
      toast({ title: 'Succès', description: 'Transaction modifiée avec succès.' });
      router.push('/solutions/immobilier/transactions');
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        <span className="ml-4 text-gray-600">Chargement de la transaction...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Modifier la transaction</h1>
        <p className="text-gray-600 mt-2">Éditez les informations de la transaction immobilière</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Informations de la transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Type de transaction *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vente">Vente</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="achat">Achat</SelectItem>
                    <SelectItem value="gestion">Gestion locative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyId">Propriété *</Label>
                <Select value={formData.propertyId} onValueChange={(value) => handleInputChange('propertyId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une propriété" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property: any) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.title} - {property.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientId">Client *</Label>
                <Select value={formData.clientId} onValueChange={(value) => handleInputChange('clientId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client: any) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.firstName} {client.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Montant (€) *</Label>
                <Input id="amount" type="number" value={formData.amount} onChange={e => handleInputChange('amount', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commission">Commission (€)</Label>
                <Input id="commission" type="number" value={formData.commission} onChange={e => handleInputChange('commission', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input id="date" type="date" value={format(formData.date, 'yyyy-MM-dd')} onChange={e => handleInputChange('date', new Date(e.target.value))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en_cours">En cours</SelectItem>
                    <SelectItem value="terminee">Terminée</SelectItem>
                    <SelectItem value="annulee">Annulée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={e => handleInputChange('description', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Mode de paiement</Label>
                <Input id="paymentMethod" value={formData.paymentMethod} onChange={e => handleInputChange('paymentMethod', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Référence</Label>
                <Input id="reference" value={formData.reference} onChange={e => handleInputChange('reference', e.target.value)} />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full mt-4">
              {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 