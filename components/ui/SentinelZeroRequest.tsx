'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  User, 
  Briefcase, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Send,
  Loader2
} from 'lucide-react';

interface AccessRequest {
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
}

export function SentinelZeroRequest() {
  const [request, setRequest] = useState<AccessRequest>({
    email: '',
    firstName: '',
    lastName: '',
    profession: '',
    position: '',
    company: '',
    experience: '',
    motivation: '',
    useCase: '',
    securityLevel: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitted' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const professions = [
    'Cybersécurité',
    'Développement Logiciel',
    'Intelligence Artificielle',
    'Analyse de Données',
    'Sécurité des Systèmes',
    'Recherche & Développement',
    'Consulting IT',
    'Audit & Conformité',
    'Défense & Sécurité',
    'Finance & Trading',
    'Médecine & Santé',
    'Éducation & Formation',
    'Autre'
  ];

  const positions = [
    'Directeur / CEO',
    'Directeur Technique / CTO',
    'Directeur Sécurité / CISO',
    'Chef de Projet',
    'Architecte Système',
    'Développeur Senior',
    'Analyste Sécurité',
    'Chercheur',
    'Consultant Senior',
    'Auditeur',
    'Ingénieur',
    'Autre'
  ];

  const securityLevels = [
    'Niveau 1 - Accès Basique',
    'Niveau 2 - Accès Standard',
    'Niveau 3 - Accès Avancé',
    'Niveau 4 - Accès Expert',
    'Niveau 5 - Accès Ultra-Sécurisé'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/sentinel-zero/request-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        setStatus('submitted');
        setRequest({
          email: '',
          firstName: '',
          lastName: '',
          profession: '',
          position: '',
          company: '',
          experience: '',
          motivation: '',
          useCase: '',
          securityLevel: ''
        });
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Erreur lors de la soumission');
        setStatus('error');
      }
    } catch (error) {
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof AccessRequest, value: string) => {
    setRequest(prev => ({ ...prev, [field]: value }));
  };

  if (status === 'submitted') {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-green-800">Demande Soumise avec Succès !</CardTitle>
          <CardDescription className="text-green-700">
            Votre demande d'accès Sentinel Zero a été enregistrée
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">📧 Prochaines Étapes :</h4>
            <ol className="text-sm text-green-700 space-y-1 text-left">
              <li>1. Vérifiez votre email pour la confirmation</li>
              <li>2. Notre équipe évalue votre candidature</li>
              <li>3. Vous recevrez une notification de décision</li>
              <li>4. Si approuvé : identifiants d'accès par email</li>
            </ol>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">⏱️ Délai d'Évaluation :</h4>
            <p className="text-blue-700 text-sm">
              L'évaluation prend généralement 24-48h selon la complexité de votre demande
            </p>
          </div>
          
          <Button 
            onClick={() => setStatus('idle')}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            Soumettre une Autre Demande
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Shield className="w-8 h-8 text-red-600" />
          Demande d'Accès Sentinel Zero
        </CardTitle>
        <CardDescription className="text-lg">
          Formulaire de candidature pour accéder aux outils ultra-sécurisés
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={request.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Votre prénom"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={request.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Votre nom"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Professionnel *</Label>
            <Input
              id="email"
              type="email"
              value={request.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="votre.email@entreprise.com"
              required
            />
          </div>

          {/* Informations professionnelles */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profession">Profession *</Label>
              <Select 
                value={request.profession} 
                onValueChange={(value) => handleInputChange('profession', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre profession" />
                </SelectTrigger>
                <SelectContent>
                  {professions.map((prof) => (
                    <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Poste / Fonction *</Label>
              <Select 
                value={request.position} 
                onValueChange={(value) => handleInputChange('position', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre poste" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Entreprise / Organisation *</Label>
            <Input
              id="company"
              value={request.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Nom de votre entreprise"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Expérience Professionnelle *</Label>
            <Select 
              value={request.experience} 
              onValueChange={(value) => handleInputChange('experience', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre expérience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2 ans">0-2 ans</SelectItem>
                <SelectItem value="3-5 ans">3-5 ans</SelectItem>
                <SelectItem value="6-10 ans">6-10 ans</SelectItem>
                <SelectItem value="10+ ans">10+ ans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">Motivation pour l'Accès *</Label>
            <Textarea
              id="motivation"
              value={request.motivation}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
              placeholder="Expliquez pourquoi vous avez besoin d'accéder à Sentinel Zero..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="useCase">Cas d'Usage Prévu *</Label>
            <Textarea
              id="useCase"
              value={request.useCase}
              onChange={(e) => handleInputChange('useCase', e.target.value)}
              placeholder="Décrivez comment vous comptez utiliser ces outils..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="securityLevel">Niveau de Sécurité Souhaité *</Label>
            <Select 
              value={request.securityLevel} 
              onValueChange={(value) => handleInputChange('securityLevel', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le niveau de sécurité" />
              </SelectTrigger>
              <SelectContent>
                {securityLevels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Avertissement */}
          <Alert>
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              <strong>⚠️ Attention :</strong> L'accès à Sentinel Zero est strictement contrôlé. 
              Toutes les demandes sont évaluées individuellement par notre équipe de sécurité. 
              La falsification d'informations entraînera un rejet définitif.
            </AlertDescription>
          </Alert>

          {/* Bouton de soumission */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex items-center gap-2"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Soumission en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Soumettre ma Demande d'Accès
              </>
            )}
          </Button>

          {/* Message d'erreur */}
          {status === 'error' && (
            <Alert>
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription className="text-red-700">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
} 