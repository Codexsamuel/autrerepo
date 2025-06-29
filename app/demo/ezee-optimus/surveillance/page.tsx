'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Camera,
  Eye,
  Shield,
  AlertTriangle,
  CheckCircle,
  X,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  QrCode,
  Brain,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Settings,
  Zap,
  Target,
  Award,
  Star,
  User,
  Search,
  Filter,
  Download,
  Upload,
  Play,
  Pause,
  Circle,
  RefreshCw,
  Maximize,
  Minimize,
  RotateCcw,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface SurveillanceCamera {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  type: 'entrance' | 'lobby' | 'corridor' | 'parking' | 'spa' | 'restaurant';
  resolution: string;
  features: string[];
  currentView?: string;
  lastActivity: string;
  aiEnabled: boolean;
  facialRecognition: boolean;
  motionDetection: boolean;
  recording: boolean;
}

interface DetectedPerson {
  id: string;
  name: string;
  photo?: string;
  confidence: number;
  timestamp: string;
  location: string;
  cameraId: string;
  status: 'guest' | 'staff' | 'visitor' | 'unknown';
  expected?: boolean;
  aiRiskScore: number;
  behavior: 'normal' | 'suspicious' | 'alert';
}

interface SecurityAlert {
  id: string;
  type: 'unauthorized' | 'suspicious' | 'no-show' | 'late-arrival' | 'early-departure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  location: string;
  cameraId: string;
  personId?: string;
  personName?: string;
  personPhoto?: string;
  status: 'active' | 'investigating' | 'resolved' | 'false-alarm';
  aiAnalysis: string;
}

interface QRCode {
  id: string;
  code: string;
  guestName: string;
  guestPhoto?: string;
  roomNumber: string;
  checkInTime: string;
  checkOutTime: string;
  status: 'active' | 'expired' | 'used';
  lastUsed: string;
  location: string;
  permissions: string[];
}

