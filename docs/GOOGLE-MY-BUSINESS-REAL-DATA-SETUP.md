# 🎯 Configuration Google My Business - Données Réelles

## 📋 Votre Profil Google My Business

**Business Profile ID:** `14485140012634952843`  
**Shop Code:** `04159489840104332581`  
**Nom:** DL Solutions  
**Site web:** https://daveandlucesolutions.com

## 🚀 Configuration Complète

### 1. Variables d'Environnement

Ajoutez ces variables dans votre fichier `.env.local` :

```bash
# Google My Business API
GOOGLE_MY_BUSINESS_API_KEY=your_api_key_here
GOOGLE_MY_BUSINESS_CLIENT_ID=your_client_id_here
GOOGLE_MY_BUSINESS_CLIENT_SECRET=your_client_secret_here
GOOGLE_MY_BUSINESS_REFRESH_TOKEN=your_refresh_token_here

# Business Profile Configuration
BUSINESS_PROFILE_ID=14485140012634952843
BUSINESS_SHOP_CODE=04159489840104332581

# Base de données Supabase (pour le tracking des visiteurs)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key

# Géolocalisation IP
IPAPI_API_KEY=your_ipapi_key_here
```

### 2. Configuration Google Cloud Console

#### Étape 1: Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un existant
3. Activez l'API Google My Business API

#### Étape 2: Créer les identifiants OAuth

1. Allez dans "APIs & Services" > "Credentials"
2. Cliquez sur "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configurez :
   - **Application type:** Web application
   - **Name:** DL Solutions My Business
   - **Authorized redirect URIs:**
     - `http://localhost:3000/api/auth/google/callback`
     - `https://daveandlucesolutions.com/api/auth/google/callback`

#### Étape 3: Obtenir le Refresh Token

1. Utilisez ce script pour obtenir le refresh token :

```javascript
// scripts/get-google-refresh-token.js
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  "YOUR_CLIENT_ID",
  "YOUR_CLIENT_SECRET",
  "http://localhost:3000/api/auth/google/callback"
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/business.manage",
    "https://www.googleapis.com/auth/analytics.readonly",
  ],
});

console.log("Authorize this app by visiting this url:", authUrl);
```

### 3. Configuration Base de Données

#### Étape 1: Créer un projet Supabase

1. Allez sur [Supabase](https://supabase.com/)
2. Créez un nouveau projet
3. Récupérez l'URL et la clé de service

#### Étape 2: Exécuter le script SQL

Exécutez ce script dans l'éditeur SQL de Supabase :

```sql
-- Table pour les sessions de visiteurs
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT NOT NULL CHECK (source IN ('search', 'maps', 'direct', 'social', 'referral')),
  action TEXT NOT NULL CHECK (action IN ('view', 'click', 'call', 'direction', 'website_visit')),
  location JSONB NOT NULL,
  device TEXT NOT NULL CHECK (device IN ('mobile', 'desktop', 'tablet')),
  session_duration INTEGER NOT NULL DEFAULT 0,
  pages_viewed TEXT[] DEFAULT '{}',
  search_query TEXT,
  user_agent TEXT,
  ip_address TEXT,
  is_returning BOOLEAN DEFAULT FALSE,
  business_profile_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_business_profile_id ON visitor_sessions(business_profile_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_timestamp ON visitor_sessions(timestamp);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor_id ON visitor_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_action ON visitor_sessions(action);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_source ON visitor_sessions(source);

-- Table pour les métadonnées des visiteurs
CREATE TABLE IF NOT EXISTS visitor_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT UNIQUE NOT NULL,
  business_profile_id TEXT NOT NULL,
  first_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_visits INTEGER DEFAULT 1,
  total_duration INTEGER DEFAULT 0,
  preferred_device TEXT,
  preferred_location JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les métadonnées
CREATE INDEX IF NOT EXISTS idx_visitor_metadata_visitor_id ON visitor_metadata(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_metadata_business_profile_id ON visitor_metadata(business_profile_id);
```

### 4. Intégration du Tracking

#### Étape 1: Ajouter le script de tracking

Ajoutez ce script dans votre `app/layout.tsx` :

```tsx
// Dans le head de votre layout
<head>
  {/* ... autres meta tags ... */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        // Script de tracking des visiteurs
        (function() {
          'use strict';
          
          // Récupérer les IDs depuis les headers
          const visitorId = document.querySelector('meta[name="visitor-id"]')?.content;
          const sessionId = document.querySelector('meta[name="session-id"]')?.content;
          
          if (!visitorId || !sessionId) {
            console.warn('IDs de tracking manquants');
            return;
          }
          
          let sessionStartTime = Date.now();
          let isPageVisible = true;
          
          // Tracker la visibilité de la page
          document.addEventListener('visibilitychange', function() {
            isPageVisible = !document.hidden;
          });
          
          // Tracker les clics sur les liens externes
          document.addEventListener('click', function(e) {
            const target = e.target.closest('a');
            if (!target) return;
            
            const href = target.href;
            if (!href) return;
            
            // Détecter le type d'action
            let action = 'click';
            if (href.startsWith('tel:')) action = 'call';
            else if (href.startsWith('mailto:')) action = 'call';
            else if (href.includes('maps.google.com') || href.includes('google.com/maps')) action = 'direction';
            else if (href.startsWith('http') && !href.includes(window.location.hostname)) action = 'website_visit';
            
            // Envoyer l'action au serveur
            fetch('/api/tracking/action', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Visitor-ID': visitorId,
                'X-Session-ID': sessionId
              },
              body: JSON.stringify({
                action: action,
                url: href,
                timestamp: new Date().toISOString()
              })
            }).catch(console.error);
          });
          
          // Envoyer la durée de session avant de quitter
          window.addEventListener('beforeunload', function() {
            const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
            
            // Utiliser sendBeacon pour une transmission fiable
            const data = new FormData();
            data.append('action', 'session_end');
            data.append('duration', duration.toString());
            data.append('visitor_id', visitorId);
            data.append('session_id', sessionId);
            
            navigator.sendBeacon('/api/tracking/session-end', data);
          });
          
          console.log('Tracking client initialisé');
        })();
      `,
    }}
  />
