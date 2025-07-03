'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
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

interface VideoEditorClientProps {
  id: string;
}

export default function VideoEditorClient({ id }: VideoEditorClientProps) {
  const router = useRouter();
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
      // Simuler les données pour l'export statique
      const mockProject: VideoProject = {
        id: id,
        name: `Projet Vidéo ${id}`,
        videoUrl: '/videos/sample.mp4',
        sequences: [
          { id: '1', start: 0, end: 30, label: 'Introduction' },
          { id: '2', start: 30, end: 60, label: 'Partie principale' },
          { id: '3', start: 60, end: 90, label: 'Conclusion' }
        ]
      };
      setProject(mockProject);
    } catch (e) {
      toast({ title: 'Erreur', description: 'Impossible de charger le projet vidéo', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      // Simuler les données
      setClients([
        { id: '1', firstName: 'Jean', lastName: 'Dupont' },
        { id: '2', firstName: 'Marie', lastName: 'Martin' }
      ]);
    } catch {}
  };

  const fetchCrmProjects = async () => {
    try {
      // Simuler les données
      setCrmProjects([
        { id: '1', name: 'Projet Marketing' },
        { id: '2', name: 'Campagne Publicitaire' }
      ]);
    } catch {}
  };

  const handleCut = () => {
    if (!videoRef.current || !project) return;
    const currentTime = videoRef.current.currentTime;
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
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: 'Sauvegardé', description: 'Projet sauvegardé.' });
    } catch (e) {
      toast({ title: 'Erreur', description: 'Erreur lors de la sauvegarde', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    toast({ title: 'Export', description: 'Export vidéo en cours (fonctionnalité à finaliser).' });
  };

  if (loading || !project) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement du projet vidéo...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Sauvegarder
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lecteur vidéo */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Lecteur vidéo</CardTitle>
            </CardHeader>
            <CardContent>
              <video
                ref={videoRef}
                className="w-full rounded-lg"
                controls
                src={project.videoUrl}
              >
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </CardContent>
          </Card>
        </div>

        {/* Panneau de séquences */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="h-5 w-5" />
                Séquences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {project.sequences.map((seq) => (
                  <div
                    key={seq.id}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      selectedSeq === seq.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedSeq(seq.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{seq.label || `Séquence ${seq.id}`}</p>
                        <p className="text-sm text-gray-600">
                          {seq.start}s - {seq.end}s
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSeq(seq.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Outils */}
          <Card>
            <CardHeader>
              <CardTitle>Outils</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleCut} disabled={!selectedSeq} className="w-full">
                <Scissors className="h-4 w-4 mr-2" />
                Découper la séquence
              </Button>
              
              <div className="space-y-2">
                <Input
                  placeholder="Nouveau label"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
                <Button
                  onClick={() => selectedSeq && handleLabelSeq(selectedSeq)}
                  disabled={!selectedSeq || !newLabel}
                  className="w-full"
                >
                  <Text className="h-4 w-4 mr-2" />
                  Étiqueter la séquence
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 