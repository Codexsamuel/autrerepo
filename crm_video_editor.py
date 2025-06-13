import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import subprocess
import os
from PIL import Image, ImageTk
import cv2
import json
from datetime import datetime

class CRMVideoEditor:
    def __init__(self, root):
        self.root = root
        self.root.title("CRM - Éditeur Vidéo")
        self.root.geometry("1400x800")
        
        # Variables
        self.selected_video = None
        self.preview_image = None
        self.projects = []
        self.current_project = None
        
        # Charger les projets existants
        self.load_projects()
        
        # Style
        self.style = ttk.Style()
        self.style.configure("TButton", padding=10, font=('Helvetica', 12))
        self.style.configure("TLabel", font=('Helvetica', 12))
        
        # Frame principal avec trois colonnes
        self.main_frame = ttk.Frame(self.root, padding="20")
        self.main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Colonne gauche (CRM)
        self.crm_frame = ttk.Frame(self.main_frame)
        self.crm_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=10)
        
        # Colonne centrale (contrôles vidéo)
        self.controls_frame = ttk.Frame(self.main_frame)
        self.controls_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=10)
        
        # Colonne droite (prévisualisation)
        self.preview_frame = ttk.Frame(self.main_frame)
        self.preview_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=10)
        
        self.setup_crm_column()
        self.setup_controls_column()
        self.setup_preview_column()
        
    def setup_crm_column(self):
        # Titre CRM
        self.crm_title = ttk.Label(
            self.crm_frame,
            text="Gestion des Projets",
            font=('Helvetica', 16, 'bold')
        )
        self.crm_title.pack(pady=10)
        
        # Bouton Nouveau Projet
        self.new_project_btn = ttk.Button(
            self.crm_frame,
            text="Nouveau Projet",
            command=self.create_new_project,
            width=20
        )
        self.new_project_btn.pack(pady=5)
        
        # Liste des projets
        self.projects_frame = ttk.LabelFrame(self.crm_frame, text="Projets", padding="10")
        self.projects_frame.pack(fill=tk.BOTH, expand=True, pady=10)
        
        self.projects_list = tk.Listbox(
            self.projects_frame,
            font=('Helvetica', 11),
            selectmode=tk.SINGLE
        )
        self.projects_list.pack(fill=tk.BOTH, expand=True)
        self.projects_list.bind('<<ListboxSelect>>', self.on_project_select)
        
        # Détails du projet
        self.project_details = ttk.LabelFrame(self.crm_frame, text="Détails du Projet", padding="10")
        self.project_details.pack(fill=tk.BOTH, expand=True, pady=10)
        
        # Champs de détails
        self.project_name_var = tk.StringVar()
        self.project_client_var = tk.StringVar()
        self.project_status_var = tk.StringVar()
        
        ttk.Label(self.project_details, text="Nom:").pack(anchor='w')
        ttk.Entry(self.project_details, textvariable=self.project_name_var).pack(fill='x', pady=2)
        
        ttk.Label(self.project_details, text="Client:").pack(anchor='w')
        ttk.Entry(self.project_details, textvariable=self.project_client_var).pack(fill='x', pady=2)
        
        ttk.Label(self.project_details, text="Statut:").pack(anchor='w')
        self.status_combo = ttk.Combobox(
            self.project_details,
            textvariable=self.project_status_var,
            values=["En attente", "En cours", "Terminé", "Livré"]
        )
        self.status_combo.pack(fill='x', pady=2)
        
        # Bouton de sauvegarde
        self.save_project_btn = ttk.Button(
            self.project_details,
            text="Sauvegarder",
            command=self.save_project,
            width=20
        )
        self.save_project_btn.pack(pady=10)
        
    def setup_controls_column(self):
        # Titre des contrôles
        self.controls_title = ttk.Label(
            self.controls_frame,
            text="Édition Vidéo",
            font=('Helvetica', 16, 'bold')
        )
        self.controls_title.pack(pady=10)
        
        # Bouton d'importation
        self.import_btn = ttk.Button(
            self.controls_frame,
            text="Importer une vidéo",
            command=self.import_video,
            width=20
        )
        self.import_btn.pack(pady=10)
        
        # Label pour le fichier sélectionné
        self.file_label = ttk.Label(
            self.controls_frame,
            text="Aucun fichier sélectionné",
            font=('Helvetica', 10)
        )
        self.file_label.pack(pady=5)
        
        # Séparateur
        ttk.Separator(self.controls_frame, orient='horizontal').pack(fill='x', pady=20)
        
        # Boutons pour chaque éditeur
        self.create_editor_buttons()
        
        # Zone de statut
        self.status_label = ttk.Label(
            self.controls_frame,
            text="Prêt à éditer",
            font=('Helvetica', 10)
        )
        self.status_label.pack(pady=20)
        
    def setup_preview_column(self):
        # Titre de la prévisualisation
        self.preview_title = ttk.Label(
            self.preview_frame,
            text="Prévisualisation",
            font=('Helvetica', 14, 'bold')
        )
        self.preview_title.pack(pady=10)
        
        # Zone de prévisualisation
        self.preview_canvas = tk.Canvas(
            self.preview_frame,
            width=640,
            height=360,
            bg='black'
        )
        self.preview_canvas.pack(pady=10)
        
        # Contrôles de prévisualisation
        self.preview_controls = ttk.Frame(self.preview_frame)
        self.preview_controls.pack(pady=10)
        
        self.play_btn = ttk.Button(
            self.preview_controls,
            text="▶",
            command=self.play_preview,
            width=3
        )
        self.play_btn.pack(side=tk.LEFT, padx=5)
        
        self.pause_btn = ttk.Button(
            self.preview_controls,
            text="⏸",
            command=self.pause_preview,
            width=3
        )
        self.pause_btn.pack(side=tk.LEFT, padx=5)
        
        self.stop_btn = ttk.Button(
            self.preview_controls,
            text="⏹",
            command=self.stop_preview,
            width=3
        )
        self.stop_btn.pack(side=tk.LEFT, padx=5)
        
    def create_editor_buttons(self):
        # Frame pour les boutons
        button_frame = ttk.Frame(self.controls_frame)
        button_frame.pack(pady=20)
        
        # Bouton CapCut
        self.capcut_btn = ttk.Button(
            button_frame,
            text="CapCut",
            command=self.open_capcut,
            width=20
        )
        self.capcut_btn.pack(pady=10)
        
        # Bouton Canva
        self.canva_btn = ttk.Button(
            button_frame,
            text="Canva",
            command=self.open_canva,
            width=20
        )
        self.canva_btn.pack(pady=10)
        
        # Bouton Adobe
        self.adobe_btn = ttk.Button(
            button_frame,
            text="Adobe Premiere Pro",
            command=self.open_adobe,
            width=20
        )
        self.adobe_btn.pack(pady=10)
    
    def create_new_project(self):
        self.current_project = {
            'id': len(self.projects) + 1,
            'name': f"Nouveau Projet {len(self.projects) + 1}",
            'client': "",
            'status': "En attente",
            'created_at': datetime.now().isoformat(),
            'video_path': None
        }
        self.projects.append(self.current_project)
        self.update_projects_list()
        self.load_project_details(self.current_project)
    
    def save_project(self):
        if self.current_project:
            self.current_project['name'] = self.project_name_var.get()
            self.current_project['client'] = self.project_client_var.get()
            self.current_project['status'] = self.project_status_var.get()
            self.save_projects()
            self.update_projects_list()
            messagebox.showinfo("Succès", "Projet sauvegardé avec succès")
    
    def load_projects(self):
        try:
            if os.path.exists('projects.json'):
                with open('projects.json', 'r') as f:
                    self.projects = json.load(f)
        except Exception as e:
            messagebox.showerror("Erreur", f"Impossible de charger les projets: {str(e)}")
    
    def save_projects(self):
        try:
            with open('projects.json', 'w') as f:
                json.dump(self.projects, f, indent=4)
        except Exception as e:
            messagebox.showerror("Erreur", f"Impossible de sauvegarder les projets: {str(e)}")
    
    def update_projects_list(self):
        self.projects_list.delete(0, tk.END)
        for project in self.projects:
            self.projects_list.insert(tk.END, f"{project['name']} - {project['client']}")
    
    def on_project_select(self, event):
        selection = self.projects_list.curselection()
        if selection:
            index = selection[0]
            self.current_project = self.projects[index]
            self.load_project_details(self.current_project)
    
    def load_project_details(self, project):
        self.project_name_var.set(project['name'])
        self.project_client_var.set(project['client'])
        self.project_status_var.set(project['status'])
        if project.get('video_path'):
            self.selected_video = project['video_path']
            self.file_label.config(text=f"Fichier: {os.path.basename(project['video_path'])}")
            self.update_preview()
    
    def import_video(self):
        if not self.current_project:
            messagebox.showwarning("Attention", "Veuillez d'abord créer ou sélectionner un projet")
            return
            
        file_path = filedialog.askopenfilename(
            filetypes=[
                ("Fichiers vidéo", "*.mp4 *.avi *.mov *.mkv"),
                ("Tous les fichiers", "*.*")
            ]
        )
        if file_path:
            self.selected_video = file_path
            self.current_project['video_path'] = file_path
            self.file_label.config(text=f"Fichier: {os.path.basename(file_path)}")
            self.update_preview()
            self.save_projects()
    
    def update_preview(self):
        if self.selected_video:
            try:
                cap = cv2.VideoCapture(self.selected_video)
                ret, frame = cap.read()
                if ret:
                    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    frame = cv2.resize(frame, (640, 360))
                    image = Image.fromarray(frame)
                    self.preview_image = ImageTk.PhotoImage(image=image)
                    self.preview_canvas.create_image(0, 0, anchor=tk.NW, image=self.preview_image)
                cap.release()
            except Exception as e:
                messagebox.showerror("Erreur", f"Impossible de charger la prévisualisation: {str(e)}")
    
    def play_preview(self):
        if self.selected_video:
            self.status_label.config(text="Lecture de la prévisualisation...")
    
    def pause_preview(self):
        if self.selected_video:
            self.status_label.config(text="Prévisualisation en pause")
    
    def stop_preview(self):
        if self.selected_video:
            self.status_label.config(text="Prévisualisation arrêtée")
    
    def open_capcut(self):
        try:
            capcut_path = "/Applications/CapCut.app"
            if os.path.exists(capcut_path):
                subprocess.Popen(["open", capcut_path])
                self.status_label.config(text="Ouverture de CapCut...")
            else:
                messagebox.showerror("Erreur", "CapCut n'est pas installé sur votre système")
        except Exception as e:
            messagebox.showerror("Erreur", f"Impossible d'ouvrir CapCut: {str(e)}")
    
    def open_canva(self):
        try:
            subprocess.Popen(["open", "https://www.canva.com"])
            self.status_label.config(text="Ouverture de Canva...")
        except Exception as e:
            messagebox.showerror("Erreur", f"Impossible d'ouvrir Canva: {str(e)}")
    
    def open_adobe(self):
        try:
            adobe_path = "/Applications/Adobe Premiere Pro 2024/Adobe Premiere Pro 2024.app"
            if os.path.exists(adobe_path):
                subprocess.Popen(["open", adobe_path])
                self.status_label.config(text="Ouverture d'Adobe Premiere Pro...")
            else:
                messagebox.showerror("Erreur", "Adobe Premiere Pro n'est pas installé sur votre système")
        except Exception as e:
            messagebox.showerror("Erreur", f"Impossible d'ouvrir Adobe Premiere Pro: {str(e)}")

if __name__ == "__main__":
    root = tk.Tk()
    app = CRMVideoEditor(root)
    root.mainloop() 