import EditChambreClient from './EditChambreClient';

// Fonction requise pour l'export statique Next.js
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

export default async function EditChambrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditChambreClient id={id} />;
}