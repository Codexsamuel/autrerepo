import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function OrdinateursPage() {
  // Données des catégories d'ordinateurs
  const categories = [
    {
      id: "portables",
      name: "Ordinateurs Portables",
      description: "Découvrez notre gamme d'ordinateurs portables pour tous les besoins",
      image: "/placeholder.svg?height=200&width=300",
      count: 124,
    },
    {
      id: "bureau",
      name: "Ordinateurs de Bureau",
      description: "Des PC de bureau puissants pour le travail et les loisirs",
      image: "/placeholder.svg?height=200&width=300",
      count: 87,
    },
    {
      id: "gaming",
      name: "Ordinateurs Gaming",
      description: "Des machines surpuissantes pour les joueurs exigeants",
      image: "/placeholder.svg?height=200&width=300",
      count: 56,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/dl-style" className="hover:text-primary">
          Accueil
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/dl-style/categories" className="hover:text-primary">
          Catégories
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/dl-style/categories/high-tech" className="hover:text-primary">
          High-Tech
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">Ordinateurs</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Ordinateurs</h1>
      <p className="text-gray-600 mb-8">Découvrez notre sélection d'ordinateurs pour tous les usages</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/dl-style/categories/high-tech/ordinateurs/${category.id}`} className="group">
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h2>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{category.count} produits</span>
                  <span className="text-primary font-medium group-hover:underline">Voir plus</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Conseils d'achat</h2>
        <p className="text-gray-700 mb-4">
          Choisir le bon ordinateur peut être complexe. Voici quelques conseils pour vous aider à faire le bon choix :
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Pour une utilisation bureautique, privilégiez un processeur récent et au moins 8 Go de RAM</li>
          <li>Pour le gaming, optez pour une carte graphique dédiée et un minimum de 16 Go de RAM</li>
          <li>Pour les créatifs, choisissez un écran de qualité avec une bonne reproduction des couleurs</li>
          <li>Pensez au stockage : un SSD offre des performances bien supérieures à un disque dur classique</li>
        </ul>
      </div>
    </div>
  )
}
