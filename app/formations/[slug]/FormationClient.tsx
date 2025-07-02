"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  MapPin,
  Globe,
  Award,
  Target,
  Zap,
  Shield,
  Download,
  Share2,
  Heart,
  MessageCircle,
  BarChart3,
  TrendingUp,
  GraduationCap,
  Video,
  FileText,
  Code,
  Palette,
  ShoppingCart,
  CreditCard,
  Truck,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Formation } from '@/lib/data/formations';

interface FormationClientProps {
  formation: Formation;
}

export default function FormationClient({ formation }: FormationClientProps) {
  const [selectedModule, setSelectedModule] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'débutant':
        return 'bg-green-100 text-green-800';
      case 'intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'avancé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category?: string) => {
    if (!category) return <BookOpen className="h-5 w-5" />;
    
    const categoryLower = category.toLowerCase();
    switch (categoryLower) {
      case 'crm':
      case 'gestion client':
        return <Users className="h-5 w-5" />;
      case 'marketing':
      case 'marketing digital':
        return <TrendingUp className="h-5 w-5" />;
      case 'e-commerce':
      case 'vente en ligne':
        return <ShoppingCart className="h-5 w-5" />;
      case 'ia':
      case 'intelligence artificielle':
        return <Zap className="h-5 w-5" />;
      case 'design':
      case 'création visuelle':
        return <Palette className="h-5 w-5" />;
      case 'télévente':
      case 'prospection':
        return <Target className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {getCategoryIcon(formation.icon)}
                  <span className="ml-2">{formation.title}</span>
                </Badge>
                <Badge className={getDifficultyColor(formation.level)}>
                  {formation.level}
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {formation.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {formation.description}
              </p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-5 w-5" />
                  <span>{formation.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span>{formation.students} étudiants</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{formation.rating}/5</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {formation.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {formatPrice(formation.price)}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Accès à vie • Certificat inclus
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    S'inscrire maintenant
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Ajouter aux favoris
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Garantie satisfait ou remboursé 30 jours
                    </p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Ce qui est inclus :</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Accès à vie au contenu
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Certificat de formation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Support pédagogique
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Exercices pratiques
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Communauté d'apprenants
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Ce que vous allez apprendre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formation.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Contenu de la formation
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {formation.program.length} modules • {formation.program.reduce((total, day) => total + day.modules.length, 0)} leçons • {formation.duration}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formation.program.map((day, dayIndex) => (
                    <div key={dayIndex} className="border rounded-lg">
                      <button
                        onClick={() => setSelectedModule(dayIndex)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {dayIndex + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{day.title}</h4>
                            <p className="text-sm text-gray-600">
                              {day.modules.length} leçons • {day.duration}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </button>
                      
                      {selectedModule === dayIndex && (
                        <div className="border-t bg-gray-50 p-4">
                          <div className="space-y-3">
                            {day.modules.map((module, moduleIndex) => (
                              <div key={moduleIndex} className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-xs text-gray-600">
                                    {moduleIndex + 1}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <h5 className="text-sm font-medium text-gray-900">
                                    {module.title}
                                  </h5>
                                  <p className="text-xs text-gray-600">
                                    {module.duration} • {module.type}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {module.type === 'Théorie' && <FileText className="h-3 w-3 text-blue-500" />}
                                  {module.type === 'Pratique' && <Code className="h-3 w-3 text-green-500" />}
                                  {module.type === 'Workshop' && <Target className="h-3 w-3 text-purple-500" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Prérequis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {formation.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Votre formateur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <img
                    src={formation.instructor.avatar}
                    alt={formation.instructor.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{formation.instructor.name}</h4>
                    <p className="text-sm text-gray-600">{formation.instructor.title}</p>
                    <p className="text-sm text-gray-600">{formation.instructor.experience}</p>
                    <p className="text-sm text-gray-600 mt-2">{formation.instructor.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {formation.instructor.companies.map((company, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Progression moyenne</span>
                  <span className="font-semibold">87%</span>
                </div>
                <Progress value={87} className="w-full" />
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{formation.students}</div>
                    <div className="text-sm text-gray-600">Étudiants</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">94%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificate Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Certificat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Certificat de formation
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Reconnu par l'industrie • Partageable sur LinkedIn
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Voir un exemple
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Besoin d'aide ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat en direct
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Nous contacter
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 