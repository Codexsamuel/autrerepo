import TechnicalCapabilitiesSummary from '@/components/ui/TechnicalCapabilitiesSummary'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Capacités Techniques Avancées | DL Solutions',
  description: 'Découvrez l\'étendue de notre expertise technologique : IA, Blockchain, Cybersécurité, Big Data, Cloud Native, et plus de 20 capacités expertes.',
  keywords: [
    'capacités techniques', 'expertise technologique', 'intelligence artificielle', 'blockchain',
    'cybersécurité', 'big data', 'cloud native', 'microservices', 'devops', 'machine learning',
    'quantum computing', 'osint', 'metaverse', 'web3', 'defi', 'nft', 'zero trust', 'gdpr'
  ],
  openGraph: {
    title: 'Capacités Techniques Avancées | DL Solutions',
    description: 'Plus de 20 capacités techniques expertes : IA, Blockchain, Cybersécurité, Big Data, Cloud Native',
    images: ['/images/technical-capabilities-og.jpg']
  }
}

export default function TechnicalCapabilitiesPage() {
  return <TechnicalCapabilitiesSummary />
} 