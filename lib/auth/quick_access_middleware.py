#!/usr/bin/env python3
"""
Middleware d'accès rapide superadmin
Intègre le système d'accès rapide dans le flux d'authentification
"""

import os
from typing import Dict, Any, Optional, Callable
from .quick_access import get_quick_access_system, quick_access_with_code
from .superadmin_bypass import get_superadmin_bypass

class QuickAccessMiddleware:
    """Middleware pour l'accès rapide superadmin"""
    
    def __init__(self):
        self.quick_access_system = get_quick_access_system()
        self.superadmin_bypass = get_superadmin_bypass()
        self.enabled = os.getenv('QUICK_ACCESS_MIDDLEWARE_ENABLED', 'true').lower() == 'true'
    
    def process_request(self, request_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Traite une requête et vérifie l'accès rapide"""
        if not self.enabled:
            return None
        
        # Vérifie si c'est une demande d'accès rapide
        if self._is_quick_access_request(request_data):
            return self._handle_quick_access(request_data)
        
        # Vérifie si c'est une demande de bypass superadmin
        if self._is_superadmin_bypass_request(request_data):
            return self._handle_superadmin_bypass(request_data)
        
        return None
    
    def _is_quick_access_request(self, request_data: Dict[str, Any]) -> bool:
        """Détermine si c'est une demande d'accès rapide"""
        # Vérifie la présence du code secret
        if 'quick_access_code' in request_data:
            return True
        
        # Vérifie l'en-tête d'autorisation spécial
        headers = request_data.get('headers', {})
        if 'X-Quick-Access-Code' in headers:
            return True
        
        # Vérifie le paramètre d'URL
        query_params = request_data.get('query_params', {})
        if 'quick_access' in query_params:
            return True
        
        return False
    
    def _is_superadmin_bypass_request(self, request_data: Dict[str, Any]) -> bool:
        """Détermine si c'est une demande de bypass superadmin"""
        # Vérifie les identifiants superadmin
        if 'username' in request_data and 'password' in request_data:
            return True
        
        # Vérifie l'en-tête d'autorisation JWT
        headers = request_data.get('headers', {})
        if 'Authorization' in headers and headers['Authorization'].startswith('Bearer '):
            return True
        
        return False
    
    def _handle_quick_access(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Gère l'accès rapide avec le code secret"""
        # Récupère le code secret
        code = self._extract_quick_access_code(request_data)
        
        if not code:
            return {
                'success': False,
                'error': 'Code d\'accès rapide manquant',
                'access_type': 'quick_access'
            }
        
        # Valide le code et génère le token
        token = quick_access_with_code(code)
        
        if token:
            return {
                'success': True,
                'token': token,
                'access_type': 'quick_access',
                'user_info': {
                    'username': 'superadmin_quick',
                    'role': 'superadmin',
                    'privileges': ['full_access', 'bypass_biometric', 'admin_panel']
                },
                'message': 'Accès rapide superadmin activé'
            }
        else:
            return {
                'success': False,
                'error': 'Code d\'accès rapide invalide',
                'access_type': 'quick_access'
            }
    
    def _handle_superadmin_bypass(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Gère le bypass superadmin traditionnel"""
        # Récupère les identifiants
        username = request_data.get('username')
        password = request_data.get('password')
        
        if not username or not password:
            return {
                'success': False,
                'error': 'Identifiants superadmin manquants',
                'access_type': 'superadmin_bypass'
            }
        
        # Authentifie avec le système de bypass
        token = self.superadmin_bypass.authenticate_superadmin(username, password)
        
        if token:
            return {
                'success': True,
                'token': token,
                'access_type': 'superadmin_bypass',
                'user_info': self.superadmin_bypass.get_superadmin_info(token),
                'message': 'Bypass superadmin activé'
            }
        else:
            return {
                'success': False,
                'error': 'Identifiants superadmin invalides',
                'access_type': 'superadmin_bypass'
            }
    
    def _extract_quick_access_code(self, request_data: Dict[str, Any]) -> Optional[str]:
        """Extrait le code d'accès rapide de la requête"""
        # Depuis le corps de la requête
        if 'quick_access_code' in request_data:
            return request_data['quick_access_code']
        
        # Depuis l'en-tête
        headers = request_data.get('headers', {})
        if 'X-Quick-Access-Code' in headers:
            return headers['X-Quick-Access-Code']
        
        # Depuis les paramètres d'URL
        query_params = request_data.get('query_params', {})
        if 'quick_access' in query_params:
            return query_params['quick_access']
        
        return None
    
    def validate_token(self, token: str, access_type: str = None) -> Optional[Dict[str, Any]]:
        """Valide un token d'accès"""
        if access_type == 'quick_access':
            return self.quick_access_system.get_quick_access_info(token)
        elif access_type == 'superadmin_bypass':
            return self.superadmin_bypass.get_superadmin_info(token)
        else:
            # Essaie les deux types
            info = self.quick_access_system.get_quick_access_info(token)
            if info:
                return info
            
            info = self.superadmin_bypass.get_superadmin_info(token)
            if info:
                return info
        
        return None
    
    def is_authenticated(self, token: str) -> bool:
        """Vérifie si un token est authentifié"""
        return self.validate_token(token) is not None
    
    def get_user_info(self, token: str) -> Optional[Dict[str, Any]]:
        """Récupère les informations utilisateur depuis un token"""
        return self.validate_token(token)
    
    def get_middleware_status(self) -> Dict[str, Any]:
        """Retourne le statut du middleware"""
        return {
            'enabled': self.enabled,
            'quick_access_enabled': self.quick_access_system.quick_access_enabled,
            'superadmin_bypass_enabled': self.superadmin_bypass.bypass_enabled,
            'supported_access_types': ['quick_access', 'superadmin_bypass']
        }

# Instance globale
quick_access_middleware = QuickAccessMiddleware()

# Fonctions utilitaires
def get_quick_access_middleware() -> QuickAccessMiddleware:
    """Retourne l'instance du middleware d'accès rapide"""
    return quick_access_middleware

def process_quick_access_request(request_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Traite une requête d'accès rapide"""
    return quick_access_middleware.process_request(request_data)

def validate_quick_access_token(token: str) -> Optional[Dict[str, Any]]:
    """Valide un token d'accès rapide"""
    return quick_access_middleware.validate_token(token) 