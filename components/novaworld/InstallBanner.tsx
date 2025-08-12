'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  X, 
  Smartphone, 
  Star, 
  Shield, 
  Globe,
  CheckCircle
} from 'lucide-react';

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<InstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as InstallPromptEvent);
      setShowBanner(true);
    };

    // Écouter l'événement appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Afficher la bannière après un délai si pas d'événement prompt
    const timer = setTimeout(() => {
      if (!deferredPrompt && !isInstalled) {
        setShowBanner(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [deferredPrompt, isInstalled]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowBanner(false);
      }
    } else {
      // Rediriger vers la page d'installation
      window.location.href = '/novacore/novaworld/install';
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Stocker la préférence utilisateur
    localStorage.setItem('novaworld-install-dismissed', 'true');
  };

  // Ne pas afficher si déjà installée ou si l'utilisateur a fermé la bannière
  if (isInstalled || !showBanner || localStorage.getItem('novaworld-install-dismissed') === 'true') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">📱 Installer NovaWorld</h3>
                <p className="text-blue-100 text-sm">
                  Accès rapide à tous vos services depuis l'écran d'accueil
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                onClick={handleInstallClick}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Installer
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Fonctionnalités PWA */}
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="flex items-center justify-center space-x-6 text-xs text-blue-100">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span>Hors ligne</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Sécurisé</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>Gratuit</span>
              </div>
              <div className="flex items-center space-x-1">
                <Smartphone className="w-3 h-3" />
                <span>PWA</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 