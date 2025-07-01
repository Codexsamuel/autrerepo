"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  CheckCircle, 
  Lock, 
  Clock, 
  BookOpen, 
  Video,
  FileText,
  HelpCircle,
  Award,
  ChevronRight,
  ChevronDown,
  Star,
  Users,
  Calendar,
  Target,
  Trophy,
  Download,
  Share2,
  Bookmark
} from 'lucide-react';
import { getFormationBySlug } from '@/lib/data/formations';
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

// Données de cours pour la formation CRM
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
      },
      {
        id: "lesson-1-3",
        title: "Quiz : Fondamentaux CRM",
        duration: "15 min",
        type: "quiz",
        completed: false,
        locked: false,
        description: "Testez vos connaissances sur les bases CRM",
        quiz: {
          questions: [
            {
              question: "Que signifie CRM ?",
              options: [
                "Customer Relationship Management",
                "Client Resource Management", 
                "Customer Resource Manager",
                "Client Relationship Manager"
              ],
              correctAnswer: 0
            },
            {
              question: "Quel est l'objectif principal d'un CRM ?",
              options: [
                "Réduire les coûts",
                "Améliorer la relation client",
                "Automatiser les processus",
                "Tous les précédents"
              ],
              correctAnswer: 3
            }
          ]
        }
      },
      {
        id: "lesson-1-4",
        title: "Panorama des solutions CRM",
        duration: "1h",
        type: "video",
        completed: false,
        locked: false,
        description: "Comparatif des principales solutions du marché",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ]
  },
  {
    id: "module-2",
    title: "Automatisation & Processus",
    description: "Maîtriser l'automatisation des processus de vente",
    duration: "6h",
    progress: 25,
    completed: false,
    lessons: [
      {
        id: "lesson-2-1",
        title: "Workflows d'automatisation",
        duration: "1h",
        type: "video",
        completed: true,
        locked: false,
        description: "Créer des workflows efficaces",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: "lesson-2-2",
        title: "Gestion des leads",
        duration: "45 min",
        type: "text",
        completed: false,
        locked: false,
        description: "Qualification et scoring des prospects",
        content: "La gestion des leads est cruciale pour optimiser votre pipeline de vente..."
      },
      {
        id: "lesson-2-3",
        title: "Pipeline de vente",
        duration: "1h30",
        type: "video",
        completed: false,
        locked: true,
        description: "Optimiser les étapes de votre pipeline",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ]
  },
  {
    id: "module-3",
    title: "Analytics & Optimisation",
    description: "Analyser et optimiser vos performances",
    duration: "6h",
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "lesson-3-1",
        title: "Tableaux de bord",
        duration: "1h",
        type: "video",
        completed: false,
        locked: true,
        description: "Créer des KPIs pertinents",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: "lesson-3-2",
        title: "Analyse des performances",
        duration: "1h",
        type: "text",
        completed: false,
        locked: true,
        description: "Interpréter vos données",
        content: "L'analyse des performances vous permet d'identifier les points d'amélioration..."
      },
      {
        id: "lesson-3-3",
        title: "Optimisation continue",
        duration: "45 min",
        type: "video",
        completed: false,
        locked: true,
        description: "Améliorer vos processus",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ]
  }
];

