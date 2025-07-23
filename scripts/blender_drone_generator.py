"""
DL Drones - Générateur de Modèles 3D Blender
============================================

Ce script génère automatiquement les modèles 3D complets des drones :
- Sentinel V1 (drone militaire tactique)
- Atlas X1 (drone industriel)

Usage dans Blender :
1. Ouvrir Blender
2. Aller dans l'éditeur de texte
3. Charger ce script
4. Exécuter le script
5. Les drones seront créés dans la scène

Auteur: DL Solutions
Version: 1.0
"""

import bpy
import bmesh
import math
import mathutils
from mathutils import Vector, Matrix

# Nettoyer la scène
def clear_scene():
    """Nettoie la scène Blender"""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

# Créer un matériau
def create_material(name, color, metallic=0.0, roughness=0.5):
    """Crée un matériau avec les propriétés spécifiées"""
    material = bpy.data.materials.new(name=name)
    material.use_nodes = True
    nodes = material.node_tree.nodes
    nodes.clear()
    
    # Nœud de sortie
    output = nodes.new(type='ShaderNodeOutputMaterial')
    output.location = (300, 0)
    
    # Nœud Principled BSDF
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.location = (0, 0)
    principled.inputs['Base Color'].default_value = color
    principled.inputs['Metallic'].default_value = metallic
    principled.inputs['Roughness'].default_value = roughness
    
    # Connecter les nœuds
    material.node_tree.links.new(principled.outputs['BSDF'], output.inputs['Surface'])
    
    return material

# Créer un cylindre avec des paramètres
def create_cylinder(name, radius, height, location=(0,0,0), rotation=(0,0,0)):
    """Crée un cylindre avec les paramètres spécifiés"""
    bpy.ops.mesh.primitive_cylinder_add(
        radius=radius,
        depth=height,
        location=location,
        rotation=rotation
    )
    cylinder = bpy.context.active_object
    cylinder.name = name
    return cylinder

# Créer une boîte avec des paramètres
def create_box(name, size, location=(0,0,0), rotation=(0,0,0)):
    """Crée une boîte avec les paramètres spécifiés"""
    bpy.ops.mesh.primitive_cube_add(
        size=1,
        location=location,
        rotation=rotation
    )
    box = bpy.context.active_object
    box.name = name
    box.scale = size
    return box

# Créer une sphère avec des paramètres
def create_sphere(name, radius, location=(0,0,0)):
    """Crée une sphère avec les paramètres spécifiés"""
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=radius,
        location=location
    )
    sphere = bpy.context.active_object
    sphere.name = name
    return sphere

# Créer un groupe pour organiser les objets
def create_group(name, objects):
    """Crée un groupe et y ajoute les objets"""
    group = bpy.data.groups.new(name)
    for obj in objects:
        group.objects.link(obj)
    return group

# ============================================================================
# SENTINEL V1 - DRONE MILITAIRE TACTIQUE
# ============================================================================

