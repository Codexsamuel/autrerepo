'use client';

import { CreditCard, FileText, HelpCircle, Mail, MessageCircle, Phone, Search, Shield, Truck, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  articles: number;
}

const helpCategories: HelpCategory[] = [
  {
    id: 'orders',
    title: 'Commandes',
    description: 'Suivi, annulation et modification de commandes',
    icon: FileText,
    color: 'blue',
    articles: 12
  },
  {
    id: 'shipping',
    title: 'Livraison',
    description: 'Options de livraison, délais et suivi',
    icon: Truck,
    color: 'green',
    articles: 8
  },
  {
    id: 'payment',
    title: 'Paiement',
    description: 'Moyens de paiement et facturation',
    icon: CreditCard,
    color: 'purple',
    articles: 6
  },
  {
    id: 'returns',
    title: 'Retours',
    description: 'Politique de retour et remboursement',
    icon: Shield,
    color: 'orange',
    articles: 10
  },
  {
    id: 'account',
    title: 'Compte',
    description: 'Gestion du compte et sécurité',
    icon: User,
    color: 'indigo',
    articles: 15
  }
];

const faqItems: FAQItem[] = [
  {
    id: '1',
    category: 'orders',
    question: 'Comment suivre ma commande ?',
    answer: 'Vous pouvez suivre votre commande en vous connectant à votre compte et en allant dans la section "Mes commandes". Vous recevrez également des emails de mise à jour à chaque étape de la livraison.',
    tags: ['commande', 'suivi', 'livraison']
  },
  {
    id: '2',
    category: 'shipping',
    question: 'Quels sont les délais de livraison ?',
    answer: 'Nos délais de livraison varient selon l\'option choisie : Livraison standard (3-5 jours), Livraison express (1-2 jours), Livraison premium (livraison le lendemain avant 12h).',
    tags: ['livraison', 'délais', 'express']
  },
  {
    id: '3',
    category: 'payment',
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et les paiements mobiles (Apple Pay, Google Pay).',
    tags: ['paiement', 'carte', 'paypal']
  },
  {
    id: '4',
    category: 'returns',
    question: 'Comment retourner un article ?',
    answer: 'Vous disposez de 30 jours pour retourner un article. Connectez-vous à votre compte, allez dans "Mes commandes" et sélectionnez l\'article à retourner. Nous vous enverrons une étiquette de retour prépayée.',
    tags: ['retour', 'remboursement', '30 jours']
  },
  {
    id: '5',
    category: 'account',
    question: 'Comment modifier mes informations personnelles ?',
    answer: 'Connectez-vous à votre compte et allez dans "Mon profil". Vous pourrez modifier vos informations personnelles, adresses et préférences.',
    tags: ['compte', 'profil', 'modification']
  },
  {
    id: '6',
    category: 'shipping',
    question: 'La livraison est-elle gratuite ?',
    answer: 'Oui, la livraison est gratuite pour toutes les commandes de plus de €50. Pour les commandes inférieures à €50, les frais de livraison sont de €4.99.',
    tags: ['livraison', 'gratuit', 'frais']
  }
];

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQ = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Centre d'aide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement des réponses à vos questions et obtenez l'aide dont vous avez besoin
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Catégories d'aide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 bg-white rounded-lg shadow-sm border-2 transition-all hover:shadow-md ${
                    selectedCategory === category.id ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getCategoryColor(category.color)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <p className="text-xs text-gray-500">{category.articles} articles</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Questions fréquentes
              {selectedCategory !== 'all' && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({filteredFAQ.length} résultats)
                </span>
              )}
            </h2>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Voir toutes les questions
              </button>
            )}
          </div>

          <div className="space-y-4">
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600 mb-3">{item.answer}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Effacer les filtres
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Besoin d'aide supplémentaire ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Appelez-nous</h3>
              <p className="text-sm text-gray-600 mb-3">
                Notre équipe est disponible du lundi au vendredi, 9h-18h
              </p>
              <p className="text-lg font-semibold text-blue-600">01 23 45 67 89</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Envoyez un email</h3>
              <p className="text-sm text-gray-600 mb-3">
                Réponse sous 24h en semaine
              </p>
              <a
                href="mailto:support@dlstyle.com"
                className="text-lg font-semibold text-green-600 hover:text-green-700"
              >
                support@dlstyle.com
              </a>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Chat en ligne</h3>
              <p className="text-sm text-gray-600 mb-3">
                Chat en direct avec notre équipe
              </p>
              <button className="text-lg font-semibold text-purple-600 hover:text-purple-700">
                Démarrer le chat
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              href="/dl-style/compte"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Mon compte
            </Link>
            <Link
              href="/dl-style/suivi"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Suivi de commande
            </Link>
            <Link
              href="/dl-style/panier"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Mon panier
            </Link>
            <Link
              href="/dl-style"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Retour à la boutique
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}