"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, CheckCircle, Lock, Clock, BookOpen, Video, FileText, HelpCircle, Award, ChevronRight, ChevronDown, Star, Users, Calendar, Target, Trophy, Download, Share2, Bookmark } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  completed: boolean;
  locked: boolean;
  description: string;
  videoUrl?: string;
  content?: string;
  quiz?: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  completed: boolean;
  progress: number;
}

interface CoursClientProps {
  slug: string;
}

// Données de cours simulées (exemple)
const courseData: Module[] = [
  {
    id: "module-1",
    title: "Fondamentaux CRM",
    description: "Comprendre les bases et les enjeux des CRM",
    duration: "6h",
    progress: 75,
    completed: false,
    lessons: [
      {
        id: "lesson-1-1",
        title: "Introduction aux CRM",
        duration: "45 min",
        type: "video",
        completed: true,
        locked: false,
        description: "Définition, historique et enjeux des CRM",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: "lesson-1-2",
        title: "Les différents types de CRM",
        duration: "30 min",
        type: "text",
        completed: true,
        locked: false,
        description: "CRM opérationnel, analytique et collaboratif",
        content: "Les CRM se divisent en trois catégories principales : opérationnel, analytique et collaboratif..."
      }
    ]
  }
];

export default function CoursClient({ slug }: CoursClientProps) {
  // Ici, on simule le chargement des données selon le slug
  const [modules, setModules] = useState<Module[]>([]);
  useEffect(() => {
    setModules(courseData); // Remplacer par un fetch réel si besoin
  }, [slug]);

  return (
    <div>
      <Header 
        title="Formations DL Solutions"
        description="Apprentissage en ligne"
      />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Cours de la formation : {slug}</h1>
        {modules.map((module) => (
          <Card key={module.id} className="mb-6">
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-gray-600">{module.description}</div>
              <div className="mb-2">Durée : {module.duration}</div>
              <div className="mb-4">
                <Progress value={module.progress} />
              </div>
              <ul>
                {module.lessons.map((lesson) => (
                  <li key={lesson.id} className="mb-2 flex items-center gap-2">
                    {lesson.type === 'video' ? <Video className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                    <span>{lesson.title}</span>
                    <Badge>{lesson.duration}</Badge>
                    {lesson.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {lesson.locked && <Lock className="w-4 h-4 text-gray-400" />}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 