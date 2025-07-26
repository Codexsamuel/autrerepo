import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
    Award,
    BarChart3,
    Building,
    CheckCircle,
    DollarSign,
    Home,
    MapPin,
    Search,
    Shield,
    Smartphone,
    Star,
    TrendingUp,
    Users,
    Zap
} from "lucide-react";
import Link from "next/link";

export default function DLImmobilierPage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg')`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              DL-Immobilier
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              La plateforme immobilière de référence au Cameroun
            </p>
            <p className="text-lg md:text-xl mb-12 opacity-80">
              Location, vente, gestion immobilière • Appartements, maisons, villas, bureaux, terrains
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dl-immobilier/recherche">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Rechercher un Bien
                </Button>
              </Link>
              <Link href="/dl-immobilier/proprietaire/inscription">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Devenir Propriétaire Partenaire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Services Immobiliers
            </h2>
            <p className="text-xl text-gray-600">
              Solutions complètes pour tous vos besoins immobiliers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Location Immobilière</h3>
              <p className="text-gray-600 mb-6">
                Appartements, maisons, villas, bureaux meublés et non meublés. 
                Location courte et longue durée.
              </p>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Appartements meublés et non meublés
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Maisons et villas de standing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Bureaux et locaux commerciaux
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Terrains titrés et non titrés
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestion Locative</h3>
              <p className="text-gray-600 mb-6">
                Gestion complète de vos biens immobiliers. 
                Optimisation des revenus locatifs.
              </p>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Recherche et sélection de locataires
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Gestion administrative et comptable
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Maintenance et entretien
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Suivi des paiements
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Investissement Immobilier</h3>
              <p className="text-gray-600 mb-6">
                Conseils en investissement immobilier. 
                Maximisez votre rendement locatif.
              </p>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Études de marché et rentabilité
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Optimisation fiscale
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Gestion de portefeuille
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Accompagnement personnalisé
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types de Biens */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Types de Biens Immobiliers
            </h2>
            <p className="text-xl text-gray-600">
              Une large gamme de biens pour tous les besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Appartements</h3>
              <p className="text-sm text-gray-600 mb-3">
                Studios, T1, T2, T3, T4 et plus
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>• Meublés et non meublés</div>
                <div>• Avec ou sans balcon</div>
                <div>• Résidences sécurisées</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Maisons & Villas</h3>
              <p className="text-sm text-gray-600 mb-3">
                Maisons individuelles et villas
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>• De 2 à 6 chambres</div>
                <div>• Avec jardin ou terrasse</div>
                <div>• Garages inclus</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bureaux & Locaux</h3>
              <p className="text-sm text-gray-600 mb-3">
                Espaces professionnels
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>• Bureaux équipés</div>
                <div>• Locaux commerciaux</div>
                <div>• Entrepôts et stockage</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Terrains</h3>
              <p className="text-sm text-gray-600 mb-3">
                Terrains constructibles
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>• Terrains titrés</div>
                <div>• Terrains non titrés</div>
                <div>• Terrains agricoles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir DL-Immobilier ?
            </h2>
            <p className="text-xl text-gray-600">
              La plateforme immobilière la plus complète du Cameroun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sécurité Garantie</h3>
              <p className="text-gray-600">
                Biens vérifiés, propriétaires authentifiés, contrats sécurisés
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Qualité Premium</h3>
              <p className="text-gray-600">
                Images haute qualité, descriptions détaillées, visites virtuelles
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapidité</h3>
              <p className="text-gray-600">
                Réservation en ligne, paiement sécurisé, clés numériques
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support 24/7</h3>
              <p className="text-gray-600">
                Assistance téléphonique, chat en ligne, suivi personnalisé
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Devenez Propriétaire Partenaire DL-Immobilier
            </h2>
            <p className="text-xl opacity-90">
              Rejoignez notre réseau et maximisez vos revenus locatifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Frais fixe mensuel</h3>
              <p className="text-2xl font-bold mb-2">75.000 FCFA</p>
              <p className="text-sm opacity-80">Aucun pourcentage sur vos revenus</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Application dédiée</h3>
              <p className="text-lg mb-2">Dashboard propriétaire</p>
              <p className="text-sm opacity-80">Gestion complète de vos biens</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Services premium</h3>
              <p className="text-lg mb-2">Photographie professionnelle</p>
              <p className="text-sm opacity-80">Visites virtuelles incluses</p>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Avantages Propriétaire</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Frais mensuel fixe de 75.000 FCFA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Aucun pourcentage sur les loyers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Photographie professionnelle</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Visites virtuelles 360°</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Gestion locative complète</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Support technique prioritaire</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dl-immobilier/proprietaire/inscription">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Devenir Propriétaire Partenaire
                </Button>
              </Link>
              <Link href="/dl-immobilier/proprietaire/dashboard">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Espace Propriétaire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à Trouver Votre Bien Idéal ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Des milliers de biens immobiliers vous attendent sur DL-Immobilier
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dl-immobilier/recherche">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Rechercher un Bien
              </Button>
            </Link>
            <Link href="/dl-immobilier/proprietaire/inscription">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
              >
                <Home className="mr-2 h-5 w-5" />
                Louer Mon Bien
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DL-Immobilier</h3>
              <p className="text-gray-400">
                La plateforme immobilière de référence au Cameroun
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dl-immobilier/recherche" className="hover:text-white">Recherche de biens</Link></li>
                <li><Link href="/dl-immobilier/location" className="hover:text-white">Location</Link></li>
                <li><Link href="/dl-immobilier/vente" className="hover:text-white">Vente</Link></li>
                <li><Link href="/dl-immobilier/gestion" className="hover:text-white">Gestion locative</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Types de Biens</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dl-immobilier/appartements" className="hover:text-white">Appartements</Link></li>
                <li><Link href="/dl-immobilier/maisons" className="hover:text-white">Maisons & Villas</Link></li>
                <li><Link href="/dl-immobilier/bureaux" className="hover:text-white">Bureaux & Locaux</Link></li>
                <li><Link href="/dl-immobilier/terrains" className="hover:text-white">Terrains</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +237 XXX XXX XXX</li>
                <li>📧 contact@dl-immobilier.cm</li>
                <li>📍 Douala, Cameroun</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DL-Immobilier. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 