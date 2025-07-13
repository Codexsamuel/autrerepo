#!/bin/bash

# Script de build automatique pour DL Solutions APK
echo "🚀 Build automatique DL Solutions APK"

# Vérifier les prérequis
if ! command -v bubblewrap &> /dev/null; then
    echo "❌ Bubblewrap non installé. Installation..."
    npm install -g @bubblewrap/cli
fi

# Nettoyer les builds précédents
echo "🧹 Nettoyage des builds précédents..."
rm -rf build/
rm -f app-release.apk

# Initialiser le projet Bubblewrap
echo "📦 Initialisation du projet Bubblewrap..."
bubblewrap init --manifest https://dlsolutions.com/manifest.json

# Configurer la signature
echo "🔐 Configuration de la signature..."
if [ ! -f "dlsolutions-release-key.keystore" ]; then
    echo "Génération de la clé de signature..."
    keytool -genkeypair -v -storetype PKCS12 \
        -keystore dlsolutions-release-key.keystore \
        -alias dlsolutions-key-alias \
        -keyalg RSA -keysize 2048 \
        -validity 10000 \
        -storepass dlsolutions2024 \
        -keypass dlsolutions2024 \
        -dname "CN=DL Solutions, OU=Development, O=DL Solutions, L=Paris, S=IDF, C=FR"
fi

# Build de l'APK
echo "🔨 Build de l'APK..."
bubblewrap build --release

# Vérifier le build
if [ -f "app-release.apk" ]; then
    echo "✅ APK généré avec succès: app-release.apk"
    echo "📱 Taille: $(du -h app-release.apk | cut -f1)"
    echo "🎯 Prêt pour upload sur Google Play Store"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

echo "🎉 Build terminé !"
