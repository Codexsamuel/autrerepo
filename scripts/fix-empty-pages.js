const fs = require('fs');
const path = require('path');

// Liste des pages à corriger avec leur contenu spécifique
const pagesToFix = [
  {
    path: 'app/novaworld/page.tsx',
    content: `'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Globe, Building, TrendingUp, Star, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function NovaWorldPage() {
  const stats = [
    { label: 'Membres actifs', value: '2,847', icon: Users },
    { label: 'Pays représentés', value: '45', icon: Globe },
    { label: 'Entreprises', value: '1,234', icon: Building },
    { label: 'Croissance mensuelle', value: '+12%', icon: TrendingUp }
  ];

  const features = [
    {
      title: 'Réseau professionnel',
      description: 'Connectez-vous avec des professionnels du monde entier',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Opportunités business',
      description: 'Découvrez de nouvelles opportunités commerciales',
      icon: Building,
      color: 'text-green-600'
    },
    {
      title: 'Formation continue',
      description: 'Accédez à des ressources et formations exclusives',
      icon: Star,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Communauté mondiale
            </Badge>
            <h1 className="text-5xl font-bold mb-6">NovaWorld</h1>
            <p className="text-xl opacity-90 mb-8">
              Rejoignez la communauté mondiale des professionnels DL Solutions. 
              Connectez-vous, partagez, grandissez ensemble.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Rejoindre la communauté
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Découvrir les événements
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à rejoindre NovaWorld ?
          </h2>
          <p className="text-gray-600 mb-8">
            Rejoignez des milliers de professionnels qui transforment leur carrière 
            et leur business avec DL Solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Créer mon compte
            </Button>
            <Button size="lg" variant="outline">
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    path: 'app/dl-style/outlet/page.tsx',
    content: `'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Tag, Clock, Star, Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function OutletPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tout', count: 156 },
    { id: 'vetements', name: 'Vêtements', count: 89 },
    { id: 'chaussures', name: 'Chaussures', count: 34 },
    { id: 'accessoires', name: 'Accessoires', count: 33 }
  ];

  const products = [
    {
      id: 1,
      name: 'T-shirt Premium',
      originalPrice: 89,
      salePrice: 45,
      discount: 49,
      image: '/images/products/tshirt-1.jpg',
      rating: 4.5,
      reviews: 128,
      category: 'vetements'
    },
    {
      id: 2,
      name: 'Sneakers Urban',
      originalPrice: 120,
      salePrice: 72,
      discount: 40,
      image: '/images/products/sneakers-1.jpg',
      rating: 4.3,
      reviews: 95,
      category: 'chaussures'
    },
    {
      id: 3,
      name: 'Sac à dos Style',
      originalPrice: 65,
      salePrice: 39,
      discount: 40,
      image: '/images/products/bag-1.jpg',
      rating: 4.7,
      reviews: 67,
      category: 'accessoires'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Tag className="w-8 h-8 mr-3" />
              <span className="text-lg font-medium">OUTLET</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Soldes Exceptionnelles</h1>
            <p className="text-xl opacity-90 mb-8">
              Jusqu'à -70% sur une sélection d'articles premium. 
              Des prix imbattables pour un style unique.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Fin des soldes dans 3 jours</span>
              </div>
              <div className="flex items-center">
                <ShoppingBag className="w-4 h-4 mr-2" />
                <span>{products.length} articles en promotion</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filtres */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-4">
                <div className="relative">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                  </div>
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    -{product.discount}%
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-red-600">{product.salePrice}€</span>
                  <span className="text-gray-400 line-through">{product.originalPrice}€</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.reviews})</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Button className="w-full" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ajouter au panier
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ne manquez pas ces offres !
          </h2>
          <p className="text-gray-600 mb-8">
            Les prix les plus bas de l'année. Profitez-en avant qu'il ne soit trop tard.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-red-600 to-pink-600">
            Voir tous les articles
          </Button>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    path: 'app/dl-style/deals/page.tsx',
    content: `'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Fire, Star, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const deals = [
    {
      id: 1,
      title: 'Flash Sale - T-shirts Premium',
      description: 'Collection limitée, prix cassés !',
      originalPrice: 89,
      salePrice: 29,
      discount: 67,
      timeLeft: '2h 15m',
      sold: 45,
      total: 100,
      image: '/images/deals/deal-1.jpg',
      category: 'vetements'
    },
    {
      id: 2,
      title: 'Sneakers Urban -50%',
      description: 'Les meilleures sneakers de la saison',
      originalPrice: 150,
      salePrice: 75,
      discount: 50,
      timeLeft: '5h 30m',
      sold: 23,
      total: 50,
      image: '/images/deals/deal-2.jpg',
      category: 'chaussures'
    },
    {
      id: 3,
      title: 'Accessoires Mode',
      description: 'Sacs et bijoux à prix réduits',
      originalPrice: 45,
      salePrice: 18,
      discount: 60,
      timeLeft: '1h 45m',
      sold: 67,
      total: 80,
      image: '/images/deals/deal-3.jpg',
      category: 'accessoires'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 mr-3" />
              <span className="text-lg font-medium">FLASH DEALS</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Offres Flash</h1>
            <p className="text-xl opacity-90 mb-8">
              Des offres exceptionnelles à durée limitée. 
              Dépêchez-vous, ces prix ne dureront pas !
            </p>
            
            {/* Compteur */}
            <div className="flex justify-center space-x-4 mb-8">
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">Heures</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm">Secondes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Deals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map(deal => (
            <Card key={deal.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-orange-200">
              <CardHeader className="p-6">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-lg mb-4 flex items-center justify-center">
                    <Zap className="w-16 h-16 text-orange-400" />
                  </div>
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    <Fire className="w-3 h-3 mr-1" />
                    -{deal.discount}%
                  </Badge>
                  <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {deal.timeLeft}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl mb-2">{deal.title}</CardTitle>
                <CardDescription className="mb-4">{deal.description}</CardDescription>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-red-600">{deal.salePrice}€</span>
                    <span className="text-gray-400 line-through ml-2">{deal.originalPrice}€</span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{deal.sold} vendus</span>
                    <span>{deal.total - deal.sold} restants</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 pt-0">
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Acheter maintenant
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ne manquez pas ces offres flash !
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Ces prix exceptionnels ne durent que quelques heures. 
            Profitez-en avant qu'il ne soit trop tard !
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600">
              Voir tous les deals
            </Button>
            <Button size="lg" variant="outline">
              S'abonner aux alertes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}`
  }
];

