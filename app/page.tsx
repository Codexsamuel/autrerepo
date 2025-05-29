"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Star,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Zap,
  Brain,
  Plane,
  Trophy,
  Shield,
  Clock,
  Award,
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hydration fix
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const services = [
    {
      name: "NovaWorld",
      description: "Réseau social B2B professionnel avec IA",
      icon: Users,
      color: "bg-blue-50 text-blue-700 border-blue-200",
      url: "/novaworld",
      features: ["Networking IA", "Publications", "Entreprises"],
    },
    {
      name: "DL Style",
      description: "Boutique en ligne premium",
      icon: ExternalLink,
      color: "bg-purple-50 text-purple-700 border-purple-200",
      url: "/dl-style",
      features: ["E-commerce", "Mode", "Lifestyle"],
    },
    {
      name: "DL Travel",
      description: "Plateforme de vente de billets d'avion",
      icon: Plane,
      color: "bg-cyan-50 text-cyan-700 border-cyan-200",
      url: "/dl-travel",
      features: ["Vols", "Hôtels", "Packages"],
    },
    {
      name: "DL Bookmaker",
      description: "Paris sportifs assistés par IA",
      icon: Trophy,
      color: "bg-green-50 text-green-700 border-green-200",
      url: "/dl-bookmaker",
      features: ["Prédictions IA", "Paris Live", "Analytics"],
    },
  ]

  const features = [
    {
      title: "Intelligence Artificielle",
      description: "Solutions IA avancées pour optimiser vos processus métier et augmenter votre productivité",
      icon: Brain,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Développement sur mesure",
      description: "Applications web et mobiles adaptées à vos besoins spécifiques avec les dernières technologies",
      icon: Zap,
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Support 24/7",
      description: "Une équipe d'experts disponible pour vous accompagner à tout moment dans vos projets",
      icon: Phone,
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Sécurité renforcée",
      description: "Protection avancée de vos données avec les standards de sécurité les plus élevés",
      icon: Shield,
      color: "bg-red-50 text-red-700",
    },
    {
      title: "Déploiement rapide",
      description: "Mise en production accélérée grâce à nos processus DevOps optimisés",
      icon: Clock,
      color: "bg-orange-50 text-orange-700",
    },
    {
      title: "Qualité certifiée",
      description: "Solutions testées et validées selon les meilleures pratiques de l'industrie",
      icon: Award,
      color: "bg-indigo-50 text-indigo-700",
    },
  ]

  const testimonials = [
    {
      name: "Marie Kouam",
      role: "Directrice Marketing",
      company: "TechCorp Cameroun",
      quote:
        "L'intégration de NovaCore a transformé notre approche marketing. Les insights générés par l'IA nous ont permis d'augmenter nos conversions de 40% en seulement 3 mois.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Jean Mbarga",
      role: "CEO",
      company: "Innov Solutions",
      quote:
        "DL Solutions a développé une solution sur mesure qui répond parfaitement à nos besoins. Le support technique est réactif et l'équipe très professionnelle.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Sophie Ndongo",
      role: "Responsable E-commerce",
      company: "ModaShop",
      quote:
        "Depuis que nous utilisons DL Style, notre taux d'abandon de panier a diminué de 35%. Une solution e-commerce vraiment efficace et intuitive !",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const stats = [
    { label: "Clients satisfaits", value: "500+", description: "Entreprises qui nous font confiance" },
    { label: "Projets réalisés", value: "1,200+", description: "Solutions déployées avec succès" },
    { label: "Pays couverts", value: "25+", description: "Présence internationale" },
    { label: "Experts certifiés", value: "50+", description: "Professionnels qualifiés" },
  ]

  const advantages = [
    {
      title: "ROI Garanti",
      description: "Retour sur investissement mesurable dès les premiers mois",
      percentage: "300%",
    },
    {
      title: "Temps de déploiement",
      description: "Mise en production 3x plus rapide que la concurrence",
      percentage: "70%",
    },
    {
      title: "Satisfaction client",
      description: "Taux de satisfaction exceptionnel de nos clients",
      percentage: "98%",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center">
              <Image
                src="/images/dl-logo.jpg"
                alt="DL Solutions SARL - Transformation Digitale & IA"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-semibold text-base sm:text-lg">DL Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link href="/" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Accueil
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/formations"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Formations
            </Link>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/a-propos"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              À Propos
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex" asChild>
              <Link href="/novacore">NovaCore</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/devis">Devis Gratuit</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu de navigation"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="container py-4 lg:hidden border-t bg-background">
            <nav className="flex flex-col space-y-4">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                <div className="h-10 w-10 flex items-center justify-center">
                  <Image
                    src="/images/dl-logo.jpg"
                    alt="DL Solutions Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="font-semibold">DL Solutions</span>
              </div>
              <Link href="/" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
              <Link
                href="/services"
                className="text-sm font-medium text-muted-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/formations"
                className="text-sm font-medium text-muted-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Formations
              </Link>
              <Link
                href="/portfolio"
                className="text-sm font-medium text-muted-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/a-propos"
                className="text-sm font-medium text-muted-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/novacore"
                className="text-sm font-medium text-muted-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                NovaCore
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10 opacity-[0.03]"></div>
        <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
            <div className="space-y-4">
              <Badge className="mb-4 text-xs sm:text-sm">Innovation & Excellence</Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter">
                DL Solutions
              </h1>
              <p className="mx-auto max-w-[90%] sm:max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                Révolutionnez votre entreprise avec l'intelligence artificielle et les technologies DevOps de nouvelle
                génération
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/services">
                  Découvrir nos services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center space-y-2 text-center p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm sm:text-base font-medium text-foreground">{stat.label}</div>
                <div className="text-xs sm:text-sm text-muted-foreground max-w-[150px]">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">Nos Solutions</h2>
              <p className="mx-auto max-w-[90%] sm:max-w-[700px] text-muted-foreground text-base sm:text-lg">
                Un écosystème complet de services pour propulser votre entreprise
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <Card key={i} className="hover-lift border-2 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${service.color} border flex items-center justify-center mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{service.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{service.description}</CardDescription>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {service.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardFooter>
                  <Link
                    href={service.url}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    En savoir plus
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="grid gap-8 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4 text-center lg:text-left">
                <Badge>Pourquoi nous choisir</Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
                  Des avantages concrets qui font la différence
                </h2>
                <p className="max-w-[90%] mx-auto lg:mx-0 lg:max-w-[600px] text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Nous combinons expertise technique et connaissance approfondie du marché pour vous offrir des
                  solutions adaptées à vos besoins.
                </p>
              </div>

              {/* Advantages Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {advantages.map((advantage, i) => (
                  <div key={i} className="text-center p-4 rounded-lg bg-background border">
                    <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{advantage.percentage}</div>
                    <h3 className="font-semibold mb-1">{advantage.title}</h3>
                    <p className="text-sm text-muted-foreground">{advantage.description}</p>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-background/50 transition-colors"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${feature.color}`}>
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm sm:text-base">{feature.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
            <div className="space-y-2">
              <Badge>Témoignages</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">Ce que disent nos clients</h2>
              <p className="mx-auto max-w-[90%] sm:max-w-[700px] text-muted-foreground text-base sm:text-lg">
                Découvrez les expériences de ceux qui nous font confiance
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="hover-lift transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-sm sm:text-base leading-relaxed">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={`Photo de ${testimonial.name}`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
                Prêt à transformer votre entreprise ?
              </h2>
              <p className="mx-auto max-w-[90%] sm:max-w-[700px] text-base sm:text-lg opacity-90">
                Rejoignez les entreprises qui font confiance à DL Solutions pour leur transformation digitale.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                <Link href="/devis">
                  Demander un devis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/rendez-vous">
                  <Calendar className="mr-2 h-4 w-4" />
                  Prendre rendez-vous
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center">
                  <Image
                    src="/images/dl-logo.jpg"
                    alt="DL Solutions Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span className="font-semibold text-base sm:text-lg">DL Solutions</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Innovation technologique et intelligence artificielle pour transformer votre entreprise au Cameroun et
                en Afrique.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/novaworld" className="text-muted-foreground hover:text-foreground transition-colors">
                    NovaWorld
                  </Link>
                </li>
                <li>
                  <Link href="/dl-style" className="text-muted-foreground hover:text-foreground transition-colors">
                    DL Style
                  </Link>
                </li>
                <li>
                  <Link href="/dl-travel" className="text-muted-foreground hover:text-foreground transition-colors">
                    DL Travel
                  </Link>
                </li>
                <li>
                  <Link href="/dl-bookmaker" className="text-muted-foreground hover:text-foreground transition-colors">
                    DL Bookmaker
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Liens Utiles</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/a-propos" className="text-muted-foreground hover:text-foreground transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/formations" className="text-muted-foreground hover:text-foreground transition-colors">
                    Formations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">2 rue École de Police, Yaoundé, Cameroun</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a href="tel:+237694341586" className="text-muted-foreground hover:text-foreground transition-colors">
                    +237 694 341 586
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a
                    href="mailto:sobam@daveandlucesolutions.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    sobam@daveandlucesolutions.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © 2024 DL Solutions SARL. Tous droits réservés.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right">
              Made by <span className="font-semibold">Samuel OBAM</span> – DL Solutions SARL
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
