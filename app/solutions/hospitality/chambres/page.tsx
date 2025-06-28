'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Bed } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Room {
  id: string;
  roomNumber: string;
  type: string;
  capacity: number;
  price: number;
  status: 'available' | 'occupied' | 'maintenance';
  created_at: string;
}

export default function ChambresPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hospitality/rooms');
      if (response.ok) {
        const data = await response.json();
        setRooms(data.rooms || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des chambres:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette chambre ?')) return;
    try {
      const response = await fetch(`/api/hospitality/rooms/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast({ title: 'Chambre supprimée' });
        fetchRooms();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast({ title: 'Erreur', description: 'Erreur lors de la suppression', variant: 'destructive' });
    }
  };

  const filteredRooms = rooms.filter(room =>
    (room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     room.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === '' || room.type === typeFilter) &&
    (statusFilter === '' || room.status === statusFilter)
  );

  const formatPrice = (price: number) => price.toFixed(2) + ' €';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement des chambres...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des chambres</h1>
          <p className="text-gray-600 mt-2">Liste et gestion des chambres hôtelières</p>
        </div>
        <Button onClick={() => router.push('/solutions/hospitality/chambres/creer')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle chambre
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par numéro ou type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous</SelectItem>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous</SelectItem>
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="occupied">Occupée</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredRooms.length === 0 ? (
            <div className="text-center py-8">
              <Bed className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune chambre trouvée</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || typeFilter || statusFilter ? 'Aucune chambre ne correspond à vos critères.' : 'Commencez par créer une nouvelle chambre.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRooms.map((room: any) => (
                <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Bed className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Chambre {room.roomNumber}</h3>
                      <p className="text-sm text-gray-500">{room.type}</p>
                      <p className="text-xs text-gray-400">Capacité: {room.capacity} personne(s)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(room.price)}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${room.status === 'available' ? 'bg-green-100 text-green-600' : room.status === 'occupied' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {room.status === 'available' ? 'Disponible' : room.status === 'occupied' ? 'Occupée' : 'Maintenance'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => router.push(`/solutions/hospitality/chambres/${room.id}`)}>
                        Voir
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => router.push(`/solutions/hospitality/chambres/${room.id}/edit`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(room.id)} className="text-red-600 hover:text-red-700">
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