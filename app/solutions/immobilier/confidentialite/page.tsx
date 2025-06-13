"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Politique de confidentialité</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Dernière mise à jour : 1er janvier 2024
          </p>
        </div>

        {/* Contenu */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Collecte des données</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous collectons les informations suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                <li>Informations d'identification (nom, email, téléphone)</li>
                <li>Informations de compte (identifiants, préférences)</li>
                <li>Données de navigation (adresse IP, cookies)</li>
                <li>Informations immobilières (recherches, favoris)</li>
                <li>Communications avec les agents immobiliers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Utilisation des données</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous utilisons vos données pour :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                <li>Fournir et améliorer nos services</li>
                <li>Personnaliser votre expérience</li>
                <li>Communiquer avec vous</li>
                <li>Assurer la sécurité de la plateforme</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Protection des données</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous mettons en œuvre des mesures de sécurité pour protéger vos données :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                <li>Chiffrement des données sensibles</li>
                <li>Accès restreint aux données</li>
                <li>Surveillance régulière des systèmes</li>
                <li>Formation du personnel à la sécurité</li>
                <li>Audits de sécurité réguliers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Partage des données</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous pouvons partager vos données avec :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                <li>Les agents immobiliers (avec votre consentement)</li>
                <li>Nos prestataires de services</li>
                <li>Les autorités légales (si requis)</li>
                <li>Les partenaires commerciaux (avec votre consentement)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Vos droits</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
                <li>Droit de limitation du traitement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous utilisons des cookies pour :
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-2">
                <li>Améliorer votre expérience de navigation</li>
                <li>Analyser l'utilisation du site</li>
                <li>Personnaliser le contenu</li>
                <li>Mémoriser vos préférences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Modifications</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nous nous réservons le droit de modifier cette politique de confidentialité. Les modifications seront publiées sur cette page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Pour toute question concernant vos données personnelles, contactez notre délégué à la protection des données :
                <br />
                Email : privacy@example.com
                <br />
                Adresse : 123 rue de la Protection, 75000 Paris
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