def create_sentinel_v1():
    """Crée le drone militaire Sentinel V1 complet"""
    print("Création du Sentinel V1...")
    
    sentinel_parts = []
    
    # 1. Corps principal (design furtif angulaire)
    body = create_box("Sentinel_Body", (0.4, 0.4, 0.12), (0, 0, 0.06))
    body_material = create_material("Sentinel_Body_Material", (0.02, 0.02, 0.02, 1), 0.8, 0.2)
    body.data.materials.append(body_material)
    sentinel_parts.append(body)
    
    # 2. Bras articulés (4 bras)
    arm_positions = [
        (0.25, 0.25, 0.06),   # Avant-droite
        (-0.25, 0.25, 0.06),  # Avant-gauche
        (0.25, -0.25, 0.06),  # Arrière-droite
        (-0.25, -0.25, 0.06)  # Arrière-gauche
    ]
    
    arms = []
    for i, pos in enumerate(arm_positions):
        arm = create_cylinder(f"Sentinel_Arm_{i+1}", 0.02, 0.3, pos, (0, 0, 0))
        arm_material = create_material(f"Sentinel_Arm_Material_{i+1}", (0.1, 0.1, 0.1, 1), 0.9, 0.1)
        arm.data.materials.append(arm_material)
        arms.append(arm)
        sentinel_parts.append(arm)
    
    # 3. Moteurs brushless (4 moteurs)
    motor_positions = [
        (0.35, 0.35, 0.06),   # Avant-droite
        (-0.35, 0.35, 0.06),  # Avant-gauche
        (0.35, -0.35, 0.06),  # Arrière-droite
        (-0.35, -0.35, 0.06)  # Arrière-gauche
    ]
    
    motors = []
    for i, pos in enumerate(motor_positions):
        motor = create_cylinder(f"Sentinel_Motor_{i+1}", 0.03, 0.04, pos, (0, 0, 0))
        motor_material = create_material(f"Sentinel_Motor_Material_{i+1}", (0.2, 0.2, 0.2, 1), 0.9, 0.1)
        motor.data.materials.append(motor_material)
        motors.append(motor)
        sentinel_parts.append(motor)
    
    # 4. Hélices tactiques (4 hélices)
    propeller_positions = [
        (0.35, 0.35, 0.08),   # Avant-droite
        (-0.35, 0.35, 0.08),  # Avant-gauche
        (0.35, -0.35, 0.08),  # Arrière-droite
        (-0.35, -0.35, 0.08)  # Arrière-gauche
    ]
    
    propellers = []
    for i, pos in enumerate(propeller_positions):
        # Créer une hélice simple (disque fin)
        bpy.ops.mesh.primitive_cylinder_add(radius=0.08, depth=0.005, location=pos)
        propeller = bpy.context.active_object
        propeller.name = f"Sentinel_Propeller_{i+1}"
        propeller_material = create_material(f"Sentinel_Propeller_Material_{i+1}", (0.8, 0.8, 0.8, 1), 0.1, 0.8)
        propeller.data.materials.append(propeller_material)
        propellers.append(propeller)
        sentinel_parts.append(propeller)
    
    # 5. Caméra thermique frontale
    camera = create_box("Sentinel_Camera", (0.06, 0.06, 0.04), (0.23, 0, 0.06), (0, 0, 0))
    camera_material = create_material("Sentinel_Camera_Material", (0.1, 0.1, 0.1, 1), 0.7, 0.3)
    camera.data.materials.append(camera_material)
    sentinel_parts.append(camera)
    
    # 6. Module IA (boîte noire sur le dessus)
    ai_module = create_box("Sentinel_AI_Module", (0.15, 0.15, 0.05), (0, 0, 0.085), (0, 0, 0))
    ai_material = create_material("Sentinel_AI_Material", (0.05, 0.05, 0.05, 1), 0.8, 0.2)
    ai_module.data.materials.append(ai_material)
    sentinel_parts.append(ai_module)
    
    # 7. Batterie LiPo (sous le corps)
    battery = create_box("Sentinel_Battery", (0.25, 0.15, 0.04), (0, 0, 0.02), (0, 0, 0))
    battery_material = create_material("Sentinel_Battery_Material", (0.1, 0.1, 0.1, 1), 0.1, 0.8)
    battery.data.materials.append(battery_material)
    sentinel_parts.append(battery)
    
    # 8. Antennes GPS et communication
    antenna_positions = [
        (0.1, 0.2, 0.085),    # GPS
        (-0.1, 0.2, 0.085)    # Communication
    ]
    
    antennas = []
    for i, pos in enumerate(antenna_positions):
        antenna = create_cylinder(f"Sentinel_Antenna_{i+1}", 0.005, 0.1, pos, (0, 0, 0))
        antenna_material = create_material(f"Sentinel_Antenna_Material_{i+1}", (0.8, 0.8, 0.8, 1), 0.9, 0.1)
        antenna.data.materials.append(antenna_material)
        antennas.append(antenna)
        sentinel_parts.append(antenna)
    
    # 9. Système de charge explosive (crochets sous le drone)
    explosive_hooks = []
    hook_positions = [
        (0.05, 0, 0.01),      # Crochet avant
        (-0.05, 0, 0.01)      # Crochet arrière
    ]
    
    for i, pos in enumerate(hook_positions):
        hook = create_box(f"Sentinel_Explosive_Hook_{i+1}", (0.02, 0.02, 0.02), pos, (0, 0, 0))
        hook_material = create_material(f"Sentinel_Hook_Material_{i+1}", (0.3, 0.3, 0.3, 1), 0.9, 0.1)
        hook.data.materials.append(hook_material)
        explosive_hooks.append(hook)
        sentinel_parts.append(hook)
    
    # 10. LED tactiques
    led_positions = [
        (0.2, 0.2, 0.085),    # LED avant-droite
        (-0.2, 0.2, 0.085),   # LED avant-gauche
        (0.2, -0.2, 0.085),   # LED arrière-droite
        (-0.2, -0.2, 0.085)   # LED arrière-gauche
    ]
    
    leds = []
    for i, pos in enumerate(led_positions):
        led = create_sphere(f"Sentinel_LED_{i+1}", 0.01, pos)
        led_material = create_material(f"Sentinel_LED_Material_{i+1}", (1, 0, 0, 1), 0.0, 0.0)
        led.data.materials.append(led_material)
        leds.append(led)
        sentinel_parts.append(led)
    
    # Créer le groupe Sentinel V1
    sentinel_group = create_group("Sentinel_V1", sentinel_parts)
    
    print("Sentinel V1 créé avec succès!")
    return sentinel_parts

