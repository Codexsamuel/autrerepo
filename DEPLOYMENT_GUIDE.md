# 🚀 Guide de Déploiement - DL Solutions Platform

## 📋 Vue d'ensemble du Projet

Ce repository contient plusieurs projets Next.js dans une structure monorepo :

- **Projet principal** : `dl-solutions-platform` (racine)
- **Nova IA Commercial** : `nova-ia-commercial/frontend/`
- **Sentinel Zero** : `sentinel-zero/frontend/`

## ⚙️ Configuration Vercel

### Configuration Principale (`vercel.json`)
```json
{
  "framework": "nextjs",
  "buildCommand": "cd sentinel-zero/frontend && npm install && npm run build",
  "installCommand": "cd sentinel-zero/frontend && npm install",
  "outputDirectory": "sentinel-zero/frontend/.next",
  "rootDirectory": "sentinel-zero/frontend"
}
```

**Explication :**
- Vercel construit le projet **Sentinel Zero** par défaut
- Le build se fait dans le répertoire `sentinel-zero/frontend`
- L'output est généré dans `sentinel-zero/frontend/.next`

### Configuration Locale (`sentinel-zero/frontend/vercel.json`)
Chaque sous-projet peut avoir sa propre configuration Vercel pour des déploiements séparés.

## 🔧 Structure des Projets

```
nouveau projet/
├── app/                          # Projet principal Next.js
├── components/                    # Composants UI partagés
├── nova-ia-commercial/
│   └── frontend/                 # Application Nova IA Commercial
├── sentinel-zero/
│   └── frontend/                 # Application Sentinel Zero
└── vercel.json                   # Configuration Vercel principale
```

## 🚀 Processus de Déploiement

### 1. Déploiement Automatique
- Chaque push sur la branche `clean-start` déclenche un déploiement
- Vercel utilise la configuration du `vercel.json` principal

### 2. Déploiement Manuel
```bash
# Dans le répertoire sentinel-zero/frontend
vercel --prod

# Ou pour un projet spécifique
vercel --prod --cwd sentinel-zero/frontend
```

## 📁 Fichiers d'Exclusion

### `.gitignore` Principal
- Exclut les dossiers de build principaux
- Exclut les dépendances et fichiers de configuration

### `.vercelignore` par Projet
- Chaque sous-projet peut avoir son propre `.vercelignore`
- Optimise le déploiement en excluant les fichiers inutiles

## 🔍 Résolution des Problèmes

### Erreur de Build
1. Vérifier que tous les composants UI sont présents
2. S'assurer que les dépendances sont installées
3. Vérifier la configuration TypeScript

### Problème de Déploiement
1. Vérifier la configuration `vercel.json`
2. S'assurer que le `rootDirectory` pointe vers le bon projet
3. Vérifier les logs de build sur Vercel

## 📊 Monitoring

- **Dashboard Vercel** : Surveiller les déploiements
- **Logs de Build** : Vérifier les erreurs de compilation
- **Performance** : Analyser les métriques de l'application

## 🎯 Bonnes Pratiques

1. **Toujours tester localement** avant de pousser
2. **Utiliser des branches** pour les nouvelles fonctionnalités
3. **Vérifier la configuration** avant chaque déploiement
4. **Monitorer les performances** après déploiement

---

*Dernière mise à jour : $(date)* 