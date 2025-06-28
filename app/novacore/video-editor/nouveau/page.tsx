'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Video, Upload, FileText } from 'lucide-react';

export default function NouveauProjetVideoPage() {
  const [projectName, setProjectName] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Envoyer le projet vidéo à l'API
    alert(`Projet "${projectName}" créé avec la vidéo "${videoFile?.name}"`);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau projet vidéo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nom du projet *</label>
              <div className="relative flex items-center">
                <FileText className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Nom du projet"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Vidéo à importer *</label>
              <div className="relative flex items-center">
                <Upload className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  required
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="pl-10"
                />
              </div>
              {videoFile && (
                <div className="mt-2 text-xs text-gray-600">Fichier sélectionné : {videoFile.name}</div>
              )}
            </div>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 w-full">
              Créer le projet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 