"use client";

import { NovaAIService, getRecommendedServices } from '@/lib/services/nova-ai-catalog';
import { ArrowRight, Brain, CheckCircle, Clock, DollarSign, Search, Sparkles, Star, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NovaIAssistantProps {
  initialSearch?: string;
}

type Step = 'input' | 'recommendations' | 'service-details' | 'execution' | 'results';

export function NovaIAssistant({ initialSearch = '' }: NovaIAssistantProps) {
  const [currentStep, setCurrentStep] = useState<Step>('input');
  const [userInput, setUserInput] = useState(initialSearch);
  const [recommendedServices, setRecommendedServices] = useState<NovaAIService[]>([]);
  const [selectedService, setSelectedService] = useState<NovaAIService | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [executionProgress, setExecutionProgress] = useState(0);

  useEffect(() => {
    if (initialSearch) {
      handleSearch(initialSearch);
    }
  }, [initialSearch]);

  const handleSearch = (input: string) => {
    setUserInput(input);
    const recommendations = getRecommendedServices(input);
    setRecommendedServices(recommendations);
    setCurrentStep('recommendations');
  };

  const handleServiceSelect = (service: NovaAIService) => {
    setSelectedService(service);
    setCurrentStep('service-details');
  };

  const handleExecuteService = async () => {
    if (!selectedService) return;

    setIsExecuting(true);
    setCurrentStep('execution');
    setExecutionProgress(0);

    // Simulation de progression
    const progressInterval = setInterval(() => {
      setExecutionProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    try {
      // Simulation d'exécution du service
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Résultats simulés selon le type de service
      const simulatedResults = generateSimulatedResults(selectedService);
      setResults(simulatedResults);
      
      setExecutionProgress(100);
      setCurrentStep('results');
    } catch (error) {
      console.error('Erreur lors de l\'exécution:', error);
    } finally {
      setIsExecuting(false);
      clearInterval(progressInterval);
    }
  };

  const generateSimulatedResults = (service: NovaAIService) => {
    const baseResults = {
      service: service.name,
      executionTime: `${Math.floor(Math.random() * 30) + 10} secondes`,
      accuracy: service.accuracy,
      cost: `${service.price}€`,
      credits: service.credits
    };

    switch (service.category) {
      case 'conversation':
        return {
          ...baseResults,
          type: 'conversation',
          content: `Voici une réponse générée par ${service.name} basée sur votre demande : "${userInput}". Cette réponse a été créée avec une précision de ${service.accuracy} et utilise les dernières technologies d'IA conversationnelle.`,
          suggestions: [
            'Poser une question de suivi',
            'Demander plus de détails',
            'Changer de sujet'
          ]
        };

      case 'images':
        return {
          ...baseResults,
          type: 'image',
          imageUrl: `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${encodeURIComponent(service.name)}`,
          description: `Image générée par ${service.name} basée sur votre demande. Qualité optimisée pour un usage professionnel.`,
          downloadOptions: ['PNG', 'JPG', 'SVG']
        };

      case 'audio':
        return {
          ...baseResults,
          type: 'audio',
          audioUrl: '#',
          duration: '15 secondes',
          quality: 'Haute qualité',
          downloadOptions: ['MP3', 'WAV']
        };

      case 'business':
        return {
          ...baseResults,
          type: 'business',
          report: `Rapport généré par ${service.name} : Analyse complète basée sur vos données et objectifs. Inclut des recommandations stratégiques et des insights business.`,
          metrics: {
            'Précision': service.accuracy,
            'Temps de traitement': baseResults.executionTime,
            'Coût': baseResults.cost
          },
          recommendations: [
            'Optimiser les processus',
            'Améliorer l\'efficacité',
            'Réduire les coûts'
          ]
        };

      default:
        return {
          ...baseResults,
          type: 'general',
          message: `Service ${service.name} exécuté avec succès. Résultats disponibles pour analyse et utilisation.`
        };
    }
  };

  const renderInputStep = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🧠 NovaIA - Assistant IA Intelligent
        </h2>
        <p className="text-gray-600">
          Décrivez votre besoin et NovaIA vous recommandera les services IA les plus adaptés
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Que voulez-vous faire ?
          </label>
          <textarea
            placeholder="Ex: J'ai besoin de créer du contenu marketing pour mon e-commerce, générer des images de produits, et analyser mes concurrents..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => handleSearch(userInput)}
            disabled={!userInput.trim()}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>Trouver mes services IA</span>
          </button>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Exemples populaires :</h4>
          <div className="grid grid-cols-1 gap-2">
            {[
              "Créer du contenu marketing pour mon blog",
              "Générer des images pour mes produits",
              "Analyser mes concurrents e-commerce",
              "Créer un chatbot pour mon site",
              "Traduire mon contenu en plusieurs langues"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => handleSearch(example)}
                className="text-left p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-md border border-gray-200 hover:border-blue-300 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecommendationsStep = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🎯 Services IA Recommandés</h3>
        <p className="text-gray-600 mb-6">
          Basé sur votre demande : <span className="font-medium">"{userInput}"</span>
        </p>

        {recommendedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{service.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="flex items-center text-sm text-gray-500">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {service.price}€
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.processingTime}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 mr-1" />
                        {service.accuracy}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun service trouvé pour votre demande.</p>
            <button
              onClick={() => setCurrentStep('input')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Modifier ma demande
            </button>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentStep('input')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Modifier ma demande
        </button>
      </div>
    </div>
  );

  const renderServiceDetailsStep = () => (
    <div className="space-y-6">
      {selectedService && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="text-3xl">{selectedService.icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{selectedService.name}</h3>
              <p className="text-gray-600">{selectedService.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">✨ Fonctionnalités</h4>
              <ul className="space-y-2">
                {selectedService.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">📊 Informations</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Prix :</span>
                  <span className="font-semibold">{selectedService.price}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Crédits :</span>
                  <span className="font-semibold">{selectedService.credits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Temps de traitement :</span>
                  <span className="font-semibold">{selectedService.processingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Précision :</span>
                  <span className="font-semibold">{selectedService.accuracy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Difficulté :</span>
                  <span className="font-semibold capitalize">{selectedService.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">🎯 Cas d'usage</h4>
            <div className="flex flex-wrap gap-2">
              {selectedService.useCases.map((useCase, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleExecuteService}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Exécuter le service</span>
            </button>
            <button
              onClick={() => setCurrentStep('recommendations')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderExecutionStep = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Exécution en cours...
      </h3>
      
      <p className="text-gray-600 mb-8">
        {selectedService?.name} traite votre demande
      </p>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${executionProgress}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-500">
        {executionProgress}% terminé
      </p>
    </div>
  );

  const renderResultsStep = () => (
    <div className="space-y-6">
      {results && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Résultats générés</h3>
              <p className="text-gray-600">Service {results.service} exécuté avec succès</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Temps d'exécution</div>
              <div className="font-semibold">{results.executionTime}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Précision</div>
              <div className="font-semibold">{results.accuracy}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Coût</div>
              <div className="font-semibold">{results.cost}</div>
            </div>
          </div>

          {results.type === 'conversation' && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold mb-2">Réponse générée :</h4>
              <p className="text-gray-700">{results.content}</p>
            </div>
          )}

          {results.type === 'image' && (
            <div className="text-center mb-4">
              <img
                src={results.imageUrl}
                alt="Résultat généré"
                className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              />
              <p className="text-sm text-gray-600 mt-2">{results.description}</p>
            </div>
          )}

          {results.type === 'business' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Rapport généré :</h4>
                <p className="text-gray-700">{results.report}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Métriques :</h4>
                  <ul className="space-y-1">
                    {Object.entries(results.metrics).map(([key, value]) => (
                      <li key={key} className="text-sm">
                        <span className="text-gray-600">{key}:</span> {value}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Recommandations :</h4>
                  <ul className="space-y-1">
                    {results.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setCurrentStep('input')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Nouvelle demande
            </button>
            <button
              onClick={() => setCurrentStep('recommendations')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Autres services
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {currentStep === 'input' && renderInputStep()}
      {currentStep === 'recommendations' && renderRecommendationsStep()}
      {currentStep === 'service-details' && renderServiceDetailsStep()}
      {currentStep === 'execution' && renderExecutionStep()}
      {currentStep === 'results' && renderResultsStep()}
    </div>
  );
} 