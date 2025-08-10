#!/usr/bin/env python3
"""
Détecteur Avancé de Portes Dérobées - Sentinel Zero
Techniques avancées de détection et d'analyse
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
import base64
import zlib
import gzip
import bz2
import lzma
from typing import Dict, List, Any, Optional
from datetime import datetime
import os
import sqlite3
import subprocess
import threading
import time

logger = logging.getLogger(__name__)

class AdvancedBackdoorDetector:
    """
    Détecteur ultra-avancé de portes dérobées
    - Analyse statique et dynamique
    - Détection de patterns obfusqués
    - Analyse de comportement
    - Détection de communications cachées
    - Analyse de trafic réseau
    """
    
    def __init__(self):
        self.session = None
        self.yara_rules = self._compile_yara_rules()
        self.heuristics = self._load_heuristics()
        self.behavior_patterns = self._load_behavior_patterns()
        
    def _compile_yara_rules(self) -> Dict[str, yara.Rules]:
        """Compile les règles Yara"""
        rules = {}
        try:
            rules['php'] = yara.compile(filepath='yara_rules.yar')
            logger.info("Règles Yara compilées avec succès")
        except Exception as e:
            logger.error(f"Erreur compilation règles Yara: {e}")
        return rules
    
    def _load_heuristics(self) -> List[Dict[str, Any]]:
        """Charge les heuristiques de détection"""
        return [
            # Heuristiques pour PHP
            {
                'name': 'PHP_Dynamic_Code_Execution',
                'pattern': r'(?:eval|exec|system|shell_exec|passthru|proc_open|popen)\s*\([^)]*\$',
                'weight': 0.8
            },
            {
                'name': 'PHP_File_Operations',
                'pattern': r'(?:file_get_contents|file_put_contents|fopen|fwrite|fread)\s*\([^)]*\$',
                'weight': 0.6
            },
            {
                'name': 'PHP_Include_Remote',
                'pattern': r'(?:include|require|include_once|require_once)\s*\([^)]*http',
                'weight': 0.7
            },
            # Heuristiques pour JavaScript
            {
                'name': 'JS_Dynamic_Execution',
                'pattern': r'(?:eval|Function|setTimeout|setInterval)\s*\([^)]*\$',
                'weight': 0.7
            },
            {
                'name': 'JS_DOM_Manipulation',
                'pattern': r'(?:innerHTML|outerHTML|insertAdjacentHTML)\s*=.*eval',
                'weight': 0.6
            },
            # Heuristiques pour ASP
            {
                'name': 'ASP_Code_Execution',
                'pattern': r'(?:Execute|Eval)\s*\([^)]*\$',
                'weight': 0.8
            }
        ]
    
    def _load_behavior_patterns(self) -> List[Dict[str, Any]]:
        """Charge les patterns comportementaux"""
        return [
            {
                'name': 'Network_Communication',
                'patterns': [
                    r'https?://[^\s<>"\']+',
                    r'ftp://[^\s<>"\']+',
                    r'dns://[^\s<>"\']+'
                ],
                'weight': 0.7
            },
            {
                'name': 'File_System_Access',
                'patterns': [
                    r'\.php$',
                    r'\.asp$',
                    r'\.jsp$',
                    r'\.aspx$'
                ],
                'weight': 0.5
            },
            {
                'name': 'System_Commands',
                'patterns': [
                    r'cmd\.exe',
                    r'/bin/bash',
                    r'/bin/sh',
                    r'powershell',
                    r'wscript',
                    r'cscript'
                ],
                'weight': 0.8
            }
        ]
    
    async def deep_scan_content(self, content: str, file_type: str = 'unknown') -> Dict[str, Any]:
        """Scan profond du contenu"""
        results = {
            'file_type': file_type,
            'findings': [],
            'score': 0.0,
            'risk_level': 'low'
        }
        
        # Scan avec Yara
        yara_findings = self._yara_scan(content)
        results['findings'].extend(yara_findings)
        
        # Scan heuristique
        heuristic_findings = self._heuristic_scan(content)
        results['findings'].extend(heuristic_findings)
        
        # Analyse comportementale
        behavior_findings = self._behavior_analysis(content)
        results['findings'].extend(behavior_findings)
        
        # Détection de code encodé
        encoded_findings = self._detect_advanced_encoding(content)
        results['findings'].extend(encoded_findings)
        
        # Calcul du score de risque
        results['score'] = self._calculate_risk_score(results['findings'])
        results['risk_level'] = self._get_risk_level(results['score'])
        
        return results
    
    def _yara_scan(self, content: str) -> List[Dict[str, Any]]:
        """Scan avec les règles Yara"""
        findings = []
        
        for rule_name, rules in self.yara_rules.items():
            try:
                matches = rules.match(data=content.encode())
                for match in matches:
                    findings.append({
                        'type': 'yara_match',
                        'rule': match.rule,
                        'strings': list(match.strings),
                        'severity': 'high' if 'backdoor' in match.rule.lower() else 'medium',
                        'description': f'Match règle Yara: {match.rule}'
                    })
            except Exception as e:
                logger.error(f"Erreur scan Yara {rule_name}: {e}")
        
        return findings
    
    def _heuristic_scan(self, content: str) -> List[Dict[str, Any]]:
        """Scan heuristique"""
        findings = []
        
        for heuristic in self.heuristics:
            matches = re.findall(heuristic['pattern'], content, re.IGNORECASE)
            if matches:
                findings.append({
                    'type': 'heuristic_match',
                    'name': heuristic['name'],
                    'matches': matches,
                    'weight': heuristic['weight'],
                    'severity': 'medium',
                    'description': f'Heuristique détectée: {heuristic["name"]}'
                })
        
        return findings
    
    def _behavior_analysis(self, content: str) -> List[Dict[str, Any]]:
        """Analyse comportementale"""
        findings = []
        
        for pattern in self.behavior_patterns:
            pattern_matches = []
            for p in pattern['patterns']:
                matches = re.findall(p, content, re.IGNORECASE)
                pattern_matches.extend(matches)
            
            if pattern_matches:
                findings.append({
                    'type': 'behavior_pattern',
                    'name': pattern['name'],
                    'matches': pattern_matches,
                    'weight': pattern['weight'],
                    'severity': 'medium',
                    'description': f'Pattern comportemental: {pattern["name"]}'
                })
        
        return findings
    
    def _detect_advanced_encoding(self, content: str) -> List[Dict[str, Any]]:
        """Détection de codage avancé"""
        findings = []
        
        # Détection base64
        base64_patterns = [
            r'[A-Za-z0-9+/]{50,}={0,2}',
            r'base64_decode\s*\([\'"][A-Za-z0-9+/]+[\'"]\)'
        ]
        
        for pattern in base64_patterns:
            matches = re.findall(pattern, content)
            for match in matches:
                try:
                    if len(match) > 50:
                        decoded = base64.b64decode(match).decode('utf-8', errors='ignore')
                        if self._is_suspicious_content(decoded):
                            findings.append({
                                'type': 'encoded_content',
                                'encoding': 'base64',
                                'content_preview': match[:100],
                                'decoded_preview': decoded[:100],
                                'severity': 'high',
                                'description': 'Contenu encodé en base64 suspect'
                            })
                except:
                    pass
        
        # Détection gzip
        gzip_pattern = r'gzinflate\s*\(base64_decode\s*\([\'"][A-Za-z0-9+/]+[\'"]\)\)'
        gzip_matches = re.findall(gzip_pattern, content)
        if gzip_matches:
            findings.append({
                'type': 'encoded_content',
                'encoding': 'gzip',
                'matches_count': len(gzip_matches),
                'severity': 'high',
                'description': 'Contenu compressé et encodé détecté'
            })
        
        return findings
    
    def _is_suspicious_content(self, content: str) -> bool:
        """Vérifie si le contenu est suspect"""
        suspicious_keywords = [
            'eval', 'exec', 'system', 'shell', 'backdoor', 'hack',
            'admin', 'root', 'cmd', 'command', 'execute'
        ]
        
        content_lower = content.lower()
        return any(keyword in content_lower for keyword in suspicious_keywords)
    
    def _calculate_risk_score(self, findings: List[Dict[str, Any]]) -> float:
        """Calcule le score de risque"""
        score = 0.0
        
        for finding in findings:
            if finding['severity'] == 'high':
                score += 0.8
            elif finding['severity'] == 'medium':
                score += 0.5
            else:
                score += 0.2
            
            # Bonus pour les types spéciaux
            if finding['type'] == 'yara_match':
                score += 0.3
            elif finding['type'] == 'encoded_content':
                score += 0.4
        
        return min(score, 1.0)
    
    def _get_risk_level(self, score: float) -> str:
        """Détermine le niveau de risque"""
        if score >= 0.8:
            return 'critical'
        elif score >= 0.6:
            return 'high'
        elif score >= 0.4:
            return 'medium'
        elif score >= 0.2:
            return 'low'
        else:
            return 'safe'
    
    async def comprehensive_scan(self, target: str) -> Dict[str, Any]:
        """Scan complet d'une cible"""
        results = {
            'target': target,
            'timestamp': datetime.now().isoformat(),
            'scans': [],
            'summary': {
                'total_findings': 0,
                'critical_findings': 0,
                'high_findings': 0,
                'medium_findings': 0,
                'low_findings': 0,
                'overall_risk': 'safe'
            }
        }
        
        try:
            # Scan de l'URL principale
            async with self.session.get(target) as response:
                content = await response.text()
                headers = dict(response.headers)
                
                # Scan du contenu
                content_scan = await self.deep_scan_content(content, 'html')
                results['scans'].append({
                    'type': 'main_content',
                    'url': target,
                    'results': content_scan
                })
                
                # Scan des headers
                header_scan = self._scan_headers(headers)
                results['scans'].append({
                    'type': 'headers',
                    'results': header_scan
                })
                
        except Exception as e:
            logger.error(f"Erreur scan complet {target}: {e}")
            results['error'] = str(e)
        
        # Calcul du résumé
        for scan in results['scans']:
            if 'results' in scan:
                results['summary']['total_findings'] += len(scan['results'].get('findings', []))
                for finding in scan['results'].get('findings', []):
                    if finding['severity'] == 'critical':
                        results['summary']['critical_findings'] += 1
                    elif finding['severity'] == 'high':
                        results['summary']['high_findings'] += 1
                    elif finding['severity'] == 'medium':
                        results['summary']['medium_findings'] += 1
                    else:
                        results['summary']['low_findings'] += 1
        
        # Détermination du risque global
        total_critical = results['summary']['critical_findings']
        total_high = results['summary']['high_findings']
        
        if total_critical > 0:
            results['summary']['overall_risk'] = 'critical'
        elif total_high > 2:
            results['summary']['overall_risk'] = 'high'
        elif results['summary']['total_findings'] > 5:
            results['summary']['overall_risk'] = 'medium'
        elif results['summary']['total_findings'] > 0:
            results['summary']['overall_risk'] = 'low'
        
        return results
    
    def _scan_headers(self, headers: Dict[str, str]) -> Dict[str, Any]:
        """Scan des headers"""
        findings = []
        suspicious_headers = [
            'x-backdoor', 'x-shell', 'x-debug', 'x-admin',
            'x-hack', 'x-exec', 'x-cmd', 'x-system'
        ]
        
        for header in suspicious_headers:
            if header in headers:
                findings.append({
                    'type': 'suspicious_header',
                    'header': header,
                    'value': headers[header],
                    'severity': 'medium',
                    'description': f'Header suspect: {header}'
                })
        
        return {'findings': findings, 'score': len(findings) * 0.3}

async def main():
    """Test du module"""
    async with AdvancedBackdoorDetector() as detector:
        target = "http://example.com"
        print(f"Scan avancé de porte dérobée pour {target}...")
        results = await detector.comprehensive_scan(target)
        print(json.dumps(results, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
