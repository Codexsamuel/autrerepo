# 🌐 Configuration Hostinger - DL Solutions Platform

## 📋 Statut Actuel
- **Domaine** : dlsolutionssarl.tech
- **Nameservers actuels** : ns1.dns-parking.com, ns2.dns-parking.com
- **Action requise** : Configuration des nameservers pour Netlify

## 🔧 Configuration des Nameservers

### Étape 1: Accéder au Panneau Hostinger
1. Se connecter à [Hostinger](https://hpanel.hostinger.com)
2. Aller dans **"Domaines"** → **"dlsolutionssarl.tech"**
3. Cliquer sur **"Gérer"**

### Étape 2: Modifier les Nameservers
1. Cliquer sur **"Nameservers"**
2. Sélectionner **"Utiliser des nameservers personnalisés"**
3. Remplacer par les nameservers Netlify :

```
ns1.p01.dnsone.net
ns2.p01.dnsone.net
ns3.p01.dnsone.net
ns4.p01.dnsone.net
```

### Étape 3: Sauvegarder
1. Cliquer sur **"Sauvegarder"**
2. Attendre la propagation DNS (24-48h)

## 🌍 Configuration des Enregistrements DNS

### Après configuration des nameservers Netlify :

#### 1. Enregistrement A (Racine)
```
Type: A
Nom: @
Valeur: 75.2.60.5
TTL: 300
```

#### 2. Enregistrement CNAME (www)
```
Type: CNAME
Nom: www
Valeur: dlsolutionssarl.tech
TTL: 300
```

#### 3. Enregistrement CNAME (API - pour Vercel)
```
Type: CNAME
Nom: api
Valeur: [PROJET].vercel.app
TTL: 300
```

## 🔍 Vérification de la Configuration

### Vérifier les nameservers :
```bash
dig dlsolutionssarl.tech NS
```

### Vérifier la propagation :
```bash
dig dlsolutionssarl.tech A
```

### Vérifier la résolution :
```bash
nslookup dlsolutionssarl.tech
```

## ⏱️ Délais de Propagation

- **Nameservers** : 24-48 heures
- **Enregistrements A/CNAME** : 1-4 heures
- **Propagation globale** : Jusqu'à 72 heures

## 🚨 Points d'Attention

1. **Ne pas modifier** les nameservers pendant la propagation
2. **Attendre** que la propagation soit complète avant de continuer
3. **Vérifier** que Netlify détecte le domaine
4. **Tester** la résolution DNS avant le déploiement

## 📱 Interface Hostinger

### Localisation des paramètres :
- **Panneau principal** → **Domaines**
- **dlsolutionssarl.tech** → **Gérer**
- **Nameservers** → **Modifier**

### Options disponibles :
- Nameservers par défaut Hostinger
- Nameservers personnalisés
- Gestion des enregistrements DNS

## 🔗 Liens Utiles

- [Panneau Hostinger](https://hpanel.hostinger.com)
- [Documentation Netlify DNS](https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/)
- [Vérificateur DNS](https://dnschecker.org)

## 📞 Support

En cas de problème :
1. Contacter le support Hostinger
2. Vérifier la documentation Netlify
3. Utiliser les outils de diagnostic DNS

## ✅ Checklist de Configuration

- [ ] Se connecter à Hostinger
- [ ] Modifier les nameservers vers Netlify
- [ ] Sauvegarder les changements
- [ ] Attendre la propagation (24-48h)
- [ ] Vérifier la résolution DNS
- [ ] Configurer les enregistrements A/CNAME
- [ ] Tester la configuration

**Prochaine étape** : Configurer Netlify après la propagation des nameservers 