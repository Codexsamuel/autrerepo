'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SubscriptionWrapper from '@/components/subscription/SubscriptionWrapper';
import { 
  Calendar as CalendarIcon,
  Clock,
  User,
  Bed,
  Heart,
  Utensils,
  Settings,
  Star,
  X,
  Plus,
  Brain,
  TrendingUp,
  BarChart3,
  Camera,
  Shield,
  Bell,
  QrCode,
  FileText
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  clientName: string;
  clientPhoto?: string;
  type: 'reservation' | 'spa' | 'restaurant' | 'concierge';
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  roomNumber?: string;
  aiRiskScore: number;
  aiRecommendations: string[];
  totalAmount: number;
  specialRequests: string[];
}

function IntelligentCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setEvents([
      {
        id: "1",
        title: "Réservation - Jean Dupont",
        clientName: "Jean Dupont",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        type: "reservation",
        startTime: "2024-02-14 15:00",
        endTime: "2024-02-16 11:00",
        status: "confirmed",
        roomNumber: "101",
        aiRiskScore: 0.15,
        aiRecommendations: [
          "Préparer champagne de bienvenue",
          "Décorer la chambre pour l'anniversaire",
          "Réserver table restaurant gastronomique"
        ],
        totalAmount: 500,
        specialRequests: ["Vue mer", "Lit king-size", "Champagne"]
      },
      {
        id: "2",
        title: "Spa - Marie Martin",
        clientName: "Marie Martin",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        type: "spa",
        startTime: "2024-02-15 10:00",
        endTime: "2024-02-15 12:00",
        status: "pending",
        aiRiskScore: 0.25,
        aiRecommendations: [
          "Préparer huiles essentielles bio",
          "Musique zen en arrière-plan",
          "Thé bio après le massage"
        ],
        totalAmount: 120,
        specialRequests: ["Produits bio", "Musique zen"]
      }
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reservation': return <Bed className="w-4 h-4" />;
      case 'spa': return <Heart className="w-4 h-4" />;
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'concierge': return <User className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 0.3) return 'text-green-600';
    if (score < 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendrier de Gestion - EZEE Optimus</h1>
            <p className="text-gray-600">Système intelligent de réservation avec IA</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Réservation
            </Button>
          </div>
        </div>

        {/* AI Insights Banner */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Brain className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">Insights IA</h3>
                  <p className="text-sm text-blue-700">
                    Taux d'occupation: 85% | Revenus prévus: €12,500 | Alertes: 2
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">
              {selectedDate?.toLocaleDateString('fr-FR', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Jour</SelectItem>
                <SelectItem value="week">Semaine</SelectItem>
                <SelectItem value="month">Mois</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Calendar View */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Calendrier</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Statistiques Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Réservations</span>
                  <Badge variant="outline">{events.filter(e => e.type === 'reservation').length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Spa</span>
                  <Badge variant="outline">{events.filter(e => e.type === 'spa').length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Restaurant</span>
                  <Badge variant="outline">{events.filter(e => e.type === 'restaurant').length}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Calendar Grid */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Vue Semaine</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Week Header */}
                <div className="grid grid-cols-8 gap-1 mb-2">
                  <div className="p-2 text-sm font-medium text-gray-500">Heure</div>
                  {getWeekDays().map((day, index) => (
                    <div key={index} className="p-2 text-sm font-medium text-center">
                      <div className="text-gray-900">{day.toLocaleDateString('fr-FR', { weekday: 'short' })}</div>
                      <div className="text-gray-500">{day.getDate()}</div>
                    </div>
                  ))}
                </div>

                {/* Time Grid */}
                <div className="space-y-1">
                  {Array.from({ length: 17 }, (_, i) => i + 6).map((hour) => {
                    const time = `${hour.toString().padStart(2, '0')}:00`;
                    return (
                      <div key={time} className="grid grid-cols-8 gap-1">
                        <div className="p-2 text-xs text-gray-500 border-r">
                          {time}
                        </div>
                        {getWeekDays().map((day, dayIndex) => {
                          const dayEvents = getEventsForDay(day);
                          const timeEvents = dayEvents.filter(event => {
                            const eventHour = new Date(event.startTime).getHours();
                            return eventHour === hour;
                          });

                          return (
                            <div key={dayIndex} className="p-1 border-b border-r min-h-[60px] relative">
                              {timeEvents.map((event) => (
                                <div
                                  key={event.id}
                                  className="absolute inset-1 bg-blue-100 border border-blue-300 rounded p-1 cursor-pointer hover:bg-blue-200 transition-colors"
                                  onClick={() => setSelectedEvent(event)}
                                >
                                  <div className="flex items-center space-x-1">
                                    {getTypeIcon(event.type)}
                                    <span className="text-xs font-medium truncate">
                                      {event.clientName}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-600 truncate">
                                    {event.type === 'reservation' ? `Ch. ${event.roomNumber}` : event.type}
                                  </div>
                                  <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                                    {event.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Today's Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Événements Aujourd'hui</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getEventsForDay(new Date()).map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedEvent(event)}>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={event.clientPhoto} />
                    <AvatarFallback>{event.clientName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{event.title}</span>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      {getTypeIcon(event.type)}
                      <span>{event.type}</span>
                      {event.roomNumber && <span>• Ch. {event.roomNumber}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getRiskScoreColor(event.aiRiskScore)}`}>
                      {Math.round(event.aiRiskScore * 100)}% risque
                    </div>
                    <div className="text-sm text-gray-600">
                      €{event.totalAmount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <Bell className="h-6 w-6 mb-2" />
            <span>Rappels</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <QrCode className="h-6 w-6 mb-2" />
            <span>QR Codes</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <FileText className="h-6 w-6 mb-2" />
            <span>Documents</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <BarChart3 className="h-6 w-6 mb-2" />
            <span>Analytics</span>
          </Button>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Détails de l'événement</h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedEvent.clientPhoto} />
                  <AvatarFallback>{selectedEvent.clientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedEvent.title}</h3>
                  <p className="text-gray-600">{selectedEvent.clientName}</p>
                  <Badge className={getStatusColor(selectedEvent.status)}>
                    {selectedEvent.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date et heure</label>
                  <p className="text-sm">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <p className="text-sm capitalize">{selectedEvent.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Montant</label>
                  <p className="text-sm">€{selectedEvent.totalAmount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Risque IA</label>
                  <p className={`text-sm font-bold ${getRiskScoreColor(selectedEvent.aiRiskScore)}`}>
                    {Math.round(selectedEvent.aiRiskScore * 100)}%
                  </p>
                </div>
              </div>

              {selectedEvent.specialRequests.length > 0 && (
                <div>
                  <label className="text-sm font-medium">Demandes spéciales</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedEvent.specialRequests.map((request, index) => (
                      <Badge key={index} variant="outline">{request}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.aiRecommendations.length > 0 && (
                <div>
                  <label className="text-sm font-medium">Recommandations IA</label>
                  <div className="space-y-2 mt-1">
                    {selectedEvent.aiRecommendations.map((rec, index) => (
                      <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                        🤖 {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Modifier</Button>
                <Button>Confirmer</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CalendarPage() {
  return (
    <SubscriptionWrapper delayMinutes={1}>
      <IntelligentCalendarPage />
    </SubscriptionWrapper>
  );
} 