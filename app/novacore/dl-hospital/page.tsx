'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Stethoscope, Users, Activity, Clock, Search, Plus, Edit, Eye, Trash2, Download, MapPin, Calendar, CheckCircle, AlertTriangle, Heart, Bed } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  room: string;
  department: string;
  status: 'admis' | 'en observation' | 'sortie' | 'transfert';
  doctor: string;
  admissionDate: string;
  diagnosis: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  status: 'présent' | 'absent' | 'en consultation';
  patients: number;
}

interface Room {
  id: string;
  number: string;
  department: string;
  capacity: number;
  occupied: number;
  status: 'disponible' | 'occupée' | 'maintenance';
}

interface Emergency {
  id: string;
  patientName: string;
  severity: 'critique' | 'urgent' | 'normal';
  department: string;
  time: string;
  status: 'en attente' | 'en cours' | 'terminé';
  assignedDoctor: string;
}

export default function DLHospitalPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setPatients([
      {
        id: '1',
        name: 'Jean Dupont',
        age: 45,
        gender: 'M',
        room: 'A-101',
        department: 'Cardiologie',
        status: 'admis',
        doctor: 'Dr. Martin',
        admissionDate: '2024-02-10',
        diagnosis: 'Infarctus du myocarde'
      },
      {
        id: '2',
        name: 'Marie Martin',
        age: 32,
        gender: 'F',
        room: 'B-205',
        department: 'Pédiatrie',
        status: 'en observation',
        doctor: 'Dr. Dubois',
        admissionDate: '2024-02-12',
        diagnosis: 'Pneumonie'
      }
    ]);
    setDoctors([
      { id: '1', name: 'Dr. Martin', specialty: 'Cardiologue', department: 'Cardiologie', status: 'présent', patients: 3 },
      { id: '2', name: 'Dr. Dubois', specialty: 'Pédiatre', department: 'Pédiatrie', status: 'en consultation', patients: 2 },
      { id: '3', name: 'Dr. Moreau', specialty: 'Chirurgien', department: 'Chirurgie', status: 'présent', patients: 1 }
    ]);
    setRooms([
      { id: '1', number: 'A-101', department: 'Cardiologie', capacity: 2, occupied: 1, status: 'occupée' },
      { id: '2', number: 'A-102', department: 'Cardiologie', capacity: 2, occupied: 0, status: 'disponible' },
      { id: '3', number: 'B-205', department: 'Pédiatrie', capacity: 1, occupied: 1, status: 'occupée' },
      { id: '4', number: 'C-301', department: 'Chirurgie', capacity: 3, occupied: 2, status: 'occupée' }
    ]);
    setEmergencies([
      {
        id: '1',
        patientName: 'Pierre Durand',
        severity: 'critique',
        department: 'Urgences',
        time: '20:15',
        status: 'en cours',
        assignedDoctor: 'Dr. Martin'
      },
      {
        id: '2',
        patientName: 'Sophie Bernard',
        severity: 'urgent',
        department: 'Traumatologie',
        time: '19:45',
        status: 'en attente',
        assignedDoctor: 'Dr. Moreau'
      }
    ]);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'admis': return 'bg-blue-100 text-blue-800';
      case 'en observation': return 'bg-yellow-100 text-yellow-800';
      case 'sortie': return 'bg-green-100 text-green-800';
      case 'transfert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critique': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement du CRM hôpital...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CHU - DL Hospital CRM</h1>
            <p className="text-gray-600">Gestion des patients, médecins et services hospitaliers</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Patients</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Médecins</p>
                <p className="text-2xl font-bold">{doctors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bed className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Lits occupés</p>
                <p className="text-2xl font-bold">{rooms.reduce((sum, room) => sum + room.occupied, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Urgences</p>
                <p className="text-2xl font-bold">{emergencies.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Patients hospitalisés
              </CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau patient
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un patient..."
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
                  <SelectItem value="admis">Admis</SelectItem>
                  <SelectItem value="en observation">En observation</SelectItem>
                  <SelectItem value="sortie">Sortie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(patient.status)}`}>
                      <Heart className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{patient.name}</h3>
                      <p className="text-sm text-gray-600">{patient.age} ans, {patient.gender} - {patient.room}</p>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </Badge>
                        <Badge>{patient.department}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{patient.doctor}</p>
                    <p className="text-xs text-gray-500">Admis le {patient.admissionDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Stethoscope className="mr-2 h-5 w-5" />
              Médecins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{doctor.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={doctor.status === 'présent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {doctor.status === 'présent' ? 'Présent' : doctor.status === 'en consultation' ? 'En consultation' : 'Absent'}
                        </Badge>
                        <Badge>{doctor.patients} patients</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{doctor.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bed className="mr-2 h-5 w-5" />
              État des chambres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {rooms.map((room) => (
                <div key={room.id} className={`p-4 border rounded-lg text-center ${
                  room.status === 'disponible' ? 'bg-green-50 border-green-200' :
                  room.status === 'occupée' ? 'bg-red-50 border-red-200' :
                  'bg-yellow-50 border-yellow-200'
                }`}>
                  <h3 className="font-medium">Chambre {room.number}</h3>
                  <p className="text-sm text-gray-600">{room.department}</p>
                  <p className="text-sm text-gray-600">{room.occupied}/{room.capacity} lits</p>
                  <Badge className={
                    room.status === 'disponible' ? 'bg-green-100 text-green-800' :
                    room.status === 'occupée' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Urgences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencies.map((emergency) => (
                <div key={emergency.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getSeverityColor(emergency.severity)}`}>
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{emergency.patientName}</h3>
                      <p className="text-sm text-gray-600">{emergency.department}</p>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={getSeverityColor(emergency.severity)}>
                          {emergency.severity.charAt(0).toUpperCase() + emergency.severity.slice(1)}
                        </Badge>
                        <Badge className={emergency.status === 'en cours' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                          {emergency.status.charAt(0).toUpperCase() + emergency.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{emergency.assignedDoctor}</p>
                    <p className="text-xs text-gray-500">{emergency.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 