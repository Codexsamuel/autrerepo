"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Download,
  BookOpen,
  Users,
  MessageSquare,
  Award,
  CheckCircle,
  FileText,
  Video,
  Star,
  Menu,
  X,
  Home,
} from "lucide-react"

export default function CoursPage() {
  const params = useParams()
  const [currentLesson, setCurrentLesson] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [completedLessons, setCompletedLessons] = useState(new Set([]))

  const slug = params?.slug || "televente-prospection"

  const courseData = {
    "televente-prospection": {
      title: "Télévente & Prospection",
      description: "Maîtrisez les techniques de vente par téléphone et développez votre portefeuille client",
      instructor: "Jean Dupont",
      duration: "3 jours",
      totalLessons: 12,
      modules: [
        {
          title: "Module 1: Fondamentaux de la télévente",
          lessons: [
            {
              title: "Introduction à la télévente moderne",
              duration: "15 min",
              type: "video",
              completed: false,
              description: "Découvrez les bases de la télévente et son évolution",
            },
            {
              title: "Psychologie du client au téléphone",
              duration: "20 min",
              type: "video",
              completed: false,
              description: "Comprendre la psychologie de vos prospects",
            },
            {
              title: "Préparation du poste de travail",
              duration: "10 min",
              type: "document",
              completed: false,
              description: "Optimiser votre environnement de travail",
            },
            {
              title: "Quiz: Fondamentaux",
              duration: "5 min",
              type: "quiz",
              completed: false,
              description: "Testez vos connaissances",
            },
          ],
        },
        {
          title: "Module 2: Techniques de prospection",
          lessons: [
            {
              title: "Stratégies de prospection ciblée",
              duration: "25 min",
              type: "video",
              completed: false,
              description: "Identifier et cibler vos prospects",
            },
            {
              title: "Techniques de prise de contact",
              duration: "18 min",
              type: "video",
              completed: false,
              description: "Réussir vos premiers contacts",
            },
            {
              title: "Gestion des objections",
              duration: "22 min",
              type: "video",
              completed: false,
              description: "Transformer les objections en opportunités",
            },
            {
              title: "Atelier pratique: Jeux de rôles",
              duration: "30 min",
              type: "exercise",
              completed: false,
              description: "Mise en pratique avec simulations",
            },
          ],
        },
        {
          title: "Module 3: Closing et suivi",
          lessons: [
            {
              title: "Techniques de closing efficaces",
              duration: "20 min",
              type: "video",
              completed: false,
              description: "Finaliser vos ventes avec succès",
            },
            {
              title: "Gestion du pipeline",
              duration: "15 min",
              type: "video",
              completed: false,
              description: "Organiser et suivre vos prospects",
            },
            {
              title: "Outils CRM pour télévente",
              duration: "25 min",
              type: "video",
              completed: false,
              description: "Utiliser les outils modernes",
            },
            {
              title: "Évaluation finale",
              duration: "30 min",
              type: "exam",
              completed: false,
              description: "Validation de vos acquis",
            },
          ],
        },
      ],
    },
  }

  const course = courseData[slug] || courseData["televente-prospection"]
  const allLessons = course.modules.flatMap((module) => module.lessons)
  const currentLessonData = allLessons[currentLesson]

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return Video
      case "document":
        return FileText
      case "quiz":
      case "exam":
        return Award
      case "exercise":
        return Users
      default:
        return BookOpen
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-700"
      case "document":
        return "bg-green-100 text-green-700"
      case "quiz":
      case "exam":
        return "bg-purple-100 text-purple-700"
      case "exercise":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const markAsCompleted = (lessonIndex) => {
    setCompletedLessons((prev) => new Set([...prev, lessonIndex]))
  }

  const calculateProgress = () => {
    return Math.round((completedLessons.size / allLessons.length) * 100)
  }

  useEffect(() => {
    // Simulation de progression automatique pour la démo
    if (isPlaying) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            markAsCompleted(currentLesson)
            return 100
          }
          return prev + 1
        })
      }, 200)
      return () => clearInterval(timer)
    }
  }, [isPlaying, currentLesson])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <img src="/images/dl-logo.jpg" alt="DL Solutions" className="h-8 w-8 object-contain" />
            <span className="font-bold text-lg">DL Solutions</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 border-b">
          <h2 className="font-bold text-lg mb-2">{course.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{course.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{calculateProgress()}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {completedLessons.size} / {allLessons.length} leçons
              </span>
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {course.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="border-b">
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-sm">{module.title}</h3>
              </div>
              <div className="space-y-1">
                {module.lessons.map((lesson, lessonIndex) => {
                  const globalIndex =
                    course.modules.slice(0, moduleIndex).reduce((acc, mod) => acc + mod.lessons.length, 0) + lessonIndex
                  const Icon = getTypeIcon(lesson.type)
                  const isCompleted = completedLessons.has(globalIndex)
                  const isCurrent = currentLesson === globalIndex

                  return (
                    <button
                      key={lessonIndex}
                      onClick={() => setCurrentLesson(globalIndex)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        isCurrent ? "bg-blue-50 border-r-2 border-blue-500" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-1 rounded ${getTypeColor(lesson.type)}`}>
                          <Icon className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-medium truncate">{lesson.title}</h4>
                            {isCompleted && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <a href="/formations">
                <Home className="h-4 w-4 mr-2" />
                Retour aux formations
              </a>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Support
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="font-bold text-xl">{currentLessonData?.title}</h1>
                <p className="text-sm text-gray-600">{currentLessonData?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{currentLessonData?.duration}</Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Ressources
              </Button>
            </div>
          </div>
        </header>

        {/* Video Player / Content Area */}
        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  {currentLessonData?.type === "video" ? (
                    <div className="relative">
                      <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{currentLessonData.title}</h3>
                          <p className="text-sm opacity-75">{currentLessonData.description}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-900 text-white rounded-b-lg">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                            disabled={currentLesson === 0}
                          >
                            <SkipBack className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="bg-white/20"
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentLesson(Math.min(allLessons.length - 1, currentLesson + 1))}
                            disabled={currentLesson === allLessons.length - 1}
                          >
                            <SkipForward className="h-4 w-4" />
                          </Button>
                          <div className="flex-1">
                            <Progress value={progress} className="h-1" />
                          </div>
                          <span className="text-sm">{currentLessonData.duration}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {React.createElement(getTypeIcon(currentLessonData?.type), {
                          className: "h-8 w-8 text-gray-600",
                        })}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{currentLessonData?.title}</h3>
                      <p className="text-gray-600 mb-6">{currentLessonData?.description}</p>
                      <Button className="bg-gradient-to-r from-teal-600 to-blue-600">
                        Commencer {currentLessonData?.type === "quiz" ? "le quiz" : "l'exercice"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notes Section */}
              <Card className="border-0 shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Notes de cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Points clés à retenir :</h4>
                      <ul className="text-sm space-y-1">
                        <li>• La préparation est essentielle avant chaque appel</li>
                        <li>• Adapter son discours selon le profil du prospect</li>
                        <li>• Écouter activement pour identifier les besoins</li>
                      </ul>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Ressources complémentaires :</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Guide de prospection téléphonique.pdf
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Scripts d'appels types.docx
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Votre formateur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">JD</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{course.instructor}</h4>
                      <p className="text-sm text-gray-600">Expert en Télévente</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      4.9/5
                    </div>
                    <div>15 ans d'expérience</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Communauté</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Apprenants actifs</span>
                      <Badge variant="secondary">127</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Rejoindre le forum
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Groupes d'étude
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Certification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Certification DL Solutions</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Complétez tous les modules pour obtenir votre certification
                    </p>
                    <Progress value={calculateProgress()} className="mb-2" />
                    <p className="text-xs text-gray-500">{calculateProgress()}% complété</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
