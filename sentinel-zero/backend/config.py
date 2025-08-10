#!/usr/bin/env python3
"""
Configuration Sentinel Zero
Fichier de configuration centralisé
"""

import os
from typing import List

class Config:
    """Configuration principale de Sentinel Zero"""
    
    # Clés de sécurité
    SECRET_KEY = os.getenv("SECRET_KEY", "SENTINEL_SUPER_KEY_4096_RSA_DL_SOLUTIONS_2025")
    MASTER_CODE = os.getenv("MASTER_CODE", "0987612345")
    BIOMETRIC_VOICE_HASH = os.getenv("BIOMETRIC_VOICE_HASH", "b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0")
    BIOMETRIC_FP_HASH = os.getenv("BIOMETRIC_FP_HASH", "a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1")
    SUPER_ADMIN_ID = os.getenv("SUPER_ADMIN_ID", "DL-SUPER-01")
    RED_BUTTON_PHRASE = os.getenv("RED_BUTTON_PHRASE", "i am sentinel")
    
    # 🔐 CODE SEIGNEUR UNIQUE - Accès total sans authentification 5 niveaux
    LORD_CODE = os.getenv("LORD_CODE", "SENTINEL_LORD_2025_ULTRA_SECURE")
    LORD_CODE_HASH = os.getenv("LORD_CODE_HASH", "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890")
    
    # Configuration serveur
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "8000"))
    DEBUG = os.getenv("DEBUG", "true").lower() == "true"
    LOG_LEVEL = os.getenv("LOG_LEVEL", "DEBUG")
    
    # Configuration CORS
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
    
    # Configuration sécurité
    JWT_EXPIRY_HOURS = int(os.getenv("JWT_EXPIRY_HOURS", "1"))
    MAX_LOGIN_ATTEMPTS = int(os.getenv("MAX_LOGIN_ATTEMPTS", "5"))
    LOCKOUT_DURATION_MINUTES = int(os.getenv("LOCKOUT_DURATION_MINUTES", "15"))
    
    # Configuration modules
    ENABLE_BACKDOOR_DETECTION = os.getenv("ENABLE_BACKDOOR_DETECTION", "true").lower() == "true"
    ENABLE_NETWORK_ANALYSIS = os.getenv("ENABLE_NETWORK_ANALYSIS", "true").lower() == "true"
    ENABLE_ADVANCED_SCANNING = os.getenv("ENABLE_ADVANCED_SCANNING", "true").lower() == "true"
    
    @classmethod
    def get_cors_origins(cls) -> List[str]:
        """Retourne la liste des origines CORS autorisées"""
        if "*" in cls.ALLOWED_ORIGINS:
            return ["*"]
        return [origin.strip() for origin in cls.ALLOWED_ORIGINS if origin.strip()]
    
    @classmethod
    def validate(cls) -> bool:
        """Valide la configuration"""
        required_fields = [
            "SECRET_KEY", "MASTER_CODE", "BIOMETRIC_VOICE_HASH",
            "BIOMETRIC_FP_HASH", "SUPER_ADMIN_ID", "RED_BUTTON_PHRASE",
            "LORD_CODE", "LORD_CODE_HASH"
        ]
        
        for field in required_fields:
            if not getattr(cls, field):
                print(f"❌ Configuration invalide: {field} manquant")
                return False
        
        print("✅ Configuration Sentinel Zero validée")
        return True

# Instance globale de configuration
config = Config()

if __name__ == "__main__":
    # Test de la configuration
    print("🔧 Test de configuration Sentinel Zero")
    print("=" * 40)
    
    if config.validate():
        print(f"🌐 Serveur: {config.HOST}:{config.PORT}")
        print(f"🔐 Admin ID: {config.SUPER_ADMIN_ID}")
        print(f"🔑 Code maître: {config.MASTER_CODE}")
        print(f"🎤 Phrase vocale: {config.RED_BUTTON_PHRASE}")
        print(f"👑 Code seigneur: {config.LORD_CODE}")
        print(f"📡 CORS: {config.get_cors_origins()}")
    else:
        print("❌ Configuration invalide")
        exit(1) 