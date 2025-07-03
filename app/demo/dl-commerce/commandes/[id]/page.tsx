import OrderDetailClient from './OrderDetailClient';

// Fonction requise pour l'export statique Next.js
export async function generateStaticParams() {
  return [
    { id: 'CMD-2024-001' },
    { id: 'CMD-2024-002' },
    { id: 'CMD-2024-003' },
    { id: 'CMD-2024-004' },
    { id: 'CMD-2024-005' }
  ];
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderDetailClient id={id} />;
}
