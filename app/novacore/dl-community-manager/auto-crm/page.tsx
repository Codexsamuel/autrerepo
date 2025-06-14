"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  MessageSquare,
  Share2,
  ThumbsUp,
  Eye,
  BarChart3,
  Download,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

interface AutomatedTask {
  id: number;
  task: string;
  status: "completed" | "in_progress" | "pending";
  time: string;
  details: string;
}

interface DailyReport {
  date: string;
  summary: string;
  highlights: string[];
  recommendations: string[];
}

export default function AutoCRMPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dailyStats, setDailyStats] = useState({
    postsCreated: 0,
    engagementRate: 0,
    newFollowers: 0,
    interactions: 0,
    reach: 0,
    contentGenerated: 0,
  });
  const [automatedTasks, setAutomatedTasks] = useState<AutomatedTask[]>([]);
  const [dailyReport, setDailyReport] = useState<DailyReport | null>(null);

  // Simuler le chargement des données
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Données simulées
        setDailyStats({
          postsCreated: 12,
          engagementRate: 4.8,
          newFollowers: 156,
          interactions: 2345,
          reach: 12500,
          contentGenerated: 8,
        });

        setAutomatedTasks([
          {
            id: 1,
            task: "Analyse des tendances",
            status: "completed",
            time: "08:00",
            details: "Identification des hashtags tendance et sujets populaires",
          },
          {
            id: 2,
            task: "Génération de contenu",
            status: "completed",
            time: "09:30",
            details: "Création de 8 posts optimisés pour différents réseaux",
          },
          {
            id: 3,
            task: "Programmation des publications",
            status: "completed",
            time: "10:15",
            details: "Planification des posts aux heures optimales",
          },
          {
            id: 4,
            task: "Engagement communautaire",
            status: "in_progress",
            time: "En cours",
            details: "Réponse aux commentaires et messages",
          },
          {
            id: 5,
            task: "Analyse des performances",
            status: "pending",
            time: "18:00",
            details: "Génération du rapport quotidien",
          },
        ]);

        setDailyReport({
          date: new Date().toLocaleDateString(),
          summary: "Journée productive avec une forte croissance de l'engagement",
          highlights: [
            "Augmentation de 15% des interactions",
            "Meilleur taux d'engagement sur Instagram",
            "3 posts viraux identifiés",
          ],
          recommendations: [
            "Augmenter la fréquence des stories",
            "Développer le contenu vidéo",
            "Optimiser les heures de publication",
          ],
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-8">
        <Link href="/novacore/dl-community-manager" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au Community Manager
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              CRM Automatisé IA
            </h1>
            <p className="text-gray-600 text-lg">Gestion automatique de votre présence sociale</p>
          </div>
          <Badge className="bg-green-100 text-green-800 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Mode Automatique Actif
          </Badge>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Statistiques quotidiennes */}
          <div className="lg:col-span-2">
            <Card className="border-none bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Statistiques Quotidiennes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Posts Créés</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">{dailyStats.postsCreated}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Taux d'Engagement</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">{dailyStats.engagementRate}%</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Users className="h-5 w-5" />
                      <span>Nouveaux Abonnés</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">+{dailyStats.newFollowers}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <ThumbsUp className="h-5 w-5" />
                      <span>Interactions</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">{dailyStats.interactions}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Eye className="h-5 w-5" />
                      <span>Portée</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">{dailyStats.reach}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Share2 className="h-5 w-5" />
                      <span>Contenu Généré</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">{dailyStats.contentGenerated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tâches automatisées */}
          <div className="lg:col-span-1">
            <Card className="border-none bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Tâches Automatisées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automatedTasks.map((task) => (
                    <div key={task.id} className="p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{task.task}</h3>
                        <Badge
                          className={
                            task.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : task.status === "in_progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {task.status === "completed" ? (
                            <CheckCircle className="h-4 w-4 mr-1" />
                          ) : task.status === "in_progress" ? (
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <Clock className="h-4 w-4 mr-1" />
                          )}
                          {task.time}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{task.details}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rapport quotidien */}
          <div className="lg:col-span-3">
            <Card className="border-none bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Rapport Quotidien
                  </CardTitle>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le Rapport
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {dailyReport ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-2">Résumé</h3>
                      <p className="text-gray-600">{dailyReport.summary}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-2">Points Forts</h3>
                      <ul className="space-y-2">
                        {dailyReport.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-2">Recommandations</h3>
                      <ul className="space-y-2">
                        {dailyReport.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <BarChart3 className="h-4 w-4 text-indigo-600 mr-2" />
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Le rapport quotidien sera disponible à la fin de la journée
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 