# 🔧 Configuration DNS pour éviter les boucles de redirection

## 🚨 **PROBLÈME IDENTIFIÉ :**
Boucle de redirection infinie entre `daveandlucesolutions.com` et `dlsolutionssarl.tech`

## ✅ **SOLUTION RECOMMANDÉE :**

### **1. Configuration DNS chez Hostinger :**

#### **Pour dlsolutionssarl.tech (domaine principal) :**
```
Type: A
Nom: @
Valeur: 75.2.60.5 (IP Netlify)
TTL: 3600

Type: CNAME
Nom: www
Valeur: dlsolutionssarl.tech
TTL: 3600
```

#### **Pour daveandlucesolutions.com (domaine secondaire) :**
```
Type: CNAME
Nom: @
Valeur: dlsolutionssarl.tech
TTL: 3600

Type: CNAME
Nom: www
Valeur: dlsolutionssarl.tech
TTL: 3600
```

### **2. Configuration Netlify :**

#### **Domaines primaires :**
- `dlsolutionssarl.tech` → Projet principal
- `davyetlucie.netlify.app` → Subdomaine Netlify

#### **Domaines alias :**
- `daveandlucesolutions.com` → Redirige vers `dlsolutionssarl.tech`

### **3. Redirections Netlify (_redirects) :**
```
# Rediriger daveandlucesolutions.com vers dlsolutionssarl.tech
daveandlucesolutions.com/* https://dlsolutionssarl.tech/:splat 301!
www.daveandlucesolutions.com/* https://dlsolutionssarl.tech/:splat 301!

# Rediriger www.dlsolutionssarl.tech vers dlsolutionssarl.tech
www.dlsolutionssarl.tech/* https://dlsolutionssarl.tech/:splat 301!

# Gestion des erreurs 404
/* /404.html 404

# Redirection par défaut pour SPA
/* /index.html 200
```

## 🔍 **VÉRIFICATION :**

### **1. Test des redirections :**
```bash
# Vérifier que daveandlucesolutions.com redirige vers dlsolutionssarl.tech
curl -I http://daveandlucesolutions.com
# Doit retourner : 301 Moved Permanently → dlsolutionssarl.tech

# Vérifier que dlsolutionssarl.tech fonctionne
curl -I http://dlsolutionssarl.tech
# Doit retourner : 200 OK
```

### **2. Test des boucles :**
- Accéder à `daveandlucesolutions.com`
- Vérifier qu'il redirige vers `dlsolutionssarl.tech`
- Vérifier qu'il n'y a pas de redirection en retour

## ⚠️ **POINTS D'ATTENTION :**

1. **Pas de redirection bidirectionnelle** entre les domaines
2. **Un seul domaine principal** : `dlsolutionssarl.tech`
3. **Redirection unidirectionnelle** : `daveandlucesolutions.com` → `dlsolutionssarl.tech`
4. **Pas de redirection** de `dlsolutionssarl.tech` vers `daveandlucesolutions.com`

## 🚀 **DÉPLOIEMENT :**

1. Mettre à jour la configuration DNS chez Hostinger
2. Attendre la propagation DNS (24-48h)
3. Tester les redirections
4. Vérifier l'absence de boucles
5. Déployer sur Netlify

## 📞 **SUPPORT :**

En cas de problème persistant, contacter :
- Hostinger pour la configuration DNS
- Netlify pour la configuration des domaines
- Équipe technique DL Solutions 