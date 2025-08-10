#!/usr/bin/env python3
"""
Module d'authentification biométrique avancée
Remplace les codes et hash par l'empreinte digitale
"""

import cv2
import numpy as np
from PIL import Image
import io
import base64
import hashlib
import json
import os
from typing import Dict, List, Tuple, Optional
from datetime import datetime
import logging

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BiometricFingerprintAuth:
    """Système d'authentification par empreinte digitale avancée"""
    
    def __init__(self, storage_path: str = "fingerprints/"):
        self.storage_path = storage_path
        self.minutiae_features = {}
        self.pattern_templates = {}
        self.quality_threshold = 0.7
        self.match_threshold = 0.85
        
        # Créer le dossier de stockage s'il n'existe pas
        os.makedirs(storage_path, exist_ok=True)
        
        # Charger les empreintes existantes
        self._load_existing_fingerprints()
    
    def _load_existing_fingerprints(self):
        """Charge les empreintes digitales existantes"""
        try:
            if os.path.exists(f"{self.storage_path}/fingerprints.json"):
                with open(f"{self.storage_path}/fingerprints.json", 'r') as f:
                    data = json.load(f)
                    self.minutiae_features = data.get('minutiae', {})
                    self.pattern_templates = data.get('patterns', {})
                logger.info(f"✅ {len(self.minutiae_features)} empreintes chargées")
        except Exception as e:
            logger.warning(f"⚠️ Impossible de charger les empreintes: {e}")
    
    def _save_fingerprints(self):
        """Sauvegarde les empreintes digitales"""
        try:
            data = {
                'minutiae': self.minutiae_features,
                'patterns': self.pattern_templates,
                'last_updated': datetime.now().isoformat()
            }
            with open(f"{self.storage_path}/fingerprints.json", 'w') as f:
                json.dump(data, f, indent=2)
            logger.info("✅ Empreintes sauvegardées")
        except Exception as e:
            logger.error(f"❌ Erreur sauvegarde: {e}")
    
    def extract_fingerprint_features(self, image_data: str) -> Dict[str, any]:
        """Extrait les caractéristiques d'une empreinte digitale"""
        try:
            # Décoder l'image base64
            if image_data.startswith('data:image'):
                image_data = image_data.split(',')[1]
            
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convertir en format OpenCV
            opencv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            gray = cv2.cvtColor(opencv_image, cv2.COLOR_BGR2GRAY)
            
            # Amélioration de l'image
            enhanced = self._enhance_fingerprint_image(gray)
            
            # Extraction des minutiae (caractéristiques uniques)
            minutiae = self._extract_minutiae(enhanced)
            
            # Extraction des patterns
            patterns = self._extract_patterns(enhanced)
            
            # Calcul de la qualité
            quality = self._calculate_quality(enhanced, minutiae)
            
            return {
                'minutiae': minutiae,
                'patterns': patterns,
                'quality': quality,
                'timestamp': datetime.now().isoformat(),
                'image_hash': hashlib.sha256(image_bytes).hexdigest()
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur extraction caractéristiques: {e}")
            return None
    
    def _enhance_fingerprint_image(self, gray_image: np.ndarray) -> np.ndarray:
        """Améliore la qualité de l'image d'empreinte"""
        try:
            # Normalisation
            normalized = cv2.normalize(gray_image, None, 0, 255, cv2.NORM_MINMAX)
            
            # Filtrage gaussien pour réduire le bruit
            blurred = cv2.GaussianBlur(normalized, (5, 5), 0)
            
            # Amélioration du contraste
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
            enhanced = clahe.apply(blurred)
            
            # Morphologie pour nettoyer l'image
            kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
            enhanced = cv2.morphologyEx(enhanced, cv2.MORPH_CLOSE, kernel)
            
            return enhanced
            
        except Exception as e:
            logger.error(f"❌ Erreur amélioration image: {e}")
            return gray_image
    
    def _extract_minutiae(self, enhanced_image: np.ndarray) -> List[Dict[str, any]]:
        """Extrait les minutiae (caractéristiques uniques)"""
        try:
            # Détection des contours
            edges = cv2.Canny(enhanced_image, 50, 150)
            
            # Détection des points d'intérêt
            corners = cv2.goodFeaturesToTrack(enhanced_image, 100, 0.01, 10)
            
            minutiae = []
            if corners is not None:
                for corner in corners:
                    x, y = corner.ravel()
                    minutiae.append({
                        'x': int(x),
                        'y': int(y),
                        'type': 'ridge_ending',
                        'angle': self._calculate_angle(enhanced_image, int(x), int(y))
                    })
            
            return minutiae
            
        except Exception as e:
            logger.error(f"❌ Erreur extraction minutiae: {e}")
            return []
    
    def _extract_patterns(self, enhanced_image: np.ndarray) -> Dict[str, any]:
        """Extrait les patterns de l'empreinte"""
        try:
            # Détection des lignes (ridges)
            lines = cv2.HoughLinesP(enhanced_image, 1, np.pi/180, 50, 
                                   minLineLength=30, maxLineGap=10)
            
            # Analyse des orientations
            orientations = self._analyze_orientations(enhanced_image)
            
            # Détection des boucles et arches
            patterns = {
                'lines': len(lines) if lines is not None else 0,
                'orientations': orientations,
                'density': self._calculate_density(enhanced_image),
                'symmetry': self._calculate_symmetry(enhanced_image)
            }
            
            return patterns
            
        except Exception as e:
            logger.error(f"❌ Erreur extraction patterns: {e}")
            return {}
    
    def _calculate_angle(self, image: np.ndarray, x: int, y: int) -> float:
        """Calcule l'angle d'orientation en un point"""
        try:
            if 0 < x < image.shape[1] - 1 and 0 < y < image.shape[0] - 1:
                dx = image[y, x+1] - image[y, x-1]
                dy = image[y+1, x] - image[y-1, x]
                return np.arctan2(dy, dx) * 180 / np.pi
            return 0.0
        except:
            return 0.0
    
    def _analyze_orientations(self, image: np.ndarray) -> Dict[str, float]:
        """Analyse les orientations dominantes"""
        try:
            # Calcul du gradient
            grad_x = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=3)
            grad_y = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=3)
            
            # Orientation
            orientation = np.arctan2(grad_y, grad_x) * 180 / np.pi
            
            # Histogramme des orientations
            hist, bins = np.histogram(orientation, bins=18, range=(-90, 90))
            
            return {
                'dominant_angle': bins[np.argmax(hist)],
                'angle_variance': np.var(orientation),
                'histogram': hist.tolist()
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur analyse orientations: {e}")
            return {}
    
    def _calculate_density(self, image: np.ndarray) -> float:
        """Calcule la densité des lignes"""
        try:
            # Seuillage pour détecter les lignes
            _, binary = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            
            # Densité = pixels blancs / total
            density = np.sum(binary > 0) / (image.shape[0] * image.shape[1])
            return float(density)
            
        except Exception as e:
            logger.error(f"❌ Erreur calcul densité: {e}")
            return 0.0
    
    def _calculate_symmetry(self, image: np.ndarray) -> float:
        """Calcule la symétrie de l'empreinte"""
        try:
            # Diviser l'image en deux
            mid = image.shape[1] // 2
            left = image[:, :mid]
            right = image[:, mid:2*mid]
            
            # Retourner la droite pour comparaison
            right_flipped = cv2.flip(right, 1)
            
            # Calculer la similarité
            if left.shape == right_flipped.shape:
                similarity = cv2.matchTemplate(left, right_flipped, cv2.TM_CCOEFF_NORMED)
                return float(similarity[0][0])
            
            return 0.0
            
        except Exception as e:
            logger.error(f"❌ Erreur calcul symétrie: {e}")
            return 0.0
    
    def _calculate_quality(self, image: np.ndarray, minutiae: List) -> float:
        """Calcule la qualité de l'empreinte"""
        try:
            # Facteurs de qualité
            contrast = np.std(image) / 255.0
            minutiae_count = len(minutiae)
            edge_strength = np.mean(cv2.Canny(image, 50, 150))
            
            # Score composite
            quality = (contrast * 0.4 + 
                      min(minutiae_count / 50.0, 1.0) * 0.3 + 
                      min(edge_strength / 255.0, 1.0) * 0.3)
            
            return min(quality, 1.0)
            
        except Exception as e:
            logger.error(f"❌ Erreur calcul qualité: {e}")
            return 0.0
    
    def register_fingerprint(self, user_id: str, image_data: str) -> Dict[str, any]:
        """Enregistre une nouvelle empreinte digitale"""
        try:
            # Vérifier que l'utilisateur n'a pas déjà une empreinte
            if user_id in self.minutiae_features:
                return {
                    'success': False,
                    'message': 'Utilisateur déjà enregistré',
                    'user_id': user_id
                }
            
            # Extraire les caractéristiques
            features = self.extract_fingerprint_features(image_data)
            if not features:
                return {
                    'success': False,
                    'message': 'Impossible d\'extraire les caractéristiques',
                    'user_id': user_id
                }
            
            # Vérifier la qualité
            if features['quality'] < self.quality_threshold:
                return {
                    'success': False,
                    'message': f'Qualité insuffisante: {features["quality"]:.2f}',
                    'user_id': user_id,
                    'quality': features['quality']
                }
            
            # Enregistrer l'empreinte
            self.minutiae_features[user_id] = features['minutiae']
            self.pattern_templates[user_id] = features['patterns']
            
            # Sauvegarder
            self._save_fingerprints()
            
            logger.info(f"✅ Empreinte enregistrée pour {user_id}")
            
            return {
                'success': True,
                'message': 'Empreinte enregistrée avec succès',
                'user_id': user_id,
                'quality': features['quality'],
                'minutiae_count': len(features['minutiae'])
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur enregistrement: {e}")
            return {
                'success': False,
                'message': f'Erreur: {str(e)}',
                'user_id': user_id
            }
    
    def verify_fingerprint(self, user_id: str, image_data: str) -> Dict[str, any]:
        """Vérifie une empreinte digitale"""
        try:
            # Vérifier que l'utilisateur est enregistré
            if user_id not in self.minutiae_features:
                return {
                    'success': False,
                    'message': 'Utilisateur non enregistré',
                    'user_id': user_id
                }
            
            # Extraire les caractéristiques de l'image de test
            test_features = self.extract_fingerprint_features(image_data)
            if not test_features:
                return {
                    'success': False,
                    'message': 'Impossible d\'extraire les caractéristiques',
                    'user_id': user_id
                }
            
            # Vérifier la qualité
            if test_features['quality'] < self.quality_threshold:
                return {
                    'success': False,
                    'message': f'Qualité insuffisante: {test_features["quality"]:.2f}',
                    'user_id': user_id
                }
            
            # Comparer avec l'empreinte enregistrée
            stored_minutiae = self.minutiae_features[user_id]
            stored_patterns = self.pattern_templates[user_id]
            
            # Score de correspondance des minutiae
            minutiae_score = self._compare_minutiae(test_features['minutiae'], stored_minutiae)
            
            # Score de correspondance des patterns
            pattern_score = self._compare_patterns(test_features['patterns'], stored_patterns)
            
            # Score global
            overall_score = (minutiae_score * 0.7 + pattern_score * 0.3)
            
            # Décision
            is_match = overall_score >= self.match_threshold
            
            logger.info(f"🔍 Vérification {user_id}: score={overall_score:.3f}, match={is_match}")
            
            return {
                'success': True,
                'is_match': is_match,
                'score': overall_score,
                'minutiae_score': minutiae_score,
                'pattern_score': pattern_score,
                'threshold': self.match_threshold,
                'user_id': user_id,
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur vérification: {e}")
            return {
                'success': False,
                'message': f'Erreur: {str(e)}',
                'user_id': user_id
            }
    
    def _compare_minutiae(self, test_minutiae: List, stored_minutiae: List) -> float:
        """Compare les minutiae entre deux empreintes"""
        try:
            if not test_minutiae or not stored_minutiae:
                return 0.0
            
            # Alignement et comparaison des minutiae
            matches = 0
            total_points = max(len(test_minutiae), len(stored_minutiae))
            
            for test_point in test_minutiae:
                for stored_point in stored_minutiae:
                    # Distance euclidienne
                    distance = np.sqrt((test_point['x'] - stored_point['x'])**2 + 
                                     (test_point['y'] - stored_point['y'])**2)
                    
                    # Tolérance de position
                    if distance < 20:  # 20 pixels de tolérance
                        # Vérifier l'angle
                        angle_diff = abs(test_point['angle'] - stored_point['angle'])
                        if angle_diff < 30:  # 30 degrés de tolérance
                            matches += 1
                            break
            
            return matches / total_points if total_points > 0 else 0.0
            
        except Exception as e:
            logger.error(f"❌ Erreur comparaison minutiae: {e}")
            return 0.0
    
    def _compare_patterns(self, test_patterns: Dict, stored_patterns: Dict) -> float:
        """Compare les patterns entre deux empreintes"""
        try:
            if not test_patterns or not stored_patterns:
                return 0.0
            
            # Comparaison des caractéristiques
            score = 0.0
            total_features = 0
            
            # Densité
            if 'density' in test_patterns and 'density' in stored_patterns:
                density_diff = abs(test_patterns['density'] - stored_patterns['density'])
                score += max(0, 1.0 - density_diff * 10)  # Normalisation
                total_features += 1
            
            # Symétrie
            if 'symmetry' in test_patterns and 'symmetry' in stored_patterns:
                symmetry_diff = abs(test_patterns['symmetry'] - stored_patterns['symmetry'])
                score += max(0, 1.0 - symmetry_diff)
                total_features += 1
            
            # Orientations
            if 'orientations' in test_patterns and 'orientations' in stored_patterns:
                test_orient = test_patterns['orientations']
                stored_orient = stored_patterns['orientations']
                
                if 'dominant_angle' in test_orient and 'dominant_angle' in stored_orient:
                    angle_diff = abs(test_orient['dominant_angle'] - stored_orient['dominant_angle'])
                    score += max(0, 1.0 - angle_diff / 90.0)  # Normalisation sur 90°
                    total_features += 1
            
            return score / total_features if total_features > 0 else 0.0
            
        except Exception as e:
            logger.error(f"❌ Erreur comparaison patterns: {e}")
            return 0.0
    
    def get_user_fingerprint_info(self, user_id: str) -> Dict[str, any]:
        """Récupère les informations d'empreinte d'un utilisateur"""
        try:
            if user_id not in self.minutiae_features:
                return {
                    'success': False,
                    'message': 'Utilisateur non trouvé',
                    'user_id': user_id
                }
            
            return {
                'success': True,
                'user_id': user_id,
                'minutiae_count': len(self.minutiae_features[user_id]),
                'patterns': self.pattern_templates[user_id],
                'registered': True
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur récupération info: {e}")
            return {
                'success': False,
                'message': f'Erreur: {str(e)}',
                'user_id': user_id
            }
    
    def delete_fingerprint(self, user_id: str) -> Dict[str, any]:
        """Supprime l'empreinte d'un utilisateur"""
        try:
            if user_id not in self.minutiae_features:
                return {
                    'success': False,
                    'message': 'Utilisateur non trouvé',
                    'user_id': user_id
                }
            
            # Supprimer les données
            del self.minutiae_features[user_id]
            del self.pattern_templates[user_id]
            
            # Sauvegarder
            self._save_fingerprints()
            
            logger.info(f"🗑️ Empreinte supprimée pour {user_id}")
            
            return {
                'success': True,
                'message': 'Empreinte supprimée avec succès',
                'user_id': user_id
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur suppression: {e}")
            return {
                'success': False,
                'message': f'Erreur: {str(e)}',
                'user_id': user_id
            }
    
    def list_registered_users(self) -> List[str]:
        """Liste tous les utilisateurs enregistrés"""
        return list(self.minutiae_features.keys())
    
    def get_system_stats(self) -> Dict[str, any]:
        """Récupère les statistiques du système"""
        try:
            total_users = len(self.minutiae_features)
            total_minutiae = sum(len(minutiae) for minutiae in self.minutiae_features.values())
            
            return {
                'total_users': total_users,
                'total_minutiae': total_minutiae,
                'average_minutiae_per_user': total_minutiae / total_users if total_users > 0 else 0,
                'quality_threshold': self.quality_threshold,
                'match_threshold': self.match_threshold,
                'storage_path': self.storage_path,
                'last_updated': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur statistiques: {e}")
            return {} 