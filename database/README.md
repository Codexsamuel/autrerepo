# DAVY Trading Platform - Database Documentation

## 📋 Vue d'ensemble

Cette base de données est conçue pour supporter la plateforme de trading IA DAVY avec une architecture robuste et évolutive.

## 🏗️ Structure de la base de données

### Tables principales

#### 1. **users** - Gestion des utilisateurs
- Gestion centralisée de tous les utilisateurs
- Rôles : client, employee, admin, super_admin
- Statuts : active, suspended, deleted

#### 2. **employees** - Données spécifiques aux employés
- Informations professionnelles
- Numéro CNPS, type de contrat
- Date d'embauche

#### 3. **clients** - Données spécifiques aux clients
- Informations d'entreprise
- Secteur d'activité
- Adresse

#### 4. **ai_interactions** - Interactions IA
- Historique des conversations avec l'IA
- Intent detection
- Timestamp des interactions

#### 5. **trade_history** - Historique des trades
- Enregistrement complet des trades
- Prix d'entrée/sortie
- Stratégies utilisées
- Résultats

#### 6. **market_analysis** - Analyses de marché
- Analyses générées par l'IA
- Niveaux de confiance
- Sources d'information

#### 7. **trading_advice** - Conseils de trading
- Recommandations personnalisées
- Raisonnement détaillé
- Niveaux de risque

#### 8. **news_feeds** - Flux d'actualités
- Actualités de marché
- Scores de pertinence
- Sources d'information

## 🔐 Sécurité et audit

### Tables de sécurité
- **login_logs** : Traçabilité des connexions
- **ai_logs** : Logs d'activité IA
- **user_roles** : Gestion des permissions

### Contraintes de sécurité
- Mots de passe hashés
- Validation des rôles
- Contrôle des statuts utilisateur

## 📊 Performance

### Index optimisés
- Index sur les emails utilisateurs
- Index sur les assets de trading
- Index sur les timestamps
- Index sur les scores de pertinence

### Vues pour requêtes communes
- **user_summary** : Résumé utilisateur
- **trading_performance** : Performance trading
- **ai_interaction_summary** : Résumé interactions IA

## 🚀 Installation et configuration

### 1. Créer la base de données
```sql
CREATE DATABASE davy_trading_platform;
```

### 2. Exécuter les migrations
```bash
# Exécuter le schéma principal
psql -d davy_trading_platform -f database/schema.sql

# Exécuter les migrations
psql -d davy_trading_platform -f database/migrations/001_initial_schema.sql
```

### 3. Peupler avec les données de test
```bash
# Insérer les données de test
psql -d davy_trading_platform -f database/seed.sql
```

## 🔧 Configuration de l'environnement

### Variables d'environnement
```env
DATABASE_URL=postgresql://username:password@localhost:5432/davy_trading_platform
DB_HOST=localhost
DB_PORT=5432
DB_NAME=davy_trading_platform
DB_USER=your_username
DB_PASSWORD=your_password
```

### Configuration Supabase
```javascript
// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 📈 Requêtes utiles

### Performance trading par utilisateur
```sql
SELECT 
  u.full_name,
  COUNT(th.id) as total_trades,
  AVG(th.exit_price - th.entry_price) as avg_profit,
  SUM(CASE WHEN th.result = 'win' THEN 1 ELSE 0 END) as wins
FROM users u
LEFT JOIN trade_history th ON u.id = th.user_id
WHERE u.role = 'client'
GROUP BY u.id, u.full_name;
```

### Interactions IA récentes
```sql
SELECT 
  u.full_name,
  ai.intent,
  ai."timestamp"
FROM ai_interactions ai
JOIN users u ON ai.user_id = u.id
WHERE ai."timestamp" > NOW() - INTERVAL '7 days'
ORDER BY ai."timestamp" DESC;
```

### Analyses de marché par asset
```sql
SELECT 
  asset,
  type,
  AVG(confidence) as avg_confidence,
  COUNT(*) as analysis_count
FROM market_analysis
GROUP BY asset, type
ORDER BY avg_confidence DESC;
```

## 🔄 Migrations

### Structure des migrations
```
database/
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_add_trading_features.sql
│   └── 003_add_ai_features.sql
├── schema.sql
├── seed.sql
└── README.md
```

### Créer une nouvelle migration
```bash
# Créer un nouveau fichier de migration
touch database/migrations/$(date +%Y%m%d_%H%M%S)_description.sql
```

## 🧪 Tests

### Données de test
Le fichier `seed.sql` contient des données de test réalistes pour :
- Utilisateurs (clients, employés, admins)
- Historique de trading
- Interactions IA
- Analyses de marché
- Actualités

### Exécuter les tests
```bash
# Réinitialiser la base de données de test
psql -d davy_trading_test -f database/schema.sql
psql -d davy_trading_test -f database/seed.sql
```

## 📊 Monitoring

### Métriques importantes
- Nombre d'interactions IA par jour
- Performance des trades
- Temps de réponse des analyses
- Utilisation des fonctionnalités

### Requêtes de monitoring
```sql
-- Interactions IA par jour
SELECT 
  DATE("timestamp") as date,
  COUNT(*) as interactions
FROM ai_interactions
GROUP BY DATE("timestamp")
ORDER BY date DESC;

-- Performance trading
SELECT 
  result,
  COUNT(*) as count,
  AVG(exit_price - entry_price) as avg_profit
FROM trade_history
GROUP BY result;
```

## 🔒 Sécurité

### Bonnes pratiques
1. **Hachage des mots de passe** : Utiliser bcrypt
2. **Validation des entrées** : Contrôler toutes les entrées utilisateur
3. **Logs de sécurité** : Tracer toutes les actions sensibles
4. **Contrôle d'accès** : Vérifier les permissions à chaque requête
5. **Chiffrement** : Chiffrer les données sensibles

### Audit trail
```sql
-- Voir les connexions récentes
SELECT 
  u.email,
  ll.ip_address,
  ll."timestamp"
FROM login_logs ll
JOIN users u ON ll.user_id = u.id
ORDER BY ll."timestamp" DESC
LIMIT 10;
```

## 🚀 Déploiement

### Production
1. Créer la base de données de production
2. Exécuter les migrations
3. Configurer les sauvegardes
4. Mettre en place le monitoring
5. Configurer les alertes

### Sauvegarde
```bash
# Sauvegarde complète
pg_dump davy_trading_platform > backup_$(date +%Y%m%d).sql

# Restauration
psql davy_trading_platform < backup_20240115.sql
```

## 📞 Support

Pour toute question concernant la base de données :
- Consulter la documentation Supabase
- Vérifier les logs d'erreur
- Contacter l'équipe de développement

---

**Version** : 1.0.0  
**Dernière mise à jour** : 2024-01-15  
**Maintenu par** : Équipe DAVY Trading Platform 