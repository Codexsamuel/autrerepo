import { Info } from 'lucide-react';

export default function MarqueeBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-green-600 to-blue-700 text-white py-4 px-6 flex items-center overflow-hidden relative shadow-lg">
      <Info className="w-6 h-6 mr-4 flex-shrink-0 animate-pulse" />
      <div className="marquee whitespace-nowrap text-base font-semibold" aria-label="Compétences et modules de l'application DL Solutions">
        <span className="inline-block animate-marquee">
          🚀 Cette application est la preuve de nos compétences : SEO avancé, scraping multi-plateformes, e-commerce, CRM, dashboard, IA, API, design sur-mesure, accessibilité, PWA, sécurité, analytics, et plus encore. Tout est personnalisable et disponible pour votre entreprise. Contactez-nous pour une démo ou un projet sur-mesure ! 💼
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
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
} 