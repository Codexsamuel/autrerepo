'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Save, Scissors, Trash2, Plus, Download, Text, Image as ImageIcon, Film } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VideoSequence {
  id: string;
  start: number;
  end: number;
  label?: string;
}

interface VideoProject {
  id: string;
  name: string;
  videoUrl: string;
  sequences: VideoSequence[];
  clientId?: string;
  crmProjectId?: string;
}

interface Client {
  id: string;
  firstName: string;
  lastName: string;
}

interface CRMProject {
  id: string;
  name: string;
}

export default function VideoEditorPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [project, setProject] = useState<VideoProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSeq, setSelectedSeq] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [crmProjects, setCrmProjects] = useState<CRMProject[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedCrmProject, setSelectedCrmProject] = useState<string | null>(null);

  useEffect(() => {
    fetchProject();
    fetchClients();
    fetchCrmProjects();
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/video-editor/projects/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data.project);
      }
    } catch (e) {
      toast({ title: 'Erreur', description: 'Impossible de charger le projet vidéo', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
      }
    } catch {}
  };

  const fetchCrmProjects = async () => {
    try {
      const res = await fetch('/api/crm-projects');
      if (res.ok) {
        const data = await res.json();
        setCrmProjects(data.projects || []);
      }
    } catch {}
  };

  const handleCut = () => {
    if (!videoRef.current || !project) return;
    const currentTime = videoRef.current.currentTime;
    // Découpe la séquence sélectionnée à l'endroit courant
    const seq = project.sequences.find(s => s.id === selectedSeq);
    if (!seq) return;
    if (currentTime <= seq.start || currentTime >= seq.end) return;
    const newSeq1: VideoSequence = { id: crypto.randomUUID(), start: seq.start, end: currentTime };
    const newSeq2: VideoSequence = { id: crypto.randomUUID(), start: currentTime, end: seq.end };
    const newSequences = project.sequences
      .filter(s => s.id !== seq.id)
      .concat([newSeq1, newSeq2])
      .sort((a, b) => a.start - b.start);
    setProject({ ...project, sequences: newSequences });
    setSelectedSeq(newSeq1.id);
  };

  const handleDeleteSeq = (seqId: string) => {
    if (!project) return;
    setProject({ ...project, sequences: project.sequences.filter(s => s.id !== seqId) });
    setSelectedSeq(null);
  };

  const handleLabelSeq = (seqId: string) => {
    if (!project) return;
    setProject({
      ...project,
      sequences: project.sequences.map(s =>
        s.id === seqId ? { ...s, label: newLabel } : s
      ),
    });
    setNewLabel('');
  };

  const handleSave = async () => {
    if (!project) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/video-editor/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequences: project.sequences }),
      });
      if (res.ok) {
        toast({ title: 'Sauvegardé', description: 'Projet sauvegardé.' });
      } else {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (e) {
      toast({ title: 'Erreur', description: 'Erreur lors de la sauvegarde', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    toast({ title: 'Export', description: 'Export vidéo en cours (fonctionnalité à finaliser).' });
  };

  const handleLinkClient = async (clientId: string) => {
    if (!project) return;
    setSelectedClient(clientId);
    await fetch(`/api/video-editor/projects/${id}/link-client`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId }),
    });
    toast({ title: 'Vidéo liée au client' });
    fetchProject();
  };

  const handleLinkCrmProject = async (crmProjectId: string) => {
    if (!project) return;
    setSelectedCrmProject(crmProjectId);
    await fetch(`/api/video-editor/projects/${id}/link-crm-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crmProjectId }),
    });
    toast({ title: 'Vidéo liée au projet CRM' });
    fetchProject();
  };

  const handleUnlink = async (type: 'client' | 'crmProject') => {
    if (!project) return;
    await fetch(`/api/video-editor/projects/${id}/unlink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    });
    toast({ title: 'Liaison supprimée' });
    fetchProject();
  };

  if (loading || !project) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        <span className="ml-4 text-gray-600">Chargement du projet vidéo...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={() => router.back()} className="mb-2">
            <Film className="h-4 w-4 mr-2" /> Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saving} variant="outline">
            {saving ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : (<Save className="mr-2 h-4 w-4" />)}
            Sauvegarder
          </Button>
          <Button onClick={handleExport} variant="default">
            <Download className="mr-2 h-4 w-4" /> Exporter (mp4)
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Éditeur vidéo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Aperçu vidéo */}
            <div className="flex-1">
              <video ref={videoRef} src={project.videoUrl} controls className="w-full rounded-lg shadow" />
            </div>
            {/* Timeline & outils */}
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="font-semibold mb-2 flex items-center gap-2"><Scissors className="h-4 w-4" /> Timeline</h2>
                <ul className="space-y-2">
                  {project.sequences.map(seq => (
                    <li key={seq.id} className={`p-2 rounded border flex items-center gap-2 ${selectedSeq === seq.id ? 'bg-blue-100 border-blue-400' : 'bg-white'}`}>
                      <Button size="icon" variant="ghost" onClick={() => setSelectedSeq(seq.id)}><Scissors className="h-4 w-4" /></Button>
                      <span>{seq.label || `Séquence ${seq.id.slice(0, 4)}`}</span>
                      <span className="text-xs text-gray-500 ml-2">[{seq.start.toFixed(1)}s - {seq.end.toFixed(1)}s]</span>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteSeq(seq.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      <Input size={8} value={seq.label || ''} onChange={e => setNewLabel(e.target.value)} placeholder="Label" />
                      <Button size="sm" onClick={() => handleLabelSeq(seq.id)}><Save className="h-4 w-4" /></Button>
                    </li>
                  ))}
                </ul>
                {selectedSeq && (
                  <Button className="mt-2" onClick={handleCut} variant="secondary"><Scissors className="mr-2 h-4 w-4" /> Découper à la position courante</Button>
                )}
              </div>
              <div>
                <h2 className="font-semibold mb-2 flex items-center gap-2"><Plus className="h-4 w-4" /> Outils</h2>
                <div className="flex gap-2">
                  <Button variant="outline"><Text className="h-4 w-4" /> Texte</Button>
                  <Button variant="outline"><ImageIcon className="h-4 w-4" /> Image</Button>
                  <Button variant="outline"><Scissors className="h-4 w-4" /> Découper</Button>
                  <Button variant="outline"><Save className="h-4 w-4" /> Sauvegarder</Button>
                </div>
                <div className="text-xs text-gray-400 mt-2">(Outils IA, transitions, etc. à venir)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lier à un client ou projet CRM</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <Select value={selectedClient || project?.clientId || ''} onValueChange={handleLinkClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>{client.firstName} {client.lastName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {project?.clientId && (
                <Button size="sm" variant="outline" className="mt-2" onClick={() => handleUnlink('client')}>Dissocier du client</Button>
              )}
            </div>
            <div className="flex-1">
              <Select value={selectedCrmProject || project?.crmProjectId || ''} onValueChange={handleLinkCrmProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un projet CRM" />
                </SelectTrigger>
                <SelectContent>
                  {crmProjects.map(proj => (
                    <SelectItem key={proj.id} value={proj.id}>{proj.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {project?.crmProjectId && (
                <Button size="sm" variant="outline" className="mt-2" onClick={() => handleUnlink('crmProject')}>Dissocier du projet</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 