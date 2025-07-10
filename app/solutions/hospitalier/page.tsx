"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { supabase } from "@/lib/supabase/client";
import { Activity, AlertCircle, Bed, Calendar, Clock, Edit, Eye, FileText, Filter, Heart, Pill, Plus, Stethoscope, Users } from 'lucide-react';
import { useEffect, useState } from "react";

interface HotelStats {
  totalRooms: number;
  totalClients: number;
  totalReservations: number;
  totalRevenue: number;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  phone: string;
  email: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  lastVisit: string;
  nextAppointment?: string;
  status: 'active' | 'inactive' | 'emergency';
  doctor: string;
  room?: string;
}

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'surgery' | 'emergency' | 'follow-up';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes: string;
}

export default function HotelDashboard() {
  const [stats, setStats] = useState<HotelStats>({
    totalRooms: 0,
    totalClients: 0,
    totalReservations: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('patients');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchStats();
    const mockPatients: Patient[] = [
      {
        id: '1',
        name: 'Marie Dubois',
        age: 45,
        gender: 'F',
        phone: '+33 6 12 34 56 78',
        email: 'marie.dubois@email.com',
        bloodType: 'A+',
        allergies: ['Pénicilline', 'Latex'],
        conditions: ['Hypertension', 'Diabète type 2'],
        lastVisit: '2024-01-15',
        nextAppointment: '2024-02-20',
        status: 'active',
        doctor: 'Dr. Martin',
        room: 'A12'
      },
      {
        id: '2',
        name: 'Jean Leroy',
        age: 62,
        gender: 'M',
        phone: '+33 6 98 76 54 32',
        email: 'jean.leroy@email.com',
        bloodType: 'O-',
        allergies: ['Aucune'],
        conditions: ['Cardiopathie'],
        lastVisit: '2024-01-20',
        status: 'active',
        doctor: 'Dr. Bernard'
      },
      {
        id: '3',
        name: 'Sophie Martin',
        age: 28,
        gender: 'F',
        phone: '+33 6 55 44 33 22',
        email: 'sophie.martin@email.com',
        bloodType: 'B+',
        allergies: ['Aspirine'],
        conditions: ['Asthme'],
        lastVisit: '2024-01-18',
        nextAppointment: '2024-01-25',
        status: 'emergency',
        doctor: 'Dr. Dubois',
        room: 'E05'
      }
    ];

    const mockAppointments: Appointment[] = [
      {
        id: '1',
        patientId: '1',
        patientName: 'Marie Dubois',
        doctor: 'Dr. Martin',
        specialty: 'Cardiologie',
        date: '2024-02-20',
        time: '14:30',
        duration: 30,
        type: 'consultation',
        status: 'scheduled',
        notes: 'Contrôle tension artérielle'
      },
      {
        id: '2',
        patientId: '3',
        patientName: 'Sophie Martin',
        doctor: 'Dr. Dubois',
        specialty: 'Pneumologie',
        date: '2024-01-25',
        time: '10:00',
        duration: 45,
        type: 'follow-up',
        status: 'confirmed',
        notes: 'Suivi asthme, test fonction respiratoire'
      },
      {
        id: '3',
        patientId: '2',
        patientName: 'Jean Leroy',
        doctor: 'Dr. Bernard',
        specialty: 'Chirurgie cardiaque',
        date: '2024-02-15',
        time: '08:00',
        duration: 180,
        type: 'surgery',
        status: 'scheduled',
        notes: 'Pontage coronarien'
      }
    ];

    setPatients(mockPatients);
    setAppointments(mockAppointments);
  }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: rooms } = await supabase.from("hotel_rooms").select();
        const { data: clients } = await supabase.from("hotel_clients").select();
        const { data: reservations } = await supabase.from("hotel_reservations").select();
        const { data: bills } = await supabase.from("hotel_billing").select();
        setStats({
          totalRooms: rooms?.length || 0,
          totalClients: clients?.length || 0,
          totalReservations: reservations?.length || 0,
          totalRevenue: bills?.reduce((sum: number, b: any) => sum + (b.amount || 0), 0) || 0,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddPatient = () => {
    toast({
      title: "Nouveau patient",
      description: "Formulaire d'ajout de patient ouvert.",
    });
  };

  const handleAddAppointment = () => {
    toast({
      title: "Nouveau rendez-vous",
      description: "Formulaire de prise de rendez-vous ouvert.",
    });
  };

  // Statistiques hospitalières (mock)
  const statsHospitalieres = [
    { label: 'Patients actifs', value: patients.filter(p => p.status === 'active').length, icon: Users },
    { label: 'Rendez-vous aujourd\'hui', value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length, icon: Calendar },
    { label: 'Urgences', value: patients.filter(p => p.status === 'emergency').length, icon: AlertCircle },
    { label: 'Taux d\'occupation', value: '78%', icon: Bed }
  ];

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Solutions Hospitalières</h1>
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                <Activity className="w-3 h-3 mr-1" />
                {patients.filter(p => p.status === 'emergency').length} urgences
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Activity className="w-5 h-5" />
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau patient
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {statsHospitalieres.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar gauche - Filtres */}
          <div className="lg:col-span-1 space-y-8">
            {/* Filtres par statut */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statut</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant={filterStatus === 'all' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterStatus('all')}
                  >
                    Tous les statuts
                  </Button>
                  <Button 
                    variant={filterStatus === 'active' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterStatus('active')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Patients actifs
                  </Button>
                  <Button 
                    variant={filterStatus === 'emergency' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterStatus('emergency')}
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Urgences
                  </Button>
                  <Button 
                    variant={filterStatus === 'inactive' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterStatus('inactive')}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Inactifs
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={handleAddPatient}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau patient
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleAddAppointment}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Nouveau RDV
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Rapports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <div className="flex items-center mb-6">
              <Input
                placeholder="Rechercher un patient, médecin, spécialité..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mr-4"
              />
              <select
                value={activeTab}
                onChange={e => setActiveTab(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <option value="patients">Patients</option>
                <option value="appointments">Rendez-vous</option>
                <option value="emergencies">Urgences</option>
              </select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
                <TabsTrigger value="emergencies">Urgences</TabsTrigger>
              </TabsList>

              <TabsContent value="patients" className="space-y-6">
                {filteredPatients.map(patient => (
                  <Card key={patient.id} className={`hover:shadow-lg transition-shadow ${
                    patient.status === 'emergency' ? 'border-l-4 border-red-500' :
                    patient.status === 'active' ? 'border-l-4 border-green-500' :
                    'border-l-4 border-gray-500'
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={`/images/patients/${patient.id}.jpg`} />
                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{patient.name}</h3>
                            <p className="text-gray-600">{patient.age} ans, {patient.gender === 'M' ? 'Homme' : 'Femme'}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Stethoscope className="w-4 h-4 mr-1" />
                                {patient.doctor}
                              </span>
                              {patient.room && (
                                <span className="flex items-center">
                                  <Bed className="w-4 h-4 mr-1" />
                                  Chambre {patient.room}
                                </span>
                              )}
                              <span className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                {patient.bloodType}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{patient.doctor}</Badge>
                          <Badge className={
                            patient.status === 'active' ? 'bg-green-100 text-green-800' :
                            patient.status === 'emergency' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {patient.status === 'active' ? 'Actif' :
                             patient.status === 'emergency' ? 'Urgence' : 'Inactif'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">Contact:</span>
                          <p className="text-gray-600">{patient.phone}</p>
                          <p className="text-gray-600">{patient.email}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Dernière visite:</span>
                          <p className="text-gray-600">{new Date(patient.lastVisit).toLocaleDateString('fr-FR')}</p>
                          {patient.nextAppointment && (
                            <>
                              <span className="font-medium text-gray-900">Prochain RDV:</span>
                              <p className="text-gray-600">{new Date(patient.nextAppointment).toLocaleDateString('fr-FR')}</p>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Pill className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-gray-900">Allergies:</span>
                          <div className="flex flex-wrap gap-1">
                            {patient.allergies.map(allergy => (
                              <Badge key={allergy} variant="secondary" className="text-xs">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900">Conditions:</span>
                          <div className="flex flex-wrap gap-1">
                            {patient.conditions.map(condition => (
                              <Badge key={condition} variant="outline" className="text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Dossier
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          RDV
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="appointments" className="space-y-6">
                {filteredAppointments.map(appointment => (
                  <Card key={appointment.id} className={`hover:shadow-lg transition-shadow ${
                    appointment.status === 'in-progress' ? 'border-l-4 border-blue-500' :
                    appointment.status === 'completed' ? 'border-l-4 border-green-500' :
                    appointment.status === 'cancelled' ? 'border-l-4 border-red-500' :
                    'border-l-4 border-yellow-500'
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                            <p className="text-gray-600">{appointment.doctor} - {appointment.specialty}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(appointment.date).toLocaleDateString('fr-FR')}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {appointment.time} ({appointment.duration} min)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{appointment.type}</Badge>
                          <Badge className={
                            appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                            appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            appointment.status === 'in-progress' ? 'bg-purple-100 text-purple-800' :
                            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {appointment.status === 'scheduled' ? 'Programmé' :
                             appointment.status === 'confirmed' ? 'Confirmé' :
                             appointment.status === 'in-progress' ? 'En cours' :
                             appointment.status === 'completed' ? 'Terminé' : 'Annulé'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{appointment.notes}</p>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                          <Stethoscope className="w-4 h-4 mr-2" />
                          Commencer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="emergencies" className="space-y-6">
                {filteredPatients.filter(p => p.status === 'emergency').map(patient => (
                  <Card key={patient.id} className="border-l-4 border-red-500 bg-red-50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={`/images/patients/${patient.id}.jpg`} />
                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{patient.name}</h3>
                            <p className="text-gray-600">{patient.age} ans, {patient.gender === 'M' ? 'Homme' : 'Femme'}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Stethoscope className="w-4 h-4 mr-1" />
                                {patient.doctor}
                              </span>
                              {patient.room && (
                                <span className="flex items-center">
                                  <Bed className="w-4 h-4 mr-1" />
                                  Chambre {patient.room}
                                </span>
                              )}
                              <span className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                {patient.bloodType}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{patient.doctor}</Badge>
                          <Badge className="bg-red-100 text-red-800">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            URGENCE
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">Contact:</span>
                          <p className="text-gray-600">{patient.phone}</p>
                          <p className="text-gray-600">{patient.email}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Dernière visite:</span>
                          <p className="text-gray-600">{new Date(patient.lastVisit).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Pill className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-gray-900">Allergies:</span>
                          <div className="flex flex-wrap gap-1">
                            {patient.allergies.map(allergy => (
                              <Badge key={allergy} variant="secondary" className="text-xs">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900">Conditions:</span>
                          <div className="flex flex-wrap gap-1">
                            {patient.conditions.map(condition => (
                              <Badge key={condition} variant="outline" className="text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Dossier
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700" size="sm">
                          <Stethoscope className="w-4 h-4 mr-2" />
                          Traitement urgent
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          RDV urgent
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 