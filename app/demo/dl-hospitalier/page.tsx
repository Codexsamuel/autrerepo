'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Camera,
  Brain,
  Eye,
  Bell,
  Plus,
  Search,
  Filter,
  Settings,
  Star,
  AlertTriangle,
  CheckCircle,
  X,
  Edit,
  Trash2,
  Download,
  Upload,
  QrCode,
  Shield,
  FileText,
  Users,
  Car,
  Home,
  Heart,
  Star as StarIcon,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Zap,
  Target,
  Award,
  Smile,
  Frown,
  Meh,
  FileCheck,
  AlertCircle,
  CheckSquare,
  Clock4,
  DollarSign,
  Receipt,
  Building,
  Car as CarIcon,
  Heart as HeartIcon,
  Shield as ShieldIcon,
  RefreshCw,
  Bed,
  Stethoscope,
  Pill,
  Activity as ActivityIcon,
  Thermometer,
  Droplets,
  Brain as BrainIcon,
  Briefcase
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  photo?: string;
  age: number;
  gender: 'M' | 'F';
  bloodType: string;
  roomNumber: string;
  department: 'cardiology' | 'neurology' | 'pediatrics' | 'emergency' | 'surgery' | 'internal';
  status: 'admitted' | 'discharged' | 'critical' | 'stable' | 'recovering';
  admissionDate: string;
  dischargeDate?: string;
  diagnosis: string;
  treatment: string[];
  medications: string[];
  vitalSigns: {
    temperature: number;
    bloodPressure: string;
    heartRate: number;
    oxygenSaturation: number;
  };
  aiProfile: {
    riskScore: number;
    recoveryPrediction: string;
    recommendations: string[];
    alertLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    coverage: number;
  };
}

interface Doctor {
  id: string;
  name: string;
  photo?: string;
  specialty: string;
  department: string;
  availability: {
    [key: string]: {
      start: string;
      end: string;
      available: boolean;
    };
  };
  rating: number;
  currentPatients: number;
  maxPatients: number;
  certifications: string[];
}

interface MedicalEvent {
  id: string;
  title: string;
  patientName: string;
  patientPhoto?: string;
  patientId: string;
  type: 'consultation' | 'surgery' | 'examination' | 'medication' | 'emergency' | 'discharge';
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'urgent';
  assignedDoctor: string;
  roomNumber: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  notes: string[];
  aiRiskAssessment: number;
  aiRecommendations: string[];
}

interface Bed {
  id: string;
  number: string;
  department: string;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  currentPatient?: string;
  lastCleaned: string;
  equipment: string[];
}

// 1. NAVBAR PREMIUM HOSPITALIER
function HospitalNavbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center">
            <img src="/logos/novacore.svg" alt="NovaCore Logo" className="w-7 h-7" />
          </div>
          <span className="font-bold text-lg text-gray-900">Centre Hospitalier NovaCore</span>
        </div>
        <div className="flex-1 max-w-md mx-8">
          <input type="text" placeholder="Rechercher patient, médecin, chambre..." className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">7</span>
            <Bell className="w-6 h-6 text-red-600" />
          </button>
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <span className="font-medium text-sm">Dr. Samuel OBAM</span>
              <div className="text-xs text-gray-500">Chef de Service Cardiologie</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// 2. BANNIÈRE D'ALERTE IA HOSPITALIER
function HospitalAlertBanner() {
  return (
    <div className="bg-gradient-to-r from-red-100 to-orange-100 border-l-4 border-red-400 p-4 flex items-center justify-between mb-6 mt-2 rounded shadow">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-6 h-6 text-red-600" />
        <span className="font-semibold text-red-900">IA NovaCore:</span>
        <span className="text-sm text-gray-800">3 patients critiques, 5 lits disponibles, 2 urgences en attente</span>
      </div>
      <button className="bg-red-400 text-white px-3 py-1 rounded font-medium hover:bg-red-500 transition">Voir toutes les alertes</button>
    </div>
  );
}

