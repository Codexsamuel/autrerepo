#!/usr/bin/env python3
"""
Module de Reconnaissance Avancée - Sentinel Zero
Détection d'informations sur les cibles
"""

import asyncio
import aiohttp
import dns.resolver
import whois
import socket
import ssl
import nmap
import subprocess
import json
import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
import hashlib
import os

logger = logging.getLogger(__name__)

class AdvancedReconnaissance:
    """
    Module de reconnaissance ultra-avancé pour Sentinel Zero
    - WHOIS détaillé
    - Résolution DNS avancée
    - Scan de ports avec Nmap
    - Analyse SSL/TLS
    - Détection de technologies
    - Géolocalisation IP
    """
    
    def __init__(self):
        self.session = None
        self.nmap_scanner = nmap.PortScanner()
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def comprehensive_whois(self, domain: str) -> Dict[str, Any]:
        """WHOIS complet et détaillé"""
        try:
            w = whois.whois(domain)
            return {
                'domain': domain,
                'registrar': w.registrar,
                'creation_date': w.creation_date,
                'expiration_date': w.expiration_date,
                'updated_date': w.updated_date,
                'name_servers': w.name_servers,
                'status': w.status,
                'emails': w.emails,
                'dnssec': w.dnssec
            }
        except Exception as e:
            logger.error(f"Erreur WHOIS pour {domain}: {e}")
            return {'error': str(e)}
    
    async def dns_enumeration(self, domain: str) -> Dict[str, Any]:
        """Énumération DNS complète"""
        results = {
            'domain': domain,
            'a_records': [],
            'aaaa_records': [],
            'mx_records': [],
            'ns_records': [],
            'txt_records': [],
            'cname_records': []
        }
        
        record_types = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME']
        
        for record_type in record_types:
            try:
                answers = dns.resolver.resolve(domain, record_type)
                for answer in answers:
                    if record_type == 'A':
                        results['a_records'].append(str(answer))
                    elif record_type == 'AAAA':
                        results['aaaa_records'].append(str(answer))
                    elif record_type == 'MX':
                        results['mx_records'].append(str(answer))
                    elif record_type == 'NS':
                        results['ns_records'].append(str(answer))
                    elif record_type == 'TXT':
                        results['txt_records'].append(str(answer))
                    elif record_type == 'CNAME':
                        results['cname_records'].append(str(answer))
            except Exception as e:
                logger.warning(f"Erreur DNS {record_type} pour {domain}: {e}")
        
        return results
    
    async def port_scan(self, target: str, ports: str = "1-1000") -> Dict[str, Any]:
        """Scan de ports avec Nmap"""
        try:
            self.nmap_scanner.scan(target, ports)
            return {
                'target': target,
                'scan_info': dict(self.nmap_scanner.scaninfo()),
                'hosts': dict(self.nmap_scanner.all_hosts()),
                'tcp_ports': self.nmap_scanner[target]['tcp'] if target in self.nmap_scanner.all_hosts() else {}
            }
        except Exception as e:
            logger.error(f"Erreur scan de ports pour {target}: {e}")
            return {'error': str(e)}
    
    async def ssl_analysis(self, host: str, port: int = 443) -> Dict[str, Any]:
        """Analyse SSL/TLS complète"""
        try:
            context = ssl.create_default_context()
            with socket.create_connection((host, port)) as sock:
                with context.wrap_socket(sock, server_hostname=host) as ssock:
                    cert = ssock.getpeercert()
                    return {
                        'host': host,
                        'port': port,
                        'issuer': dict(x[0] for x in cert['issuer']),
                        'subject': dict(x[0] for x in cert['subject']),
                        'version': cert['version'],
                        'serial_number': cert['serialNumber'],
                        'not_before': cert['notBefore'],
                        'not_after': cert['notAfter'],
                        'san': cert.get('subjectAltName', []),
                        'cipher_suite': ssock.cipher()
                    }
        except Exception as e:
            logger.error(f"Erreur analyse SSL pour {host}:{port}: {e}")
            return {'error': str(e)}
    
    async def technology_detection(self, url: str) -> Dict[str, Any]:
        """Détection de technologies web"""
        try:
            async with self.session.get(url) as response:
                headers = dict(response.headers)
                content = await response.text()
                
                technologies = {
                    'server': headers.get('server', ''),
                    'x_powered_by': headers.get('x-powered-by', ''),
                    'frameworks': [],
                    'languages': [],
                    'databases': [],
                    'cms': []
                }
                
                # Détection de frameworks
                if 'wordpress' in content.lower():
                    technologies['cms'].append('WordPress')
                if 'drupal' in content.lower():
                    technologies['cms'].append('Drupal')
                if 'joomla' in content.lower():
                    technologies['cms'].append('Joomla')
                
                if 'react' in content.lower():
                    technologies['frameworks'].append('React')
                if 'angular' in content.lower():
                    technologies['frameworks'].append('Angular')
                if 'vue' in content.lower():
                    technologies['frameworks'].append('Vue.js')
                
                return technologies
        except Exception as e:
            logger.error(f"Erreur détection technologies pour {url}: {e}")
            return {'error': str(e)}
    
    async def ip_geolocation(self, ip: str) -> Dict[str, Any]:
        """Géolocalisation IP"""
        try:
            url = f"http://ip-api.com/json/{ip}"
            async with self.session.get(url) as response:
                data = await response.json()
                return {
                    'ip': ip,
                    'country': data.get('country', ''),
                    'region': data.get('regionName', ''),
                    'city': data.get('city', ''),
                    'isp': data.get('isp', ''),
                    'org': data.get('org', ''),
                    'timezone': data.get('timezone', ''),
                    'lat': data.get('lat', 0),
                    'lon': data.get('lon', 0)
                }
        except Exception as e:
            logger.error(f"Erreur géolocalisation pour {ip}: {e}")
            return {'error': str(e)}
    
    async def comprehensive_scan(self, target: str) -> Dict[str, Any]:
        """Scan complet d'une cible"""
        results = {
            'target': target,
            'timestamp': datetime.now().isoformat(),
            'whois': {},
            'dns': {},
            'ports': {},
            'ssl': {},
            'technologies': {},
            'geolocation': {}
        }
        
        # WHOIS
        if '.' in target:
            results['whois'] = await self.comprehensive_whois(target)
            results['dns'] = await self.dns_enumeration(target)
        
        # Scan de ports
        results['ports'] = await self.port_scan(target)
        
        # Analyse SSL
        if results['ports'].get('tcp') and 443 in results['ports']['tcp']:
            results['ssl'] = await self.ssl_analysis(target, 443)
        
        # Détection technologies
        try:
            url = f"https://{target}" if not target.startswith('http') else target
            results['technologies'] = await self.technology_detection(url)
        except:
            pass
        
        # Géolocalisation
        if results['dns'].get('a_records'):
            ip = results['dns']['a_records'][0]
            results['geolocation'] = await self.ip_geolocation(ip)
        
        return results

async def main():
    """Test du module"""
    async with AdvancedReconnaissance() as recon:
        target = "example.com"
        print(f"Scan complet de {target}...")
        results = await recon.comprehensive_scan(target)
        print(json.dumps(results, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
