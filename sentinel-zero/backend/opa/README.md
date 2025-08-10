# 🔒 Politiques de Sécurité OPA - Sentinel Zero

Ce répertoire contient les politiques de sécurité automatisées pour la plateforme Sentinel Zero, implémentées avec Open Policy Agent (OPA).

## 📋 Vue d'ensemble

Les politiques OPA de Sentinel Zero fournissent un contrôle automatisé de la conformité et de la sécurité pour tous les déploiements Kubernetes. Elles garantissent que les ressources respectent les standards de sécurité les plus stricts.

## 🏗️ Architecture

```
opa/
├── policies/
│   └── sentinel.security.rego    # Politiques principales de sécurité
├── config/
│   └── opa-config.yaml          # Configuration OPA
├── test/
│   └── test-policies.sh         # Scripts de test
└── README.md                     # Cette documentation
```

## 🚀 Installation et Configuration

### Prérequis

- Kubernetes 1.20+
- Open Policy Agent (OPA) 0.40+
- kubectl configuré

### Installation d'OPA

```bash
# Installation d'OPA
curl -L -o opa https://openpolicyagent.org/downloads/latest/opa_linux_amd64
chmod +x opa
sudo mv opa /usr/local/bin/

# Vérification
opa version
```

### Déploiement des politiques

```bash
# Créer le namespace OPA
kubectl create namespace opa-system

# Déployer OPA avec les politiques Sentinel Zero
kubectl apply -f k8s/opa-deployment.yaml
kubectl apply -f k8s/opa-configmap.yaml
```

## 📜 Politiques de Sécurité

### 🔐 Règles de Base
- **Labels de sécurité obligatoires** : Tous les pods doivent avoir des labels de sécurité
- **Annotations de sécurité** : Niveau de sécurité requis pour chaque pod
- **Contextes de sécurité** : Configuration obligatoire des contextes de sécurité

### 🚫 Règles de Ressources
- **Limites CPU/Mémoire** : Tous les conteneurs doivent avoir des limites de ressources
- **Mode privilégié interdit** : Aucun conteneur ne peut s'exécuter en mode privilégié
- **Escalade de privilèges** : Interdiction de l'escalade de privilèges

### 🌐 Règles de Réseau
- **NetworkPolicies** : Tous les services doivent avoir des labels d'application
- **TLS obligatoire** : Les communications sensibles doivent utiliser HTTPS
- **Isolation des namespaces** : Protection du namespace kube-system

### 🔒 Règles de Secrets
- **Pas de secrets en clair** : Interdiction des mots de passe dans les variables d'environnement
- **Rotation des secrets** : Dates d'expiration obligatoires pour tous les secrets
- **Chiffrement au repos** : Obligatoire pour les bases de données

### 📊 Règles de Monitoring
- **Health checks** : Liveness et readiness probes obligatoires
- **Logging** : Niveaux de log configurés pour tous les pods
- **Audit** : Traçabilité activée pour toutes les ressources

### 🏛️ Règles de Compliance
- **GDPR** : Conformité obligatoire pour le traitement des données PII
- **ISO27001** : Standards de sécurité de l'information
- **SOC2** : Contrôles de sécurité et de disponibilité

## 🧪 Tests et Validation

### Test des politiques

```bash
# Exécuter les tests de validation
cd test/
chmod +x test-policies.sh
./test-policies.sh
```

### Test manuel d'une ressource

```bash
# Tester un pod spécifique
opa eval --data policies/sentinel.security.rego \
         --input my-pod.yaml \
         "data.sentinel.security.deny"

# Tester un service
opa eval --data policies/sentinel.security.rego \
         --input my-service.yaml \
         "data.sentinel.security.deny"
```

### Validation de syntaxe

```bash
# Vérifier la syntaxe des politiques
opa check policies/sentinel.security.rego

# Formater les politiques
opa fmt policies/sentinel.security.rego
```

## 🔧 Intégration avec Kubernetes

### Admission Controller