# ============================================================================
# ATLAS X1 - DRONE INDUSTRIEL
# ============================================================================

def create_atlas_x1():
    """Crée le drone industriel Atlas X1 complet"""
    print("Création de l'Atlas X1...")
    
    atlas_parts = []
    
    # 1. Corps principal (plus grand et robuste)
    body = create_box("Atlas_Body", (0.5, 0.5, 0.15), (0, 0, 0.075))
    body_material = create_material("Atlas_Body_Material", (0.8, 0.8, 0.8, 1), 0.1, 0.7)
    body.data.materials.append(body_material)
    atlas_parts.append(body)
    
    # 2. Bras articulés (4 bras plus épais)
    arm_positions = [
        (0.3, 0.3, 0.075),    # Avant-droite
        (-0.3, 0.3, 0.075),   # Avant-gauche
        (0.3, -0.3, 0.075),   # Arrière-droite
        (-0.3, -0.3, 0.075)   # Arrière-gauche
    ]
    
    arms = []
    for i, pos in enumerate(arm_positions):
        arm = create_cylinder(f"Atlas_Arm_{i+1}", 0.025, 0.35, pos, (0, 0, 0))
        arm_material = create_material(f"Atlas_Arm_Material_{i+1}", (0.7, 0.7, 0.7, 1), 0.2, 0.6)
        arm.data.materials.append(arm_material)
        arms.append(arm)
        atlas_parts.append(arm)
    
    # 3. Moteurs industriels (4 moteurs plus puissants)
    motor_positions = [
        (0.4, 0.4, 0.075),    # Avant-droite
        (-0.4, 0.4, 0.075),   # Avant-gauche
        (0.4, -0.4, 0.075),   # Arrière-droite
        (-0.4, -0.4, 0.075)   # Arrière-gauche
    ]
    
    motors = []
    for i, pos in enumerate(motor_positions):
        motor = create_cylinder(f"Atlas_Motor_{i+1}", 0.04, 0.05, pos, (0, 0, 0))
        motor_material = create_material(f"Atlas_Motor_Material_{i+1}", (0.3, 0.3, 0.3, 1), 0.8, 0.2)
        motor.data.materials.append(motor_material)
        motors.append(motor)
        atlas_parts.append(motor)
    
    # 4. Hélices doubles (8 hélices au total - 2 par bras)
    propeller_positions = [
        (0.4, 0.4, 0.1),      # Avant-droite haut
        (0.4, 0.4, 0.05),     # Avant-droite bas
        (-0.4, 0.4, 0.1),     # Avant-gauche haut
        (-0.4, 0.4, 0.05),    # Avant-gauche bas
        (0.4, -0.4, 0.1),     # Arrière-droite haut
        (0.4, -0.4, 0.05),    # Arrière-droite bas
        (-0.4, -0.4, 0.1),    # Arrière-gauche haut
        (-0.4, -0.4, 0.05)    # Arrière-gauche bas
    ]
    
    propellers = []
    for i, pos in enumerate(propeller_positions):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.1, depth=0.005, location=pos)
        propeller = bpy.context.active_object
        propeller.name = f"Atlas_Propeller_{i+1}"
        propeller_material = create_material(f"Atlas_Propeller_Material_{i+1}", (0.9, 0.9, 0.9, 1), 0.1, 0.8)
        propeller.data.materials.append(propeller_material)
        propellers.append(propeller)
        atlas_parts.append(propeller)
    
    # 5. Réservoir de pulvérisation (cylindre transparent)
    tank = create_cylinder("Atlas_Spray_Tank", 0.15, 0.2, (0, 0, 0.15), (0, 0, 0))
    tank_material = create_material("Atlas_Tank_Material", (0.2, 0.8, 0.2, 0.3), 0.0, 0.1)
    tank.data.materials.append(tank_material)
    atlas_parts.append(tank)
    
    # 6. Pompe de pulvérisation
    pump = create_cylinder("Atlas_Pump", 0.03, 0.08, (0, 0, 0.25), (0, 0, 0))
    pump_material = create_material("Atlas_Pump_Material", (0.2, 0.2, 0.2, 1), 0.8, 0.2)
    pump.data.materials.append(pump_material)
    atlas_parts.append(pump)
    
    # 7. Caméra 4K stabilisée
    camera = create_box("Atlas_Camera", (0.08, 0.08, 0.06), (0.29, 0, 0.075), (0, 0, 0))
    camera_material = create_material("Atlas_Camera_Material", (0.1, 0.1, 0.1, 1), 0.7, 0.3)
    camera.data.materials.append(camera_material)
    atlas_parts.append(camera)
    
    # 8. Capteur de sol (sous le drone)
    soil_sensor = create_cylinder("Atlas_Soil_Sensor", 0.05, 0.03, (0, 0, 0.02), (0, 0, 0))
    sensor_material = create_material("Atlas_Sensor_Material", (0.1, 0.1, 0.1, 1), 0.8, 0.2)
    soil_sensor.data.materials.append(sensor_material)
    atlas_parts.append(soil_sensor)
    
    # 9. Batterie industrielle (plus grande)
    battery = create_box("Atlas_Battery", (0.3, 0.2, 0.06), (0, 0, 0.03), (0, 0, 0))
    battery_material = create_material("Atlas_Battery_Material", (0.1, 0.1, 0.1, 1), 0.1, 0.8)
    battery.data.materials.append(battery_material)
    atlas_parts.append(battery)
    
    # 10. Module GPS et communication
    gps_module = create_box("Atlas_GPS_Module", (0.12, 0.12, 0.04), (0, 0, 0.095), (0, 0, 0))
    gps_material = create_material("Atlas_GPS_Material", (0.2, 0.2, 0.2, 1), 0.6, 0.4)
    gps_module.data.materials.append(gps_material)
    atlas_parts.append(gps_module)
    
    # 11. Antennes
    antenna_positions = [
        (0.15, 0.25, 0.095),  # GPS
        (-0.15, 0.25, 0.095), # Communication
        (0, 0.25, 0.095)      # Télécommande
    ]
    
    antennas = []
    for i, pos in enumerate(antenna_positions):
        antenna = create_cylinder(f"Atlas_Antenna_{i+1}", 0.005, 0.12, pos, (0, 0, 0))
        antenna_material = create_material(f"Atlas_Antenna_Material_{i+1}", (0.8, 0.8, 0.8, 1), 0.9, 0.1)
        antenna.data.materials.append(antenna_material)
        antennas.append(antenna)
        atlas_parts.append(antenna)
    
    # 12. Support médical (crochet pour transport)
    medical_hook = create_box("Atlas_Medical_Hook", (0.04, 0.04, 0.04), (0, 0, 0.01), (0, 0, 0))
    hook_material = create_material("Atlas_Medical_Hook_Material", (0.8, 0.2, 0.2, 1), 0.8, 0.2)
    medical_hook.data.materials.append(hook_material)
    atlas_parts.append(medical_hook)
    
    # Créer le groupe Atlas X1
    atlas_group = create_group("Atlas_X1", atlas_parts)
    
    print("Atlas X1 créé avec succès!")
    return atlas_parts

