"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Camera,
  Upload,
  Download,
  CheckCircle,
  X,
  AlertTriangle,
  User,
  Shield,
  FileText,
  Eye,
  Brain,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  QrCode,
  Scan,
  Fingerprint,
  CreditCard,
  Camera as CameraIcon,
  Settings,
  RefreshCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Play,
  Pause,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Award,
  Zap,
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Save,
  Send,
  Lock,
  Unlock,
  Key,
  Database,
  Cloud,
  Wifi,
  Bluetooth,
  Smartphone,
  Tablet,
  Monitor,
  Printer
} from 'lucide-react';
import Link from "next/link"

interface PhotoVerification {
  id: string;
  guestName: string;
  guestPhoto: string;
  documentType: 'CNI' | 'Passeport' | 'Permis' | 'Carte de crédit';
  documentPhoto: string;
  verificationStatus: 'pending' | 'processing' | 'verified' | 'rejected' | 'manual-review';
  confidence: number;
  aiAnalysis: {
    faceMatch: number;
    documentAuthenticity: number;
    dataConsistency: number;
    riskScore: number;
    recommendations: string[];
  };
  extractedData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    documentNumber: string;
    expiryDate: string;
    address?: string;
  };
  timestamp: string;
  location: string;
  staffMember: string;
  notes: string;
  flags: string[];
  nextSteps: string[];
}

interface VerificationStats {
  totalVerifications: number;
  successfulVerifications: number;
  failedVerifications: number;
  averageConfidence: number;
  processingTime: number;
  aiAccuracy: number;
  manualReviews: number;
  fraudDetected: number;
}

