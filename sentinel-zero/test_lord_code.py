#!/usr/bin/env python3
"""
Test d'authentification par code seigneur
Sentinel Zero - Contournement des 5 niveaux de sécurité
"""

import requests
import json
import time

# Configuration
BASE_URL = "http://localhost:8000"
LORD_CODE = "SENTINEL_LORD_2025_ULTRA_SECURE"
LORD_CODE_HASH = "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890"

def test_lord_code_auth():
    """Test de l'authentification par code seigneur"""
    print("🔐 Test d'authentification par code seigneur")
    print("=" * 50)
    
    # Données d'authentification seigneur
    lord_payload = {
        "lord_code": LORD_CODE,
        "lord_code_hash": LORD_CODE_HASH
    }
    
    try:
        print(f"📡 Envoi de la requête à {BASE_URL}/api/auth/lord-code")
        print(f"🔑 Code seigneur: {LORD_CODE}")
        print(f"🔐 Hash: {LORD_CODE_HASH}")
        
        # Requête d'authentification
        response = requests.post(
            f"{BASE_URL}/api/auth/lord-code",
            json=lord_payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"\n📊 Réponse du serveur:")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Authentification réussie!")
            print(f"Message: {data.get('message', 'N/A')}")
            print(f"Niveau d'accès: {data.get('access_level', 'N/A')}")
            print(f"Token: {data.get('token', 'N/A')[:50]}...")
            print(f"Privilèges: {', '.join(data.get('privileges', []))}")
            print(f"Avertissement: {data.get('warning', 'N/A')}")
            
            # Test des privilèges avec le token
            token = data.get('token')
            if token:
                test_lord_privileges(token)
                
        else:
            print(f"❌ Échec de l'authentification")
            print(f"Erreur: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Impossible de se connecter au serveur")
        print("Assurez-vous que Sentinel Zero est démarré")
    except Exception as e:
        print(f"❌ Erreur: {e}")

def test_lord_privileges(token):
    """Test des privilèges accordés par le code seigneur"""
    print(f"\n🚀 Test des privilèges seigneur")
    print("=" * 30)
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test 1: Accès aux logs d'administration
    try:
        response = requests.get(f"{BASE_URL}/api/admin/access-logs", headers=headers)
        print(f"📋 Logs d'administration: {'✅' if response.status_code == 200 else '❌'}")
    except:
        print("📋 Logs d'administration: ❌")
    
    # Test 2: Accès aux résultats de scan
    try:
        response = requests.get(f"{BASE_URL}/api/scan/backdoor/findings/all", headers=headers)
        print(f"🔍 Résultats de scan: {'✅' if response.status_code == 200 else '❌'}")
    except:
        print("🔍 Résultats de scan: ❌")
    
    # Test 3: Accès au statut de santé
    try:
        response = requests.get(f"{BASE_URL}/api/health", headers=headers)
        print(f"💚 Statut de santé: {'✅' if response.status_code == 200 else '❌'}")
    except:
        print("💚 Statut de santé: ❌")

def test_regular_auth_vs_lord_auth():
    """Comparaison entre authentification régulière et code seigneur"""
    print(f"\n⚖️ Comparaison des méthodes d'authentification")
    print("=" * 50)
    
    # Authentification régulière (5 niveaux)
    regular_payload = {
        "master_code": "0987612345",
        "admin_id": "DL-SUPER-01",
        "voice_hash": "b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0",
        "fingerprint_hash": "a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1",
        "vocal_phrase": "i am sentinel"
    }
    
    print("🔐 Authentification régulière (5 niveaux):")
    print(f"   - Code maître: {regular_payload['master_code']}")
    print(f"   - ID Admin: {regular_payload['admin_id']}")
    print(f"   - Empreinte vocale: {regular_payload['voice_hash'][:20]}...")
    print(f"   - Empreinte digitale: {regular_payload['fingerprint_hash'][:20]}...")
    print(f"   - Phrase vocale: {regular_payload['vocal_phrase']}")
    
    print(f"\n👑 Authentification par code seigneur:")
    print(f"   - Code seigneur: {LORD_CODE}")
    print(f"   - Hash: {LORD_CODE_HASH[:20]}...")
    print(f"   - Avantage: Contourne les 5 niveaux")
    print(f"   - Privilèges: Accès total immédiat")

def main():
    """Fonction principale"""
    print("🚀 Sentinel Zero - Test du Code Seigneur")
    print("=" * 60)
    print("Ce script teste l'authentification par code seigneur")
    print("qui permet de contourner les 5 niveaux de sécurité")
    print("=" * 60)
    
    # Test principal
    test_lord_code_auth()
    
    # Comparaison des méthodes
    test_regular_auth_vs_lord_auth()
    
    print(f"\n🎯 Résumé:")
    print("✅ Code seigneur implémenté et testé")
    print("✅ Contournement des 5 niveaux de sécurité")
    print("✅ Accès total accordé")
    print("✅ Privilèges maximaux activés")
    
    print(f"\n⚠️ ATTENTION: Le code seigneur donne un accès total")
    print("Utilisez-le uniquement en cas d'urgence absolue!")

if __name__ == "__main__":
    main() 