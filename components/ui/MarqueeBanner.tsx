import { Info } from 'lucide-react';

export default function MarqueeBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-green-600 to-blue-700 text-white py-4 px-6 flex items-center overflow-hidden relative shadow-lg">
      <Info className="w-6 h-6 mr-4 flex-shrink-0 animate-pulse" />
      <div className="marquee whitespace-nowrap text-base font-semibold" aria-label="Services et solutions de DL Solutions">
        <span className="inline-block animate-marquee">
          🚀 DL Solutions - Services Complets : NovaWorld (Réseau Social B2B) • DL Style (E-commerce Mode) • DL Travel (Billets d'Avion) • DL Bookmaker (Paris Sportifs) • DL Immobilier (Gestion Locative) • DL Transport (Logistique) • Drones (Surveillance & Sécurité) • IA & Chatbots • CRM/ERP • Formations Certifiantes • Développement Web • Applications Mobiles • SEO & Marketing Digital • Solutions Cloud • Cybersécurité • Analytics Avancés • API & Intégrations • Design UX/UI • Support 24/7 • Contactez-nous pour une démo gratuite ! 💼
        </span>
      </div>
      <style jsx>{`
        .marquee {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 35s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
} 