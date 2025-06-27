import Link from "next/link"
import { ChevronRight, Star, ShoppingCart, Heart, Filter } from "lucide-react"


export default function OrdinateursGamingPage() {
  // Données des produits (ordinateurs gaming)
  const products = [
    {
      id: 201,
      name: "Predator X9000",
      brand: "GameMaster",
      price: 2499.99,
      oldPrice: 2799.99,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=200&width=300",
      specs: {
        processor: "Intel Core i9 12th Gen",
        ram: "32 Go DDR5",
        storage: "SSD 2 To NVMe",
        graphics: "NVIDIA RTX 4080 16 Go",
      },
      inStock: true,
      features: ["RGB Lighting", "Liquid Cooling", "Wi-Fi 6E"],
    },
    {
      id: 202,
      name: "Viper Strike Pro",
      brand: "BattleTech",
      price: 1899.99,
      oldPrice: null,
      rating: 4.7,
      reviews: 98,
      image: "/placeholder.svg?height=200&width=300",
      specs: {
        processor: "AMD Ryzen 9 7900X",
        ram: "32 Go DDR5",
        storage: "SSD 1 To NVMe",
        graphics: "NVIDIA RTX 4070 12 Go",
      },
      inStock: true,
      features: ["RGB Lighting", "Air Cooling", "Wi-Fi 6"],
    },
    {
      id: 203,
      name: "Titan Extreme",
      brand: "UltraGaming",
      price: 3299.99,
      oldPrice: 3599.99,
      rating: 4.9,
      reviews: 76,
      image: "/placeholder.svg?height=200&width=300",
      specs: {
        processor: "Intel Core i9 13900K",
        ram: "64 Go DDR5",
        storage: "SSD 4 To NVMe",
        graphics: "NVIDIA RTX 4090 24 Go",
      },
      inStock: false,
      features: ["RGB Lighting", "Custom Water Cooling", "Wi-Fi 6E", "Thunderbolt 4"],
    },
    {
      id: 204,
      name: "Stealth Gaming",
      brand: "NinjaPC",
      price: 1499.99,
      oldPrice: 1699.99,
      rating: 4.5,
      reviews: 112,
      image: "/placeholder.svg?height=200&width=300",
      specs: {
        processor: "AMD Ryzen 7 7700X",
        ram: "16 Go DDR5",
        storage: "SSD 1 To NVMe",
        graphics: "NVIDIA RTX 4060 Ti 8 Go",
      },
      inStock: true,
      features: ["Compact Design", "Air Cooling", "Wi-Fi 6"],
    },
    {
      id: 205,
      name: "Fusion Gaming Pro",
      brand: "ElementTech",
      price: 2099.99,
      oldPrice: null,
      rating: 4.6,
      reviews: 87,
      image: "/placeholder.svg?height=200&width=300",
      specs: {
        processor: "Intel Core i7 13700K",
        ram: "32 Go DDR5",
        storage: "SSD 2 To NVMe",
        graphics: "NVIDIA RTX 4070 Ti 12 Go",
      },
      inStock: true,
      features: ["RGB Lighting", "AIO Liquid Cooling", "Wi-Fi 6E"],
    },
    {
      id: 206,
      name: "Budget Gamer",
      brand: "ValueTech",
      price: 999.99,
      oldPrice: 1099.99,
      rating: 4.3,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=300",
      specs: {
        processor: "AMD Ryzen 5 7600X",
        ram: "16 Go DDR5",
        storage: "SSD 1 To NVMe",
        graphics: "NVIDIA RTX 4060 8 Go",
      },
      inStock: true,
      features: ["RGB Lighting", "Air Cooling", "Wi-Fi 6"],
    },
  ]

  // Filtres disponibles
  const filters = [
    {
      name: "Marque",
      options: ["GameMaster", "BattleTech", "UltraGaming", "NinjaPC", "ElementTech", "ValueTech"],
    },
    {
      name: "Processeur",
      options: ["Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9"],
    },
    {
      name: "Carte graphique",
      options: ["RTX 4060", "RTX 4060 Ti", "RTX 4070", "RTX 4070 Ti", "RTX 4080", "RTX 4090"],
    },
    {
      name: "RAM",
      options: ["16 Go", "32 Go", "64 Go"],
    },
    {
      name: "Refroidissement",
      options: ["Air Cooling", "AIO Liquid Cooling", "Custom Water Cooling"],
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
        <Link href="/dl-style/categories/high-tech/ordinateurs" className="hover:text-primary">
          Ordinateurs
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">Ordinateurs Gaming</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Ordinateurs Gaming</h1>
      <p className="text-gray-600 mb-8">Découvrez notre sélection d'ordinateurs surpuissants pour les gamers</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filtres */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="sticky top-4 bg-white p-4 border rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filtres</h2>
              <Filter className="h-5 w-5 text-gray-500" />
            </div>

            {filters.map((filter) => (
              <div key={filter.name} className="mb-4">
                <h3 className="font-medium mb-2">{filter.name}</h3>
                <div className="space-y-1">
                  {filter.options.map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option.replace(/\s+/g, "-").toLowerCase()}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={option.replace(/\s+/g, "-").toLowerCase()} className="ml-2 text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-2 border-t">
              <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors">
                Appliquer les filtres
              </button>
            </div>
          </div>
        </div>

        {/* Liste des produits */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Affichage de <span className="font-medium">{products.length}</span> produits
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Trier par:</span>
              <select className="text-sm border rounded-md p-1">
                <option>Popularité</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={`/dl-style/produit/${product.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {product.oldPrice && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </div>
                    )}
                    <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-gray-100">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </Link>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                  <Link href={`/dl-style/produit/${product.id}`}>
                    <h2 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{product.name}</h2>
                  </Link>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-xs text-gray-500">{product.reviews} avis</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 mb-2">
                    <div>{product.specs.processor}</div>
                    <div>
                      {product.specs.ram} • {product.specs.storage}
                    </div>
                    <div>{product.specs.graphics}</div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xl font-bold text-primary">{product.price.toLocaleString()} €</div>
                      {product.oldPrice && (
                        <div className="text-sm text-gray-500 line-through">{product.oldPrice.toLocaleString()} €</div>
                      )}
                    </div>
                    <button
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
                        product.inStock
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      } transition-colors`}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>{product.inStock ? "Ajouter" : "Indisponible"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-50">Précédent</button>
              <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
              <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50">3</button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50">5</button>
              <button className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-50">Suivant</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
