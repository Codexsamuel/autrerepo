import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import subprocess
import os
from PIL import Image, ImageTk
import cv2

class VideoEditorInterface:
    def __init__(self, root):
        self.root = root
        self.root.title("Interface d'Édition Vidéo IA")
        self.root.geometry("1200x800")
        
        # Variables
        self.selected_video = None
        self.preview_image = None
        
        # Style
        self.style = ttk.Style()
        self.style.configure("TButton", padding=10, font=('Helvetica', 12))
        self.style.configure("TLabel", font=('Helvetica', 12))
        
        # Frame principal avec deux colonnes
        self.main_frame = ttk.Frame(self.root, padding="20")
        self.main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Colonne gauche (contrôles)
        self.left_frame = ttk.Frame(self.main_frame)
        self.left_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=10)
        
        # Colonne droite (prévisualisation)
        self.right_frame = ttk.Frame(self.main_frame)
        self.right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=10)
        
        self.setup_left_column()
        self.setup_right_column()
        
    def setup_left_column(self):
        # Titre
        self.title_label = ttk.Label(
            self.left_frame,
            text="Sélectionnez votre éditeur vidéo",
            font=('Helvetica', 16, 'bold')
        )
        self.title_label.pack(pady=20)
        
        # Bouton d'importation
        self.import_btn = ttk.Button(
            self.left_frame,
            text="Importer une vidéo",
            command=self.import_video,
            width=20
        )
        self.import_btn.pack(pady=10)
        
        # Label pour le fichier sélectionné
        self.file_label = ttk.Label(
            self.left_frame,
            text="Aucun fichier sélectionné",
            font=('Helvetica', 10)
        )
        self.file_label.pack(pady=5)
        
        # Séparateur
        ttk.Separator(self.left_frame, orient='horizontal').pack(fill='x', pady=20)
        
        # Boutons pour chaque éditeur
        self.create_editor_buttons()
        
        # Zone de statut
        self.status_label = ttk.Label(
            self.left_frame,
            text="Prêt à éditer",
            font=('Helvetica', 10)
        )
        self.status_label.pack(pady=20)
        
    def setup_right_column(self):
        # Titre de la prévisualisation
        self.preview_title = ttk.Label(
            self.right_frame,
            text="Prévisualisation",
            font=('Helvetica', 14, 'bold')
        )
        self.preview_title.pack(pady=10)
        
        # Zone de prévisualisation
        self.preview_canvas = tk.Canvas(
            self.right_frame,
            width=640,
            height=360,
            bg='black'
        )
        self.preview_canvas.pack(pady=10)
        
        # Contrôles de prévisualisation
        self.preview_controls = ttk.Frame(self.right_frame)
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
        button_frame = ttk.Frame(self.left_frame)
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
    
    def import_video(self):
        file_path = filedialog.askopenfilename(
            filetypes=[
                ("Fichiers vidéo", "*.mp4 *.avi *.mov *.mkv"),
                ("Tous les fichiers", "*.*")
            ]
        )
        if file_path:
            self.selected_video = file_path
            self.file_label.config(text=f"Fichier sélectionné: {os.path.basename(file_path)}")
            self.update_preview()
    
    def update_preview(self):
        if self.selected_video:
            try:
                cap = cv2.VideoCapture(self.selected_video)
                ret, frame = cap.read()
                if ret:
                    # Convertir l'image de BGR à RGB
                    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    # Redimensionner l'image pour la prévisualisation
                    frame = cv2.resize(frame, (640, 360))
                    # Convertir en PhotoImage
                    image = Image.fromarray(frame)
                    self.preview_image = ImageTk.PhotoImage(image=image)
                    # Afficher l'image
                    self.preview_canvas.create_image(0, 0, anchor=tk.NW, image=self.preview_image)
                cap.release()
            except Exception as e:
                messagebox.showerror("Erreur", f"Impossible de charger la prévisualisation: {str(e)}")
    
    def play_preview(self):
        if self.selected_video:
            self.status_label.config(text="Lecture de la prévisualisation...")
            # Implémentation de la lecture à venir
    
    def pause_preview(self):
        if self.selected_video:
            self.status_label.config(text="Prévisualisation en pause")
            # Implémentation de la pause à venir
    
    def stop_preview(self):
        if self.selected_video:
            self.status_label.config(text="Prévisualisation arrêtée")
            # Implémentation de l'arrêt à venir
    
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
    app = VideoEditorInterface(root)
    root.mainloop() 