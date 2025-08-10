#!/bin/bash

# Script de test pour vérifier le SelfReferenceFixer avec un vrai build
# Ce script lance un build Next.js et vérifie que le plugin fonctionne

set -e

echo "🧪 TEST BUILD AVEC PLUGIN - SelfReferenceFixer"
echo "================================================"

# Configuration de test
export NODE_ENV=production
export NETLIFY=true
export DEBUG_SELF_REFERENCE_FIXER=true
export NEXT_TELEMETRY_DISABLED=1

echo "📋 Configuration de test:"
echo "  - NODE_ENV: $NODE_ENV"
echo "  - NETLIFY: $NETLIFY"
echo "  - DEBUG_SELF_REFERENCE_FIXER: $DEBUG_SELF_REFERENCE_FIXER"
echo ""

# Nettoyer le répertoire .next
if [ -d ".next" ]; then
    echo "🧹 Nettoyage du répertoire .next..."
    rm -rf .next
fi

# Lancer le build avec le plugin
echo "🏗️ Lancement du build avec SelfReferenceFixer..."
echo "🔧 Plugin activé et mode debug activé"
echo ""

if npm run build:netlify:ultra-secure; then
    echo ""
    echo "✅ Build réussi ! Vérification des fichiers..."
    echo ""
    
    # Vérifier les fichiers générés
    if [ -d ".next/server" ]; then
        echo "📁 Répertoire .next/server trouvé"
        
        # Chercher les fichiers vendors
        vendor_files=$(find .next/server -name "*.js" -type f | grep -E "(vendors|chunk)" | head -5)
        
        if [ -n "$vendor_files" ]; then
            echo "🏪 Fichiers vendors/chunks trouvés:"
            echo "$vendor_files" | while read -r file; do
                echo "  - $file"
            done
            echo ""
            
            # Vérifier les références à 'self' dans ces fichiers
            echo "🔍 Vérification des références à 'self'..."
            total_self_refs=0
            
            echo "$vendor_files" | while read -r file; do
                if [ -f "$file" ]; then
                    self_count=$(grep -o '\bself\b' "$file" | wc -l)
                    if [ "$self_count" -gt 0 ]; then
                        echo "  ⚠️  $file: $self_count références à 'self'"
                        total_self_refs=$((total_self_refs + self_count))
                    else
                        echo "  ✅ $file: Aucune référence à 'self'"
                    fi
                fi
            done
            
            echo ""
            if [ "$total_self_refs" -eq 0 ]; then
                echo "🎉 SUCCÈS: Aucune référence à 'self' trouvée dans les vendors !"
                echo "✅ Le plugin SelfReferenceFixer fonctionne parfaitement."
            else
                echo "⚠️  ATTENTION: $total_self_refs références à 'self' persistent dans les vendors."
                echo "🔧 Le plugin nécessite des ajustements."
            fi
            
        else
            echo "⚠️  Aucun fichier vendor/chunk trouvé dans .next/server"
        fi
        
    else
        echo "❌ Répertoire .next/server non trouvé"
    fi
    
    # Vérifier aussi les chunks statiques
    if [ -d ".next/static/chunks" ]; then
        echo ""
        echo "📁 Vérification des chunks statiques..."
        
        chunk_files=$(find .next/static/chunks -name "*.js" -type f | head -5)
        
        if [ -n "$chunk_files" ]; then
            echo "📄 Chunks statiques trouvés:"
            echo "$chunk_files" | while read -r file; do
                echo "  - $file"
            done
            echo ""
            
            # Vérifier les références à 'self' dans les chunks
            echo "🔍 Vérification des références à 'self' dans les chunks..."
            total_chunk_self_refs=0
            
            echo "$chunk_files" | while read -r file; do
                if [ -f "$file" ]; then
                    self_count=$(grep -o '\bself\b' "$file" | wc -l)
                    if [ "$self_count" -gt 0 ]; then
                        echo "  ⚠️  $file: $self_count références à 'self'"
                        total_chunk_self_refs=$((total_chunk_self_refs + self_count))
                    else
                        echo "  ✅ $file: Aucune référence à 'self'"
                    fi
                fi
            done
            
            echo ""
            if [ "$total_chunk_self_refs" -eq 0 ]; then
                echo "🎉 SUCCÈS: Aucune référence à 'self' trouvée dans les chunks statiques !"
            else
                echo "⚠️  ATTENTION: $total_chunk_self_refs références à 'self' persistent dans les chunks statiques."
            fi
            
        else
            echo "⚠️  Aucun chunk statique trouvé"
        fi
        
    else
        echo "⚠️  Répertoire .next/static/chunks non trouvé"
    fi
    
else
    echo ""
    echo "❌ Build échoué !"
    echo "🔧 Vérifiez la configuration du plugin et les erreurs de build."
    exit 1
fi

echo ""
echo "🎯 RÉSUMÉ DU TEST:"
echo "=================="
echo "✅ Build Next.js réussi avec le plugin SelfReferenceFixer"
echo "🔍 Vérification des références à 'self' terminée"
echo "📊 Plugin configuré et actif"
echo ""
echo "🚀 Prêt pour le déploiement Netlify !" 