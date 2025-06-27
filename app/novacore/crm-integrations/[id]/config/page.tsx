'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Trash2, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  type: string;
  name: string;
  status: 'connected' | 'disconnected';
  apiKey?: string;
  webhookUrl?: string;
  enabled: boolean;
}

export default function ConfigIntegrationPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [integration, setIntegration] = useState<Integration | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    fetchIntegration();
  }, [id]);

  const fetchIntegration = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/crm-integrations/${id}`);
      if (res.ok) {
        const data = await res.json();
        setIntegration(data.integration);
        setApiKey(data.integration.apiKey || '');
        setWebhookUrl(data.integration.webhookUrl || '');
      }
    } catch {}
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/crm-integrations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, webhookUrl }),
      });
      if (res.ok) {
        toast({ title: 'Intégration mise à jour' });
        fetchIntegration();
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      toast({ title: 'Erreur', description: error instanceof Error ? error.message : 'Erreur lors de la mise à jour', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSync = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/crm-integrations/${id}/sync`, { method: 'POST' });
      if (res.ok) {
        toast({ title: 'Synchronisation lancée' });
      } else {
        throw new Error('Erreur lors de la synchronisation');
      }
    } catch (error) {
      toast({ title: 'Erreur', description: error instanceof Error ? error.message : 'Erreur lors de la synchronisation', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async () => {
    if (!integration) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/crm-integrations/${id}/toggle`, { method: 'POST' });
      if (res.ok) {
        toast({ title: integration.enabled ? 'Intégration désactivée' : 'Intégration activée' });
        fetchIntegration();
      } else {
        throw new Error('Erreur lors du changement d\'état');
      }
    } catch (error) {
      toast({ title: 'Erreur', description: error instanceof Error ? error.message : 'Erreur lors du changement d\'état', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await fetch(`/api/crm-integrations/${id}`, { method: 'DELETE' });
      toast({ title: 'Intégration supprimée' });
      router.push('/novacore/crm-integrations');
    } catch (error) {
      toast({ title: 'Erreur', description: error instanceof Error ? error.message : 'Erreur lors de la suppression', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !integration) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        <span className="ml-4 text-gray-600">Chargement de l'intégration...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Configuration de l'intégration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            {integration.enabled ? <CheckCircle2 className="text-green-600" /> : <XCircle className="text-gray-400" />}
            <span>{integration.name} ({integration.type})</span>
            <Button size="sm" variant="outline" onClick={handleToggle} disabled={saving}>
              {integration.enabled ? 'Désactiver' : 'Activer'}
            </Button>
          </div>
          {(integration.type === 'autre' || integration.type === 'zapier') && (
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Clé API"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
              />
            </div>
          )}
          {integration.type === 'webhook' && (
            <div className="mb-4">
              <Input
                type="text"
                placeholder="URL du webhook"
                value={webhookUrl}
                onChange={e => setWebhookUrl(e.target.value)}
              />
            </div>
          )}
          <div className="flex gap-2 mb-4">
            <Button onClick={handleSave} disabled={saving} variant="default">{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Enregistrer</Button>
            <Button onClick={handleSync} disabled={saving} variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Synchroniser</Button>
            <Button onClick={handleDelete} disabled={saving} variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Supprimer</Button>
          </div>
          <div className="text-xs text-gray-500">Gérez vos webhooks et automatisations depuis cette page.</div>
        </CardContent>
      </Card>
    </div>
  );
} 