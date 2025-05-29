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
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [showContactForm, setShowContactForm] = useState(false)

  // Simuler un chargement progressif pour l'effet professionnel
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("loaded")
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const services = [
    {
      name: "NovaWorld",
      description: "Réseau social B2B professionnel avec IA",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
      url: "/novaworld",
    },
    {
      name: "DL Style",
      description: "Boutique en ligne premium",
      icon: ExternalLink,
      color: "bg-purple-100 text-purple-700",
      url: "/dl-style",
    },
    {
      name: "DL Travel",
      description: "Plateforme de vente de billets d'avion",
      icon: Plane,
      color: "bg-cyan-100 text-cyan-700",
      url: "/dl-travel",
    },
    {
      name: "DL Bookmaker",
      description: "Paris sportifs assistés par IA",
      icon: Trophy,
      color: "bg-green-100 text-green-700",
      url: "/dl-bookmaker",
    },
  ]

  const features = [
    {
      title: "Intelligence Artificielle",
      description: "Solutions IA avancées pour optimiser vos processus métier",
      icon: Brain,
    },
    {
      title: "Développement sur mesure",
      description: "Applications web et mobiles adaptées à vos besoins spécifiques",
      icon: Zap,
    },
    {
      title: "Support 24/7",
      description: "Une équipe d'experts disponible pour vous accompagner",
      icon: Phone,
    },
  ]

  const testimonials = [
    {
      name: "Marie Kouam",
      role: "Directrice Marketing, TechCorp",
      quote:
        "L'intégration de NovaCore a transformé notre approche marketing. Les insights générés par l'IA nous ont permis d'augmenter nos conversions de 40%.",
    },
    {
      name: "Jean Mbarga",
      role: "CEO, Innov Solutions",
      quote:
        "DL Solutions a développé une solution sur mesure qui répond parfaitement à nos besoins. Le support technique est réactif et professionnel.",
    },
    {
      name: "Sophie Ndongo",
      role: "Responsable E-commerce, ModaShop",
      quote:
        "Depuis que nous utilisons DL Style, notre taux d'abandon de panier a diminué de 35%. Une solution e-commerce vraiment efficace !",
    },
  ]

  const stats = [
    { label: "Clients", value: "500+" },
    { label: "Projets", value: "1,200+" },
    { label: "Pays", value: "25+" },
    { label: "Experts", value: "50+" },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">DL</span>
            </div>
            <span className="font-semibold">DL Solutions</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-primary">
              Accueil
            </Link>
            <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Services
            </Link>
            <Link href="/formations" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Formations
            </Link>
            <Link href="/portfolio" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Portfolio
            </Link>
            <Link href="/a-propos" className="text-sm font-medium text-muted-foreground hover:text-primary">
              À Propos
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex" asChild>
              <Link href="/novacore">NovaCore</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/devis">Devis Gratuit</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="container py-4 md:hidden border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium">
                Accueil
              </Link>
              <Link href="/services" className="text-sm font-medium text-muted-foreground">
                Services
              </Link>
              <Link href="/formations" className="text-sm font-medium text-muted-foreground">
                Formations
              </Link>
              <Link href="/portfolio" className="text-sm font-medium text-muted-foreground">
                Portfolio
              </Link>
              <Link href="/a-propos" className="text-sm font-medium text-muted-foreground">
                À Propos
              </Link>
              <Link href="/contact" className="text-sm font-medium text-muted-foreground">
                Contact
              </Link>
              <Link href="/novacore" className="text-sm font-medium text-muted-foreground">
                NovaCore
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10 opacity-[0.03]"></div>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Badge className="mb-4">Innovation & Excellence</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">DL Solutions</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Révolutionnez votre entreprise avec l'intelligence artificielle et les technologies DevOps de nouvelle
                génération
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-2 justify-center">
              <Button size="lg" asChild>
                <Link href="/services">
                  Découvrir nos services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Nos Solutions</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Un écosystème complet de services pour propulser votre entreprise
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8 md:mt-16">
            {services.map((service, i) => (
              <Card key={i} className="hover-lift">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={service.url} className="inline-flex items-center text-sm font-medium text-primary">
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
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge>Pourquoi nous choisir</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Des avantages concrets qui font la différence
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  Nous combinons expertise technique et connaissance approfondie du marché pour vous offrir des
                  solutions adaptées à vos besoins.
                </p>
              </div>
              <div className="space-y-2">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[450px] w-full overflow-hidden rounded-xl">
                <Image src="/placeholder.svg?height=450&width=600" alt="Features" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge>Témoignages</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ce que disent nos clients</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Découvrez les expériences de ceux qui nous font confiance
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8 md:mt-16">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="hover-lift">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-base">"{testimonial.quote}"</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold md:text-5xl">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Prêt à transformer votre entreprise ?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-lg">
                Rejoignez les entreprises qui font confiance à DL Solutions pour leur transformation digitale.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-2 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/devis">
                  Demander un devis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
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
      <footer className="border-t py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">DL</span>
                </div>
                <span className="font-semibold">DL Solutions</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Innovation technologique et intelligence artificielle pour transformer votre entreprise.
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
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">École de Police, Yaoundé, Cameroun</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">+237 6XX XXX XXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">contact@dl-solutions.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">© 2024 DL Solutions SARL. Tous droits réservés.</p>
            <p className="text-xs text-muted-foreground mt-2 md:mt-0">
              Made by <span className="font-semibold">Samuel OBAM</span> – DL Solutions SARL
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
