"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Users,
  Plus,
  Edit,
  Bot,
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  CreditCard,
  Bed,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Tv,
  Bath,
  AirVent,
  X,
  Save,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"

interface Room {
  id: string
  number: string
  type: string
  capacity: number
  floor: number
  amenities: string[]
  basePrice: number
  status: "available" | "maintenance" | "cleaning" | "blocked"
}

interface Reservation {
  id: string
  roomId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  guests: number
  totalAmount: number
  paidAmount: number
  status: "confirmed" | "pending" | "checkedin" | "checkedout" | "cancelled" | "noshow"
  source: string
  specialRequests: string
  createdBy: string
  createdAt: string
  aiRiskScore: number
  fraudAlerts: string[]
  loyaltyLevel: string
  companyName?: string
}

interface CalendarDay {
  date: string
  dayName: string
  dayNumber: number
  isToday: boolean
  isWeekend: boolean
}

interface UserPermissions {
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canViewFinancials: boolean
  canManageRates: boolean
  level: "admin" | "manager" | "receptionist" | "housekeeping"
}

interface ReservationCalendarProps {
  userPermissions: UserPermissions
  userName: string
  companyName: string
}

export function ReservationCalendar({ userPermissions, userName, companyName }: ReservationCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<{ start: string; end: string; roomId: string } | null>(null)
  const [draggedReservation, setDraggedReservation] = useState<string | null>(null)
  const [showNewReservationModal, setShowNewReservationModal] = useState(false)
  const [showReservationDetails, setShowReservationDetails] = useState<string | null>(null)
  const [aiAlerts, setAiAlerts] = useState<any[]>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionStart, setSelectionStart] = useState<{ roomId: string; date: string } | null>(null)
  const [hoveredCell, setHoveredCell] = useState<{ roomId: string; date: string } | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Données de démonstration
  const rooms: Room[] = [
    {
      id: "R101",
      number: "101",
      type: "Standard",
      capacity: 2,
      floor: 1,
      amenities: ["wifi", "tv", "ac", "bathroom"],
      basePrice: 45000,
      status: "available",
    },
    {
      id: "R102",
      number: "102",
      type: "Standard",
      capacity: 2,
      floor: 1,
      amenities: ["wifi", "tv", "ac", "bathroom"],
      basePrice: 45000,
      status: "available",
    },
    {
      id: "R201",
      number: "201",
      type: "Deluxe",
      capacity: 3,
      floor: 2,
      amenities: ["wifi", "tv", "ac", "bathroom", "minibar"],
      basePrice: 65000,
      status: "available",
    },
    {
      id: "R202",
      number: "202",
      type: "Deluxe",
      capacity: 3,
      floor: 2,
      amenities: ["wifi", "tv", "ac", "bathroom", "minibar"],
      basePrice: 65000,
      status: "cleaning",
    },
    {
      id: "R301",
      number: "301",
      type: "Suite",
      capacity: 4,
      floor: 3,
      amenities: ["wifi", "tv", "ac", "bathroom", "minibar", "balcony"],
      basePrice: 95000,
      status: "available",
    },
    {
      id: "R302",
      number: "302",
      type: "Suite",
      capacity: 4,
      floor: 3,
      amenities: ["wifi", "tv", "ac", "bathroom", "minibar", "balcony"],
      basePrice: 95000,
      status: "maintenance",
    },
  ]

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "RES001",
      roomId: "R101",
      guestName: "Marie Kouam",
      guestEmail: "marie.kouam@email.cm",
      guestPhone: "+237 677 123 456",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      guests: 2,
      totalAmount: 135000,
      paidAmount: 67500,
      status: "confirmed",
      source: "Direct",
      specialRequests: "Chambre non-fumeur, lit king size",
      createdBy: "Jean Mbarga",
      createdAt: "2024-01-10T10:30:00",
      aiRiskScore: 15,
      fraudAlerts: [],
      loyaltyLevel: "Gold",
      companyName: companyName,
    },
    {
      id: "RES002",
      roomId: "R201",
      guestName: "Paul Essomba",
      guestEmail: "paul.essomba@email.cm",
      guestPhone: "+237 699 987 654",
      checkIn: "2024-01-16",
      checkOut: "2024-01-19",
      guests: 1,
      totalAmount: 195000,
      paidAmount: 0,
      status: "pending",
      source: "Booking.com",
      specialRequests: "Arrivée tardive prévue",
      createdBy: "Marie Kouam",
      createdAt: "2024-01-12T14:15:00",
      aiRiskScore: 45,
      fraudAlerts: ["Paiement en attente depuis 48h"],
      loyaltyLevel: "Silver",
      companyName: companyName,
    },
    {
      id: "RES003",
      roomId: "R301",
      guestName: "Entreprise ABC SARL",
      guestEmail: "contact@abc-sarl.cm",
      guestPhone: "+237 655 456 789",
      checkIn: "2024-01-17",
      checkOut: "2024-01-20",
      guests: 3,
      totalAmount: 285000,
      paidAmount: 285000,
      status: "confirmed",
      source: "Corporate",
      specialRequests: "Facture entreprise, petit-déjeuner inclus",
      createdBy: "Samuel OBAM",
      createdAt: "2024-01-08T09:00:00",
      aiRiskScore: 5,
      fraudAlerts: [],
      loyaltyLevel: "Platinum",
      companyName: companyName,
    },
  ])

  // Générer les jours du calendrier (14 jours à partir d'aujourd'hui)
  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = []
    const today = new Date()

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      days.push({
        date: date.toISOString().split("T")[0],
        dayName: date.toLocaleDateString("fr-FR", { weekday: "short" }),
        dayNumber: date.getDate(),
        isToday: i === 0,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
      })
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  // Vérifier si une chambre est occupée à une date donnée
  const isRoomOccupied = (roomId: string, date: string): Reservation | null => {
    return (
      reservations.find(
        (res) =>
          res.roomId === roomId &&
          res.status !== "cancelled" &&
          res.status !== "noshow" &&
          date >= res.checkIn &&
          date < res.checkOut,
      ) || null
    )
  }

  // Obtenir la couleur de la cellule selon le statut
  const getCellColor = (roomId: string, date: string) => {
    const room = rooms.find((r) => r.id === roomId)
    const reservation = isRoomOccupied(roomId, date)

    if (room?.status === "maintenance") return "bg-red-200 border-red-300"
    if (room?.status === "cleaning") return "bg-yellow-200 border-yellow-300"
    if (room?.status === "blocked") return "bg-gray-200 border-gray-300"

    if (reservation) {
      switch (reservation.status) {
        case "confirmed":
          return "bg-green-200 border-green-300 hover:bg-green-300"
        case "pending":
          return "bg-yellow-200 border-yellow-300 hover:bg-yellow-300"
        case "checkedin":
          return "bg-blue-200 border-blue-300 hover:bg-blue-300"
        case "checkedout":
          return "bg-gray-200 border-gray-300"
        default:
          return "bg-gray-200 border-gray-300"
      }
    }

    return "bg-white border-gray-200 hover:bg-blue-50"
  }

  // Gestion de la sélection de dates
  const handleCellMouseDown = (roomId: string, date: string) => {
    if (!userPermissions.canCreate) return

    const room = rooms.find((r) => r.id === roomId)
    if (room?.status !== "available") return

    const reservation = isRoomOccupied(roomId, date)
    if (reservation) {
      setShowReservationDetails(reservation.id)
      return
    }

    setIsSelecting(true)
    setSelectionStart({ roomId, date })
    setSelectedDates({ start: date, end: date, roomId })
  }

  const handleCellMouseEnter = (roomId: string, date: string) => {
    setHoveredCell({ roomId, date })

    if (isSelecting && selectionStart && roomId === selectionStart.roomId) {
      const startDate = selectionStart.date
      const endDate = date >= startDate ? date : startDate
      const actualStartDate = date >= startDate ? startDate : date

      setSelectedDates({
        start: actualStartDate,
        end: endDate,
        roomId,
      })
    }
  }

  const handleCellMouseUp = () => {
    if (isSelecting && selectedDates) {
      setIsSelecting(false)
      setShowNewReservationModal(true)
    }
  }

  // Gestion du drag & drop
  const handleReservationDragStart = (reservationId: string) => {
    if (!userPermissions.canEdit) return
    setDraggedReservation(reservationId)
  }

  const handleCellDrop = (roomId: string, date: string) => {
    if (!draggedReservation || !userPermissions.canEdit) return

    const reservation = reservations.find((r) => r.id === draggedReservation)
    if (!reservation) return

    // Calculer la durée du séjour
    const checkInDate = new Date(reservation.checkIn)
    const checkOutDate = new Date(reservation.checkOut)
    const duration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))

    // Nouvelle date de fin
    const newCheckOut = new Date(date)
    newCheckOut.setDate(newCheckOut.getDate() + duration)

    // Mettre à jour la réservation
    setReservations((prev) =>
      prev.map((res) =>
        res.id === draggedReservation
          ? {
              ...res,
              roomId,
              checkIn: date,
              checkOut: newCheckOut.toISOString().split("T")[0],
            }
          : res,
      ),
    )

    setDraggedReservation(null)

    // Ajouter une alerte IA
    setAiAlerts((prev) => [
      {
        id: Date.now(),
        type: "info",
        message: `Réservation ${reservation.guestName} déplacée par ${userName} - Vérification automatique effectuée`,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 4),
    ])
  }

  // Simuler les alertes IA
  useEffect(() => {
    const interval = setInterval(() => {
      const alerts = [
        "Réservation suspecte détectée - Même email pour 3 réservations",
        "Client VIP Marie Kouam - Check-in dans 2h",
        "Chambre 202 - Nettoyage terminé, disponible",
        "Alerte tarif - Concurrent 20% moins cher ce weekend",
        "No-show probable - Client Paul Essomba (historique 60%)",
        "Overbooking détecté - 2 réservations pour chambre 301",
      ]

      const newAlert = {
        id: Date.now(),
        type: Math.random() > 0.7 ? "warning" : "info",
        message: alerts[Math.floor(Math.random() * alerts.length)],
        timestamp: new Date().toLocaleTimeString(),
      }

      setAiAlerts((prev) => [newAlert, ...prev.slice(0, 4)])
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { color: "bg-green-100 text-green-800", label: "Confirmé" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "En attente" },
      checkedin: { color: "bg-blue-100 text-blue-800", label: "Arrivé" },
      checkedout: { color: "bg-gray-100 text-gray-800", label: "Parti" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Annulé" },
      noshow: { color: "bg-red-100 text-red-800", label: "No-show" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getRoomStatusIcon = (status: string) => {
    switch (status) {
      case "maintenance":
        return <AlertTriangle className="h-3 w-3 text-red-500" />
      case "cleaning":
        return <RefreshCw className="h-3 w-3 text-yellow-500" />
      case "blocked":
        return <X className="h-3 w-3 text-gray-500" />
      default:
        return <CheckCircle className="h-3 w-3 text-green-500" />
    }
  }

  const getAmenityIcon = (amenity: string) => {
    const icons = {
      wifi: <Wifi className="h-3 w-3" />,
      tv: <Tv className="h-3 w-3" />,
      ac: <AirVent className="h-3 w-3" />,
      bathroom: <Bath className="h-3 w-3" />,
      minibar: <Coffee className="h-3 w-3" />,
      balcony: <MapPin className="h-3 w-3" />,
      parking: <Car className="h-3 w-3" />,
      restaurant: <Utensils className="h-3 w-3" />,
    }
    return icons[amenity as keyof typeof icons] || null
  }

  const filteredReservations = reservations.filter((res) => {
    const matchesStatus = filterStatus === "all" || res.status === filterStatus
    const matchesSearch =
      searchTerm === "" ||
      res.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.roomId.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header avec alertes IA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Calendrier des Réservations</h2>
          <p className="text-muted-foreground">
            Gestion interactive avec IA - {companyName} - Utilisateur: {userName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          {userPermissions.canCreate && (
            <Dialog open={showNewReservationModal} onOpenChange={setShowNewReservationModal}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle Réservation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nouvelle Réservation - {companyName}</DialogTitle>
                </DialogHeader>
                <NewReservationForm
                  selectedDates={selectedDates}
                  rooms={rooms}
                  onSave={(reservation) => {
                    setReservations((prev) => [...prev, { ...reservation, companyName }])
                    setShowNewReservationModal(false)
                    setSelectedDates(null)
                  }}
                  onCancel={() => {
                    setShowNewReservationModal(false)
                    setSelectedDates(null)
                  }}
                  userPermissions={userPermissions}
                  userName={userName}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Alertes IA */}
      {aiAlerts.length > 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <Bot className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                <strong>IA NovaCore:</strong> {aiAlerts[0].message}
              </span>
              <Badge variant="outline" className="text-xs">
                {aiAlerts[0].timestamp}
              </Badge>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Filtres et recherche */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par nom, email ou chambre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="confirmed">Confirmé</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="checkedin">Arrivé</SelectItem>
            <SelectItem value="checkedout">Parti</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendrier principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Plan d'occupation - Tape Chart
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* En-tête du calendrier */}
              <div className="grid grid-cols-[200px_repeat(14,1fr)] border-b">
                <div className="p-4 bg-gray-50 font-medium border-r">Chambres</div>
                {calendarDays.map((day) => (
                  <div
                    key={day.date}
                    className={`p-2 text-center border-r bg-gray-50 ${day.isToday ? "bg-blue-100" : ""} ${
                      day.isWeekend ? "bg-orange-50" : ""
                    }`}
                  >
                    <div className="text-xs text-muted-foreground">{day.dayName}</div>
                    <div className="font-medium">{day.dayNumber}</div>
                  </div>
                ))}
              </div>

              {/* Lignes des chambres */}
              {rooms.map((room) => (
                <div key={room.id} className="grid grid-cols-[200px_repeat(14,1fr)] border-b hover:bg-gray-50">
                  {/* Info chambre */}
                  <div className="p-4 border-r">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Chambre {room.number}</div>
                      {getRoomStatusIcon(room.status)}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">{room.type}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {room.capacity} pers. - Étage {room.floor}
                    </div>
                    {userPermissions.canViewFinancials && (
                      <div className="text-xs font-medium text-green-600">
                        {room.basePrice.toLocaleString()} FCFA/nuit
                      </div>
                    )}
                    <div className="flex gap-1 mt-2">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <div key={amenity} className="text-gray-400">
                          {getAmenityIcon(amenity)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cellules du calendrier */}
                  {calendarDays.map((day) => {
                    const reservation = isRoomOccupied(room.id, day.date)
                    const isSelected =
                      selectedDates &&
                      selectedDates.roomId === room.id &&
                      day.date >= selectedDates.start &&
                      day.date <= selectedDates.end
                    const isHovered = hoveredCell?.roomId === room.id && hoveredCell?.date === day.date

                    return (
                      <div
                        key={`${room.id}-${day.date}`}
                        className={`
                          h-20 border-r border-gray-200 cursor-pointer relative
                          ${getCellColor(room.id, day.date)}
                          ${isSelected ? "ring-2 ring-blue-500" : ""}
                          ${isHovered ? "ring-1 ring-blue-300" : ""}
                        `}
                        onMouseDown={() => handleCellMouseDown(room.id, day.date)}
                        onMouseEnter={() => handleCellMouseEnter(room.id, day.date)}
                        onMouseUp={handleCellMouseUp}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleCellDrop(room.id, day.date)}
                      >
                        {reservation && (
                          <div
                            className="absolute inset-1 p-1 rounded text-xs overflow-hidden"
                            draggable={userPermissions.canEdit}
                            onDragStart={() => handleReservationDragStart(reservation.id)}
                          >
                            <div className="font-medium truncate">{reservation.guestName}</div>
                            <div className="text-xs opacity-75">{reservation.guests} pers.</div>
                            {reservation.aiRiskScore > 30 && (
                              <div className="absolute top-0 right-0">
                                <AlertTriangle className="h-3 w-3 text-red-500" />
                              </div>
                            )}
                            {reservation.loyaltyLevel === "Platinum" && (
                              <div className="absolute bottom-0 right-0">
                                <Star className="h-3 w-3 text-yellow-500" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Légende */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 border border-green-300 rounded"></div>
              <span>Confirmé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-200 border border-yellow-300 rounded"></div>
              <span>En attente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200 border border-blue-300 rounded"></div>
              <span>Arrivé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
              <span>Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span>Risque IA élevé</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Client VIP</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal détails réservation */}
      {showReservationDetails && (
        <ReservationDetailsModal
          reservationId={showReservationDetails}
          reservations={reservations}
          rooms={rooms}
          onClose={() => setShowReservationDetails(null)}
          onUpdate={(updatedReservation) => {
            setReservations((prev) => prev.map((res) => (res.id === updatedReservation.id ? updatedReservation : res)))
            setShowReservationDetails(null)
          }}
          userPermissions={userPermissions}
          companyName={companyName}
        />
      )}
    </div>
  )
}

// Composant formulaire nouvelle réservation
function NewReservationForm({
  selectedDates,
  rooms,
  onSave,
  onCancel,
  userPermissions,
  userName,
}: {
  selectedDates: { start: string; end: string; roomId: string } | null
  rooms: Room[]
  onSave: (reservation: Reservation) => void
  onCancel: () => void
  userPermissions: UserPermissions
  userName: string
}) {
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: selectedDates?.start || "",
    checkOut: selectedDates?.end || "",
    roomId: selectedDates?.roomId || "",
    guests: 1,
    source: "Direct",
    specialRequests: "",
    totalAmount: 0,
    paidAmount: 0,
  })

  const selectedRoom = rooms.find((r) => r.id === formData.roomId)

  useEffect(() => {
    if (selectedRoom && formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn)
      const checkOut = new Date(formData.checkOut)
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      setFormData((prev) => ({ ...prev, totalAmount: nights * selectedRoom.basePrice }))
    }
  }, [formData.checkIn, formData.checkOut, formData.roomId, selectedRoom])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newReservation: Reservation = {
      id: `RES${Date.now()}`,
      ...formData,
      status: "confirmed",
      createdBy: userName,
      createdAt: new Date().toISOString(),
      aiRiskScore: Math.floor(Math.random() * 30), // Simulation score IA
      fraudAlerts: [],
      loyaltyLevel: "Bronze",
    }

    onSave(newReservation)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="guestName">Nom du client *</Label>
          <Input
            id="guestName"
            value={formData.guestName}
            onChange={(e) => setFormData((prev) => ({ ...prev, guestName: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="guestEmail">Email</Label>
          <Input
            id="guestEmail"
            type="email"
            value={formData.guestEmail}
            onChange={(e) => setFormData((prev) => ({ ...prev, guestEmail: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="guestPhone">Téléphone</Label>
          <Input
            id="guestPhone"
            value={formData.guestPhone}
            onChange={(e) => setFormData((prev) => ({ ...prev, guestPhone: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="guests">Nombre de personnes</Label>
          <Select
            value={formData.guests.toString()}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, guests: Number.parseInt(value) }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} personne{num > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="checkIn">Arrivée</Label>
          <Input
            id="checkIn"
            type="date"
            value={formData.checkIn}
            onChange={(e) => setFormData((prev) => ({ ...prev, checkIn: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="checkOut">Départ</Label>
          <Input
            id="checkOut"
            type="date"
            value={formData.checkOut}
            onChange={(e) => setFormData((prev) => ({ ...prev, checkOut: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="roomId">Chambre</Label>
          <Select
            value={formData.roomId}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, roomId: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {rooms
                .filter((room) => room.status === "available")
                .map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    Chambre {room.number} - {room.type} ({room.capacity} pers.)
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="source">Source de réservation</Label>
          <Select
            value={formData.source}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, source: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Direct">Direct</SelectItem>
              <SelectItem value="Booking.com">Booking.com</SelectItem>
              <SelectItem value="Expedia">Expedia</SelectItem>
              <SelectItem value="Agoda">Agoda</SelectItem>
              <SelectItem value="Corporate">Entreprise</SelectItem>
              <SelectItem value="Phone">Téléphone</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {userPermissions.canViewFinancials && (
          <div>
            <Label htmlFor="totalAmount">Montant total</Label>
            <Input
              id="totalAmount"
              type="number"
              value={formData.totalAmount}
              onChange={(e) => setFormData((prev) => ({ ...prev, totalAmount: Number.parseInt(e.target.value) }))}
              readOnly={!userPermissions.canManageRates}
            />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="specialRequests">Demandes spéciales</Label>
        <Textarea
          id="specialRequests"
          value={formData.specialRequests}
          onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
          rows={3}
        />
      </div>

      {selectedRoom && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Détails de la chambre sélectionnée</h4>
          <div className="text-sm text-muted-foreground">
            <p>
              Chambre {selectedRoom.number} - {selectedRoom.type}
            </p>
            <p>
              Capacité: {selectedRoom.capacity} personnes - Étage {selectedRoom.floor}
            </p>
            {userPermissions.canViewFinancials && (
              <p>Tarif de base: {selectedRoom.basePrice.toLocaleString()} FCFA/nuit</p>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Créer la réservation
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  )
}

// Composant modal détails réservation
function ReservationDetailsModal({
  reservationId,
  reservations,
  rooms,
  onClose,
  onUpdate,
  userPermissions,
  companyName,
}: {
  reservationId: string
  reservations: Reservation[]
  rooms: Room[]
  onClose: () => void
  onUpdate: (reservation: Reservation) => void
  userPermissions: UserPermissions
  companyName: string
}) {
  const reservation = reservations.find((r) => r.id === reservationId)
  const room = rooms.find((r) => r.id === reservation?.roomId)

  if (!reservation || !room) return null

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: "text-green-600",
      pending: "text-yellow-600",
      checkedin: "text-blue-600",
      checkedout: "text-gray-600",
      cancelled: "text-red-600",
      noshow: "text-red-600",
    }
    return colors[status as keyof typeof colors] || "text-gray-600"
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-green-600"
    if (score < 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Détails de la réservation - {companyName}</span>
            <Badge className={getStatusColor(reservation.status)}>
              {reservation.status === "confirmed" && "Confirmé"}
              {reservation.status === "pending" && "En attente"}
              {reservation.status === "checkedin" && "Arrivé"}
              {reservation.status === "checkedout" && "Parti"}
              {reservation.status === "cancelled" && "Annulé"}
              {reservation.status === "noshow" && "No-show"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations client */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Informations Client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Nom complet</Label>
                  <p className="text-lg font-semibold">{reservation.guestName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Niveau de fidélité</Label>
                  <Badge variant="outline">{reservation.loyaltyLevel}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {reservation.guestEmail}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Téléphone</Label>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {reservation.guestPhone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Détails du séjour */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                Détails du Séjour
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Chambre</Label>
                  <p className="text-lg font-semibold">
                    {room.number} - {room.type}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Étage {room.floor} - {room.capacity} personnes max
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Arrivée</Label>
                  <p className="text-lg font-semibold">{new Date(reservation.checkIn).toLocaleDateString("fr-FR")}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Départ</Label>
                  <p className="text-lg font-semibold">{new Date(reservation.checkOut).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Nombre de personnes</Label>
                  <p className="text-lg font-semibold">{reservation.guests}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Source de réservation</Label>
                  <p className="text-lg font-semibold">{reservation.source}</p>
                </div>
              </div>
              {reservation.specialRequests && (
                <div>
                  <Label className="text-sm font-medium">Demandes spéciales</Label>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{reservation.specialRequests}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informations financières */}
          {userPermissions.canViewFinancials && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Informations Financières
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Montant total</Label>
                    <p className="text-lg font-semibold text-green-600">
                      {reservation.totalAmount.toLocaleString()} FCFA
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Montant payé</Label>
                    <p className="text-lg font-semibold text-blue-600">
                      {reservation.paidAmount.toLocaleString()} FCFA
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Solde restant</Label>
                    <p className="text-lg font-semibold text-orange-600">
                      {(reservation.totalAmount - reservation.paidAmount).toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analyse IA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Analyse IA NovaCore
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Score de risque</Label>
                  <p className={`text-lg font-semibold ${getRiskColor(reservation.aiRiskScore)}`}>
                    {reservation.aiRiskScore}%{" "}
                    {reservation.aiRiskScore < 30 ? "(Faible)" : reservation.aiRiskScore < 60 ? "(Moyen)" : "(Élevé)"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Créé par</Label>
                  <p className="text-lg font-semibold">{reservation.createdBy}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(reservation.createdAt).toLocaleDateString("fr-FR")} à{" "}
                    {new Date(reservation.createdAt).toLocaleTimeString("fr-FR")}
                  </p>
                </div>
              </div>
              {reservation.fraudAlerts.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-red-600">Alertes de fraude</Label>
                  <div className="space-y-2">
                    {reservation.fraudAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                        <AlertTriangle className="h-4 w-4" />
                        {alert}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            {userPermissions.canEdit && (
              <>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </>
            )}
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
            <Button onClick={onClose}>Fermer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
