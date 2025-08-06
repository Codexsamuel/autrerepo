import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo/Header */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
        </div>

        {/* Message principal */}
        <h2 className="text-3xl font-bold text-white mb-4">
          Page introuvable
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Home className="mr-2 h-5 w-5" />
              Retour à l'accueil
            </Button>
          </Link>
          
          <Link href="/nova-ia">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Search className="mr-2 h-5 w-5" />
              Explorer NovaIA
            </Button>
          </Link>
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">
            Pages populaires
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <Link href="/services" className="text-blue-400 hover:text-blue-300 transition-colors">
              → Nos Services
            </Link>
            <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
              → Contact
            </Link>
            <Link href="/a-propos" className="text-blue-400 hover:text-blue-300 transition-colors">
              → À propos
            </Link>
            <Link href="/portfolio" className="text-blue-400 hover:text-blue-300 transition-colors">
              → Portfolio
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-gray-400 text-sm">
          <p>DL Solutions - Intelligence Artificielle & Innovation</p>
          <p className="mt-1">© 2025 Tous droits réservés</p>
        </div>
      </div>
    </div>
  );
} 