'use client';

import { Clock, Mail, Phone, Send, X } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Bonjour ! Je souhaite en savoir plus sur vos services DL Solutions.');
  const [isSending, setIsSending] = useState(false);

  const handleWhatsAppClick = () => {
    setIsOpen(true);
  };

  const handleSendMessage = () => {
    setIsSending(true);
    const phoneNumber = '694341586';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Simuler un délai pour l'effet visuel
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSending(false);
      setIsOpen(false);
      setMessage('Bonjour ! Je souhaite en savoir plus sur vos services DL Solutions.');
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessage('Bonjour ! Je souhaite en savoir plus sur vos services DL Solutions.');
  };

  return (
    <>
      {/* Bouton WhatsApp flottant */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-110 group border-2 border-green-400/30"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        
        {/* Enhanced Tooltip */}
        {isHovered && (
          <div className="absolute left-16 bottom-0 bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap shadow-2xl border border-white/20">
            Chat WhatsApp intégré
            <div className="absolute left-0 bottom-3 transform -translate-x-1 w-3 h-3 bg-black/90 rotate-45 border-l border-b border-white/20"></div>
          </div>
        )}
      </button>

      {/* Dialogue WhatsApp intégré */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-start p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Dialogue */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-gray-200 animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">DL Solutions</h3>
                    <p className="text-green-100 text-sm">En ligne maintenant</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="p-4 bg-gray-50 border-b">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-800 font-medium">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span>+237 694 341 586</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-800 font-medium">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span>contact@dlsolutions.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-800 font-medium">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Lun-Ven: 8h-18h</span>
                </div>
              </div>
            </div>

            {/* Zone de message */}
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Votre message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
                  rows={4}
                  placeholder="Tapez votre message ici..."
                />
              </div>

              {/* Bouton d'envoi */}
              <button
                onClick={handleSendMessage}
                disabled={isSending || !message.trim()}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer sur WhatsApp</span>
                  </>
                )}
              </button>

              {/* Message d'info */}
              <p className="text-xs text-gray-600 mt-3 text-center font-medium">
                En cliquant sur "Envoyer", vous serez redirigé vers WhatsApp
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 