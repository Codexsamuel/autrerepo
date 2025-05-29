"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Plane,
  CreditCard,
  Smartphone,
  User,
  Phone,
  Mail,
  AlertTriangle,
  Navigation,
  Car,
  Star,
  Edit,
  Download,
  Share2,
  Bell,
  Bot,
  MessageSquare,
  Bed,
  X,
  Calendar,
  ArrowUp,
  ArrowDown,
  Heart,
  Send,
  Gift,
  Cake,
  MessageCircle,
  Settings,
  Trash2,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface UserPermissions {
  canCancel: boolean
  canReschedule: boolean
  canUpgrade: boolean
  canDowngrade: boolean
  canAddFavorite: boolean
  canSendMessages: boolean
  canCustomizeMessages: boolean
  canViewFinancials: boolean
  canManageRates: boolean
  level: "admin" | "manager" | "receptionist" | "housekeeping"
}

export default function ReservationDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [clientLocation, setClientLocation] = useState({ lat: 3.848, lng: 11.502 })
  const [flightStatus, setFlightStatus] = useState("En vol")
  const [paymentAlerts, setPaymentAlerts] = useState<any[]>([])
  const [realTimeUpdates, setRealTimeUpdates] = useState<any[]>([])
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [showMessageDialog, setShowMessageDialog] = useState(false)
  const [messageType, setMessageType] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentUserLevel, setCurrentUserLevel] = useState<"admin" | "manager" | "receptionist" | "housekeeping">(
    "manager",
  )

  // Simuler les permissions selon le niveau d'utilisateur
  const getUserPermissions = (): UserPermissions => {
    switch (currentUserLevel) {
      case "admin":
        return {
          canCancel: true,
          canReschedule: true,
          canUpgrade: true,
          canDowngrade: true,
          canAddFavorite: true,
          canSendMessages: true,
          canCustomizeMessages: true,
          canViewFinancials: true,
          canManageRates: true,
          level: "admin",
        }
      case "manager":
        return {
          canCancel: true,
          canReschedule: true,
          canUpgrade: true,
          canDowngrade: false,
          canAddFavorite: true,
          canSendMessages: true,
          canCustomizeMessages: true,
          canViewFinancials: true,
          canManageRates: false,
          level: "manager",
        }
      case "receptionist":
        return {
          canCancel: false,
          canReschedule: true,
          canUpgrade: false,
          canDowngrade: false,
          canAddFavorite: true,
          canSendMessages: true,
          canCustomizeMessages: false,
          canViewFinancials: false,
          canManageRates: false,
          level: "receptionist",
        }
      default:
        return {
          canCancel: false,
          canReschedule: false,
          canUpgrade: false,
          canDowngrade: false,
          canAddFavorite: false,
          canSendMessages: false,
          canCustomizeMessages: false,
          canViewFinancials: false,
          canManageRates: false,
          level: "housekeeping",
        }
    }
  }

  const userPermissions = getUserPermissions()

  // Données détaillées de la réservation
  const reservation = {
    id: params.id,
    confirmationNumber: "LM-YDE-2024-001547",
    status: "confirmed",
    createdAt: "2024-01-15T10:30:00",
    lastUpdate: "2024-01-20T14:22:00",

    // Informations client détaillées
    guest: {
      id: "GUEST-001",
      firstName: "Marie",
      lastName: "Kouam Tchuente",
      fullName: "Marie Kouam Tchuente",
      title: "Mme",
      email: "marie.kouam@dlsolutions.cm",
      phone: "+237 677 123 456",
      whatsapp: "+237 677 123 456",
      nationality: "Camerounaise",
      passport: "CM1234567",
      passportExpiry: "2027-08-20",
      dateOfBirth: "1985-03-15",
      gender: "Femme",
      language: "Français",
      profilePhoto: "/placeholder.svg?height=100&width=100",
      loyaltyLevel: "Platinum",
      loyaltyPoints: 15420,
      vipStatus: true,
      blacklisted: false,
      creditScore: 850,
      riskLevel: "low",
    },

    // Informations entreprise
    company: {
      name: "DL Solutions SARL",
      sector: "Technologie",
      size: "PME",
      address: "Rue École de Police, Yaoundé",
      taxId: "M051234567890",
      contactPerson: "Samuel OBAM",
      corporateRate: true,
      paymentTerms: "30 jours",
      creditLimit: 5000000,
    },

    // Informations appareil/téléphone
    device: {
      brand: "Samsung",
      model: "Galaxy S24 Ultra",
      os: "Android 14",
      imei: "123456789012345",
      lastSeen: "2024-01-20T14:20:00",
      ipAddress: "196.1.95.123",
      location: "Yaoundé, Cameroun",
      appVersion: "Le Meridien App v2.1.5",
      notifications: true,
      biometrics: true,
    },

    // Détails du séjour
    stay: {
      checkIn: "2024-01-22",
      checkOut: "2024-01-25",
      nights: 3,
      adults: 2,
      children: 0,
      rooms: 1,
      roomType: "Suite Executive",
      roomNumber: "1205",
      floor: 12,
      view: "Vue ville",
      bedType: "Lit King Size",
      smokingPreference: "Non-fumeur",
      specialRequests: "Arrivée tardive, champagne de bienvenue, lit bébé",
      earlyCheckIn: false,
      lateCheckOut: true,
    },

    // Informations de vol détaillées
    flight: {
      airline: "Air France",
      flightNumber: "AF 0785",
      route: "Paris CDG → Yaoundé NSI",
      departure: {
        airport: "Charles de Gaulle (CDG)",
        city: "Paris",
        country: "France",
        terminal: "2E",
        gate: "L32",
        scheduledTime: "2024-01-22T10:30:00",
        actualTime: "2024-01-22T10:45:00",
        status: "Departed",
      },
      arrival: {
        airport: "Yaoundé Nsimalen (NSI)",
        city: "Yaoundé",
        country: "Cameroun",
        terminal: "International",
        gate: "A3",
        scheduledTime: "2024-01-22T17:45:00",
        estimatedTime: "2024-01-22T18:10:00",
        status: "En vol",
      },
      aircraft: "Airbus A350-900",
      seatNumber: "3A",
      class: "Business",
      duration: "6h 15min",
      distance: "5,847 km",
      currentLocation: {
        lat: 15.3,
        lng: 5.2,
        altitude: "11,000m",
        speed: "850 km/h",
      },
      baggage: {
        checkedBags: 2,
        carryOn: 1,
        weight: "45kg",
      },
    },

    // Agence de voyage
    agency: {
      name: "DL Travel Agency",
      code: "DLT001",
      agent: "Jean Mbarga",
      agentId: "AGT-001",
      agentPhone: "+237 699 987 654",
      agentEmail: "jean.mbarga@dltravel.cm",
      commission: 12,
      bookingChannel: "Direct",
      bookingSource: "Website",
      referenceNumber: "DLT-2024-0547",
    },

    // Informations financières détaillées
    financial: {
      totalAmount: 485000,
      baseRate: 125000,
      taxes: 35000,
      fees: 15000,
      extras: 25000,
      discount: 0,
      currency: "FCFA",
      exchangeRate: 1,
      paymentStatus: "Partially Paid",
      paidAmount: 242500,
      balanceDue: 242500,
      paymentDeadline: "2024-01-22T14:00:00",
      paymentMethod: "Carte de crédit",
      cardType: "Visa",
      cardLast4: "4567",
      cardExpiry: "12/26",
      billingAddress: {
        street: "123 Rue de la Paix",
        city: "Yaoundé",
        country: "Cameroun",
        postalCode: "BP 1234",
      },
      invoiceNumber: "INV-2024-001547",
      invoiceDate: "2024-01-15",
      dueDate: "2024-01-22",
    },

    // Géolocalisation et tracking
    location: {
      current: {
        lat: 3.848,
        lng: 11.502,
        address: "Aéroport International de Yaoundé Nsimalen",
        accuracy: "5m",
        timestamp: "2024-01-20T14:20:00",
      },
      history: [
        {
          lat: 48.8566,
          lng: 2.3522,
          address: "Paris, France",
          timestamp: "2024-01-22T09:00:00",
        },
        {
          lat: 3.848,
          lng: 11.502,
          address: "En vol vers Yaoundé",
          timestamp: "2024-01-22T14:00:00",
        },
      ],
    },

    // Services et préférences
    services: {
      roomService: true,
      laundry: false,
      spa: true,
      gym: true,
      businessCenter: true,
      concierge: true,
      transport: {
        airportPickup: true,
        carRental: false,
        taxi: true,
      },
      dining: {
        breakfast: "Inclus",
        lunch: "À la carte",
        dinner: "Menu dégustation",
        dietaryRestrictions: "Végétarien",
        allergies: "Fruits de mer",
      },
    },

    // Historique et interactions
    history: [
      {
        date: "2024-01-15T10:30:00",
        action: "Réservation créée",
        user: "Jean Mbarga",
        details: "Réservation initiale via DL Travel",
      },
      {
        date: "2024-01-15T11:00:00",
        action: "Paiement partiel",
        user: "Système",
        details: "242,500 FCFA payés par carte Visa",
      },
      {
        date: "2024-01-18T09:15:00",
        action: "Demande spéciale ajoutée",
        user: "Marie Kouam",
        details: "Champagne de bienvenue demandé",
      },
      {
        date: "2024-01-20T14:22:00",
        action: "Check-in en ligne",
        user: "Marie Kouam",
        details: "Check-in effectué via l'application mobile",
      },
    ],

    // Analyse IA et alertes
    aiAnalysis: {
      riskScore: 15,
      fraudProbability: 5,
      noshowProbability: 8,
      upsellOpportunities: ["Upgrade suite présidentielle", "Dîner romantique", "Spa package couple"],
      behaviorPattern: "Client fidèle, préfère les séjours d'affaires",
      recommendations: [
        "Proposer le service de conciergerie",
        "Offrir un surclassement gratuit",
        "Préparer l'accueil VIP",
      ],
    },
  }

  // Messages prédéfinis
  const predefinedMessages = {
    satisfaction: {
      title: "Enquête de satisfaction",
      template: `Chère/Cher ${reservation.guest.firstName},

Nous espérons que votre séjour au Meridien Yaoundé se déroule parfaitement. 

Votre satisfaction est notre priorité. Pourriez-vous prendre quelques minutes pour évaluer votre expérience ?

- Qualité de l'accueil : ⭐⭐⭐⭐⭐
- Confort de la chambre : ⭐⭐⭐⭐⭐
- Services hôteliers : ⭐⭐⭐⭐⭐

Vos commentaires nous aident à améliorer nos services.

Cordialement,
L'équipe du Meridien Yaoundé`,
    },
    birthday: {
      title: "Joyeux anniversaire",
      template: `Joyeux anniversaire ${reservation.guest.firstName} ! 🎉🎂

L'équipe du Meridien Yaoundé vous souhaite une merveilleuse journée d'anniversaire.

Pour célébrer cette occasion spéciale, nous avons le plaisir de vous offrir :
🍾 Une bouteille de champagne dans votre chambre
🎂 Un gâteau d'anniversaire personnalisé
🌹 Un bouquet de fleurs fraîches

Que cette nouvelle année vous apporte joie, bonheur et succès !

Avec nos meilleurs vœux,
L'équipe du Meridien Yaoundé`,
    },
    welcome: {
      title: "Message de bienvenue",
      template: `Bienvenue au Meridien Yaoundé, ${reservation.guest.firstName} !

Nous sommes ravis de vous accueillir dans notre établissement. Votre chambre ${reservation.stay.roomNumber} est prête et vous attend.

Informations importantes :
📍 Check-in : ${new Date(reservation.stay.checkIn).toLocaleDateString("fr-FR")} à 15h00
📍 Check-out : ${new Date(reservation.stay.checkOut).toLocaleDateString("fr-FR")} à 12h00
🅿️ Parking gratuit disponible
📶 WiFi gratuit dans tout l'hôtel

Notre équipe de conciergerie est à votre disposition 24h/24 pour toute demande.

Excellent séjour !
L'équipe du Meridien Yaoundé`,
    },
    upgrade: {
      title: "Surclassement offert",
      template: `Excellente nouvelle, ${reservation.guest.firstName} !

En tant que client ${reservation.guest.loyaltyLevel}, nous avons le plaisir de vous offrir un surclassement gratuit vers une suite supérieure.

Votre nouvelle chambre :
🏨 Suite Présidentielle - Étage 15
🌆 Vue panoramique sur Yaoundé
🛁 Jacuzzi privé
🍾 Champagne de bienvenue inclus

Ce surclassement est offert sans frais supplémentaires en reconnaissance de votre fidélité.

Profitez bien de votre séjour !
L'équipe du Meridien Yaoundé`,
    },
  }

  // Chambres disponibles pour upgrade/downgrade
  const availableRooms = [
    { id: "1501", type: "Suite Présidentielle", price: 0, upgrade: true },
    { id: "1401", type: "Suite Deluxe", price: 0, upgrade: true },
    { id: "1201", type: "Chambre Executive", price: 0, current: true },
    { id: "801", type: "Chambre Standard", price: -50000, downgrade: true },
    { id: "701", type: "Chambre Économique", price: -80000, downgrade: true },
  ]

  // Simulation des mises à jour en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      const updates = [
        "Vol AF 0785 - Altitude: 11,000m, Vitesse: 850 km/h",
        "Client a ouvert l'application mobile",
        "Paiement en attente - Relance automatique envoyée",
        "Chambre 1205 - Nettoyage terminé, prête pour l'arrivée",
        "Service de conciergerie - Réservation restaurant confirmée",
      ]

      const newUpdate = {
        id: Date.now(),
        message: updates[Math.floor(Math.random() * updates.length)],
        timestamp: new Date().toLocaleTimeString(),
        type: Math.random() > 0.7 ? "alert" : "info",
      }

      setRealTimeUpdates((prev) => [newUpdate, ...prev.slice(0, 4)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Simulation des alertes de paiement
  useEffect(() => {
    if (reservation.financial.balanceDue > 0) {
      setPaymentAlerts([
        {
          type: "warning",
          message: `Solde impayé: ${reservation.financial.balanceDue.toLocaleString()} FCFA`,
          action: "Envoyer rappel",
        },
        {
          type: "info",
          message: "Échéance de paiement dans 2 jours",
          action: "Programmer relance",
        },
      ])
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "checkedin":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-green-600"
    if (score < 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressPercentage = () => {
    const total = reservation.financial.totalAmount || 1
    const paid = reservation.financial.paidAmount || 0
    return Math.min(100, Math.max(0, (paid / total) * 100))
  }

  const handleCancelReservation = (reason: string) => {
    console.log("Annulation de la réservation:", reason)
    setShowCancelDialog(false)
    // Ici, vous ajouteriez la logique pour annuler la réservation
  }

  const handleReschedule = (newCheckIn: string, newCheckOut: string) => {
    console.log("Reprogrammation:", { newCheckIn, newCheckOut })
    setShowRescheduleDialog(false)
    // Ici, vous ajouteriez la logique pour reprogrammer
  }

  const handleUpgrade = (newRoomId: string) => {
    console.log("Upgrade vers:", newRoomId)
    setShowUpgradeDialog(false)
    // Ici, vous ajouteriez la logique pour l'upgrade
  }

  const handleSendMessage = () => {
    console.log("Envoi du message:", { type: messageType, message: customMessage })
    setShowMessageDialog(false)
    setCustomMessage("")
    // Ici, vous ajouteriez la logique pour envoyer le message
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // Ici, vous ajouteriez la logique pour sauvegarder en favoris
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/demo/ezee-optimus"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Retour au CRM</span>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Bed className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Réservation #{reservation.confirmationNumber}</h1>
                  <p className="text-sm text-muted-foreground">Hôtel Le Meridien Yaoundé</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={getStatusColor(reservation.status)}>
                {reservation.status === "confirmed" ? "Confirmée" : reservation.status}
              </Badge>
              {reservation.guest.vipStatus && (
                <Badge className="bg-gold-100 text-gold-800">
                  <Star className="w-3 h-3 mr-1" />
                  VIP
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                Niveau: {currentUserLevel}
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Alertes en temps réel */}
        {realTimeUpdates.length > 0 && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Bot className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>
                  <strong>Mise à jour temps réel:</strong> {realTimeUpdates[0].message}
                </span>
                <Badge variant="outline" className="text-xs">
                  {realTimeUpdates[0].timestamp}
                </Badge>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Alertes de paiement */}
        {paymentAlerts.map((alert, index) => (
          <Alert key={index} className="mb-4 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>
                  <strong>Alerte paiement:</strong> {alert.message}
                </span>
                <Button size="sm" variant="outline">
                  {alert.action}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ))}

        {/* Actions rapides selon les permissions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Actions de gestion - Niveau {currentUserLevel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {/* Annuler la réservation */}
              {userPermissions.canCancel && (
                <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="w-full">
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Annuler la réservation</DialogTitle>
                    </DialogHeader>
                    <CancelReservationForm onCancel={handleCancelReservation} />
                  </DialogContent>
                </Dialog>
              )}

              {/* Repousser la réservation */}
              {userPermissions.canReschedule && (
                <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Repousser
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reprogrammer la réservation</DialogTitle>
                    </DialogHeader>
                    <RescheduleForm onReschedule={handleReschedule} />
                  </DialogContent>
                </Dialog>
              )}

              {/* Upgrade de chambre */}
              {userPermissions.canUpgrade && (
                <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <ArrowUp className="w-4 h-4 mr-2" />
                      Upgrade
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Surclassement de chambre</DialogTitle>
                    </DialogHeader>
                    <UpgradeForm rooms={availableRooms} onUpgrade={handleUpgrade} />
                  </DialogContent>
                </Dialog>
              )}

              {/* Downgrade de chambre */}
              {userPermissions.canDowngrade && (
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowDown className="w-4 h-4 mr-2" />
                  Downgrade
                </Button>
              )}

              {/* Ajouter aux favoris */}
              {userPermissions.canAddFavorite && (
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={toggleFavorite}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Favori" : "Favoris"}
                </Button>
              )}

              {/* Messages automatiques */}
              {userPermissions.canSendMessages && (
                <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Messages
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Envoyer un message au client</DialogTitle>
                    </DialogHeader>
                    <MessageForm
                      predefinedMessages={predefinedMessages}
                      onSend={handleSendMessage}
                      messageType={messageType}
                      setMessageType={setMessageType}
                      customMessage={customMessage}
                      setCustomMessage={setCustomMessage}
                      canCustomize={userPermissions.canCustomizeMessages}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Messages rapides pour les permissions limitées */}
            {userPermissions.canSendMessages && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMessageType("satisfaction")
                    setCustomMessage(predefinedMessages.satisfaction.template)
                    setShowMessageDialog(true)
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Satisfaction
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMessageType("birthday")
                    setCustomMessage(predefinedMessages.birthday.template)
                    setShowMessageDialog(true)
                  }}
                >
                  <Cake className="w-4 h-4 mr-2" />
                  Anniversaire
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMessageType("welcome")
                    setCustomMessage(predefinedMessages.welcome.template)
                    setShowMessageDialog(true)
                  }}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Bienvenue
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMessageType("upgrade")
                    setCustomMessage(predefinedMessages.upgrade.template)
                    setShowMessageDialog(true)
                  }}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
              </div>
            )}

            {/* Indicateur de permissions */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Permissions actuelles ({currentUserLevel}):</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {userPermissions.canCancel && <Badge variant="outline">Annulation</Badge>}
                {userPermissions.canReschedule && <Badge variant="outline">Reprogrammation</Badge>}
                {userPermissions.canUpgrade && <Badge variant="outline">Upgrade</Badge>}
                {userPermissions.canDowngrade && <Badge variant="outline">Downgrade</Badge>}
                {userPermissions.canAddFavorite && <Badge variant="outline">Favoris</Badge>}
                {userPermissions.canSendMessages && <Badge variant="outline">Messages</Badge>}
                {userPermissions.canCustomizeMessages && <Badge variant="outline">Messages personnalisés</Badge>}
                {userPermissions.canViewFinancials && <Badge variant="outline">Finances</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="guest">Client</TabsTrigger>
            <TabsTrigger value="flight">Vol & Transport</TabsTrigger>
            <TabsTrigger value="location">Géolocalisation</TabsTrigger>
            <TabsTrigger value="financial">Finances</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="ai">Analyse IA</TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informations principales */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informations de réservation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Client</p>
                        <div className="flex items-center gap-3">
                          <Image
                            src={reservation.guest.profilePhoto || "/placeholder.svg"}
                            alt={reservation.guest.fullName}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{reservation.guest.fullName}</p>
                            <p className="text-sm text-muted-foreground">{reservation.guest.email}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Entreprise</p>
                        <p className="font-semibold">{reservation.company.name}</p>
                        <p className="text-sm text-muted-foreground">{reservation.company.sector}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Check-in</p>
                        <p className="font-semibold">
                          {new Date(reservation.stay.checkIn).toLocaleDateString("fr-FR")}
                        </p>
                        <p className="text-sm text-muted-foreground">15:00</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Check-out</p>
                        <p className="font-semibold">
                          {new Date(reservation.stay.checkOut).toLocaleDateString("fr-FR")}
                        </p>
                        <p className="text-sm text-muted-foreground">12:00</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Durée</p>
                        <p className="font-semibold">{reservation.stay.nights} nuits</p>
                        <p className="text-sm text-muted-foreground">{reservation.stay.adults} adultes</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Chambre</p>
                        <p className="font-semibold">
                          {reservation.stay.roomNumber} - {reservation.stay.roomType}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Étage {reservation.stay.floor} - {reservation.stay.view}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Agence</p>
                        <p className="font-semibold">{reservation.agency.name}</p>
                        <p className="text-sm text-muted-foreground">Agent: {reservation.agency.agent}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Statut du vol en temps réel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="h-5 w-5" />
                      Statut du vol en temps réel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-lg">
                            {reservation.flight.airline} {reservation.flight.flightNumber}
                          </p>
                          <p className="text-muted-foreground">{reservation.flight.route}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">{reservation.flight.arrival.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Départ</p>
                          <p className="font-semibold">{reservation.flight.departure.city}</p>
                          <p className="text-sm">
                            Prévu: {new Date(reservation.flight.departure.scheduledTime).toLocaleTimeString("fr-FR")}
                          </p>
                          <p className="text-sm text-green-600">
                            Réel: {new Date(reservation.flight.departure.actualTime).toLocaleTimeString("fr-FR")}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Arrivée</p>
                          <p className="font-semibold">{reservation.flight.arrival.city}</p>
                          <p className="text-sm">
                            Prévu: {new Date(reservation.flight.arrival.scheduledTime).toLocaleTimeString("fr-FR")}
                          </p>
                          <p className="text-sm text-blue-600">
                            Estimé: {new Date(reservation.flight.arrival.estimatedTime).toLocaleTimeString("fr-FR")}
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Navigation className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Position actuelle</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Altitude:</span>
                            <p className="font-medium">{reservation.flight.currentLocation.altitude}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Vitesse:</span>
                            <p className="font-medium">{reservation.flight.currentLocation.speed}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Temps restant:</span>
                            <p className="font-medium">2h 15min</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar avec informations rapides */}
              <div className="space-y-6">
                {/* Statut financier */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Statut financier
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-semibold">
                          {(reservation.financial.totalAmount || 0).toLocaleString()} FCFA
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payé:</span>
                        <span className="font-semibold text-green-600">
                          {(reservation.financial.paidAmount || 0).toLocaleString()} FCFA
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Solde:</span>
                        <span className="font-semibold text-orange-600">
                          {(reservation.financial.balanceDue || 0).toLocaleString()} FCFA
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${getProgressPercentage()}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Échéance: {new Date(reservation.financial.paymentDeadline).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Informations appareil */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Appareil client
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">
                          {reservation.device.brand} {reservation.device.model}
                        </p>
                        <p className="text-sm text-muted-foreground">{reservation.device.os}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">IMEI:</p>
                        <p className="font-mono text-sm">{reservation.device.imei}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dernière activité:</p>
                        <p className="text-sm">{new Date(reservation.device.lastSeen).toLocaleString("fr-FR")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">IP:</p>
                        <p className="font-mono text-sm">{reservation.device.ipAddress}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Application active</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions rapides */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler client
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Envoyer email
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Bell className="w-4 h-4 mr-2" />
                      Rappel paiement
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Car className="w-4 h-4 mr-2" />
                      Navette aéroport
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Autres onglets restent identiques... */}
          <TabsContent value="guest" className="space-y-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Contenu de l'onglet Client...</p>
            </div>
          </TabsContent>

          <TabsContent value="flight" className="space-y-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Contenu de l'onglet Vol & Transport...</p>
            </div>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Contenu de l'onglet Géolocalisation...</p>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Contenu de l'onglet Finances...</p>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Contenu de l'onglet Services...</p>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Contenu de l'onglet Analyse IA...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Bed className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Ezee Optimus CRM</h3>
                <p className="text-sm text-gray-400">Powered by NovaCore AI</p>
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
              © 2024 Ezee Optimus CRM. Tous droits réservés. Développé par DL Solutions SARL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Composant pour annuler une réservation
function CancelReservationForm({ onCancel }: { onCancel: (reason: string) => void }) {
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")

  const predefinedReasons = [
    "Demande du client",
    "Problème de paiement",
    "Overbooking",
    "Maintenance urgente",
    "Force majeure",
    "Autre",
  ]

  const handleSubmit = () => {
    const finalReason = reason === "Autre" ? customReason : reason
    if (finalReason) {
      onCancel(finalReason)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Raison de l'annulation</Label>
        <Select value={reason} onValueChange={setReason}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une raison" />
          </SelectTrigger>
          <SelectContent>
            {predefinedReasons.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {reason === "Autre" && (
        <div>
          <Label>Raison personnalisée</Label>
          <Textarea
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="Précisez la raison..."
          />
        </div>
      )}

      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Attention:</strong> Cette action est irréversible. La réservation sera définitivement annulée.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <Button
          variant="destructive"
          onClick={handleSubmit}
          disabled={!reason || (reason === "Autre" && !customReason)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Confirmer l'annulation
        </Button>
        <Button variant="outline" onClick={() => {}}>
          Annuler
        </Button>
      </div>
    </div>
  )
}

// Composant pour reprogrammer une réservation
function RescheduleForm({ onReschedule }: { onReschedule: (checkIn: string, checkOut: string) => void }) {
  const [newCheckIn, setNewCheckIn] = useState("")
  const [newCheckOut, setNewCheckOut] = useState("")

  const handleSubmit = () => {
    if (newCheckIn && newCheckOut) {
      onReschedule(newCheckIn, newCheckOut)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Nouvelle date d'arrivée</Label>
          <Input type="date" value={newCheckIn} onChange={(e) => setNewCheckIn(e.target.value)} />
        </div>
        <div>
          <Label>Nouvelle date de départ</Label>
          <Input type="date" value={newCheckOut} onChange={(e) => setNewCheckOut(e.target.value)} />
        </div>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <RefreshCw className="h-4 w-4" />
        <AlertDescription>Les nouvelles dates seront vérifiées automatiquement pour la disponibilité.</AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <Button onClick={handleSubmit} disabled={!newCheckIn || !newCheckOut}>
          <Calendar className="w-4 h-4 mr-2" />
          Reprogrammer
        </Button>
        <Button variant="outline" onClick={() => {}}>
          Annuler
        </Button>
      </div>
    </div>
  )
}

// Composant pour upgrade de chambre
function UpgradeForm({
  rooms,
  onUpgrade,
}: {
  rooms: Array<{ id: string; type: string; price: number; upgrade?: boolean; current?: boolean }>
  onUpgrade: (roomId: string) => void
}) {
  const [selectedRoom, setSelectedRoom] = useState("")

  const upgradeRooms = rooms.filter((room) => room.upgrade)

  return (
    <div className="space-y-4">
      <div>
        <Label>Sélectionner la nouvelle chambre</Label>
        <div className="space-y-2 mt-2">
          {upgradeRooms.map((room) => (
            <div
              key={room.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedRoom === room.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedRoom(room.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{room.type}</p>
                  <p className="text-sm text-muted-foreground">Chambre {room.id}</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800">Gratuit</Badge>
                  <p className="text-xs text-muted-foreground mt-1">Surclassement offert</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Alert className="border-green-200 bg-green-50">
        <Star className="h-4 w-4" />
        <AlertDescription>
          <strong>Surclassement gratuit:</strong> En tant que client VIP, ce surclassement est offert sans frais
          supplémentaires.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <Button onClick={() => onUpgrade(selectedRoom)} disabled={!selectedRoom}>
          <ArrowUp className="w-4 h-4 mr-2" />
          Confirmer l'upgrade
        </Button>
        <Button variant="outline" onClick={() => {}}>
          Annuler
        </Button>
      </div>
    </div>
  )
}

// Composant pour envoyer des messages
function MessageForm({
  predefinedMessages,
  onSend,
  messageType,
  setMessageType,
  customMessage,
  setCustomMessage,
  canCustomize,
}: {
  predefinedMessages: any
  onSend: () => void
  messageType: string
  setMessageType: (type: string) => void
  customMessage: string
  setCustomMessage: (message: string) => void
  canCustomize: boolean
}) {
  const messageTypes = [
    { id: "satisfaction", label: "Enquête de satisfaction", icon: MessageCircle },
    { id: "birthday", label: "Joyeux anniversaire", icon: Cake },
    { id: "welcome", label: "Message de bienvenue", icon: Gift },
    { id: "upgrade", label: "Notification d'upgrade", icon: Star },
  ]

  return (
    <div className="space-y-4">
      <div>
        <Label>Type de message</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {messageTypes.map((type) => {
            const Icon = type.icon
            return (
              <Button
                key={type.id}
                variant={messageType === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setMessageType(type.id)
                  setCustomMessage(predefinedMessages[type.id].template)
                }}
              >
                <Icon className="w-4 h-4 mr-2" />
                {type.label}
              </Button>
            )
          })}
        </div>
      </div>

      {messageType && (
        <div>
          <Label>Aperçu du message</Label>
          <Textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={8}
            readOnly={!canCustomize}
            className={!canCustomize ? "bg-gray-50" : ""}
          />
          {!canCustomize && (
            <p className="text-xs text-muted-foreground mt-1">
              Votre niveau d'autorisation ne permet pas de modifier ce message.
            </p>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={onSend} disabled={!messageType || !customMessage}>
          <Send className="w-4 h-4 mr-2" />
          Envoyer le message
        </Button>
        <Button variant="outline" onClick={() => {}}>
          Annuler
        </Button>
      </div>
    </div>
  )
}
