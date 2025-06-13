"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Conditions d'utilisation</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Dernière mise à jour : 1er janvier 2024
          </p>
        </div>

        {/* Contenu */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptation des conditions</h2>
              <p className="text-gray-600 dark:text-gray-400">
                En accédant et en utilisant notre plateforme immobilière, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Description du service</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Notre plateforme permet aux utilisateurs de :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                <li>Rechercher des biens immobiliers</li>
                <li>Publier des annonces immobilières</li>
                <li>Contacter des agents immobiliers</li>
                <li>Gérer leurs favoris et recherches</li>
                <li>Accéder à des outils de gestion immobilière</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Inscription et compte</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Pour utiliser certaines fonctionnalités de notre plateforme, vous devez créer un compte. Vous êtes responsable de :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                <li>Fournir des informations exactes et à jour</li>
                <li>Maintenir la confidentialité de votre compte</li>
                <li>Signaler toute utilisation non autorisée</li>
                <li>Respecter les règles de conduite en ligne</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Propriété intellectuelle</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tout le contenu présent sur notre plateforme (textes, images, logos, etc.) est protégé par des droits d'auteur et autres droits de propriété intellectuelle. Vous ne pouvez pas :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                <li>Copier ou reproduire le contenu sans autorisation</li>
                <li>Modifier ou créer des œuvres dérivées</li>
                <li>Utiliser le contenu à des fins commerciales</li>
                <li>Supprimer les mentions de propriété</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Confidentialité</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous collectons et traitons vos données personnelles conformément à notre politique de confidentialité. En utilisant notre service, vous acceptez notre politique de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Limitation de responsabilité</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Notre plateforme est fournie "telle quelle". Nous ne garantissons pas :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                <li>La disponibilité continue du service</li>
                <li>L'exactitude des informations publiées</li>
                <li>La qualité des biens immobiliers</li>
                <li>La fiabilité des agents immobiliers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Modifications</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Pour toute question concernant ces conditions, veuillez nous contacter à :
                <br />
                Email : contact@example.com
                <br />
                Téléphone : +33 1 23 45 67 89
              </p>
            </section>
          </CardContent>
        </Card>

        {/* Bouton de retour */}
        <div className="text-center">
          <Link href="/solutions/immobilier/inscription">
            <Button variant="outline">Retour à l'inscription</Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 