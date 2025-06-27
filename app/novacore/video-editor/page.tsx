"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Plus, Eye } from 'lucide-react';
import Link from 'next/link';

const projects = [
  { id: 1, name: "dav", video: "a-l-instititu-francais-de-yaounde.mp4", status: "En cours", created: "2024-06-27", thumbnail: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif" },
  { id: 2, name: "Présentation DL Solutions", video: "presentation-dl.mp4", status: "Terminé", created: "2024-06-20", thumbnail: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg" },
  { id: 3, name: "Spot publicitaire", video: "spot-pub.mp4", status: "En cours", created: "2024-06-15", thumbnail: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg" },
];

export default function VideoEditorPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Video Editor</h1>
        <Link href="/novacore/video-editor/nouveau">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau projet vidéo
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-3">
                <img src={project.thumbnail} alt={project.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-xs text-gray-500">{project.video}</p>
                  <span className={`text-xs font-medium ${project.status === 'Terminé' ? 'text-green-600' : 'text-orange-600'}`}>{project.status}</span>
                </div>
              </div>
              <span className="text-xs text-gray-400">{project.created}</span>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 