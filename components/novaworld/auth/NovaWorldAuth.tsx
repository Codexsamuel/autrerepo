'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Building, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase,
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  Shield,
  CreditCard,
  Star,
  Users,
  Video,
  MessageSquare,
  PhoneCall
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  company: string;
  position: string;
  industry: string;
  location: string;
  website: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  verificationLevel: 'basic' | 'verified' | 'premium' | 'enterprise';
  subscription: 'free' | 'premium' | 'enterprise';
}

export function NovaWorldAuth() {
  const [activeTab, setActiveTab] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    company: '',
    position: '',
    industry: '',
    location: '',
    website: '',
    bio: '',
    avatar: '',
    isVerified: false,
    verificationLevel: 'basic',
    subscription: 'free'
  });

  const [verificationDocuments, setVerificationDocuments] = useState({
    identityCard: null,
    businessLicense: null,
    taxCertificate: null,
    positionProof: null,
    companyRegistration: null
  });

  const industries = [
    'Technologie & IA',
    'Finance & Banque',
    'Hôtellerie & Tourisme',
    'Santé & Médecine',
    'Éducation & Formation',
    'Commerce & Retail',
    'Industrie & Manufacture',
    'Transport & Logistique',
    'Énergie & Environnement',
    'Médias & Communication',
    'Consulting & Services',
    'Immobilier & Construction'
  ];

  const positions = [
    'CEO / Directeur Général',
    'Directeur Commercial',
    'Directeur Marketing',
    'Directeur RH',
    'Directeur Financier',
    'Directeur Technique',
    'Directeur Innovation',
    'Directeur Opérationnel',
    'Manager / Chef de Service',
    'Chef de Projet',
    'Spécialiste / Expert',
    'Consultant',
    'Entrepreneur / Fondateur',
    'Investisseur',
    'Autre'
  ];

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setVerificationDocuments(prev => ({ ...prev, [field]: file }));
  };

  const handleSignup = async () => {
    // Logique d'inscription
    console.log('Inscription:', userProfile);
  };

  const handleLogin = async () => {
    // Logique de connexion
    console.log('Connexion:', userProfile);
  };

  const handleVerification = async () => {
    // Logique de vérification
    console.log('Vérification:', verificationDocuments);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">NW</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NovaWorld</h1>
          <p className="text-gray-600">Le premier réseau social B2B africain professionnel</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="signup">Inscription</TabsTrigger>
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="verification">Vérification</TabsTrigger>
          </TabsList>

          {/* Inscription */}
          <TabsContent value="signup">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Créer votre compte NovaWorld
                </CardTitle>
                <p className="text-gray-600">
                  Rejoignez la communauté des professionnels africains
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={userProfile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Votre prénom"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={userProfile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Votre nom"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email professionnel *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre.email@entreprise.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+237 6 XX XX XX XX"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Informations professionnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Entreprise *</Label>
                    <Input
                      id="company"
                      value={userProfile.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Nom de votre entreprise"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Poste *</Label>
                    <select
                      value={userProfile.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sélectionnez votre poste</option>
                      {positions.map((pos, index) => (
                        <option key={index} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">Secteur d'activité *</Label>
                    <select
                      value={userProfile.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sélectionnez votre secteur</option>
                      {industries.map((industry, index) => (
                        <option key={index} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="location">Localisation *</Label>
                    <Input
                      id="location"
                      value={userProfile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Ville, Pays"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Site web de l'entreprise</Label>
                  <Input
                    id="website"
                    value={userProfile.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://www.votreentreprise.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio professionnelle</Label>
                  <textarea
                    id="bio"
                    value={userProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Décrivez votre expertise et vos réalisations..."
                    rows={3}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Photo de profil */}
                <div>
                  <Label>Photo de profil</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={userProfile.avatar} alt="Photo de profil" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
                        {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" size="sm" className="w-fit">
                        <Camera className="w-4 h-4 mr-2" />
                        Prendre une photo
                      </Button>
                      <Button variant="outline" size="sm" className="w-fit">
                        <Upload className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sécurité */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Mot de passe *</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={userProfile.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Minimum 8 caractères"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={userProfile.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Retapez votre mot de passe"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Conditions et création */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600">
                      J'accepte les <a href="/terms" className="text-blue-600 hover:underline">conditions d'utilisation</a> et la{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline">politique de confidentialité</a>
                    </Label>
                  </div>
                  
                  <Button 
                    onClick={handleSignup}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                  >
                    Créer mon compte NovaWorld
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-600">
                  Déjà un compte ?{' '}
                  <button
                    onClick={() => setActiveTab('login')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Se connecter
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Connexion */}
          <TabsContent value="login">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Se connecter à NovaWorld
                </CardTitle>
                <p className="text-gray-600">
                  Accédez à votre réseau professionnel
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="loginEmail">Email professionnel</Label>
                  <Input
                    id="loginEmail"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre.email@entreprise.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="loginPassword">Mot de passe</Label>
                  <div className="relative mt-1">
                    <Input
                      id="loginPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={userProfile.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Votre mot de passe"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Se souvenir de moi
                    </Label>
                  </div>
                  <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>

                <Button 
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                >
                  Se connecter
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Pas encore de compte ?{' '}
                  <button
                    onClick={() => setActiveTab('signup')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    S'inscrire
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vérification */}
          <TabsContent value="verification">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Vérification de votre profil
                </CardTitle>
                <p className="text-gray-600">
                  Obtenez votre badge de vérification pour plus de crédibilité
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Niveaux de vérification */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Basique</h4>
                    <p className="text-xs text-gray-600">Profil standard</p>
                  </div>
                  <div className="text-center p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-900">Vérifié</h4>
                    <p className="text-xs text-blue-700">Badge de confiance</p>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Premium</h4>
                    <p className="text-xs text-gray-600">Accès étendu</p>
                  </div>
                </div>

                {/* Documents de vérification */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Documents requis pour la vérification</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="identityCard">Carte d'identité / Passeport *</Label>
                      <div className="mt-1 flex items-center space-x-2">
                        <Input
                          id="identityCard"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('identityCard', e.target.files?.[0] || null)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="positionProof">Justificatif de poste *</Label>
                      <div className="mt-1 flex items-center space-x-2">
                        <Input
                          id="positionProof"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('positionProof', e.target.files?.[0] || null)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessLicense">Licence commerciale (si entrepreneur)</Label>
                      <div className="mt-1 flex items-center space-x-2">
                        <Input
                          id="businessLicense"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('businessLicense', e.target.files?.[0] || null)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="taxCertificate">Certificat fiscal (si applicable)</Label>
                      <div className="mt-1 flex items-center space-x-2">
                        <Input
                          id="taxCertificate"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('taxCertificate', e.target.files?.[0] || null)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="companyRegistration">Enregistrement de l'entreprise (si applicable)</Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Input
                        id="companyRegistration"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload('companyRegistration', e.target.files?.[0] || null)}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Informations supplémentaires */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-blue-900">Processus de vérification</h5>
                      <p className="text-sm text-blue-800 mt-1">
                        Nos équipes vérifient vos documents sous 24-48h. Une fois approuvé, vous recevrez votre badge de vérification 
                        et pourrez accéder à toutes les fonctionnalités premium de NovaWorld.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleVerification}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Soumettre pour vérification
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Fonctionnalités premium */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Découvrez les fonctionnalités premium
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Appels vidéo & audio</h3>
              <p className="text-sm text-gray-600">
                Communiquez en direct avec vos connexions professionnelles
              </p>
            </div>
            
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Groupes de travail</h3>
              <p className="text-sm text-gray-600">
                Collaborez efficacement avec vos équipes et partenaires
              </p>
            </div>
            
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Accès premium</h3>
              <p className="text-sm text-gray-600">
                Contactez les hauts cadres et accédez aux fonctionnalités avancées
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 