# 🚀 Guide de Déploiement Vercel - DL Solutions

## ✅ Configuration Prête

Votre projet est maintenant configuré pour Vercel ! Voici les étapes pour déployer :

## 📋 Étapes de Déploiement

### 1. **Connexion à Vercel**

- Allez sur [vercel.com](https://vercel.com)
- Connectez-vous avec votre compte GitHub
- Cliquez sur "New Project"

### 2. **Import du Repository**

- Sélectionnez votre repository `autrerepo`
- Choisissez la branche `vercel-deploy`
- Vercel détectera automatiquement Next.js

### 3. **Configuration du Projet**

- **Framework Preset**: Next.js (détecté automatiquement)
- **Root Directory**: `/` (racine du projet)
- **Build Command**: `pnpm run build` (automatique)
- **Output Directory**: `.next` (automatique)

### 4. **Variables d'Environnement (Optionnel)**

Si vous avez des variables d'environnement, ajoutez-les dans :

```
Settings > Environment Variables
```

### 5. **Déploiement**

- Cliquez sur "Deploy"
- Attendez 2-3 minutes pour le build
- Votre app sera disponible sur `https://dl-solutions-platform.vercel.app`

## 🔧 Configuration Actuelle

### **vercel.json**

```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install",
  "devCommand": "pnpm run dev",
  "outputDirectory": ".next",
  "regions": ["cdg1"],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### **package.json**

```json
{
  "name": "dl-solutions-platform",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "vercel-build": "next build"
  }
}
```

## 🧪 Test du Déploiement

Une fois déployé, testez avec :

```bash
# Test automatique
node scripts/test-vercel-deployment.js

# Ou test manuel
curl https://dl-solutions-platform.vercel.app/api
curl https://dl-solutions-platform.vercel.app/api/scraping/products
```

## 📱 URLs Disponibles

| Page               | URL                                                              |
| ------------------ | ---------------------------------------------------------------- |
| **Accueil**        | `https://dl-solutions-platform.vercel.app/`                      |
| **DL Style**       | `https://dl-solutions-platform.vercel.app/dl-style`              |
| **API Principale** | `https://dl-solutions-platform.vercel.app/api`                   |
| **API Scraping**   | `https://dl-solutions-platform.vercel.app/api/scraping/products` |

## 🔄 Déploiements Automatiques

- Chaque push sur `vercel-deploy` déclenche un nouveau déploiement
- Les déploiements sont automatiques et rapides
- Vercel génère des previews pour chaque commit

## 🛠️ Commandes Utiles

```bash
# Déploiement manuel
vercel --prod

# Déploiement de développement
vercel

# Voir les logs
vercel logs

# Variables d'environnement
vercel env add
```

## 🎯 Prochaines Étapes

1. **Déployer** : Suivez les étapes ci-dessus
2. **Tester** : Utilisez le script de test
3. **Configurer le domaine** : Ajoutez votre domaine personnalisé
4. **Monitorer** : Surveillez les performances dans le dashboard Vercel

## 🆘 Dépannage

### **Erreur de Build**

- Vérifiez les logs dans le dashboard Vercel
- Assurez-vous que toutes les dépendances sont dans `dependencies`
- Vérifiez la syntaxe TypeScript

### **API ne répond pas**

- Vérifiez que les routes API sont dans `pages/api/`
- Testez localement avec `pnpm dev`
- Vérifiez les logs Vercel

### **Variables d'environnement**

- Ajoutez-les dans Settings > Environment Variables
- Redéployez après modification

---

## 🎉 Félicitations !

Votre plateforme DL Solutions sera bientôt en ligne sur Vercel !

**URL finale** : `https://dl-solutions-platform.vercel.app`
