"use client";

import { useState, useRef } from "react";
import { FileText, Download, Eye, Printer, Send, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



interface DocumentTemplate {
  id: string
  name: string
  description: string
  icon: string
  fields: DocumentField[]
  preview: string
}

interface DocumentField {
  id: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'date' | 'number' | 'email'
  required: boolean
  placeholder?: string
  options?: string[]
}

interface GeneratedDocument {
  id: string
  template: DocumentTemplate
  data: Record<string, any>
  generatedAt: Date
  status: 'draft' | 'final' | 'sent'
}

const documentTemplates: DocumentTemplate[] = [
  {
    id: 'contrat-partenaire',
    name: 'Contrat Partenaire',
    description: 'Contrat de partenariat commercial',
    icon: '🤝',
    fields: [
      { id: 'nom_partenaire', label: 'Nom du Partenaire', type: 'text', required: true, placeholder: 'Nom de l\'entreprise partenaire' },
      { id: 'adresse', label: 'Adresse', type: 'textarea', required: true, placeholder: 'Adresse complète' },
      { id: 'telephone', label: 'Téléphone', type: 'text', required: true, placeholder: '+237 XXX XXX XXX' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'contact@partenaire.com' },
      { id: 'type_partenariat', label: 'Type de Partenariat', type: 'select', required: true, options: ['Commercial', 'Technique', 'Marketing', 'Distribution'] },
      { id: 'date_debut', label: 'Date de Début', type: 'date', required: true },
      { id: 'date_fin', label: 'Date de Fin', type: 'date', required: true },
      { id: 'conditions', label: 'Conditions Spéciales', type: 'textarea', required: false, placeholder: 'Conditions particulières du partenariat' }
    ],
    preview: `
# CONTRAT DE PARTENARIAT

**Entre les soussignés :**

**DL Solutions SARL**, société à responsabilité limitée, ayant son siège social à 2 rue École de Police, Yaoundé, Cameroun, représentée par Samuel OBAM, Directeur Général, d'une part,

**Et :**

**[NOM_PARTENAIRE]**, société ayant son siège social à [ADRESSE], représentée par [REPRESENTANT], d'autre part,

**Il a été convenu ce qui suit :**

## Article 1 - Objet du Partenariat
Le présent contrat a pour objet de définir les conditions de collaboration entre les parties dans le cadre d'un partenariat de type [TYPE_PARTENARIAT].

## Article 2 - Durée
Ce contrat prend effet à compter du [DATE_DEBUT] et s'achève le [DATE_FIN].

## Article 3 - Conditions Spéciales
[CONDITIONS]
**Fait à Yaoundé, le [DATE]**

**DL Solutions SARL**                    **[NOM_PARTENAIRE]**
Signature : _______________             Signature : _______________
    `
  },
  {
    id: 'fiche-caisse',
    name: 'Fiche de Caisse',
    description: 'Fiche de sortie de caisse',
    icon: '💰',
    fields: [
      { id: 'date', label: 'Date', type: 'date', required: true },
      { id: 'montant', label: 'Montant', type: 'number', required: true, placeholder: 'Montant en FCFA' },
      { id: 'motif', label: 'Motif', type: 'text', required: true, placeholder: 'Raison de la sortie' },
      { id: 'beneficiaire', label: 'Bénéficiaire', type: 'text', required: true, placeholder: 'Nom du bénéficiaire' },
      { id: 'autorise_par', label: 'Autorisé par', type: 'text', required: true, placeholder: 'Nom de l\'autorité' },
      { id: 'observations', label: 'Observations', type: 'textarea', required: false, placeholder: 'Observations supplémentaires' }
    ],
    preview: `
# FICHE DE SORTIE DE CAISSE

**Date :** [DATE]
**Montant :** [MONTANT] FCFA
**Motif :** [MOTIF]
**Bénéficiaire :** [BENEFICIAIRE]
**Autorisé par :** [AUTORISE_PAR]
**Observations :**
[OBSERVATIONS]
---
**Signature du bénéficiaire :** _______________
**Signature de l'autorité :** _______________
    `
  },
  {
    id: 'contrat-collaborateur',
    name: 'Contrat Collaborateur',
    description: 'Contrat de travail pour nouveau collaborateur',
    icon: '👤',
    fields: [
      { id: 'nom', label: 'Nom et Prénom', type: 'text', required: true, placeholder: 'Nom complet du collaborateur' },
      { id: 'date_naissance', label: 'Date de Naissance', type: 'date', required: true },
      { id: 'adresse', label: 'Adresse', type: 'textarea', required: true, placeholder: 'Adresse complète' },
      { id: 'telephone', label: 'Téléphone', type: 'text', required: true, placeholder: '+237 XXX XXX XXX' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'email@collaborateur.com' },
      { id: 'poste', label: 'Poste', type: 'text', required: true, placeholder: 'Titre du poste' },
      { id: 'salaire', label: 'Salaire Mensuel', type: 'number', required: true, placeholder: 'Salaire en FCFA' },
      { id: 'date_embauche', label: 'Date d\'Embauche', type: 'date', required: true },
      { id: 'periode_essai', label: 'Période d\'Essai', type: 'select', required: true, options: ['1 mois', '2 mois', '3 mois', '6 mois'] }
    ],
    preview: `
# CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE

**Entre :**

**DL Solutions SARL**, société à responsabilité limitée, ayant son siège social à 2 rue École de Police, Yaoundé, Cameroun, représentée par Samuel OBAM, Directeur Général, employeur,

**Et :**

**[NOM]**, né(e) le [DATE_NAISSANCE], demeurant à [ADRESSE], téléphone : [TELEPHONE], email : [EMAIL], employé(e),

**Il a été convenu ce qui suit :**

## Article 1 - Engagement
L'employeur engage l'employé(e) au poste de [POSTE] à compter du [DATE_EMBAUCHE].

## Article 2 - Rémunération
L'employé(e) percevra un salaire mensuel de [SALAIRE] FCFA.

## Article 3 - Période d'Essai
Une période d'essai de [PERIODE_ESSAI] est prévue.

**Fait à Yaoundé, le [DATE]**

**DL Solutions SARL**                    **Employé(e)**
Signature : _______________             Signature : _______________
    `
  },
  {
    id: 'rapport-journalier',
    name: 'Rapport Journalier',
    description: 'Rapport d\'activité quotidien',
    icon: '📊',
    fields: [
      { id: 'date', label: 'Date', type: 'date', required: true },
      { id: 'activites_realisees', label: 'Activités Réalisées', type: 'textarea', required: true, placeholder: 'Liste des activités effectuées' },
      { id: 'resultats', label: 'Résultats Obtenus', type: 'textarea', required: true, placeholder: 'Résultats et accomplissements' },
      { id: 'difficultes', label: 'Difficultés Rencontrées', type: 'textarea', required: false, placeholder: 'Problèmes rencontrés' },
      { id: 'prochaines_actions', label: 'Prochaines Actions', type: 'textarea', required: true, placeholder: 'Actions prévues pour demain' },
      { id: 'remarques', label: 'Remarques', type: 'textarea', required: false, placeholder: 'Observations générales' }
    ],
    preview: `
# RAPPORT JOURNALIER

**Date :** [DATE]
## Activités Réalisées
[ACTIVITES_REALISEES]
## Résultats Obtenus
[RESULTATS]
## Difficultés Rencontrées
[DIFFICULTES]
## Prochaines Actions
[PROCHAINES_ACTIONS]
## Remarques
[REMARQUES]
---
**Rédigé par :** _______________
**Validé par :** _______________
    `
  }
]

export function SmartDocumentGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocument[]>([])
  const [activeTab, setActiveTab] = useState('templates')
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Gestion des changements de formulaire
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  // Génération du document
  const generateDocument = async () => {
    if (!selectedTemplate) return

    setIsGenerating(true)
    
    try {
      // Simulation de génération
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newDocument: GeneratedDocument = {
        id: Date.now().toString(),
        template: selectedTemplate,
        data: { ...formData },
        generatedAt: new Date(),
        status: 'draft'
      }
      
      setGeneratedDocuments(prev => [newDocument, ...prev])
      setActiveTab('generated')
      
      // Réinitialiser le formulaire
      setFormData({})
    } catch (error) {
      console.error('Erreur de génération:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Prévisualisation du document
  const getDocumentPreview = (template: DocumentTemplate, data: Record<string, any>) => {
    let preview = template.preview
    
    // Remplacer les placeholders par les données
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = `[${key.toUpperCase()}]`
      preview = preview.replace(new RegExp(placeholder, 'g'), value || '___________')
    })
    
    return preview
  }

  // Export PDF (simulation)
  const exportPDF = async (document: GeneratedDocument) => {
    // Ici, intégrer une vraie bibliothèque PDF comme jsPDF ou Puppeteer
    console.log('Export PDF:', document)
    alert('Fonctionnalité d\'export PDF en cours de développement')
  }

  // Export Word (simulation)
  const exportWord = async (document: GeneratedDocument) => {
    // Ici, intégrer docx.js ou similaire
    console.log('Export Word:', document)
    alert('Fonctionnalité d\'export Word en cours de développement')
  }

  // Génération de lien public
  const generatePublicLink = async (document: GeneratedDocument) => {
    const link = `${window.location.origin}/document/${document.id}`
    await navigator.clipboard.writeText(link)
    setCopiedLink(document.id)
    setTimeout(() => setCopiedLink(null), 2000)
  }

  // Validation du formulaire
  const isFormValid = () => {
    if (!selectedTemplate) return false
    
    return selectedTemplate.fields.every(field => {
      if (!field.required) return true
      return formData[field.id] && formData[field.id].toString().trim() !== ''
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Générateur de Documents Intelligents</h1>
        <p className="text-gray-600">Créez, prévisualisez et partagez vos documents professionnels</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Modèles</TabsTrigger>
          <TabsTrigger value="generator">Générateur</TabsTrigger>
          <TabsTrigger value="generated">Documents Générés</TabsTrigger>
        </TabsList>

        {/* Onglet Modèles */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentTemplates.map((template) => (
              <div
                key={template.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTemplate?.id === template.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => {
                  setSelectedTemplate(template)
                  setActiveTab('generator')
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{template.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <Badge variant="outline">{template.fields.length} champs</Badge>
                </CardContent>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Onglet Générateur */}
        <TabsContent value="generator" className="space-y-6">
          {selectedTemplate ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formulaire */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">{selectedTemplate.icon}</span>
                    <span>{selectedTemplate.name}</span>
                  </CardTitle>
                  <p className="text-gray-600">{selectedTemplate.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedTemplate.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id} className="flex items-center space-x-2">
                        <span>{field.label}</span>
                        {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      
                      {field.type === 'textarea' ? (
                        <Textarea
                          id={field.id}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="min-h-[100px]"
                        />
                      ) : field.type === 'select' ? (
                        <Select
                          value={formData[field.id] || ''}
                          onValueChange={(value) => handleFieldChange(field.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={field.id}
                          type={field.type}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}
                  
                  <div className="flex space-x-4 pt-4">
                    <Button
                      onClick={generateDocument}
                      disabled={!isFormValid() || isGenerating}
                      className="flex-1"
                    >isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Génération...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          Générer le Document
                        </>
                      )</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Prévisualisation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Prévisualisation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-6 rounded-lg border min-h-[400px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {getDocumentPreview(selectedTemplate, formData)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez un modèle</h3>
                <p className="text-gray-600 mb-4">
                  Choisissez un modèle de document dans l'onglet "Modèles" pour commencer
                </p>
                <Button onClick={() => setActiveTab('templates')}>
                  Voir les Modèles
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Onglet Documents Générés */}
        <TabsContent value="generated" className="space-y-6">
          {generatedDocuments.length > 0 ? (
            <div className="space-y-4">
              {generatedDocuments.map((document) => (
                <div
                  key={document.id}
                  className="transition-all duration-200"
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{document.template.icon}</span>
                          <div>
                            <h3 className="font-semibold">{document.template.name}</h3>
                            <p className="text-sm text-gray-600">
                              Généré le {document.generatedAt.toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <Badge variant={document.status === 'draft' ? 'secondary' : 'default'}>document.status === 'draft' ? 'Brouillon' : 'Finalisé'</Badge>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => exportPDF(document)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => exportWord(document)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Word
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generatePublicLink(document)}
                        >
                          {copiedLink === document.id ? (
                            <Check className="mr-2 h-4 w-4" />
                          ) : (
                            <Copy className="mr-2 h-4 w-4" />
                          )}
                          {copiedLink === document.id ? 'Copié !' : 'Lien Public'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.print()}
                        >
                          <Printer className="mr-2 h-4 w-4" />
                          Imprimer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document généré</h3>
                <p className="text-gray-600 mb-4">
                  Les documents que vous générez apparaîtront ici
                </p>
                <Button onClick={() => setActiveTab('templates')}>
                  Créer un Document
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 