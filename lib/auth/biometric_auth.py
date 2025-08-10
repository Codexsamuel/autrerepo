#!/usr/bin/env python3
"""
Module d'authentification biométrique par empreintes digitales
Gère l'enregistrement, la vérification et la gestion des empreintes
"""

import os
import json
import logging
import hashlib
import numpy as np
from typing import Dict, List, Optional, Any, Tuple
from datetime import datetime
import cv2
from PIL import Image
import pickle

logger = logging.getLogger(__name__)

class BiometricFingerprintAuth:
    """Gestionnaire d'authentification biométrique par empreintes digitales"""
    
    def __init__(self, storage_path: str = "data/fingerprints"):
        self.storage_path = storage_path
        self.minutiae_threshold = 0.75
        self.quality_threshold = 0.6
        
        # Créer le répertoire de stockage s'il n'existe pas
        os.makedirs(storage_path, exist_ok=True)
        
        # Charger la base de données des empreintes
        self.fingerprint_db = self._load_fingerprint_database()
        
        logger.info("🔐 Système d'authentification biométrique initialisé")
    
    def register_fingerprint(self, user_id: str, fingerprint_image: str) -> Dict[str, Any]:
        """Enregistre une nouvelle empreinte digitale"""
        try:
            logger.info(f"📝 Enregistrement empreinte pour {user_id}")
            
            # Extraire les caractéristiques biométriques
            minutiae_features = self._extract_minutiae_features(fingerprint_image)
            if not minutiae_features['success']:
                return minutiae_features
            
            # Calculer le hash de l'empreinte
            fingerprint_hash = self._calculate_fingerprint_hash(fingerprint_image)
            
            # Préparer les données d'enregistrement
            fingerprint_data = {
                'user_id': user_id,
                'hash': fingerprint_hash,
                'minutiae': minutiae_features['minutiae'],
                'quality_score': minutiae_features['quality_score'],
                'registration_date': datetime.now().isoformat(),
                'last_used': None,
                'usage_count': 0
            }
            
            # Sauvegarder l'empreinte
            filename = f"{user_id}_{fingerprint_hash[:8]}.json"
            filepath = os.path.join(self.storage_path, filename)
            
            with open(filepath, 'w') as f:
                json.dump(fingerprint_data, f, indent=2)
            
            # Mettre à jour la base de données en mémoire
            self.fingerprint_db[user_id] = {
                'filename': filename,
                'hash': fingerprint_hash,
                'minutiae_count': len(minutiae_features['minutiae']),
                'quality_score': minutiae_features['quality_score']
            }
            
            # Sauvegarder la base de données
            self._save_fingerprint_database()
            
            logger.info(f"✅ Empreinte enregistrée pour {user_id}")
            
            return {
                'success': True,
                'message': 'Empreinte enregistrée avec succès',
                'user_id': user_id,
                'minutiae_count': len(minutiae_features['minutiae']),
                'quality_score': minutiae_features['quality_score'],
                'filename': filename
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur enregistrement empreinte: {e}")
            return {
                'success': False,
                'message': f'Erreur système: {str(e)}',
                'user_id': user_id
            }
    
    def verify_fingerprint(self, user_id: str, fingerprint_image: str) -> Dict[str, Any]:
        """Vérifie une empreinte digitale contre la base de données"""
        try:
            logger.info(f"🔍 Vérification empreinte pour {user_id}")
            
            # Vérifier que l'utilisateur est enregistré
            if user_id not in self.fingerprint_db:
                return {
                    'success': False,
                    'message': 'Utilisateur non enregistré',
                    'user_id': user_id
                }
            
            # Extraire les caractéristiques de l'empreinte à vérifier
            input_minutiae = self._extract_minutiae_features(fingerprint_image)
            if not input_minutiae['success']:
                return input_minutiae
            
            # Charger l'empreinte enregistrée
            stored_fingerprint = self._load_user_fingerprint(user_id)
            if not stored_fingerprint['success']:
                return stored_fingerprint
            
            # Comparer les empreintes
            match_score = self._compare_fingerprints(
                input_minutiae['minutiae'],
                stored_fingerprint['minutiae']
            )
            
            # Déterminer si c'est une correspondance
            is_match = match_score >= self.minutiae_threshold
            
            # Mettre à jour les statistiques d'utilisation
            if is_match:
                self._update_usage_stats(user_id)
            
            logger.info(f"🔍 Score de correspondance: {match_score:.3f} (seuil: {self.minutiae_threshold})")
            
            return {
                'success': True,
                'is_match': is_match,
                'score': match_score,
                'threshold': self.minutiae_threshold,
                'user_id': user_id,
                'minutiae_count': len(input_minutiae['minutiae'])
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur vérification empreinte: {e}")
            return {
                'success': False,
                'message': f'Erreur système: {str(e)}',
                'user_id': user_id
            }
    
    def get_user_fingerprint_info(self, user_id: str) -> Dict[str, Any]:
        """Récupère les informations d'empreinte d'un utilisateur"""
        try:
            if user_id not in self.fingerprint_db:
                return {
                    'success': False,
                    'message': 'Utilisateur non trouvé',
                    'user_id': user_id
                }
            
            stored_fingerprint = self._load_user_fingerprint(user_id)
            if not stored_fingerprint['success']:
                return stored_fingerprint
            
            return {
                'success': True,
                'user_id': user_id,
                'registration_date': stored_fingerprint['registration_date'],
                'last_used': stored_fingerprint['last_used'],
                'usage_count': stored_fingerprint['usage_count'],
                'quality_score': stored_fingerprint['quality_score'],
                'minutiae_count': len(stored_fingerprint['minutiae'])
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur récupération info empreinte: {e}")
            return {
                'success': False,
                'message': f'Erreur système: {str(e)}',
                'user_id': user_id
            }
    
    def delete_fingerprint(self, user_id: str) -> Dict[str, Any]:
        """Supprime l'empreinte d'un utilisateur"""
        try:
            if user_id not in self.fingerprint_db:
                return {
                    'success': False,
                    'message': 'Utilisateur non trouvé',
                    'user_id': user_id
                }
            
            # Supprimer le fichier d'empreinte
            filename = self.fingerprint_db[user_id]['filename']
            filepath = os.path.join(self.storage_path, filename)
            
            if os.path.exists(filepath):
                os.remove(filepath)
                logger.info(f"🗑️ Fichier empreinte supprimé: {filename}")
            
            # Supprimer de la base de données
            del self.fingerprint_db[user_id]
            self._save_fingerprint_database()
            
            return {
                'success': True,
                'message': 'Empreinte supprimée avec succès',
                'user_id': user_id
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur suppression empreinte: {e}")
            return {
                'success': False,
                'message': f'Erreur système: {str(e)}',
                'user_id': user_id
            }
    
    def list_registered_users(self) -> List[str]:
        """Liste tous les utilisateurs enregistrés"""
        return list(self.fingerprint_db.keys())
    
    def get_system_stats(self) -> Dict[str, Any]:
        """Récupère les statistiques du système biométrique"""
        try:
            total_users = len(self.fingerprint_db)
            total_minutiae = sum(user_data['minutiae_count'] for user_data in self.fingerprint_db.values())
            avg_quality = np.mean([user_data['quality_score'] for user_data in self.fingerprint_db.values()]) if total_users > 0 else 0
            
            return {
                'total_registered_users': total_users,
                'total_minutiae_points': total_minutiae,
                'average_quality_score': round(avg_quality, 3),
                'storage_path': self.storage_path,
                'minutiae_threshold': self.minutiae_threshold,
                'quality_threshold': self.quality_threshold,
                'database_size': len(self.fingerprint_db),
                'last_updated': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur statistiques système: {e}")
            return {
                'error': str(e),
                'system_status': 'error'
            }
    
    def _extract_minutiae_features(self, fingerprint_image: str) -> Dict[str, Any]:
        """Extrait les caractéristiques minutiae d'une empreinte digitale"""
        try:
            # Convertir l'image en format OpenCV
            if fingerprint_image.startswith('data:image'):
                # Image encodée en base64
                import base64
                header, encoded = fingerprint_image.split(",", 1)
                image_data = base64.b64decode(encoded)
                nparr = np.frombuffer(image_data, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
            else:
                # Chemin de fichier
                img = cv2.imread(fingerprint_image, cv2.IMREAD_GRAYSCALE)
            
            if img is None:
                return {
                    'success': False,
                    'message': 'Impossible de charger l\'image',
                    'error': 'Image invalide'
                }
            
            # Prétraitement de l'image
            img = self._preprocess_fingerprint_image(img)
            
            # Extraction des minutiae
            minutiae = self._detect_minutiae(img)
            
            # Calcul du score de qualité
            quality_score = self._calculate_quality_score(img, minutiae)
            
            return {
                'success': True,
                'minutiae': minutiae,
                'quality_score': quality_score,
                'image_shape': img.shape
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur extraction minutiae: {e}")
            return {
                'success': False,
                'message': f'Erreur extraction: {str(e)}',
                'error': str(e)
            }
    
    def _preprocess_fingerprint_image(self, img: np.ndarray) -> np.ndarray:
        """Prétraite l'image d'empreinte pour améliorer la qualité"""
        try:
            # Normalisation
            img = cv2.equalizeHist(img)
            
            # Filtrage gaussien pour réduire le bruit
            img = cv2.GaussianBlur(img, (5, 5), 0)
            
            # Amélioration du contraste
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
            img = clahe.apply(img)
            
            # Binarisation adaptative
            img = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
            
            return img
            
        except Exception as e:
            logger.error(f"❌ Erreur prétraitement image: {e}")
            return img
    
    def _detect_minutiae(self, img: np.ndarray) -> List[Dict[str, Any]]:
        """Détecte les points minutiae dans l'image d'empreinte"""
        try:
            minutiae = []
            
            # Détection des contours
            contours, _ = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            for contour in contours:
                # Filtrer les contours trop petits
                if cv2.contourArea(contour) < 50:
                    continue
                
                # Calculer les propriétés du contour
                M = cv2.moments(contour)
                if M["m00"] != 0:
                    cx = int(M["m10"] / M["m00"])
                    cy = int(M["m01"] / M["m00"])
                    
                    # Déterminer le type de minutiae
                    minutiae_type = self._classify_minutiae_type(contour)
                    
                    minutiae.append({
                        'x': cx,
                        'y': cy,
                        'type': minutiae_type,
                        'area': cv2.contourArea(contour),
                        'perimeter': cv2.arcLength(contour, True)
                    })
            
            return minutiae
            
        except Exception as e:
            logger.error(f"❌ Erreur détection minutiae: {e}")
            return []
    
    def _classify_minutiae_type(self, contour: np.ndarray) -> str:
        """Classifie le type de minutiae basé sur la forme du contour"""
        try:
            # Approximation du contour
            epsilon = 0.02 * cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, epsilon, True)
            
            # Classification basée sur le nombre de points
            if len(approx) == 3:
                return 'bifurcation'
            elif len(approx) == 4:
                return 'ending'
            elif len(approx) > 4:
                return 'island'
            else:
                return 'unknown'
                
        except Exception as e:
            logger.error(f"❌ Erreur classification minutiae: {e}")
            return 'unknown'
    
    def _calculate_quality_score(self, img: np.ndarray, minutiae: List[Dict[str, Any]]) -> float:
        """Calcule un score de qualité pour l'empreinte"""
        try:
            if not minutiae:
                return 0.0
            
            # Score basé sur le nombre de minutiae
            minutiae_score = min(len(minutiae) / 20.0, 1.0)
            
            # Score basé sur la netteté de l'image
            laplacian_var = cv2.Laplacian(img, cv2.CV_64F).var()
            sharpness_score = min(laplacian_var / 1000.0, 1.0)
            
            # Score basé sur le contraste
            contrast_score = img.std() / 128.0
            
            # Score composite
            quality_score = (minutiae_score * 0.4 + sharpness_score * 0.3 + contrast_score * 0.3)
            
            return round(quality_score, 3)
            
        except Exception as e:
            logger.error(f"❌ Erreur calcul score qualité: {e}")
            return 0.0
    
    def _compare_fingerprints(self, minutiae1: List[Dict[str, Any]], minutiae2: List[Dict[str, Any]]) -> float:
        """Compare deux ensembles de minutiae et retourne un score de similarité"""
        try:
            if not minutiae1 or not minutiae2:
                return 0.0
            
            # Calculer les distances entre tous les points
            distances = []
            for m1 in minutiae1:
                for m2 in minutiae2:
                    # Distance euclidienne
                    dist = np.sqrt((m1['x'] - m2['x'])**2 + (m1['y'] - m2['y'])**2)
                    
                    # Bonus si les types correspondent
                    type_bonus = 0.1 if m1['type'] == m2['type'] else 0.0
                    
                    # Score de correspondance (plus la distance est petite, plus le score est élevé)
                    score = max(0, 1.0 - dist / 100.0) + type_bonus
                    distances.append(score)
            
            if not distances:
                return 0.0
            
            # Retourner le score moyen des meilleures correspondances
            distances.sort(reverse=True)
            top_matches = distances[:min(len(minutiae1), len(minutiae2))]
            
            return round(np.mean(top_matches), 3)
            
        except Exception as e:
            logger.error(f"❌ Erreur comparaison empreintes: {e}")
            return 0.0
    
    def _calculate_fingerprint_hash(self, fingerprint_image: str) -> str:
        """Calcule un hash unique pour l'empreinte digitale"""
        try:
            # Utiliser le contenu de l'image pour générer un hash
            if fingerprint_image.startswith('data:image'):
                import base64
                header, encoded = fingerprint_image.split(",", 1)
                image_data = base64.b64decode(encoded)
            else:
                with open(fingerprint_image, 'rb') as f:
                    image_data = f.read()
            
            # Générer un hash SHA-256
            return hashlib.sha256(image_data).hexdigest()
            
        except Exception as e:
            logger.error(f"❌ Erreur calcul hash empreinte: {e}")
            # Hash de fallback basé sur l'horodatage
            return hashlib.sha256(f"fallback_{datetime.now().isoformat()}".encode()).hexdigest()
    
    def _load_user_fingerprint(self, user_id: str) -> Dict[str, Any]:
        """Charge l'empreinte enregistrée d'un utilisateur"""
        try:
            if user_id not in self.fingerprint_db:
                return {
                    'success': False,
                    'message': 'Utilisateur non trouvé',
                    'user_id': user_id
                }
            
            filename = self.fingerprint_db[user_id]['filename']
            filepath = os.path.join(self.storage_path, filename)
            
            if not os.path.exists(filepath):
                return {
                    'success': False,
                    'message': 'Fichier empreinte introuvable',
                    'user_id': user_id
                }
            
            with open(filepath, 'r') as f:
                fingerprint_data = json.load(f)
            
            return {
                'success': True,
                **fingerprint_data
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur chargement empreinte: {e}")
            return {
                'success': False,
                'message': f'Erreur système: {str(e)}',
                'user_id': user_id
            }
    
    def _update_usage_stats(self, user_id: str):
        """Met à jour les statistiques d'utilisation d'une empreinte"""
        try:
            if user_id not in self.fingerprint_db:
                return
            
            filename = self.fingerprint_db[user_id]['filename']
            filepath = os.path.join(self.storage_path, filename)
            
            if os.path.exists(filepath):
                with open(filepath, 'r') as f:
                    fingerprint_data = json.load(f)
                
                # Mettre à jour les statistiques
                fingerprint_data['last_used'] = datetime.now().isoformat()
                fingerprint_data['usage_count'] += 1
                
                with open(filepath, 'w') as f:
                    json.dump(fingerprint_data, f, indent=2)
                
                logger.debug(f"📊 Statistiques mises à jour pour {user_id}")
                
        except Exception as e:
            logger.error(f"❌ Erreur mise à jour statistiques: {e}")
    
    def _load_fingerprint_database(self) -> Dict[str, Any]:
        """Charge la base de données des empreintes depuis le disque"""
        try:
            db_file = os.path.join(self.storage_path, 'fingerprint_database.json')
            
            if os.path.exists(db_file):
                with open(db_file, 'r') as f:
                    return json.load(f)
            else:
                return {}
                
        except Exception as e:
            logger.error(f"❌ Erreur chargement base de données: {e}")
            return {}
    
    def _save_fingerprint_database(self):
        """Sauvegarde la base de données des empreintes sur le disque"""
        try:
            db_file = os.path.join(self.storage_path, 'fingerprint_database.json')
            
            with open(db_file, 'w') as f:
                json.dump(self.fingerprint_db, f, indent=2)
            
            logger.debug("💾 Base de données empreintes sauvegardée")
            
        except Exception as e:
            logger.error(f"❌ Erreur sauvegarde base de données: {e}") 