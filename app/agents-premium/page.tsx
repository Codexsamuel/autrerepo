"use client";

import ChatAgentPremium from '@/components/ui/agents/ChatAgentPremium';
import CommercialAgentPremium from '@/components/ui/agents/CommercialAgentPremium';
import InsightAgentPremium from '@/components/ui/agents/InsightAgentPremium';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Brain,
    CheckCircle,
    Clock,
    Cloud,
    CloudOff,
    Code,
    Crown,
    Database,
    Download,
    MessageCircle,
    Rocket,
    Server,
    Settings,
    Shield,
    Star,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { useState } from 'react';

export default function AgentsPremiumPage() {
  const [activeAgent, setActiveAgent] = useState('commercial');
  const [isOfflineMode, setIsOfflineMode] = useState(true);

  const agents = [
    {
      id: 'commercial',
      name: 'Closer IA Autonome',
      description: 'Scoring causal, prévisions hiérarchiques & Playbooks auto-healing',
      icon: Crown,
      color: 'from-emerald-500 to-blue-500',
      features: [
        'Scoring Lead Causal',
        'Prévisions Hiérarchiques',
        'Playbooks Auto-Healing',
        'Coaching Temps Réel',
        'Simulateur Pipeline'
      ],
      metrics: {
        conversion: '+15-25%',
        cycleTime: '-30%',
        margin: '+10%',
        roi: '312%'
      },
      offline: {
        llm: 'Llama 3.1 8B/70B',
        ml: 'XGBoost + LightGBM',
        storage: 'FAISS + SQLite',
        performance: '100k leads/jour'
      }
    },
    {
      id: 'chat',
      name: 'Support IA Unifié',
      description: 'NLP offline, RAG local & Multi-canal intelligent',
      icon: MessageCircle,
      color: 'from-blue-500 to-indigo-500',
      features: [
        'NLP Offline Local',
        'RAG Base Connaissances',
        'Multi-canal (Web/WhatsApp/Email/Voix)',
        'Formulaires Dynamiques',
        'Détection Émotions'
      ],
      metrics: {
        deflection: '87.3%',
        satisfaction: '4.8/5',
        responseTime: '1.2s',
        resolution: '92.1%'
      },
      offline: {
        llm: 'Mistral + DeepSeek',
        nlp: 'Intent + Entity Detection',
        storage: 'FAISS + SQLite FTS5',
        performance: '95% tickets auto-résolus'
      }
    },
    {
      id: 'insight',
      name: 'Nova Insight',
      description: 'ELT local, ML & Prévisions intelligentes',
      icon: Database,
      color: 'from-slate-500 to-gray-500',
      features: [
        'ELT Local Complet',
        'Modèles ML Locaux',
        'Prévisions Hiérarchiques',
        'Détection Anomalies',
        'Insights Automatiques'
      ],
      metrics: {
        records: '15.4M',
        accuracy: '98.7%',
        mlAccuracy: '94.8%',
        dataQuality: '96.2%'
      },
      offline: {
        ml: 'XGBoost + LightGBM + statsmodels',
        storage: 'DuckDB + Parquet',
        processing: '10-50M lignes/10min',
        performance: 'RTX 3060 + 32GB RAM'
      }
    }
  ];

  const renderAgentContent = () => {
    switch (activeAgent) {
      case 'commercial':
        return <CommercialAgentPremium />;
      case 'chat':
        return <ChatAgentPremium />;
      case 'insight':
        return <InsightAgentPremium />;
      default:
        return <CommercialAgentPremium />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header Premium */}
      <div className="bg-gradient-to-r from-gray-800/50 to-black/50 backdrop-blur-sm border-b border-gray-500/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white">Nova AI - Agents Premium</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Système d'agents IA premium autonomes, déployables sur Windows (CUDA/DirectML),
              fonctionnant en mode offline-first avec capacités cloud optionnelles.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Badge variant="outline" className="border-purple-500 text-purple-300 text-lg px-4 py-2">
                <Star className="w-5 h-5 mr-2" />
                Premium
              </Badge>
              <Badge variant="outline" className="border-pink-500 text-pink-300 text-lg px-4 py-2">
                <Zap className="w-5 h-5 mr-2" />
                IA Avancée
              </Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-300 text-lg px-4 py-2">
                <Brain className="w-5 h-5 mr-2" />
                Offline-First
              </Badge>
              <Badge variant="outline" className="border-emerald-500 text-emerald-300 text-lg px-4 py-2">
                <Shield className="w-5 h-5 mr-2" />
                Windows Ready
              </Badge>
            </div>

            {/* Mode Offline/Cloud Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-white/60">Mode Offline</span>
                <Button
                  variant={isOfflineMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsOfflineMode(true)}
                  className={isOfflineMode ? "bg-green-600 hover:bg-green-700" : "border-white/20 text-white hover:bg-white/10"}
                >
                  <CloudOff className="w-4 h-4 mr-1" />
                  Offline
                </Button>
                <Button
                  variant={!isOfflineMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsOfflineMode(false)}
                  className={!isOfflineMode ? "bg-blue-600 hover:bg-blue-700" : "border-white/20 text-white hover:bg-white/10"}
                >
                  <Cloud className="w-4 h-4 mr-1" />
                  Cloud
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Sélecteur d'Agents */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Choisissez votre Agent Premium
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  activeAgent === agent.id
                    ? 'bg-gradient-to-br from-white/20 to-white/10 border-purple-500/50 shadow-2xl shadow-purple-500/25'
                    : 'bg-white/5 hover:bg-white/10 border-white/20'
                }`}
                onClick={() => setActiveAgent(agent.id)}
              >
                <CardHeader className="text-center">
                  <div className={`p-4 bg-gradient-to-r ${agent.color} rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <agent.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{agent.name}</CardTitle>
                  <p className="text-gray-300 text-sm">{agent.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {agent.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Métriques */}
                  <div className="mb-4 pt-4 border-t border-white/20">
                    <p className="text-gray-400 text-sm mb-2">Métriques Clés</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(agent.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-gray-400 capitalize">{key}</p>
                          <p className="text-white font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Capacités Offline */}
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-gray-400 text-sm mb-2">Capacités Offline</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">LLM:</span>
                        <span className="text-white">{agent.offline.llm}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">ML:</span>
                        <span className="text-white">{agent.offline.ml}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Stockage:</span>
                        <span className="text-white">{agent.offline.storage}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Performance:</span>
                        <span className="text-white">{agent.offline.performance}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Architecture Technique */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Architecture Technique Offline-First
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stack Technique */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Stack Technique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded">
                    <h4 className="text-white font-medium mb-2">Frontend</h4>
                    <p className="text-white/60 text-sm">Next.js 15 + React 18 + TypeScript + Tailwind CSS + shadcn/ui</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded">
                    <h4 className="text-white font-medium mb-2">Backend</h4>
                    <p className="text-white/60 text-sm">FastAPI (Python) + Node.js + gRPC + WebSocket</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded">
                    <h4 className="text-white font-medium mb-2">LLM Local</h4>
                    <p className="text-white/60 text-sm">Ollama + llama.cpp (CUDA/DirectML/CPU)</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded">
                    <h4 className="text-white font-medium mb-2">ML Engine</h4>
                    <p className="text-white/60 text-sm">XGBoost + LightGBM + statsmodels + autoML</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Déploiement Windows */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Server className="w-5 h-5 mr-2" />
                  Déploiement Windows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded">
                    <h4 className="text-white font-medium mb-2">GPU Support</h4>
                    <p className="text-white/60 text-sm">NVIDIA CUDA, AMD DirectML, Intel CPU AVX</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded">
                    <h4 className="text-white font-medium mb-2">Installation</h4>
                    <p className="text-white/60 text-sm">PowerShell scripts + Docker Desktop (WSL2)</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded">
                    <h4 className="text-white font-medium mb-2">Performance</h4>
                    <p className="text-white/60 text-sm">RTX 3060: 100k leads/jour, forecast &lt; 20min</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded">
                    <h4 className="text-white font-medium mb-2">Maintenance</h4>
                    <p className="text-white/60 text-sm">Équipe petite taille, GitOps, monitoring local</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Roadmap 24 Mois */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Roadmap 24 Mois
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">T0 - T3 mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">Mise en prod MVT</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">RAG local</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">Scoring simple</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">Dashboard KPI</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">T4 - T9 mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">Causal lift</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">Simulateur pipeline</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">ASR/TTS local</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">Coaching proactif</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">T10 - T18 mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Prévisions hiérarchiques</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Négociation assistée</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Feature store</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-white">AutoML local</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">T18 - T24 mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-4 h-4 text-purple-400" />
                    <span className="text-white">Auto-Playbooks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-4 h-4 text-purple-400" />
                    <span className="text-white">Contre-factuels</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-4 h-4 text-purple-400" />
                    <span className="text-white">Optimisation multi-objectifs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-4 h-4 text-purple-400" />
                    <span className="text-white">Guardrails juridiques</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Agent Sélectionné */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">
              {agents.find(a => a.id === activeAgent)?.name}
            </h2>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-white/20 text-white/60">
                {isOfflineMode ? 'Mode Offline' : 'Mode Cloud'}
              </Badge>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Settings className="w-4 h-4 mr-1" />
                Configuration
              </Button>
            </div>
          </div>

          {/* Contenu de l'Agent */}
          <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
            {renderAgentContent()}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Prêt à déployer vos Agents IA Premium ?
              </h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Commencez par choisir votre profil matériel (CUDA/DirectML) et suivez notre guide
                de déploiement Windows complet. Support technique inclus pour votre équipe.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Download className="w-4 h-4 mr-2" />
                  Guide Déploiement
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Code className="w-4 h-4 mr-2" />
                  Documentation API
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Users className="w-4 h-4 mr-2" />
                  Support Équipe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 