"use client";

import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

interface FeatureDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    label: string;
    description: string;
    icon: string;
  } | null;
  children?: ReactNode;
}

export default function FeatureDetailModal({ isOpen, onClose, feature, children }: FeatureDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!feature || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-[#0b0f17] rounded-2xl shadow-2xl w-full max-w-2xl p-8 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{feature.icon}</span>
            <h2 className="text-2xl font-bold text-white">{feature.label}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Contenu */}
        <div className="space-y-6">
          <p className="text-lg text-gray-300 leading-relaxed">
            {feature.description}
          </p>
          
          {/* Section technique */}
          <div className="bg-[#181f2a] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Spécifications techniques</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <span className="font-medium text-blue-400">Type:</span> Fonctionnalité avancée
              </div>
              <div>
                <span className="font-medium text-blue-400">Compatibilité:</span> Atlas X1
              </div>
              <div>
                <span className="font-medium text-blue-400">Activation:</span> Via interface
              </div>
              <div>
                <span className="font-medium text-blue-400">Sécurité:</span> Niveau militaire
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex gap-4 pt-4">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform">
              Demander une démo
            </button>
            <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
              Documentation
            </button>
          </div>
        </div>

        {children}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
} 