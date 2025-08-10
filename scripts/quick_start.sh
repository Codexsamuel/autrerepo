#!/bin/bash

# 🚀 Script de démarrage rapide - Version Shell
# Active l'environnement virtuel et lance la configuration

echo "🚀 Démarrage rapide de l'environnement de développement"
echo "========================================================"

# Vérifie que nous sommes dans le bon répertoire
if [ ! -d "lib" ]; then
    echo "❌ Erreur: Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

# Active l'environnement virtuel
if [ -d "venv" ]; then
    echo "🐍 Activation de l'environnement virtuel..."
    source venv/bin/activate
    echo "✅ Environnement virtuel activé"
else
    echo "⚠️  Aucun environnement virtuel trouvé"
    echo "💡 Créez-en un avec: python3 -m venv venv"
    exit 1
fi

# Lance le script de configuration Python
echo ""
echo "🔧 Configuration de l'environnement..."
python scripts/dev_quick_start.py

# Vérifie le succès
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Configuration terminée avec succès!"
    echo ""
    echo "💡 Prochaines étapes:"
    echo "   1. Votre code secret est configuré"
    echo "   2. Testez avec: python scripts/test_simple_quick_access.py"
    echo "   3. Vous pouvez maintenant utiliser l'accès rapide superadmin"
else
    echo ""
    echo "❌ Configuration échouée"
    echo "🔧 Vérifiez les erreurs ci-dessus"
    exit 1
fi 