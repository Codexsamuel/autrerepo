"use client";

import { useState } from 'react';
import { Brain, FileText, Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface CommercialDocumentRequest {
  clientName: string;
  projectName: string;
  industry: string;
  objectives: string;
  budget: string;
  duration: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  deliverables: string;
  documentType: 'proposal' | 'presentation' | 'report' | 'plan';
  tone: 'professional' | 'creative' | 'technical' | 'friendly';
  language: 'fr' | 'en' | 'es';
}

interface CommercialDocumentResponse {
  success: boolean;
  document: {
    title: string;
    summary: string;
    sections: Array<{
      type: string;
      title: string;
      content: string;
      imageUrl?: string;
    }>;
    budget: {
      total: number;
      breakdown: Array<{
        item: string;
        cost: number;
        description: string;
      }>;
    };
    planning: {
      phases: Array<{
        phase: string;
        duration: string;
        tasks: string[];
        deliverables: string[];
      }>;
    };
    kpis: Array<{
      metric: string;
      target: string;
      measurement: string;
    }>;
    nextSteps: string[];
  };
  metadata: {
    generationTime: number;
    totalCost: number;
    accuracy: string;
  };
}

export function CommercialDocumentGenerator() {
  const [formData, setFormData] = useState<CommercialDocumentRequest>({
    clientName: '',
    projectName: '',
    industry: '',
    objectives: '',
    budget: '',
    duration: '',
    targetAudience: '',
    uniqueSellingPoints: '',
    deliverables: '',
    documentType: 'proposal',
    tone: 'professional',
    language: 'fr'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CommercialDocumentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof CommercialDocumentRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/commercial-document/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la génération');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (format: 'pdf' | 'word' | 'powerpoint') => {
    // Simulation de téléchargement
    alert(`Téléchargement du document en format ${format.toUpperCase()}...`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Générateur de Documents Commerciaux
          </h2>
          <p className="text-gray-600">
            Créez des documents commerciaux professionnels en quelques minutes avec l'IA
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations de base */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Informations de base</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du client *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: BFI Cameroun"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du projet *
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Campagne Marketing Digitale"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secteur d'activité *
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Finance, E-commerce, Santé..."
                  required
                />
              </div>
            </div>

            {/* Configuration du document */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de document *
                </label>
                <select
                  value={formData.documentType}
                  onChange={(e) => handleInputChange('documentType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="proposal">Proposition Commerciale</option>
                  <option value="presentation">Présentation</option>
                  <option value="report">Rapport</option>
                  <option value="plan">Plan d'Action</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ton *
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => handleInputChange('tone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="professional">Professionnel</option>
                  <option value="creative">Créatif</option>
                  <option value="technical">Technique</option>
                  <option value="friendly">Amical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Langue *
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          </div>

          {/* Détails du projet */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Détails du projet</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objectifs *
              </label>
              <textarea
                value={formData.objectives}
                onChange={(e) => handleInputChange('objectives', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Ex: Augmenter la visibilité de 50% et générer 1000 nouveaux clients"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget *
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 50000€"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée *
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 6 mois"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Public cible *
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Professionnels 25-45 ans, secteur financier"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points forts uniques *
              </label>
              <textarea
                value={formData.uniqueSellingPoints}
                onChange={(e) => handleInputChange('uniqueSellingPoints', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="Ex: Innovation technologique, expertise locale, support 24/7"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Livrables *
              </label>
              <textarea
                value={formData.deliverables}
                onChange={(e) => handleInputChange('deliverables', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="Ex: Site web, application mobile, campagne publicitaire, analytics"
                required
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isGenerating}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Génération en cours...</span>
                </>
              ) : (
                <>
                  <Brain className="w-6 h-6" />
                  <span>Générer le Document</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Erreur</span>
          </div>
          <p className="text-red-700 mt-2">{error}</p>
        </div>
      )}

      {/* Résultats */}
      {result && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{result.document.title}</h3>
              <p className="text-gray-600 mt-1">
                Généré en {result.metadata.generationTime / 1000}s avec une précision de {result.metadata.accuracy}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDownload('pdf')}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
              <button
                onClick={() => handleDownload('word')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Word</span>
              </button>
              <button
                onClick={() => handleDownload('powerpoint')}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>PPT</span>
              </button>
            </div>
          </div>

          {/* Résumé */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Résumé Exécutif</h4>
            <p className="text-blue-800">{result.document.summary}</p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {result.document.sections.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">{section.title}</h4>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{section.content}</p>
                </div>
                {section.imageUrl && (
                  <div className="mt-4">
                    <img
                      src={section.imageUrl}
                      alt={section.title}
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Budget */}
          <div className="mt-8 bg-green-50 rounded-lg p-6">
            <h4 className="font-semibold text-green-900 mb-4">Budget Détaillé</h4>
            <div className="space-y-3">
              {result.document.budget.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-green-800">{item.item}</span>
                    <p className="text-sm text-green-700">{item.description}</p>
                  </div>
                  <span className="font-semibold text-green-900">{item.cost.toLocaleString()}€</span>
                </div>
              ))}
              <div className="border-t border-green-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-900">Total</span>
                  <span className="font-bold text-green-900">{result.document.budget.total.toLocaleString()}€</span>
                </div>
              </div>
            </div>
          </div>

          {/* Planning */}
          <div className="mt-8 bg-purple-50 rounded-lg p-6">
            <h4 className="font-semibold text-purple-900 mb-4">Planning de Projet</h4>
            <div className="space-y-4">
              {result.document.planning.phases.map((phase, index) => (
                <div key={index} className="border-l-4 border-purple-400 pl-4">
                  <h5 className="font-medium text-purple-800">{phase.phase}</h5>
                  <p className="text-sm text-purple-700 mb-2">Durée: {phase.duration}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-purple-800 text-sm">Tâches:</h6>
                      <ul className="text-sm text-purple-700">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>• {task}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-purple-800 text-sm">Livrables:</h6>
                      <ul className="text-sm text-purple-700">
                        {phase.deliverables.map((deliverable, delIndex) => (
                          <li key={delIndex}>• {deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="mt-8 bg-yellow-50 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-900 mb-4">Indicateurs de Performance (KPIs)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {result.document.kpis.map((kpi, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-yellow-200">
                  <h5 className="font-medium text-yellow-800 text-sm">{kpi.metric}</h5>
                  <p className="text-lg font-bold text-yellow-900">{kpi.target}</p>
                  <p className="text-xs text-yellow-700">{kpi.measurement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prochaines étapes */}
          <div className="mt-8 bg-indigo-50 rounded-lg p-6">
            <h4 className="font-semibold text-indigo-900 mb-4">Prochaines Étapes</h4>
            <ol className="space-y-2">
              {result.document.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-indigo-800">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
} 