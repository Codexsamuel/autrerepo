"""
Module d'authentification biométrique
Remplace complètement l'ancien système de codes et hash
"""

from .biometric_auth_manager import BiometricAuthManager
from .biometric_auth import BiometricFingerprintAuth
from .fingerprint_capture import FingerprintCapture

__all__ = [
    'BiometricAuthManager',
    'BiometricFingerprintAuth', 
    'FingerprintCapture'
]

__version__ = '2.0.0'
__author__ = 'DL Solutions Security Team'
__description__ = 'Système d\'authentification biométrique par empreintes digitales' 