"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { 
  Camera, 
  User, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  Shield, 
  UserCheck, 
  Key, 
  Scan, 
  RefreshCw, 
  Clock, 
  MapPin, 
  Star, 
  Zap, 
  Bot, 
  XCircle 
} from "lucide-react"

interface GuestProfile {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  profilePhoto: string
  photoVerified: boolean
  photoUploadDate: string
  identityVerified: boolean
  passportPhoto?: string
  reservationId: string
  roomNumber: string
  checkInDate: string
  checkOutDate: string
  loyaltyLevel: string
  vipStatus: boolean
  lastSeen: string
  currentLocation: string
  bookingSource: string
  specialRequests: string[]
}

interface PhotoVerificationProps {
  userLevel: "admin" | "manager" | "receptionist" | "housekeeping"
  userName: string
  hotelName: string
}

export function PhotoVerificationSystem({ userLevel, userName, hotelName }: PhotoVerificationProps) {
  const [activeTab, setActiveTab] = useState("checkin")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<GuestProfile | null>(null)
  const [showPhotoCapture, setShowPhotoCapture] = useState(false)
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [verificationResult, setVerificationResult] = useState<"pending" | "success" | "failed" | null>(null)
  const [livePhoto, setLivePhoto] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)

  // Données de démonstration des clients avec photos obligatoires
  const guestProfiles: GuestProfile[] = [
    {
      id: "GUEST-001",
      firstName: "Marie",
      lastName: "Kouam Tchuente",
      fullName: "Marie Kouam Tchuente",
      email: "marie.kouam@dlsolutions.cm",
      phone: "+237 677 123 456",
      profilePhoto: "/placeholder.svg?height=150&width=150",
      photoVerified: true,
      photoUploadDate: "2024-01-10T14:30:00",
      identityVerified: true,
      passportPhoto: "/placeholder.svg?height=100&width=100",
      reservationId: "LM-YDE-2024-001547",
      roomNumber: "1205",
      checkInDate: "2024-01-22",
      checkOutDate: "2024-01-25",
      loyaltyLevel: "Platinum",
      vipStatus: true,
      lastSeen: "2024-01-22T08:30:00",
      currentLocation: "Hall d'accueil",
      bookingSource: "Booking.com",
      specialRequests: ["Chambre non-fumeur", "Lit king size", "Vue ville"],
    },
    {
      id: "GUEST-002",
      firstName: "Paul",
      lastName: "Essomba Nkomo",
      fullName: "Paul Essomba Nkomo",
      email: "paul.essomba@email.cm",
      phone: "+237 699 987 654",
      profilePhoto: "/placeholder.svg?height=150&width=150",
      photoVerified: true,
      photoUploadDate: "2024-01-15T09:15:00",
      identityVerified: false,
      reservationId: "LM-YDE-2024-001548",
      roomNumber: "0804",
      checkInDate: "2024-01-22",
      checkOutDate: "2024-01-24",
      loyaltyLevel: "Gold",
      vipStatus: false,
      lastSeen: "2024-01-22T10:15:00",
      currentLocation: "Restaurant",
      bookingSource: "Expedia",
      specialRequests: ["Petit-déjeuner inclus", "Parking gratuit"],
    },
    {
      id: "GUEST-003",
      firstName: "Fatima",
      lastName: "Ngono Bella",
      fullName: "Fatima Ngono Bella",
      email: "fatima.ngono@email.cm",
      phone: "+237 655 456 789",
      profilePhoto: "/placeholder.svg?height=150&width=150",
      photoVerified: true,
      photoUploadDate: "2024-01-20T16:45:00",
      identityVerified: true,
      passportPhoto: "/placeholder.svg?height=100&width=100",
      reservationId: "LM-YDE-2024-001549",
      roomNumber: "1501",
      checkInDate: "2024-01-22",
      checkOutDate: "2024-01-26",
      loyaltyLevel: "Silver",
      vipStatus: false,
      lastSeen: "2024-01-22T07:45:00",
      currentLocation: "Spa",
      bookingSource: "Direct",
      specialRequests: ["Massage thérapeutique", "Régime végétarien"],
    },
    {
      id: "GUEST-004",
      firstName: "Jean",
      lastName: "Mbarga Olomo",
      fullName: "Jean Mbarga Olomo",
      email: "jean.mbarga@email.cm",
      phone: "+237 677 555 123",
      profilePhoto: "/placeholder.svg?height=150&width=150",
      photoVerified: false,
      photoUploadDate: "",
      identityVerified: false,
      reservationId: "LM-YDE-2024-001550",
      roomNumber: "0605",
      checkInDate: "2024-01-22",
      checkOutDate: "2024-01-23",
      loyaltyLevel: "Bronze",
      vipStatus: false,
      lastSeen: "",
      currentLocation: "En attente d'arrivée",
      bookingSource: "Agoda",
      specialRequests: ["Arrivée tardive"],
    },
  ]

  const filteredGuests = guestProfiles.filter(
    (guest) =>
      guest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.roomNumber.includes(searchTerm) ||
      guest.reservationId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Démarrer la caméra
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("Erreur d'accès à la caméra:", error)
    }
  }

  // Arrêter la caméra
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setCameraActive(false)
    }
  }

  // Capturer une photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)
        const photoDataUrl = canvas.toDataURL("image/jpeg", 0.8)
        setLivePhoto(photoDataUrl)
        stopCamera()
        setShowPhotoCapture(false)
        setShowVerificationDialog(true)
        simulateVerification()
      }
    }
  }

  // Simuler la vérification faciale
  const simulateVerification = () => {
    setVerificationResult("pending")
    setTimeout(() => {
      // Simulation: 85% de chance de succès
      const success = Math.random() > 0.15
      setVerificationResult(success ? "success" : "failed")
    }, 3000)
  }

  // Encoder une clé magnétique
  const encodeKeyCard = (guest: GuestProfile) => {
    if (!guest.photoVerified) {
      alert("Impossible d'encoder la clé: Photo non vérifiée")
      return
    }
    console.log(`Encodage de la clé pour ${guest.fullName} - Chambre ${guest.roomNumber}`)
    // Ici, vous ajouteriez la logique d'encodage de clé
  }

  // Effectuer le check-in
  const performCheckIn = (guest: GuestProfile) => {
    if (!guest.photoVerified) {
      alert("Impossible de faire le check-in: Photo non vérifiée")
      return
    }
    console.log(`Check-in effectué pour ${guest.fullName}`)
    // Ici, vous ajouteriez la logique de check-in
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const getVerificationBadge = (guest: GuestProfile) => {
    if (guest.photoVerified && guest.identityVerified) {
      return <Badge className="bg-green-100 text-green-800">Vérifié ✓</Badge>
    } else if (guest.photoVerified) {
      return <Badge className="bg-yellow-100 text-yellow-800">Photo OK</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800">Non vérifié</Badge>
    }
  }

  const getSourceBadge = (source: string) => {
    const colors = {
      "Booking.com": "bg-blue-100 text-blue-800",
      Expedia: "bg-purple-100 text-purple-800",
      Agoda: "bg-orange-100 text-orange-800",
      Direct: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[source as keyof typeof colors] || "bg-gray-100 text-gray-800"}>source</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6" />
            Système de Vérification Photo - {hotelName}
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Identification visuelle obligatoire pour check-in/out et encodage de clés - Agent: {userName}
            </p>
            <Badge variant="outline" className="text-sm">
              Niveau: {userLevel}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Alerte de sécurité */}
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Protocole de sécurité:</strong> Toute réservation via plateforme partenaire (Booking, Expedia, Agoda)
          exige une photo de profil vérifiée. Vérifiez l'identité avant toute action.
        </AlertDescription>
      </Alert>

      {/* Barre de recherche */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par nom, email, chambre ou numéro de réservation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Button
          onClick={() => {
            setShowPhotoCapture(true)
            startCamera()
          }}
        >
          <Camera className="w-4 h-4 mr-2" />
          Vérifier identité
        </Button>
      </div>

      {/* Liste des clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGuests.map((guest) => (
          <Card
            key={guest.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedGuest?.id === guest.id ? "ring-2 ring-blue-500" : ""
            } ${!guest.photoVerified ? "border-red-200 bg-red-50" : ""}`}
            onClick={() => setSelectedGuest(guest)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Image
                    src={guest.profilePhoto || "/placeholder.svg"}
                    alt={guest.fullName}
                    width={80}
                    height={80}
                    className={`rounded-full border-2 ${guest.photoVerified ? "border-green-500" : "border-red-500"}`}
                  />
                  {guest.photoVerified ? (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{guest.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{guest.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getVerificationBadge(guest)}
                    {guest.vipStatus && (
                      <Badge className="bg-gold-100 text-gold-800">
                        <Star className="w-3 h-3 mr-1" />
                        VIP
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Chambre:</span>
                  <p className="font-medium">{guest.roomNumber}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Réservation:</span>
                  <p className="font-medium">{guest.reservationId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Check-in:</span>
                  <p className="font-medium">{new Date(guest.checkInDate).toLocaleDateString("fr-FR")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Check-out:</span>
                  <p className="font-medium">{new Date(guest.checkOutDate).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground text-sm">Source:</span>
                  <div className="mt-1">{getSourceBadge(guest.bookingSource)}</div>
                </div>
                <Badge variant="outline" className="text-xs">guest.loyaltyLevel</Badge>
              </div>

              {guest.lastSeen && (
                <div className="text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Vu: {new Date(guest.lastSeen).toLocaleString("fr-FR")}
                  <br />
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {guest.currentLocation}
                </div>
              )}

              {!guest.photoVerified && (
                <Alert className="border-red-200 bg-red-50 p-2">
                  <AlertTriangle className="h-3 w-3" />
                  <AlertDescription className="text-xs">
                    <strong>Photo manquante:</strong> Demander au client de télécharger sa photo avant le check-in.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    performCheckIn(guest)
                  }}
                  disabled={!guest.photoVerified}
                >
                  <UserCheck className="w-4 h-4 mr-1" />
                  Check-in
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    encodeKeyCard(guest)
                  }}
                  disabled={!guest.photoVerified}
                >
                  <Key className="w-4 h-4 mr-1" />
                  Clé
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Détails du client sélectionné */}
      {selectedGuest && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profil détaillé - {selectedGuest.fullName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="text-center">
                  <Image
                    src={selectedGuest.profilePhoto || "/placeholder.svg"}
                    alt={selectedGuest.fullName}
                    width={150}
                    height={150}
                    className={`rounded-lg mx-auto border-4 ${
                      selectedGuest.photoVerified ? "border-green-500" : "border-red-500"
                    }`}
                  />
                  <div className="mt-3">
                    {getVerificationBadge(selectedGuest)}
                    {selectedGuest.photoUploadDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Photo uploadée: {new Date(selectedGuest.photoUploadDate).toLocaleDateString("fr-FR")}
                      </p>
                    )}
                  </div>
                </div>

                {selectedGuest.passportPhoto && (
                  <div className="text-center">
                    <p className="text-sm font-medium mb-2">Photo passeport</p>
                    <Image
                      src={selectedGuest.passportPhoto || "/placeholder.svg"}
                      alt="Passeport"
                      width={100}
                      height={100}
                      className="rounded border mx-auto"
                    />
                  </div>
                )}
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Nom complet</Label>
                    <p className="font-semibold">{selectedGuest.fullName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Téléphone</Label>
                    <p className="font-semibold">{selectedGuest.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="font-semibold">{selectedGuest.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Chambre</Label>
                    <p className="font-semibold">{selectedGuest.roomNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Source de réservation</Label>
                    <div className="mt-1">{getSourceBadge(selectedGuest.bookingSource)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Niveau de fidélité</Label>
                    <Badge variant="outline" className="mt-1">selectedGuest.loyaltyLevel</Badge>
                  </div>
                </div>

                {selectedGuest.specialRequests.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Demandes spéciales</Label>
                    <div className="mt-1 space-y-1">
                      {selectedGuest.specialRequests.map((request, index) => (
                        <Badge key={index} variant="outline" className="mr-2">request</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => performCheckIn(selectedGuest)}
                    disabled={!selectedGuest.photoVerified}
                    className="flex-1"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Effectuer le check-in
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => encodeKeyCard(selectedGuest)}
                    disabled={!selectedGuest.photoVerified}
                    className="flex-1"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Encoder clé magnétique
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPhotoCapture(true)
                      startCamera()
                    }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Vérifier identité
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialog de capture photo */}
      <Dialog open={showPhotoCapture} onOpenChange={setShowPhotoCapture}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Capture photo pour vérification d'identité
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <video ref={videoRef} autoPlay playsInline className="w-full h-64 bg-gray-100 rounded-lg object-cover" />
              <canvas ref={canvasRef} className="hidden" />
              {!cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-muted-foreground">Caméra en cours d'initialisation...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button onClick={capturePhoto} disabled={!cameraActive} className="flex-1">
                <Scan className="w-4 h-4 mr-2" />
                Capturer la photo
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  stopCamera()
                  setShowPhotoCapture(false)
                }}
              >
                Annuler
              </Button>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Eye className="h-4 w-4" />
              <AlertDescription>
                <strong>Instructions:</strong> Demandez au client de regarder directement la caméra. La photo sera
                comparée automatiquement avec celle du profil.
              </AlertDescription>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de vérification */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Vérification d'identité par IA
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedGuest && (
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="font-medium mb-3">Photo du profil</h3>
                  <Image
                    src={selectedGuest.profilePhoto || "/placeholder.svg"}
                    alt="Photo profil"
                    width={200}
                    height={200}
                    className="rounded-lg border mx-auto"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Source: {selectedGuest.bookingSource}
                    <br />
                    Uploadée: {new Date(selectedGuest.photoUploadDate).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-medium mb-3">Photo en direct</h3>
                  {livePhoto ? (
                    <Image
                      src={livePhoto || "/placeholder.svg"}
                      alt="Photo live"
                      width={200}
                      height={200}
                      className="rounded-lg border mx-auto"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">Capturée: {new Date().toLocaleString("fr-FR")}</p>
                </div>
              </div>
            )}

            {/* Résultat de la vérification */}
            <div className="text-center">
              {verificationResult === "pending" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
                    <span className="font-medium">Analyse en cours...</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Comparaison biométrique avec l'IA NovaCore en cours...
                  </p>
                </div>
              )}

              {verificationResult === "success" && (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-green-600">Identité vérifiée ✓</h3>
                  <p className="text-muted-foreground">
                    Correspondance: 94.7% - La personne correspond au profil enregistré
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-green-600">94.7%</div>
                      <div className="text-muted-foreground">Correspondance faciale</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">98.2%</div>
                      <div className="text-muted-foreground">Qualité de l'image</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">Validé</div>
                      <div className="text-muted-foreground">Statut de sécurité</div>
                    </div>
                  </div>
                </div>
              )}

              {verificationResult === "failed" && (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-red-600">Vérification échouée ⚠️</h3>
                  <p className="text-muted-foreground">
                    Correspondance: 23.1% - La personne ne correspond pas au profil enregistré
                  </p>
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Action requise:</strong> Demandez une pièce d'identité supplémentaire et contactez la
                      sécurité si nécessaire.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {verificationResult === "success" && (
                <>
                  <Button
                    onClick={() => {
                      if (selectedGuest) performCheckIn(selectedGuest)
                      setShowVerificationDialog(false)
                    }}
                    className="flex-1"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Procéder au check-in
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (selectedGuest) encodeKeyCard(selectedGuest)
                      setShowVerificationDialog(false)
                    }}
                    className="flex-1"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Encoder la clé
                  </Button>
                </>
              )}
              {verificationResult === "failed" && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPhotoCapture(true)
                    setShowVerificationDialog(false)
                    startCamera()
                  }}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reprendre la photo
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setShowVerificationDialog(false)
                  setVerificationResult(null)
                  setLivePhoto(null)
                }}
              >
                Fermer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Statistiques de vérification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Statistiques de vérification - Aujourd'hui
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">87</div>
              <div className="text-sm text-muted-foreground">Vérifications réussies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">3</div>
              <div className="text-sm text-muted-foreground">Vérifications échouées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-muted-foreground">Photos manquantes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">96.7%</div>
              <div className="text-sm text-muted-foreground">Taux de succès</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
