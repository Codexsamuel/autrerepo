"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Video,
  Image,
  Scissors,
  Palette,
  Layers,
  ArrowLeft,
  Upload,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"

export default function MediaEditorPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tools = [
    {
      id: "video",
      name: "Éditeur Vidéo",
      icon: Video,
      color: "blue",
      description: "Édition professionnelle de vidéos",
    },
    {
      id: "photo",
      name: "Éditeur Photo",
      icon: Image,
      color: "purple",
      description: "Retouche et optimisation d'images",
    },
    {
      id: "capcut",
      name: "CapCut",
      icon: Scissors,
      color: "green",
      description: "Montage vidéo rapide et efficace",
    },
    {
      id: "canva",
      name: "Canva",
      icon: Palette,
      color: "yellow",
      description: "Design graphique simplifié",
    },
    {
      id: "photoshop",
      name: "Photoshop",
      icon: Layers,
      color: "red",
      description: "Édition photo professionnelle",
    },
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    setResult(null);
    setError(null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedTool) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Simulation du traitement IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler un résultat réussi
      setResult(URL.createObjectURL(file));
    } catch (err) {
      setError("Une erreur est survenue lors du traitement. Veuillez réessayer.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-8">
        <Link href="/novacore/dl-community-manager" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au Community Manager
        </Link>
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Édition Multimédia IA
        </h1>
        <p className="text-gray-600 text-lg">Laissez l'IA optimiser votre contenu</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sélection de l'outil */}
        <div className="lg:col-span-1">
          <Card className="border-none bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Choisissez un outil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolSelect(tool.id)}
                    className={`w-full p-4 rounded-lg transition-all duration-300 flex items-center space-x-4 ${
                      selectedTool === tool.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-full bg-${tool.color}-100`}>
                      <tool.icon className={`h-6 w-6 text-${tool.color}-600`} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{tool.name}</h3>
                      <p className="text-sm opacity-80">{tool.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone de traitement */}
        <div className="lg:col-span-2">
          <Card className="border-none bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {selectedTool ? `Édition avec ${tools.find(t => t.id === selectedTool)?.name}` : 'Sélectionnez un outil'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedTool ? (
                <div className="text-center py-12 text-gray-500">
                  Veuillez sélectionner un outil d'édition
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept={selectedTool === 'video' || selectedTool === 'capcut' ? 'video/*' : 'image/*'}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex flex-col items-center"
                    >
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <span className="text-gray-600">
                        Glissez-déposez votre fichier ou cliquez pour sélectionner
                      </span>
                    </label>
                  </div>

                  {isProcessing && (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
                      <p className="text-gray-600">L'IA optimise votre contenu...</p>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 p-4 rounded-lg flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="text-red-600">{error}</p>
                    </div>
                  )}

                  {result && (
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-green-600">Traitement terminé avec succès !</p>
                      </div>
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        {selectedTool === 'video' || selectedTool === 'capcut' ? (
                          <video
                            src={result}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={result}
                            alt="Résultat"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex justify-end space-x-4">
                        <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                          Télécharger
                        </Button>
                        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                          Partager
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 