export default function CoursPage({ params }: { params: { slug: string } }) {
  const formationData = getFormationBySlug(params.slug);
  
  if (!formationData) {
    notFound();
  }

  const [expandedModules, setExpandedModules] = useState<string[]>(["module-1"]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(courseData[0].lessons[0]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.locked) {
      setSelectedLesson(lesson);
    }
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateQuizScore = () => {
    if (!selectedLesson?.quiz) return 0;
    
    let correct = 0;
    selectedLesson.quiz.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    return Math.round((correct / selectedLesson.quiz.questions.length) * 100);
  };

  const totalProgress = Math.round(
    courseData.reduce((acc, module) => acc + module.progress, 0) / courseData.length
  );

  const completedLessons = courseData.reduce(
    (acc, module) => acc + module.lessons.filter(lesson => lesson.completed).length, 
    0
  );

  const totalLessons = courseData.reduce(
    (acc, module) => acc + module.lessons.length, 
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={`Cours - ${formationData.title}`} description="Suivez votre formation à votre rythme" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Modules */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Programme
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progression globale</span>
                    <span className="font-medium">{totalProgress}%</span>
                  </div>
                  <Progress value={totalProgress} className="h-2" />
                  <p className="text-xs text-gray-600">
                    {completedLessons}/{totalLessons} leçons terminées
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseData.map((module) => (
                    <div key={module.id} className="border rounded-lg">
                      <div 
                        className="p-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                        onClick={() => toggleModule(module.id)}
                      >
                        <div className="flex items-center gap-2">
                          {module.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                          )}
                          <div>
                            <h4 className="font-medium text-sm">{module.title}</h4>
                            <p className="text-xs text-gray-600">{module.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{module.progress}%</span>
                          {expandedModules.includes(module.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      
                      {expandedModules.includes(module.id) && (
                        <div className="border-t bg-gray-50">
                          {module.lessons.map((lesson) => (
                            <div 
                              key={lesson.id}
                              className={`p-3 cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${
                                selectedLesson?.id === lesson.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                              }`}
                              onClick={() => handleLessonClick(lesson)}
                            >
                              <div className="flex-shrink-0">
                                {lesson.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : lesson.locked ? (
                                  <Lock className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  {lesson.type === 'video' && <Video className="h-3 w-3 text-blue-500" />}
                                  {lesson.type === 'text' && <FileText className="h-3 w-3 text-green-500" />}
                                  {lesson.type === 'quiz' && <HelpCircle className="h-3 w-3 text-purple-500" />}
                                  {lesson.type === 'exercise' && <Target className="h-3 w-3 text-orange-500" />}
                                  <p className="text-sm font-medium truncate">{lesson.title}</p>
                                </div>
                                <p className="text-xs text-gray-600">{lesson.duration}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {selectedLesson ? (
              <div className="space-y-6">
                {/* En-tête de la leçon */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {selectedLesson.type === 'video' && <Video className="h-5 w-5 text-blue-500" />}
                          {selectedLesson.type === 'text' && <FileText className="h-5 w-5 text-green-500" />}
                          {selectedLesson.type === 'quiz' && <HelpCircle className="h-5 w-5 text-purple-500" />}
                          {selectedLesson.type === 'exercise' && <Target className="h-5 w-5 text-orange-500" />}
                          {selectedLesson.title}
                        </CardTitle>
                        <p className="text-gray-600 mt-2">{selectedLesson.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {selectedLesson.duration}
                        </Badge>
                        {selectedLesson.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Terminé
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Contenu de la leçon */}
                <Card>
                  <CardContent className="p-6">
                    {selectedLesson.type === 'video' && selectedLesson.videoUrl && (
                      <div className="space-y-4">
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                          <iframe
                            src={selectedLesson.videoUrl}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              // Marquer comme terminé
                              alert('Leçon marquée comme terminée !');
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Marquer comme terminé
                          </Button>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Télécharger
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-2" />
                              Partager
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedLesson.type === 'text' && selectedLesson.content && (
                      <div className="space-y-4">
                        <div className="prose max-w-none">
                          <p>{selectedLesson.content}</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              alert('Leçon marquée comme terminée !');
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Marquer comme terminé
                          </Button>
                          <Button variant="outline">
                            <Bookmark className="h-4 w-4 mr-2" />
                            Ajouter aux favoris
                          </Button>
                        </div>
                      </div>
                    )}

                    {selectedLesson.type === 'quiz' && selectedLesson.quiz && (
                      <div className="space-y-6">
                        {!showQuizResults ? (
                          <>
                            <div className="space-y-4">
                              {selectedLesson.quiz.questions.map((question, questionIndex) => (
                                <div key={questionIndex} className="border rounded-lg p-4">
                                  <h4 className="font-medium mb-3">
                                    Question {questionIndex + 1} : {question.question}
                                  </h4>
                                  <div className="space-y-2">
                                    {question.options.map((option, optionIndex) => (
                                      <label 
                                        key={optionIndex}
                                        className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50"
                                      >
                                        <input
                                          type="radio"
                                          name={`question-${questionIndex}`}
                                          value={optionIndex}
                                          checked={quizAnswers[questionIndex] === optionIndex}
                                          onChange={() => handleQuizAnswer(questionIndex, optionIndex)}
                                          className="text-blue-600"
                                        />
                                        <span>{option}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Button 
                              className="w-full bg-blue-600 hover:bg-blue-700"
                              onClick={() => setShowQuizResults(true)}
                            >
                              Valider le quiz
                            </Button>
                          </>
                        ) : (
                          <div className="text-center space-y-4">
                            <div className="text-6xl">🎉</div>
                            <h3 className="text-2xl font-bold">
                              Quiz terminé !
                            </h3>
                            <div className="text-4xl font-bold text-blue-600">
                              {calculateQuizScore()}%
                            </div>
                            <p className="text-gray-600">
                              {calculateQuizScore() >= 80 
                                ? "Excellent ! Vous maîtrisez bien ce module." 
                                : "Continuez à réviser pour améliorer votre score."
                              }
                            </p>
                            <div className="flex items-center justify-center gap-4">
                              <Button 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  setShowQuizResults(false);
                                  alert('Leçon marquée comme terminée !');
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Continuer
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  setShowQuizResults(false);
                                  setQuizAnswers({});
                                }}
                              >
                                Recommencer
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Navigation entre leçons */}
                <div className="flex items-center justify-between">
                  <Button variant="outline" disabled>
                    <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                    Leçon précédente
                  </Button>
                  <Button variant="outline">
                    Leçon suivante
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sélectionnez une leçon</h3>
      <p className="text-gray-600">
                    Choisissez une leçon dans le menu de gauche pour commencer votre formation.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}