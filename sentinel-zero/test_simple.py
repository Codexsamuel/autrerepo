#!/usr/bin/env python3
"""
Test simple d'authentification Sentinel Zero
"""

import requests
import json

def test_sentinel_auth():
    """Test simple de l'authentification"""
    
    # Configuration
    url = "http://localhost:8000/api/auth/login"
    
    # Données d'authentification
    auth_data = {
        "master_code": "0987612345",
        "admin_id": "DL-SUPER-01", 
        "voice_hash": "b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0",
        "fingerprint_hash": "a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1",
        "vocal_phrase": "i am sentinel"
    }
    
    print("🔐 Test d'authentification Sentinel Zero")
    print("=" * 40)
    print(f"URL: {url}")
    print(f"Données: {json.dumps(auth_data, indent=2)}")
    
    try:
        # Test de connexion
        response = requests.post(url, json=auth_data, timeout=10)
        
        print(f"\n📡 Réponse:")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ SUCCÈS! Authentification réussie")
            print(f"Token: {data.get('token', 'N/A')[:50]}...")
            print(f"Message: {data.get('message', 'N/A')}")
            return True
        else:
            print("❌ ÉCHEC! Authentification échouée")
            try:
                error = response.json()
                print(f"Erreur: {error}")
            except:
                print(f"Erreur: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Impossible de se connecter au serveur")
        print("   Assurez-vous que Sentinel Zero soit démarré:")
        print("   cd sentinel-zero && ./start_sentinel_improved.sh")
        return False
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

if __name__ == "__main__":
    success = test_sentinel_auth()
    if success:
        print("\n🎉 Test réussi! Sentinel Zero est opérationnel")
    else:
        print("\n💥 Test échoué. Vérifiez la configuration") 