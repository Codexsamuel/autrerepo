import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "29,900",
    period: "mois",
    description: "Parfait pour les petites entreprises",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    popular: false,
    features: [
      "Jusqu'à 100 clients",
      "5 utilisateurs inclus",
      "Dashboard basique",
      "Support email",
      "Rapports mensuels",
      "Stockage 5GB",
    ],
    limitations: ["Pas d'IA avancée", "Intégrations limitées"],
  },
  {
    name: "Professional",
    price: "79,900",
    period: "mois",
    description: "Pour les entreprises en croissance",
    icon: Star,
    color: "from-purple-500 to-pink-500",
    popular: true,
    features: [
      "Clients illimités",
      "15 utilisateurs inclus",
      "IA de surveillance",
      "Studio IA basique",
      "Support prioritaire",
      "Rapports avancés",
      "Stockage 50GB",
      "API access",
      "Intégrations tierces",
    ],
    limitations: [],
  },
  {
    name: "Enterprise",
    price: "199,900",
    period: "mois",
    description: "Solution complète pour grandes entreprises",
    icon: Crown,
    color: "from-amber-500 to-orange-500",
    popular: false,
    features: [
      "Tout du Professional",
      "Utilisateurs illimités",
      "IA complète + Studio",
      "Support 24/7 dédié",
      "Rapports personnalisés",
      "Stockage illimité",
      "White-label",
      "Formation sur site",
      "SLA garanti 99.9%",
    ],
    limitations: [],
  },
  {
    name: "Custom",
    price: "Sur devis",
    period: "",
    description: "Solution sur mesure",
    icon: Rocket,
    color: "from-green-500 to-emerald-500",
    popular: false,
    features: [
      "Développement sur mesure",
      "Intégrations spécifiques",
      "Infrastructure dédiée",
      "Support technique dédié",
      "Formation complète",
      "Maintenance incluse",
    ],
    limitations: [],
  },
]

const addons = [
  {
    name: "Utilisateurs supplémentaires",
    price: "9,900",
    unit: "utilisateur/mois",
    description: "Ajoutez des utilisateurs à votre plan",
  },
  {
    name: "Stockage supplémentaire",
    price: "2,900",
    unit: "10GB/mois",
    description: "Espace de stockage additionnel",
  },
  {
    name: "Formation avancée",
    price: "150,000",
    unit: "session",
    description: "Formation sur site de 2 jours",
  },
  {
    name: "Support premium",
    price: "49,900",
    unit: "mois",
    description: "Support téléphonique 24/7",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700">Tarification Transparente</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Choisissez votre plan
            <span className="block text-blue-600">NovaCore</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions adaptées à chaque taille d'entreprise en Côte d'Ivoire. Commencez gratuitement avec notre
            essai de 14 jours.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "ring-2 ring-purple-500 scale-105" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500 text-white px-4 py-1">Plus Populaire</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                >
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600"> FCFA/{plan.period}</span>}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <li key={limitIndex} className="flex items-center opacity-60">
                      <span className="h-4 w-4 mr-3 flex-shrink-0 text-gray-400">×</span>
                      <span className="text-sm text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.name === "Custom" ? "Nous Contacter" : "Commencer l'essai"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Options Supplémentaires</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <div className="text-2xl font-bold text-blue-600">
                    {addon.price} FCFA
                    <div className="text-sm text-gray-600 font-normal">{addon.unit}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Questions Fréquentes</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="text-left">
              <h3 className="font-semibold mb-2">Puis-je changer de plan à tout moment ?</h3>
              <p className="text-gray-600 text-sm">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet
                immédiatement.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Y a-t-il des frais de configuration ?</h3>
              <p className="text-gray-600 text-sm">
                Non, aucun frais de configuration. Nous incluons même la migration de vos données existantes.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Acceptez-vous les paiements Mobile Money ?</h3>
              <p className="text-gray-600 text-sm">
                Oui, nous acceptons Orange Money, MTN Money, et les virements bancaires locaux.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Le support est-il inclus ?</h3>
              <p className="text-gray-600 text-sm">
                Oui, tous nos plans incluent le support. Le niveau varie selon votre plan.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre entreprise ?</h2>
          <p className="text-gray-600 mb-8">Rejoignez plus de 500 entreprises ivoiriennes qui nous font confiance</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Essai Gratuit 14 Jours
            </Button>
            <Button size="lg" variant="outline">
              Demander une Démo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
