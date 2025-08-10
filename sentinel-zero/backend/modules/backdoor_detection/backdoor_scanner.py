#!/usr/bin/env python3
"""
Module de Détection de Portes Dérobées Ultra-Avancé - Sentinel Zero
Détection de toutes les portes dérobées possibles dans les applications web
"""

import asyncio
import aiohttp
import re
import hashlib
import hmac
import json
import logging
import yara
import requests
from typing import Dict, List, Any, Optional
from datetime import datetime
import os
import base64
import zlib
import sqlite3
import subprocess

logger = logging.getLogger(__name__)

class BackdoorDetector:
    """
    Détecteur de portes dérobées ultra-avancé
    - Détection de signatures connues
    - Analyse comportementale
    - Détection de patterns obfusqués
    - Analyse de code dynamique
    - Détection de communications cachées
    """
    
    def __init__(self):
        self.session = None
        self.signatures = self._load_signatures()
        self.yara_rules = self._load_yara_rules()
        self.backdoor_patterns = self._load_backdoor_patterns()
        
    def _load_signatures(self) -> Dict[str, List[str]]:
        """Charge les signatures de portes dérobées connues"""
        return {
            'php_backdoors': [
                'eval($_POST',
                'eval($_GET',
                'eval($_REQUEST',
                'assert($_POST',
                'assert($_GET',
                'system($_POST',
                'system($_GET',
                'shell_exec($_POST',
                'shell_exec($_GET',
                'passthru($_POST',
                'passthru($_GET',
                'exec($_POST',
                'exec($_GET',
                'preg_replace.*\/e',
                'create_function',
                'call_user_func',
                'call_user_func_array',
                'file_get_contents.*http',
                'file_put_contents',
                'fopen.*http',
                'include.*http',
                'require.*http',
                'file_include',
                'r57shell',
                'c99shell',
                'b374k',
                'weevely',
                'chopper',
                'kadimus'
            ],
            'javascript_backdoors': [
                'eval(',
                'Function(',
                'setTimeout.*eval',
                'setInterval.*eval',
                'document.write.*eval',
                'innerHTML.*eval',
                'outerHTML.*eval',
                'insertAdjacentHTML.*eval',
                'createElement.*eval',
                'appendChild.*eval',
                'replaceChild.*eval',
                'insertBefore.*eval',
                'removeChild.*eval',
                'cloneNode.*eval'
            ],
            'python_backdoors': [
                'eval(',
                'exec(',
                'compile(',
                'execfile(',
                '__import__',
                'getattr',
                'setattr',
                'delattr',
                'hasattr',
                'input(',
                'raw_input(',
                'os.system(',
                'os.popen(',
                'subprocess.call',
                'subprocess.Popen',
                'subprocess.check_output'
            ],
            'java_backdoors': [
                'Runtime.getRuntime().exec',
                'ProcessBuilder',
                'Class.forName',
                'ClassLoader',
                'defineClass',
                'loadClass',
                'invoke',
                'newInstance',
                'getMethod',
                'getDeclaredMethod',
                'setAccessible',
                'getField',
                'getDeclaredField',
                'set',
                'get'
            ],
            'asp_backdoors': [
                'Execute(',
                'Eval(',
                'Response.Write.*Execute',
                'Server.Execute',
                'Server.Transfer',
                'Include',
                'ExecuteGlobal',
                'GetObject',
                'CreateObject',
                'WScript.Shell',
                'Shell.Application'
            ]
        }
    
    def _load_yara_rules(self) -> Dict[str, str]:
        """Charge les règles Yara pour la détection"""
        return {
            'php_backdoor': '''
rule PHP_Backdoor {
    strings:
        $eval_post = "eval($_POST"
        $eval_get = "eval($_GET"
        $system_post = "system($_POST"
        $system_get = "system($_GET"
        $shell_exec = "shell_exec($_"
        $create_function = "create_function"
        $call_user_func = "call_user_func"
    condition:
        any of them
}
''',
            'javascript_backdoor': '''
rule JavaScript_Backdoor {
    strings:
        $eval = "eval("
        $function = "Function("
        $setTimeout_eval = "setTimeout.*eval"
        $innerHTML_eval = "innerHTML.*eval"
    condition:
        any of them
}
''',
            'encoded_backdoor': '''
rule Encoded_Backdoor {
    strings:
        $base64 = /[A-Za-z0-9+/]{50,}={0,2}/
        $hex = /\\x[0-9a-fA-F]{2}/
        $url_encode = /%[0-9a-fA-F]{2}/
    condition:
        any of them
}
'''
        }
    
    def _load_backdoor_patterns(self) -> List[Dict[str, Any]]:
        """Charge les patterns de portes dérobées avancés"""
        return [
            # Patterns PHP obfusqués
            {
                'name': 'PHP_Obfuscated_Backdoor',
                'pattern': r'(?:\\x[0-9a-fA-F]{2}){10,}',
                'description': 'PHP code obfusqué en hex'
            },
            {
                'name': 'PHP_Base64_Backdoor',
                'pattern': r'base64_decode\([\'"][A-Za-z0-9+/]{20,}[\'"]\)',
                'description': 'PHP code encodé en base64'
            },
            {
                'name': 'PHP_Gzip_Backdoor',
                'pattern': r'gzinflate\(base64_decode\([\'"][A-Za-z0-9+/]+[\'"]\)\)',
                'description': 'PHP code compressé et encodé'
            },
            # Patterns JavaScript obfusqués
            {
                'name': 'JS_Obfuscated_Backdoor',
                'pattern': r'(?:\\u[0-9a-fA-F]{4}){5,}',
                'description': 'JavaScript code obfusqué en Unicode'
            },
            {
                'name': 'JS_Eval_Chain',
                'pattern': r'eval\(.*eval\(.*eval\(',
                'description': 'Chaîne d\'eval imbriqués'
            },
            # Patterns de communication cachée
            {
                'name': 'Hidden_Communication',
                'pattern': r'(?:https?://[^\s<>"\']+\.(?:php|asp|jsp|aspx))',
                'description': 'Communication vers des fichiers suspects'
            },
            # Patterns de fichiers suspects
            {
                'name': 'Suspicious_Files',
                'pattern': r'(?:shell|backdoor|hack|admin|test|debug)\.(?:php|asp|jsp|aspx)',
                'description': 'Noms de fichiers suspects'
            }
        ]
    
    async def scan_file_content(self, content: str, file_type: str = 'unknown') -> List[Dict[str, Any]]:
        """Scan le contenu d'un fichier pour détecter des portes dérobées"""
        findings = []
        
        # Scan des signatures connues
        if file_type.lower() in self.signatures:
            for signature in self.signatures[file_type.lower()]:
                if re.search(signature, content, re.IGNORECASE):
                    findings.append({
                        'type': 'known_signature',
                        'signature': signature,
                        'severity': 'high',
                        'description': f'Signature de porte dérobée connue: {signature}'
                    })
        
        # Scan des patterns avancés
        for pattern in self.backdoor_patterns:
            matches = re.findall(pattern['pattern'], content, re.IGNORECASE)
            if matches:
                findings.append({
                    'type': 'pattern_detected',
                    'pattern': pattern['name'],
                    'matches': matches,
                    'severity': 'medium',
                    'description': pattern['description']
                })
        
        # Détection de code encodé
        encoded_findings = self._detect_encoded_content(content)
        findings.extend(encoded_findings)
        
        # Détection de comportements suspects
        behavior_findings = self._detect_suspicious_behaviors(content)
        findings.extend(behavior_findings)
        
        return findings
    
    def _detect_encoded_content(self, content: str) -> List[Dict[str, Any]]:
        """Détecte le contenu encodé suspect"""
        findings = []
        
        # Détection base64
        base64_pattern = r'[A-Za-z0-9+/]{50,}={0,2}'
        base64_matches = re.findall(base64_pattern, content)
        for match in base64_matches:
            try:
                decoded = base64.b64decode(match).decode('utf-8', errors='ignore')
                if any(keyword in decoded.lower() for keyword in ['eval', 'system', 'exec', 'shell', 'backdoor']):
                    findings.append({
                        'type': 'encoded_content',
                        'encoding': 'base64',
                        'content': match[:100],
                        'decoded_preview': decoded[:100],
                        'severity': 'high',
                        'description': 'Contenu encodé en base64 contenant des mots-clés suspects'
                    })
            except:
                pass
        
        # Détection hex
        hex_pattern = r'\\x[0-9a-fA-F]{2}'
        hex_matches = re.findall(hex_pattern, content)
        if len(hex_matches) > 10:
            findings.append({
                'type': 'encoded_content',
                'encoding': 'hex',
                'matches_count': len(hex_matches),
                'severity': 'medium',
                'description': f'Code obfusqué en hex ({len(hex_matches)} occurrences)'
            })
        
        return findings
    
    def _detect_suspicious_behaviors(self, content: str) -> List[Dict[str, Any]]:
        """Détecte les comportements suspects"""
        findings = []
        
        # Détection de fonctions dangereuses
        dangerous_functions = ['eval', 'exec', 'system', 'shell_exec', 'passthru', 'proc_open', 'popen']
        for func in dangerous_functions:
            if func in content.lower():
                findings.append({
                    'type': 'dangerous_function',
                    'function': func,
                    'severity': 'high',
                    'description': f'Fonction dangereuse détectée: {func}'
                })
        
        # Détection de chaînes d'exécution
        execution_chains = [
            r'eval\s*\(\s*.*eval\s*\(',
            r'system\s*\(\s*.*system\s*\(',
            r'exec\s*\(\s*.*exec\s*\('
        ]
        for pattern in execution_chains:
            if re.search(pattern, content, re.IGNORECASE):
                findings.append({
                    'type': 'execution_chain',
                    'pattern': pattern,
                    'severity': 'high',
                    'description': 'Chaîne d\'exécution suspecte détectée'
                })
        
        return findings
    
    async def scan_url(self, url: str) -> Dict[str, Any]:
        """Scan une URL pour détecter des portes dérobées"""
        try:
            async with self.session.get(url) as response:
                content = await response.text()
                headers = dict(response.headers)
                
                findings = await self.scan_file_content(content)
                
                # Analyse des headers suspects
                header_findings = self._analyze_headers(headers)
                findings.extend(header_findings)
                
                # Analyse des cookies suspects
                cookie_findings = self._analyze_cookies(headers.get('set-cookie', ''))
                findings.extend(cookie_findings)
                
                return {
                    'url': url,
                    'status_code': response.status,
                    'content_length': len(content),
                    'findings': findings,
                    'timestamp': datetime.now().isoformat()
                }
        except Exception as e:
            logger.error(f"Erreur scan URL {url}: {e}")
            return {'error': str(e)}
    
    def _analyze_headers(self, headers: Dict[str, str]) -> List[Dict[str, Any]]:
        """Analyse les headers pour détecter des anomalies"""
        findings = []
        
        suspicious_headers = [
            'x-backdoor',
            'x-shell',
            'x-debug',
            'x-admin',
            'x-hack'
        ]
        
        for header in suspicious_headers:
            if header in headers:
                findings.append({
                    'type': 'suspicious_header',
                    'header': header,
                    'value': headers[header],
                    'severity': 'medium',
                    'description': f'Header suspect détecté: {header}'
                })
        
        return findings
    
    def _analyze_cookies(self, cookies: str) -> List[Dict[str, Any]]:
        """Analyse les cookies pour détecter des anomalies"""
        findings = []
        
        suspicious_cookies = [
            'backdoor',
            'shell',
            'admin',
            'debug',
            'hack'
        ]
        
        for cookie in suspicious_cookies:
            if cookie in cookies.lower():
                findings.append({
                    'type': 'suspicious_cookie',
                    'cookie': cookie,
                    'severity': 'medium',
                    'description': f'Cookie suspect détecté: {cookie}'
                })
        
        return findings
    
    async def comprehensive_scan(self, target: str) -> Dict[str, Any]:
        """Scan complet d'une cible pour détecter des portes dérobées"""
        results = {
            'target': target,
            'timestamp': datetime.now().isoformat(),
            'findings': [],
            'summary': {
                'total_findings': 0,
                'high_severity': 0,
                'medium_severity': 0,
                'low_severity': 0
            }
        }
        
        # Scan de l'URL principale
        url_results = await self.scan_url(target)
        if 'error' not in url_results:
            results['findings'].extend(url_results['findings'])
        
        # Scan de fichiers communs suspects
        common_suspicious_files = [
            '/shell.php', '/backdoor.php', '/hack.php', '/admin.php',
            '/test.php', '/debug.php', '/cmd.php', '/c99.php',
            '/r57.php', '/weevely.php', '/chopper.php', '/kadimus.php'
        ]
        
        for file in common_suspicious_files:
            try:
                file_url = f"{target.rstrip('/')}{file}"
                file_results = await self.scan_url(file_url)
                if file_results.get('status_code') == 200:
                    results['findings'].extend(file_results['findings'])
            except:
                continue
        
        # Calcul du résumé
        for finding in results['findings']:
            results['summary']['total_findings'] += 1
            if finding['severity'] == 'high':
                results['summary']['high_severity'] += 1
            elif finding['severity'] == 'medium':
                results['summary']['medium_severity'] += 1
            else:
                results['summary']['low_severity'] += 1
        
        return results

async def main():
    """Test du module"""
    async with BackdoorDetector() as detector:
        target = "http://example.com"
        print(f"Scan de porte dérobée pour {target}...")
        results = await detector.comprehensive_scan(target)
        print(json.dumps(results, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
