#!/usr/bin/env python3
"""
Système d'accès rapide superadmin
Code secret personnel pour accès immédiat
"""

import os
import hashlib
import jwt
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
from .biometric_config import get_biometric_config

class QuickAccessSystem:
    """Système d'accès rapide avec code secret personnel"""
    
    def __init__(self):
        self.config = get_biometric_config()
        self.secret_code = "0987612345SamuelObamSuperAdmin1234509876"
        self.quick_access_enabled = os.getenv('QUICK_ACCESS_ENABLED', 'true').lower() == 'true'
        self.access_token_expiry_days = int(os.getenv('QUICK_ACCESS_TOKEN_EXPIRY_DAYS', '30'))
        
        # Hash du code secret pour comparaison sécurisée
        self.secret_code_hash = self._hash_secret_code()
        
    def _hash_secret_code(self) -> str:
        """Hash le code secret avec salt"""
        salt = os.getenv('QUICK_ACCESS_SALT', 'quick-access-salt-2024')
        return hashlib.sha256(f"{self.secret_code}{salt}".encode()).hexdigest()
    
    def validate_quick_access_code(self, input_code: str) -> bool:
        """Valide le code d'accès rapide"""
        if not self.quick_access_enabled:
            return False
            
        # Comparaison directe du code (pour accès immédiat)
        if input_code == self.secret_code:
            return True
            
        # Comparaison hashée (alternative sécurisée)
        input_hash = hashlib.sha256(f"{input_code}{os.getenv('QUICK_ACCESS_SALT', 'quick-access-salt-2024')}".encode()).hexdigest()
        return input_hash == self.secret_code_hash
    
    def generate_quick_access_token(self, input_code: str) -> Optional[str]:
        """Génère un token d'accès rapide si le code est valide"""
        if not self.validate_quick_access_code(input_code):
            return None
        
        # Token avec privilèges superadmin complets
        payload = {
            'username': 'superadmin_quick',
            'role': 'superadmin',
            'access_type': 'quick_access',
            'privileges': ['full_access', 'bypass_biometric', 'admin_panel'],
            'exp': datetime.utcnow() + timedelta(days=self.access_token_expiry_days),
            'iat': datetime.utcnow(),
            'quick_access': True
        }
        
        return jwt.encode(payload, self.config.SECRET_KEY, algorithm='HS256')
    
    def validate_quick_access_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Valide un token d'accès rapide"""
        if not self.quick_access_enabled:
            return None
            
        try:
            payload = jwt.decode(token, self.config.SECRET_KEY, algorithms=['HS256'])
            
            # Vérifie que c'est un token d'accès rapide
            if not payload.get('quick_access', False):
                return None
                
            # Vérifie le type d'accès
            if payload.get('access_type') != 'quick_access':
                return None
                
            return payload
            
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    def is_quick_access_valid(self, token: str) -> bool:
        """Vérifie si un token d'accès rapide est valide"""
        return self.validate_quick_access_token(token) is not None
    
    def get_quick_access_info(self, token: str) -> Optional[Dict[str, Any]]:
        """Récupère les informations d'accès rapide depuis le token"""
        payload = self.validate_quick_access_token(token)
        if not payload:
            return None
            
        return {
            'username': payload.get('username'),
            'role': payload.get('role'),
            'access_type': payload.get('access_type'),
            'privileges': payload.get('privileges', []),
            'expires_at': datetime.fromtimestamp(payload.get('exp')),
            'quick_access': True,
            'token_type': 'quick_access'
        }
    
    def create_immediate_access(self) -> str:
        """Crée un accès immédiat avec le code secret (pour tests)"""
        if not self.quick_access_enabled:
            raise Exception("Accès rapide désactivé")
        
        return self.generate_quick_access_token(self.secret_code)
    
    def get_access_status(self) -> Dict[str, Any]:
        """Retourne le statut du système d'accès rapide"""
        return {
            'quick_access_enabled': self.quick_access_enabled,
            'access_token_expiry_days': self.access_token_expiry_days,
            'secret_code_length': len(self.secret_code),
            'hash_algorithm': 'sha256',
            'config_source': 'hardcoded_secure'
        }
    
    def emergency_access(self) -> Dict[str, Any]:
        """Accès d'urgence avec le code secret"""
        try:
            token = self.create_immediate_access()
            return {
                'success': True,
                'token': token,
                'access_type': 'emergency',
                'expires_in_days': self.access_token_expiry_days,
                'message': 'Accès d\'urgence activé'
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}

# Instance globale
quick_access_system = QuickAccessSystem()

# Fonctions utilitaires
def get_quick_access_system() -> QuickAccessSystem:
    """Retourne l'instance du système d'accès rapide"""
    return quick_access_system

def quick_access_with_code(code: str) -> Optional[str]:
    """Accès rapide avec un code"""
    return quick_access_system.generate_quick_access_token(code)

def is_quick_access_enabled() -> bool:
    """Vérifie si l'accès rapide est activé"""
    return quick_access_system.quick_access_enabled

def emergency_quick_access() -> str:
    """Accès d'urgence immédiat"""
    return quick_access_system.create_immediate_access() 