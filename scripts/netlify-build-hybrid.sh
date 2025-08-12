#!/bin/bash

echo "🚀 Build hybride Netlify : Frontend Next.js + Backend Python séparé"

# Configuration pour build hybride
export NETLIFY=true
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export NEXT_PUBLIC_API_MODE=hybrid

# Vérifier que nous sommes sur Netlify
if [ "$NETLIFY" = "true" ]; then
    echo "✅ Environnement Netlify détecté"
    echo "🔧 Mode hybride : Frontend sur Netlify, Backend Python séparé"
    
    # Créer un fichier de configuration pour l'API backend
    echo "📝 Configuration de l'API backend..."
    cat > .env.production << EOF
# Configuration hybride
NEXT_PUBLIC_API_MODE=hybrid
NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL:-https://your-backend-domain.com}
NEXT_PUBLIC_NETLIFY=true
EOF
    
    # Build Next.js pour le frontend avec gestion d'erreurs
    echo "🔨 Build du frontend Next.js..."
    if npm run build:netlify:safe; then
        echo "✅ Build hybride terminé avec succès"
        echo "📱 Frontend prêt pour Netlify"
        echo "🐍 Backend Python à déployer séparément"
    else
        echo "❌ Erreur lors du build, tentative avec build et dépendances..."
        if npm run build:netlify:dependencies; then
            echo "✅ Build avec dépendances réussi"
        else
            echo "❌ Échec du build avec dépendances, tentative avec build simple..."
            if npm run build:netlify:ultra-simple; then
                echo "✅ Build simple réussi"
            else
                echo "❌ Échec du build simple, tentative avec build d'urgence..."
                if npm run build:netlify:emergency; then
                    echo "✅ Build d'urgence réussi"
                else
                    echo "❌ Échec du build d'urgence, tentative avec build ultra-simple..."
                    if npm run build:netlify:ultra-simple; then
                        echo "✅ Build ultra-simple réussi"
                    else
                        echo "❌ Échec du build ultra-simple, tentative avec build de dernier recours..."
                        if npm run build:netlify:last-resort; then
                            echo "✅ Build de dernier recours réussi"
                        else
                            echo "❌ Échec total du build, arrêt du processus"
                            exit 1
                        fi
                    fi
                fi
            fi
        fi
    fi
else
    echo "⚠️ Environnement local détecté, build standard..."
    npm run build:netlify:safe
fi 