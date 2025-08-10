#!/usr/bin/env python3
"""
Test du système d'accès rapide
Vérifie que le code secret fonctionne correctement
"""

import sys
from pathlib import Path

# Ajoute le répertoire lib au path
sys.path.append(str(Path(__file__).parent.parent / 'lib'))

from auth.quick_access import (
    get_quick_access_system,
    quick_access_with_code,
    emergency_quick_access
)

def test_secret_code():
    """Teste le code secret personnel"""
    print("🔐 Test du Code Secret Personnel")
    print("=" * 50)
    
    # Votre code secret
    secret_code = "0987612345SamuelObamSuperAdmin1234509876"
    
    print(f"Code secret: {secret_code[:10]}...{secret_code[-10:]}")
    print(f"Longueur: {len(secret_code)} caractères")
    
    # Test d'accès rapide
    print("\n🧪 Test d'accès rapide...")
    token = quick_access_with_code(secret_code)
    
    if token:
        print("✅ Code secret valide!")
        print(f"Token généré: {token[:50]}...")
        
        # Valide le token
        system = get_quick_access_system()
        info = system.get_quick_access_info(token)
        
        if info:
            print(f"\n📋 Informations du token:")
            print(f"Utilisateur: {info['username']}")
            print(f"Rôle: {info['role']}")
            print(f"Type d'accès: {info['access_type']}")
            print(f"Privilèges: {', '.join(info['privileges'])}")
            print(f"Expire: {info['expires_at']}")
            print(f"Accès rapide: {info['quick_access']}")
        
    else:
        print("❌ Code secret invalide!")
        return False
    
    return True

def test_emergency_access():
    """Teste l'accès d'urgence"""
    print("\n🚨 Test d'accès d'urgence...")
    
    try:
        result = get_quick_access_system().emergency_access()
        
        if result['success']:
            print("✅ Accès d'urgence activé!")
            print(f"Token: {result['token'][:50]}...")
            print(f"Type: {result['access_type']}")
            print(f"Expire dans: {result['expires_in_days']} jours")
            print(f"Message: {result['message']}")
        else:
            print(f"❌ Erreur: {result['error']}")
            
    except Exception as e:
        print(f"❌ Exception: {e}")

def test_invalid_codes():
    """Teste des codes invalides"""
    print("\n🚫 Test de codes invalides...")
    
    invalid_codes = [
        "1234567890",
        "password123",
        "admin",
        "superadmin",
        "0987612345SamuelObamSuperAdmin1234509875",  # Une erreur
        ""
    ]
    
    system = get_quick_access_system()
    
    for code in invalid_codes:
        is_valid = system.validate_quick_access_code(code)
        status = "✅ Valide" if is_valid else "❌ Invalide"
        print(f"Code '{code[:20]}{'...' if len(code) > 20 else ''}': {status}")

def show_system_status():
    """Affiche le statut du système"""
    print("\n📊 Statut du système d'accès rapide")
    print("=" * 50)
    
    system = get_quick_access_system()
    status = system.get_access_status()
    
    for key, value in status.items():
        print(f"{key}: {value}")

def main():
    """Fonction principale"""
    print("🚀 Test du Système d'Accès Rapide Superadmin")
    print("=" * 60)
    
    # Test du code secret
    if not test_secret_code():
        print("\n❌ Le test du code secret a échoué!")
        return
    
    # Test d'accès d'urgence
    test_emergency_access()
    
    # Test de codes invalides
    test_invalid_codes()
    
    # Statut du système
    show_system_status()
    
    print("\n🎉 Tous les tests sont terminés!")
    print("\n💡 Votre code secret fonctionne parfaitement!")
    print("🔑 Vous pouvez maintenant accéder immédiatement en tant que superadmin")

if __name__ == "__main__":
    main() 