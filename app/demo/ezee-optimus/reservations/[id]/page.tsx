"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  MapPin,
  Plane,
  Clock,
  CreditCard,
  Building,
  Smartphone,
  User,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Car,
  Utensils,
  Star,
  Edit,
  Download,
  Share2,
  Bell,
  Zap,
  Bot,
  MessageSquare,
  Bed,
  Receipt,
  Plus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ReservationDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [clientLocation, setClientLocation] = useState({ lat: 3.848, lng: 11.502 })
  const [flightStatus, setFlightStatus] = useState("En vol")
  const [paymentAlerts, setPaymentAlerts] = useState<any[]>([])
  const [realTimeUpdates, setRealTimeUpdates] = useState<any[]>([])

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

          {/* Onglet Client */}
          <TabsContent value="guest" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profil client complet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={reservation.guest.profilePhoto || "/placeholder.svg"}
                      alt={reservation.guest.fullName}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{reservation.guest.fullName}</h3>
                      <p className="text-muted-foreground">{reservation.guest.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-gold-100 text-gold-800">{reservation.guest.loyaltyLevel}</Badge>
                        <Badge variant="outline">{reservation.guest.loyaltyPoints} points</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="font-medium">{reservation.guest.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                      <p className="font-medium">{reservation.guest.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Nationalité</p>
                      <p className="font-medium">{reservation.guest.nationality}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date de naissance</p>
                      <p className="font-medium">
                        {new Date(reservation.guest.dateOfBirth).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Passeport</p>
                      <p className="font-medium">{reservation.guest.passport}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Expiration</p>
                      <p className="font-medium">
                        {new Date(reservation.guest.passportExpiry).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Score de crédit</p>
                      <p className="font-bold text-green-600">{reservation.guest.creditScore}/1000</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Niveau de risque</p>
                      <Badge className={`${getRiskColor(15)}`}>Faible</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Informations entreprise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold">{reservation.company.name}</h3>
                    <p className="text-muted-foreground">{reservation.company.sector}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Adresse</p>
                      <p className="font-medium">{reservation.company.address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Numéro fiscal</p>
                      <p className="font-medium">{reservation.company.taxId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Contact principal</p>
                      <p className="font-medium">{reservation.company.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Conditions de paiement</p>
                      <p className="font-medium">{reservation.company.paymentTerms}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Limite de crédit</p>
                      <p className="font-bold text-green-600">
                        {reservation.company.creditLimit.toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {reservation.company.corporateRate && (
                      <Badge className="bg-blue-100 text-blue-800">Tarif entreprise</Badge>
                    )}
                    <Badge variant="outline">{reservation.company.size}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Vol & Transport */}
          <TabsContent value="flight" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Détails du vol complets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Informations de vol</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Compagnie:</span>
                        <span className="font-medium">{reservation.flight.airline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Numéro de vol:</span>
                        <span className="font-medium">{reservation.flight.flightNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Appareil:</span>
                        <span className="font-medium">{reservation.flight.aircraft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Siège:</span>
                        <span className="font-medium">{reservation.flight.seatNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Classe:</span>
                        <Badge className="bg-purple-100 text-purple-800">{reservation.flight.class}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Durée:</span>
                        <span className="font-medium">{reservation.flight.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Distance:</span>
                        <span className="font-medium">{reservation.flight.distance}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Bagages</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bagages enregistrés:</span>
                        <span className="font-medium">{reservation.flight.baggage.checkedBags}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bagage cabine:</span>
                        <span className="font-medium">{reservation.flight.baggage.carryOn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Poids total:</span>
                        <span className="font-medium">{reservation.flight.baggage.weight}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Plane className="h-4 w-4 rotate-45" />
                      Départ - {reservation.flight.departure.city}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Aéroport:</span>
                        <span className="font-medium">{reservation.flight.departure.airport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Terminal:</span>
                        <span className="font-medium">{reservation.flight.departure.terminal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Porte:</span>
                        <span className="font-medium">{reservation.flight.departure.gate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heure prévue:</span>
                        <span className="font-medium">
                          {new Date(reservation.flight.departure.scheduledTime).toLocaleTimeString("fr-FR")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heure réelle:</span>
                        <span className="font-medium text-green-600">
                          {new Date(reservation.flight.departure.actualTime).toLocaleTimeString("fr-FR")}
                        </span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{reservation.flight.departure.status}</Badge>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Plane className="h-4 w-4 -rotate-45" />
                      Arrivée - {reservation.flight.arrival.city}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Aéroport:</span>
                        <span className="font-medium">{reservation.flight.arrival.airport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Terminal:</span>
                        <span className="font-medium">{reservation.flight.arrival.terminal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Porte:</span>
                        <span className="font-medium">{reservation.flight.arrival.gate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heure prévue:</span>
                        <span className="font-medium">
                          {new Date(reservation.flight.arrival.scheduledTime).toLocaleTimeString("fr-FR")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heure estimée:</span>
                        <span className="font-medium text-blue-600">
                          {new Date(reservation.flight.arrival.estimatedTime).toLocaleTimeString("fr-FR")}
                        </span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{reservation.flight.arrival.status}</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Navigation className="h-5 w-5" />
                    Position en temps réel
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{reservation.flight.currentLocation.altitude}</p>
                      <p className="text-sm text-muted-foreground">Altitude</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{reservation.flight.currentLocation.speed}</p>
                      <p className="text-sm text-muted-foreground">Vitesse</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">2h 15min</p>
                      <p className="text-sm text-muted-foreground">Temps restant</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">85%</p>
                      <p className="text-sm text-muted-foreground">Progression</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Géolocalisation */}
          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Géolocalisation et tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Carte simulée */}
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;4&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
                    <div className="text-center z-10">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold">Position actuelle du client</h3>
                      <p className="text-muted-foreground">{reservation.location.current.address}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Précision: {reservation.location.current.accuracy} - Dernière mise à jour:{" "}
                        {new Date(reservation.location.current.timestamp).toLocaleTimeString("fr-FR")}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Position actuelle</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Latitude:</span>
                          <span className="font-mono">{reservation.location.current.lat}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Longitude:</span>
                          <span className="font-mono">{reservation.location.current.lng}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Adresse:</span>
                          <span className="font-medium">{reservation.location.current.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Précision:</span>
                          <span className="font-medium">{reservation.location.current.accuracy}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Historique des positions</h4>
                      <div className="space-y-3">
                        {reservation.location.history.map((location, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <MapPin className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{location.address}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(location.timestamp).toLocaleString("fr-FR")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      Alertes de géolocalisation
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>• Client actuellement à l'aéroport - Arrivée prévue à l'hôtel dans 45 minutes</p>
                      <p>• Navette aéroport disponible - Dernière course à 19h30</p>
                      <p>• Trafic dense sur l'itinéraire habituel - Prévoir 15 minutes supplémentaires</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Finances */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Détails financiers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tarif de base:</span>
                      <span className="font-medium">{(reservation.financial.baseRate || 0).toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes:</span>
                      <span className="font-medium">{(reservation.financial.taxes || 0).toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frais de service:</span>
                      <span className="font-medium">{(reservation.financial.fees || 0).toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Extras:</span>
                      <span className="font-medium">{(reservation.financial.extras || 0).toLocaleString()} FCFA</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>{(reservation.financial.totalAmount || 0).toLocaleString()} FCFA</span>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Paiements reçus</h4>
                    <div className="flex justify-between">
                      <span>Montant payé:</span>
                      <span className="font-bold text-green-600">
                        {(reservation.financial.paidAmount || 0).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Solde restant</h4>
                    <div className="flex justify-between">
                      <span>À payer:</span>
                      <span className="font-bold text-orange-600">
                        {(
                          (reservation.financial.totalAmount || 0) - (reservation.financial.paidAmount || 0)
                        ).toLocaleString()}{" "}
                        FCFA
                      </span>
                    </div>
                    <p className="text-sm text-orange-600 mt-2">
                      Échéance: {new Date(reservation.financial.paymentDeadline).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Informations de paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Méthode de paiement</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{reservation.financial.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Carte:</span>
                        <span className="font-medium">
                          {reservation.financial.cardType} **** {reservation.financial.cardLast4}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expiration:</span>
                        <span className="font-medium">{reservation.financial.cardExpiry}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Adresse de facturation</h4>
                    <div className="text-sm">
                      <p>{reservation.financial.billingAddress.street}</p>
                      <p>
                        {reservation.financial.billingAddress.city}, {reservation.financial.billingAddress.postalCode}
                      </p>
                      <p>{reservation.financial.billingAddress.country}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Facture</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Numéro:</span>
                        <span className="font-medium">{reservation.financial.invoiceNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">
                          {new Date(reservation.financial.invoiceDate).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Échéance:</span>
                        <span className="font-medium">
                          {new Date(reservation.financial.dueDate).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger facture
                    </Button>
                    <Button className="flex-1">
                      <Bell className="w-4 h-4 mr-2" />
                      Rappel paiement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Services */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    Services de chambre
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${reservation.services.roomService ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span>Room Service</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${reservation.services.laundry ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span>Blanchisserie</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${reservation.services.spa ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span>Spa</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${reservation.services.gym ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span>Salle de sport</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${reservation.services.businessCenter ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span>Centre d'affaires</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${reservation.services.concierge ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span>Conciergerie</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Transport
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Navette aéroport</span>
                      <Badge
                        className={
                          reservation.services.transport.airportPickup
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {reservation.services.transport.airportPickup ? "Réservé" : "Non demandé"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Location de voiture</span>
                      <Badge
                        className={
                          reservation.services.transport.carRental
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {reservation.services.transport.carRental ? "Réservé" : "Non demandé"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Service taxi</span>
                      <Badge
                        className={
                          reservation.services.transport.taxi
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {reservation.services.transport.taxi ? "Disponible" : "Non demandé"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5" />
                    Restauration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Petit-déjeuner:</span>
                      <span className="font-medium">{reservation.services.dining.breakfast}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Déjeuner:</span>
                      <span className="font-medium">{reservation.services.dining.lunch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dîner:</span>
                      <span className="font-medium">{reservation.services.dining.dinner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Restrictions alimentaires:</span>
                      <span className="font-medium">{reservation.services.dining.dietaryRestrictions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allergies:</span>
                      <span className="font-medium text-red-600">{reservation.services.dining.allergies}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Demandes spéciales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm">{reservation.stay.specialRequests}</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button className="w-full" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une demande
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Analyse IA */}
          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Analyse comportementale IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{reservation.aiAnalysis.riskScore}%</div>
                      <p className="text-sm text-muted-foreground">Score de risque</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{reservation.aiAnalysis.fraudProbability}%</div>
                      <p className="text-sm text-muted-foreground">Risque de fraude</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {reservation.aiAnalysis.noshowProbability}%
                      </div>
                      <p className="text-sm text-muted-foreground">Probabilité no-show</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">95%</div>
                      <p className="text-sm text-muted-foreground">Score de fidélité</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Profil comportemental</h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{reservation.aiAnalysis.behaviorPattern}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Recommandations IA</h4>
                    <div className="space-y-2">
                      {reservation.aiAnalysis.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Opportunités d'upselling
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {reservation.aiAnalysis.upsellOpportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">{opportunity}</span>
                        <Button size="sm">Proposer</Button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      Suggestion IA automatique
                    </h4>
                    <p className="text-sm mb-3">
                      Basé sur le profil VIP du client et son historique, nous recommandons un surclassement gratuit
                      vers la Suite Présidentielle.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Appliquer
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Ignorer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Historique des interactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reservation.history.map((event, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{event.action}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleString("fr-FR")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">Par: {event.user}</p>
                          <p className="text-sm">{event.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      ;
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
