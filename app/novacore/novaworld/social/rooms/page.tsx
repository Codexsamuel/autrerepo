"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  MessageSquare,
  Building2,
  Globe,
  Shield,
  Sparkles,
  Lock,
  Star,
  FileText,
  Search,
  Plus,
  ChevronDown,
} from "lucide-react"

interface ChatRoom {
  id: string
  name: string
  type: "public" | "private" | "group"
  accessLevel: "all" | "verified" | "premium" | "executive"
  members: number
  description: string
  tags: string[]
  category: string
}

export default function RoomsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "Tous les salons" },
    { id: "executive", name: "Dirigeants" },
    { id: "finance", name: "Finance" },
    { id: "tech", name: "Technologie" },
    { id: "marketing", name: "Marketing" },
  ]

  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: "1",
      name: "DG & CEO",
      type: "private",
      accessLevel: "executive",
      members: 45,
      description: "Salon réservé aux Directeurs Généraux et CEO",
      tags: ["Dirigeants", "Stratégie"],
      category: "executive"
    },
    {
      id: "2",
      name: "RH & DAF",
      type: "private",
      accessLevel: "premium",
      members: 120,
      description: "Échanges entre professionnels RH et DAF",
      tags: ["Ressources Humaines", "Finance"],
      category: "finance"
    },
    {
      id: "3",
      name: "Innovation Tech",
      type: "public",
      accessLevel: "verified",
      members: 350,
      description: "Discussions sur l'innovation technologique",
      tags: ["Technologie", "Innovation"],
      category: "tech"
    },
    {
      id: "4",
      name: "Marketing Digital",
      type: "public",
      accessLevel: "verified",
      members: 280,
      description: "Partage d'expériences en marketing digital",
      tags: ["Marketing", "Digital"],
      category: "marketing"
    }
  ])

  const filteredRooms = chatRooms.filter(room => {
    const matchesCategory = selectedCategory === "all" || room.category === selectedCategory
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Salons de Chat</h1>
            <p className="text-gray-600">Rejoignez des discussions professionnelles</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Créer un salon
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un salon..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                  {room.type === "private" && (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{room.members} membres</span>
                  </div>
                  <Badge variant={room.accessLevel === "executive" ? "default" : "outline"}>
                    {room.accessLevel === "executive" ? "Dirigeants" :
                     room.accessLevel === "premium" ? "Premium" :
                     room.accessLevel === "verified" ? "Vérifié" : "Public"}
                  </Badge>
                </div>
                <div className="mt-4">
                  <Button className="w-full">
                    Rejoindre
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 