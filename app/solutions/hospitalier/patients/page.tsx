'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, User, Phone, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Patient {
  id: string;
  patientNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  emergencyContact: string;
  status: 'actif' | 'inactif' | 'hospitalise';
}

export default function PatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hospitalier/patients');
      if (response.ok) {
        const data = await response.json();
        setPatients(data.patients || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) return;
    
    try {
      const response = await fetch(`/api/hospitalier/patients/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast({ title: 'Patient supprimé avec succès' });
        fetchPatients();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast({ 
        title: 'Erreur', 
        description: 'Erreur lors de la suppression du patient',
        variant: 'destructive'
      });
    }
  };

  const filteredPatients = patients.filter(patient =>
    (patient.patientNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     patient.phone.includes(searchTerm)) &&
    (statusFilter === '' || patient.status === statusFilter)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif': return 'text-green-600 bg-green-100';
      case 'inactif': return 'text-gray-600 bg-gray-100';
      case 'hospitalise': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement des patients...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des patients</h1>
          <p className="text-gray-600 mt-2">Gérez les dossiers patients</p>
        </div>
        <Button onClick={() => router.push('/solutions/hospitalier/patients/creer')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau patient
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par numéro patient, nom, prénom ou téléphone..."
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
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
                <SelectItem value="hospitalise">Hospitalisé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPatients.length === 0 ? (
            <div className="text-center py-8">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun patient trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter ? 'Aucun patient ne correspond à vos critères.' : 'Commencez par créer un nouveau patient.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPatients.map((patient: any) => (
                <Card key={patient.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{patient.patientNumber}</span>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status === 'actif' ? 'Actif' : 
                         patient.status === 'inactif' ? 'Inactif' : 'Hospitalisé'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {calculateAge(patient.dateOfBirth)} ans • {patient.gender}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{patient.phone}</span>
                        </div>
                        {patient.email && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{patient.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <p className="text-xs text-gray-500">
                          Groupe sanguin: <span className="font-medium">{patient.bloodType}</span>
                        </p>
                      </div>

                      <div className="flex space-x-2 pt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/solutions/hospitalier/patients/${patient.id}`)}
                          className="flex-1"
                        >
                          Voir dossier
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => router.push(`/solutions/hospitalier/patients/${patient.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(patient.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}