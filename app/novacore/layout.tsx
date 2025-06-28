import Link from 'next/link';
import { ReactNode } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/novacore' },
  { label: 'Gestion des utilisateurs', href: '/novacore/users' },
  { label: 'Analytics', href: '/novacore/analytics' },
  { label: 'Workflows n8n', href: '/novacore/workflows' },
  { label: 'Paramètres système', href: '/novacore/settings' },
  { label: 'Sécurité', href: '/novacore/security' },
  { label: 'Video Editor', href: '/novacore/video-editor' },
  { label: 'Intégrations CRM', href: '/novacore/crm-integrations' },
  { label: 'NovaWorld', href: '/novacore/novaworld' },
  { label: 'DL Style', href: '/novacore/dl-style' },
  { label: 'DL Travel', href: '/novacore/dl-travel' },
  { label: 'DL Bookmaker', href: '/novacore/dl-bookmaker' },
  { label: 'Retour au site', href: '/' },
];

export default function NovaCoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gradient-to-b from-blue-700 to-purple-700 text-white flex flex-col py-8 px-4 shadow-lg">
        <div className="mb-8 flex items-center space-x-3">
          <img src="/images/dl-logo.jpg" alt="DL Solutions" className="w-10 h-10 rounded-full" />
          <span className="font-bold text-xl tracking-wide">NovaCore</span>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item: any) => (
            <Link key={item.href} href={item.href} className="block px-3 py-2 rounded hover:bg-white/10 transition-colors font-medium">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 