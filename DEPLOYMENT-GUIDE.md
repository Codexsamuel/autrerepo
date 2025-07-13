# 📱 Guide de Déploiement Google Play Store - DL Solutions

## 🚀 Déploiement Automatique

### 1. Prérequis
- Compte Google Play Console (25$)
- Node.js 16+
- Java 11+
- Android Studio

### 2. Build Automatique
```bash
# Exécuter le script de build
./build-apk.sh
```

### 3. Upload sur Google Play Console

1. **Créer une nouvelle application**
   - Nom: DL Solutions
   - Langue par défaut: Français
   - Application ou jeu: Application
   - Gratuit ou payant: Gratuit

2. **Remplir les informations de l'app**
   - Titre: DL Solutions
   - Description courte: Solutions digitales innovantes
   - Description complète: (voir app-assets/play-store-content.json)

3. **Uploader l'APK**
   - Fichier: app-release.apk
   - Version: 1.0.0
   - Notes de version: Première version

4. **Configurer le contenu**
   - Catégorie: Business
   - Tags: digital, solutions, crm, erp, formation
   - Classification du contenu: Tout public

5. **Prix et disponibilité**
   - Prix: Gratuit
   - Pays: Tous les pays
   - Disponibilité: Disponible

6. **Confidentialité**
   - Politique de confidentialité: https://dlsolutions.com/privacy
   - Données collectées: Minimales (analytics)

### 4. Assets Requis

#### Icônes
- 512x512 (Play Store)
- 192x192 (App)

#### Captures d'écran (minimum 2)
- 1280x720 (tablette)
- 1080x1920 (téléphone)

#### Feature Graphic
- 1024x500

### 5. Publication
1. Vérifier tous les champs
2. Soumettre pour examen
3. Attendre validation (1-3 jours)
4. Publication automatique

## 🎯 URLs Importantes
- **Google Play Console**: https://play.google.com/console
- **Manifest PWA**: https://dlsolutions.com/manifest.json
- **Site web**: https://dlsolutions.com

## 📞 Support
- Email: support@dlsolutions.com
- Documentation: https://dlsolutions.com/docs
