import DevelopmentPage from '@/components/DevelopmentPage';

export default function DronePage() {
  return (
    <DevelopmentPage
      title="Service Drone - En cours de développement"
      description="Notre service de solutions drone pour l'inspection, la surveillance et la cartographie aérienne est en cours de finalisation."
      estimatedCompletion="3-4 semaines"
      features={[
        "Inspection aérienne automatisée",
        "Cartographie 3D haute précision",
        "Surveillance en temps réel",
        "Rapports d'inspection IA",
        "Intégration avec NovaCore CRM",
        "Analytics de performance"
      ]}
      relatedPages={[
        { name: "NovaCore CRM", href: "/novacore" },
        { name: "Services IA", href: "/services/ia" },
        { name: "Solutions Immobilier", href: "/solutions/immobilier" },
        { name: "Contact", href: "/contact" }
      ]}
    />
  );
}