"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Image, 
  FileText, 
  Code, 
  MessageSquare, 
  Zap, 
  Sparkles,
  Upload,
  Download,
  Play,
  Settings,
  BarChart3
} from 'lucide-react';

export default function IAServicesPage() {
  const [activeTab, setActiveTab] = useState('image-generation');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulation de génération
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const aiServices = [
    {
      id: 'image-generation',
      title: 'Génération d\'Images IA',
      description: 'Créez des images uniques avec l\'IA',
      icon: Image,
      features: ['Stable Diffusion', 'DALL-E', 'Midjourney', 'Personnalisation avancée'],
      color: 'purple'
    },
    {
      id: 'text-generation',
      title: 'Génération de Texte IA',
      description: 'Rédaction automatique et assistance',
      icon: FileText,
      features: ['GPT-4', 'Claude', 'Rédaction SEO', 'Traduction'],
      color: 'blue'
    },
    {
      id: 'code-assistant',
      title: 'Assistant Code IA',
      description: 'Développement assisté par IA',
      icon: Code,
      features: ['GitHub Copilot', 'Code review', 'Debugging', 'Documentation'],
      color: 'green'
    },
    {
      id: 'chat-ai',
      title: 'Chat IA Intelligent',
      description: 'Assistant conversationnel avancé',
      icon: MessageSquare,
      features: ['ChatGPT', 'Claude', 'Personnalisation', 'Intégration'],
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Services IA Avancés
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Découvrez notre suite complète de services d'intelligence artificielle 
            pour transformer votre entreprise et automatiser vos processus.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              IA de Pointe
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Zap className="w-4 h-4 mr-2" />
              Temps Réel
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <Brain className="w-4 h-4 mr-2" />
              Personnalisé
            </Badge>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aiServices.map((service: any) => (
            <Card 
              key={service.id}
              className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => setActiveTab(service.id)}
            >
              <CardHeader className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-${service.color}-500/20 flex items-center justify-center`}>
                  <service.icon className={`w-6 h-6 text-${service.color}-400`} />
                </div>
                <CardTitle className="text-white">{service.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature: any, index: number) => (
                    <li key={index} className="text-sm text-gray-300 flex items-center">
                      <div className={`w-2 h-2 rounded-full bg-${service.color}-400 mr-2`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700 mb-8">
            <TabsTrigger value="image-generation" className="data-[state=active]:bg-purple-600">
              <img className="w-4 h-4 mr-2" src="/images/image.png" alt="Image" />
              Images
            </TabsTrigger>
            <TabsTrigger value="text-generation" className="data-[state=active]:bg-blue-600">
              <img className="w-4 h-4 mr-2" src="/images/text.png" alt="Text" />
              Texte
            </TabsTrigger>
            <TabsTrigger value="code-assistant" className="data-[state=active]:bg-green-600">
              <img className="w-4 h-4 mr-2" src="/images/code.png" alt="Code" />
              Code
            </TabsTrigger>
            <TabsTrigger value="chat-ai" className="data-[state=active]:bg-orange-600">
              <img className="w-4 h-4 mr-2" src="/images/chat.png" alt="Chat" />
              Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image-generation">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Génération d'Images IA</CardTitle>
                <CardDescription className="text-gray-400">
                  Créez des images uniques et personnalisées avec l'IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        Description de l'image
                      </label>
                      <Textarea
                        placeholder="Décrivez l'image que vous souhaitez générer..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isGenerating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Génération...
                          </>
                        ) : (
                          <>
                            <img className="w-4 h-4 mr-2" src="/images/play.png" alt="Play" />
                            Générer
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="border-slate-600 text-gray-300">
                        <img className="w-4 h-4 mr-2" src="/images/upload.png" alt="Upload" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
                    <div className="text-center text-gray-400">
                      <img className="w-16 h-16 mx-auto mb-4 opacity-50" src="/images/image.png" alt="Generated Image" />
                      <p>Votre image générée apparaîtra ici</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="text-generation">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Génération de Texte IA</CardTitle>
                <CardDescription className="text-gray-400">
                  Rédaction automatique et assistance textuelle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <img className="w-16 h-16 text-blue-400 mx-auto mb-4" src="/images/text.png" alt="Text" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Génération de Texte
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Fonctionnalité en cours de développement
                  </p>
                  <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20">
                    Bientôt Disponible
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code-assistant">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Assistant Code IA</CardTitle>
                <CardDescription className="text-gray-400">
                  Développement assisté par intelligence artificielle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <img className="w-16 h-16 text-green-400 mx-auto mb-4" src="/images/code.png" alt="Code" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Assistant Code
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Fonctionnalité en cours de développement
                  </p>
                  <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">
                    Bientôt Disponible
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat-ai">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Chat IA Intelligent</CardTitle>
                <CardDescription className="text-gray-400">
                  Assistant conversationnel avancé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <img className="w-16 h-16 text-orange-400 mx-auto mb-4" src="/images/chat.png" alt="Chat" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Chat IA
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Fonctionnalité en cours de développement
                  </p>
                  <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/20">
                    Bientôt Disponible
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 