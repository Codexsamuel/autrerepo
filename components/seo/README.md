# Composant SEO Avancé - DL Solutions

Ce composant React/Next.js offre une solution complète et avancée pour l'optimisation SEO de votre application web.

## 🚀 Fonctionnalités

### ✅ SEO de Base
- Meta tags dynamiques (title, description, keywords)
- URL canonique
- Gestion des locales et langues alternatives
- Contrôle des robots (noindex, nofollow, etc.)

### ✅ Open Graph & Réseaux Sociaux
- Meta tags Open Graph complets
- Twitter Cards optimisées
- Images sociales avec dimensions optimales
- Support multi-réseaux sociaux

### ✅ Données Structurées (Schema.org)
- Organisation et site web
- Articles et produits
- Navigation (breadcrumbs)
- Informations de contact et adresse

### ✅ Performance & Accessibilité
- Préchargement des ressources critiques
- DNS prefetch pour les services externes
- Meta tags de performance
- Support PWA et mobile

### ✅ Sécurité
- Headers de sécurité
- Politique de permissions
- Protection XSS et clickjacking

## 📦 Installation

```bash
# Le composant est déjà inclus dans le projet
import { AdvancedSEO } from '@/components/seo';
```

## 🎯 Utilisation Rapide

### Configuration de base

```tsx
import { AdvancedSEO } from '@/components/seo';
import { generateSEOProps } from '@/components/seo/seoConfig';

export default function MaPage() {
  return (
    <>
      <AdvancedSEO
        {...generateSEOProps(
          "Titre de ma page",
          "Description de ma page",
          ["mot-clé1", "mot-clé2"],
          "/chemin-de-la-page"
        )}
      />
      {/* Contenu de votre page */}
    </>
  );
}
```

### Avec des données d'article

```tsx
<AdvancedSEO
  {...generateSEOProps(
    "Titre de l'article",
    "Description de l'article",
    ["mot-clé1", "mot-clé2"],
    "/blog/mon-article",
    "/images/article.jpg",
    "article",
    {
      publishedTime: "2024-01-15T10:00:00Z",
      modifiedTime: "2024-01-15T10:00:00Z",
      author: "Nom de l'auteur",
      section: "Catégorie",
      tags: ["tag1", "tag2"]
    }
  )}
/>
```

### Avec des données de produit

```tsx
<AdvancedSEO
  {...generateSEOProps(
    "Nom du produit",
    "Description du produit",
    ["produit", "achat"],
    "/produits/mon-produit",
    "/images/produit.jpg",
    "product",
    undefined,
    {
      name: "Nom du produit",
      description: "Description détaillée",
      price: 99.99,
      currency: "EUR",
      availability: "in stock",
      brand: "DL Solutions",
      category: "Technologie",
      images: ["/image1.jpg", "/image2.jpg"]
    }
  )}
/>
```

## ⚙️ Configuration

### Personnalisation de l'organisation

Modifiez `seoConfig.ts` pour adapter les informations à votre entreprise :

```tsx
export const defaultSEOConfig = {
  organization: {
    name: "Votre Entreprise",
    url: "https://votre-site.com",
    logo: "https://votre-site.com/logo.png",
    // ... autres informations
  },
  // ... autres configurations
};
```

### Mots-clés par défaut

Ajoutez vos mots-clés principaux dans la configuration :

```tsx
defaultKeywords: [
  "votre-marque",
  "votre-domaine",
  "mots-clés-principaux"
]
```

## 🔧 Props Avancées

### Contrôle des robots

```tsx
<AdvancedSEO
  {...generateSEOProps("Titre", "Description", [], "/chemin")}
  noindex={true}        // Empêche l'indexation
  nofollow={true}       // Empêche le suivi des liens
  noarchive={true}      // Empêche l'archivage
  nosnippet={true}      // Empêche l'affichage de snippets
/>
```

### Performance des images et vidéos

```tsx
<AdvancedSEO
  {...generateSEOProps("Titre", "Description", [], "/chemin")}
  maxImagePreview="large"    // none, standard, large
  maxVideoPreview={10}       // -1 pour illimité
  maxSnippet={150}           // -1 pour illimité
/>
```

## 📱 Support Mobile & PWA

Le composant inclut automatiquement :
- Meta tags viewport optimisés
- Support Apple Touch Icons
- Configuration PWA
- Thème de couleur adaptatif

## 🌐 Internationalisation

Support automatique des locales alternatives :

```tsx
// Dans seoConfig.ts
alternateLocales: ["en-US", "es-ES", "de-DE"]

// Génère automatiquement les balises hreflang
<link rel="alternate" hrefLang="en-US" href="https://dlsolutions.com/en/page" />
```

## 🔍 Données Structurées

Le composant génère automatiquement :
- **WebPage** : Informations de base de la page
- **Organization** : Détails de votre entreprise
- **BreadcrumbList** : Navigation hiérarchique
- **Article** : Si des données d'article sont fournies
- **Product** : Si des données de produit sont fournies

## 📊 Monitoring & Analytics

### Google Search Console
- URL canonique automatique
- Meta robots optimisés
- Données structurées valides

### Réseaux sociaux
- Open Graph complet
- Twitter Cards optimisées
- Images sociales aux bonnes dimensions

## 🚨 Dépannage

### Problèmes courants

1. **Meta tags non mis à jour** : Vérifiez que le composant est bien dans le DOM
2. **Données structurées invalides** : Utilisez l'outil de test Google
3. **Images sociales non affichées** : Vérifiez les dimensions (1200x630px recommandé)

### Validation

- **Meta tags** : Inspectez le code source de la page
- **Open Graph** : Utilisez Facebook Sharing Debugger
- **Twitter Cards** : Utilisez Twitter Card Validator
- **Schema.org** : Utilisez Google Rich Results Test

## 📈 Bonnes Pratiques

1. **Titres uniques** : Chaque page doit avoir un titre unique
2. **Descriptions optimisées** : 150-160 caractères maximum
3. **Mots-clés naturels** : Évitez le keyword stuffing
4. **Images optimisées** : Utilisez des images de qualité pour les réseaux sociaux
5. **URLs propres** : Utilisez des URLs descriptives et courtes

## 🔗 Liens Utiles

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

## 📝 Licence

Ce composant fait partie de la plateforme DL Solutions et est fourni sous licence MIT. 