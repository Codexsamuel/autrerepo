#!/usr/bin/env python3
"""
Security Controller - Module de sécurité et contrôle
NovaAgent AI Commercial & Communication Digitale
"""

import asyncio
import json
import logging
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import hashlib
import hmac
import os
import jwt

logger = logging.getLogger(__name__)

class SecurityController:
    """
    Contrôleur de sécurité pour l'Agent IA Commercial
    - Contrôle d'accès multi-niveaux (Admin, IA, Viewer)
    - Logs d'activité
    - Limites IA (propose mais attend validation)
    - Mode "Full Autonomy" avec autorisation SuperAdmin
    """
    
    def __init__(self):
        self.api_key = os.getenv("NOVA_IA_API_KEY", "nova_ia_commercial_2025")
        self.secret_key = os.getenv("NOVA_IA_SECRET_KEY", "nova_ia_secret_2025")
        self.model_version = "NovaAgent-Security-v2.0"
        
        # Niveaux d'accès
        self.access_levels = {
            "super_admin": {
                "permissions": ["full_access", "ai_autonomy", "system_config", "user_management"],
                "ai_limits": "unlimited",
                "validation_required": False
            },
            "admin": {
                "permissions": ["full_access", "ai_autonomy", "system_config"],
                "ai_limits": "high",
                "validation_required": False
            },
            "ai_agent": {
                "permissions": ["content_creation", "social_management", "analytics"],
                "ai_limits": "medium",
                "validation_required": True
            },
            "viewer": {
                "permissions": ["read_only", "reports"],
                "ai_limits": "none",
                "validation_required": True
            }
        }
        
        # Logs d'activité
        self.activity_logs = []
        
    async def authenticate_user(self, username: str, password: str) -> Dict[str, Any]:
        """
        Authentifie un utilisateur
        
        Args:
            username: Nom d'utilisateur
            password: Mot de passe
            
        Returns:
            Informations d'authentification
        """
        try:
            # Simulation d'authentification
            if username in ["admin", "ai_agent", "viewer"]:
                # Vérification du mot de passe (simulation)
                if password == f"{username}_password_2025":
                    access_level = username
                    permissions = self.access_levels[access_level]["permissions"]
                    
                    # Génération du token JWT
                    token = await self._generate_jwt_token(username, access_level)
                    
                    return {
                        "authenticated": True,
                        "username": username,
                        "access_level": access_level,
                        "permissions": permissions,
                        "token": token,
                        "ai_limits": self.access_levels[access_level]["ai_limits"],
                        "validation_required": self.access_levels[access_level]["validation_required"]
                    }
            
            return {
                "authenticated": False,
                "error": "Identifiants invalides"
            }
            
        except Exception as e:
            logger.error(f"Erreur lors de l'authentification: {e}")
            return {
                "authenticated": False,
                "error": str(e)
            }
    
    async def check_permissions(self, user_token: str, required_permission: str) -> Dict[str, Any]:
        """
        Vérifie les permissions d'un utilisateur
        
        Args:
            user_token: Token JWT de l'utilisateur
            required_permission: Permission requise
            
        Returns:
            Résultat de la vérification
        """
        try:
            # Décodage du token
            user_info = await self._decode_jwt_token(user_token)
            
            if not user_info:
                return {
                    "authorized": False,
                    "error": "Token invalide"
                }
            
            username = user_info["username"]
            access_level = user_info["access_level"]
            permissions = self.access_levels[access_level]["permissions"]
            
            # Vérification de la permission
            if required_permission in permissions or "full_access" in permissions:
                return {
                    "authorized": True,
                    "username": username,
                    "access_level": access_level,
                    "permissions": permissions
                }
            else:
                return {
                    "authorized": False,
                    "error": "Permission insuffisante",
                    "required_permission": required_permission,
                    "user_permissions": permissions
                }
                
        except Exception as e:
            logger.error(f"Erreur lors de la vérification des permissions: {e}")
            return {
                "authorized": False,
                "error": str(e)
            }
    
    async def log_activity(self, user_token: str, action: str, details: Dict[str, Any]) -> Dict[str, Any]:
        """
        Enregistre une activité dans les logs
        
        Args:
            user_token: Token JWT de l'utilisateur
            action: Action effectuée
            details: Détails de l'action
            
        Returns:
            Résultat de l'enregistrement
        """
        try:
            # Décodage du token
            user_info = await self._decode_jwt_token(user_token)
            
            if not user_info:
                return {
                    "logged": False,
                    "error": "Token invalide"
                }
            
            # Création de l'entrée de log
            log_entry = {
                "timestamp": datetime.now().isoformat(),
                "username": user_info["username"],
                "access_level": user_info["access_level"],
                "action": action,
                "details": details,
                "ip_address": details.get("ip_address", "unknown"),
                "user_agent": details.get("user_agent", "unknown")
            }
            
            # Ajout au log
            self.activity_logs.append(log_entry)
            
            return {
                "logged": True,
                "log_id": len(self.activity_logs),
                "timestamp": log_entry["timestamp"]
            }
            
        except Exception as e:
            logger.error(f"Erreur lors de l'enregistrement de l'activité: {e}")
            return {
                "logged": False,
                "error": str(e)
            }
    
    async def check_ai_limits(self, user_token: str, ai_action: str) -> Dict[str, Any]:
        """
        Vérifie les limites IA pour un utilisateur
        
        Args:
            user_token: Token JWT de l'utilisateur
            ai_action: Action IA à effectuer
            
        Returns:
            Résultat de la vérification
        """
        try:
            # Décodage du token
            user_info = await self._decode_jwt_token(user_token)
            
            if not user_info:
                return {
                    "allowed": False,
                    "error": "Token invalide"
                }
            
            access_level = user_info["access_level"]
            ai_limits = self.access_levels[access_level]["ai_limits"]
            validation_required = self.access_levels[access_level]["validation_required"]
            
            # Vérification des limites
            if ai_limits == "unlimited":
                return {
                    "allowed": True,
                    "validation_required": False,
                    "ai_limits": "unlimited"
                }
            elif ai_limits == "high":
                return {
                    "allowed": True,
                    "validation_required": validation_required,
                    "ai_limits": "high"
                }
            elif ai_limits == "medium":
                return {
                    "allowed": True,
                    "validation_required": validation_required,
                    "ai_limits": "medium"
                }
            else:
                return {
                    "allowed": False,
                    "error": "Limites IA insuffisantes",
                    "ai_limits": ai_limits
                }
                
        except Exception as e:
            logger.error(f"Erreur lors de la vérification des limites IA: {e}")
            return {
                "allowed": False,
                "error": str(e)
            }
    
    async def enable_full_autonomy(self, user_token: str, super_admin_approval: str) -> Dict[str, Any]:
        """
        Active le mode "Full Autonomy" avec autorisation SuperAdmin
        
        Args:
            user_token: Token JWT de l'utilisateur
            super_admin_approval: Code d'approbation SuperAdmin
            
        Returns:
            Résultat de l'activation
        """
        try:
            # Décodage du token
            user_info = await self._decode_jwt_token(user_token)
            
            if not user_info:
                return {
                    "enabled": False,
                    "error": "Token invalide"
                }
            
            # Vérification de l'approbation SuperAdmin
            if super_admin_approval != "SUPER_ADMIN_APPROVAL_2025":
                return {
                    "enabled": False,
                    "error": "Code d'approbation SuperAdmin invalide"
                }
            
            # Vérification du niveau d'accès
            if user_info["access_level"] not in ["super_admin", "admin"]:
                return {
                    "enabled": False,
                    "error": "Niveau d'accès insuffisant pour activer le mode Full Autonomy"
                }
            
            return {
                "enabled": True,
                "username": user_info["username"],
                "access_level": user_info["access_level"],
                "full_autonomy": True,
                "timestamp": datetime.now().isoformat(),
                "approval_code": super_admin_approval
            }
            
        except Exception as e:
            logger.error(f"Erreur lors de l'activation du mode Full Autonomy: {e}")
            return {
                "enabled": False,
                "error": str(e)
            }
    
    async def get_activity_logs(self, user_token: str, limit: int = 100) -> Dict[str, Any]:
        """
        Récupère les logs d'activité
        
        Args:
            user_token: Token JWT de l'utilisateur
            limit: Nombre maximum de logs à retourner
            
        Returns:
            Logs d'activité
        """
        try:
            # Vérification des permissions
            permission_check = await self.check_permissions(user_token, "read_only")
            
            if not permission_check["authorized"]:
                return {
                    "logs": [],
                    "error": "Permission insuffisante"
                }
            
            # Récupération des logs
            logs = self.activity_logs[-limit:] if len(self.activity_logs) > limit else self.activity_logs
            
            return {
                "logs": logs,
                "total_logs": len(self.activity_logs),
                "returned_logs": len(logs),
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des logs: {e}")
            return {
                "logs": [],
                "error": str(e)
            }
    
    async def _generate_jwt_token(self, username: str, access_level: str) -> str:
        """Génère un token JWT"""
        payload = {
            "username": username,
            "access_level": access_level,
            "exp": datetime.utcnow() + timedelta(hours=24),
            "iat": datetime.utcnow()
        }
        
        token = jwt.encode(payload, self.secret_key, algorithm="HS256")
        return token
    
    async def _decode_jwt_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Décode un token JWT"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            logger.error("Token expiré")
            return None
        except jwt.InvalidTokenError:
            logger.error("Token invalide")
            return None

# Exemple d'utilisation
async def main():
    """Exemple d'utilisation du contrôleur de sécurité"""
    controller = SecurityController()
    
    # Authentification
    auth_result = await controller.authenticate_user("admin", "admin_password_2025")
    print(f"Authentification: {auth_result['authenticated']}")
    
    if auth_result["authenticated"]:
        token = auth_result["token"]
        
        # Vérification des permissions
        permission_check = await controller.check_permissions(token, "content_creation")
        print(f"Permission content_creation: {permission_check['authorized']}")
        
        # Enregistrement d'activité
        activity_log = await controller.log_activity(token, "content_creation", {
            "content_type": "post",
            "platform": "instagram",
            "ip_address": "192.168.1.1"
        })
        print(f"Activité enregistrée: {activity_log['logged']}")

if __name__ == "__main__":
    asyncio.run(main())
