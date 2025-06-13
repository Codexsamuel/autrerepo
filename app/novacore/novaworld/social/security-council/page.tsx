"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  UserX,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface CouncilMember {
  id: string
  name: string
  role: string
  company: string
  level: string
  isVerified: boolean
  vote?: "approve" | "reject" | "pending"
}

interface Report {
  id: string
  reporter: {
    name: string
    role: string
    company: string
  }
  reportedUser: {
    name: string
    role: string
    company: string
  }
  reason: string
  description: string
  evidence: string[]
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export default function SecurityCouncilPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const [councilMembers] = useState<CouncilMember[]>([
    {
      id: "1",
      name: "Marie Dubois",
      role: "CEO",
      company: "Tech Solutions",
      level: "Executive",
      isVerified: true,
      vote: "approve"
    },
    {
      id: "2",
      name: "Pierre Martin",
      role: "Directeur Financier",
      company: "Global Finance",
      level: "Executive",
      isVerified: true,
      vote: "reject"
    },
    {
      id: "3",
      name: "Sophie Bernard",
      role: "Directrice Marketing",
      company: "Digital Marketing",
      level: "Premium",
      isVerified: true,
      vote: "pending"
    },
    // ... autres membres
  ])

  const [reports] = useState<Report[]>([
    {
      id: "1",
      reporter: {
        name: "Jean Dupont",
        role: "Directeur Commercial",
        company: "Sales Pro"
      },
      reportedUser: {
        name: "Thomas Martin",
        role: "Directeur Marketing",
        company: "Global Trade"
      },
      reason: "Harcèlement professionnel",
      description: "L'utilisateur a envoyé des messages inappropriés et fait des commentaires déplacés lors de réunions professionnelles.",
      evidence: ["message1.pdf", "screenshot1.png"],
      status: "pending",
      createdAt: "2024-03-15T10:30:00Z"
    },
    // ... autres signalements
  ])

  const handleVote = (vote: "approve" | "reject") => {
    // TODO: Implement vote submission
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Image
            src="https://res.cloudinary.com/dko5sommz/image/upload/v1745950544/novaworld-logo-generated_gqmjwf.png"
            alt="NovaWorld Logo"
            width={200}
            height={50}
            className="mx-auto h-12 w-auto"
          />
          <h1 className="mt-6 text-2xl font-bold">Conseil de Sécurité</h1>
          <p className="mt-2 text-gray-600">
            Gestion des signalements et maintien de l'ordre
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des signalements */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Signalements en cours</h2>
            {reports.map((report) => (
              <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">Signalement #{report.id}</h3>
                        <Badge variant={report.status === "pending" ? "secondary" : report.status === "approved" ? "success" : "destructive"}>
                          {report.status === "pending" ? "En cours" : report.status === "approved" ? "Approuvé" : "Rejeté"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Signalé par {report.reporter.name} ({report.reporter.role} @ {report.reporter.company})
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedReport(report)
                        setShowDetails(!showDetails)
                      }}
                    >
                      {showDetails && selectedReport?.id === report.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {showDetails && selectedReport?.id === report.id && (
                    <div className="mt-4 space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Utilisateur signalé</h4>
                        <p>{report.reportedUser.name}</p>
                        <p className="text-sm text-gray-600">
                          {report.reportedUser.role} @ {report.reportedUser.company}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Raison</h4>
                        <p>{report.reason}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-gray-600">{report.description}</p>
                      </div>

                      {report.evidence.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Preuves</h4>
                          <div className="space-y-2">
                            {report.evidence.map((file, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <FileText className="h-4 w-4 text-gray-400" />
                                <span>{file}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end space-x-4">
                        <Button
                          variant="outline"
                          onClick={() => handleVote("reject")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Rejeter
                        </Button>
                        <Button
                          onClick={() => handleVote("approve")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Approuver
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Membres du conseil */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Membres du conseil</h2>
            <div className="space-y-4">
              {councilMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{member.name}</h3>
                          {member.isVerified && (
                            <Badge variant="secondary">Vérifié</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {member.role} @ {member.company}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Niveau: {member.level}
                        </p>
                      </div>
                      {member.vote && (
                        <div className="flex items-center">
                          {member.vote === "approve" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : member.vote === "reject" ? (
                            <XCircle className="h-5 w-5 text-red-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 