#!/usr/bin/env python3
"""
Script de démarrage de l'environnement de développement
Active l'accès rapide superadmin et configure l'environnement
"""

import os
import sys
from pathlib import Path

def setup_dev_environment():
    """Configure l'environnement de développement"""
    print("🚀 Configuration de l'environnement de développement")
    print("=" * 60)
    
    # Vérifie que nous sommes dans le bon répertoire
    project_root = Path(__file__).parent.parent
    if not (project_root / 'lib').exists():
        print("❌ Erreur: Ce script doit être exécuté depuis la racine du projet")
        return False
    
    # Charge la configuration d'accès rapide
    config_file = project_root / 'config' / 'dev_quick_access.env'
    if not config_file.exists():
        print("❌ Fichier de configuration manquant: config/dev_quick_access.env")
        return False
    
    print(f"✅ Répertoire projet: {project_root}")
    print(f"✅ Fichier de config: {config_file}")
    
    # Charge les variables d'environnement
    print("\n🔧 Chargement de la configuration...")
    with open(config_file, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ[key] = value
                print(f"  {key}={value[:20]}{'...' if len(value) > 20 else ''}")
    
    # Crée les répertoires nécessaires
    print("\n📁 Création des répertoires...")
    directories = [
        'data/dev_quick_access',
        'data/dev_quick_access/captures',
        'logs'
    ]
    
    for directory in directories:
        dir_path = project_root / directory
        dir_path.mkdir(parents=True, exist_ok=True)
        print(f"  ✅ {directory}")
    
    # Vérifie l'environnement virtuel
    print("\n🐍 Vérification de l'environnement Python...")
    if 'VIRTUAL_ENV' in os.environ:
        print(f"  ✅ Environnement virtuel: {os.environ['VIRTUAL_ENV']}")
    else:
        print("  ⚠️  Aucun environnement virtuel détecté")
        print("  💡 Activez l'environnement virtuel: source venv/bin/activate")
    
    # Vérifie les dépendances
    print("\n📦 Vérification des dépendances...")
    try:
        import jwt
        print("  ✅ PyJWT installé")
    except ImportError:
        print("  ❌ PyJWT manquant")
        print("  💡 Installez avec: pip install PyJWT")
        return False
    
    # Test du système d'accès rapide
    print("\n🔐 Test du système d'accès rapide...")
    
    try:
        # Vérifie que le code secret est configuré
        secret_code = os.environ.get('QUICK_ACCESS_SECRET_CODE')
        if secret_code:
            print("  ✅ Code secret configuré dans l'environnement")
            print(f"  🔑 Code: {secret_code[:10]}...{secret_code[-10:]}")
            print("  📊 Système d'accès rapide prêt")
        else:
            print("  ❌ Code secret non configuré")
            return False
        
    except Exception as e:
        print(f"  ❌ Erreur: {e}")
        return False
    
    print("\n🎉 Environnement de développement configuré avec succès!")
    return True

def show_usage_instructions():
    """Affiche les instructions d'utilisation"""
    print("\n📖 Instructions d'utilisation:")
    print("=" * 40)
    
    print("1. 🔑 Accès rapide avec votre code secret:")
    print("   Code: 0987612345SamuelObamSuperAdmin1234509876")
    
    print("\n2. 🚀 Test du système:")
    print("   python scripts/test_simple_quick_access.py")
    
    print("\n3. 🔧 Configuration:")
    print("   Le fichier config/dev_quick_access.env est chargé automatiquement")
    
    print("\n4. 🛡️ Sécurité:")
    print("   - Votre code secret vous donne un accès immédiat")
    print("   - Les autres utilisateurs utilisent l'authentification biométrique")
    print("   - En production, désactivez l'accès rapide")
    
    print("\n5. 📁 Répertoires créés:")
    print("   - data/dev_quick_access/ (stockage des données)")
    print("   - logs/ (fichiers de log)")
    
    print("\n6. 🔄 Redémarrage:")
    print("   Exécutez ce script à chaque nouvelle session de développement")

def main():
    """Fonction principale"""
    print("🚀 Démarrage de l'environnement de développement")
    print("=" * 60)
    
    # Configuration de l'environnement
    if setup_dev_environment():
        # Instructions d'utilisation
        show_usage_instructions()
        
        print("\n🎯 Votre environnement est prêt!")
        print("🔑 Vous pouvez maintenant utiliser votre code secret pour un accès immédiat")
        print("🛡️ Les autres utilisateurs continuent à utiliser l'authentification biométrique")
        
    else:
        print("\n❌ Échec de la configuration")
        print("🔧 Vérifiez les erreurs ci-dessus")

if __name__ == "__main__":
    main() 