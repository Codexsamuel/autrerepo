"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Users, UserCheck, DollarSign, BarChart3, Package, Bot, Mic, MicOff, MessageCircle, MapPin, Plane, Bus, Car, Utensils, Shirt, Dumbbell, MessageSquare, Navigation, Star, TrendingUp, Calendar, Clock, Phone, Mail, Camera, Video, Settings, Bell, Search, Filter, Plus, Edit, Trash2, Eye, Download, Share, Heart, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle, X, ChevronDown, ChevronRight, ArrowRight, ArrowLeft, Home, Building, Bed, Wifi, Coffee, ConciergeBell, Mountain, Globe, Map, Compass, CreditCard, Receipt, Wallet, TrendingDown, Activity, PieChart, BarChart, LineChart, Target, Briefcase, Crown, Send, FileText, Volume2, VolumeX } from "lucide-react"

interface VoiceCommand {
  command: string
  response: string
  action?: () => void
}

interface ClientProfile {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  whatsapp: string
  profilePhoto: string
  nationality: string
  passport: string
  dateOfBirth: string
  loyaltyLevel: string
  loyaltyPoints: number
  vipStatus: boolean
  totalStays: number
  totalSpent: number
  averageRating: number
  lastStay: string
  preferences: string[]
  allergies: string[]
  specialRequests: string[]
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  company?: {
    name: string
    position: string
    corporateRate: boolean
  }
  currentLocation: {
    lat: number
    lng: number
    address: string
    timestamp: string
    ipAddress: string
    device: string
  }
  flightInfo: {
    airline: string
    flightNumber: string
    departure: {
      airport: string
      city: string
      time: string
      actualTime: string
    }
    arrival: {
      airport: string
      city: string
      time: string
      estimatedTime: string
      gate: string
      terminal: string
    }
    status: string
    seatNumber: string
    class: string
  }
  transportInfo: {
    airportTransfer: boolean
    transferType: "hotel_shuttle" | "taxi" | "private_car" | "public_transport" | "rental_car"
    pickupTime: string
    driverName?: string
    vehicleInfo?: string
    dlTravelBooking?: {
      bookingId: string
      packageType: string
      totalAmount: number
      services: string[]
    }
  }
}

interface GroupBooking {
  id: string
  groupName: string
  groupType: "corporate" | "wedding" | "conference" | "tour" | "family" | "sports"
  leadContact: {
    name: string
    email: string
    phone: string
    position: string
  }
  totalGuests: number
  totalRooms: number
  checkIn: string
  checkOut: string
  totalAmount: number
  paidAmount: number
  status: "confirmed" | "pending" | "cancelled"
  specialRequests: string[]
  services: {
    catering: boolean
    audioVisual: boolean
    decoration: boolean
    transportation: boolean
    entertainment: boolean
  }
  roomBlocks: {
    roomType: string
    quantity: number
    rate: number
  }[]
  members: ClientProfile[]
}

interface HousekeepingTask {
  id: string
  roomNumber: string
  taskType: "cleaning" | "maintenance" | "inspection" | "setup" | "deep_clean"
  priority: "low" | "medium" | "high" | "urgent"
  assignedTo: string
  status: "pending" | "in_progress" | "completed" | "on_hold"
  estimatedTime: number
  actualTime?: number
  description: string
  checklistItems: {
    item: string
    completed: boolean
    notes?: string
  }[]
  photos?: string[]
  guestRequests?: string[]
  createdAt: string
  completedAt?: string
}

interface FinancialData {
  revenue: {
    daily: number
    weekly: number
    monthly: number
    yearly: number
  }
  occupancy: {
    current: number
    forecast: number[]
    historical: number[]
  }
  adr: {
    current: number
    target: number
    competitor: number
  }
  revpar: {
    current: number
    target: number
    lastYear: number
  }
  expenses: {
    operational: number
    maintenance: number
    marketing: number
    staff: number
  }
  profitMargin: number
  forecastAccuracy: number
}

