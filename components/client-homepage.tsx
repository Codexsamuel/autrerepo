"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamic imports for better performance
const HeroSection = dynamic(() => import("@/components/hero-section"), { ssr: false })
const ServicesSection = dynamic(() => import("@/components/services-section"))
const FormationsSection = dynamic(() => import("@/components/formations-section"))
const ContactSection = dynamic(() => import("@/components/contact-section"))
const ScrollAnimations = dynamic(() => import("@/components/scroll-animations"), { ssr: false })
const WowEffects = dynamic(() => import("@/components/wow-effects"), { ssr: false })
const ConsultationPopup = dynamic(() => import("@/components/consultation-popup"), { ssr: false })
const Chatbot = dynamic(() => import("@/components/chatbot"), { ssr: false })
const ContactButtons = dynamic(() => import("@/components/contact-buttons"), { ssr: false })

export default function ClientHomepage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100" />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<div className="h-32 bg-gray-50" />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<div className="h-32 bg-gray-50" />}>
        <FormationsSection />
      </Suspense>

      <Suspense fallback={<div className="h-32 bg-gray-50" />}>
        <ContactSection />
      </Suspense>

      <ScrollAnimations />
      <WowEffects />
      <ConsultationPopup />
      <Chatbot />
      <ContactButtons />
    </main>
  )
}
