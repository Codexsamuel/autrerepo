#!/usr/bin/env python3
"""
Système de bypass pour superadmin
Permet aux superadmins d'accéder au système sans authentification biométrique
"""

import os
import hashlib
import jwt
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
from .biometric_config import get_biometric_config

class SuperAdminBypass:
    """Système de bypass pour les superadmins"""
    
    def __init__(self):
        self.config = get_biometric_config()
        self.superadmin_credentials = self._load_superadmin_credentials()
        self.bypass_enabled = os.getenv('SUPERADMIN_BYPASS_ENABLED', 'true').lower() == 'true'
        self.bypass_token_expiry_hours = int(os.getenv('SUPERADMIN_BYPASS_EXPIRY_HOURS', '24'))
        
    def _load_superadmin_credentials(self) -> Dict[str, str]:
        """Charge les identifiants des superadmins depuis les variables d'environnement"""
        credentials = {}
        
        # Superadmin principal (vous)
        main_username = os.getenv('SUPERADMIN_USERNAME', 'superadmin')
        main_password_hash = os.getenv('SUPERADMIN_PASSWORD_HASH', 
                                     self._hash_password('superadmin123'))
        credentials[main_username] = main_password_hash
        
        # Superadmins additionnels
        additional_admins = os.getenv('ADDITIONAL_SUPERADMINS', '').split(',')
        for admin in additional_admins:
            if admin.strip():
                username = admin.strip()
                password_hash = os.getenv(f'SUPERADMIN_{username.upper()}_PASSWORD_HASH', 
                                       self._hash_password('default123'))
                credentials[username] = password_hash
        
        return credentials
    
    def _hash_password(self, password: str) -> str:
        """Hash un mot de passe avec salt"""
        salt = os.getenv('SUPERADMIN_SALT', 'superadmin-salt-2024')
        return hashlib.sha256(f"{password}{salt}".encode()).hexdigest()
    
    def authenticate_superadmin(self, username: str, password: str) -> Optional[str]:
        """Authentifie un superadmin et retourne un token de bypass"""
        if not self.bypass_enabled:
            return None
            
        if username not in self.superadmin_credentials:
            return None
            
        password_hash = self._hash_password(password)
        if password_hash != self.superadmin_credentials[username]:
            return None
        
        # Génère un token de bypass
        return self._generate_bypass_token(username)
    
    def _generate_bypass_token(self, username: str) -> str:
        """Génère un token JWT de bypass pour superadmin"""
        payload = {
            'username': username,
            'role': 'superadmin',
            'bypass': True,
            'exp': datetime.utcnow() + timedelta(hours=self.bypass_token_expiry_hours),
            'iat': datetime.utcnow()
        }
        
        return jwt.encode(payload, self.config.SECRET_KEY, algorithm='HS256')
    
    def validate_bypass_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Valide un token de bypass et retourne les informations du superadmin"""
        if not self.bypass_enabled:
            return None
            
        try:
            payload = jwt.decode(token, self.config.SECRET_KEY, algorithms=['HS256'])
            
            # Vérifie que c'est bien un token de bypass
            if not payload.get('bypass', False):
                return None
                
            # Vérifie que le rôle est superadmin
            if payload.get('role') != 'superadmin':
                return None
                
            return payload
            
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    def is_superadmin_bypass_valid(self, token: str) -> bool:
        """Vérifie si un token de bypass est valide"""
        return self.validate_bypass_token(token) is not None
    
    def get_superadmin_info(self, token: str) -> Optional[Dict[str, Any]]:
        """Récupère les informations du superadmin depuis le token"""
        payload = self.validate_bypass_token(token)
        if not payload:
            return None
            
        return {
            'username': payload.get('username'),
            'role': payload.get('role'),
            'expires_at': datetime.fromtimestamp(payload.get('exp')),
            'bypass_enabled': True
        }
    
    def create_quick_access_token(self, username: str = 'superadmin') -> str:
        """Crée un token d'accès rapide pour le développement"""
        if not self.bypass_enabled:
            raise Exception("Bypass superadmin désactivé")
            
        if username not in self.superadmin_credentials:
            raise Exception(f"Superadmin {username} non trouvé")
        
        # Token avec expiration plus longue pour le développement
        payload = {
            'username': username,
            'role': 'superadmin',
            'bypass': True,
            'dev_mode': True,
            'exp': datetime.utcnow() + timedelta(days=7),  # 7 jours pour le dev
            'iat': datetime.utcnow()
        }
        
        return jwt.encode(payload, self.config.SECRET_KEY, algorithm='HS256')
    
    def enable_dev_mode(self, username: str = 'superadmin') -> Dict[str, Any]:
        """Active le mode développement pour un superadmin"""
        if not self.bypass_enabled:
            return {'success': False, 'error': 'Bypass superadmin désactivé'}
        
        try:
            token = self.create_quick_access_token(username)
            return {
                'success': True,
                'token': token,
                'username': username,
                'expires_in_days': 7,
                'message': f'Mode développement activé pour {username}'
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_bypass_status(self) -> Dict[str, Any]:
        """Retourne le statut du système de bypass"""
        return {
            'bypass_enabled': self.bypass_enabled,
            'superadmin_count': len(self.superadmin_credentials),
            'superadmins': list(self.superadmin_credentials.keys()),
            'token_expiry_hours': self.bypass_token_expiry_hours,
            'config_source': 'environment_variables'
        }
    
    def add_superadmin(self, username: str, password: str) -> Dict[str, Any]:
        """Ajoute un nouveau superadmin (uniquement en mode développement)"""
        if not self.bypass_enabled:
            return {'success': False, 'error': 'Bypass superadmin désactivé'}
        
        if username in self.superadmin_credentials:
            return {'success': False, 'error': f'Superadmin {username} existe déjà'}
        
        password_hash = self._hash_password(password)
        self.superadmin_credentials[username] = password_hash
        
        return {
            'success': True,
            'username': username,
            'message': f'Superadmin {username} ajouté avec succès'
        }
    
    def remove_superadmin(self, username: str) -> Dict[str, Any]:
        """Supprime un superadmin (uniquement en mode développement)"""
        if not self.bypass_enabled:
            return {'success': False, 'error': 'Bypass superadmin désactivé'}
        
        if username == 'superadmin':  # Protège le superadmin principal
            return {'success': False, 'error': 'Impossible de supprimer le superadmin principal'}
        
        if username not in self.superadmin_credentials:
            return {'success': False, 'error': f'Superadmin {username} non trouvé'}
        
        del self.superadmin_credentials[username]
        
        return {
            'success': True,
            'username': username,
            'message': f'Superadmin {username} supprimé avec succès'
        }

# Instance globale
superadmin_bypass = SuperAdminBypass()

# Fonctions utilitaires
def get_superadmin_bypass() -> SuperAdminBypass:
    """Retourne l'instance du système de bypass superadmin"""
    return superadmin_bypass

def quick_dev_access(username: str = 'superadmin') -> str:
    """Accès rapide au développement (crée un token de 7 jours)"""
    return superadmin_bypass.create_quick_access_token(username)

def is_superadmin_bypass_enabled() -> bool:
    """Vérifie si le bypass superadmin est activé"""
    return superadmin_bypass.bypass_enabled 