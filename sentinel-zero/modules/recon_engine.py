#!/usr/bin/env python3
"""
Sentinel Zero - Module de Reconnaissance Avancée
Reconnaissance passive et active des cibles
"""

import socket
import dns.resolver
import whois
import requests
import subprocess
import json
import time
from typing import Dict, List, Any
from urllib.parse import urlparse
import threading

class ReconEngine:
    """Moteur de reconnaissance Sentinel Zero"""
    
    def __init__(self):
        self.results = {}
        self.user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    
    def full_reconnaissance(self, target: str) -> Dict[str, Any]:
        """Reconnaissance complète d'une cible"""
        print(f"🔍 [SENTINEL] Démarrage reconnaissance: {target}")
        
        # Nettoyage de l'URL
        if not target.startswith(('http://', 'https://')):
            target = f"https://{target}"
        
        parsed_url = urlparse(target)
        domain = parsed_url.netloc
        
        self.results = {
            "target": target,
            "domain": domain,
            "timestamp": time.time(),
            "reconnaissance": {}
        }
        
        # Reconnaissance DNS
        self.results["reconnaissance"]["dns"] = self.dns_reconnaissance(domain)
        
        # Reconnaissance WHOIS
        self.results["reconnaissance"]["whois"] = self.whois_reconnaissance(domain)
        
        # Scan de ports
        self.results["reconnaissance"]["ports"] = self.port_scan(domain)
        
        # Fingerprinting web
        self.results["reconnaissance"]["web"] = self.web_fingerprinting(target)
        
        # Recherche de sous-domaines
        self.results["reconnaissance"]["subdomains"] = self.subdomain_enumeration(domain)
        
        # Technologies détectées
        self.results["reconnaissance"]["technologies"] = self.technology_detection(target)
        
        print(f"✅ [SENTINEL] Reconnaissance terminée: {target}")
        return self.results
    
    def dns_reconnaissance(self, domain: str) -> Dict[str, Any]:
        """Reconnaissance DNS avancée"""
        dns_info = {
            "a_records": [],
            "aaaa_records": [],
            "mx_records": [],
            "ns_records": [],
            "txt_records": [],
            "cname_records": []
        }
        
        try:
            # Records A
            try:
                a_records = dns.resolver.resolve(domain, 'A')
                dns_info["a_records"] = [str(record) for record in a_records]
            except:
                pass
            
            # Records AAAA
            try:
                aaaa_records = dns.resolver.resolve(domain, 'AAAA')
                dns_info["aaaa_records"] = [str(record) for record in aaaa_records]
            except:
                pass
            
            # Records MX
            try:
                mx_records = dns.resolver.resolve(domain, 'MX')
                dns_info["mx_records"] = [str(record.exchange) for record in mx_records]
            except:
                pass
            
            # Records NS
            try:
                ns_records = dns.resolver.resolve(domain, 'NS')
                dns_info["ns_records"] = [str(record) for record in ns_records]
            except:
                pass
            
            # Records TXT
            try:
                txt_records = dns.resolver.resolve(domain, 'TXT')
                dns_info["txt_records"] = [str(record) for record in txt_records]
            except:
                pass
            
            # Records CNAME
            try:
                cname_records = dns.resolver.resolve(domain, 'CNAME')
                dns_info["cname_records"] = [str(record) for record in cname_records]
            except:
                pass
                
        except Exception as e:
            dns_info["error"] = str(e)
        
        return dns_info
    
    def whois_reconnaissance(self, domain: str) -> Dict[str, Any]:
        """Reconnaissance WHOIS"""
        whois_info = {}
        
        try:
            w = whois.whois(domain)
            whois_info = {
                "registrar": w.registrar,
                "creation_date": str(w.creation_date),
                "expiration_date": str(w.expiration_date),
                "updated_date": str(w.updated_date),
                "status": w.status,
                "name_servers": w.name_servers,
                "emails": w.emails
            }
        except Exception as e:
            whois_info["error"] = str(e)
        
        return whois_info
    
    def port_scan(self, domain: str, ports: List[int] = None) -> Dict[str, Any]:
        """Scan de ports rapide"""
        if ports is None:
            ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995, 3306, 3389, 5432, 8080, 8443]
        
        port_info = {"open_ports": [], "closed_ports": []}
        
        def scan_port(port):
            try:
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(2)
                result = sock.connect_ex((domain, port))
                sock.close()
                
                if result == 0:
                    port_info["open_ports"].append(port)
                else:
                    port_info["closed_ports"].append(port)
            except:
                port_info["closed_ports"].append(port)
        
        # Scan multi-threadé
        threads = []
        for port in ports:
            thread = threading.Thread(target=scan_port, args=(port,))
            threads.append(thread)
            thread.start()
        
        # Attendre la fin des scans
        for thread in threads:
            thread.join()
        
        return port_info
    
    def web_fingerprinting(self, url: str) -> Dict[str, Any]:
        """Fingerprinting web avancé"""
        web_info = {
            "headers": {},
            "server": "",
            "technologies": [],
            "security_headers": {},
            "response_time": 0
        }
        
        try:
            start_time = time.time()
            response = requests.get(url, headers={"User-Agent": self.user_agent}, timeout=10)
            response_time = time.time() - start_time
            
            web_info["response_time"] = response_time
            web_info["status_code"] = response.status_code
            web_info["headers"] = dict(response.headers)
            
            # Détection du serveur
            if "Server" in response.headers:
                web_info["server"] = response.headers["Server"]
            
            # Headers de sécurité
            security_headers = [
                "X-Frame-Options", "X-Content-Type-Options", "X-XSS-Protection",
                "Strict-Transport-Security", "Content-Security-Policy",
                "Referrer-Policy", "Permissions-Policy"
            ]
            
            for header in security_headers:
                if header in response.headers:
                    web_info["security_headers"][header] = response.headers[header]
            
            # Détection de technologies basiques
            content = response.text.lower()
            technologies = []
            
            if "wordpress" in content or "wp-content" in content:
                technologies.append("WordPress")
            if "drupal" in content:
                technologies.append("Drupal")
            if "joomla" in content:
                technologies.append("Joomla")
            if "php" in content or "php" in response.headers.get("X-Powered-By", ""):
                technologies.append("PHP")
            if "asp.net" in content or "asp.net" in response.headers.get("X-Powered-By", ""):
                technologies.append("ASP.NET")
            if "jquery" in content:
                technologies.append("jQuery")
            if "bootstrap" in content:
                technologies.append("Bootstrap")
            if "cloudflare" in response.headers.get("Server", "").lower():
                technologies.append("Cloudflare")
            
            web_info["technologies"] = technologies
            
        except Exception as e:
            web_info["error"] = str(e)
        
        return web_info
    
    def subdomain_enumeration(self, domain: str) -> Dict[str, Any]:
        """Énumération de sous-domaines"""
        subdomains = []
        common_subdomains = [
            "www", "mail", "ftp", "admin", "blog", "dev", "test", "staging",
            "api", "cdn", "static", "img", "images", "media", "files",
            "support", "help", "docs", "wiki", "forum", "shop", "store"
        ]
        
        for subdomain in common_subdomains:
            full_domain = f"{subdomain}.{domain}"
            try:
                socket.gethostbyname(full_domain)
                subdomains.append(full_domain)
            except:
                pass
        
        return {
            "subdomains": subdomains,
            "total_found": len(subdomains)
        }
    
    def technology_detection(self, url: str) -> Dict[str, Any]:
        """Détection avancée de technologies"""
        tech_info = {
            "cms": [],
            "frameworks": [],
            "languages": [],
            "servers": [],
            "databases": [],
            "cms": []
        }
        
        try:
            response = requests.get(url, headers={"User-Agent": self.user_agent}, timeout=10)
            content = response.text.lower()
            headers = {k.lower(): v for k, v in response.headers.items()}
            
            # Détection CMS
            if "wordpress" in content or "wp-content" in content:
                tech_info["cms"].append("WordPress")
            if "drupal" in content:
                tech_info["cms"].append("Drupal")
            if "joomla" in content:
                tech_info["cms"].append("Joomla")
            if "magento" in content:
                tech_info["cms"].append("Magento")
            
            # Détection frameworks
            if "laravel" in content:
                tech_info["frameworks"].append("Laravel")
            if "django" in content:
                tech_info["frameworks"].append("Django")
            if "rails" in content:
                tech_info["frameworks"].append("Ruby on Rails")
            if "spring" in content:
                tech_info["frameworks"].append("Spring")
            
            # Détection langages
            if "php" in content or "php" in headers.get("x-powered-by", ""):
                tech_info["languages"].append("PHP")
            if "asp.net" in content or "asp.net" in headers.get("x-powered-by", ""):
                tech_info["languages"].append("ASP.NET")
            if "python" in content:
                tech_info["languages"].append("Python")
            if "node.js" in content:
                tech_info["languages"].append("Node.js")
            
            # Détection serveurs
            server = headers.get("server", "")
            if "apache" in server.lower():
                tech_info["servers"].append("Apache")
            if "nginx" in server.lower():
                tech_info["servers"].append("Nginx")
            if "iis" in server.lower():
                tech_info["servers"].append("IIS")
            
            # Détection bases de données (basique)
            if "mysql" in content:
                tech_info["databases"].append("MySQL")
            if "postgresql" in content:
                tech_info["databases"].append("PostgreSQL")
            if "mongodb" in content:
                tech_info["databases"].append("MongoDB")
                
        except Exception as e:
            tech_info["error"] = str(e)
        
        return tech_info

# Fonction d'export pour Sentinel Zero
def run_reconnaissance(target: str) -> Dict[str, Any]:
    """Fonction principale pour Sentinel Zero"""
    engine = ReconEngine()
    return engine.full_reconnaissance(target)

if __name__ == "__main__":
    # Test du module
    target = "example.com"
    results = run_reconnaissance(target)
    print(json.dumps(results, indent=2)) 