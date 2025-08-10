#!/usr/bin/env python3
"""
Gestionnaire d'authentification biométrique principal
Remplace complètement le système de codes et hash
"""

import os
import json
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
import jwt
import hashlib

from .biometric_auth import BiometricFingerprintAuth
from .fingerprint_capture import FingerprintCapture

logger = logging.getLogger(__name__)

class BiometricAuthManager:
    """Gestionnaire principal d'authentification biométrique"""
    
    def __init__(self, config):
        self.config = config
        self.fingerprint_auth = BiometricFingerprintAuth()
        self.fingerprint_capture = FingerprintCapture()
        
        # Cache des sessions actives
        self.active_sessions = {}
        self.session_timeout = timedelta(hours=1)
        
        # Configuration de sécurité
        self.max_login_attempts = 3
        self.lockout_duration = timedelta(minutes=15)
        self.failed_attempts = {}
        
        logger.info("🔐 Gestionnaire d'authentification biométrique initialisé")
    
    def register_user_fingerprint(self, user_id: str, fingerprint_image: str) -> Dict[str, Any]:
        """Enregistre une nouvelle empreinte digitale pour un utilisateur"""
        try:
            logger.info(f"📝 Enregistrement empreinte pour {user_id}")
            
            # Valider la qualité de l'image
            quality_check = self.fingerprint_capture.validate_capture_quality(fingerprint_image)
            if not quality_check['success']:
                return {
                    'success': False,
                    'message': 'Erreur validation qualité',
                    'error': quality_check.get('error', 'Inconnu')
                }
            
            if not quality_check['is_acceptable']:
                return {
                    'success': False,
                    'message': 'Qualité d\'image insuffisante',
                    'quality_score': quality_check['quality_score'],
                    'recommendations': quality_check['recommendations']
                }
            
            # Traiter et optimiser l'image
            processed_image = self.fingerprint_capture.process_captured_image(fingerprint_image, user_id)
            if not processed_image['success']:
                return {
                    'success': False,
                    'message': 'Erreur traitement image',
                    'error': processed_image.get('error', 'Inconnu')
                }
            
            # Enregistrer l'empreinte dans le système biométrique
            registration_result = self.fingerprint_auth.register_fingerprint(
                user_id, 
                processed_image['enhanced_image']
            )
            
            if registration_result['success']:
                logger.info(f"✅ Empreinte enregistrée pour {user_id}")
                return {
                    'success': True,
                    'message': 'Empreinte enregistrée avec succès',
                    'user_id': user_id,
                    'quality_score': quality_check['quality_score'],
                    'minutiae_count': registration_result.get('minutiae_count', 0),
                    'filename': processed_image['filename']
                }
            else:
                return registration_result
                
        except Exception as e:
            logger.error(f"❌ Erreur enregistrement empreinte: {e}")
            return {
                'success': False,
                'message': f'Erreur système: {str(e)}',
                'user_id': user_id
            }
    
    def authenticate_user(self, user_id: str, fingerprint_image: str) -> Dict[str, Any]:
        """Authentifie un utilisateur via son empreinte digitale"""
        try:
            logger.info(f"🔍 Authentification biométrique pour {user_id}")
            
            # Vérifier le verrouillage
            if self._is_user_locked(user_id):
                return {
                    'success': False,
                    'message': 'Compte temporairement verrouillé',
                    'locked_until': self.failed_attempts[user_id]['locked_until'].isoformat()
                }
            
            # Valider la qualité de l'image
            quality_check = self.fingerprint_capture.validate_capture_quality(fingerprint_image)
            if not quality_check['success']:
                self._record_failed_attempt(user_id)
                return {
                    'success': False,
                    'message': 'Erreur validation qualité',
                    'error': quality_check.get('error', 'Inconnu')
                }
            
            # Vérifier l'empreinte
            verification_result = self.fingerprint_auth.verify_fingerprint(user_id, fingerprint_image)
            
            if verification_result['success'] and verification_result['is_match']:
                # Authentification réussie
                self._clear_failed_attempts(user_id)
                token = self._generate_auth_token(user_id)
                session_id = self._create_session(user_id)
                
                logger.info(f"✅ Authentification réussie pour {user_id}")
                
                return {
                    'success': True,
                    'message': 'Authentification biométrique réussie',
                    'user_id': user_id,
                    'token': token,
                    'session_id': session_id,
                    'score': verification_result['score'],
                    'expires_in': self.config.JWT_EXPIRY_HOURS * 3600
                }
            else:
                # Authentification échouée
                self._record_failed_attempt(user_id)
                
                return {
                    'success': False,
                    'message': 'Empreinte digitale non reconnue',
                    'user_id': user_id,
                    'score': verification_result.get('score', 0),
                    'threshold': verification_result.get('threshold', 0)
                }
                
        except Exception as e:
            logger.error(f"❌ Erreur authentification: {e}")
            self._record_failed_attempt(user_id)
            return {
                'success': False,
                'message': f'Erreur système: {str(e)}',
                'user_id': user_id
            }
    
    def verify_session(self, session_id: str) -> Dict[str, Any]:
        """Vérifie la validité d'une session"""
        try:
            if session_id not in self.active_sessions:
                return {
                    'success': False,
                    'message': 'Session invalide'
                }
            
            session = self.active_sessions[session_id]
            
            # Vérifier l'expiration
            if datetime.now() > session['expires_at']:
                del self.active_sessions[session_id]
                return {
                    'success': False,
                    'message': 'Session expirée'
                }
            
            # Renouveler la session
            session['expires_at'] = datetime.now() + self.session_timeout
            
            return {
                'success': True,
                'user_id': session['user_id'],
                'expires_at': session['expires_at'].isoformat(),
                'created_at': session['created_at'].isoformat()
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur vérification session: {e}")
            return {
                'success': False,
                'message': f'Erreur système: {str(e)}'
            }
    
    def logout_user(self, session_id: str) -> Dict[str, Any]:
        """Déconnecte un utilisateur"""
        try:
            if session_id in self.active_sessions:
                user_id = self.active_sessions[session_id]['user_id']
                del self.active_sessions[session_id]
                
                logger.info(f"🚪 Déconnexion de {user_id}")
                
                return {
                    'success': True,
                    'message': 'Déconnexion réussie',
                    'user_id': user_id
                }
            else:
                return {
                    'success': False,
                    'message': 'Session invalide'
                }
                
        except Exception as e:
            logger.error(f"❌ Erreur déconnexion: {e}")
            return {
                'success': False,
                'message': f'Erreur système: {str(e)}'
            }
    
    def get_user_fingerprint_info(self, user_id: str) -> Dict[str, Any]:
        """Récupère les informations d'empreinte d'un utilisateur"""
        return self.fingerprint_auth.get_user_fingerprint_info(user_id)
    
    def delete_user_fingerprint(self, user_id: str) -> Dict[str, Any]:
        """Supprime l'empreinte d'un utilisateur"""
        try:
            # Supprimer de la session si active
            for session_id, session in list(self.active_sessions.items()):
                if session['user_id'] == user_id:
                    del self.active_sessions[session_id]
            
            # Supprimer l'empreinte
            result = self.fingerprint_auth.delete_fingerprint(user_id)
            
            if result['success']:
                logger.info(f"🗑️ Empreinte supprimée pour {user_id}")
            
            return result
            
        except Exception as e:
            logger.error(f"❌ Erreur suppression empreinte: {e}")
            return {
                'success': False,
                'message': f'Erreur système: {str(e)}',
                'user_id': user_id
            }
    
    def get_system_stats(self) -> Dict[str, Any]:
        """Récupère les statistiques du système"""
        try:
            biometric_stats = self.fingerprint_auth.get_system_stats()
            
            return {
                'biometric_system': biometric_stats,
                'active_sessions': len(self.active_sessions),
                'locked_users': len(self.failed_attempts),
                'total_registered_users': len(self.fingerprint_auth.list_registered_users()),
                'system_status': 'operational',
                'last_updated': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur statistiques système: {e}")
            return {
                'error': str(e),
                'system_status': 'error'
            }
    
    def _is_user_locked(self, user_id: str) -> bool:
        """Vérifie si un utilisateur est verrouillé"""
        if user_id not in self.failed_attempts:
            return False
        
        lock_info = self.failed_attempts[user_id]
        
        # Vérifier si le verrouillage a expiré
        if datetime.now() > lock_info['locked_until']:
            del self.failed_attempts[user_id]
            return False
        
        return True
    
    def _record_failed_attempt(self, user_id: str):
        """Enregistre une tentative d'authentification échouée"""
        if user_id not in self.failed_attempts:
            self.failed_attempts[user_id] = {
                'count': 0,
                'first_attempt': datetime.now(),
                'locked_until': None
            }
        
        self.failed_attempts[user_id]['count'] += 1
        
        # Verrouiller après le nombre maximum de tentatives
        if self.failed_attempts[user_id]['count'] >= self.max_login_attempts:
            self.failed_attempts[user_id]['locked_until'] = datetime.now() + self.lockout_duration
            logger.warning(f"🔒 Compte {user_id} verrouillé pour {self.lockout_duration}")
    
    def _clear_failed_attempts(self, user_id: str):
        """Efface les tentatives échouées d'un utilisateur"""
        if user_id in self.failed_attempts:
            del self.failed_attempts[user_id]
    
    def _generate_auth_token(self, user_id: str) -> str:
        """Génère un token JWT d'authentification"""
        payload = {
            'user_id': user_id,
            'auth_type': 'biometric',
            'exp': datetime.utcnow() + timedelta(hours=self.config.JWT_EXPIRY_HOURS),
            'iat': datetime.utcnow()
        }
        
        return jwt.encode(payload, self.config.SECRET_KEY, algorithm='HS256')
    
    def _create_session(self, user_id: str) -> str:
        """Crée une nouvelle session utilisateur"""
        session_id = hashlib.sha256(f"{user_id}_{datetime.now().isoformat()}".encode()).hexdigest()
        
        self.active_sessions[session_id] = {
            'user_id': user_id,
            'created_at': datetime.now(),
            'expires_at': datetime.now() + self.session_timeout,
            'last_activity': datetime.now()
        }
        
        return session_id
    
    def cleanup_expired_sessions(self):
        """Nettoie les sessions expirées"""
        try:
            current_time = datetime.now()
            expired_sessions = [
                session_id for session_id, session in self.active_sessions.items()
                if current_time > session['expires_at']
            ]
            
            for session_id in expired_sessions:
                del self.active_sessions[session_id]
            
            if expired_sessions:
                logger.info(f"🧹 {len(expired_sessions)} sessions expirées nettoyées")
                
        except Exception as e:
            logger.error(f"❌ Erreur nettoyage sessions: {e}")
    
    def get_capture_interface_html(self) -> str:
        """Retourne l'interface HTML de capture d'empreinte"""
        return self.fingerprint_capture.create_capture_interface_html() 