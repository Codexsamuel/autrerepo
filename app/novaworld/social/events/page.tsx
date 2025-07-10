import AdvancedSEO from '@/components/AdvancedSEO';
import { Calendar, PlusCircle, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export default function SocialEventsPage() {
  return (
    <>
      <AdvancedSEO
        title="Événements - NovaWorld Social | DL Solutions"
        description="Participez à des événements professionnels, webinars, ateliers, et plus sur NovaWorld Social. Suggestions IA, calendrier interactif, inscription."
        keywords="événements, social, IA, NovaWorld, DL Solutions"
        image="/images/social-events.jpg"
        url="https://dlsolutions.com/novaworld/social/events"
        type="event"
        organization={{
          name: 'DL Solutions',
          logo: 'https://dlsolutions.com/images/logo.png',
          url: 'https://dlsolutions.com',
          description: 'Solutions digitales innovantes pour entreprises'
        }}
        breadcrumbs={[
          { name: 'Accueil', url: 'https://dlsolutions.com' },
          { name: 'NovaWorld', url: 'https://dlsolutions.com/novaworld' },
          { name: 'Social', url: 'https://dlsolutions.com/novaworld/social' },
          { name: 'Événements', url: 'https://dlsolutions.com/novaworld/social/events' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-yellow-800 mb-8 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-yellow-600" />
            Événements professionnels
          </h1>
          <div className="flex items-center mb-8">
            <Link href="#" className="flex items-center text-yellow-700 font-semibold hover:underline">
              <PlusCircle className="w-5 h-5 mr-1" />Créer un événement
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-6 h-6 text-blue-500 mr-2" />Suggestions IA
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Participez au <b>Webinar Prospection 2024</b> recommandé pour vous</li>
                <li>Atelier <b>CRM & Automatisation</b> la semaine prochaine</li>
                <li>Événement <b>Networking Afrique</b> à venir</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 text-green-600 mr-2" />Événements à venir
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>Webinar Prospection 2024</b> - 12 juin, 14h</li>
                <li><b>Atelier CRM</b> - 18 juin, 10h</li>
                <li><b>Networking Afrique</b> - 25 juin, 18h</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 