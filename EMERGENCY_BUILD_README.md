# 🚨 BUILD D'URGENCE NETLIFY - Fix Supabase Key

## **❌ PROBLÈME IDENTIFIÉ :**

Le build Netlify échoue avec l'erreur :
```
Error: supabaseKey is required.
at new SupabaseClient
```

## **🔍 CAUSE RACINE :**

Les routes API essaient d'initialiser Supabase **lors du build** (collecte des données), mais les variables d'environnement ne sont pas disponibles pendant le processus de build.

## **🚀 SOLUTIONS IMPLÉMENTÉES :**

### **1. Configuration Next.js d'urgence (`next.config.emergency.js`)**
- Mode statique uniquement (`output: 'export'`)
- Externalisation complète de Supabase
- Redirections des routes API problématiques
- Fallbacks webpack pour éviter les erreurs

### **2. Script de build d'urgence (`scripts/netlify-build-emergency-fix.sh`)**
- Configuration automatique d'urgence
- Build sans initialisation de Supabase
- Mode de survie extrême

### **3. Route API de statut (`app/api/status/route.ts`)**
- Point de redirection pour les APIs en maintenance
- Réponse JSON simple

### **4. Configuration Netlify d'urgence (`netlify.toml.emergency`)**
- Redirections des routes API problématiques
- Headers de sécurité
- Build command d'urgence

## **🔧 UTILISATION :**

### **Build d'urgence local :**
```bash
npm run build:netlify:emergency-fix
```

### **Build avec configuration d'urgence :**
```bash
NEXT_CONFIG_FILE=next.config.emergency.js npm run build
```

### **Déploiement d'urgence sur Netlify :**
1. Renommer `netlify.toml.emergency` en `netlify.toml`
2. Pousser les changements
3. Le build utilisera automatiquement la configuration d'urgence

## **📋 ROUTES API AFFECTÉES :**

- `/api/novaprotect/escrow/create` → `/api/status`
- `/api/ics/[bookingId]` → `/api/status`
- `/api/search/semantic` → `/api/status`
- `/api/novaprotect/disputes/open` → `/api/status`
- `/api/reminders/send` → `/api/status`

## **✅ RÉSULTAT ATTENDU :**

- Build Netlify réussi
- Frontend statique déployé
- APIs en mode maintenance
- Pas d'erreurs de clés Supabase

## **🔄 RESTAURATION NORMALE :**

Une fois le problème de clés Supabase résolu :

1. Supprimer `next.config.emergency.js`
2. Restaurer `netlify.toml` original
3. Supprimer les redirections d'urgence
4. Tester le build normal

## **🚨 NOTES IMPORTANTES :**

- **Mode statique uniquement** : Pas de SSR/SSG
- **APIs désactivées** : Redirection vers `/api/status`
- **Performance réduite** : Configuration de survie
- **Temporaire** : Solution d'urgence uniquement

---

**⚠️ CETTE CONFIGURATION EST UNE SOLUTION D'URGENCE TEMPORAIRE**
**🔧 RESTAUREZ LA CONFIGURATION NORMALE DÈS QUE POSSIBLE** 