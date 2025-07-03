// Fonction requise pour l'export statique Next.js
export async function generateStaticParams() {
  return [
    { slug: 'crm-gestion-client' },
    { slug: 'marketing-digital-reseaux-sociaux' },
    { slug: 'ecommerce-vente-ligne' },
    { slug: 'creation-visuelle-design' },
    { slug: 'televente-prospection' },
    { slug: 'ia-entreprises' },
    { slug: 'sav-excellence' },
    { slug: 'reseau-sociaux' }
  ];
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Page en cours de développement</h1>
      <p className="text-gray-600">
        Cette page est actuellement en cours de développement.
      </p>
    </div>
  );
}