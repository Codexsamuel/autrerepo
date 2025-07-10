'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Bell, Bot, Calendar, CheckCircle, ChevronLeft, ChevronRight, Clock, Filter, MapPin, Plus, Sparkles, Star, TrendingUp, Users, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coverImage: string;
  organizer: string;
  organizerAvatar: string;
  attendees: number;
  maxAttendees: number;
  isRegistered: boolean;
  tags: string[];
  status: 'upcoming' | 'past' | 'cancelled';
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Hackathon Innovation 2024',
        description: '24h pour innover en équipe sur des projets IA, Data et Tech. Prix à gagner, mentors, networking.',
        date: '2024-03-15',
        time: '09:00',
        location: 'Paris, Station F',
        coverImage: '/images/events/hackathon.jpg',
        organizer: 'Innovation Hub',
        organizerAvatar: '/images/groups/innovation.jpg',
        attendees: 45,
        maxAttendees: 100,
        isRegistered: false,
        tags: ['Hackathon', 'Innovation', 'IA'],
        status: 'upcoming'
      },
      {
        id: '2',
        title: "Workshop IA & Machine Learning",
        description: "Atelier pratique pour découvrir les dernières avancées en IA et ML. Cas d'usage, démos, networking.",
        date: '2024-03-20',
        time: '14:00',
        location: 'En ligne',
        coverImage: '/images/events/workshop-ia.jpg',
        organizer: 'DL Solutions',
        organizerAvatar: '/images/logo.png',
        attendees: 23,
        maxAttendees: 50,
        isRegistered: true,
        tags: ['Workshop', 'IA', 'ML'],
        status: 'upcoming'
      },
      {
        id: '3',
        title: 'Conférence Marketing Digital',
        description: 'Conférence sur les tendances du marketing digital, SEO, automation, analytics. Intervenants experts.',
        date: '2024-03-25',
        time: '10:00',
        location: 'Lyon, H7',
        coverImage: '/images/events/marketing.jpg',
        organizer: 'Marketing Masters',
        organizerAvatar: '/images/groups/marketing.jpg',
        attendees: 67,
        maxAttendees: 150,
        isRegistered: false,
        tags: ['Conférence', 'Marketing', 'Digital'],
        status: 'upcoming'
      },
      {
        id: '4',
        title: 'Design Sprint Workshop',
        description: 'Sprint collaboratif pour prototyper et tester de nouvelles idées UX/UI. Animé par des experts.',
        date: '2024-03-18',
        time: '13:00',
        location: 'En ligne',
        coverImage: '/images/events/design-sprint.jpg',
        organizer: 'Design & UX Community',
        organizerAvatar: '/images/groups/design.jpg',
        attendees: 34,
        maxAttendees: 60,
        isRegistered: false,
        tags: ['Workshop', 'Design', 'UX'],
        status: 'upcoming'
      },
      {
        id: '5',
        title: 'Afterwork Networking',
        description: 'Rencontre informelle pour échanger, réseauter et partager autour d\'un verre.',
        date: '2024-02-28',
        time: '18:30',
        location: 'Marseille, Le Cube',
        coverImage: '/images/events/afterwork.jpg',
        organizer: 'DL Solutions',
        organizerAvatar: '/images/logo.png',
        attendees: 56,
        maxAttendees: 80,
        isRegistered: true,
        tags: ['Networking', 'Afterwork'],
        status: 'past'
      }
    ];
    setEvents(mockEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || event.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleRegister = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId ? { ...event, isRegistered: true, attendees: event.attendees + 1 } : event
    ));
    toast({
      title: "Inscription confirmée",
      description: "Vous êtes inscrit à l'événement !",
    });
  };

  const handleUnregister = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId ? { ...event, isRegistered: false, attendees: event.attendees - 1 } : event
    ));
    toast({
      title: "Désinscription effectuée",
      description: "Vous n'êtes plus inscrit à cet événement.",
    });
  };

  // Navigation calendrier (mois)
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };
  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Suggestions IA (mock)
  const aiSuggestions = [
    'Participez au Hackathon pour booster votre réseau',
    'Inscrivez-vous au Workshop IA pour découvrir les dernières tendances',
    'Ne manquez pas l\'Afterwork Networking pour élargir vos contacts'
  ];

  // Statistiques avancées (mock)
  const stats = [
    { label: 'Événements à venir', value: events.filter(e => e.status === 'upcoming').length, icon: Calendar },
    { label: 'Participants inscrits', value: events.reduce((acc, e) => acc + e.attendees, 0), icon: Users },
    { label: 'Taux de remplissage', value: Math.round(events.reduce((acc, e) => acc + (e.attendees / e.maxAttendees), 0) / events.length * 100) + '%', icon: TrendingUp },
    { label: 'Événements passés', value: events.filter(e => e.status === 'past').length, icon: Clock }
  ];

  // Génération du calendrier (jours du mois)
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Événements</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Sparkles className="w-3 h-3 mr-1" />
                {events.length} événements
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Créer un événement
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar gauche - Suggestions IA & calendrier */}
          <div className="lg:col-span-1 space-y-8">
            {/* Suggestions IA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-purple-600" />
                  Suggestions IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiSuggestions.map((s, i) => (
                    <div key={i} className="p-3 bg-purple-50 rounded-lg text-sm text-purple-900">
                      {s}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Calendrier */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Calendrier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="font-medium text-gray-700">
                    {new Date(selectedYear, selectedMonth).toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
                  </span>
                  <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs text-center">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d, i) => (
                    <span key={i} className="font-semibold text-gray-500 mb-1">{d}</span>
                  ))}
                  {Array.from({ length: (firstDayOfWeek + 6) % 7 }).map((_, i) => (
                    <span key={i}></span>
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => (
                    <span key={i} className="rounded-full hover:bg-blue-100 cursor-pointer py-1">
                      {i + 1}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">À venir</TabsTrigger>
                <TabsTrigger value="past">Passés</TabsTrigger>
                <TabsTrigger value="all">Tous</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-6">
                {filteredEvents.filter(e => e.status === 'upcoming').length === 0 ? (
                  <div className="text-center text-gray-500 py-12">Aucun événement à venir</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredEvents.filter(e => e.status === 'upcoming').map(event => (
                      <Card key={event.id} className="hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img src={event.coverImage} alt={event.title} className="w-full h-40 object-cover rounded-t-lg" />
                          <div className="absolute top-2 right-2">
                            {event.isRegistered ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : null}
                          </div>
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={event.organizerAvatar} />
                              <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {event.organizer}
                                </Badge>
                                <span className="text-xs text-gray-500">{event.date} à {event.time}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                          <div className="flex items-center text-gray-500 text-xs">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span>{event.attendees}/{event.maxAttendees} participants</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {event.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          {event.isRegistered ? (
                            <Button variant="outline" className="w-full" onClick={() => handleUnregister(event.id)}>
                              <XCircle className="w-4 h-4 mr-2" />
                              Se désinscrire
                            </Button>
                          ) : (
                            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleRegister(event.id)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              S'inscrire
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-6">
                {filteredEvents.filter(e => e.status === 'past').length === 0 ? (
                  <div className="text-center text-gray-500 py-12">Aucun événement passé</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredEvents.filter(e => e.status === 'past').map(event => (
                      <Card key={event.id} className="hover:shadow-lg transition-shadow opacity-70">
                        <div className="relative">
                          <img src={event.coverImage} alt={event.title} className="w-full h-40 object-cover rounded-t-lg" />
                          <div className="absolute top-2 right-2">
                            <Star className="w-6 h-6 text-yellow-400" />
                          </div>
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={event.organizerAvatar} />
                              <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {event.organizer}
                                </Badge>
                                <span className="text-xs text-gray-500">{event.date} à {event.time}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                          <div className="flex items-center text-gray-500 text-xs">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span>{event.attendees}/{event.maxAttendees} participants</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {event.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="space-y-6">
                {filteredEvents.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">Aucun événement</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredEvents.map(event => (
                      <Card key={event.id} className="hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img src={event.coverImage} alt={event.title} className="w-full h-40 object-cover rounded-t-lg" />
                          <div className="absolute top-2 right-2">
                            {event.status === 'past' ? (
                              <Star className="w-6 h-6 text-yellow-400" />
                            ) : event.isRegistered ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : null}
                          </div>
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={event.organizerAvatar} />
                              <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {event.organizer}
                                </Badge>
                                <span className="text-xs text-gray-500">{event.date} à {event.time}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                          <div className="flex items-center text-gray-500 text-xs">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span>{event.attendees}/{event.maxAttendees} participants</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {event.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          {event.status === 'upcoming' && (
                            event.isRegistered ? (
                              <Button variant="outline" className="w-full" onClick={() => handleUnregister(event.id)}>
                                <XCircle className="w-4 h-4 mr-2" />
                                Se désinscrire
                              </Button>
                            ) : (
                              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleRegister(event.id)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                S'inscrire
                              </Button>
                            )
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 