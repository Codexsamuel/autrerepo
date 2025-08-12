from flask import Flask, render_template, jsonify, request, redirect, url_for
import os
import json
from datetime import datetime

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = 'votre_cle_secrete'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['PROJECTS_FILE'] = 'data/projects.json'
app.config['CLIENTS_FILE'] = 'data/clients.json'
app.config['SETTINGS_FILE'] = 'data/settings.json'
app.config['SECTOR_CONFIG_FILE'] = 'data/sector_config.json'

# Création des dossiers nécessaires
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs('data', exist_ok=True)

# Routes principales
@app.route('/')
def index():
    return redirect(url_for('dashboard'))

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/video-crm')
def video_crm():
    return render_template('video_crm.html')

@app.route('/crm-integrations')
def crm_integrations():
    return render_template('crm_integrations.html')

@app.route('/sector-integrations')
def sector_integrations():
    return render_template('sector_integrations.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/clients')
def clients():
    return render_template('clients.html')

@app.route('/reports')
def reports():
    return render_template('reports.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/dl-solutions-hub')
def dl_solutions_hub():
    return render_template('dlsolutions_hub.html')

# API Routes
@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        with open(app.config['PROJECTS_FILE'], 'r') as f:
            projects = json.load(f)
        return jsonify(projects)
    except FileNotFoundError:
        return jsonify([])

@app.route('/api/projects', methods=['POST'])
def create_project():
    data = request.json
    try:
        with open(app.config['PROJECTS_FILE'], 'r') as f:
            projects = json.load(f)
    except FileNotFoundError:
        projects = []
    
    new_project = {
        'id': len(projects) + 1,
        'name': data['name'],
        'client': data['client'],
        'status': 'En cours',
        'created_at': datetime.now().isoformat(),
        'description': data.get('description', ''),
        'deadline': data.get('deadline', '')
    }
    
    projects.append(new_project)
    
    with open(app.config['PROJECTS_FILE'], 'w') as f:
        json.dump(projects, f, indent=4)
    
    return jsonify(new_project), 201

@app.route('/api/clients', methods=['GET'])
def get_clients():
    try:
        with open(app.config['CLIENTS_FILE'], 'r') as f:
            clients = json.load(f)
        return jsonify(clients)
    except FileNotFoundError:
        return jsonify([])

@app.route('/api/clients', methods=['POST'])
def create_client():
    data = request.json
    try:
        with open(app.config['CLIENTS_FILE'], 'r') as f:
            clients = json.load(f)
    except FileNotFoundError:
        clients = []
    
    new_client = {
        'id': len(clients) + 1,
        'name': data['name'],
        'email': data['email'],
        'phone': data.get('phone', ''),
        'active_projects': 0
    }
    
    clients.append(new_client)
    
    with open(app.config['CLIENTS_FILE'], 'w') as f:
        json.dump(clients, f, indent=4)
    
    return jsonify(new_client), 201

@app.route('/api/settings', methods=['GET'])
def get_settings():
    try:
        with open(app.config['SETTINGS_FILE'], 'r') as f:
            settings = json.load(f)
        return jsonify(settings)
    except FileNotFoundError:
        return jsonify({})

@app.route('/api/settings', methods=['POST'])
def update_settings():
    data = request.json
    with open(app.config['SETTINGS_FILE'], 'w') as f:
        json.dump(data, f, indent=4)
    return jsonify(data)

# API Routes pour les intégrations sectorielles
@app.route('/api/sector/configure', methods=['POST'])
def configure_sector():
    data = request.json
    try:
        with open(app.config['SECTOR_CONFIG_FILE'], 'r') as f:
            configs = json.load(f)
    except FileNotFoundError:
        configs = {}
    
    sector = data['sector']
    feature = data['feature']
    
    if sector not in configs:
        configs[sector] = {}
    
    configs[sector][feature] = {
        'institution_name': data['institution_name'],
        'integration_type': data['integration_type'],
        'configuration': data['configuration'],
        'updated_at': datetime.now().isoformat()
    }
    
    with open(app.config['SECTOR_CONFIG_FILE'], 'w') as f:
        json.dump(configs, f, indent=4)
    
    return jsonify({'success': True})

@app.route('/api/sector/config', methods=['GET'])
def get_sector_config():
    try:
        with open(app.config['SECTOR_CONFIG_FILE'], 'r') as f:
            configs = json.load(f)
        return jsonify(configs)
    except FileNotFoundError:
        return jsonify({})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True) 