# 🔧 Configuration des Intégrations Google

Ce guide vous explique comment configurer les intégrations Google Analytics, Google My Business et Google Search Console pour votre dashboard super admin.

## 📋 Prérequis

- Compte Google avec accès aux services suivants :
  - Google Analytics 4 (GA4)
  - Google My Business
  - Google Search Console
- Projet Google Cloud Platform

## 🚀 Configuration Google Cloud Platform

### 1. Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez les APIs suivantes :
   - Google Analytics Data API
   - Google My Business API
   - Google Search Console API

### 2. Configurer les identifiants OAuth

1. Dans la console Google Cloud, allez dans "APIs & Services" > "Credentials"
2. Cliquez sur "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configurez l'application :
   - **Application type**: Web application
   - **Name**: DL Solutions Dashboard
   - **Authorized redirect URIs**:
     - `https://daveandlucesolutions.com/api/google-analytics/callback`
     - `https://daveandlucesolutions.com/api/google-my-business/callback`
     - `https://daveandlucesolutions.com/api/seo/callback`
4. Notez le **Client ID** et **Client Secret**

## 🔐 Variables d'Environnement

Ajoutez les variables suivantes à votre fichier `.env.local` :

```env
# Google Analytics
GOOGLE_ANALYTICS_CLIENT_ID=your_analytics_client_id
GOOGLE_ANALYTICS_CLIENT_SECRET=your_analytics_client_secret

# Google My Business
GOOGLE_MY_BUSINESS_CLIENT_ID=your_my_business_client_id
GOOGLE_MY_BUSINESS_CLIENT_SECRET=your_my_business_client_secret

# Google Search Console
GOOGLE_SEARCH_CONSOLE_CLIENT_ID=your_search_console_client_id
GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET=your_search_console_client_secret

# Base URL
NEXT_PUBLIC_BASE_URL=https://daveandlucesolutions.com
```

## 📊 Configuration Google Analytics

### 1. Créer une propriété GA4

1. Allez sur [Google Analytics](https://analytics.google.com/)
2. Créez une nouvelle propriété GA4
3. Configurez le suivi sur votre site web
4. Notez l'ID de propriété (format : G-XXXXXXXXXX)

### 2. Configurer les permissions

1. Dans GA4, allez dans "Admin" > "Property access management"
2. Ajoutez l'email de votre application avec les permissions "Editor"

## 🏢 Configuration Google My Business

### 1. Créer un profil d'entreprise

1. Allez sur [Google My Business](https://business.google.com/)
2. Créez ou sélectionnez votre profil d'entreprise
3. Complétez toutes les informations (adresse, téléphone, horaires, etc.)
4. Notez l'ID de l'entreprise

### 2. Vérifier l'entreprise

1. Suivez le processus de vérification (par courrier ou téléphone)
2. Une fois vérifié, l'entreprise sera visible sur Google Maps

## 🔍 Configuration Google Search Console

### 1. Ajouter une propriété

1. Allez sur [Google Search Console](https://search.google.com/search-console/)
2. Ajoutez votre site web comme propriété
3. Choisissez le préfixe de domaine (recommandé)
4. Vérifiez la propriété via l'une des méthodes proposées

### 2. Configurer les permissions

1. Dans Search Console, allez dans "Settings" > "Users and permissions"
2. Ajoutez l'email de votre application avec les permissions "Full"

## 🛠️ Installation des Dépendances

Installez les packages nécessaires :

```bash
npm install googleapis @google-cloud/local-auth
```

## 🔄 Callbacks OAuth

Créez les routes de callback suivantes :

### `/api/google-analytics/callback`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/admin/dashboard?error=no_code");
  }

  try {
    // Échanger le code contre un token d'accès
    // Stocker le token de manière sécurisée
    // Rediriger vers le dashboard

    return NextResponse.redirect(
      "/admin/dashboard?success=analytics_connected"
    );
  } catch (error) {
    return NextResponse.redirect("/admin/dashboard?error=auth_failed");
  }
}
```

### `/api/google-my-business/callback`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/admin/dashboard?error=no_code");
  }

  try {
    // Échanger le code contre un token d'accès
    // Stocker le token de manière sécurisée
    // Rediriger vers le dashboard

    return NextResponse.redirect(
      "/admin/dashboard?success=my_business_connected"
    );
  } catch (error) {
    return NextResponse.redirect("/admin/dashboard?error=auth_failed");
  }
}
```

### `/api/seo/callback`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/admin/dashboard?error=no_code");
  }

  try {
    // Échanger le code contre un token d'accès
    // Stocker le token de manière sécurisée
    // Rediriger vers le dashboard

    return NextResponse.redirect("/admin/dashboard?success=seo_connected");
  } catch (error) {
    return NextResponse.redirect("/admin/dashboard?error=auth_failed");
  }
}
```

## 🔒 Sécurité

### Stockage des Tokens

- **Ne stockez jamais** les tokens dans le localStorage
- Utilisez des cookies sécurisés ou une base de données
- Implémentez le refresh automatique des tokens

### Permissions Minimales

- Utilisez uniquement les scopes nécessaires
- Limitez l'accès aux données essentielles
- Auditez régulièrement les permissions

## 🧪 Test des Intégrations

### 1. Test Google Analytics

```bash
# Tester la connexion
curl -X GET "https://daveandlucesolutions.com/api/google-analytics/status"

