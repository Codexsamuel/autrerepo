"use client";

import { eventVideos, teamMembers } from "@/app/config/media";
import AppointmentPopup from '@/components/appointment-popup';
import CookiesBanner from '@/components/cookies-banner';
import { EventVideoCard } from "@/components/event-video-card";
import FAQSection from '@/components/faq-section';
import ModernNavigation from '@/components/layout/ModernNavigation';
import MediaSection from '@/components/media-section';
import ContextualHelp from '@/components/onboarding/ContextualHelp';
import PrivacyMessage from '@/components/privacy-message';
import TestimonialsSection from '@/components/testimonials-section';
import HeroCarousel from '@/components/ui/HeroCarousel';
import MarqueeBanner from '@/components/ui/MarqueeBanner';
import PricingSection from '@/components/ui/PricingSection';
import OurServicesSection from '@/components/ui/OurServicesSection';
import { Button } from "@/components/ui/button";
import WhatsAppButton from '@/components/whatsapp-button';
import {
    ArrowRight,
    Brain,
    Globe,
    TrendingUp
} from "lucide-react";
import Link from 'next/link';

export default function HomePage() {
  const handleButtonClick = (destination: string) => {
    console.log(`Button clicked, navigating to: ${destination}`);
  };

  return (
    <div className="min-h-screen hero-background">
      {/* Navigation */}
      <ModernNavigation />
      
      {/* Bannière d'information */}
      <MarqueeBanner />
      
      {/* Section Hero avec Carousel Médias */}
      <HeroCarousel />

      {/* Section NovaIA - Centre d'Intelligence Artificielle */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-6xl mb-6">🧠</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              NovaIA - Centre d'Intelligence Artificielle
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez notre écosystème d'agents IA ultra-avancé avec protocoles A2A/MCP et système de battle ELO
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Agent Battle Arena */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-semibold text-white mb-4">Battle Arena</h3>
              <p className="text-gray-300 mb-4">
                Faites s'affronter vos agents IA préférés dans notre arène de compétition
              </p>
              <Button 
                onClick={() => window.location.href = '/nova-ia'}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                Lancer un Battle
              </Button>
            </div>

            {/* Protocoles A2A/MCP */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-white mb-4">Protocoles Avancés</h3>
              <p className="text-gray-300 mb-4">
                Communication inter-agents A2A et gestion de contexte MCP
              </p>
              <Link href="/nova-ia">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Explorer les Protocoles
                </Button>
              </Link>
            </div>

            {/* Agents IA */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-4">Agents IA</h3>
              <p className="text-gray-300 mb-4">
                12 agents spécialisés avec précision 87-96% et système ELO
              </p>
              <Link href="/nova-ia">
                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  Découvrir les Agents
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Brain className="mr-2 h-5 w-5" />
                Accéder à NovaIA
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Nos Services en Vidéo */}
      <OurServicesSection />

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
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Intelligence Artificielle</h3>
                  <span className="text-sm text-blue-600 font-medium">Premium</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Solutions IA avancées pour automatiser et optimiser vos processus métier
              </p>
              <Link href="/nova-ia">
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
              <Button 
                onClick={() => window.location.href = '/contact?service=web'}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                En savoir plus
              </Button>
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
              <Button 
                onClick={() => window.location.href = '/contact?service=transformation'}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe de fondateurs visionnaires et d'experts techniques dédiés
            </p>
          </div>
          
          {/* Organigramme - Co-fondateurs en haut */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Direction</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {teamMembers.slice(0, 2).map((member, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-xl text-center border-2 border-transparent hover:border-blue-200 transition-all duration-300">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">★</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <p className="text-lg text-blue-600 font-semibold mb-4">{member.role}</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Ligne de connexion */}
          <div className="flex justify-center mb-16">
            <div className="w-1 h-16 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          </div>

          {/* Équipe technique en bas */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Équipe Technique</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-teal-600 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {teamMembers.slice(2).map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-green-100"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Vidéos d'Événements */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos Événements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos événements et présentations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventVideos.map((event, index) => (
              <EventVideoCard
                key={index}
                title={event.title}
                video={event.video}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section Médias */}
      <MediaSection />

      {/* Section Témoignages */}
      <TestimonialsSection />

      {/* Section FAQ */}
      <FAQSection />

      {/* Section Tarifs */}
      <PricingSection />

      {/* Section Contact */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à Transformer Votre Entreprise ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contactez-nous pour discuter de vos projets et découvrir nos solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Brain className="mr-2 h-5 w-5" />
                Essayer NovaIA
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

      {/* Composants UI */}
      <AppointmentPopup />
      <CookiesBanner />
      <PrivacyMessage />
      <WhatsAppButton />
      <ContextualHelp />
      
      {/* Bouton déclencheur caché pour le popup de RDV */}
      <button 
        data-appointment-trigger 
        className="hidden"
        onClick={() => {
          const appointmentPopup = document.querySelector('[data-appointment-popup]');
          if (appointmentPopup) {
            (appointmentPopup as HTMLElement).style.display = 'flex';
          }
        }}
      >
        Déclencher RDV
      </button>
    </div>
  );
}
