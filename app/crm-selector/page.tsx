"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Star,
  ArrowRight,
  Check,
  Building,
  Users,
  Bed,
  ShoppingBag,
  Plane,
  Car,
  Heart,
  GraduationCap,
} from "lucide-react"

export default function CRMSelector() {
  const [showPopup, setShowPopup] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    sector: "",
    size: "",
    budget: "",
    needs: "",
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 60000) // 60 secondes = 1 minute

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = () => {
    // Redirection basée sur le secteur
    const sector = formData.sector.toLowerCase()

    if (sector.includes("hôtel") || sector.includes("hotel") || sector.includes("restaurant")) {
      window.location.href = "/demo/ezee-optimus"
    } else if (sector.includes("commerce") || sector.includes("vente")) {
      window.location.href = "/demo/dl-commerce"
    } else if (sector.includes("voyage") || sector.includes("tourisme")) {
      window.location.href = "/demo/dl-travel-manager"
    } else if (sector.includes("auto") || sector.includes("voiture")) {
      window.location.href = "/demo/dl-auto"
    } else if (sector.includes("santé") || sector.includes("sante") || sector.includes("médical")) {
      window.location.href = "/demo/dl-health"
    } else if (sector.includes("éducation") || sector.includes("formation")) {
      window.location.href = "/demo/dl-education"
    } else {
      window.location.href = "/demo/dl-business"
    }
  }

  const crmSolutions = [
    {
      name: "DL Business Suite",
      description: "CRM complet pour tous types d'entreprises",
      price: "75,000 FCFA/mois",
      features: ["Gestion des contacts", "Pipeline commercial", "Automatisation", "Rapports avancés"],
      rating: 4.9,
      icon: <Building className="h-6 w-6" />,
      sectors: ["Tous secteurs"],
      url: "/demo/dl-business",
    },
    {
      name: "DL Hospitality Pro",
      description: "Solution complète pour l'hôtellerie et la restauration",
      price: "95,000 FCFA/mois",
      features: ["Gestion des réservations", "Check-in/Check-out", "Gestion des chambres", "Service client"],
      rating: 4.8,
      icon: <Bed className="h-6 w-6" />,
      sectors: ["Hôtellerie", "Restauration"],
      url: "/demo/ezee-optimus",
    },
    {
      name: "DL Marketing Hub",
      description: "Plateforme marketing tout-en-un",
      price: "85,000 FCFA/mois",
      features: ["Automation marketing", "Landing pages", "Email marketing", "Analytics"],
      rating: 4.7,
      icon: <Users className="h-6 w-6" />,
      sectors: ["Marketing", "Communication"],
      url: "/demo/dl-marketing",
    },
    {
      name: "DL Commerce Pro",
      description: "Solution e-commerce complète",
      price: "110,000 FCFA/mois",
      features: ["Gestion des commandes", "Inventaire", "Paiements", "Livraison"],
      rating: 4.8,
      icon: <ShoppingBag className="h-6 w-6" />,
      sectors: ["E-commerce", "Retail"],
      url: "/demo/dl-commerce",
    },
    {
      name: "DL Travel Manager",
      description: "CRM spécialisé pour agences de voyage",
      price: "90,000 FCFA/mois",
      features: ["Réservations", "Itinéraires", "Gestion clients", "Facturation"],
      rating: 4.6,
      icon: <Plane className="h-6 w-6" />,
      sectors: ["Voyage", "Tourisme"],
      url: "/demo/dl-travel-manager",
    },
    {
      name: "DL Auto Solutions",
      description: "CRM pour concessionnaires et garages",
      price: "85,000 FCFA/mois",
      features: ["Suivi véhicules", "Service après-vente", "Rendez-vous", "Inventaire"],
      rating: 4.5,
      icon: <Car className="h-6 w-6" />,
      sectors: ["Automobile"],
      url: "/demo/dl-auto",
    },
    {
      name: "DL Health Care",
      description: "Solution pour cliniques et cabinets médicaux",
      price: "120,000 FCFA/mois",
      features: ["Dossiers patients", "Rendez-vous", "Facturation", "Prescriptions"],
      rating: 4.9,
      icon: <Heart className="h-6 w-6" />,
      sectors: ["Santé", "Médical"],
      url: "/demo/dl-health",
    },
    {
      name: "DL Education Suite",
      description: "CRM pour écoles et centres de formation",
      price: "80,000 FCFA/mois",
      features: ["Gestion étudiants", "Emplois du temps", "Notes", "Communication"],
      rating: 4.7,
      icon: <GraduationCap className="h-6 w-6" />,
      sectors: ["Éducation", "Formation"],
      url: "/demo/dl-education",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Solutions CRM DL Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos CRM spécialisés par secteur d'activité, adaptés à vos besoins spécifiques
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="business">Entreprise</TabsTrigger>
              <TabsTrigger value="hospitality">Hôtellerie</TabsTrigger>
              <TabsTrigger value="commerce">E-commerce</TabsTrigger>
              <TabsTrigger value="specialized">Spécialisés</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crmSolutions.map((crm, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {crm.icon}
                      </div>
                      <CardTitle className="text-sm">{crm.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {crm.price}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2 text-xs">{crm.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    {crm.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(crm.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs ml-2">{crm.rating}</span>
                  </div>
                  <Button size="sm" asChild>
                    <a href={crm.url}>
                      Essayer
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Popup d'abonnement */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Trouvez le CRM parfait pour votre entreprise</DialogTitle>
            <DialogDescription>
              Parlez-nous de votre entreprise pour que nous puissions vous recommander la solution idéale.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="company-name">Nom de l'entreprise</Label>
              <Input
                id="company-name"
                placeholder="DL Solutions"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sector">Secteur d'activité</Label>
              <Select onValueChange={(value) => handleInputChange("sector", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hôtellerie">Hôtellerie</SelectItem>
                  <SelectItem value="Restauration">Restauration</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Voyage">Voyage</SelectItem>
                  <SelectItem value="Automobile">Automobile</SelectItem>
                  <SelectItem value="Santé">Santé</SelectItem>
                  <SelectItem value="Éducation">Éducation</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size">Taille de l'entreprise</Label>
              <Select onValueChange={(value) => handleInputChange("size", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Nombre d'employés" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employés</SelectItem>
                  <SelectItem value="11-50">11-50 employés</SelectItem>
                  <SelectItem value="51-200">51-200 employés</SelectItem>
                  <SelectItem value="201+">201+ employés</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget mensuel</Label>
              <Select onValueChange={(value) => handleInputChange("budget", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget approximatif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50000">0 - 50,000 FCFA</SelectItem>
                  <SelectItem value="50000-100000">50,000 - 100,000 FCFA</SelectItem>
                  <SelectItem value="100000-200000">100,000 - 200,000 FCFA</SelectItem>
                  <SelectItem value="200000+">200,000+ FCFA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="needs">Besoins spécifiques</Label>
              <Input
                id="needs"
                placeholder="Décrivez vos besoins spécifiques"
                value={formData.needs}
                onChange={(e) => handleInputChange("needs", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Trouver mon CRM idéal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
