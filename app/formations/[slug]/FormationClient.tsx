"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Clock, 
  Star, 
  CheckCircle, 
  Play, 
  BookOpen, 
  Award,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
  Zap,
  Target,
  TrendingUp,
  UserCheck,
  FileText,
  Video,
  Download,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
  Bookmark,
  CreditCard,
  Building
} from 'lucide-react';

export default function FormationClient({ formationData }: { formationData: any }) {
  const [selectedSession, setSelectedSession] = useState(0);
  const [showFullProgram, setShowFullProgram] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentForm, setEnrollmentForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    message: ''
  });

  const handleEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnrolling(true);
    // Simulation d'envoi
    setTimeout(() => {
      setIsEnrolling(false);
      alert('Demande d\'inscription envoyée ! Nous vous recontacterons dans les 24h.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={formationData.title} description={formationData.subtitle} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations principales */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Formation Certifiante
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Disponible
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {formationData.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {formationData.description}
              </p>

              {/* Stats rapides */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{formationData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{formationData.students} étudiants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">{formationData.rating}/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{formationData.level}</span>
                </div>
              </div>

              {/* Objectifs */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Objectifs de la formation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {formationData.objectives.map((objective: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Carte d'inscription */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Tarif Formation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">€{formationData.price}</span>
                      <span className="text-lg text-gray-500 line-through">€{formationData.originalPrice}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      -{Math.round(((formationData.originalPrice - formationData.price) / formationData.originalPrice) * 100)}% de réduction
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Certificat inclus</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Support en direct</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Accès à vie</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => document.getElementById('enrollment-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    S'inscrire maintenant
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    <p>Prochaine session : {formationData.nextSessions[0]?.date}</p>
                    <p>{formationData.nextSessions[0]?.seats} places disponibles</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Image de la formation */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img 
              src={formationData.image} 
              alt={formationData.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Programme de formation */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Programme de formation</h2>
            <Button 
              variant="outline" 
              onClick={() => setShowFullProgram(!showFullProgram)}
              className="flex items-center gap-2"
            >
              {showFullProgram ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Réduire
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Voir tout
                </>
              )}
            </Button>
          </div>

          <div className="space-y-6">
            {formationData.program.slice(0, showFullProgram ? undefined : 2).map((day: any, index: number) => (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                    <span className="text-blue-600 font-bold">{day.day}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{day.title}</h3>
                    <p className="text-sm text-gray-600">{day.duration}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {day.modules.map((module: any, moduleIndex: number) => (
                    <div key={moduleIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm">
                        {module.type === 'Théorie' && <BookOpen className="h-4 w-4 text-blue-600" />}
                        {module.type === 'Pratique' && <Play className="h-4 w-4 text-green-600" />}
                        {module.type === 'Workshop' && <Users className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{module.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {module.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{module.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{module.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formateur */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Votre formateur</h2>
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              <img 
                src={formationData.instructor.avatar} 
                alt={formationData.instructor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {formationData.instructor.name}
              </h3>
              <p className="text-lg text-blue-600 mb-2">{formationData.instructor.title}</p>
              <p className="text-gray-600 mb-4">{formationData.instructor.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{formationData.instructor.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formationData.instructor.companies.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Témoignages */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Avis des participants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formationData.testimonials.map((testimonial: any, index: number) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Prochaines sessions */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prochaines sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formationData.nextSessions.map((session: any, index: number) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all ${
                  selectedSession === index ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedSession(index)}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">{session.date}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{session.location}</p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <span className="text-gray-500">{session.seats} places</span>
                      <span className="font-semibold text-green-600">€{session.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Formulaire d'inscription */}
        <div id="enrollment-form" className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Inscription à la formation</h2>
          <form onSubmit={handleEnrollment} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input 
                  id="firstName"
                  value={enrollmentForm.firstName}
                  onChange={(e) => setEnrollmentForm({...enrollmentForm, firstName: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input 
                  id="lastName"
                  value={enrollmentForm.lastName}
                  onChange={(e) => setEnrollmentForm({...enrollmentForm, lastName: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email"
                  type="email"
                  value={enrollmentForm.email}
                  onChange={(e) => setEnrollmentForm({...enrollmentForm, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input 
                  id="phone"
                  type="tel"
                  value={enrollmentForm.phone}
                  onChange={(e) => setEnrollmentForm({...enrollmentForm, phone: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="company">Entreprise</Label>
                <Input 
                  id="company"
                  value={enrollmentForm.company}
                  onChange={(e) => setEnrollmentForm({...enrollmentForm, company: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="position">Poste</Label>
                <Input 
                  id="position"
                  value={enrollmentForm.position}
                  onChange={(e) => setEnrollmentForm({...enrollmentForm, position: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea 
                id="message"
                rows={4}
                value={enrollmentForm.message}
                onChange={(e) => setEnrollmentForm({...enrollmentForm, message: e.target.value})}
                placeholder="Précisez vos attentes ou questions..."
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isEnrolling}
            >
              {isEnrolling ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer ma demande d'inscription
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Ce qui est inclus */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ce qui est inclus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formationData.includes.map((item: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prérequis */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prérequis</h2>
          <div className="space-y-3">
            {formationData.prerequisites.map((prerequisite: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">{prerequisite}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 