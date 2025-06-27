'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'confirme' | 'en_attente' | 'annule';
  notes: string;
}

export default function RendezVousPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // Simuler les données pour l'exemple
      setAppointments([
        {
          id: '1',
          patientName: 'Marie Dupont',
          doctorName: 'Dr. Martin',
          date: '2024-01-15',
          time: '14:30',
          type: 'Consultation',
          status: 'confirme',
          notes: 'Suivi post-opératoire'
        },
        {
          id: '2',
          patientName: 'Jean Martin',
          doctorName: 'Dr. Dubois',
          date: '2024-01-15',
          time: '16:00',
          type: 'Examen',
          status: 'en_attente',
          notes: 'Analyse sanguine'
        }
      ]);
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirme': return 'text-green-600 bg-green-100';
      case 'en_attente': return 'text-yellow-600 bg-yellow-100';
      case 'annule': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    (appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || appointment.status === statusFilter)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement des rendez-vous...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des rendez-vous</h1>
          <p className="text-gray-600 mt-2">Planifiez et gérez les rendez-vous patients</p>
        </div>
        <Button onClick={() => router.push('/solutions/hospitalier/rendez-vous/creer')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau rendez-vous
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par patient ou médecin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les statuts</SelectItem>
                <SelectItem value="confirme">Confirmé</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="annule">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun rendez-vous trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter ? 'Aucun rendez-vous ne correspond à vos critères.' : 'Commencez par créer un nouveau rendez-vous.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{appointment.patientName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Stethoscope className="h-4 w-4 mr-1" />
                          {appointment.doctorName}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status === 'confirme' ? 'Confirmé' : 
                       appointment.status === 'en_attente' ? 'En attente' : 'Annulé'}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push(`/solutions/hospitalier/rendez-vous/${appointment.id}`)}
                      >
                        Voir détails
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push(`/solutions/hospitalier/rendez-vous/${appointment.id}/edit`)}
                      >
                        Modifier
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