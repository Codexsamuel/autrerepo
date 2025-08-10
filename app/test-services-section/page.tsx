import OurServicesSection from '@/components/ui/OurServicesSection';

export default function TestServicesSectionPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Test de la Section "Nos Services"
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Cette page permet de tester le composant OurServicesSection de manière isolée
        </p>
        
        <OurServicesSection />
      </div>
    </div>
  );
} 