// 3. DASHBOARD KPI HOSPITALIER
type HospitalKPIProps = { aiInsights: any };
function HospitalKPI({ aiInsights }: HospitalKPIProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Patients hospitalisés</CardTitle>
          <Users className="w-5 h-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiInsights?.totalPatients ?? '--'}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lits disponibles</CardTitle>
          <Bed className="w-5 h-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiInsights?.availableBeds ?? '--'}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
          <ActivityIcon className="w-5 h-5 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiInsights?.occupancyRate ? `${Math.round(aiInsights.occupancyRate * 100)}%` : '--'}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Patients critiques</CardTitle>
          <AlertCircle className="w-5 h-5 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiInsights?.criticalPatients ?? '--'}</div>
        </CardContent>
      </Card>
    </div>
  );
}

// 4. PIPELINE PATIENTS
type PatientsPipelineProps = { patients: Array<Patient> };
function PatientsPipeline({ patients }: PatientsPipelineProps) {
  const stages = [
    { key: 'admitted', label: 'Admis', color: 'bg-blue-100 text-blue-800' },
    { key: 'stable', label: 'Stable', color: 'bg-green-100 text-green-800' },
    { key: 'recovering', label: 'En convalescence', color: 'bg-yellow-100 text-yellow-800' },
    { key: 'critical', label: 'Critique', color: 'bg-red-100 text-red-800' },
    { key: 'discharged', label: 'Sorti', color: 'bg-gray-100 text-gray-800' }
  ];
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-8">
      <div className="flex items-center mb-4">
        <Stethoscope className="w-5 h-5 text-blue-600 mr-2" />
        <span className="font-semibold text-lg">Pipeline Patients</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map(stage => (
          <div key={stage.key} className="rounded-lg border p-2">
            <div className={`font-bold mb-2 ${stage.color}`}>{stage.label}</div>
            <div className="space-y-2">
              {patients.filter((p: Patient) => p.status === stage.key).map((p: Patient) => (
                <Card key={p.id} className="border-blue-100">
                  <CardContent className="p-2 flex items-center space-x-2">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={p.photo} />
                      <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-xs">{p.name}</div>
                      <div className="text-xs text-gray-500">Ch. {p.roomNumber}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. MODULE PATIENTS CRITIQUES & ALERTES IA
type CriticalPatientsProps = { patients: Array<Patient> };
function CriticalPatients({ patients }: CriticalPatientsProps) {
  const critical = patients.filter((p: Patient) => p.status === 'critical');
  if (!critical.length) return null;
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span>Patients Critiques</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {critical.map((patient: Patient) => (
            <div key={patient.id} className="flex items-center space-x-2 p-2 border border-red-200 rounded-lg bg-red-50">
              <Avatar className="w-8 h-8">
                <AvatarImage src={patient.photo} />
                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{patient.name}</div>
                <div className="text-xs text-gray-500">Ch. {patient.roomNumber} • {patient.department}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type HospitalRecommendationsProps = { aiInsights: any };
function HospitalRecommendations({ aiInsights }: HospitalRecommendationsProps) {
  if (!aiInsights?.recommendations?.length) return null;
  return (
    <Card className="mb-8 bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-2">
          <Brain className="w-8 h-8 text-red-600" />
          <h3 className="font-semibold text-red-900">Recommandations IA</h3>
        </div>
        <ul className="list-disc pl-6 text-red-800 text-sm">
          {aiInsights.recommendations.map((rec: string, i: number) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// 6. FOOTER ENRICHI HOSPITALIER
function HospitalFooter() {
  return (
    <footer className="bg-white border-t mt-12 py-6 text-center text-xs text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img src="/logos/novacore.svg" alt="NovaCore Logo" className="w-6 h-6" />
          <span>NovaCore Healthcare</span>
        </div>
        <div>
          Made by Samuel OBAM, CEO of DL Solutions &nbsp;|&nbsp; +237 694 341 586 &nbsp;|&nbsp; Rue École de Police, Yaoundé &nbsp;|&nbsp; sobam@daveandlucesolutions.com
        </div>
        <div>
          © 2024 NovaCore Healthcare CRM. Tous droits réservés. Powered by NovaCore AI.
        </div>
      </div>
    </footer>
  );
}

export default function DLHospitalierPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [events, setEvents] = useState<MedicalEvent[]>([]);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    generateAIInsights();
  }, []);

  const loadData = () => {
    // Patients avec IA
    setPatients([
      {
        id: "1",
        name: "Marie Dubois",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        age: 45,
        gender: "F",
        bloodType: "A+",
        roomNumber: "301",
        department: "cardiology",
        status: "critical",
        admissionDate: "2024-02-10",
        diagnosis: "Infarctus du myocarde",
        treatment: ["Thrombolyse", "Monitoring cardiaque"],
        medications: ["Aspirine", "Clopidogrel", "Atorvastatine"],
        vitalSigns: {
          temperature: 37.2,
          bloodPressure: "140/90",
          heartRate: 95,
          oxygenSaturation: 96
        },
        aiProfile: {
          riskScore: 0.85,
          recoveryPrediction: "Récupération lente, 3-4 semaines",
          recommendations: ["Surveillance continue", "Rééducation cardiaque"],
          alertLevel: "critical"
        },
        emergencyContact: {
          name: "Jean Dubois",
          phone: "+33 6 12 34 56 78",
          relationship: "Époux"
        },
        insurance: {
          provider: "CPAM",
          policyNumber: "CPAM123456",
          coverage: 100
        }
      },
      {
        id: "2",
        name: "Pierre Martin",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        age: 32,
        gender: "M",
        bloodType: "O+",
        roomNumber: "205",
        department: "surgery",
        status: "recovering",
        admissionDate: "2024-02-08",
        dischargeDate: "2024-02-15",
        diagnosis: "Appendicite aiguë",
        treatment: ["Appendicectomie laparoscopique"],
        medications: ["Paracétamol", "Ibuprofène"],
        vitalSigns: {
          temperature: 36.8,
          bloodPressure: "120/80",
          heartRate: 72,
          oxygenSaturation: 98
        },
        aiProfile: {
          riskScore: 0.15,
          recoveryPrediction: "Récupération rapide, sortie dans 2 jours",
          recommendations: ["Repos", "Alimentation progressive"],
          alertLevel: "low"
        },
        emergencyContact: {
          name: "Sophie Martin",
          phone: "+33 6 98 76 54 32",
          relationship: "Épouse"
        },
        insurance: {
          provider: "MGEN",
          policyNumber: "MGEN789012",
          coverage: 80
        }
      }
    ]);

    // Médecins
    setDoctors([
      {
        id: "1",
        name: "Dr. Samuel OBAM",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        specialty: "Cardiologie",
        department: "Cardiologie",
        availability: {
          "monday": { start: "08:00", end: "18:00", available: true },
          "tuesday": { start: "08:00", end: "18:00", available: true },
          "wednesday": { start: "08:00", end: "18:00", available: true },
          "thursday": { start: "08:00", end: "18:00", available: true },
          "friday": { start: "08:00", end: "18:00", available: true }
        },
        rating: 4.9,
        currentPatients: 8,
        maxPatients: 12,
        certifications: ["Cardiologie", "Réanimation", "Échographie cardiaque"]
      }
    ]);

    // Lits
    setBeds([
      { id: "1", number: "301", department: "Cardiologie", status: "occupied", currentPatient: "Marie Dubois", lastCleaned: "2024-02-14", equipment: ["Monitoring", "Défibrillateur", "Oxygène"] },
      { id: "2", number: "205", department: "Chirurgie", status: "occupied", currentPatient: "Pierre Martin", lastCleaned: "2024-02-14", equipment: ["Lit médicalisé", "Perfusion"] },
      { id: "3", number: "102", department: "Médecine interne", status: "available", lastCleaned: "2024-02-14", equipment: ["Lit standard", "Monitoring"] }
    ]);

    setLoading(false);
  };

  const generateAIInsights = () => {
    setAiInsights({
      totalPatients: 45,
      availableBeds: 12,
      occupancyRate: 0.78,
      criticalPatients: 3,
      recommendations: [
        "Patient en chambre 301 nécessite surveillance renforcée",
        "Prévoir libération de 2 lits pour ce soir",
        "Équipe de nuit sous-staffée en cardiologie"
      ]
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <HospitalNavbar />
      <HospitalAlertBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HospitalKPI aiInsights={aiInsights} />
        <PatientsPipeline patients={patients} />
        <CriticalPatients patients={patients} />
        <HospitalRecommendations aiInsights={aiInsights} />
        
        {/* Contenu existant simplifié */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier Médical</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Patients Hospitalisés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={patient.photo} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{patient.name}</h4>
                          <p className="text-sm text-gray-600">
                            Chambre {patient.roomNumber} • {patient.department}
                          </p>
                        </div>
                      </div>
                      <Badge className={patient.status === 'critical' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                        {patient.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <HospitalFooter />
    </div>
  );
} 