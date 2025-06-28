"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, Network, Plus } from 'lucide-react';
import Link from 'next/link';

const companies = [
  { id: 1, name: "DL Tech", logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg", sector: "Tech", jobs: 3 },
  { id: 2, name: "Nova Hospitality", logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg", sector: "Hospitality", jobs: 2 },
  { id: 3, name: "AssurPro", logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif", sector: "Assurance", jobs: 1 },
];

const jobs = [
  { id: 1, title: "Développeur Fullstack", company: "DL Tech", location: "Paris", logo: companies[0].logo },
  { id: 2, title: "Chef de projet", company: "Nova Hospitality", location: "Yaoundé", logo: companies[1].logo },
  { id: 3, title: "Agent Assurance", company: "AssurPro", location: "Douala", logo: companies[2].logo },
];

export default function NovaWorldPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">NovaWorld</h1>
        <Link href="/novacore/novaworld/companies/nouveau">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle entreprise
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company: any) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <img src={company.logo} alt={company.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <CardTitle className="text-lg">{company.name}</CardTitle>
                <p className="text-xs text-gray-500">Secteur : {company.sector}</p>
                <span className="text-xs text-gray-400">{company.jobs} jobs</span>
              </div>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/novacore/novaworld/companies/${company.id}`}>Voir l'entreprise</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Briefcase className="h-5 w-5" /> Offres d'emploi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: any) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <img src={job.logo} alt={job.title} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <CardTitle className="text-base">{job.title}</CardTitle>
                  <p className="text-xs text-gray-500">{job.company} - {job.location}</p>
                </div>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline">Postuler</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Network className="h-5 w-5" /> Réseau</h2>
        <div className="flex flex-wrap gap-4">
          {companies.map((company: any) => (
            <div key={company.id} className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <img src={company.logo} alt={company.name} className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm font-medium">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}