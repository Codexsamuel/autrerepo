# 🚀 Guide de Déploiement Complet - NovaCore AI

## 📋 **Options de Déploiement Disponibles**

### 1. 🐳 **Déploiement Docker (Recommandé pour production)**

#### **Avantages :**
- ✅ Python + Next.js dans un seul conteneur
- ✅ Facile à déployer sur n'importe quel serveur
- ✅ Contrôle total de l'environnement
- ✅ Scaling horizontal possible

#### **Commandes :**
```bash
# Build et démarrage
docker-compose up --build

# Démarrage en arrière-plan
docker-compose up -d

# Arrêt
docker-compose down

# Logs
docker-compose logs -f app
```

#### **Ports :**
- **Frontend Next.js :** http://localhost:3000
- **Backend Python :** http://localhost:8000
- **Nginx (reverse proxy) :** http://localhost:80 → https://localhost:443

---

### 2. 🌐 **Déploiement Vercel (Recommandé pour rapidité)**

#### **Avantages :**
- ✅ Support natif Python + Next.js
- ✅ Déploiement automatique
- ✅ CDN global
- ✅ SSL automatique

#### **Commandes :**
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel

# Déploiement en production
vercel --prod
```

#### **Configuration :**
- **Frontend :** Déployé automatiquement
- **Backend Python :** Déployé comme fonctions serverless
- **API Routes :** `/api/*` → Python functions

---

### 3. 🔄 **Déploiement Hybride Netlify (Solution actuelle)**

#### **Avantages :**
- ✅ Frontend sur Netlify (rapide)
- ✅ Backend Python séparé (flexible)
- ✅ Pas de problème de compilation Python

#### **Architecture :**
```
Frontend (Netlify) ←→ Backend Python (VPS/Docker/Vercel)
```

#### **Configuration :**
```bash
# Build hybride
npm run build:netlify:hybrid

# Variables d'environnement
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
NEXT_PUBLIC_API_MODE=hybrid
```

---

### 4. 🖥️ **Déploiement VPS (Contrôle total)**

#### **Avantages :**
- ✅ Contrôle total du serveur
- ✅ Performance maximale
- ✅ Coût réduit pour trafic élevé

#### **Scripts de déploiement :**
```bash
# Déploiement automatique
./scripts/deploy-vps.sh

# Monitoring
./scripts/monitor.sh

# Backup
./scripts/backup.sh
```

---

## 🛠️ **Configuration par Environnement**

### **Développement Local :**
```bash
# Frontend
npm run dev

# Backend Python
python -m uvicorn main:app --reload --port 8000

# Docker complet
docker-compose -f docker-compose.dev.yml up
```

### **Staging :**
```bash
# Build de test
npm run build:staging

# Déploiement Docker
docker-compose -f docker-compose.staging.yml up
```

### **Production :**
```bash
# Build optimisé
npm run build:production

# Déploiement Docker
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🔐 **Sécurité et Variables d'Environnement**

### **Fichiers requis :**
```bash
.env.local          # Variables locales
.env.production     # Variables production
.env.staging        # Variables staging
```

### **Variables critiques :**
```bash
# API Keys
OPENAI_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_KEY=your_key

# Base de données
DATABASE_URL=your_db_url
REDIS_URL=your_redis_url

# Sécurité
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
```

---

## 📊 **Monitoring et Maintenance**

### **Health Checks :**
- **Frontend :** `/health` → Status Next.js
- **Backend :** `/api/health` → Status Python
- **Nginx :** `/health` → Status reverse proxy

### **Logs :**
```bash
# Docker logs
docker-compose logs -f

# Application logs
tail -f logs/app.log
tail -f logs/error.log

# Nginx logs
tail -f logs/nginx/access.log
tail -f logs/nginx/error.log
```

### **Backup :**
```bash
# Base de données
./scripts/backup-db.sh

# Fichiers uploads
./scripts/backup-files.sh

# Configuration
./scripts/backup-config.sh
```

---

## 🚨 **Dépannage**

### **Problèmes courants :**

#### **1. Build Netlify échoue :**
```bash
# Utiliser le build hybride
npm run build:netlify:hybrid

# Vérifier les variables d'environnement
echo $NEXT_PUBLIC_BACKEND_URL
```

#### **2. Python ne démarre pas :**
```bash
# Vérifier les dépendances
pip install -r requirements.txt

# Vérifier la version Python
python --version

# Vérifier les logs
docker-compose logs app
```

#### **3. Frontend ne se connecte pas au backend :**
```bash
# Vérifier l'URL de l'API
echo $NEXT_PUBLIC_BACKEND_URL

# Tester la connectivité
curl $NEXT_PUBLIC_BACKEND_URL/health

# Vérifier CORS
curl -H "Origin: http://localhost:3000" $NEXT_PUBLIC_BACKEND_URL/health
```

---

## 📞 **Support et Contact**

### **En cas de problème :**
1. Vérifier les logs
2. Consulter la documentation
3. Tester en local
4. Contacter l'équipe technique

### **Ressources :**
- **Documentation API :** `/api/docs`
- **Status système :** `/status`
- **Monitoring :** `/admin/monitoring`

---

## 🎯 **Recommandations par Cas d'Usage**

### **🚀 Startup / MVP :**
- **Vercel** (rapide, simple, gratuit)

### **🏢 Entreprise / Production :**
- **Docker + VPS** (contrôle, performance, coût)

### **🔄 Développement continu :**
- **Hybride Netlify** (flexibilité, rapidité)

### **📈 Scaling élevé :**
- **Docker + Kubernetes** (scalabilité, robustesse)

---

*Dernière mise à jour : $(date)* 