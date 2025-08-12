import tkinter as tk
from tkinter import ttk, messagebox
import json
import os
from datetime import datetime

class CRMIntegrations:
    def __init__(self, parent_frame):
        self.parent_frame = parent_frame
        self.setup_crm_integrations()
        
    def setup_crm_integrations(self):
        # Titre
        self.title = ttk.Label(
            self.parent_frame,
            text="Intégrations CRM",
            font=('Helvetica', 24, 'bold')
        )
        self.title.pack(pady=20)
        
        # Frame pour les CRM
        self.crm_frame = ttk.Frame(self.parent_frame)
        self.crm_frame.pack(fill=tk.BOTH, expand=True, padx=20)
        
        # Liste des CRM disponibles
        self.available_crms = [
            {
                "name": "Salesforce",
                "icon": "🔄",
                "description": "CRM leader du marché",
                "features": ["Gestion des leads", "Suivi des opportunités", "Rapports avancés"]
            },
            {
                "name": "HubSpot",
                "icon": "🎯",
                "description": "CRM tout-en-un",
                "features": ["Marketing automation", "Service client", "Analytics"]
            },
            {
                "name": "Zoho CRM",
                "icon": "📊",
                "description": "CRM abordable et complet",
                "features": ["Gestion des contacts", "Automatisation", "Intelligence artificielle"]
            },
            {
                "name": "Microsoft Dynamics",
                "icon": "💼",
                "description": "Solution Microsoft",
                "features": ["ERP intégré", "Business Intelligence", "Collaboration"]
            },
            {
                "name": "Pipedrive",
                "icon": "📈",
                "description": "CRM orienté pipeline",
                "features": ["Pipeline visuel", "Suivi des deals", "Automatisation"]
            }
        ]
        
        # Créer les cartes pour chaque CRM
        self.create_crm_cards()
        
    def create_crm_cards(self):
        # Frame pour la grille de cartes
        cards_frame = ttk.Frame(self.crm_frame)
        cards_frame.pack(fill=tk.BOTH, expand=True)
        
        # Créer une grille de cartes
        for i, crm in enumerate(self.available_crms):
            card = self.create_crm_card(cards_frame, crm)
            row = i // 2
            col = i % 2
            card.grid(row=row, column=col, padx=10, pady=10, sticky="nsew")
            
        # Configurer la grille
        cards_frame.grid_columnconfigure(0, weight=1)
        cards_frame.grid_columnconfigure(1, weight=1)
        
    def create_crm_card(self, parent, crm):
        # Frame pour la carte
        card = ttk.LabelFrame(parent, text=f"{crm['icon']} {crm['name']}", padding="10")
        
        # Description
        ttk.Label(
            card,
            text=crm['description'],
            font=('Helvetica', 10)
        ).pack(pady=5)
        
        # Liste des fonctionnalités
        features_frame = ttk.Frame(card)
        features_frame.pack(fill=tk.X, pady=5)
        
        for feature in crm['features']:
            ttk.Label(
                features_frame,
                text=f"• {feature}",
                font=('Helvetica', 9)
            ).pack(anchor='w')
        
        # Boutons d'action
        buttons_frame = ttk.Frame(card)
        buttons_frame.pack(fill=tk.X, pady=10)
        
        ttk.Button(
            buttons_frame,
            text="Connecter",
            command=lambda: self.connect_crm(crm['name']),
            width=15
        ).pack(side=tk.LEFT, padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Configurer",
            command=lambda: self.configure_crm(crm['name']),
            width=15
        ).pack(side=tk.LEFT, padx=5)
        
        return card
        
    def connect_crm(self, crm_name):
        # Fenêtre de connexion
        connect_window = tk.Toplevel(self.parent_frame)
        connect_window.title(f"Connexion à {crm_name}")
        connect_window.geometry("400x300")
        
        # Formulaire de connexion
        ttk.Label(
            connect_window,
            text=f"Connexion à {crm_name}",
            font=('Helvetica', 16, 'bold')
        ).pack(pady=20)
        
        # Champs de connexion
        ttk.Label(connect_window, text="API Key:").pack(pady=5)
        api_key = ttk.Entry(connect_window, width=40)
        api_key.pack(pady=5)
        
        ttk.Label(connect_window, text="API Secret:").pack(pady=5)
        api_secret = ttk.Entry(connect_window, width=40, show="*")
        api_secret.pack(pady=5)
        
        # Bouton de connexion
        ttk.Button(
            connect_window,
            text="Se connecter",
            command=lambda: self.save_crm_credentials(crm_name, api_key.get(), api_secret.get(), connect_window)
        ).pack(pady=20)
        
    def configure_crm(self, crm_name):
        # Fenêtre de configuration
        config_window = tk.Toplevel(self.parent_frame)
        config_window.title(f"Configuration de {crm_name}")
        config_window.geometry("500x400")
        
        # Options de configuration
        ttk.Label(
            config_window,
            text=f"Configuration de {crm_name}",
            font=('Helvetica', 16, 'bold')
        ).pack(pady=20)
        
        # Options de synchronisation
        sync_frame = ttk.LabelFrame(config_window, text="Synchronisation", padding="10")
        sync_frame.pack(fill=tk.X, padx=20, pady=10)
        
        ttk.Checkbutton(
            sync_frame,
            text="Synchroniser les contacts"
        ).pack(anchor='w')
        
        ttk.Checkbutton(
            sync_frame,
            text="Synchroniser les opportunités"
        ).pack(anchor='w')
        
        ttk.Checkbutton(
            sync_frame,
            text="Synchroniser les tâches"
        ).pack(anchor='w')
        
        # Fréquence de synchronisation
        freq_frame = ttk.LabelFrame(config_window, text="Fréquence", padding="10")
        freq_frame.pack(fill=tk.X, padx=20, pady=10)
        
        ttk.Radiobutton(
            freq_frame,
            text="Temps réel",
            value="realtime"
        ).pack(anchor='w')
        
        ttk.Radiobutton(
            freq_frame,
            text="Toutes les heures",
            value="hourly"
        ).pack(anchor='w')
        
        ttk.Radiobutton(
            freq_frame,
            text="Tous les jours",
            value="daily"
        ).pack(anchor='w')
        
        # Bouton de sauvegarde
        ttk.Button(
            config_window,
            text="Sauvegarder la configuration",
            command=lambda: self.save_crm_config(crm_name, config_window)
        ).pack(pady=20)
        
    def save_crm_credentials(self, crm_name, api_key, api_secret, window):
        # Sauvegarder les identifiants
        credentials = {
            'crm_name': crm_name,
            'api_key': api_key,
            'api_secret': api_secret,
            'connected_at': datetime.now().isoformat()
        }
        
        try:
            # Créer le dossier si nécessaire
            os.makedirs('config', exist_ok=True)
            
            # Sauvegarder dans un fichier
            with open(f'config/{crm_name.lower()}_credentials.json', 'w') as f:
                json.dump(credentials, f, indent=4)
            
            messagebox.showinfo("Succès", f"Connexion à {crm_name} établie avec succès!")
            window.destroy()
            
        except Exception as e:
            messagebox.showerror("Erreur", f"Impossible de sauvegarder les identifiants: {str(e)}")
            
    def save_crm_config(self, crm_name, window):
        # Sauvegarder la configuration
        config = {
            'crm_name': crm_name,
            'configured_at': datetime.now().isoformat()
        }
        
        try:
            # Créer le dossier si nécessaire
            os.makedirs('config', exist_ok=True)
            
            # Sauvegarder dans un fichier
            with open(f'config/{crm_name.lower()}_config.json', 'w') as f:
                json.dump(config, f, indent=4)
            
            messagebox.showinfo("Succès", f"Configuration de {crm_name} sauvegardée!")
            window.destroy()
            
        except Exception as e:
            messagebox.showerror("Erreur", f"Impossible de sauvegarder la configuration: {str(e)}") 