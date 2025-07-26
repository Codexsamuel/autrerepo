import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Building,
    Camera,
    CheckCircle,
    DollarSign,
    FileText,
    Home,
    MapPin,
    Shield,
    Upload,
    Users
} from 'lucide-react';
import React, { useState } from 'react';

interface PropertyType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export default function ProprietaireInscription() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    
    // Informations entreprise
    nomEntreprise: '',
    siret: '',
    adresseEntreprise: '',
    
    // Types de biens
    typesBiens: [] as string[],
    
    // Documents
    documents: {
      pieceIdentite: null as File | null,
      justificatifDomicile: null as File | null,
      attestationFiscale: null as File | null,
      extraitKbis: null as File | null,
      justificatifBancaire: null as File | null,
      photosBiens: [] as File[],
    },
    
    // Conditions
    accepteConditions: false,
    accepteMarketing: false,
  });

  const propertyTypes: PropertyType[] = [
    {
      id: 'appartements',
      name: 'Appartements',
      description: 'Studios, T1, T2, T3, T4 et plus',
      icon: <Home className="h-6 w-6" />,
      features: ['Meublés et non meublés', 'Avec ou sans balcon', 'Résidences sécurisées']
    },
    {
      id: 'maisons',
      name: 'Maisons & Villas',
      description: 'Maisons individuelles et villas de standing',
      icon: <Building className="h-6 w-6" />,
      features: ['De 2 à 6 chambres', 'Avec jardin ou terrasse', 'Garages inclus']
    },
    {
      id: 'bureaux',
      name: 'Bureaux & Locaux',
      description: 'Espaces professionnels et commerciaux',
      icon: <Building className="h-6 w-6" />,
      features: ['Bureaux équipés', 'Locaux commerciaux', 'Entrepôts et stockage']
    },
    {
      id: 'terrains',
      name: 'Terrains',
      description: 'Terrains constructibles',
      icon: <MapPin className="h-6 w-6" />,
      features: ['Terrains titrés', 'Terrains non titrés', 'Terrains agricoles']
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDocumentUpload = (field: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const handlePropertyTypeToggle = (typeId: string) => {
    setFormData(prev => ({
      ...prev,
      typesBiens: prev.typesBiens.includes(typeId)
        ? prev.typesBiens.filter(id => id !== typeId)
        : [...prev.typesBiens, typeId]
    }));
  };

  const handlePhotoUpload = (files: FileList) => {
    const newPhotos = Array.from(files);
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        photosBiens: [...prev.documents.photosBiens, ...newPhotos]
      }
    }));
  };

  const canProceedToStep2 = () => {
    return formData.nom && formData.prenom && formData.email && formData.telephone;
  };

  const canProceedToStep3 = () => {
    return formData.typesBiens.length > 0;
  };

  const canSubmit = () => {
    return formData.documents.pieceIdentite && 
           formData.documents.justificatifDomicile && 
           formData.accepteConditions;
  };

  const handleSubmit = async () => {
    // Simulation de soumission
    console.log('Données soumises:', formData);
    alert('Inscription soumise avec succès ! Vous recevrez un email de confirmation.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Inscription Propriétaire Partenaire</h1>
              <p className="text-sm text-gray-600">Rejoignez DL-Immobilier et maximisez vos revenus</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-8 text-sm">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Informations Personnelles
            </span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Types de Biens
            </span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Documents
            </span>
            <span className={step >= 4 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Validation
            </span>
          </div>
        </div>

        {/* Step 1: Informations Personnelles */}
        {step === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Informations Personnelles</span>
              </CardTitle>
              <CardDescription>
                Remplissez vos informations de base pour commencer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <Input
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <Input
                    value={formData.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    placeholder="Votre prénom"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <Input
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    placeholder="+237 XXX XXX XXX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <Input
                  value={formData.adresse}
                  onChange={(e) => handleInputChange('adresse', e.target.value)}
                  placeholder="Votre adresse complète"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville
                  </label>
                  <Input
                    value={formData.ville}
                    onChange={(e) => handleInputChange('ville', e.target.value)}
                    placeholder="Douala, Yaoundé, etc."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2()}
                >
                  Suivant
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Types de Biens */}
        {step === 2 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Types de Biens Immobiliers</span>
              </CardTitle>
              <CardDescription>
                Sélectionnez les types de biens que vous souhaitez louer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {propertyTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.typesBiens.includes(type.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePropertyTypeToggle(type.id)}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg ${
                        formData.typesBiens.includes(type.id)
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {type.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{type.name}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Précédent
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3()}
                >
                  Suivant
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Documents Requis</span>
              </CardTitle>
              <CardDescription>
                Téléchargez les documents nécessaires pour valider votre inscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pièce d'identité (CNI, Passeport) *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files?.[0] && handleDocumentUpload('pieceIdentite', e.target.files[0])}
                      className="hidden"
                      id="pieceIdentite"
                    />
                    <label htmlFor="pieceIdentite" className="cursor-pointer text-blue-600 hover:text-blue-700">
                      Choisir un fichier
                    </label>
                    {formData.documents.pieceIdentite && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.documents.pieceIdentite.name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Justificatif de domicile *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files?.[0] && handleDocumentUpload('justificatifDomicile', e.target.files[0])}
                      className="hidden"
                      id="justificatifDomicile"
                    />
                    <label htmlFor="justificatifDomicile" className="cursor-pointer text-blue-600 hover:text-blue-700">
                      Choisir un fichier
                    </label>
                    {formData.documents.justificatifDomicile && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.documents.justificatifDomicile.name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photos de vos biens (optionnel)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => e.target.files && handlePhotoUpload(e.target.files)}
                      className="hidden"
                      id="photosBiens"
                    />
                    <label htmlFor="photosBiens" className="cursor-pointer text-blue-600 hover:text-blue-700">
                      Choisir des photos
                    </label>
                    {formData.documents.photosBiens.length > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.documents.photosBiens.length} photo(s) sélectionnée(s)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Précédent
                </Button>
                <Button onClick={() => setStep(4)}>
                  Suivant
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Validation et Paiement */}
        {step === 4 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Validation et Paiement</span>
              </CardTitle>
              <CardDescription>
                Récapitulatif et finalisation de votre inscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Récapitulatif */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Récapitulatif</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nom complet:</span>
                    <span className="font-medium">{formData.prenom} {formData.nom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Types de biens:</span>
                    <span className="font-medium">{formData.typesBiens.length} sélectionné(s)</span>
                  </div>
                </div>
              </div>

              {/* Tarifs */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Tarifs Partenariat
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Frais d'inscription:</span>
                    <span className="font-medium">25.000 FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais mensuel:</span>
                    <span className="font-medium">75.000 FCFA</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total premier mois:</span>
                    <span className="text-blue-600">100.000 FCFA</span>
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="conditions"
                    checked={formData.accepteConditions}
                    onChange={(e) => handleInputChange('accepteConditions', e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="conditions" className="text-sm text-gray-700">
                    J'accepte les <a href="#" className="text-blue-600 hover:underline">conditions générales</a> et la{' '}
                    <a href="#" className="text-blue-600 hover:underline">politique de confidentialité</a> *
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={formData.accepteMarketing}
                    onChange={(e) => handleInputChange('accepteMarketing', e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="marketing" className="text-sm text-gray-700">
                    J'accepte de recevoir des communications marketing de DL-Immobilier
                  </label>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Précédent
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!canSubmit()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Valider l'Inscription
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 