# Tester la récupération de données
curl -X GET "https://daveandlucesolutions.com/api/google-analytics/data"
```

### 2. Test Google My Business

```bash
# Tester la connexion
curl -X GET "https://daveandlucesolutions.com/api/google-my-business/status"

# Tester la récupération de données
curl -X GET "https://daveandlucesolutions.com/api/google-my-business/data"
```

### 3. Test SEO

```bash
# Tester la connexion
curl -X GET "https://daveandlucesolutions.com/api/seo/status"

# Tester la récupération de données
curl -X GET "https://daveandlucesolutions.com/api/seo/data"
```

## 🚨 Dépannage

### Erreurs Courantes

1. **"Configuration manquante"**

   - Vérifiez que toutes les variables d'environnement sont définies
   - Redémarrez le serveur après modification

2. **"Erreur d'authentification"**

   - Vérifiez les URLs de redirection dans Google Cloud Console
   - Assurez-vous que les scopes sont corrects

3. **"Accès refusé"**
   - Vérifiez les permissions dans les services Google
   - Assurez-vous que l'email de l'application a les bonnes permissions

### Logs de Débogage

Activez les logs détaillés en développement :

```typescript
// Dans vos API routes
console.log("Google Analytics Status:", { connected, propertyId });
console.log("Google My Business Status:", { connected, businessId });
console.log("SEO Status:", { connected, propertyId });
```

## 📈 Optimisation

### Performance

- Mettez en cache les données récupérées
- Implémentez un système de refresh automatique
- Limitez les appels API aux données essentielles

### UX

- Affichez des indicateurs de chargement
- Gérez les erreurs gracieusement
- Fournissez des messages d'aide contextuels

## 🔄 Maintenance

### Mise à Jour Régulière

- Vérifiez les changements d'API Google
- Mettez à jour les dépendances
- Testez régulièrement les intégrations

### Monitoring

- Surveillez les erreurs d'authentification
- Suivez les quotas d'API
- Alertez en cas de problème

---

## 📞 Support

Pour toute question ou problème :

1. Consultez la [documentation Google](https://developers.google.com/)
2. Vérifiez les [logs d'erreur](https://console.cloud.google.com/logs)
3. Contactez l'équipe de développement

---

**Note :** Ce guide est basé sur les APIs Google actuelles. Les procédures peuvent évoluer avec les mises à jour des services Google.
