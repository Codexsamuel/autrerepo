import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
    BarChart3,
    Bot,
    Building,
    CheckCircle,
    DollarSign,
    Download,
    Home,
    MapPin,
    MessageCircle,
    Search,
    Shield,
    Smartphone,
    TrendingUp,
    Users,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from 'react';

export default function DLImmobilierPage() {
  const { isAuthenticated } = useAuth();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  return (
    <div className="min-h-screen">
      {/* Hero Section avec Vidéo Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Vidéo Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg"
        >
          <source src="https://res.cloudinary.com/dko5sommz/video/upload/v1753569945/b276e62653f84a7b4372bc5bc2612521_tc2nth.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Contenu Hero */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              DL-Immobilier
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              L'Intelligence Artificielle au Service de l'Immobilier
            </p>
            <p className="text-lg md:text-xl mb-12 opacity-80">
              Plus besoin d'agents immobiliers • Chatbot IA • Recherche intelligente • Vérification locataires
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/dl-immobilier/chatbot">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
                >
                  <Bot className="mr-2 h-5 w-5" />
                  Parler à l'IA
                </Button>
              </Link>
              <Link href="/dl-immobilier/recherche">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Rechercher un Bien
                </Button>
              </Link>
            </div>

            {/* Téléchargement Vidéo */}
            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = 'https://res.cloudinary.com/dko5sommz/video/upload/v1753569945/b276e62653f84a7b4372bc5bc2612521_tc2nth.mp4';
                  link.download = 'dl-immobilier-hero.mp4';
                  link.click();
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger la Vidéo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot IA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Chatbot IA Immobilier
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Exprimez vos besoins à notre IA et recevez des propositions personnalisées sous 24h. 
              Plus besoin d'agents immobiliers ou de visites inutiles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Comment ça marche ?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Exprimez vos besoins</h4>
                      <p className="text-sm text-gray-600">Quartier, ville, budget, exigences spécifiques</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">IA analyse et recherche</h4>
                      <p className="text-sm text-gray-600">Notre IA parcourt tous nos biens disponibles</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Réponse sous 24h</h4>
                      <p className="text-sm text-gray-600">Propositions personnalisées par email/SMS</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Vérification Locataires
                </h3>
                <p className="text-gray-600 mb-4">
                  Nous vérifions l'identité, l'emploi et les informations des locataires pour garantir la bonne moralité.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Vérification d'identité complète
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Contrôle de l'emploi et des revenus
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Nombre de personnes à loger
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Historique de location
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Démo Chatbot IA</h3>
                <p className="text-gray-600">Testez notre assistant immobilier</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Vous :</strong> "Je cherche un appartement 3 chambres à Douala, quartier Akwa, budget 200.000 FCFA/mois"
                  </p>
                </div>
                
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>IA DL-Immobilier :</strong> "Parfait ! J'ai trouvé 5 appartements qui correspondent à vos critères. Je vous envoie les détails par email dans les 24h."
                  </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Vous :</strong> "Super ! J'aimerais aussi un garage et la climatisation"
                  </p>
                </div>
                
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>IA DL-Immobilier :</strong> "Excellent ! J'ai filtré et trouvé 2 appartements avec garage et climatisation. Détails à venir !"
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link href="/dl-immobilier/chatbot">
                  <Button className="w-full">
                    <Bot className="mr-2 h-4 w-4" />
                    Commencer la Conversation
                  </Button>
                </Link>
              </div>
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

      {/* Types de Biens avec Nouvelles Images */}
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

      {/* Galerie d'Images */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Biens en Images
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez la qualité de nos biens immobiliers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1753569023/villa1_sdghrk.jpg" 
                alt="Villa de standing" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Villa de Standing</h3>
                  <p className="text-sm opacity-90">Douala, Bonanjo</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1753569023/villa2_exqt6v.jpg" 
                alt="Villa moderne" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Villa Moderne</h3>
                  <p className="text-sm opacity-90">Yaoundé, Centre-ville</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1753569020/villa3_xuwdg1.jpg" 
                alt="Villa avec piscine" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Villa avec Piscine</h3>
                  <p className="text-sm opacity-90">Douala, Akwa</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1753569025/bureau1_jzbkul.webp" 
                alt="Bureau moderne" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Bureau Moderne</h3>
                  <p className="text-sm opacity-90">Douala, Centre-ville</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1753569019/bureau2_h69wdb.jpg" 
                alt="Espace de travail" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Espace de Travail</h3>
                  <p className="text-sm opacity-90">Yaoundé, Quartier des affaires</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1753569019/bureau3_qikyyv.jpg" 
                alt="Local commercial" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Local Commercial</h3>
                  <p className="text-sm opacity-90">Douala, Zone commerciale</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1753569021/terrain1_r0kld3.jpg" 
                alt="Terrain constructible" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Terrain Constructible</h3>
                  <p className="text-sm opacity-90">Douala, Zone en développement</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1753569042/terrain2_zchtj0.jpg" 
                alt="Terrain titré" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Terrain Titré</h3>
                  <p className="text-sm opacity-90">Yaoundé, Zone résidentielle</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1753569019/meubler_g8oizt.jpg" 
                alt="Appartement meublé" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Appartement Meublé</h3>
                  <p className="text-sm opacity-90">Douala, Akwa</p>
                </div>
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
              La plateforme immobilière la plus avancée du Cameroun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">IA Intelligente</h3>
              <p className="text-gray-600">
                Chatbot IA pour des recherches personnalisées et rapides
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sécurité Garantie</h3>
              <p className="text-gray-600">
                Vérification complète des locataires et propriétaires
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapidité</h3>
              <p className="text-gray-600">
                Réponse sous 24h, plus besoin d'agents immobiliers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support 24/7</h3>
              <p className="text-gray-600">
                Assistance téléphonique et chat en ligne
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locataires Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Trouvez Votre Logement Idéal
            </h2>
            <p className="text-xl opacity-90">
              Inscription simple et rapide pour les locataires
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Frais d'Inscription</h3>
              <p className="text-3xl font-bold mb-2">5.000 FCFA</p>
              <p className="text-lg mb-6">Inscription unique + 2 mois d'abonnement</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-3">Ce qui est inclus :</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      Accès à tous nos biens
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      Chatbot IA personnalisé
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      Visites virtuelles
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      Support 24/7
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Paiement :</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white/20 p-2 rounded">
                      <span className="font-semibold">Mobile Money:</span>
                      <p className="font-mono">694341586</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded">
                      <span className="font-semibold">Bancaire:</span>
                      <p className="font-mono text-xs">10039100290027774160164</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/dl-immobilier/locataire/inscription">
                  <Button 
                    size="lg" 
                    className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    S'inscrire comme Locataire
                  </Button>
                </Link>
              </div>
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
              Rejoignez notre réseau et maximisez vos revenus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Option 1: Pourcentage</h3>
              <p className="text-2xl font-bold mb-2">20% du loyer total</p>
              <p className="text-sm opacity-80">Pour location 12 mois + caution</p>
              <p className="text-xs opacity-70 mt-2">Inclut tous nos services premium</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Option 2: Abonnement</h3>
              <p className="text-2xl font-bold mb-2">100.000 FCFA</p>
              <p className="text-sm opacity-80">Tous les 3 mois</p>
              <p className="text-xs opacity-70 mt-2">Frais fixe, pas de pourcentage</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Informations de Paiement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Mobile Money</h4>
                <p className="text-lg font-mono bg-white/20 p-2 rounded">694341586</p>
                <p className="text-sm opacity-80 mt-1">Orange Money / MTN Mobile Money</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Compte Bancaire</h4>
                <p className="text-lg font-mono bg-white/20 p-2 rounded">10039100290027774160164</p>
                <p className="text-sm opacity-80 mt-1">CCA Bank - DAVE AND LUCE SOLUTIONS SARL</p>
                <p className="text-xs opacity-70">Ngoa Ekelle, Yaoundé</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Avantages Propriétaire</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Deux options de paiement flexibles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">20% du loyer ou 100.000 FCFA/3 mois</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Photographie professionnelle incluse</span>
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
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Paiement Mobile Money ou Bancaire</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Vérification locataires incluse</span>
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
            Parlez à notre IA et recevez des propositions personnalisées sous 24h
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dl-immobilier/chatbot">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
              >
                <Bot className="mr-2 h-5 w-5" />
                Parler à l'IA
              </Button>
            </Link>
            <Link href="/dl-immobilier/recherche">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Rechercher un Bien
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
                L'Intelligence Artificielle au Service de l'Immobilier
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dl-immobilier/chatbot" className="hover:text-white">Chatbot IA</Link></li>
                <li><Link href="/dl-immobilier/recherche" className="hover:text-white">Recherche de biens</Link></li>
                <li><Link href="/dl-immobilier/location" className="hover:text-white">Location</Link></li>
                <li><Link href="/dl-immobilier/vente" className="hover:text-white">Vente</Link></li>
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