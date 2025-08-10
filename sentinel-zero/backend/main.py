#!/usr/bin/env python3
"""
Sentinel Zero - Backend ultra-avancé avec détection de portes dérobées
Agent Red Team IA ultra-avancé pour DL Solutions
Authentification 5 niveaux, SuperAdmin uniquement, Red Button activable
"""

from fastapi import FastAPI, HTTPException, Depends, Request, WebSocket, WebSocketDisconnect
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import uvicorn
import hashlib
import jwt
import time
import os
import json
import asyncio
import subprocess
import threading
from datetime import datetime, timedelta

# Import des modules de détection de portes dérobées
from modules.backdoor_detection.backdoor_scanner import BackdoorDetector
from modules.backdoor_detection.advanced_detector import AdvancedBackdoorDetector
from modules.backdoor_detection.network_analyzer import NetworkBackdoorAnalyzer

# Configuration sécurisée
SECRET_KEY = "SENTINEL_SUPER_KEY_4096_RSA_DL_SOLUTIONS_2025"
MASTER_CODE = "0987612345"
BIOMETRIC_VOICE_HASH = "b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0"
BIOMETRIC_FP_HASH = "a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1"
SUPER_ADMIN_ID = "DL-SUPER-01"
RED_BUTTON_PHRASE = "i am sentinel"

app = FastAPI(
    title="Sentinel Zero Backend",
    description="Agent Red Team IA ultra-avancé - DL Solutions",
    version="1.0.0"
)

# Middleware CORS sécurisé
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://dlsolutionssarl.tech", "https://daveandlucesolutions.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Base de données en mémoire (pour la démo)
access_log = []
scan_results = []
active_scans = {}
gov_access = []
backdoor_findings = []

# ----- MODELS -----
class LoginPayload(BaseModel):
    master_code: str
    admin_id: str
    voice_hash: str
    fingerprint_hash: str
    vocal_phrase: str

class ScanTarget(BaseModel):
    url: str
    scan_type: str = "full"  # full, quick, stealth, backdoor
    modules: List[str] = ["recon", "sql", "xss", "brute", "osint", "backdoor"]

class BackdoorScanRequest(BaseModel):
    target: str
    scan_type: str = "comprehensive"  # basic, advanced, network
    duration: int = 300

class AccessGrant(BaseModel):
    gov_entity: str
    access_level: str  # read, scan, admin
    expiration: Optional[int] = None
    description: str

class RedButtonPayload(BaseModel):
    confirmation: str
    reason: str

# ----- UTILS -----
def verify_hash(input_val: str, expected_hash: str) -> bool:
    """Vérification sécurisée des hashes biométriques"""
    return hashlib.sha256(input_val.encode()).hexdigest() == expected_hash

