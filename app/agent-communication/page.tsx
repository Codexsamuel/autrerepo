"use client";

import ModernNavigation from '@/components/layout/ModernNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Brain, CheckCircle, Clock, Globe, Mail, MessageCircle, Phone, Star, Users, Video, Zap } from 'lucide-react';
import { useState } from 'react';

export default function AgentCommunicationPage() {
  const [isActive, setIsActive] = useState(false);
  const [currentAgent, setCurrentAgent] = useState('communication');
  const [message, setMessage] = useState('');

  const communicationAgents = [
    {
      id: 'communication',
      name: 'Agent Communication',
      description: 'Gestionnaire principal des communications multi-canal',
      icon: MessageCircle,
      status: 'active',
      features: ['Email', 'SMS', 'Chat', 'Vidéo', 'Réseaux sociaux']
    },
    {
      id: 'customer-service',
      name: 'Service Client IA',
      description: 'Support client intelligent 24/7',
      icon: Users,
      status: 'active',
      features: ['Chatbot IA', 'FAQ automatique', 'Tickets intelligents', 'Analyse sentiment']
    },
    {
      id: 'marketing',
      name: 'Marketing Automatisé',
      description: 'Campagnes marketing personnalisées',
      icon: Globe,
      status: 'active',
      features: ['Email marketing', 'SMS marketing', 'Publicités ciblées', 'A/B testing']
    },
    {
      id: 'analytics',
      name: 'Analytics Communication',
      description: 'Analyse des performances communication',
      icon: Brain,
      status: 'active',
      features: ['Métriques temps réel', 'ROI tracking', 'Segmentation', 'Prédictions']
    }
  ];

  const communicationChannels = [
    {
      name: 'Email',
      icon: Mail,
      status: 'active',
      volume: '2,847',
      success: '98.5%'
    },
    {
      name: 'SMS',
      icon: MessageCircle,
      status: 'active',
      volume: '1,234',
      success: '99.2%'
    },
    {
      name: 'Chat',
      icon: MessageCircle,
      status: 'active',
      volume: '567',
      success: '95.8%'
    },
    {
      name: 'Vidéo',
      icon: Video,
      status: 'active',
      volume: '89',
      success: '97.3%'
    },
    {
      name: 'Téléphone',
      icon: Phone,
      status: 'active',
      volume: '123',
      success: '96.1%'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      channel: 'Email',
      recipient: 'client@entreprise.com',
      subject: 'Confirmation de commande',
      status: 'delivered',
      timestamp: '2 min ago'
    },
    {
      id: 2,
      channel: 'SMS',
      recipient: '+33 6 12 34 56 78',
      content: 'Votre colis arrive dans 2h',
      status: 'delivered',
      timestamp: '5 min ago'
    },
    {
      id: 3,
      channel: 'Chat',
      recipient: 'Jean Dupont',
      content: 'Bonjour, comment puis-je vous aider ?',
      status: 'read',
      timestamp: '8 min ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600/20 rounded-full">
              <MessageCircle className="h-16 w-16 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Agent Communication
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Système de communication intelligent qui automatise et optimise 
            toutes vos interactions avec vos clients et prospects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              onClick={() => setIsActive(!isActive)}
            >
              <Zap className="mr-2 h-5 w-5" />
              {isActive ? 'Désactiver' : 'Activer'} l'Agent
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Demander une démo
            </Button>
          </div>
        </div>
      </section>

      {/* Status Dashboard */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white shadow-lg border-0 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full ${isActive ? 'bg-green-100' : 'bg-red-100'}`}>
                  <MessageCircle className={`h-8 w-8 ${isActive ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Statut Agent</h3>
              <Badge className={isActive ? 'bg-green-500' : 'bg-red-500'}>
                {isActive ? 'ACTIF' : 'INACTIF'}
              </Badge>
            </Card>

            <Card className="bg-white shadow-lg border-0 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Messages/Jour</h3>
              <span className="text-3xl font-bold text-gray-900">4,860</span>
            </Card>

            <Card className="bg-white shadow-lg border-0 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Taux de Réussite</h3>
              <span className="text-3xl font-bold text-gray-900">97.4%</span>
            </Card>

            <Card className="bg-white shadow-lg border-0 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-purple-100">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Temps Réponse</h3>
              <span className="text-3xl font-bold text-gray-900">2.3s</span>
            </Card>
          </div>

          {/* Communication Channels */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Canaux de Communication
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {communicationChannels.map((channel, index) => (
                <Card key={index} className="bg-white shadow-lg border-0 p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <channel.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{channel.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-semibold">{channel.volume}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Succès:</span>
                      <span className="font-semibold text-green-600">{channel.success}</span>
                    </div>
                  </div>
                  <Badge className="mt-3 bg-green-500">
                    {channel.status === 'active' ? 'ACTIF' : 'INACTIF'}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>

          {/* Agents Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Agents Spécialisés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communicationAgents.map((agent) => (
                <Card 
                  key={agent.id} 
                  className={`bg-white shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    currentAgent === agent.id ? 'border-blue-500 shadow-blue-100' : 'border-gray-200'
                  }`}
                  onClick={() => setCurrentAgent(agent.id)}
                >
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-blue-100">
                        <agent.icon className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{agent.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 text-center">{agent.description}</p>
                    <div className="space-y-2">
                      {agent.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Badge className="mt-4 w-full bg-green-500">
                      {agent.status === 'active' ? 'ACTIF' : 'INACTIF'}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Messages Récents
            </h2>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="space-y-4">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-blue-100">
                        {msg.channel === 'Email' && <Mail className="h-5 w-5 text-blue-600" />}
                        {msg.channel === 'SMS' && <MessageCircle className="h-5 w-5 text-blue-600" />}
                        {msg.channel === 'Chat' && <MessageCircle className="h-5 w-5 text-blue-600" />}
                        {msg.channel === 'Vidéo' && <Video className="h-5 w-5 text-blue-600" />}
                        {msg.channel === 'Téléphone' && <Phone className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{msg.channel}</span>
                          <Badge className={msg.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'}>
                            {msg.status === 'delivered' ? 'Livré' : 'Lu'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {msg.subject || msg.content || msg.recipient}
                        </p>
                        <p className="text-xs text-gray-500">{msg.recipient}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Message */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Envoyer un Message Rapide
            </h2>
            <Card className="bg-white shadow-lg border-0 p-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Canal de Communication
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Email</option>
                    <option>SMS</option>
                    <option>Chat</option>
                    <option>Vidéo</option>
                    <option>Téléphone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Input
                    type="text"
                    placeholder="Tapez votre message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Envoyer le Message
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à Révolutionner Votre Communication ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            L'Agent Communication automatise et optimise toutes vos interactions client
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Star className="mr-2 h-5 w-5" />
              Commencer l'essai gratuit
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              <Users className="mr-2 h-5 w-5" />
              Parler à un expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 