```yaml
# k8s/opa-admission.yaml
apiVersion: admission.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: opa-validating-webhook
webhooks:
- name: validating-webhook.openpolicyagent.org
  rules:
  - operations: ["CREATE", "UPDATE"]
    apiGroups: ["*"]
    apiVersions: ["*"]
    resources: ["*"]
  clientConfig:
    service:
      namespace: opa-system
      name: opa
  admissionReviewVersions: ["v1"]
  sideEffects: None
  timeoutSeconds: 5
```

### Configuration OPA

```yaml
# k8s/opa-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: opa-default-system-main
  namespace: opa-system
data:
  main: |
    package system
    
    import data.kubernetes.admission
    
    main = {
      "apiVersion": "admission.k8s.io/v1",
      "kind": "AdmissionReview",
      "response": response
    }
    
    response = {
      "allowed": false,
      "status": {
        "message": "denied by default"
      }
    }
```

## 📈 Monitoring et Alertes

### Métriques Prometheus

```yaml
# Configuration des métriques
metrics:
  service: sentinel-opa
  prefix: sentinel_security
  include_revision: true
```

### Logs de décision

```yaml
# Configuration des logs
decision_logs:
  service: sentinel-opa
  reporting:
    min_delay_seconds: 30
    max_delay_seconds: 60
  include_revision: true
  include_decision_id: true
```

## 🚨 Gestion des Violations

### Types de violations

1. **Critiques** : Arrêt immédiat du déploiement
2. **Majeures** : Déploiement avec avertissement
3. **Mineures** : Notification et suivi

### Actions automatiques

- **Quarantaine** : Isolation des pods non conformes
- **Rollback** : Retour à la version précédente
- **Notification** : Alertes aux équipes de sécurité

## 🔄 Mise à jour des Politiques

### Processus de déploiement

```bash
# 1. Valider les nouvelles politiques
opa check policies/sentinel.security.rego

# 2. Tester avec des ressources existantes
opa eval --data policies/sentinel.security.rego \
         --input existing-resources.yaml \
         "data.sentinel.security.deny"

# 3. Déployer en production
kubectl apply -f k8s/opa-configmap-updated.yaml

# 4. Vérifier le déploiement
kubectl get pods -n opa-system
```

### Versioning

- **Versioning sémantique** : MAJOR.MINOR.PATCH
- **Backup automatique** : Sauvegarde des politiques avant mise à jour
- **Rollback** : Retour aux politiques précédentes en cas de problème

## 📚 Références

### Documentation OPA
- [Open Policy Agent Documentation](https://www.openpolicyagent.org/docs/)
- [Rego Language Reference](https://www.openpolicyagent.org/docs/latest/policy-language/)
- [Kubernetes Integration](https://www.openpolicyagent.org/docs/latest/kubernetes-introduction/)

### Standards de Sécurité
- [ISO 27001](https://www.iso.org/isoiec-27001-information-security.html)
- [SOC 2](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html)
- [GDPR](https://gdpr.eu/)

### Outils Associés
- [Gatekeeper](https://open-policy-agent.github.io/gatekeeper/)
- [Conftest](https://conftest.dev/)
- [OPA Playground](https://play.openpolicyagent.org/)

## 🤝 Contribution

### Développement de nouvelles politiques

1. **Créer une branche** : `feature/new-security-policy`
2. **Implémenter la politique** : Suivre le format Rego standard
3. **Ajouter des tests** : Créer des cas de test complets
4. **Documenter** : Mettre à jour ce README
5. **Soumettre une PR** : Revue par l'équipe de sécurité

### Standards de code

- **Formatage** : Utiliser `opa fmt`
- **Validation** : Tous les tests doivent passer
- **Documentation** : Commentaires en français pour la cohérence
- **Performance** : Évaluation en < 100ms par ressource

## 📞 Support

### Équipe de Sécurité
- **Lead Security** : security@sentinel-zero.com
- **DevSecOps** : devsecops@sentinel-zero.com
- **Compliance** : compliance@sentinel-zero.com

### Urgences
- **PagerDuty** : #sentinel-security
- **Slack** : #security-alerts
- **Email** : security-emergency@sentinel-zero.com

---

**⚠️ Important** : Ces politiques sont critiques pour la sécurité de la plateforme. Toute modification doit être approuvée par l'équipe de sécurité et testée en environnement de développement. 