# 💰 Guide d'Intégration Google AdSense

## 📋 Votre Configuration AdSense

**Publisher ID:** `ca-pub-7781413449967091`  
**Site:** `daveandlucesolutions.com`  
**Statut actuel:** En cours de révision  
**Email:** fastsafe2025@gmail.com

## 🚀 Configuration Complète

### 1. Variables d'Environnement

Ajoutez ces variables dans votre fichier `.env.local` :

```bash
# Google AdSense
GOOGLE_ADSENSE_PUBLISHER_ID=ca-pub-7781413449967091
GOOGLE_ADSENSE_CLIENT_ID=your_client_id_here
GOOGLE_ADSENSE_CLIENT_SECRET=your_client_secret_here
GOOGLE_ADSENSE_REFRESH_TOKEN=your_refresh_token_here

# Site Configuration
SITE_URL=https://daveandlucesolutions.com
SITE_NAME=DL Solutions
```

### 2. Intégration du Code AdSense

#### Étape 1: Ajouter le code AdSense dans le layout

Ajoutez ce code dans votre `app/layout.tsx` :

```tsx
// Dans le head de votre layout
<head>
  {/* ... autres meta tags ... */}

  {/* Google AdSense */}
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7781413449967091"
    crossOrigin="anonymous"
  ></script>

  {/* Meta tag AdSense */}
  <meta name="google-adsense-account" content="ca-pub-7781413449967091" />
</head>
```

#### Étape 2: Créer des composants publicitaires

Créez `components/ads/AdSenseAd.tsx` :

```tsx
"use client";

import { useEffect } from "react";

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: "auto" | "fluid";
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseAd({
  adSlot,
  adFormat = "auto",
  style,
  className,
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Erreur lors du chargement de la publicité:", error);
    }
  }, []);

  return (
    <div className={`ad-container ${className || ""}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7781413449967091"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

#### Étape 3: Créer des unités publicitaires spécifiques

Créez `components/ads/AdUnits.tsx` :

```tsx
import AdSenseAd from "./AdSenseAd";

// Bannière principale (header)
export function HeaderAd() {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 p-2">
      <AdSenseAd
        adSlot="1234567890" // Remplacez par votre vrai ad slot
        className="w-full h-90"
        style={{ minHeight: "90px" }}
      />
    </div>
  );
}

// Publicité latérale
export function SidebarAd() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
      <AdSenseAd
        adSlot="0987654321" // Remplacez par votre vrai ad slot
        className="w-full h-600"
        style={{ minHeight: "600px" }}
      />
    </div>
  );
}

// Publicité in-article
export function InArticleAd() {
  return (
    <div className="my-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <AdSenseAd
        adSlot="1122334455" // Remplacez par votre vrai ad slot
        adFormat="fluid"
        className="w-full"
      />
    </div>
  );
}

// Publicité footer
export function FooterAd() {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 p-2 mt-8">
      <AdSenseAd
        adSlot="5566778899" // Remplacez par votre vrai ad slot
        className="w-full h-90"
        style={{ minHeight: "90px" }}
      />
    </div>
  );
}
```

### 3. Intégration dans les Pages

#### Étape 1: Ajouter les publicités sur la page d'accueil

Modifiez `app/page.tsx` :

```tsx
import { HeaderAd, InArticleAd, FooterAd } from "@/components/ads/AdUnits";

export default function HomePage() {
  return (
    <div>
      {/* Publicité header */}
      <HeaderAd />

      {/* Contenu principal */}
      <main>
        {/* ... votre contenu existant ... */}

        {/* Publicité in-article */}
        <InArticleAd />

        {/* ... suite du contenu ... */}
      </main>

      {/* Publicité footer */}
      <FooterAd />
    </div>
  );
}
```

#### Étape 2: Ajouter les publicités sur les pages de contenu

Modifiez `app/services/page.tsx` :

```tsx
import { SidebarAd, InArticleAd } from "@/components/ads/AdUnits";

export default function ServicesPage() {
  return (
    <div className="flex">
      {/* Contenu principal */}
      <div className="flex-1">
        {/* ... votre contenu existant ... */}

        {/* Publicité in-article */}
        <InArticleAd />
      </div>

      {/* Sidebar avec publicité */}
      <aside className="w-80 ml-8">
        <SidebarAd />
      </aside>
    </div>
  );
}
```

### 4. Optimisation des Publicités

#### Étape 1: Responsive Design

Ajoutez ces styles CSS dans `app/globals.css` :

```css
/* Styles pour les publicités */
.ad-container {
  text-align: center;
  margin: 1rem 0;
}

/* Responsive pour mobile */
@media (max-width: 768px) {
  .ad-container {
    margin: 0.5rem 0;
  }

  .ad-container ins {
    max-width: 100% !important;
    height: auto !important;
  }
}

/* Masquer les publicités pour les utilisateurs connectés */
.user-logged-in .ad-container {
  display: none;
}

/* Masquer les publicités pour les abonnés premium */
.premium-user .ad-container {
  display: none;
}
```

