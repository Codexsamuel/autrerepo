"use client";

import { AdvancedSEO } from './AdvancedSEO';
import { generateSEOProps } from './seoConfig';

// Exemple pour une page d'accueil
export function HomePageSEO() {
  return (
    <AdvancedSEO
      {...generateSEOProps(
        "DL Solutions - Plateforme d'Intelligence Artificielle et Solutions Technologiques",
        "Découvrez DL Solutions, votre partenaire technologique pour l'innovation et l'intelligence artificielle. Solutions sur mesure pour entreprises et particuliers.",
        ["accueil", "plateforme", "solutions"],
        "/",
        "/images/home-og.jpg"
      )}
    />
  );
}

// Exemple pour une page d'article
export function ArticlePageSEO() {
  return (
    <AdvancedSEO
      {...generateSEOProps(
        "Comment l'IA révolutionne le business en 2024 - DL Solutions",
        "Découvrez comment l'intelligence artificielle transforme les entreprises en 2024. Tendances, cas d'usage et conseils d'experts.",
        ["IA", "business", "2024", "tendances", "transformation"],
        "/blog/ia-business-2024",
        "/images/article-ia-business.jpg",
        "article",
        {
          publishedTime: "2024-01-15T10:00:00Z",
          modifiedTime: "2024-01-15T10:00:00Z",
          author: "Équipe DL Solutions",
          section: "Intelligence Artificielle",
          tags: ["IA", "Business", "Innovation", "2024"]
        }
      )}
    />
  );
}

// Exemple pour une page de produit
export function ProductPageSEO() {
  return (
    <AdvancedSEO
      {...generateSEOProps(
        "Chatbot IA Pro - Solution de Support Client Intelligent | DL Solutions",
        "Chatbot IA Pro : solution avancée de support client avec intelligence artificielle. Automatisez votre service client 24/7.",
        ["chatbot", "IA", "support client", "automatisation"],
        "/produits/chatbot-ia-pro",
        "/images/chatbot-pro.jpg",
        "product",
        undefined,
        {
          name: "Chatbot IA Pro",
          description: "Solution de support client intelligent avec IA",
          price: 299,
          currency: "EUR",
          availability: "in stock",
          brand: "DL Solutions",
          category: "Intelligence Artificielle",
          images: [
            "/images/chatbot-pro-1.jpg",
            "/images/chatbot-pro-2.jpg"
          ]
        }
      )}
    />
  );
}

// Exemple pour une page de service
export function ServicePageSEO() {
  return (
    <AdvancedSEO
      {...generateSEOProps(
        "Services de Scraping et Collecte de Données - DL Solutions",
        "Services professionnels de scraping et collecte de données web. Extraction automatisée, analyse et insights pour votre business.",
        ["scraping", "collecte données", "extraction", "analyse"],
        "/services/scraping-donnees",
        "/images/scraping-service.jpg"
      )}
    />
  );
}

// Exemple pour une page de contact
export function ContactPageSEO() {
  return (
    <AdvancedSEO
      {...generateSEOProps(
        "Contactez DL Solutions - Experts en IA et Solutions Technologiques",
        "Contactez l'équipe DL Solutions pour vos projets d'IA et solutions technologiques. Consultation gratuite et devis personnalisé.",
        ["contact", "consultation", "devis", "expertise"],
        "/contact",
        "/images/contact-og.jpg"
      )}
    />
  );
} 