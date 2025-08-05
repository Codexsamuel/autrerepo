import { Metadata } from 'next';
import ModernNavigation from '@/components/layout/ModernNavigation';
import { Brain, MessageSquare, Image, Video, FileText, ShoppingCart, Users, Zap, Shield, Globe, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services IA - Intelligence Artificielle, Chatbot, Assistant Virtuel | Solutions IA Avancées',
  description: 'Découvrez nos services IA spécialisés : chatbot intelligent, assistant virtuel, génération d\'images, analyse de données, automatisation. Solutions IA pour entreprises et particuliers.',
  keywords: 'services IA, intelligence artificielle, chatbot, assistant virtuel, génération d\'images, analyse de données, automatisation, IA conversationnelle, synthèse vocale, transformation d\'images, e-commerce IA, business intelligence, machine learning, deep learning, NLP, computer vision, automation, digital transformation',
  openGraph: {
    title: 'Services IA - Intelligence Artificielle & Solutions Automatisées',
    description: '30+ services IA spécialisés : chatbot, assistant virtuel, génération d\'images, analyse de données.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ServicesIAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ModernNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header SEO Optimisé */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Services IA - Intelligence Artificielle
            </h1>
            <p className="text-2xl text-gray-700 mb-4">
              Solutions IA Avancées pour Entreprises et Particuliers
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              Découvrez notre gamme complète de services d'intelligence artificielle : chatbot intelligent, 
              assistant virtuel, génération d'images, analyse de données, automatisation e-commerce.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/nova-ia"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <Brain className="w-6 h-6" />
                <span>Essayer Nos Services IA</span>
              </Link>
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                Demander un Devis
              </Link>
            </div>
          </div>

          {/* Services IA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Chatbot Intelligent */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="font-bold text-lg">Chatbot Intelligent</h3>
              </div>
              <p className="text-gray-600 mb-4">Assistant conversationnel avec compréhension contextuelle et personnalité adaptable</p>
              <div className="text-sm text-blue-600 font-semibold mb-4">Précision 94%</div>
              <Link href="/nova-ia" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                Essayer
              </Link>
            </div>

            {/* Génération d'Images */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Image className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="font-bold text-lg">Génération d'Images</h3>
              </div>
              <p className="text-gray-600 mb-4">Création d'images haute qualité pour marketing et design</p>
              <div className="text-sm text-purple-600 font-semibold mb-4">Qualité 4K</div>
              <Link href="/nova-ia" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700">
                Essayer
              </Link>
            </div>

            {/* Analyse de Données */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="font-bold text-lg">Analyse Prédictive</h3>
              </div>
              <p className="text-gray-600 mb-4">Prédictions business et insights stratégiques basés sur l'IA</p>
              <div className="text-sm text-green-600 font-semibold mb-4">Précision 89%</div>
              <Link href="/nova-ia" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
                Essayer
              </Link>
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à Transformer Votre Business avec l'IA ?
            </h2>
            <Link
              href="/nova-ia"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <Brain className="w-6 h-6" />
              <span>Commencer Maintenant</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 