# Gestion des Secrets - Sentinel Zero

## 🔐 SOPS (Secrets OPerationS)

### Installation

```bash
# macOS
brew install sops

# Ubuntu/Debian
wget -O - https://github.com/mozilla/sops/releases/download/v3.7.3/sops-v3.7.3.linux.amd64 > /usr/local/bin/sops
chmod +x /usr/local/bin/sops

# Génération de clés Age
age-keygen -o sentinel-zero.key
age-keygen -o sentinel-zero.pub
```

### Utilisation

#### Chiffrer un fichier
```bash
# Chiffrer un fichier .env
sops -e -i .env.prod

# Chiffrer un fichier de configuration
sops -e -i config/database.yaml
```

#### Déchiffrer un fichier
```bash
# Déchiffrer pour édition
sops -d .env.prod.enc

# Déchiffrer pour affichage
sops -d .env.prod.enc | grep DB_PASSWORD
```

#### Éditer un fichier chiffré
```bash
# Éditer directement (déchiffre, édite, rechiffre)
sops -e -i .env.prod.enc
```

### Structure des Secrets

```
security/sops/
├── .sops.yaml          # Configuration SOPS
├── keys/               # Clés publiques Age
│   ├── admin1.pub
│   ├── admin2.pub
│   └── backup.pub
├── encrypted/          # Fichiers chiffrés
│   ├── .env.prod.enc
│   ├── database.yaml.enc
│   └── ssl/
└── templates/          # Modèles de fichiers
    ├── .env.template
    └── config.template
```

### Rotation des Clés

```bash
# 1. Générer nouvelle clé
age-keygen -o sentinel-zero-new.key

# 2. Ajouter la nouvelle clé publique à .sops.yaml
# 3. Rechiffrer tous les fichiers
find . -name "*.enc" -exec sops -e -i {} \;

# 4. Supprimer l'ancienne clé après vérification
```

### Intégration CI/CD

```yaml
# .github/workflows/deploy.yml
- name: Déchiffrer les secrets
  run: |
    echo "${{ secrets.SOPS_PRIVATE_KEY }}" > sentinel-zero.key
    sops -d .env.prod.enc > .env.prod
```

### Bonnes Pratiques

1. **Jamais commiter de secrets en clair**
2. **Utiliser des clés Age différentes par environnement**
3. **Limiter l'accès aux clés privées**
4. **Auditer régulièrement l'accès aux secrets**
5. **Backup sécurisé des clés de déchiffrement**

### Récupération d'Urgence

```bash
# En cas de perte des clés
# 1. Restaurer depuis le backup sécurisé
# 2. Régénérer les secrets si nécessaire
# 3. Mettre à jour les clés publiques
# 4. Rechiffrer tous les fichiers
``` 