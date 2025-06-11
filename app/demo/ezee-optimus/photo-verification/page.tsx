"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PhotoVerificationSystem } from "@/components/photo-verification-system"
import { ArrowLeft, Camera, Shield, Users, Zap } from "lucide-react"
import Link from "next/link"

interface UserRole {
  id: string
  name: string
  level: "admin" | "manager" | "receptionist" | "housekeeping"
}

interface UserType {
  id: string
  name: string
  email: string
  role: UserRole
  isOnline: boolean
}

export default function PhotoVerificationPage() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [showRoleSelector, setShowRoleSelector] = useState(true)

  const companyName = "Hôtel Le Meridien Yaoundé"

  const roles: UserRole[] = [
    {
      id: "admin",
      name: "Directeur Général",
      level: "admin",
    },
    {
      id: "manager",
      name: "Manager Hôtel",
      level: "manager",
    },
    {
      id: "receptionist",
      name: "Réceptionniste",
      level: "receptionist",
    },
    {
      id: "housekeeping",
      name: "Gouvernante",
      level: "housekeeping",
    },
  ]

  const demoUsers: UserType[] = [
    {
      id: "1",
      name: "Samuel OBAM",
      email: "sobam@meridien-yaounde.cm",
      role: roles[0],
      isOnline: true,
    },
    {
      id: "2",
      name: "Marie Kouam",
      email: "marie.kouam@meridien-yaounde.cm",
      role: roles[1],
      isOnline: true,
    },
    {
      id: "3",
      name: "Jean Mbarga",
      email: "jean.mbarga@meridien-yaounde.cm",
      role: roles[2],
      isOnline: true,
    },
    {
      id: "4",
      name: "Grace Biya",
      email: "grace.biya@meridien-yaounde.cm",
      role: roles[3],
      isOnline: true,
    },
  ]

  const switchUser = (userId: string) => {
    const user = demoUsers.find((u) => u.id === userId)
    if (user) {
      setCurrentUser(user)
      setShowRoleSelector(false)
    }
  }

  const getRoleColor = (level: string) => {
    switch (level) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "manager":
        return "bg-purple-100 text-purple-800"
      case "receptionist":
        return "bg-blue-100 text-blue-800"
      case "housekeeping":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Écran de sélection de rôle
  if (showRoleSelector || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Système de Vérification Photo</CardTitle>
                <p className="text-muted-foreground">{companyName}</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Sélectionnez votre profil utilisateur</h2>
            <p className="text-muted-foreground">
              Système de vérification d'identité obligatoire pour toutes les réservations via plateformes partenaires
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoUsers.map((user) => (
                <Card
                  key={user.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-200"
                  onClick={() => switchUser(user.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                        {user.role.level === "receptionist" && <Users className="h-5 w-5 text-white" />}
                        {user.role.level === "housekeeping" && <Shield className="h-5 w-5 text-white" />}
                        {(user.role.level === "admin" || user.role.level === "manager") && (
                          <Camera className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-300"}`}></div>
                    </div>

                    <Badge className={`${getRoleColor(user.role.level)} mb-3`}>{user.role.name}</Badge>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Accès autorisé:</p>
                      <div className="flex flex-wrap gap-1">
                        {user.role.level === "admin" && (
                          <>
                            <Badge variant="outline" className="text-xs">
                              Toutes fonctions
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Supervision
                            </Badge>
                          </>
                        )}
                        {user.role.level === "manager" && (
                          <>
                            <Badge variant="outline" className="text-xs">
                              Vérification
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Check-in/out
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Clés
                            </Badge>
                          </>
                        )}
                        {user.role.level === "receptionist" && (
                          <>
                            <Badge variant="outline" className="text-xs">
                              Vérification
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Check-in/out
                            </Badge>
                          </>
                        )}
                        {user.role.level === "housekeeping" && (
                          <Badge variant="outline" className="text-xs">
                            Consultation
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/demo/ezee-optimus">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour au CRM
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Système de Vérification Photo</h1>
                  <p className="text-sm text-muted-foreground">{companyName}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Profil utilisateur */}
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  {currentUser.role.level === "receptionist" && <Users className="h-4 w-4 text-white" />}
                  {currentUser.role.level === "housekeeping" && <Shield className="h-4 w-4 text-white" />}
                  {(currentUser.role.level === "admin" || currentUser.role.level === "manager") && (
                    <Camera className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <Badge className={`${getRoleColor(currentUser.role.level)} text-xs`}>{currentUser.role.name}</Badge>
                </div>
                <Button size="sm" variant="outline" onClick={() => setShowRoleSelector(true)}>
                  Changer
                </Button>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">IA Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <PhotoVerificationSystem
          userLevel={currentUser.role.level}
          userName={currentUser.name}
          hotelName={companyName}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">NovaCore Photo Verification</h3>
                <p className="text-sm text-gray-400">Powered by AI</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 mb-1">Made by Samuel OBAM</p>
              <p className="text-sm text-gray-400 mb-1">CEO of DL Solutions</p>
              <p className="text-sm text-gray-400 mb-1">+237 694 341 586</p>
              <p className="text-sm text-gray-400 mb-1">Rue École de Police, Yaoundé</p>
              <p className="text-sm text-gray-400">sobam@daveandlucesolutions.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © 2024 NovaCore Photo Verification. Tous droits réservés. Développé par DL Solutions SARL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
