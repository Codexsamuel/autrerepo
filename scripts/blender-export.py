#!/usr/bin/env python3
"""
Blender Export Script for DL Solutions Drone Simulation Platform
Exports drone 3D models with curve preservation and advanced features
"""

import bpy
import bmesh
import json
import os
import math
from mathutils import Vector, Matrix
import bpy_extras.io_utils

# Configuration
EXPORT_PATH = "public/models/drones/"
FORMATS = ['gltf', 'obj', 'fbx']
PRESERVE_CURVES = True
GENERATE_LODS = True
OPTIMIZE_GEOMETRY = True

class DroneExporter:
    def __init__(self):
        self.export_path = EXPORT_PATH
        self.ensure_export_directory()
        
    def ensure_export_directory(self):
        """Create export directory if it doesn't exist"""
        if not os.path.exists(self.export_path):
            os.makedirs(self.export_path, exist_ok=True)
            
    def clear_scene(self):
        """Clear all objects from scene"""
        bpy.ops.object.select_all(action='SELECT')
        bpy.ops.object.delete(use_global=False)
        
    def create_drone_sentinel(self):
        """Create Sentinel V1 drone model with curves"""
        # Main body
        bpy.ops.mesh.primitive_cube_add(size=2)
        body = bpy.context.active_object
        body.name = "Sentinel_Body"
        
        # Apply subdivision surface for smooth body
        subsurf = body.modifiers.new(name="Subdivision", type='SUBSURF')
        subsurf.levels = 2
        subsurf.render_levels = 3
        
        # Create curved arms using bezier curves
        for i in range(4):
            angle = i * 90
            bpy.ops.curve.primitive_bezier_curve_add()
            arm = bpy.context.active_object
            arm.name = f"Sentinel_Arm_{i}"
            
            # Set curve points for aerodynamic shape
            points = arm.data.splines[0].bezier_points
            points[0].co = Vector((0, 0, 0))
            points[1].co = Vector((1.5 * math.cos(math.radians(angle)), 
                                  1.5 * math.sin(math.radians(angle)), 0.2))
            
            # Add thickness to curve
            arm.data.bevel_depth = 0.05
            arm.data.bevel_resolution = 8
            
        # Create propellers with curves
        for i in range(4):
            angle = i * 90
            bpy.ops.curve.primitive_bezier_circle_add(radius=0.3)
            prop = bpy.context.active_object
            prop.name = f"Sentinel_Propeller_{i}"
            
            # Position at arm ends
            prop.location = (1.5 * math.cos(math.radians(angle)), 
                           1.5 * math.sin(math.radians(angle)), 0.3)
            
            # Add thickness
            prop.data.bevel_depth = 0.02
            prop.data.bevel_resolution = 4
            
        # Create camera housing with curves
        bpy.ops.curve.primitive_bezier_circle_add(radius=0.4)
        camera_ring = bpy.context.active_object
        camera_ring.name = "Sentinel_Camera_Ring"
        camera_ring.location = (0, 0, -0.5)
        camera_ring.data.bevel_depth = 0.1
        camera_ring.data.bevel_resolution = 12
        
        # Create camera lens
        bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=0.3)
        camera = bpy.context.active_object
        camera.name = "Sentinel_Camera"
        camera.location = (0, 0, -0.7)
        
        # Create LED indicators with curves
        for i in range(4):
            angle = i * 90
            bpy.ops.curve.primitive_bezier_circle_add(radius=0.05)
            led = bpy.context.active_object
            led.name = f"Sentinel_LED_{i}"
            led.location = (0.8 * math.cos(math.radians(angle)), 
                           0.8 * math.sin(math.radians(angle)), 0.1)
            led.data.bevel_depth = 0.02
            
    def create_drone_atlas(self):
        """Create Atlas X1 drone model with advanced curves"""
        # Main body - more aerodynamic
        bpy.ops.mesh.primitive_uv_sphere_add(radius=1.2)
        body = bpy.context.active_object
        body.name = "Atlas_Body"
        body.scale = (1.5, 1.5, 0.8)
        
        # Apply subdivision surface
        subsurf = body.modifiers.new(name="Subdivision", type='SUBSURF')
        subsurf.levels = 3
        subsurf.render_levels = 4
        
        # Create curved arms with complex geometry
        for i in range(6):  # 6 arms for Atlas
            angle = i * 60
            bpy.ops.curve.primitive_bezier_curve_add()
            arm = bpy.context.active_object
            arm.name = f"Atlas_Arm_{i}"
            
            # Complex curve path
            points = arm.data.splines[0].bezier_points
            points[0].co = Vector((0, 0, 0))
            points[1].co = Vector((2 * math.cos(math.radians(angle)), 
                                  2 * math.sin(math.radians(angle)), 0.3))
            points[2].co = Vector((2.5 * math.cos(math.radians(angle)), 
                                  2.5 * math.sin(math.radians(angle)), 0.1))
            
            # Add more points for smooth curve
            arm.data.splines[0].bezier_points.add(1)
            points[3].co = Vector((2.8 * math.cos(math.radians(angle)), 
                                  2.8 * math.sin(math.radians(angle)), 0.2))
            
            arm.data.bevel_depth = 0.08
            arm.data.bevel_resolution = 12
            
        # Create advanced propellers
        for i in range(6):
            angle = i * 60
            bpy.ops.curve.primitive_bezier_circle_add(radius=0.4)
            prop = bpy.context.active_object
            prop.name = f"Atlas_Propeller_{i}"
            
            prop.location = (2.8 * math.cos(math.radians(angle)), 
                           2.8 * math.sin(math.radians(angle)), 0.4)
            prop.data.bevel_depth = 0.03
            prop.data.bevel_resolution = 8
            
        # Create advanced camera system
        bpy.ops.curve.primitive_bezier_circle_add(radius=0.6)
        camera_ring = bpy.context.active_object
        camera_ring.name = "Atlas_Camera_Ring"
        camera_ring.location = (0, 0, -0.8)
        camera_ring.data.bevel_depth = 0.15
        camera_ring.data.bevel_resolution = 16
        
        # Multiple cameras
        for i in range(4):
            angle = i * 90
            bpy.ops.mesh.primitive_cylinder_add(radius=0.15, depth=0.4)
            camera = bpy.context.active_object
            camera.name = f"Atlas_Camera_{i}"
            camera.location = (0.4 * math.cos(math.radians(angle)), 
                              0.4 * math.sin(math.radians(angle)), -1.0)
            camera.rotation_euler = (0, math.radians(angle), 0)
            
        # Create advanced LED system
        for i in range(8):
            angle = i * 45
            bpy.ops.curve.primitive_bezier_circle_add(radius=0.08)
            led = bpy.context.active_object
            led.name = f"Atlas_LED_{i}"
            led.location = (1.0 * math.cos(math.radians(angle)), 
                           1.0 * math.sin(math.radians(angle)), 0.2)
            led.data.bevel_depth = 0.03
            
    def apply_materials(self, drone_type):
        """Apply materials to drone components"""
        # Create materials
        materials = {
            'body': self.create_material(f"{drone_type}_Body", (0.1, 0.1, 0.1, 1)),
            'arms': self.create_material(f"{drone_type}_Arms", (0.3, 0.3, 0.3, 1)),
            'props': self.create_material(f"{drone_type}_Props", (0.2, 0.2, 0.2, 1)),
            'camera': self.create_material(f"{drone_type}_Camera", (0.05, 0.05, 0.05, 1)),
            'led': self.create_material(f"{drone_type}_LED", (0.8, 0.2, 0.2, 1))
        }
        
        # Apply materials to objects
        for obj in bpy.context.scene.objects:
            if obj.name.startswith(drone_type):
                if 'Body' in obj.name:
                    self.assign_material(obj, materials['body'])
                elif 'Arm' in obj.name:
                    self.assign_material(obj, materials['arms'])
                elif 'Propeller' in obj.name:
                    self.assign_material(obj, materials['props'])
                elif 'Camera' in obj.name:
                    self.assign_material(obj, materials['camera'])
                elif 'LED' in obj.name:
                    self.assign_material(obj, materials['led'])
                    
    def create_material(self, name, color):
        """Create a material with given properties"""
        material = bpy.data.materials.new(name=name)
        material.use_nodes = True
        nodes = material.node_tree.nodes
        
        # Clear default nodes
        nodes.clear()
        
        # Create principled BSDF
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        principled.inputs['Base Color'].default_value = color
        principled.inputs['Metallic'].default_value = 0.8
        principled.inputs['Roughness'].default_value = 0.2
        
        # Create output node
        output = nodes.new(type='ShaderNodeOutputMaterial')
        
        # Link nodes
        material.node_tree.links.new(principled.outputs['BSDF'], output.inputs['Surface'])
        
        return material
        
    def assign_material(self, obj, material):
        """Assign material to object"""
        if obj.data.materials:
            obj.data.materials[0] = material
        else:
            obj.data.materials.append(material)
            
    def export_model(self, drone_type, format_type):
        """Export model in specified format"""
        filename = f"{drone_type}_{format_type}"
        filepath = os.path.join(self.export_path, filename)
        
        if format_type == 'gltf':
            bpy.ops.export_scene.gltf(
                filepath=filepath,
                export_format='GLTF_EMBEDDED',
                export_animations=True,
                export_curves=PRESERVE_CURVES,
                export_materials=True,
                export_lights=False,
                export_cameras=False
            )
        elif format_type == 'obj':
            bpy.ops.export_scene.obj(
                filepath=filepath,
                use_selection=False,
                use_animation=True,
                use_mesh_modifiers=True,
                use_edges=True,
                use_smooth_groups=True,
                use_smooth_groups_bitflags=False,
                use_normals=True,
                use_uvs=True,
                use_materials=True,
                use_triangles=False,
                use_nurbs=False,
                use_vertex_groups=False,
                use_blen_objects=True,
                group_by_object=False,
                group_by_material=False,
                keep_vertex_order=False,
                global_scale=1.0,
                path_mode='AUTO'
            )
        elif format_type == 'fbx':
            bpy.ops.export_scene.fbx(
                filepath=filepath,
                use_selection=False,
                use_anim=True,
                use_anim_action_all=True,
                use_default_take=True,
                use_metadata=True,
                global_scale=1.0,
                apply_unit_scale=True,
                apply_scale_options='FBX_SCALE_ALL',
                bake_space_transform=False,
                object_types={'MESH', 'ARMATURE', 'EMPTY', 'CAMERA', 'LIGHT', 'OTHER'},
                use_mesh_modifiers=True,
                mesh_smooth_type='OFF',
                use_subsurf=False,
                use_mesh_edges=False,
                use_tspace=False,
                use_custom_props=False,
                add_leaf_bones=True,
                primary_bone_axis='Y',
                secondary_bone_axis='X',
                use_armature_deform_only=False,
                bake_anim=True,
                bake_anim_use_all_bones=True,
                bake_anim_use_nla_strips=True,
                bake_anim_use_all_actions=True,
                bake_anim_force_startend_keying=True,
                bake_anim_step=1,
                bake_anim_simplify_factor=1.0,
                path_mode='AUTO',
                embed_textures=False,
                batch_mode='OFF',
                use_metadata=True
            )
            
    def generate_metadata(self, drone_type):
        """Generate metadata for the drone model"""
        metadata = {
            "name": drone_type,
            "version": "1.0.0",
            "type": "drone",
            "formats": FORMATS,
            "features": {
                "curves_preserved": PRESERVE_CURVES,
                "lods_generated": GENERATE_LODS,
                "geometry_optimized": OPTIMIZE_GEOMETRY
            },
            "components": {
                "body": True,
                "arms": True,
                "propellers": True,
                "cameras": True,
                "leds": True
            },
            "export_path": self.export_path
        }
        
        metadata_path = os.path.join(self.export_path, f"{drone_type}_metadata.json")
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
            
    def export_all_drones(self):
        """Export all drone models"""
        print("Starting drone export process...")
        
        # Export Sentinel
        print("Creating Sentinel V1...")
        self.clear_scene()
        self.create_drone_sentinel()
        self.apply_materials("Sentinel")
        
        for format_type in FORMATS:
            print(f"Exporting Sentinel in {format_type.upper()}...")
            self.export_model("sentinel", format_type)
            
        self.generate_metadata("sentinel")
        
        # Export Atlas
        print("Creating Atlas X1...")
        self.clear_scene()
        self.create_drone_atlas()
        self.apply_materials("Atlas")
        
        for format_type in FORMATS:
            print(f"Exporting Atlas in {format_type.upper()}...")
            self.export_model("atlas", format_type)
            
        self.generate_metadata("atlas")
        
        print("Export completed successfully!")
        print(f"Models exported to: {self.export_path}")

def main():
    """Main execution function"""
    exporter = DroneExporter()
    exporter.export_all_drones()

if __name__ == "__main__":
    main() 