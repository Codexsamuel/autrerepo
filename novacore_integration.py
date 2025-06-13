import tkinter as tk
from tkinter import ttk
from crm_video_editor import CRMVideoEditor
from crm_integrations import CRMIntegrations

class NovaCoreIntegration:
    def __init__(self, root):
        self.root = root
        self.root.title("NovaCore - Hub Central")
        self.root.geometry("1600x900")
        
        # Style
        self.style = ttk.Style()
        self.style.configure("TButton", padding=10, font=('Helvetica', 12))
        self.style.configure("TLabel", font=('Helvetica', 12))
        
        # Frame principal
        self.main_frame = ttk.Frame(self.root, padding="20")
        self.main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Barre latérale
        self.sidebar = ttk.Frame(self.main_frame, width=200)
        self.sidebar.pack(side=tk.LEFT, fill=tk.Y, padx=10)
        
        # Zone de contenu principal
        self.content_frame = ttk.Frame(self.main_frame)
        self.content_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=10)
        
        self.setup_sidebar()
        self.setup_welcome_screen()
        
    def setup_sidebar(self):
        # Logo NovaCore
        self.logo_label = ttk.Label(
            self.sidebar,
            text="NovaCore",
            font=('Helvetica', 20, 'bold')
        )
        self.logo_label.pack(pady=20)
        
        # Boutons de navigation
        self.create_nav_button("Tableau de bord", self.show_dashboard)
        self.create_nav_button("CRM Vidéo", self.show_video_crm)
        self.create_nav_button("Intégrations CRM", self.show_crm_integrations)
        self.create_nav_button("Projets", self.show_projects)
        self.create_nav_button("Clients", self.show_clients)
        self.create_nav_button("Rapports", self.show_reports)
        self.create_nav_button("Paramètres", self.show_settings)
        
    def create_nav_button(self, text, command):
        btn = ttk.Button(
            self.sidebar,
            text=text,
            command=command,
            width=20
        )
        btn.pack(pady=5)
        
    def setup_welcome_screen(self):
        # Nettoyer le contenu précédent
        for widget in self.content_frame.winfo_children():
            widget.destroy()
            
        # Titre de bienvenue
        welcome_label = ttk.Label(
            self.content_frame,
            text="Bienvenue dans NovaCore",
            font=('Helvetica', 24, 'bold')
        )
        welcome_label.pack(pady=20)
        
        # Description
        desc_label = ttk.Label(
            self.content_frame,
            text="Votre hub central pour la gestion de projets et l'édition vidéo",
            font=('Helvetica', 14)
        )
        desc_label.pack(pady=10)
        
        # Statistiques rapides
        stats_frame = ttk.LabelFrame(self.content_frame, text="Statistiques", padding="20")
        stats_frame.pack(fill=tk.X, pady=20)
        
        # Grille de statistiques
        stats_grid = ttk.Frame(stats_frame)
        stats_grid.pack(fill=tk.X, expand=True)
        
        self.create_stat_box(stats_grid, "Projets en cours", "12", 0, 0)
        self.create_stat_box(stats_grid, "Clients actifs", "8", 0, 1)
        self.create_stat_box(stats_grid, "Vidéos en édition", "5", 1, 0)
        self.create_stat_box(stats_grid, "Livraisons du mois", "15", 1, 1)
        
    def create_stat_box(self, parent, title, value, row, col):
        box = ttk.Frame(parent, padding="10")
        box.grid(row=row, column=col, padx=10, pady=10, sticky="nsew")
        
        ttk.Label(
            box,
            text=title,
            font=('Helvetica', 12)
        ).pack()
        
        ttk.Label(
            box,
            text=value,
            font=('Helvetica', 24, 'bold')
        ).pack()
        
    def show_dashboard(self):
        self.setup_welcome_screen()
        
    def show_video_crm(self):
        # Nettoyer le contenu précédent
        for widget in self.content_frame.winfo_children():
            widget.destroy()
            
        # Intégrer le CRM vidéo
        self.video_crm = CRMVideoEditor(self.content_frame)
        
    def show_crm_integrations(self):
        # Nettoyer le contenu précédent
        for widget in self.content_frame.winfo_children():
            widget.destroy()
            
        # Intégrer la section CRM
        self.crm_integrations = CRMIntegrations(self.content_frame)
        
    def show_projects(self):
        # Nettoyer le contenu précédent
        for widget in self.content_frame.winfo_children():
            widget.destroy()
            
        # Titre
        ttk.Label(
            self.content_frame,
            text="Gestion des Projets",
            font=('Helvetica', 24, 'bold')
        ).pack(pady=20)
        
        # Liste des projets
        projects_frame = ttk.Frame(self.content_frame)
        projects_frame.pack(fill=tk.BOTH, expand=True)
        
        # Table des projets
        columns = ('id', 'nom', 'client', 'statut', 'date')
        tree = ttk.Treeview(projects_frame, columns=columns, show='headings')
        
        # Définir les en-têtes
        tree.heading('id', text='ID')
        tree.heading('nom', text='Nom du Projet')
        tree.heading('client', text='Client')
        tree.heading('statut', text='Statut')
        tree.heading('date', text='Date de Création')
        
        # Ajouter des données d'exemple
        tree.insert('', 'end', values=('1', 'Vidéo Promotionnelle', 'Client A', 'En cours', '2024-03-11'))
        tree.insert('', 'end', values=('2', 'Montage Événement', 'Client B', 'Terminé', '2024-03-10'))
        
        tree.pack(fill=tk.BOTH, expand=True)
        
    def show_clients(self):
        # Nettoyer le contenu précédent
        for widget in self.content_frame.winfo_children():
            widget.destroy()
            
        # Titre
        ttk.Label(
            self.content_frame,
            text="Gestion des Clients",
            font=('Helvetica', 24, 'bold')
        ).pack(pady=20)
        
        # Liste des clients
        clients_frame = ttk.Frame(self.content_frame)
        clients_frame.pack(fill=tk.BOTH, expand=True)
        
        # Table des clients
        columns = ('id', 'nom', 'email', 'telephone', 'projets')
        tree = ttk.Treeview(clients_frame, columns=columns, show='headings')
        
        # Définir les en-têtes
        tree.heading('id', text='ID')
        tree.heading('nom', text='Nom du Client')
        tree.heading('email', text='Email')
        tree.heading('telephone', text='Téléphone')
        tree.heading('projets', text='Projets Actifs')
        
        # Ajouter des données d'exemple
        tree.insert('', 'end', values=('1', 'Client A', 'clienta@email.com', '0123456789', '3'))
        tree.insert('', 'end', values=('2', 'Client B', 'clientb@email.com', '0987654321', '2'))
        
        tree.pack(fill=tk.BOTH, expand=True)
        
    def show_reports(self):
        # Nettoyer le contenu précédent
        for widget in self.content_frame.winfo_children():
            widget.destroy()
            
        # Titre
        ttk.Label(
            self.content_frame,
            text="Rapports et Statistiques",
            font=('Helvetica', 24, 'bold')
        ).pack(pady=20)
        
        # Options de rapport
        reports_frame = ttk.Frame(self.content_frame)
        reports_frame.pack(fill=tk.BOTH, expand=True)
        
        # Boutons de rapport
        ttk.Button(
            reports_frame,
            text="Rapport Mensuel",
            width=20
        ).pack(pady=5)
        
        ttk.Button(
            reports_frame,
            text="Statistiques Clients",
            width=20
        ).pack(pady=5)
        
        ttk.Button(
            reports_frame,
            text="Performance Projets",
            width=20
        ).pack(pady=5)
        
    def show_settings(self):
        # Nettoyer le contenu précédent
        for widget in self.content_frame.winfo_children():
            widget.destroy()
            
        # Titre
        ttk.Label(
            self.content_frame,
            text="Paramètres",
            font=('Helvetica', 24, 'bold')
        ).pack(pady=20)
        
        # Options de paramètres
        settings_frame = ttk.Frame(self.content_frame)
        settings_frame.pack(fill=tk.BOTH, expand=True)
        
        # Paramètres utilisateur
        user_frame = ttk.LabelFrame(settings_frame, text="Paramètres Utilisateur", padding="10")
        user_frame.pack(fill=tk.X, pady=10)
        
        ttk.Label(user_frame, text="Nom d'utilisateur:").pack(anchor='w')
        ttk.Entry(user_frame).pack(fill='x', pady=2)
        
        ttk.Label(user_frame, text="Email:").pack(anchor='w')
        ttk.Entry(user_frame).pack(fill='x', pady=2)
        
        # Paramètres système
        system_frame = ttk.LabelFrame(settings_frame, text="Paramètres Système", padding="10")
        system_frame.pack(fill=tk.X, pady=10)
        
        ttk.Checkbutton(
            system_frame,
            text="Notifications par email"
        ).pack(anchor='w')
        
        ttk.Checkbutton(
            system_frame,
            text="Sauvegarde automatique"
        ).pack(anchor='w')

if __name__ == "__main__":
    root = tk.Tk()
    app = NovaCoreIntegration(root)
    root.mainloop() 