export default function SurveillancePage() {
  const [cameras, setCameras] = useState<SurveillanceCamera[]>([]);
  const [detectedPersons, setDetectedPersons] = useState<DetectedPerson[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<SurveillanceCamera | null>(null);
  const [surveillanceActive, setSurveillanceActive] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [recording, setRecording] = useState(true);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadData();
    generateStats();
  }, []);

  const loadData = () => {
    // Caméras de surveillance
    setCameras([
      {
        id: "CAM-001",
        name: "Entrée Principale",
        location: "Hall d'entrée",
        status: "active",
        type: "entrance",
        resolution: "4K",
        features: ["Facial Recognition", "Motion Detection", "Night Vision"],
        currentView: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        lastActivity: "2024-02-14 15:30:22",
        aiEnabled: true,
        facialRecognition: true,
        motionDetection: true,
        recording: true
      },
      {
        id: "CAM-002",
        name: "Réception",
        location: "Zone réception",
        status: "active",
        type: "lobby",
        resolution: "1080p",
        features: ["Facial Recognition", "Audio Recording"],
        currentView: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        lastActivity: "2024-02-14 15:28:15",
        aiEnabled: true,
        facialRecognition: true,
        motionDetection: false,
        recording: true
      },
      {
        id: "CAM-003",
        name: "Couloir Étage 2",
        location: "Étage 2 - Couloir",
        status: "active",
        type: "corridor",
        resolution: "1080p",
        features: ["Motion Detection", "Night Vision"],
        currentView: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        lastActivity: "2024-02-14 15:25:10",
        aiEnabled: false,
        facialRecognition: false,
        motionDetection: true,
        recording: true
      },
      {
        id: "CAM-004",
        name: "Parking",
        location: "Parking souterrain",
        status: "maintenance",
        type: "parking",
        resolution: "720p",
        features: ["Motion Detection", "License Plate Recognition"],
        lastActivity: "2024-02-14 14:45:30",
        aiEnabled: true,
        facialRecognition: false,
        motionDetection: true,
        recording: false
      }
    ]);

    // Personnes détectées
    setDetectedPersons([
      {
        id: "PERSON-001",
        name: "Jean Dupont",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        confidence: 98.5,
        timestamp: "2024-02-14 15:30:22",
        location: "Entrée Principale",
        cameraId: "CAM-001",
        status: "guest",
        expected: true,
        aiRiskScore: 0.15,
        behavior: "normal"
      },
      {
        id: "PERSON-002",
        name: "Marie Martin",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        confidence: 97.2,
        timestamp: "2024-02-14 15:28:15",
        location: "Réception",
        cameraId: "CAM-002",
        status: "guest",
        expected: true,
        aiRiskScore: 0.25,
        behavior: "normal"
      },
      {
        id: "PERSON-003",
        name: "Sarah Johnson",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        confidence: 99.1,
        timestamp: "2024-02-14 15:25:10",
        location: "Couloir Étage 2",
        cameraId: "CAM-003",
        status: "staff",
        expected: true,
        aiRiskScore: 0.05,
        behavior: "normal"
      },
      {
        id: "PERSON-004",
        name: "Personne non identifiée",
        confidence: 45.2,
        timestamp: "2024-02-14 15:20:05",
        location: "Entrée Principale",
        cameraId: "CAM-001",
        status: "unknown",
        expected: false,
        aiRiskScore: 0.75,
        behavior: "suspicious"
      }
    ]);

    // Alertes de sécurité
    setSecurityAlerts([
      {
        id: "ALERT-001",
        type: "suspicious",
        severity: "medium",
        description: "Personne non identifiée détectée à l'entrée principale",
        timestamp: "2024-02-14 15:20:05",
        location: "Entrée Principale",
        cameraId: "CAM-001",
        personId: "PERSON-004",
        personName: "Personne non identifiée",
        status: "investigating",
        aiAnalysis: "IA détecte un comportement inhabituel. Recommandation: surveillance renforcée."
      },
      {
        id: "ALERT-002",
        type: "late-arrival",
        severity: "low",
        description: "Client en retard pour son RDV spa",
        timestamp: "2024-02-14 15:15:30",
        location: "Réception",
        cameraId: "CAM-002",
        personId: "PERSON-002",
        personName: "Marie Martin",
        personPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        status: "resolved",
        aiAnalysis: "Client arrivé avec 15 min de retard. Pas de problème de sécurité."
      }
    ]);

    // QR Codes
    setQrCodes([
      {
        id: "QR-001",
        code: "EZEE-JEAN-DUPONT-2024-02-14",
        guestName: "Jean Dupont",
        guestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        roomNumber: "201",
        checkInTime: "2024-02-14 15:30",
        checkOutTime: "2024-02-16 11:00",
        status: "active",
        lastUsed: "2024-02-14 15:30:22",
        location: "Entrée Principale",
        permissions: ["Accès chambre", "Spa", "Restaurant", "Parking"]
      },
      {
        id: "QR-002",
        code: "EZEE-MARIE-MARTIN-2024-02-14",
        guestName: "Marie Martin",
        guestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        roomNumber: "305",
        checkInTime: "2024-02-14 14:00",
        checkOutTime: "2024-02-15 11:00",
        status: "active",
        lastUsed: "2024-02-14 15:28:15",
        location: "Réception",
        permissions: ["Accès chambre", "Spa"]
      }
    ]);

    setLoading(false);
  };

  const generateStats = () => {
    setStats({
      totalCameras: 4,
      activeCameras: 3,
      aiDetections: 156,
      securityAlerts: 2,
      activeQRCodes: 2,
      facialRecognitionAccuracy: 97.8,
      averageResponseTime: "2.3s",
      uptime: 99.7
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBehaviorColor = (behavior: string) => {
    switch (behavior) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'suspicious': return 'bg-yellow-100 text-yellow-800';
      case 'alert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 0.2) return 'text-green-600';
    if (score < 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du système de surveillance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">Système de Surveillance</span>
                <span className="text-sm text-gray-500">IA DAVY • Reconnaissance Faciale • QR Codes</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Shield className="w-3 h-3 mr-1" />
                Sécurisé
              </Badge>
              <Button 
                variant={surveillanceActive ? "default" : "outline"} 
                size="sm"
                onClick={() => setSurveillanceActive(!surveillanceActive)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Surveillance {surveillanceActive ? "ON" : "OFF"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Caméras Actives</p>
                  <p className="text-2xl font-bold">{stats?.activeCameras}/{stats?.totalCameras}</p>
                </div>
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Détections IA</p>
                  <p className="text-2xl font-bold">{stats?.aiDetections}</p>
                </div>
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Alertes Sécurité</p>
                  <p className="text-2xl font-bold">{stats?.securityAlerts}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Précision IA</p>
                  <p className="text-2xl font-bold">{stats?.facialRecognitionAccuracy}%</p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cameras */}
          <div className="lg:col-span-1 space-y-6">
            {/* Camera Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>État des Caméras</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cameras.map((camera) => (
                    <div 
                      key={camera.id} 
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedCamera?.id === camera.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedCamera(camera)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{camera.name}</h4>
                        <Badge className={getStatusColor(camera.status)}>
                          {camera.status === 'active' ? 'Active' :
                           camera.status === 'inactive' ? 'Inactive' :
                           camera.status === 'maintenance' ? 'Maintenance' : 'Erreur'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{camera.location}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{camera.resolution}</span>
                        <div className="flex items-center space-x-1">
                          {camera.aiEnabled && <Brain className="w-3 h-3 text-purple-600" />}
                          {camera.recording && <Circle className="w-3 h-3 text-red-600" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span>Alertes Sécurité</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <span className="text-sm font-medium">{alert.type}</span>
                        </div>
                        <span className="text-xs text-gray-500">{alert.timestamp.split(' ')[1]}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{alert.description}</p>
                      {alert.personPhoto && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={alert.personPhoto} />
                            <AvatarFallback>{alert.personName?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{alert.personName}</span>
                        </div>
                      )}
                      <p className="text-xs text-blue-600">🤖 {alert.aiAnalysis}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Live Feed & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Camera Feed */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Vidéo en Direct</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Maximize className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedCamera ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={selectedCamera.currentView} 
                        alt={selectedCamera.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        {selectedCamera.name}
                      </div>
                      <div className="absolute top-2 right-2 flex space-x-1">
                        {selectedCamera.aiEnabled && (
                          <Badge className="bg-purple-600 text-white text-xs">
                            <Brain className="w-3 h-3 mr-1" />
                            IA
                          </Badge>
                        )}
                        {selectedCamera.recording && (
                          <Badge className="bg-red-600 text-white text-xs">
                            <Circle className="w-3 h-3 mr-1" />
                            REC
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Localisation:</span>
                        <p className="font-medium">{selectedCamera.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Résolution:</span>
                        <p className="font-medium">{selectedCamera.resolution}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Dernière activité:</span>
                        <p className="font-medium">{selectedCamera.lastActivity}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Fonctionnalités:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedCamera.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Sélectionnez une caméra pour voir le flux vidéo</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detected Persons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Personnes Détectées</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {detectedPersons.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={person.photo} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{person.name}</h4>
                          <p className="text-xs text-gray-600">{person.location} • {person.timestamp.split(' ')[1]}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge className={getBehaviorColor(person.behavior)}>
                            {person.behavior === 'normal' ? 'Normal' :
                             person.behavior === 'suspicious' ? 'Suspect' : 'Alerte'}
                          </Badge>
                          <div className={`text-sm font-bold ${getRiskScoreColor(person.aiRiskScore)}`}>
                            {Math.round(person.aiRiskScore * 100)}%
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Confiance: {person.confidence}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* QR Codes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="w-5 h-5" />
                  <span>QR Codes Actifs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {qrCodes.map((qr) => (
                    <div key={qr.id} className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={qr.guestPhoto} />
                          <AvatarFallback>{qr.guestName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{qr.guestName}</h4>
                          <p className="text-xs text-gray-600">Chambre {qr.roomNumber}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Code:</span>
                          <span className="font-mono">{qr.code}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dernière utilisation:</span>
                          <span>{qr.lastUsed.split(' ')[1]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Localisation:</span>
                          <span>{qr.location}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-600 font-medium mb-1">Permissions:</p>
                        <div className="flex flex-wrap gap-1">
                          {qr.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 