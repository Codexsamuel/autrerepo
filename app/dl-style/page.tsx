'use client';

import { useEffect, useState } from 'react';

// Données statiques de fallback
const fallbackProducts = [
  {
    id: 1,
    name: "BYD Han EV - Berline Électrique Premium",
    description: "Berline électrique BYD Han avec autonomie de 605km, technologie Blade Battery",
    price: 53333.33,
    currency: "EUR",
    country: "🇨🇳 Chine",
    category: "Véhicules",
    rating: 4.8,
    reviews: 234,
    stock: 15,
    image: "/images/products/byd-han.jpg"
  },
  {
    id: 2,
    name: "NIO ES8 - SUV Électrique Luxueux",
    description: "SUV électrique NIO ES8 avec système de changement de batterie rapide",
    price: 113333.33,
    currency: "EUR",
    country: "🇨🇳 Chine",
    category: "Véhicules",
    rating: 4.9,
    reviews: 156,
    stock: 8,
    image: "/images/products/nio-es8.jpg"
  },
  {
    id: 3,
    name: "XPeng P7 - Berline Électrique Sportive",
    description: "Berline électrique XPeng P7 avec design futuriste et technologies avancées",
    price: 75000.00,
    currency: "EUR",
    country: "🇨🇳 Chine",
    category: "Véhicules",
    rating: 4.7,
    reviews: 189,
    stock: 12,
    image: "/images/products/xpeng-p7.jpg"
  },
  {
    id: 4,
    name: "Mercedes-Benz S-Class 2024 - Berline de Luxe",
    description: "Berline de luxe Mercedes-Benz S-Class avec technologies avancées",
    price: 200000.00,
    currency: "EUR",
    country: "🇨🇳 Chine",
    category: "Véhicules",
    rating: 4.9,
    reviews: 89,
    stock: 5,
    image: "/images/products/mercedes-s-class.jpg"
  },
  {
    id: 5,
    name: "Range Rover Sport 2024 - SUV Premium",
    description: "SUV premium Range Rover Sport avec capacités tout-terrain exceptionnelles",
    price: 141666.67,
    currency: "EUR",
    country: "🇨🇳 Chine",
    category: "Véhicules",
    rating: 4.7,
    reviews: 234,
    stock: 12,
    image: "/images/products/range-rover-sport.jpg"
  },
  {
    id: 6,
    name: "Tesla Model S Plaid - Berline Électrique Ultra-Performance",
    description: "Berline électrique Tesla Model S Plaid avec 0-100km/h en 2.1 secondes",
    price: 120000.00,
    currency: "EUR",
    country: "🇺🇸 États-Unis",
    category: "Véhicules",
    rating: 4.9,
    reviews: 567,
    stock: 20,
    image: "/images/products/tesla-model-s.jpg"
  }
];

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  country: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
}

export default function DLStylePage() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedCountry, setSelectedCountry] = useState('Tous');
  const [cart, setCart] = useState<Product[]>([]);

  // Essayer de charger depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.daveandlucesolutions.com/api/scraping/products');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data.length > 0) {
            setProducts(data.data);
          }
        }
      } catch (error) {
        console.log('Utilisation des données statiques');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    const matchesCountry = selectedCountry === 'Tous' || product.country.includes(selectedCountry);
    
    return matchesSearch && matchesCategory && matchesCountry;
  });

  // Ajouter au panier
  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  // Supprimer du panier
  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // Calculer le total du panier
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // Obtenir les catégories uniques
  const categories = ['Tous', ...Array.from(new Set(products.map(p => p.category)))];
  const countries = ['Tous', ...Array.from(new Set(products.map(p => p.country.split(' ')[1] || p.country)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="/images/dl-logo.jpg" 
                alt="DL Style" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">DL Style</h1>
                <p className="text-gray-600">Véhicules Premium & Électriques</p>
              </div>
            </div>
            
            {/* Panier */}
            <div className="relative">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                🛒 Panier ({cart.length})
              </button>
              {cart.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border p-4 z-50">
                  <h3 className="font-semibold mb-3">Votre Panier</h3>
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-gray-600 text-sm">{item.price.toLocaleString()} {item.currency}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>{cartTotal.toLocaleString()} EUR</span>
                    </div>
                    <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                      Commander
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Recherche */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Rechercher
              </label>
              <input
                type="text"
                placeholder="Nom du véhicule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📂 Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Pays */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🌍 Pays
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Statistiques */}
            <div className="flex items-end">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{filteredProducts.length}</p>
                <p className="text-sm text-gray-600">Véhicules trouvés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de produits */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des véhicules...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=DL+Style';
                    }}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="text-sm text-gray-500">{product.country}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-indigo-600">
                      {product.price.toLocaleString()} {product.currency}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      🛒 Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Message si aucun produit trouvé */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun véhicule trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">DL Style</h3>
              <p className="text-gray-400">
                Votre spécialiste en véhicules premium et électriques
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                📧 sobam@daveandlucesolutions.com<br />
                📞 +33 1 23 45 67 89
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">📘 Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">📷 Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">🐦 Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DL Style. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 