#!/usr/bin/env python3
"""
Analyseur de Réseau pour Détection de Portes Dérobées - Sentinel Zero
Analyse du trafic réseau pour détecter les communications cachées
"""

import asyncio
import aiohttp
import socket
import struct
import time
import threading
import queue
import json
import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
import os
import subprocess
import signal
import psutil

logger = logging.getLogger(__name__)

class NetworkBackdoorAnalyzer:
    """
    Analyseur de réseau pour détecter les portes dérobées
    - Capture de paquets
    - Analyse de trafic
    - Détection de communications cachées
    - Analyse de protocoles
    """
    
    def __init__(self):
        self.capture_running = False
        self.packet_queue = queue.Queue()
        self.connections = {}
        self.suspicious_patterns = self._load_suspicious_patterns()
        
    def _load_suspicious_patterns(self) -> List[Dict[str, Any]]:
        """Charge les patterns suspects de communication"""
        return [
            # Patterns de communication cachée
            {
                'name': 'DNS_Tunneling',
                'pattern': r'dns.*[A-Za-z0-9]{20,}',
                'description': 'Tunneling DNS détecté'
            },
            {
                'name': 'HTTP_Backdoor',
                'pattern': r'(?:backdoor|shell|cmd|exec).*\.(?:php|asp|jsp)',
                'description': 'Communication vers backdoor HTTP'
            },
            {
                'name': 'Encoded_Traffic',
                'pattern': r'[A-Za-z0-9+/]{50,}={0,2}',
                'description': 'Trafic encodé en base64'
            },
            {
                'name': 'Suspicious_Ports',
                'ports': [4444, 8080, 9999, 12345, 54321],
                'description': 'Ports suspects utilisés'
            }
        ]
    
    async def start_packet_capture(self, interface: str = 'any', duration: int = 300):
        """Démarre la capture de paquets"""
        self.capture_running = True
        
        try:
            # Utilisation de tcpdump pour la capture
            cmd = f"tcpdump -i {interface} -w capture.pcap -G {duration}"
            process = subprocess.Popen(cmd.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            
            logger.info(f"Capture démarrée sur {interface} pour {duration} secondes")
            
            # Attendre la fin de la capture
            await asyncio.sleep(duration)
            process.terminate()
            
            # Analyser les paquets capturés
            await self.analyze_captured_packets('capture.pcap')
            
        except Exception as e:
            logger.error(f"Erreur capture paquets: {e}")
    
    async def analyze_captured_packets(self, pcap_file: str):
        """Analyse les paquets capturés"""
        try:
            # Utilisation de tshark pour analyser le pcap
            cmd = f"tshark -r {pcap_file} -T json"
            process = subprocess.Popen(cmd.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            output, error = process.communicate()
            
            if output:
                packets = json.loads(output)
                await self.analyze_packets(packets)
            
        except Exception as e:
            logger.error(f"Erreur analyse paquets: {e}")
    
    async def analyze_packets(self, packets: List[Dict[str, Any]]):
        """Analyse les paquets pour détecter des anomalies"""
        findings = []
        
        for packet in packets:
            packet_analysis = await self.analyze_single_packet(packet)
            if packet_analysis['suspicious']:
                findings.append(packet_analysis)
        
        return findings
    
    async def analyze_single_packet(self, packet: Dict[str, Any]) -> Dict[str, Any]:
        """Analyse un paquet individuel"""
        analysis = {
            'packet_id': packet.get('_index', {}).get('number', 'unknown'),
            'suspicious': False,
            'findings': [],
            'risk_score': 0.0
        }
        
        # Analyse de la couche transport
        if 'tcp' in packet.get('_source', {}).get('layers', {}):
            tcp_layer = packet['_source']['layers']['tcp']
            analysis.update(await self.analyze_tcp_layer(tcp_layer))
        
        # Analyse de la couche application
        if 'http' in packet.get('_source', {}).get('layers', {}):
            http_layer = packet['_source']['layers']['http']
            analysis.update(await self.analyze_http_layer(http_layer))
        
        # Analyse DNS
        if 'dns' in packet.get('_source', {}).get('layers', {}):
            dns_layer = packet['_source']['layers']['dns']
            analysis.update(await self.analyze_dns_layer(dns_layer))
        
        return analysis
    
    async def analyze_tcp_layer(self, tcp_layer: Dict[str, Any]) -> Dict[str, Any]:
        """Analyse la couche TCP"""
        findings = []
        risk_score = 0.0
        
        # Vérification des ports suspects
        src_port = int(tcp_layer.get('tcp.srcport', 0))
        dst_port = int(tcp_layer.get('tcp.dstport', 0))
        
        suspicious_ports = [4444, 8080, 9999, 12345, 54321]
        
        if src_port in suspicious_ports or dst_port in suspicious_ports:
            findings.append({
                'type': 'suspicious_port',
                'port': src_port if src_port in suspicious_ports else dst_port,
                'severity': 'medium',
                'description': f'Port suspect utilisé: {src_port if src_port in suspicious_ports else dst_port}'
            })
            risk_score += 0.4
        
        return {'findings': findings, 'risk_score': risk_score}
    
    async def analyze_http_layer(self, http_layer: Dict[str, Any]) -> Dict[str, Any]:
        """Analyse la couche HTTP"""
        findings = []
        risk_score = 0.0
        
        # Vérification des headers suspects
        if 'http.request.full_uri' in http_layer:
            uri = http_layer['http.request.full_uri']
            
            # Patterns suspects dans l'URI
            suspicious_patterns = [
                r'backdoor',
                r'shell',
                r'cmd',
                r'exec',
                r'admin',
                r'hack'
            ]
            
            for pattern in suspicious_patterns:
                if re.search(pattern, uri, re.IGNORECASE):
                    findings.append({
                        'type': 'suspicious_uri',
                        'pattern': pattern,
                        'uri': uri,
                        'severity': 'high',
                        'description': f'URI suspect détectée: {pattern}'
                    })
                    risk_score += 0.6
        
        return {'findings': findings, 'risk_score': risk_score}
    
    async def analyze_dns_layer(self, dns_layer: Dict[str, Any]) -> Dict[str, Any]:
        """Analyse la couche DNS"""
        findings = []
        risk_score = 0.0
        
        # Vérification du tunneling DNS
        if 'dns.qry.name' in dns_layer:
            query_name = dns_layer['dns.qry.name']
            
            # Détection de tunneling DNS
            if len(query_name) > 50:
                findings.append({
                    'type': 'dns_tunneling',
                    'query': query_name,
                    'severity': 'high',
                    'description': 'Tunneling DNS suspect détecté'
                })
                risk_score += 0.8
        
        return {'findings': findings, 'risk_score': risk_score}
    
    async def monitor_connections(self, target_host: str = None):
        """Surveille les connexions actives"""
        while self.capture_running:
            try:
                connections = psutil.net_connections()
                
                for conn in connections:
                    if target_host is None or target_host in str(conn.raddr):
                        connection_analysis = await self.analyze_connection(conn)
                        if connection_analysis['suspicious']:
                            logger.warning(f"Connexion suspecte détectée: {connection_analysis}")
                
                await asyncio.sleep(1)
                
            except Exception as e:
                logger.error(f"Erreur surveillance connexions: {e}")
    
    async def analyze_connection(self, connection) -> Dict[str, Any]:
        """Analyse une connexion"""
        analysis = {
            'local_addr': f"{connection.laddr.ip}:{connection.laddr.port}",
            'remote_addr': f"{connection.raddr.ip}:{connection.raddr.port}" if connection.raddr else None,
            'status': connection.status,
            'pid': connection.pid,
            'suspicious': False,
            'findings': [],
            'risk_score': 0.0
        }
        
        # Vérification des ports suspects
        suspicious_ports = [4444, 8080, 9999, 12345, 54321]
        
        if connection.raddr and connection.raddr.port in suspicious_ports:
            analysis['findings'].append({
                'type': 'suspicious_remote_port',
                'port': connection.raddr.port,
                'severity': 'medium',
                'description': f'Port distant suspect: {connection.raddr.port}'
            })
            analysis['risk_score'] += 0.4
            analysis['suspicious'] = True
        
        # Vérification des processus suspects
        try:
            if connection.pid:
                process = psutil.Process(connection.pid)
                if self._is_suspicious_process(process):
                    analysis['findings'].append({
                        'type': 'suspicious_process',
                        'process_name': process.name(),
                        'process_cmdline': ' '.join(process.cmdline()),
                        'severity': 'high',
                        'description': 'Processus suspect détecté'
                    })
                    analysis['risk_score'] += 0.6
                    analysis['suspicious'] = True
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass
        
        return analysis
    
    def _is_suspicious_process(self, process) -> bool:
        """Vérifie si un processus est suspect"""
        suspicious_processes = [
            'nc', 'netcat', 'telnet', 'ssh', 'scp',
            'wget', 'curl', 'ftp', 'tftp',
            'python', 'perl', 'ruby', 'php'
        ]
        
        try:
            process_name = process.name().lower()
            return any(sp in process_name for sp in suspicious_processes)
        except:
            return False
    
    async def comprehensive_network_analysis(self, target: str, duration: int = 300):
        """Analyse complète du réseau"""
        results = {
            'target': target,
            'timestamp': datetime.now().isoformat(),
            'duration': duration,
            'findings': [],
            'summary': {
                'total_packets': 0,
                'suspicious_connections': 0,
                'dns_tunneling': 0,
                'suspicious_ports': 0,
                'overall_risk': 'safe'
            }
        }
        
        # Démarrer la capture
        capture_task = asyncio.create_task(self.start_packet_capture('any', duration))
        
        # Surveiller les connexions
        monitor_task = asyncio.create_task(self.monitor_connections(target))
        
        # Attendre la fin de la capture
        await capture_task
        
        # Arrêter la surveillance
        self.capture_running = False
        await monitor_task
        
        return results

async def main():
    """Test du module"""
    analyzer = NetworkBackdoorAnalyzer()
    target = "192.168.1.1"
    print(f"Analyse réseau pour {target}...")
    results = await analyzer.comprehensive_network_analysis(target, 60)
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
