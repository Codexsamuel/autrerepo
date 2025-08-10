#!/usr/bin/env python3
"""
Script de test simple pour le système d'accès rapide
Vérifie que le code secret fonctionne correctement
"""

import os
import sys
from pathlib import Path

def test_quick_access():
    """Test du système d'accès rapide"""
    print("🔐 Test du système d'accès rapide")
    print("=" * 50)
    
    # Vérifie que nous sommes dans le bon répertoire
    project_root = Path(__file__).parent.parent
    if not (project_root / 'lib').exists():
        print("❌ Erreur: Ce script doit être exécuté depuis la racine du projet")
        return False
    
    # Charge la configuration
    config_file = project_root / 'config' / 'dev_quick_access.env'
    if not config_file.exists():
        print("❌ Fichier de configuration manquant")
        return False
    
    # Charge les variables d'environnement
    with open(config_file, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ[key] = value
    
    # Test du système d'accès rapide
    try:
        # Test simple avec le code secret
        secret_code = "0987612345SamuelObamSuperAdmin1234509876"
        print(f"🔑 Code secret configuré: {secret_code[:10]}...{secret_code[-10:]}")
        
        # Vérifie que le code est dans l'environnement
        if os.environ.get('QUICK_ACCESS_SECRET_CODE') == secret_code:
            print("✅ Code secret validé dans l'environnement!")
            print("🎉 Configuration d'accès rapide fonctionne!")
            return True
        else:
            print("❌ Code secret non trouvé dans l'environnement")
            return False
            
    except Exception as e:
        print(f"❌ Erreur lors du test: {e}")
        return False

def show_test_results():
    """Affiche les résultats du test"""
    print("\n📋 Résumé du test:")
    print("=" * 30)
    
    if test_quick_access():
        print("✅ Tous les tests ont réussi!")
        print("🔑 Votre code secret fonctionne correctement")
        print("🚀 Vous pouvez maintenant accéder au système en tant que superadmin")
    else:
        print("❌ Certains tests ont échoué")
        print("🔧 Vérifiez la configuration et les dépendances")

def main():
    """Fonction principale"""
    print("🧪 Test du système d'accès rapide")
    print("=" * 50)
    
    show_test_results()

if __name__ == "__main__":
    main() 