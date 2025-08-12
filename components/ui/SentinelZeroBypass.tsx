'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
    AlertTriangle,
    CheckCircle,
    CheckCircle2,
    Clock,
    Copy,
    Eye,
    EyeOff,
    FileText,
    Key,
    RefreshCw,
    Send,
    Shield,
    UserPlus,
    Users,
    XCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface SentinelCredentials {
  codeMaitre: string;
  idAdmin: string;
  hashVocale: string;
  hashDigitale: string;
  phraseVocale: string;
  niveauAuth: number;
}

interface UserAuth {
  email: string;
  credentials: SentinelCredentials;
  status: 'pending' | 'sent' | 'error';
  sentAt?: Date;
}

interface AccessRequest {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profession: string;
  position: string;
  company: string;
  experience: string;
  motivation: string;
  useCase: string;
  securityLevel: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  evaluatedAt?: string;
  evaluatedBy?: string;
  notes?: string;
}

export function SentinelZeroBypass() {
  const [superAdminCode, setSuperAdminCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [generatedCredentials, setGeneratedCredentials] = useState<SentinelCredentials | null>(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [users, setUsers] = useState<UserAuth[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null);
  const [evaluationNotes, setEvaluationNotes] = useState('');

  // Code maître du super admin (à configurer dans les variables d'environnement)
  const SUPER_ADMIN_MASTER_CODE = process.env.NEXT_PUBLIC_SUPER_ADMIN_CODE || 'SENTINEL-ZERO-2025';

  // Simuler des demandes d'accès (remplacer par appel API)
  useEffect(() => {
    if (isAuthenticated) {
      // Simuler des demandes d'accès
      const mockRequests: AccessRequest[] = [
        {
          id: 'REQ-001',
          email: 'john.doe@cybersecurity.com',
          firstName: 'John',
          lastName: 'Doe',
          profession: 'Cybersécurité',
          position: 'Directeur Sécurité / CISO',
          company: 'CyberCorp Inc.',
          experience: '10+ ans',
          motivation: 'Besoin d\'outils avancés pour la protection de nos systèmes critiques',
          useCase: 'Analyse de menaces, détection d\'intrusion, réponse aux incidents',
          securityLevel: 'Niveau 5 - Accès Ultra-Sécurisé',
          status: 'pending',
          submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
        },
        {
          id: 'REQ-002',
          email: 'sarah.smith@ai-research.org',
          firstName: 'Sarah',
          lastName: 'Smith',
          profession: 'Intelligence Artificielle',
          position: 'Chercheur Senior',
          company: 'AI Research Institute',
          experience: '6-10 ans',
          motivation: 'Recherche sur la sécurité des systèmes d\'IA et protection contre les attaques adversariales',
          useCase: 'Développement d\'algorithmes de sécurité pour l\'IA, tests de robustesse',
          securityLevel: 'Niveau 4 - Accès Expert',
          status: 'pending',
          submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5h ago
        }
      ];
      setAccessRequests(mockRequests);
    }
  }, [isAuthenticated]);

  const authenticateSuperAdmin = () => {
    if (superAdminCode === SUPER_ADMIN_MASTER_CODE) {
      setIsAuthenticated(true);
      setEmailStatus('idle');
    } else {
      alert('Code maître incorrect !');
    }
  };

  const generateSentinelCredentials = (): SentinelCredentials => {
    const generateHash = (length: number = 64) => {
      const chars = 'abcdef0123456789';
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    const generateCodeMaitre = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    const generateIdAdmin = () => {
      const prefixes = ['DL-SUPER', 'SENTINEL', 'RED-TEAM', 'ALPHA', 'OMEGA'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const number = Math.floor(Math.random() * 999) + 1;
      return `${prefix}-${number.toString().padStart(3, '0')}`;
    };

    const generatePhraseVocale = () => {
      const phrases = [
        'i am sentinel',
        'red team alpha',
        'cyber defense',
        'quantum security',
        'zero trust',
        'dark web hunter',
        'threat neutralizer',
        'digital guardian'
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    };

    return {
      codeMaitre: generateCodeMaitre(),
      idAdmin: generateIdAdmin(),
      hashVocale: generateHash(64),
      hashDigitale: generateHash(128),
      phraseVocale: generatePhraseVocale(),
      niveauAuth: Math.floor(Math.random() * 5) + 1
    };
  };

  const handleGenerateCredentials = () => {
    const credentials = generateSentinelCredentials();
    setGeneratedCredentials(credentials);
    setShowCredentials(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Feedback visuel
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '<CheckCircle className="w-4 h-4" /> Copié !';
      setTimeout(() => {
        button.innerHTML = originalText;
      }, 2000);
    }
  };

  const sendCredentialsByEmail = async () => {
    if (!userEmail || !generatedCredentials) return;

    setEmailStatus('sending');

    try {
      // Simulation d'envoi d'email (remplacer par votre API d'envoi)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newUser: UserAuth = {
        email: userEmail,
        credentials: generatedCredentials,
        status: 'sent',
        sentAt: new Date()
      };

      setUsers(prev => [...prev, newUser]);
      setEmailStatus('sent');
      setUserEmail('');
      setGeneratedCredentials(null);
      setShowCredentials(false);

      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setEmailStatus('idle');
      }, 3000);

    } catch (error) {
      setEmailStatus('error');
      console.error('Erreur envoi email:', error);
    }
  };

  const revokeUserAccess = (email: string) => {
    setUsers(prev => prev.filter(user => user.email !== email));
  };

  const approveRequest = async (request: AccessRequest) => {
    // Générer des identifiants pour cette demande
    const credentials = generateSentinelCredentials();
    
    // Mettre à jour le statut
    const updatedRequest = {
      ...request,
      status: 'approved' as const,
      evaluatedAt: new Date().toISOString(),
      evaluatedBy: 'Super Admin',
      notes: evaluationNotes
    };

    setAccessRequests(prev => 
      prev.map(req => req.id === request.id ? updatedRequest : req)
    );

    // Envoyer les identifiants par email
    try {
      const response = await fetch('/api/sentinel-zero/send-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: request.email,
          credentials,
          superAdminCode: SUPER_ADMIN_MASTER_CODE
        }),
      });

      if (response.ok) {
        alert(`Demande approuvée et identifiants envoyés à ${request.email}`);
        setSelectedRequest(null);
        setEvaluationNotes('');
      } else {
        alert('Erreur lors de l\'envoi des identifiants');
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi des identifiants');
    }
  };

  const rejectRequest = (request: AccessRequest) => {
    const updatedRequest = {
      ...request,
      status: 'rejected' as const,
      evaluatedAt: new Date().toISOString(),
      evaluatedBy: 'Super Admin',
      notes: evaluationNotes
    };

    setAccessRequests(prev => 
      prev.map(req => req.id === request.id ? updatedRequest : req)
    );

    // TODO: Envoyer email de rejet
    alert(`Demande rejetée pour ${request.email}`);
    setSelectedRequest(null);
    setEvaluationNotes('');
  };

  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Shield className="w-6 h-6" />
            Authentification Super Admin
          </CardTitle>
          <CardDescription>
            Accès au système de bypass Sentinel Zero
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="master-code">Code Maître Super Admin</Label>
            <div className="relative">
              <Input
                id="master-code"
                type={showPassword ? "text" : "password"}
                value={superAdminCode}
                onChange={(e) => setSuperAdminCode(e.target.value)}
                placeholder="Entrez le code maître"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={authenticateSuperAdmin}
            className="w-full"
            disabled={!superAdminCode}
          >
            <Key className="w-4 h-4 mr-2" />
            Authentifier Super Admin
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Super Admin */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Shield className="w-6 h-6" />
            🚨 SENTINEL ZERO - Contrôle Super Admin
          </CardTitle>
          <CardDescription>
            Accès complet au système de bypass et gestion des demandes d'accès
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Interface principale avec onglets */}
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Demandes d'Accès ({accessRequests.filter(r => r.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Générer Identifiants
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Utilisateurs ({users.length})
          </TabsTrigger>
        </TabsList>

        {/* Onglet Demandes d'Accès */}
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Demandes d'Accès en Attente
              </CardTitle>
              <CardDescription>
                Évaluer et traiter les candidatures pour l'accès Sentinel Zero
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {accessRequests.filter(r => r.status === 'pending').length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune demande en attente</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {accessRequests
                    .filter(r => r.status === 'pending')
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{request.firstName} {request.lastName}</h4>
                            <p className="text-sm text-gray-600">{request.email}</p>
                          </div>
                          <Badge variant="outline" className="text-orange-600">
                            En attente
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <p><strong>Profession :</strong> {request.profession}</p>
                            <p><strong>Poste :</strong> {request.position}</p>
                            <p><strong>Entreprise :</strong> {request.company}</p>
                          </div>
                          <div>
                            <p><strong>Expérience :</strong> {request.experience}</p>
                            <p><strong>Niveau souhaité :</strong> {request.securityLevel}</p>
                            <p><strong>Soumis le :</strong> {new Date(request.submittedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm"><strong>Motivation :</strong> {request.motivation}</p>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm"><strong>Cas d'usage :</strong> {request.useCase}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => setSelectedRequest(request)}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Évaluer
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Génération d'Identifiants */}
        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Générateur d'Identifiants Sentinel Zero
              </CardTitle>
              <CardDescription>
                Créer de nouveaux identifiants d'authentification pour les utilisateurs
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={handleGenerateCredentials}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Générer Nouveaux Identifiants
                </Button>
                
                {generatedCredentials && (
                  <Button 
                    onClick={() => setShowCredentials(!showCredentials)}
                    variant="outline"
                  >
                    {showCredentials ? 'Masquer' : 'Afficher'} Identifiants
                  </Button>
                )}
              </div>

              {/* Identifiants générés */}
              {generatedCredentials && showCredentials && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Identifiants Générés :</h4>
                  
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Code Maître:</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-white px-2 py-1 rounded border">
                          {generatedCredentials.codeMaitre}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(generatedCredentials.codeMaitre)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium">ID Administrateur:</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-white px-2 py-1 rounded border">
                          {generatedCredentials.idAdmin}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(generatedCredentials.idAdmin)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium">Hash Empreinte Vocale:</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-white px-2 py-1 rounded border text-xs">
                          {generatedCredentials.hashVocale.substring(0, 16)}...
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(generatedCredentials.hashVocale)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium">Hash Empreinte Digitale:</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-white px-2 py-1 rounded border text-xs">
                          {generatedCredentials.hashDigitale.substring(0, 16)}...
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(generatedCredentials.hashDigitale)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium">Phrase Vocale:</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-white px-2 py-1 rounded border">
                          {generatedCredentials.phraseVocale}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(generatedCredentials.phraseVocale)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium">Niveau d'Authentification:</span>
                      <Badge variant="outline">
                        Niveau {generatedCredentials.niveauAuth}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Envoi par email */}
              {generatedCredentials && (
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800">Envoi par Email :</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email de l'utilisateur :</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="user@example.com"
                    />
                  </div>

                  <Button 
                    onClick={sendCredentialsByEmail}
                    disabled={!userEmail || emailStatus === 'sending'}
                    className="w-full flex items-center gap-2"
                  >
                    {emailStatus === 'sending' ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {emailStatus === 'sending' ? 'Envoi en cours...' : 'Envoyer par Email'}
                  </Button>

                  {/* Statut de l'envoi */}
                  {emailStatus === 'sent' && (
                    <Alert>
                      <CheckCircle className="w-4 h-4" />
                      <AlertDescription>
                        Identifiants envoyés avec succès à {userEmail}
                      </AlertDescription>
                    </Alert>
                  )}

                  {emailStatus === 'error' && (
                    <Alert>
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        Erreur lors de l'envoi. Vérifiez l'adresse email.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Utilisateurs */}
        <TabsContent value="users" className="space-y-4">
          {users.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Utilisateurs avec Accès ({users.length})
                </CardTitle>
                <CardDescription>
                  Gestion des accès et révocation des permissions
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {users.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">{user.email}</p>
                          <p className="text-sm text-gray-500">
                            Envoyé le {user.sentAt?.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {user.credentials.idAdmin}
                        </Badge>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => revokeUserAccess(user.email)}
                        >
                          Révoquer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucun utilisateur avec accès</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Modal d'évaluation de demande */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Évaluer la Demande de {selectedRequest.firstName} {selectedRequest.lastName}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Email :</strong> {selectedRequest.email}</p>
                  <p><strong>Profession :</strong> {selectedRequest.profession}</p>
                  <p><strong>Poste :</strong> {selectedRequest.position}</p>
                  <p><strong>Entreprise :</strong> {selectedRequest.company}</p>
                </div>
                <div>
                  <p><strong>Expérience :</strong> {selectedRequest.experience}</p>
                  <p><strong>Niveau souhaité :</strong> {selectedRequest.securityLevel}</p>
                  <p><strong>Soumis le :</strong> {new Date(selectedRequest.submittedAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium mb-2">Motivation :</p>
                <p className="text-sm bg-gray-50 p-3 rounded border">{selectedRequest.motivation}</p>
              </div>
              
              <div>
                <p className="font-medium mb-2">Cas d'usage :</p>
                <p className="text-sm bg-gray-50 p-3 rounded border">{selectedRequest.useCase}</p>
              </div>
              
              <div>
                <Label htmlFor="evaluation-notes">Notes d'évaluation :</Label>
                <Textarea
                  id="evaluation-notes"
                  value={evaluationNotes}
                  onChange={(e) => setEvaluationNotes(e.target.value)}
                  placeholder="Ajoutez vos notes d'évaluation..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedRequest(null);
                    setEvaluationNotes('');
                  }}
                >
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => rejectRequest(selectedRequest)}
                  className="flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Rejeter
                </Button>
                <Button
                  onClick={() => approveRequest(selectedRequest)}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approuver
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bouton de déconnexion */}
      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={() => setIsAuthenticated(false)}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          Déconnexion Super Admin
        </Button>
      </div>
    </div>
  );
} 