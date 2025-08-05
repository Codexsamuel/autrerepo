"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, Image, RefreshCw } from 'lucide-react';

export function FaceSwapTest() {
  const [sourceImageUrl, setSourceImageUrl] = useState('');
  const [targetImageUrl, setTargetImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [enhancementLevel, setEnhancementLevel] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceImageUrl.trim() || !targetImageUrl.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult('');

    try {
      const response = await fetch('/api/ai/faceswap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceImageUrl: sourceImageUrl.trim(),
          targetImageUrl: targetImageUrl.trim(),
          enhancement_level: enhancementLevel
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data.result_url || 'Traitement terminé');
      } else {
        setError(data.error || 'Erreur lors du traitement');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/ai/faceswap?action=stats');
      const data = await response.json();
      if (data.success) {
        console.log('FaceSwap Stats:', data.data);
      }
    } catch (err) {
      console.error('Erreur chargement stats:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          🎭 FaceSwap API Test
        </h1>
        <p className="text-gray-600">
          Testez l'API FaceSwap pour la transformation d'images
        </p>
      </div>

      {/* Interface de test */}
      <Card>
        <CardHeader>
          <CardTitle>🧪 Test de l'API FaceSwap</CardTitle>
          <CardDescription>
            Remplacez un visage dans une image par un autre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image source */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Image Source (visage à copier)
              </label>
              <Input
                type="url"
                placeholder="https://example.com/source-face.jpg"
                value={sourceImageUrl}
                onChange={(e) => setSourceImageUrl(e.target.value)}
                required
              />
            </div>

            {/* Image cible */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Image Cible (visage à remplacer)
              </label>
              <Input
                type="url"
                placeholder="https://example.com/target-face.jpg"
                value={targetImageUrl}
                onChange={(e) => setTargetImageUrl(e.target.value)}
                required
              />
            </div>

            {/* Niveau d'amélioration */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Niveau d'amélioration (1-5)
              </label>
              <Input
                type="number"
                min="1"
                max="5"
                value={enhancementLevel}
                onChange={(e) => setEnhancementLevel(parseInt(e.target.value) || 1)}
              />
            </div>

            {/* Bouton de soumission */}
            <Button 
              type="submit" 
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
          </form>
        </CardContent>
      </Card>

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
            <CardTitle>📸 Résultat du Face Swap</CardTitle>
            <CardDescription>
              Image générée avec succès
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img 
                src={result} 
                alt="Résultat Face Swap"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  setError('Impossible de charger l\'image résultante');
                }}
              />
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => window.open(result, '_blank')}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Ouvrir l'image
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📋 Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Image Source :</strong> Visage que vous voulez copier</li>
              <li>• <strong>Image Cible :</strong> Visage que vous voulez remplacer</li>
              <li>• <strong>Niveau d'amélioration :</strong> 1-5 (plus élevé = meilleure qualité)</li>
              <li>• <strong>Formats supportés :</strong> JPG, PNG, WebP</li>
              <li>• <strong>Taille max :</strong> 10MB par image</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⚙️ Paramètres</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Préservation d'expression :</strong> Activée</li>
              <li>• <strong>Préservation d'éclairage :</strong> Activée</li>
              <li>• <strong>Format de sortie :</strong> JPG</li>
              <li>• <strong>Qualité :</strong> 90%</li>
              <li>• <strong>Temps de traitement :</strong> 30-60 secondes</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 