export default function PhotoVerificationPage() {
  const [verifications, setVerifications] = useState<PhotoVerification[]>([]);
  const [stats, setStats] = useState<VerificationStats | null>(null);
  const [selectedVerification, setSelectedVerification] = useState<PhotoVerification | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoProcessing, setAutoProcessing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadData();
    generateStats();
  }, []);

  const loadData = () => {
    // Vérifications photo avec IA
    setVerifications([
      {
        id: "VER-001",
        guestName: "Jean Dupont",
        guestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        documentType: "CNI",
        documentPhoto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
        verificationStatus: "verified",
        confidence: 98.5,
        aiAnalysis: {
          faceMatch: 97.2,
          documentAuthenticity: 99.1,
          dataConsistency: 98.8,
          riskScore: 0.12,
          recommendations: [
            "Document authentique confirmé",
            "Correspondance faciale excellente",
            "Données cohérentes avec la base"
          ]
        },
        extractedData: {
          firstName: "Jean",
          lastName: "Dupont",
          dateOfBirth: "1985-03-15",
          nationality: "Française",
          documentNumber: "1234567890123",
          expiryDate: "2030-12-31",
          address: "123 Rue de la Paix, Paris"
        },
        timestamp: "2024-02-14 15:30:22",
        location: "Réception",
        staffMember: "Sarah Johnson",
        notes: "Vérification automatique réussie. Client fidèle.",
        flags: ["VIP", "Client régulier"],
        nextSteps: ["Check-in autorisé", "Chambre 201 assignée"]
      },
      {
        id: "VER-002",
        guestName: "Marie Martin",
        guestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        documentType: "Passeport",
        documentPhoto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
        verificationStatus: "processing",
        confidence: 85.3,
        aiAnalysis: {
          faceMatch: 82.1,
          documentAuthenticity: 94.7,
          dataConsistency: 89.2,
          riskScore: 0.28,
          recommendations: [
            "Légère différence d'éclairage détectée",
            "Vérification manuelle recommandée",
            "Document semble authentique"
          ]
        },
        extractedData: {
          firstName: "Marie",
          lastName: "Martin",
          dateOfBirth: "1990-07-22",
          nationality: "Française",
          documentNumber: "AB1234567",
          expiryDate: "2028-05-15"
        },
        timestamp: "2024-02-14 15:28:15",
        location: "Réception",
        staffMember: "Michael Chen",
        notes: "En cours de traitement IA. Première visite.",
        flags: ["Nouveau client", "Vérification manuelle requise"],
        nextSteps: ["Attendre validation IA", "Préparer accueil"]
      },
      {
        id: "VER-003",
        guestName: "Pierre Durand",
        guestPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        documentType: "Carte de crédit",
        documentPhoto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
        verificationStatus: "manual-review",
        confidence: 45.2,
        aiAnalysis: {
          faceMatch: 38.5,
          documentAuthenticity: 67.3,
          dataConsistency: 52.1,
          riskScore: 0.75,
          recommendations: [
            "Correspondance faciale faible",
            "Document potentiellement suspect",
            "Vérification manuelle urgente"
          ]
        },
        extractedData: {
          firstName: "Pierre",
          lastName: "Durand",
          dateOfBirth: "1978-11-08",
          nationality: "Française",
          documentNumber: "****-****-****-1234",
          expiryDate: "2025-08-31"
        },
        timestamp: "2024-02-14 15:25:10",
        location: "Réception",
        staffMember: "Emma Davis",
        notes: "Problème de correspondance faciale. Vérification manuelle requise.",
        flags: ["Risque élevé", "Vérification manuelle"],
        nextSteps: ["Contacter le manager", "Demander documents supplémentaires"]
      }
    ]);

    setLoading(false);
  };

  const generateStats = () => {
    setStats({
      totalVerifications: 156,
      successfulVerifications: 142,
      failedVerifications: 8,
      averageConfidence: 94.2,
      processingTime: 2.3,
      aiAccuracy: 97.8,
      manualReviews: 6,
      fraudDetected: 2
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'manual-review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 0.2) return 'text-green-600';
    if (score < 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'CNI': return <CameraIcon className="w-4 h-4" />;
      case 'Passeport': return <CameraIcon className="w-4 h-4" />;
      case 'Permis': return <CameraIcon className="w-4 h-4" />;
      case 'Carte de crédit': return <CameraIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const processVerification = async (verificationId: string) => {
    setProcessing(true);
    // Simuler le traitement IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setVerifications(prev => prev.map(v => 
      v.id === verificationId 
        ? { ...v, verificationStatus: 'verified', confidence: 95.5 }
        : v
    ));
    
    setProcessing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du système de vérification...</p>
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
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">Vérification Photo IA</span>
                <span className="text-sm text-gray-500">Reconnaissance Faciale • Validation Documents • Sécurité</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Brain className="w-3 h-3 mr-1" />
                IA Active
              </Badge>
              <Button 
                variant={autoProcessing ? "default" : "outline"} 
                size="sm"
                onClick={() => setAutoProcessing(!autoProcessing)}
              >
                <Zap className="w-4 h-4 mr-2" />
                Auto {autoProcessing ? "ON" : "OFF"}
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
                  <p className="text-sm text-gray-600">Vérifications</p>
                  <p className="text-2xl font-bold">{stats?.totalVerifications}</p>
                </div>
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Réussites</p>
                  <p className="text-2xl font-bold text-green-600">{stats?.successfulVerifications}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Précision IA</p>
                  <p className="text-2xl font-bold">{stats?.aiAccuracy}%</p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Temps moyen</p>
                  <p className="text-2xl font-bold">{stats?.processingTime}s</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Verification List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Verifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Vérifications Récentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verifications.map((verification) => (
                    <div 
                      key={verification.id} 
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedVerification?.id === verification.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedVerification(verification)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={verification.guestPhoto} />
                          <AvatarFallback>{verification.guestName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">{verification.guestName}</h4>
                            <Badge className={getStatusColor(verification.verificationStatus)}>
                              {verification.verificationStatus === 'verified' ? 'Vérifié' :
                               verification.verificationStatus === 'processing' ? 'En cours' :
                               verification.verificationStatus === 'pending' ? 'En attente' :
                               verification.verificationStatus === 'rejected' ? 'Rejeté' : 'Révision'}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <span>{getDocumentIcon(verification.documentType)}</span>
                            <span>{verification.documentType}</span>
                            <span>•</span>
                            <span>{verification.timestamp.split(' ')[1]}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">Confiance:</span>
                            <span className={`text-xs font-bold ${getConfidenceColor(verification.confidence)}`}>
                              {verification.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>IA DAVY - Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-800">Taux de réussite</span>
                      <span className="text-lg font-bold text-blue-900">{Math.round((stats?.successfulVerifications || 0) / (stats?.totalVerifications || 1) * 100)}%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">Fraude détectée</span>
                      <span className="text-lg font-bold text-green-900">{stats?.fraudDetected}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-orange-800">Révisions manuelles</span>
                      <span className="text-lg font-bold text-orange-900">{stats?.manualReviews}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Verification Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedVerification ? (
              <>
                {/* Verification Details */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Détails de la Vérification</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => processVerification(selectedVerification.id)}
                          disabled={processing}
                        >
                          <RefreshCw className={`w-4 h-4 mr-2 ${processing ? 'animate-spin' : ''}`} />
                          Retraiter
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Guest Photo */}
                      <div>
                        <Label className="text-sm font-medium">Photo Client</Label>
                        <div className="mt-2 relative">
                          <img 
                            src={selectedVerification.guestPhoto} 
                            alt={selectedVerification.guestName}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                            {selectedVerification.guestName}
                          </div>
                        </div>
                      </div>

                      {/* Document Photo */}
                      <div>
                        <Label className="text-sm font-medium">Document ({selectedVerification.documentType})</Label>
                        <div className="mt-2 relative">
                          <img 
                            src={selectedVerification.documentPhoto} 
                            alt={selectedVerification.documentType}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                            {selectedVerification.documentType}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Analysis */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Analyse IA DAVY</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">Correspondance Faciale</p>
                          <p className="text-lg font-bold text-green-600">{selectedVerification.aiAnalysis.faceMatch}%</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">Authenticité Document</p>
                          <p className="text-lg font-bold text-blue-600">{selectedVerification.aiAnalysis.documentAuthenticity}%</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">Cohérence Données</p>
                          <p className="text-lg font-bold text-purple-600">{selectedVerification.aiAnalysis.dataConsistency}%</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">Score de Risque</p>
                          <p className={`text-lg font-bold ${getRiskScoreColor(selectedVerification.aiAnalysis.riskScore)}`}>
                            {Math.round(selectedVerification.aiAnalysis.riskScore * 100)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Extracted Data */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Données Extraites</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs text-gray-600">Prénom</Label>
                          <p className="font-medium">{selectedVerification.extractedData.firstName}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Nom</Label>
                          <p className="font-medium">{selectedVerification.extractedData.lastName}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Date de naissance</Label>
                          <p className="font-medium">{selectedVerification.extractedData.dateOfBirth}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Nationalité</Label>
                          <p className="font-medium">{selectedVerification.extractedData.nationality}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Numéro document</Label>
                          <p className="font-medium">{selectedVerification.extractedData.documentNumber}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Date d'expiration</Label>
                          <p className="font-medium">{selectedVerification.extractedData.expiryDate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Recommandations IA</h4>
                      <div className="space-y-2">
                        {selectedVerification.aiAnalysis.recommendations.map((rec, index) => (
                          <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                            🤖 {rec}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flags & Next Steps */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Drapeaux</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedVerification.flags.map((flag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {flag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Prochaines Étapes</h4>
                        <div className="space-y-2">
                          {selectedVerification.nextSteps.map((step, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune vérification sélectionnée</h3>
                  <p className="text-gray-600">Sélectionnez une vérification dans la liste pour voir les détails</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
