import DevelopmentPage from '@/components/DevelopmentPage';

export default function VolsPage() {
  return (
    <DevelopmentPage
      title="Réservation de Vols - En cours de développement"
      description="Notre plateforme de réservation de billets d'avion avec IA et comparaison de prix est en cours de finalisation."
      estimatedCompletion="2-3 semaines"
      features={[
        "Recherche de vols intelligente",
        "Comparaison de prix en temps réel",
        "Réservation automatisée",
        "Notifications de prix",
        "Intégration avec les compagnies aériennes",
        "Gestion des bagages et sièges",
        "Support multilingue"
      ]}
      relatedPages={[
        { name: "DL Travel", href: "/dl-travel" },
        { name: "Hôtels", href: "/dl-travel/hotels" },
        { name: "Packages", href: "/dl-travel/packages" },
        { name: "Mes Voyages", href: "/dl-travel/mes-voyages" }
      ]}
    />
  );
}