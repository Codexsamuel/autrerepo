"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  FileText,
  Upload,
  AlertTriangle,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react"

interface Report {
  id: string
  reporter: {
    name: string
    role: string
    company: string
  }
  reason: string
  description: string
  evidence: string[]
  status: "pending" | "approved" | "rejected"
  createdAt: string
  defense?: {
    statement: string
    evidence: string[]
    submittedAt: string
  }
}

export default function DefensePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [evidence, setEvidence] = useState<File[]>([])

  const [report] = useState<Report>({
    id: "1",
    reporter: {
      name: "Jean Dupont",
      role: "Directeur Commercial",
      company: "Sales Pro"
    },
    reason: "Harcèlement professionnel",
    description: "L'utilisateur a envoyé des messages inappropriés et fait des commentaires déplacés lors de réunions professionnelles.",
    evidence: ["message1.pdf", "screenshot1.png"],
    status: "pending",
    createdAt: "2024-03-15T10:30:00Z",
    defense: {
      statement: "Je conteste fermement ces allégations. Les messages cités ont été sortis de leur contexte et les commentaires lors des réunions étaient strictement professionnels.",
      evidence: ["context.pdf", "witness_statement.pdf"],
      submittedAt: "2024-03-16T14:20:00Z"
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Implement defense submission
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEvidence(Array.from(e.target.files))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Image
            src="https://res.cloudinary.com/dko5sommz/image/upload/v1745950544/novaworld-logo-generated_gqmjwf.png"
            alt="NovaWorld Logo"
            width={200}
            height={50}
            className="mx-auto h-12 w-auto"
          />
          <h1 className="mt-6 text-2xl font-bold">Défense</h1>
          <p className="mt-2 text-gray-600">
            Répondez aux allégations et présentez votre défense
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="font-semibold mb-4">Signalement en cours</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Signalé par</h3>
                  <p className="mt-1">
                    {report.reporter.name} ({report.reporter.role} @ {report.reporter.company})
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Raison</h3>
                  <p className="mt-1">{report.reason}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-gray-600">{report.description}</p>
                </div>

                {report.evidence.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Preuves fournies</h3>
                    <div className="mt-2 space-y-2">
                      {report.evidence.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span>{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Badge variant={report.status === "pending" ? "secondary" : report.status === "approved" ? "success" : "destructive"}>
                    {report.status === "pending" ? "En cours" : report.status === "approved" ? "Approuvé" : "Rejeté"}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Signalement reçu le {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {report.defense ? (
              <div className="space-y-4">
                <h3 className="font-medium">Votre défense</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">{report.defense.statement}</p>
                </div>

                {report.defense.evidence.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Preuves fournies</h4>
                    <div className="mt-2 space-y-2">
                      {report.defense.evidence.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span>{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  Soumis le {new Date(report.defense.submittedAt).toLocaleDateString()}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="statement">Votre déclaration</Label>
                  <Textarea
                    id="statement"
                    placeholder="Présentez votre défense et expliquez votre point de vue..."
                    className="mt-2"
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label>Preuves à l'appui</Label>
                  <div className="mt-2">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Formats acceptés : PDF, DOC, DOCX, JPG, PNG (max 5MB par fichier)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    {evidence.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {evidence.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setEvidence(evidence.filter((_, i) => i !== index))}
                            >
                              Supprimer
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    <Shield className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Envoi..." : "Soumettre ma défense"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 