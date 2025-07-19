"use client";
import SEOOptimized from '@/components/SEOOptimized';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight,
    Briefcase,
    Building,
    FileText,
    Globe,
    MessageSquare,
    Network,
    Star,
    TrendingUp,
    Users,
    Video
} from "lucide-react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NovaWorldPage() {
  const stats = [
    { label: "Utilisateurs", value: 15420, icon: Users },
    { label: "Connexions actives", value: 892, icon: Network },
    { label: "Offres d'emploi", value: 1247, icon: Briefcase },
    { label: "Événements cette semaine", value: 45, icon: Video },
    { label: "Modules de formation", value: 156, icon: FileText },
    { label: "Success stories", value: 234, icon: Star }
  ];

  const [recentPosts, setRecentPosts] = useState([
    {
      id: 1,
      author: "Marie Dubois",
      avatar: "/avatars/marie.jpg",
      content: "Juste terminé le module IA pour entreprises. Incroyable contenu ! 🚀",
      likes: 24,
      comments: 8,
      time: "2h",
      tags: ["IA", "Formation", "Innovation"]
    },
    {
      id: 2,
      author: "Pierre Martin",
      avatar: "/avatars/pierre.jpg",
      content: "Recherche développeur React senior pour projet innovant. Contactez-moi !",
      likes: 12,
      comments: 15,
      time: "4h",
      tags: ["Recrutement", "React", "Tech"]
    },
    {
      id: 3,
      author: "Sophie Bernard",
      avatar: "/avatars/sophie.jpg",
      content: "Nouveau webinar sur le marketing digital ce vendredi. Inscrivez-vous !",
      likes: 31,
      comments: 22,
      time: "6h",
      tags: ["Webinar", "Marketing", "Digital"]
    }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Conférence IA & Innovation",
      date: "2024-02-15",
      time: "14:00",
      location: "Paris, France",
      attendees: 156,
      type: "Conference"
    },
    {
      id: 2,
      title: "Workshop Marketing Digital",
      date: "2024-02-18",
      time: "10:00",
      location: "Lyon, France",
      attendees: 89,
      type: "Workshop"
    },
    {
      id: 3,
      title: "Networking Entrepreneurs",
      date: "2024-02-20",
      time: "19:00",
      location: "Marseille, France",
      attendees: 234,
      type: "Networking"
    }
  ]);

  const [topCompanies, setTopCompanies] = useState([
    {
      id: 1,
      name: "TechCorp",
      logo: "/logos/techcorp.png",
      industry: "Technologie",
      employees: "500+",
      rating: 4.8,
      openPositions: 12
    },
    {
      id: 2,
      name: "InnovateLab",
      logo: "/logos/innovatelab.png",
      industry: "R&D",
      employees: "200+",
      rating: 4.6,
      openPositions: 8
    },
    {
      id: 3,
      name: "DigitalFlow",
      logo: "/logos/digitalflow.png",
      industry: "Marketing",
      employees: "150+",
      rating: 4.7,
      openPositions: 15
    }
  ]);

  const router = useRouter();

  const features = [
    {
      icon: Users,
      title: 'Réseau Social Professionnel',
      description: 'Connectez-vous avec des professionnels de votre secteur et développez votre réseau.',
      color: 'text-blue-600'
    },
    {
      icon: Building,
      title: 'Gestion d\'Entreprise',
      description: 'Outils complets pour gérer votre entreprise, vos équipes et vos projets.',
      color: 'text-green-600'
    },
    {
      icon: Briefcase,
      title: 'Opportunités d\'Emploi',
      description: 'Trouvez votre prochain emploi ou recrutez les meilleurs talents.',
      color: 'text-purple-600'
    },
    {
      icon: Network,
      title: 'Collaboration',
      description: 'Collaborez efficacement avec vos équipes et partenaires.',
      color: 'text-orange-600'
    },
    {
      icon: FileText,
      title: 'Ressources',
      description: 'Accédez à des ressources exclusives et des formations.',
      color: 'text-red-600'
    },
    {
      icon: Video,
      title: 'Événements',
      description: 'Participez à des événements professionnels et des webinaires.',
      color: 'text-indigo-600'
    }
  ];

  const recentActivities = [
    {
      type: 'post',
      user: 'Marie Dubois',
      company: 'TechCorp',
      content: 'Partage un article sur les tendances IA 2024',
      time: 'Il y a 2h',
      avatar: '/images/avatars/marie.jpg'
    },
    {
      type: 'job',
      user: 'Innovation Labs',
      content: 'Recherche un développeur Full-Stack',
      time: 'Il y a 4h',
      avatar: '/images/companies/innovation-labs.jpg'
    },
    {
      type: 'event',
      user: 'Digital Summit',
      content: 'Nouvel événement : Transformation Digitale 2024',
      time: 'Il y a 6h',
      avatar: '/images/events/digital-summit.jpg'
    }
  ];

  return (
    <>
      <SEOOptimized
        pageKey="novaworld-main"
        customConfig={{
          title: "NovaWorld | Réseau social professionnel & business – DL Solutions",
          description: "NovaWorld, le réseau social de DL Solutions pour connecter, collaborer et développer votre business. Rejoignez des milliers de professionnels et d'entreprises innovantes.",
          url: "https://www.dl-solutions.com/novaworld"
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Globe className="w-12 h-12 mr-4" />
                <h1 className="text-5xl font-bold">NovaWorld</h1>
              </div>
              <p className="text-xl opacity-90 mb-8">
                Le réseau social professionnel qui révolutionne la gestion d'entreprise et la collaboration
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Rejoindre NovaWorld
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800">
                  Voir la démo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Fonctionnalités */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
              Une plateforme complète pour votre réussite professionnelle
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Sections principales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Social Hub */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-blue-600 mr-3" />
                  <CardTitle className="text-2xl">Social Hub</CardTitle>
                </div>
                <CardDescription className="text-slate-600">
                  Connectez-vous avec des professionnels, partagez du contenu et développez votre réseau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                    <span>Feed personnalisé selon vos intérêts</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <MessageSquare className="w-4 h-4 text-blue-500 mr-2" />
                    <span>Messagerie privée et groupes</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                    <span>Analytics de votre réseau</span>
                  </div>
                </div>
                <Link href="/novaworld/social">
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Accéder au Social Hub
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Entreprises */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Building className="w-8 h-8 text-green-600 mr-3" />
                  <CardTitle className="text-2xl">Gestion d'Entreprise</CardTitle>
                </div>
                <CardDescription className="text-slate-600">
                  Outils complets pour gérer votre entreprise, vos équipes et vos projets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="w-4 h-4 text-blue-500 mr-2" />
                    <span>Gestion des équipes et rôles</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Briefcase className="w-4 h-4 text-purple-500 mr-2" />
                    <span>Suivi des projets et tâches</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                    <span>Analytics et rapports</span>
                  </div>
                </div>
                <Link href="/novaworld/companies">
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                    Gérer mon entreprise
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Activités récentes */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
              Activités récentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentActivities.map((activity, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                        <span className="text-slate-600 font-semibold">
                          {activity.user.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate-800">{activity.user}</h4>
                          <span className="text-sm text-slate-500">{activity.time}</span>
                        </div>
                        <p className="text-slate-600 text-sm mb-2">{activity.content}</p>
                        {activity.company && (
                          <Badge variant="secondary" className="text-xs">
                            {activity.company}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">
                  Prêt à rejoindre NovaWorld ?
                </h2>
                <p className="text-xl opacity-90 mb-8">
                  Commencez dès aujourd'hui à développer votre réseau professionnel
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                    Créer mon compte
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}