// Fonction pour créer le contenu d'une page
function createPageContent(pagePath) {
  const page = pagesToFix.find(p => p.path === pagePath);
  if (page) {
    return page.content;
  }
  
  // Template générique pour les autres pages
  return `'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Construction, ArrowRight, Star, Users, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Construction className="w-8 h-8 mr-3" />
              <span className="text-lg font-medium">En développement</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Page en cours de développement</h1>
            <p className="text-xl opacity-90 mb-8">
              Cette page est actuellement en cours de développement. 
              Nous travaillons dur pour vous offrir une expérience exceptionnelle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Retour à l'accueil
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Informations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Disponible bientôt</CardTitle>
              <CardDescription>
                Cette fonctionnalité sera disponible dans les prochaines semaines
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>Fonctionnalités premium</CardTitle>
              <CardDescription>
                Découvrez des outils avancés et des fonctionnalités exclusives
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle>Support expert</CardTitle>
              <CardDescription>
                Notre équipe est là pour vous accompagner dans votre projet
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Restez informé !
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour être informé de la sortie 
            de cette fonctionnalité et de nos dernières nouveautés.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              S'abonner à la newsletter
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                <ArrowRight className="w-4 h-4 mr-2" />
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}`;
}

// Fonction pour corriger une page
function fixPage(pagePath) {
  const fullPath = path.join(process.cwd(), pagePath);
  const content = createPageContent(pagePath);
  
  try {
    // Créer le dossier si nécessaire
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Écrire le contenu
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Page corrigée : ${pagePath}`);
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${pagePath}:`, error.message);
  }
}

// Liste des pages vides à corriger
const emptyPages = [
  'app/novaworld/page.tsx',
  'app/novaworld/feed/page.tsx',
  'app/novaworld/jobs/page.tsx',
  'app/novaworld/companies/page.tsx',
  'app/novaworld/network/page.tsx',
  'app/dl-style/outlet/page.tsx',
  'app/dl-style/deals/page.tsx',
  'app/dl-style/meilleures-ventes/page.tsx',
  'app/dl-style/nouveautes/page.tsx',
  'app/dl-style/categories/high-tech/page.tsx',
  'app/dl-style/categories/mode/homme/t-shirts/page.tsx',
  'app/novacore/dl-hospitality/page.tsx',
  'app/novacore/novaworld/social/page.tsx',
  'app/novacore/novaworld/social/messages/page.tsx',
  'app/novacore/novaworld/social/jobs/page.tsx',
  'app/novacore/novaworld/social/rooms/page.tsx',
  'app/novacore/novaworld/social/network/page.tsx',
  'app/novacore/novaworld/social/moderation/page.tsx',
  'app/novacore/novaworld/social/defense/page.tsx',
  'app/novacore/novaworld/social/security-council/page.tsx',
  'app/novacore/novaworld/vision/page.tsx',
  'app/novacore/dl-community-manager/page.tsx',
  'app/novacore/dl-community-manager/auto-crm/page.tsx',
  'app/novacore/dl-community-manager/media-editor/page.tsx',
  'app/novacore/dl-cursor/superadmin/page.tsx',
  'app/novacore/auth/signin/page.tsx',
  'app/solutions/crm/ia-assistant/page.tsx',
  'app/solutions/hospitalier/tableau-de-bord/page.tsx',
  'app/solutions/immobilier/page.tsx',
  'app/solutions/immobilier/layout.tsx',
  'app/solutions/immobilier/agents/page.tsx',
  'app/solutions/immobilier/visites/page.tsx',
  'app/solutions/immobilier/taches/page.tsx',
  'app/solutions/immobilier/documents/page.tsx',
  'app/solutions/immobilier/utilisateurs/page.tsx',
  'app/solutions/immobilier/parametres/page.tsx',
  'app/solutions/immobilier/rapports/page.tsx',
  'app/demo/dl-travel/signup/page.tsx',
  'app/demo/salesforce/page.tsx',
  'app/formations/[slug]/inscription/page.tsx',
  'app/formations/[slug]/confirmation/page.tsx',
  'app/formations/[slug]/paiement/page.tsx'
];

// Exécuter les corrections
console.log('🚀 Début de la correction des pages vides...\n');

emptyPages.forEach(pagePath => {
  fixPage(pagePath);
});

console.log('\n✅ Correction terminée !');
console.log(`📊 ${emptyPages.length} pages ont été corrigées.`); 