# ============================================================================
# FONCTION PRINCIPALE
# ============================================================================

def main():
    """Fonction principale qui crée les deux drones"""
    print("=== DL Drones - Générateur de Modèles 3D ===")
    print("Création des drones Sentinel V1 et Atlas X1...")
    
    # Nettoyer la scène
    clear_scene()
    
    # Créer le Sentinel V1 (positionné à gauche)
    sentinel_parts = create_sentinel_v1()
    for part in sentinel_parts:
        part.location.x -= 1.0  # Déplacer vers la gauche
    
    # Créer l'Atlas X1 (positionné à droite)
    atlas_parts = create_atlas_x1()
    for part in atlas_parts:
        part.location.x += 1.0  # Déplacer vers la droite
    
    # Configurer la caméra
    bpy.ops.object.camera_add(location=(0, -3, 2), rotation=(math.radians(60), 0, 0))
    camera = bpy.context.active_object
    camera.name = "DL_Drones_Camera"
    
    # Configurer l'éclairage
    bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
    sun = bpy.context.active_object
    sun.name = "DL_Drones_Sun"
    sun.data.energy = 5.0
    
    # Ajouter un éclairage d'appoint
    bpy.ops.object.light_add(type='AREA', location=(0, 0, 3))
    area_light = bpy.context.active_object
    area_light.name = "DL_Drones_Area_Light"
    area_light.data.energy = 100.0
    area_light.data.size = 5.0
    
    # Définir la caméra comme caméra active
    bpy.context.scene.camera = camera
    
    # Configurer le rendu
    bpy.context.scene.render.engine = 'CYCLES'
    bpy.context.scene.cycles.samples = 128
    
    print("=== Création terminée avec succès! ===")
    print("Les drones sont maintenant dans la scène Blender.")
    print("Vous pouvez les exporter en .glb/.gltf pour utilisation web.")

# Exécuter le script si appelé directement
if __name__ == "__main__":
    main() 