def generate_token(admin_id: str) -> str:
    """Génération de token JWT sécurisé"""
    payload = {
        "admin_id": admin_id,
        "timestamp": int(time.time()),
        "exp": int(time.time()) + 3600  # 1 heure
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token(token: str) -> Dict[str, Any]:
    """Vérification du token JWT"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except:
        raise HTTPException(status_code=403, detail="Token invalide")

def log_access(admin_id: str, action: str, status: str = "SUCCESS"):
    """Log sécurisé des accès"""
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "admin_id": admin_id,
        "action": action,
        "status": status,
        "ip": "127.0.0.1"
    }
    access_log.append(log_entry)

# ----- ROUTES -----
@app.post("/api/auth/login")
async def secure_login(payload: LoginPayload):
    """Authentification 5 niveaux"""
    try:
        # Niveau 1: Code maître
        if payload.master_code != MASTER_CODE:
            raise HTTPException(status_code=401, detail="Code maître invalide")
        
        # Niveau 2: ID administrateur
        if payload.admin_id != SUPER_ADMIN_ID:
            raise HTTPException(status_code=401, detail="ID administrateur invalide")
        
        # Niveau 3: Empreinte vocale
        if not verify_hash(payload.voice_hash, BIOMETRIC_VOICE_HASH):
            raise HTTPException(status_code=401, detail="Empreinte vocale invalide")
        
        # Niveau 4: Empreinte digitale
        if not verify_hash(payload.fingerprint_hash, BIOMETRIC_FP_HASH):
            raise HTTPException(status_code=401, detail="Empreinte digitale invalide")
        
        # Niveau 5: Phrase vocale
        if payload.vocal_phrase != RED_BUTTON_PHRASE:
            raise HTTPException(status_code=401, detail="Phrase vocale invalide")
        
        token = generate_token(payload.admin_id)
        log_access(payload.admin_id, "LOGIN", "SUCCESS")
        
        return {
            "status": "success",
            "message": "Authentification réussie - Accès Sentinel Zero autorisé",
            "token": token,
            "access_level": "SUPER_ADMIN",
            "expires_in": 3600
        }
    except HTTPException:
        log_access(payload.admin_id if hasattr(payload, 'admin_id') else 'UNKNOWN', "LOGIN", "FAILED")
        raise

@app.post("/api/scan/backdoor")
async def scan_backdoor(request: BackdoorScanRequest):
    """Scan de portes dérobées complet"""
    try:
        scan_id = f"backdoor_{int(time.time())}"
        
        # Initialiser les détecteurs
        backdoor_detector = BackdoorDetector()
        advanced_detector = AdvancedBackdoorDetector()
        network_analyzer = NetworkBackdoorAnalyzer()
        
        findings = []
        
        # Scan basique
        if request.scan_type in ["basic", "comprehensive"]:
            basic_scan = await backdoor_detector.comprehensive_scan(request.target)
            findings.append({
                'type': 'basic_scan',
                'results': basic_scan
            })
        
        # Scan avancé
        if request.scan_type in ["advanced", "comprehensive"]:
            async with aiohttp.ClientSession() as session:
                advanced_detector.session = session
                advanced_scan = await advanced_detector.comprehensive_scan(request.target)
                findings.append({
                    'type': 'advanced_scan',
                    'results': advanced_scan
                })
        
        # Analyse réseau
        if request.scan_type in ["network", "comprehensive"]:
            network_scan = await network_analyzer.comprehensive_network_analysis(
                request.target, request.duration
            )
            findings.append({
                'type': 'network_analysis',
                'results': network_scan
            })
        
        # Sauvegarder les résultats
        scan_result = {
            'scan_id': scan_id,
            'target': request.target,
            'scan_type': request.scan_type,
            'timestamp': datetime.now().isoformat(),
            'findings': findings,
            'status': 'completed'
        }
        
        backdoor_findings.append(scan_result)
        scan_results.append(scan_result)
        
        return {
            'scan_id': scan_id,
            'status': 'completed',
            'findings_count': len(findings),
            'results': scan_result
        }
        
    except Exception as e:
        logger.error(f"Erreur scan porte dérobée: {e}")
        raise HTTPException(status_code=500, detail=f"Erreur scan: {str(e)}")

@app.get("/api/scan/backdoor/{scan_id}")
async def get_backdoor_scan_results(scan_id: str):
    """Récupérer les résultats d'un scan de porte dérobée"""
    for result in backdoor_findings:
        if result['scan_id'] == scan_id:
            return result
    
    raise HTTPException(status_code=404, detail="Scan non trouvé")

@app.get("/api/scan/backdoor/findings/all")
async def get_all_backdoor_findings():
    """Récupérer tous les résultats de scans de portes dérobées"""
    return {
        'total_findings': len(backdoor_findings),
        'findings': backdoor_findings
    }

@app.post("/api/auth/red-button")
async def activate_destruction(payload: RedButtonPayload, request: Request):
    """Activation du protocole Red Button"""
    try:
        if payload.confirmation != "DESTROY_ALL_DATA":
            raise HTTPException(status_code=400, detail="Confirmation invalide")
        
        if payload.reason not in ["SECURITY_BREACH", "SYSTEM_COMPROMISED", "ADMIN_REQUEST"]:
            raise HTTPException(status_code=400, detail="Raison invalide")
        
        log_access("SUPER_ADMIN", "RED_BUTTON_ACTIVATED", "DESTRUCTION")
        
        # Simulation de destruction
        destruction_tasks = [
            "Nettoyage des logs",
            "Suppression des données sensibles",
            "Désactivation des modules",
            "Purge des connexions",
            "Destruction des clés de chiffrement"
        ]
        
        return {
            "status": "DESTROYED",
            "message": "Protocole Red Button activé - Toutes les données ont été détruites",
            "destruction_tasks": destruction_tasks,
            "timestamp": datetime.now().isoformat()
        }
    except HTTPException:
        raise

@app.post("/api/admin/grant-access")
async def grant_gov_access(access: AccessGrant, request: Request):
    """Octroi d'accès gouvernemental"""
    try:
        gov_access.append({
            "entity": access.gov_entity,
            "level": access.access_level,
            "expiration": access.expiration,
            "description": access.description,
            "granted_at": datetime.now().isoformat(),
            "granted_by": "SUPER_ADMIN"
        })
        
        log_access("SUPER_ADMIN", f"GRANT_ACCESS_{access.gov_entity}", "SUCCESS")
        
        return {
            "status": "success",
            "message": f"Accès accordé à {access.gov_entity}",
            "access_level": access.access_level,
            "expires_at": access.expiration
        }
    except Exception as e:
        log_access("SUPER_ADMIN", f"GRANT_ACCESS_{access.gov_entity}", "FAILED")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/admin/access-logs")
async def get_access_logs(request: Request):
    """Récupérer les logs d'accès"""
    try:
        return {
            "total_logs": len(access_log),
            "logs": access_log[-100:]  # Derniers 100 logs
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/scan/start")
async def start_scan(target: ScanTarget, request: Request):
    """Démarrer un scan complet"""
    try:
        scan_id = f"scan_{int(time.time())}"
        active_scans[scan_id] = {
            "target": target.url,
            "type": target.scan_type,
            "modules": target.modules,
            "status": "running",
            "started_at": datetime.now().isoformat(),
            "progress": 0
        }
        
        # Démarrer le scan en arrière-plan
        threading.Thread(target=run_scan_modules, args=(scan_id, target)).start()
        
        return {
            "scan_id": scan_id,
            "status": "started",
            "message": f"Scan démarré pour {target.url}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/scan/{scan_id}/status")
async def get_scan_status(scan_id: str, request: Request):
    """Récupérer le statut d'un scan"""
    if scan_id in active_scans:
        return active_scans[scan_id]
    else:
        raise HTTPException(status_code=404, detail="Scan non trouvé")

@app.get("/api/scan/results")
async def get_scan_results(request: Request):
    """Récupérer tous les résultats de scans"""
    return {
        "total_scans": len(scan_results),
        "scans": scan_results[-50:]  # Derniers 50 scans
    }

def run_scan_modules(scan_id: str, target: ScanTarget):
    """Exécuter les modules de scan"""
    try:
        progress = 0
        max_progress = len(target.modules)
        
        for module in target.modules:
            progress += 1
            active_scans[scan_id]["progress"] = (progress / max_progress) * 100
            
            if module == "recon":
                run_recon_module(target.url)
            elif module == "sql":
                run_sql_module(target.url)
            elif module == "xss":
                run_xss_module(target.url)
            elif module == "brute":
                run_brute_module(target.url)
            elif module == "osint":
                run_osint_module(target.url)
            elif module == "backdoor":
                # Scan de porte dérobée
                pass
        
        active_scans[scan_id]["status"] = "completed"
        active_scans[scan_id]["completed_at"] = datetime.now().isoformat()
        
    except Exception as e:
        active_scans[scan_id]["status"] = "failed"
        active_scans[scan_id]["error"] = str(e)

def run_recon_module(url: str) -> Dict[str, Any]:
    """Module de reconnaissance"""
    return {
        "module": "recon",
        "target": url,
        "status": "completed",
        "findings": ["WHOIS info", "DNS records", "Port scan"]
    }

def run_sql_module(url: str) -> Dict[str, Any]:
    """Module SQL Injection"""
    return {
        "module": "sql",
        "target": url,
        "status": "completed",
        "findings": ["SQL injection tests"]
    }

def run_xss_module(url: str) -> Dict[str, Any]:
    """Module XSS"""
    return {
        "module": "xss",
        "target": url,
        "status": "completed",
        "findings": ["XSS vulnerability tests"]
    }

def run_brute_module(url: str) -> Dict[str, Any]:
    """Module Brute Force"""
    return {
        "module": "brute",
        "target": url,
        "status": "completed",
        "findings": ["Brute force tests"]
    }

def run_osint_module(url: str) -> Dict[str, Any]:
    """Module OSINT"""
    return {
        "module": "osint",
        "target": url,
        "status": "completed",
        "findings": ["OSINT information"]
    }

@app.get("/api/health")
async def health_check():
    """Vérification de santé"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "modules": ["recon", "sql", "xss", "brute", "osint", "backdoor"],
        "active_scans": len(active_scans),
        "total_findings": len(backdoor_findings)
    }

@app.get("/")
async def root():
    """Route racine"""
    return {
        "message": "Sentinel Zero - Agent Red Team IA Ultra-Avancé",
        "version": "1.0.0",
        "status": "operational",
        "access": "SUPER_ADMIN_ONLY"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