interface InventoryItem {
  id: string
  name: string
  category: "linens" | "amenities" | "food" | "beverages" | "cleaning" | "maintenance" | "electronics"
  currentStock: number
  minimumStock: number
  maximumStock: number
  unit: string
  costPerUnit: number
  supplier: string
  lastRestocked: string
  expiryDate?: string
  location: string
  status: "in_stock" | "low_stock" | "out_of_stock" | "expired"
  autoReorder: boolean
  usageRate: number
}

interface AIAlert {
  id: string
  type: "security" | "revenue" | "operational" | "guest_satisfaction" | "maintenance" | "fraud"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  recommendation: string
  affectedArea: string
  timestamp: string
  status: "new" | "acknowledged" | "resolved"
  confidence: number
}

export function AdvancedHotelCRM() {
  const [activeSection, setActiveSection] = useState("clients")
  const [isListening, setIsListening] = useState(false)
  const [voiceCommand, setVoiceCommand] = useState("")
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null)
  const [showClientMap, setShowClientMap] = useState(false)
  const [showVoiceDialog, setShowVoiceDialog] = useState(false)
  const [currentVoiceStep, setCurrentVoiceStep] = useState(0)
  const [voiceReservationData, setVoiceReservationData] = useState<any>({})
  const recognitionRef = useRef<any>(null)

  // Données de démonstration
  const clientProfiles: ClientProfile[] = [
    {
      id: "CLIENT-001",
      firstName: "Marie",
      lastName: "Kouam Tchuente",
      fullName: "Marie Kouam Tchuente",
      email: "marie.kouam@dlsolutions.cm",
      phone: "+237 677 123 456",
      whatsapp: "+237 677 123 456",
      profilePhoto: "/placeholder.svg?height=100&width=100",
      nationality: "Camerounaise",
      passport: "CM1234567",
      dateOfBirth: "1985-03-15",
      loyaltyLevel: "Platinum",
      loyaltyPoints: 15420,
      vipStatus: true,
      totalStays: 24,
      totalSpent: 5800000,
      averageRating: 4.8,
      lastStay: "2024-01-15",
      preferences: ["Chambre non-fumeur", "Lit king size", "Vue ville", "Check-in tardif"],
      allergies: ["Fruits de mer", "Arachides"],
      specialRequests: ["Champagne de bienvenue", "Journaux français"],
      emergencyContact: {
        name: "Samuel OBAM",
        phone: "+237 694 341 586",
        relationship: "Conjoint",
      },
      company: {
        name: "DL Solutions SARL",
        position: "Directrice Marketing",
        corporateRate: true,
      },
      currentLocation: {
        lat: 3.848,
        lng: 11.5021,
        address: "Aéroport International Yaoundé Nsimalen",
        timestamp: "2024-01-22T14:30:00",
        ipAddress: "196.1.95.123",
        device: "Samsung Galaxy S24 Ultra",
      },
      flightInfo: {
        airline: "Air France",
        flightNumber: "AF 0785",
        departure: {
          airport: "Charles de Gaulle (CDG)",
          city: "Paris",
          time: "2024-01-22T10:30:00",
          actualTime: "2024-01-22T10:45:00",
        },
        arrival: {
          airport: "Yaoundé Nsimalen (NSI)",
          city: "Yaoundé",
          time: "2024-01-22T17:45:00",
          estimatedTime: "2024-01-22T18:10:00",
          gate: "A3",
          terminal: "International",
        },
        status: "En vol",
        seatNumber: "3A",
        class: "Business",
      },
      transportInfo: {
        airportTransfer: true,
        transferType: "hotel_shuttle",
        pickupTime: "2024-01-22T18:30:00",
        driverName: "Jean Mbarga",
        vehicleInfo: "Mercedes Sprinter - YDE 1234 CM",
        dlTravelBooking: {
          bookingId: "DLT-2024-0547",
          packageType: "Business Premium",
          totalAmount: 850000,
          services: ["Vol", "Hôtel", "Transfert", "Assurance"],
        },
      },
    },
    // Ajouter d'autres clients...
  ]

  const groupBookings: GroupBooking[] = [
    {
      id: "GROUP-001",
      groupName: "Conférence CEMAC 2024",
      groupType: "conference",
      leadContact: {
        name: "Dr. Paul Biya Essomba",
        email: "paul.biya@cemac.int",
        phone: "+237 699 987 654",
        position: "Coordinateur Général",
      },
      totalGuests: 45,
      totalRooms: 25,
      checkIn: "2024-02-15",
      checkOut: "2024-02-18",
      totalAmount: 12500000,
      paidAmount: 6250000,
      status: "confirmed",
      specialRequests: ["Salle de conférence", "Équipement audiovisuel", "Pause-café", "Dîner de gala"],
      services: {
        catering: true,
        audioVisual: true,
        decoration: false,
        transportation: true,
        entertainment: true,
      },
      roomBlocks: [
        { roomType: "Suite Executive", quantity: 5, rate: 150000 },
        { roomType: "Chambre Deluxe", quantity: 15, rate: 95000 },
        { roomType: "Chambre Standard", quantity: 5, rate: 65000 },
      ],
      members: clientProfiles.slice(0, 3),
    },
  ]

  const housekeepingTasks: HousekeepingTask[] = [
    {
      id: "TASK-001",
      roomNumber: "1205",
      taskType: "cleaning",
      priority: "high",
      assignedTo: "Grace Biya",
      status: "in_progress",
      estimatedTime: 45,
      actualTime: 30,
      description: "Nettoyage complet suite VIP - Arrivée client Platinum dans 2h",
      checklistItems: [
        { item: "Aspirer et nettoyer sols", completed: true },
        { item: "Changer draps et serviettes", completed: true },
        { item: "Nettoyer salle de bain", completed: false },
        { item: "Vérifier minibar", completed: false },
        { item: "Disposer champagne de bienvenue", completed: false },
      ],
      guestRequests: ["Champagne Dom Pérignon", "Journaux français", "Fleurs fraîches"],
      createdAt: "2024-01-22T12:00:00",
    },
  ]

  const financialData: FinancialData = {
    revenue: {
      daily: 2400000,
      weekly: 16800000,
      monthly: 72000000,
      yearly: 864000000,
    },
    occupancy: {
      current: 78.5,
      forecast: [82, 85, 79, 88, 92, 89, 86],
      historical: [75, 78, 82, 79, 85, 88, 84],
    },
    adr: {
      current: 85000,
      target: 90000,
      competitor: 82000,
    },
    revpar: {
      current: 66725,
      target: 72000,
      lastYear: 62500,
    },
    expenses: {
      operational: 18000000,
      maintenance: 4500000,
      marketing: 3600000,
      staff: 24000000,
    },
    profitMargin: 32.5,
    forecastAccuracy: 94.2,
  }

  const inventoryItems: InventoryItem[] = [{
      id: "INV-001",
      name: "Draps en coton égyptien",
      category: "linens",
      currentStock: 45,
      minimumStock: 20,
      maximumStock: 100,
      unit: "set",
      costPerUnit: 25000,
      supplier: "Textile Premium SARL",
      lastRestocked: "2024-01-15",
      location: "Entrepôt A - Étage 2",
      status: "in_stock",
      autoReorder: true,
      usageRate: 8.5,
    },
    {
      id: "INV-002",
      name: "Champagne Dom Pérignon",
      category: "beverages",
      currentStock: 3,
      minimumStock: 5,
      maximumStock: 20,
      unit: "bouteille",
      costPerUnit: 85000,
      supplier: "Vins & Spiritueux Elite",
      lastRestocked: "2024-01-10",
      location: "Cave à vin - Niveau -1",
      status: "low_stock",
      autoReorder: true,
      usageRate: 2.1,
    },]
  const aiAlerts: AIAlert[] = [{
      id: "AI-001",
      type: "revenue",
      severity: "medium",
      title: "Opportunité de surclassement détectée",
      description: "Client VIP Marie Kouam - Historique de surclassements acceptés (85%)",
      recommendation: "Proposer upgrade suite présidentielle (+50,000 FCFA)",
      affectedArea: "Réservation LM-YDE-2024-001547",
      timestamp: "2024-01-22T14:45:00",
      status: "new",
      confidence: 87,
    },
    {
      id: "AI-002",
      type: "operational",
      severity: "high",
      title: "Retard vol détecté",
      description: "Vol AF 0785 retardé de 25 minutes - Impact sur 3 réservations",
      recommendation: "Notifier clients et ajuster planning navette",
      affectedArea: "Arrivées du jour",
      timestamp: "2024-01-22T14:50:00",
      status: "new",
      confidence: 95,
    },]
  // Commandes vocales
  const voiceCommands: VoiceCommand[] = [{
      command: "nouvelle réservation",
      response: "Parfait ! Commençons une nouvelle réservation. Quel est le nom du client ?",
    },
    {
      command: "état des chambres",
      response: "Voici l'état actuel des chambres...",
    },
    {
      command: "client vip",
      response: "Recherche des clients VIP en cours...",
    },]
  // Initialiser la reconnaissance vocale
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "fr-FR"

      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase()
        setVoiceCommand(command)
        handleVoiceCommand(command)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false)
      recognitionRef.current.stop()
    }
  }

  const handleVoiceCommand = (command: string) => {
    if (command.includes("nouvelle réservation")) {
      setShowVoiceDialog(true)
      setCurrentVoiceStep(1)
      speak("Parfait ! Commençons une nouvelle réservation. Quel est le nom du client ?")
    } else if (command.includes("état des chambres")) {
      setActiveSection("rooms")
      speak("Affichage de l'état des chambres en cours")
    } else if (command.includes("client vip")) {
      setActiveSection("clients")
      speak("Affichage des clients VIP")
    }
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "fr-FR"
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  const sendWhatsAppMessage = (clientId: string, message: string) => {
    const client = clientProfiles.find((c) => c.id === clientId)
    if (client) {
      // Simulation d'envoi WhatsApp
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          clientId,
          message,
          timestamp: new Date().toISOString(),
          type: "outgoing",
        },
      ])
      console.log(`Message WhatsApp envoyé à ${client.whatsapp}: ${message}`)
    }
  }

  const trackClientLocation = (clientId: string) => {
    const client = clientProfiles.find((c) => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setShowClientMap(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header avec assistant vocal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                CRM Hôtellerie Avancé - NovaCore AI
              </CardTitle>
              <p className="text-muted-foreground">
                Gestion intelligente avec assistant vocal et intégrations complètes
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={isListening ? "destructive" : "default"}
                onClick={isListening ? stopListening : startListening}
                className="flex items-center gap-2"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {isListening ? "Arrêter" : "Assistant Vocal"}
              </Button>
              {isListening && (
                <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-red-700">Écoute en cours...</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation principale */}
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="clients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Clients & Groupes
          </TabsTrigger>
          <TabsTrigger value="housekeeping" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Gouvernance
          </TabsTrigger>
          <TabsTrigger value="finance" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Finance & Tarifs
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Rapports & Analytics
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventaire & Stock
          </TabsTrigger>
          <TabsTrigger value="ai-monitoring" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Surveillance IA
          </TabsTrigger>
        </TabsList>

        {/* Section Clients & Groupes */}
        <TabsContent value="clients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des clients */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Clients VIP & Groupes</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres
                  </Button>
                  <Button size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Nouveau Client
                  </Button>
                </div>
              </div>

              {/* Clients individuels */}
              <div className="space-y-4">
                {clientProfiles.map((client: any) => (
                  <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Image
                            src={client.profilePhoto || "/placeholder.svg"}
                            alt={client.fullName}
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-blue-500"
                          />
                          {client.vipStatus && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{client.fullName}</h4>
                            <Badge className="bg-purple-100 text-purple-800">client.loyaltyLevel</Badge>
                            {client.vipStatus && (
                              <Badge className="bg-gold-100 text-gold-800">
                                <Star className="w-3 h-3 mr-1" />
                                VIP
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div>📧 {client.email}</div>
                            <div>📱 {client.phone}</div>
                            <div>🏢 {client.company?.name}</div>
                            <div>
                              ⭐ {client.averageRating}/5 ({client.totalStays} séjours)
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            📍 {client.currentLocation.address} • {client.currentLocation.timestamp}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline" onClick={() => trackClientLocation(client.id)}>
                            <MapPin className="h-4 w-4 mr-1" />
                            Localiser
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => sendWhatsAppMessage(client.id, "Bonjour ! Comment puis-je vous aider ?")}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            WhatsApp
                          </Button>
                        </div>
                      </div>

                      {/* Informations de vol */}
                      {client.flightInfo && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Plane className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">
                              Vol {client.flightInfo.airline} {client.flightInfo.flightNumber}
                            </span>
                            <Badge className="bg-blue-100 text-blue-800">client.flightInfo.status</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Départ:</span> {client.flightInfo.departure.city}{" "}
                              {new Date(client.flightInfo.departure.actualTime).toLocaleTimeString("fr-FR")}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Arrivée:</span> {client.flightInfo.arrival.city}{" "}
                              {new Date(client.flightInfo.arrival.estimatedTime).toLocaleTimeString("fr-FR")}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Informations de transport */}
                      {client.transportInfo.airportTransfer && (
                        <div className="mt-2 p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Bus className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Transfert aéroport confirmé</span>
                          </div>
                          <div className="text-sm">
                            <div>
                              <span className="text-muted-foreground">Chauffeur:</span>{" "}
                              {client.transportInfo.driverName}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Véhicule:</span>{" "}
                              {client.transportInfo.vehicleInfo}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Heure de prise en charge:</span>{" "}
                              {new Date(client.transportInfo.pickupTime).toLocaleTimeString("fr-FR")}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Intégration DL Travel */}
                      {client.transportInfo.dlTravelBooking && (
                        <div className="mt-2 p-3 bg-orange-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="h-4 w-4 text-orange-600" />
                            <span className="font-medium text-orange-800">Package DL Travel</span>
                            <Badge variant="outline">client.transportInfo.dlTravelBooking.packageType</Badge>
                          </div>
                          <div className="text-sm">
                            <div>
                              <span className="text-muted-foreground">Réf:</span>{" "}
                              {client.transportInfo.dlTravelBooking.bookingId}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Services:</span>{" "}
                              {client.transportInfo.dlTravelBooking.services.join(", ")}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Groupes */}
              <div className="space-y-4">
                <h4 className="font-semibold">Réservations de Groupe</h4>
                {groupBookings.map((group: any) => (
                  <Card key={group.id} className="border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{group.groupName}</h4>
                          <p className="text-muted-foreground">
                            {group.leadContact.name} - {group.leadContact.position}
                          </p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">group.groupType</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Invités:</span> {group.totalGuests}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Chambres:</span> {group.totalRooms}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Montant:</span> {group.totalAmount.toLocaleString()}{" "}
                          FCFA
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.services.catering && <Badge variant="outline">Restauration</Badge>}
                        {group.services.audioVisual && <Badge variant="outline">Audiovisuel</Badge>}
                        {group.services.transportation && <Badge variant="outline">Transport</Badge>}
                        {group.services.entertainment && <Badge variant="outline">Animation</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Services supplémentaires */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5" />
                    Services Hôtel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Utensils className="h-4 w-4 mr-2" />
                    Room Service
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shirt className="h-4 w-4 mr-2" />
                    Blanchisserie
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Dumbbell className="h-4 w-4 mr-2" />
                    Salle de Sport
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Car className="h-4 w-4 mr-2" />
                    Conciergerie
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Centre d'Affaires
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Chat WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {chatMessages.map((msg: any) => (
                      <div key={msg.id} className="p-2 bg-green-50 rounded-lg">
                        <div className="text-sm font-medium">
                          {clientProfiles.find((c) => c.id === msg.clientId)?.fullName}
                        </div>
                        <div className="text-sm">{msg.message}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleTimeString("fr-FR")}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Input placeholder="Tapez votre message..." className="flex-1" />
                    <Button size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Section Gouvernance */}
        <TabsContent value="housekeeping" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Tâches de Gouvernance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {housekeepingTasks.map((task: any) => (
                    <div key={task.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Chambre {task.roomNumber}</h4>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                        <Badge
                          className={
                            task.priority === "urgent"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "high"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >task.priority</Badge>
                      </div>
                      <div className="space-y-2">
                        {task.checklistItems.map((item: any, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            {item.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <div className="h-4 w-4 border rounded"></div>
                            )}
                            <span className={item.completed ? "line-through text-muted-foreground" : ""}>
                              {item.item}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Assigné à: {task.assignedTo}</span>
                        <span className="text-muted-foreground">{task.actualTime || task.estimatedTime} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statut des Équipes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Grace Biya</div>
                      <div className="text-sm text-muted-foreground">Gouvernante - Étages 10-15</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Disponible</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-medium">Fatima Ngono</div>
                      <div className="text-sm text-muted-foreground">Gouvernante - Étages 5-9</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Occupée</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Jean Mbarga</div>
                      <div className="text-sm text-muted-foreground">Maintenance</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">En pause</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Section Finance & Tarifs */}
        <TabsContent value="finance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenus du jour</p>
                    <p className="text-2xl font-bold">{(financialData.revenue.daily / 1000000).toFixed(1)}M FCFA</p>
                    <p className="text-xs text-green-600">+12% vs hier</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">ADR Moyen</p>
                    <p className="text-2xl font-bold">{(financialData.adr.current / 1000).toFixed(0)}K FCFA</p>
                    <p className="text-xs text-blue-600">Objectif: {(financialData.adr.target / 1000).toFixed(0)}K</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">RevPAR</p>
                    <p className="text-2xl font-bold">{(financialData.revpar.current / 1000).toFixed(0)}K FCFA</p>
                    <p className="text-xs text-green-600">
                      +
                      {(
                        ((financialData.revpar.current - financialData.revpar.lastYear) /
                          financialData.revpar.lastYear) *
                        100
                      ).toFixed(1)}
                      % vs N-1
                    </p>
                  </div>
                  <BarChart className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Marge Bénéficiaire</p>
                    <p className="text-2xl font-bold">{financialData.profitMargin}%</p>
                    <p className="text-xs text-green-600">Excellent</p>
                  </div>
                  <PieChart className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Prévisions de Revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Semaine prochaine</span>
                    <span className="font-semibold">
                      {((financialData.revenue.weekly * 1.08) / 1000000).toFixed(1)}M FCFA
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mois prochain</span>
                    <span className="font-semibold">
                      {((financialData.revenue.monthly * 1.05) / 1000000).toFixed(1)}M FCFA
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Précision des prévisions</span>
                    <Badge className="bg-green-100 text-green-800">{financialData.forecastAccuracy}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyse Concurrentielle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Notre ADR</span>
                    <span className="font-semibold">{(financialData.adr.current / 1000).toFixed(0)}K FCFA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ADR Concurrent</span>
                    <span className="font-semibold">{(financialData.adr.competitor / 1000).toFixed(0)}K FCFA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avantage</span>
                    <Badge className="bg-green-100 text-green-800">
                      +
                      {(
                        ((financialData.adr.current - financialData.adr.competitor) / financialData.adr.competitor) *
                        100
                      ).toFixed(1)}
                      %
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Section Rapports & Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Tendances d'Occupation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {financialData.occupancy.forecast.map((rate, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>Jour +{index + 1}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${rate}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Objectifs du Mois
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Taux d'occupation</span>
                      <span className="text-sm font-medium">85% / 90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Revenus</span>
                      <span className="text-sm font-medium">68M / 75M FCFA</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "91%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Satisfaction Client</span>
                      <span className="text-sm font-medium">4.7 / 4.8</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Satisfaction Client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold">4.7/5</div>
                    <div className="text-sm text-muted-foreground">Note moyenne</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">5⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                      <span className="text-sm">68%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">4⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "22%" }}></div>
                      </div>
                      <span className="text-sm">22%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">3⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                      <span className="text-sm">8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rapports Personnalisés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Rapport Quotidien
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  Analyse Mensuelle
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Prévisions
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Analyse Clientèle
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section Inventaire & Stock */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Gestion des Stocks</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
              <Button size="sm">
                <Package className="h-4 w-4 mr-2" />
                Nouvel Article
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-muted-foreground">Articles en stock</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-muted-foreground">Stock faible</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-muted-foreground">Rupture de stock</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">8</div>
                <div className="text-sm text-muted-foreground">Commandes en cours</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Articles Critiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryItems.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.category} • {item.location} • {item.supplier}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">
                        {item.currentStock} {item.unit}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Min: {item.minimumStock} • Max: {item.maximumStock}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          item.status === "low_stock"
                            ? "bg-orange-100 text-orange-800"
                            : item.status === "out_of_stock"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {item.status === "low_stock" && "Stock faible"}
                        {item.status === "out_of_stock" && "Rupture"}
                        {item.status === "in_stock" && "En stock"}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.costPerUnit.toLocaleString()} FCFA/{item.unit}
                      </div>
                    </div>
                    <div className="ml-4">
                      <Button size="sm" variant="outline">
                        Commander
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section Surveillance IA */}
        <TabsContent value="ai-monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Alertes IA en Temps Réel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiAlerts.map((alert: any) => (
                    <div key={alert.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                        <Badge
                          className={
                            alert.severity === "critical"
                              ? "bg-red-100 text-red-800"
                              : alert.severity === "high"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >alert.severity</Badge>
                      </div>
                      <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                        <strong>Recommandation:</strong> {alert.recommendation}
                      </div>
                      <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                        <span>{alert.affectedArea}</span>
                        <span>Confiance: {alert.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métriques IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Précision des prévisions</span>
                    <Badge className="bg-green-100 text-green-800">94.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Détection de fraude</span>
                    <Badge className="bg-blue-100 text-blue-800">99.7%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Optimisation des prix</span>
                    <Badge className="bg-purple-100 text-purple-800">+12% revenus</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Satisfaction prédite</span>
                    <Badge className="bg-yellow-100 text-yellow-800">4.8/5</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de carte client */}
      <Dialog open={showClientMap} onOpenChange={setShowClientMap}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Localisation en Temps Réel - {selectedClient?.fullName}
            </DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Position actuelle</Label>
                  <p className="font-medium">{selectedClient.currentLocation.address}</p>
                  <p className="text-sm text-muted-foreground">
                    Lat: {selectedClient.currentLocation.lat}, Lng: {selectedClient.currentLocation.lng}
                  </p>
                </div>
                <div>
                  <Label>Dernière mise à jour</Label>
                  <p className="font-medium">
                    {new Date(selectedClient.currentLocation.timestamp).toLocaleString("fr-FR")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    IP: {selectedClient.currentLocation.ipAddress} • {selectedClient.currentLocation.device}
                  </p>
                </div>
              </div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-muted-foreground">Carte interactive - Position en temps réel</p>
                  <p className="text-sm text-muted-foreground">Intégration Google Maps / OpenStreetMap</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    sendWhatsAppMessage(selectedClient.id, "Nous avons vu que vous êtes arrivé ! Bienvenue !")
                  }
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Envoyer message d'accueil
                </Button>
                <Button variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  Itinéraire vers l'hôtel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog assistant vocal */}
      <Dialog open={showVoiceDialog} onOpenChange={setShowVoiceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Assistant Vocal - Nouvelle Réservation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {isListening ? (
                  <Volume2 className="h-8 w-8 text-blue-600 animate-pulse" />
                ) : (
                  <VolumeX className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <p className="font-medium">
                {currentVoiceStep === 1 && "Dites le nom du client"}
                {currentVoiceStep === 2 && "Combien de nuits ?"}
                {currentVoiceStep === 3 && "Combien de personnes ?"}
                {currentVoiceStep === 4 && "Type de chambre ?"}
              </p>
              {voiceCommand && <p className="text-sm text-muted-foreground mt-2">Vous avez dit: "{voiceCommand}"</p>}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={isListening ? stopListening : startListening}
                className="flex-1"
                variant={isListening ? "destructive" : "default"}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? "Arrêter" : "Parler"}
              </Button>
              <Button variant="outline" onClick={() => setShowVoiceDialog(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
