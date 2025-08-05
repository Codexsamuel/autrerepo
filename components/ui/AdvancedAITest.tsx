"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Image, FileText, Shield, Palette, RefreshCw } from 'lucide-react';

export function AdvancedAITest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // États pour les différents tests
  const [ghibliPrompt, setGhibliPrompt] = useState('');
  const [ghibliStyle, setGhibliStyle] = useState(2);
  const [contentText, setContentText] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [sourceImageUrl, setSourceImageUrl] = useState('');
  const [targetImageUrl, setTargetImageUrl] = useState('');

  const handleAction = async (action: string, params: any) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/ai/advanced', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          ...params
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Erreur lors du traitement');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleGhibliQuick = () => {
    if (!ghibliPrompt.trim()) return;
    handleAction('ghibli-quick', {
      prompt: ghibliPrompt,
      style_id: ghibliStyle,
      size: '1-1'
    });
  };

  const handleContentAnalyze = () => {
    if (!contentText.trim()) return;
    handleAction('content-analyze', {
      text: contentText
    });
  };

  const handleContentValidate = () => {
    if (!productTitle.trim() || !productDescription.trim()) return;
    handleAction('content-validate', {
      productTitle,
      productDescription
    });
  };

  const handleFaceSwap = () => {
    if (!sourceImageUrl.trim() || !targetImageUrl.trim()) return;
    handleAction('faceswap', {
      sourceImageUrl,
      targetImageUrl,
      enhancement_level: 2
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          🚀 Test IA Avancée - DL Solutions
        </h1>
        <p className="text-gray-600">
          Testez toutes les fonctionnalités IA avancées en un seul endroit
        </p>
      </div>

      {/* Interface de test */}
      <Tabs defaultValue="ghibli" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ghibli">🎨 Ghibli</TabsTrigger>
          <TabsTrigger value="content">🔍 Contenu</TabsTrigger>
          <TabsTrigger value="validation">🛡️ Validation</TabsTrigger>
          <TabsTrigger value="faceswap">🎭 FaceSwap</TabsTrigger>
        </TabsList>

        {/* Test Ghibli */}
        <TabsContent value="ghibli" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Génération d'Image Style Ghibli
              </CardTitle>
              <CardDescription>
                Créez des images dans le style Studio Ghibli
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description de l'image
                </label>
                <Textarea
                  placeholder="Décrivez l'image que vous voulez générer..."
                  value={ghibliPrompt}
                  onChange={(e) => setGhibliPrompt(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Style (1-5)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={ghibliStyle}
                  onChange={(e) => setGhibliStyle(parseInt(e.target.value) || 2)}
                />
              </div>

              <Button 
                onClick={handleGhibliQuick}
                disabled={loading || !ghibliPrompt.trim()}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Palette className="w-4 h-4 mr-2" />
                )}
                {loading ? 'Génération...' : 'Générer Image Ghibli'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Analyse de Contenu */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Analyse de Contenu IA
              </CardTitle>
              <CardDescription>
                Détectez si un texte a été généré par IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Texte à analyser
                </label>
                <Textarea
                  placeholder="Collez le texte que vous voulez analyser..."
                  value={contentText}
                  onChange={(e) => setContentText(e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleContentAnalyze}
                disabled={loading || !contentText.trim()}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                {loading ? 'Analyse...' : 'Analyser le Contenu'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Validation E-commerce */}
        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Validation Contenu E-commerce
              </CardTitle>
              <CardDescription>
                Validez les titres et descriptions de produits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Titre du produit
                </label>
                <Input
                  placeholder="Titre du produit..."
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description du produit
                </label>
                <Textarea
                  placeholder="Description du produit..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleContentValidate}
                disabled={loading || !productTitle.trim() || !productDescription.trim()}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Shield className="w-4 h-4 mr-2" />
                )}
                {loading ? 'Validation...' : 'Valider le Contenu'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test FaceSwap */}
        <TabsContent value="faceswap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Face Swap d'Images
              </CardTitle>
              <CardDescription>
                Remplacez un visage dans une image par un autre
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Image Source (visage à copier)
                </label>
                <Input
                  type="url"
                  placeholder="https://example.com/source-face.jpg"
                  value={sourceImageUrl}
                  onChange={(e) => setSourceImageUrl(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Image Cible (visage à remplacer)
                </label>
                <Input
                  type="url"
                  placeholder="https://example.com/target-face.jpg"
                  value={targetImageUrl}
                  onChange={(e) => setTargetImageUrl(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleFaceSwap}
                disabled={loading || !sourceImageUrl.trim() || !targetImageUrl.trim()}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Image className="w-4 h-4 mr-2" />
                )}
                {loading ? 'Traitement...' : 'Effectuer le Face Swap'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Résultats */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-600">❌ {error}</div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Résultats</CardTitle>
            <CardDescription>
              Résultat du traitement IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Affichage des résultats selon le type */}
              {result.imageUrl && (
                <div className="text-center">
                  <img 
                    src={result.imageUrl} 
                    alt="Résultat IA"
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      setError('Impossible de charger l\'image résultante');
                    }}
                  />
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => window.open(result.imageUrl, '_blank')}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Ouvrir l'image
                  </Button>
                </div>
              )}
              
              {/* Affichage des données JSON */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 