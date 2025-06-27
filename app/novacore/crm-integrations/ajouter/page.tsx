'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Link2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const INTEGRATION_TYPES = [
  { value: 'google', label: 'Google (Gmail, Calendar, Contacts)' },
  { value: 'outlook', label: 'Outlook (Microsoft 365)' },
  { value: 'zapier', label: 'Zapier' },
  { value: 'webhook', label: 'Webhook personnalisé' },
  { value: 'autre', label: 'Autre (clé API)' },
];

export default function AjouterIntegrationPage() {
  const router = useRouter();
  const [type, setType] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Démarrer OAuth ou sauvegarder la clé API
      if (type === 'google' || type === 'outlook') {
        // Rediriger vers l'endpoint OAuth
        window.location.href = `/api/crm-integrations/oauth?provider=${type}`;
        return;
      }
      // Pour Zapier, Webhook, Autre : sauvegarde directe
      const res = await fetch('/api/crm-integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, apiKey }),
      });
      if (res.ok) {
        toast({ title: 'Intégration ajoutée' });
        router.push('/novacore/crm-integrations');
      } else {
        const error = await res.json();
        throw new Error(error.message || 'Erreur lors de l\'ajout');
      }
    } catch (error) {
      toast({ title: 'Erreur', description: error instanceof Error ? error.message : 'Erreur lors de l\'ajout', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Ajouter une intégration CRM</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le type d'intégration" />
                </SelectTrigger>
                <SelectContent>
                  {INTEGRATION_TYPES.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {(type === 'autre' || type === 'zapier' || type === 'webhook') && (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder={type === 'webhook' ? 'URL du webhook' : 'Clé API'}
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={loading || !type}>
                {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Ajout...</>) : (<><Link2 className="mr-2 h-4 w-4" />Ajouter</>)}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 