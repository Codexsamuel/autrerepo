import CoursClient from './CoursClient';

// Fonction requise pour l'export statique Next.js
export async function generateStaticParams() {
  return [
    { slug: 'crm-gestion-client' },
    { slug: 'intelligence-artificielle-pour-entreprises' },
    { slug: 'marketing-digital-reseaux-sociaux' },
    { slug: 'e-commerce-vente-en-ligne' },
    { slug: 'creation-visuelle-design' }
  ];
}

export default async function CoursPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CoursClient slug={slug} />;
}