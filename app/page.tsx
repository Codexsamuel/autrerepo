"use client";

import { mediaConfig } from "@/app/config/media";
import AppointmentPopup from '@/components/appointment-popup';
import CookiesBanner from '@/components/cookies-banner';
import { EventVideoCard } from "@/components/event-video-card";
import FAQSection from '@/components/faq-section';
import ModernNavigation from '@/components/layout/ModernNavigation';
import MediaSection from '@/components/media-section';
import ContextualHelp from '@/components/onboarding/ContextualHelp';
import PrivacyMessage from '@/components/privacy-message';
import TestimonialsSection from '@/components/testimonials-section';
import MarqueeBanner from '@/components/ui/MarqueeBanner';
import { Button } from "@/components/ui/button";
import WhatsAppButton from '@/components/whatsapp-button';
import {
    ArrowRight,
    CheckCircle,
    Eye,
    EyeOff,
    Globe,
    Shield,
    Star,
    TrendingUp,
    User,
    Users,
    Zap
} from "lucide-react";
import Link from 'next/link';

// Types pour les services premium
interface PremiumService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
  features: string[];
  benefits: string[];
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  technologies: string[];
  pricing: {
    starter: string;
    professional: string;
    enterprise: string;
  };
}

const heroVideos = [
  {
    src: mediaConfig.heroVideos.digitalUniverse,
    alt: "Univers Digital Dave and Luce Solutions",
    overlay: "Univers Digital"
  },
  {
    src: mediaConfig.heroVideos.innovation,
    alt: "Innovation Technologique Dave and Luce", 
    overlay: "Innovation"
  },
  {
    src: mediaConfig.heroVideos.technology,
    alt: "Transformation Digitale Dave and Luce",
    overlay: "Transformation"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <ModernNavigation />
      
      {/* Bannière d'information */}
      <MarqueeBanner />
      
      {/* Section Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={heroVideos[0].src}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Dave & Luce Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Innovation Technologique & Transformation Digitale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Nos Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Nous Contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Services Premium */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Solutions Premium
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos services de pointe en intelligence artificielle, 
              développement web et transformation digitale
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Intelligence Artificielle</h3>
                  <span className="text-sm text-blue-600 font-medium">Premium</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Solutions IA avancées pour automatiser et optimiser vos processus métier
              </p>
              <Link href="/services/ia">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  En savoir plus
                </Button>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Développement Web</h3>
                  <span className="text-sm text-green-600 font-medium">Premium</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Applications web modernes et performantes avec les dernières technologies
              </p>
              <Link href="/services/web">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  En savoir plus
                </Button>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Transformation Digitale</h3>
                  <span className="text-sm text-purple-600 font-medium">Premium</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Accompagnement complet dans votre transformation digitale
              </p>
              <Link href="/services/transformation">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <TestimonialsSection />

      {/* Section FAQ */}
      <FAQSection />

      {/* Section Contact */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Prêt à Transformer Votre Entreprise ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous pour discuter de vos projets et découvrir nos solutions
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Commencer Maintenant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Composants UI */}
      <AppointmentPopup />
      <CookiesBanner />
      <PrivacyMessage />
      <WhatsAppButton />
      <ContextualHelp />
    </div>
  );
}
