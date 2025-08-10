#!/usr/bin/env python3
"""
Outils de gestion superadmin
Scripts utilitaires pour gérer l'accès superadmin et le bypass
"""

import os
import sys
import hashlib
import argparse
from pathlib import Path

# Ajoute le répertoire lib au path
sys.path.append(str(Path(__file__).parent.parent / 'lib'))

from auth.superadmin_bypass import SuperAdminBypass, quick_dev_access, get_bypass_status

def generate_password_hash(password: str, salt: str = None) -> str:
    """Génère un hash de mot de passe"""
    if salt is None:
        salt = os.getenv('SUPERADMIN_SALT', 'superadmin-salt-2024')
    
    return hashlib.sha256(f"{password}{salt}".encode()).hexdigest()

def setup_superadmin():
    """Configure le superadmin principal"""
    print("🔐 Configuration du Superadmin")
    print("=" * 50)
    
    username = input("Nom d'utilisateur superadmin (défaut: superadmin): ").strip()
    if not username:
        username = "superadmin"
    
    password = input("Mot de passe: ")
    if not password:
        print("❌ Mot de passe requis")
        return
    
    # Génère le hash du mot de passe
    password_hash = generate_password_hash(password)
    
    print(f"\n✅ Configuration générée pour {username}:")
    print(f"SUPERADMIN_USERNAME={username}")
    print(f"SUPERADMIN_PASSWORD_HASH={password_hash}")
    print(f"SUPERADMIN_SALT={os.getenv('SUPERADMIN_SALT', 'superadmin-salt-2024')}")
    
    # Crée le fichier .env.superadmin
    env_content = f"""# Configuration Superadmin - Accès de développement
SUPERADMIN_BYPASS_ENABLED=true
SUPERADMIN_USERNAME={username}
SUPERADMIN_PASSWORD_HASH={password_hash}
SUPERADMIN_SALT={os.getenv('SUPERADMIN_SALT', 'superadmin-salt-2024')}
SUPERADMIN_BYPASS_EXPIRY_HOURS=24

# Configuration biométrique pour le développement
BIOMETRIC_SECRET_KEY=dev-secret-key-change-in-production
ENCRYPTION_KEY=dev-encryption-key-change-in-production
VALIDATE_FINGERPRINT_QUALITY=false
REQUIRE_MULTIPLE_CAPTURES=false
ENCRYPT_FINGERPRINTS=false
BIOMETRIC_LOG_LEVEL=DEBUG
"""
    
    env_file = Path(__file__).parent.parent / '.env.superadmin'
    try:
        with open(env_file, 'w') as f:
            f.write(env_content)
        print(f"\n✅ Fichier .env.superadmin créé: {env_file}")
    except Exception as e:
        print(f"❌ Erreur lors de la création du fichier: {e}")

def quick_access():
    """Génère un token d'accès rapide pour le développement"""
    print("🚀 Accès rapide au développement")
    print("=" * 50)
    
    try:
        token = quick_dev_access()
        print(f"✅ Token de développement généré (valide 7 jours):")
        print(f"Token: {token}")
        print(f"\n🔗 Utilisez ce token dans vos requêtes avec l'en-tête:")
        print(f"Authorization: Bearer {token}")
        
    except Exception as e:
        print(f"❌ Erreur: {e}")
        print("Vérifiez que le bypass superadmin est activé")

def show_status():
    """Affiche le statut du système de bypass"""
    print("📊 Statut du système de bypass superadmin")
    print("=" * 50)
    
    try:
        status = get_bypass_status()
        for key, value in status.items():
            print(f"{key}: {value}")
            
    except Exception as e:
        print(f"❌ Erreur: {e}")

def test_auth():
    """Teste l'authentification superadmin"""
    print("🧪 Test d'authentification superadmin")
    print("=" * 50)
    
    username = input("Nom d'utilisateur: ").strip()
    password = input("Mot de passe: ")
    
    if not username or not password:
        print("❌ Nom d'utilisateur et mot de passe requis")
        return
    
    try:
        bypass = SuperAdminBypass()
        token = bypass.authenticate_superadmin(username, password)
        
        if token:
            print(f"✅ Authentification réussie!")
            print(f"Token: {token}")
            
            # Valide le token
            info = bypass.get_superadmin_info(token)
            if info:
                print(f"Utilisateur: {info['username']}")
                print(f"Rôle: {info['role']}")
                print(f"Expire: {info['expires_at']}")
        else:
            print("❌ Authentification échouée")
            
    except Exception as e:
        print(f"❌ Erreur: {e}")

def add_superadmin():
    """Ajoute un nouveau superadmin"""
    print("➕ Ajout d'un nouveau superadmin")
    print("=" * 50)
    
    username = input("Nom d'utilisateur: ").strip()
    password = input("Mot de passe: ")
    
    if not username or not password:
        print("❌ Nom d'utilisateur et mot de passe requis")
        return
    
    try:
        bypass = SuperAdminBypass()
        result = bypass.add_superadmin(username, password)
        
        if result['success']:
            print(f"✅ {result['message']}")
        else:
            print(f"❌ {result['error']}")
            
    except Exception as e:
        print(f"❌ Erreur: {e}")

def main():
    """Fonction principale"""
    parser = argparse.ArgumentParser(description="Outils de gestion superadmin")
    parser.add_argument('command', choices=['setup', 'quick-access', 'status', 'test', 'add'], 
                       help='Commande à exécuter')
    
    args = parser.parse_args()
    
    if args.command == 'setup':
        setup_superadmin()
    elif args.command == 'quick-access':
        quick_access()
    elif args.command == 'status':
        show_status()
    elif args.command == 'test':
        test_auth()
    elif args.command == 'add':
        add_superadmin()

if __name__ == "__main__":
    main() 