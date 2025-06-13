"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Search,
  Filter,
  MessageSquare,
  UserPlus,
  Check,
  X,
  Building2,
} from "lucide-react"

interface Connection {
  id: string
  name: string
  role: string
  company: string
  location: string
  mutualConnections: number
  status: "pending" | "connected" | "suggested"
  avatar?: string
}

export default function NetworkPage() {
  const [connections] = useState<Connection[]>([
    {
      id: "1",
      name: "Marie Smith",
      role: "Directrice Marketing",
      company: "Tech Solutions",
      location: "Abidjan, Côte d'Ivoire",
      mutualConnections: 12,
      status: "connected",
      avatar: "MS"
    },
    {
      id: "2",
      name: "John Doe",
      role: "CEO",
      company: "Innovation Labs",
      location: "Dakar, Sénégal",
      mutualConnections: 8,
      status: "pending",
      avatar: "JD"
    },
    {
      id: "3",
      name: "Sarah Johnson",
      role: "Directrice RH",
      company: "Global Services",
      location: "Lagos, Nigeria",
      mutualConnections: 15,
      status: "suggested",
      avatar: "SJ"
    }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Mon Réseau</h1>
            <p className="text-gray-600">Gérez vos connexions professionnelles</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des connexions..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Connexions</p>
                  <p className="text-2xl font-bold">245</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <UserPlus className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Demandes en attente</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Entreprises suivies</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <Card key={connection.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">{connection.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{connection.name}</h3>
                    <p className="text-sm text-gray-600">{connection.role} @ {connection.company}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">{connection.location}</p>
                  <p className="text-sm text-gray-600">{connection.mutualConnections} connexions en commun</p>
                </div>
                <div className="flex gap-2">
                  {connection.status === "connected" && (
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  )}
                  {connection.status === "pending" && (
                    <>
                      <Button className="flex-1">
                        <Check className="h-4 w-4 mr-2" />
                        Accepter
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <X className="h-4 w-4 mr-2" />
                        Refuser
                      </Button>
                    </>
                  )}
                  {connection.status === "suggested" && (
                    <Button className="flex-1">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connecter
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 