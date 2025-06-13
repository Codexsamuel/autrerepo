"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  AlertTriangle,
  UserX,
  UserCheck,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  FileText,
  ChevronDown,
} from "lucide-react"

interface Report {
  id: string
  reporter: {
    id: string
    name: string
    role: string
    company: string
    isVerified: boolean
  }
  reported: {
    id: string
    name: string
    role: string
    company: string
    isVerified: boolean
  }
  reason: string
  description: string
  status: "pending" | "under_review" | "resolved" | "dismissed"
  type: "block" | "ban" | "complaint"
  timestamp: string
  evidence?: string[]
  councilVotes?: {
    userId: string
    vote: "pardon" | "ban" | "warning"
    comment: string
  }[]
}

interface CouncilMember {
  id: string
  name: string
  role: string
  company: string
  level: "junior" | "senior" | "executive"
  isVerified: boolean
  isPremium: boolean
}

export default function ModerationPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showCouncil, setShowCouncil] = useState(false)

  const [reports] = useState<Report[]>([
    {
      id: "1",
      reporter: {
        id: "1",
        name: "Marie Dubois",
        role: "Directrice RH",
        company: "Tech Solutions",
        isVerified: true
      },
      reported: {
        id: "2",
        name: "Thomas Martin",
        role: "Directeur Commercial",
        company: "Global Trade",
        isVerified: true
      },
      reason: "Harcèlement professionnel",
      description: "Messages inappropriés et comportement agressif lors des échanges professionnels.",
      status: "under_review",
      type: "ban",
      timestamp: "Il y a 2 jours",
      evidence: ["message1.pdf", "message2.pdf"]
    }
  ])

  const [councilMembers] = useState<CouncilMember[]>([
    {
      id: "1",
      name: "Sophie Bernard",
      role: "Directrice Juridique",
      company: "Legal Corp",
      level: "executive",
      isVerified: true,
      isPremium: true
    },
    {
      id: "2",
      name: "Pierre Dubois",
      role: "Responsable RH",
      company: "HR Solutions",
      level: "senior",
      isVerified: true,
      isPremium: true
    },
    {
      id: "3",
      name: "Julie Martin",
      role: "Consultante",
      company: "Consulting Pro",
      level: "junior",
      isVerified: true,
      isPremium: false
    }
  ])

  const handleBlock = (userId: string) => {
    // TODO: Implement block logic
  }

  const handleUnblock = (userId: string) => {
    // TODO: Implement unblock logic
  }

  const handleReport = (userId: string) => {
    // TODO: Implement report logic
  }

  const handleCouncilVote = (reportId: string, vote: "pardon" | "ban" | "warning") => {
    // TODO: Implement council vote logic
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Modération</h1>
            <p className="text-gray-600">Gestion des signalements et conseil de sécurité</p>
          </div>
          <Button onClick={() => setShowCouncil(!showCouncil)}>
            <Shield className="h-5 w-5 mr-2" />
            {showCouncil ? "Masquer le conseil" : "Afficher le conseil"}
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Liste des signalements */}
          <div className="col-span-8">
            <div className="space-y-6">
              {reports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">Signalement #{report.id}</h3>
                          <Badge variant={
                            report.status === "pending" ? "secondary" :
                            report.status === "under_review" ? "default" :
                            report.status === "resolved" ? "success" : "destructive"
                          }>
                            {report.status === "pending" ? "En attente" :
                             report.status === "under_review" ? "En cours" :
                             report.status === "resolved" ? "Résolu" : "Rejeté"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{report.timestamp}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedReport(report)}
                      >
                        Voir les détails
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Signaleur</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {report.reporter.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{report.reporter.name}</p>
                            <p className="text-sm text-gray-600">{report.reporter.role} @ {report.reporter.company}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Signalé</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="text-red-600 font-semibold">
                              {report.reported.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{report.reported.name}</p>
                            <p className="text-sm text-gray-600">{report.reported.role} @ {report.reported.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Raison</h4>
                      <p className="text-gray-600">{report.reason}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Description</h4>
                      <p className="text-gray-600">{report.description}</p>
                    </div>

                    {report.evidence && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Preuves</h4>
                        <div className="flex space-x-2">
                          {report.evidence.map((file, index) => (
                            <Badge key={index} variant="secondary">
                              <FileText className="h-4 w-4 mr-1" />
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => handleBlock(report.reported.id)}>
                        <UserX className="h-4 w-4 mr-2" />
                        Bloquer
                      </Button>
                      <Button variant="outline" onClick={() => handleUnblock(report.reported.id)}>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Débloquer
                      </Button>
                      <Button variant="destructive" onClick={() => handleReport(report.reported.id)}>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Demander le bannissement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Conseil de sécurité */}
          {showCouncil && (
            <div className="col-span-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Conseil de Sécurité</h3>
                  <div className="space-y-4">
                    {councilMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role} @ {member.company}</p>
                          <Badge variant="secondary">{member.level}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedReport && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-4">Vote du conseil</h4>
                      <div className="space-y-4">
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => handleCouncilVote(selectedReport.id, "pardon")}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Pardonner
                        </Button>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => handleCouncilVote(selectedReport.id, "warning")}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Avertissement
                        </Button>
                        <Button
                          className="w-full"
                          variant="destructive"
                          onClick={() => handleCouncilVote(selectedReport.id, "ban")}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Bannir
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 