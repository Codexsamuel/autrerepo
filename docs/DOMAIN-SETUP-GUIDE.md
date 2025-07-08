# 🌐 Guide de Configuration du Domaine sur Hostinger

## 📋 Configuration DNS Requise

### **Étape 1 : Accéder aux DNS Records**

1. Connectez-vous à votre compte Hostinger
2. Allez dans **Domains** → **Domain portfolio**
3. Cliquez sur **daveandlucesolutions.com**
4. Cliquez sur **DNS / Nameservers**

### **Étape 2 : Supprimer les enregistrements A incorrects**

Supprimez ces enregistrements A s'ils existent :

- `@` → `6.76.21.21`
- `@` → `75.2.60.5`

### **Étape 3 : Configurer les enregistrements DNS**

#### **Enregistrement A (Domaine principal)**

```
Type: A
Name: @
Points to: 75.2.60.5
TTL: 3600
```

#### **Enregistrement CNAME (WWW)**

```
Type: CNAME
Name: www
Points to: shimmering-croquembouche-e04b31.netlify.app
TTL: 3600
```

#### **Enregistrement CNAME (API)**

```
Type: CNAME
Name: api
Points to: 1573934a08a5e8b5.vercel-dns-017.com
TTL: 3600
```

#### **Enregistrement TXT (Google Verification)**

```
Type: TXT
Name: @
Content: google-site-verification=Yscfg62X5Ck6I19r0YrpRhHW_jIuJZvacv9JQq0bdcc
TTL: 14400
```

### **Étape 4 : Configuration Netlify**

1. Allez sur [Netlify Dashboard](https://app.netlify.com)
2. Sélectionnez votre site
3. Allez dans **Domain settings**
4. Cliquez sur **Add custom domain**
5. Ajoutez : `daveandlucesolutions.com`
6. Ajoutez aussi : `www.daveandlucesolutions.com`

### **Étape 5 : Vérification**

Après configuration, testez avec :

```bash
# Test du domaine principal
curl -I https://daveandlucesolutions.com

# Test du sous-domaine www
curl -I https://www.daveandlucesolutions.com

# Test de l'API
curl -I https://api.daveandlucesolutions.com/api/scraping/products
```

## ⏰ Temps de Propagation

- **DNS** : 15 minutes à 24 heures
- **Netlify** : 5-10 minutes
- **Vercel** : Immédiat

## 🔍 Diagnostic

Si le domaine ne fonctionne pas après 24h :

1. **Vérifiez les DNS** :

   ```bash
   nslookup daveandlucesolutions.com
   nslookup www.daveandlucesolutions.com
   ```

2. **Testez la connectivité** :

   ```bash
   ping daveandlucesolutions.com
   ```

3. **Vérifiez les logs Netlify** :
   - Dashboard Netlify → Functions → Logs

## 🚨 Problèmes Courants

### **Erreur 404 sur le domaine principal**

- Vérifiez que l'enregistrement A pointe vers `75.2.60.5`
- Vérifiez que le domaine est configuré dans Netlify

### **Erreur de certificat SSL**

- Attendez la génération automatique du certificat (5-10 min)
- Vérifiez que les redirections HTTPS sont configurées

### **API non accessible**

- Vérifiez que l'enregistrement CNAME `api` pointe vers Vercel
- Vérifiez que le backend Vercel est déployé

## 📞 Support

Si vous avez des problèmes :

1. Vérifiez ce guide étape par étape
2. Attendez 24h pour la propagation DNS
3. Contactez le support technique si nécessaire

---

**Note** : Ce guide est spécifique à votre configuration avec Netlify (frontend) et Vercel (backend).
