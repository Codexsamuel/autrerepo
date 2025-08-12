'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Star, 
  Shield, 
  Zap, 
  X, 
  ArrowRight,
  MessageCircle,
  Users,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface NovaWorldPopupProps {
  onClose?: () => void;
}

const messages = [
  {
    icon: Sparkles,
    text: "💭 NovaWorld révolutionne l'accès aux services en Afrique...",
    color: "text-blue-600"
  },
  {
    icon: Users,
    text: "💭 Besoin d'un service ? Trouvez des prestataires vérifiés en 30 secondes !",
    color: "text-purple-600"
  },
  {
    icon: Shield,
    text: "💭 Vendez vos compétences et développez votre activité avec NovaWorld",
    color: "text-green-600"
  },
  {
    icon: Zap,
    text: "💭 Super App africaine : services domestiques, artisans, experts, livraison...",
    color: "text-orange-600"
  },
  {
    icon: Star,
    text: "💭 NovaWorld : votre partenaire de confiance pour tous vos besoins quotidiens",
    color: "text-pink-600"
  }
];

export default function NovaWorldPopup({ onClose }: NovaWorldPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 secondes

  useEffect(() => {
    // Afficher le popup après 2 minutes
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      setTimeLeft(60); // Réinitialiser le timer à 60 secondes
    }, 120000); // 2 minutes

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  // Changer le message toutes les 8 secondes quand le popup est visible
  useEffect(() => {
    if (!isVisible) return;

    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 8000);

    // Auto-disparition après 1 minute (60 secondes)
    const autoHideTimer = setTimeout(() => {
      handleClose();
    }, 60000);

    // Timer de compte à rebours
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(autoHideTimer);
      clearInterval(countdownTimer);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose?.();
    }, 300);
  };

  const handleGoToNovaWorld = () => {
    window.open('/novacore/novaworld', '_blank');
    handleClose();
  };

  if (!isVisible) return null;

  const currentMessage = messages[currentMessageIndex];
  const Icon = currentMessage.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <Card className={`border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white min-w-[320px] max-w-[400px] transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <CardContent className="p-4">
          {/* En-tête avec bouton fermer */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <Badge className="bg-white/20 text-white text-xs border-0">
                <Star className="w-3 h-3 mr-1" />
                NovaWorld
              </Badge>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClose}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Message principal */}
          <div className="mb-4">
            <div className="flex items-start space-x-3">
              <div className={`w-6 h-6 ${currentMessage.color} flex-shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-white text-sm leading-relaxed">
                {currentMessage.text}
              </p>
            </div>
          </div>

          {/* Fonctionnalités clés */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center space-x-2 text-xs text-blue-100">
              <CheckCircle className="w-3 h-3" />
              <span>Prestataires vérifiés et notés</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-blue-100">
              <CheckCircle className="w-3 h-3" />
              <span>Paiement sécurisé avec garantie</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-blue-100">
              <CheckCircle className="w-3 h-3" />
              <span>Urgence 24/7 et support client</span>
            </div>
          </div>

          {/* Bouton d'action */}
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              onClick={handleGoToNovaWorld}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold flex-1 mr-3"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Découvrir NovaWorld
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <div className="text-center">
              <div className="text-xs text-blue-100 mb-1">Disponible sur</div>
              <div className="flex items-center space-x-1 text-white">
                <Globe className="w-3 h-3" />
                <span className="text-xs font-semibold">Web & Mobile</span>
              </div>
            </div>
          </div>

                      {/* Indicateur de temps */}
            <div className="mt-3 pt-2 border-t border-white/20">
              <div className="flex items-center justify-center text-xs text-blue-100">
                <span>⏰ Disparaît dans {timeLeft}s • Réapparaît dans 2 minutes</span>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
} 