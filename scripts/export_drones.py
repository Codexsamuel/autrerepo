"""
DL Drones - Export Automatique GLB/GLTF
=======================================

Ce script exporte automatiquement les modèles 3D des drones en formats web-compatibles.
Usage: Exécuter après avoir généré les drones avec blender_drone_generator.py

Auteur: DL Solutions
Version: 1.0
"""

import bpy
import os
from datetime import datetime

def export_drone_models():
    """Exporte les modèles de drones en GLB/GLTF"""
    
    # Créer le dossier d'export
    export_dir = "exports"
    if not os.path.exists(export_dir):
        os.makedirs(export_dir)
    
    # Timestamp pour les noms de fichiers
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Exporter le Sentinel V1
    print("Export du Sentinel V1...")
    
    # Sélectionner tous les objets du groupe Sentinel_V1
    bpy.ops.object.select_all(action='DESELECT')
    if "Sentinel_V1" in bpy.data.groups:
        for obj in bpy.data.groups["Sentinel_V1"].objects:
            obj.select_set(True)
    
    # Exporter en GLB
    sentinel_glb_path = os.path.join(export_dir, f"sentinel_v1_{timestamp}.glb")
    bpy.ops.export_scene.gltf(
        filepath=sentinel_glb_path,
        export_format='GLB',
        use_selection=True,
        export_materials='EXPORT',
        export_textures=True,
        export_animations=False
    )
    
    # Exporter en GLTF
    sentinel_gltf_path = os.path.join(export_dir, f"sentinel_v1_{timestamp}.gltf")
    bpy.ops.export_scene.gltf(
        filepath=sentinel_gltf_path,
        export_format='GLTF_SEPARATE',
        use_selection=True,
        export_materials='EXPORT',
        export_textures=True,
        export_animations=False
    )
    
    # Exporter l'Atlas X1
    print("Export de l'Atlas X1...")
    
    # Sélectionner tous les objets du groupe Atlas_X1
    bpy.ops.object.select_all(action='DESELECT')
    if "Atlas_X1" in bpy.data.groups:
        for obj in bpy.data.groups["Atlas_X1"].objects:
            obj.select_set(True)
    
    # Exporter en GLB
    atlas_glb_path = os.path.join(export_dir, f"atlas_x1_{timestamp}.glb")
    bpy.ops.export_scene.gltf(
        filepath=atlas_glb_path,
        export_format='GLB',
        use_selection=True,
        export_materials='EXPORT',
        export_textures=True,
        export_animations=False
    )
    
    # Exporter en GLTF
    atlas_gltf_path = os.path.join(export_dir, f"atlas_x1_{timestamp}.gltf")
    bpy.ops.export_scene.gltf(
        filepath=atlas_gltf_path,
        export_format='GLTF_SEPARATE',
        use_selection=True,
        export_materials='EXPORT',
        export_textures=True,
        export_animations=False
    )
    
    # Exporter la scène complète
    print("Export de la scène complète...")
    bpy.ops.object.select_all(action='SELECT')
    
    scene_glb_path = os.path.join(export_dir, f"dl_drones_complete_{timestamp}.glb")
    bpy.ops.export_scene.gltf(
        filepath=scene_glb_path,
        export_format='GLB',
        use_selection=False,
        export_materials='EXPORT',
        export_textures=True,
        export_animations=False
    )
    
    print(f"=== Export terminé! ===")
    print(f"Fichiers créés dans le dossier '{export_dir}':")
    print(f"- {os.path.basename(sentinel_glb_path)}")
    print(f"- {os.path.basename(sentinel_gltf_path)}")
    print(f"- {os.path.basename(atlas_glb_path)}")
    print(f"- {os.path.basename(atlas_gltf_path)}")
    print(f"- {os.path.basename(scene_glb_path)}")
    
    return {
        'sentinel_glb': sentinel_glb_path,
        'sentinel_gltf': sentinel_gltf_path,
        'atlas_glb': atlas_glb_path,
        'atlas_gltf': atlas_gltf_path,
        'complete_glb': scene_glb_path
    }

if __name__ == "__main__":
    export_drone_models() 