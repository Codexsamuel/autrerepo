"use client";

import { NovaAIService, getRecommendedServices } from '@/lib/services/nova-ai-catalog';
import { ArrowRight, Brain, CheckCircle, Clock, DollarSign, Search, Sparkles, Star, Zap, MessageSquare, Image, Mic, BarChart3, FileText, ShoppingCart } from 'lucide-react';
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
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);

  useEffect(() => {
    if (initialSearch) {
      handleSearch(initialSearch);
    }
  }, [initialSearch]);

  const handleSearch = async (input: string) => {
    setUserInput(input);
    
    // Ajouter à l'historique
    setChatHistory(prev => [...prev, { role: 'user', content: input }]);
    
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

    try {
      let results;
      
      // Exécution réelle selon le type de service
      switch (selectedService.id) {
        case 'chat-ia':
          results = await executeChatService(userInput);
          break;
        case 'text-to-image':
          results = await executeImageGenerationService(userInput);
          break;
        case 'voice-synthesis':
          results = await executeVoiceService(userInput);
          break;
        case 'data-analysis':
          results = await executeDataAnalysisService(userInput);
          break;
        case 'content-generation':
          results = await executeContentGenerationService(userInput);
          break;
        case 'ecommerce-analysis':
          results = await executeEcommerceAnalysisService(userInput);
          break;
        default:
          results = generateSimulatedResults(selectedService);
      }
      
      setResults(results);
      setCurrentStep('results');
      
      // Ajouter la réponse à l'historique
      setChatHistory(prev => [...prev, { role: 'assistant', content: results.content || results.summary || 'Service exécuté avec succès' }]);
      
    } catch (error) {
      console.error('Erreur lors de l\'exécution:', error);
      setResults({
        error: true,
        message: 'Erreur lors de l\'exécution du service. Veuillez réessayer.'
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // Services IA réels avec GPT-4
  const executeChatService = async (input: string) => {
    const response = await fetch('/api/ai/gpt4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'novaia',
        message: input,
        context: 'Assistant NovaIA - Analyse et recommandations'
      })
    });
    
    if (!response.ok) throw new Error('Erreur API chat');
    return await response.json();
  };

  const executeImageGenerationService = async (input: string) => {
    const response = await fetch('/api/ai/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });
    
    if (!response.ok) throw new Error('Erreur API image');
    return await response.json();
  };

  const executeVoiceService = async (input: string) => {
    const response = await fetch('/api/ai/voice-synthesis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    
    if (!response.ok) throw new Error('Erreur API voix');
    return await response.json();
  };

  const executeDataAnalysisService = async (input: string) => {
    const response = await fetch('/api/ai/data-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input })
    });
    
    if (!response.ok) throw new Error('Erreur API analyse');
    return await response.json();
  };

  const executeContentGenerationService = async (input: string) => {
    const response = await fetch('/api/ai/content-generation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });
    
    if (!response.ok) throw new Error('Erreur API contenu');
    return await response.json();
  };

  const executeEcommerceAnalysisService = async (input: string) => {
    const response = await fetch('/api/ai/ecommerce-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input })
    });
    
    if (!response.ok) throw new Error('Erreur API e-commerce');
    return await response.json();
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
          imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`,
          content: `Image générée par ${service.name} basée sur votre description : "${userInput}". L'image a été créée avec une précision de ${service.accuracy}.`,
          downloadUrl: `https://picsum.photos/800/600?random=${Math.random()}`
        };

      case 'voice':
        return {
          ...baseResults,
          type: 'voice',
          audioUrl: '/api/placeholder-audio',
          content: `Audio généré par ${service.name} pour le texte : "${userInput}". La synthèse vocale a une qualité de ${service.accuracy}.`,
          duration: '15 secondes'
        };

      case 'business':
        return {
          ...baseResults,
          type: 'business',
          content: `Analyse business générée par ${service.name} pour : "${userInput}". L'analyse inclut des insights stratégiques et des recommandations.`,
          insights: [
            'Tendance positive identifiée',
            'Opportunité de croissance détectée',
            'Risque modéré évalué'
          ]
        };

      case 'marketing':
        return {
          ...baseResults,
          type: 'marketing',
          content: `Contenu marketing généré par ${service.name} pour : "${userInput}". Le contenu est optimisé pour l'engagement et la conversion.`,
          suggestions: [
            'A/B test recommandé',
            'Optimisation SEO incluse',
            'Call-to-action intégré'
          ]
        };

      case 'ecommerce':
        return {
          ...baseResults,
          type: 'ecommerce',
          content: `Analyse e-commerce générée par ${service.name} pour : "${userInput}". L'analyse inclut des données de marché et des recommandations.`,
          metrics: {
            'Taux de conversion': '3.2%',
            'Panier moyen': '45€',
            'Temps sur site': '2m 30s'
          }
        };

      default:
        return {
          ...baseResults,
          content: `Service ${service.name} exécuté avec succès pour : "${userInput}".`
        };
    }
  };

  const resetToInput = () => {
    setCurrentStep('input');
    setUserInput('');
    setSelectedService(null);
    setResults(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'conversation': return <MessageSquare className="w-5 h-5" />;
      case 'images': return <Image className="w-5 h-5" />;
      case 'voice': return <Mic className="w-5 h-5" />;
      case 'business': return <BarChart3 className="w-5 h-5" />;
      case 'marketing': return <FileText className="w-5 h-5" />;
      case 'ecommerce': return <ShoppingCart className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const renderInputStep = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-2xl font-bold mb-4">Comment puis-je vous aider ?</h2>
        <p className="text-gray-600">
          Décrivez votre besoin et NovaIA vous recommandera les services IA les plus adaptés
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ex: J'ai besoin d'analyser les tendances de mon marché e-commerce..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
            rows={4}
          />
          <button
            onClick={() => handleSearch(userInput)}
            disabled={!userInput.trim()}
            className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestions rapides */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">Suggestions rapides :</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Analyser mes données clients",
              "Générer du contenu marketing",
              "Créer des images pour mon site",
              "Optimiser mon SEO",
              "Analyser la concurrence"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSearch(suggestion)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecommendationsStep = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Services recommandés</h2>
        <p className="text-gray-600">
          NovaIA a analysé votre demande et recommande ces services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedServices.map((service, index) => (
          <div
            key={service.id}
            onClick={() => handleServiceSelect(service)}
            className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                {getCategoryIcon(service.category)}
              </div>
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.category}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{service.accuracy}%</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                <span>{service.price}€</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={resetToInput}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Modifier ma demande
        </button>
      </div>
    </div>
  );

  const renderServiceDetailsStep = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {selectedService && (
        <>
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-2xl font-bold mb-2">{selectedService.name}</h2>
            <p className="text-gray-600">{selectedService.description}</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Détails du service</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Précision: {selectedService.accuracy}%</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-500 mr-2" />
                  <span>Temps: {selectedService.executionTime}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-green-500 mr-2" />
                  <span>Prix: {selectedService.price}€</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                  <span>Crédits: {selectedService.credits}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-2">Votre demande</h3>
              <p className="text-gray-700 italic">"{userInput}"</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('recommendations')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                ← Retour
              </button>
              <button
                onClick={handleExecuteService}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Exécuter le service
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderExecutionStep = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">⚡</div>
        <h2 className="text-2xl font-bold mb-4">Exécution en cours...</h2>
        <p className="text-gray-600 mb-8">
          NovaIA traite votre demande avec les dernières technologies d'IA
        </p>

        <div className="max-w-md mx-auto">
          <div className="bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${executionProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{executionProgress}% terminé</p>
        </div>
      </div>
    </div>
  );

  const renderResultsStep = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {results?.error ? (
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-4 text-red-600">Erreur</h2>
          <p className="text-gray-600 mb-8">{results.message}</p>
          <button
            onClick={() => setCurrentStep('service-details')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-4">Résultats générés</h2>
            <p className="text-gray-600">
              Service {results?.service} exécuté avec succès
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Métriques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{results?.executionTime}</div>
                <div className="text-sm text-gray-600">Temps d'exécution</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{results?.accuracy}%</div>
                <div className="text-sm text-gray-600">Précision</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{results?.cost}</div>
                <div className="text-sm text-gray-600">Coût</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{results?.credits}</div>
                <div className="text-sm text-gray-600">Crédits utilisés</div>
              </div>
            </div>

            {/* Contenu des résultats */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4">Rapport généré :</h3>
              <p className="text-gray-700 mb-4">
                {results?.content}
              </p>
              
              {results?.type === 'image' && results?.imageUrl && (
                <div className="mt-4">
                  <img
                    src={results.imageUrl}
                    alt="Image générée"
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                  <div className="text-center mt-4">
                    <a
                      href={results.downloadUrl}
                      download
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Télécharger l'image
                    </a>
                  </div>
                </div>
              )}

              {results?.type === 'voice' && results?.audioUrl && (
                <div className="mt-4">
                  <audio controls className="w-full">
                    <source src={results.audioUrl} type="audio/mpeg" />
                    Votre navigateur ne supporte pas l'audio.
                  </audio>
                </div>
              )}

              {results?.insights && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Insights :</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {results.insights.map((insight: string, index: number) => (
                      <li key={index} className="text-gray-700">{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {results?.suggestions && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Suggestions :</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {results.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-gray-700">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={resetToInput}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Nouvelle demande
              </button>
              <button
                onClick={() => setCurrentStep('recommendations')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-colors"
              >
                Autres services
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {currentStep === 'input' && renderInputStep()}
      {currentStep === 'recommendations' && renderRecommendationsStep()}
      {currentStep === 'service-details' && renderServiceDetailsStep()}
      {currentStep === 'execution' && renderExecutionStep()}
      {currentStep === 'results' && renderResultsStep()}
    </div>
  );
} 