</head>
```

#### Étape 2: Configurer le middleware

Ajoutez le middleware de tracking dans votre `middleware.ts` :

```typescript
import { visitorTrackerMiddleware } from "@/middleware/visitor-tracker";

export function middleware(request: NextRequest) {
  // Appliquer le tracking des visiteurs
  const response = NextResponse.next();
  return visitorTrackerMiddleware(request, response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

### 5. API Routes pour Données Réelles

#### Étape 1: API Google My Business

Créez `app/api/google-my-business/real-data/route.ts` :

```typescript
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const businessProfileId = "14485140012634952843";

export async function GET(request: NextRequest) {
  try {
    // Configuration OAuth
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_MY_BUSINESS_CLIENT_ID,
      process.env.GOOGLE_MY_BUSINESS_CLIENT_SECRET,
      "http://localhost:3000/api/auth/google/callback"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_MY_BUSINESS_REFRESH_TOKEN,
    });

    // Récupérer les vraies données
    const mybusiness = google.mybusiness("v4");

    // Récupérer les insights
    const insightsResponse = await mybusiness.accounts.locations.reportInsights(
      {
        auth: oauth2Client,
        name: `accounts/${businessProfileId}/locations/${businessProfileId}`,
        requestBody: {
          locationNames: [
            `accounts/${businessProfileId}/locations/${businessProfileId}`,
          ],
          basicRequest: {
            metricRequests: [
              { metric: "QUERIES_DIRECT" },
              { metric: "QUERIES_INDIRECT" },
              { metric: "VIEWS_MAPS" },
              { metric: "VIEWS_SEARCH" },
              { metric: "ACTIONS_WEBSITE" },
              { metric: "ACTIONS_PHONE" },
              { metric: "ACTIONS_DRIVING_DIRECTIONS" },
            ],
            timeRange: {
              startTime: new Date(
                Date.now() - 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
              endTime: new Date().toISOString(),
            },
          },
        },
      }
    );

    // Récupérer les avis
    const reviewsResponse = await mybusiness.accounts.locations.reviews.list({
      auth: oauth2Client,
      parent: `accounts/${businessProfileId}/locations/${businessProfileId}`,
      maxResults: 50,
    });

    return NextResponse.json({
      success: true,
      data: {
        insights: insightsResponse.data,
        reviews: reviewsResponse.data,
        businessProfileId,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données réelles:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des données" },
      { status: 500 }
    );
  }
}
```

### 6. Dashboard d'Analyse Avancée

Votre dashboard inclut maintenant :

#### 📊 **Analyse des Visiteurs**

- **Géolocalisation en temps réel** : Voir d'où viennent vos visiteurs
- **Comportement détaillé** : Parcours, durée de session, pages visitées
- **Sources de trafic** : Google Search, Maps, réseaux sociaux, références
- **Appareils utilisés** : Mobile, desktop, tablet
- **Requêtes de recherche** : Mots-clés qui amènent les visiteurs

#### 🎯 **Métriques Avancées**

- **Taux de conversion** : Vues vers actions (clics, appels, directions)
- **Visiteurs retournants** : Analyse de la fidélisation
- **Heures de pointe** : Quand vos visiteurs sont les plus actifs
- **Parcours utilisateur** : Chemins les plus populaires sur votre site

#### 📈 **Données en Temps Réel**

- **Visiteurs actifs** : Nombre de personnes sur votre site en ce moment
- **Sessions en cours** : Pages visitées en temps réel
- **Actions instantanées** : Clics, appels, demandes d'itinéraire

### 7. Test et Validation

#### Étape 1: Tester le tracking

1. Visitez votre site depuis différents appareils
2. Vérifiez que les données apparaissent dans le dashboard
3. Testez les différentes actions (clics, appels, etc.)

#### Étape 2: Vérifier les données Google My Business

1. Connectez-vous à votre dashboard admin
2. Allez dans l'onglet "My Business"
3. Vérifiez que les vraies données s'affichent

#### Étape 3: Analyser les performances

1. Consultez les analytics des visiteurs
2. Identifiez les sources de trafic les plus performantes
3. Optimisez en fonction des insights

### 8. Maintenance et Optimisation

#### Surveillance Continue

- Vérifiez quotidiennement les nouvelles données
- Surveillez les tendances et anomalies
- Optimisez en fonction des insights

#### Mise à Jour des Données

- Les données se mettent à jour automatiquement
- Le tracking fonctionne 24h/24
- Les analytics sont calculés en temps réel

## 🎉 Résultat Final

Avec cette configuration, vous aurez :

✅ **Données réelles** de votre profil Google My Business  
✅ **Tracking complet** des visiteurs en temps réel  
✅ **Analyse avancée** du comportement utilisateur  
✅ **Géolocalisation** précise des visiteurs  
✅ **Métriques de conversion** détaillées  
✅ **Dashboard unifié** pour toutes vos données

Votre dashboard vous donnera une vue complète de qui visite votre site, d'où ils viennent, ce qu'ils font et pourquoi ils vous contactent !
