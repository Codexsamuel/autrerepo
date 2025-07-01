import { Suspense } from 'react';
import { getFormationBySlug } from '@/lib/data/formations';
import { notFound, redirect } from 'next/navigation';
import FormationClient from './FormationClient';

// Server component
export default async function FormationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Essayer de rediriger vers le bon slug si nécessaire
  const slugMappings: { [key: string]: string } = {
    'crm-&-gestion-client': 'crm-gestion-client',
    'marketing-digital-&-réseaux-sociaux': 'marketing-digital-reseaux-sociaux',
    'e-commerce-&-vente-en-ligne': 'ecommerce-vente-ligne',
    'création-visuelle-&-design': 'creation-visuelle-design',
    'télévente-&-prospection': 'televente-prospection'
  };
  
  const newSlug = slugMappings[slug];
  if (newSlug) {
    redirect(`/formations/${newSlug}`);
  }
  
  const formationData = getFormationBySlug(slug);
  
  if (!formationData) {
    notFound();
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de la formation...</p>
        </div>
      </div>
    }>
      <FormationClient formation={formationData} />
    </Suspense>
  );
}