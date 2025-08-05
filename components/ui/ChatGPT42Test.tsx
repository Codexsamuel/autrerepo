"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Brain } from 'lucide-react';

export function ChatGPT42Test() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState('gpt-4');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const response = await fetch('/api/ai/chatgpt-42', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'chat',
          message: message.trim(),
          model,
          temperature: 0.7,
          max_tokens: 1000
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la génération');
      }

      setResponse(data.data);

    } catch (err) {
      console.error('Erreur ChatGPT-42:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          🤖 ChatGPT-42 API Test
        </h1>
        <p className="text-gray-600">
          Testez l'API ChatGPT-42 via RapidAPI
        </p>
      </div>

      {/* Interface de test */}
      <Card>
        <CardHeader>
          <CardTitle>🧪 Test de l'API</CardTitle>
          <CardDescription>
            Testez la conversation avec ChatGPT-42
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Modèle */}
            <div>
              <label className="block text-sm font-medium mb-2">Modèle</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tapez votre message..."
                rows={4}
                required
              />
            </div>

            {/* Bouton de soumission */}
            <Button 
              type="submit" 
              disabled={loading || !message.trim()}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Génération...' : 'Envoyer à ChatGPT-42'}
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

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>📝 Réponse de ChatGPT-42</CardTitle>
            <CardDescription>
              Modèle: {model}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{response}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 