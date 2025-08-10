#!/usr/bin/env python3
"""
Configuration du système d'authentification biométrique
Paramètres de sécurité, seuils et comportements
"""

import os
from typing import Dict, Any

class BiometricAuthConfig:
    """Configuration du système d'authentification biométrique"""
    
    def __init__(self):
        # Configuration de sécurité
        self.SECRET_KEY = os.getenv('BIOMETRIC_SECRET_KEY', 'your-secret-key-change-in-production')
        self.JWT_EXPIRY_HOURS = int(os.getenv('JWT_EXPIRY_HOURS', '24'))
        self.SESSION_TIMEOUT_HOURS = int(os.getenv('SESSION_TIMEOUT_HOURS', '1'))
        
        # Configuration des tentatives de connexion
        self.MAX_LOGIN_ATTEMPTS = int(os.getenv('MAX_LOGIN_ATTEMPTS', '3'))
        self.LOCKOUT_DURATION_MINUTES = int(os.getenv('LOCKOUT_DURATION_MINUTES', '15'))
        
        # Configuration biométrique
        self.MINUTIAE_THRESHOLD = float(os.getenv('MINUTIAE_THRESHOLD', '0.75'))
        self.QUALITY_THRESHOLD = float(os.getenv('QUALITY_THRESHOLD', '0.6'))
        self.MIN_MINUTIAE_COUNT = int(os.getenv('MIN_MINUTIAE_COUNT', '10'))
        
        # Configuration des images
        self.MIN_IMAGE_SIZE = tuple(map(int, os.getenv('MIN_IMAGE_SIZE', '200,200').split(',')))
        self.MAX_IMAGE_SIZE = tuple(map(int, os.getenv('MAX_IMAGE_SIZE', '800,800').split(',')))
        self.IMAGE_FORMATS = ['JPEG', 'PNG', 'BMP']
        
        # Configuration du stockage
        self.STORAGE_PATH = os.getenv('BIOMETRIC_STORAGE_PATH', 'data/fingerprints')
        self.CAPTURE_STORAGE_PATH = os.getenv('CAPTURE_STORAGE_PATH', 'data/fingerprints/captures')
        self.BACKUP_ENABLED = os.getenv('BACKUP_ENABLED', 'true').lower() == 'true'
        self.BACKUP_INTERVAL_HOURS = int(os.getenv('BACKUP_INTERVAL_HOURS', '24'))
        
        # Configuration de la qualité d'image
        self.ENHANCEMENT_FILTERS = {
            'contrast': float(os.getenv('ENHANCEMENT_CONTRAST', '1.5')),
            'brightness': float(os.getenv('ENHANCEMENT_BRIGHTNESS', '1.2')),
            'sharpness': float(os.getenv('ENHANCEMENT_SHARPNESS', '1.8'))
        }
        
        # Configuration de la sécurité des données
        self.ENCRYPT_FINGERPRINTS = os.getenv('ENCRYPT_FINGERPRINTS', 'true').lower() == 'true'
        self.ENCRYPTION_KEY = os.getenv('ENCRYPTION_KEY', 'your-encryption-key-change-in-production')
        self.HASH_ALGORITHM = os.getenv('HASH_ALGORITHM', 'sha256')
        
        # Configuration des logs
        self.LOG_LEVEL = os.getenv('BIOMETRIC_LOG_LEVEL', 'INFO')
        self.LOG_FILE = os.getenv('BIOMETRIC_LOG_FILE', 'logs/biometric_auth.log')
        self.LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        
        # Configuration des performances
        self.CACHE_ENABLED = os.getenv('CACHE_ENABLED', 'true').lower() == 'true'
        self.CACHE_TTL_SECONDS = int(os.getenv('CACHE_TTL_SECONDS', '300'))
        self.MAX_CONCURRENT_PROCESSES = int(os.getenv('MAX_CONCURRENT_PROCESSES', '4'))
        
        # Configuration de la validation
        self.VALIDATE_FINGERPRINT_QUALITY = os.getenv('VALIDATE_FINGERPRINT_QUALITY', 'true').lower() == 'true'
        self.REQUIRE_MULTIPLE_CAPTURES = os.getenv('REQUIRE_MULTIPLE_CAPTURES', 'false').lower() == 'true'
        self.MIN_CAPTURE_ATTEMPTS = int(os.getenv('MIN_CAPTURE_ATTEMPTS', '1'))
        
        # Configuration de la confidentialité
        self.ANONYMIZE_LOGS = os.getenv('ANONYMIZE_LOGS', 'true').lower() == 'true'
        self.RETENTION_DAYS = int(os.getenv('RETENTION_DAYS', '90'))
        self.AUTO_CLEANUP = os.getenv('AUTO_CLEANUP', 'true').lower() == 'true'
        
        # Configuration des notifications
        self.ENABLE_NOTIFICATIONS = os.getenv('ENABLE_NOTIFICATIONS', 'true').lower() == 'true'
        self.NOTIFICATION_EMAIL = os.getenv('NOTIFICATION_EMAIL', 'admin@example.com')
        self.ALERT_THRESHOLD = float(os.getenv('ALERT_THRESHOLD', '0.8'))
        
        # Configuration de la conformité
        self.GDPR_COMPLIANT = os.getenv('GDPR_COMPLIANT', 'true').lower() == 'true'
        self.ENCRYPT_PII = os.getenv('ENCRYPT_PII', 'true').lower() == 'true'
        self.AUDIT_TRAIL = os.getenv('AUDIT_TRAIL', 'true').lower() == 'true'
    
    def get_storage_config(self) -> Dict[str, Any]:
        """Retourne la configuration de stockage"""
        return {
            'storage_path': self.STORAGE_PATH,
            'capture_storage_path': self.CAPTURE_STORAGE_PATH,
            'backup_enabled': self.BACKUP_ENABLED,
            'backup_interval_hours': self.BACKUP_INTERVAL_HOURS,
            'retention_days': self.RETENTION_DAYS,
            'auto_cleanup': self.AUTO_CLEANUP
        }
    
    def get_security_config(self) -> Dict[str, Any]:
        """Retourne la configuration de sécurité"""
        return {
            'secret_key': self.SECRET_KEY,
            'jwt_expiry_hours': self.JWT_EXPIRY_HOURS,
            'session_timeout_hours': self.SESSION_TIMEOUT_HOURS,
            'max_login_attempts': self.MAX_LOGIN_ATTEMPTS,
            'lockout_duration_minutes': self.LOCKOUT_DURATION_MINUTES,
            'encrypt_fingerprints': self.ENCRYPT_FINGERPRINTS,
            'encryption_key': self.ENCRYPTION_KEY,
            'hash_algorithm': self.HASH_ALGORITHM
        }
    
    def get_biometric_config(self) -> Dict[str, Any]:
        """Retourne la configuration biométrique"""
        return {
            'minutiae_threshold': self.MINUTIAE_THRESHOLD,
            'quality_threshold': self.QUALITY_THRESHOLD,
            'min_minutiae_count': self.MIN_MINUTIAE_COUNT,
            'enhancement_filters': self.ENHANCEMENT_FILTERS,
            'validate_fingerprint_quality': self.VALIDATE_FINGERPRINT_QUALITY,
            'require_multiple_captures': self.REQUIRE_MULTIPLE_CAPTURES,
            'min_capture_attempts': self.MIN_CAPTURE_ATTEMPTS
        }
    
    def get_image_config(self) -> Dict[str, Any]:
        """Retourne la configuration des images"""
        return {
            'min_image_size': self.MIN_IMAGE_SIZE,
            'max_image_size': self.MAX_IMAGE_SIZE,
            'image_formats': self.IMAGE_FORMATS,
            'enhancement_filters': self.ENHANCEMENT_FILTERS
        }
    
    def get_performance_config(self) -> Dict[str, Any]:
        """Retourne la configuration des performances"""
        return {
            'cache_enabled': self.CACHE_ENABLED,
            'cache_ttl_seconds': self.CACHE_TTL_SECONDS,
            'max_concurrent_processes': self.MAX_CONCURRENT_PROCESSES
        }
    
    def get_compliance_config(self) -> Dict[str, Any]:
        """Retourne la configuration de conformité"""
        return {
            'gdpr_compliant': self.GDPR_COMPLIANT,
            'encrypt_pii': self.ENCRYPT_PII,
            'audit_trail': self.AUDIT_TRAIL,
            'anonymize_logs': self.ANONYMIZE_LOGS,
            'retention_days': self.RETENTION_DAYS
        }
    
    def validate_config(self) -> Dict[str, Any]:
        """Valide la configuration et retourne les erreurs"""
        errors = []
        warnings = []
        
        # Vérifications critiques
        if self.SECRET_KEY == 'your-secret-key-change-in-production':
            errors.append("SECRET_KEY doit être changé en production")
        
        if self.ENCRYPTION_KEY == 'your-encryption-key-change-in-production':
            errors.append("ENCRYPTION_KEY doit être changé en production")
        
        if self.MINUTIAE_THRESHOLD < 0.5 or self.MINUTIAE_THRESHOLD > 0.95:
            warnings.append("MINUTIAE_THRESHOLD devrait être entre 0.5 et 0.95")
        
        if self.QUALITY_THRESHOLD < 0.3 or self.QUALITY_THRESHOLD > 0.9:
            warnings.append("QUALITY_THRESHOLD devrait être entre 0.3 et 0.9")
        
        if self.MAX_LOGIN_ATTEMPTS < 1 or self.MAX_LOGIN_ATTEMPTS > 10:
            warnings.append("MAX_LOGIN_ATTEMPTS devrait être entre 1 et 10")
        
        if self.LOCKOUT_DURATION_MINUTES < 5 or self.LOCKOUT_DURATION_MINUTES > 60:
            warnings.append("LOCKOUT_DURATION_MINUTES devrait être entre 5 et 60")
        
        return {
            'valid': len(errors) == 0,
            'errors': errors,
            'warnings': warnings
        }
    
    def to_dict(self) -> Dict[str, Any]:
        """Convertit la configuration en dictionnaire"""
        return {
            'security': self.get_security_config(),
            'biometric': self.get_biometric_config(),
            'image': self.get_image_config(),
            'storage': self.get_storage_config(),
            'performance': self.get_performance_config(),
            'compliance': self.get_compliance_config(),
            'logging': {
                'log_level': self.LOG_LEVEL,
                'log_file': self.LOG_FILE,
                'log_format': self.LOG_FORMAT
            },
            'notifications': {
                'enable_notifications': self.ENABLE_NOTIFICATIONS,
                'notification_email': self.NOTIFICATION_EMAIL,
                'alert_threshold': self.ALERT_THRESHOLD
            }
        }
    
    def update_from_env(self):
        """Met à jour la configuration depuis les variables d'environnement"""
        # Cette méthode peut être appelée pour recharger la configuration
        # depuis les variables d'environnement sans redémarrer l'application
        pass

# Instance globale de configuration
config = BiometricAuthConfig()

# Fonction utilitaire pour obtenir la configuration
def get_biometric_config() -> BiometricAuthConfig:
    """Retourne l'instance de configuration biométrique"""
    return config 