#### Étape 2: Gestion des publicités selon le statut utilisateur

Créez `components/ads/AdManager.tsx` :

```tsx
"use client";

import { useSession } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

interface AdManagerProps {
  children: React.ReactNode;
  adType: "header" | "sidebar" | "in-article" | "footer";
}

export default function AdManager({ children, adType }: AdManagerProps) {
  const { isAuthenticated } = useSession();
  const { isSubscribed } = useSubscription();

  // Ne pas afficher les publicités pour les utilisateurs connectés ou abonnés
  if (isAuthenticated || isSubscribed) {
    return null;
  }

  // Masquer certaines publicités sur mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    if (adType === "sidebar") {
      return null;
    }
  }

  return <>{children}</>;
}
```

### 5. Configuration AdSense Avancée

#### Étape 1: Créer des unités publicitaires dans AdSense

1. Connectez-vous à [Google AdSense](https://adsense.google.com)
2. Allez dans "Publicités" > "Par unité publicitaire"
3. Cliquez sur "Créer une nouvelle unité publicitaire"
4. Configurez :
   - **Nom:** Bannière principale
   - **Type:** Affichage
   - **Taille:** Responsive
   - **Style:** Automatique

#### Étape 2: Obtenir les codes d'unité publicitaire

Pour chaque unité créée, copiez le code généré et remplacez les `adSlot` dans vos composants.

#### Étape 3: Configuration des règles de publicité

Dans AdSense, configurez :

- **Fréquence des publicités:** Max 3 par page
- **Exclusion de contenu:** Pages sensibles
- **Géolocalisation:** Cibler la France
- **Catégories:** Technologie, Business

### 6. Monitoring et Analytics

#### Étape 1: Intégration avec Google Analytics

Ajoutez ce code pour tracker les clics publicitaires :

```tsx
// Dans votre composant AdSenseAd
useEffect(() => {
  const handleAdClick = () => {
    // Tracker le clic avec Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ad_click", {
        ad_slot: adSlot,
        ad_format: adFormat,
        page_location: window.location.href,
      });
    }
  };

  // Écouter les clics sur les publicités
  document.addEventListener("click", (e) => {
    if (e.target.closest(".adsbygoogle")) {
      handleAdClick();
    }
  });
}, [adSlot, adFormat]);
```

#### Étape 2: Dashboard de monitoring

Votre dashboard inclut maintenant :

- **Revenus en temps réel**
- **Performance des publicités**
- **Taux de clic (CTR)**
- **Revenus par mille impressions (RPM)**
- **Statut des unités publicitaires**

### 7. Optimisation des Revenus

#### Stratégies recommandées :

1. **Placement optimal :**

   - Header : Visibilité maximale
   - In-article : Engagement élevé
   - Sidebar : Complémentaire
   - Footer : Dernière chance

2. **Contenu de qualité :**

   - Articles longs (1000+ mots)
   - Contenu original et unique
   - Mise à jour régulière
   - SEO optimisé

3. **Expérience utilisateur :**

   - Publicités non intrusives
   - Chargement rapide
   - Design responsive
   - Navigation claire

4. **Conformité :**
   - Respect des politiques AdSense
   - Consentement RGPD
   - Contenu approprié
   - Pas de clics frauduleux

### 8. Résolution des Problèmes

#### Problèmes courants et solutions :

**Publicités ne s'affichent pas :**

- Vérifiez que le site est approuvé
- Attendez 24-48h après l'approbation
- Vérifiez le code AdSense
- Testez sur différents navigateurs

**Revenus faibles :**

- Optimisez le placement des publicités
- Améliorez le contenu
- Augmentez le trafic
- Testez différents formats

**Compte en révision :**

- Respectez les politiques AdSense
- Supprimez tout contenu inapproprié
- Attendez la décision de Google
- Contactez le support si nécessaire

### 9. Intégration avec votre Dashboard

Votre dashboard super admin inclut maintenant :

✅ **Statut AdSense en temps réel**  
✅ **Revenus détaillés** (jour/mois/année/total)  
✅ **Performance des publicités** (impressions, clics, CTR)  
✅ **Gestion des unités publicitaires**  
✅ **Alertes et notifications**  
✅ **Intégration avec Google Analytics**

## 🎉 Résultat Final

Avec cette configuration complète, vous aurez :

💰 **Monétisation optimale** de votre site  
📊 **Suivi détaillé** des revenus publicitaires  
🎯 **Placement intelligent** des publicités  
📱 **Expérience responsive** sur tous les appareils  
🔒 **Conformité** avec les politiques AdSense  
📈 **Optimisation continue** basée sur les données

Votre site `daveandlucesolutions.com` sera prêt à générer des revenus publicitaires dès l'approbation par Google AdSense !
