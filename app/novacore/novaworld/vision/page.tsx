"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Target,
  Shield,
  Users,
  MessageSquare,
  Brain,
  Lock,
  Coins,
  Database,
  Workflow,
  Rocket,
  Megaphone,
} from "lucide-react"

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1745950544/novaworld-logo-generated_gqmjwf.png"
                alt="NovaWorld Logo"
                width={200}
                height={50}
                className="h-12 w-auto"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Vision Globale</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Réseau social B2B panafricain de nouvelle génération
          </p>
        </div>

        {/* Objectif */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Objectif</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Vérification Administrative</h3>
                <p className="text-gray-600">Validation des profils professionnels</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Mise en Relation</h3>
                <p className="text-gray-600">Connexions intelligentes entre acteurs économiques</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Brain className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Analyse IA</h3>
                <p className="text-gray-600">Évaluation et protection des projets</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Coins className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Monétisation Intelligente</h3>
                <p className="text-gray-600">Basée sur la pertinence, pas la publicité</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fondements Fonctionnels */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Fondements Fonctionnels</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Vérification & Statut</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary">RCCM</Badge>
                    <span>Document obligatoire</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary">Contrat</Badge>
                    <span>Validation du poste</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary">PV</Badge>
                    <span>Nomination officielle</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Salons Privés & Groupes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>DG & CEO</span>
                    <Badge>RCCM + PV</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>RH & DAF</span>
                    <Badge>Contrat RH</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Directeurs</span>
                    <Badge>Nomination</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Freelances</span>
                    <Badge>Portfolio</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Protection & Certification */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Protection & Certification</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Sécurité IA & Blockchain</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Hash sur Arweave/Polygon</li>
                    <li>• Certificat automatique</li>
                    <li>• NDA automatisé</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Monétisation</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Projet certifié: 10.000 FCFA</li>
                    <li>• Contact supérieur: 2.000 FCFA</li>
                    <li>• Lecture projet: 5.000 FCFA</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Base de Données</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Users</li>
                    <li>• Projects</li>
                    <li>• Salons</li>
                    <li>• NDA Contracts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow & Scénarios */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Workflow className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Workflow Utilisateur</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Parcours Utilisateur</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge>1</Badge>
                    <span>Création de compte</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>2</Badge>
                    <span>Upload des documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>3</Badge>
                    <span>Validation manuelle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>4</Badge>
                    <span>Accès aux salons</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Scénarios d'Usage</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Chercheur</h4>
                    <p className="text-gray-600">Propose un projet d'éducation numérique, visible par les ministères</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Freelance</h4>
                    <p className="text-gray-600">Rejoint le salon "Énergie renouvelable – Afrique Centrale"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stratégie de Lancement */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Rocket className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Stratégie de Lancement</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Cibles</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Chercheurs</li>
                    <li>• Entrepreneurs</li>
                    <li>• Ministères</li>
                    <li>• Incubateurs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Acquisition</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Webinaires</li>
                    <li>• Influenceurs tech</li>
                    <li>• Plateformes universitaires</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Offres de Lancement</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Accès premium gratuit</li>
                    <li>• 1 mois pour les premiers inscrits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 