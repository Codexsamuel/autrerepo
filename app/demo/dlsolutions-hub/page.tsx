'use client';

import Link from 'next/link';

const dashboards = [
  {
    name: 'Banque',
    logo: '/logos/novacore.svg',
    path: '/demo/dl-banque',
    desc: 'CRM bancaire intelligent, inspiré Salesforce/Temenos.'
  },
  {
    name: 'Assurance',
    logo: '/logos/novacore.svg',
    path: '/demo/dl-assurance',
    desc: 'ERP assurance premium, inspiré Guidewire/Salesforce.'
  },
  {
    name: 'Hôpital',
    logo: '/logos/novacore.svg',
    path: '/demo/dl-hospitalier',
    desc: 'ERP hospitalier, inspiré Cerner/Epic.'
  },
  {
    name: 'Immobilier',
    logo: 'https://res.cloudinary.com/dko5sommz/image/upload/v1748454499/Logo_NovaWorld_xtzmgr.svg',
    path: '/demo/dl-immobilier',
    desc: 'CRM immobilier, inspiré Salesforce Property Cloud.'
  },
  {
    name: 'Community Management',
    logo: 'https://res.cloudinary.com/dko5sommz/image/upload/v1748454501/Logo_NovaCore_mrqlfs.svg',
    path: '/demo/dl-community-manager',
    desc: 'Dashboard social media, inspiré Sprout Social.'
  },
  {
    name: 'E-commerce DL Style',
    logo: 'https://res.cloudinary.com/dko5sommz/image/upload/v1748454498/Logo_DL_Style_2_usdvqk.svg',
    path: '/demo/dl-style',
    desc: 'Dashboard e-commerce, inspiré Shopify.'
  },
  {
    name: 'Hôtellerie',
    logo: '/logos/novacore.svg',
    path: '/demo/ezee-optimus',
    desc: 'CRM hôtelier, inspiré eZee Optimus.'
  }
];

export default function DLSolutionsHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Hub NovaCore - Accès rapide à tous les dashboards</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dashboards.map((d) => (
            <Link key={d.name} href={d.path} className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex items-center space-x-4 border border-gray-100">
              <img src={d.logo} alt={d.name + ' logo'} className="w-14 h-14 rounded" />
              <div>
                <div className="font-semibold text-lg">{d.name}</div>
                <div className="text-gray-500 text-sm mb-2">{d.desc}</div>
                <span className="text-blue-600 font-medium">Accéder au dashboard →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 