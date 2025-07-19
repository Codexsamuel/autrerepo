import SEOOptimized from '@/components/SEOOptimized';
import DLStyleClient from './DLStyleClient';

export default function DLStylePage() {
  return (
    <>
      <SEOOptimized
        pageKey="dl-style"
        customConfig={{
          title: "DL Style | Boutique internationale mode, high-tech & accessoires – DL Solutions",
          description: "Découvrez DL Style, la boutique e-commerce de DL Solutions : mode, high-tech, accessoires, nouveautés, outlet, paiement sécurisé, livraison rapide au Cameroun et à l’international.",
          url: "https://www.dl-solutions.com/novacore/dl-style"
        }}
      />
      <DLStyleClient />
    </>
  );
} 