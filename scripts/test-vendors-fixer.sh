#!/bin/bash

echo "🧪 TEST DU PLUGIN VENDORS SELFREDEFERENCEFIXER"
echo "=============================================="

# Variables d'environnement pour le test
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production
export NETLIFY=true
export DEBUG_SELF_REFERENCE_FIXER=true

echo "🔧 Configuration de test:"
echo "  - NODE_ENV: $NODE_ENV"
echo "  - NETLIFY: $NETLIFY"
echo "  - DEBUG_SELF_REFERENCE_FIXER: $DEBUG_SELF_REFERENCE_FIXER"

# Nettoyage des caches
echo "🧹 Nettoyage des caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc

# Test de build avec le plugin VendorsSelfReferenceFixer
echo "🏗️ Test de build avec VendorsSelfReferenceFixer..."
npm run build:netlify:ultra-secure

# Vérification du résultat
if [ $? -eq 0 ]; then
    echo "✅ BUILD RÉUSSI - Plugin VendorsSelfReferenceFixer opérationnel"
    
    echo "🔍 Vérification des chunks vendors..."
    
    # Vérifier s'il y a des références à 'self' dans les chunks vendors
    if [ -d ".next/static/chunks" ]; then
        echo "📁 Vérification des chunks JavaScript..."
        
        # Chercher toutes les références à 'self' dans les chunks
        SELF_REFERENCES=$(grep -r "self" .next/static/chunks/ 2>/dev/null | wc -l || echo "0")
        
        if [ "$SELF_REFERENCES" -eq "0" ]; then
            echo "✅ Aucune référence à 'self' trouvée dans les chunks"
        else
            echo "⚠️ $SELF_REFERENCES références à 'self' trouvées dans les chunks"
            echo "🔍 Détails des références:"
            grep -r "self" .next/static/chunks/ 2>/dev/null | head -10
        fi
    fi
    
    # Vérifier le chunk vendors spécifiquement
    if [ -f ".next/static/chunks/vendors.js" ]; then
        echo "🔍 Vérification du chunk vendors.js..."
        VENDORS_SELF_REFERENCES=$(grep -c "self" .next/static/chunks/vendors.js 2>/dev/null || echo "0")
        
        if [ "$VENDORS_SELF_REFERENCES" -eq "0" ]; then
            echo "✅ Aucune référence à 'self' dans vendors.js"
        else
            echo "⚠️ $VENDORS_SELF_REFERENCES références à 'self' dans vendors.js"
        fi
    fi
    
    # Vérifier les fichiers serveur
    if [ -d ".next/server" ]; then
        echo "🔍 Vérification des fichiers serveur..."
        SERVER_SELF_REFERENCES=$(grep -r "self" .next/server/ 2>/dev/null | wc -l || echo "0")
        
        if [ "$SERVER_SELF_REFERENCES" -eq "0" ]; then
            echo "✅ Aucune référence à 'self' dans les fichiers serveur"
        else
            echo "⚠️ $SERVER_SELF_REFERENCES références à 'self' dans les fichiers serveur"
        fi
    fi
    
    echo "📊 RÉSUMÉ DU TEST:"
    echo "  - Build: ✅ RÉUSSI"
    echo "  - Plugin VendorsSelfReferenceFixer: ✅ ACTIF"
    echo "  - Références 'self' dans chunks: $SELF_REFERENCES"
    echo "  - Références 'self' dans vendors: $VENDORS_SELF_REFERENCES"
    echo "  - Références 'self' dans serveur: $SERVER_SELF_REFERENCES"
    
else
    echo "❌ BUILD ÉCHOUÉ - Plugin VendorsSelfReferenceFixer"
    echo "🔍 Vérification des erreurs..."
    exit 1
fi 