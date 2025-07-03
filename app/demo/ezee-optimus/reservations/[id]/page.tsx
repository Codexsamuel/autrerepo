import ReservationDetailClient from './ReservationDetailClient';

// Fonction requise pour l'export statique Next.js
export async function generateStaticParams() {
  // Générer quelques IDs statiques pour l'export
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

export default async function ReservationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ReservationDetailClient id={id} />;
}