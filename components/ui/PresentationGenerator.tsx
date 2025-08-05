"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, FileText, Image, Users, Target, Clock, Download, Eye, Edit } from 'lucide-react';

interface PresentationSlide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  slideType: string;
  layout: string;
}

interface PresentationData {
  title: string;
  slides: PresentationSlide[];
  totalSlides: number;
  estimatedDuration: number;
  targetAudience: string;
  tone: string;
}

export function PresentationGenerator() {
  const [loading, setLoading] = useState(false);
  const [presentation, setPresentation] = useState<PresentationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form states
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState<'clients' | 'investisseurs' | 'partenaires' | 'équipe'>('clients');
  const [tone, setTone] = useState<'professionnel' | 'inspirant' | 'commercial' | 'technique'>('professionnel');
  const [slidesCount, setSlidesCount] = useState(8);
  const [includeImages, setIncludeImages] = useState(true);
  const [companyName, setCompanyName] = useState('DL Solutions');
  const [industry, setIndustry] = useState('Intelligence Artificielle');
  const [targetMarket, setTargetMarket] = useState('Entreprises et startups');

  const generatePresentation = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setPresentation(null);

    try {
      const response = await fetch('/api/presentation/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate',
          topic: topic.trim(),
          audience,
          tone,
          slidesCount,
          includeImages,
          companyInfo: {
            name: companyName,
            industry,
            targetMarket
          }
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPresentation(data.data.presentation);
        setCurrentSlide(0);
      } else {
        setError(data.error || 'Erreur lors de la génération');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const exportPresentation = () => {
    // Simulation d'export PowerPoint
    alert('Fonctionnalité d\'export PowerPoint en cours de développement');
  };

  const editSlide = (slideIndex: number) => {
    // Simulation d'édition
    alert(`Édition de la slide ${slideIndex + 1} - Fonctionnalité en cours de développement`);
  };

  if (presentation) {
    return (
      <div className="space-y-6">
        {/* Header de la présentation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{presentation.title}</CardTitle>
                <CardDescription>
                  {presentation.totalSlides} slides • {presentation.estimatedDuration} min • {presentation.targetAudience}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setPresentation(null)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Nouvelle présentation
                </Button>
                <Button onClick={exportPresentation}>
                  <Download className="w-4 h-4 mr-2" />
                  Exporter PowerPoint
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Navigation des slides */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
          >
            Précédente
          </Button>
          
          <div className="flex-1 flex justify-center">
            <span className="text-lg font-semibold">
              Slide {currentSlide + 1} sur {presentation.slides.length}
            </span>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setCurrentSlide(Math.min(presentation.slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === presentation.slides.length - 1}
          >
            Suivante
          </Button>
        </div>

        {/* Slide actuelle */}
        <Card className="min-h-[500px]">
          <CardContent className="p-8">
            {presentation.slides[currentSlide] && (
              <div className="h-full flex flex-col">
                {/* Titre de la slide */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-center mb-2">
                    {presentation.slides[currentSlide].title}
                  </h2>
                  <div className="flex justify-center space-x-2">
                    <Badge variant="outline">{presentation.slides[currentSlide].slideType}</Badge>
                    <Badge variant="outline">{presentation.slides[currentSlide].layout}</Badge>
                  </div>
                </div>

                {/* Contenu de la slide */}
                <div className="flex-1 flex items-center">
                  {presentation.slides[currentSlide].layout === 'title' ? (
                    <div className="w-full text-center">
                      <h1 className="text-5xl font-bold mb-4">{presentation.title}</h1>
                      <p className="text-xl text-gray-600">Présentation pour {presentation.targetAudience}</p>
                    </div>
                  ) : presentation.slides[currentSlide].layout === 'image-text' && presentation.slides[currentSlide].imageUrl ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      <div className="flex items-center">
                        <img 
                          src={presentation.slides[currentSlide].imageUrl} 
                          alt={presentation.slides[currentSlide].title}
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="flex items-center">
                        <div className="prose max-w-none">
                          <p className="text-lg leading-relaxed">
                            {presentation.slides[currentSlide].content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="prose max-w-none">
                        <p className="text-lg leading-relaxed">
                          {presentation.slides[currentSlide].content}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions de la slide */}
                <div className="mt-6 flex justify-between items-center">
                  <Button variant="outline" onClick={() => editSlide(currentSlide)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                  <div className="text-sm text-gray-500">
                    {presentation.slides[currentSlide].imageUrl ? '🖼️ Avec image' : '📝 Texte uniquement'}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Miniatures des slides */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {presentation.slides.map((slide, index) => (
            <Card 
              key={slide.id}
              className={`cursor-pointer transition-all ${
                currentSlide === index ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-sm font-semibold mb-2 line-clamp-2">
                    {slide.title}
                  </div>
                  <div className="flex justify-center space-x-1">
                    <Badge variant="outline" className="text-xs">
                      {slide.slideType}
                    </Badge>
                    {slide.imageUrl && (
                      <Badge variant="secondary" className="text-xs">
                        🖼️
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">🎯 Générateur de Présentation Commerciale NovaIA</h1>
        <p className="text-gray-600">
          Créez des présentations professionnelles automatiquement avec IA
        </p>
      </div>

      {/* Formulaire de génération */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Configuration de la présentation</span>
          </CardTitle>
          <CardDescription>
            Définissez les paramètres de votre présentation commerciale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sujet principal */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Sujet de la présentation *
            </label>
            <Input
              placeholder="Ex: DL Solutions - Plateforme IA Avancée"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Configuration de base */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Audience</label>
              <Select value={audience} onValueChange={(value: any) => setAudience(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clients">Clients</SelectItem>
                  <SelectItem value="investisseurs">Investisseurs</SelectItem>
                  <SelectItem value="partenaires">Partenaires</SelectItem>
                  <SelectItem value="équipe">Équipe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ton</label>
              <Select value={tone} onValueChange={(value: any) => setTone(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professionnel">Professionnel</SelectItem>
                  <SelectItem value="inspirant">Inspirant</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="technique">Technique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nombre de slides</label>
              <Select value={slidesCount.toString()} onValueChange={(value) => setSlidesCount(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 slides</SelectItem>
                  <SelectItem value="8">8 slides</SelectItem>
                  <SelectItem value="10">10 slides</SelectItem>
                  <SelectItem value="12">12 slides</SelectItem>
                  <SelectItem value="15">15 slides</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Options avancées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeImages"
                checked={includeImages}
                onChange={(e) => setIncludeImages(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="includeImages" className="text-sm font-medium">
                Inclure des images générées par IA
              </label>
            </div>
          </div>

          {/* Informations entreprise */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Informations entreprise</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nom de l'entreprise</label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="DL Solutions"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Industrie</label>
                <Input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Intelligence Artificielle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Marché cible</label>
                <Input
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  placeholder="Entreprises et startups"
                />
              </div>
            </div>
          </div>

          {/* Bouton de génération */}
          <div className="flex justify-center">
            <Button 
              onClick={generatePresentation}
              disabled={!topic.trim() || loading}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Générer la présentation
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exemples de présentations */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Exemples de présentations</CardTitle>
          <CardDescription>
            Cliquez sur un exemple pour le charger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                topic: 'DL Solutions - Plateforme IA Avancée',
                audience: 'investisseurs' as const,
                tone: 'professionnel' as const,
                description: 'Présentation pour levée de fonds'
              },
              {
                topic: 'NovaIA - Centre d\'Intelligence Artificielle',
                audience: 'clients' as const,
                tone: 'commercial' as const,
                description: 'Présentation commerciale'
              },
              {
                topic: 'DL Style - Marketplace E-commerce IA',
                audience: 'partenaires' as const,
                tone: 'inspirant' as const,
                description: 'Présentation partenariat'
              },
              {
                topic: 'Système de Scraping Multi-Sources',
                audience: 'équipe' as const,
                tone: 'technique' as const,
                description: 'Présentation technique'
              }
            ].map((example, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setTopic(example.topic);
                  setAudience(example.audience);
                  setTone(example.tone);
                }}
              >
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{example.topic}</h4>
                  <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {example.audience}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {example.tone}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Affichage des erreurs */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-800">
              <span className="text-lg">❌</span>
              <span className="font-medium">Erreur</span>
            </div>
            <p className="text-red-700 mt-2">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 