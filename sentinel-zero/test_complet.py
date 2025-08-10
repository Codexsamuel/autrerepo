#!/usr/bin/env python3
"""
Test complet de Sentinel Zero
Vérifie tous les aspects du système
"""

import requests
import json
import time
import sys

class SentinelZeroTester:
    """Classe de test pour Sentinel Zero"""
    
    def __init__(self):
        self.base_url = "http://localhost:8000"
        self.token = None
        self.auth_data = {
            "master_code": "0987612345",
            "admin_id": "DL-SUPER-01",
            "voice_hash": "b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0",
            "fingerprint_hash": "a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1",
            "vocal_phrase": "i am sentinel"
        }
    
    def print_header(self, title):
        """Affiche un en-tête de section"""
        print(f"\n{'='*60}")
        print(f"🔍 {title}")
        print(f"{'='*60}")
    
    def print_result(self, test_name, success, details=""):
        """Affiche le résultat d'un test"""
        status = "✅ SUCCÈS" if success else "❌ ÉCHEC"
        print(f"{status}: {test_name}")
        if details:
            print(f"   {details}")
    
    def test_server_health(self):
        """Test de la santé du serveur"""
        self.print_header("Test de Santé du Serveur")
        
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=5)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                self.print_result("Health Check", True, f"Status: {data.get('status', 'N/A')}")
            else:
                self.print_result("Health Check", False, f"Status Code: {response.status_code}")
            
            return success
            
        except requests.exceptions.ConnectionError:
            self.print_result("Health Check", False, "Serveur non accessible")
            return False
        except Exception as e:
            self.print_result("Health Check", False, f"Erreur: {e}")
            return False
    
    def test_authentication(self):
        """Test de l'authentification complète"""
        self.print_header("Test d'Authentification 5 Niveaux")
        
        try:
            response = requests.post(f"{self.base_url}/api/auth/login", 
                                  json=self.auth_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.token = data.get('token')
                self.print_result("Authentification 5 Niveaux", True, 
                               f"Token: {self.token[:50] if self.token else 'N/A'}...")
                return True
            else:
                error_data = response.json() if response.headers.get('content-type') == 'application/json' else response.text
                self.print_result("Authentification 5 Niveaux", False, f"Erreur: {error_data}")
                return False
                
        except Exception as e:
            self.print_result("Authentification 5 Niveaux", False, f"Erreur: {e}")
            return False
    
    def test_individual_levels(self):
        """Test de chaque niveau individuellement"""
        self.print_header("Test des Niveaux Individuels")
        
        levels = [
            ("Code Maître", "master_code", "0000000000"),
            ("ID Admin", "admin_id", "WRONG-ID"),
            ("Empreinte Vocale", "voice_hash", "wrong_hash"),
            ("Empreinte Digitale", "fingerprint_hash", "wrong_hash"),
            ("Phrase Vocale", "vocal_phrase", "wrong_phrase")
        ]
        
        all_passed = True
        
        for level_name, field, wrong_value in levels:
            # Test avec valeur correcte
            test_data = self.auth_data.copy()
            response = requests.post(f"{self.base_url}/api/auth/login", json=test_data)
            
            if response.status_code == 200:
                self.print_result(f"{level_name} (Correct)", True)
            else:
                self.print_result(f"{level_name} (Correct)", False, "Devrait réussir")
                all_passed = False
            
            # Test avec valeur incorrecte
            test_data[field] = wrong_value
            response = requests.post(f"{self.base_url}/api/auth/login", json=test_data)
            
            if response.status_code == 401:
                self.print_result(f"{level_name} (Incorrect)", True, "Rejette correctement")
            else:
                self.print_result(f"{level_name} (Incorrect)", False, "Devrait rejeter")
                all_passed = False
        
        return all_passed
    
    def test_backdoor_scan(self):
        """Test du scan de portes dérobées"""
        self.print_header("Test de Scan de Portes Dérobées")
        
        if not self.token:
            self.print_result("Scan de Portes Dérobées", False, "Token d'authentification manquant")
            return False
        
        try:
            scan_data = {
                "target": "https://example.com",
                "scan_type": "comprehensive",
                "duration": 60
            }
            
            headers = {"Authorization": f"Bearer {self.token}"}
            response = requests.post(f"{self.base_url}/api/scan/backdoor", 
                                  json=scan_data, headers=headers, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                scan_id = data.get('scan_id')
                self.print_result("Scan de Portes Dérobées", True, f"Scan ID: {scan_id}")
                
                # Attendre et vérifier les résultats
                time.sleep(2)
                self.test_scan_results(scan_id)
                return True
            else:
                error_data = response.json() if response.headers.get('content-type') == 'application/json' else response.text
                self.print_result("Scan de Portes Dérobées", False, f"Erreur: {error_data}")
                return False
                
        except Exception as e:
            self.print_result("Scan de Portes Dérobées", False, f"Erreur: {e}")
            return False
    
    def test_scan_results(self, scan_id):
        """Test de récupération des résultats de scan"""
        try:
            response = requests.get(f"{self.base_url}/api/scan/backdoor/{scan_id}")
            
            if response.status_code == 200:
                data = response.json()
                self.print_result("Récupération Résultats", True, f"Status: {data.get('status', 'N/A')}")
            else:
                self.print_result("Récupération Résultats", False, f"Status Code: {response.status_code}")
                
        except Exception as e:
            self.print_result("Récupération Résultats", False, f"Erreur: {e}")
    
    def test_red_button(self):
        """Test du bouton rouge (destruction)"""
        self.print_header("Test du Bouton Rouge")
        
        if not self.token:
            self.print_result("Bouton Rouge", False, "Token d'authentification manquant")
            return False
        
        try:
            red_button_data = {
                "confirmation": "i am sentinel",
                "reason": "Test de sécurité"
            }
            
            headers = {"Authorization": f"Bearer {self.token}"}
            response = requests.post(f"{self.base_url}/api/auth/red-button", 
                                  json=red_button_data, headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.print_result("Bouton Rouge", True, f"Message: {data.get('message', 'N/A')}")
                return True
            else:
                error_data = response.json() if response.headers.get('content-type') == 'application/json' else response.text
                self.print_result("Bouton Rouge", False, f"Erreur: {error_data}")
                return False
                
        except Exception as e:
            self.print_result("Bouton Rouge", False, f"Erreur: {e}")
            return False
    
    def test_access_logs(self):
        """Test des journaux d'accès"""
        self.print_header("Test des Journaux d'Accès")
        
        if not self.token:
            self.print_result("Journaux d'Accès", False, "Token d'authentification manquant")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.token}"}
            response = requests.get(f"{self.base_url}/api/admin/access-logs", 
                                 headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                log_count = len(data) if isinstance(data, list) else 0
                self.print_result("Journaux d'Accès", True, f"Nombre de logs: {log_count}")
                return True
            else:
                error_data = response.json() if response.headers.get('content-type') == 'application/json' else response.text
                self.print_result("Journaux d'Accès", False, f"Erreur: {error_data}")
                return False
                
        except Exception as e:
            self.print_result("Journaux d'Accès", False, f"Erreur: {e}")
            return False
    
    def run_all_tests(self):
        """Exécute tous les tests"""
        print("🚀 Test Complet de Sentinel Zero")
        print("=" * 60)
        
        tests = [
            ("Santé du Serveur", self.test_server_health),
            ("Authentification", self.test_authentication),
            ("Niveaux Individuels", self.test_individual_levels),
            ("Scan de Portes Dérobées", self.test_backdoor_scan),
            ("Bouton Rouge", self.test_red_button),
            ("Journaux d'Accès", self.test_access_logs)
        ]
        
        results = []
        
        for test_name, test_func in tests:
            try:
                result = test_func()
                results.append((test_name, result))
            except Exception as e:
                print(f"❌ Erreur lors du test {test_name}: {e}")
                results.append((test_name, False))
        
        # Résumé
        self.print_header("Résumé des Tests")
        passed = sum(1 for _, result in results if result)
        total = len(results)
        
        for test_name, result in results:
            status = "✅" if result else "❌"
            print(f"{status} {test_name}")
        
        print(f"\n📊 Résultats: {passed}/{total} tests réussis")
        
        if passed == total:
            print("🎉 Tous les tests sont passés! Sentinel Zero est opérationnel.")
            return True
        else:
            print("💥 Certains tests ont échoué. Vérifiez la configuration.")
            return False

def main():
    """Fonction principale"""
    tester = SentinelZeroTester()
    
    try:
        success = tester.run_all_tests()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⏹️  Tests interrompus par l'utilisateur")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n💥 Erreur critique: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 