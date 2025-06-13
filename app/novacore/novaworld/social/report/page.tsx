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
  AlertTriangle,
  FileText,
  Upload,
  Shield,
  UserX,
  MessageSquare,
} from "lucide-react"

interface User {
  id: string
  name: string
  role: string
  company: string
  isVerified: boolean
}

export default function ReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reportType, setReportType] = useState<"block" | "ban" | "complaint">("complaint")
  const [evidence, setEvidence] = useState<File[]>([])

  const [reportedUser] = useState<User>({
    id: "1",
    name: "Thomas Martin",
    role: "Directeur Commercial",
    company: "Global Trade",
    isVerified: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Implement report submission
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
          <h1 className="mt-6 text-2xl font-bold">Signaler un comportement</h1>
          <p className="mt-2 text-gray-600">
            Aidez-nous à maintenir un environnement professionnel sain
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="font-semibold mb-4">Utilisateur signalé</h2>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-semibold">
                    {reportedUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{reportedUser.name}</h3>
                    {reportedUser.isVerified && (
                      <Badge variant="secondary">Vérifié</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {reportedUser.role} @ {reportedUser.company}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="type">Type de signalement</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <Button
                    type="button"
                    variant={reportType === "block" ? "default" : "outline"}
                    onClick={() => setReportType("block")}
                    className="w-full"
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Bloquer
                  </Button>
                  <Button
                    type="button"
                    variant={reportType === "ban" ? "default" : "outline"}
                    onClick={() => setReportType("ban")}
                    className="w-full"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Bannir
                  </Button>
                  <Button
                    type="button"
                    variant={reportType === "complaint" ? "default" : "outline"}
                    onClick={() => setReportType("complaint")}
                    className="w-full"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Plainte
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Raison du signalement</Label>
                <Input
                  id="reason"
                  placeholder="Ex: Harcèlement professionnel, comportement inapproprié..."
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez en détail le comportement signalé..."
                  className="mt-2"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label>Preuves (optionnel)</Label>
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
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Envoi..." : "Envoyer le signalement"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 