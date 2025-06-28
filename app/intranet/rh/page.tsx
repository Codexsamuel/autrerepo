"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Briefcase,
  UserPlus,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { Header } from '@/components/layout/header';

const employees = [
  {
    id: 1,
    name: "Samuel OBAM DAY",
    position: "Expert Gestion & Optimisation Parcours Client",
    department: "Technique",
    email: "samuel@dlsolutions.com",
    phone: "+237 694 341 586",
    status: "actif",
    startDate: "2023-01-15",
    salary: "€2,500",
    avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png"
  },
  {
    id: 2,
    name: "NGA SABINE LUCIE",
    position: "Expert Gestion des Finances",
    department: "Finance",
    email: "lucie@dlsolutions.com",
    phone: "+237 694 341 587",
    status: "actif",
    startDate: "2023-02-01",
    salary: "€2,200",
    avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1748393838/Lucie_lexs2m.jpg"
  },
  {
    id: 3,
    name: "ESSONO Christian",
    position: "Responsable Technique",
    department: "Technique",
    email: "christian@dlsolutions.com",
    phone: "+237 694 341 588",
    status: "actif",
    startDate: "2023-03-10",
    salary: "€2,800",
    avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425661/CHRISTIAN_ESSONO_thisjg.jpg"
  },
  {
    id: 4,
    name: "FRANCK Marien BECKAM",
    position: "Adjoint Technique, Photographe & Monteur",
    department: "Technique",
    email: "franck@dlsolutions.com",
    phone: "+237 694 341 589",
    status: "actif",
    startDate: "2023-04-05",
    salary: "€1,800",
    avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425681/FRANCK_MARIEN_BECKAM_arwwpq.jpg"
  },
  {
    id: 5,
    name: "Pierre ESSOMBA",
    position: "Développeur Full-Stack",
    department: "Technique",
    email: "pierre@dlsolutions.com",
    phone: "+237 694 341 590",
    status: "actif",
    startDate: "2024-01-15",
    salary: "€2,300",
    avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg"
  },
  {
    id: 6,
    name: "Marie NGUEMO",
    position: "Designer UI/UX",
    department: "Créatif",
    email: "marie@dlsolutions.com",
    phone: "+237 694 341 591",
    status: "actif",
    startDate: "2024-02-01",
    salary: "€1,900",
    avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg"
  },
  {
    id: 7,
    name: "Jean DUPONT",
    position: "Chef de Projet",
    department: "Management",
    email: "jean@dlsolutions.com",
    phone: "+237 694 341 592",
    status: "actif",
    startDate: "2024-03-01",
    salary: "€3,200",
    avatar: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993228/Jean_Dupont_xjsear.jpg"
  }
];

const leaveRequests = [
  {
    id: 1,
    employee: "Samuel OBAM DAY",
    type: "Congé annuel",
    startDate: "2024-12-20",
    endDate: "2024-12-27",
    status: "approuvé",
    days: 8
  },
  {
    id: 2,
    employee: "Marie NGUEMO",
    type: "Congé maladie",
    startDate: "2024-12-15",
    endDate: "2024-12-17",
    status: "en attente",
    days: 3
  },
  {
    id: 3,
    employee: "Jean DUPONT",
    type: "Formation",
    startDate: "2024-12-25",
    endDate: "2024-12-26",
    status: "approuvé",
    days: 2
  }
];

export default function RHPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('employees');

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedDepartment === 'all' || employee.department === selectedDepartment)
  );

  const stats = [
    { label: 'Employés actifs', value: employees.length, icon: Users, color: 'text-blue-600' },
    { label: 'Congés en cours', value: leaveRequests.filter(l => l.status === 'en attente').length, icon: Calendar, color: 'text-orange-600' },
    { label: 'Masse salariale', value: '€18.7K', icon: DollarSign, color: 'text-green-600' },
    { label: 'Formations planifiées', value: '3', icon: Briefcase, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Ressources Humaines" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-6">
          <button
            onClick={() => setActiveTab('employees')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'employees' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Employés
          </button>
          <button
            onClick={() => setActiveTab('leaves')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'leaves' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Congés
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'payroll' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Paie
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'training' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Formations
          </button>
        </div>

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <div>
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un employé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les départements</option>
                <option value="Technique">Technique</option>
                <option value="Finance">Finance</option>
                <option value="Créatif">Créatif</option>
                <option value="Management">Management</option>
              </select>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter employé
              </Button>
            </div>

            {/* Employees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee: any) => (
                <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                        <Badge variant="outline" className="mt-1">
                          {employee.department}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Téléphone:</span>
                        <span>{employee.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salaire:</span>
                        <span className="font-semibold">{employee.salary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <Badge variant={employee.status === 'actif' ? 'default' : 'secondary'}>
                          {employee.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Leaves Tab */}
        {activeTab === 'leaves' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion des congés</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle demande
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Demandes de congés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveRequests.map((request: any) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{request.employee}</h3>
                        <p className="text-sm text-gray-600">{request.type}</p>
                        <p className="text-sm text-gray-500">
                          {request.startDate} - {request.endDate} ({request.days} jours)
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          request.status === 'approuvé' ? 'default' : 
                          request.status === 'en attente' ? 'secondary' : 'destructive'
                        }>
                          {request.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payroll Tab */}
        {activeTab === 'payroll' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion de la paie</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Exporter rapport
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Bulletins de paie - Décembre 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee: any) => (
                    <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{employee.salary}</p>
                        <p className="text-sm text-gray-600">Net mensuel</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Formations</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Planifier formation
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Formations en cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">React Avancé</h3>
                      <p className="text-sm text-gray-600">Samuel OBAM DAY, ESSONO Christian</p>
                      <p className="text-sm text-gray-500">15-20 décembre 2024</p>
                      <Badge className="mt-2">En cours</Badge>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">Design UI/UX</h3>
                      <p className="text-sm text-gray-600">Marie NGUEMO, FRANCK Marien</p>
                      <p className="text-sm text-gray-500">22-24 décembre 2024</p>
                      <Badge variant="secondary" className="mt-2">Planifiée</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">AWS Certified Developer</h3>
                      <p className="text-sm text-gray-600">Samuel OBAM DAY</p>
                      <p className="text-sm text-gray-500">Obtenue le 15 novembre 2024</p>
                      <Badge variant="default" className="mt-2">Validée</Badge>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">Google Analytics</h3>
                      <p className="text-sm text-gray-600">NGA SABINE LUCIE</p>
                      <p className="text-sm text-gray-500">En cours</p>
                      <Badge variant="outline" className="mt-2">En progression</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}