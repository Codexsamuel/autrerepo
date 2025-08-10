#!/usr/bin/env python3
"""
Script de test pour l'authentification Sentinel Zero
Teste les 5 niveaux d'authentification
"""

import requests
import json

# Configuration
BASE_URL = "http://localhost:8000"
LOGIN_ENDPOINT = f"{BASE_URL}/api/auth/login"

# Données d'authentification correctes
AUTH_DATA = {
    "master_code": "0987612345",
    "admin_id": "DL-SUPER-01",
    "voice_hash": "b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0",
    "fingerprint_hash": "a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1",
    "vocal_phrase": "i am sentinel"
}

def test_health_check():
    """Test de la santé du serveur"""
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print(f"✅ Health check: {response.status_code}")
        if response.status_code == 200:
            print(f"   Réponse: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Health check échoué: {e}")
        return False

def test_login():
    """Test de l'authentification complète"""
    try:
        print("\n🔐 Test d'authentification Sentinel Zero...")
        print(f"URL: {LOGIN_ENDPOINT}")
        print(f"Données: {json.dumps(AUTH_DATA, indent=2)}")
        
        response = requests.post(LOGIN_ENDPOINT, json=AUTH_DATA)
        
        print(f"\n📡 Réponse du serveur:")
        print(f"Status: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Authentification réussie!")
            print(f"Token: {data.get('token', 'N/A')[:50]}...")
            print(f"Message: {data.get('message', 'N/A')}")
            print(f"Niveau d'accès: {data.get('access_level', 'N/A')}")
            return True
        else:
            print(f"❌ Authentification échouée")
            try:
                error_data = response.json()
                print(f"Erreur: {error_data}")
            except:
                print(f"Erreur: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Erreur lors du test: {e}")
        return False

def test_individual_levels():
    """Test de chaque niveau individuellement"""
    print("\n🔍 Test des niveaux individuels...")
    
    levels = [
        ("Code maître", "master_code", "0000000000"),
        ("ID Admin", "admin_id", "WRONG-ID"),
        ("Empreinte vocale", "voice_hash", "wrong_hash"),
        ("Empreinte digitale", "fingerprint_hash", "wrong_hash"),
        ("Phrase vocale", "vocal_phrase", "wrong_phrase")
    ]
    
    for level_name, field, wrong_value in levels:
        print(f"\n--- Test niveau: {level_name} ---")
        
        # Test avec valeur correcte
        test_data = AUTH_DATA.copy()
        response = requests.post(LOGIN_ENDPOINT, json=test_data)
        if response.status_code == 200:
            print(f"✅ {level_name}: OK")
        else:
            print(f"❌ {level_name}: ÉCHEC (devrait réussir)")
        
        # Test avec valeur incorrecte
        test_data[field] = wrong_value
        response = requests.post(LOGIN_ENDPOINT, json=test_data)
        if response.status_code == 401:
            print(f"✅ {level_name}: Validation correcte (rejette la valeur incorrecte)")
        else:
            print(f"❌ {level_name}: Validation incorrecte (devrait rejeter)")

def main():
    """Fonction principale"""
    print("🚀 Test Sentinel Zero - Authentification")
    print("=" * 50)
    
    # Test de santé
    if not test_health_check():
        print("\n❌ Le serveur n'est pas accessible. Assurez-vous qu'il soit démarré.")
        print("   Commande: cd sentinel-zero/backend && python main.py")
        return
    
    # Test d'authentification complète
    if test_login():
        print("\n🎉 Tous les tests d'authentification sont passés!")
    else:
        print("\n💥 Tests d'authentification échoués.")
    
    # Test des niveaux individuels
    test_individual_levels()
    
    print("\n" + "=" * 50)
    print("🏁 Tests terminés")

if __name__ == "__main__":
    main() 